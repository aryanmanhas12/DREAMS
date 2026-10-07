/* Dreams Counsellor — SEO, structured-data and crawlability audit.
   Covers the checklist in the brief, for a site that is static HTML with no
   bundler, no dependencies and no server.

   One rule learned while writing it: a naive substring search over the JSON-LD
   reported six pages as carrying a fabricated `Course` type. Every one was the
   word inside a programme NAME ("EMBL & EMBO Courses, Workshops and
   Fellowships"). Walk the object and collect actual @type VALUES; never grep
   the serialised blob. That is the eighth false failure of this project's
   favourite kind. */

const fs = require("fs");
const path = require("path");

const ROOT = process.argv[2] || path.join(__dirname, "..", "..");
const BASE = "https://aryanmanhas12.github.io/DREAMS";

/* Types that would be a lie on this site: it sells nothing, teaches nothing
   directly, hosts no events and has no reviews. */
const FORBIDDEN = new Set(["AggregateRating", "Review", "Offer", "Product", "Course", "Event", "Recipe", "JobPosting"]);

let fails = 0, warns = 0;
const ok = (c, m, d) => { if (!c) fails++; console.log(`  ${c ? "✓" : "✗"} ${m}${d ? "  — " + d : ""}`); };
const warn = (m) => { warns++; console.log(`  ⚠ ${m}`); };

const pages = ["index.html", "privacy.html", "terms.html", "404.html"]
  .concat(fs.readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(ROOT, d.name, "index.html")))
    .filter((d) => !["dist", "assets", "tools", ".git", ".github"].includes(d.name))
    .map((d) => d.name + "/index.html"));

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const one = (h, re) => { const m = h.match(re); return m ? m[1] : null; };

console.log("── per-page metadata ──");
const titles = new Map(), descs = new Map(), h1s = new Map();
for (const f of pages) {
  const h = read(f);
  const title = one(h, /<title>([^<]*)<\/title>/);
  const desc = one(h, /<meta name="description" content="([^"]*)"/);
  const canon = one(h, /<link rel="canonical" href="([^"]*)"/);
  const robots = one(h, /<meta name="robots" content="([^"]*)"/);
  const h1count = (h.match(/<h1[\s>]/g) || []).length;
  const is404 = f === "404.html";

  const problems = [];
  if (!title) problems.push("no <title>");
  if (!desc && !is404) problems.push("no meta description");
  if (!canon && !is404) problems.push("no canonical");
  if (!robots) problems.push("no robots directive");
  if (h1count !== 1) problems.push(`${h1count} <h1> (must be exactly 1)`);
  if (title && titles.has(title)) problems.push(`duplicate title, shared with ${titles.get(title)}`);
  if (desc && descs.has(desc)) problems.push(`duplicate description, shared with ${descs.get(desc)}`);
  if (title) titles.set(title, f);
  if (desc) descs.set(desc, f);

  // canonical must be self-referential and absolute
  if (canon && !canon.startsWith(BASE)) problems.push(`canonical is not on the site origin: ${canon}`);
  if (is404 && robots && !/noindex/.test(robots)) problems.push("404 should be noindex");

  ok(problems.length === 0, f, problems.join("; ") || `"${(title || "").slice(0, 52)}"`);

  // heading order must not skip a level
  const levels = [...h.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  let prev = 0, skipped = null;
  for (const L of levels) { if (prev && L > prev + 1) { skipped = `h${prev} → h${L}`; break; } prev = L; }
  if (skipped) warn(`${f}: heading level skipped (${skipped})`);
}

