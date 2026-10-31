// ---------- Tracheostomy care scenes (Module 04, RMS.NCC.MW.F.003) ----------
const SCENES = [];
const add = (dur, o) => SCENES.push(Object.assign({ dur }, o));
const ST = { x: 560, y: 470 };

// front view of the neck with a tracheostomy tube
function neck(o = {}) {
  let g = `<rect x="0" y="0" width="1120" height="840" fill="#EEF4F6"/>`;
  g += `<path d="M 330 0 L 790 0 L 800 300 C 820 520, 900 640, 1120 700 L 1120 840 L 0 840 L 0 700 C 220 640, 300 520, 320 300 Z" fill="${C.skinT}" stroke="${C.skinEdge}" stroke-width="3"/>`;
  g += `<path d="M 420 0 Q 560 140 700 0" fill="${C.skin}" opacity=".5"/>${T(560, 60, "Chin", { size: 22, fill: C.muted, anchor: "middle" })}`;
  const tp = o.tape ?? 1;
  if (tp) g += `<g opacity="${tp}"><path d="M 380 ${ST.y} C 330 ${ST.y - 20}, 300 ${ST.y - 60}, 300 ${ST.y - 120}" fill="none" stroke="${o.tapeCol || "#F7F7F7"}" stroke-width="22" stroke-linecap="round"/><path d="M 740 ${ST.y} C 790 ${ST.y - 20}, 820 ${ST.y - 60}, 820 ${ST.y - 120}" fill="none" stroke="${o.tapeCol || "#F7F7F7"}" stroke-width="22" stroke-linecap="round"/></g>`;
  if (o.dress) g += `<g opacity="${o.dress}"><path d="M 450 ${ST.y - 20} h 220 v 120 h -220 Z M 545 ${ST.y - 20} v 50 h 30 v -50" fill="${o.dressCol || "#fff"}" stroke="#C8D2D6" stroke-width="3"/></g>`;
  if (o.stomaOnly) {
    g += `<ellipse cx="${ST.x}" cy="${ST.y}" rx="46" ry="34" fill="#C9786C" stroke="#A85A4F" stroke-width="3"/><ellipse cx="${ST.x}" cy="${ST.y}" rx="24" ry="16" fill="#5B2A25"/>`;
    return g;
  }
  g += `<path d="M 380 ${ST.y - 40} Q 560 ${ST.y - 70} 740 ${ST.y - 40} L 740 ${ST.y + 40} Q 560 ${ST.y + 70} 380 ${ST.y + 40} Z" fill="#DDE7EA" stroke="#8DA9B4" stroke-width="4"/>`; // flange
  g += `<circle cx="${ST.x}" cy="${ST.y}" r="56" fill="#fff" stroke="#8DA9B4" stroke-width="4"/><circle cx="${ST.x}" cy="${ST.y}" r="32" fill="#2E3B40"/>`;
  return g;
}

