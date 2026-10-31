// ---------- Chest drain insertion scenes (Module 04, RMS.NCC.MW.F.004) ----------
add(4.5, { kind: "title" });
add(8, { step: 1, title: ["Know why", "it is needed"], bullets: ["Pneumothorax", "Haemothorax", "Pleural effusion", "After thoracic surgery"], draw: lt => grid4([["Pneumothorax", "Air in the pleural space"], ["Haemothorax", "Blood in the pleural space"], ["Pleural effusion", "Fluid in the pleural space"], ["Post-surgery", "After thoracic surgery"]], lt) });
add(9, { step: 2, title: ["Know the", "procedure and risks"], bullets: ["Pleural anatomy; site,\nposition and equipment", "Water-seal and\nsuction-assisted systems", "Bleeding, infection, surgical\nemphysema, lung injury", "Emergencies: tension\npneumothorax, equipment failure"], draw: lt => checkCards([["Procedure", "Site, positioning, equipment set-up"], ["Drainage systems", "Water seal · suction-assisted"], ["Complications", "Bleeding, infection, emphysema, lung injury"], ["Emergencies", "Tension pneumothorax · equipment failure"]], lt) });
add(9, { step: 3, title: ["Prepare the", "patient"], bullets: ["Identify the patient", "Consent obtained by\nthe doctor", "Analgesia as prescribed", "Position; Inco-pad under\nthe chest"], draw: lt => checkCards([["Patient identified", ""], ["Consent obtained by the doctor", ""], ["Analgesia given as prescribed", ""], ["Items assembled, expiry checked", ""], ["Hand hygiene, non-sterile gloves", ""], ["Positioned; Inco-pad under chest", ""]], lt, 80, 960, 104, 122, 50) });
add(9, { step: 4, crit: true, title: ["Prepare the", "water seal"], bullets: ["Hand hygiene and PPE", "Fill the water seal to\nthe marked level", "Make the connections"], draw: lt => {
  const f = seg(lt, 1.0, 3.4);
  let g = drainUnit(350, 200, { collect: 0, seal: f, suction: 0 });
  g += callout(560, 120, "Fill to the marked line", seg(lt, 1.4, 1.8), C.teal);
  return g + `<g opacity="${seg(lt, 3.6, 4.2)}">${tick(560, 730, 1)}${T(600, 742, "Water seal ready", { size: 30, w: 800, fill: C.green })}</g>`;
} });
add(8, { step: 5, crit: true, title: ["Sterile field;", "assist the doctor"], bullets: ["Chest drain set on a\nsterile field", "Strict aseptic technique", "Assist the doctor\nthroughout"], draw: lt => checkCards([["Sterile field", "Chest drain set opened aseptically"], ["Aseptic technique", "No breaks in sterility"], ["Assist the doctor", "Hand over what is needed"], ["Watch the patient", "Breathing, colour, pain"]], lt) });
add(9, { step: 6, title: ["Connect the", "system"], bullets: ["Connect the drainage\nsystem to the chest tube", "Connect to wall suction\nas ordered", "Unit upright, below\nthe chest"], draw: lt => {
  const c = seg(lt, 0.8, 2.2), s = seg(lt, 3.0, 4.2);
  let g = chest({ tx: lerp(560, 690, c), ty: lerp(500, 600, c) });
  g += drainUnit(620, 360, { collect: 0.05, seal: 1, suction: s, t: lt, bubble: 0, labels: 0 });
  g += `<g opacity="${s}"><path d="M 975 360 C 980 260, 1000 200, 1060 160" fill="none" stroke="#8DA9B4" stroke-width="12"/><rect x="1040" y="110" width="60" height="60" rx="10" fill="${C.ink}"/></g>`;
  return g + callout(840, 300, "Wall suction as ordered", seg(lt, 3.4, 3.8), C.teal) + callout(830, 860 - 40, "Below chest level", seg(lt, 4.6, 5.0), C.teal);
} });
add(8, { step: 7, crit: true, title: ["Chest X-ray", "urgently"], bullets: ["Arrange the chest X-ray\nurgently", "Sharps into the sharps bin", "Clean the trolley;\nhand hygiene"], draw: lt => checkCards([["Urgent chest X-ray", "Confirms the tube position"], ["Sharps disposed", "Into the correct container"], ["Equipment cleared", "Trolley cleaned"], ["Hand hygiene", ""]], lt) });
add(10, { step: 8, crit: true, title: ["Monitor after", "insertion"], bullets: ["Vital signs as per policy", "Analgesia", "Drainage amount and colour", "Air leak; water levels in\nsuction and air leak chambers"], draw: lt => {
  let g = drainUnit(120, 220, { collect: lerp(0.05, 0.3, seg(lt, 0.5, 6)), seal: 1, suction: 1, bubble: seg(lt, 3.0, 3.6), t: lt });
  g += callout(780, 260, "Amount and colour", seg(lt, 1.0, 1.4), C.teal) + callout(780, 380, "Air leak: bubbling?", seg(lt, 3.0, 3.4), C.teal) + callout(780, 500, "Water levels correct", seg(lt, 4.6, 5.0), C.teal);
  return g + callout(780, 620, "Vital signs · analgesia", seg(lt, 6.0, 6.4), C.teal);
} });
add(8, { step: 9, warn: true, title: ["Sudden", "deterioration"], bullets: ["Tension pneumothorax", "Equipment failure", "Call for help; follow the\nemergency protocol"], draw: lt => checkCards([["Tension pneumothorax", "Sudden breathlessness, falling SpO₂"], ["Equipment failure", "Disconnection, broken unit"]], lt, 80, 960, 150, 190, 150, C.red) + callout(560, 620, "Call for help · emergency protocol", seg(lt, 2.4, 3.0), C.red) });
add(7, { step: 10, title: ["Care for the", "person"], bullets: ["Calm and supportive", "Privacy and draping", "Respond to discomfort", "Ask when unsure"], draw: lt => checkCards([["Calm and supportive", "Promotes cooperation"], ["Dignity", "Draping, minimal exposure"], ["Responsive", "Act on pain or concern"], ["Accountable", "Seek guidance when unsure"]], lt) });
add(9, { step: 11, title: ["Document the", "procedure"], bullets: ["Date, time, indication, site;\nwho did and assisted", "Baseline vitals, oxygen,\nconsent check", "Tube type and size, system,\ncomplications", "Post-procedure observations"], draw: lt => record("Chest drain insertion", [["Date / time / site", "30/10 · 11:20 · R 5th ICS"], ["Indication", "Pleural effusion"], ["Team", "Dr name · RN name"], ["Baseline", "Vitals · SpO₂ 94% on 2 L"], ["Tube / system", "24 Fr · water seal + suction"], ["Complications", "None"], ["After", "Drained 300 ml · no air leak"]], lt) });
add(5, { kind: "end" });
