#!/usr/bin/env node
/* Find an entry and everything needed to edit it.

     node tools/find.js chevening          by id, or any word in id/name/org
     node tools/find.js "max planck"       phrases work
     node tools/find.js pmrf --full        also print the entry's source

   With a sweep available (tools/sweep.js), it also prints what the official
   page says today: its deadline, money and eligibility lines, and how they
   differ from the page as it was when the entry was last verified.

   Prints the file:line to open, the tier and badge a reader sees today, when
   it was last checked, its window and its official page. The data is spread
   over eighteen files, and grepping for a name finds the impact note and the
   skipList mentions as often as the entry itself. */

const { load, urgencyFor, tierOf, locate, entrySpan } = require("./lib/data");
const { latestSweep, loadSnapshots, makeState } = require("./lib/sweep");

const args = process.argv.slice(2);
const full = args.includes("--full");
const q = args.filter((a) => a !== "--full").join(" ").trim().toLowerCase();
if (!q) { console.error('usage: node tools/find.js <id or words> [--full]'); process.exit(1); }

const { DB, all } = load();
const urgency = urgencyFor();
const where = locate();
const sweep = latestSweep();
const pageState = makeState(sweep, loadSnapshots());
const LABEL = { open: "window open now", soon: "opens soon", closed: "next cycle", always: "rolling", none: "no call open" };

const exact = all.filter((i) => i.id === q);
const hits = exact.length ? exact : all.filter((i) =>
  [i.id, i.name, i.org, i.country].filter(Boolean).join(" ").toLowerCase().includes(q));

if (!hits.length) {
  const skip = (DB.skipList || []).filter((s) => (s.name + " " + s.why).toLowerCase().includes(q));
  if (skip.length) {
    console.log(`No entry matches "${q}", but the skipList ("looks open, is not") does:`);
    skip.forEach((s) => console.log(`  · ${s.name}   (assets/data-impact.js)`));
  } else console.log(`Nothing matches "${q}".`);
  process.exit(skip.length ? 0 : 1);
}

for (const i of hits.slice(0, 12)) {
  const at = where.get(i.id) || {};
  const isItem = !!i.url;
  console.log(`\nT${tierOf(DB, i.id)}  ${i.id}  ·  ${i.name}`);
  console.log(`    ${at.file}:${at.line}${i.org ? "   " + i.org : ""}${i.country ? "   " + i.country : ""}`);
  if (isItem) {
    console.log(`    badge today: ${LABEL[urgency(i)] || urgency(i)}${i.noOpenCall ? " (noOpenCall)" : ""}   months: ${JSON.stringify(i.deadlineMonths || [])}   checked: ${i.checked || "never stamped"}`);
    console.log(`    window: ${i.window || "-"}`);
    console.log(`    ${i.url}`);
    const imp = (DB.impact || {})[i.id];
    if (imp) console.log(`    impact: ${imp.odds || ""}${imp.note ? " — " + imp.note.slice(0, 140) + (imp.note.length > 140 ? "…" : "") : ""}`);
    const ps = pageState(i);
    if (ps.page) {
      const tag = { dead: "LINK DEAD", unreadable: "unreadable by the sweep", changed: "CHANGED since verified", same: "unchanged since verified", new: "no baseline yet" }[ps.state];
      console.log(`    page (sweep ${sweep.when.slice(0, 10)}): ${ps.page.status} ${tag}`);
      if (ps.state === "changed") {
        ps.diff.removed.forEach((l) => console.log(`      - ${l.slice(0, 160)}`));
        ps.diff.added.forEach((l) => console.log(`      + ${l.slice(0, 160)}`));
      } else (ps.page.lines || []).slice(0, full ? 40 : 8).forEach((l) => console.log(`      · ${l.slice(0, 160)}`));
    }
  }
  if (full) {
    const s = entrySpan(i.id);
    console.log("    ----");
    console.log(s.lines.slice(s.start, s.end).map((l) => "    " + l).join("\n"));
  }
}
if (hits.length > 12) console.log(`\n…and ${hits.length - 12} more. Narrow the search.`);
