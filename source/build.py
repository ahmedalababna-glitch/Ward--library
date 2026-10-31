import sys, json
# usage: build.py scenes.js out.html config.json  (tail taken from ngt.html, NGT strings replaced)
scenes, out, cfg = sys.argv[1], sys.argv[2], json.load(open(sys.argv[3]))
head = '\n'.join(open('scene.html').read().split('\n')[:100])
ngt = open('ngt.html').read(); tail = ngt[ngt.index('const TOTAL'):]
rep = [('"NG TUBE"', json.dumps(cfg['tag'])), ('T(210, 72, "·', 'T(%d, 72, "·' % cfg['tagw']),
  ('"Nasogastric"', json.dumps(cfg['t1'])), ('"tube (NGT)"', json.dumps(cfg['t2'])),
  ('"Insertion, care and removal · step by step"', json.dumps(cfg['sub'])),
  ('"دليل خطوة بخطوة لأنبوب التغذية الأنفي المعدي"', json.dumps(cfg['ar'], ensure_ascii=False)),
  ('"Draft for review · Module 04 · RMS.NCC.MW.F.007 · follow the NGT procedural manual"', json.dumps(cfg['foot'])),
  ('"Always follow the NG tube procedural manual (Module 04)."', json.dumps(cfg['endline']))]
for a, b in rep:
    tail = tail.replace(a, b)
if 'graphic' in cfg:
    i = tail.index('g += `<g opacity="${r}" transform="translate(${1350'); j = tail.index('\n', i)
    tail = tail[:i] + cfg['graphic'] + tail[j:]
open(out, 'w').write(head + '\n' + open('common.js').read() + '\n' + open(scenes).read() + '\n' + tail)
