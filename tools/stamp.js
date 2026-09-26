#!/usr/bin/env node
/* Record that entries were re-read against their official pages.

     node tools/stamp.js chevening gates-cambridge      stamps this month
     node tools/stamp.js --month 2026-09 chevening      stamps a given month

   Writes `checked: "YYYY-MM",` into each entry (after its url line), or
   updates the one already there. tools/recheck.js uses the stamp to put the
   longest-unchecked entries first, so a monthly pass never has to remember
   what the last one covered.

   Only stamp what you actually verified: the window, the money line and the
   eligibility rules against the programme's own page. A stamp on an entry
   nobody read is worse than no stamp, because it moves that entry to the
   bottom of the worklist. The stamp is data only; the page never shows it,
   because the official page, not this index, is the authority on dates.

   Every edit is re-loaded through the real data loader afterwards; if the
   file no longer parses, or the entry did not pick up the stamp, the file is
   restored and the tool exits with an error. */

const fs = require("fs");
const { load, entrySpan } = require("./lib/data");

const args = process.argv.slice(2);
let month = new Date().toISOString().slice(0, 7);
const mi = args.indexOf("--month");
if (mi !== -1) { month = args[mi + 1]; args.splice(mi, 2); }
if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month || "")) { console.error(`--month must be YYYY-MM, got ${month}`); process.exit(1); }
if (month > new Date().toISOString().slice(0, 7)) { console.error(`${month} is in the future`); process.exit(1); }
if (!args.length) { console.error("usage: node tools/stamp.js [--month YYYY-MM] <id> [<id> ...]"); process.exit(1); }

let failed = 0;
for (const id of args) {
  let span;
  try { span = entrySpan(id); } catch (e) { console.error(`  ✗ ${e.message}`); failed++; continue; }
  const { abs, file, lines, start, end, indent } = span;
  const before = lines.join("\n");
  const stampLine = `${indent}checked: "${month}",`;

  let done = false;
  for (let i = start; i < end; i++) {
    if (/^\s*checked:\s*"[^"]*",?\s*$/.test(lines[i])) { lines[i] = stampLine; done = true; break; }
  }
  if (!done) {
    let after = start;
    for (let i = start; i < end; i++) if (new RegExp(`^${indent}url:`).test(lines[i])) { after = i; break; }
    // a url line can wrap; step past any continuation lines that do not open a new key
    while (after + 1 < end && !new RegExp(`^${indent}[A-Za-z_]+:`).test(lines[after + 1]) && !/^\s*\}/.test(lines[after + 1])) after++;
    lines.splice(after + 1, 0, stampLine);
  }

  fs.writeFileSync(abs, lines.join("\n"));
  let ok = false;
  try { ok = load().all.some((x) => x.id === id && x.checked === month); } catch (e) {}
  if (!ok) {
    fs.writeFileSync(abs, before);
    console.error(`  ✗ ${id}: the edit did not load cleanly, so ${file} was restored`);
    failed++;
    continue;
  }
  console.log(`  ✓ ${id.padEnd(28)} checked ${month}   ${file}`);
}
process.exitCode = failed ? 1 : 0;
