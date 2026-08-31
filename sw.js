/* Dream Counsellor — Offline PWA Service Worker (v1)
   Caches all 207 medical research opportunities and directories for offline use. */
const CACHE = "dreams-v1";

const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./assets/styles.css",
  "./assets/app.js",
  "./assets/globe.js",
  "./assets/data-meta.js",
  "./assets/data-research.js",
  "./assets/data-funding.js",
  "./assets/data-abroad.js",
  "./assets/data-study.js",
  "./assets/data-world.js",
  "./assets/data-specialties.js",
  "./assets/data-frontiers.js",
  "./assets/data-expansion.js",
  "./assets/data-fields-2026.js",
  "./assets/data-india-events.js",
  "./assets/data-india-funding.js",
  "./assets/data-impact.js",
  "./assets/data-countries.js",
  "./assets/data-newroutes.js",
  "./assets/data-equity-plus.js",
  "./assets/data-2026.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => Promise.allSettled(SHELL.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (e) => {
  if (e.data === "skip-waiting") self.skipWaiting();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // never touch external APIs

  // Navigations: network-first, fallback to cache
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match("./index.html")))
    );
    return;
  }

  // Static assets: stale-while-revalidate
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});