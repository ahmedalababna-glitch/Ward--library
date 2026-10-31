// ---------- Seizure care scenes (Module 04, RMS.NCC.MW.F.008) ----------
const SCENES = [];
const add = (dur, o) => SCENES.push(Object.assign({ dur }, o));

// simple person, lying, seen from above; jitter = seizure movement
function personTop(x, y, s = 1, jit = 0) {
  const j = (k) => (jit * Math.sin(k)).toFixed(1);
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-150" y="-${46}" width="300" height="92" rx="40" fill="#CFE3EA" stroke="#9DB9C3" stroke-width="3"/>
    <rect x="-130" y="${-80 + +j(1)}" width="150" height="30" rx="15" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3" transform="rotate(${-8 + +j(2)} -60 -65)"/>
    <rect x="-130" y="${50 + +j(3)}" width="150" height="30" rx="15" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3" transform="rotate(${8 + +j(4)} -60 65)"/>
    <rect x="140" y="${-40 + +j(5)}" width="190" height="34" rx="17" fill="#8DA9B4"/><rect x="140" y="${6 + +j(6)}" width="190" height="34" rx="17" fill="#8DA9B4"/>
    <circle cx="${-200 + +j(7)}" cy="0" r="56" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3"/></g>`;
}
function stopwatch(x, y, sec, op = 1) {
  const a = sec / 60 * 2 * Math.PI;
  return `<g opacity="${op}" transform="translate(${x} ${y})"><rect x="-18" y="-128" width="36" height="24" rx="6" fill="${C.ink}"/><circle r="104" fill="#fff" stroke="${C.ink}" stroke-width="8"/><path d="M 0 0 L 0 -90 A 90 90 0 ${a > Math.PI ? 1 : 0} 1 ${90 * Math.sin(a)} ${-90 * Math.cos(a)} Z" fill="${C.tealSoft}"/><line x1="0" y1="0" x2="${86 * Math.sin(a)}" y2="${-86 * Math.cos(a)}" stroke="${C.red}" stroke-width="6" stroke-linecap="round"/><circle r="8" fill="${C.ink}"/>${T(0, 150, "0:" + String(Math.floor(sec)).padStart(2, "0"), { size: 40, w: 800, anchor: "middle" })}</g>`;
}

