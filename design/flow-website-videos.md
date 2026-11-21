# GymYardHQ — Website videos (Google Flow / Veo), 15 सेकंड

दो जगह के लिए background videos:
1. **Hero** (सबसे ऊपर): desktop 16:9 और mobile 9:16, दो अलग videos।
2. **Download section** (footer से ठीक पहले, lime वाला): सिर्फ़ desktop 16:9, क्योंकि mobile पर यह scene छिपा रहता है (`hidden md:block`)।

हर video **15 सेकंड का seamless loop** है: बिना आवाज़ के, और आख़िरी frame पहले frame जैसा है, इसलिए loop में झटका नहीं दिखता। Website पर text और buttons video के ऊपर आते हैं, इसलिए हर prompt में text वाली जगह खाली रखी गई है।

सारे prompts पूरे हैं। Box copy करें और सीधे Flow में paste करें।

---

## 1. Flow में 15 सेकंड का loop कैसे बनेगा

Veo 3.1 एक बार में 8 सेकंड बनाता है, इसलिए हर video दो हिस्सों में बनेगा:

| हिस्सा | लंबाई | Flow mode | First frame | Last frame |
|---|---|---|---|---|
| **Part A** | 0–8s | **Frames to Video** | वेबसाइट की मौजूदा image (नीचे हर video में लिखी है) | खाली छोड़ें |
| **Part B** | 8–15s | **Frames to Video** | Part A का **आख़िरी frame** (save करके upload करें) | फिर से **वही मौजूदा image** — इसी से loop बंद होता है |

- Part B 8 सेकंड का बनेगा। Edit में उसका आख़िरी 1 सेकंड काट दें, तो कुल 15 सेकंड हो जाएँगे।
- अगर आपके Flow में Frames to Video में last frame का option नहीं है, तो Part B के लिए **Extend** इस्तेमाल करें। फिर edit में आख़िरी 0.5 सेकंड पर पहले frame के साथ crossfade कर दें।
- **Audio बंद रखें।** Website पर video muted चलता है। अगर Flow audio बना दे, तो export करते समय उसे हटा दें।
- हर हिस्से के 3–4 version बनाएँ। जिसमें lion सबसे stable दिखे और पूँछ न हो, वही रखें। Glitch वाले हिस्से को आगे मत बढ़ाएँ।

---

## 2. Hero — Desktop (16:9)

**First frame:** `gymyardhq-web/design/raw-cutouts/scenes/` में hero का original PNG हो तो वो, वरना `gymyardhq-web/assets/scenes/hero-desktop.webp`
**Aspect ratio:** 16:9 · **Audio:** off

**Layout:** बाएँ का 55% हिस्सा गहरा और खाली रहना चाहिए, क्योंकि वहाँ headline "Run your gym like a pro." और Play Store button आते हैं। Lion दाईं तरफ़ रहता है। हरकत धीमी और हल्की हो, ताकि ध्यान text से न हटे।

