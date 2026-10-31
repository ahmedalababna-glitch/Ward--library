// ---------- Central line scenes (Module 04, RMS.NCC.MW.F.001) ----------
const SCENES = [];
const add = (dur, o) => SCENES.push(Object.assign({ dur }, o));

// front view of right upper chest with an inserted multi-lumen catheter
function chestSite(o = {}) {
  let g = `<rect x="0" y="0" width="1120" height="840" fill="${C.skinT}"/><path d="M 0 0 H 1120 V 840 H 0 Z" fill="url(#cg)"/><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.skinT}"/><stop offset="1" stop-color="${C.skin}"/></linearGradient></defs>`;
  g += `<path d="M 80 300 C 300 250, 520 250, 760 300" fill="none" stroke="${C.skinEdge}" stroke-width="5" opacity=".5"/>${T(90, 280, "Clavicle", { size: 24, fill: C.muted })}`;
  const out = o.out || 0; // 0 = fully in, 1 = removed
  g += `<path d="M 500 380 L ${lerp(500, 380, 1 - out)} ${lerp(380, 560, 1 - out)}" stroke="#fff" stroke-width="10" stroke-dasharray="14 10" opacity="${0.6 * (1 - out)}"/>`;
  const hx = 500 + out * 260, hy = 380 - out * 160;
  g += `<g transform="translate(${hx} ${hy}) rotate(-35)"><rect x="0" y="-12" width="120" height="24" rx="10" fill="#fff" stroke="#B9C3C8" stroke-width="3"/><rect x="40" y="-30" width="50" height="60" rx="10" fill="#E5ECEF" stroke="#B9C3C8" stroke-width="3"/>`;
  [["#8B5A2B", -18], ["#3B6FD6", 0], ["#EDEDED", 18]].forEach(([c, dy]) => { g += `<line x1="120" y1="${dy * 0.3}" x2="250" y2="${dy * 2.2}" stroke="${c}" stroke-width="12" stroke-linecap="round"/><rect x="246" y="${dy * 2.2 - 14}" width="40" height="28" rx="6" fill="${c}" stroke="#8E9CA2" stroke-width="2"/>`; });
  g += `</g>`;
  if (o.dress) g += `<rect x="420" y="320" width="${200}" height="150" rx="16" fill="#fff" opacity="${0.55 * o.dress}" stroke="#B9C3C8" stroke-width="3" stroke-opacity="${o.dress}"/>`;
  return g;
}
function seqCards(st, lt, t0 = 0.5, step = 0.8, y = 260, hi = -1) {
  let g = ""; const w = 1040 / st.length;
  st.forEach(([h, s], i) => { const x = 40 + i * w, p = seg(lt, t0 + i * step, t0 + 0.5 + i * step), on = i === hi;
    g += `<g opacity="${p}" transform="translate(${x} ${y + (1 - p) * 30})"><rect width="${w - 22}" height="270" rx="22" fill="${on ? C.redSoft : C.bg}"/><circle cx="${(w - 22) / 2}" cy="70" r="40" fill="${on ? C.red : C.teal}"/>${T((w - 22) / 2, 86, String(i + 1), { size: 40, w: 800, anchor: "middle", fill: "#fff" })}${T((w - 22) / 2, 170, h, { size: 28, w: 800, anchor: "middle" })}${s.split("\n").map((l, k) => T((w - 22) / 2, 210 + k * 30, l, { size: 23, anchor: "middle", fill: C.muted })).join("")}</g>`;
    if (i < st.length - 1) g += `<g opacity="${p}">${arrow(x + w - 21, y + 135, x + w - 3, y + 135, C.muted, 4)}</g>`; });
  return g;
}
function grid4(items, lt) {
  return items.map(([h, s], i) => { const x = 60 + (i % 2) * 510, y = 90 + Math.floor(i / 2) * 340, p = seg(lt, 0.3 + i * 0.5, 0.8 + i * 0.5);
    return `<g opacity="${p}" transform="translate(${x} ${y + (1 - p) * 30})"><rect width="490" height="310" rx="24" fill="${C.tealSoft}"/><circle cx="245" cy="115" r="62" fill="${C.teal}"/>${T(245, 132, String(i + 1), { size: 52, w: 800, anchor: "middle", fill: "#fff" })}${T(245, 235, h, { size: 40, w: 800, anchor: "middle" })}${T(245, 278, s, { size: 28, anchor: "middle", fill: C.muted })}</g>`; }).join("");
}

