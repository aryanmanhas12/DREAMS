#!/usr/bin/env node
/* Regenerates the installable-app icons in assets/icons/.
   Run: node tools/make-icons.js

   The icon is the site's own globe, rendered by the real globe.js against the
   real database — not a redrawing of it. That means the dots are the actual
   programme counts and India carries the vermilion home ring, so the icon is
   the same object the hero shows. Re-run this whenever the palette changes:
   globe.js reads its colours from CSS custom properties, and the values below
   are a copy of the light-theme tokens in styles.css. If those two drift, the
   icon quietly stops matching the site.

   Two shapes are produced, and the difference matters:
   - "any": the globe fills the tile, for platforms that show the icon as-is.
   - "maskable": the globe is scaled to ~62% so it sits inside the 80% safe
     zone. Android crops adaptive icons to a shape the OEM chooses (circle,
     squircle, teardrop). A maskable icon that ignores the safe zone gets its
     edges shaved off on exactly the devices this is aimed at. */

const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const TMP = path.join(ROOT, "_icon-render.html");

// Light-theme tokens, mirrored from styles.css. globe.js reads these off :root.
const TOKENS = `--accent:#00787E;--paper:#F2EFE4;--paper-2:#FBF8F0;--surface:#FFFEF9;
  --line:#D8CFBC;--line-soft:#E8E1D2;--ink:#131E2C;--ink-2:#46566E;--ink-3:#5E6B7B;
  --signal:#C63A0E;--accent-2:#005C63`;

// Data files in index.html's order, so the counts match the live globe.
const DATA = [...fs.readFileSync(path.join(ROOT, "index.html"), "utf8")
  .matchAll(/<script src="(assets\/data-[^"]+\.js)"><\/script>/g)].map((m) => m[1]);

function page(tile, globePx) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  html,body{margin:0;padding:0}
  :root{${TOKENS}}
  #wrap{width:${tile}px;height:${tile}px;background:#F2EFE4;display:grid;place-items:center}
  #globeCanvas{width:${globePx}px;height:${globePx}px;display:block}
  </style></head><body><div id="wrap"><canvas id="globeCanvas"></canvas></div>
  ${DATA.map((s) => `<script src="${s}"><\/script>`).join("\n")}
  <script src="assets/globe.js"><\/script>
  <script>window.initGlobe(document.getElementById("globeCanvas"), null, function(){});<\/script>
  </body></html>`;
}

const SPECS = [
  { file: "icon-192.png",          tile: 192, scale: 1.06 },
  { file: "icon-512.png",          tile: 512, scale: 1.06 },
  { file: "apple-touch-icon.png",  tile: 180, scale: 1.06 },
  { file: "icon-maskable-512.png", tile: 512, scale: 0.62 }
];

(async () => {
  const outDir = path.join(ROOT, "assets/icons");
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
  for (const s of SPECS) {
    fs.writeFileSync(TMP, page(s.tile, Math.round(s.tile * s.scale)));
    // reducedMotion freezes the auto-rotation, so every run produces the same
    // frame: centred on India, which is where globe.js opens.
    // deviceScaleFactor stays at 1 so the PNG comes out at exactly the size
    // its filename claims. At 2 the 512 icon was a 1024px, 629KB file — four
    // times the bytes for an asset that ships with every install, and a
    // manifest whose declared "512x512" did not match the actual image.
    // globe.js caps its own backing store at 2x internally, so the render is
    // still sharp at 1.
    const ctx = await browser.newContext({
      viewport: { width: s.tile + 40, height: s.tile + 40 },
      deviceScaleFactor: 1, reducedMotion: "reduce"
    });
    const p = await ctx.newPage();
    let failed = null;
    p.on("pageerror", (e) => { failed = String(e); });
    await p.goto("file://" + TMP);
    await p.waitForTimeout(1200);
    if (failed) throw new Error("globe failed to render: " + failed);
    // Assert against the size actually asked for, not a magic constant: a
    // fixed ">300" threshold silently encoded the old 2x scale factor and
    // failed every small icon the moment that changed.
    const w = await p.evaluate(() => document.getElementById("globeCanvas").width);
    if (w < s.tile * 0.5) throw new Error("canvas never sized (" + w + "px) — initGlobe did not run for " + s.file);
    await p.locator("#wrap").screenshot({ path: path.join(outDir, s.file) });
    await ctx.close();
    console.log("  " + s.file.padEnd(24) + s.tile + "px" + (s.scale < 1 ? "  (maskable, safe zone)" : ""));
  }
  await browser.close();
  fs.unlinkSync(TMP);
  console.log("Icons written to assets/icons/");
})();
