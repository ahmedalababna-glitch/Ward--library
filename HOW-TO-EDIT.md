# How to update the Ward Procedure Library

The site is served from this repository by GitHub Pages. Every change saved here goes live in 1–2 minutes at
https://ahmedalababna-glitch.github.io/Ward--library/

## 1. Change a quiz or test question (easy, from a phone)

1. Open `quiz-data.js` in this repository and tap the pencil (Edit).
2. Each question looks like this:
   `["Question?", ["Option A", "Option B", "Option C", "Option D"], 1, "Short reason"]`
   The number is the correct option, counted from 0 (0 = first, 1 = second, 2 = third, 3 = fourth).
3. Change the text, keep the quotes and commas, then tap **Commit changes**.

`QUIZ` holds the 4 questions under each video. `TEST` holds the 10 before/after questions.

## 2. Change a step name in the step list

Open `index.html`, search for the step text (for example `Measure and mark`), edit it and commit.
This changes the list next to the video, not the video itself.

## 3. Replace a video

If a procedure changes, the simplest route is a new video with the same file name:

1. Make the new video (phone recording, or edit the old one in a free editor such as CapCut).
2. Keep it under 25 MB (720p is plenty).
3. In this repository open the `videos` folder, then **Add file → Upload files**, upload it with the
   same name (for example `ngt.mp4`) and commit. It replaces the old one.

Video names: ngt, cath, peg, seiz, cvc, lp, trach, cdi, cdr, tpn (all `.mp4`).

## 4. Rebuild the animations (needs a computer or an AI assistant)

The `source` folder holds everything used to make the animated videos: the scenes for each
procedure (`<name>_scenes.js`), the voice-over text (`<name>_narr.json`) and the build scripts.
See `source/README.md`. Any developer, or an AI coding assistant, can change one scene and
re-render the video from these files.

---

## بالعربي باختصار

- **تغيير سؤال:** افتح `quiz-data.js` ← القلم ← غيّر النص ← Commit changes. الرقم بعد الخيارات هو الجواب الصح (0 = الأول، 1 = الثاني…).
- **تغيير فيديو:** صوّر أو عدّل الفيديو الجديد، وارفعه بنفس الاسم داخل فولدر `videos` (Add file ← Upload files).
- **تعديل الأنيميشن نفسه:** الملفات الأصلية بفولدر `source`، وأي مبرمج أو أداة ذكاء اصطناعي بتقدر تعدّل المشهد وتطلع الفيديو من جديد.
