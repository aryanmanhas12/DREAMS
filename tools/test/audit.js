/* Dreams Counsellor — browser audit of the app itself (index.html).
   Drives the real page across viewports and both themes, looking for the
   failure classes this project has actually shipped: horizontal scroll,
   sub-16px text-entry controls, AA contrast, stranded reveals, off-screen
   primary CTA, console errors, and sub-44px tap targets.

   Harness rules obeyed (six false failures came from ignoring them):
   - selectors scoped (#topnav .navlink, #browseCards .star-btn)
   - reducedMotion:'reduce' so the globe is frozen
   - re-query after any re-render
   - contrast parser distinguishes color(srgb …) 0–1 floats by FUNCTION NAME
   - zoom-on-focus checked only on input/select/textarea
   - tap targets probed with elementFromPoint, never getBoundingClientRect
   - dc-tour-seen seeded, or the tour scrim intercepts every click
   - dc-intro seeded in sessionStorage, or the opening covers the page for
     a visit's first 10 seconds (tools/test/intro.js tests the opening)
   - the install offer is hidden until the browser says it can install, so a
     synthetic beforeinstallprompt fires first or the control ships unmeasured
*/
const { launch, serve } = require("../lib/browser");
const path = require("path");

const ROOT = process.argv[2] || path.join(__dirname, "..", "..");
const URL = "file://" + path.join(ROOT, "index.html");

const VIEWPORTS = [
  { name: "320", width: 320, height: 640 },
  { name: "375-SE", width: 375, height: 667 },
  { name: "390-iPhone", width: 390, height: 844 },
  { name: "768-iPad", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1280", width: 1280, height: 900 }
];

const findings = [];
const F = (sev, where, msg) => findings.push({ sev, where, msg });

function parseColor(str) {
  if (!str) return null;
  let m = str.match(/^rgba?\(([^)]+)\)/);
  if (m) {
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  m = str.match(/^color\(srgb\s+([^)]+)\)/);
  if (m) {
    const p = m[1].split(/[\s/]+/).filter(Boolean).map(Number);
    return { r: p[0] * 255, g: p[1] * 255, b: p[2] * 255, a: p.length > 3 ? p[3] : 1 };
  }
  return null;
}
const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
const contrast = (fg, bg) => { const a = lum(fg), b = lum(bg); return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05); };
const over = (fg, bg) => fg.a >= 1 ? fg : {
  r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1
};

async function scrollWidthCheck(page, label) {
  const res = await page.evaluate(() => {
    const de = document.documentElement;
    if (de.scrollWidth <= de.clientWidth + 1) return null;
    const off = [];
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      if (r.right > de.clientWidth + 1 || r.left < -1)
        off.push({ tag: el.tagName.toLowerCase(), cls: String(el.className || "").slice(0, 50), left: Math.round(r.left), right: Math.round(r.right) });
    });
    return { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, off: off.slice(0, 6) };
  });
  if (res) F("BUG", label, `horizontal scroll: ${res.scrollWidth}px in ${res.clientWidth}px. ` +
    res.off.map((o) => `${o.tag}.${o.cls}[${o.left}→${o.right}]`).join("; "));
}

async function zoomFocusCheck(page, label) {
  const small = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll("input, select, textarea").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs < 16) out.push({ sel: el.id || el.className || el.tagName, fs });
    });
    return out;
  });
  small.forEach((s) => F("BUG", label, `iOS zoom-on-focus: ${s.sel} is ${s.fs}px (<16px)`));
}

async function contrastCheck(page, label) {
  const samples = await page.evaluate(() => {
    const sels = ["p", "li", "h1", "h2", "h3", "a", "button", "dt", "dd", "span.record", "figcaption",
      ".reviewed", ".q-eyebrow", ".foot-note", ".tri-num", ".q-help", ".chip",
      // Marigold & Neem: the status dot-and-word, the claim lines, the ranked
      // numeral and the panels that replaced the coloured left-edge stripes.
      ".urg", ".statement p", ".statement b", ".card-rank", ".card-verdict", ".card-verdict b",
      ".route-truth", ".route-truth b", ".btn-primary", ".opt-box",
      ".country-chip", ".tier", ".stale-bar", ".stale-bar-btn", ".install-btn", ".install-note",
      ".install-steps", ".result-count", ".card-org", ".doc-lede",
      // The scroll atlas: its region tag, fact tiles and pick line. The tag
      // switches to the accent only on the active step, so the sweep runs
      // with one step active and the rest idle to see both.
      ".atlas-intro", ".atlas-tag", ".atlas-copy", ".atlas-facts dt",
      ".atlas-facts dd", ".atlas-pick", ".atlas-pick b", ".atlas-go",
      // Ooh (October 2026): the paper bubble, its gold name plate and "Next",
      // the "What do you want?" chips, and the survey's live line. Each sets
      // its own text-on-background pair, so each is listed.
      ".ooh-say", ".ooh-name", ".ooh-next", ".want-chip", ".q-live", ".q-live b", ".bubble-toast"];
    const out = [], seen = new Set();
    sels.forEach((sel) => document.querySelectorAll(sel).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) return;
      if (!el.textContent.trim()) return;
      const cs = getComputedStyle(el);
      let bgEl = el, bg = "rgba(0, 0, 0, 0)";
      while (bgEl) {
        const b = getComputedStyle(bgEl).backgroundColor;
        if (b && !/rgba?\([^)]*,\s*0\)$/.test(b) && b !== "transparent") { bg = b; break; }
        bgEl = bgEl.parentElement;
      }
      const key = cs.color + "|" + bg + "|" + cs.fontSize + "|" + cs.fontWeight;
      if (seen.has(key)) return;
      seen.add(key);
      out.push({ sel, color: cs.color, bg, fs: parseFloat(cs.fontSize), fw: cs.fontWeight, text: el.textContent.trim().slice(0, 40) });
    }));
    return out;
  });
  samples.forEach((s) => {
    const fg = parseColor(s.color), bgc = parseColor(s.bg);
    if (!fg || !bgc) return;
    const ratio = contrast(over(fg, bgc), bgc);
    const large = s.fs >= 24 || (s.fs >= 18.66 && Number(s.fw) >= 700);
    const need = large ? 3.0 : 4.5;
    if (ratio < need) F(ratio < need - 0.7 ? "BUG" : "WARN", label,
      `contrast ${ratio.toFixed(2)}:1 (needs ${need}) — <${s.sel}> ${s.fs}px "${s.text}" fg=${s.color} bg=${s.bg}`);
  });
}

