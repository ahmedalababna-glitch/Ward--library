// ---------- Chest drain care and removal scenes (Module 04, RMS.NCC.MW.F.005) ----------
add(4.5, { kind: "title" });
add(9, { step: 1, title: ["Know the", "drain"], bullets: ["Where it sits and why", "Parts of the system\nand what they do", "Expected vs abnormal output", "Gravity vs suction drainage"], draw: lt => {
  let g = drainUnit(350, 200, { collect: 0.25, seal: 1, suction: 0.8, t: lt });
  return g + callout(240, 300, "Collects fluid", seg(lt, 1.0, 1.4), C.teal) + callout(560, 760, "Water seal: one-way valve", seg(lt, 2.0, 2.4), C.teal) + callout(900, 300, "Controls suction", seg(lt, 3.0, 3.4), C.teal);
} });
add(9, { step: 2, title: ["Spot", "complications"], bullets: ["Infection, dislodgement,\nkinking", "Subcutaneous emphysema", "Breath sounds, respiratory\nrate, SpO₂"], draw: lt => checkCards([["Infection", "Redness, discharge, fever"], ["Dislodgement", "Tube moved, dressing loose"], ["Kinking", "Drainage stops"], ["Surgical emphysema", "Crackling under the skin"]], lt, 80, 960, 140, 170, 110, C.red) + callout(560, 800, "Assess: breath sounds · RR · SpO₂", seg(lt, 3.4, 4.0), C.teal) });
add(9, { step: 3, title: ["Check the", "system"], bullets: ["Unit upright, below\nthe chest", "No kinks or loops", "Output: volume, colour", "Air leak; suction level\nas ordered"], draw: lt => {
  let g = chest({ tx: 690, ty: 600 }) + drainUnit(620, 360, { collect: 0.3, seal: 1, suction: 0.8, t: lt, bubble: seg(lt, 3.6, 4.0), labels: 0 });
  return g + callout(830, 300, "No kinks", seg(lt, 1.0, 1.4), C.teal) + callout(830, 230, "Below chest level", seg(lt, 2.2, 2.6), C.teal) + callout(300, 760, "Volume · colour · air leak", seg(lt, 3.6, 4.0), C.teal);
} });
add(8, { step: 4, title: ["Ready for", "removal?"], bullets: ["Check the removal order", "Radiological and clinical\ncriteria met", "Identify the patient;\nverbal consent"], draw: lt => checkCards([["Removal order checked", ""], ["Criteria met", "X-ray and clinical indicators"], ["Patient identified", ""], ["Verbal consent", ""]], lt) });
add(9, { step: 5, title: ["Prepare", "for removal"], bullets: ["Analgesia as prescribed", "Items assembled,\nexpiry checked", "Position; Inco-pad\nunder the drain", "Hand hygiene, PPE,\nopen the sterile pack"], draw: lt => checkCards([["Analgesia given as prescribed", ""], ["Items assembled, expiry checked", ""], ["Hand hygiene, non-sterile gloves", ""], ["Positioned; Inco-pad under drain", ""], ["Hand hygiene and PPE", ""], ["Sterile dressing pack opened", ""]], lt, 80, 960, 104, 122, 50) });
add(8, { step: 6, crit: true, title: ["More than", "one drain?"], bullets: ["Clamp the drain(s) that\nstay in", "Before removing the\nspecified drain"], draw: lt => {
  let g = `<g transform="translate(60 0)">${chest({ tube: 1, tx: 640, ty: 520 })}</g><path d="M 520 300 C 600 300, 660 260, 720 220" fill="none" stroke="#F4F0E6" stroke-width="20" stroke-linecap="round"/><path d="M 520 300 C 600 300, 660 260, 720 220" fill="none" stroke="#B9AE8E" stroke-width="2"/>`;
  const c = seg(lt, 1.2, 2.2);
  g += `<g opacity="${c}" transform="translate(640 262) rotate(-30)"><rect x="-14" y="-34" width="28" height="68" rx="8" fill="#3B6FD6"/><rect x="-30" y="-6" width="60" height="12" rx="6" fill="#2B53A6"/></g>`;
  g += callout(860, 180, "Stays in: clamp it", seg(lt, 1.6, 2.0), C.teal) + callout(860, 600, "This one comes out", seg(lt, 2.6, 3.0), C.red);
  return g;
} });
add(9, { step: 7, crit: true, title: ["Aseptic", "site care"], bullets: ["Remove the dressing", "Hand rub; sterile gloves", "Clean the site as per the\nwound dressing policy", "Make sure the stoma\nwill be sealed"], draw: lt => checkCards([["Old dressing removed", ""], ["Hand rub, sterile gloves", ""], ["Site cleaned aseptically", "As per wound dressing policy"], ["Seal ready", "Stoma will be sealed on removal"]], lt) });
add(11, { step: 8, crit: true, title: ["Remove with", "the breath"], bullets: ["Cut the sutures safely;\nfree the tube", "Teach the breathing\ncycle first", "Remove on positive-pressure\nbreath or expiration\n(3rd breath)", "Then normal breathing"], draw: lt => {
  let g = "";
  for (let i = 0; i < 3; i++) { const p = seg(lt, 1.0 + i * 1.4, 1.6 + i * 1.4), x = 200 + i * 230, on = i === 2;
    const br = 1 + 0.15 * Math.sin(Math.max(0, lt - 1.0 - i * 1.4) * 4) * (p < 1 ? 1 : 0);
    g += `<g opacity="${0.3 + 0.7 * p}" transform="translate(${x} 260) scale(${br})"><circle r="80" fill="${on ? C.redSoft : C.tealSoft}"/>${T(0, 22, String(i + 1), { size: 64, w: 800, anchor: "middle", fill: on ? C.red : C.teal })}</g>`; }
  g += T(430, 400, "Breath", { size: 28, w: 700, anchor: "middle", fill: C.muted });
  const out = seg(lt, 5.2, 6.4);
  g += `<g transform="translate(0 ${80})"><rect x="140" y="460" width="840" height="40" rx="10" fill="${C.skinT}" stroke="${C.skinEdge}" stroke-width="3"/><rect x="${lerp(330, 760, out)}" y="${470}" width="420" height="20" rx="10" fill="#F4F0E6" stroke="#B9AE8E" stroke-width="2"/></g>`;
  return g + callout(660, 160, "Out on the 3rd breath", seg(lt, 4.4, 4.8), C.red) + callout(560, 680, "Then breathe normally", seg(lt, 6.8, 7.2), C.teal);
} });
add(9, { step: 9, title: ["Seal and", "check"], bullets: ["Petroleum-based dressing,\nthen layers of gauze", "Respiratory signs and\nvital signs", "Chest X-ray or echo\nwhere applicable"], draw: lt => {
  let g = chest({ tube: 0, dress: seg(lt, 0.6, 1.4) });
  g += `<rect x="452" y="392" width="56" height="56" rx="6" fill="#F2E3A6" opacity="${seg(lt, 0.4, 0.8)}"/>`;
  return g + callout(800, 300, "Petroleum dressing + gauze", seg(lt, 1.2, 1.6), C.teal) + callout(800, 420, "Breathing · SpO₂ · vitals", seg(lt, 2.6, 3.0), C.teal) + callout(800, 540, "Chest X-ray / echo", seg(lt, 3.8, 4.2), C.red);
} });
add(8, { step: 10, title: ["Care for the", "person"], bullets: ["Reassure and educate", "Minimise discomfort", "Infection prevention;\nisolation if required", "Report abnormalities\npromptly"], draw: lt => checkCards([["Reassure and educate", "Patient and family"], ["Comfort", "Anticipate needs"], ["Infection prevention", "Isolation precautions if required"], ["Vigilance", "Report abnormalities promptly"]], lt) });
add(9, { step: 11, title: ["Document", "the care"], bullets: ["Site, drainage amount,\ncolour, consistency", "System type and\nsuction settings", "Breathing and vitals before\nand after interventions", "Removal: tolerance and\nfollow-up"], draw: lt => record("Chest drain care", [["Site", "Clean · dressing intact"], ["Drainage", "120 ml · serous · thin"], ["System", "Water seal · −20 cm H₂O"], ["Air leak", "None"], ["Before / after", "RR 18 · SpO₂ 97%"], ["Integrity checks", "Tubing secure · no kinks"], ["Removal", "Tolerated · X-ray ordered"]], lt) });
add(5, { kind: "end" });
