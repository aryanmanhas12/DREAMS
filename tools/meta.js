#!/usr/bin/env node
/* Write the review stamp the page shows ("Entries last checked against their
   official pages in October 2026. …") from the data itself.

     node tools/meta.js                      (tools/refresh.js runs it first)
     node tools/meta.js --note "Chevening closed on 6 October."

   The month and the counts come from the entries' own `checked` stamps and the
   latest sweep, so the stamp can only say what was done: how many programmes
   were re-read on their official pages this month, and how many more were
   found unchanged since they were last verified. Nothing is written in a
   month with no checks, so a quiet month keeps last month's honest stamp.

   --note adds a sentence about what the pass found. It belongs to the month
   it was written in and lapses when the month changes. */

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { load, ROOT } = require("./lib/data");
const { latestSweep, loadSnapshots, makeState } = require("./lib/sweep");

const FILE = path.join(ROOT, "assets", "data-meta.js");
const args = process.argv.slice(2);
const ni = args.indexOf("--note");
const newNote = ni === -1 ? null : (args[ni + 1] || "").trim();

const now = new Date();
const month = now.toISOString().slice(0, 7);
const label = now.toLocaleString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

const old = (() => {
  const sb = { window: {} };
  try { vm.runInNewContext(fs.readFileSync(FILE, "utf8"), sb); } catch (e) { return {}; }
  return (sb.window.DB && sb.window.DB.meta) || {};
})();

const { items } = load();
const read = items.filter((i) => i.checked === month);
const sweep = latestSweep();
const fresh = sweep && sweep.when.slice(0, 7) === month;
const state = makeState(fresh ? sweep : null, loadSnapshots());
const snaps = loadSnapshots();
const unchanged = items.filter((i) => i.checked !== month && state(i).state === "same" && (snaps[i.id] || {}).verified);

if (!read.length && !unchanged.length && newNote === null) {
  console.log(`· nothing verified in ${label} yet; data-meta.js keeps "${old.reviewedLabel || "unstamped"}"`);
  process.exit(0);
}

const note = newNote !== null ? newNote : old.noteMonth === month ? old.note || "" : "";
const rest = items.length - read.length - unchanged.length;
const scope = [
  `In ${label}, ${read.length} of ${items.length} programmes were re-read on their official pages` +
    (unchanged.length ? `, and ${unchanged.length} more were found unchanged since they were last verified.` : "."),
  rest ? `The other ${rest} carry the date of their last check.` : "",
  note
].filter(Boolean).join(" ");

const meta = { reviewed: month, reviewedLabel: label, read: read.length, unchanged: unchanged.length, total: items.length, scope };
if (note) { meta.note = note; meta.noteMonth = month; }

fs.writeFileSync(FILE, `/* Dreams Counsellor — when this index was last checked against the world.

   The standing risk on this whole project is staleness: every deadline and
   amount was right when written and drifts every cycle, and a confidently
   wrong date is worse than none. So the review stamp is data, shown in the
   interface, and it is GENERATED: tools/meta.js (run by tools/refresh.js)
   writes it from the entries' own checked stamps and the latest sweep of
   official pages, so it can never claim more than was done. Do not edit by
   hand; to add a sentence about what a pass found, use
   node tools/meta.js --note "…". */

window.DB = window.DB || {};

window.DB.meta = ${JSON.stringify(meta, null, 2)};
`);
console.log(`✓ data-meta.js: ${label}, ${read.length} re-read, ${unchanged.length} unchanged since verified${note ? ", with a note" : ""}`);
