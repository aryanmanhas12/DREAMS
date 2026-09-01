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
// index.html loads the stylesheet as preload + media="print" swap (a
// non-blocking-CSS technique — see the comment above the link in index.html)
// with a <noscript> fallback for a JS-disabled browser. All three exist only
// to fetch assets/styles.css over the network; in the bundle there is no
// assets/ directory beside the file and the CSP blocks the request anyway,
// so the whole three-tag block collapses to one inline <style>. Matched as
// one block, not tag-by-tag — matching only the plain <link> (as a single-tag
// regex would, since it is now the only one of the three with no extra
// attributes) inlines the CSS into a <noscript> that never applies with JS
// on, and leaves the other two pointing at a path that no longer exists.
const STYLE_BLOCK = /<link rel="preload" href="assets\/styles\.css"[^>]*\/>\s*<link rel="stylesheet" href="assets\/styles\.css" media="print"[^>]*\/>\s*<noscript><link rel="stylesheet" href="assets\/styles\.css" \/><\/noscript>/;
if (!STYLE_BLOCK.test(html)) {
  throw new Error("build.js: the preload/print-swap/noscript stylesheet block in index.html did not match — index.html's <head> markup changed shape, update this regex to match it.");
}
// The single-file bundle has no manifest.webmanifest or sw.js beside it, and
// runs under a CSP that blocks the fetch anyway. Dropping the manifest link
// also switches off service-worker registration: app.js treats the presence
// of that link as the signal that there is a worker to register.
const MANIFEST_BLOCK = /<link rel="manifest"[^>]*\/>\s*<link rel="apple-touch-icon"[^>]*\/>\s*<meta name="apple-mobile-web-app-title"[^>]*\/>\s*<meta name="mobile-web-app-capable"[^>]*\/>/;
if (!MANIFEST_BLOCK.test(html)) {
  throw new Error("build.js: the manifest/apple-touch-icon block in index.html did not match — update this regex, or the bundle will ship a dead manifest link and try to register a service worker that is not there.");
}

let out = html
  .replace(STYLE_BLOCK, () => "<style>\n" + css + "\n</style>")
  .replace(MANIFEST_BLOCK, () => "")
  .replace(/<script src="[^"]+"><\/script>\s*/g, "");

out = out.replace("</body>", () => "<script>\n" + js + "\n</script>\n</body>");

const dest = path.join(root, "dist");
fs.mkdirSync(dest, { recursive: true });
fs.writeFileSync(path.join(dest, "dream-counsellor.html"), out);

const kb = (Buffer.byteLength(out) / 1024).toFixed(0);
console.log("Bundled " + scripts.length + " scripts + stylesheet + " + fontsInlined +
            " fonts -> dist/dream-counsellor.html (" + kb + " KB)");
