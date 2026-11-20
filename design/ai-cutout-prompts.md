# GymYardHQ — Mascot cutouts + Owner × Mascot artwork

वेबसाइट animations के लिए mascot के नए cutouts (बिना background वाली images), और आपकी photo के साथ mascot वाला wallpaper।

## पुराने cutouts खराब क्यों थे

पुराने cutouts काले background से काटे गए थे, इसलिए mascot का **काला tank top भी background के साथ हट गया** (छेद दिखते हैं)।
नया तरीका: mascot को **एकदम flat magenta `#FF00FF` background** पर बनवाएँ। यह रंग mascot में कहीं नहीं है (काला, lime, भूरा, क्रीम),
इसलिए script सिर्फ़ background हटाएगा, कपड़े या fur नहीं।

---

## Step-by-step

1. AI tool (Gemini / ChatGPT Image) में **mascot reference attach करें**
   (`GymYardHQ/assets/images/gymyard/mascot_crossed_arms.png` — चेहरा और tank top सबसे साफ़ इसी में हैं)।
2. नीचे से prompt कॉपी करके paste करें।
3. Image को दिए गए **file name** से इस फ़ोल्डर में save करें:
   `gymyardhq-web/design/raw-cutouts/`
4. Background हटाने के लिए **commands** (PowerShell या Git Bash में):
   ```bash
   cd d:\devfoxxProjects\devfoxxLabsProject\gymyardhq-web
   python design/tools/make_cutout.py design/raw-cutouts
   ```
   - Python में Pillow और NumPy चाहिए (आपके computer पर पहले से हैं)। किसी नए computer पर: `pip install pillow numpy`
   - Output: `assets/cutouts/<name>.png` और `.webp`, transparent background के साथ।
   - Script हर image के कोने check करता है। Background magenta नहीं हुआ तो वह image skip करके बता देता है — उसे दोबारा generate करें।
   - सिर्फ़ एक फ़ाइल: `python design/tools/make_cutout.py design/raw-cutouts/wave-hello.png`
5. फिर मुझे बता दें — मैं इन cutouts से animations बना दूँगा।

### Animation frames (दो images वाली) कैसे बनाएँ
कुछ cutouts के **दो frames** चाहिए (जैसे push-up ऊपर / नीचे)। दोनों का angle, size और जगह एक जैसी होनी चाहिए, वरना animation हिलता हुआ लगेगा।
- पहले Frame A generate करें।
- फिर **उसी chat में, उसी image पर** यह लिखें (Frame B का बदलाव prompt में दिया है):
  ```
  Edit this exact image. Change ONLY: <frame B change>. Keep the character, camera angle, framing, scale, position on the canvas, lighting and the flat #FF00FF background exactly the same.
  ```

### ChatGPT में सीधे transparent background?
ChatGPT Image "transparent background" वाली PNG दे सकता है, Gemini नहीं। फिर भी magenta + script वाला तरीका हर tool में एक जैसा और ज़्यादा साफ़ नतीजा देता है — वही इस्तेमाल करें।

### अगर गड़बड़ हो
- Mascot का चेहरा या कपड़े बदल जाएँ → prompt के अंत में जोड़ें:
  `Match the reference character exactly — copy his face, mane, fur colour, tank top and chest emblem from the attached image.`
- Background में gradient, फ़र्श या परछाईं आ जाए → दोबारा generate करें; script सिर्फ़ flat magenta हटाता है।
- Mascot के किनारों पर गुलाबी रंग दिखे → मुझे बताएँ, script की setting बदल दूँगा।

---

## A. Mascot cutouts (14 poses, 17 images)

हर prompt पूरा है — सीधे कॉपी करें।

### 1. Waving hello · `wave-hello-a` + `wave-hello-b` · 1:1
**Website में:** hero में नीचे से ऊपर आता है और हाथ हिलाता है (दो frames)।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change the pose.

Pose: full body, standing, facing the viewer with a big friendly smile, his right hand raised high and open, waving hello, palm facing the viewer, tilted slightly to the left. Left hand relaxed at his side.

