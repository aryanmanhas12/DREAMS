#!/usr/bin/env node
/* Bundles the site into one self-contained HTML file.
   Used for publishing to a host with a strict CSP, and for handing someone a
   single file that works offline with no server. Run: node build.js */

const fs = require("fs");
const path = require("path");

const root = __dirname;
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

const css = fs.readFileSync(path.join(root, "assets/styles.css"), "utf8");

// Preserve load order exactly as index.html declares it.
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
const js = scripts
  .map((src) => "/* ==== " + src + " ==== */\n" + fs.readFileSync(path.join(root, src), "utf8"))
  .join("\n\n");

// Function replacers, not string replacers: a string second argument to
// String.replace() special-cases "$$", "$&", "$`" etc. as pattern tokens,
// which silently corrupts source that legitimately contains "$$" (as ours
// does — the $$ selector helper in app.js).
let out = html
  .replace(/<link rel="stylesheet" href="assets\/styles\.css" \/>/, () => "<style>\n" + css + "\n</style>")
  .replace(/<script src="[^"]+"><\/script>\s*/g, "");

out = out.replace("</body>", () => "<script>\n" + js + "\n</script>\n</body>");

const dest = path.join(root, "dist");
fs.mkdirSync(dest, { recursive: true });
fs.writeFileSync(path.join(dest, "dream-counsellor.html"), out);

const kb = (Buffer.byteLength(out) / 1024).toFixed(0);
console.log("Bundled " + scripts.length + " scripts + stylesheet -> dist/dream-counsellor.html (" + kb + " KB)");
