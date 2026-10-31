// ---------- shared chest drain drawings ----------
const SCENES = [];
const add = (dur, o) => SCENES.push(Object.assign({ dur }, o));

// three-chamber drainage unit at (x,y): collection, water seal (air leak monitor), suction control
function drainUnit(x, y, o = {}) {
  const col = o.collect ?? 0.3, seal = o.seal ?? 1, suc = o.suction ?? 0, bub = o.bubble || 0, t = o.t || 0, lab = o.labels ?? 1;
  let g = `<g transform="translate(${x} ${y})"><rect x="0" y="0" width="420" height="460" rx="24" fill="#F7FAFB" stroke="#8DA9B4" stroke-width="5"/>`;
  // collection chamber
  g += `<rect x="20" y="40" width="160" height="400" rx="10" fill="#fff" stroke="#B9C3C8" stroke-width="3"/><rect x="24" y="${436 - 390 * col}" width="152" height="${390 * col}" rx="8" fill="#D9867A" opacity=".85"/>`;
  for (let i = 1; i < 8; i++) g += `<line x1="150" y1="${40 + i * 50}" x2="176" y2="${40 + i * 50}" stroke="#8E9CA2" stroke-width="2"/>`;
  // water seal
  g += `<rect x="200" y="40" width="90" height="400" rx="10" fill="#fff" stroke="#B9C3C8" stroke-width="3"/><rect x="204" y="${436 - 120 * seal}" width="82" height="${120 * seal}" rx="8" fill="#9FD3EA"/><line x1="200" y1="316" x2="290" y2="316" stroke="${C.teal}" stroke-width="3" stroke-dasharray="8 6"/>`;
  if (bub > 0) for (let i = 0; i < 5; i++) { const k = (t * 1.3 + i / 5) % 1; g += `<circle cx="${230 + (i % 2) * 24}" cy="${430 - k * 110}" r="${6 + (i % 3) * 2}" fill="#fff" stroke="#3B8DB5" stroke-width="2" opacity="${bub * (1 - k * 0.6)}"/>`; }
  // suction control
  g += `<rect x="310" y="40" width="90" height="400" rx="10" fill="#fff" stroke="#B9C3C8" stroke-width="3"/><rect x="314" y="${436 - 240 * suc}" width="82" height="${240 * suc}" rx="8" fill="#BFE3F2"/>`;
  if (lab) g += `${T(100, 30, "Collection", { size: 22, w: 700, anchor: "middle", fill: C.muted })}${T(245, 30, "Water seal", { size: 22, w: 700, anchor: "middle", fill: C.muted })}${T(355, 30, "Suction", { size: 22, w: 700, anchor: "middle", fill: C.muted })}`;
  return g + `</g>`;
}
// simple chest outline with a drain in the side
function chest(o = {}) {
  let g = `<path d="M 120 120 C 160 60, 460 60, 500 120 L 540 640 C 420 700, 200 700, 80 640 Z" fill="${C.skinT}" stroke="${C.skinEdge}" stroke-width="3"/>`;
  g += `<path d="M 170 180 C 150 300, 150 470, 200 560 C 250 580, 290 560, 290 500 L 290 200 C 270 150, 200 150, 170 180 Z" fill="#F6D3CC" stroke="#D98C82" stroke-width="3" opacity=".8"/><path d="M 450 180 C 470 300, 470 470, 420 560 C 370 580, 330 560, 330 500 L 330 200 C 350 150, 420 150, 450 180 Z" fill="#F6D3CC" stroke="#D98C82" stroke-width="3" opacity=".8"/>`;
  if (o.tube ?? 1) g += `<path d="M 470 420 C 520 430, 560 470, ${o.tx ?? 640} ${o.ty ?? 520}" fill="none" stroke="#F4F0E6" stroke-width="20" stroke-linecap="round"/><path d="M 470 420 C 520 430, 560 470, ${o.tx ?? 640} ${o.ty ?? 520}" fill="none" stroke="#B9AE8E" stroke-width="2"/><path d="M 470 420 L 400 400" stroke="#F4F0E6" stroke-width="16" stroke-linecap="round" opacity="${o.inside ?? 1}"/>`;
  if (o.dress) g += `<rect x="440" y="380" width="80" height="80" rx="10" fill="#fff" stroke="#B8C4C9" stroke-width="3" opacity="${o.dress}"/>`;
  return g;
}
function grid4(items, lt) {
  return items.map(([h, s], i) => { const x = 60 + (i % 2) * 510, y = 90 + Math.floor(i / 2) * 340, p = seg(lt, 0.3 + i * 0.5, 0.8 + i * 0.5);
    return `<g opacity="${p}" transform="translate(${x} ${y + (1 - p) * 30})"><rect width="490" height="310" rx="24" fill="${C.tealSoft}"/><circle cx="245" cy="115" r="62" fill="${C.teal}"/>${T(245, 132, String(i + 1), { size: 52, w: 800, anchor: "middle", fill: "#fff" })}${T(245, 235, h, { size: 40, w: 800, anchor: "middle" })}${T(245, 278, s, { size: 28, anchor: "middle", fill: C.muted })}</g>`; }).join("");
}
function record(title, rows, lt) {
  let g = `<rect x="140" y="60" width="840" height="740" rx="24" fill="${C.bg}"/><rect x="390" y="30" width="340" height="60" rx="14" fill="${C.ink}"/>${T(560, 72, title, { size: 28, w: 700, anchor: "middle", fill: "#fff" })}`;
  rows.forEach(([h, v], i) => { const y = 140 + i * 92, p = seg(lt, 0.3 + i * 0.5, 0.7 + i * 0.5); g += `${T(190, y + 30, h, { size: 26, fill: C.muted })}<line x1="490" y1="${y + 42}" x2="940" y2="${y + 42}" stroke="${C.line}" stroke-width="3"/><g opacity="${p}">${T(490, y + 30, v, { size: 28, w: 700, fill: C.teal })}</g>`; });
  return g;
}
