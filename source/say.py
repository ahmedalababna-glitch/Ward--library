import sys, soundfile as sf
from kokoro_onnx import Kokoro
k = Kokoro(sys.argv[1] + "/kokoro.onnx", sys.argv[1] + "/voices.bin")
s, sr = k.create(sys.argv[3], voice=sys.argv[4] if len(sys.argv) > 4 else "af_heart", speed=0.95, lang="en-us")
sf.write(sys.argv[2], s, sr); print(len(s) / sr)
