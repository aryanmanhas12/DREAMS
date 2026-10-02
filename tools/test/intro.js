/* The opening's own harness (assets/intro.js). Every other suite seeds
   sessionStorage "dc-intro" so the opening stays out of its way; this one
   is the opening, so it seeds nothing, the way tour.js seeds nothing.

   What is asserted: it ends by itself in the time it claims and the page
   comes back whole with the tour after it; Skip is on the first screen from
   the gate onwards, answers a 44px tap, and works from the gate, mid-turn
   and by Escape, going straight to the page with no tour on top; it never
   plays for anyone who has said no to motion (reduced motion, a paused sky)
   or who came by a plan link; it fails open when storage throws; it fits
   the first screen of a 320px phone; and a phone can afford it (script,
   frames and long tasks at 4x CPU). */
const { launch, serve } = require("../lib/browser");

let fails = 0;
const ok = (c, m, d) => { if (!c) fails++; console.log(`  ${c ? "✓" : "✗"} ${m}${d ? "  — " + d : ""}`); };

(async () => {
  const site = await serve();
  const b = await launch();
  const URL = site.url + "/";

  async function fresh(vp, init, opts) {
    const ctx = await b.newContext(Object.assign({ viewport: { width: vp.w, height: vp.h } }, opts || {}));
    if (init) await ctx.addInitScript(init);
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
    return { ctx, page, errs };
  }
  const state = (page) => page.evaluate(() => {
    const d = document.documentElement, intro = document.getElementById("intro");
    return {
      on: d.classList.contains("intro-on"), gate: d.classList.contains("intro-wait"),
      hidden: intro.hidden || getComputedStyle(intro).display === "none",
      playing: intro.classList.contains("is-playing"),
      main: getComputedStyle(document.getElementById("main")).visibility,
      tour: document.body.classList.contains("tour-locked"),
      count: document.getElementById("introCount").textContent,
      claim: (document.getElementById("claimCountries") || {}).textContent,
      seen: sessionStorage.getItem("dc-intro")
    };
  });

  /* ── 1. the whole first visit, at four sizes ── */
  const SIZES = [{ w: 390, h: 844, n: "390 phone" }, { w: 320, h: 568, n: "320 phone" },
                 { w: 844, h: 390, n: "844 landscape" }, { w: 1280, h: 800, n: "1280 desktop" }];
  for (const vp of SIZES) {
    console.log(`\n${vp.n}`);
    const { ctx, page, errs } = await fresh(vp);
    await page.goto(URL, { waitUntil: "load" });
    await page.waitForSelector("#intro.is-ready", { timeout: 8000 });
    let s = await state(page);
    ok(s.on && s.gate && !s.hidden, "opens on the gate", JSON.stringify({ on: s.on, gate: s.gate }));
    ok(s.main === "hidden", "the page underneath is hidden, so it cannot flash or take focus");
    const fit = await page.evaluate(() => {
      const r = (id) => document.getElementById(id).getBoundingClientRect();
      const a = r("introBegin"), q = r("introQuiet"), k = r("introSkip"), line = document.querySelector(".intro-gate-line").getBoundingClientRect();
      const apart = (x, y) => x.right <= y.left || y.right <= x.left || x.bottom <= y.top || y.bottom <= x.top;
      const probe = (el) => {
        const rc = el.getBoundingClientRect(), cx = rc.left + rc.width / 2, cy = rc.top + rc.height / 2;
        return [[0, -21], [0, 21], [-21, 0], [21, 0]].every(([dx, dy]) => {
          const hit = document.elementFromPoint(cx + dx, cy + dy);
          return hit && (hit === el || el.contains(hit));
        });
      };
      return {
        inView: [a, q, k, line].every((x) => x.top >= 0 && x.bottom <= innerHeight && x.left >= 0 && x.right <= innerWidth),
        skipClear: [a, q, line].every((x) => apart(k, x)),
        noSideScroll: document.getElementById("intro").scrollWidth <= innerWidth && document.documentElement.scrollWidth <= innerWidth,
        taps: ["introBegin", "introQuiet", "introSkip"].every((id) => probe(document.getElementById(id))),
        focus: document.activeElement && document.activeElement.id
      };
    });
    ok(fit.inView, "Begin, Begin in silence, Skip and the line all sit on the first screen, no scrolling");
    ok(fit.skipClear, "Skip overlaps none of the gate's buttons or its line");
    ok(fit.noSideScroll, "no horizontal scroll");
    ok(fit.taps, "Begin, Begin in silence and Skip each answer a 44px tap");
    ok(fit.focus === "introBegin", "focus starts on Begin", fit.focus);

    const t0 = Date.now();
    await page.click("#introBegin");
    await page.waitForTimeout(400);
    s = await state(page);
    ok(s.playing && !s.gate, "Begin starts it");
    ok(s.seen === "1", "the visit is marked the moment it starts");
    if (vp.n === "390 phone") {
      const pressed = await page.evaluate(() => new Promise((res) => setTimeout(() => res(document.getElementById("introSound").getAttribute("aria-pressed")), 900)));
      ok(pressed === "true", "the music is playing (the opening's speaker reads on)", pressed);
    }
    await page.waitForTimeout(7200 - (Date.now() - t0));
    s = await state(page);
    ok(s.count === s.claim && !!s.count, "the count lands on the same number of countries the page states", `${s.count} vs ${s.claim}`);
    const drawn = await page.evaluate(() => {
      const c = document.getElementById("introCanvas"), g = c.getContext("2d");
      const d = g.getImageData(0, 0, c.width, c.height).data;
      let lit = 0;
      for (let i = 3; i < d.length; i += 4 * 97) if (d[i] > 0) lit++;
      return { lit, say: document.getElementById("introSay2").textContent };
    });
    ok(drawn.lit > 50, "the globe is drawn on its canvas", `${drawn.lit} sampled pixels`);
    ok(drawn.say.indexOf(s.claim) !== -1, "Ooh's line carries the same count", drawn.say.trim());
    await page.waitForFunction(() => document.getElementById("intro").hidden, null, { timeout: 6000 }).catch(() => {});
    const took = Date.now() - t0;
    s = await state(page);
    ok(s.hidden && !s.on && s.main === "visible", "ends by itself and the page comes back", JSON.stringify({ hidden: s.hidden, main: s.main }));
    ok(took > 9300 && took < 11200, "lasts the length of Ronak's overture (9.6s, plus the fade)", `${(took / 1000).toFixed(2)}s`);
    await page.waitForTimeout(1300);
    s = await state(page);
    ok(s.tour, "the tour follows on a first visit, after the opening and not over it");
    await page.reload({ waitUntil: "load" });
    s = await state(page);
    ok(!s.on && s.hidden, "a reload inside the visit does not replay it");
    ok(errs.length === 0, "no console or page errors", errs.slice(0, 3).join(" | "));
    await ctx.close();
  }

  /* ── 2. the ways it stays out of the way ── */
  console.log("\nexits");
  // Skip, three ways. No dc-tour-seen here, so a tour that wrongly follows
  // a skip would show.
  const skipRuns = [
    ["Skip at the gate", { w: 390, h: 844 }, async (page) => { await page.click("#introSkip"); }, false],
    ["Skip mid-turn, with the music on", { w: 390, h: 844 }, async (page) => {
      await page.click("#introBegin"); await page.waitForTimeout(3000); await page.click("#introSkip");
    }, true],
    ["Escape mid-turn", { w: 1280, h: 800 }, async (page) => {
      await page.click("#introQuiet"); await page.waitForTimeout(2000); await page.keyboard.press("Escape");
    }, false]
  ];
  for (const [name, vp, act, music] of skipRuns) {
    const { ctx, page, errs } = await fresh(vp);
    await page.goto(URL, { waitUntil: "load" });
    await page.waitForSelector("#intro.is-ready");
    const t0 = Date.now();
    await act(page);
    const t1 = Date.now();
    await page.waitForFunction(() => document.getElementById("intro").hidden, null, { timeout: 3000 }).catch(() => {});
    const took = Date.now() - t1;
    let s = await state(page);
    ok(s.hidden && !s.on && s.main === "visible" && took < 900, `${name}: the page is back at once`, `${took}ms after the skip, ${((Date.now() - t0) / 1000).toFixed(1)}s in all`);
    ok(s.seen === "1", `${name}: the visit counts as opened, so a reload does not bring it back`);
    await page.waitForTimeout(1600);
    s = await state(page);
    ok(!s.tour, `${name}: no tour straight on top of a skip`);
    const pressed = await page.evaluate(() => document.getElementById("soundToggle").getAttribute("aria-pressed"));
    ok(pressed === String(music), `${name}: ${music ? "the music carries on" : "no sound starts"}`, `speaker reads ${pressed}`);
    const globe = await page.evaluate(() => {
      const c = document.getElementById("globeCanvas"), g = c.getContext("2d");
      const d = g.getImageData(0, 0, c.width, c.height).data;
      let n = 0;
      for (let i = 3; i < d.length; i += 4 * 97) if (d[i] > 0) n++;
      return n;
    });
    ok(globe > 50, `${name}: the hero globe is drawn`, `${globe} sampled pixels`);
    ok(errs.length === 0, `${name}: no errors`, errs.slice(0, 2).join(" | "));
    await ctx.close();
  }
  {
    const { ctx, page, errs } = await fresh({ w: 390, h: 844 }, () => localStorage.setItem("dc-tour-seen", "1"));
    await page.goto(URL, { waitUntil: "load" });
    await page.waitForSelector("#intro.is-ready");
    await page.click("#introQuiet");
    await page.waitForFunction(() => document.getElementById("intro").hidden, null, { timeout: 12000 });
    const q = await page.evaluate(() => ({ on: window.DCSound.isOn(), pressed: document.getElementById("soundToggle").getAttribute("aria-pressed") }));
    await page.click("#startBtn");
    await page.waitForTimeout(800);
    const after = await page.evaluate(() => document.getElementById("soundToggle").getAttribute("aria-pressed"));
    ok(!q.on && q.pressed === "false" && after === "false", "Begin in silence: no sound this visit, not even on the next tap", JSON.stringify(q) + " then " + after);
    const stored = await page.evaluate(() => localStorage.getItem("dc-sound"));
    ok(stored !== "off", "and the stored choice is untouched, so the next visit has music", String(stored));
    ok(errs.length === 0, "no errors", errs.slice(0, 2).join(" | "));
    await ctx.close();
  }
  {
    const { ctx, page } = await fresh({ w: 390, h: 844 }, () => { localStorage.setItem("dc-sound", "off"); localStorage.setItem("dc-tour-seen", "1"); });
    await page.goto(URL, { waitUntil: "load" });
    await page.waitForTimeout(600);
    const s = await state(page);
    ok(s.on && !s.gate && s.playing, "sound switched off: no gate, it simply plays");
    await ctx.close();
  }
  const skips = [
    ["reduced motion", null, { reducedMotion: "reduce" }, ""],
    ["after Pause the moving sky", () => localStorage.setItem("dc-sky", "still"), null, ""],
    ["a shared plan link", null, null, "#p=AAAA"],
    ["storage that throws (fails open onto the page)", () => {
      Object.defineProperty(window, "sessionStorage", { get() { throw new Error("blocked"); } });
    }, null, ""]
  ];
  for (const [name, init, opts, hash] of skips) {
    const { ctx, page } = await fresh({ w: 390, h: 844 }, init, opts);
    await page.goto(URL + hash, { waitUntil: "load" });
    await page.waitForTimeout(300);
    const s = await page.evaluate(() => ({
      on: document.documentElement.classList.contains("intro-on"),
      shown: getComputedStyle(document.getElementById("intro")).display !== "none",
      main: getComputedStyle(document.getElementById("main")).visibility
    }));
    ok(!s.on && !s.shown && s.main === "visible", `never plays for ${name}`, JSON.stringify(s));
    await ctx.close();
  }

  /* ── 3. what it costs a phone ── */
  console.log("\ncost at 4x CPU, 390 phone");
  {
    const { ctx, page } = await fresh({ w: 390, h: 844 }, () => localStorage.setItem("dc-tour-seen", "1"), { deviceScaleFactor: 3 });
    const cdp = await ctx.newCDPSession(page);
    await page.goto(URL, { waitUntil: "load" });
    await page.waitForSelector("#intro.is-ready");
    await page.waitForTimeout(1500);   // let the sky finish painting first
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await cdp.send("Performance.enable");
    const metric = async (k) => (await cdp.send("Performance.getMetrics")).metrics.find((m) => m.name === k).value;
    const script0 = await metric("ScriptDuration");
    await page.evaluate(() => {
      window.__lt = []; window.__frames = 0;
      new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(Math.round(e.duration)))).observe({ entryTypes: ["longtask"] });
      const f = () => { window.__frames++; if (!document.getElementById("intro").hidden) requestAnimationFrame(f); };
      requestAnimationFrame(f);
    });
    const t0 = Date.now();
    await page.click("#introBegin");
    await page.waitForFunction(() => document.getElementById("intro").hidden, null, { timeout: 20000 });
    const secs = (Date.now() - t0) / 1000;
    const r = await page.evaluate(() => ({ lt: window.__lt, frames: window.__frames }));
    const script = Math.round((await metric("ScriptDuration") - script0) * 1000);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
    const worst = r.lt.length ? Math.max.apply(null, r.lt) : 0;
    const fps = r.frames / secs;
    // Most of this container's busy time is its software GPU uploading the
    // canvas (no GPU here; see CLAUDE.md). Script is the part a phone pays.
    ok(script < 1500, "script for the whole opening stays small", `${script}ms of script in ${secs.toFixed(1)}s`);
    // These two are bound by this container's software GPU, not by script.
    // A restarted container measured the PUBLISHED opening at worst 317-357ms
    // and 11-12 frames/s where the first one measured 227ms and 19, so the
    // budgets sit above both: they catch a regression, not a slower machine.
    ok(worst < 600, "no long task over 600ms while it plays", `${r.lt.length} long tasks, worst ${worst}ms`);
    ok(fps >= 8, "keeps turning at a watchable frame rate even here (no GPU in this container)", `${fps.toFixed(1)} frames/s`);
    await ctx.close();
  }

  await b.close();
  site.close();
  console.log(fails ? `\n✗ ${fails} failed` : "\n✓ opening: all checks passed");
  process.exit(fails ? 1 : 0);
})();
