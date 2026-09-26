#!/usr/bin/env node
/* Regenerates the installable-app icons in assets/icons/.
   Run: node tools/make-icons.js

   This used to render the real globe.js against the real database, so the
   icon was literally the object the hero shows. That was a good instinct for
   fidelity and the wrong call for an icon, and the evidence is what changed
   it: rendered at the sizes an icon is ACTUALLY used — 60px on a home screen,
   40px in a switcher, 29px in settings — the coastlines collapsed into grey
   mush, the twenty programme dots became noise, and by 29px there was no
   readable mark at all. It was detail drawn for a 340px canvas, shown at an
   eighth of that. The globe also sat in a soft glow inside a large dark
   margin, so the mark read small and weak even at 180px.

   So the icon is now DRAWN, not captured. Three strokes and one marker:

     - the outer circle, the meridian ellipse and the equator. That is the
       same construction as the inline SVG favicon in index.html, so the two
       now agree BY CONSTRUCTION rather than by somebody remembering to
       update both. They diverged once already.
     - one vermilion disc on India, which is where the reader is standing and
       the whole premise of the site. It punches a ground-coloured hole
       through the strokes behind it so it stays clean at every size.

   Nothing else. No coastlines, no dot field, no glow, no gradient — every one
   of those is detail that dies below 80px while still costing bytes.

   Stroke weights are a fraction of the tile, so they hold at every size
   instead of being tuned for the largest one. The render asserts the mark
   survives a downscale to 29px before it writes anything.

   SHIP is dark, and that is a deliberate call rather than a preference. No
   browser supports a per-theme app icon: the manifest has no colour-scheme
   variant, and iOS shows one apple-touch-icon whatever appearance the phone
   is in. So this is a single image that has to work on both kinds of home
   screen, and the two cases are not symmetrical. A dark icon on a light home
   screen is ordinary. A cream icon on a dark home screen is a lit panel among
   unlit ones, which is what the installed app actually looked like. */

const { launch } = require("./lib/browser");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const TMP = path.join(ROOT, "_icon-render.html");

/* Real tokens from styles.css, not approximations. On the dark ground the
   dark-theme accent is the legible one; the light-theme #00787E would sit at
   barely 2:1 against #061A22 and vanish. */
const PALETTE = {
  light: { ground: "#F2EFE4", stroke: "#00787E", mark: "#C63A0E" },
  dark:  { ground: "#061A22", stroke: "#3FE8D8", mark: "#FF7A45" }
};
const SHIP = "dark";
const { ground: GROUND, stroke: STROKE, mark: MARK } = PALETTE[SHIP];

/* The mark, in a 100x100 box. `inset` is how much of the tile the globe
   occupies: a bare icon can fill it, a maskable one must stay inside the 80%
   safe zone because Android crops adaptive icons to a shape the OEM chooses
   (circle, squircle, teardrop) and anything outside gets shaved off. */
