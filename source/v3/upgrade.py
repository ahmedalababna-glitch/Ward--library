import json, re, sys
d = sys.argv[1]; name = sys.argv[2]
h = open(f"{d}/{name}_base.html").read()
t3 = json.load(open(f"{d}/{name}_t3.json"))
def rep(a, b, cnt=1):
    global h
    assert h.count(a) >= 1, a[:80]
    h = h.replace(a, b) if cnt == 0 else h.replace(a, b, cnt)

# timings
h = re.sub(r"const DURS = \[[^\]]*\]; SCENES.forEach\(\(s, i\) => s.dur = DURS\[i\]\);", "SCENES.forEach(s => s.design = s.dur); const DURS = %s; const SPEECH = %s; const LEAD = %s;" % (json.dumps(t3["durs"]), json.dumps(t3["speech"]), t3["lead"]) + " SCENES.forEach((s, i) => s.dur = DURS[i]);", h)

DEFS = r'''
const DEFS = `<defs>
<linearGradient id="bgG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7FAFA"/><stop offset="1" stop-color="#E7EFF1"/></linearGradient>
<linearGradient id="amberV" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#C98C3C"/><stop offset=".3" stop-color="#F6CF8A"/><stop offset=".45" stop-color="#FFF0CF"/><stop offset=".7" stop-color="#E5AE5E"/><stop offset="1" stop-color="#A9742C"/></linearGradient>
<linearGradient id="amberH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C98C3C"/><stop offset=".3" stop-color="#F6CF8A"/><stop offset=".45" stop-color="#FFF0CF"/><stop offset=".7" stop-color="#E5AE5E"/><stop offset="1" stop-color="#A9742C"/></linearGradient>
<linearGradient id="glassH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".25" stop-color="#EAF3F7"/><stop offset=".6" stop-color="#F8FBFC"/><stop offset="1" stop-color="#D5E2E8"/></linearGradient>
<linearGradient id="tubeH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9D8DE"/><stop offset=".35" stop-color="#FFFFFF"/><stop offset="1" stop-color="#B7C9D0"/></linearGradient>
<linearGradient id="skinG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6D2B5"/><stop offset=".5" stop-color="#EBB792"/><stop offset="1" stop-color="#CF9671"/></linearGradient>
<radialGradient id="bladR" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#FCE6E1"/><stop offset=".6" stop-color="#F2C3BA"/><stop offset="1" stop-color="#DE9A8F"/></radialGradient>
<radialGradient id="ballR" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".5" stop-color="#E3F1FA"/><stop offset="1" stop-color="#A9CBE0"/></radialGradient>
<linearGradient id="bagG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E8F0F3"/><stop offset=".2" stop-color="#FFFFFF"/><stop offset=".8" stop-color="#F2F7F9"/><stop offset="1" stop-color="#D3E1E7"/></linearGradient>
<linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<filter id="sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#1B3A40" flood-opacity=".16"/></filter>
<filter id="cardSh" x="-5%" y="-5%" width="110%" height="115%"><feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#1B3A40" flood-opacity=".14"/></filter>
</defs>`;
'''
rep("const SCENES = [];", DEFS + "const SCENES = [];")

