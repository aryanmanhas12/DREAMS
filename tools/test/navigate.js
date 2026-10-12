/* Finding your way (October 2026): the Countries view, Deadlines for your
   year, the search box (suggestions, aliases, "did you mean", your searches,
   the / key), the home doors, and view addresses with a working Back button.

     node tools/test/navigate.js

   Every number on these views is computed from data, so each check computes
   the same number from window.DB in the page and compares. Harness rules
   from CLAUDE.md: dc-tour-seen and dc-intro seeded (except the one context
   that proves a #view address skips the opening), selectors scoped, the
   mobile nav opened before a navlink is clicked, re-query after re-render. */
const { launch, serve } = require("../lib/browser");

const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); return cond; };

async function nav(pg, view) {
  const sel = `#topnav .navlink[data-goto="${view}"]`;
  if (!(await pg.locator(sel).isVisible())) await pg.click("#navToggle");
  await pg.click(sel);
  await pg.waitForTimeout(350);
}
const active = (pg) => pg.evaluate(() => (document.querySelector(".view.is-active") || {}).id);
const hscroll = (pg) => pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

(async () => {
  const site = await serve();
  const b = await launch();

  /* ── functional checks on a phone ── */
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem("dc-tour-seen", "1");
      sessionStorage.setItem("dc-intro", "1");
      localStorage.setItem("dc-sound-told", "1");
    } catch (e) {}
  });
  const pg = await ctx.newPage();
  const errs = [];
  pg.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  pg.on("pageerror", (e) => errs.push(String(e)));
  await pg.goto(site.url + "/", { waitUntil: "load" });
  await pg.waitForTimeout(400);

  // The doors: counts from data, and the home search lands in Browse.
  const claimCountries = await pg.$eval("#claimCountries", (e) => Number(e.textContent.replace(/\D/g, "")));
  const doorText = await pg.$eval('[data-door-text="countries"]', (e) => e.textContent);
  ok(doorText.startsWith(String(claimCountries) + " countries"), `countries door says "${doorText.slice(0, 30)}", page claims ${claimCountries}`);
  const chip = pg.locator("#doorTry .try-chip").first();
  const chipQ = await chip.getAttribute("data-q");
  const chipN = Number((await chip.locator(".try-n").textContent()).replace(/\D/g, ""));
  await chip.click();
  await pg.waitForTimeout(400);
  ok((await active(pg)) === "view-browse", "a try chip on the home page did not open Browse");
  ok((await pg.inputValue("#browseSearch")) === chipQ, "the try chip's term is not in the search box");
  const cnt = await pg.$eval("#browseCount", (e) => e.textContent);
  ok(cnt.startsWith(String(chipN) + " programme"), `chip "${chipQ}" promised ${chipN}, Browse says "${cnt.slice(0, 50)}"`);
  ok((await pg.evaluate(() => location.hash)) === "#browse", "Browse did not get its #browse address");

  // Back returns to the home page.
  await pg.goBack();
  await pg.waitForTimeout(400);
  ok((await active(pg)) === "view-intro", "Back from Browse did not return to the home page");

  // Countries: one tile per place, summing to every programme.
  await nav(pg, "countries");
  ok((await active(pg)) === "view-countries", "the Countries navlink did not open Countries");
  const cx = await pg.evaluate(() => {
    const D = window.DB, items = [].concat(D.study || [], D.funding || [], D.research || [], D.residency || [], D.equity || []);
    const per = {};
    items.forEach((i) => { per[i.country] = (per[i.country] || 0) + 1; });
    const tiles = [...document.querySelectorAll("#cxGrid .cx-tile")].map((t) => ({
      c: t.dataset.cx, n: Number(t.querySelector(".cx-n").firstChild.textContent.replace(/\D/g, ""))
    }));
    return { per, tiles, total: items.length };
  });
  ok(cx.tiles.length === Object.keys(cx.per).length, `${cx.tiles.length} tiles for ${Object.keys(cx.per).length} distinct places`);
  ok(cx.tiles.every((t) => cx.per[t.c] === t.n), "a country tile's route count differs from the data");
  ok(cx.tiles.reduce((n, t) => n + t.n, 0) === cx.total, "the tiles do not add up to every programme");

  // A region chip narrows the tiles to that region.
  await pg.click('#cxRegions .cx-rbtn[data-r="europe"]');
  await pg.waitForTimeout(250);
  const eu = await pg.$$eval("#cxGrid .cx-tile", (els) => els.map((e) => e.dataset.cx));
  ok(eu.length > 3 && eu.indexOf("India") === -1 && eu.indexOf("Germany") !== -1, "the Europe chip did not narrow the tiles to Europe");

  // A tile opens the place, with its programmes as full cards; Back to all.
  await pg.click('#cxGrid .cx-tile[data-cx="Germany"]');
  await pg.waitForTimeout(400);
  const de = await pg.evaluate(() => ({
    shown: !document.getElementById("cxDetail").hidden,
    h: (document.getElementById("cxDetailH") || {}).textContent,
    focus: document.activeElement && document.activeElement.id,
    cards: document.querySelectorAll("#cxDetail .card").length,
    toolsHidden: getComputedStyle(document.querySelector(".cx-tools")).display === "none",
    inView: Math.round(document.getElementById("cxDetail").getBoundingClientRect().top)
  }));
  const deN = cx.per.Germany;
  ok(de.shown && de.h === "Germany", "the Germany tile did not open Germany");
  ok(de.cards === deN, `Germany shows ${de.cards} cards, the data has ${deN}`);
  ok(de.focus === "cxDetailH", "focus did not move to the place's heading");
  ok(de.toolsHidden, "the region chips stayed on screen over an open place");
  ok(de.inView >= 0 && de.inView < 300, `the open place starts ${de.inView}px down the screen`);
  await pg.click("#cxBack");
  await pg.waitForTimeout(300);
  ok(await pg.evaluate(() => document.activeElement && document.activeElement.dataset.cx === "Germany"), "All countries did not return focus to the Germany tile");

  // Deadlines for your year.
  await nav(pg, "calendar");
  await pg.click('#dlStages .fbtn[data-st="pre"]');
  await pg.waitForTimeout(250);
  const dl = await pg.evaluate(() => {
    const D = window.DB, items = [].concat(D.study || [], D.funding || [], D.research || [], D.residency || [], D.equity || []);
    const m = new Date().getMonth() + 1, n1 = (m % 12) + 1, n2 = (n1 % 12) + 1;
    const urg = (i) => i.noOpenCall ? "none" : !i.deadlineMonths || !i.deadlineMonths.length || i.deadlineMonths.length >= 12 ? "always"
      : i.deadlineMonths.indexOf(m) !== -1 ? "open" : (i.deadlineMonths.indexOf(n1) !== -1 || i.deadlineMonths.indexOf(n2) !== -1) ? "soon" : "closed";
    const pre = items.filter((i) => !i.stages || i.stages.indexOf("pre") !== -1);
    const soon = pre.filter((i) => urg(i) === "open" || urg(i) === "soon").length;
    const ORDER = ["pre", "clin", "intern", "grad", "pg"];
    const last = items.filter((i) => i.stages && i.stages.indexOf("pre") !== -1 && !i.stages.some((s) => ORDER.indexOf(s) > 1)).length;
    return {
      soon, last,
      count: document.getElementById("dlCount").textContent,
      lastRows: document.querySelectorAll("#dlLast .dl-row").length,
      stored: localStorage.getItem("dc-year"),
      bars: document.querySelectorAll("#dlStrip .dl-bar").length
    };
  });
  ok(dl.count.startsWith(String(dl.soon) + " open now"), `closing-soon count "${dl.count.slice(0, 40)}", the data gives ${dl.soon} for 1st-2nd prof`);
  ok(dl.lastRows === dl.last, `last chance lists ${dl.lastRows}, the data gives ${dl.last} student-only entries`);
  ok(dl.stored === "pre", "the year picked was not kept");
  ok(dl.bars === 6, `the month strip has ${dl.bars} bars, not 6`);
  await pg.click("#dlStrip .dl-bar >> nth=2");
  await pg.waitForTimeout(200);
  ok(/with a window in/.test(await pg.$eval("#dlCount", (e) => e.textContent)), "a month bar did not narrow the list to that month");
  await pg.reload({ waitUntil: "load" });
  await pg.waitForTimeout(400);
  ok((await active(pg)) === "view-calendar", "reloading #calendar did not reopen Deadlines");
  ok((await pg.getAttribute('#dlStages .fbtn[data-st="pre"]', "aria-pressed")) === "true", "the kept year was not restored on reload");

  // Search: suggestions by keyboard, a country picked from them.
  await nav(pg, "browse");
  await pg.click("#browseSearch");
  await pg.keyboard.type("germ", { delay: 20 });
  await pg.waitForTimeout(200);
  const sg = await pg.$$eval("#searchSuggest .sg-opt", (els) => els.map((e) => e.textContent));
  ok(sg.length && /^Germany/.test(sg[0]), `typing "germ" suggested ${JSON.stringify(sg.slice(0, 2))}`);
  ok((await pg.getAttribute("#browseSearch", "aria-expanded")) === "true", "the search box did not say its suggestions are open");
  await pg.keyboard.press("ArrowDown");
  ok((await pg.getAttribute("#browseSearch", "aria-activedescendant")) === "sg-0", "ArrowDown did not move to the first suggestion");
  await pg.keyboard.press("Enter");
  await pg.waitForTimeout(300);
  ok(/Germany/.test(await pg.$eval("#activeCountry", (e) => e.textContent)), "picking the Germany suggestion did not filter to Germany");
  await pg.click("#livingThere");
  await pg.waitForTimeout(700);
  ok((await active(pg)) === "view-countries" && (await pg.$eval("#cxDetailH", (e) => e.textContent)) === "Germany", "Living in Germany did not open Germany's page");

  // Aliases, facts and "did you mean". The Germany filter is still on (a
  // filter stays until it is cleared, with its chip saying so); clear it.
  await nav(pg, "browse");
  if (await pg.$("#clearCountry")) { await pg.click("#clearCountry"); await pg.waitForTimeout(200); }
  const probe = async (q) => {
    await pg.fill("#browseSearch", q);
    await pg.press("#browseSearch", "Enter");
    await pg.waitForTimeout(250);
    return pg.$eval("#browseCount", (e) => e.textContent);
  };
  const freeN = await pg.evaluate(() => {
    const D = window.DB;
    return [].concat(D.study || [], D.funding || [], D.research || [], D.residency || [], D.equity || []).filter((i) => i.zeroCost || i.funding === "free").length;
  });
  ok((await probe("free")).startsWith(freeN + " programme"), `"free" did not return the ${freeN} entries that cost nothing`);
  ok(!/^0 /.test(await probe("uk scholarships")), `"uk scholarships" found nothing`);
  ok(!/^0 /.test(await probe("phd germany")), `"phd germany" found nothing`);
  await probe("psychaitry");
  const dym = await pg.$("#browseCards [data-dym]");
  ok(!!dym && (await dym.getAttribute("data-dym")) === "psychiatry", `"psychaitry" did not offer "psychiatry"`);
  if (dym) {
    await dym.click();
    await pg.waitForTimeout(250);
    ok(!/^0 /.test(await pg.$eval("#browseCount", (e) => e.textContent)), "the did-you-mean search found nothing");
  }

  // Your searches: kept on this device, shown back, clearable.
  await probe("ICMR");
  const mine = await pg.evaluate(() => ({
    stored: JSON.parse(localStorage.getItem("dc-searches") || "[]").map((s) => s.q.toLowerCase()),
    row: [...document.querySelectorAll("#browseTry .try-chip.is-mine")].map((e) => e.dataset.q.toLowerCase())
  }));
  ok(mine.stored.indexOf("icmr") !== -1 && mine.row.indexOf("icmr") !== -1, "an Enter search was not kept and shown under Your searches");
  await pg.click("#trySearchesClear");
  await pg.waitForTimeout(150);
  ok((await pg.$$("#browseTry .try-chip.is-mine")).length === 0, "Clear did not remove your searches");

  // The / key, from the home page.
  await pg.click("#brandHome");
  await pg.waitForTimeout(400);
  await pg.keyboard.press("/");
  await pg.waitForTimeout(500);
  ok((await active(pg)) === "view-browse" && (await pg.evaluate(() => document.activeElement.id)) === "browseSearch", "/ did not jump to the search box");

  ok(!errs.length, "console errors: " + errs.slice(0, 3).join(" | "));
  await ctx.close();

  /* ── a #view address skips the opening and lands on its view ── */
  const fresh = await b.newContext({ viewport: { width: 390, height: 844 } });
  await fresh.addInitScript(() => { try { localStorage.setItem("dc-tour-seen", "1"); localStorage.setItem("dc-sound", "off"); } catch (e) {} });
  const fp = await fresh.newPage();
  await fp.goto(site.url + "/#countries", { waitUntil: "load" });
  await fp.waitForTimeout(600);
  ok(!(await fp.evaluate(() => document.documentElement.classList.contains("intro-on"))), "a #countries address still played the opening");
  ok((await active(fp)) === "view-countries", "a #countries address did not open Countries");
  await fresh.close();

  /* ── no sideways scroll on the new views, both themes, three widths ── */
  for (const w of [320, 768, 1280]) {
    for (const theme of ["dark", "light"]) {
      const c = await b.newContext({ viewport: { width: w, height: 800 }, reducedMotion: "reduce" });
      await c.addInitScript((t) => { try {
        localStorage.setItem("dc-tour-seen", "1"); sessionStorage.setItem("dc-intro", "1");
        localStorage.setItem("dc-theme", t); localStorage.setItem("dc-sound-told", "1");
      } catch (e) {} }, theme);
      const p = await c.newPage();
      await p.goto(site.url + "/", { waitUntil: "load" });
      await p.waitForTimeout(300);
      ok((await hscroll(p)) <= 0, `${w}/${theme} home (doors) scrolls sideways`);
      await nav(p, "countries");
      ok((await hscroll(p)) <= 0, `${w}/${theme} countries scrolls sideways`);
      await p.click('#cxGrid .cx-tile[data-cx="India"]');
      await p.waitForTimeout(300);
      ok((await hscroll(p)) <= 0, `${w}/${theme} an open country scrolls sideways`);
      await nav(p, "calendar");
      await p.click('#dlStages .fbtn[data-st="clin"]');
      ok((await hscroll(p)) <= 0, `${w}/${theme} deadlines scrolls sideways`);
      await nav(p, "browse");
      await p.click("#browseSearch");
      await p.keyboard.type("public health", { delay: 10 });
      await p.waitForTimeout(250);
      ok((await hscroll(p)) <= 0, `${w}/${theme} browse with suggestions open scrolls sideways`);
      await c.close();
    }
  }

  await b.close();
  site.close();
  fails.forEach((f) => console.log("  ✗ " + f));
  console.log(fails.length ? `${fails.length} FAILED: finding-your-way checks` : "PASS: countries, deadlines for your year, search, doors and view addresses");
  process.exitCode = fails.length ? 1 : 0;
})();
