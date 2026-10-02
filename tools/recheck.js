#!/usr/bin/env node
/* The monthly recheck worklist.

     node tools/recheck.js                   this month
     node tools/recheck.js --month 2026-11   what a reader will see in November
     node tools/recheck.js --md worklist.md  also write it as a checklist
     node tools/recheck.js --all             list every stale entry, not the top 15

   Why it is ordered this way. An "open now" badge is the claim a student acts
   on this week, and in September 2026 six of the seven programmes the atlas
   named as open had something wrong with them. So the list starts there and
   works outwards:

     1. ACT NOW       tier 1-2, badge says open or opening within two months
     2. STALE TEXT    every date the window names has already passed
     3. NO CALL OPEN  marked noOpenCall: has a call reopened?
     4. OLDEST        not checked for six months or more, highest tier first

   Entries stamped this month or last (tools/stamp.js) count as done and drop
   out, so running it again mid-pass shows only what is left, and a programme
   verified in September does not come back until November. It reads nothing from
   the network; the verifying is still done by reading each official page. */

const fs = require("fs");
const path = require("path");
const { load, urgencyFor, tierOf, locate, ROOT } = require("./lib/data");

/* ── arguments ── */
const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i === -1 ? null : (args[i + 1] || ""); };
let when = new Date();
if (opt("--month")) {
  const m = opt("--month").match(/^(\d{4})-(\d{2})$/);
  if (!m) { console.error("--month must be YYYY-MM"); process.exit(1); }
  when = new Date(Number(m[1]), Number(m[2]) - 1, 15);
}
const showAll = args.includes("--all");
const mdPath = opt("--md");
const thisMonth = `${when.getFullYear()}-${String(when.getMonth() + 1).padStart(2, "0")}`;
const monthsAgo = (n) => { const d = new Date(when.getFullYear(), when.getMonth() - n, 1); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; };
const sixAgo = monthsAgo(6), lastMonth = monthsAgo(1);
const today = new Date(when.getFullYear(), when.getMonth(), when.getDate());

const { DB, items } = load();
const urgency = urgencyFor(when);
const where = locate();
const tier = (i) => tierOf(DB, i.id);
const done = (i) => !!i.checked && i.checked >= lastMonth;

/* ── dates written in window text ──
   Only dates that carry a year can be judged; "closes 6 October" could be
   any year. A window is stale when it names at least one dated deadline and
   every one of them is behind us, which is exactly how EMERALD looked: a
   2022 call described as if it were the current one. */
