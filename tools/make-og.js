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

const { launch } = require("./lib/browser");
const { load } = require("./lib/data");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const TMP = path.join(ROOT, "_og-render.html");
const OUT = path.join(ROOT, "assets/og-image.png");

/* Count exactly the way app.js counts for the hero: the five opportunity
   pools plus frontiers plus specialty routes, loaded in index.html's order. */
const L = load(ROOT);
const DB = L.DB;
const TOTAL = L.total;
const DATA = L.files.map((f) => "assets/" + f);

/* Counted the way app.js counts for the stat tile: real places only, with the
   region pseudo-countries excluded. Typed into the card as "33 countries" at
   first, which is the same mistake as the 155-on-a-207-index card this file
   was written to prevent, one layer down. */
const REGIONS = ["Global", "Online", "Any", "Europe", "Nordics", "Asia", "Gulf", "Baltics"];
const COUNTRIES = new Set(["study", "funding", "research", "residency", "equity"]
  .flatMap((k) => (DB[k] || []).map((i) => i.country))
  .filter((c) => c && !REGIONS.includes(c))).size;

/* Space tokens, mirrored from styles.css. The card is the galaxy on purpose:
   a night sky with its stars stands out in a feed of white link previews,
   and it is what the site actually looks like now. space.js draws the stars
   (one still frame, because the render runs under reduced motion), globe.js
   the globe, both reading these tokens. */
const TOKENS = `--paper:#0F0A26;--surface:#1C1340;--line:#3A2C6E;--ink:#F6F1FF;
  --ink-2:#D3C9F2;--ink-3:#B8ADE0;--accent:#FF9AD5;--globe:#B79BFF;--star:#FFE58A;
  --fill:#FF4FA8;--on-fill:#1A0414;--starlight:#FFF6FF;
  --nebula-a:rgba(255,79,168,.16);--nebula-b:rgba(124,77,255,.17)`;
const SKY = `.sky{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden}
.sky-nebula{position:absolute;inset:-12%;background:
  radial-gradient(52% 38% at 86% 10%,var(--nebula-a),transparent 72%),
  radial-gradient(50% 44% at 8% 86%,var(--nebula-b),transparent 72%)}
.sky-milky-wrap{position:absolute;left:50%;top:50%;width:0;height:0}
/* No Milky Way on a card: its glow is dithered by the browser into noise PNG
   cannot compress, and it took every card past 800 KB. */
.sky-milky{display:none}
.sky-stars{position:absolute;inset:0}
body{background:var(--paper)}`;

/* The faces the page uses, minus the italic (nothing on a card is italic).
   The script is the subset build, which covers the wordmark by design. */
const FACES = `
@font-face{font-family:"Cormorant Garamond";src:url("assets/fonts/cormorant-garamond.woff2")format("woff2");font-weight:300 700;font-style:normal;font-display:block}
@font-face{font-family:"IBM Plex Sans";src:url("assets/fonts/ibm-plex-sans.woff2")format("woff2");font-weight:100 700;font-display:block}
@font-face{font-family:"Petit Formal Script";src:url("assets/fonts/petit-formal-script.woff2")format("woff2");font-weight:400;font-display:block}`;

/* The wordmark is the page's own: "Dream" in the display serif, "Counsellor"
   in the script. It replaced an all-caps monospace eyebrow, which is one of
   the commonest tells of a generated page and said nothing the wordmark
   does not. */
const MARK = `.mark{font-family:"Cormorant Garamond",serif;font-weight:600;font-size:26px;
  color:var(--ink);margin:0 0 22px}
.mark em{font-family:"Petit Formal Script",cursive;font-style:normal;font-weight:400;
  font-size:1.18em;color:var(--accent);padding-left:.12em}`;

