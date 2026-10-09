#!/usr/bin/env node
/* The recheck worklist: what needs a human this month, and nothing else.

     node tools/recheck.js                   this month's worklist
     node tools/recheck.js --all             no limits on any list
     node tools/recheck.js --md worklist.md  also write it as a checklist
     node tools/recheck.js --month 2026-11   what a reader will see in November
     node tools/recheck.js --sweep file      use a sweep file instead of the branch

   It reads the latest sweep of official pages (made on GitHub by
   .github/workflows/recheck.yml, see tools/sweep.js) and compares each page
   with what it said when the entry was last verified (tools/snapshots.json).
   A page that has not moved needs no work, so the list is only:

     LINKS       the official URL is dead (404 or 410)
     CHANGED     the page's dates, money or eligibility lines moved: the diff
                 is printed, so most can be judged without opening the page
     ACT NOW     tier 1-2, badge open or opening soon, and not verified
                 recently or a closing date earlier this month has passed
     STALE       every date the window names has already passed
     NO CALL     marked noOpenCall: has a call reopened?
     OLDEST      not verified for six months, highest tier first

   Fix with tools/set.js, then tools/stamp.js the entries you verified. Stamped
   entries (this month or last) and entries whose page is unchanged since they
   were verified drop out, so a second run shows only what is left. */

const fs = require("fs");
const path = require("path");
const { load, urgencyFor, tierOf, locate, ROOT } = require("./lib/data");
const { latestSweep, loadSnapshots, makeState } = require("./lib/sweep");

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

/* ── the sweep ── */
const sweep = args.includes("--no-sweep") ? null : latestSweep(opt("--sweep"));
const sweepAge = sweep ? Math.round((when - Date.parse(sweep.when)) / 864e5) : null;
const fresh = sweep && sweepAge <= 45;
const snaps = loadSnapshots();
const pageState = makeState(fresh ? sweep : null, snaps);
const st = (i) => pageState(i).state;
const unchangedVerified = (i) => st(i) === "same" && !!(snaps[i.id] || {}).verified;
const done = (i) => (!!i.checked && i.checked >= lastMonth) || unchangedVerified(i);

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

/* A day earlier in THIS month, with or without a year, is the one yearless
   date that can be judged, and it is the failure the month-level badge cannot
   see: Chevening and Knight-Hennessy closed on 6 October 2026 and both still
   read "open now" for the rest of October, because October was in their
   deadlineMonths. Such an entry is listed under ACT NOW even when it was
   stamped this month, since the stamp may predate the deadline. */
