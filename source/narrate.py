# usage: narrate.py name  -> name_v.html (durations fitted) + name_audio.wav
import sys, json, re, subprocess, soundfile as sf, numpy as np
sys.path.insert(0, sys.argv[2])
from kokoro_onnx import Kokoro
name, tts = sys.argv[1], sys.argv[2]
k = Kokoro(tts + "/kokoro.onnx", tts + "/voices.bin")
texts = json.load(open(name + "_narr.json"))
html = open(name + ".html").read()
# original durations
js = subprocess.run(["node", "-e", f"""const {{chromium}}=require('playwright');(async()=>{{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.cwd()+'/{name}.html');console.log(JSON.stringify(await p.evaluate(()=>SCENES.map(s=>s.dur))));await b.close()}})()"""], capture_output=True, text=True).stdout
durs = json.loads(js); assert len(durs) == len(texts), (len(durs), len(texts))
LEAD = 0.6; clips = []; sr = 24000
for i, t in enumerate(texts):
    s, sr = k.create(t, voice="af_heart", speed=1.0, lang="en-us")
    clips.append(s); durs[i] = max(durs[i], round(LEAD + len(s) / sr + 0.9, 2))
total = sum(durs); out = np.zeros(int((total + 1) * sr), dtype=np.float32); acc = 0
for d, s in zip(durs, clips):
    a = int((acc + LEAD) * sr); out[a:a + len(s)] += s; acc += d
sf.write(name + "_audio.wav", out[:int(total * sr)], sr)
html = html.replace("const TOTAL", "const DURS = %s; SCENES.forEach((s, i) => s.dur = DURS[i]);\nconst TOTAL" % json.dumps(durs), 1)
open(name + "_v.html", "w").write(html); print(name, total)
