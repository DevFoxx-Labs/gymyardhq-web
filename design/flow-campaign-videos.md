# GymYardHQ — Google Flow (Veo) Campaign Videos

**5 ads × 30 seconds × 3 clips (10 सेकंड each)** — Instagram Reels / YouTube Shorts के लिए, 9:16 vertical.
हर ad की कहानी: **Gym Owner अपनी problem बताता है → Lion mascot बताता है GymYardHQ उसे कैसे solve करता है → Payoff + CTA.**

> सिर्फ़ prompt writing है। Video Flow में आप generate करेंगे। Prompts English में हैं (Veo English में सबसे अच्छा follow करता है), dialogue हिंदी में है।

---

## 0. पाँचों campaigns एक नज़र में

| # | नाम | Problem (Owner) | Solution (Mascot) | Hook (पहले 2 सेकंड) |
|---|-----|-----------------|-------------------|---------------------|
| 1 | **फीस का भूत** | किसकी fees pending है याद नहीं | Due-today / due-soon / expiry reminders + ready WhatsApp/SMS message | Owner register पटकता है: "12 लोगों की fees pending… और मुझे नाम तक याद नहीं!" |
| 2 | **नकली रसीद** | Member हाथ से लिखी नकली receipt दिखाता है | UPI QR वाला bill, numbered PDF receipt, tamper-check QR scan | Owner कैमरे के सामने मुड़ी-तुड़ी पर्ची: "ये receipt मैंने कभी काटी ही नहीं!" |
| 3 | **Register का Tower** | 6 register, 200 members, नंबर नहीं मिलता | सब members एक app में + dashboard (active / due / overdue) | Registers का ढेर owner के ऊपर गिरता है |
| 4 | **कितना कमाया?** | महीने का हिसाब "लगभग" | Revenue, expenses, trainer payouts — charts में | "कोई पूछे कितना कमाया… मैं बोलता हूँ — लगभग।" |
| 5 | **महीने वाला Software** | Monthly fee + basement में net गया तो सब बंद | Free, offline, MPIN + fingerprint, पूरा app हिंदी में | Phone पर "No signal", lion phone की screen तोड़कर बाहर आता है |

**सिर्फ़ असली features** इस्तेमाल किए हैं (app के source और `content/features.ts` से मिलाकर)। Dialogue में बदलाव करें तो ध्यान रखें:
- ❌ "App अपने-आप SMS भेजता है" — **गलत।** App reminder देता है और message तैयार करता है; owner एक tap में भेजता है।
- ❌ "Payment gateway / commission" — App पैसा नहीं छूता; UPI से पैसा सीधे owner के account में जाता है।
- ✅ Free, कोई monthly fee नहीं, कोई ads/trackers नहीं, internet के बिना चलता है, Hindi + English, MPIN + fingerprint, encrypted backup.

---

## 1. Google Flow में workflow (हर campaign के लिए यही)

### Setup
1. Flow में नया **Project** बनाएँ → नाम: `GYHQ-Ad-01-Fees-Ka-Bhoot` आदि।
2. **Aspect ratio: 9:16 (Portrait).** Model: **Veo 3.1 — Quality** final के लिए, **Fast** सिर्फ़ test के लिए (Fast में credits कम लगते हैं)।
3. **Audio / speech ON** रखें (dialogue और sound effects Veo ही बनाएगा)।

### 10 सेकंड वाली बात (ज़रूर पढ़ें)
Flow में एक generation की लंबाई model पर निर्भर है — **Veo 3.1 एक बार में 8 सेकंड** बनाता है। इसलिए:
- आपके Flow में **10s option** हो तो वही चुनें।
- नहीं तो clips 8–8 सेकंड के बनेंगे (24s)। हर prompt का dialogue **8 सेकंड में फिट** होने लायक छोटा रखा है, ताकि दोनों हालत में कटे नहीं। बाकी 6 सेकंड के लिए **end card** (Section 8) जोड़ें → कुल 30 सेकंड।

### Continuity — तीनों clips एक लगातार scene जैसे लगें
| Clip | Flow mode | क्यों |
|------|-----------|-------|
| **Clip 1** | **Frames to Video** — Start frame = Section 3 से बनाया गया image (दोनों characters उसमें दिखते हैं) | Start frame में दोनों का चेहरा-कपड़ा lock हो जाता है, Veo वहीं से शुरू करता है |
| **Clip 2** | Scenebuilder में Clip 1 पर **Extend** → Clip 2 prompt | Extend आख़िरी frame से आगे बढ़ाता है — वही रोशनी, वही जगह, वही characters, वही आवाज़ |
| **Clip 3** | Clip 2 पर **Extend** → Clip 3 prompt | वही |
| Fallback | Extend से बात न बने तो: Clip का **आख़िरी frame save करें** (Scenebuilder → frame grab / video pause करके screenshot) → उसी को अगले clip का **Start frame** बनाएँ | Extend जैसा ही, बस manual |

**Campaign 5 अपवाद:** Clip 1 के अंत में lion phone से बाहर निकलता है, इसलिए start frame में lion phone की screen पर दिखता है (Section 3 देखें)।

### हर clip को 3–4 बार generate करें
Text-to-video में बहुत variation होता है। पहला result आख़िरी फ़ैसला नहीं है। हर clip के 2–4 versions बनाएँ, सबसे अच्छा चुनें, फिर **उसी** को Extend करें।

---

## 2. Reference images (कौन-सी file कहाँ लगेगी)

| Use | File |
|-----|------|
| **Character sheet — दोनों पूरे शरीर के साथ** (सबसे ज़रूरी) | `gymyardhq-web/design/raw-cutouts/owner-mascot-cutout.png` |
| Lion का चेहरा close-up | `gymyardhq-web/design/raw-cutouts/head-avatar.png` |
| दोनों साथ, vertical, gym background | `gymyardhq-web/design/raw-cutouts/scenes/owner-mascot-tall.png` |
| दोनों साथ, gym, owner के हाथ में phone | `gymyardhq-web/design/raw-cutouts/scenes/owner-mascot-wide.png` |
| Lion phone की screen तोड़कर बाहर (Campaign 5) | `GymYardHQ/assets/images/Lion Mascot Bursting Through Smartphone-1.png` |
| High-five ending pose | `GymYardHQ/assets/images/Neon Gym High-Five Champions.png` |
| App logo (end card, सिर्फ़ editing में) | `gymyardhq-web/assets/cutouts/logo-official.webp` |

> Lion के **कपड़े पक्के कर लिए हैं:** black tank top + **black track pants with one lime-green side stripe** (tall/wide scene images जैसे)। Cutout वाले shorts इस्तेमाल न करें, वरना clips के बीच कपड़े बदल जाएँगे।

---

## 3. Character Bible — हर prompt में बिना बदले paste करें

यही सबसे बड़ा हथियार है: **हर prompt में ये blocks हूबहू** (एक शब्द भी बदले बिना) जाते हैं। Veo को जितना same text मिलेगा, उतना same character बनेगा।

### `[STYLE]`
```
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, consistent with the attached reference images. Dark modern gym at night, black walls and black steel squat racks, dumbbell racks, glowing lime-green (#9EFF1F) neon strip lights, soft haze, rim light in lime green, warm key light on faces. Vertical 9:16 frame.
```

### `[OWNER]`
```
OWNER (must look identical in every shot): Indian man, late 20s, warm light-brown skin, clean-shaven, thick voluminous wavy jet-black hair falling to just above the shoulders with a side part, dark brown eyes, athletic muscular build. Wears a fitted plain black crew-neck short-sleeve T-shirt with a small lime-green "G" logo on the left chest, black jogger track pants with a white drawstring, black sneakers. No watch, no jewellery, no beard, no glasses.
```

### `[LION]`
```
LION MASCOT (must look identical in every shot): anthropomorphic, very muscular bodybuilder lion standing upright like a man, about a head taller than the owner. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black track pants with a single lime-green stripe down each side, black wristbands with a lime-green band on both wrists, black sneakers with white soles.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back or between his legs, in every frame, from every angle, even when he turns, jumps or walks away. Exactly one head, two ears, two arms, two legs. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he talks, turns or moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His body never passes through objects or through the owner.
```

### `[VOICES]`
```
VOICES: The owner speaks Hindi in a natural North-Indian accent, friendly late-20s male voice, expressive. The lion speaks Hindi in a deep, warm, booming, playful and confident male voice. Lip-sync matches the words exactly. Only the character named speaks each line.
```

