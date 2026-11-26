// NEWS Knowledge Check questions, shared by the test (index.html) and the admin page (admin.html).
// q = question, o = options, a = correct option (counted from 0), r = where the video covers it.
// If you change a question after staff have started, old and new results are no longer comparable.
const Q = [
 {
  "q": "A patient is admitted to your ward. When must the first NEWS be completed?",
  "o": [
   "Within 1 hour of admission",
   "Within 4 hours of admission",
   "Within 12 hours of admission",
   "At the next morning round"
  ],
  "a": 1,
  "r": "Patient A; policy 4.2"
 },
 {
  "q": "A patient's NEWS is 0. What is the minimum frequency of NEWS?",
  "o": [
   "Once every 12 hours",
   "Once per shift",
   "At least every 4 hours",
   "Once a day"
  ],
  "a": 2,
  "r": "Patient A"
 },
 {
  "q": "A post-operative patient has a total NEWS of 3, and no single parameter scores 3. What should happen?",
  "o": [
   "The registered nurse assesses the patient and decides on monitoring or escalation",
   "No action until the next routine check",
   "Call the Rapid Response Team immediately",
   "Call Code Blue"
  ],
  "a": 0,
  "r": "Patient B"
 },
 {
  "q": "A 78-year-old patient is newly confused (C on ACVPU). All other observations are normal. What is the NEWS?",
  "o": [
   "0",
   "1",
   "3, a red score in a single parameter",
   "5"
  ],
  "a": 2,
  "r": "Patient C"
 },
 {
  "q": "A patient has a score of 3 in one parameter, but the total is only 3. What is the correct action?",
  "o": [
   "Recheck at the next 4-hourly round",
   "Wait until the total reaches 5",
   "Document only",
   "Inform the medical team; the doctor assesses within 30 minutes; repeat observations every 30 minutes"
  ],
  "a": 3,
  "r": "Patient C"
 },
 {
  "q": "A patient with a chest infection has a NEWS of 6. What is the correct response?",
  "o": [
   "The registered nurse monitors and rechecks in 4 hours",
   "Inform the team leader and call the doctor at once using SBAR; bedside review within 10 minutes; think sepsis",
   "Wait for the next ward round",
   "Give paracetamol and recheck tomorrow"
  ],
  "a": 1,
  "r": "Patient D"
 },
 {
  "q": "A patient's NEWS is 7 or more. Which response is correct?",
  "o": [
   "Emergency response: medical team immediately, continuous monitoring, critical care team assessment",
   "Urgent ward-based review within 1 hour",
   "Increase observations to every 4 hours",
   "Inform the night supervisor in the morning"
  ],
  "a": 0,
  "r": "Patient E"
 },
 {
  "q": "A patient's NEWS is 1, but her son says she looks much worse, and you are worried. What should you do?",
  "o": [
   "Nothing; the score is low",
   "Wait for the score to rise",
   "Document the family's comment only",
   "Escalate to the medical team; clinical and family concern can override the score"
  ],
  "a": 3,
  "r": "Patient F"
 },
 {
  "q": "A patient is receiving supplemental oxygen (2 L/min nasal cannula). How many points does oxygen add to the NEWS?",
  "o": [
   "0",
   "1",
   "2",
   "3"
  ],
  "a": 2,
  "r": "Patient G"
 },
 {
  "q": "When should SpO2 Scale 2 be used?",
  "o": [
   "For every patient on oxygen",
   "For every patient with COPD",
   "Only for a hypercapnic patient with a physician's order and a target of 88\u201392%",
   "Whenever the SpO2 is below 92%"
  ],
  "a": 2,
  "r": "Patient G"
 }
];

// Short topic and theme for each question (same order), used on the admin page.
const TOPIC = [
 {
  "t": "First NEWS within 4 h of admission",
  "g": "Timing"
 },
 {
  "t": "Minimum frequency: at least every 4 h",
  "g": "Timing"
 },
 {
  "t": "NEWS 1–4: registered nurse assesses",
  "g": "Response"
 },
 {
  "t": "New confusion scores 3 (red score)",
  "g": "Scoring"
 },
 {
  "t": "Red score: doctor within 30 min",
  "g": "Response"
 },
 {
  "t": "NEWS 5–6: urgent call with SBAR",
  "g": "Response"
 },
 {
  "t": "NEWS 7+: emergency response",
  "g": "Response"
 },
 {
  "t": "Concern overrides a low score",
  "g": "Response"
 },
 {
  "t": "Oxygen adds 2 points",
  "g": "Scoring"
 },
 {
  "t": "When to use SpO2 Scale 2",
  "g": "Scoring"
 }
];
