// ---------- Urinary catheter scenes (Module 04, RMS.NCC.MW.F.010) ----------
const SCENES = [];
const add = (dur, o) => SCENES.push(Object.assign({ dur }, o));
const URINE = "#F2D25C";

// schematic bladder + urethra (front view, not to scale)
function bladder(o = {}) {
  let g = `<path d="M 380 170 C 380 90, 740 90, 740 170 C 760 300, 680 400, 600 420 L 520 420 C 440 400, 360 300, 380 170 Z" fill="#F6D3CC" stroke="#D98C82" stroke-width="4"/>`;
  if (o.urine) g += `<clipPath id="bl"><path d="M 380 170 C 380 90, 740 90, 740 170 C 760 300, 680 400, 600 420 L 520 420 C 440 400, 360 300, 380 170 Z"/></clipPath><rect x="360" y="${420 - 200 * o.urine}" width="400" height="300" fill="${URINE}" opacity=".55" clip-path="url(#bl)"/>`;
  g += `<path d="M 530 418 L 530 740 M 590 418 L 590 740" stroke="#D98C82" stroke-width="4"/><rect x="532" y="418" width="56" height="322" fill="#FBE6E2"/>`;
  g += `${T(770, 200, "Bladder", { size: 26, w: 700, fill: "#B0554A" })}${T(510, 600, "Urethra", { size: 24, fill: C.muted, anchor: "end" })}${T(510, 748, "Meatus", { size: 24, fill: C.muted, anchor: "end" })}`;
  return g;
}
// catheter seen in the urethra: tip at tipY, balloon size b (0..1), urine fill f (0..1)
function catheter(tipY, b = 0, f = 0) {
  let g = `<rect x="548" y="${tipY}" width="24" height="${900 - tipY}" rx="12" fill="#F4F0E6" stroke="#B9AE8E" stroke-width="2"/>`;
  if (f > 0) g += `<rect x="553" y="${tipY + 20}" width="14" height="${(900 - tipY) * f}" rx="7" fill="${URINE}"/>`;
  if (b > 0) g += `<ellipse cx="560" cy="${tipY + 44}" rx="${18 + 46 * b}" ry="${10 + 26 * b}" fill="#EAF4FB" stroke="#7FA9C6" stroke-width="3" opacity=".95"/>`;
  g += `<circle cx="560" cy="${tipY + 14}" r="4" fill="#8A7F60"/>`;
  return g;
}
function syringe(x, y, plunger, label, op = 1, sc = 0.8) {
  return `<g opacity="${op}" transform="translate(${x} ${y}) scale(${sc})"><rect x="0" y="0" width="230" height="64" rx="10" fill="#fff" stroke="${C.ink}" stroke-width="4"/><rect x="${8 + plunger * 150}" y="6" width="70" height="52" fill="#DCEEF8"/><rect x="${78 + plunger * 150}" y="2" width="8" height="60" fill="${C.ink}"/><rect x="${86 + plunger * 150}" y="26" width="${150 - plunger * 150 + 40}" height="12" fill="${C.ink}"/><rect x="-40" y="24" width="40" height="16" fill="${C.ink}"/>${T(115, -16, label, { size: 26, w: 800, anchor: "middle", fill: C.teal })}</g>`;
}