console.log("\n── structured data ──");
for (const f of pages) {
  const h = read(f);
  const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!blocks.length) continue;
  for (const b of blocks) {
    let d;
    try { d = JSON.parse(b[1]); }
    catch (e) { ok(false, `${f}: JSON-LD parses`, e.message); continue; }

    const types = new Set();
    (function walk(o) {
      if (Array.isArray(o)) return o.forEach(walk);
      if (o && typeof o === "object") {
        if (typeof o["@type"] === "string") types.add(o["@type"]);
        Object.values(o).forEach(walk);
      }
    })(d);

    const bad = [...types].filter((t) => FORBIDDEN.has(t));
    ok(bad.length === 0, `${f}: no fabricated schema types`, bad.length ? bad.join(", ") : [...types].join(", "));

    // a declared count must match what the page actually renders
    const cp = (d["@graph"] || []).find((g) => g["@type"] === "CollectionPage");
    if (cp) {
      const claimed = cp.mainEntity.numberOfItems;
      const real = (h.match(/<article class="listing"/g) || []).length;
      ok(claimed === real, `${f}: ItemList count matches the page`, `${claimed} declared, ${real} rendered`);
    }
    // breadcrumb trail must match the real URL
    const bc = (d["@graph"] || []).find((g) => g["@type"] === "BreadcrumbList");
    if (bc) {
      const last = bc.itemListElement[bc.itemListElement.length - 1].item;
      const expect = `${BASE}/${path.dirname(f)}/`;
      ok(last === expect, `${f}: breadcrumb matches the URL`, last === expect ? last : `${last} ≠ ${expect}`);
    }
  }
}

console.log("\n── crawlability of the actual content ──");
{
  const h = read("index.html");
  const body = h.slice(h.indexOf("<body"));
  const txt = body.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const probes = ["Chevening", "ICMR", "Fulbright", "Amgen", "UNICEF"];
  const onHome = probes.filter((p) => txt.includes(p));
  console.log(`  homepage raw text: ${txt.split(" ").length} words, ${onHome.length}/${probes.length} probe programmes present (client-rendered, expected)`);

  let found = 0, total = 0;
  for (const p of probes) {
    total++;
    const hit = pages.some((f) => f !== "index.html" && read(f).includes(p));
    if (hit) found++;
  }
  ok(found === total, "every probe programme appears in crawlable HTML somewhere", `${found}/${total}`);
}

