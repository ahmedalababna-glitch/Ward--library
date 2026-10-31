// ---------- PEG tube scenes (Module 04, RMS.NCC.MW.F.009) ----------
const SCENES = [];
const add = (dur, o) => SCENES.push(Object.assign({ dur }, o));
const SKIN_Y = 380;

// side cross-section: skin, abdominal wall, stomach, internal + external bumper
function pegAnat(o = {}) {
  const lift = (o.lift || 0) * 34, lab = o.labels ?? 1;
  let g = `<rect x="0" y="${SKIN_Y}" width="1120" height="26" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3"/><rect x="0" y="${SKIN_Y + 26}" width="1120" height="70" fill="#F4DCC8"/><rect x="0" y="${SKIN_Y + 96}" width="1120" height="34" fill="#E3A99E"/>`;
  g += `<path d="M 0 ${SKIN_Y + 130} H 1120 V 840 H 0 Z" fill="#F6D3CC"/><path d="M 0 ${SKIN_Y + 130} H 1120" stroke="#D98C82" stroke-width="4"/>`;
  if (o.drain) g += `<ellipse cx="560" cy="${SKIN_Y + 4}" rx="${50 * o.drain}" ry="${10 * o.drain}" fill="#E9D27A" opacity=".8"/>`;
  g += `<rect x="544" y="${SKIN_Y - 330}" width="32" height="${330 + 170}" fill="#F7F3EA" stroke="#B9AE8E" stroke-width="3"/>`; // tube through the wall
  g += `<path d="M 470 ${SKIN_Y + 175} Q 560 ${SKIN_Y + 120} 650 ${SKIN_Y + 175} Z" fill="#F7F3EA" stroke="#B9AE8E" stroke-width="3"/>`; // internal bumper
  g += `<g transform="rotate(${o.rot || 0} 560 ${SKIN_Y - 12 - lift})"><rect x="470" y="${SKIN_Y - 24 - lift}" width="180" height="24" rx="8" fill="#C9DCE3" stroke="#7FA0AC" stroke-width="3"/></g>`; // external bumper
  if (lab) g += `<g opacity="${lab}">${T(40, SKIN_Y - 16, "Skin", { size: 24, fill: C.muted })}${T(40, SKIN_Y + 72, "Abdominal wall", { size: 24, fill: C.muted })}${T(40, SKIN_Y + 200, "Stomach", { size: 26, w: 700, fill: "#B0554A" })}${T(680, SKIN_Y - 6, "External bumper", { size: 24, w: 700, fill: "#4F7682" })}${T(680, SKIN_Y + 172, "Internal bumper", { size: 24, w: 700, fill: "#8A7F60" })}${T(600, SKIN_Y - 290, "PEG tube", { size: 24, w: 700, fill: "#8A7F60" })}</g>`;
  return g;
}
function bigSyringe(x, y, level, label) { // vertical barrel used for gravity flow
  return `<g transform="translate(${x} ${y})"><rect x="0" y="0" width="90" height="220" rx="10" fill="#fff" stroke="${C.ink}" stroke-width="4"/><rect x="5" y="${5 + 210 * (1 - level)}" width="80" height="${210 * level}" fill="#9FD3EA"/><rect x="35" y="220" width="20" height="40" fill="${C.ink}"/>${T(45, -18, label, { size: 26, w: 800, anchor: "middle", fill: C.teal })}</g>`;
}

