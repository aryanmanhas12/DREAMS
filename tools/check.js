/* Dream Counsellor — data integrity check.   Run: node tools/check.js

   Asserts: unique ids, impact keys resolve, taxonomy tags valid, https urls,
   every counted country plottable, profiled and inside one scroll-atlas
   region, no "open" badge on a window that says closed, well-formed
   `checked` stamps, the <head> social-card counts match the data, sw.js
   precaches every script, the share card PNG is neither stale nor the wrong
   size, and the subset script font still covers the strings it renders.

   This used to live in a scratchpad and was lost and rebuilt several times.
   It lives here now, beside the generators, and the deploy strips tools/. */

const fs = require("fs");
const path = require("path");
const { load } = require("./lib/data");

const ROOT = process.argv[2] || path.join(__dirname, "..");
const L = load(ROOT);
const htmlSrc = L.html;
const DATA_FILES = L.files;
L.onDisk.forEach((f) => { if (!DATA_FILES.includes(f)) console.log(`  ⚠ ${f} exists on disk but index.html never loads it`); });

const DB = L.DB;
const errs = [], warns = [];
const E = (m) => errs.push(m);
const W = (m) => warns.push(m);

const POOLS = ["study", "funding", "research", "residency", "equity"];
const items = POOLS.reduce((a, k) => a.concat(DB[k] || []), []);