### `[RULES]`
```
RULES: Keep both characters' faces, hair, mane, fur colour, clothes and the "G" logos exactly as in the reference images and the previous frame. No on-screen text, no subtitles, no captions, no watermark, no extra characters, no other people speaking. Phone screens glow lime-green with simple abstract shapes, no readable text. No background music. The owner never gets any lion features and the lion never gets human skin or human hair; the two characters never merge. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

> **Background music नहीं** माँगा है — music editing में आप खुद डालेंगे (Reels/Shorts की trending audio)। Veo की music हर clip में अलग आती है और continuity तोड़ती है।

---

## 4. हर prompt का ढाँचा (समझने के लिए)

```
[STYLE] [OWNER] [LION] [VOICES]
SCENE: कहाँ, कौन frame में कहाँ खड़ा है
TIMELINE: 0–2s … / 2–6s … / 6–10s …   ← हर हिस्से में एक ही मुख्य हरकत
CAMERA: shot type + एक ही camera move
DIALOGUE: कौन, कब, क्या (हिंदी)
SFX: आवाज़ें
[RULES]
```

- **एक समय पर एक ही बड़ी हरकत।** दो चीज़ें साथ हिलें तो Veo गड़बड़ करता है।
- **Dialogue हर clip में ~18 हिंदी शब्द से ज़्यादा नहीं** — इससे ज़्यादा हो तो Veo या तो तेज़ बोलता है या line काट देता है।
- Dialogue देवनागरी में है। अगर उच्चारण गलत आए तो वही line Roman Hinglish में लिख दें (हर script table में Roman version दिया है)।

---

## 5. Start frames (हर campaign का Clip 1 इसी image से शुरू होगा)

Flow में **Create Image** (या Gemini / Nano Banana) में `owner-mascot-cutout.png` + `owner-mascot-tall.png` attach करें, फिर नीचे वाला prompt। 9:16 में generate करें, 2–3 versions बनाएँ, जिसमें दोनों characters reference से सबसे ज़्यादा मिलते हों वह रखें।

**सबमें common शुरुआत:**
```
Use the attached images as strict character references. Keep the owner and the lion mascot exactly the same: same faces, hair, mane, fur, clothes and lime-green "G" logos. Do not redesign or restyle them. The lion has NO TAIL, exactly five fingers on each hand, and a sharp, unmirrored "G" emblem. Vertical 9:16 still frame, polished stylized 3D CGI, cinematic, dark modern gym at night with black squat racks and glowing lime-green neon strip lights, soft haze.
```

| Campaign | Start frame — common शुरुआत के बाद जोड़ें |
|---|---|
| **1** | `The owner stands behind a black reception desk in the foreground, centre frame, waist-up, holding a thick old paper register open with both hands, frustrated face, mouth open mid-sentence. Behind him on the right, in soft focus, the lion mascot leans against a squat rack, arms crossed, smirking, watching. A smartphone lies face-down on the desk.` |
| **2** | `The owner stands centre frame, waist-up, facing the camera, holding up a crumpled handwritten paper receipt slip toward the camera with one hand, eyebrows raised in disbelief. The lion mascot stands just behind his right shoulder, leaning in and squinting suspiciously at the slip.` |
| **3** | `The owner sits behind a black reception desk, centre frame, on which a tall tilting tower of six thick old paper registers and loose files is stacked, taller than his head, starting to lean toward him. He looks up at it nervously. The lion mascot stands on the far right edge of the frame in soft focus, one eyebrow raised.` |
| **4** | `The owner sits at a black desk, centre frame, waist-up, a stack of rupee notes and an old calculator in front of him, a pen behind his ear, looking at the camera with an awkward embarrassed half-smile. The lion mascot stands behind him on the left, one paw covering his own face in a facepalm.` |
| **5** | `Underground basement gym, low concrete ceiling, lime-green neon strips. The owner stands centre frame, waist-up, holding his smartphone out toward the camera in one hand, frustrated, other hand on his forehead. The phone screen is black with a cracked lime-green glow, and the lion mascot's face and fists are pushing against the inside of the screen as if about to burst out.` |

---

## 6. Campaigns — तीनों clips के पूरे prompts

> हर prompt पूरा है — Section 3 के सारे blocks (STYLE, OWNER, LION + hard rules, VOICES, RULES) पहले से अंदर हैं। पूरा block copy करें और सीधे Flow में paste करें। Section 3 बदलें तो नीचे के prompts भी बदलवाएँ।

---

### Campaign 1 — फीस का भूत (Fee reminders)

**Script**

| Clip | समय | कौन | Line (देवनागरी) | Roman |
|---|---|---|---|---|
| 1 | 0–4s | Owner | "भाई, बारह members की fees pending है… और मुझे नाम तक याद नहीं!" | "Bhai, barah members ki fees pending hai… aur mujhe naam tak yaad nahi!" |
| 1 | 7–9s | Lion | "Register बंद करो, boss।" | "Register band karo, boss." |
| 2 | 0–5s | Lion | "GymYardHQ हर रोज़ बताता है — किसकी fees आज due है, किसकी membership ख़त्म हो रही है।" | "GymYardHQ har roz batata hai — kiski fees aaj due hai, kiski membership khatam ho rahi hai." |
| 2 | 6–9s | Owner → Lion | "और याद दिलाऊँ कैसे?" — "WhatsApp message तैयार है। बस एक tap।" | "Aur yaad dilaun kaise?" — "WhatsApp message taiyaar hai. Bas ek tap." |
| 3 | 1–4s | Owner | "बिना internet के भी चलता है?" | "Bina internet ke bhi chalta hai?" |
| 3 | 5–9s | Lion (कैमरे से) | "हाँ! और बिल्कुल free। GymYardHQ — Play Store पर।" | "Haan! Aur bilkul free. GymYardHQ — Play Store par." |

**Start frame — Create Image, 9:16** (attach: `design/raw-cutouts/owner-mascot-cutout.png` + `design/raw-cutouts/scenes/owner-mascot-tall.png`)
```
Use the attached images as strict character references. Keep the owner and the lion mascot exactly the same: same faces, hair, mane, fur, clothes and lime-green "G" logos. Do not redesign or restyle them. The lion has NO TAIL, exactly five fingers on each hand, and a sharp, unmirrored "G" emblem. Vertical 9:16 still frame, polished stylized 3D CGI, cinematic, dark modern gym at night with black squat racks and glowing lime-green neon strip lights, soft haze. The owner stands behind a black reception desk in the foreground, centre frame, waist-up, holding a thick old paper register open with both hands, frustrated face, mouth open mid-sentence. Behind him on the right, in soft focus, the lion mascot leans against a squat rack, arms crossed, smirking, watching. A smartphone lies face-down on the desk.
```