/* WCAG 1.4.11: the edge of a field you type into must reach 3:1 against what
   surrounds it, or a reader cannot see where to tap. The Design plugin's
   accessibility-review checklist named this, and no check here measured it:
   the search box, the sort menu and the survey's free-text box were all drawn
   in the hairline --line at 1.3 to 1.6:1, in both themes. */
async function fieldEdgeCheck(page, label) {
  const fields = await page.evaluate(() => [...document.querySelectorAll("input:not([type=hidden]), select, textarea")]
    .filter((el) => { const r = el.getBoundingClientRect(); return r.width > 4 && r.height > 4; })
    .map((el) => {
      const cs = getComputedStyle(el);
      let p = el.parentElement, bg = "rgba(0, 0, 0, 0)";
      while (p) { const b = getComputedStyle(p).backgroundColor; if (b && !/rgba?\([^)]*,\s*0\)$/.test(b) && b !== "transparent") { bg = b; break; } p = p.parentElement; }
      return { id: el.id || el.className || el.tagName, border: cs.borderTopColor, width: parseFloat(cs.borderTopWidth), bg };
    }));
  fields.forEach((f) => {
    const fg = parseColor(f.border), bgc = parseColor(f.bg);
    if (!fg || !bgc || !f.width) return;
    const ratio = contrast(over(fg, bgc), bgc);
    if (ratio < 3) F("BUG", label, `field edge ${ratio.toFixed(2)}:1 (needs 3:1, WCAG 1.4.11): ${f.id} border=${f.border} on ${f.bg}`);
  });
}

async function revealCheck(page, label) {
  const stranded = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll(".reveal").forEach((el) => {
      const cs = getComputedStyle(el), r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0 && parseFloat(cs.opacity) < 0.9)
        out.push({ cls: String(el.className).slice(0, 50), op: cs.opacity });
    });
    return out;
  });
  stranded.forEach((s) => F("BUG", label, `reveal stranded at opacity ${s.op}: ${s.cls}`));
}

async function tapTargetCheck(page, label) {
  const small = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll("button, a[href], summary, select, input[type=search]").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      if (getComputedStyle(el).display === "none") return;
      if (el.closest(".foot-note") || (el.tagName === "A" && el.closest("p"))) return;
      if (r.height >= 40 && r.width >= 40) return;
      // getBoundingClientRect is the VISUAL box and cannot see the ::after that
      // takes the topbar controls to 44px. Probe what receives the tap.
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2, e = 21;
      const hit = (dx, dy) => { const t = document.elementFromPoint(cx + dx, cy + dy); return t && (t === el || el.contains(t)); };
      if (hit(0, -e) && hit(0, e) && hit(-e, 0) && hit(e, 0)) return;
      out.push({ sel: el.id || String(el.className).slice(0, 40) || el.tagName, w: Math.round(r.width), h: Math.round(r.height) });
    });
    return out;
  });
  small.forEach((s) => F("WARN", label, `tap target ${s.sel} probes smaller than 44px (${s.w}x${s.h})`));
}

// The wordmark is the one element whose width is set by a script face, and
// a cascade-order bug let it run under the theme button at 320px for months
// while the rule meant to prevent it sat in the file looking correct.
async function wordmarkCheck(page, label) {
  const r = await page.evaluate(() => {
    const t = document.querySelector(".brand-text"), c = document.querySelector(".topbar-controls");
    if (!t || !c) return null;
    const range = document.createRange(); range.selectNodeContents(t);
    return { text: range.getBoundingClientRect().right, controls: c.getBoundingClientRect().left };
  });
  if (r && r.text > r.controls - 4) F("BUG", label, `wordmark ends at ${Math.round(r.text)}px, over the controls at ${Math.round(r.controls)}px`);
}