console.log("\n── site files ──");
for (const f of ["robots.txt", "sitemap.xml", "llms.txt", "404.html", "manifest.webmanifest"]) {
  ok(fs.existsSync(path.join(ROOT, f)), `${f} exists`);
}
{
  const sm = read("sitemap.xml");
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  ok(new Set(locs).size === locs.length, "sitemap has no duplicate URLs", `${locs.length} URLs`);
  // every sitemap URL must resolve to a real file, and be canonical
  const missing = locs.filter((u) => {
    const rel = u.replace(BASE, "").replace(/^\//, "") || "index.html";
    const p = rel.endsWith("/") ? rel + "index.html" : rel;
    return !fs.existsSync(path.join(ROOT, p));
  });
  ok(missing.length === 0, "every sitemap URL resolves to a real file", missing.join(", ") || `${locs.length} checked`);

  // and every generated page must be IN the sitemap
  const gen = pages.filter((f) => f.endsWith("/index.html")).map((f) => `${BASE}/${path.dirname(f)}/`);
  const absent = gen.filter((u) => !locs.includes(u));
  ok(absent.length === 0, "every generated page is listed in the sitemap", absent.join(", ") || `${gen.length} pages`);

  const rb = read("robots.txt");
  ok(rb.includes("Sitemap:"), "robots.txt points at the sitemap");
  const blocked = gen.filter((u) => {
    const p = u.replace(BASE, "");
    return [...rb.matchAll(/^Disallow:\s*(\S+)/gm)].some((m) => m[1] !== "/" && p.startsWith(m[1]));
  });
  ok(blocked.length === 0, "robots.txt does not block any content page", blocked.join(", ") || "none blocked");
}

console.log("\n── internal linking ──");
{
  const home = read("index.html");
  const gen = pages.filter((f) => f.endsWith("/index.html")).map((f) => path.dirname(f));
  const unlinked = gen.filter((s) => !home.includes(`href="${s}/"`));
  ok(unlinked.length === 0, "homepage links to every generated page", unlinked.join(", ") || `${gen.length} linked`);

  const vague = [];
  for (const f of pages) {
    for (const m of read(f).matchAll(/<a [^>]*>([^<]{1,24})<\/a>/g)) {
      const t = m[1].trim().toLowerCase();
      if (["click here", "here", "link", "read more", "more"].includes(t)) vague.push(`${f}: "${m[1].trim()}"`);
    }
  }
  ok(vague.length === 0, "no vague anchor text", vague.slice(0, 4).join("; ") || "none found");
}

console.log("\n── images and assets ──");
{
  let imgs = 0, noAlt = 0, noDim = 0;
  for (const f of pages) {
    for (const m of read(f).matchAll(/<img\b[^>]*>/g)) {
      imgs++;
      if (!/\balt=/.test(m[0])) noAlt++;
      if (!/\bwidth=/.test(m[0]) || !/\bheight=/.test(m[0])) noDim++;
    }
  }
  ok(noAlt === 0, "every <img> has an alt attribute", `${imgs} images, ${noAlt} missing alt`);
  ok(noDim === 0, "every <img> declares width and height", `${noDim} missing dimensions`);
  if (imgs === 0) console.log("    (the globe is a <canvas> with role=img and an aria-label; og-image is a meta reference)");

  /* Every page's share card must EXIST and be the size it declares. A card is
     the first impression far more often than the page is, and a number baked
     into a PNG is invisible to every text check — which is how this project
     once shipped one advertising 155 programmes against an index of 207.
     Now that each category has its own card, a missing file would silently
     serve a blank preview to every share of that page. */
  let cards = 0, shared = new Map();
  for (const f of pages) {
    const h = read(f);
    const src = one(h, /<meta property="og:image" content="([^"]*)"/);
    if (!src) { if (f !== "404.html") ok(false, `${f}: declares an og:image`); continue; }
    const rel = src.replace(BASE + "/", "");
    const p = path.join(ROOT, rel);
    if (!fs.existsSync(p)) { ok(false, `${f}: og:image file exists`, rel); continue; }
    const d = fs.readFileSync(p);
    const w = d.readUInt32BE(16), hh = d.readUInt32BE(20);
    const dw = one(h, /og:image:width" content="(\d+)"/), dh = one(h, /og:image:height" content="(\d+)"/);
    if (String(w) !== dw || String(hh) !== dh) {
      ok(false, `${f}: card size matches its declaration`, `${w}x${hh}, declared ${dw}x${dh}`);
      continue;
    }
    cards++;
    shared.set(rel, (shared.get(rel) || 0) + 1);
    // alt text must not be the generic one on a page that has its own card
    const alt = one(h, /og:image:alt" content="([^"]*)"/);
    if (!alt) ok(false, `${f}: og:image:alt is set`);
  }
  ok(true, "every declared share card exists and matches its declared size", `${cards} cards`);
  const reused = [...shared.entries()].filter(([, n]) => n > 1);
  ok(reused.length <= 1, "category pages do not all share one generic card",
     reused.length ? reused.map(([k, n]) => `${k} x${n}`).join(", ") : "each page has its own");
}

console.log("\n── production hygiene ──");
{
  const js = ["assets/app.js", "assets/globe.js"].map(read).join("\n");
  const secrets = js.match(/(api[_-]?key|secret|bearer|password)\s*[:=]\s*["'][A-Za-z0-9_\-]{12,}/gi) || [];
  ok(secrets.length === 0, "no secrets in client JavaScript", secrets.length ? "FOUND" : "none");
  const logs = (js.match(/console\.log\(/g) || []).length;
  ok(logs === 0, "no console.log left in shipped JavaScript", `${logs} found`);
  const maps = fs.readdirSync(path.join(ROOT, "assets")).filter((f) => f.endsWith(".map"));
  ok(maps.length === 0, "no source maps shipped", maps.join(", ") || "none");
  const ext = [...read("index.html").matchAll(/<script src="(https?:[^"]+)"/g)];
  ok(ext.length === 0, "no third-party scripts", `${ext.length} found`);
}

console.log(fails ? `\n${fails} FAILURE(S), ${warns} warning(s)` : `\nSEO audit passes${warns ? `, ${warns} warning(s)` : ""}`);
process.exitCode = fails ? 1 : 0;
