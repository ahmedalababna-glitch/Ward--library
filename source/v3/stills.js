const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + process.env.IN); await p.evaluate(() => document.fonts.ready);
  const err = []; p.on('pageerror', e => err.push(e.message));
  for (const t of process.env.TS.split(',').map(Number)) { await p.evaluate(t => window.drawFrame(t), t); await p.screenshot({ path: `${process.env.OUTD}/s_${t}.jpg`, quality: 80, type: 'jpeg' }); }
  console.log('errors', err); await b.close();
})();
