#!/usr/bin/env node
/* Subsets Petit Formal Script to the characters it actually renders.
   Run: node tools/make-fonts.js     (needs python3 with fonttools + brotli)

   Why only this one face. The other four render arbitrary entry text — 220
   programmes, every country name, every money line — so subsetting them to
   "characters currently used" would mean a single new entry containing a
   glyph nobody anticipated falls back to a system serif MID-SENTENCE. That is
   a visible defect appearing weeks after the change that caused it, which is
   the worst shape a bug can have here. They are already Latin-subset at
   ~230 codepoints and they stay that way.

   Petit Formal Script is the opposite case. It is the counsellor's voice and
   renders exactly three fixed strings — the wordmark, the salutation on your
   read, and the closing line — and it was shipping 215 codepoints and 221
   glyphs to do it, on the critical path, in the topbar.

   The three strings are READ FROM SOURCE rather than typed here, so editing
   the footer line and re-running this produces the right subset. If a regex
   below stops matching, this throws rather than quietly building a subset
   that is missing a string — same discipline as build.js's STYLE_BLOCK. And
   check.js asserts the shipped file covers all three strings, so forgetting
   to re-run this fails loudly instead of shipping a broken wordmark. */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "assets/fonts/petit-formal-script.woff2");
const FULL = path.join(__dirname, "fonts/petit-formal-script.full.woff2");

const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const app = fs.readFileSync(path.join(ROOT, "assets/app.js"), "utf8");

function pluck(label, src, re) {
  const m = src.match(re);
  if (!m) {
    throw new Error(
      `tools/make-fonts.js: could not find the ${label} in source. The markup or ` +
      `the string changed shape — update this regex. Building a subset without ` +
      `it would ship a wordmark with missing letters.`);
  }
  return m[1];
}

/* Every string set in var(--font-script). The selectors are .brand-text em,
   .foot-sign and .read .salutation; these are their contents. */
const STRINGS = [
  pluck("wordmark", html, /<span class="brand-text"[^>]*>[^<]*<em>([^<]+)<\/em>/),
  pluck("closing line", html, /<p class="foot-sign">([^<]+)<\/p>/),
  pluck("salutation", app, /<p class="salutation">([^<]+)<\/p>/)
];

/* The used set, plus a small deliberate margin: both cases of every letter
   that appears, so a minor rewording survives without a rebuild, and the
   punctuation these sentences could plausibly grow. The margin is cheap —
   it is a handful of glyphs, not a character class. */
const used = new Set();
for (const s of STRINGS) for (const ch of s) used.add(ch);
for (const ch of [...used]) { used.add(ch.toUpperCase()); used.add(ch.toLowerCase()); }
for (const ch of " .,'’!?—–-:;") used.add(ch);

const text = [...used].sort().join("");

if (!fs.existsSync(FULL)) fs.copyFileSync(SRC, FULL);   // keep the original once

const before = fs.statSync(FULL).size;
execFileSync("python3", ["-c", `
import sys
from fontTools import subset
from fontTools.ttLib import TTFont
opts = subset.Options()
opts.flavor = "woff2"
opts.layout_features = ["*"]          # keep ligatures; a script face needs them
opts.notdef_outline = True
opts.desubroutinize = True
font = subset.load_font(${JSON.stringify(FULL)}, opts)
subsetter = subset.Subsetter(options=opts)
subsetter.populate(text=${JSON.stringify(text)})
subsetter.subset(font)
subset.save_font(font, ${JSON.stringify(SRC)}, opts)
`], { stdio: ["ignore", "inherit", "inherit"] });

const after = fs.statSync(SRC).size;

/* Prove it: reopen the written file and confirm every character of every
   string has a real glyph. A subsetter that silently dropped one would
   otherwise be discovered by a reader looking at a broken wordmark. */
const missing = execFileSync("python3", ["-c", `
from fontTools.ttLib import TTFont
f = TTFont(${JSON.stringify(SRC)})
cps = set()
for t in f["cmap"].tables: cps |= set(t.cmap.keys())
need = set(ord(c) for s in ${JSON.stringify(STRINGS)} for c in s)
print("".join(sorted(chr(c) for c in need - cps)))
`]).toString().trim();

if (missing) throw new Error(`subset is missing glyphs for: ${JSON.stringify(missing)}`);

console.log("  strings kept:");
for (const s of STRINGS) console.log(`    "${s}"`);
console.log(`\n  petit-formal-script.woff2  ${(before / 1024).toFixed(1)} KB -> ${(after / 1024).toFixed(1)} KB` +
            `  (${Math.round((1 - after / before) * 100)}% smaller, ${used.size} codepoints)`);
console.log("  original preserved at tools/fonts/petit-formal-script.full.woff2 (build input, not served)");