function passedThisMonth(i) {
  const re = new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+${MRE}\\b(?:\\.?,?\\s+(\\d{4}))?|\\b${MRE}\\.?\\s+(\\d{1,2})(?:st|nd|rd|th)?\\b(?:,?\\s+(\\d{4}))?`, "gi");
  for (const m of String(i.window || "").matchAll(re)) {
    const day = +(m[1] || m[5]), month = mon(m[2] || m[4]), year = m[3] || m[6];
    if (month !== when.getMonth() || (year && +year !== when.getFullYear()) || day >= when.getDate()) continue;
    // Only a closing date counts: "closes 6 October" yes, "between 1 October and 16 November" no.
    const before = String(i.window).slice(Math.max(0, m.index - 28), m.index);
    if (/\b(between|from|opened|opens|open on|starting|started|runs)\s+$/i.test(before)) continue;
    if (/\b(close[sd]?|closing|deadline|due|until|by|ends?|last date|before)\b[^.;·]*$/i.test(before)) return m[0].trim();
  }
  return null;
}

/* ── the lists ── */
const byTierThenAge = (a, b) => tier(a) - tier(b) || String(a.checked || "").localeCompare(String(b.checked || "")) || a.id.localeCompare(b.id);
const listed = new Set();
const pick = (arr) => arr.filter((i) => !listed.has(i.id)).map((i) => (listed.add(i.id), i));
const LIMIT = showAll ? 0 : 15;

const dead = pick(items.filter((i) => st(i) === "dead").sort(byTierThenAge));
const changed = pick(items.filter((i) => st(i) === "changed").sort(byTierThenAge));
const actNowAll = items.filter((i) => tier(i) <= 2 && ["open", "soon"].includes(urgency(i)));
const actNow = pick(actNowAll.filter((i) => !done(i) || (urgency(i) === "open" && passedThisMonth(i)))
  .sort((a, b) => (urgency(a) === "open" ? 0 : 1) - (urgency(b) === "open" ? 0 : 1) || byTierThenAge(a, b)));
const staleAll = items.filter((i) => !i.noOpenCall && staleReason(i));
const stale = pick(staleAll.filter((i) => !done(i)).sort(byTierThenAge));
const noCallAll = items.filter((i) => i.noOpenCall);
const noCall = pick(noCallAll.filter((i) => !done(i)).sort(byTierThenAge));
const oldAll = items.filter((i) => !i.checked || i.checked <= sixAgo);
const old = pick(oldAll.filter((i) => !done(i)).sort(byTierThenAge));

/* ── print ── */
const LABEL = { open: "open now", soon: "opens soon", closed: "next cycle", always: "rolling", none: "no call" };
const PAGE = { dead: "LINK DEAD", unreadable: "page unreadable", changed: "PAGE CHANGED", same: "page unchanged", new: "page not yet baselined", none: "" };
const meta = DB.meta || {};
const lines = [];
const say = (s = "") => lines.push(s);
const cut = (s, n) => (s.length > n ? s.slice(0, n - 1) + "…" : s);
const pageNote = (i) => {
  const p = pageState(i);
  if (p.state === "dead") return `${p.page.status} at ${p.page.url}`;
  if (p.state === "unreadable") return `page unreadable (${p.page.status || p.page.error || "?"}): check it in a browser`;
  return null;
};
const diffLines = (i, n = 8) => {
  const p = pageState(i);
  if (p.state !== "changed") return [];
  return [...p.diff.removed.map((l) => `- ${cut(l, 150)}`), ...p.diff.added.map((l) => `+ ${cut(l, 150)}`)].slice(0, n);
};
const row = (i, note) => {
  const at = where.get(i.id) || {};
  const ps = st(i);
  say(`  T${tier(i)} ${i.id.padEnd(28)} ${cut(i.name, 46).padEnd(46)} ${LABEL[urgency(i)].padEnd(10)} ${i.checked ? "checked " + i.checked : "never checked"}${ps !== "none" && ps !== "same" ? "  · " + PAGE[ps] : ""}`);
  if (note) say(`       ! ${note}`);
  say(`       ${cut(String(i.window || "-"), 150)}`);
  diffLines(i).forEach((l) => say(`         ${l}`));
  say(`       ${i.url}   ${at.file}:${at.line}`);
};
const section = (title, why, arr, extra) => {
  say("");
  say(`${title} — ${arr.length}${extra ? "  (" + extra + ")" : ""}`);
  say(`  ${why}`);
  if (!arr.length) { say("  nothing here"); return; }
  arr.slice(0, LIMIT || arr.length).forEach((i) => row(i, title.startsWith("STALE") ? staleReason(i)
    : title.startsWith("ACT") && urgency(i) === "open" && passedThisMonth(i)
      ? `"${passedThisMonth(i)}" has already passed this month; if it was the close, drop this month from deadlineMonths`
      : pageNote(i)));
  if (LIMIT && arr.length > LIMIT) say(`  …and ${arr.length - LIMIT} more (--all shows them)`);
};

const count = (s) => items.filter((i) => st(i) === s).length;
say(`Dreams Counsellor recheck for ${thisMonth}   (${items.length} programmes; data-meta says last reviewed ${meta.reviewed || "never"})`);
if (!sweep) say("No sweep found: run `node tools/sweep.js --trigger` (about 4 minutes) so unchanged pages can drop out of this list.");
else if (!fresh) say(`The latest sweep is ${sweepAge} days old, too old to trust: run \`node tools/sweep.js --trigger\` for a fresh one.`);
else say(`Sweep of ${sweep.when.slice(0, 10)}: ${items.length - count("unreadable") - count("none")} pages read · ${items.filter(unchangedVerified).length} unchanged since verified, nothing to do · ${count("changed")} changed · ${count("dead")} dead · ${count("unreadable")} unreadable · ${count("new")} not yet baselined`);

