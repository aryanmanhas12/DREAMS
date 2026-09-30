#!/usr/bin/env node
/* Run every check this project has, and say plainly what passed.

     node tools/verify.js            everything, about eight minutes
     node tools/verify.js --quick    data, generated files and SEO, a few seconds
     node tools/verify.js atlas tour only the named suites

   The suites, and the failure each one exists because of:

     data      tools/check.js         ids, tiers, taxonomy, counts, atlas regions,
                                      open badges on closed windows, font glyphs
     fresh     (built in)             category pages match what the data renders now
     seo       tools/test/seo.js      metadata, JSON-LD types, sitemap, share cards
     fonts     tools/test/font.js     the subset script face draws every letter
     console   tools/test/console.js  no console error or failed request, 15 pages
     survey    tools/test/survey.js   tour, short and full survey, the bundle
     tour      tools/test/tour.js     the tour card stays visible at every step
     atlas     tools/test/atlas.js    the scroll atlas turns, counts, filters
     pages     tools/test/pages.js    generated pages: scroll, AA contrast, taps
     audit     tools/test/audit.js    the app at 6 widths x 2 themes

   The bundle in dist/ is rebuilt first if any source is newer than it,
   because the survey suite tests the bundle and a stale one tests nothing. */

const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

const SUITES = [
  { name: "data", file: "tools/check.js", quick: true },
  { name: "fresh", fn: freshPages, quick: true },
  { name: "seo", file: "tools/test/seo.js", quick: true },
  { name: "fonts", file: "tools/test/font.js" },
  { name: "console", file: "tools/test/console.js" },
  { name: "survey", file: "tools/test/survey.js", bundle: true },
  { name: "tour", file: "tools/test/tour.js" },
  { name: "atlas", file: "tools/test/atlas.js" },
  { name: "pages", file: "tools/test/pages.js" },
  { name: "sky", file: "tools/test/sky.js" },
  { name: "audit", file: "tools/test/audit.js" }
];

/* The committed category pages must be exactly what make-pages renders from
   the current data; otherwise the crawlable copy lags the app. */
function freshPages() {
  const { render } = require("./make-pages.js");
  const stale = render().filter((p) => {
    const f = path.join(ROOT, p.file);
    return !fs.existsSync(f) || fs.readFileSync(f, "utf8") !== p.html;
  }).map((p) => p.file);
  return stale.length
    ? { ok: false, out: `out of date: ${stale.join(", ")}\nrun node tools/refresh.js` }
    : { ok: true, out: "all 11 category pages match the data" };
}

function bundleFresh() {
  const out = path.join(ROOT, "dist/dream-counsellor.html");
  if (!fs.existsSync(out)) return false;
  const t = fs.statSync(out).mtimeMs;
  const srcs = ["index.html", "build.js", ...fs.readdirSync(path.join(ROOT, "assets"))
    .filter((f) => /\.(js|css)$/.test(f)).map((f) => "assets/" + f)];
  return srcs.every((f) => fs.statSync(path.join(ROOT, f)).mtimeMs <= t);
}

const args = process.argv.slice(2);
const quick = args.includes("--quick");
const named = args.filter((a) => !a.startsWith("--"));
const run = SUITES.filter((s) => (named.length ? named.includes(s.name) : !quick || s.quick));
const unknown = named.filter((n) => !SUITES.some((s) => s.name === n));
if (unknown.length) { console.error(`unknown suite(s): ${unknown.join(", ")}. Known: ${SUITES.map((s) => s.name).join(", ")}`); process.exit(1); }

const t0 = Date.now();
const failed = [];
for (const s of run) {
  if (s.bundle && !bundleFresh()) {
    const b = spawnSync(process.execPath, ["build.js"], { cwd: ROOT, encoding: "utf8" });
    if (b.status !== 0) { console.log(`✗ bundle rebuild failed:\n${b.stdout}${b.stderr}`); failed.push("bundle"); continue; }
    console.log("  (rebuilt dist/ first: a source was newer than the bundle)");
  }
  const t = Date.now();
  let ok, out;
  if (s.fn) ({ ok, out } = s.fn());
  else {
    const r = spawnSync(process.execPath, [s.file], { cwd: ROOT, encoding: "utf8", timeout: 900000 });
    ok = r.status === 0;
    out = (r.stdout || "") + (r.stderr || "");
  }
  const last = out.trim().split("\n").filter(Boolean).slice(-1)[0] || "";
  console.log(`${ok ? "✓" : "✗"} ${s.name.padEnd(8)} ${((Date.now() - t) / 1000).toFixed(0).padStart(4)}s   ${last.trim().slice(0, 110)}`);
  if (!ok) { failed.push(s.name); console.log(out.trim().split("\n").map((l) => "      " + l).join("\n")); }
}

const secs = Math.round((Date.now() - t0) / 1000);
console.log(failed.length
  ? `\n${failed.length} of ${run.length} failed: ${failed.join(", ")}`
  : `\nAll ${run.length} ${run.length === 1 ? "suite passes" : "suites pass"} (${Math.floor(secs / 60)}m${String(secs % 60).padStart(2, "0")}s)${quick ? ". Quick mode: run without --quick before shipping." : ""}`);
process.exitCode = failed.length ? 1 : 0;