### Part A (0–8s) — Frames to Video, first frame = hero image
```text
Animate the attached first frame. Keep the exact same composition, framing, camera position, lighting and character as the image.
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, matching the attached image exactly. Dark modern gym at night, black background, blurred dumbbell rack on the left, glowing lime-green (#9EFF1F) neon ring behind the lion, lime-green rim light, soft drifting haze. Widescreen 16:9 frame.

LION MASCOT (must look identical in every frame): anthropomorphic, very muscular bodybuilder lion standing upright like a man, seen from the waist up on the right side of the frame with his arms crossed. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black wristbands with a lime-green band on both wrists.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back, in every frame, from every angle. Exactly one head, two ears, two arms. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur.

SCENE: The lion stands on the right side of the frame, arms crossed, in front of the glowing lime-green neon ring. The left 55% of the frame stays dark, calm and empty, with only soft blurred gym shapes and drifting haze.
TIMELINE:
0–3s: The lion breathes slowly and calmly; his chest rises and falls. Soft haze drifts slowly from right to left. The neon ring glows gently brighter, then softer.
3–6s: The lion slowly turns his head a little toward the left side of the frame, as if looking at something there, raises one eyebrow and his confident smirk widens slightly.
6–8s: He gives one slow, confident nod. His mane ripples gently as if in a light breeze from a gym fan.
CAMERA: locked-off static camera, no zoom, no pan, no shake.
RULES: Slow, subtle, calm and premium motion only. Arms stay crossed the whole time. Nothing moves in the left 55% of the frame except soft haze. No on-screen text, no subtitles, no captions, no logos other than the "G" on his tank top, no watermark, no other characters or people. No dialogue, no speech, no music, no sound. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

### Part B (8–15s) — Frames to Video, first frame = Part A का आख़िरी frame, last frame = hero image
```text
Animate between the attached first frame and the attached last frame. Keep the exact same composition, framing, camera position, lighting and character in both.
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, matching the attached images exactly. Dark modern gym at night, black background, blurred dumbbell rack on the left, glowing lime-green (#9EFF1F) neon ring behind the lion, lime-green rim light, soft drifting haze. Widescreen 16:9 frame.

LION MASCOT (must look identical in every frame): anthropomorphic, very muscular bodybuilder lion standing upright like a man, seen from the waist up on the right side of the frame with his arms crossed. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black wristbands with a lime-green band on both wrists.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back, in every frame, from every angle. Exactly one head, two ears, two arms. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur.

SCENE: Same as the first frame. The left 55% of the frame stays dark, calm and empty.
TIMELINE:
0–3s: The lion slowly lifts his chin with quiet pride and flexes his crossed arms once; his biceps tighten and relax.
3–6s: He slowly turns his head back to its original position, facing slightly right exactly as in the last frame, with the same confident smirk. The neon ring pulses softly once.
6–8s: He settles into the exact pose of the last frame and breathes calmly. Haze keeps drifting slowly.
CAMERA: locked-off static camera, no zoom, no pan, no shake.
RULES: Slow, subtle, calm and premium motion only. Arms stay crossed the whole time. The final frame must match the attached last frame exactly so the video loops seamlessly. Nothing moves in the left 55% of the frame except soft haze. No on-screen text, no subtitles, no captions, no logos other than the "G" on his tank top, no watermark, no other characters or people. No dialogue, no speech, no music, no sound. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

---

## 3. Hero — Mobile (9:16)

**First frame:** `gymyardhq-web/assets/scenes/hero-mobile.webp` (original PNG हो तो वो बेहतर)
**Aspect ratio:** 9:16 · **Audio:** off

**Layout:** ऊपर का 55% हिस्सा गहरा और खाली रहे, क्योंकि वहाँ headline और buttons आते हैं। Lion नीचे squat rack के आगे खड़ा है।

### Part A (0–8s) — Frames to Video, first frame = hero-mobile image
```text
Animate the attached first frame. Keep the exact same composition, framing, camera position, lighting and character as the image.
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, matching the attached image exactly. Dark modern gym at night, black squat rack with a loaded barbell behind the lion, lime-green (#9EFF1F) neon strip lights, a soft lime-green glow at the top left, lime-green rim light, soft drifting haze. Vertical 9:16 frame.

LION MASCOT (must look identical in every frame): anthropomorphic, very muscular bodybuilder lion standing upright like a man, seen from the waist up in the lower half of the frame with his arms crossed, in front of a squat rack. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black wristbands with a lime-green band on both wrists.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back, in every frame, from every angle. Exactly one head, two ears, two arms. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur.

SCENE: The lion stands in the lower half of the frame, arms crossed. The top 55% of the frame stays dark, calm and empty, with only a soft lime-green glow and drifting haze.
TIMELINE:
0–3s: The lion breathes slowly and calmly; his chest rises and falls. Haze drifts slowly upward. The neon strips flicker very softly, like real gym lights.
3–6s: The lion slowly tilts his head up a little, looking toward the top of the frame, raises one eyebrow and his confident smirk widens slightly.
6–8s: He gives one slow, confident nod. His mane ripples gently as if in a light breeze from a gym fan.
CAMERA: locked-off static camera, no zoom, no pan, no shake.
RULES: Slow, subtle, calm and premium motion only. Arms stay crossed the whole time. Nothing moves in the top 55% of the frame except soft haze and glow. No on-screen text, no subtitles, no captions, no logos other than the "G" on his tank top, no watermark, no other characters or people. No dialogue, no speech, no music, no sound. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

### Part B (8–15s) — Frames to Video, first frame = Part A का आख़िरी frame, last frame = hero-mobile image
```text
Animate between the attached first frame and the attached last frame. Keep the exact same composition, framing, camera position, lighting and character in both.
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, matching the attached images exactly. Dark modern gym at night, black squat rack with a loaded barbell behind the lion, lime-green (#9EFF1F) neon strip lights, a soft lime-green glow at the top left, lime-green rim light, soft drifting haze. Vertical 9:16 frame.

LION MASCOT (must look identical in every frame): anthropomorphic, very muscular bodybuilder lion standing upright like a man, seen from the waist up in the lower half of the frame with his arms crossed, in front of a squat rack. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident one-sided smirk. Wears a black sleeveless tank top with a large lime-green "G" emblem on the centre of the chest, black wristbands with a lime-green band on both wrists.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back, in every frame, from every angle. Exactly one head, two ears, two arms. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and smirk keep the same shape when he moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur.

SCENE: Same as the first frame. The top 55% of the frame stays dark, calm and empty.
TIMELINE:
0–3s: The lion flexes his crossed arms once with quiet pride; his biceps tighten and relax.
3–6s: He slowly lowers his head back to its original position exactly as in the last frame, with the same confident smirk. The lime-green glow at the top pulses softly once.
6–8s: He settles into the exact pose of the last frame and breathes calmly. Haze keeps drifting slowly upward.
CAMERA: locked-off static camera, no zoom, no pan, no shake.
RULES: Slow, subtle, calm and premium motion only. Arms stay crossed the whole time. The final frame must match the attached last frame exactly so the video loops seamlessly. Nothing moves in the top 55% of the frame except soft haze and glow. No on-screen text, no subtitles, no captions, no logos other than the "G" on his tank top, no watermark, no other characters or people. No dialogue, no speech, no music, no sound. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

---

## 4. Download section (footer से पहले) — Desktop (16:9)

**First frame:** `gymyardhq-web/assets/scenes/download.webp` (lion phone की screen तोड़कर बाहर, lime background)
**Aspect ratio:** 16:9 · **Audio:** off

**Layout:** इस section में बाईं तरफ़ owner और lion की high-five वाली cutout image, Play Store button और बड़ा text ("STRONGER" / "EVERY DAY.") आते हैं। इसलिए बाएँ का 45% हिस्सा **सादा lime** रहना चाहिए, उसमें कुछ नहीं हिलेगा। इस section में energy ज़्यादा रख सकते हैं, लेकिन loop फिर भी smooth होना चाहिए।

### Part A (0–8s) — Frames to Video, first frame = download image
```text
Animate the attached first frame. Keep the exact same composition, framing, camera position, lighting and character as the image.
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, matching the attached image exactly. Flat bright lime-green (#B4FA38) background with soft concentric lighter lime rings behind the phone. A large black smartphone on the right side of the frame with a shattered screen and glowing lime-green cracks. Widescreen 16:9 frame.

LION MASCOT (must look identical in every frame): anthropomorphic, very muscular bodybuilder lion bursting out of the smartphone screen from the waist up, doing a double-biceps flex with both fists raised. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident grin. Wears a black sleeveless tank top with a large lime-green "G" emblem on the chest, black wristbands with a lime-green band on both wrists.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back, in every frame, from every angle. Exactly one head, two ears, two arms. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and grin keep the same shape when he moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His lower body stays inside the phone; he never climbs fully out.

SCENE: The lion bursts out of the phone screen on the right side of the frame in a double-biceps flex. Black glass shards float in the air around the phone. The left 45% of the frame is plain flat lime-green and stays completely empty and still.
TIMELINE:
0–3s: The lion squeezes his double-biceps flex harder; his biceps pump and grow tight, then relax a little. The glass shards float and rotate slowly in mid-air, like zero gravity.
3–5s: The glowing lime-green cracks on the phone screen pulse brighter once, and a soft lime ring ripples outward from behind the phone.
5–8s: The lion's grin widens into a proud, confident smile and he gives a quick wink at the viewer, then holds the flex.
CAMERA: locked-off static camera, no zoom, no pan, no shake.
RULES: Energetic but smooth motion. The lion keeps the double-biceps flex the whole time. The phone does not move. Nothing appears or moves in the left 45% of the frame; it stays flat lime-green. No on-screen text, no subtitles, no captions, no logos other than the "G" on his tank top, no watermark, no other characters or people. No dialogue, no speech, no music, no sound. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

### Part B (8–15s) — Frames to Video, first frame = Part A का आख़िरी frame, last frame = download image
```text
Animate between the attached first frame and the attached last frame. Keep the exact same composition, framing, camera position, lighting and character in both.
STYLE: polished stylized 3D CGI animation, semi-realistic, cinematic, matching the attached images exactly. Flat bright lime-green (#B4FA38) background with soft concentric lighter lime rings behind the phone. A large black smartphone on the right side of the frame with a shattered screen and glowing lime-green cracks. Widescreen 16:9 frame.

LION MASCOT (must look identical in every frame): anthropomorphic, very muscular bodybuilder lion bursting out of the smartphone screen from the waist up, doing a double-biceps flex with both fists raised. Golden-orange fur, huge spiky reddish-brown mane, round ears, cream-white muzzle and chin tuft, black nose, amber-brown eyes, thick dark eyebrows, confident grin. Wears a black sleeveless tank top with a large lime-green "G" emblem on the chest, black wristbands with a lime-green band on both wrists.
LION HARD RULES (never break): The lion has NO TAIL — no tail anywhere, nothing hanging behind or below his back, in every frame, from every angle. Exactly one head, two ears, two arms. Each hand is a furry human-like hand with exactly five thick fingers (four fingers and one thumb) and short blunt claws — no extra, missing or merged fingers. His face, eyes, nose, muzzle and grin keep the same shape when he moves; no morphing, melting, stretching, warping or flickering. The mane keeps the same shape, size and reddish-brown colour; it never grows, shrinks, melts or changes colour. The "G" emblem stays sharp, upright, the same size and never mirrored, distorted or missing. His clothes never change, disappear or blend into his fur. His lower body stays inside the phone; he never climbs fully out.

SCENE: Same as the first frame. The left 45% of the frame stays plain flat lime-green, empty and still.
TIMELINE:
0–3s: The lion rolls his shoulders once with pride while keeping both fists up; his mane bounces slightly. The floating glass shards keep rotating slowly.
3–6s: He pumps the double-biceps flex one more time, then eases back to the exact pose, expression and grin of the last frame. A soft lime ring ripples outward from behind the phone.
6–8s: Everything settles exactly into the last frame: same pose, same shard positions, same glow.
CAMERA: locked-off static camera, no zoom, no pan, no shake.
RULES: Energetic but smooth motion. The lion keeps the double-biceps flex the whole time. The phone does not move. The final frame must match the attached last frame exactly so the video loops seamlessly. Nothing appears or moves in the left 45% of the frame; it stays flat lime-green. No on-screen text, no subtitles, no captions, no logos other than the "G" on his tank top, no watermark, no other characters or people. No dialogue, no speech, no music, no sound. Smooth, stable, natural motion with no glitches, jitter, flicker, frame jumps or sudden changes in scale.
```

---

## 5. Export (website के लिए)

1. Part A + Part B जोड़ें, आख़िरी हिस्सा काटकर 15.0 सेकंड करें, audio track हटाएँ।
2. Loop check करें: video को 3 बार लगातार चलाकर देखें कि जोड़ पर कोई झटका तो नहीं।
3. Files इन नामों से `gymyardhq-web/design/raw-videos/` में रखें (ये repo में नहीं जाएँगी, बड़ी हैं):
   - `hero-desktop.mp4`
   - `hero-mobile.mp4`
   - `download.mp4`
4. फिर मुझे बताएँ। मैं इन्हें website के लिए छोटा करके लगा दूँगा:
   - Desktop 1280px और mobile 720px, MP4 (H.264) + WebM, हर file लगभग 1.5–2 MB तक।
   - मौजूदा image **poster** रहेगी। Page उसी image के साथ तुरंत खुलेगा (LCP वही रहेगा) और video बाद में load होगा।
   - Video muted, `playsinline` और loop में चलेगा। जिन users ने "reduce motion" चालू रखा है, उन्हें सिर्फ़ image दिखेगी।
   - Download section में image पर अभी जो CSS sway चलता है, video लगने पर वो हटा दूँगा ताकि दो हरकतें आपस में न टकराएँ।

---

## 6. गड़बड़ हो तो

| समस्या | उपाय |
|---|---|
| Lion की पूँछ आ गई | वो version फेंकें और regenerate करें। उसका आख़िरी frame Part B में इस्तेमाल न करें। |
| Loop पर झटका दिखता है | Part B में last frame ज़रूर दें। फिर भी दिखे तो edit में आख़िरी 0.5 सेकंड पर पहले frame के साथ crossfade करें। |
| Text वाली खाली जगह में चीज़ें आ गईं (लोग, लाइटें, shards) | Regenerate करें। Website पर वहाँ gradient है, इसलिए हल्की haze चल जाती है, लेकिन कोई वस्तु नहीं चलेगी। |
| Lion बहुत ज़्यादा हिलता है | TIMELINE में हर हरकत से पहले "very slowly, slightly" जोड़ें। |
| Flow ने आवाज़ या music बना दिया | Export करते समय mute कर दें। Website पर वैसे भी आवाज़ नहीं चलेगी। |
