const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + __dirname + '/' + (process.env.IN || 'scene.html'));
  await p.evaluate(() => document.fonts.ready);
  console.log('total', await p.evaluate(() => window.TOTAL));
  const times = process.argv.slice(2).map(Number);
  for (const t of times) { await p.evaluate(t => window.drawFrame(t), t); await p.screenshot({ path: `st_${t}.png` }); }
  await b.close();
})();
