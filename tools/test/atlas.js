/* Atlas check: globe turns per region, counts filled, no horizontal scroll,
   no console errors, region button opens Browse with the right count. */
const { launch, serve } = require("../lib/browser");
/* Screenshots only when asked for: DC_SHOTS=/some/dir node tools/test/atlas.js */
const OUT = process.env.DC_SHOTS || "";
if (OUT) require("fs").mkdirSync(OUT, { recursive: true });
(async () => {
  const site = await serve();
  const b = await launch();
  let fails = 0;
  for (const vp of [{ w: 390, h: 844, n: "phone" }, { w: 320, h: 640, n: "small" }, { w: 1280, h: 800, n: "desk" }]) {
    for (const theme of ["light", "dark"]) {
      const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h } });
      // The theme is the stored toggle value: space is the default whatever
      // the system scheme says, so colorScheme alone would never reach daylight.
      await ctx.addInitScript((t) => {
        localStorage.setItem("dc-tour-seen", "1");
        localStorage.setItem("dc-theme", t);
      }, theme);
      const pg = await ctx.newPage();
      const errs = [];
      pg.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
      pg.on("pageerror", (e) => errs.push(String(e)));
      await pg.goto(site.url + "/", { waitUntil: "load" });
      await pg.waitForTimeout(400);
      const steps = await pg.$$eval(".atlas-step", (els) => els.map((e) => e.dataset.region));
      const spins = [];
      for (let i = 0; i < steps.length; i++) {
        await pg.$eval(`.atlas-step[data-region="${steps[i]}"] h3`, (el) => el.scrollIntoView({ block: "center" }));
        await pg.waitForTimeout(1300);
        const st = await pg.evaluate((r) => {
          const s = document.querySelector(`.atlas-step[data-region="${r}"]`);
          const c = document.getElementById("atlasCanvas");
          const px = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
          let lit = 0; for (let k = 3; k < px.length; k += 4) if (px[k] > 0) lit++;
          return {
            active: s.classList.contains("is-active"),
            total: s.querySelector('[data-stat="total"]').textContent,
            funded: s.querySelector('[data-stat="funded"]').textContent,
            open: s.querySelector('[data-stat="open"]').textContent,
            pick: s.querySelector('[data-stat="pick"]').textContent.slice(0, 70),
            canvasLit: lit,
            stageTop: Math.round(document.querySelector(".atlas-stage").getBoundingClientRect().top),
            hscroll: document.documentElement.scrollWidth - document.documentElement.clientWidth
          };
        }, steps[i]);
        spins.push(st);
        if (!st.active || st.hscroll > 0 || !st.canvasLit || st.total === "") fails++;
        if (OUT && (i === 0 || i === 2 || i === 4)) await pg.screenshot({ path: `${OUT}/${vp.n}-${theme}-${steps[i]}.png` });
      }
      console.log(`${vp.n} ${theme}`);
      spins.forEach((s, i) => console.log(`  ${steps[i].padEnd(9)} active=${s.active} n=${s.total}/${s.funded}/${s.open} lit=${s.canvasLit} stageTop=${s.stageTop} hx=${s.hscroll} | ${s.pick}`));
      // region button -> Browse count agrees with the atlas count
      await pg.$eval('.atlas-step[data-region="europe"] h3', (el) => el.scrollIntoView({ block: "center" }));
      const before = await pg.$eval('.atlas-step[data-region="europe"] [data-stat="total"]', (e) => e.textContent);
      await pg.click('[data-region-go="europe"]');
      await pg.waitForTimeout(300);
      const cnt = await pg.$eval("#browseCount", (e) => e.textContent);
      const chip = await pg.$eval("#activeCountry", (e) => e.textContent.trim());
      const cards = await pg.$$eval("#browseCards .card", (c) => c.length);
      console.log(`  browse: "${cnt}" chip="${chip}" cards=${cards} atlas=${before}`);
      if (String(cards) !== before) fails++;
      if (errs.length) { console.log("  ERRORS", errs); fails++; }
      await ctx.close();
    }
  }
  await b.close();
  await site.close();
  console.log(fails ? `\n${fails} FAILURE(S)` : "\natlas passes");
  process.exitCode = fails ? 1 : 0;
})();
