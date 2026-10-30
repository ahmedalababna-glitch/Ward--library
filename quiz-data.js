// Quiz questions per procedure. Each: [question, [options], index of correct option, short reason]
const QUIZ = {
  ngt: [
    ["How do you measure the length of NG tube to insert?", ["Nose tip to chin", "Nose tip → earlobe → xiphisternum (NEX)", "Mouth to navel", "Earlobe to umbilicus"], 1, "Measure NEX and mark the tube."],
    ["Which aspirate pH means it is safe to use the tube?", ["pH 0.5 – 5.0", "pH 6.0 – 7.0", "pH 7.0 – 8.5", "Any pH if aspirate is green"], 0, "Only pH 0.5–5.0 is in the safe range."],
    ["Which check must you NOT use to confirm position?", ["pH indicator strip", "Chest X-ray", "The 'whoosh' test", "Checking the cm mark at the nostril"], 2, "Whoosh test and litmus paper cannot tell stomach from lung."],
    ["During insertion the patient coughs and turns cyanosed. What do you do?", ["Advance faster", "Stop", "Ask them to keep swallowing", "Flush with water"], 1, "Stop if distress, coughing or cyanosis."]
  ],
  cath: [
    ["How do you test the balloon before insertion?", ["Inflate with air", "Inflate with sterile water and check for leaks", "Inflate with normal saline after insertion only", "No test is needed"], 1, "Inflate with sterile water, check for leakage, deflate fully."],
    ["You feel resistance while advancing the catheter. What do you do?", ["Push harder", "Rotate and force gently", "Stop. Never force", "Inflate the balloon there"], 2, "Never force against resistance."],
    ["Where should the drainage bag be kept?", ["On the floor", "Above bladder level", "Below bladder level, off the floor", "On the bed beside the patient"], 2, "Below the bladder stops backflow; off the floor prevents infection."],
    ["The patient has not voided 8 hours after removal. What do you do?", ["Wait until the next day", "Assess and act per policy", "Reinsert a catheter straight away", "Nothing; this is normal"], 1, "Record the first void; not voided in 8 hours, assess and act."]
  ],
  peg: [
    ["When cleaning a PEG site, how far is the outer bumper slid from the skin?", ["About 1 cm", "About 5 cm", "It is never moved", "Until it touches the skin tightly"], 0, "Slide ~1 cm, clean, rotate 90°, slide back."],
    ["Where must gauze NEVER be placed?", ["Over a leaking site", "Under the bumper", "On the dressing tray", "Over a healed site"], 1, "Never under the bumper; never cover the tube."],
    ["How do you check PEG patency?", ["Force 60 ml water with a syringe", "Let 30 ml water flow in by gravity", "Aspirate with force", "Inject air"], 1, "30 ml by gravity; if it does not flow, don't force, escalate."],
    ["How should medicines be given via PEG?", ["All crushed together in one syringe", "One at a time, flush before, between and after", "Mixed into the feed bag", "Without flushing"], 1, "One medicine at a time with flushes."]
  ],
  seiz: [
    ["During a seizure, what should go in the patient's mouth?", ["A tongue depressor", "Your fingers", "Nothing", "A bite block"], 2, "Nothing in the mouth."],
    ["Should you restrain the patient during a seizure?", ["Yes, firmly", "Only the arms", "No. Just prevent injury", "Yes, tie them to the bed"], 2, "Do not restrain; protect the head and clear objects."],
    ["After the seizure, how often are vital signs and consciousness checked?", ["Every 15 min for 2 hours", "Once only", "Every 4 hours", "Only if the patient asks"], 0, "Every 15 min for 2 hours, including GCS."],
    ["What is status epilepticus?", ["A short aura", "A continuous seizure: life-threatening emergency", "A seizure in sleep", "A normal post-seizure state"], 1, "Prepare IV access, oxygen, airway; give drugs as ordered."]
  ],
  cvc: [
    ["Which syringe size is used to flush a central line?", ["1 ml", "3 ml", "10 ml", "Any size"], 2, "A 10 ml syringe gives lower pressure."],
    ["Which flushing technique is used?", ["One fast push", "Pulsatile push–pause", "Gravity only", "Slow continuous drip"], 1, "Push–pause, then clamp with positive pressure."],
    ["Taking blood from a central line: what do you do first after cleaning?", ["Draw the samples straight away", "Discard the first 5 ml (dead space)", "Inject heparin", "Remove the cap and leave open"], 1, "Discard 5 ml, then use a new 10 ml syringe for samples."],
    ["How long do you press after removing a central line?", ["5–10 minutes", "10 seconds", "1 hour", "No pressure needed"], 0, "Press 5–10 min, dressing, and check the catheter is intact."]
  ],
  lp: [
    ["What is the correct position for a lumbar puncture?", ["Prone, flat", "Side-lying, knees to chest, chin to chest", "Sitting upright with straight back", "Supine with legs raised"], 1, "Back curved outwards at the edge of the bed."],
    ["What confirms the needle is in the right place?", ["Blood in the syringe", "A free drip of CSF", "The patient feels pain", "Air bubbles"], 1, "Free CSF drip from the subarachnoid space."],
    ["How are the CSF specimen tubes handled?", ["Any order, unlabelled", "Numbered in the order collected", "Only one tube is needed", "Mixed into one tube"], 1, "3–5 sterile tubes numbered in order."],
    ["After the LP, which finding must be reported?", ["Patient asks for water", "Numbness or pain down the legs", "Patient is sleepy at night", "Normal vital signs"], 1, "Also watch consciousness, pupils and CSF leak."]
  ],
  trach: [
    ["When changing the tracheostomy tapes, what is essential?", ["Remove both tapes first", "Hold the tube in place the whole time", "Deflate the cuff", "Ask the patient to cough"], 1, "Hold the tube; replace the tape immediately; two people may help."],
    ["When cleaning the stoma, what must never happen?", ["Using normal saline", "Solution entering the tracheostomy", "Wearing sterile gloves", "Looking at the skin"], 1, "Never let solution enter the tracheostomy."],
    ["What is the patient's position for trach care?", ["Flat supine", "Semi-Fowler's or sitting", "Prone", "Trendelenburg"], 1, "Semi-Fowler's or sitting."],
    ["Which complication needs emergency action?", ["Accidental decannulation", "Dry lips", "Mild thirst", "Clean dressing"], 0, "Also obstruction, bleeding and infection."]
  ],
  cdi: [
    ["Before connection, what do you do with the water seal?", ["Leave it empty", "Fill to the marked level", "Fill to the top", "Fill with blood"], 1, "Fill the water seal to the marked line."],
    ["Where should the drainage unit sit?", ["Above the chest", "Upright, below the chest", "On its side", "On the patient's bed"], 1, "Upright and below chest level."],
    ["What must be arranged urgently after insertion?", ["Chest X-ray", "Abdominal ultrasound", "CT head", "Nothing"], 0, "Urgent chest X-ray confirms tube position."],
    ["Sudden breathlessness and falling SpO₂ after insertion suggest:", ["Normal recovery", "Tension pneumothorax", "Low blood sugar", "Anxiety only"], 1, "Call for help and follow the emergency protocol."]
  ],
  cdr: [
    ["When is the chest drain pulled out?", ["During deep inspiration", "On a positive-pressure breath or expiration (3rd breath)", "While the patient talks", "At any time"], 1, "Teach the breathing cycle first."],
    ["The patient has two drains and one is being removed. What do you do?", ["Clamp the drain that stays in", "Clamp both", "Clamp neither", "Remove both"], 0, "Clamp the drain(s) that stay in before removing the specified one."],
    ["What dressing goes on after removal?", ["Nothing", "Petroleum-based dressing then layers of gauze", "Wet gauze only", "A plaster only"], 1, "Seal the stoma, then check breathing and vitals."],
    ["Crackling under the skin around the drain is:", ["Surgical emphysema", "Normal drainage", "Infection only", "A loose dressing"], 0, "Report it; assess breath sounds, RR and SpO₂."]
  ],
  tpn: [
    ["Before starting TPN, the label is:", ["Not checked", "Compared with the order and counter-checked by another staff member", "Checked by the patient", "Checked after starting"], 1, "Two-person check against the physician's order."],
    ["How often is blood glucose checked during TPN?", ["Every 6 hours", "Once a week", "Only if symptoms", "Every 15 minutes"], 0, "Also vital signs every 4–8 hours."],
    ["How often is the infusion pump checked?", ["Every hour", "Every 12 hours", "Once a day", "Only when it alarms"], 0, "Check the pump every hour."],
    ["Which statement is correct?", ["TPN can be left unattended", "Never leave TPN solutions unattended", "TPN runs by gravity", "Lipids don't need a pump"], 1, "TPN and lipids run on infusion pumps."]
  ]
};

