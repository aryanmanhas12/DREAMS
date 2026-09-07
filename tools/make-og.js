#!/usr/bin/env node
/* Regenerates the social share card at assets/og-image.png.
   Run: node tools/make-og.js

   This exists because the card had been advertising 155 programmes to every
   WhatsApp and Telegram share while the index held 207. Nothing caught it: the
   data check asserts the <head> meta counts against the data, but a number
   baked into a PNG is invisible to every check in the project, and the card is
   the first impression far more often than the page is.

   So the count is read from the same data files index.html loads, and the
   globe is drawn by the real globe.js against the real database, exactly as
   tools/make-icons.js does. Re-run this whenever the entry count changes.
   The output is 1200x630 because that is what the og:image:width and
   og:image:height meta tags declare, and a card whose real size disagrees with
   its declaration is a defect scrapers actually trip over. */

const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const TMP = path.join(ROOT, "_og-render.html");
const OUT = path.join(ROOT, "assets/og-image.png");

const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const DATA = [...html.matchAll(/<script src="(assets\/data-[^"]+\.js)"><\/script>/g)].map((m) => m[1]);

/* Count exactly the way app.js counts for the hero: the five opportunity
   pools plus frontiers plus specialty routes. */
const sandbox = { window: {}, document: { addEventListener() {} }, console };
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);
for (const f of DATA) vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sandbox, { filename: f });
const DB = sandbox.window.DB;
const TOTAL = ["study", "funding", "research", "residency", "equity"]
  .reduce((n, k) => n + (DB[k] || []).length, 0) +
  (DB.frontiers || []).length + (DB.specialties || []).length;

/* Light tokens, mirrored from styles.css — the card is always the light
   ground, because link-preview surfaces sit on white in every client. */
const TOKENS = `--accent:#00787E;--paper:#F2EFE4;--paper-2:#FBF8F0;--surface:#FFFEF9;
  --line:#D8CFBC;--line-soft:#E8E1D2;--ink:#131E2C;--ink-2:#46566E;--ink-3:#5E6B7B;
  --signal:#C63A0E;--accent-2:#005C63`;

const page = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
:root{${TOKENS}}
@font-face{font-family:"Cormorant Garamond";src:url("assets/fonts/cormorant-garamond.woff2")format("woff2");font-weight:300 700;font-style:normal;font-display:block}
@font-face{font-family:"Cormorant Garamond";src:url("assets/fonts/cormorant-garamond-italic.woff2")format("woff2");font-weight:300 700;font-style:italic;font-display:block}
@font-face{font-family:"IBM Plex Sans";src:url("assets/fonts/ibm-plex-sans.woff2")format("woff2");font-weight:100 700;font-display:block}
@font-face{font-family:"IBM Plex Mono";src:url("assets/fonts/ibm-plex-mono.woff2")format("woff2");font-weight:400 600;font-display:block}
html,body{margin:0;padding:0}
#card{width:1200px;height:630px;background:var(--paper);position:relative;
  display:grid;grid-template-columns:1fr 380px;gap:40px;align-items:center;
  padding:0 64px;box-sizing:border-box;font-family:"IBM Plex Sans",sans-serif}
.eyebrow{font-family:"IBM Plex Mono",monospace;font-size:13px;letter-spacing:.18em;
  text-transform:uppercase;color:var(--accent);margin:0 0 18px}
h1{font-family:"Cormorant Garamond",serif;font-weight:600;font-size:60px;line-height:1.04;
  margin:0 0 22px;color:var(--ink);font-variant-numeric:lining-nums}
h1 em{display:block;font-style:italic;color:var(--accent);font-variant-numeric:lining-nums}
p{font-size:17px;line-height:1.55;color:var(--ink-2);margin:0 0 14px;max-width:56ch}
.last{color:var(--ink);margin:0}
#globeWrap{display:grid;place-items:center}
#globeCanvas{width:340px;height:340px;display:block}
.cap{font-family:"IBM Plex Mono",monospace;font-size:12px;color:var(--ink-3);
  letter-spacing:.05em;margin-top:14px;text-align:center}
</style></head><body>
<div id="card">
  <div>
    <p class="eyebrow">For students of medicine in India</p>
    <h1>You were told there were two options.<em>This page has ${TOTAL} of them.</em></h1>
    <p>Almost every Indian medical student is handed the same map: clear NEET-PG, or leave for the USMLE. Both are real. Neither is the whole territory. There are funded research programmes you can hold in second year, doctorates that pay you a salary, and entire scientific fields nobody mentioned once in five years of lectures.</p>
    <p class="last">Three questions that have nothing to do with marks, then the research you do not have time to do.</p>
  </div>
  <div id="globeWrap">
    <canvas id="globeCanvas"></canvas>
    <div class="cap">Drag to spin · tap a country</div>
  </div>
</div>
${DATA.map((s) => `<script src="${s}"><\/script>`).join("\n")}
<script src="assets/globe.js"><\/script>
<script>window.initGlobe(document.getElementById("globeCanvas"), null, function(){});<\/script>
</body></html>`;

(async () => {
  fs.writeFileSync(TMP, page);
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
  const ctx = await browser.newContext({
    viewport: { width: 1240, height: 700 },
    deviceScaleFactor: 1, reducedMotion: "reduce"
  });
  const p = await ctx.newPage();
  let failed = null;
  p.on("pageerror", (e) => { failed = String(e); });
  await p.goto("file://" + TMP);
  await p.waitForTimeout(1500);
  if (failed) throw new Error("card failed to render: " + failed);

  const w = await p.evaluate(() => document.getElementById("globeCanvas").width);
  if (w < 200) throw new Error("globe never sized (" + w + "px) — initGlobe did not run");
  const shown = await p.evaluate(() => document.querySelector("h1 em").textContent);
  if (!shown.includes(String(TOTAL))) throw new Error("card headline lost the count");

  await p.locator("#card").screenshot({ path: OUT });
  await browser.close();
  fs.unlinkSync(TMP);

  const d = fs.readFileSync(OUT);
  const pw = d.readUInt32BE(16), ph = d.readUInt32BE(20);
  if (pw !== 1200 || ph !== 630) throw new Error(`card is ${pw}x${ph}, meta tags declare 1200x630`);
  console.log(`assets/og-image.png  ${pw}x${ph}  ${(d.length / 1024).toFixed(0)} KB  saying "${TOTAL}"`);
})();
