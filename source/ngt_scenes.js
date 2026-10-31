// ---------- NG tube scenes (Module 04, RMS.NCC.MW.F.007) ----------
const SCENES = [];
const add = (dur, o) => SCENES.push(Object.assign({ dur }, o));

// side-view patient: head facing right, chest and stomach below
const NOSE = { x: 505, y: 255 }, EAR = { x: 330, y: 228 }, XIPH = { x: 492, y: 610 };
const TUBE_PATH = "M 498 262 C 450 258, 400 250, 372 262 C 350 274, 352 300, 352 330 L 352 420 C 352 500, 356 560, 372 640 C 384 690, 420 710, 455 712";
function patient(o = {}) {
  let g = `<defs><linearGradient id="skinP" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.skinB}"/><stop offset="1" stop-color="${C.skinT}"/></linearGradient></defs>`;
  g += `<path d="M 200 430 C 260 404, 430 404, 540 436 L 640 840 L 110 840 Z" fill="#CFE3EA" stroke="#9DB9C3" stroke-width="3"/>`; // gown / chest
  g += `<path d="M 300 360 L 300 440 L 420 440 L 410 350 Z" fill="url(#skinP)" stroke="${C.skinEdge}" stroke-width="3"/>`; // neck
  g += `<path d="M 250 90 C 330 38, 455 58, 474 150 L 482 205 L 508 254 L 474 270 L 480 298 L 466 322 C 458 346, 426 352, 404 346 L 300 380 C 230 340, 196 200, 250 90 Z" fill="url(#skinP)" stroke="${C.skinEdge}" stroke-width="3"/>`;
  g += `<ellipse cx="${EAR.x}" cy="${EAR.y - 10}" rx="22" ry="34" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3"/>`;
  g += `<path d="M 444 196 q 14 -6 26 0" stroke="${C.skinEdge}" stroke-width="4" fill="none" stroke-linecap="round"/>`; // eye
  if (o.anatomy) {
    g += `<g opacity="${o.anatomy}"><path d="M 498 262 C 450 258, 400 250, 372 262 C 350 274, 352 300, 352 330 L 352 420 C 352 500, 356 560, 372 640" fill="none" stroke="#E7A9A0" stroke-width="26" stroke-linecap="round" opacity=".55"/>
      <path d="M 372 640 C 360 690, 420 760, 520 740 C 600 724, 600 660, 540 640 C 500 628, 440 650, 372 640 Z" fill="#F2B8B0" stroke="#D98C82" stroke-width="3"/>
      ${T(560, 790, "Stomach", { size: 24, w: 700, fill: "#B0554A" })}${T(165, 520, "Oesophagus", { size: 22, fill: C.muted, anchor: "end" })}</g>`;
  }
  return g;
}
function tubeAlong(p, col = "#F3E6B3") {
  return `<path d="${TUBE_PATH}" fill="none" stroke="${col}" stroke-width="12" stroke-linecap="round" pathLength="1" stroke-dasharray="${p} 2"/><path d="${TUBE_PATH}" fill="none" stroke="#C9B36A" stroke-width="2" pathLength="1" stroke-dasharray="${p} 2" opacity=".7"/>`;
}
function checkCards(rows, lt, x = 80, w = 960, h = 140, gap = 170, top = 110, col = C.green) {
  return rows.map(([hd, sub], i) => {
    const y = top + i * gap, p = seg(lt, 0.3 + i * 0.6, 0.8 + i * 0.6), tk = seg(lt, 0.9 + i * 0.6, 1.2 + i * 0.6);
    return `<g opacity="${p}" transform="translate(${x + (1 - p) * 30} ${y})"><rect width="${w}" height="${h}" rx="20" fill="${col === C.red ? C.redSoft : C.bg}"/>${T(150, sub ? 62 : 82, hd, { size: 36, w: 800 })}${sub ? T(150, 104, sub, { size: 27, fill: C.muted }) : ""}${col === C.red ? cross(70, h / 2, 22, tk) : tick(70, h / 2, 0.6 + 0.6 * tk, tk)}</g>`;
  }).join("");
}
function phStrip(x, y, val, p) {
  const cols = ["#C62828", "#E64A19", "#F57C00", "#FBC02D", "#C0CA33", "#7CB342", "#2E7D32", "#00838F", "#1565C0"];
  let g = `<g transform="translate(${x} ${y})">`;
  cols.forEach((c, i) => { g += `<rect x="${i * 70}" y="0" width="66" height="60" rx="6" fill="${c}"/>${T(i * 70 + 33, 95, String(i + 1), { size: 24, w: 700, anchor: "middle" })}`; });
  g += `<rect x="-6" y="-12" width="${5 * 70 + 6}" height="84" rx="10" fill="none" stroke="${C.green}" stroke-width="6"/>${T(170, -26, "Safe: pH 0.5 – 5.0", { size: 26, w: 800, anchor: "middle", fill: C.green })}`;
  const mx = (val - 1) * 70 + 33;
  g += `<g opacity="${p}"><path d="M ${mx} 120 l -16 26 h 32 z" fill="${C.ink}"/>${T(mx, 180, "pH " + val, { size: 30, w: 800, anchor: "middle" })}</g>`;
  return g + `</g>`;
}