add(4.5, { kind: "title" });
add(9, { step: 1, title: ["Know the", "tube"], bullets: ["Indications for a\ntracheostomy", "Cuffed, uncuffed,\nfenestrated", "Outer and inner cannula,\nflange, cuff, pilot balloon"], draw: lt => {
  const p = seg(lt, 0.4, 1.4);
  let g = `<g opacity="${p}" transform="translate(140 120)">`;
  g += `<path d="M 300 160 C 300 360, 380 480, 560 520" fill="none" stroke="#DDE7EA" stroke-width="90" stroke-linecap="round"/><path d="M 300 160 C 300 360, 380 480, 560 520" fill="none" stroke="#8DA9B4" stroke-width="4" stroke-dasharray="1 0"/>`;
  g += `<path d="M 300 160 C 300 360, 380 480, 560 520" fill="none" stroke="#fff" stroke-width="44" stroke-linecap="round" opacity="${seg(lt, 2.0, 2.6)}"/>`;
  g += `<rect x="140" y="110" width="320" height="60" rx="26" fill="#C9DCE3" stroke="#7FA0AC" stroke-width="4"/>`;
  g += `<ellipse cx="470" cy="480" rx="${70}" ry="${50}" fill="#EAF4FB" stroke="#7FA9C6" stroke-width="4" opacity="${seg(lt, 3.0, 3.6)}"/>`;
  g += `<g opacity="${seg(lt, 3.6, 4.2)}"><path d="M 360 140 C 420 60, 520 40, 600 60" fill="none" stroke="#7FA9C6" stroke-width="5"/><ellipse cx="630" cy="60" rx="34" ry="24" fill="#EAF4FB" stroke="#7FA9C6" stroke-width="4"/></g></g>`;
  g += callout(300, 200, "Flange", seg(lt, 1.4, 1.8), C.teal) + callout(820, 360, "Inner cannula", seg(lt, 2.2, 2.6), C.teal) + callout(820, 700, "Cuff (cuffed tubes)", seg(lt, 3.2, 3.6), C.teal) + callout(860, 120, "Pilot balloon", seg(lt, 3.8, 4.2), C.teal);
  return g;
} });
add(9, { step: 2, title: ["Know the", "complications"], bullets: ["Infection, obstruction,\naccidental decannulation", "Bleeding", "Know the emergency actions", "Spot respiratory distress early"], draw: lt => checkCards([["Obstruction / blockage", "Act at once: emergency plan"], ["Accidental decannulation", "Emergency kit at the bedside"], ["Bleeding", "Report and act promptly"], ["Infection", "Redness, discharge, fever"]], lt, 80, 960, 140, 170, 110, C.red) + callout(560, 800, "Watch for respiratory distress", seg(lt, 3.4, 4.0), C.red) });
add(9, { step: 3, title: ["Keep the", "airway clear"], bullets: ["Suctioning: correct depth,\nduration and frequency", "Humidification and\noxygen as prescribed", "Work with respiratory\ntherapy and ENT"], draw: lt => checkCards([["Suctioning", "Correct depth, duration and frequency"], ["Humidification", "Keeps secretions thin"], ["Oxygen delivery", "Method suited to the tracheostomy"], ["Team", "Respiratory therapy, ENT"]], lt) });
add(9, { step: 4, title: ["Prepare the", "patient"], bullets: ["Check the physician's order", "Two patient identifiers", "Explain (family if the\npatient is unconscious)", "Equipment, privacy,\nsemi-Fowler's or sitting"], draw: lt => checkCards([["Physician's order checked", ""], ["Two patient identifiers", "As per RMS policy"], ["Procedure explained", "Family if the patient is unconscious"], ["Equipment organised", ""], ["Privacy provided", ""], ["Semi-Fowler's or sitting", ""]], lt, 80, 960, 104, 122, 50) });
add(8, { step: 5, title: ["Remove the", "soiled dressing"], bullets: ["Unsterile gloves on", "Remove the soiled\ndressing around the tube", "Look at the stoma and skin"], draw: lt => {
  const r = seg(lt, 1.0, 3.0);
  let g = neck({ dress: 1 - r, dressCol: "#EFE7C6" });
  g += `<g opacity="${seg(lt, 0.4, 1.0) * (1 - r)}">${glove(760, 600, 70, 44, -20)}</g>`;
  return g + callout(560, 720, "Soiled dressing out", seg(lt, 1.2, 1.6), C.teal);
} });
add(10, { step: 6, crit: true, title: ["Change the tapes:", "hold the tube"], bullets: ["Hold the tube in place\nthe whole time", "Untie the soiled tape;\nreplace it immediately", "Two people may help"], draw: lt => {
  const old = 1 - seg(lt, 1.6, 2.6), nw = seg(lt, 3.0, 4.2);
  let g = neck({ tape: 0 });
  g += `<g opacity="${old}"><path d="M 380 ${ST.y} C 330 ${ST.y - 20}, 300 ${ST.y - 60}, 300 ${ST.y - 120}" fill="none" stroke="#E6DDB8" stroke-width="22" stroke-linecap="round"/><path d="M 740 ${ST.y} C 790 ${ST.y - 20}, 820 ${ST.y - 60}, 820 ${ST.y - 120}" fill="none" stroke="#E6DDB8" stroke-width="22" stroke-linecap="round"/></g>`;
  g += `<g opacity="${nw}"><path d="M 380 ${ST.y} C 330 ${ST.y - 20}, 300 ${ST.y - 60}, 300 ${ST.y - 120}" fill="none" stroke="#fff" stroke-width="22" stroke-linecap="round" stroke-dasharray="${400 * nw} 400"/><path d="M 740 ${ST.y} C 790 ${ST.y - 20}, 820 ${ST.y - 60}, 820 ${ST.y - 120}" fill="none" stroke="#fff" stroke-width="22" stroke-linecap="round" stroke-dasharray="${400 * nw} 400"/></g>`;
  g += `<g opacity="${seg(lt, 0.4, 1.0)}">${glove(470, ST.y - 10, 66, 40, 10)}${glove(650, ST.y - 10, 66, 40, -10)}</g>`;
  return g + callout(560, 200, "Hold the tube in place", seg(lt, 0.8, 1.2), C.red) + callout(560, 720, "New tape at once", seg(lt, 3.2, 3.6), C.teal);
} });
add(10, { step: 7, crit: true, title: ["Clean the", "stoma aseptically"], bullets: ["Remove unsterile gloves,\nwash hands, sterile gloves", "Antibacterial solution\nand normal saline", "Never let solution enter\nthe tracheostomy"], draw: lt => {
  let g = neck({});
  const sp = seg(lt, 1.6, 4.6); let path = ""; const n = 100;
  for (let i = 0; i <= n * sp; i++) { const a = i / n * Math.PI * 4, rx = 120 + i / n * 70, ry = 70 + i / n * 40; path += (i ? "L" : "M") + (ST.x + rx * Math.cos(a)).toFixed(1) + " " + (ST.y + ry * Math.sin(a)).toFixed(1) + " "; }
  if (path) g += `<path d="${path}" fill="none" stroke="${C.teal}" stroke-width="6" stroke-linecap="round" opacity=".8"/>`;
  g += `<g opacity="${seg(lt, 5.0, 5.6)}"><circle cx="${ST.x}" cy="${ST.y}" r="70" fill="none" stroke="${C.red}" stroke-width="8"/>${cross(ST.x, ST.y, 30)}</g>`;
  return g + callout(560, 200, "Sterile gloves · aseptic technique", seg(lt, 0.4, 0.9), C.teal) + callout(560, 720, "No solution into the stoma", seg(lt, 5.2, 5.6), C.red);
} });
add(9, { step: 8, title: ["New dressing", "and finish"], bullets: ["Replace the dressing\n(Sofratulle if ordered)", "Infected wound: antiseptic,\nthen dry", "Comfortable position; clear\nthe trolley; wash hands"], draw: lt => {
  let g = neck({ dress: seg(lt, 0.8, 2.0) });
  return g + callout(560, 720, "Keyhole dressing under the flange", seg(lt, 2.0, 2.4), C.teal) + callout(560, 200, "Sofratulle if ordered", seg(lt, 3.0, 3.4), C.teal);
} });
add(8, { step: 9, title: ["Care for the", "person"], bullets: ["Calm and reassuring", "Watch breathing closely;\nrespond to change", "Empathy, respect, dignity", "Strict infection control"], draw: lt => checkCards([["Calm and reassuring", "Minimise anxiety"], ["Vigilant", "Respond to any breathing change"], ["Empathy and dignity", "Respect at all times"], ["Clear team communication", "During every intervention"]], lt) });
add(9, { step: 10, title: ["Document and", "report"], bullets: ["Cleaning, suctioning,\ndressing in the EMR", "Tube type, size, condition;\nstoma site", "Secretions: amount, colour,\nconsistency, odour", "Report bleeding, infection,\ndisplacement; hand over"], draw: lt => {
  const rows = [["Tube", "Cuffed · size 8 · secure"], ["Stoma", "Clean, no redness"], ["Care given", "Cleaned · tapes · dressing"], ["Suction", "x2 · 10:00 / 14:00"], ["Secretions", "Moderate · white · thin"], ["Education", "Family shown tape care"], ["Handover", "Emergency kit at bedside"]];
  let g = `<rect x="140" y="60" width="840" height="740" rx="24" fill="${C.bg}"/><rect x="390" y="30" width="340" height="60" rx="14" fill="${C.ink}"/>${T(560, 72, "Tracheostomy record", { size: 28, w: 700, anchor: "middle", fill: "#fff" })}`;
  rows.forEach(([h, v], i) => { const y = 140 + i * 92, p = seg(lt, 0.3 + i * 0.5, 0.7 + i * 0.5); g += `${T(190, y + 30, h, { size: 26, fill: C.muted })}<line x1="490" y1="${y + 42}" x2="940" y2="${y + 42}" stroke="${C.line}" stroke-width="3"/><g opacity="${p}">${T(490, y + 30, v, { size: 28, w: 700, fill: C.teal })}</g>`; });
  return g;
} });
add(5, { kind: "end" });