# richer equipment
rep('fill="#E8B76A" stroke="#B07F35" stroke-width="2.5"/><line x1="554"', 'fill="url(#amberV)" stroke="#A9742C" stroke-width="2.5"/><line x1="554"')
rep('fill="#DDEFF9" fill-opacity=".85" stroke="#7FA9C6" stroke-width="3"/>', 'fill="url(#ballR)" fill-opacity=".95" stroke="#7FA9C6" stroke-width="3"/>')
rep('fill="#EAF4FB" stroke="#7FA9C6" stroke-width="4"/>', 'fill="url(#ballR)" stroke="#7FA9C6" stroke-width="4"/>')
rep('<rect x="0" y="0" width="230" height="64" rx="10" fill="#F4F9FB" stroke="#8FA3AA" stroke-width="3"/>`;', '<rect x="0" y="0" width="230" height="64" rx="10" fill="url(#glassH)" stroke="#8FA3AA" stroke-width="3"/>`;')
rep("return g + `${T(115, -24, label", "g += `<rect x=\"6\" y=\"6\" width=\"218\" height=\"10\" rx=\"5\" fill=\"#fff\" opacity=\".8\"/>`;\n  return g + `${T(115, -24, label")
rep('Z" fill="#E8B76A" stroke="#B07F35" stroke-width="2.5"/>`;\n}', 'Z" fill="url(#amberH)" stroke="#A9742C" stroke-width="2.5"/>`;\n}')
rep('rx="12" fill="#E8B76A" stroke="#B07F35" stroke-width="2.5"/><line x1="140"', 'rx="12" fill="url(#amberH)" stroke="#A9742C" stroke-width="2.5"/><line x1="140"')
rep('rx="14" fill="#E8B76A" stroke="#B07F35" stroke-width="2.5"/>${foleyEnd', 'rx="14" fill="url(#amberH)" stroke="#A9742C" stroke-width="2.5"/>${foleyEnd')
rep('rx="15" fill="#E3EEF2" stroke="#8DA9B4" stroke-width="2"/>', 'rx="15" fill="url(#tubeH)" stroke="#8DA9B4" stroke-width="2"/>')
# bladder: gradient wall + inner wall line + rugae
rep('Z" fill="#F6D3CC" stroke="#D98C82" stroke-width="4"/>`;\n  if (o.urine)', 'Z" fill="url(#bladR)" stroke="#C97B70" stroke-width="5"/><path d="M 400 175 C 400 112, 720 112, 720 175 C 738 290, 666 382, 596 400 L 524 400 C 454 382, 382 290, 400 175 Z" fill="none" stroke="#D99288" stroke-width="2" stroke-dasharray="3 9" opacity=".7"/>`;\n  if (o.urine)')
rep('<rect x="532" y="418" width="56" height="322" fill="#FBE6E2"/>', '<rect x="532" y="418" width="56" height="322" fill="#FBE6E2"/><rect x="532" y="418" width="10" height="322" fill="#F1C9C1" opacity=".7"/><rect x="578" y="418" width="10" height="322" fill="#F1C9C1" opacity=".7"/>')
# urine bag: gradient + gloss
rep('fill="#F7FAFB" fill-opacity=".9" stroke="#8DA9B4" stroke-width="3"/>`;', 'fill="url(#bagG)" fill-opacity=".95" stroke="#8DA9B4" stroke-width="3"/>`;')
rep("return g + `</g>`;\n}\n\nadd(", "g += `<path d=\"M 16 14 v 160\" stroke=\"#fff\" stroke-width=\"10\" stroke-linecap=\"round\" opacity=\".7\"/>`;\n  return g + `</g>`;\n}\n\nadd(")
# thigh
rep('Z" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3"/>${T(80, 640, "Thigh"', 'Z" fill="url(#skinG)" stroke="${C.skinEdge}" stroke-width="3"/><path d="M 60 340 C 400 320, 760 330, 1100 360" stroke="#fff" stroke-width="14" opacity=".18" fill="none" stroke-linecap="round"/>${T(80, 640, "Thigh"')
# glove: soft shading
rep('return `<g transform="translate(${x} ${y}) rotate(${rot + 90}) scale(${s})">${f}', 'return `<g filter="url(#sh)" transform="translate(${x} ${y}) rotate(${rot + 90}) scale(${s})">${f}')

# camera focus on the key moments (card coords)
rep('add(9, { step: 6, crit: true,', 'add(9, { step: 6, crit: true,')
rep('add(8, { step: 5, title', 'add(8, { focus: [[0.8, 5.2, 420, 400, 1.18]], step: 5, title')
rep('add(9, { step: 11, title', 'add(9, { focus: [[0.6, 3.6, 560, 360, 1.15]], step: 11, title')

