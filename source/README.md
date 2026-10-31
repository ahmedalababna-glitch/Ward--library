# Animation source

Each video is an HTML page that draws SVG frames with `window.drawFrame(t)`. Playwright screenshots
every frame at 25 fps and pipes them into ffmpeg. The voice-over is generated with the free
Kokoro TTS model (voice `af_heart`).

## Files

- `<name>_scenes.js` – the scenes: duration, step number, title, bullets, drawing, `crit: true` for a CRITICAL POINT.
- `<name>_narr.json` – one voice-over sentence block per scene, in the same order as the scenes.
- `<name>.json` – header tag, title lines, subtitle and footer for the video.
- `scene.html` – shared head (palette and drawing helpers); `common.js` – shared helpers;
  `cd_common.js` – chest drain drawings (prepend it to `cdi_scenes.js` / `cdr_scenes.js`).
- `ngt.html` – the NG tube page, also used as the shared tail (text panel, timeline, title and end cards).
- `build.py`, `narrate.py`, `render.js`, `stills.js`, `say.py` – build tools.

Names: ngt, cath, peg, seiz, cvc, lp, trach, cdi, cdr, tpn.

## Rebuild one video

Requirements: Node with Playwright and Chromium, Python 3 with `kokoro-onnx` and `soundfile`,
ffmpeg, and the Kokoro model files `kokoro.onnx` and `voices.bin`
(from github.com/thewh1teagle/kokoro-onnx releases) in a folder `TTS`.

```
python3 build.py cath_scenes.js cath.html cath.json   # chest drain: cat cd_common.js cdi_scenes.js > cdi_full.js first
python3 narrate.py cath TTS                            # -> cath_v.html (timed to the voice) + cath_audio.wav
IN=cath_v.html OUT=cath_v.mp4 node render.js           # silent video
ffmpeg -i cath_v.mp4 -i cath_audio.wav -c:v copy -c:a aac -b:a 160k \
  -af loudnorm=I=-16:TP=-1.5 -shortest -movflags +faststart cath_final.mp4
ffmpeg -i cath_final.mp4 -vf "scale=960:540,fps=15" -c:v libx264 -crf 32 -tune animation \
  -c:a aac -b:a 32k -ac 1 -movflags +faststart ../videos/cath.mp4   # web version
```

`IN=cath.html node stills.js` makes still previews to check the layout before a full render.

## Final timed pages (current videos)

`final/<name>_v.html` are the exact pages used for the current videos, with the realistic equipment
drawings and the scene timings already matched to the voice-over. To change a drawing, edit the
page and re-render it directly (no need to rerun build.py or narrate.py):

```
IN=final/cath_v.html OUT=cath_v.mp4 node render.js
```
then mux with the existing `cath_audio.wav` as above. To change the voice-over text, use the
`_scenes.js` / `_narr.json` route and copy the drawing functions across from the final page.
