/* Dream Counsellor — service worker.

   This exists so the site installs to a phone home screen and still opens on
   a train with no signal. It is deliberately NOT a normal offline-first
   worker, and the reason is the whole premise of the site: a confidently
   stated wrong date is worse than no date. A cache-first worker would happily
   serve a student a copy from three months ago, with a closed deadline
   presented as open, while their phone sat on full bars. That is the exact
   failure this project is built to prevent.

   So: network first, cache only as a fallback.
     online  -> always the live file, and the cache is refreshed behind it
     offline -> the last copy that was successfully fetched

   The review stamp renders from data, so an offline reader sees the date the
   cached copy actually carried. It tells the truth about its own age for
   free, which is the behaviour we want.

   Updating: skipWaiting + clients.claim, so a new worker takes over on the
   next load instead of waiting for every tab to close. Without that, a
   corrected deadline could sit behind a stale worker indefinitely. */

const VERSION = "dc-v1";
const SHELL = ["./", "index.html", "manifest.webmanifest", "assets/styles.css", "assets/data-study.js", "assets/data-funding.js", "assets/data-research.js", "assets/data-frontiers.js", "assets/data-countries.js", "assets/data-impact.js", "assets/data-expansion.js", "assets/data-india-funding.js", "assets/data-specialties.js", "assets/data-equity-plus.js", "assets/data-world.js", "assets/data-india-events.js", "assets/data-abroad.js", "assets/data-newroutes.js", "assets/data-2026.js", "assets/data-fields-2026.js", "assets/data-meta.js", "assets/data-coast.js", "assets/globe.js", "assets/app.js", "assets/fonts/cormorant-garamond.woff2", "assets/fonts/cormorant-garamond-italic.woff2", "assets/fonts/ibm-plex-sans.woff2", "assets/fonts/ibm-plex-mono.woff2", "assets/fonts/petit-formal-script.woff2", "assets/icons/icon-192.png", "assets/icons/icon-512.png", "assets/icons/icon-maskable-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    // addAll is atomic: one 404 and the whole install fails, leaving no
    // worker at all. Add individually and tolerate misses, so a single
    // renamed asset degrades the offline copy instead of disabling it.
    await Promise.all(SHELL.map((url) =>
      cache.add(new Request(url, { cache: "reload" })).catch(() => {})
    ));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  // Same-origin only. Never interpose on a programme's own site.
  const u0 = new URL(req.url);
  if (u0.origin !== self.location.origin) return;
  // The page's staleness probe. It deliberately asks under its own URL so it
  // cannot disturb the entry the document actually loads, and the worker
  // stays out of it entirely so nothing is stored under the probe URL either.
  if (u0.searchParams.has("fresh")) return;

  // Content that can carry a deadline is always revalidated against the
  // server; fonts and icons are not, because they effectively never change
  // and a needless round trip costs a student on a metered connection.
  const url = new URL(req.url);
  const carriesData = req.mode === "navigate" ||
    /\.(?:js|css|webmanifest)$/.test(url.pathname) ||
    url.pathname.endsWith("/");

  e.respondWith((async () => {
    try {
      // cache:"no-cache" forces a conditional request rather than letting the
      // browser's own HTTP cache answer. Without it, plain fetch() is served
      // from that cache and the worker hands back a stale file to an ONLINE
      // reader — which was measurably true here: a corrected review date did
      // not reach a reloading user. The server answers 304 when nothing has
      // changed, so this costs a few bytes, not a re-download.
      const fresh = await fetch(req, carriesData ? { cache: "no-cache" } : undefined);
      // Only cache real successes. Caching an opaque or error response is how
      // a worker starts serving a 404 page as though it were the site.
      if (fresh && fresh.status === 200 && fresh.type === "basic") {
        const cache = await caches.open(VERSION);
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch (err) {
      const hit = await caches.match(req);
      if (hit) return hit;
      // A navigation that missed the cache still needs a document rather than
      // a browser error page.
      if (req.mode === "navigate") {
        const shell = await caches.match("index.html") || await caches.match("./");
        if (shell) return shell;
      }
      throw err;
    }
  })());
});
