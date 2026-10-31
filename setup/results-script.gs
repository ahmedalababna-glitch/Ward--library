// Ward Procedure Library – results store (Google Apps Script, runs in YOUR Google account)
// Only one thing to change: the ADMIN_PIN below (the PIN you will type on the Admin page).
const ADMIN_PIN = "1234";

const HEAD = ["Time", "Name / staff no.", "Procedure", "Stage", "Attempt", "Score /5", "Confidence 1-5", "Q1", "Q2", "Q3", "Q4", "Q5"];
const PROCS = ["ngt", "cath", "peg", "seiz", "cvc", "lp", "trach", "cdi", "cdr", "tpn"];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName("Results");
  if (!sh) { sh = ss.insertSheet("Results"); sh.appendRow(HEAD); sh.setFrozenRows(1); }
  return sh;
}
const out_ = (o) => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (PROCS.indexOf(d.proc) < 0) return out_({ ok: false });
  const who = String(d.who || "").replace(/^[=+\-@]+/, "").slice(0, 60);
  const n = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.round(Number(v) || 0)));
  const row = [new Date(), who, d.proc, d.stage === "POST" ? "POST" : "PRE", n(d.attempt, 1, 99), n(d.score, 0, 5), n(d.conf, 1, 5)]
    .concat([0, 1, 2, 3, 4].map(i => n((d.correct || [])[i], 0, 1)));
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try { sheet_().appendRow(row); } finally { lock.releaseLock(); }
  return out_({ ok: true });
}

function doGet(e) {
  if (!e.parameter || e.parameter.pin !== ADMIN_PIN) return out_({ ok: false, error: "pin" });
  const v = sheet_().getDataRange().getValues().slice(1);
  return out_({ ok: true, rows: v.map(r => [new Date(r[0]).toISOString(), r[1], r[2], r[3], r[4], r[5], r[6], r.slice(7, 12)]) });
}