section("LINKS", "The official URL answers 404 or 410. Find the programme's new page and set url= with tools/set.js.", dead);
section("CHANGED", "The page's dates, money or eligibility lines moved since the entry was verified. Read the diff; fix the entry if it matters, then stamp it (or stamp --accept if the change is irrelevant).", changed);
section("ACT NOW", "Tier 1–2, the badge says open or opening soon, and nobody has verified it recently. Read the official page.", actNow, actNowAll.filter(done).length + " done");
section("STALE", "The window describes a round that is over. Rewrite it to the next round, or set nocall=true.", stale, staleAll.filter(done).length + " done");
section("NO CALL", "Marked noOpenCall. If a call has reopened, set real months and nocall=false.", noCall, noCallAll.filter(done).length + " done");
section("OLDEST", `Not verified since ${sixAgo} or never, and the page has not confirmed it. Highest tier first; work down as time allows.`, old);
if (fresh && showAll) {
  const unread = items.filter((i) => st(i) === "unreadable" && !listed.has(i.id));
  say(""); say(`UNREADABLE BY THE SWEEP — ${unread.length}  (bot walls and geo-blocks: these need a browser when they come up)`);
  unread.sort(byTierThenAge).forEach((i) => say(`  T${tier(i)} ${i.id.padEnd(28)} ${i.url}`));
}

const todo = [...dead, ...changed, ...actNow, ...stale, ...noCall];
say("");
say("Fix:     node tools/set.js <id> window=\"…\" months=1,2 [url=… money=… nocall=true] --stamp");
say(`Verified: node tools/stamp.js ${todo.slice(0, 5).map((i) => i.id).join(" ") || "<ids>"}${todo.length > 5 ? " …" : ""}    (irrelevant page change: --accept)`);
say("Then:    node tools/refresh.js && node tools/verify.js && tools/ship.sh");
console.log(lines.join("\n"));

/* ── optional markdown checklist ── */
if (mdPath) {
  const md = [`# Recheck for ${thisMonth}`, "", lines[1] ? lines[1].replace(/`/g, "") : "", "",
    "Tick an item once the entry is fixed or confirmed, then `node tools/stamp.js <id>`.", ""];
  const block = (title, arr) => {
    md.push(`## ${title} (${arr.length})`, "");
    arr.forEach((i) => {
      const at = where.get(i.id) || {};
      const note = title === "Stale" ? ` · **${staleReason(i)}**` : pageNote(i) ? ` · ${pageNote(i)}` : "";
      md.push(`- [ ] **T${tier(i)} · ${i.name}** (\`${i.id}\`), ${LABEL[urgency(i)]}, ${i.checked ? "checked " + i.checked : "never checked"}${note}  `);
      md.push(`  ${String(i.window || "-").replace(/\n/g, " ")}  `);
      const d = diffLines(i, 12);
      if (d.length) md.push("", "  ```diff", ...d.map((l) => "  " + l), "  ```", "");
      md.push(`  [Official page](${i.url}) · \`${at.file}:${at.line}\``);
    });
    md.push("");
  };
  block("Links", dead); block("Changed", changed); block("Act now", actNow); block("Stale", stale); block("No call", noCall); block("Oldest", old);
  fs.writeFileSync(path.resolve(mdPath), md.join("\n"));
  console.log(`\nchecklist written to ${path.relative(ROOT, path.resolve(mdPath)) || mdPath}`);
}