add(4.5, { kind: "title" });
add(8, { step: 1, title: ["Know the", "PEG tube"], bullets: ["Indications and purpose:\nlong-term enteral feeding", "Know the contraindications", "Understand insertion\nand management"], draw: lt => {
  let g = pegAnat({ labels: seg(lt, 1.0, 1.8) });
  g += `<path d="M 560 ${SKIN_Y - 330} q 0 -40 60 -50" fill="none" stroke="#F7F3EA" stroke-width="30" opacity="0"/>`;
  return g + callout(800, 200, "Percutaneous endoscopic gastrostomy", seg(lt, 2.4, 3.0), C.teal);
} });
add(8, { step: 2, title: ["Assemble the", "equipment"], bullets: ["Confirm the physician's order", "Dressing set, sterile\nnormal saline", "Non-sterile and sterile gloves", "Sterile gauze dressing,\nface masks"], draw: lt => checkCards([["Physician's order confirmed", ""], ["Dressing set", ""], ["Sterile normal saline vial", ""], ["Non-sterile + sterile gloves", ""], ["Sterile gauze dressing", "e.g. Primapore or Opsite"], ["Face masks", ""]], lt, 80, 960, 104, 122, 50) });
add(8, { step: 3, title: ["Prepare", "the patient"], bullets: ["New PEG = first week\nafter insertion", "Explain; head slightly elevated", "Curtains drawn,\nvisitors asked to leave", "Confirm patient identity"], draw: lt => checkCards([["Newly inserted PEG", "Within the first week of insertion"], ["Explain and position", "Head slightly elevated"], ["Privacy", "Curtains drawn, visitors leave"], ["Identity confirmed", "Right patient"]], lt) });
add(9, { step: 4, title: ["Remove the", "old dressing"], bullets: ["Change at least daily", "Wash hands; non-sterile\ngloves and mask", "Prevent aspiration", "Check for infection\nand skin integrity"], draw: lt => {
  const off = seg(lt, 1.0, 2.6);
  let g = pegAnat({ labels: 0 });
  g += `<g opacity="${1 - off}" transform="translate(${off * 300} ${-off * 120}) rotate(${off * 20} 560 ${SKIN_Y - 30})"><rect x="430" y="${SKIN_Y - 60}" width="100" height="60" rx="8" fill="#fff" stroke="#B8C4C9" stroke-width="3"/><rect x="590" y="${SKIN_Y - 60}" width="100" height="60" rx="8" fill="#fff" stroke="#B8C4C9" stroke-width="3"/></g>`;
  const ins = seg(lt, 3.0, 3.6);
  g += `<g opacity="${ins}"><circle cx="560" cy="${SKIN_Y}" r="${120 + 6 * Math.sin(lt * 4)}" fill="none" stroke="${C.teal}" stroke-width="5" stroke-dasharray="12 10"/></g>`;
  g += callout(820, 150, "Redness? Swelling? Pus? Pain?", seg(lt, 3.4, 3.9), C.red);
  return g;
} });
add(10, { step: 5, crit: true, title: ["Clean the stoma", "aseptically"], bullets: ["Sterile field, sterile gloves", "Slide outer bumper ~1 cm\nfrom the skin", "Inspect drainage and tube", "0.9% sodium chloride, circular\noutward motion; rinse well"], draw: lt => {
  const lift = seg(lt, 0.8, 2.0), dr = seg(lt, 2.4, 3.2) * (1 - seg(lt, 5.0, 6.0));
  let g = pegAnat({ lift, labels: 0, drain: dr });
  g += callout(830, 230, "Slide bumper ~1 cm", seg(lt, 1.0, 1.4) * (1 - seg(lt, 2.4, 2.7)), C.teal);
  g += callout(830, 230, "Press gently: any drainage?", seg(lt, 2.6, 3.0) * (1 - seg(lt, 4.0, 4.3)), C.teal);
  // top-view inset: circular outward cleaning
  const sp = seg(lt, 4.2, 7.4), ip = seg(lt, 4.0, 4.4);
  let path = ""; const n = 120;
  for (let i = 0; i <= n * sp; i++) { const a = i / n * Math.PI * 6, r = 22 + i / n * 90; path += (i ? "L" : "M") + (160 + r * Math.cos(a)).toFixed(1) + " " + (150 + r * Math.sin(a)).toFixed(1) + " "; }
  g += `<g opacity="${ip}" transform="translate(760 470)"><rect width="320" height="320" rx="24" fill="#fff" stroke="${C.line}" stroke-width="3"/><circle cx="160" cy="150" r="120" fill="${C.skin}"/><circle cx="160" cy="150" r="20" fill="#F7F3EA" stroke="#B9AE8E" stroke-width="3"/>${path ? `<path d="${path}" fill="none" stroke="${C.teal}" stroke-width="6" stroke-linecap="round"/>` : ""}${T(160, 300, "Circular, outward", { size: 24, w: 800, anchor: "middle", fill: C.teal })}</g>`;
  return g + callout(560, 60, "0.9% sodium chloride, aseptic technique", seg(lt, 4.6, 5.0), C.red);
} });
add(8, { step: 6, title: ["Rotate and", "replace the bumper"], bullets: ["Rotate outer bumper 90°", "Slide it back over\nthe exit site", "Not too tight on the skin"], draw: lt => {
  const r = seg(lt, 0.8, 2.6), down = seg(lt, 3.0, 4.4);
  let g = pegAnat({ lift: 1 - down, labels: 0 });
  g += `<g transform="translate(760 120)"><rect width="320" height="300" rx="24" fill="#fff" stroke="${C.line}" stroke-width="3"/><circle cx="160" cy="140" r="110" fill="${C.skin}"/><g transform="rotate(${90 * r} 160 140)"><rect x="70" y="118" width="180" height="44" rx="14" fill="#C9DCE3" stroke="#7FA0AC" stroke-width="3"/><rect x="152" y="118" width="16" height="44" fill="#7FA0AC"/></g><circle cx="160" cy="140" r="18" fill="#F7F3EA" stroke="#B9AE8E" stroke-width="3"/>${T(160, 280, "Top view", { size: 22, anchor: "middle", fill: C.muted })}</g>`;
  g += callout(920, 470, "Rotate 90°", seg(lt, 1.0, 1.4), C.teal) + callout(300, 220, "Slide back over the site", seg(lt, 3.2, 3.6), C.teal);
  return g;
} });
add(9, { step: 7, title: ["Dressing", "rules"], bullets: ["Gauze over the site only if\nleaking or risk of dislodging", "Never under the bumper;\nnever cover the tube", "Date and time on the tape;\nlabel every tube", "Healed (~1 week):\nno dressing needed"], draw: lt => checkCards([["Gauze UNDER the outer bumper", "Never"], ["Dressing covering the tube", "Never"]], lt, 80, 960, 130, 160, 60, C.red) + checkCards([["Gauze over the site if needed", "Leakage, or risk of dislodging"], ["Date + time on the tape", "Other tubes: name and number"], ["Healed site (~1 week)", "No dressing required"]], Math.max(0, lt - 1.4), 80, 960, 130, 160, 380) });
add(9, { step: 8, crit: true, title: ["Before the", "first feed"], bullets: ["24 hours after insertion", "Peristalsis present", "Doctor's order", "Semi-Fowler's position;\nright feed, right volume"], draw: lt => {
  let g = checkCards([["24 hours post insertion", ""], ["Peristalsis present", ""], ["Doctor's order", ""]], lt, 60, 560, 120, 150, 60);
  const b = seg(lt, 2.4, 3.2), ang = lerp(0, 40, seg(lt, 3.0, 4.4));
  g += `<g opacity="${b}" transform="translate(640 140)"><rect x="0" y="330" width="440" height="34" rx="10" fill="#9DB9C3"/><rect x="20" y="364" width="18" height="90" fill="#9DB9C3"/><rect x="400" y="364" width="18" height="90" fill="#9DB9C3"/>`;
  g += `<rect x="200" y="290" width="240" height="40" rx="12" fill="#E3EEF2" stroke="#8DA9B4" stroke-width="3"/><rect x="215" y="252" width="215" height="40" rx="18" fill="#CFE3EA" stroke="#9DB9C3" stroke-width="2"/>`;
  g += `<g transform="rotate(${ang} 200 310)"><rect x="10" y="290" width="190" height="40" rx="12" fill="#E3EEF2" stroke="#8DA9B4" stroke-width="3"/><rect x="60" y="252" width="150" height="40" rx="18" fill="#CFE3EA" stroke="#9DB9C3" stroke-width="2"/><circle cx="30" cy="262" r="32" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3"/></g>`;
  g += `<path d="M 200 310 m -70 0 a 70 70 0 0 1 ${70 - 70 * Math.cos(ang * Math.PI / 180)} ${-70 * Math.sin(ang * Math.PI / 180)}" fill="none" stroke="${C.teal}" stroke-width="4" opacity="${seg(lt, 3.4, 4.0)}"/>`;
  g += `${T(220, 520, "Semi-Fowler's", { size: 32, w: 800, anchor: "middle", fill: C.teal })}${T(220, 560, "head up 30–45°", { size: 26, anchor: "middle", fill: C.muted })}</g>`;
  return g + callout(560, 760, "Verify feed type and volume", seg(lt, 5.0, 5.6), C.teal);
} });
add(9, { step: 9, title: ["Check residual", "and patency"], bullets: ["Assess residual gastric\ncontents as per policy", "Patency: let 30 ml water\nflow in by gravity", "Doesn't flow? Don't force;\nescalate"], draw: lt => {
  const lvl = 1 - seg(lt, 2.0, 5.0);
  let g = pegAnat({ labels: 0 });
  g += bigSyringe(515, 50, lvl, "30 ml water");
  g += `<rect x="553" y="${SKIN_Y - 70}" width="14" height="${(1 - lvl) * 230}" fill="#9FD3EA" opacity="${lvl < 1 ? 0.8 : 0}"/>`;
  g += callout(840, 160, "Flows freely = patent", seg(lt, 5.2, 5.8), C.green);
  return g + callout(840, 260, "Gravity, no pushing", seg(lt, 2.2, 2.6) * (1 - seg(lt, 4.8, 5.1)), C.teal);
} });
add(9, { step: 10, title: ["Feeding", "and flushing"], bullets: ["Follow the procedure for\ncontinuous or intermittent feeds", "Flush when required\nby policy", "Clean the syringe after use", "Replace bag and tubing\nat set intervals"], draw: lt => checkCards([["Continuous or intermittent", "Follow the correct procedure"], ["Flush the tube", "At the times set by policy"], ["Feeding syringe", "Clean and store after each use"], ["Bag and tubing", "Replace at the set interval"]], lt) });
add(8, { step: 11, title: ["Watch for", "intolerance"], bullets: ["Nausea, vomiting,\nabdominal distension", "Stop the feed, sit the\npatient up, assess", "Inform the doctor"], draw: lt => checkCards([["Nausea", ""], ["Vomiting", ""], ["Abdominal distension", ""]], lt, 80, 960, 120, 150, 70, C.red) + callout(560, 620, "Stop feed · sit up · assess · inform doctor", seg(lt, 2.6, 3.2), C.teal) });
add(8, { step: 12, title: ["Give medicines", "safely"], bullets: ["Correct administration\nvia the PEG, as per policy", "One medicine at a time", "Flush before, between\nand after"], draw: lt => {
  const st = [["Flush", "before"], ["Med 1", ""], ["Flush", "between"], ["Med 2", ""], ["Flush", "after"]];
  let g = "";
  st.forEach(([h, s], i) => { const x = 40 + i * 212, p = seg(lt, 0.5 + i * 0.7, 1.0 + i * 0.7), fl = h === "Flush";
    g += `<g opacity="${p}" transform="translate(${x} ${300 + (1 - p) * 30})"><rect width="190" height="220" rx="22" fill="${fl ? "#E1F1F8" : C.tealSoft}"/><circle cx="95" cy="70" r="40" fill="${fl ? "#3B8DB5" : C.teal}"/>${T(95, 86, String(i + 1), { size: 40, w: 800, anchor: "middle", fill: "#fff" })}${T(95, 160, h, { size: 30, w: 800, anchor: "middle" })}${s ? T(95, 196, s, { size: 24, anchor: "middle", fill: C.muted }) : ""}</g>`;
    if (i < 4) g += `<g opacity="${p}">${arrow(x + 192, 410, x + 210, 410, C.muted, 4)}</g>`; });
  return g + callout(560, 680, "Check the policy and pharmacist for each drug", seg(lt, 4.4, 5.0), C.teal);
} });
add(7, { step: 13, title: ["Care for the", "person"], bullets: ["Empathy and reassurance", "Dignity and privacy", "Escalate leakage, infection\nor displacement promptly"], draw: lt => checkCards([["Empathy and reassurance", "During care and feeding"], ["Dignity and privacy", "Throughout all procedures"], ["Accountability", "Infection control; escalate complications"]], lt, 80, 960, 160, 220, 140) });
add(8, { step: 14, title: ["Document and", "report"], bullets: ["Tolerance of feeds\nand medicines", "Stoma site: skin, leakage,\nsigns of infection", "Report displacement,\nblockage or complications"], draw: lt => {
  const rows = [["Dressing change", "30/10 · 09:00 · aseptic"], ["Stoma site", "Skin intact · no leakage"], ["Signs of infection", "None"], ["Patency", "30 ml water flowed freely"], ["Feed", "Intermittent · 250 ml"], ["Tolerance", "No nausea or distension"], ["Reported", "Nil abnormal"]];
  let g = `<rect x="140" y="60" width="840" height="740" rx="24" fill="${C.bg}"/><rect x="390" y="30" width="340" height="60" rx="14" fill="${C.ink}"/>${T(560, 72, "PEG care record", { size: 28, w: 700, anchor: "middle", fill: "#fff" })}`;
  rows.forEach(([h, v], i) => { const y = 140 + i * 92, p = seg(lt, 0.3 + i * 0.5, 0.7 + i * 0.5); g += `${T(190, y + 30, h, { size: 26, fill: C.muted })}<line x1="520" y1="${y + 42}" x2="930" y2="${y + 42}" stroke="${C.line}" stroke-width="3"/><g opacity="${p}">${T(520, y + 30, v, { size: 28, w: 700, fill: C.teal })}</g>`; });
  return g;
} });
add(5, { kind: "end" });