**Clip 1 (0–10s) — Frames to Video, start frame = Campaign 1**
```
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, consistent with the attached reference images. Dark modern gym at night, black walls and black steel squat racks, dumbbell racks, glowing lime-green (#9EFF1F) neon strip lights, soft haze, rim light in lime green, warm key light on faces. Vertical 9:16 frame.

OWNER (must look identical in every shot): Indian man, late 20s, warm light-brown skin, clean-shaven, thick voluminous wavy jet-black hair falling to just above the shoulders with a side part, dark brown eyes, athletic muscular build. Wears a fitted plain black crew-neck short-sleeve T-shirt with a small lime-green "G" logo on the left chest, black jogger track pants with a white drawstring, black sneakers. No watch, no jewellery, no beard, no glasses.

LION MASCOT (must look identical in every shot): anthropomorphic, very muscular bodybuilder lion standing upright like a man, about a head taller than the owner. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black track pants with a single lime-green stripe down each side, black wristbands with a lime-green band on both wrists, black sneakers with white soles.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back or between his legs, in every frame, from every angle, even when he turns, jumps or walks away. Exactly one head, two ears, two arms, two legs. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he talks, turns or moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His body never passes through objects or through the owner.

VOICES: The owner speaks Hindi in a natural North-Indian accent, friendly late-20s male voice, expressive. The lion speaks Hindi in a deep, warm, booming, playful and confident male voice. Lip-sync matches the words exactly. Only the character named speaks each line.
SCENE: The owner stands behind a black reception desk in the foreground, centre frame, holding a thick old paper register. The lion mascot leans on a squat rack behind him on the right, in soft focus.
TIMELINE:
0–1s: The owner slams the register shut on the desk with a loud thud, dust puffs up — a sudden, punchy opening.
1–4s: He looks straight into the camera, exasperated, and says his line with big hand gestures.
4–7s: He flips the register open again, pages flying, and shakes his head in despair.
7–10s: The lion steps forward into sharp focus and places one big paw flat on the open register, stopping the pages. The owner looks up at him, surprised. The lion smirks and says his line.
CAMERA: starts on a fast punch-in to the owner's face at 0s, then a slow steady push-in for the rest; lion comes into focus with a rack focus at 7s.
DIALOGUE:
Owner (1–4s): "भाई, बारह members की fees pending है… और मुझे नाम तक याद नहीं!"
Lion (8–9.5s): "Register बंद करो, boss।"
SFX: heavy book slam, paper fluttering, soft gym ambience, a low dramatic "whoosh" when the lion steps in.
RULES: Keep both characters' faces, hair, mane, fur colour, clothes and the "G" logos exactly as in the reference images and the previous frame. No on-screen text, no subtitles, no captions, no watermark, no extra characters, no other people speaking. Phone screens glow lime-green with simple abstract shapes, no readable text. No background music. The owner never gets any lion features and the lion never gets human skin or human hair; the two characters never merge. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

**Clip 2 (10–20s) — Extend Clip 1**
```
Continue the scene seamlessly from the last frame: same place, same lighting, same characters in the same positions and clothes.
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, consistent with the attached reference images. Dark modern gym at night, black walls and black steel squat racks, dumbbell racks, glowing lime-green (#9EFF1F) neon strip lights, soft haze, rim light in lime green, warm key light on faces. Vertical 9:16 frame.

OWNER (must look identical in every shot): Indian man, late 20s, warm light-brown skin, clean-shaven, thick voluminous wavy jet-black hair falling to just above the shoulders with a side part, dark brown eyes, athletic muscular build. Wears a fitted plain black crew-neck short-sleeve T-shirt with a small lime-green "G" logo on the left chest, black jogger track pants with a white drawstring, black sneakers. No watch, no jewellery, no beard, no glasses.

LION MASCOT (must look identical in every shot): anthropomorphic, very muscular bodybuilder lion standing upright like a man, about a head taller than the owner. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black track pants with a single lime-green stripe down each side, black wristbands with a lime-green band on both wrists, black sneakers with white soles.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back or between his legs, in every frame, from every angle, even when he turns, jumps or walks away. Exactly one head, two ears, two arms, two legs. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he talks, turns or moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His body never passes through objects or through the owner.

VOICES: The owner speaks Hindi in a natural North-Indian accent, friendly late-20s male voice, expressive. The lion speaks Hindi in a deep, warm, booming, playful and confident male voice. Lip-sync matches the words exactly. Only the character named speaks each line.
TIMELINE:
0–1s: The lion closes the register with his paw and slides it aside.
1–5s: He pulls a smartphone from his pocket and holds it up between himself and the owner; the screen glows bright lime-green and lights up both faces. The lion explains, confident, nodding.
5–7s: The owner leans in toward the phone, curious, and asks his question.
7–10s: The lion taps the screen once with a thick finger; a soft "whoosh-ding" plays and lime-green light pulses from the phone. The lion grins and answers.
CAMERA: medium two-shot, both characters in frame, slow gentle arc around them from left to right.
DIALOGUE:
Lion (1–5s): "GymYardHQ हर रोज़ बताता है — किसकी fees आज due है, किसकी membership ख़त्म हो रही है।"
Owner (5.5–7s): "और याद दिलाऊँ कैसे?"
Lion (7.5–9.5s): "WhatsApp message तैयार है। बस एक tap।"
SFX: phone unlock click, soft notification chime, message "whoosh" sent sound.
RULES: Keep both characters' faces, hair, mane, fur colour, clothes and the "G" logos exactly as in the reference images and the previous frame. No on-screen text, no subtitles, no captions, no watermark, no extra characters, no other people speaking. Phone screens glow lime-green with simple abstract shapes, no readable text. No background music. The owner never gets any lion features and the lion never gets human skin or human hair; the two characters never merge. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

**Clip 3 (20–30s) — Extend Clip 2**
```
Continue the scene seamlessly from the last frame: same place, same lighting, same characters in the same positions and clothes.
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, consistent with the attached reference images. Dark modern gym at night, black walls and black steel squat racks, dumbbell racks, glowing lime-green (#9EFF1F) neon strip lights, soft haze, rim light in lime green, warm key light on faces. Vertical 9:16 frame.

OWNER (must look identical in every shot): Indian man, late 20s, warm light-brown skin, clean-shaven, thick voluminous wavy jet-black hair falling to just above the shoulders with a side part, dark brown eyes, athletic muscular build. Wears a fitted plain black crew-neck short-sleeve T-shirt with a small lime-green "G" logo on the left chest, black jogger track pants with a white drawstring, black sneakers. No watch, no jewellery, no beard, no glasses.

LION MASCOT (must look identical in every shot): anthropomorphic, very muscular bodybuilder lion standing upright like a man, about a head taller than the owner. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black track pants with a single lime-green stripe down each side, black wristbands with a lime-green band on both wrists, black sneakers with white soles.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back or between his legs, in every frame, from every angle, even when he turns, jumps or walks away. Exactly one head, two ears, two arms, two legs. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he talks, turns or moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His body never passes through objects or through the owner.

VOICES: The owner speaks Hindi in a natural North-Indian accent, friendly late-20s male voice, expressive. The lion speaks Hindi in a deep, warm, booming, playful and confident male voice. Lip-sync matches the words exactly. Only the character named speaks each line.
TIMELINE:
0–1s: The lion hands the phone to the owner.
1–4s: The owner looks at the screen, then up at the lion, half-sceptical, and asks his question.
4–7s: The lion turns and looks straight into the camera with a big confident grin, pointing at the camera, and says his line.
7–10s: The owner and the lion high-five above their heads; a burst of lime-green sparks flies from their hands. They freeze in a proud pose, both smiling at the camera.
CAMERA: medium two-shot; at 4s a quick push-in to the lion's face; at 7s pull back to show both characters full-waist for the high-five.
DIALOGUE:
Owner (1–3.5s): "बिना internet के भी चलता है?"
Lion (4.5–7s): "हाँ! और बिल्कुल free। GymYardHQ — Play Store पर।"
SFX: loud satisfying high-five clap with a sparkle "whoosh", crowd-like gym cheer in the background.
RULES: Keep both characters' faces, hair, mane, fur colour, clothes and the "G" logos exactly as in the reference images and the previous frame. No on-screen text, no subtitles, no captions, no watermark, no extra characters, no other people speaking. Phone screens glow lime-green with simple abstract shapes, no readable text. No background music. The owner never gets any lion features and the lion never gets human skin or human hair; the two characters never merge. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

**Edit में on-screen text:**
- 0s: **"12 MEMBERS. FEES PENDING. 😤"** (बड़ा, बीच में, 1.5s)
- 10s: **"Due today • Due soon • Expiring"**
- 17s: **"Ready WhatsApp msg → 1 tap"**
- 22s: **"No internet needed ✅  ₹0"**

---

### Campaign 2 — नकली रसीद (UPI bill + PDF receipt + QR verification)

**Script**

| Clip | समय | कौन | Line | Roman |
|---|---|---|---|---|
| 1 | 0–4s | Owner | "Member बोल रहा है fees दे दी, receipt भी दिखाई… पर ये मेरी लिखावट है ही नहीं!" | "Member bol raha hai fees de di, receipt bhi dikhayi… par ye meri likhavat hai hi nahi!" |
| 1 | 7–9s | Lion | "कच्चा काम, boss। हाथ की पर्ची अब बंद।" | "Kachcha kaam, boss. Haath ki parchi ab band." |
| 2 | 1–6s | Lion | "GymYardHQ से bill बनाओ, UPI QR के साथ। GPay, PhonePe, Paytm — पैसा सीधा तुम्हारे account में।" | "GymYardHQ se bill banao, UPI QR ke saath. GPay, PhonePe, Paytm — paisa seedha tumhare account mein." |
| 2 | 7–9s | Owner | "और receipt?" | "Aur receipt?" |
| 3 | 0–4s | Lion | "Numbered PDF receipt, QR के साथ। Scan करो — असली है या नकली, तुरंत पता।" | "Numbered PDF receipt, QR ke saath. Scan karo — asli hai ya nakli, turant pata." |
| 3 | 5–7s | Owner (कैमरे से) | "अब कोई जुगाड़ नहीं चलेगा!" | "Ab koi jugaad nahi chalega!" |
| 3 | 8–10s | Lion | "GymYardHQ। Free। Play Store पर।" | "GymYardHQ. Free. Play Store par." |

**Start frame — Create Image, 9:16** (attach: `design/raw-cutouts/owner-mascot-cutout.png` + `design/raw-cutouts/scenes/owner-mascot-tall.png`)
```
Use the attached images as strict character references. Keep the owner and the lion mascot exactly the same: same faces, hair, mane, fur, clothes and lime-green "G" logos. Do not redesign or restyle them. The lion has NO TAIL, exactly five fingers on each hand, and a sharp, unmirrored "G" emblem. Vertical 9:16 still frame, polished stylized 3D CGI, cinematic, dark modern gym at night with black squat racks and glowing lime-green neon strip lights, soft haze. The owner stands centre frame, waist-up, facing the camera, holding up a crumpled handwritten paper receipt slip toward the camera with one hand, eyebrows raised in disbelief. The lion mascot stands just behind his right shoulder, leaning in and squinting suspiciously at the slip.
```

**Clip 1 — Frames to Video, start frame = Campaign 2**
```
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, consistent with the attached reference images. Dark modern gym at night, black walls and black steel squat racks, dumbbell racks, glowing lime-green (#9EFF1F) neon strip lights, soft haze, rim light in lime green, warm key light on faces. Vertical 9:16 frame.

OWNER (must look identical in every shot): Indian man, late 20s, warm light-brown skin, clean-shaven, thick voluminous wavy jet-black hair falling to just above the shoulders with a side part, dark brown eyes, athletic muscular build. Wears a fitted plain black crew-neck short-sleeve T-shirt with a small lime-green "G" logo on the left chest, black jogger track pants with a white drawstring, black sneakers. No watch, no jewellery, no beard, no glasses.

LION MASCOT (must look identical in every shot): anthropomorphic, very muscular bodybuilder lion standing upright like a man, about a head taller than the owner. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black track pants with a single lime-green stripe down each side, black wristbands with a lime-green band on both wrists, black sneakers with white soles.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back or between his legs, in every frame, from every angle, even when he turns, jumps or walks away. Exactly one head, two ears, two arms, two legs. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he talks, turns or moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His body never passes through objects or through the owner.

VOICES: The owner speaks Hindi in a natural North-Indian accent, friendly late-20s male voice, expressive. The lion speaks Hindi in a deep, warm, booming, playful and confident male voice. Lip-sync matches the words exactly. Only the character named speaks each line.
SCENE: The owner stands centre frame, waist-up, holding a crumpled handwritten paper receipt slip up to the camera. The lion stands just behind his right shoulder.
TIMELINE:
0–1s: The owner thrusts the crumpled slip right up to the camera lens, filling the frame — a sudden, punchy opening.
1–4s: He pulls it back and says his line, outraged and confused, tapping the slip.
4–7s: The lion leans in over his shoulder, sniffs the slip, squints, and raises one eyebrow very high.
7–10s: The lion plucks the slip from the owner's fingers with two claws, holds it up and says his line with a smirk.
CAMERA: handheld-feel close-up at 0s, then settles into a steady medium two-shot.
DIALOGUE:
Owner (1–4s): "Member बोल रहा है fees दे दी, receipt भी दिखाई… पर ये मेरी लिखावट है ही नहीं!"
Lion (7.5–9.5s): "कच्चा काम, boss। हाथ की पर्ची अब बंद।"
SFX: paper crinkle, a comic "sniff", gym ambience.
RULES: Keep both characters' faces, hair, mane, fur colour, clothes and the "G" logos exactly as in the reference images and the previous frame. No on-screen text, no subtitles, no captions, no watermark, no extra characters, no other people speaking. Phone screens glow lime-green with simple abstract shapes, no readable text. No background music. The owner never gets any lion features and the lion never gets human skin or human hair; the two characters never merge. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

**Clip 2 — Extend**
```
Continue the scene seamlessly from the last frame: same place, same lighting, same characters in the same positions and clothes.
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, consistent with the attached reference images. Dark modern gym at night, black walls and black steel squat racks, dumbbell racks, glowing lime-green (#9EFF1F) neon strip lights, soft haze, rim light in lime green, warm key light on faces. Vertical 9:16 frame.

OWNER (must look identical in every shot): Indian man, late 20s, warm light-brown skin, clean-shaven, thick voluminous wavy jet-black hair falling to just above the shoulders with a side part, dark brown eyes, athletic muscular build. Wears a fitted plain black crew-neck short-sleeve T-shirt with a small lime-green "G" logo on the left chest, black jogger track pants with a white drawstring, black sneakers. No watch, no jewellery, no beard, no glasses.

LION MASCOT (must look identical in every shot): anthropomorphic, very muscular bodybuilder lion standing upright like a man, about a head taller than the owner. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black track pants with a single lime-green stripe down each side, black wristbands with a lime-green band on both wrists, black sneakers with white soles.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back or between his legs, in every frame, from every angle, even when he turns, jumps or walks away. Exactly one head, two ears, two arms, two legs. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he talks, turns or moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His body never passes through objects or through the owner.

VOICES: The owner speaks Hindi in a natural North-Indian accent, friendly late-20s male voice, expressive. The lion speaks Hindi in a deep, warm, booming, playful and confident male voice. Lip-sync matches the words exactly. Only the character named speaks each line.
TIMELINE:
0–1s: The lion flicks the paper slip into the air; it dissolves into tiny lime-green sparkles.
1–6s: He holds up a smartphone toward the owner; the screen glows lime-green with a simple square QR-code-like pattern. He explains proudly.
6–10s: The owner, impressed, crosses his arms, nods, and asks his short question.
CAMERA: medium two-shot, slow push-in toward the phone between them.
DIALOGUE:
Lion (1.5–6s): "GymYardHQ से bill बनाओ, UPI QR के साथ। GPay, PhonePe, Paytm — पैसा सीधा तुम्हारे account में।"
Owner (7–8.5s): "और receipt?"
SFX: sparkle "poof", soft UPI-payment "ding".
RULES: Keep both characters' faces, hair, mane, fur colour, clothes and the "G" logos exactly as in the reference images and the previous frame. No on-screen text, no subtitles, no captions, no watermark, no extra characters, no other people speaking. Phone screens glow lime-green with simple abstract shapes, no readable text. No background music. The owner never gets any lion features and the lion never gets human skin or human hair; the two characters never merge. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

**Clip 3 — Extend**
```
Continue the scene seamlessly from the last frame: same place, same lighting, same characters in the same positions and clothes.
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, consistent with the attached reference images. Dark modern gym at night, black walls and black steel squat racks, dumbbell racks, glowing lime-green (#9EFF1F) neon strip lights, soft haze, rim light in lime green, warm key light on faces. Vertical 9:16 frame.

OWNER (must look identical in every shot): Indian man, late 20s, warm light-brown skin, clean-shaven, thick voluminous wavy jet-black hair falling to just above the shoulders with a side part, dark brown eyes, athletic muscular build. Wears a fitted plain black crew-neck short-sleeve T-shirt with a small lime-green "G" logo on the left chest, black jogger track pants with a white drawstring, black sneakers. No watch, no jewellery, no beard, no glasses.

LION MASCOT (must look identical in every shot): anthropomorphic, very muscular bodybuilder lion standing upright like a man, about a head taller than the owner. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black track pants with a single lime-green stripe down each side, black wristbands with a lime-green band on both wrists, black sneakers with white soles.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back or between his legs, in every frame, from every angle, even when he turns, jumps or walks away. Exactly one head, two ears, two arms, two legs. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he talks, turns or moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His body never passes through objects or through the owner.

VOICES: The owner speaks Hindi in a natural North-Indian accent, friendly late-20s male voice, expressive. The lion speaks Hindi in a deep, warm, booming, playful and confident male voice. Lip-sync matches the words exactly. Only the character named speaks each line.
TIMELINE:
0–4s: The lion holds out a clean white printed receipt with a small square QR code in the corner and explains.
4–5s: The owner holds his own phone over the receipt; a lime-green scan line sweeps across the QR and the phone glows green with a big tick-mark shape.
5–7s: The owner turns to the camera with a smug, satisfied grin and says his line.
7–10s: The lion steps forward beside him, flexes one bicep, looks into the camera and says the closing line. Both freeze in a confident pose.
CAMERA: medium two-shot, quick cut-in feel at 4s on the phone scanning, then pull back for the final pose.
DIALOGUE:
Lion (0.5–4s): "Numbered PDF receipt, QR के साथ। Scan करो — असली है या नकली, तुरंत पता।"
Owner (5–7s): "अब कोई जुगाड़ नहीं चलेगा!"
Lion (8–9.8s): "GymYardHQ। Free। Play Store पर।"
SFX: scanner beep, success chime, bass hit on the final pose.
RULES: Keep both characters' faces, hair, mane, fur colour, clothes and the "G" logos exactly as in the reference images and the previous frame. No on-screen text, no subtitles, no captions, no watermark, no extra characters, no other people speaking. Phone screens glow lime-green with simple abstract shapes, no readable text. No background music. The owner never gets any lion features and the lion never gets human skin or human hair; the two characters never merge. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

**On-screen text:** 0s **"FAKE RECEIPT? 🧾❌"** · 11s **"UPI QR bill — GPay • PhonePe • Paytm • BHIM"** · 20s **"Numbered PDF receipt + tamper-check QR"** · 24s **"Scan = Asli ya Nakli ✅"**

---

### Campaign 3 — Register का Tower (Members + Dashboard)

**Script**

| Clip | समय | कौन | Line | Roman |
|---|---|---|---|---|
| 1 | 2–6s | Owner | "दो सौ members, छह register… और शर्मा जी का नंबर किसमें है, भगवान जाने!" | "Do sau members, chhah register… aur Sharma ji ka number kismein hai, bhagwan jaane!" |
| 1 | 8–10s | Lion | "बाहर आओ, boss।" | "Baahar aao, boss." |
| 2 | 1–5s | Lion | "सारे members एक app में — photo, plan, trainer, पूरी history।" | "Saare members ek app mein — photo, plan, trainer, poori history." |
| 2 | 6–9s | Owner → Lion | "और call करना हो?" — "Profile खोलो — call, SMS, WhatsApp, एक tap।" | "Aur call karna ho?" — "Profile kholo — call, SMS, WhatsApp, ek tap." |
| 3 | 0–4s | Lion | "App खोलते ही पता — कौन active, कौन due, कौन overdue।" | "App kholte hi pata — kaun active, kaun due, kaun overdue." |
| 3 | 5–7s | Owner | "Registers को retirement!" | "Registers ko retirement!" |
| 3 | 8–10s | Lion | "GymYardHQ — Play Store पर, free।" | "GymYardHQ — Play Store par, free." |

**Start frame — Create Image, 9:16** (attach: `design/raw-cutouts/owner-mascot-cutout.png` + `design/raw-cutouts/scenes/owner-mascot-tall.png`)
```
Use the attached images as strict character references. Keep the owner and the lion mascot exactly the same: same faces, hair, mane, fur, clothes and lime-green "G" logos. Do not redesign or restyle them. The lion has NO TAIL, exactly five fingers on each hand, and a sharp, unmirrored "G" emblem. Vertical 9:16 still frame, polished stylized 3D CGI, cinematic, dark modern gym at night with black squat racks and glowing lime-green neon strip lights, soft haze. The owner sits behind a black reception desk, centre frame, on which a tall tilting tower of six thick old paper registers and loose files is stacked, taller than his head, starting to lean toward him. He looks up at it nervously. The lion mascot stands on the far right edge of the frame in soft focus, one eyebrow raised.
```

**Clip 1 — Frames to Video, start frame = Campaign 3**
```
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, consistent with the attached reference images. Dark modern gym at night, black walls and black steel squat racks, dumbbell racks, glowing lime-green (#9EFF1F) neon strip lights, soft haze, rim light in lime green, warm key light on faces. Vertical 9:16 frame.

OWNER (must look identical in every shot): Indian man, late 20s, warm light-brown skin, clean-shaven, thick voluminous wavy jet-black hair falling to just above the shoulders with a side part, dark brown eyes, athletic muscular build. Wears a fitted plain black crew-neck short-sleeve T-shirt with a small lime-green "G" logo on the left chest, black jogger track pants with a white drawstring, black sneakers. No watch, no jewellery, no beard, no glasses.

LION MASCOT (must look identical in every shot): anthropomorphic, very muscular bodybuilder lion standing upright like a man, about a head taller than the owner. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black track pants with a single lime-green stripe down each side, black wristbands with a lime-green band on both wrists, black sneakers with white soles.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back or between his legs, in every frame, from every angle, even when he turns, jumps or walks away. Exactly one head, two ears, two arms, two legs. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he talks, turns or moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His body never passes through objects or through the owner.

VOICES: The owner speaks Hindi in a natural North-Indian accent, friendly late-20s male voice, expressive. The lion speaks Hindi in a deep, warm, booming, playful and confident male voice. Lip-sync matches the words exactly. Only the character named speaks each line.
SCENE: The owner sits behind a black reception desk under a tall, tilting tower of old paper registers and files. The lion stands at the far right edge in soft focus.
TIMELINE:
0–2s: The tower of registers topples onto the owner in a slapstick avalanche; papers fly everywhere and he disappears under the pile — a sudden, funny opening.
2–6s: His head pops out of the paper pile, hair messy, a sheet of paper stuck on his head, and he says his line to the camera, exasperated.
6–10s: The lion walks into focus, reaches in with one big paw, grabs the owner by the back of his T-shirt collar and lifts him out of the pile like a kitten, smirking, and says his line.
CAMERA: locked-off medium-wide shot for the avalanche, then a slow push-in.
DIALOGUE:
Owner (2.5–6s): "दो सौ members, छह register… और शर्मा जी का नंबर किसमें है, भगवान जाने!"
Lion (8–9.5s): "बाहर आओ, boss।"
SFX: big comic crash of books, papers fluttering, a cartoon "pop" when the owner's head appears.
RULES: Keep both characters' faces, hair, mane, fur colour, clothes and the "G" logos exactly as in the reference images and the previous frame. No on-screen text, no subtitles, no captions, no watermark, no extra characters, no other people speaking. Phone screens glow lime-green with simple abstract shapes, no readable text. No background music. The owner never gets any lion features and the lion never gets human skin or human hair; the two characters never merge. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

**Clip 2 — Extend**
```
Continue the scene seamlessly from the last frame: same place, same lighting, same characters in the same positions and clothes.
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, consistent with the attached reference images. Dark modern gym at night, black walls and black steel squat racks, dumbbell racks, glowing lime-green (#9EFF1F) neon strip lights, soft haze, rim light in lime green, warm key light on faces. Vertical 9:16 frame.

OWNER (must look identical in every shot): Indian man, late 20s, warm light-brown skin, clean-shaven, thick voluminous wavy jet-black hair falling to just above the shoulders with a side part, dark brown eyes, athletic muscular build. Wears a fitted plain black crew-neck short-sleeve T-shirt with a small lime-green "G" logo on the left chest, black jogger track pants with a white drawstring, black sneakers. No watch, no jewellery, no beard, no glasses.

LION MASCOT (must look identical in every shot): anthropomorphic, very muscular bodybuilder lion standing upright like a man, about a head taller than the owner. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black track pants with a single lime-green stripe down each side, black wristbands with a lime-green band on both wrists, black sneakers with white soles.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back or between his legs, in every frame, from every angle, even when he turns, jumps or walks away. Exactly one head, two ears, two arms, two legs. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he talks, turns or moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His body never passes through objects or through the owner.

VOICES: The owner speaks Hindi in a natural North-Indian accent, friendly late-20s male voice, expressive. The lion speaks Hindi in a deep, warm, booming, playful and confident male voice. Lip-sync matches the words exactly. Only the character named speaks each line.
TIMELINE:
0–1s: The lion sets the owner down on his feet and brushes a paper off his shoulder.
1–5s: The lion holds up a smartphone; the lime-green screen shows a simple scrolling list of rounded cards with small round profile-photo circles. He explains, proud.
5–7s: The owner, still messy-haired, asks his question.
7–10s: The lion taps the screen; a lime-green ring pulses out from the phone. He answers.
CAMERA: medium two-shot, slow arc from right to left.
DIALOGUE:
Lion (1.5–5s): "सारे members एक app में — photo, plan, trainer, पूरी history।"
Owner (5.5–6.8s): "और call करना हो?"
Lion (7.2–9.8s): "Profile खोलो — call, SMS, WhatsApp, एक tap।"
SFX: soft scroll ticks, phone call ring tone blip.
RULES: Keep both characters' faces, hair, mane, fur colour, clothes and the "G" logos exactly as in the reference images and the previous frame. No on-screen text, no subtitles, no captions, no watermark, no extra characters, no other people speaking. Phone screens glow lime-green with simple abstract shapes, no readable text. No background music. The owner never gets any lion features and the lion never gets human skin or human hair; the two characters never merge. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

**Clip 3 — Extend**
```
Continue the scene seamlessly from the last frame: same place, same lighting, same characters in the same positions and clothes.
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, consistent with the attached reference images. Dark modern gym at night, black walls and black steel squat racks, dumbbell racks, glowing lime-green (#9EFF1F) neon strip lights, soft haze, rim light in lime green, warm key light on faces. Vertical 9:16 frame.

OWNER (must look identical in every shot): Indian man, late 20s, warm light-brown skin, clean-shaven, thick voluminous wavy jet-black hair falling to just above the shoulders with a side part, dark brown eyes, athletic muscular build. Wears a fitted plain black crew-neck short-sleeve T-shirt with a small lime-green "G" logo on the left chest, black jogger track pants with a white drawstring, black sneakers. No watch, no jewellery, no beard, no glasses.

LION MASCOT (must look identical in every shot): anthropomorphic, very muscular bodybuilder lion standing upright like a man, about a head taller than the owner. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black track pants with a single lime-green stripe down each side, black wristbands with a lime-green band on both wrists, black sneakers with white soles.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back or between his legs, in every frame, from every angle, even when he turns, jumps or walks away. Exactly one head, two ears, two arms, two legs. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he talks, turns or moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His body never passes through objects or through the owner.

VOICES: The owner speaks Hindi in a natural North-Indian accent, friendly late-20s male voice, expressive. The lion speaks Hindi in a deep, warm, booming, playful and confident male voice. Lip-sync matches the words exactly. Only the character named speaks each line.
TIMELINE:
0–4s: The lion turns the phone toward the camera; the screen shows three big glowing lime-green round counters and simple bar shapes. He explains.
4–7s: The owner smiles, kicks the paper pile away with his foot; papers scatter. He says his line, laughing.
7–10s: The lion throws an arm over the owner's shoulder, both face the camera, the lion winks and says the closing line. Freeze on a proud pose.
CAMERA: medium two-shot; at 7s a slight pull-back to frame both from the waist up.
DIALOGUE:
Lion (0.5–4s): "App खोलते ही पता — कौन active, कौन due, कौन overdue।"
Owner (4.8–6.5s): "Registers को retirement!"
Lion (7.8–9.8s): "GymYardHQ — Play Store पर, free।"
SFX: papers scattering, a cheerful bass "boom" on the final pose.
RULES: Keep both characters' faces, hair, mane, fur colour, clothes and the "G" logos exactly as in the reference images and the previous frame. No on-screen text, no subtitles, no captions, no watermark, no extra characters, no other people speaking. Phone screens glow lime-green with simple abstract shapes, no readable text. No background music. The owner never gets any lion features and the lion never gets human skin or human hair; the two characters never merge. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

**On-screen text:** 0s **"200 MEMBERS. 6 REGISTERS. 💀"** · 11s **"Photo • Plan • Trainer • History"** · 17s **"Call • SMS • WhatsApp — 1 tap"** · 20s **"Active | Due | Overdue"**

---

### Campaign 4 — कितना कमाया? (Reports, expenses, trainer payouts)

**Script**

| Clip | समय | कौन | Line | Roman |
|---|---|---|---|---|
| 1 | 1–6s | Owner | "महीने के end में कोई पूछे कितना कमाया… मैं बोलता हूँ — लगभग।" | "Mahine ke end mein koi pooche kitna kamaya… main bolta hoon — lagbhag." |
| 1 | 8–10s | Lion | "लगभग? Seriously?" | "Lagbhag? Seriously?" |
| 2 | 1–5s | Lion | "लगभग नहीं, exact। कितनी fees आई, कितना ख़र्च हुआ — सब charts में।" | "Lagbhag nahi, exact. Kitni fees aayi, kitna kharcha hua — sab charts mein." |
| 2 | 6–9s | Owner → Lion | "Trainer की salary भी?" — "Trainer payouts भी track।" | "Trainer ki salary bhi?" — "Trainer payouts bhi track." |
| 3 | 1–4s | Owner | "अरे! इस महीने तो profit बढ़ा है!" | "Arre! Is mahine toh profit badha hai!" |
| 3 | 5–9s | Lion | "अपने numbers जानो। GymYardHQ — Play Store पर free।" | "Apne numbers jaano. GymYardHQ — Play Store par free." |

**Start frame — Create Image, 9:16** (attach: `design/raw-cutouts/owner-mascot-cutout.png` + `design/raw-cutouts/scenes/owner-mascot-tall.png`)
```
Use the attached images as strict character references. Keep the owner and the lion mascot exactly the same: same faces, hair, mane, fur, clothes and lime-green "G" logos. Do not redesign or restyle them. The lion has NO TAIL, exactly five fingers on each hand, and a sharp, unmirrored "G" emblem. Vertical 9:16 still frame, polished stylized 3D CGI, cinematic, dark modern gym at night with black squat racks and glowing lime-green neon strip lights, soft haze. The owner sits at a black desk, centre frame, waist-up, a stack of rupee notes and an old calculator in front of him, a pen behind his ear, looking at the camera with an awkward embarrassed half-smile. The lion mascot stands behind him on the left, one paw covering his own face in a facepalm.
```

**Clip 1 — Frames to Video, start frame = Campaign 4**
```
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, consistent with the attached reference images. Dark modern gym at night, black walls and black steel squat racks, dumbbell racks, glowing lime-green (#9EFF1F) neon strip lights, soft haze, rim light in lime green, warm key light on faces. Vertical 9:16 frame.

OWNER (must look identical in every shot): Indian man, late 20s, warm light-brown skin, clean-shaven, thick voluminous wavy jet-black hair falling to just above the shoulders with a side part, dark brown eyes, athletic muscular build. Wears a fitted plain black crew-neck short-sleeve T-shirt with a small lime-green "G" logo on the left chest, black jogger track pants with a white drawstring, black sneakers. No watch, no jewellery, no beard, no glasses.

LION MASCOT (must look identical in every shot): anthropomorphic, very muscular bodybuilder lion standing upright like a man, about a head taller than the owner. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black track pants with a single lime-green stripe down each side, black wristbands with a lime-green band on both wrists, black sneakers with white soles.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back or between his legs, in every frame, from every angle, even when he turns, jumps or walks away. Exactly one head, two ears, two arms, two legs. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he talks, turns or moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His body never passes through objects or through the owner.

VOICES: The owner speaks Hindi in a natural North-Indian accent, friendly late-20s male voice, expressive. The lion speaks Hindi in a deep, warm, booming, playful and confident male voice. Lip-sync matches the words exactly. Only the character named speaks each line.
SCENE: The owner sits at a black desk with rupee notes and an old calculator; pen behind his ear. The lion stands behind him on the left.
TIMELINE:
0–1s: The owner frantically taps the old calculator; it beeps and its tiny screen flashes, then he gives up and throws his hands up — a quick, funny opening.
1–6s: He looks into the camera with an awkward, embarrassed half-smile, shrugs and says his line slowly, stretching the last word for comedy.
6–8s: Behind him, the lion slowly drags his paw down his face in a dramatic facepalm.
8–10s: The lion leans down next to the owner's head and says his line, deadpan.
CAMERA: static medium close-up on the owner; rack focus to the lion at 6s.
DIALOGUE:
Owner (1.5–6s): "महीने के end में कोई पूछे कितना कमाया… मैं बोलता हूँ — लगभग।"
Lion (8.3–9.8s): "लगभग? Seriously?"
SFX: calculator beeps, an error buzz, a comic "facepalm" slap, a short awkward cricket chirp.
RULES: Keep both characters' faces, hair, mane, fur colour, clothes and the "G" logos exactly as in the reference images and the previous frame. No on-screen text, no subtitles, no captions, no watermark, no extra characters, no other people speaking. Phone screens glow lime-green with simple abstract shapes, no readable text. No background music. The owner never gets any lion features and the lion never gets human skin or human hair; the two characters never merge. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

**Clip 2 — Extend**
```
Continue the scene seamlessly from the last frame: same place, same lighting, same characters in the same positions and clothes.
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, consistent with the attached reference images. Dark modern gym at night, black walls and black steel squat racks, dumbbell racks, glowing lime-green (#9EFF1F) neon strip lights, soft haze, rim light in lime green, warm key light on faces. Vertical 9:16 frame.

OWNER (must look identical in every shot): Indian man, late 20s, warm light-brown skin, clean-shaven, thick voluminous wavy jet-black hair falling to just above the shoulders with a side part, dark brown eyes, athletic muscular build. Wears a fitted plain black crew-neck short-sleeve T-shirt with a small lime-green "G" logo on the left chest, black jogger track pants with a white drawstring, black sneakers. No watch, no jewellery, no beard, no glasses.

LION MASCOT (must look identical in every shot): anthropomorphic, very muscular bodybuilder lion standing upright like a man, about a head taller than the owner. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black track pants with a single lime-green stripe down each side, black wristbands with a lime-green band on both wrists, black sneakers with white soles.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back or between his legs, in every frame, from every angle, even when he turns, jumps or walks away. Exactly one head, two ears, two arms, two legs. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he talks, turns or moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His body never passes through objects or through the owner.

VOICES: The owner speaks Hindi in a natural North-Indian accent, friendly late-20s male voice, expressive. The lion speaks Hindi in a deep, warm, booming, playful and confident male voice. Lip-sync matches the words exactly. Only the character named speaks each line.
TIMELINE:
0–1s: The lion sweeps the calculator off the desk into a drawer with one paw.
1–5s: He sits on the edge of the desk and holds up a smartphone; the lime-green screen shows simple rising bar charts and a ring chart. He explains with confidence.
5–7s: The owner leans closer, interested, and asks his question.
7–10s: The lion nods and answers, tapping the screen once; the bars grow taller.
CAMERA: medium two-shot, slow push-in toward the phone.
DIALOGUE:
Lion (1.5–5s): "लगभग नहीं, exact। कितनी fees आई, कितना ख़र्च हुआ — सब charts में।"
Owner (5.5–7s): "Trainer की salary भी?"
Lion (7.5–9.5s): "Trainer payouts भी track।"
SFX: drawer slam, soft chart "rising" whoosh tones.
RULES: Keep both characters' faces, hair, mane, fur colour, clothes and the "G" logos exactly as in the reference images and the previous frame. No on-screen text, no subtitles, no captions, no watermark, no extra characters, no other people speaking. Phone screens glow lime-green with simple abstract shapes, no readable text. No background music. The owner never gets any lion features and the lion never gets human skin or human hair; the two characters never merge. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

**Clip 3 — Extend**
```
Continue the scene seamlessly from the last frame: same place, same lighting, same characters in the same positions and clothes.
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, consistent with the attached reference images. Dark modern gym at night, black walls and black steel squat racks, dumbbell racks, glowing lime-green (#9EFF1F) neon strip lights, soft haze, rim light in lime green, warm key light on faces. Vertical 9:16 frame.

OWNER (must look identical in every shot): Indian man, late 20s, warm light-brown skin, clean-shaven, thick voluminous wavy jet-black hair falling to just above the shoulders with a side part, dark brown eyes, athletic muscular build. Wears a fitted plain black crew-neck short-sleeve T-shirt with a small lime-green "G" logo on the left chest, black jogger track pants with a white drawstring, black sneakers. No watch, no jewellery, no beard, no glasses.

LION MASCOT (must look identical in every shot): anthropomorphic, very muscular bodybuilder lion standing upright like a man, about a head taller than the owner. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black track pants with a single lime-green stripe down each side, black wristbands with a lime-green band on both wrists, black sneakers with white soles.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back or between his legs, in every frame, from every angle, even when he turns, jumps or walks away. Exactly one head, two ears, two arms, two legs. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he talks, turns or moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His body never passes through objects or through the owner.

VOICES: The owner speaks Hindi in a natural North-Indian accent, friendly late-20s male voice, expressive. The lion speaks Hindi in a deep, warm, booming, playful and confident male voice. Lip-sync matches the words exactly. Only the character named speaks each line.
TIMELINE:
0–1s: The lion hands the phone to the owner.
1–4s: The owner looks at the screen; his eyes widen and he breaks into a huge delighted smile and says his line.
4–9s: The lion stands up, flexes both biceps, looks into the camera with a confident smirk and says the closing line.
9–10s: The owner jumps up and fist-bumps the lion; a small burst of lime-green sparks. Freeze.
CAMERA: medium close-up on the owner's reaction, then pull back to a two-shot at 4s.
DIALOGUE:
Owner (1.5–4s): "अरे! इस महीने तो profit बढ़ा है!"
Lion (5–9s): "अपने numbers जानो। GymYardHQ — Play Store पर free।"
SFX: cash-register "cha-ching", fist-bump impact with sparkle.
RULES: Keep both characters' faces, hair, mane, fur colour, clothes and the "G" logos exactly as in the reference images and the previous frame. No on-screen text, no subtitles, no captions, no watermark, no extra characters, no other people speaking. Phone screens glow lime-green with simple abstract shapes, no readable text. No background music. The owner never gets any lion features and the lion never gets human skin or human hair; the two characters never merge. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

**On-screen text:** 0s **"Kitna kamaya? 'Lagbhag' 🤡"** · 11s **"Fees in • Expenses out — Charts"** · 17s **"Trainer payouts ✅"** · 21s **"Know your numbers 📈"**

---

### Campaign 5 — महीने वाला Software (Free + Offline + Secure + Hindi)

**Script**

| Clip | समय | कौन | Line | Roman |
|---|---|---|---|---|
| 1 | 0–6s | Owner | "Software लिया — हर महीने पैसे। और basement में net गया… तो सब बंद!" | "Software liya — har mahine paise. Aur basement mein net gaya… toh sab band!" |
| 1 | 8–10s | Lion | "मुझे बाहर निकालो, boss!" | "Mujhe baahar nikalo, boss!" |
| 2 | 1–5s | Lion | "GymYardHQ बिना internet चलता है। कोई monthly fee नहीं, कोई ads नहीं।" | "GymYardHQ bina internet chalta hai. Koi monthly fee nahi, koi ads nahi." |
| 2 | 5–9s | Owner → Lion | "और मेरा data?" — "तुम्हारे phone में। MPIN और fingerprint lock के साथ।" | "Aur mera data?" — "Tumhare phone mein. MPIN aur fingerprint lock ke saath." |
| 3 | 1–3s | Owner | "हिंदी में भी है?" | "Hindi mein bhi hai?" |
| 3 | 3–5s | Lion | "पूरा app हिंदी में!" | "Poora app Hindi mein!" |
| 3 | 7–10s | Both (कैमरे से) | "GymYardHQ — Play Store पर, free!" | "GymYardHQ — Play Store par, free!" |

**Start frame — Create Image, 9:16** (attach: `design/raw-cutouts/owner-mascot-cutout.png` + `design/raw-cutouts/scenes/owner-mascot-tall.png` + `GymYardHQ/assets/images/Lion Mascot Bursting Through Smartphone-1.png`)
```
Use the attached images as strict character references. Keep the owner and the lion mascot exactly the same: same faces, hair, mane, fur, clothes and lime-green "G" logos. Do not redesign or restyle them. The lion has NO TAIL, exactly five fingers on each hand, and a sharp, unmirrored "G" emblem. Vertical 9:16 still frame, polished stylized 3D CGI, cinematic, dark modern gym at night with black squat racks and glowing lime-green neon strip lights, soft haze. Underground basement gym, low concrete ceiling, lime-green neon strips. The owner stands centre frame, waist-up, holding his smartphone out toward the camera in one hand, frustrated, other hand on his forehead. The phone screen is black with a cracked lime-green glow, and the lion mascot's face and fists are pushing against the inside of the screen as if about to burst out.
```

**Clip 1 — Frames to Video, start frame = Campaign 5.** Lion phone के अंदर से शुरू होता है, इसलिए यहाँ **Ingredients to Video** भी आज़मा सकते हैं (ingredients: `owner-mascot-cutout.png`, `Lion Mascot Bursting Through Smartphone-1.png`, `owner-mascot-tall.png`)।
```
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, consistent with the attached reference images. Dark modern gym at night, black walls and black steel squat racks, dumbbell racks, glowing lime-green (#9EFF1F) neon strip lights, soft haze, rim light in lime green, warm key light on faces. Vertical 9:16 frame.

OWNER (must look identical in every shot): Indian man, late 20s, warm light-brown skin, clean-shaven, thick voluminous wavy jet-black hair falling to just above the shoulders with a side part, dark brown eyes, athletic muscular build. Wears a fitted plain black crew-neck short-sleeve T-shirt with a small lime-green "G" logo on the left chest, black jogger track pants with a white drawstring, black sneakers. No watch, no jewellery, no beard, no glasses.

LION MASCOT (must look identical in every shot): anthropomorphic, very muscular bodybuilder lion standing upright like a man, about a head taller than the owner. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black track pants with a single lime-green stripe down each side, black wristbands with a lime-green band on both wrists, black sneakers with white soles.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back or between his legs, in every frame, from every angle, even when he turns, jumps or walks away. Exactly one head, two ears, two arms, two legs. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he talks, turns or moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His body never passes through objects or through the owner.

VOICES: The owner speaks Hindi in a natural North-Indian accent, friendly late-20s male voice, expressive. The lion speaks Hindi in a deep, warm, booming, playful and confident male voice. Lip-sync matches the words exactly. Only the character named speaks each line.
SCENE: Underground basement gym, low concrete ceiling, lime-green neon strips. The owner stands centre frame holding his smartphone out toward the camera. The lion mascot is trapped inside the phone screen, pressing against the glass.
TIMELINE:
0–1s: The owner shakes the phone angrily in front of the camera — a sudden, punchy opening.
1–6s: He looks at the camera, fed up, and says his line, pointing up at the ceiling.
6–8s: The phone screen cracks with glowing lime-green lightning-shaped cracks; the lion's fists push out through the glass.
8–10s: The lion bursts out of the phone in a shower of glass shards and lime-green light, landing full-size next to the owner in a power pose, and says his line with a grin. The owner stumbles back, stunned.
CAMERA: close-up on the phone and the owner's face, then a quick pull-back at 8s to a medium two-shot as the lion lands.
DIALOGUE:
Owner (1–6s): "Software लिया — हर महीने पैसे। और basement में net गया… तो सब बंद!"
Lion (8.5–10s): "मुझे बाहर निकालो, boss!"
SFX: glass cracking, a big glass-shatter explosion, deep bass "boom" on landing.
RULES: Keep both characters' faces, hair, mane, fur colour, clothes and the "G" logos exactly as in the reference images and the previous frame. No on-screen text, no subtitles, no captions, no watermark, no extra characters, no other people speaking. Phone screens glow lime-green with simple abstract shapes, no readable text. No background music. The owner never gets any lion features and the lion never gets human skin or human hair; the two characters never merge. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```
> Lion पहले ही phone से बाहर आ चुका है, इसलिए उसकी line का मज़ा है — अगर Veo उसे timing में न बोले तो line हटाकर सिर्फ़ roar / "boom" रखें।

**Clip 2 — Extend**
```
Continue the scene seamlessly from the last frame: same place, same lighting, same characters in the same positions and clothes.
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, consistent with the attached reference images. Dark modern gym at night, black walls and black steel squat racks, dumbbell racks, glowing lime-green (#9EFF1F) neon strip lights, soft haze, rim light in lime green, warm key light on faces. Vertical 9:16 frame.

OWNER (must look identical in every shot): Indian man, late 20s, warm light-brown skin, clean-shaven, thick voluminous wavy jet-black hair falling to just above the shoulders with a side part, dark brown eyes, athletic muscular build. Wears a fitted plain black crew-neck short-sleeve T-shirt with a small lime-green "G" logo on the left chest, black jogger track pants with a white drawstring, black sneakers. No watch, no jewellery, no beard, no glasses.

LION MASCOT (must look identical in every shot): anthropomorphic, very muscular bodybuilder lion standing upright like a man, about a head taller than the owner. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black track pants with a single lime-green stripe down each side, black wristbands with a lime-green band on both wrists, black sneakers with white soles.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back or between his legs, in every frame, from every angle, even when he turns, jumps or walks away. Exactly one head, two ears, two arms, two legs. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he talks, turns or moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His body never passes through objects or through the owner.

VOICES: The owner speaks Hindi in a natural North-Indian accent, friendly late-20s male voice, expressive. The lion speaks Hindi in a deep, warm, booming, playful and confident male voice. Lip-sync matches the words exactly. Only the character named speaks each line.
TIMELINE:
0–1s: The lion dusts glass shards off his shoulders and picks up the owner's phone; the screen is whole again and glowing lime-green.
1–5s: He holds the phone up; a small lime-green "no-signal" style icon shape on the screen disappears and the screen keeps glowing brightly. He explains, confident.
5–6.5s: The owner, recovering, asks his question.
6.5–10s: The lion presses his thumb on the screen; a lime-green fingerprint-shaped glow and a padlock-shape click closed on the screen. He answers.
CAMERA: medium two-shot, slow push-in.
DIALOGUE:
Lion (1.5–5s): "GymYardHQ बिना internet चलता है। कोई monthly fee नहीं, कोई ads नहीं।"
Owner (5.2–6.3s): "और मेरा data?"
Lion (6.8–9.8s): "तुम्हारे phone में। MPIN और fingerprint lock के साथ।"
SFX: glass tinkle, a satisfying lock "click", soft secure chime.
RULES: Keep both characters' faces, hair, mane, fur colour, clothes and the "G" logos exactly as in the reference images and the previous frame. No on-screen text, no subtitles, no captions, no watermark, no extra characters, no other people speaking. Phone screens glow lime-green with simple abstract shapes, no readable text. No background music. The owner never gets any lion features and the lion never gets human skin or human hair; the two characters never merge. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

**Clip 3 — Extend**
```
Continue the scene seamlessly from the last frame: same place, same lighting, same characters in the same positions and clothes.
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, consistent with the attached reference images. Dark modern gym at night, black walls and black steel squat racks, dumbbell racks, glowing lime-green (#9EFF1F) neon strip lights, soft haze, rim light in lime green, warm key light on faces. Vertical 9:16 frame.

OWNER (must look identical in every shot): Indian man, late 20s, warm light-brown skin, clean-shaven, thick voluminous wavy jet-black hair falling to just above the shoulders with a side part, dark brown eyes, athletic muscular build. Wears a fitted plain black crew-neck short-sleeve T-shirt with a small lime-green "G" logo on the left chest, black jogger track pants with a white drawstring, black sneakers. No watch, no jewellery, no beard, no glasses.

LION MASCOT (must look identical in every shot): anthropomorphic, very muscular bodybuilder lion standing upright like a man, about a head taller than the owner. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black track pants with a single lime-green stripe down each side, black wristbands with a lime-green band on both wrists, black sneakers with white soles.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back or between his legs, in every frame, from every angle, even when he turns, jumps or walks away. Exactly one head, two ears, two arms, two legs. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he talks, turns or moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His body never passes through objects or through the owner.

VOICES: The owner speaks Hindi in a natural North-Indian accent, friendly late-20s male voice, expressive. The lion speaks Hindi in a deep, warm, booming, playful and confident male voice. Lip-sync matches the words exactly. Only the character named speaks each line.
TIMELINE:
0–3s: The owner takes the phone, then asks his last question, hopeful.
3–5s: The lion beams, puts a fist on his chest proudly and answers.
5–7s: The owner laughs and high-fives the lion; lime-green sparks burst from their hands.
7–10s: Both turn to the camera side by side, the lion's arm over the owner's shoulder, and say the closing line together, then freeze in a proud pose.
CAMERA: medium two-shot; slight pull-back at 7s for the final pose.
DIALOGUE:
Owner (1–2.8s): "हिंदी में भी है?"
Lion (3.2–5s): "पूरा app हिंदी में!"
Owner and Lion together (7.5–9.8s): "GymYardHQ — Play Store पर, free!"
SFX: high-five clap with sparkle, bass hit on the final pose.
RULES: Keep both characters' faces, hair, mane, fur colour, clothes and the "G" logos exactly as in the reference images and the previous frame. No on-screen text, no subtitles, no captions, no watermark, no extra characters, no other people speaking. Phone screens glow lime-green with simple abstract shapes, no readable text. No background music. The owner never gets any lion features and the lion never gets human skin or human hair; the two characters never merge. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

**On-screen text:** 0s **"Net gaya = Software band? 📵"** · 10s **"Works OFFLINE ✅ ₹0/month"** · 15s **"No ads • No trackers"** · 17s **"MPIN + Fingerprint 🔒"** · 21s **"English + हिन्दी"**

---

## 7. Hooks — बेहतर engagement के लिए

1. **पहला frame ही action हो** — हर Clip 1 किसी झटके से शुरू होता है (register पटकना, पर्ची कैमरे पर, ढेर गिरना, phone हिलाना)। Fade-in या logo से कभी शुरू न करें।
2. **पहले 0.5s में बड़ा text** (Section 6 के on-screen text) — लोग आवाज़ बंद करके भी देखते हैं।
3. **हर ad का एक A/B hook version** बनाएँ — Clip 1 का सिर्फ़ पहला वाक्य बदलें, बाकी same:

| # | Hook A (ऊपर वाला) | Hook B |
|---|---|---|
| 1 | "बारह members की fees pending है…" | "Gym owners, सच बताओ — कितनी fees उधार में है?" |
| 2 | "ये receipt मैंने काटी ही नहीं!" | "हाथ की receipt book? गलती तुम्हारी है, boss।" |
| 3 | "दो सौ members, छह register…" | "Register ढूँढने में आधा दिन जाता है?" |
| 4 | "मैं बोलता हूँ — लगभग।" | "Gym owner का सबसे बड़ा झूठ: 'हिसाब सब दिमाग़ में है।'" |
| 5 | "हर महीने पैसे, और net गया तो सब बंद!" | "Gym software के लिए हर महीने पैसे? Seriously?" |

4. **Loop ending** — आख़िरी frame (freeze pose) ऐसा हो कि video दोबारा शुरू हो तो झटका न लगे। Reels पर replay = ज़्यादा reach।
5. **Comment bait** — caption में सवाल: "आपके gym में सबसे बड़ा सिरदर्द क्या है? 👇"

---

## 8. Editing (CapCut / Instagram Edits / Premiere)

1. तीनों clips जोड़ें (Scenebuilder से direct export या अलग-अलग download)। जोड़ पर **कोई transition नहीं** — hard cut, ताकि लगातार लगे। Extend करके बने clips पहले ही जुड़े होते हैं।
2. **Captions (सबसे ज़रूरी):** auto-captions हिंदी में, बड़े, बीच से थोड़ा नीचे, lime `#9EFF1F` + black outline। Keyword (fees, receipt, free, offline) को highlight करें।
3. **On-screen hook text:** Section 6 के text, ऊपर वाले हिस्से में — नीचे का 20% खाली रखें (Instagram/YouTube के buttons और caption वहाँ आते हैं)। Right side के like/comment buttons से भी बचें।
4. **App की असली screens:** Veo phone पर उल्टा-सीधा text बनाता है, इसलिए phone glow वाले moments पर **असली app screenshot** का छोटा pop-up (1–1.5s) overlay करें — ये trust बढ़ाता है।
5. **End card** (clips 8s के हों तो 6s, 10s के हों तो 2–3s): black background, `logo-official.webp` बीच में, नीचे "Free on Google Play" badge, ऊपर line: **"Run your gym like a pro."** + lion का `thumbs-up.webp` cutout एक side से pop-in।
6. **Music:** Instagram/YouTube की trending या royalty-free beat, dialogue के नीचे **बहुत धीमी** (−20 dB के आसपास)।
7. **Export:** 1080×1920, 30fps, MP4 (H.264)।
8. **Cover/thumbnail:** Clip 1 का सबसे expressive owner वाला frame + बड़ा hook text।

---

## 9. Post करने के लिए captions

| # | Caption | Hashtags |
|---|---|---|
| 1 | किसकी fees pending है — अब याद रखने की ज़रूरत नहीं। GymYardHQ रोज़ बताता है, WhatsApp message भी तैयार। 100% free, बिना internet। आपके gym में कितनी fees उधार है? 👇 | #GymOwner #GymManagement #GymLife #FitnessBusiness #GymYardHQ #GymOwnersIndia |
| 2 | हाथ की receipt book का ज़माना गया। UPI QR bill, numbered PDF receipt, और QR scan से असली-नकली का तुरंत पता। | #GymOwner #UPI #GymBusiness #GymYardHQ #DigitalIndia |
| 3 | 6 registers → 1 app. हर member की photo, plan, trainer और history — एक tap में call, SMS, WhatsApp। | #GymManagement #GymOwner #GymYardHQ #SmallBusinessIndia |
| 4 | "लगभग" वाला हिसाब बंद। Fees, expenses और trainer payouts — सब charts में। | #GymBusiness #GymOwner #GymYardHQ #BusinessGrowth |
| 5 | Monthly fee नहीं, internet नहीं चाहिए, ads नहीं। Data आपके phone में, MPIN + fingerprint lock। पूरा app हिंदी में भी। | #GymOwner #GymYardHQ #MadeInIndia #OfflineApp #GymManagement |

---

## 10. गड़बड़ हो तो क्या करें

| समस्या | उपाय |
|---|---|
| Owner का चेहरा / बाल बदल गए | Clip को regenerate करें। फिर भी न बने तो Extend छोड़कर पिछले clip का आख़िरी frame **start frame** बनाएँ। `[OWNER]` block एक शब्द भी बदला न हो। |
| Lion के कपड़े बदले (shorts / रंग) | Prompt में `[LION]` block के बाद जोड़ें: `He wears black track pants with a lime-green side stripe, NOT shorts.` |
| "G" logo अजीब / उल्टा | छोटी glitch editing में चल जाती है। बड़ी हो तो regenerate। |
| Clip 2 में आवाज़ बदल गई | Extend से अक्सर ठीक रहती है। फिर भी बदले तो 2–3 version बनाकर सबसे मिलती आवाज़ चुनें। |
| हिंदी उच्चारण गलत | Line Roman Hinglish में लिखें (script table में दिया है)। या line छोटी करें। |
| गलत character बोल रहा है | Line से पहले साफ़ लिखें: `The lion, not the owner, says:` |
| Line कट जाती है | शब्द कम करें — 10s clip में ~18 शब्द, 8s में ~14 शब्द तक। |
| Lion की **पूँछ (tail)** आ गई | वो clip रखें ही नहीं, regenerate करें। Flow में negative prompt का box नहीं है, इसलिए "NO TAIL" वाली line हर prompt में पहले से है। बार-बार आए तो ऐसा camera रखें कि lion की कमर के नीचे और पीछे का हिस्सा frame में न आए (`medium shot, waist-up, lion always faces the camera`)। Extend से पहले देख लें कि पिछले clip के आख़िरी frame में पूँछ न हो, वरना वो आगे भी चलती रहेगी। |
| Lion में glitch (उंगलियाँ ज़्यादा, चेहरा पिघलना, mane बदलना, "G" उल्टा) | Clip regenerate करें। Glitch वाले clip को कभी Extend न करें, गड़बड़ आगे भी जाती है। Fast हरकतें (jump, spin) glitch बढ़ाती हैं; ज़रूरत हो तो उस हिस्से में "slowly" जोड़ें। |
| Video में ऊटपटांग text/subtitles | `[RULES]` block ज़रूर हो। फिर भी आए तो regenerate या crop। |
| Lion owner से छोटा/बहुत बड़ा | `about a head taller than the owner` line `[LION]` में है — उसे न हटाएँ। |

---

## 11. Post करने से पहले checklist

- [ ] **Play Store listing live है** — ads में "Play Store पर" बोला जा रहा है। Listing अभी public न हो तो ads चालू न करें (`docs/owner-todo.md` देखें)।
- [ ] Dialogue में कोई ऐसा दावा नहीं जो app नहीं करता (Section 0)।
- [ ] **AI label:** Instagram पर "AI info" / YouTube पर "Altered or synthetic content" — जहाँ platform माँगे, on करें।
- [ ] Ads Manager / Google Ads में **Flow के जिस plan से video बना है, उसकी commercial-use शर्तें** एक बार देख लें।
- [ ] किसी दूसरे brand या competitor का नाम नहीं (Campaign 5 में सिर्फ़ "Software" बोला है)। GPay/PhonePe/Paytm का नाम सिर्फ़ "ये apps काम करते हैं" के तौर पर है, उनके logo न लगाएँ।
- [ ] Captions में spelling check, नीचे का 20% खाली।
- [ ] 320px phone पर एक बार preview — text पढ़ने लायक है।