add(4.5, { kind: "title" });
add(7, { step: 1, title: ["Know when and", "which tube"], ar: "دواعي الاستخدام واختيار الأنبوب", bullets: ["Decompression, drain gas\nor fluid, medicines, feeds", "Short-term vs long-term tube", "Size by age and purpose", "Extra care: infants, children,\nolder people"], draw: lt => {
  const items = [["Decompress", "Post-op stomach"], ["Drain", "Gas or fluids"], ["Medicines", "Via the tube"], ["Enteral feeds", "Nutrition"]];
  return items.map(([h, s], i) => { const x = 60 + (i % 2) * 510, y = 90 + Math.floor(i / 2) * 340, p = seg(lt, 0.3 + i * 0.5, 0.8 + i * 0.5);
    return `<g opacity="${p}" transform="translate(${x} ${y + (1 - p) * 30})"><rect width="490" height="310" rx="24" fill="${C.tealSoft}"/><circle cx="245" cy="115" r="62" fill="${C.teal}"/>${T(245, 132, String(i + 1), { size: 52, w: 800, anchor: "middle", fill: "#fff" })}${T(245, 235, h, { size: 40, w: 800, anchor: "middle" })}${T(245, 278, s, { size: 28, anchor: "middle", fill: C.muted })}</g>`; }).join("");
} });
add(7, { step: 2, title: ["Prepare for", "insertion"], ar: "التحضير قبل الإدخال", bullets: ["Verify the physician order", "Explain, including the\ndiscomfort to expect", "Emergency, suction and airway\nequipment at the bedside"], draw: lt => checkCards([["Physician order verified", "Right patient, right tube, right purpose"], ["Procedure explained", "Including discomfort during insertion"], ["Emergency equipment ready", "Suction and airway at the bedside"], ["Privacy and position", "Upright, curtains closed"]], lt) });
add(8, { step: 3, title: ["Measure and", "mark the tube"], ar: "قياس الأنبوب وتعليمه", bullets: ["Nose tip → earlobe →\nxiphisternum (NEX)", "Mark the length on the tube", "Check method against\nthe procedural manual"], draw: lt => {
  let g = patient();
  const a = seg(lt, 0.6, 1.8), b = seg(lt, 2.0, 3.4);
  const p1 = { x: lerp(NOSE.x, EAR.x, a), y: lerp(NOSE.y, EAR.y + 20, a) }, p2 = { x: lerp(EAR.x, XIPH.x, b), y: lerp(EAR.y + 20, XIPH.y, b) };
  g += `<line x1="${NOSE.x}" y1="${NOSE.y}" x2="${p1.x}" y2="${p1.y}" stroke="${C.teal}" stroke-width="6" stroke-dasharray="14 10"/>`;
  if (b > 0) g += `<line x1="${EAR.x}" y1="${EAR.y + 20}" x2="${p2.x}" y2="${p2.y}" stroke="${C.teal}" stroke-width="6" stroke-dasharray="14 10"/>`;
  [[NOSE, "N", 0.3], [{ x: EAR.x, y: EAR.y + 20 }, "E", 1.7], [XIPH, "X", 3.3]].forEach(([pt, l, t0]) => { const q = seg(lt, t0, t0 + 0.4); g += `<g opacity="${q}"><circle cx="${pt.x}" cy="${pt.y}" r="22" fill="${C.teal}"/>${T(pt.x, pt.y + 9, l, { size: 26, w: 800, anchor: "middle", fill: "#fff" })}</g>`; });
  const m = seg(lt, 4.0, 5.0);
  g += `<g opacity="${m}" transform="translate(640 200)"><rect x="0" y="0" width="420" height="22" rx="11" fill="#F3E6B3" stroke="#C9B36A" stroke-width="2"/>${[...Array(9)].map((_, i) => `<line x1="${40 + i * 40}" y1="0" x2="${40 + i * 40}" y2="10" stroke="#8a7a3a" stroke-width="2"/>`).join("")}<rect x="270" y="-14" width="12" height="50" rx="3" fill="${C.red}"/>${T(276, 80, "Mark here", { size: 28, w: 800, anchor: "middle", fill: C.red })}${T(210, -34, "Measured length = NEX", { size: 26, w: 700, anchor: "middle", fill: C.teal })}</g>`;
  return g;
} });
add(8, { step: 4, title: ["Insert and", "secure temporarily"], ar: "إدخال الأنبوب وتثبيته مؤقتاً", bullets: ["Lubricate the tip", "Advance gently;\nask the patient to swallow", "Stop if distress, coughing\nor cyanosis", "Tape temporarily"], draw: lt => {
  let g = patient({ anatomy: seg(lt, 0, 0.8) });
  const p = seg(lt, 0.8, 5.2);
  g += tubeAlong(p);
  g += callout(640, 330, "Swallow…", seg(lt, 2.2, 2.6) * (1 - seg(lt, 4.0, 4.4)), C.teal);
  const tp = seg(lt, 5.6, 6.4);
  g += `<g opacity="${tp}"><rect x="488" y="248" width="60" height="26" rx="5" fill="#fff" stroke="#B8C4C9" stroke-width="2" transform="rotate(-20 518 261)"/></g>` + callout(700, 230, "Temporary tape", tp);
  g += `<path d="M 498 262 C 560 270, 600 300, 640 360" fill="none" stroke="#F3E6B3" stroke-width="12" stroke-linecap="round" opacity="${seg(lt, 0.8, 1.2)}"/>`;
  return g;
} });
add(9, { step: 5, crit: true, title: ["Confirm", "placement: pH"], ar: "التأكد من مكان الأنبوب: فحص الحموضة", bullets: ["Aspirate 0.5–1 ml", "Test on pH indicator strip", "Safe range: pH 0.5 – 5.0", "Not in range: do not use;\nfollow procedural manual"], draw: lt => {
  let g = `<g transform="translate(110 120)"><rect x="0" y="0" width="420" height="90" rx="12" fill="#fff" stroke="${C.ink}" stroke-width="4"/><rect x="${6 + 380 * (1 - seg(lt, 0.6, 2.2) * 0.25)}" y="6" width="${8}" height="78" fill="${C.ink}"/><rect x="420" y="30" width="100" height="30" fill="${C.ink}"/><line x1="-80" y1="45" x2="0" y2="45" stroke="#F3E6B3" stroke-width="14"/>`;
  g += `<rect x="${380 * (1 - seg(lt, 0.6, 2.2) * 0.25) - 50}" y="10" width="${50 * seg(lt, 0.6, 2.2)}" height="70" fill="#D9C66A" opacity=".8"/>${T(210, -24, "Aspirate 0.5 – 1 ml", { size: 30, w: 800, anchor: "middle", fill: C.teal })}</g>`;
  const d = seg(lt, 2.6, 3.4);
  g += `<circle cx="${lerp(300, 330, d)}" cy="${lerp(230, 430, d)}" r="${14 * (1 - d * 0.3)}" fill="#D9C66A" opacity="${(d > 0 && d < 1) ? 1 : 0}"/>`;
  g += phStrip(170, 470, 4, seg(lt, 3.6, 4.4));
  g += `<g opacity="${seg(lt, 4.8, 5.4)}">${tick(380, 760, 1)}${T(420, 772, "pH 4: in range. Proceed as ordered.", { size: 32, w: 800, fill: C.green })}</g>`;
  return g;
} });
add(8, { step: 6, crit: true, title: ["Never use these", "to check placement"], ar: "طرق غير مقبولة للتأكد من المكان", bullets: ["No 'whoosh' test", "No litmus paper", "They can't tell stomach\nfrom lung"], draw: lt => checkCards([["'Whoosh' test", "Listening for air: NOT reliable"], ["Litmus paper", "Not accurate enough: NOT reliable"], ["Watching for bubbles", "NOT reliable"]], lt, 80, 960, 160, 220, 140, C.red) + callout(560, 800, "Use pH aspirate, and X-ray when required", seg(lt, 3.0, 3.6), C.teal) });
add(8, { step: 7, crit: true, title: ["Mark and record", "the exit site"], ar: "تعليم وتوثيق مكان خروج الأنبوب", bullets: ["Straight after X-ray\nconfirms position", "Mark the tube at\nthe nostril", "Record the cm marking"], draw: lt => {
  let g = patient({ anatomy: 0.35 }) + tubeAlong(1);
  g += `<path d="M 498 262 C 560 270, 600 300, 640 380" fill="none" stroke="#F3E6B3" stroke-width="12" stroke-linecap="round"/>`;
  const xr = seg(lt, 0.4, 1.4);
  g += `<g opacity="${xr}" transform="translate(720 90)"><rect width="330" height="250" rx="16" fill="#1F2A30"/><path d="M 120 30 C 110 100, 120 140, 165 165 C 205 185, 245 165, 235 140" fill="none" stroke="#E8EEF0" stroke-width="6" opacity=".9"/><ellipse cx="195" cy="160" rx="70" ry="36" fill="none" stroke="#7d8a90" stroke-width="3"/>${T(165, 236, "X-ray confirmed", { size: 24, w: 700, anchor: "middle", fill: "#9fe3c0" })}</g>`;
  const mk = seg(lt, 2.0, 2.8);
  g += `<g opacity="${mk}"><rect x="532" y="262" width="10" height="30" rx="3" fill="${C.red}" transform="rotate(30 537 277)"/></g>` + callout(640, 470, "Exit site: 55 cm at left nostril", seg(lt, 3.0, 3.6), C.red);
  g += `<g opacity="${seg(lt, 4.2, 4.8)}" transform="translate(720 560)"><rect width="330" height="150" rx="16" fill="${C.bg}"/>${T(24, 50, "Record", { size: 26, w: 800, fill: C.teal })}${T(24, 92, "Marking: 55 cm", { size: 28, w: 700 })}${T(24, 130, "Nostril: left", { size: 28, w: 700 })}</g>`;
  return g;
} });
add(6, { step: 8, title: ["Secure the", "tube"], ar: "تثبيت الأنبوب", bullets: ["Secure as per the\nprocedural manual", "No pressure on the nostril", "Check the mark stays\nat the nostril"], draw: lt => {
  let g = patient({ anatomy: 0.2 }) + tubeAlong(1) + `<path d="M 498 262 C 560 270, 600 300, 640 380" fill="none" stroke="#F3E6B3" stroke-width="12" stroke-linecap="round"/>`;
  const p = seg(lt, 0.6, 1.6);
  g += `<g opacity="${p}"><path d="M 470 236 L 512 252 L 500 280 L 462 262 Z" fill="#fff" stroke="#B8C4C9" stroke-width="3"/><rect x="560" y="262" width="60" height="28" rx="6" fill="#fff" stroke="#B8C4C9" stroke-width="3" transform="rotate(30 590 276)"/></g>`;
  g += callout(700, 200, "Nose tape, no pressure on the nostril", seg(lt, 1.8, 2.4), C.teal);
  return g;
} });
add(9, { step: 9, title: ["Before every", "feed or medicine"], ar: "قبل كل وجبة أو دواء", bullets: ["Check the mark hasn't moved", "Continuous feeds: check\nevery 4–6 hours", "Stop feed 30–60 min, flush\n20 ml air, aspirate, test pH"], draw: lt => {
  const st = [["Stop feed", "30–60 min"], ["Flush air", "20 ml"], ["Aspirate", "0.5–1 ml"], ["Test pH", "0.5–5.0"], ["Proceed", "if in range"]];
  let g = T(560, 120, "Continuous feeding: every 4–6 hours", { size: 34, w: 800, anchor: "middle", fill: C.teal });
  st.forEach(([h, s], i) => { const x = 40 + i * 212, p = seg(lt, 0.5 + i * 0.8, 1.0 + i * 0.8);
    g += `<g opacity="${p}" transform="translate(${x} ${260 + (1 - p) * 30})"><rect width="190" height="260" rx="22" fill="${i === 4 ? C.greenSoft : C.bg}"/><circle cx="95" cy="70" r="40" fill="${i === 4 ? C.green : C.teal}"/>${T(95, 86, String(i + 1), { size: 40, w: 800, anchor: "middle", fill: "#fff" })}${T(95, 168, h, { size: 30, w: 800, anchor: "middle" })}${T(95, 210, s, { size: 26, anchor: "middle", fill: C.muted })}</g>`;
    if (i < 4) g += `<g opacity="${p}">${arrow(x + 192, 390, x + 210, 390, C.muted, 4)}</g>`; });
  g += callout(560, 650, "Mark moved? Do not use. Recheck and escalate.", seg(lt, 5.0, 5.6), C.red);
  return g;
} });
add(7, { step: 10, title: ["Ongoing", "care"], ar: "الرعاية المستمرة", bullets: ["Can't aspirate? Follow the\nprocedural manual", "Suction and airway\nequipment at the bedside", "Oral hygiene", "Manufacturer's replacement\ntimes"], draw: lt => checkCards([["Unable to aspirate", "Follow the procedural manual steps"], ["Suction and airway kit", "Ready at the bedside"], ["Oral and nasal care", "Mouth care, check nostril skin"], ["Tube replacement", "As per manufacturer's guidance"]], lt) });
add(7, { step: 11, title: ["Remove the", "tube safely"], ar: "إزالة الأنبوب بأمان", bullets: ["Explain the procedure\nand the reason", "Remove smoothly and steadily", "Observe the patient after"], draw: lt => {
  let g = patient({ anatomy: seg(lt, 0, 0.6) * 0.8 });
  const p = 1 - seg(lt, 1.6, 4.6);
  g += tubeAlong(p);
  g += `<path d="M 498 262 C ${560 + (1 - p) * 120} ${270 - (1 - p) * 20}, ${600 + (1 - p) * 160} ${300 - (1 - p) * 40}, ${640 + (1 - p) * 220} ${380 - (1 - p) * 100}" fill="none" stroke="#F3E6B3" stroke-width="12" stroke-linecap="round"/>`;
  g += callout(760, 180, "Explain first", seg(lt, 0.4, 0.9) * (1 - seg(lt, 1.6, 2.0)), C.teal) + callout(760, 180, "Smooth, steady pull", seg(lt, 2.0, 2.4), C.teal);
  return g;
} });
add(6, { step: 12, title: ["Care for the", "person"], ar: "التعامل مع المريض", bullets: ["Reassure throughout", "Respect dignity and privacy", "Escalate any concern\nabout placement"], draw: lt => checkCards([["Empathy and reassurance", "During insertion, care and removal"], ["Dignity and privacy", "Throughout the procedure"], ["Accountability", "Escalate placement concerns promptly"]], lt, 80, 960, 160, 220, 140) });
add(8, { step: 13, title: ["Document and", "hand over"], ar: "التوثيق والتسليم", bullets: ["After insertion and\nafter removal", "Hand over the marking\nlength every shift", "Education given to\npatient and family"], draw: lt => {
  const rows = [["Ordered by / time", "Dr name · 30/10 09:00"], ["Inserted", "30/10 · 09:40"], ["Tube type / size", "Short-term · 14 Fr"], ["Marking / nostril", "55 cm · left"], ["Placement check", "Aspirate pH 4 · X-ray OK"], ["Patient response", "Tolerated, no distress"], ["Handover", "Marking told to next shift"]];
  let g = `<rect x="140" y="60" width="840" height="740" rx="24" fill="${C.bg}"/><rect x="390" y="30" width="340" height="60" rx="14" fill="${C.ink}"/>${T(560, 72, "NG tube record", { size: 28, w: 700, anchor: "middle", fill: "#fff" })}`;
  rows.forEach(([h, v], i) => { const y = 140 + i * 92, p = seg(lt, 0.3 + i * 0.5, 0.7 + i * 0.5); g += `${T(190, y + 30, h, { size: 26, fill: C.muted })}<line x1="520" y1="${y + 42}" x2="930" y2="${y + 42}" stroke="${C.line}" stroke-width="3"/><g opacity="${p}">${T(520, y + 30, v, { size: 28, w: 700, fill: C.teal })}</g>`; });
  return g;
} });
add(5, { kind: "end" });