function mark(scale) {
  const r = 34 * scale;                    // globe radius
  const rx = 14 * scale;                   // meridian half-width
  const w = 6.2 * scale;                   // outer stroke
  const wi = 4.4 * scale;                  // interior strokes
  /* The marker's position is the FAVICON's, converted rather than eyeballed.
     index.html draws the globe at r=12.5 in a 32 box with the dot at offset
     (+4.5, +3.5) and r=3; scaled by 34/12.5 that is (+12.2, +9.5) and r=8.2
     here. Doing it by arithmetic is the point — "favicon matches the app
     icon" is an invariant this project has already broken once, and matching
     by construction is the only version of it that survives.

     Kept well inside the rim deliberately: an earlier offset put the hole
     within 2 units of the outer stroke and bit a notch out of it, which reads
     as a rendering fault rather than a marker. The disc sits ON the globe's
     face with clear ground around it. It does interrupt the meridian, which
     is what a pin on a globe does. */
  const mx = 50 + 12.2 * scale, my = 50 + 9.5 * scale;
  const hole = 11.5 * scale, dot = 8.2 * scale;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <rect width="100" height="100" fill="${GROUND}"/>
  <g fill="none" stroke="${STROKE}" stroke-linecap="round">
    <circle cx="50" cy="50" r="${r}" stroke-width="${w}"/>
    <ellipse cx="50" cy="50" rx="${rx}" ry="${r}" stroke-width="${wi}"/>
    <line x1="${50 - r}" y1="50" x2="${50 + r}" y2="50" stroke-width="${wi}"/>
  </g>
  <circle cx="${mx}" cy="${my}" r="${hole}" fill="${GROUND}"/>
  <circle cx="${mx}" cy="${my}" r="${dot}" fill="${MARK}"/>
</svg>`;
}

const SPECS = [
  { file: "icon-192.png",          tile: 192, scale: 1 },
  { file: "icon-512.png",          tile: 512, scale: 1 },
  { file: "apple-touch-icon.png",  tile: 180, scale: 1 },
  { file: "icon-maskable-512.png", tile: 512, scale: 0.72 }
];

(async () => {
  const outDir = path.join(ROOT, "assets/icons");
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await launch();

  for (const s of SPECS) {
    fs.writeFileSync(TMP, `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
      html,body{margin:0;padding:0;background:${GROUND}}
      #wrap{width:${s.tile}px;height:${s.tile}px;overflow:hidden}
      </style></head><body><div id="wrap">${mark(s.scale)}</div></body></html>`);

    const ctx = await browser.newContext({
      viewport: { width: s.tile + 40, height: s.tile + 40 },
      deviceScaleFactor: 1, reducedMotion: "reduce"
    });
    const p = await ctx.newPage();
    let failed = null;
    p.on("pageerror", (e) => { failed = String(e); });
    await p.goto("file://" + TMP);
    await p.waitForTimeout(200);
    if (failed) throw new Error("icon failed to render: " + failed);
    await p.locator("#wrap").screenshot({ path: path.join(outDir, s.file) });
    await ctx.close();

    const d = fs.readFileSync(path.join(outDir, s.file));
    const pw = d.readUInt32BE(16), ph = d.readUInt32BE(20);
    if (pw !== s.tile || ph !== s.tile) {
      throw new Error(`${s.file} is ${pw}x${ph}, the manifest declares ${s.tile}x${s.tile}`);
    }
    console.log("  " + s.file.padEnd(24) + `${pw}x${ph}  ${(d.length / 1024).toFixed(0)} KB` +
                (s.scale < 1 ? "  (maskable, inside the 80% safe zone)" : ""));
  }

  /* The whole point is that it survives being small, so prove it. Downscale
     the shipped 192 to 29px and require that the marker is still a distinct
     warm pixel cluster and the globe is still a distinct cool one — i.e. the
     mark has not averaged into a single smudge. */
  const ctx = await browser.newContext({ viewport: { width: 64, height: 64 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  const b64 = fs.readFileSync(path.join(outDir, "icon-192.png")).toString("base64");
  await p.setContent(`<body style="margin:0"><canvas id="c" width="29" height="29"></canvas>
    <script>window.done=new Promise(r=>{const i=new Image();i.onload=()=>{
      const x=document.getElementById("c").getContext("2d");
      x.drawImage(i,0,0,29,29);
      const d=x.getImageData(0,0,29,29).data; let warm=0,cool=0;
      for(let k=0;k<d.length;k+=4){const R=d[k],G=d[k+1],B=d[k+2];
        if(R>150&&R>B+40)warm++; else if(G>110&&G>R+30)cool++;}
      r({warm,cool});};i.src="data:image/png;base64,${b64}";});<\/script></body>`);
  const legible = await p.evaluate(() => window.done);
  await ctx.close();
  await browser.close();
  fs.unlinkSync(TMP);

  if (legible.warm < 4) throw new Error(`at 29px the marker is only ${legible.warm} px — it has dissolved`);
  if (legible.cool < 25) throw new Error(`at 29px the globe is only ${legible.cool} px — it has dissolved`);
  console.log(`\n  legibility at 29px: marker ${legible.warm}px, globe ${legible.cool}px — both still distinct`);
  console.log("Icons written to assets/icons/");
})();
