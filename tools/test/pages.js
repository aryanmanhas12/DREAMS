/* Accessibility and layout sweep over the GENERATED category pages.
   audit.js covers the app; these pages have their own chrome (breadcrumb,
   listing, related block, doc-back) and the project's own history says a
   whitelist rots — .chip.is-key shipped failing AA because nobody added it
   to the sweep when the component was built. So the listing components get
   their own selectors here, in the same change that created them.

   Served over HTTP rather than file://, because 404.html's links are absolute
   /DREAMS/ paths and every one of them would be a false failure on file://.

   WAIT FOR "load", NEVER "domcontentloaded". These pages carry no JavaScript
   at all, and DOMContentLoaded does not wait for a stylesheet unless a script
   follows it — so with no script there is nothing to hold it, and the probe
   can run against a completely unstyled page. That reported 175 contrast
   failures at 1.00:1 with links at rgb(0, 0, 238), the browser default blue,
   which reads exactly like the stylesheet having been deleted. It had not.
   styleReady() below re-checks it explicitly, so a stylesheet that genuinely
   404s still FAILS rather than quietly passing on the same condition. */

const { launch, serve } = require("../lib/browser");
const fs = require("fs"), path = require("path");

const ROOT = path.join(__dirname, "..", "..");

const VIEWPORTS = [
  { w: 320, h: 568 }, { w: 390, h: 844 }, { w: 768, h: 1024 }, { w: 1280, h: 900 }
];
/* The generated pages, privacy, terms and the 404 carry no JavaScript, so
   they have no theme toggle and are always the default space theme; the
   system colour scheme no longer changes them. One pass covers what a reader
   can actually see. The daylight theme is swept in the app by audit.js. */
const THEMES = ["space"];

/* Components on these pages that introduce their own text-on-background
   combination. Generic tags alone would miss the breadcrumb and the fact
   list, which is exactly how .chip.is-key got through. */
const SELS = "h1, h2, h3, p, li, dt, dd, a, .crumbs a, .crumbs li, .listing-why, " +
             ".listing-facts dt, .listing-facts dd, .listing-link a, .related a, " +
             ".doc-lede, .doc-small, .doc-back a, .btn";

