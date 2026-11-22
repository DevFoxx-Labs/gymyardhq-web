# Performance Report — GymYardHQ Website

**तारीख:** 22 नवंबर 2026
**दायरा:** Home page (मुख्य), बाकी सभी public pages पर भी लागू
**शर्त:** वेबसाइट का look बिल्कुल वैसा ही रहे जैसा पहले था

---

## 1. नतीजा एक नज़र में

| Metric | पहले | अब | सुधार |
|---|---|---|---|
| Mobile — मुख्य content दिखने का समय (LCP) | 5.54 s | **4.29 s** | 1.25 s तेज़ (−23%) |
| Mobile — पहली चीज़ दिखने का समय (FCP) | 2.59 s | **1.83 s** | 0.76 s तेज़ (−29%) |
| Mobile — कुल download | 671 KB | **451 KB** | 220 KB कम (−33%) |
| Desktop — LCP | 1.25 s | **1.11 s** | 0.14 s तेज़ |
| Desktop — FCP | 0.60 s | **0.48 s** | 0.12 s तेज़ |
| Layout shift (CLS) | 0 | 0 | पहले जैसा (perfect) |

Fonts का वज़न **353 KB से घटकर लगभग 120 KB** रह गया।

> Lighthouse 12, mobile (slow 4G + 4× धीमा CPU), localhost पर। पुराने और नए build को बारी-बारी से
> कई बार चलाकर median लिया गया। Live server पर numbers hosting/CDN के हिसाब से अलग होंगे।

---

## 2. क्या बदला

### Fonts — सबसे बड़ा सुधार
- **समस्या:** हर visitor के लिए Inter और Archivo दोनों की 83-83 KB की एक extra file download
  होती थी, सिर्फ़ ₹ के एक अक्षर के लिए। Archivo font अपनी पूरी width range के साथ आता था,
  जबकि site सिर्फ़ एक width (125) इस्तेमाल करती है।
- **बदलाव:** वही Google font files अब site खुद serve करती है, trim करके:
  - Inter — बिल्कुल वही file, कोई बदलाव नहीं
  - Archivo — सिर्फ़ इस्तेमाल होने वाली width (87 KB → 34 KB)
  - ₹ का अक्षर — अलग 1 KB की file, जो सिर्फ़ ₹ वाले pages पर load होती है
- Fonts दोबारा बनाने का script: `design/tools/build_fonts.py`

### Images
- **समस्या:** हर image के लिए 2048 और 3840 px के versions भी HTML में लिखे जाते थे। कोई भी
  image 1913 px से बड़ी नहीं है, इसलिए ये versions वही file दोबारा देते थे और बस HTML भारी करते थे।
- **बदलाव:** सबसे बड़ा size 1920 px रखा। हर image के pixels बिल्कुल वही हैं।

### सुरक्षा checks (`pnpm verify`)
आगे गलती से performance न बिगड़े, इसलिए नए checks जोड़े। ये fail होंगे अगर:
- किसी page पर ऐसा अक्षर आए जो font files में नहीं है
- image sizes 1920 px से ऊपर चले जाएँ
- कोई नई image 1920 px से चौड़ी डाली जाए

---

## 3. Look नहीं बदला — कैसे पक्का किया

- 6 pages के full-page screenshots, mobile (390 px) और desktop (1440 px) दोनों पर, पहले और बाद
  में लेकर pixel-by-pixel मिलाए।
- **12 में से 10 screenshots: 0 pixel का फ़र्क।**
- बाकी 2 में 28 और 54 pixels का फ़र्क मिला (हर screenshot में 1.6 करोड़ से ज़्यादा pixels में से)।
  यह heading font के अक्षरों के किनारे पर 1 pixel की smoothing है, जो 3× zoom पर भी नहीं दिखती।

---

## 4. जो आज़माया पर नहीं रखा

| बदलाव | क्यों नहीं रखा |
|---|---|
| CSS को HTML के अंदर डालना (`inlineCss`) | HTML 425 KB से 626 KB हो गया, speed बेहतर नहीं, बल्कि खराब हुई |
| Videos दोबारा compress करना | पहले से ठीक हैं (720p, बिना audio, page load के बाद ही चलते हैं); re-encode से quality घटती |

---

## 5. Checks जो पास हुए

`pnpm lint` ✓ · `pnpm typecheck` ✓ · production build ✓ · `pnpm verify` ✓

---

## 6. आगे क्या (2 सेकंड के target के लिए)

Mobile LCP अभी ~4.3 s है (lab में)। अब रुकावट download नहीं, phone का CPU है: पहली बार screen
दिखाने से पहले browser पूरे लंबे home page का layout तैयार करता है। आगे के विकल्पों से look
थोड़ा बदलता है, इसलिए ये owner की मंज़ूरी पर हैं:

1. नीचे वाले sections पर `content-visibility: auto` (सबसे बड़ा असर; mascots के किनारे कटने
   का ध्यान रखना होगा)
2. Hero headline की entrance animation से blur हटाना
3. Home page छोटा करना, ज़्यादा जानकारी feature pages पर
4. AVIF image format (20–30% छोटी images)
5. India (Mumbai) edge वाले CDN पर hosting — असली 4G users के लिए ज़रूरी

विस्तार: `docs/known-gaps.md` (gap 16, 17) और `changes/CHANGELOG.md` (22 नवंबर 2026 की entry)।