# ---- text panel: bullets appear with the voice, current one highlighted ----
new_tp = r'''function textPanel(s, lt, si) {
  const p = seg(lt, 0, 0.6);
  let g = `<g opacity="${p}" transform="translate(${(1 - p) * 50} 0)">`;
  g += `<circle cx="1294" cy="200" r="46" fill="${s.warn ? C.red : C.teal}" filter="url(#sh)"/>${T(1294, 216, s.warn ? "!" : String(s.step), { size: 44, w: 800, anchor: "middle", fill: "#fff" })}`;
  let y = 330;
  s.title.forEach(l => { g += T(1248, y, l, { size: 62, w: 800 }); y += 72; });
  y += 40;
  if (s.crit) { const pul = 1 + 0.04 * Math.sin(lt * 4) * (1 - seg(lt, 3, 4)); g += `<g transform="translate(1512 200) scale(${pul})"><rect x="-150" y="-26" width="300" height="52" rx="26" fill="${C.red}" filter="url(#sh)"/>${T(0, 10, "CRITICAL POINT", { size: 26, w: 800, fill: "#fff", anchor: "middle", ls: 2 })}</g>`; }
  g += `</g>`;
  const n = s.bullets.length, sp = SPEECH[si] || 6, t0 = LEAD + Math.min(1.6, sp * 0.18);
  const at = i => t0 + (sp - (t0 - LEAD)) * i / n;
  window.SYNC = { n, at, rt: lt };
  s.bullets.forEach((b, i) => {
    const q = seg(lt, at(i), at(i) + 0.45), act = lt >= at(i) && (i === n - 1 || lt < at(i + 1));
    const lines = b.split("\n"), hgt = lines.length * 46;
    g += `<g opacity="${q}" transform="translate(${(1 - q) * 24} 0)">`;
    if (act) g += `<rect x="1230" y="${y - 40}" width="640" height="${hgt + 16}" rx="14" fill="${s.warn ? C.redSoft : C.tealSoft}" opacity="${seg(lt, at(i), at(i) + 0.3)}"/><rect x="1230" y="${y - 40}" width="8" height="${hgt + 16}" rx="4" fill="${s.warn ? C.red : C.teal}"/>`;
    g += `<rect x="1252" y="${y - 22}" width="14" height="14" rx="3" fill="${s.warn ? C.red : C.teal}"/>`;
    lines.forEach(l => { g += T(1284, y, l, { size: 34, w: act ? 700 : 500, fill: act ? C.ink : "#3C5459" }); y += 46; });
    g += `</g>`; y += 26;
  });
  return g;
}'''
h = re.sub(r"function textPanel\(s, lt\) \{.*?\n\}\nfunction chrome", lambda m: new_tp + "\nfunction chrome", h, flags=re.S)

# ---- frame: background, card shadow, slow push-in camera, focus zooms, softer transitions ----
new_df = r'''window.drawFrame = (t) => {
  let acc = 0, s = SCENES[SCENES.length - 1], lt = 0, si = SCENES.length - 1;
  for (let i = 0; i < SCENES.length; i++) { const sc = SCENES[i]; if (t < acc + sc.dur) { s = sc; lt = t - acc; si = i; break; } acc += sc.dur; }
  if (t >= TOTAL) lt = s.dur;
  let g = DEFS + `<rect width="1920" height="1080" fill="url(#bgG)"/>`;
  if (s.kind === "title") g += titleScene(lt, false);
  else if (s.kind === "end") g += titleScene(lt, true);
  else {
    const tp = textPanel(s, lt, si);
    g += chrome(s);
    // camera: slow push-in, plus zoom to the key moment
    let z = 1 + 0.035 * clamp(lt / s.dur), cx = 560, cy = 420;
    (s.focus || []).forEach(([a, b, fx, fy, fz]) => { const k = seg(lt, a, a + 0.9) * (1 - seg(lt, b, b + 0.9)); z *= lerp(1, fz, k); cx = lerp(cx, fx, k); cy = lerp(cy, fy, k); });
    const tx = 560 - cx * z, ty = 420 - cy * z;
    const ci = seg(lt, 0, 0.55);
    g += `<defs><clipPath id="card"><rect x="0" y="0" width="1120" height="840" rx="28"/></clipPath></defs>`;
    g += `<g transform="translate(${60 + 560 * (1 - lerp(0.96, 1, ci))} ${130 + 420 * (1 - lerp(0.96, 1, ci))}) scale(${lerp(0.96, 1, ci)})" opacity="${ci}"><rect width="1120" height="840" rx="28" fill="#fff" filter="url(#cardSh)"/><g clip-path="url(#card)"><rect width="1120" height="840" fill="#fff"/><g transform="translate(${tx} ${ty}) scale(${z})"><g filter="url(#sh)">${s.draw(Math.max(0, lt - 0.4) * s.design / Math.max(s.design, (SPEECH[si] || 0) + 0.6))}</g></g></g><rect width="1120" height="840" rx="28" fill="none" stroke="${C.line}" stroke-width="2"/></g>`;
    g += tp;
  }
  const fout = clamp((s.dur - lt) / 0.4), fin = clamp(lt / 0.25);
  const veil = 1 - Math.min(fin, fout);
  if (veil > 0.001) g += `<rect width="1920" height="1080" fill="#EEF4F5" opacity="${veil}"/>`;
  document.getElementById("root").innerHTML = g;
};'''
h = re.sub(r"window\.drawFrame = \(t\) => \{.*?\n\};", lambda m: new_df, h, flags=re.S)
open(f"{d}/{name}_v3.html", "w").write(h); print("ok")