const MON = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
const MRE = "(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sept?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)";
const mon = (s) => MON[s.slice(0, 3).toLowerCase()];
function datesIn(text) {
  let t = String(text || "");
  const out = [];
  const take = (re, fn) => { t = t.replace(re, (...m) => { out.push(fn(m)); return " "; }); };
  take(new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+${MRE}\\.?,?\\s+(\\d{4})\\b`, "gi"), (m) => ({ d: new Date(+m[3], mon(m[2]), +m[1]), s: m[0] }));
  take(new RegExp(`\\b${MRE}\\.?\\s+(\\d{1,2})(?:st|nd|rd|th)?,?\\s+(\\d{4})\\b`, "gi"), (m) => ({ d: new Date(+m[3], mon(m[1]), +m[2]), s: m[0] }));
  take(new RegExp(`\\b${MRE}\\.?\\s+(\\d{4})\\b`, "gi"), (m) => ({ d: new Date(+m[2], mon(m[1]) + 1, 0), s: m[0] }));
  return out;
}
function staleReason(i) {
  const ds = datesIn(i.window);
  if (ds.length && ds.every((x) => x.d < today)) {
    const last = ds.reduce((a, b) => (b.d > a.d ? b : a));
    return `every date in the window has passed (latest: ${last.s.trim()})`;
  }
  // "since 2015" describes something still running, so it is not a stale year
  const years = [...String(i.window || "").matchAll(/\b(20\d{2})(?:\s*[-–]\s*(\d{2,4}))?\b/g)]
    .filter((m) => !/\b(since|from|founded in|started in)\s+$/i.test(String(i.window).slice(Math.max(0, m.index - 14), m.index)))
    .map((m) => (m[2] ? Number(m[2].length === 2 ? m[1].slice(0, 2) + m[2] : m[2]) : Number(m[1])));
  if (!ds.length && years.length && Math.max(...years) < when.getFullYear())
    return `mentions no year later than ${Math.max(...years)}`;
  return null;
}

/* ── the four lists ── */
const byTierThenAge = (a, b) => tier(a) - tier(b) || String(a.checked || "").localeCompare(String(b.checked || "")) || a.id.localeCompare(b.id);
const listed = new Set();
const pick = (arr) => arr.filter((i) => !listed.has(i.id)).map((i) => (listed.add(i.id), i));

const actNowAll = items.filter((i) => tier(i) <= 2 && ["open", "soon"].includes(urgency(i)));
const actNow = pick(actNowAll.filter((i) => !done(i))
  .sort((a, b) => (urgency(a) === "open" ? 0 : 1) - (urgency(b) === "open" ? 0 : 1) || byTierThenAge(a, b)));

const staleAll = items.filter((i) => !i.noOpenCall && staleReason(i));
const stale = pick(staleAll.filter((i) => !done(i)).sort(byTierThenAge));

const noCallAll = items.filter((i) => i.noOpenCall);
const noCall = pick(noCallAll.filter((i) => !done(i)).sort(byTierThenAge));

const oldAll = items.filter((i) => !i.checked || i.checked <= sixAgo);
const old = pick(oldAll.filter((i) => !done(i)).sort(byTierThenAge));
const LIMIT = 15;

/* ── print ── */
const LABEL = { open: "open now", soon: "opens soon", closed: "next cycle", always: "rolling", none: "no call" };
const meta = DB.meta || {};
const lines = [];
const say = (s = "") => lines.push(s);
const row = (i, note) => {
  const at = where.get(i.id) || {};
  const w = String(i.window || "-");
  say(`  T${tier(i)} ${i.id.padEnd(30)} ${i.name.slice(0, 52).padEnd(52)} ${LABEL[urgency(i)].padEnd(10)} ${i.checked ? "checked " + i.checked : "never checked"}`);
  if (note) say(`       ! ${note}`);
  say(`       ${w.length > 150 ? w.slice(0, 147) + "…" : w}`);
  say(`       ${i.url}   ${at.file}:${at.line}`);
};
const section = (title, why, arr, doneCount, limit) => {
  say("");
  say(`${title} — ${arr.length} to check${doneCount ? `, ${doneCount} checked since ${lastMonth}` : ""}`);
  say(`  ${why}`);
  if (!arr.length) { say("  nothing left here"); return; }
  arr.slice(0, limit || arr.length).forEach((i) => row(i, title.startsWith("2") ? staleReason(i) : null));
  if (limit && arr.length > limit) say(`  …and ${arr.length - limit} more (run with --all, or --md to get the full list)`);
};

say(`Dreams Counselor recheck for ${thisMonth}   (${items.length} programmes; data-meta says last reviewed ${meta.reviewed || "never"})`);
section("1. ACT NOW", "Tier 1–2 and the badge says open or opening soon. Re-read the date, the money and who may apply.",
  actNow, actNowAll.filter(done).length);
section("2. STALE TEXT", "The window describes a round that is over. Rewrite it to the next round, or set noOpenCall.",
  stale, staleAll.filter(done).length);
section("3. NO CALL OPEN", "Marked noOpenCall. If a call has reopened, remove the flag and give real months.",
  noCall, noCallAll.filter(done).length);
section("4. OLDEST", `Not checked since ${sixAgo} or never. Highest tier first; work down as time allows.`,
  old, oldAll.filter(done).length, showAll ? 0 : LIMIT);

const todo = [...actNow, ...stale, ...noCall];
say("");
say("When an entry is verified (or corrected) against its official page:");
say(`  node tools/stamp.js ${todo.slice(0, 6).map((i) => i.id).join(" ")}${todo.length > 6 ? " …" : ""}`);
say("Then: node tools/refresh.js && node tools/verify.js, and update data-meta.js to say what the pass covered.");
console.log(lines.join("\n"));

/* ── optional markdown checklist ── */
if (mdPath) {
  const md = [`# Recheck for ${thisMonth}`, "", `Generated by \`node tools/recheck.js\`. Tick an item once its official page has been read and the entry fixed, then \`node tools/stamp.js <id>\`.`, ""];
  const block = (title, arr) => {
    md.push(`## ${title} (${arr.length})`, "");
    arr.forEach((i) => {
      const at = where.get(i.id) || {};
      const note = title.startsWith("2") ? ` · **${staleReason(i)}**` : "";
      md.push(`- [ ] **T${tier(i)} · ${i.name}** (\`${i.id}\`), ${LABEL[urgency(i)]}, ${i.checked ? "checked " + i.checked : "never checked"}${note}  `);
      md.push(`  ${String(i.window || "-").replace(/\n/g, " ")}  `);
      md.push(`  [Official page](${i.url}) · \`${at.file}:${at.line}\``);
    });
    md.push("");
  };
  block("1. Act now", actNow); block("2. Stale text", stale); block("3. No call open", noCall); block("4. Oldest", old);
  fs.writeFileSync(path.resolve(mdPath), md.join("\n"));
  console.log(`\nchecklist written to ${path.relative(ROOT, path.resolve(mdPath)) || mdPath}`);
}
