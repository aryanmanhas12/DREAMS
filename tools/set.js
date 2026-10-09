#!/usr/bin/env node
/* Change an entry's dated fields in one line, safely.

     node tools/set.js chevening window="Opens early August 2027" months=8,9
     node tools/set.js khorana nocall=true months=none
     node tools/set.js aga-khan url=https://the.akdn/en/international-scholarships --stamp

   Fields: window, money, duration, url (strings), months (1-12 list, or
   "none" for an empty list) and nocall (true or false). --stamp also runs
   tools/stamp.js for the entry, which records it as verified this month and
   saves its page as the new baseline.

   The edit is made on the entry's own lines, then the data is reloaded
   through the real loader and every field compared with what was asked; if
   anything differs, the file is restored. It refuses the one combination
   that silently says the opposite of what you mean: an empty month list
   without nocall=true reads as "Rolling / always open". Afterwards it prints
   the badge a reader will see today, so a wrong month list shows at once. */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { load, urgencyFor, entrySpan } = require("./lib/data");

const [id, ...rest] = process.argv.slice(2);
const stamp = rest.includes("--stamp");
const pairs = rest.filter((a) => a !== "--stamp");
if (!id || !pairs.length) {
  console.error('usage: node tools/set.js <id> window="…" months=1,2 [money="…"] [duration="…"] [url=…] [nocall=true|false] [--stamp]');
  process.exit(1);
}
const STRINGS = ["window", "money", "duration", "url"];
const want = {};
for (const p of pairs) {
  const m = p.match(/^([a-z]+)=([\s\S]*)$/i);
  if (!m) { console.error(`✗ "${p}" is not field=value`); process.exit(1); }
  const [, k, v] = m;
  if (STRINGS.includes(k)) want[k] = v;
  else if (k === "months") {
    const list = /^(none|\[\])$/i.test(v.trim()) ? [] : v.split(/[,\s]+/).filter(Boolean).map(Number);
    if (list.some((n) => !Number.isInteger(n) || n < 1 || n > 12)) { console.error(`✗ months must be numbers 1-12, got "${v}"`); process.exit(1); }
    want.deadlineMonths = list;
  } else if (k === "nocall") {
    if (!/^(true|false)$/.test(v)) { console.error("✗ nocall must be true or false"); process.exit(1); }
    want.noOpenCall = v === "true";
  } else { console.error(`✗ unknown field "${k}" (use window, money, duration, url, months, nocall)`); process.exit(1); }
}
if (want.url && !/^https:\/\//.test(want.url)) { console.error("✗ url must start with https://"); process.exit(1); }

const before = load().items.find((i) => i.id === id);
if (!before) { console.error(`✗ no programme with id "${id}"`); process.exit(1); }
const nocallAfter = want.noOpenCall !== undefined ? want.noOpenCall : !!before.noOpenCall;
const monthsAfter = want.deadlineMonths || before.deadlineMonths || [];
if (!monthsAfter.length && !nocallAfter) {
  console.error('✗ an empty month list without nocall=true shows as "Rolling / always open". Add nocall=true if the call is closed,');
  console.error("  or give the months a reader can act in.");
  process.exit(1);
}

const span = entrySpan(id);
const { abs, file, lines, start, indent } = span;
let end = span.end;
const original = lines.join("\n");
const findLine = (key) => { for (let i = start; i < end; i++) if (new RegExp(`^${indent}${key}:`).test(lines[i])) return i; return -1; };

function setLine(key, rendered) {
  const at = findLine(key);
  if (at === -1) return false;
  const comma = /,\s*$/.test(lines[at]) ? "," : "";
  if (key !== "deadlineMonths" && key !== "noOpenCall" && !/^\s*[a-zA-Z]+:\s*".*",?\s*$/.test(lines[at])) {
    console.error(`✗ ${key} on ${file}:${at + 1} is not a one-line string; edit it by hand`);
    process.exit(1);
  }
  lines[at] = `${indent}${key}: ${rendered}${comma}`;
  return true;
}

for (const k of STRINGS) if (want[k] !== undefined && !setLine(k, JSON.stringify(want[k]))) { console.error(`✗ ${id} has no ${k} line`); process.exit(1); }
if (want.deadlineMonths && !setLine("deadlineMonths", `[${want.deadlineMonths.join(", ")}]`)) { console.error(`✗ ${id} has no deadlineMonths line`); process.exit(1); }
if (want.noOpenCall !== undefined) {
  const at = findLine("noOpenCall");
  if (want.noOpenCall && at === -1) {
    const after = findLine("deadlineMonths");
    lines.splice((after === -1 ? findLine("window") : after) + 1, 0, `${indent}noOpenCall: true,`);
    end++;
  } else if (!want.noOpenCall && at !== -1) { lines.splice(at, 1); end--; }
}

fs.writeFileSync(abs, lines.join("\n"));
let after;
try { after = load().items.find((i) => i.id === id); } catch (e) { after = null; }
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const ok = after && STRINGS.every((k) => want[k] === undefined || after[k] === want[k]) &&
  (!want.deadlineMonths || same(after.deadlineMonths, want.deadlineMonths)) &&
  (want.noOpenCall === undefined || !!after.noOpenCall === want.noOpenCall);
if (!ok) {
  fs.writeFileSync(abs, original);
  console.error(`✗ the edit did not load cleanly, so ${file} was restored`);
  process.exit(1);
}

const LABEL = { open: "open now", soon: "opens soon", closed: "next cycle", always: "rolling / always open", none: "no call open" };
const badge = LABEL[urgencyFor()(after)];
console.log(`✓ ${id}   ${path.relative(process.cwd(), abs)}`);
for (const k of [...STRINGS, "deadlineMonths", "noOpenCall"]) {
  if (!(k in want)) continue;
  const b = JSON.stringify(before[k] === undefined ? (k === "noOpenCall" ? false : null) : before[k]);
  console.log(`    ${k}: ${b.length > 110 ? b.slice(0, 109) + "…" : b}\n      → ${JSON.stringify(after[k] === undefined ? false : after[k])}`);
}
console.log(`    badge a reader sees today: ${badge}`);
if (stamp) {
  const r = spawnSync(process.execPath, [path.join(__dirname, "stamp.js"), id], { encoding: "utf8" });
  process.stdout.write(r.stdout || ""); process.stderr.write(r.stderr || "");
  process.exitCode = r.status;
}