add(4.5, { kind: "title" });
add(8, { step: 1, title: ["Know the", "rules first"], ar: "اعرف القواعد أولاً", bullets: ["Physician order for\ninsertion AND removal", "Paediatric patients:\nphysicians only", "Same gender: females for\nfemales, males for males", "Know when a doctor must\ncatheterise a male patient"], draw: lt => checkCards([["Physician order", "Required for insertion and removal"], ["Children", "Only physicians catheterise paediatric patients"], ["Same gender", "Female nurse ↔ female patient, male ↔ male"], ["Doctor-only situations", "Know when a doctor must catheterise a male"]], lt) });
add(7, { step: 2, title: ["Choose the", "right catheter"], ar: "اختيار القسطرة المناسبة", bullets: ["Know the indication", "Indwelling or intermittent", "Silicone or latex-silicone", "Explain your rationale"], draw: lt => {
  const items = [["Indwelling", "Stays in, held by a balloon"], ["Intermittent", "In and out, no balloon"], ["Silicone", "Latex-free, longer term"], ["Latex-silicone", "Check latex allergy"]];
  return items.map(([h, s], i) => { const x = 60 + (i % 2) * 510, y = 90 + Math.floor(i / 2) * 340, p = seg(lt, 0.3 + i * 0.5, 0.8 + i * 0.5);
    return `<g opacity="${p}" transform="translate(${x} ${y + (1 - p) * 30})"><rect width="490" height="310" rx="24" fill="${C.tealSoft}"/><circle cx="245" cy="115" r="62" fill="${C.teal}"/>${T(245, 132, String(i + 1), { size: 52, w: 800, anchor: "middle", fill: "#fff" })}${T(245, 235, h, { size: 40, w: 800, anchor: "middle" })}${T(245, 278, s, { size: 28, anchor: "middle", fill: C.muted })}</g>`; }).join("");
} });
add(7, { step: 3, title: ["Prepare for", "insertion"], ar: "التحضير قبل الإدخال", bullets: ["Verify the physician order", "Assemble all equipment", "Explain and gain consent", "Privacy, good light, position"], draw: lt => checkCards([["Order verified", "Right patient, right catheter"], ["Equipment assembled", "Sterile pack, catheter, water, bag, securing device"], ["Explained and consented", "Patient knows what to expect"], ["Privacy and position", "Curtains closed, good light"]], lt) });
add(8, { step: 4, crit: true, title: ["Strict asepsis", "throughout"], ar: "تعقيم صارم طوال الإجراء", bullets: ["Sterile field, sterile gloves", "Dominant hand = sterile", "Non-dominant hand = clean", "Contaminated? Start again"], draw: lt => {
  const p = seg(lt, 0.3, 1.1), a = seg(lt, 1.4, 2.0), b = seg(lt, 2.4, 3.0);
  let g = `<g opacity="${p}"><rect x="300" y="120" width="520" height="380" rx="20" fill="#CFE7F5" stroke="#7FA9C6" stroke-width="4"/>${T(560, 170, "Sterile field", { size: 30, w: 800, anchor: "middle", fill: "#2D6A92" })}<rect x="350" y="220" width="160" height="110" rx="12" fill="#fff"/><rect x="540" y="230" width="230" height="22" rx="11" fill="#F4F0E6" stroke="#B9AE8E" stroke-width="2"/><rect x="540" y="290" width="150" height="44" rx="8" fill="#fff" stroke="${C.ink}" stroke-width="3"/><circle cx="430" cy="410" r="40" fill="#fff"/><rect x="560" y="380" width="200" height="60" rx="10" fill="#fff"/></g>`;
  g += `<g opacity="${a}">${glove(240, 640, 90, 56, -20)}<rect x="90" y="720" width="300" height="70" rx="35" fill="${C.bg}"/>${T(240, 765, "Non-dominant: CLEAN", { size: 26, w: 800, anchor: "middle", fill: C.muted })}</g>`;
  g += `<g opacity="${b}"><ellipse cx="860" cy="640" rx="90" ry="56" transform="rotate(20 860 640)" fill="#3FA7A0" stroke="${C.teal}" stroke-width="3"/><rect x="700" y="720" width="320" height="70" rx="35" fill="${C.tealSoft}"/>${T(860, 765, "Dominant: STERILE", { size: 26, w: 800, anchor: "middle", fill: C.teal })}</g>`;
  g += `<g opacity="${b}">${arrow(820, 590, 700, 420, C.teal, 6)}</g>`;
  g += callout(560, 60, "Only the sterile hand touches the catheter", seg(lt, 4.0, 4.6), C.red);
  return g;
} });
add(8, { step: 5, title: ["Test the balloon", "before insertion"], ar: "افحص البالون قبل الإدخال", bullets: ["Inflate with sterile water", "Check for leakage", "Deflate fully, then insert"], draw: lt => {
  const inf = seg(lt, 1.0, 2.6) * (1 - seg(lt, 4.4, 5.8));
  let g = `<g transform="translate(0 0)"><rect x="120" y="408" width="700" height="24" rx="12" fill="#F4F0E6" stroke="#B9AE8E" stroke-width="2"/><path d="M 820 408 L 900 360 L 930 384 L 840 432 Z" fill="#F4F0E6" stroke="#B9AE8E" stroke-width="2"/><rect x="820" y="420" width="120" height="28" rx="8" fill="#E8DCC0" stroke="#B9AE8E" stroke-width="2"/>`;
  g += `<ellipse cx="200" cy="420" rx="${16 + 60 * inf}" ry="${14 + 44 * inf}" fill="#EAF4FB" stroke="#7FA9C6" stroke-width="4"/><circle cx="135" cy="420" r="5" fill="#8A7F60"/></g>`;
  g += syringe(880, 260, 1 - inf, "Sterile water");
  g += T(200, 560, "Balloon", { size: 26, w: 700, anchor: "middle", fill: "#2D6A92" }) + T(880, 500, "Balloon port", { size: 24, anchor: "middle", fill: C.muted });
  g += callout(320, 160, "Inflate", seg(lt, 1.0, 1.4) * (1 - seg(lt, 2.8, 3.1)), C.teal);
  g += `<g opacity="${seg(lt, 3.0, 3.4) * (1 - seg(lt, 4.2, 4.5))}">${tick(200, 680, 1)}${T(240, 692, "Holds shape: no leak", { size: 30, w: 800, fill: C.green })}</g>`;
  g += callout(320, 160, "Deflate fully", seg(lt, 4.4, 4.8), C.teal);
  return g;
} });
add(9, { step: 6, crit: true, title: ["Insert gently.", "Never force."], ar: "أدخل بلطف، ولا تدفع بالقوة أبداً", bullets: ["Advance until urine flows", "Resistance? Stop. Never force", "Inflate balloon per the\nmanufacturer's instructions"], draw: lt => {
  const p = seg(lt, 0.6, 3.6), tipY = lerp(800, 200, p), f = seg(lt, 3.8, 5.0), bl = seg(lt, 5.4, 6.6), pull = seg(lt, 6.8, 7.4);
  let g = bladder({ urine: 0.7 - 0.3 * f });
  g += catheter(tipY + pull * 110, bl, f);
  g += callout(840, 480, "Resistance? STOP", seg(lt, 1.6, 2.0) * (1 - seg(lt, 3.0, 3.3)), C.red);
  g += callout(860, 640, "Urine flows", seg(lt, 4.0, 4.4) * (1 - seg(lt, 5.2, 5.4)), C.teal);
  g += callout(860, 640, "Inflate per manufacturer", seg(lt, 5.4, 5.8), C.teal);
  g += callout(860, 470, "Balloon sits at bladder neck", seg(lt, 7.0, 7.4), C.teal);
  return g;
} });
add(8, { step: 7, crit: true, title: ["Keep the system", "closed and sterile"], ar: "حافظ على نظام مغلق ومعقّم", bullets: ["Keep all tube ends sterile\nwhile connecting", "Don't disconnect the bag", "Keep the tubing sterile"], draw: lt => {
  const c = seg(lt, 0.6, 2.2);
  let g = `<rect x="80" y="390" width="${300 + 180 * c}" height="30" rx="15" fill="#F4F0E6" stroke="#B9AE8E" stroke-width="2"/>${T(140, 370, "Catheter", { size: 26, w: 700, fill: C.muted })}`;
  g += `<rect x="${740 - 180 * c}" y="390" width="${300 + 180 * c}" height="30" rx="15" fill="#E3EEF2" stroke="#8DA9B4" stroke-width="2"/><rect x="${720 - 180 * c}" y="380" width="44" height="50" rx="8" fill="#B9D3DC" stroke="#8DA9B4" stroke-width="2"/>${T(1000, 370, "Bag tubing", { size: 26, w: 700, fill: C.muted, anchor: "end" })}`;
  g += `<g opacity="${seg(lt, 0.2, 0.8) * (1 - seg(lt, 1.8, 2.2))}">${cross(560, 520, 30)}${T(560, 600, "Don't touch the ends", { size: 28, w: 800, anchor: "middle", fill: C.red })}</g>`;
  const k = seg(lt, 2.6, 3.4);
  g += `<g opacity="${k}" transform="translate(560 260)"><rect x="-40" y="-10" width="80" height="64" rx="12" fill="${C.teal}"/><path d="M -24 -10 v -22 a 24 24 0 0 1 48 0 v 22" fill="none" stroke="${C.teal}" stroke-width="10"/><circle cx="0" cy="22" r="8" fill="#fff"/></g>`;
  g += callout(560, 640, "Closed system: never disconnect", seg(lt, 3.6, 4.2), C.teal);
  return g;
} });
add(7, { step: 8, title: ["Secure to", "the leg"], ar: "تثبيت القسطرة على الفخذ", bullets: ["Use an approved\nsecuring device", "Leave a little slack", "No pulling on the bladder neck"], draw: lt => {
  let g = `<path d="M 40 300 C 300 280, 700 290, 1100 330 L 1100 560 C 700 590, 300 600, 40 580 Z" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3"/>${T(80, 640, "Thigh", { size: 26, fill: C.muted })}`;
  g += `<path d="M 60 420 C 300 420, 360 520, 480 470 S 700 400, 1120 440" fill="none" stroke="#F4F0E6" stroke-width="22" stroke-linecap="round"/><path d="M 60 420 C 300 420, 360 520, 480 470 S 700 400, 1120 440" fill="none" stroke="#B9AE8E" stroke-width="2"/>`;
  const s = seg(lt, 0.8, 1.8);
  g += `<g opacity="${s}" transform="translate(0 ${(1 - s) * -40})"><rect x="590" y="400" width="140" height="90" rx="20" fill="#fff" stroke="#9DB9C3" stroke-width="4"/><rect x="618" y="428" width="84" height="34" rx="10" fill="#CFE3EA"/></g>`;
  g += callout(660, 220, "Approved securing device", seg(lt, 2.0, 2.5), C.teal) + callout(330, 720, "A little slack", seg(lt, 3.0, 3.5), C.teal);
  return g;
} });
add(8, { step: 9, title: ["Bag below the", "bladder, off the floor"], ar: "الكيس تحت مستوى المثانة وبعيد عن الأرض", bullets: ["Below bladder level:\nno backflow", "Never on the floor:\ninfection risk", "Keep urine flowing,\nno kinks"], draw: lt => {
  let g = `<rect x="120" y="300" width="760" height="70" rx="16" fill="#E3EEF2" stroke="#8DA9B4" stroke-width="3"/><rect x="120" y="370" width="760" height="40" fill="#9DB9C3"/><rect x="140" y="410" width="22" height="370" fill="#9DB9C3"/><rect x="840" y="410" width="22" height="370" fill="#9DB9C3"/>`;
  g += `<line x1="40" y1="780" x2="1080" y2="780" stroke="${C.ink}" stroke-width="5"/>${T(1060, 820, "Floor", { size: 24, fill: C.muted, anchor: "end" })}`;
  g += `<ellipse cx="560" cy="270" rx="70" ry="44" fill="#F6D3CC" stroke="#D98C82" stroke-width="3"/>${T(560, 210, "Bladder", { size: 24, w: 700, anchor: "middle", fill: "#B0554A" })}`;
  const l = seg(lt, 0.6, 1.4);
  g += `<g opacity="${l}"><line x1="40" y1="270" x2="1080" y2="270" stroke="${C.teal}" stroke-width="4" stroke-dasharray="14 10"/>${T(1060, 255, "Bladder level", { size: 24, w: 700, fill: C.teal, anchor: "end" })}</g>`;
  const b = seg(lt, 1.6, 2.6);
  g += `<path d="M 600 290 C 760 320, 960 330, 960 ${480 + 40 * b}" fill="none" stroke="#E3EEF2" stroke-width="14"/><path d="M 600 290 C 760 320, 960 330, 960 ${480 + 40 * b}" fill="none" stroke="#8DA9B4" stroke-width="2"/>`;
  g += `<g opacity="${b}"><rect x="900" y="420" width="16" height="40" fill="#8DA9B4"/><rect x="890" y="${500}" width="150" height="200" rx="20" fill="#F7FAFB" stroke="#8DA9B4" stroke-width="4"/><rect x="896" y="600" width="138" height="94" rx="14" fill="${URINE}" opacity=".7"/></g>`;
  g += `<g opacity="${seg(lt, 3.0, 3.6)}">${arrow(1070, 700, 1070, 775, C.green, 5)}${arrow(1070, 775, 1070, 702, C.green, 5)}</g>`;
  g += callout(620, 520, "Below the bladder", seg(lt, 2.8, 3.2), C.teal) + callout(620, 640, "Off the floor", seg(lt, 3.6, 4.0), C.green);
  return g;
} });
add(8, { step: 10, title: ["Observe and", "encourage fluids"], ar: "المراقبة وتشجيع السوائل", bullets: ["Urine: amount, colour,\nclarity, odour", "Meatus: redness, discharge", "Encourage fluids unless\nrestricted (e.g. heart or\nrenal failure)"], draw: lt => {
  const sw = [["#F7EFA8", "Pale"], ["#F2D25C", "Straw"], ["#E0A526", "Dark"], ["#E6D9A8", "Cloudy"], ["#D67A6A", "Blood-tinged"]];
  let g = T(560, 110, "Urine appearance", { size: 32, w: 800, anchor: "middle", fill: C.teal });
  sw.forEach(([c, l], i) => { const p = seg(lt, 0.4 + i * 0.4, 0.8 + i * 0.4), x = 90 + i * 194;
    g += `<g opacity="${p}"><path d="M ${x + 40} 160 h 100 v 180 a 50 50 0 0 1 -100 0 Z" fill="${c}" stroke="#9DB0B6" stroke-width="3"/>${i === 3 ? `<path d="M ${x + 40} 160 h 100 v 180 a 50 50 0 0 1 -100 0 Z" fill="#fff" opacity=".35"/>` : ""}${T(x + 90, 430, l, { size: 24, w: 700, anchor: "middle" })}</g>`; });
  return g + checkCards([["Meatus", "Redness, swelling, discharge"], ["Fluids", "Encourage unless fluid-restricted"]], Math.max(0, lt - 2.4), 80, 960, 140, 170, 490);
} });
add(9, { step: 11, title: ["Remove the", "catheter"], ar: "إزالة القسطرة", bullets: ["Verify order, verbal consent", "Deflate the balloon fully", "Won't deflate? Don't pull.\nFollow policy, tell the doctor", "Remove gently, discard\ncatheter and bag correctly"], draw: lt => {
  const d = seg(lt, 1.0, 3.0), out = seg(lt, 4.6, 7.0);
  let g = bladder({ urine: 0.2 });
  g += catheter(200 + out * 640, 1 - d, 1 - out);
  g += syringe(760, 740, d, "Withdraw water", 1 - seg(lt, 4.0, 4.4));
  g += callout(840, 300, "Won't deflate? Don't pull", seg(lt, 3.2, 3.6) * (1 - seg(lt, 4.5, 4.8)), C.red);
  g += callout(840, 300, "Gentle, steady removal", seg(lt, 4.8, 5.2), C.teal);
  return g;
} });
add(8, { step: 12, title: ["After removal:", "watch for voiding"], ar: "بعد الإزالة: راقب التبوّل", bullets: ["Record removal time", "Record time and amount\nof the first void", "Not voided in 8 hours?\nAssess and act per policy"], draw: lt => {
  const x0 = 120, x1 = 1000, y = 420, p = seg(lt, 0.6, 5.0);
  let g = `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${C.line}" stroke-width="14" stroke-linecap="round"/><line x1="${x0}" y1="${y}" x2="${lerp(x0, x1, p)}" y2="${y}" stroke="${C.teal}" stroke-width="14" stroke-linecap="round"/>`;
  for (let h = 0; h <= 8; h++) { const x = lerp(x0, x1, h / 8); g += `<line x1="${x}" y1="${y + 20}" x2="${x}" y2="${y + 36}" stroke="${C.muted}" stroke-width="3"/>${T(x, y + 70, h + "h", { size: 24, anchor: "middle", fill: C.muted })}`; }
  g += `<g opacity="${seg(lt, 0.3, 0.8)}"><circle cx="${x0}" cy="${y}" r="20" fill="${C.teal}"/>${T(x0, 300, "Removed: time recorded", { size: 26, w: 800, fill: C.teal })}</g>`;
  const v = lerp(x0, x1, 3.5 / 8);
  g += `<g opacity="${seg(lt, 2.4, 2.9)}"><circle cx="${v}" cy="${y}" r="20" fill="${C.green}"/><rect x="${v - 200}" y="520" width="400" height="110" rx="18" fill="${C.greenSoft}"/>${T(v, 565, "First void", { size: 28, w: 800, anchor: "middle", fill: C.green })}${T(v, 605, "Record time + amount", { size: 26, anchor: "middle" })}</g>`;
  g += `<g opacity="${seg(lt, 5.0, 5.5)}"><circle cx="${x1}" cy="${y}" r="20" fill="${C.red}"/><rect x="${x1 - 420}" y="160" width="440" height="110" rx="18" fill="${C.redSoft}"/>${T(x1 - 200, 205, "No void by 8 h?", { size: 28, w: 800, anchor: "middle", fill: C.red })}${T(x1 - 200, 245, "Assess bladder, inform doctor", { size: 26, anchor: "middle" })}</g>`;
  return g;
} });
add(8, { step: 13, crit: true, title: ["Infants:", "position and clean"], ar: "الرضّع: الوضعية والتنظيف", bullets: ["Supine, thighs abducted\n(frog-leg position)", "Clean the area with the\nrecommended solution", "Catheterised by a physician"], draw: lt => {
  const fl = seg(lt, 0.8, 2.2);
  let g = `<rect x="200" y="80" width="720" height="700" rx="40" fill="#EEF4F6"/>`;
  g += `<circle cx="560" cy="200" r="78" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3"/><rect x="470" y="270" width="180" height="230" rx="70" fill="#CFE3EA" stroke="#9DB9C3" stroke-width="3"/>`;
  g += `<rect x="360" y="300" width="120" height="44" rx="22" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3" transform="rotate(-25 470 320)"/><rect x="640" y="300" width="120" height="44" rx="22" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3" transform="rotate(25 650 320)"/>`;
  [-1, 1].forEach(sd => { const a = -sd * lerp(8, 55, fl);
    g += `<g transform="rotate(${a} ${560 + sd * 40} 490)"><rect x="${560 + sd * 40 - 30}" y="480" width="60" height="170" rx="30" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3"/><g transform="rotate(${sd * lerp(0, 80, fl)} ${560 + sd * 40} 640)"><rect x="${560 + sd * 40 - 26}" y="630" width="52" height="140" rx="26" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3"/></g></g>`; });
  g += callout(560, 60, "Supine", seg(lt, 0.4, 0.8), C.teal) + callout(560, 820, "Thighs abducted: frog-leg", seg(lt, 2.4, 2.8), C.teal);
  g += `<g opacity="${seg(lt, 3.4, 4.0)}"><circle cx="560" cy="520" r="${40 + 20 * Math.sin(lt * 3)}" fill="#7FC4E0" opacity=".35"/></g>` + callout(940, 520, "Recommended solution", seg(lt, 3.6, 4.0), C.teal);
  return g;
} });
add(7, { step: 14, title: ["Care for the", "person"], ar: "التعامل مع المريض", bullets: ["Dignity and privacy", "Reassure and explain clearly", "Accountable: asepsis,\npolicy, safety"], draw: lt => checkCards([["Dignity and privacy", "Insertion, maintenance and removal"], ["Reassurance", "Clear explanations reduce anxiety"], ["Accountability", "Strict asepsis, policy and safety"]], lt, 80, 960, 160, 220, 140) });
add(8, { step: 15, title: ["Document and", "report"], ar: "التوثيق والإبلاغ", bullets: ["Accurate urine output", "Times, response, urine\ncharacteristics", "Routine catheter care", "Tell the physician about\nany deviation"], draw: lt => {
  const rows = [["Order / indication", "Dr name · retention"], ["Inserted", "30/10 · 10:15 · 14 Fr"], ["Balloon", "10 ml sterile water"], ["Urine", "450 ml · straw · clear"], ["Patient response", "Tolerated well"], ["Catheter care", "Meatal care done 18:00"], ["Deviations", "None · doctor informed if any"]];
  let g = `<rect x="140" y="60" width="840" height="740" rx="24" fill="${C.bg}"/><rect x="390" y="30" width="340" height="60" rx="14" fill="${C.ink}"/>${T(560, 72, "Catheter record", { size: 28, w: 700, anchor: "middle", fill: "#fff" })}`;
  rows.forEach(([h, v], i) => { const y = 140 + i * 92, p = seg(lt, 0.3 + i * 0.5, 0.7 + i * 0.5); g += `${T(190, y + 30, h, { size: 26, fill: C.muted })}<line x1="520" y1="${y + 42}" x2="930" y2="${y + 42}" stroke="${C.line}" stroke-width="3"/><g opacity="${p}">${T(520, y + 30, v, { size: 28, w: 700, fill: C.teal })}</g>`; });
  return g;
} });
add(5, { kind: "end" });
