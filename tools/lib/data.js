/* The one data loader every tool shares.

   Loads assets/data-*.js in index.html's ORDER, never alphabetically, into a
   sandboxed `window`, exactly as the browser does. Order matters: several
   files do `window.DB.study = window.DB.study || []` and push, while
   data-study.js assigns `window.DB.study = [...]` outright, so loading
   alphabetically lets that assignment wipe 39 entries. Parsing the script
   tags out of index.html also means a data file that exists on disk but is
   never loaded shows up as a difference between `files` and `onDisk`.

   urgency() is not re-implemented here. It is lifted out of app.js and run
   in a sandbox, so a tool can never disagree with the badge on the page. */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..", "..");
const POOLS = ["study", "funding", "research", "residency", "equity"];

function load(root = ROOT) {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const files = [...html.matchAll(/<script src="assets\/(data-[^"]+\.js)"(?: defer)?><\/script>/g)].map((m) => m[1]);
  const onDisk = fs.readdirSync(path.join(root, "assets")).filter((f) => /^data-.*\.js$/.test(f));
  const sandbox = { window: {}, document: { addEventListener() {} }, console };
  sandbox.window.window = sandbox.window;
  vm.createContext(sandbox);
  for (const f of files) {
    vm.runInContext(fs.readFileSync(path.join(root, "assets", f), "utf8"), sandbox, { filename: f });
  }
  const DB = sandbox.window.DB;
  const items = POOLS.reduce((a, k) => a.concat(DB[k] || []), []);
  const all = items.concat(DB.frontiers || [], DB.specialties || []);
  return { root, html, files, onDisk, DB, items, all, total: all.length };
}

/* app.js's own urgency(), evaluated with the clock set to `when`, so
   `recheck.js --month 11` sees exactly the badges a reader would in November. */
function urgencyFor(when = new Date(), root = ROOT) {
  const src = fs.readFileSync(path.join(root, "assets", "app.js"), "utf8");
  const m = src.match(/function urgency\(item\) \{[\s\S]*?\n  \}/);
  if (!m) throw new Error("could not find urgency() in assets/app.js. Its shape changed; update tools/lib/data.js");
  const fixed = when.getTime();
  const RealDate = Date;
  class FixedDate extends RealDate {
    constructor(...a) { if (a.length) super(...a); else super(fixed); }
    static now() { return fixed; }
  }
  const ctx = vm.createContext({ Date: FixedDate });
  vm.runInContext(m[0], ctx);
  return (item) => ctx.urgency(item);
}

const tierOf = (DB, id) => ((DB.impact || {})[id] || {}).t || 3;

/* Where an entry lives on disk, so every tool can print file:line. */
function locate(root = ROOT) {
  const where = new Map();
  for (const f of fs.readdirSync(path.join(root, "assets")).filter((x) => /^data-.*\.js$/.test(x))) {
    fs.readFileSync(path.join(root, "assets", f), "utf8").split("\n").forEach((line, i) => {
      const m = line.match(/^\s*id:\s*"([^"]+)"/);
      if (m && !where.has(m[1])) where.set(m[1], { file: `assets/${f}`, line: i + 1 });
    });
  }
  return where;
}

/* The exact source lines of one entry: from its `id:` line to the brace that
   closes its object. Every entry in this repo puts `id:` on a line of its
   own, one indent deeper than the braces around it, so the closing brace is
   the first later line that starts with `}` at a shallower indent. Throws if
   that shape is not found, rather than guessing. */
function entrySpan(id, root = ROOT) {
  const at = locate(root).get(id);
  if (!at) throw new Error(`no entry with id "${id}"`);
  const abs = path.join(root, at.file);
  const lines = fs.readFileSync(abs, "utf8").split("\n");
  const start = at.line - 1;
  const indent = lines[start].match(/^\s*/)[0];
  let end = -1;
  for (let i = start + 1; i < lines.length; i++) {
    const ind = lines[i].match(/^\s*/)[0];
    if (ind.length < indent.length && /^\s*\}/.test(lines[i])) { end = i; break; }
  }
  if (end === -1) throw new Error(`could not find the end of "${id}" in ${at.file}`);
  return { file: at.file, abs, lines, start, end, indent };
}

module.exports = { ROOT, POOLS, load, urgencyFor, tierOf, locate, entrySpan };
