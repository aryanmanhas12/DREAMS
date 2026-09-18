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

/* Counted the way app.js counts for the stat tile: real places only, with the
   region pseudo-countries excluded. Typed into the card as "33 countries" at
   first, which is the same mistake as the 155-on-a-207-index card this file
   was written to prevent, one layer down. */
const REGIONS = ["Global", "Online", "Any", "Europe", "Nordics", "Asia", "Gulf", "Baltics"];
const COUNTRIES = new Set(["study", "funding", "research", "residency", "equity"]
  .flatMap((k) => (DB[k] || []).map((i) => i.country))
  .filter((c) => c && !REGIONS.includes(c))).size;

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

/* ── per-category cards ──
   One generic card for eleven different pages wastes the share. Someone
   posting /scholarships/ into a college group is answering a specific
   question, and the preview should say "37 scholarships" rather than repeat
   the homepage. The headline, description and count all come from
   make-pages.js, which is the same definition the page itself is built from,
   so a card cannot advertise a number the page does not have. That is the
   failure this file was written for.

   Same 1200x630, same light ground, same globe. The h1 sets smaller than the
   homepage card because these headlines are sentences rather than a slogan,
   and the render asserts the text has not overflowed its box — a clipped
   headline is worse than a plain card, and a screenshot will not tell you. */
const CATS = require("./make-pages.js").PAGES;

const catPage = (c) => `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
:root{${TOKENS}}
@font-face{font-family:"Cormorant Garamond";src:url("assets/fonts/cormorant-garamond.woff2")format("woff2");font-weight:300 700;font-style:normal;font-display:block}
@font-face{font-family:"Cormorant Garamond";src:url("assets/fonts/cormorant-garamond-italic.woff2")format("woff2");font-weight:300 700;font-style:italic;font-display:block}
@font-face{font-family:"IBM Plex Sans";src:url("assets/fonts/ibm-plex-sans.woff2")format("woff2");font-weight:100 700;font-display:block}
@font-face{font-family:"IBM Plex Mono";src:url("assets/fonts/ibm-plex-mono.woff2")format("woff2");font-weight:400 600;font-display:block}
html,body{margin:0;padding:0}
#card{width:1200px;height:630px;background:var(--paper);position:relative;
  display:grid;grid-template-columns:1fr 340px;gap:44px;align-items:center;
  padding:0 64px;box-sizing:border-box;font-family:"IBM Plex Sans",sans-serif}
#card::after{content:"";position:absolute;left:0;right:0;bottom:0;height:8px;background:var(--accent)}
.eyebrow{font-family:"IBM Plex Mono",monospace;font-size:13px;letter-spacing:.18em;
  text-transform:uppercase;color:var(--accent);margin:0 0 20px}
h1{font-family:"Cormorant Garamond",serif;font-weight:600;font-size:52px;line-height:1.06;
  margin:0 0 20px;color:var(--ink);font-variant-numeric:lining-nums}
/* --accent-2, NOT --signal. Vermilion is reserved for deadlines on this site
   and a count is not a deadline; spending the signal colour on decoration is
   exactly what --gold was introduced to stop on the tier-1 badge. */
.count{font-family:"IBM Plex Mono",monospace;font-size:15px;letter-spacing:.04em;
  color:var(--accent-2);margin:0 0 16px;font-variant-numeric:lining-nums}
p.desc{font-size:18px;line-height:1.55;color:var(--ink-2);margin:0;max-width:52ch}
#globeWrap{display:grid;place-items:center}
#globeCanvas{width:300px;height:300px;display:block}
.cap{font-family:"IBM Plex Mono",monospace;font-size:12px;color:var(--ink-3);
  letter-spacing:.05em;margin-top:14px;text-align:center}
</style></head><body>
<div id="card">
  <div id="copy">
    <p class="eyebrow">Dream Counsellor · for students of medicine in India</p>
    <h1>${c.h1.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</h1>
    <p class="count">${c.count} of ${TOTAL} entries · every one links its official page</p>
    <p class="desc">${c.desc.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</p>
  </div>
  <div id="globeWrap">
    <canvas id="globeCanvas"></canvas>
    <div class="cap">${TOTAL} routes · ${COUNTRIES} countries</div>
  </div>
</div>
${DATA.map((s) => `<script src="${s}"><\/script>`).join("\n")}
<script src="assets/globe.js"><\/script>
<script>window.initGlobe(document.getElementById("globeCanvas"), null, function(){});<\/script>
</body></html>`;

async function shoot(p, html, out, mustSay) {
  fs.writeFileSync(TMP, html);
  let failed = null;
  const onErr = (e) => { failed = String(e); };
  p.on("pageerror", onErr);
  await p.goto("file://" + TMP);
  await p.waitForTimeout(1400);
  p.off("pageerror", onErr);
  if (failed) throw new Error(out + ": card failed to render: " + failed);

  const w = await p.evaluate(() => document.getElementById("globeCanvas").width);
  if (w < 200) throw new Error(out + ": globe never sized (" + w + "px) — initGlobe did not run");

  /* A screenshot of clipped text looks like a screenshot. Measure instead. */
  const spill = await p.evaluate(() => {
    const copy = document.getElementById("copy") || document.querySelector("#card > div");
    const card = document.getElementById("card");
    const a = copy.getBoundingClientRect(), b = card.getBoundingClientRect();
    return Math.max(0, Math.round(a.bottom - b.bottom), Math.round(b.top - a.top));
  });
  if (spill > 0) throw new Error(`${out}: copy overflows the card by ${spill}px — headline or description is too long`);

  const text = await p.evaluate(() => document.getElementById("card").innerText);
  for (const s of mustSay) {
    if (!text.includes(String(s))) throw new Error(`${out}: card lost "${s}"`);
  }

  await p.locator("#card").screenshot({ path: out });
  const d = fs.readFileSync(out);
  const pw = d.readUInt32BE(16), ph = d.readUInt32BE(20);
  if (pw !== 1200 || ph !== 630) throw new Error(`${out} is ${pw}x${ph}, meta tags declare 1200x630`);
  return { kb: (d.length / 1024).toFixed(0), pw, ph };
}

(async () => {
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
  const ctx = await browser.newContext({
    viewport: { width: 1240, height: 700 },
    deviceScaleFactor: 1, reducedMotion: "reduce"
  });
  const p = await ctx.newPage();

  const home = await shoot(p, page, OUT, [TOTAL]);
  console.log(`  assets/og-image.png`.padEnd(40) + `${home.pw}x${home.ph}  ${home.kb.padStart(4)} KB  saying "${TOTAL}"`);

  const dir = path.join(ROOT, "assets/og");
  fs.mkdirSync(dir, { recursive: true });
  let bytes = Number(home.kb);
  for (const c of CATS) {
    const out = path.join(dir, c.slug + ".png");
    const r = await shoot(p, catPage(c), out, [c.count, c.h1.slice(0, 24)]);
    bytes += Number(r.kb);
    console.log(`  assets/og/${c.slug}.png`.padEnd(40) + `${r.pw}x${r.ph}  ${r.kb.padStart(4)} KB  saying "${c.count}"`);
  }

  await browser.close();
  fs.unlinkSync(TMP);
  console.log(`\n${CATS.length + 1} share cards, ${bytes} KB total`);
})();