const appSrc = fs.readFileSync(path.join(ROOT, "assets", "app.js"), "utf8");
function literalKeys(name) {
  const m = appSrc.match(new RegExp("const " + name + "\\s*=\\s*\\{([\\s\\S]*?)\\n  \\};"));
  if (!m) throw new Error("could not parse " + name + " from app.js");
  return m[1].match(/^\s*([A-Za-z_][\w]*)\s*:/gm).map((s) => s.trim().replace(/:$/, ""));
}
const FIELDS = literalKeys("FIELDS");
const STAGES = literalKeys("STAGE_LABEL");
const REGIONS = JSON.parse(appSrc.match(/const REGIONS = (\[[^\]]*\])/)[1].replace(/'/g, '"'));

/* ── 1. unique ids ── */
const seen = new Map();
const all = items.concat(DB.frontiers || [], DB.specialties || []);
for (const it of all) {
  if (!it.id) { E(`entry with no id: ${it.name || "?"}`); continue; }
  if (seen.has(it.id)) E(`duplicate id "${it.id}" (${seen.get(it.id)} and ${it.name})`);
  seen.set(it.id, it.name);
}

/* ── 2. required fields ── */
for (const it of items) {
  for (const k of ["name", "org", "country", "url", "why"]) if (!it[k]) E(`${it.id}: missing "${k}"`);
  if (!it.fields || !it.fields.length) E(`${it.id}: no fields[]`);
  if (!it.stages || !it.stages.length) E(`${it.id}: no stages[]`);
  (it.fields || []).forEach((f) => { if (!FIELDS.includes(f)) E(`${it.id}: unknown field tag "${f}"`); });
  (it.stages || []).forEach((s) => { if (!STAGES.includes(s)) E(`${it.id}: unknown stage tag "${s}"`); });
  if (it.url && !/^https:\/\//.test(it.url)) E(`${it.id}: url is not https — ${it.url}`);
  (it.deadlineMonths || []).forEach((m) => {
    if (!Number.isInteger(m) || m < 1 || m > 12) E(`${it.id}: bad deadlineMonth ${m}`);
  });
  if (it.deadlineMonths && !it.window) W(`${it.id}: deadlineMonths but no window text`);
  if (!it.steps || !it.steps.length) W(`${it.id}: no steps[]`);
  if (it.money == null) W(`${it.id}: no money line`);
}

/* ── 3. impact keys resolve, tiers exist ── */
const ids = new Set(all.map((i) => i.id));
Object.keys(DB.impact || {}).forEach((k) => { if (!ids.has(k)) E(`data-impact key "${k}" matches no programme`); });
items.forEach((it) => { if (!DB.impact[it.id]) W(`${it.id}: no impact tier — defaults to 3`); });
Object.entries(DB.impact || {}).forEach(([k, v]) => {
  if (!DB.tierInfo[v.t]) E(`impact "${k}": tier ${v.t} has no tierInfo`);
});

/* ── 4. countries: counted ⇒ plottable and profiled ── */
const counted = new Set(items.map((i) => i.country).filter((c) => c && !REGIONS.includes(c)));
const globeSrc = fs.readFileSync(path.join(ROOT, "assets", "globe.js"), "utf8");
const coordBlock = globeSrc.match(/COORDS\s*=\s*\{([\s\S]*?)\n  \};/);
if (!coordBlock) E("could not parse COORDS out of globe.js — country check did not run");
const plotted = new Set(
  [...(coordBlock ? coordBlock[1] : "").matchAll(/^\s*(?:"([^"]+)"|([A-Za-z]\w*))\s*:\s*\[/gm)].map((m) => m[1] || m[2])
);
for (const c of counted) {
  if (!plotted.has(c)) E(`country "${c}" is counted in the stat tile but has no globe coordinate`);
  if (!(DB.countries || {})[c]) W(`country "${c}" has no profile in data-countries.js`);
}

/* ── 4b. every country value belongs to exactly one atlas region ──
   The scroll atlas counts routes per region from ATLAS in app.js. A country
   no region names drops out of the atlas without any error on screen, which
   is how the one South Africa entry went unreachable from it. */
{
  const at = appSrc.indexOf("const ATLAS");
  if (at === -1) E("could not find ATLAS in app.js — the atlas coverage check did not run");
  else {
    const blk = appSrc.slice(at, appSrc.indexOf("\n  };", at));
    const owners = {};
    for (const m of blk.matchAll(/^\s*(\w+):\s*\{[\s\S]*?countries:\s*\[([^\]]*)\]/gm)) {
      for (const c of m[2].matchAll(/"([^"]+)"/g)) (owners[c[1]] = owners[c[1]] || []).push(m[1]);
    }
    if (!Object.keys(owners).length) E("could not parse any ATLAS region country lists — the atlas coverage check did not run");
    const seen = new Set(items.map((i) => i.country).filter(Boolean));
    for (const c of seen) {
      if (!owners[c]) E(`country "${c}" is in no ATLAS region in app.js, so the scroll atlas cannot reach it`);
      else if (owners[c].length > 1) E(`country "${c}" is in several ATLAS regions (${owners[c].join(", ")}), so the atlas double-counts it`);
    }
  }
}

/* ── 4c. an "open" badge must not sit on a window that says closed ──
   Maitri said no round had been published and L'Oréal/AAUW said "has
   closed", both under a "Window open now" badge, because the prose and
   deadlineMonths were edited separately. This catches the plain cases. */
{
  const month = new Date().getMonth() + 1;
  const CLOSED = /\b(has closed|have closed|is closed|currently closed|now closed|not (?:yet )?been published|had not been published|no (?:round|call) (?:is )?(?:open|published))\b/i;
  for (const i of items) {
    const dm = i.deadlineMonths || [];
    if (i.noOpenCall || dm.length >= 12 || !dm.includes(month)) continue;
    const w = String(i.window || "");
    const hit = w.match(CLOSED);
    if (!hit) continue;
    // "X has closed; the next round runs ..." is fine when the next round is
    // what the open months describe, so only flag when nothing in the text
    // points forward to a round that is open now.
    if (/\b(open until|opens? \d|runs? (?:to|until)|closes? \d|deadline \d|open now)\b/i.test(w.slice(hit.index + hit[0].length))) continue;
    E(`"${i.id}" is marked open this month but its window says "${hit[0]}" — set noOpenCall or fix deadlineMonths`);
  }
}

/* ── 4d. `checked` stamps: "YYYY-MM", never in the future ──
   Written by tools/stamp.js when an entry has been re-read against its
   official page. A stamp from the future would hide the entry from
   tools/recheck.js, which is the one thing a stamp must never do. */
{
  const now = new Date().toISOString().slice(0, 7);
  for (const i of all) {
    if (i.checked == null) continue;
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(i.checked)) E(`"${i.id}": checked must be "YYYY-MM", got ${JSON.stringify(i.checked)}`);
    else if (i.checked > now) E(`"${i.id}": checked "${i.checked}" is in the future`);
  }
}

/* ── 5. counts ── */
const total = items.length + (DB.frontiers || []).length + (DB.specialties || []).length;
const free = items.filter((i) => i.zeroCost).length;
const nCountries = counted.size;

/* The <head> social-card counts CANNOT render from data: link scrapers read
   raw HTML and never run the script. So they are typed by hand, which means
   they have to be asserted or the share card advertises last month's number. */
[...htmlSrc.matchAll(/<meta[^>]+(?:og:description|twitter:description)[^>]+content="([^"]*)"/g)].forEach((m) => {
  const claimed = m[1].match(/\b(\d{2,4})\s+(?:real|funded)\s+programmes/);
  if (!claimed) return E("a social-card description no longer states a programme count — the sync check cannot see it");
  if (Number(claimed[1]) !== total) E(`social card says ${claimed[1]} programmes, data has ${total} — run node tools/make-pages.js, which writes them`);
});

