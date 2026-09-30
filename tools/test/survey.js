/* Dream Counsellor — tour, survey and bundle smoke test. Covers the three
   flows at the level that catches a regression:

   - the tour auto-opens on a FIRST visit, runs to Done, and does not re-open
   - the survey has two lengths; #startBtn is the SHORT one (3 questions),
     #startFullBtn is the long one (16). Testing only the first covers a third
     of the flow.
   - short mode must not fabricate constraint claims. buildProfile fills every
     constraint with a default so ranking works; the PROSE is guarded on
     p.asked, and saying "you told me you cannot pay" to someone never asked
     is the precise failure this site exists to avoid.
   - the published bundle must make zero external requests.
*/
const { launch, serve } = require("../lib/browser");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const URL = "file://" + path.join(ROOT, "index.html");
const BUNDLE = "file://" + path.join(ROOT, "dist/dream-counsellor.html");

let fails = 0;
const ok = (c, m, d) => { if (!c) fails++; console.log(`  ${c ? "✓" : "✗"} ${m}${d ? "  — " + d : ""}`); };

/* Phrases that attribute a constraint to the reader. If any appears after a
   three-question run, the page has invented something it was never told. */
const FABRICATED = [
  "you told me you cannot pay", "you said you cannot pay", "you cannot leave",
  "you told me you need", "since you cannot travel", "you said you would not move"
];

/* Selecting an option does NOT advance — #nextBtn does. A loop that only
   clicks options runs forever on question one and reads exactly like a dead
   survey. The cap is generous: the survey is 16 questions, not 14, and a loop
   that stops early reports "never reached results", which is a harness limit
   wearing the costume of a site bug. */
async function runSurvey(page, startSel) {
  await page.click(startSel);
  await page.waitForSelector("#view-survey.is-active", { timeout: 8000 });
  let steps = 0;
  for (let i = 0; i < 40; i++) {
    if (await page.locator("#view-results.is-active").count()) break;
    const opt = page.locator("#view-survey .opt").first();
    if (await opt.count()) await opt.click().catch(() => {});
    const next = page.locator("#nextBtn");
    if (!(await next.count())) break;
    await next.click();
    steps++;
    await page.waitForTimeout(170);
  }
  return { steps, reached: !!(await page.locator("#view-results.is-active").count()) };
}

(async () => {
  const browser = await launch();

  /* ── tour: first visit ── */
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    const errs = []; page.on("pageerror", (e) => errs.push(String(e)));
    await page.goto(URL, { waitUntil: "load" });
    await page.waitForTimeout(1500);   // the tour opens on a 900ms timer
    const opened = await page.locator(".tour.is-on").count();
    ok(!!opened, "tour auto-opens on a first visit");
    let n = 0;
    for (let i = 0; i < 12; i++) {
      if (!(await page.locator(".tour.is-on").count())) break;
      n++;
      await page.click("#tourNext");
      await page.waitForTimeout(180);
    }
    ok(n >= 6, "tour runs through its steps", `${n} steps`);
    ok(!(await page.locator(".tour.is-on").count()), "tour closes on Done");
    await page.reload({ waitUntil: "load" });
    await page.waitForTimeout(600);
    ok(!(await page.locator(".tour.is-on").count()), "tour does not re-open on a second visit");
    ok(errs.length === 0, "no page errors during the tour", errs.join(" | "));
    await ctx.close();
  }

  /* ── survey: short, then full ── */
  for (const [name, sel, expect] of [["SHORT", "#startBtn", 3], ["FULL", "#startFullBtn", 16]]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
    await ctx.addInitScript(() => localStorage.setItem("dc-tour-seen", "1"));
    const page = await ctx.newPage();
    const errs = []; page.on("pageerror", (e) => errs.push(String(e)));
    await page.goto(URL, { waitUntil: "load" });
    const r = await runSurvey(page, sel);
    ok(r.reached, `${name}: reaches the results view`, `${r.steps} questions answered`);
    ok(r.steps === expect, `${name}: asks ${expect} questions`, `asked ${r.steps}`);
    const cards = await page.locator("#view-results .card").count();
    ok(cards > 10, `${name}: results render cards`, `${cards} cards`);
    if (name === "SHORT") {
      const text = (await page.locator("#view-results").innerText()).toLowerCase();
      const bad = FABRICATED.filter((f) => text.includes(f));
      ok(bad.length === 0, "SHORT: makes no constraint claim it was never told", bad.join("; ") || "none found");
    }
    ok(errs.length === 0, `${name}: no page errors`, errs.join(" | "));
    await ctx.close();
  }

  /* ── bundle: fully self-contained ── */
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
    await ctx.addInitScript(() => localStorage.setItem("dc-tour-seen", "1"));
    const page = await ctx.newPage();
    const external = [], errs = [];
    page.on("request", (req) => { if (!/^(file|data|blob):/.test(req.url())) external.push(req.url()); });
    page.on("pageerror", (e) => errs.push(String(e)));
    await page.goto(BUNDLE, { waitUntil: "load" });
    await page.waitForTimeout(900);
    const hero = await page.locator("#heroCount").textContent();
    ok(external.length === 0, "bundle makes zero external requests", external.slice(0, 3).join(", "));
    ok(errs.length === 0, "bundle has no page errors", errs.join(" | "));
    ok(/\d/.test(hero), "bundle renders its count from data", `heroCount=${hero}`);
    const faces = await page.evaluate(() => document.fonts ? document.fonts.size : -1);
    // Four faces since the redesign dropped IBM Plex Mono: Cormorant roman and
    // italic, Plex Sans, and the subset script.
    ok(faces >= 4, "bundle inlines the fonts", `${faces} faces`);
    const manifest = await page.locator('link[rel="manifest"]').count();
    ok(manifest === 0, "bundle carries no manifest link (so it registers no worker)");
    await ctx.close();
  }

  await browser.close();
  console.log(fails ? `\n${fails} FAILURE(S)` : "\nsmoke test passes");
  process.exitCode = fails ? 1 : 0;
})();
