// ---------- TPN scenes (Module 04, RMS.NCC.MW.F.006) ----------
const SCENES = [];
const add = (dur, o) => SCENES.push(Object.assign({ dur }, o));

function grid4(items, lt) {
  return items.map(([h, s], i) => { const x = 60 + (i % 2) * 510, y = 90 + Math.floor(i / 2) * 340, p = seg(lt, 0.3 + i * 0.5, 0.8 + i * 0.5);
    return `<g opacity="${p}" transform="translate(${x} ${y + (1 - p) * 30})"><rect width="490" height="310" rx="24" fill="${C.tealSoft}"/><circle cx="245" cy="115" r="62" fill="${C.teal}"/>${T(245, 132, String(i + 1), { size: 52, w: 800, anchor: "middle", fill: "#fff" })}${T(245, 235, h, { size: 40, w: 800, anchor: "middle" })}${T(245, 278, s, { size: 28, anchor: "middle", fill: C.muted })}</g>`; }).join("");
}
function tpnBag(x, y, s = 1, label = true) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="40" y="-30" width="80" height="30" rx="8" fill="#B9C3C8"/><path d="M 0 0 H 160 V 300 Q 80 360 0 300 Z" fill="#FFF6DD" stroke="#C9B36A" stroke-width="4"/><rect x="0" y="120" width="160" height="${180}" fill="#F7E7B0" opacity=".8"/>${label ? `<rect x="18" y="30" width="124" height="80" rx="8" fill="#fff" stroke="${C.ink}" stroke-width="2"/><line x1="30" y1="52" x2="130" y2="52" stroke="${C.ink}" stroke-width="4"/><line x1="30" y1="72" x2="110" y2="72" stroke="${C.muted}" stroke-width="3"/><line x1="30" y1="90" x2="120" y2="90" stroke="${C.muted}" stroke-width="3"/>` : ""}<rect x="70" y="330" width="20" height="40" fill="#C9B36A"/></g>`;
}
function record(title, rows, lt) {
  let g = `<rect x="140" y="60" width="840" height="740" rx="24" fill="${C.bg}"/><rect x="390" y="30" width="340" height="60" rx="14" fill="${C.ink}"/>${T(560, 72, title, { size: 28, w: 700, anchor: "middle", fill: "#fff" })}`;
  rows.forEach(([h, v], i) => { const y = 140 + i * 92, p = seg(lt, 0.3 + i * 0.5, 0.7 + i * 0.5); g += `${T(190, y + 30, h, { size: 26, fill: C.muted })}<line x1="490" y1="${y + 42}" x2="940" y2="${y + 42}" stroke="${C.line}" stroke-width="3"/><g opacity="${p}">${T(490, y + 30, v, { size: 28, w: 700, fill: C.teal })}</g>`; });
  return g;
}

add(4.5, { kind: "title" });
add(9, { step: 1, title: ["Know", "TPN"], bullets: ["Indications, components\nand goals", "Central or peripheral access:\nthe rationale", "TPN vs enteral nutrition", "Nutritional needs;\nteam planning"], draw: lt => grid4([["Indications", "Gut can't be used enough"], ["Components", "Dextrose, amino acids, lipids…"], ["Route", "Central or peripheral access"], ["Team", "Dietitian · pharmacist · doctor"]], lt) });
add(9, { step: 2, title: ["Know the", "risks"], bullets: ["Metabolic, mechanical,\ninfectious", "CRBSI, hyperglycaemia,\nelectrolyte imbalance", "Watch glucose, electrolytes,\nliver function", "Start, adjust and stop\nby protocol"], draw: lt => checkCards([["Infection (CRBSI)", "Fever, rigors, line site redness"], ["Hyperglycaemia", "Check blood glucose"], ["Electrolyte imbalance", "Check electrolytes"], ["Liver function", "Check LFTs"]], lt, 80, 960, 140, 170, 110, C.red) + callout(560, 800, "Start · titrate · stop by protocol", seg(lt, 3.4, 4.0), C.teal) });
add(9, { step: 3, title: ["Prepare the", "patient"], bullets: ["Hand hygiene and PPE", "Introduce yourself; authorised\npatient identifiers", "Explain; verbal consent", "Check the order; equipment;\nsterile field"], draw: lt => checkCards([["Hand hygiene and PPE", ""], ["Patient identified", "Authorised identifiers"], ["Explained · verbal consent", "Patient or relatives"], ["Physician order checked", ""], ["Equipment organised", ""], ["Sterile field prepared", ""]], lt, 80, 960, 104, 122, 50) });
add(10, { step: 4, crit: true, title: ["Check the label", "with a second nurse"], bullets: ["Compare the TPN label with\nthe physician's order", "Counter-check with\nanother staff member", "Stick the label on the bottle"], draw: lt => {
  let g = tpnBag(170, 200, 1.15);
  g += `<g transform="translate(560 160)"><rect width="420" height="420" rx="20" fill="#fff" stroke="${C.line}" stroke-width="3"/>${T(210, 60, "Physician's order", { size: 30, w: 800, anchor: "middle", fill: C.teal })}`;
  [["Patient", 0.6], ["Formula", 1.2], ["Volume", 1.8], ["Rate", 2.4], ["Additives", 3.0]].forEach(([l, t0], i) => { g += `${T(40, 130 + i * 60, l, { size: 28, w: 700 })}${tick(360, 120 + i * 60, 0.7, seg(lt, t0, t0 + 0.4))}`; });
  g += `</g>`;
  g += `<g opacity="${seg(lt, 3.8, 4.4)}"><circle cx="680" cy="700" r="44" fill="${C.teal}"/>${T(680, 712, "RN 1", { size: 24, w: 800, anchor: "middle", fill: "#fff" })}<circle cx="860" cy="700" r="44" fill="${C.teal}"/>${T(860, 712, "RN 2", { size: 24, w: 800, anchor: "middle", fill: "#fff" })}</g>`;
  return g + callout(770, 800, "Two-nurse check", seg(lt, 4.0, 4.4), C.red);
} });
add(10, { step: 5, crit: true, title: ["Two-person", "aseptic set-up"], bullets: ["Assistant: opens the IV set,\nsyringes and needles", "Assistant: removes the\nwrapping; alcohol wipe", "Other nurse: gloves on;\nstarts the infusion"], draw: lt => {
  let g = `<rect x="60" y="80" width="480" height="680" rx="24" fill="${C.bg}"/><rect x="580" y="80" width="480" height="680" rx="24" fill="${C.tealSoft}"/>${T(300, 140, "Assisting staff", { size: 32, w: 800, anchor: "middle", fill: C.muted })}${T(820, 140, "Other nurse", { size: 32, w: 800, anchor: "middle", fill: C.teal })}`;
  [["Opens the IV set", 0.6], ["Opens syringes, needles", 1.4], ["Removes bottle wrapping", 2.2], ["Wipes with alcohol swab", 3.0]].forEach(([l, t0], i) => { g += `<g opacity="${seg(lt, t0, t0 + 0.5)}"><rect x="90" y="${200 + i * 130}" width="420" height="100" rx="18" fill="#fff"/>${T(300, 260 + i * 130, l, { size: 28, w: 700, anchor: "middle" })}</g>`; });
  [["Sterile gloves on", 3.8], ["Starts the infusion", 4.6]].forEach(([l, t0], i) => { g += `<g opacity="${seg(lt, t0, t0 + 0.5)}"><rect x="610" y="${200 + i * 130}" width="420" height="100" rx="18" fill="#fff"/>${T(820, 260 + i * 130, l, { size: 28, w: 700, anchor: "middle" })}</g>`; });
  return g;
} });
add(10, { step: 6, crit: true, title: ["Connect and", "protect the line"], bullets: ["Attach the TPN tubing to\nthe central line port", "Cover the ports with sterile\ngauze and tape", "Wrap the limbs in a small\ngreen towel", "Remove gloves; position\nthe patient"], draw: lt => {
  let g = `<rect x="0" y="0" width="1120" height="840" fill="${C.skinT}"/>`;
  g += `<g transform="translate(380 420) rotate(-20)"><rect x="-200" y="-14" width="220" height="28" rx="12" fill="#fff" stroke="#B9C3C8" stroke-width="3"/><rect x="0" y="-36" width="60" height="72" rx="12" fill="#E5ECEF" stroke="#B9C3C8" stroke-width="3"/>`;
  [["#8B5A2B", -30], ["#3B6FD6", 0], ["#EDEDED", 30]].forEach(([c, dy]) => { g += `<line x1="60" y1="${dy * 0.3}" x2="260" y2="${dy * 2}" stroke="${c}" stroke-width="14" stroke-linecap="round"/><rect x="254" y="${dy * 2 - 16}" width="44" height="32" rx="6" fill="${c}" stroke="#8E9CA2" stroke-width="2"/>`; });
  const at = seg(lt, 0.8, 2.0);
  g += `<path d="M 298 0 C ${360 + 200 * (1 - at)} 0, 500 -120, 700 -260" fill="none" stroke="#C9B36A" stroke-width="10" opacity="${at}"/>`;
  const gz = seg(lt, 2.6, 3.4), tw = seg(lt, 4.2, 5.2);
  g += `<rect x="230" y="-110" width="110" height="220" rx="14" fill="#fff" stroke="#C8D2D6" stroke-width="3" opacity="${gz * (1 - tw * 0.6)}"/>`;
  g += `<rect x="40" y="-150" width="320" height="300" rx="30" fill="#4E9A6B" opacity="${tw * 0.92}"/></g>`;
  return g + callout(800, 120, "TPN tubing to the port", seg(lt, 1.0, 1.4), C.teal) + callout(800, 620, "Sterile gauze + tape", seg(lt, 2.8, 3.2), C.teal) + callout(800, 700, "Small green towel", seg(lt, 4.4, 4.8), C.teal);
} });
add(8, { step: 7, title: ["Set the", "pump"], bullets: ["Set the infusion pump to\nthe prescribed volume", "Dispose of equipment;\nwash hands", "Check the pump every hour"], draw: lt => {
  const v = Math.round(lerp(0, 83, seg(lt, 0.8, 2.6)));
  let g = tpnBag(150, 120, 0.9, false) + `<path d="M 222 450 C 222 520, 300 560, 420 560" fill="none" stroke="#C9B36A" stroke-width="8"/>`;
  g += `<g transform="translate(420 300)"><rect width="420" height="440" rx="30" fill="#E9EEF0" stroke="#8DA9B4" stroke-width="5"/><rect x="40" y="40" width="340" height="180" rx="14" fill="#13343A"/>${T(70, 100, "RATE", { size: 22, w: 700, fill: "#7FD1C7" })}${T(350, 180, v + " ml/h", { size: 64, w: 800, fill: "#E8FFFB", anchor: "end" })}<circle cx="110" cy="320" r="40" fill="${C.green}"/><circle cx="210" cy="320" r="40" fill="#C9D2D8"/><circle cx="310" cy="320" r="40" fill="${C.red}"/></g>`;
  return g + callout(630, 820 - 40, "Check the pump hourly", seg(lt, 3.6, 4.0), C.teal);
} });
add(10, { step: 8, crit: true, title: ["Monitor", "closely"], bullets: ["Vital signs every 4–8 hours", "Blood glucose every 6 hours", "Central line site every shift", "Site care every 48 hours\n(infection control manual)"], draw: lt => {
  const st = [["Pump", "every hour"], ["Vitals", "every 4–8 h"], ["Glucose", "every 6 h"], ["Line site", "every shift"], ["Site care", "every 48 h"]];
  let g = "";
  st.forEach(([h, s], i) => { const x = 40 + i * 212, p = seg(lt, 0.5 + i * 0.8, 1.0 + i * 0.8);
    g += `<g opacity="${p}" transform="translate(${x} ${280 + (1 - p) * 30})"><rect width="190" height="260" rx="22" fill="${i === 2 ? C.redSoft : C.bg}"/><circle cx="95" cy="70" r="40" fill="${i === 2 ? C.red : C.teal}"/>${T(95, 86, String(i + 1), { size: 40, w: 800, anchor: "middle", fill: "#fff" })}${T(95, 168, h, { size: 30, w: 800, anchor: "middle" })}${T(95, 210, s, { size: 26, anchor: "middle", fill: C.muted })}</g>`; });
  return g;
} });
add(8, { step: 9, crit: true, title: ["Never leave", "TPN unattended"], bullets: ["Never leave TPN solutions\nunattended", "TPN and lipids on rolling\ninfusion pumps", "Encourage walking\nif allowed"], draw: lt => checkCards([["TPN left unattended", "Never"]], lt, 80, 960, 160, 190, 120, C.red) + checkCards([["Rolling infusion pumps", "For TPN and lipids"], ["Encourage ambulation", "If allowed"]], Math.max(0, lt - 1.2), 80, 960, 160, 190, 340) });
add(8, { step: 10, title: ["Care for the", "person"], bullets: ["Strict sterile technique", "Vigilant for reactions", "Respectful teamwork", "Empathy, dignity, privacy"], draw: lt => checkCards([["Sterile technique", "Infection prevention every time"], ["Vigilance", "Watch for adverse reactions"], ["Teamwork", "Collaborative, respectful"], ["Empathy and dignity", "Educate patient and family"]], lt) });
add(10, { step: 11, title: ["Document and", "report"], bullets: ["Prescription, times, rates", "Vitals, fluid balance, labs;\ndaily weight", "e-Kardex signed by\ntwo registered nurses", "Report intolerance at once"], draw: lt => record("TPN record", [["Prescription", "Formula as ordered"], ["Started / rate", "30/10 · 18:00 · 83 ml/h"], ["e-Kardex", "Signed by RN 1 + RN 2"], ["Glucose", "8.2 mmol/L at 00:00"], ["Weight", "Daily · 64.5 kg"], ["Intake / output", "TPN + oral recorded"], ["Line site", "Clean · dressing 30/10"]], lt) });
add(5, { kind: "end" });