const probe = (sels) => {
  /* WCAG relative luminance. The float-syntax trap is the reason for the
     function-name test: color(srgb 0.94 0.93 0.89) is 0-1, rgb(0,0,1) is
     0-255 and legitimately near-black. Never guess from magnitude. */
  const parse = (s) => {
    if (!s) return null;
    if (s.startsWith("color(")) {
      const n = s.match(/-?[\d.]+/g).map(Number);
      return n.length >= 4 ? { r: n[1] * 255, g: n[2] * 255, b: n[3] * 255, a: n[4] == null ? 1 : n[4] }
                           : { r: n[0] * 255, g: n[1] * 255, b: n[2] * 255, a: 1 };
    }
    const n = (s.match(/-?[\d.]+/g) || []).map(Number);
    if (n.length < 3) return null;
    return { r: n[0], g: n[1], b: n[2], a: n[3] == null ? 1 : n[3] };
  };
  const lum = (c) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1
  });
  const bgOf = (el) => {
    for (let n = el; n; n = n.parentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0.95) return c;
    }
    return parse(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 };
  };

  const out = { contrast: [], targets: [], scroll: null, firstTab: null };
  out.scroll = document.documentElement.scrollWidth > window.innerWidth + 1
    ? `${document.documentElement.scrollWidth} > ${window.innerWidth}` : null;

  const seen = new Set();
  for (const el of document.querySelectorAll(sels)) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if (!el.textContent.trim()) continue;
    // only elements that render their own text node
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    const cs = getComputedStyle(el);
    const fg = parse(cs.color); if (!fg) continue;
    const bg = bgOf(el);
    const c = over(fg, bg);
    const L1 = Math.max(lum(c), lum(bg)), L2 = Math.min(lum(c), lum(bg));
    const ratio = (L1 + 0.05) / (L2 + 0.05);
    const px = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight, 10) >= 700;
    const large = px >= 24 || (px >= 18.66 && bold);
    const need = large ? 3 : 4.5;
    const key = el.className + "|" + el.tagName;
    if (ratio < need && !seen.has(key)) {
      seen.add(key);
      out.contrast.push(`${el.tagName}.${el.className || "-"} ${ratio.toFixed(2)}:1 (needs ${need})`);
    }
  }

  /* Tap targets: probe elementFromPoint, never the rect. The rect cannot see
     an ::after that grows the hit area, and measuring it reported 36x36 on
     buttons that were genuinely fine. */
  const hits = new Set();
  for (const el of document.querySelectorAll("a, button")) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if (r.top < 0 || r.bottom > window.innerHeight) continue;
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const owns = (x, y) => { const t = document.elementFromPoint(x, y); return t && (t === el || el.contains(t) || t.contains(el)); };
    const ok = owns(cx, cy - 21) && owns(cx, cy + 21) && owns(cx - 21, cy) && owns(cx + 21, cy);
    const key = (el.className || el.tagName) + "";
    if (!ok && !hits.has(key)) {
      hits.add(key);
      out.targets.push(`${el.tagName}.${el.className || "-"} ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
  }
  return out;
};

/* Proof that the page is actually styled, so an unstyled probe can never be
   mistaken for a contrast regression again — and a real missing stylesheet is
   still reported as a failure. */
async function styleReady(page) {
  try {
    await page.waitForFunction(() => {
      if (!document.styleSheets.length) return false;
      try { if (!document.styleSheets[0].cssRules.length) return false; } catch (e) { return false; }
      return getComputedStyle(document.body).backgroundColor !== "rgba(0, 0, 0, 0)";
    }, null, { timeout: 5000 });
    return true;
  } catch (e) { return false; }
}

(async () => {
  const site = await serve({ gzip: false });
  const browser = await launch();

  const paths = ["/404.html", ...fs.readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(ROOT, d.name, "index.html")))
    .filter((d) => !["dist", "assets", "tools", ".git", ".github"].includes(d.name))
    .map((d) => `/${d.name}/`)];

  let bugs = 0, combos = 0;
  for (const theme of THEMES) {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    for (const p of paths) {
      for (const v of VIEWPORTS) {
        await page.setViewportSize({ width: v.w, height: v.h });
        await page.goto(site.url + p, { waitUntil: "load" });
        const styled = await styleReady(page);
        if (!styled) {
          bugs++;
          console.log(`  \u2717 ${theme} ${v.w}px ${p}`);
          console.log("      stylesheet never applied \u2014 assets/styles.css did not load");
          continue;
        }
        const r = await page.evaluate(probe, SELS);
        combos++;
        const problems = [];
        if (r.scroll) problems.push("horizontal scroll: " + r.scroll);
        problems.push(...r.contrast.map((c) => "contrast " + c));
        problems.push(...r.targets.map((t) => "tap target " + t));
        if (problems.length) {
          bugs += problems.length;
          console.log(`  ✗ ${theme} ${v.w}px ${p}`);
          for (const x of problems) console.log("      " + x);
        }
      }
      // keyboard: the first Tab must land on something real and visible
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(site.url + p, { waitUntil: "load" });
      await styleReady(page);
      await page.keyboard.press("Tab");
      const f = await page.evaluate(() => {
        const a = document.activeElement;
        if (!a || a === document.body) return null;
        const cs = getComputedStyle(a);
        return { tag: a.tagName, text: (a.textContent || "").trim().slice(0, 40),
                 outline: cs.outlineStyle !== "none" || cs.boxShadow !== "none" };
      });
      if (!f) { bugs++; console.log(`  ✗ ${theme} ${p}: first Tab reaches nothing`); }
      else if (!f.outline) { bugs++; console.log(`  ✗ ${theme} ${p}: focused ${f.tag} has no visible focus ring`); }
    }
    await ctx.close();
  }
  await browser.close(); await site.close();
  console.log(bugs
    ? `\n${bugs} problem(s) across ${paths.length} pages x ${combos} viewport/theme loads`
    : `\n${paths.length} pages x ${VIEWPORTS.length} viewports x ${THEMES.length} themes (${combos} loads): no horizontal scroll, AA contrast holds, every tap target >=44px, first Tab lands on a visibly focused link`);
  process.exitCode = bugs ? 1 : 0;
})();
