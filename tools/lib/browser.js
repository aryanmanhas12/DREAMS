/* Finds Playwright and a Chromium to drive, and serves the repo over HTTP.

   Every browser test used to hard-code /opt/node22/.../playwright and
   /opt/pw-browsers/chromium-1194/..., and carried its own copy of a static
   server on its own port. A Chromium upgrade would have broken all of them at
   once. This is the one place that knows where things are.

   Overrides: PLAYWRIGHT_PATH (the module), CHROME_PATH (the executable). */

const fs = require("fs");
const path = require("path");
const http = require("http");
const zlib = require("zlib");
const { execSync } = require("child_process");
const { ROOT } = require("./data");

function loadPlaywright() {
  const tries = [process.env.PLAYWRIGHT_PATH, "playwright", "/opt/node22/lib/node_modules/playwright"];
  for (const t of tries.filter(Boolean)) {
    try { return require(t); } catch (e) {}
  }
  // last resort, because it spawns npm: wherever global modules live here
  try { return require(path.join(execSync("npm root -g", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(), "playwright")); } catch (e) {}
  throw new Error("Playwright not found. Install it globally (npm i -g playwright) or set PLAYWRIGHT_PATH.");
}

/* The newest chromium-NNNN under PLAYWRIGHT_BROWSERS_PATH. Returning
   undefined lets Playwright use its own bundled browser instead. */
function chromePath() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  try {
    const dirs = fs.readdirSync(base).filter((n) => /^chromium-\d+$/.test(n))
      .sort((a, b) => Number(b.split("-")[1]) - Number(a.split("-")[1]));
    for (const d of dirs) {
      const p = path.join(base, d, "chrome-linux", "chrome");
      if (fs.existsSync(p)) return p;
    }
  } catch (e) {}
  return undefined;
}

const { chromium } = loadPlaywright();
const launch = (opts = {}) => chromium.launch({ executablePath: chromePath(), ...opts });

const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".webmanifest": "application/manifest+json", ".png": "image/png",
  ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain"
};

/* Serves the repo the way GitHub Pages does: /DREAMS/ prefix accepted,
   directory URLs resolve to index.html, unknown paths get 404.html with a real
   404, and text is gzipped when asked for. Over HTTP rather than file://,
   because 404.html's links are absolute /DREAMS/ paths and every one would be
   a false failure on file://. Port 0 picks a free port, so tests never
   collide. Resolves to { url, close }. */
function serve({ root = ROOT, port = 0, gzip = true } = {}) {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.startsWith("/DREAMS")) p = p.slice(7) || "/";
    if (p.endsWith("/")) p += "index.html";
    const f = path.join(root, p);
    if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(fs.readFileSync(path.join(root, "404.html")));
    }
    const body = fs.readFileSync(f);
    const gz = gzip && /gzip/.test(req.headers["accept-encoding"] || "") && /\.(html|css|js|json|xml|txt|webmanifest)$/.test(f);
    const out = gz ? zlib.gzipSync(body, { level: 6 }) : body;
    const h = { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream", "Content-Length": String(out.length) };
    if (gz) h["Content-Encoding"] = "gzip";
    res.writeHead(200, h);
    res.end(out);
  });
  return new Promise((resolve) => server.listen(port, "127.0.0.1", () => resolve({
    url: `http://127.0.0.1:${server.address().port}`,
    close: () => new Promise((r) => server.close(r))
  })));
}

module.exports = { chromium, launch, chromePath, serve, ROOT };

/* `node tools/lib/browser.js [port]` serves the site for poking at by hand. */
if (require.main === module) {
  serve({ port: Number(process.argv[2]) || 8093 }).then(({ url }) => console.log(`serving ${ROOT} at ${url}/`));
}