const page = `<!DOCTYPE html><html data-sky-lite><head><meta charset="utf-8"><style>
:root{${TOKENS}}
${FACES}
html,body{margin:0;padding:0}
${SKY}
#card{width:1200px;height:630px;background:transparent;position:relative;
  display:grid;grid-template-columns:1fr 380px;gap:40px;align-items:center;
  padding:0 64px;box-sizing:border-box;font-family:"IBM Plex Sans",sans-serif}
${MARK}
h1{font-family:"Cormorant Garamond",serif;font-weight:600;font-size:60px;line-height:1.04;
  margin:0 0 22px;color:var(--ink);font-variant-numeric:lining-nums}
h1 span{display:block}
p{font-size:17px;line-height:1.55;color:var(--ink-2);margin:0 0 14px;max-width:56ch}
.last{color:var(--ink);margin:0}
#globeWrap{display:grid;place-items:center}
#globeCanvas{width:340px;height:340px;display:block}
.cap{font-size:15px;font-weight:600;color:var(--ink-2);margin-top:14px;text-align:center;
  font-variant-numeric:lining-nums}
</style></head><body>
<div id="card">
  <div>
    <p class="mark">Dream<em>Counsellor</em></p>
    <h1>You were told there were two options.<span>This page has ${TOTAL} of them.</span></h1>
    <p>Almost every Indian medical student is handed the same map: clear NEET-PG, or leave for the USMLE. Both are real. Neither is the whole territory. There are funded research programmes you can hold in second year, doctorates that pay you a salary, and entire scientific fields nobody mentioned once in five years of lectures.</p>
    <p class="last">Three questions that have nothing to do with marks, then the research you do not have time to do.</p>
  </div>
  <div id="globeWrap">
    <canvas id="globeCanvas"></canvas>
    <div class="cap">${TOTAL} routes in ${COUNTRIES} countries</div>
  </div>
</div>
${DATA.map((s) => `<script src="${s}"><\/script>`).join("\n")}
<script src="assets/globe.js"><\/script>
<script src="assets/space.js"><\/script>
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

const catPage = (c) => `<!DOCTYPE html><html data-sky-lite><head><meta charset="utf-8"><style>
:root{${TOKENS}}
${FACES}
html,body{margin:0;padding:0}
${SKY}
#card{width:1200px;height:630px;background:transparent;position:relative;
  display:grid;grid-template-columns:1fr 340px;gap:44px;align-items:center;
  padding:0 64px;box-sizing:border-box;font-family:"IBM Plex Sans",sans-serif}
${MARK}
h1{font-family:"Cormorant Garamond",serif;font-weight:600;font-size:52px;line-height:1.06;
  margin:0 0 20px;color:var(--ink);font-variant-numeric:lining-nums}
/* --accent, never --signal: the solar-flare orange is reserved for deadlines
   on this site and a count is not a deadline. */
.count{font-size:17px;font-weight:600;color:var(--accent);margin:0 0 16px;
  font-variant-numeric:lining-nums}
p.desc{font-size:18px;line-height:1.55;color:var(--ink-2);margin:0;max-width:52ch}
#globeWrap{display:grid;place-items:center}
#globeCanvas{width:300px;height:300px;display:block}
.cap{font-size:15px;font-weight:600;color:var(--ink-2);margin-top:14px;text-align:center;
  font-variant-numeric:lining-nums}
</style></head><body>
<div id="card">
  <div id="copy">
    <p class="mark">Dream<em>Counsellor</em></p>
    <h1>${c.h1.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</h1>
    <p class="count">${c.count} of ${TOTAL} entries, every one linked to its official page</p>
    <p class="desc">${c.desc.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</p>
  </div>
  <div id="globeWrap">
    <canvas id="globeCanvas"></canvas>
    <div class="cap">${TOTAL} routes in ${COUNTRIES} countries</div>
  </div>
</div>
${DATA.map((s) => `<script src="${s}"><\/script>`).join("\n")}
<script src="assets/globe.js"><\/script>
<script src="assets/space.js"><\/script>
<script>window.initGlobe(document.getElementById("globeCanvas"), null, function(){});<\/script>
</body></html>`;

async function shoot(p, html, out, mustSay) {
  fs.writeFileSync(TMP, html);
  let failed = null;
  const onErr = (e) => { failed = String(e); };
  p.on("pageerror", onErr);
  await p.goto("file://" + TMP);
  // 2200ms: the Milky Way is painted in three idle-time passes after load.
  await p.waitForTimeout(2200);
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
  // WhatsApp, the channel these cards mostly travel on, shows no preview for
  // an og:image much over 300 KB. The Milky Way's thousands of 1px stars once
  // took every card to ~830 KB; fail here rather than lose the preview quietly.
  if (d.length > 300 * 1024) throw new Error(`${out} is ${(d.length / 1024).toFixed(0)} KB; keep share cards under 300 KB`);
  return { kb: (d.length / 1024).toFixed(0), pw, ph };
}

(async () => {
  const browser = await launch();
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