{
  const llms = fs.readFileSync(path.join(ROOT, "llms.txt"), "utf8").match(/index of (\d+) funded programmes/);
  if (!llms) E("llms.txt no longer states the programme count in the shape tools/make-pages.js writes");
  else if (Number(llms[1]) !== total) E(`llms.txt says ${llms[1]} programmes, data has ${total} — run node tools/make-pages.js, which writes it`);
}

/* ── 5b. app.js must not spell counts out in words ── */
const WORDNUM = { ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15,
                  sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20 };
const N_SPEC = DB.specialties.length, N_FRONT = DB.frontiers.length, N_Q = 16, N_CORE = 3;
const COUNTED = {
  "specialty route": [N_SPEC], "specialty routes": [N_SPEC],
  "route map": [N_SPEC], "route maps": [N_SPEC],
  "frontier field": [N_FRONT], "frontier fields": [N_FRONT],
  question: [N_Q, N_CORE, N_Q - N_CORE], questions: [N_Q, N_CORE, N_Q - N_CORE]
};
const NOUNS = "specialty routes?|route maps?|frontier fields?|questions?";
appSrc.split("\n").forEach((line, i) => {
  Object.keys(WORDNUM).forEach((w) => {
    const m = line.match(new RegExp(`\\b${w}\\s+([a-z ]{0,18}?(${NOUNS}))\\b`, "i"));
    if (!m) return;
    const noun = m[2].toLowerCase();
    const ok = COUNTED[noun] || COUNTED[noun.replace(/s$/, "")];
    if (ok && !ok.includes(WORDNUM[w]))
      E(`app.js:${i + 1} says "${w} ${noun}" but valid counts are ${ok.join(" or ")}`);
  });
});

/* ── 5c. sw.js precache must cover every script index.html loads ── */
const swPath = path.join(ROOT, "sw.js");
if (fs.existsSync(swPath)) {
  const swSrc = fs.readFileSync(swPath, "utf8");
  const shellMatch = swSrc.match(/const SHELL = \[([\s\S]*?)\];/);
  if (!shellMatch) E("sw.js: could not parse the SHELL precache array");
  else {
    const shell = new Set([...shellMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]));
    [...htmlSrc.matchAll(/<script src="(assets\/[^"]+\.js)"(?: defer)?><\/script>/g)].map((m) => m[1])
      .forEach((f) => { if (!shell.has(f)) E(`sw.js precache is missing ${f} — installed users get a broken page offline`); });
    if (!shell.has("assets/styles.css")) E("sw.js precache is missing assets/styles.css");
    shell.forEach((f) => {
      if (f === "./" || f === "manifest.webmanifest") return;
      if (!fs.existsSync(path.join(ROOT, f))) E(`sw.js precaches ${f}, which does not exist on disk`);
    });
  }
}

/* ── 5d. the share card is a PNG with a number baked into it, invisible to
   every text check. It advertised 155 while the index held 207, for months. ── */