// Pre/post knowledge test: one question per procedure (different from the video quizzes)
const TEST = [
  ["NG tube: when should the exit site be marked?", ["Before insertion", "Straight after the X-ray confirms position", "Never", "After the first feed"], 1],
  ["Urinary catheter: the balloon will not deflate. What do you do?", ["Pull gently but firmly", "Cut the catheter", "Don't pull. Follow policy and tell the doctor", "Leave it and inform next shift"], 2],
  ["PEG: when can feeding usually start after insertion?", ["Immediately", "24 hours after insertion, with peristalsis and a doctor's order", "After 1 week", "After 1 hour"], 1],
  ["Seizure: secretions are pooling. What do you do?", ["Put a finger in the mouth", "Turn the patient on their side", "Give water", "Sit the patient up straight"], 1],
  ["Central line: before cleaning a port for blood sampling, IV fluids are:", ["Kept running", "Stopped for 1 minute (confirm with the physician)", "Speeded up", "Disconnected for 1 hour"], 1],
  ["Lumbar puncture: after the procedure, direct pressure on the site for:", ["30 seconds", "10 minutes", "No pressure", "1 hour"], 0],
  ["Tracheostomy: how many patient identifiers before care?", ["One", "Two", "None", "Three photos"], 1],
  ["Chest drain: bubbling in the water seal chamber suggests:", ["An air leak", "Normal fluid drainage", "Pump failure", "Infection"], 0],
  ["Chest drain removal: the site is sealed with:", ["Petroleum-based dressing then gauze", "Open to air", "Wet gauze", "Ice pack"], 0],
  ["TPN: the e-Kardex is signed by:", ["One nurse", "Two registered nurses", "The patient", "The pharmacist only"], 1]
];
