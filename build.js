#!/usr/bin/env node
/* Bundles the site into one self-contained HTML file.
   Used for publishing to a host with a strict CSP, and for handing someone a
   single file that works offline with no server. Run: node build.js */

const fs = require("fs");
const path = require("path");

const root = __dirname;
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

let css = fs.readFileSync(path.join(root, "assets/styles.css"), "utf8");

// Inline the self-hosted fonts. The published artifact runs under a CSP that
// blocks every external request, and a bundle handed to someone as a single
// file has no assets/ directory beside it — so url("fonts/x.woff2") has to
// become a data URI or the page silently falls back to system serif.
let fontsInlined = 0;
css = css.replace(/url\("fonts\/([^"]+)"\)/g, function (whole, file) {
  const p = path.join(root, "assets/fonts", file);
  if (!fs.existsSync(p)) {
    console.warn("  ! missing font, left as a URL: " + file);
    return whole;
  }
  fontsInlined++;
  return 'url("data:font/woff2;base64,' + fs.readFileSync(p).toString("base64") + '")';
});

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
console.log("Bundled " + scripts.length + " scripts + stylesheet + " + fontsInlined +
            " fonts -> dist/dream-counsellor.html (" + kb + " KB)");
