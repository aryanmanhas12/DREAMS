/* Console + network sweep across every published page.
   The brief asks for "console errors fixed" and "broken images / broken
   network requests fixed", and neither is visible to a text check. Serve the
   real directory over HTTP (file:// would make every absolute /DREAMS/ link
   a false 404) and load each page with a listener on console and on
   requestfailed. Seed dc-tour-seen, or the tour scrim opens on every fresh
   context — that is the documented trap, and it would also fire its own
   timers during the measurement. */
const { launch, serve } = require("../lib/browser");
const fs = require("fs"), path = require("path");

const ROOT = path.join(__dirname, "..", "..");

(async () => {
  const site = await serve({ gzip: false });
  const browser = await launch();
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  await ctx.addInitScript(() => localStorage.setItem("dc-tour-seen", "1"));

  const paths = ["/", "/privacy.html", "/terms.html", "/404.html",
    ...fs.readdirSync(ROOT, { withFileTypes: true })
      .filter((d) => d.isDirectory() && fs.existsSync(path.join(ROOT, d.name, "index.html")))
      .filter((d) => !["dist", "assets", "tools", ".git", ".github"].includes(d.name))
      .map((d) => `/${d.name}/`)];

  let bad = 0;
  for (const p of paths) {
    const errs = [], failed = [];
    const page = await ctx.newPage();
    page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(`${m.type()}: ${m.text()}`); });
    page.on("pageerror", (e) => errs.push("pageerror: " + e.message));
    page.on("requestfailed", (r) => failed.push(r.url()));
    page.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
    await page.goto(site.url + p, { waitUntil: "networkidle" });
    // broken <img> / <canvas> that never painted
    const imgs = await page.evaluate(() =>
      [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
    const n = errs.length + failed.length + imgs.length;
    if (n) bad++;
    console.log(`  ${n ? "✗" : "✓"} ${p}${n ? "" : "  clean"}`);
    for (const e of errs) console.log("      console  " + e);
    for (const f of failed) console.log("      request  " + f);
    for (const i of imgs) console.log("      image    " + i);
    await page.close();
  }
  await browser.close(); await site.close();
  console.log(bad ? `\n${bad} page(s) with console or network problems` : `\nAll ${paths.length} pages clean: no console errors, no failed requests, no broken images`);
  process.exitCode = bad ? 1 : 0;
})();
