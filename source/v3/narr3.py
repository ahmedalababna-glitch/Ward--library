import sys, json, soundfile as sf, numpy as np
sys.path.insert(0, sys.argv[2]); from kokoro_onnx import Kokoro
name, tts, speed, voice = sys.argv[1], sys.argv[2], float(sys.argv[3]), sys.argv[4]
k = Kokoro(tts + "/kokoro.onnx", tts + "/voices.bin")
texts = json.load(open(name + "_narr.json")); LEAD, TAIL = 0.8, 1.1
clips, durs, speech = [], [], []
for t in texts:
    s, sr = k.create(t, voice=voice, speed=speed, lang="en-us"); clips.append(s)
    speech.append(round(len(s) / sr, 2)); durs.append(round(LEAD + len(s) / sr + TAIL, 2))
total = sum(durs); out = np.zeros(int((total + 1) * sr), dtype=np.float32); acc = 0
for d, s in zip(durs, clips):
    a = int((acc + LEAD) * sr); out[a:a + len(s)] += s; acc += d
sf.write(name + "_audio3.wav", out[:int(total * sr)], sr)
json.dump({"durs": durs, "speech": speech, "lead": LEAD}, open(name + "_t3.json", "w")); print(total, durs)
