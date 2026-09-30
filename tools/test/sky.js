/* The sky must never break the contrast of the text that sits on it.

   Every other contrast check in this project reads COMPUTED CSS backgrounds,
   and to them the page ground is a flat --paper. But the Milky Way, the
   nebula and the stars are painted on canvases behind the text, and a canvas
   is invisible to getComputedStyle. The first draft of the Milky Way put a
   warm core behind the hero headline bright enough to take white text to
   roughly 2.5:1, and every existing check passed.

   So this looks at the real pixels. For each theme and two viewports it
   hides the page, photographs the sky alone, averages it in 8px blocks (a
   single star is a point, not a background; the glow under a line of text
   is what matters), and checks the text tokens that sit straight on the sky
   against the brightest block on the dark theme and the darkest block on
   the daylight one. Anything under 4.5:1 fails.

   Runs under reduced motion, so the frame is the still one: no twinkle,
   no shooting star, the same pixels every run. */
const { launch, serve } = require("../lib/browser");

const TOKENS = ["--ink", "--ink-2", "--ink-3", "--accent"];

function lum(r, g, b) {
  const c = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function hexLum(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return lum((n >> 16) & 255, (n >> 8) & 255, n & 255);
}
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

(async () => {
  const site = await serve();
  const browser = await launch();
  let bad = 0;
  const lines = [];

  for (const theme of ["dark", "light"]) {
    for (const vp of [{ w: 1440, h: 900, n: "desk" }, { w: 390, h: 844, n: "phone" }]) {
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, reducedMotion: "reduce" });
      await ctx.addInitScript((t) => {
        localStorage.setItem("dc-tour-seen", "1");
        localStorage.setItem("dc-sound-told", "1");
        localStorage.setItem("dc-theme", t);
      }, theme);
      const page = await ctx.newPage();
      await page.goto(site.url + "/", { waitUntil: "load" });
      await page.waitForSelector(".sky-milky.is-ready", { state: "attached", timeout: 10000 });
      const tokens = await page.evaluate((names) => {
        const cs = getComputedStyle(document.documentElement);
        return names.map((n) => [n, cs.getPropertyValue(n).trim()]);
      }, TOKENS);
      await page.addStyleTag({ content: "main, .foot, .topbar, .bubble-dock { visibility: hidden !important; }" });
      await page.waitForTimeout(250);
      const png = (await page.screenshot()).toString("base64");

      // Decode and block-average in the browser, which already has a PNG decoder.
      const stats = await page.evaluate(async (b64) => {
        const img = new Image();
        await new Promise((r) => { img.onload = r; img.src = "data:image/png;base64," + b64; });
        const c = document.createElement("canvas");
        c.width = img.width; c.height = img.height;
        const x = c.getContext("2d");
        x.drawImage(img, 0, 0);
        const d = x.getImageData(0, 0, c.width, c.height).data;
        const B = 8;
        let max = null, min = null;
        const L = (r, g, b) => {
          const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
          return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
        };
        for (let by = 0; by + B <= c.height; by += B) {
          for (let bx = 0; bx + B <= c.width; bx += B) {
            let r = 0, g = 0, bl = 0;
            for (let yy = 0; yy < B; yy++) {
              for (let xx = 0; xx < B; xx++) {
                const i = ((by + yy) * c.width + bx + xx) * 4;
                r += d[i]; g += d[i + 1]; bl += d[i + 2];
              }
            }
            const n = B * B;
            const l = L(r / n, g / n, bl / n);
            const px = [Math.round(r / n), Math.round(g / n), Math.round(bl / n)];
            if (!max || l > max.l) max = { l, px, at: [bx, by] };
            if (!min || l < min.l) min = { l, px, at: [bx, by] };
          }
        }
        return { max, min };
      }, png);

      // Dark text-on-sky is judged against the brightest patch of sky; the
      // daylight theme's dark ink against the darkest.
      const edge = theme === "dark" ? stats.max : stats.min;
      const worst = tokens.map(([n, hex]) => [n, ratio(hexLum(hex), edge.l)]).sort((a, b) => a[1] - b[1])[0];
      const ok = worst[1] >= 4.5;
      if (!ok) bad++;
      lines.push(`  ${ok ? "✓" : "✗"} ${theme.padEnd(5)} ${vp.n.padEnd(5)} ${theme === "dark" ? "brightest" : "darkest"} sky rgb(${edge.px.join(",")}) at ${edge.at.join(",")}: ` +
        `worst text ${worst[0]} at ${worst[1].toFixed(2)}:1`);
      await ctx.close();
    }
  }

  await browser.close();
  await site.close();
  console.log(lines.join("\n"));
  console.log(bad
    ? `\n${bad} sky/theme combination(s) put text under 4.5:1`
    : "\nThe sky never takes text on it below 4.5:1, in either theme");
  process.exit(bad ? 1 : 0);
})();
