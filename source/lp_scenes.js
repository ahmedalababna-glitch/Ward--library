// ---------- Lumbar puncture scenes (Module 04, RMS.NCC.MW.F.002) ----------
const SCENES = [];
const add = (dur, o) => SCENES.push(Object.assign({ dur }, o));

// lumbar spine, patient lying on the side: back at the top of the card
function spine(o = {}) {
  let g = `<rect x="0" y="0" width="1120" height="840" fill="#FBF3EC"/><rect x="0" y="0" width="1120" height="150" fill="${C.skin}" opacity=".55"/>${T(40, 60, "Skin (back)", { size: 24, fill: C.muted })}`;
  g += `<rect x="0" y="430" width="1120" height="80" fill="#CDE8F5"/>${T(40, 480, "CSF (subarachnoid space)", { size: 24, w: 700, fill: "#2D6A92" })}`;
  ["L2", "L3", "L4", "L5"].forEach((l, i) => { const x = 110 + i * 250;
    g += `<rect x="${x}" y="540" width="190" height="170" rx="26" fill="#EFE6D6" stroke="#C9B998" stroke-width="4"/>${T(x + 95, 640, l, { size: 30, w: 800, anchor: "middle", fill: "#8A7F60" })}`;
    g += `<path d="M ${x + 40} 420 L ${x + 70} 220 L ${x + 120} 220 L ${x + 150} 420 Z" fill="#EFE6D6" stroke="#C9B998" stroke-width="4"/>`; });
  const n = o.needle || 0;
  if (n > 0) { const tipY = lerp(40, 470, n);
    g += `<line x1="610" y1="${tipY - 380}" x2="610" y2="${tipY}" stroke="${C.steel}" stroke-width="10" stroke-linecap="round"/><rect x="586" y="${tipY - 420}" width="48" height="50" rx="8" fill="#F2C200" stroke="#9A7A00" stroke-width="3"/>`; }
  if (o.drip) for (let i = 0; i < 4; i++) { const k = (o.t * 0.8 + i / 4) % 1; g += `<circle cx="610" cy="${lerp(0, 120, k) - 60 + (n ? lerp(40, 470, n) - 420 : 0)}" r="9" fill="#9FD3EA" opacity="${o.drip * (1 - k)}"/>`; }
  return g;
}