# ---- second pass: icons in checklist cards, nicer gloves, no focus on step 5 ----
h = open(f"{d}/{name}_v3.html").read()
h = h.replace("add(8, { focus: [[0.8, 5.2, 420, 400, 1.18]], step: 5, title", "add(8, { step: 5, title")
ICONS = r'''
const ICON = {
  order: `<rect x="-20" y="-24" width="40" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="5"/><rect x="-10" y="-30" width="20" height="12" rx="3" fill="currentColor"/><path d="M -10 -4 h 20 M -10 8 h 14" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>`,
  child: `<circle cx="0" cy="-14" r="11" fill="currentColor"/><path d="M -16 26 C -16 4, 16 4, 16 26 Z" fill="currentColor"/>`,
  people: `<circle cx="-12" cy="-12" r="9" fill="currentColor"/><circle cx="12" cy="-12" r="9" fill="currentColor"/><path d="M -28 22 C -28 2, 4 2, 4 22 Z M -4 22 C -4 2, 28 2, 28 22 Z" fill="currentColor"/>`,
  doctor: `<path d="M -14 -24 v 18 a 14 14 0 0 0 28 0 v -18" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M 0 8 v 8 a 10 10 0 0 0 20 0 v -6" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="20" cy="6" r="7" fill="currentColor"/>`,
  kit: `<rect x="-24" y="-14" width="48" height="36" rx="6" fill="none" stroke="currentColor" stroke-width="5"/><path d="M -10 -14 v -8 h 20 v 8" fill="none" stroke="currentColor" stroke-width="5"/><path d="M 0 -4 v 18 M -9 5 h 18" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>`,
  talk: `<path d="M -24 -20 h 48 v 30 h -26 l -12 12 v -12 h -10 Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M -12 -6 h 24" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>`,
  curtain: `<path d="M -26 -24 h 52" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M -22 -24 C -18 0, -26 10, -18 26 M -8 -24 C -4 0, -12 10, -4 26 M 22 -24 C 18 0, 26 10, 18 26" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>`,
  heart: `<path d="M 0 22 C -30 2, -26 -22, -10 -22 C -2 -22, 0 -14, 0 -12 C 0 -14, 2 -22, 10 -22 C 26 -22, 30 2, 0 22 Z" fill="currentColor"/>`,
  shield: `<path d="M 0 -26 L 22 -18 V 0 C 22 14, 10 22, 0 26 C -10 22, -22 14, -22 0 V -18 Z" fill="none" stroke="currentColor" stroke-width="5"/><path d="M -9 0 l 6 7 l 12 -14" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>`,
  eye: `<path d="M -26 0 C -14 -18, 14 -18, 26 0 C 14 18, -14 18, -26 0 Z" fill="none" stroke="currentColor" stroke-width="5"/><circle r="7" fill="currentColor"/>`,
  drop: `<path d="M 0 -24 C 12 -8, 18 2, 18 10 a 18 18 0 0 1 -36 0 C -18 2, -12 -8, 0 -24 Z" fill="currentColor"/>`
};
function iconFor(t) { t = t.toLowerCase();
  const m = [["order", "order"], ["indication", "order"], ["child", "child"], ["infant", "child"], ["gender", "people"], ["doctor", "doctor"], ["physician", "doctor"], ["equipment", "kit"], ["consent", "talk"], ["explain", "talk"], ["reassur", "talk"], ["privacy", "curtain"], ["dignity", "heart"], ["accountab", "shield"], ["meatus", "eye"], ["fluid", "drop"]];
  for (const [k, v] of m) if (t.includes(k)) return ICON[v]; return null; }
function checkCards(rows, lt, x = 80, w = 960, h = 140, gap = 170, top = 110, col = C.green) {
  return rows.map(([hd, sub], i) => {
    let y = top + i * gap, p = seg(lt, 0.3 + i * 0.6, 0.8 + i * 0.6), tk = seg(lt, 0.9 + i * 0.6, 1.2 + i * 0.6);
    if (window.SYNC && rows.length === window.SYNC.n && !window.SYNC.off) { const a = window.SYNC.at(i), r = window.SYNC.rt; p = seg(r, a - 0.2, a + 0.3); tk = seg(r, a + 0.4, a + 0.8); }
    const ic = iconFor(hd + " " + (sub || "")), red = col === C.red;
    const left = ic ? `<circle cx="72" cy="${h / 2}" r="44" fill="${red ? "#F6CFCB" : C.tealSoft}"/><g transform="translate(72 ${h / 2})" color="${red ? C.red : C.teal}">${ic}</g>` : (red ? cross(70, h / 2, 22, tk) : tick(70, h / 2, 0.6 + 0.6 * tk, tk));
    const right = ic ? (red ? cross(w - 60, h / 2, 18, tk) : tick(w - 60, h / 2, 0.5 + 0.5 * tk, tk)) : "";
    return `<g opacity="${p}" transform="translate(${x + (1 - p) * 30} ${y})"><rect width="${w}" height="${h}" rx="20" fill="${red ? C.redSoft : "#F5F9FA"}" stroke="${C.line}" stroke-width="2"/><rect width="8" height="${h}" rx="4" fill="${red ? C.red : C.teal}" opacity="${tk}"/>${T(150, sub ? 62 : 82, hd, { size: 36, w: 800 })}${sub ? T(150, 104, sub, { size: 27, fill: C.muted }) : ""}${left}${right}</g>`;
  }).join("");
}
'''
h = re.sub(r"function checkCards\(rows, lt.*?\n\}\n", lambda m: ICONS, h, count=1, flags=re.S)
# nicer gloved hand: tapered fingers, rounded palm, sheen, cuff
GLOVE = r'''function glove(x, y, rx = 60, ry = 36, rot = 0, col = C.glove, edge = C.gloveEdge) {
  const s = rx / 60;
  const fing = [[-27, -60, 13, 44, -6], [-9, -72, 14, 56, -2], [9, -70, 14, 54, 2], [26, -56, 12, 40, 7]].map(([fx, fy, w, hh, r]) => `<path transform="rotate(${r} ${fx} -20)" d="M ${fx - w / 2} -18 L ${fx - w / 2 + 1} ${fy + w / 2} A ${w / 2 - 1} ${w / 2 - 1} 0 0 1 ${fx + w / 2 - 1} ${fy + w / 2} L ${fx + w / 2} -18 Z" fill="${col}" stroke="${edge}" stroke-width="2.5"/>`).join("");
  return `<g filter="url(#sh)" transform="translate(${x} ${y}) rotate(${rot + 90}) scale(${s})">${fing}<path d="M -40 -6 C -58 -16, -70 -30, -64 -40 C -58 -48, -46 -38, -34 -26" fill="${col}" stroke="${edge}" stroke-width="2.5"/><path d="M -38 -26 C -36 -40, 38 -40, 38 -24 L 34 30 C 28 46, -28 46, -34 30 Z" fill="${col}" stroke="${edge}" stroke-width="2.5"/><path d="M -26 -24 C -10 -30, 10 -30, 28 -22" fill="none" stroke="${edge}" stroke-width="2" opacity=".5"/><path d="M -30 46 L 30 46 L 34 74 L -34 74 Z" fill="${col}" stroke="${edge}" stroke-width="2.5"/><path d="M -32 52 h 64" stroke="${edge}" stroke-width="2" opacity=".5"/><path d="M -22 -20 C -24 0, -20 20, -12 32" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity=".35"/></g>`;
}
'''
h = re.sub(r"function glove\(x, y, rx.*?\n\}\n", lambda m: GLOVE, h, count=1, flags=re.S)
open(f"{d}/{name}_v3.html", "w").write(h); print("ok2")
