/* Mobile performance budgets, on a phone-sized viewport with the CPU
   throttled 4x (Lighthouse's mobile profile).

   The galaxy's first version redrew a full-screen canvas every frame on the
   main thread. With the hero globe's per-point trigonometry on top, a trace
   at phone speed showed the main thread saturated while the reader did
   nothing, 24 long tasks during load and taps taking 400ms. The fixes (sky
   painted once and moved by CSS on the compositor, globe geometry
   precomputed, idle spin at 30fps and held during scroll, sky built after
   load in idle time) are easy to undo by accident, and nothing on screen
   says so on a fast laptop. These budgets do.

     1. With the hero scrolled away and the page at rest, NOTHING asks for an
        animation frame: the sky's motion is CSS, and the globes sleep when
        they have nowhere to go. A per-frame loop reintroduced anywhere
        fails this.
     2. No single task during load runs over LONG_TASK_MS.
     3. No tap in the survey takes over TAP_MS from input to the next paint
        (the Event Timing API's duration, which is what INP is built from).

   Budgets are set well above today's measurements (worst load task ~200ms,
   worst tap ~250ms at 4x) because this machine has no GPU and its numbers
   wander; they are there to catch a regression, not to grade a run. */
const { launch, serve } = require("../lib/browser");

const LONG_TASK_MS = 450;
const TAP_MS = 450;
const IDLE_RAF_MAX = 3;

(async () => {
  const site = await serve({ gzip: true });
  const browser = await launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await ctx.addInitScript(() => {
    localStorage.setItem("dc-tour-seen", "1");
    sessionStorage.setItem("dc-intro", "1");   // the opening has played this visit
    localStorage.setItem("dc-sound-told", "1");
    window.__lt = []; window.__ev = []; window.__raf = 0;
    const orig = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = function (cb) { window.__raf++; return orig(cb); };
    try { new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(Math.round(e.duration)))).observe({ type: "longtask", buffered: true }); } catch (e) {}
    try { new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__ev.push({ n: e.name, d: Math.round(e.duration) }))).observe({ type: "event", durationThreshold: 16, buffered: true }); } catch (e) {}
  });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e)));

  await page.goto(site.url + "/", { waitUntil: "load" });
  await page.waitForTimeout(5000);           // the sky builds in idle time after load
  const loadTasks = await page.evaluate(() => window.__lt.slice());

  // 1. Scroll the hero globe out of view, let everything settle, then count
  //    animation-frame requests over two quiet seconds.
  await page.evaluate(() => window.scrollTo(0, document.querySelector(".claims").getBoundingClientRect().top + window.scrollY));
  await page.waitForTimeout(2500);
  const r0 = await page.evaluate(() => window.__raf);
  await page.waitForTimeout(2000);
  const idleRaf = (await page.evaluate(() => window.__raf)) - r0;

  // 3. Taps through the short survey.
  await page.evaluate(() => { window.scrollTo(0, 0); window.__ev = []; });
  await page.click("#startBtn");
  await page.waitForTimeout(700);
  for (let i = 0; i < 3; i++) {
    await page.click(`#view-survey .opt >> nth=${i}`);
    await page.waitForTimeout(400);
    await page.click("#nextBtn");
    await page.waitForTimeout(900);
  }
  await page.waitForTimeout(1000);
  const taps = await page.evaluate(() => window.__ev.filter((e) => /click|pointer/.test(e.n)).map((e) => e.d));

  await browser.close();
  await site.close();

  const worstLoad = loadTasks.length ? Math.max(...loadTasks) : 0;
  const worstTap = taps.length ? Math.max(...taps) : 0;
  const fails = [];
  if (idleRaf > IDLE_RAF_MAX) fails.push(`${idleRaf} animation frames requested in 2s of rest with the hero off screen (max ${IDLE_RAF_MAX}): something is looping per frame`);
  if (worstLoad > LONG_TASK_MS) fails.push(`a ${worstLoad}ms task during load (budget ${LONG_TASK_MS}ms at 4x)`);
  if (worstTap > TAP_MS) fails.push(`a ${worstTap}ms tap (budget ${TAP_MS}ms at 4x)`);
  if (errs.length) fails.push("page errors: " + errs.join(" | "));
  console.log(`  idle rAF requests: ${idleRaf}; load long tasks: ${loadTasks.length} (worst ${worstLoad}ms); worst tap: ${worstTap}ms`);
  console.log(fails.length ? fails.map((f) => "  ✗ " + f).join("\n") + `\n${fails.length} budget(s) broken`
    : "Within budget at 4x CPU: nothing loops at rest, no long load task, taps paint promptly");
  process.exit(fails.length ? 1 : 0);
})();