// Scroll the first atlas step into the band the observer watches, so the
// sweep sees an active step next to idle ones.
async function atlasActivate(page) {
  await page.evaluate(() => {
    const s = document.querySelector(".atlas-step");
    if (s) s.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(350);
  return page.evaluate(() => !!document.querySelector(".atlas-step.is-active"));
}

async function goto(page, view) {
  const sel = `#topnav .navlink[data-goto="${view}"]`;
  const visible = await page.locator(sel).isVisible().catch(() => false);
  if (!visible) await page.click("#navToggle").catch(() => {});
  await page.click(sel);
  await page.waitForTimeout(320);
}

(async () => {
  const browser = await launch();

  for (const theme of ["light", "dark"]) {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        reducedMotion: "reduce", deviceScaleFactor: 2
      });
      // Space is the default whatever the system scheme says, so the theme is
      // chosen the way a reader chooses it: the stored toggle value. Emulating
      // colorScheme would test the space theme twice and daylight never.
      // dc-sound-told stops the one-time "galaxy is playing" bubble covering
      // the controls this sweep probes.
      await ctx.addInitScript((t) => { try {
        localStorage.setItem("dc-tour-seen", "1");
        sessionStorage.setItem("dc-intro", "1");   // the opening has played this visit
        localStorage.setItem("dc-theme", t);
        localStorage.setItem("dc-sound-told", "1");
      } catch (e) {} }, theme);
      const page = await ctx.newPage();
      const label = `${vp.name}/${theme}`;
      page.on("console", (m) => { if (m.type() === "error") F("BUG", label, "console error: " + m.text().slice(0, 180)); });
      page.on("pageerror", (e) => F("BUG", label, "page error: " + String(e).slice(0, 180)));

      await page.goto(URL, { waitUntil: "load" });
      // The install offer only appears once the browser says it can install,
      // which never happens headlessly — fire it so the control is measured.
      await page.evaluate(() => {
        const e = new Event("beforeinstallprompt");
        e.prompt = function () {};
        e.userChoice = Promise.resolve({ outcome: "dismissed", platform: "web" });
        window.dispatchEvent(e);
      });
      await page.waitForTimeout(450);

      await scrollWidthCheck(page, label + " intro");
      await zoomFocusCheck(page, label + " intro");
      await revealCheck(page, label + " intro");
      await wordmarkCheck(page, label);
      if (vp.name === "390-iPhone") {
        await tapTargetCheck(page, label + " intro");
        if (!(await atlasActivate(page))) F("BUG", label, "no atlas step became active when scrolled into view");
        await contrastCheck(page, label + " intro+atlas");
        await tapTargetCheck(page, label + " atlas");
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(200);
        const cta = await page.locator("#startBtn").boundingBox();
        F("INFO", label, `primary CTA top edge at y=${Math.round(cta.y)} (viewport ${vp.height}px)`);
        const counts = await page.evaluate(() => ({
          hero: (document.querySelector("#heroCount") || {}).textContent,
          stat: (document.querySelector("#statTotal") || {}).textContent
        }));
        F("INFO", label, `heroCount=${counts.hero} statTotal=${counts.stat}`);
      }

      await goto(page, "browse");
      await scrollWidthCheck(page, label + " browse");
      if (vp.name === "390-iPhone") { await contrastCheck(page, label + " browse"); await fieldEdgeCheck(page, label + " browse"); }
      if (vp.name === "390-iPhone" && theme === "light") {
        const n = await page.locator("#browseCards .card").count();
        F("INFO", label, `browse renders ${n} cards`);
        await page.locator("#browseCards .star-btn").first().click();
        await page.waitForTimeout(200);
        const sc = await page.locator("#shortlistCount").textContent();
        F("INFO", label, `shortlist count after star: "${sc.trim()}"`);
        const lbl = await page.locator("#browseCards .star-btn").first().getAttribute("aria-label");
        if (!lbl) F("BUG", label, "star button has no aria-label");
      }

      for (const v of ["routes", "frontiers", "calendar"]) {
        await goto(page, v);
        await scrollWidthCheck(page, `${label} ${v}`);
      }

      await ctx.close();
    }
  }
  await browser.close();

  const bugs = findings.filter((f) => f.sev === "BUG");
  const warns = findings.filter((f) => f.sev === "WARN");
  const infos = findings.filter((f) => f.sev === "INFO");
  [...bugs, ...warns, ...infos].forEach((f) => console.log(`[${f.sev}] ${f.where}\n      ${f.msg}`));
  // the verdict goes last, so tools/verify.js (which shows the last line) reports it
  console.log(`\n${bugs.length} BUG · ${warns.length} WARN · ${infos.length} INFO  across 6 widths x 2 themes`);
  process.exitCode = bugs.length ? 1 : 0;
})();