const ogPath = path.join(ROOT, "assets/og-image.png");
if (fs.existsSync(ogPath)) {
  const ogTime = fs.statSync(ogPath).mtimeMs;
  const newer = DATA_FILES.filter((f) => fs.statSync(path.join(ROOT, "assets", f)).mtimeMs > ogTime);
  if (newer.length)
    W(`assets/og-image.png predates ${newer.length} data file(s) (${newer.slice(0, 3).join(", ")}${newer.length > 3 ? ", …" : ""}) — the count baked into the share card may be stale. Re-run: node tools/refresh.js`);
  const d = fs.readFileSync(ogPath);
  const ow = d.readUInt32BE(16), oh = d.readUInt32BE(20);
  const declared = [...htmlSrc.matchAll(/og:image:(width|height)"[^>]*content="(\d+)"/g)]
    .reduce((a, m) => (a[m[1]] = Number(m[2]), a), {});
  if (declared.width && (declared.width !== ow || declared.height !== oh))
    E(`og-image.png is ${ow}x${oh} but the meta tags declare ${declared.width}x${declared.height}`);
}

/* ── 5e. the script face is SUBSET to the three strings it renders, so
   rewording one of them without re-running tools/make-fonts.js ships a
   wordmark with a letter missing. A font is a binary: no text check sees
   inside it, and the failure is silent until a reader looks at the topbar.
   Read the cmap and confirm every character is really there. ── */
const scriptFont = path.join(ROOT, "assets/fonts/petit-formal-script.woff2");
if (fs.existsSync(scriptFont)) {
  const appSrc = fs.readFileSync(path.join(ROOT, "assets/app.js"), "utf8");
  const grab = (src, re) => { const m = src.match(re); return m ? m[1] : null; };
  const strings = [
    grab(htmlSrc, /<span class="brand-text"[^>]*>[^<]*<em>([^<]+)<\/em>/),
    grab(htmlSrc, /<p class="foot-sign">([^<]+)<\/p>/),
    grab(appSrc, /<p class="salutation">([^<]+)<\/p>/)
  ];
  if (strings.some((s) => s === null)) {
    E("check.js can no longer find all three script-face strings in source — the markup changed shape. Update these regexes AND tools/make-fonts.js, which reads the same three.");
  } else {
    try {
      const out = require("child_process").execFileSync("python3", ["-c", `
from fontTools.ttLib import TTFont
f = TTFont(${JSON.stringify(scriptFont)})
cps = set()
for t in f["cmap"].tables: cps |= set(t.cmap.keys())
need = set(ord(c) for s in ${JSON.stringify(strings)} for c in s)
print("".join(sorted(chr(c) for c in need - cps)))
`]).toString().trim();
      if (out) E(`petit-formal-script.woff2 has no glyph for ${JSON.stringify(out)} — a string set in --font-script was edited without re-running: node tools/make-fonts.js`);
    } catch (e) {
      W("could not read the script font's cmap (fonttools missing?) — glyph coverage unverified: pip install fonttools brotli");
    }
  }
}

/* ── 5b. DESIGN.md matches the stylesheet ──
   DESIGN.md is the design source of truth an agent reads before visual work.
   A token that changes in styles.css and not there (or the reverse) is how
   the two drift apart, so every colour in its front matter is compared, in
   both directions, with the three token blocks it names. */
{
  const designPath = path.join(ROOT, "DESIGN.md");
  if (!fs.existsSync(designPath)) E("DESIGN.md is missing: it is the design source of truth (see CLAUDE.md)");
  else {
    const md = fs.readFileSync(designPath, "utf8");
    const css = fs.readFileSync(path.join(ROOT, "assets/styles.css"), "utf8");
    const front = md.split(/^---$/m)[1] || "";
    const section = (name) => {
      const m = front.match(new RegExp("^  " + name + ":[^\\n]*\\n((?:    .*\\n)+)", "m"));
      const out = {};
      if (m) for (const l of m[1].split("\n")) { const t = l.match(/"(--[a-z0-9-]+)":\s*"([^"]+)"/); if (t) out[t[1]] = t[2]; }
      return out;
    };
    const cssBlock = (sel) => {
      const i = css.indexOf(sel);
      if (i < 0) return null;
      const out = {};
      for (const t of css.slice(i, css.indexOf("}", i)).matchAll(/(--[a-z0-9-]+):\s*(#[0-9A-Fa-f]{6}|rgba\([^)]*\))/g)) out[t[1]] = t[2];
      return out;
    };
    const norm = (v) => v.replace(/\s+/g, "").toLowerCase();
    const compare = (label, want, sel) => {
      const have = cssBlock(sel);
      if (!have) { E(`styles.css has no ${sel} block to compare DESIGN.md's ${label} colours with`); return; }
      for (const k of Object.keys(want)) {
        if (!(k in have)) E(`DESIGN.md ${label} lists ${k}, which ${sel} in styles.css does not define`);
        else if (norm(have[k]) !== norm(want[k])) E(`DESIGN.md ${label} says ${k} is ${want[k]}; ${sel} in styles.css says ${have[k]}`);
      }
      for (const k of Object.keys(have)) if (!(k in want)) E(`${sel} in styles.css defines ${k}, which DESIGN.md ${label} does not list`);
    };
    const space = section("space"), daylight = section("daylight");
    if (!Object.keys(space).length || !Object.keys(daylight).length) E("DESIGN.md front matter has no colors.space / colors.daylight tokens to check");
    else {
      compare("space", space, ":root {");
      compare("space", space, ':root[data-theme="dark"] {');
      compare("daylight", daylight, ':root[data-theme="light"] {');
    }
  }
}

/* ── 6. something open every month ── */
const byMonth = Array.from({ length: 13 }, () => 0);
items.forEach((i) => (i.deadlineMonths || []).forEach((m) => byMonth[m]++));
for (let m = 1; m <= 12; m++) if (byMonth[m] === 0) W(`no programme has a deadline in month ${m}`);

console.log(`files: ${DATA_FILES.length}   opportunities: ${items.length}   frontiers: ${(DB.frontiers || []).length}   specialties: ${(DB.specialties || []).length}   total: ${total}`);
console.log(`countries counted: ${nCountries}   zero-cost: ${free}   impact keys: ${Object.keys(DB.impact || {}).length}`);
console.log("");
if (warns.length) { console.log(`— ${warns.length} warning(s) —`); warns.forEach((w) => console.log("  ⚠ " + w)); console.log(""); }
if (errs.length) { console.log(`— ${errs.length} ERROR(s) —`); errs.forEach((e) => console.log("  ✗ " + e)); process.exitCode = 1; }
else console.log("✓ no errors");
