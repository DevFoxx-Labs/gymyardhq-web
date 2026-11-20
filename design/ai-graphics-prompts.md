# GymYardHQ — AI ग्राफिक्स प्रॉम्प्ट्स (20)

वेबसाइट के sections के background और promo graphics के लिए। हर prompt पूरा अपने आप में है:
code block कॉपी करें, mascot और logo की image attach करें, फिर generate करें।

## इस्तेमाल कैसे करें

1. **हर बार attach करें:**
   - Mascot: `GymYardHQ/assets/images/gymyard/mascot_crossed_arms.png` (चेहरा और कपड़े सबसे साफ़ इसी में दिखते हैं)
   - Logo, सिर्फ़ prompt 19–20 के लिए: `gymyardhq_official_logo.png`
2. **Tool:** Gemini (Nano Banana) या ChatGPT Image में images attach करके prompt paste करें।
   Midjourney में mascot को character/omni reference बनाएँ और prompt के अंत में aspect ratio दें (जैसे `--ar 16:9`)।
3. **Image में text नहीं होना चाहिए।** Headline और बाकी text वेबसाइट HTML में लिखती है। AI से बना text अक्सर टूटा-फूटा होता है।
   Image में अक्षर, नंबर या नकली UI आ जाए तो दोबारा generate करें।
4. **Logo के बारे में सच:** कोई भी AI tool logo को 100% हूबहू नहीं रख पाता। सबसे भरोसेमंद तरीका: prompt 19–20 को
   logo की जगह खाली छोड़कर generate करें, फिर असली logo PNG ऊपर रखें (Canva/Figma में)।
   दोनों तरीके नीचे दिए हैं।
5. **Mascot बदल जाए तो** (चेहरा, अयाल, कपड़े, G logo) prompt के अंत में यह जोड़कर दोबारा चलाएँ:
   `Match the reference character exactly — copy his face, mane, fur colour, tank top and chest emblem from the attached image.`
6. **Export:** बड़ी size में save करें (जैसे 2× = 3840×2160) और दिए गए file name रखें। फिर फ़ाइलें मुझे दें,
   मैं WebP में बदलकर, सही size और dark overlay के साथ sections में लगा दूँगा।

**Brand colours:** near-black `#0B0C10`, charcoal `#13151B`, neon lime `#B5F63D`, white `#FFFFFF`.

---

## A. Hero (होम पेज का सबसे ऊपर वाला हिस्सा)

### 1. Hero background — desktop · 16:9 · `hero-desktop`
Text बाईं ओर आता है, इसलिए बायाँ 55% हिस्सा खाली और गहरा रखा है।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: a premium, modern Indian gym at night. The lion mascot stands confidently in the RIGHT third of the frame next to a steel squat rack, chalk dust floating in a beam of lime-green light, slight low camera angle so he looks powerful. Rows of black weight plates and dumbbells softly blurred in the background. The LEFT 55% of the image is calm, empty, very dark space fading to near-black so headline text can sit on top.