add(4.5, { kind: "title" });
add(8, { step: 1, title: ["Know the", "procedure"], bullets: ["Where to find the LP policy", "Why the LP is done;\nthe nurse's role", "Equipment needed", "Safe holding; contraindications\nand complications"], draw: lt => checkCards([["LP policy", "Know where to find it"], ["Reason and role", "Why the LP is done; what you do"], ["Equipment", "Know the full list"], ["Safety", "Safe holding · contraindications · complications"]], lt) });
add(9, { step: 2, title: ["Prepare the", "patient"], bullets: ["Explain; consent taken", "Organise the equipment", "Privacy", "Hand hygiene and PPE"], draw: lt => checkCards([["Explained to the patient", ""], ["Informed consent taken", ""], ["Equipment organised", ""], ["Privacy provided", ""], ["Hand hygiene", ""], ["Appropriate PPE", ""]], lt, 80, 960, 104, 122, 50) });
add(10, { step: 3, crit: true, title: ["Position and", "hold safely"], bullets: ["Side-lying at the\nedge of the bed", "Knees to chest,\nchin to chest", "Back curved outwards", "Support the patient\nthroughout"], draw: lt => {
  const c = seg(lt, 0.8, 3.0);
  let g = "";
  // seen from above: patient on their side, back towards the bed edge (bottom), curling into a C
  const L = (a, b) => lerp(a, b, c);
  const hip = { x: 420, y: 430 }, sh = { x: L(720, 650), y: L(430, 380) }, ctl = { x: L(570, 560), y: L(430, 560) };
  const knee = { x: L(230, 600), y: L(430, 250) }, foot = { x: L(60, 380), y: L(430, 210) };
  const head = { x: sh.x + L(110, 60), y: sh.y + L(0, -80) };
  g += `<line x1="40" y1="640" x2="1080" y2="640" stroke="${C.ink}" stroke-width="5"/>${T(1060, 680, "Bed edge", { size: 24, fill: C.muted, anchor: "end" })}`;
  g += `<path d="M ${hip.x} ${hip.y} L ${knee.x} ${knee.y} L ${foot.x} ${foot.y}" fill="none" stroke="#8DA9B4" stroke-width="80" stroke-linecap="round" stroke-linejoin="round"/>`;
  g += `<path d="M ${hip.x} ${hip.y} Q ${ctl.x} ${ctl.y} ${sh.x} ${sh.y}" fill="none" stroke="#CFE3EA" stroke-width="130" stroke-linecap="round"/><path d="M ${hip.x} ${hip.y + 62} Q ${ctl.x} ${ctl.y + 62} ${sh.x} ${sh.y + 62}" fill="none" stroke="#9DB9C3" stroke-width="4" opacity="${c}"/>`;
  g += `<circle cx="${head.x}" cy="${head.y}" r="62" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3"/>`;
  g += `<g opacity="${seg(lt, 3.2, 3.8)}"><path d="M 400 560 Q 560 690 700 520" fill="none" stroke="${C.teal}" stroke-width="6" stroke-dasharray="12 8"/>${T(560, 720, "Back curved towards the doctor", { size: 26, w: 800, fill: C.teal, anchor: "middle" })}</g>`;
  g += callout(860, 90, "Knees to chest · chin to chest", seg(lt, 3.6, 4.2), C.teal);
  g += callout(560, 790, "Nurse supports behind the neck and knees", seg(lt, 4.8, 5.4), C.red) + `<g opacity="${seg(lt, 4.8, 5.4)}">${glove(760, 330, 50, 32, 30)}${glove(560, 200, 50, 32, -20)}</g>`;
  return g;
} });
add(8, { step: 4, crit: true, title: ["Assist with", "aseptic technique"], bullets: ["Follow aseptic technique\nthroughout", "Assist the doctor\nas required", "Keep the sterile field intact"], draw: lt => checkCards([["Aseptic technique", "Every step, every time"], ["Sterile field intact", "No reaching across, no touching"], ["Assist the doctor", "Hand over items as required"], ["Watch the patient", "Comfort, distress, colour"]], lt) });
add(9, { step: 5, title: ["Needle into", "the CSF space"], bullets: ["The doctor inserts the\nneedle and stylet", "Into the subarachnoid space", "A free drip of CSF\nconfirms position"], draw: lt => {
  const n = seg(lt, 0.8, 3.6);
  return spine({ needle: n, drip: seg(lt, 4.0, 4.6), t: lt }) + callout(860, 120, "Between the spinous processes", seg(lt, 1.2, 1.6) * (1 - seg(lt, 3.8, 4.1)), C.teal) + callout(860, 120, "Free drip of CSF", seg(lt, 4.2, 4.6), C.teal);
} });
add(8, { step: 6, title: ["Measure the", "pressure"], bullets: ["Spinal manometer attached\nby a three-way stopcock", "Read the CSF pressure", "Then turn the stopcock\nto collect"], draw: lt => {
  const h = seg(lt, 1.2, 4.6);
  let g = `<rect x="500" y="80" width="60" height="620" rx="24" fill="#fff" stroke="${C.ink}" stroke-width="4"/><rect x="508" y="${692 - 420 * h}" width="44" height="${420 * h}" rx="16" fill="#9FD3EA"/>`;
  for (let i = 0; i <= 10; i++) g += `<line x1="560" y1="${692 - i * 58}" x2="${i % 5 ? 580 : 600}" y2="${692 - i * 58}" stroke="${C.muted}" stroke-width="3"/>`;
  g += `<g transform="translate(530 740)"><rect x="-40" y="-20" width="80" height="40" rx="10" fill="${C.teal}"/><circle r="22" fill="#fff" stroke="${C.ink}" stroke-width="4"/><line x1="-14" y1="0" x2="14" y2="0" stroke="${C.ink}" stroke-width="6"/></g>${T(630, 750, "Three-way stopcock", { size: 26, w: 700, fill: C.teal })}`;
  return g + callout(800, 300, "Read the pressure", seg(lt, 4.8, 5.3), C.teal);
} });
add(9, { step: 7, title: ["Collect the", "CSF samples"], bullets: ["Three to five sterile\nspecimen tubes", "Number them in order", "Note colour and turbidity"], draw: lt => {
  let g = "";
  for (let i = 0; i < 5; i++) { const x = 140 + i * 180, f = seg(lt, 0.6 + i * 0.8, 1.3 + i * 0.8);
    g += `<g transform="translate(${x} 200)"><rect x="0" y="0" width="90" height="300" rx="20" fill="#fff" stroke="${C.ink}" stroke-width="4"/><rect x="6" y="${294 - 200 * f}" width="78" height="${200 * f}" rx="14" fill="#E6F4FA"/><rect x="-6" y="-30" width="102" height="40" rx="10" fill="${i < 3 ? C.teal : "#9DB9C3"}"/>${T(45, -2, String(i + 1), { size: 26, w: 800, anchor: "middle", fill: "#fff" })}</g>`; }
  g += T(560, 580, "Tubes 4 and 5 if required", { size: 26, anchor: "middle", fill: C.muted });
  return g + callout(560, 680, "Note colour and turbidity", seg(lt, 4.8, 5.4), C.teal);
} });
add(9, { step: 8, title: ["After the", "needle is out"], bullets: ["Gauze with tincture iodine", "Direct pressure 30 seconds", "Adhesive dressing", "Dispose, remove gloves,\nwash hands"], draw: lt => {
  let g = `<rect x="0" y="0" width="1120" height="840" fill="${C.skinT}"/><path d="M 560 0 V 840" stroke="${C.skinEdge}" stroke-width="4" opacity=".35"/>`;
  g += `<circle cx="560" cy="420" r="8" fill="#B0554A"/>`;
  const gz = seg(lt, 0.6, 1.4), pr = seg(lt, 1.8, 2.4) * (1 - seg(lt, 5.0, 5.4)), dr = seg(lt, 5.4, 6.2);
  g += `<g opacity="${gz * (1 - dr)}"><rect x="500" y="360" width="120" height="120" rx="10" fill="#fff" stroke="#B8C4C9" stroke-width="3"/><circle cx="560" cy="420" r="30" fill="#9A5A1E" opacity=".6"/></g>`;
  g += `<g opacity="${pr}">${glove(600, 400, 110, 64, -20)}</g>${stopwatch2b(880, 260, seg(lt, 2.2, 5.0), pr)}`;
  g += `<g opacity="${dr}"><rect x="480" y="370" width="160" height="100" rx="18" fill="#F3E3D2" stroke="#D2B79A" stroke-width="3"/><rect x="530" y="390" width="60" height="60" rx="8" fill="#fff"/></g>`;
  return g + callout(880, 420, "Press 30 seconds", pr, C.teal) + callout(560, 600, "Adhesive dressing", dr, C.teal);
} });
add(10, { step: 9, crit: true, title: ["Observe after", "the procedure"], bullets: ["Level of consciousness;\npupil size and reaction", "Breathing and vital signs", "Numbness, tingling or pain\ndown the legs", "Site: swelling, bruising,\nCSF leak"], draw: lt => checkCards([["Consciousness and pupils", "Level of consciousness, size, reaction"], ["Breathing and vital signs", ""], ["Legs", "Numbness, tingling, radiating pain"], ["Puncture site", "Oedema, bruising, CSF oozing"]], lt, 80, 960, 140, 170, 110, C.teal) + callout(560, 800, "Report any change promptly", seg(lt, 3.6, 4.2), C.red) });
add(8, { step: 10, title: ["Care for the", "person"], bullets: ["Calm and reassuring", "Privacy: drape, minimal\nexposure", "Communicate with the team;\nreport distress", "Strict asepsis; ethical care"], draw: lt => checkCards([["Calm and reassuring", "Before, during and after"], ["Privacy and dignity", "Appropriate draping"], ["Clear communication", "With the physician and team"], ["Advocate for safety", "Report distress or complications"]], lt) });
add(9, { step: 11, title: ["Document and", "report"], bullets: ["CSF appearance, specimens,\npressure readings", "Condition, vital signs,\nneuro status, intake/output", "Site: CSF leak or bleeding", "Adverse reaction:\nrecord and raise an OVA"], draw: lt => {
  const rows = [["CSF appearance", "Clear, colourless"], ["Specimens", "3 tubes sent to lab"], ["Opening pressure", "15 cm H₂O"], ["Vital signs / neuro", "Stable · GCS 15"], ["Intake / output", "Recorded"], ["Puncture site", "Dry, no CSF leak"], ["Adverse reaction", "None (OVA if any)"]];
  let g = `<rect x="140" y="60" width="840" height="740" rx="24" fill="${C.bg}"/><rect x="390" y="30" width="340" height="60" rx="14" fill="${C.ink}"/>${T(560, 72, "LP record", { size: 28, w: 700, anchor: "middle", fill: "#fff" })}`;
  rows.forEach(([h, v], i) => { const y = 140 + i * 92, p = seg(lt, 0.3 + i * 0.5, 0.7 + i * 0.5); g += `${T(190, y + 30, h, { size: 26, fill: C.muted })}<line x1="490" y1="${y + 42}" x2="940" y2="${y + 42}" stroke="${C.line}" stroke-width="3"/><g opacity="${p}">${T(490, y + 30, v, { size: 28, w: 700, fill: C.teal })}</g>`; });
  return g;
} });
add(5, { kind: "end" });

function stopwatch2b(x, y, p, op) {
  const a = p * 2 * Math.PI;
  return `<g opacity="${op}" transform="translate(${x} ${y})"><circle r="70" fill="#fff" stroke="${C.ink}" stroke-width="6"/><path d="M 0 0 L 0 -60 A 60 60 0 ${a > Math.PI ? 1 : 0} 1 ${60 * Math.sin(a)} ${-60 * Math.cos(a)} Z" fill="${C.tealSoft}"/><circle r="6" fill="${C.ink}"/></g>`;
}