add(4.5, { kind: "title" });
add(8, { step: 1, title: ["Know the", "seizure types"], bullets: ["Partial vs generalised", "Aura: a warning sign\nbefore a seizure", "Status epilepticus:\ncontinuous seizure,\nlife-threatening emergency"], draw: lt => checkCards([["Partial", "Starts in one area of the brain"], ["Generalised", "Involves both sides of the brain"], ["Aura", "A warning sensation before the seizure"], ["Status epilepticus", "Continuous seizure: emergency"]], lt) });
add(7, { step: 2, title: ["Know the", "risk factors"], bullets: ["History of seizures", "Hypocalcaemia,\nhypoglycaemia", "Brain tumours, CNS\ninfection or trauma"], draw: lt => {
  const items = [["History", "of seizures"], ["Low calcium", "Hypocalcaemia"], ["Low glucose", "Hypoglycaemia"], ["Brain", "Tumour, infection, trauma"]];
  return items.map(([h, s], i) => { const x = 60 + (i % 2) * 510, y = 90 + Math.floor(i / 2) * 340, p = seg(lt, 0.3 + i * 0.5, 0.8 + i * 0.5);
    return `<g opacity="${p}" transform="translate(${x} ${y + (1 - p) * 30})"><rect width="490" height="310" rx="24" fill="${C.tealSoft}"/><circle cx="245" cy="115" r="62" fill="${C.teal}"/>${T(245, 132, String(i + 1), { size: 52, w: 800, anchor: "middle", fill: "#fff" })}${T(245, 235, h, { size: 40, w: 800, anchor: "middle" })}${T(245, 278, s, { size: 28, anchor: "middle", fill: C.muted })}</g>`; }).join("");
} });
add(9, { step: 3, crit: true, title: ["Seizure", "precautions"], bullets: ["Explain the precautions\nto the patient", "Bed in the lowest position", "Side rails up and padded;\npad the headboard"], draw: lt => {
  const low = seg(lt, 0.8, 2.4), rail = seg(lt, 2.6, 3.4), pad = seg(lt, 3.8, 4.8);
  const by = lerp(300, 440, low);
  let g = `<line x1="40" y1="760" x2="1080" y2="760" stroke="${C.ink}" stroke-width="5"/>`;
  g += `<rect x="150" y="${by + 70}" width="22" height="${760 - by - 70}" fill="#9DB9C3"/><rect x="930" y="${by + 70}" width="22" height="${760 - by - 70}" fill="#9DB9C3"/>`;
  g += `<rect x="120" y="${by + 40}" width="860" height="34" rx="8" fill="#9DB9C3"/><rect x="140" y="${by}" width="820" height="44" rx="14" fill="#E3EEF2" stroke="#8DA9B4" stroke-width="3"/>`;
  g += `<rect x="96" y="${by - 120}" width="${30 + 14 * pad}" height="200" rx="10" fill="${pad ? "#BFE0D6" : "#9DB9C3"}" stroke="#7FA0AC" stroke-width="3"/>`; // headboard
  g += `<g opacity="${rail}" transform="translate(0 ${(1 - rail) * 60})"><rect x="260" y="${by - 90}" width="560" height="${70 + 10 * pad}" rx="${14 + 10 * pad}" fill="${pad ? "#BFE0D6" : "none"}" stroke="#7FA0AC" stroke-width="6"/>${pad ? "" : [0, 1, 2, 3, 4].map(i => `<line x1="${300 + i * 120}" y1="${by - 90}" x2="${300 + i * 120}" y2="${by - 20}" stroke="#7FA0AC" stroke-width="5"/>`).join("")}</g>`;
  g += `<g opacity="${low}">${arrow(1040, 290, 1040, 420, C.teal, 6)}</g>` + callout(820, 120, "Lowest position", seg(lt, 1.6, 2.0) * (1 - seg(lt, 3.6, 3.8)), C.teal);
  g += callout(820, 120, "Rails up and padded", seg(lt, 4.0, 4.4), C.green);
  return g;
} });
add(8, { step: 4, crit: true, title: ["Have the", "bedside ready"], bullets: ["Oral airway and suction\nequipment available", "Frequent seizures: IV access\nas ordered by the doctor", "Teach the patient to take\nmedicines as prescribed"], draw: lt => checkCards([["Oral airway", "At the bedside"], ["Suction", "Checked and working"], ["IV access", "If frequent seizures, as ordered"], ["Medication education", "Encourage compliance with the regime"]], lt) });
add(8, { step: 5, title: ["Know the", "medicines"], bullets: ["Benzodiazepines: diazepam PR,\nlorazepam, clonazepam", "Anti-epileptics: carbamazepine,\nphenytoin, gabapentin,\nsodium valproate", "Give as ordered"], draw: lt => {
  const col = (x, hd, items, t0, c) => `<g opacity="${seg(lt, t0, t0 + 0.5)}" transform="translate(${x} 80)"><rect width="460" height="680" rx="24" fill="${c}"/>${T(230, 70, hd, { size: 34, w: 800, anchor: "middle" })}${items.map((m, i) => `<g opacity="${seg(lt, t0 + 0.4 + i * 0.35, t0 + 0.8 + i * 0.35)}"><rect x="30" y="${120 + i * 130}" width="400" height="100" rx="18" fill="#fff"/>${T(230, 172 + i * 130, m, { size: 30, w: 700, anchor: "middle" })}</g>`).join("")}</g>`;
  return col(70, "Benzodiazepines", ["Diazepam PR", "Lorazepam", "Clonazepam"], 0.3, C.tealSoft) + col(590, "Anti-epileptics", ["Carbamazepine", "Phenytoin", "Gabapentin", "Sodium valproate"], 1.6, "#E1F1F8");
} });
add(10, { step: 6, crit: true, title: ["During a seizure:", "keep them safe"], bullets: ["Goal: prevent injury,\naspiration, airway obstruction", "Stay with the patient;\ncall for help", "Protect the head", "Clear hard and sharp objects;\nprovide privacy"], draw: lt => {
  let g = `<rect x="0" y="0" width="1120" height="840" fill="#EEF2F3"/>`;
  const mv = seg(lt, 2.0, 3.2);
  g += `<g transform="translate(${-mv * 260} ${-mv * 180})"><rect x="140" y="160" width="120" height="80" rx="10" fill="#B7C3C8"/><path d="M 220 300 l 50 -30 l 10 16 l -50 30 Z" fill="${C.steel}"/></g>`;
  g += `<g transform="translate(${mv * 300} ${mv * 200})"><rect x="800" y="560" width="100" height="100" rx="12" fill="#B7C3C8"/></g>`;
  const pil = seg(lt, 3.4, 4.2);
  g += `<g opacity="${pil}"><ellipse cx="385" cy="420" rx="95" ry="80" fill="#F7E7C6" stroke="#D9C08F" stroke-width="3"/></g>`;
  g += personTop(600, 420, 1, 6 * (1 - seg(lt, 8.0, 9.0)) * Math.sin(lt * 30) * (lt > 0.4 ? 1 : 0));
  g += callout(560, 80, "Stay with the patient · call for help", seg(lt, 0.6, 1.2), C.red);
  g += callout(380, 560, "Protect the head", seg(lt, 3.6, 4.0), C.teal) + callout(820, 760, "Clear the area", seg(lt, 2.4, 2.8), C.teal);
  return g;
} });
add(9, { step: 7, crit: true, title: ["Observe", "and time it"], bullets: ["Earliest symptom", "Head or eye deviation", "How it progresses", "How long it lasts"], draw: lt => {
  let g = stopwatch(300, 400, Math.min(59, lt * 7), 1);
  g += checkCards([["First symptom", ""], ["Head / eye deviation", ""], ["Progression", ""], ["Duration", ""]], lt, 510, 560, 110, 140, 180);
  return g + callout(300, 660, "Note the start time", seg(lt, 0.6, 1.0), C.teal);
} });
add(9, { step: 8, crit: true, title: ["Never put anything", "in the mouth"], bullets: ["Nothing in the mouth", "Do not restrain;\njust prevent injury", "Oral airway only if airway\nobstructs, or still unconscious\nafter the seizure"], draw: lt => checkCards([["Nothing in the mouth", "No fingers, spoons or tongue depressors"], ["Do not restrain", "Just keep the patient free from injury"]], lt, 80, 960, 150, 190, 90, C.red) + `<g opacity="${seg(lt, 2.4, 3.0)}">` + checkCards([["Oral airway: only if", "Airway obstructs, or unconscious after the seizure"]], 3, 80, 960, 150, 190, 520) + `</g>` });
add(9, { step: 9, crit: true, title: ["Turn on", "the side"], bullets: ["If secretions: turn the\npatient on their side", "Secretions drain out", "The tongue falls forward"], draw: lt => {
  const r = seg(lt, 0.6, 2.4);
  let g = `<rect x="80" y="560" width="960" height="40" rx="12" fill="#E3EEF2" stroke="#8DA9B4" stroke-width="3"/>`;
  // side-lying figure: torso, head, bent upper leg
  g += `<g transform="translate(560 470)"><rect x="-180" y="-50" width="320" height="110" rx="50" fill="#CFE3EA" stroke="#9DB9C3" stroke-width="3"/><circle cx="-250" cy="-10" r="64" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3"/>`;
  g += `<g transform="rotate(${-40 * r} 140 10)"><rect x="130" y="-10" width="200" height="44" rx="22" fill="#8DA9B4"/></g><rect x="130" y="40" width="220" height="40" rx="20" fill="#7895A0"/>`;
  g += `<rect x="-160" y="-${10 + 70 * r}" width="40" height="${80 + 0}" rx="20" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="3" transform="rotate(${-60 * r} -140 -10)"/></g>`;
  const d = seg(lt, 2.8, 4.4);
  g += `<g opacity="${d}"><circle cx="${300 - 10 * d}" cy="${500 + 40 * d}" r="10" fill="#9FD3EA"/><circle cx="${290 - 20 * d}" cy="${515 + 30 * d}" r="7" fill="#9FD3EA"/>${arrow(300, 470, 270, 540, "#3B8DB5", 5)}</g>`;
  g += callout(560, 160, "Side-lying: secretions drain", seg(lt, 3.0, 3.4), C.teal) + callout(560, 260, "Tongue falls forward", seg(lt, 4.4, 4.8), C.teal);
  return g;
} });
add(8, { step: 10, crit: true, title: ["IV and oxygen", "if ordered"], bullets: ["If ordered: IV line,\nnormal saline", "Prolonged seizure and\nhypoxaemia: oxygen as ordered"], draw: lt => checkCards([["IV line", "If ordered: establish and infuse NS"], ["Oxygen", "If prolonged and hypoxaemic, as ordered"]], lt, 80, 960, 160, 220, 200) });
add(10, { step: 11, title: ["After the", "seizure"], bullets: ["Recovery position;\nsuction if needed", "Contact the doctor;\nreport the event", "Reassure the patient", "Vital signs and consciousness\nevery 15 min for 2 hours; GCS"], draw: lt => {
  const x0 = 100, x1 = 1020, y = 470, p = seg(lt, 1.0, 6.0);
  let g = T(560, 200, "Vital signs + consciousness", { size: 36, w: 800, anchor: "middle", fill: C.teal }) + T(560, 250, "every 15 minutes for 2 hours", { size: 30, anchor: "middle", fill: C.muted });
  g += `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${C.line}" stroke-width="12" stroke-linecap="round"/><line x1="${x0}" y1="${y}" x2="${lerp(x0, x1, p)}" y2="${y}" stroke="${C.teal}" stroke-width="12" stroke-linecap="round"/>`;
  for (let i = 0; i <= 8; i++) { const x = lerp(x0, x1, i / 8), on = p >= i / 8 - 0.001; g += `<circle cx="${x}" cy="${y}" r="${i % 4 ? 14 : 20}" fill="${on ? C.teal : "#C3D0D3"}"/>${i % 4 === 0 ? T(x, y + 60, (i * 15) + " min", { size: 24, anchor: "middle", fill: C.muted }) : ""}`; }
  g += `<g opacity="${seg(lt, 6.2, 6.8)}"><rect x="360" y="600" width="400" height="110" rx="20" fill="${C.tealSoft}"/>${T(560, 650, "Glasgow Coma Scale", { size: 32, w: 800, anchor: "middle", fill: C.teal })}${T(560, 690, "as appropriate", { size: 26, anchor: "middle", fill: C.muted })}</g>`;
  return g;
} });
add(9, { step: 12, warn: true, title: ["Status", "epilepticus"], bullets: ["Continuous seizure:\nlife-threatening emergency", "Prepare IV access, oxygen,\nairway management", "Give drugs as ordered;\ndescribe the event to\nthe physician"], draw: lt => {
  const pulse = 0.5 + 0.5 * Math.sin(lt * 5);
  let g = `<rect x="0" y="0" width="1120" height="840" fill="${C.redSoft}" opacity="${0.4 + 0.3 * pulse * seg(lt, 0, 1)}"/>`;
  g += T(560, 150, "EMERGENCY", { size: 64, w: 800, anchor: "middle", fill: C.red, ls: 6 });
  return g + checkCards([["IV access", ""], ["Oxygen", ""], ["Airway management", ""], ["Drugs as ordered", ""]], Math.max(0, lt - 0.8), 160, 800, 110, 140, 220, C.green);
} });
add(7, { step: 13, title: ["Care for the", "person"], bullets: ["Stay calm and attentive", "Support and educate patient\nand family", "Escalate deterioration\npromptly"], draw: lt => checkCards([["Calm and attentive", "Patient safety at all times"], ["Emotional support", "Patient and family: before, during, after"], ["Accountability", "Follow policy; escalate promptly"]], lt, 80, 960, 160, 220, 140) });
add(9, { step: 14, title: ["Document", "the seizure"], bullets: ["Precautions taken", "Date, time, duration,\ntriggers", "Behaviour, body parts,\nincontinence, vomiting,\nsalivation"], draw: lt => {
  const rows = [["Date / time", "30/10 · 14:05"], ["Duration", "2 min 10 s"], ["Precipitating factor", "Missed dose"], ["Behaviour", "Lip smacking, eye deviation L"], ["Body parts", "Right arm, then generalised"], ["Other", "Incontinence · salivation"], ["Precautions", "Rails padded, bed low"]];
  let g = `<rect x="140" y="60" width="840" height="740" rx="24" fill="${C.bg}"/><rect x="390" y="30" width="340" height="60" rx="14" fill="${C.ink}"/>${T(560, 72, "Seizure record", { size: 28, w: 700, anchor: "middle", fill: "#fff" })}`;
  rows.forEach(([h, v], i) => { const y = 140 + i * 92, p = seg(lt, 0.3 + i * 0.5, 0.7 + i * 0.5); g += `${T(190, y + 30, h, { size: 26, fill: C.muted })}<line x1="490" y1="${y + 42}" x2="940" y2="${y + 42}" stroke="${C.line}" stroke-width="3"/><g opacity="${p}">${T(490, y + 30, v, { size: 28, w: 700, fill: C.teal })}</g>`; });
  return g;
} });
add(5, { kind: "end" });
