#!/usr/bin/env node
/* Regenerate everything that is derived from the data, in dependency order.

     node tools/refresh.js

   1. make-pages.js  the eleven category pages, sitemap.xml, and the counts
                     in index.html's share-card tags and llms.txt
   2. make-og.js     the twelve share cards (numbers painted into PNGs)
   3. build.js       the single-file bundle in dist/ (gitignored)

   Run it after ANY data edit. Each of these used to be a separate command
   that had to be remembered, and forgetting make-og is how a card once
   advertised 155 programmes against an index of 207. Stops at the first
   failure and prints that step's full output. */

const { spawnSync } = require("child_process");
const path = require("path");
const ROOT = path.join(__dirname, "..");

const STEPS = [
  ["category pages, sitemap, counts", "tools/make-pages.js"],
  ["share cards", "tools/make-og.js"],
  ["single-file bundle", "build.js"]
];

for (const [label, file] of STEPS) {
  const t = Date.now();
  const r = spawnSync(process.execPath, [file], { cwd: ROOT, encoding: "utf8", timeout: 300000 });
  const out = (r.stdout || "") + (r.stderr || "");
  if (r.status !== 0) {
    console.log(`✗ ${label} (${file}) failed:\n${out}`);
    process.exit(1);
  }
  const last = out.trim().split("\n").filter(Boolean).slice(-1)[0] || "";
  console.log(`✓ ${label.padEnd(32)} ${((Date.now() - t) / 1000).toFixed(1).padStart(5)}s   ${last.trim()}`);
}
console.log("\nNext: node tools/verify.js");