Background: one perfectly flat, solid pure magenta colour #FF00FF filling the entire canvas — no gradient, no texture, no vignette, no floor, no shadow, no reflection. The whole character is inside the frame with an empty magenta margin of about 8% on every side; nothing is cropped. Crisp, clean silhouette edges; no motion blur; no glow, sparks or particles outside the body; no pink or magenta anywhere on the character.

Outfit, complete and fully opaque: solid black sleeveless tank top (not see-through, no holes), lime-green "G" emblem on the chest, black athletic shorts, black wristbands with lime trim, black training shoes.

Lighting and render: premium 3D animated-film character render, high-detail fur, soft studio key light from the front-left, a subtle lime-green (#B5F63D) rim light on the edges of the mane and shoulders. Square 1:1, 2048x2048.

Avoid: text, letters, numbers, watermarks, extra logos, other characters, props, extra fingers or limbs.
```
**Frame B (edit):** `his raised waving hand tilted slightly to the right instead of the left`

### 2. Peeking over an edge · `peek-edge` · 16:9
**Website में:** section के नीचे से झाँकता है जब आप scroll करते हैं। नीचे की सीधी कटी line, divider line के पीछे छिप जाती है।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change the pose.

Pose: he is peeking up over a wall that we cannot see. Only his head, mane, shoulders and both hands are visible; his two hands grip the bottom edge of the frame, fingers curled over it, eyes looking up and to the viewer's left with a playful, curious grin. The image is cut off with a perfectly straight horizontal line at the bottom edge, just below his chest. Centered horizontally.

Background: one perfectly flat, solid pure magenta colour #FF00FF filling the entire canvas — no gradient, no texture, no vignette, no shadow, no reflection. Empty magenta margin on the top, left and right (about 8%); the bottom edge cuts straight through his chest and hands. Crisp, clean silhouette edges; no motion blur; no glow or particles; no pink or magenta anywhere on the character.

Outfit: solid black, fully opaque sleeveless tank top with the lime-green "G" emblem visible on the chest, black wristbands with lime trim.

Lighting and render: premium 3D animated-film character render, high-detail fur, soft studio key light from the front-left, subtle lime-green (#B5F63D) rim light on the mane. Aspect ratio 16:9, 2400x1350.

Avoid: text, letters, numbers, watermarks, extra logos, a visible wall or ledge, other characters, extra fingers or limbs.
```

### 3. Punch toward camera · `punch-camera` · 1:1
**Website में:** scroll पर lime पट्टी (marquee) को तोड़ते हुए मुक्का आगे आता है।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change the pose.

Pose: dynamic power punch straight toward the camera. His right fist is in the foreground, large because of perspective, wristband visible; his left arm pulled back; determined, confident expression; upper body and hips visible, slightly leaning forward. Full arm and fist inside the frame.

Background: one perfectly flat, solid pure magenta colour #FF00FF filling the entire canvas — no gradient, no texture, no vignette, no floor, no shadow, no reflection. Empty magenta margin of about 6% on every side; the fist and mane are not cropped. Crisp, clean silhouette edges; NO motion blur, no speed lines, no impact sparks; no pink or magenta anywhere on the character.

Outfit: solid black, fully opaque sleeveless tank top (no holes), lime-green "G" emblem on the chest, black athletic shorts, black wristbands with lime trim.

Lighting and render: premium 3D animated-film character render, high-detail fur, soft studio key light from the front-left, subtle lime-green (#B5F63D) rim light on the mane and shoulders. Square 1:1, 2048x2048.

Avoid: text, letters, numbers, watermarks, extra logos, other characters, extra fingers or limbs.
```

### 4. Pointing to the right · `point-right` · 3:4
**Website में:** Google Play button की तरफ़ इशारा करता है।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change the pose.

Pose: full body, three-quarter view, standing confidently, his arm extended straight out pointing with his index finger toward the RIGHT side of the image (viewer's right), looking at the viewer with an encouraging smile, as if saying "download it here".

Background: one perfectly flat, solid pure magenta colour #FF00FF filling the entire canvas — no gradient, no texture, no vignette, no floor, no shadow, no reflection. The whole character, including the pointing hand, is inside the frame with an empty magenta margin of about 8% on every side. Crisp, clean silhouette edges; no motion blur; no glow or particles; no pink or magenta anywhere on the character.

Outfit, complete and fully opaque: solid black sleeveless tank top (no holes), lime-green "G" emblem on the chest, black athletic shorts, black wristbands with lime trim, black training shoes.

Lighting and render: premium 3D animated-film character render, high-detail fur, soft studio key light from the front-left, subtle lime-green (#B5F63D) rim light. Portrait 3:4, 1536x2048.

Avoid: text, letters, numbers, arrows, watermarks, extra logos, other characters, extra fingers or limbs.
```

### 5. Thumbs up · `thumbs-up` · 3:4
**Website में:** FAQ या "सब हो गया" जैसे संदेशों के पास pop होकर आता है।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change the pose.

Pose: full body, standing, facing the viewer, giving a big confident thumbs up with his right hand at chest height, left hand on his hip, warm smile, slight head tilt.

Background: one perfectly flat, solid pure magenta colour #FF00FF filling the entire canvas — no gradient, no texture, no vignette, no floor, no shadow, no reflection. The whole character is inside the frame with an empty magenta margin of about 8% on every side. Crisp, clean silhouette edges; no motion blur; no glow or particles; no pink or magenta anywhere on the character.

Outfit, complete and fully opaque: solid black sleeveless tank top (no holes), lime-green "G" emblem on the chest, black athletic shorts, black wristbands with lime trim, black training shoes.

Lighting and render: premium 3D animated-film character render, high-detail fur, soft studio key light from the front-left, subtle lime-green (#B5F63D) rim light. Portrait 3:4, 1536x2048.

Avoid: text, letters, numbers, watermarks, extra logos, other characters, extra fingers or limbs.
```

### 6. Double-biceps flex · `flex-biceps` · 1:1
**Website में:** Download section में ज़ोर से उछलकर आता है।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change the pose.

Pose: classic front double-biceps bodybuilding pose, both arms raised and flexed, fists near his head, big proud grin, facing the viewer, from head to mid-thigh.

Background: one perfectly flat, solid pure magenta colour #FF00FF filling the entire canvas — no gradient, no texture, no vignette, no shadow, no reflection. Empty magenta margin of about 8% on the top, left and right; both fists and the mane are not cropped. Crisp, clean silhouette edges; no motion blur; no glow or particles; no pink or magenta anywhere on the character.

Outfit: solid black, fully opaque sleeveless tank top (no holes), lime-green "G" emblem on the chest, black athletic shorts, black wristbands with lime trim.

Lighting and render: premium 3D animated-film character render, high-detail fur, soft studio key light from the front-left, subtle lime-green (#B5F63D) rim light. Square 1:1, 2048x2048.

Avoid: text, letters, numbers, watermarks, extra logos, other characters, extra fingers or limbs.
```

### 7. Showing the phone · `phone-showcase` · 3:4
**Website में:** hero या features में। फ़ोन की काली screen पर हम ऐप की **असली screen** लगाएँगे।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change the pose.

Pose: from head to waist, facing the viewer, proudly holding a modern smartphone out toward the viewer with his right hand at chest height, the phone upright and facing the camera straight on (not tilted), proud smile. The phone screen is a perfectly flat, solid black rectangle with nothing on it, edge to edge inside a thin dark-grey phone frame; his thumb does not cover the screen.

Background: one perfectly flat, solid pure magenta colour #FF00FF filling the entire canvas — no gradient, no texture, no vignette, no shadow, no reflection. Empty magenta margin of about 8% on the top, left and right. Crisp, clean silhouette edges; no motion blur; no glow; no pink or magenta anywhere on the character or the phone.

Outfit: solid black, fully opaque sleeveless tank top (no holes), lime-green "G" emblem on the chest, black wristbands with lime trim.

Lighting and render: premium 3D animated-film character render, high-detail fur, soft studio key light from the front-left, subtle lime-green (#B5F63D) rim light. Portrait 3:4, 1536x2048.

Avoid: anything shown on the phone screen, reflections on the screen, text, letters, numbers, app icons, watermarks, extra logos, other characters, extra fingers or limbs.
```

### 8. Running, side view · `run-a` + `run-b` · 16:9
**Website में:** page के नीचे एक progress bar पर दौड़ता है — जितना scroll करेंगे, उतना आगे बढ़ेगा (दो frames)।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change the pose.

Pose: full body, pure side view, running fast toward the RIGHT side of the image, mid-stride: left leg forward, right leg pushing off behind, arms swinging, determined happy face, mane flowing back. Centered on the canvas.

Background: one perfectly flat, solid pure magenta colour #FF00FF filling the entire canvas — no gradient, no texture, no vignette, no floor, no ground line, no shadow, no reflection. The whole character is inside the frame with an empty magenta margin of about 10% on every side. Crisp, clean silhouette edges; NO motion blur, no speed lines, no dust; no pink or magenta anywhere on the character.

Outfit, complete and fully opaque: solid black sleeveless tank top (no holes), lime-green "G" emblem on the chest, black athletic shorts, black wristbands with lime trim, black running shoes.

Lighting and render: premium 3D animated-film character render, high-detail fur, soft studio key light, subtle lime-green (#B5F63D) rim light. Aspect ratio 16:9, 2400x1350.

Avoid: text, letters, numbers, watermarks, extra logos, other characters, extra fingers or limbs.
```
**Frame B (edit):** `the opposite stride: right leg forward, left leg pushing off behind, arms swapped`

### 9. Push-ups · `pushup-a` + `pushup-b` · 16:9
**Website में:** footer के ऊपर push-ups करता रहता है (दो frames, धीमी loop)।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change the pose.

Pose: pure side view, doing a push-up, facing the RIGHT side of the image, body in a straight plank, arms fully extended (UP position), hands and toes resting on an invisible floor line, head up with a confident smile.

Background: one perfectly flat, solid pure magenta colour #FF00FF filling the entire canvas — no gradient, no texture, no vignette, no visible floor, no shadow under him, no reflection. The whole character is inside the frame with an empty magenta margin of about 10% on every side. Crisp, clean silhouette edges; no motion blur; no sweat drops; no pink or magenta anywhere on the character.

Outfit, complete and fully opaque: solid black sleeveless tank top (no holes), lime-green "G" emblem on the chest, black athletic shorts, black wristbands with lime trim, black training shoes.

Lighting and render: premium 3D animated-film character render, high-detail fur, soft studio key light, subtle lime-green (#B5F63D) rim light. Aspect ratio 16:9, 2400x1350.

Avoid: text, letters, numbers, watermarks, extra logos, other characters, extra fingers or limbs.
```
**Frame B (edit):** `the DOWN position of the push-up: elbows bent, chest close to the invisible floor line; hands and toes stay on exactly the same spots`

### 10. Dumbbell curl · `curl-a` + `curl-b` · 3:4
**Website में:** 404 page और loading जगहों पर, बार-बार curl करता हुआ (दो frames)।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change the pose.

Pose: full body, three-quarter front view, standing, holding a black hexagonal dumbbell in his right hand with the arm straight down by his side (bottom of the curl), left hand on his hip, focused smile.

Background: one perfectly flat, solid pure magenta colour #FF00FF filling the entire canvas — no gradient, no texture, no vignette, no floor, no shadow, no reflection. The whole character and the dumbbell are inside the frame with an empty magenta margin of about 8% on every side. Crisp, clean silhouette edges; no motion blur; no pink or magenta anywhere on the character.

Outfit, complete and fully opaque: solid black sleeveless tank top (no holes), lime-green "G" emblem on the chest, black athletic shorts, black wristbands with lime trim, black training shoes.

Lighting and render: premium 3D animated-film character render, high-detail fur, soft studio key light from the front-left, subtle lime-green (#B5F63D) rim light. Portrait 3:4, 1536x2048.

Avoid: text, letters, numbers, watermarks, extra logos, other characters, extra fingers or limbs.
```
**Frame B (edit):** `the top of the curl: his right elbow stays at his side while the dumbbell is lifted up to his shoulder, biceps flexed`

### 11. Jump & celebrate · `celebrate` · 1:1
**Website में:** "Three sets. Done." के बाद ऊपर उछलता है।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change the pose.

Pose: full body, jumping in the air in celebration, both arms raised high with fists clenched, knees slightly bent, mouth open in a joyful victory shout, facing the viewer.

Background: one perfectly flat, solid pure magenta colour #FF00FF filling the entire canvas — no gradient, no texture, no vignette, no floor, no shadow, no reflection. The whole character is inside the frame with an empty magenta margin of about 8% on every side. Crisp, clean silhouette edges; no motion blur; NO confetti, sparks or particles; no pink or magenta anywhere on the character.

Outfit, complete and fully opaque: solid black sleeveless tank top (no holes), lime-green "G" emblem on the chest, black athletic shorts, black wristbands with lime trim, black training shoes.

Lighting and render: premium 3D animated-film character render, high-detail fur, soft studio key light from the front-left, subtle lime-green (#B5F63D) rim light. Square 1:1, 2048x2048.

Avoid: text, letters, numbers, watermarks, extra logos, other characters, extra fingers or limbs.
```

### 12. Sitting on an edge · `sit-edge` · 1:1
**Website में:** footer या किसी section की ऊपरी line पर बैठा रहता है, पैर नीचे लटकते हुए।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change the pose.

Pose: three-quarter view, sitting relaxed on an invisible ledge, legs dangling down over the edge, hands resting on the ledge beside his thighs, holding a black water bottle in one hand, friendly relaxed smile looking at the viewer. The underside of his thighs forms a flat horizontal line where the invisible ledge is.

Background: one perfectly flat, solid pure magenta colour #FF00FF filling the entire canvas — no gradient, no texture, no vignette, no visible ledge or bench, no shadow, no reflection. The whole character is inside the frame with an empty magenta margin of about 8% on every side. Crisp, clean silhouette edges; no motion blur; no pink or magenta anywhere on the character.

Outfit, complete and fully opaque: solid black sleeveless tank top (no holes), lime-green "G" emblem on the chest, black athletic shorts, black wristbands with lime trim, black training shoes.

Lighting and render: premium 3D animated-film character render, high-detail fur, soft studio key light from the front-left, subtle lime-green (#B5F63D) rim light. Square 1:1, 2048x2048.

Avoid: text, letters, numbers, watermarks, extra logos, other characters, extra fingers or limbs.
```

### 13. Head avatar · `head-avatar` · 1:1
**Website में:** FAQ के जवाबों के पास छोटा avatar, और "Get the app" button के पास।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, and the top of the black tank top with the lime-green "G" emblem. Do not redesign, recolor or restyle him.

Pose: head-and-shoulders portrait, facing the viewer, a warm confident smile, slight head tilt, the full mane visible. Cropped just below the shoulders with a straight horizontal line.

Background: one perfectly flat, solid pure magenta colour #FF00FF filling the entire canvas — no gradient, no texture, no vignette, no shadow. Empty magenta margin of about 8% on the top, left and right; the whole mane is inside the frame. Crisp, clean silhouette edges; no glow; no pink or magenta anywhere on the character.

Lighting and render: premium 3D animated-film character render, high-detail fur, soft studio key light from the front-left, subtle lime-green (#B5F63D) rim light on the mane. Square 1:1, 2048x2048.

Avoid: text, letters, numbers, watermarks, extra logos, other characters.
```

### 14. Thinking · `thinking` · 3:4
**Website में:** FAQ ("Questions, answered.") के heading के पास।
```
Use the attached mascot image as a strict character reference. Keep the lion exactly the same: same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, and black wristbands with lime trim. Do not redesign, recolor or restyle him; only change the pose.

Pose: from head to waist, three-quarter view, thinking: one hand stroking his chin, the other arm folded across his chest, eyes looking up to the side with a curious, clever half-smile.

Background: one perfectly flat, solid pure magenta colour #FF00FF filling the entire canvas — no gradient, no texture, no vignette, no shadow, no reflection. Empty magenta margin of about 8% on the top, left and right. Crisp, clean silhouette edges; no motion blur; no question marks or symbols; no pink or magenta anywhere on the character.

Outfit: solid black, fully opaque sleeveless tank top (no holes), lime-green "G" emblem on the chest, black wristbands with lime trim.

Lighting and render: premium 3D animated-film character render, high-detail fur, soft studio key light from the front-left, subtle lime-green (#B5F63D) rim light. Portrait 3:4, 1536x2048.

Avoid: text, letters, numbers, symbols, watermarks, extra logos, other characters, extra fingers or limbs.
```

---

## B. Owner × Mascot — आपकी photo के साथ

**Attach करें:** (1) आपकी photo, (2) mascot reference।
**Photo कैसी हो:** सामने से ली हुई, अच्छी रोशनी, चेहरा और कंधे साफ़, बिना चश्मे/टोपी, एक ही व्यक्ति।

**Style चुनें:**
- **Option A (recommended):** आप भी mascot जैसे 3D animated style में। दोनों एक ही दुनिया के लगते हैं।
- **Option B:** आप photo-realistic और mascot 3D। Prompt में लिखी `Style A` वाली line की जगह यह डालें:
  `Render the person photo-realistically and the lion as a 3D animated character, unified by the same cinematic lighting, colour grade and lime rim light so they look like they are in the same scene.`

> AI चेहरे की पहचान हमेशा 100% नहीं रख पाता। अगर चेहरा अलग लगे, तो prompt के अंत में जोड़ें:
> `The person's face must match the attached photo exactly — same face shape, eyes, nose, jawline, skin tone and hairstyle.`

### 15. Website wallpaper · `owner-mascot-wide` · 16:9
**Website में:** hero या "Built for gym owners" section का background। Text के लिए बायाँ हिस्सा खाली रहता है।
```
Use the two attached images as strict references.
1) PERSON: keep the person's identity exactly — same face, face shape, eyes, nose, jawline, skin tone, hairstyle and facial hair. Change only their body to an athletic, aesthetic, fit physique (broad defined shoulders, toned arms, flat strong core) that looks natural and realistic, not exaggerated.
2) MASCOT: keep the lion exactly the same — same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, black wristbands with lime trim. Do not redesign or restyle him.

Scene: the proud owner of a premium modern gym at night, standing in the RIGHT 55% of the frame, shoulder to shoulder with the lion mascot. They are doing a strong fist bump between them, both smiling with confident team energy. The person wears a fitted black athletic t-shirt with a small lime-green "G" emblem on the chest and black joggers, and holds a smartphone in the other hand with a plain glowing lime screen. Behind them, softly blurred: squat racks, dumbbell rows and a few gym members training (silhouettes, no detailed faces). The LEFT 45% of the image is calm, dark, empty space fading to near-black for headline text.

Style A: both rendered as premium 3D animated-film characters in the same style, with cinematic dark gym lighting, near-black background (#0B0C10), charcoal surfaces (#13151B), and a neon lime-green (#B5F63D) rim light on both of them. High contrast, minimal, uncluttered. Aspect ratio 16:9, 3840x2160.

Avoid: any text, letters, numbers, watermarks, other brand logos, readable phone screens, extra people in the foreground, extra fingers or limbs.
```

### 16. Phone / social wallpaper · `owner-mascot-tall` · 9:16
**इस्तेमाल:** mobile hero, WhatsApp status, Instagram story, फ़ोन wallpaper। Text के लिए ऊपर का हिस्सा खाली रहता है।
```
Use the two attached images as strict references.
1) PERSON: keep the person's identity exactly — same face, face shape, eyes, nose, jawline, skin tone, hairstyle and facial hair. Change only their body to an athletic, aesthetic, fit physique (broad defined shoulders, toned arms, flat strong core) that looks natural and realistic, not exaggerated.
2) MASCOT: keep the lion exactly the same — same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, black wristbands with lime trim. Do not redesign or restyle him.

Scene: vertical shot inside a dark premium gym. In the BOTTOM 60% of the frame, the person and the lion mascot stand side by side, both with arms crossed and confident smiles, the lion's arm resting on the person's shoulder like teammates. The person wears a fitted black athletic t-shirt with a small lime-green "G" emblem and black joggers. Behind them, a big glowing lime-green circle like a weight plate. The TOP 40% is empty dark space with a soft lime glow, reserved for text.

Style A: both rendered as premium 3D animated-film characters in the same style, cinematic dark gym lighting, near-black background (#0B0C10), neon lime-green (#B5F63D) rim light on both. High contrast, minimal. Aspect ratio 9:16, 2160x3840.

Avoid: any text, letters, numbers, watermarks, other brand logos, extra people, extra fingers or limbs.
```

### 17. Owner × Mascot cutout · `owner-mascot-cutout` · 1:1
**Website में:** animation के लिए दोनों का साथ में cutout (high-five करते हुए, बीच में "pop" effect)। ऊपर वाले step 4 से background हटेगा।
```
Use the two attached images as strict references.
1) PERSON: keep the person's identity exactly — same face, face shape, eyes, nose, jawline, skin tone, hairstyle and facial hair. Change only their body to an athletic, aesthetic, fit physique that looks natural and realistic.
2) MASCOT: keep the lion exactly the same — same face, brown mane, golden-tan fur, muscular build, black sleeveless tank top with the lime-green "G" emblem on the chest, black wristbands with lime trim. Do not redesign or restyle him.

Pose: full body, the person on the left and the lion on the right, giving each other an energetic high five in the middle, both smiling at the viewer. The person wears a fitted black athletic t-shirt with a small lime-green "G" emblem, black joggers and black shoes.

Background: one perfectly flat, solid pure magenta colour #FF00FF filling the entire canvas — no gradient, no texture, no vignette, no floor, no shadow, no reflection. Both characters are fully inside the frame with an empty magenta margin of about 8% on every side. Crisp, clean silhouette edges; no motion blur; no sparks or particles; no pink or magenta anywhere on either character or their clothes.

Style A: both rendered as premium 3D animated-film characters in the same style, soft studio key light from the front-left, subtle lime-green (#B5F63D) rim light on both. Square 1:1, 2048x2048.

Avoid: text, letters, numbers, watermarks, extra logos, other characters, extra fingers or limbs.
```

---

## C. ये cutouts website पर कहाँ और कैसे animate होंगे

| Cutout | Animation | जगह |
|---|---|---|
| `wave-hello-a/b` | नीचे से उठकर आता है, फिर हाथ हिलाता है | Hero |
| `punch-camera` | scroll पर बड़ा होता हुआ marquee पट्टी तोड़ता है | Hero के नीचे |
| `peek-edge` | section की line के पीछे से झाँकता है | Features के बीच |
| `point-right` | button की तरफ़ हल्का आगे-पीछे इशारा | Download |
| `flex-biceps` | ज़ोर से उछलकर (spring) आता है | Download |
| `celebrate` | ऊपर उछलता है | How it works के बाद |
| `thinking`, `head-avatar` | धीरे fade होकर आते हैं | FAQ |
| `run-a/b` | scroll के साथ progress bar पर दौड़ता है | पूरे page के नीचे |
| `pushup-a/b` | लगातार push-up loop | Footer |
| `sit-edge` | footer की line पर बैठा | Footer |
| `curl-a/b` | curl loop | 404 page |
| `phone-showcase` | screen पर ऐप की असली UI | Hero / Features |
| `owner-mascot-*` | wallpaper + high-five pop | Hero या नया "Built for gym owners" section |

सारे animations सिर्फ़ CSS से होंगे, कोई नई library नहीं। सिर्फ़ `transform`/`opacity` animate होंगे, ताकि page smooth रहे।
जो लोग अपने फ़ोन में "reduce motion" चालू रखते हैं, उनके लिए animations अपने आप बंद रहेंगे।