Style: premium 3D animated-film character render, cinematic dark gym lighting, near-black background (#0B0C10) with charcoal (#13151B) surfaces, one neon lime-green (#B5F63D) rim light on the mascot's shoulders and mane, subtle haze, high contrast, minimal and uncluttered. Aspect ratio 16:9, 3840x2160.

Avoid: any text, letters, numbers, watermarks, other brand logos, extra characters, extra fingers or limbs, UI elements.
```

### 2. Hero background — mobile · 9:16 · `hero-mobile`
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: vertical shot inside a dark modern gym. The lion mascot is in the BOTTOM 45% of the frame, arms crossed, looking up and slightly toward the camera, a barbell rack behind him. The TOP 55% is empty dark space with a soft lime glow fading into near-black, reserved for text.

Style: premium 3D animated-film character render, cinematic dark gym lighting, near-black background (#0B0C10), charcoal surfaces (#13151B), single neon lime (#B5F63D) accent light, subtle haze, minimal, high contrast. Aspect ratio 9:16, 2160x3840.

Avoid: any text, letters, numbers, watermarks, other brand logos, extra characters, extra fingers or limbs, UI elements.
```

---

## B. Features — हर feature card / section के लिए

### 3. Members — 4:3 · `feature-members`
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: the lion mascot stands at a sleek gym front desk, warmly welcoming a line of gym members. The members are faceless dark silhouettes with lime edge light (no detailed faces). He holds a smartphone whose screen is a plain soft lime glow. Mascot placed on the right, empty dark space on the left.

Style: premium 3D animated-film character render, cinematic dark gym lighting, near-black background (#0B0C10), charcoal surfaces (#13151B), neon lime (#B5F63D) accents, minimal, uncluttered. Aspect ratio 4:3, 2400x1800.

Avoid: any text, letters, numbers, watermarks, other brand logos, readable screens, extra fingers or limbs.
```

### 4. Fees & UPI payments — 4:3 · `feature-fees`
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: the lion mascot holds up a smartphone in one hand, proudly, as glowing lime-green light particles and smooth gold coins (plain, no symbols) stream into the phone screen. The phone screen is a plain bright lime glow. Behind him, a blurred dark gym with dumbbell racks. Mascot slightly right of centre, calm dark space on the left.

Style: premium 3D animated-film character render, cinematic dark gym lighting, near-black background (#0B0C10), charcoal (#13151B), neon lime (#B5F63D) glow, minimal, high contrast. Aspect ratio 4:3, 2400x1800.

Avoid: any text, letters, numbers, currency symbols, QR codes, watermarks, other brand logos, extra fingers or limbs.
```

### 5. Receipts & QR verify — 4:3 · `feature-receipts`
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: close-up of the lion mascot scanning a white paper receipt with his smartphone; a thin beam of lime-green scanning light passes over the receipt. The receipt shows only abstract grey lines and a blank square (no readable content). A small lime checkmark-shaped glow floats above it. Dark gym background, shallow depth of field.

Style: premium 3D animated-film character render, cinematic lighting, near-black background (#0B0C10), neon lime (#B5F63D) accents, clean and minimal. Aspect ratio 4:3, 2400x1800.

Avoid: any text, letters, numbers, real QR codes, watermarks, other brand logos, extra fingers or limbs.
```

### 6. Reminders — 4:3 · `feature-reminders`
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: the lion mascot resting between sets on a gym bench, glancing at his smartphone with a confident smile. Around him float a few soft, glowing 3D notification bells and rounded blank calendar cards in lime and white, like gentle reminders. Dark gym behind, kettlebells on the floor.

Style: premium 3D animated-film character render, cinematic dark lighting, near-black background (#0B0C10), charcoal (#13151B), neon lime (#B5F63D) glow, minimal, uncluttered. Aspect ratio 4:3, 2400x1800.

Avoid: any text, letters, numbers, dates, watermarks, other brand logos, extra fingers or limbs.
```

### 7. Reports & dashboard — 16:9 · `feature-reports`
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: the lion mascot stands on the right, one arm raised, presenting a giant floating holographic display of rising lime-green bar charts, a smooth upward line graph and a donut chart, made of pure light (abstract shapes only). Dark gym floor reflects the glow. Left side kept darker and calmer for text.

Style: premium 3D animated-film character render, futuristic yet minimal, near-black background (#0B0C10), neon lime (#B5F63D) and soft white light, high contrast. Aspect ratio 16:9, 3840x2160.

Avoid: any text, letters, numbers, axis labels, watermarks, other brand logos, extra fingers or limbs.
```

### 8. Trainers — 4:3 · `feature-trainers`
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: the lion mascot acts as a coach, spotting a gym member on a bench press. The member is a faceless dark silhouette with lime rim light. The mascot has a whistle around his neck and an encouraging expression. Dark modern gym, overhead spotlights.

Style: premium 3D animated-film character render, cinematic dark gym lighting, near-black background (#0B0C10), charcoal (#13151B), neon lime (#B5F63D) accents, minimal. Aspect ratio 4:3, 2400x1800.

Avoid: any text, letters, numbers, watermarks, other brand logos, detailed human faces, extra fingers or limbs.
```

### 9. Security (MPIN, fingerprint, encrypted backup) — 4:3 · `feature-security`
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: the lion mascot stands guard, arms crossed, in front of a massive round vault door that looks like a heavy black iron weight plate. A glowing lime-green fingerprint shape and a padlock shape shine at the centre of the door. Moody dark gym, floor reflections.

Style: premium 3D animated-film character render, cinematic, near-black background (#0B0C10), brushed steel and carbon-fibre textures, neon lime (#B5F63D) glow, high contrast, minimal. Aspect ratio 4:3, 2400x1800.

Avoid: any text, letters, numbers, watermarks, other brand logos, extra fingers or limbs.
```

### 10. English & हिन्दी, made for India — 4:3 · `feature-language`
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: the lion mascot waves happily from the entrance of a modern Indian neighbourhood gym at dusk. Two empty rounded speech bubbles float beside him, one lime-green and one white (completely blank). Warm street lights blurred in the background, the gym interior glowing lime inside.

Style: premium 3D animated-film character render, cinematic, near-black and charcoal tones (#0B0C10, #13151B) with neon lime (#B5F63D) accents and a touch of warm orange street light, minimal. Aspect ratio 4:3, 2400x1800.

Avoid: any text, letters, numbers, scripts in any language, signboards with writing, watermarks, other brand logos, extra fingers or limbs.
```

---

## C. How it works — 3 steps (square cards)

### 11. Step 1 — Set up in 2 minutes · 1:1 · `step-1-setup`
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: the lion mascot getting ready to train — chalking his hands, a small cloud of white chalk dust lit by lime light, determined look. Centered composition, simple dark background with a faint circular weight-plate shape behind him.

Style: premium 3D animated-film character render, near-black background (#0B0C10), neon lime (#B5F63D) rim light, minimal, clean. Aspect ratio 1:1, 2048x2048.

Avoid: any text, letters, numbers, watermarks, other brand logos, extra fingers or limbs.
```

### 12. Step 2 — Add plans & members · 1:1 · `step-2-members`
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: the lion mascot giving an energetic high-five to a new gym member (faceless dark silhouette with lime edge light). A burst of small lime light particles at the moment the hands meet. Centered, simple dark background with a faint circular weight-plate shape.

Style: premium 3D animated-film character render, near-black background (#0B0C10), neon lime (#B5F63D) accents, minimal, clean. Aspect ratio 1:1, 2048x2048.

Avoid: any text, letters, numbers, watermarks, other brand logos, detailed human faces, extra fingers or limbs.
```

### 13. Step 3 — Collect & remind · 1:1 · `step-3-collect`
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: the lion mascot at the top of a heavy deadlift lockout, triumphant expression, barbell with black plates, lime-green confetti-like light particles exploding behind him like a victory moment. Centered, dark background.

Style: premium 3D animated-film character render, near-black background (#0B0C10), neon lime (#B5F63D) glow, high energy but minimal composition. Aspect ratio 1:1, 2048x2048.

Avoid: any text, letters, numbers, watermarks, other brand logos, extra fingers or limbs.
```

---

## D. Other sections

### 14. Privacy & offline section — 16:9 · `section-privacy`
Text बाईं ओर आता है।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: the lion mascot on the RIGHT, holding a smartphone protectively close to his chest inside a glowing translucent lime-green shield dome. Outside the dome, faint broken cloud and wifi-signal shapes fade away into the darkness, showing the data stays on the phone, offline. LEFT 55% calm, empty, very dark for text.

Style: premium 3D animated-film character render, cinematic, near-black background (#0B0C10), charcoal (#13151B), neon lime (#B5F63D) shield glow, minimal, high contrast. Aspect ratio 16:9, 3840x2160.

Avoid: any text, letters, numbers, watermarks, other brand logos, extra fingers or limbs.
```

### 15. FAQ section (बहुत हल्का background) — 16:9 · `section-faq`
यह कम opacity पर text के पीछे लगेगा, इसलिए low-contrast रखा है।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: the lion mascot sitting relaxed on a gym bench in the far LEFT of the frame, drinking from a black water bottle, thoughtful calm expression, towel over his shoulder. The rest of the image is a very dark, empty, softly lit gym fading into near-black.

Style: premium 3D animated-film character render, LOW contrast and muted, mostly near-black (#0B0C10) and charcoal (#13151B), only a faint lime (#B5F63D) rim light, lots of empty space, calm mood. Aspect ratio 16:9, 3840x2160.

Avoid: any text, letters, numbers, watermarks, other brand logos, bright highlights, extra fingers or limbs.
```

### 16. Download CTA (lime वाला block) — 16:9 · `section-download`
यह section lime रंग का है, इसलिए background भी lime है।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: the lion mascot bursting out of a giant smartphone screen on the RIGHT side, flexing both biceps with a big confident grin, small pieces of the screen frame flying outward. The phone screen is plain black. The background is a flat, solid neon lime-green (#B5F63D) with subtle darker lime concentric circles like weight-plate rings. LEFT 50% is clean lime space for text.

Style: premium 3D animated-film character render, bright and energetic, lime background with soft black (#0B0C10) shadows, minimal. Aspect ratio 16:9, 3840x2160.

Avoid: any text, letters, numbers, watermarks, other brand logos, app icons on the phone, extra fingers or limbs.
```

### 17. Legal pages header (Privacy / Terms) — 21:9 banner · `banner-legal`
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: a calm, trustworthy mood. The lion mascot on the far RIGHT sits at a sleek dark desk in a gym office, reading a clipboard of blank pages, with a black weight plate used as a paperweight. Soft lime lamp light. The left two-thirds are empty, very dark and calm for the page title.

Style: premium 3D animated-film character render, serious but friendly, near-black background (#0B0C10), charcoal (#13151B), soft neon lime (#B5F63D) light, minimal, low clutter. Aspect ratio 21:9, 3840x1646.

Avoid: any text, letters, numbers, readable documents, watermarks, other brand logos, extra fingers or limbs.
```

### 18. Contact & support page — 4:3 · `section-support`
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change pose and camera angle.

Scene: the lion mascot wearing a sleek black headset with a lime microphone, giving a friendly thumbs up, ready to help. Behind him a dark gym with soft bokeh lights. Mascot on the right, calm empty space on the left.

Style: premium 3D animated-film character render, warm and approachable, near-black background (#0B0C10), charcoal (#13151B), neon lime (#B5F63D) accents, minimal. Aspect ratio 4:3, 2400x1800.

Avoid: any text, letters, numbers, watermarks, other brand logos, extra fingers or limbs.
```

---

## E. Logo वाले promo graphics

इनमें **mascot + logo दोनों** attach करें। Logo exact रखने के लिए Option B बेहतर है।

### 19. Social share / OG image — 1200×630 (1.91:1) · `promo-social`
**Option A — AI ही logo रखे:**
```
Use the two attached images as strict references.
1) MASCOT: keep the lion exactly the same — same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, black wristbands with lime trim. Do not redesign, recolor or restyle him.
2) LOGO: place the attached GymYardHQ logo exactly as provided — do not redraw, retype, recolor, distort, crop or add any letters. Treat it as a flat image pasted on top.

Scene: promotional banner. The attached logo sits in the TOP-LEFT area at about 35% of the image width. The lion mascot stands on the RIGHT with arms crossed, in front of two thin glowing lime concentric circles like weight-plate rings. The lower-left area is clean, dark and empty. Dark premium gym atmosphere, faint dumbbells blurred in the background.

Style: premium 3D animated-film render, near-black background (#0B0C10), neon lime (#B5F63D) accents, high contrast, minimal. Aspect ratio 1.91:1, 2400x1260.

Avoid: any text other than what is already inside the attached logo, extra logos, watermarks, extra fingers or limbs.
```
**Option B — logo बाद में खुद लगाएँ (ज़्यादा भरोसेमंद):** ऊपर वाला prompt चलाएँ, पर "LOGO" वाला हिस्सा हटाकर यह लिखें:
`Leave the TOP-LEFT 40% of the image completely empty and dark so a logo can be added later.`
फिर Canva/Figma में असली logo PNG उस जगह रख दें।

### 20. Google Play feature graphic — 1024×500 · `promo-play-feature`
Play Store यह image बिना transparency के और ठीक 1024×500 size में ही लेता है।
```
Use the two attached images as strict references.
1) MASCOT: keep the lion exactly the same — same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, black wristbands with lime trim. Do not redesign, recolor or restyle him.
2) LOGO: place the attached GymYardHQ logo exactly as provided — do not redraw, retype, recolor, distort, crop or add any letters. Treat it as a flat image pasted on top.

Scene: wide banner for an app store. The attached logo on the LEFT half, vertically centered, at about 40% of the banner width. The lion mascot on the RIGHT, waist-up, giving a confident thumbs up, half-body crop. Between them, a subtle horizontal lime light streak like a barbell bar. Keep important content away from the outer 10% edges.

Style: premium 3D animated-film render, near-black background (#0B0C10) with a soft lime glow behind the mascot, neon lime (#B5F63D) accents, solid opaque background (no transparency), minimal. Aspect ratio 2.05:1, 2048x1000.

Avoid: any text other than what is already inside the attached logo, extra logos, watermarks, transparency, extra fingers or limbs.
```
Generate होने के बाद image को ठीक **1024×500** पर resize करके PNG या JPG में save करें। Option B वाला तरीका यहाँ भी काम करता है।

---

## File names और कहाँ लगेंगी

| # | File | वेबसाइट में जगह |
|---|---|---|
| 1–2 | `hero-desktop`, `hero-mobile` | होम पेज hero |
| 3–10 | `feature-*` | Features के cards |
| 11–13 | `step-1/2/3-*` | How it works |
| 14 | `section-privacy` | Privacy section |
| 15 | `section-faq` | FAQ |
| 16 | `section-download` | Download CTA |
| 17 | `banner-legal` | `/legal/*` pages का header |
| 18 | `section-support` | `/contact` |
| 19 | `promo-social` | Link share preview (OG) |
| 20 | `promo-play-feature` | Play Console → Feature graphic |