add(4.5, { kind: "title" });
add(8, { step: 1, title: ["Know the", "central lines"], bullets: ["Indications, types and\ninsertion sites", "PICC, tunnelled,\nnon-tunnelled, implantable port", "Indications for\nCVP monitoring"], draw: lt => grid4([["PICC", "Inserted in the arm"], ["Tunnelled", "Long-term, under the skin"], ["Non-tunnelled", "Short-term, e.g. neck"], ["Implantable port", "Under the skin, accessed"]], lt) });
add(8, { step: 2, title: ["Know the", "risks"], bullets: ["Aseptic technique in\nevery phase", "Central line bundle\nreduces CRBSI", "Air embolism, occlusion,\nsite infection", "Spot early signs and act"], draw: lt => checkCards([["Aseptic technique", "Insertion, maintenance and removal"], ["Central line bundle", "Reduces bloodstream infection (CRBSI)"], ["Air embolism", "Never leave a lumen open to air"], ["Occlusion · site infection", "Spot early signs, act, report"]], lt, 80, 960, 140, 170, 110, C.teal) });
add(9, { step: 3, title: ["Prepare to", "assist insertion"], bullets: ["Check the physician's order", "Explain; consent obtained", "Equipment and transducer set", "Hand hygiene, privacy,\nposition"], draw: lt => checkCards([["Physician's order checked", ""], ["Explained · consent obtained", "Family if the patient is unconscious"], ["Equipment assembled", ""], ["Transducer set prepared", ""], ["Privacy and positioning", ""], ["Hand hygiene", ""]], lt, 80, 960, 104, 122, 50) });
add(9, { step: 4, crit: true, title: ["Full sterile", "barrier"], bullets: ["Hand hygiene", "Sterile gloves, gown,\nhead cover, mask", "Face shield or eye protection", "Start the central line bundle"], draw: lt => {
  let g = `<g transform="translate(560 470)"><circle cx="0" cy="-230" r="80" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3"/><path d="M -170 -120 Q 0 -170 170 -120 L 200 330 L -200 330 Z" fill="#7FB5C9" stroke="#5E93A8" stroke-width="3"/>`;
  const cap = seg(lt, 1.0, 1.6), mask = seg(lt, 1.8, 2.4), sh = seg(lt, 2.6, 3.2), gl = seg(lt, 3.4, 4.0);
  g += `<path d="M -84 -250 Q 0 -350 84 -250 Z" fill="#7FB5C9" opacity="${cap}"/><rect x="-60" y="-215" width="120" height="60" rx="18" fill="#DCEFF5" stroke="#9DB9C3" stroke-width="3" opacity="${mask}"/><rect x="-96" y="-290" width="192" height="150" rx="40" fill="#E8F6FB" opacity="${0.45 * sh}" stroke="#9DB9C3" stroke-width="3" stroke-opacity="${sh}"/>`;
  g += `<g opacity="${gl}"><ellipse cx="-230" cy="120" rx="48" ry="34" fill="#E7F0D8" stroke="#9AB37A" stroke-width="3"/><ellipse cx="230" cy="120" rx="48" ry="34" fill="#E7F0D8" stroke="#9AB37A" stroke-width="3"/></g></g>`;
  g += callout(230, 150, "Head cover", cap, C.teal) + callout(890, 230, "Mask", mask, C.teal) + callout(890, 140, "Face shield", sh, C.teal) + callout(890, 680, "Sterile gloves + gown", gl, C.teal);
  return g + callout(560, 800, "Central line bundle started", seg(lt, 4.6, 5.2), C.green);
} });
add(8, { step: 5, crit: true, title: ["Sterile", "set-up"], bullets: ["Pour chlorhexidine 2% in\n70% alcohol, and NS 0.9%,\ninto the tray", "Open extra items onto\nthe sterile drape", "Sterile technique throughout"], draw: lt => {
  const f1 = seg(lt, 0.8, 2.2), f2 = seg(lt, 2.6, 4.0);
  let g = `<rect x="100" y="140" width="920" height="560" rx="24" fill="#CFE7D8" stroke="#7FAF92" stroke-width="4"/>${T(560, 190, "Sterile drape", { size: 28, w: 800, anchor: "middle", fill: "#2F6E4A" })}`;
  g += `<rect x="200" y="260" width="420" height="300" rx="20" fill="#fff" stroke="#B9C3C8" stroke-width="3"/><rect x="230" y="300" width="160" height="220" rx="14" fill="#F3F6F7"/><rect x="430" y="300" width="160" height="220" rx="14" fill="#F3F6F7"/>`;
  g += `<rect x="234" y="${516 - 200 * f1}" width="152" height="${200 * f1}" rx="10" fill="#E9B8D8" opacity=".8"/><rect x="434" y="${516 - 200 * f2}" width="152" height="${200 * f2}" rx="10" fill="#BFE3F2" opacity=".9"/>`;
  g += T(310, 600, "Chlorhexidine 2%", { size: 24, w: 700, anchor: "middle" }) + T(310, 630, "+ 70% alcohol", { size: 22, anchor: "middle", fill: C.muted }) + T(510, 600, "NS 0.9%", { size: 24, w: 700, anchor: "middle" });
  const it = seg(lt, 4.4, 5.4);
  g += `<g opacity="${it}" transform="translate(${(1 - it) * 80} 0)"><rect x="680" y="280" width="260" height="40" rx="12" fill="#fff"/><rect x="680" y="350" width="200" height="40" rx="12" fill="#fff"/><rect x="680" y="420" width="240" height="60" rx="12" fill="#fff"/><rect x="680" y="510" width="180" height="40" rx="12" fill="#fff"/></g>`;
  return g;
} });
add(10, { step: 6, title: ["During and", "after insertion"], bullets: ["Monitor vital signs\nand heart rhythm", "Clean site; let antiseptic\nair-dry completely", "Secure; transparent dressing", "Chest X-ray; reposition;\nhand hygiene"], draw: lt => {
  let g = chestSite({ dress: seg(lt, 4.6, 5.6) });
  const dry = seg(lt, 1.6, 4.2);
  g += `<g opacity="${seg(lt, 1.0, 1.6) * (1 - seg(lt, 4.4, 4.8))}"><circle cx="520" cy="395" r="${90}" fill="#E9B8D8" opacity="${0.5 * (1 - dry)}"/>${stopwatch2(850, 520, dry)}</g>`;
  g += callout(850, 380, "Air-dry completely", seg(lt, 1.8, 2.2) * (1 - seg(lt, 4.4, 4.8)), C.teal);
  g += callout(760, 600, "Transparent dressing", seg(lt, 5.4, 5.8), C.teal) + callout(760, 690, "Then: chest X-ray", seg(lt, 6.6, 7.0), C.red);
  return g;
} });
add(8, { step: 7, title: ["Watch the", "site"], bullets: ["Bleeding or haematoma", "Every 15–30 minutes", "For the first 2 hours"], draw: lt => {
  const x0 = 100, x1 = 1020, y = 470, p = seg(lt, 1.0, 5.0);
  let g = T(560, 200, "Check for bleeding or haematoma", { size: 36, w: 800, anchor: "middle", fill: C.teal }) + T(560, 250, "every 15–30 minutes for the first 2 hours", { size: 30, anchor: "middle", fill: C.muted });
  g += `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${C.line}" stroke-width="12" stroke-linecap="round"/><line x1="${x0}" y1="${y}" x2="${lerp(x0, x1, p)}" y2="${y}" stroke="${C.teal}" stroke-width="12" stroke-linecap="round"/>`;
  for (let i = 0; i <= 8; i++) { const x = lerp(x0, x1, i / 8), on = p >= i / 8 - 0.001; g += `<circle cx="${x}" cy="${y}" r="${i % 4 ? 14 : 20}" fill="${on ? C.teal : "#C3D0D3"}"/>${i % 4 === 0 ? T(x, y + 60, (i * 15) + " min", { size: 24, anchor: "middle", fill: C.muted }) : ""}`; }
  return g;
} });
add(9, { step: 8, title: ["Flush the", "line"], bullets: ["Use a 10 ml syringe:\nlower pressure", "Pulsatile push–pause", "Clamp with positive pressure", "Flush every lumen regularly"], draw: lt => {
  const pp = clamp((lt - 1.0) / 4.0), push = Math.floor(pp * 6) / 6 + (pp * 6 % 1 < 0.5 ? (pp * 6 % 1) * 2 / 6 : 1 / 6);
  let g = `<g transform="translate(140 300)"><rect x="0" y="0" width="460" height="110" rx="14" fill="#fff" stroke="${C.ink}" stroke-width="5"/><rect x="${10 + 300 * Math.min(1, push)}" y="8" width="${Math.max(0, 300 * (1 - Math.min(1, push)))}" height="94" fill="#BFE3F2"/><rect x="${10 + 300 * Math.min(1, push)}" y="4" width="12" height="102" fill="${C.ink}"/><rect x="${22 + 300 * Math.min(1, push)}" y="46" width="${200}" height="18" fill="${C.ink}"/><rect x="-60" y="40" width="60" height="30" fill="${C.ink}"/>${T(230, -24, "10 ml syringe · NS", { size: 30, w: 800, anchor: "middle", fill: C.teal })}</g>`;
  for (let i = 0; i < 6; i++) { const on = pp * 6 > i; g += `<rect x="${140 + i * 80}" y="520" width="${50}" height="${on ? 70 : 20}" rx="8" fill="${on ? C.teal : "#C3D0D3"}"/>`; }
  g += T(380, 650, "push · pause · push · pause", { size: 30, w: 700, anchor: "middle", fill: C.muted });
  g += callout(850, 560, "Clamp with positive pressure", seg(lt, 5.4, 5.9), C.teal) + callout(850, 650, "Flush every lumen", seg(lt, 6.4, 6.9), C.teal);
  return g;
} });
add(10, { step: 9, crit: true, title: ["Blood sample:", "prepare"], bullets: ["Hand hygiene, gloves,\naseptic technique, sterile field", "Stop IV fluids 1 minute\n(confirm with the physician)", "Clamp the lumen\n(brown port preferred)", "Clean 30 s with CHG 2% +\nIPA 70%; dry 30–60 s"], draw: lt => seqCards([["Prepare", "Hand hygiene\ngloves\nsterile field"], ["Stop fluids", "1 minute\nconfirm with\ndoctor"], ["Clamp", "Brown port\npreferred"], ["Remove cap", ""], ["Clean port", "30 s scrub\ndry 30–60 s"]], lt, 0.5, 0.9, 280) });
add(10, { step: 10, title: ["Blood sample:", "draw and flush"], bullets: ["Discard 5 ml first\n(dead space)", "New 10 ml syringe:\ndraw the samples", "Flush with NS, positive\npressure; reclamp"], draw: lt => seqCards([["Discard", "5 ml\n(6 × line volume)"], ["Sample", "New 10 ml syringe"], ["Flush", "10 ml NS\npositive pressure"], ["Reclamp", ""]], lt, 0.5, 1.0, 280) });
add(9, { step: 11, crit: true, title: ["Heparin lock", "for Vascath"], bullets: ["Saline flush first", "Then heparin, as per\nthe manufacturer", "Prevents clots when\nnot in use", "Keeps the lumen patent"], draw: lt => seqCards([["Saline flush", "Clear the lumen"], ["Heparin lock", "As per\nmanufacturer"], ["Patent lumen", "No clot while\nnot in use"]], lt, 0.5, 1.2, 280, 1) + callout(560, 700, "Always saline first, then heparin", seg(lt, 4.4, 4.9), C.red) });
add(11, { step: 12, title: ["Remove the", "line safely"], bullets: ["Position the patient and\ntime with breathing", "Hand hygiene, equipment;\nremove dressing and sutures", "Steady, constant pull", "Press 5–10 min; dressing;\ncheck the catheter is intact"], draw: lt => {
  const out = seg(lt, 2.6, 5.4);
  let g = chestSite({ out });
  g += callout(780, 120, "Air embolism risk: follow positioning and breathing", seg(lt, 0.6, 1.2) * (1 - seg(lt, 2.4, 2.7)), C.red);
  g += callout(780, 120, "Steady, constant pull", seg(lt, 2.8, 3.2) * (1 - seg(lt, 5.4, 5.7)), C.teal);
  const pr = seg(lt, 5.8, 6.4);
  g += `<g opacity="${pr}"><circle cx="500" cy="380" r="60" fill="#fff" stroke="${C.teal}" stroke-width="6"/>${T(500, 392, "5–10", { size: 30, w: 800, anchor: "middle", fill: C.teal })}</g>` + callout(500, 500, "Direct pressure 5–10 min", pr, C.teal);
  g += callout(560, 640, "Check length: tip intact", seg(lt, 7.2, 7.6), C.green);
  return g;
} });
add(7, { step: 13, title: ["Care for the", "person"], bullets: ["Protect the sterile field", "Communicate with patient,\nfamily and team", "Stay calm in emergencies;\nbe accountable"], draw: lt => checkCards([["Vigilant asepsis", "Sterile field every time"], ["Clear communication", "Patient, family, team"], ["Calm and accountable", "In urgent complications"]], lt, 80, 960, 160, 220, 140) });
add(9, { step: 14, title: ["Document and", "report"], bullets: ["Indication and insertion", "Dressing, flush and\ncap changes", "Site signs; report\ncomplications promptly", "Educate; hand over"], draw: lt => {
  const rows = [["Indication", "CVP monitoring · drugs"], ["Inserted", "30/10 · R IJ · 3 lumen"], ["X-ray", "Position confirmed"], ["Dressing", "Transparent · 30/10"], ["Flush / caps", "All lumens flushed 10:00"], ["Site", "No redness or swelling"], ["Handover", "Line status given"]];
  let g = `<rect x="140" y="60" width="840" height="740" rx="24" fill="${C.bg}"/><rect x="390" y="30" width="340" height="60" rx="14" fill="${C.ink}"/>${T(560, 72, "Central line record", { size: 28, w: 700, anchor: "middle", fill: "#fff" })}`;
  rows.forEach(([h, v], i) => { const y = 140 + i * 92, p = seg(lt, 0.3 + i * 0.5, 0.7 + i * 0.5); g += `${T(190, y + 30, h, { size: 26, fill: C.muted })}<line x1="490" y1="${y + 42}" x2="940" y2="${y + 42}" stroke="${C.line}" stroke-width="3"/><g opacity="${p}">${T(490, y + 30, v, { size: 28, w: 700, fill: C.teal })}</g>`; });
  return g;
} });
add(5, { kind: "end" });

function stopwatch2(x, y, p) {
  const a = p * 2 * Math.PI;
  return `<g transform="translate(${x} ${y})"><circle r="70" fill="#fff" stroke="${C.ink}" stroke-width="6"/><path d="M 0 0 L 0 -60 A 60 60 0 ${a > Math.PI ? 1 : 0} 1 ${60 * Math.sin(a)} ${-60 * Math.cos(a)} Z" fill="${C.tealSoft}"/><circle r="6" fill="${C.ink}"/></g>`;
}
