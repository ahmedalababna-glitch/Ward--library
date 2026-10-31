// Ward Procedure Library – results store (Google Apps Script, runs in YOUR Google account)
// Paste into a new project at script.google.com (or into a Sheet via Extensions > Apps Script).
// Only one thing to change: the ADMIN_PIN below (the PIN you will type on the Admin page).
const ADMIN_PIN = "1234";

const HEAD = ["Time", "Name / staff no.", "Procedure", "Stage", "Attempt", "Score /5", "Confidence 1-5", "Q1", "Q2", "Q3", "Q4", "Q5"];
const PROCS = ["ngt", "cath", "peg", "seiz", "cvc", "lp", "trach", "cdi", "cdr", "tpn"];

function book_() {
  // works pasted into a Sheet (Extensions > Apps Script) or as a new project at script.google.com
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) return active;
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty("SHEET_ID");
  if (id) return SpreadsheetApp.openById(id);
  const ss = SpreadsheetApp.create("Ward Library results");
  props.setProperty("SHEET_ID", ss.getId());
  return ss;
}

function sheet_() {
  const ss = book_();
  let sh = ss.getSheetByName("Results");
  if (!sh) { sh = ss.insertSheet("Results"); sh.appendRow(HEAD); sh.setFrozenRows(1); }
  return sh;
}
const out_ = (o) => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);

const SITE = "https://ahmedalababna-glitch.github.io/Ward--library/";

function rows_() {
  const v = sheet_().getDataRange().getValues().slice(1);
  return v.map(r => [new Date(r[0]).toISOString(), r[1], r[2], r[3], r[4], r[5], r[6], r.slice(7, 12)]);
}

// Admin page served straight from Google (works on phones that block cross-site requests)
function adminPage_(pin) {
  const url = ScriptApp.getService().getUrl();
  if (pin !== ADMIN_PIN) {
    const msg = pin ? '<p style="color:#D0453D;font-weight:700">Wrong PIN.</p>' : "";
    return HtmlService.createHtmlOutput(
      '<div style="font-family:system-ui,sans-serif;max-width:420px;margin:40px auto;padding:16px">' +
      '<h2 style="margin:0 0 6px">Ward Library · Admin</h2><p style="color:#5E747A;margin:0 0 14px">Enter the admin PIN.</p>' + msg +
      '<form method="post" action="' + url + '" target="_top"><input type="hidden" name="view" value="admin">' +
      '<input name="pin" type="password" autocapitalize="off" autocorrect="off" placeholder="PIN" style="font-size:18px;padding:10px;border:1px solid #ccc;border-radius:10px;width:100%;box-sizing:border-box">' +
      '<button style="margin-top:10px;font-size:17px;font-weight:700;padding:10px 16px;border:0;border-radius:10px;background:#0B6E75;color:#fff;width:100%">Open results</button></form>' +
      '<p style="margin-top:16px"><a href="' + SITE + '" target="_top">← Main menu</a></p></div>')
      .setTitle("Ward Library Admin").addMetaTag("viewport", "width=device-width, initial-scale=1");
  }
  let html = UrlFetchApp.fetch(SITE + "admin.html?t=" + Date.now()).getContentText();
  const quiz = UrlFetchApp.fetch(SITE + "quiz-data.js?t=" + Date.now()).getContentText();
  html = html.replace('<script src="quiz-data.js"></script>', () => "<script>" + quiz + "</script>")
    .replace('<script src="config.js"></script>', () => "<script>const RESULTS_URL = \"\"; const PRELOAD = " + JSON.stringify(rows_()).replace(/</g, "\\u003c") + "; const ADMIN_URL = " + JSON.stringify(url) + ";</script>")
    .replace("<head>", '<head><base href="' + SITE + '" target="_top">');
  return HtmlService.createHtmlOutput(html).setTitle("Ward Library Admin").addMetaTag("viewport", "width=device-width, initial-scale=1");
}

function doPost(e) {
  if (e.parameter && e.parameter.view === "admin") return adminPage_(e.parameter.pin || "");
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
  const p = e.parameter || {}, cb = /^[A-Za-z_$][\w$]{0,40}$/.test(p.callback || "") ? p.callback : "";
  const send = (o) => cb ? ContentService.createTextOutput(cb + "(" + JSON.stringify(o) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT) : out_(o);
  if (p.view === "admin") return adminPage_("");
  if (p.pin !== ADMIN_PIN) return send({ ok: false, error: "pin" });
  return send({ ok: true, rows: rows_() });
}
