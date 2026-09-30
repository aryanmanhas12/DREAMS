/* The night sky behind every view, and the particle tracks in front of it.

   The sky is one fixed container behind the page (z-index -1, no pointer
   events, aria-hidden), so it never takes a click, a tab stop or a
   screen-reader announcement. Inside it, back to front:

     .sky-nebula   two soft clouds, pink and violet, that breathe very slowly.
                   Pure CSS, animated on the compositor.
     .sky-milky    the Milky Way: a band of glow with a warm core, dark dust
                   lanes cut through it, and a few thousand faint stars packed
                   along it. Painted ONCE into an oversized canvas, then turned
                   by a CSS animation (one revolution every 16 minutes), so
                   the sky wheels overhead at no per-frame cost.
     .sky-stars    the live layer, redrawn about 30 times a second: bright
                   twinkling stars in three depths, a distant spiral galaxy
                   that turns on its own axis, drifting dust, shooting stars,
                   and now and then a comet.

   Everything drifts with scroll and, on a mouse or trackpad, leans away from
   the pointer, nearer layers more than farther ones.

   In front of the page, a second canvas draws cloud-chamber tracks where you
   act: short thick alpha tracks when you choose an answer, curling beta
   tracks when you move on, a gamma ring when you save a programme, and a
   decay chain when your results arrive. It exists only while tracks are
   alive and never takes a pointer event.

   Motion is optional, twice over:
     - under prefers-reduced-motion the sky is one still frame, the CSS
       animations are off and there are no particle tracks;
     - the "Pause the moving sky" button in the footer does the same for
       anyone, remembered on this device. WCAG 2.2.2 asks for an on-page way
       to stop motion that lasts more than five seconds beside content, and a
       system setting alone does not meet it.
   Colours come from the tokens and are re-read when the theme toggles.
   Public surface: window.DCSpace.burst(kind, x, y), .still(), .setStill(bool). */
(function () {
  "use strict";

  const mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  const reduced = !!(mq && mq.matches);
  const finePointer = window.matchMedia ? window.matchMedia("(pointer: fine)").matches : false;
  let still = false;
  try { still = localStorage.getItem("dc-sky") === "still"; } catch (e) { /* private mode */ }
  function moving() { return !reduced && !still; }

  let root, nebula, milkyWrap, milky, starsCv, sctx;
  let W = 0, H = 0, dpr = 1, S = 0;
  let stars = [], dust = [], shooting = null, comet = null, nextShot = 0, nextComet = 0;
  let galaxy = null, spin = 0;
  let raf = null, lastDraw = 0, lastT = 0, running = false;
  let tx = 0, ty = 0, cx = 0, cy = 0;        // pointer lean: target and eased
  let C = {};

  /* Seeded, so the sky has the same shape on every visit and a resize re-lays
     the same stars rather than shuffling them. */
  let seed = 1;
  function rand() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
  function gauss() {       // Box–Muller, from the seeded source
    let u = 0, v = 0;
    while (u === 0) u = rand();
    while (v === 0) v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function token(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }
  function isLight() { return document.documentElement.getAttribute("data-theme") === "light"; }
  function readColours() {
    C = {
      light: token("--starlight", "#FFF6FF"),
      star: token("--star", "#FFE58A"),
      pink: token("--fill", "#FF4FA8"),
      violet: token("--globe", "#B79BFF")
    };
  }
  function rgba(hex, a) {
    const h = hex.replace("#", "");
    if (h.length !== 6) return hex;
    const n = parseInt(h, 16);
    return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
  }

  /* ───────── the Milky Way ─────────
     Painted in local coordinates where the band runs horizontally through
     the centre; the canvas itself is tilted and turned by CSS. Three passes,
     split across idle time so none of them blocks first paint:
       1. glow: soft blobs scattered along the band on a Gaussian, warmer
          and denser towards the core;
       2. dust: dark lanes cut out of the glow along a wandering line, which
          is what makes it read as the Milky Way rather than a smear;
       3. stars: a few thousand faint points, most of them packed into the
          band, the rest scattered across the whole sky. */
  function later(fn) {
    if (window.requestIdleCallback) window.requestIdleCallback(fn, { timeout: 700 });
    else setTimeout(fn, 60);
  }

  function paintMilky() {
    if (!milky) return;
    S = Math.min(2600, Math.ceil(Math.hypot(W, H) * 1.04));
    milky.width = S; milky.height = S;
    milky.style.width = S + "px"; milky.style.height = S + "px";
    const g = milky.getContext("2d");
    if (!g) return;
    const light = isLight();
    const half = S / 2;
    const bandW = S * 0.075;             // one standard deviation of the band
    const coreU = S * 0.06;              // the core sits a little off centre

    const passGlow = function () {
      seed = 7331;
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.clearRect(0, 0, S, S);
      g.setTransform(1, 0, 0, 1, half, half);
      g.globalCompositeOperation = light ? "source-over" : "lighter";
      const blobs = Math.round(210 + S / 12);
      for (let i = 0; i < blobs; i++) {
        const u = (rand() * 2 - 1) * half * 1.05;
        const v = gauss() * bandW * (0.8 + 0.4 * Math.cos(u / half * 2.3));
        const near = Math.exp(-Math.pow((u - coreU) / (S * 0.16), 2));
        const r = S * (0.025 + rand() * 0.06) * (1 + near * 0.8);
        const hue = rand();
        const col = near > 0.45 && hue < 0.6 ? C.star : (hue < 0.55 ? C.violet : (hue < 0.85 ? C.pink : C.light));
        // Kept faint on purpose: text sits over this, and tools/test/sky.js
        // measures the brightest sky pixel against the page's text colours.
        const a = (light ? 0.008 : 0.01) + near * (light ? 0.006 : 0.008);
        const grad = g.createRadialGradient(u, v, 0, u, v, r);
        grad.addColorStop(0, rgba(col, a));
        grad.addColorStop(1, rgba(col, 0));
        g.fillStyle = grad;
        g.fillRect(u - r, v - r, r * 2, r * 2);
      }
      // The galactic core: one broad warm swell.
      const core = g.createRadialGradient(coreU, 0, 0, coreU, 0, S * 0.2);
      core.addColorStop(0, rgba(C.star, light ? 0.025 : 0.04));
      core.addColorStop(0.35, rgba(C.pink, light ? 0.015 : 0.025));
      core.addColorStop(1, rgba(C.pink, 0));
      g.fillStyle = core;
      g.fillRect(coreU - S * 0.2, -S * 0.2, S * 0.4, S * 0.4);
      later(passDust);
    };

    const passDust = function () {
      seed = 4242;
      g.globalCompositeOperation = "destination-out";
      const lanes = Math.round(320 + S / 6);
      for (let i = 0; i < lanes; i++) {
        const u = (rand() * 2 - 1) * half;
        // The rift wanders around a line just off the centre of the band, in
        // many small wisps stretched along it; round blobs read as smoke.
        const v = bandW * 0.18 + Math.sin(u / S * 9) * bandW * 0.35 + gauss() * bandW * 0.2;
        const r = S * (0.003 + rand() * 0.009);
        const stretch = 2 + rand() * 2.5;
        const grad = g.createRadialGradient(0, 0, 0, 0, 0, r);
        grad.addColorStop(0, "rgba(0,0,0,0.32)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        g.setTransform(stretch, 0, 0, 1, half + u, half + v);
        g.fillStyle = grad;
        g.fillRect(-r, -r, r * 2, r * 2);
      }
      g.setTransform(1, 0, 0, 1, half, half);
      later(passStars);
    };

    const passStars = function () {
      seed = 9001;
      g.globalCompositeOperation = "source-over";
      // Share cards set data-sky-lite: a few thousand single-pixel stars are
      // what PNG compresses worst, and WhatsApp drops previews over ~300 KB.
      const lite = document.documentElement.hasAttribute("data-sky-lite");
      const n = lite ? 380 : Math.min(6500, Math.round(S * S / 420));
      for (let i = 0; i < n; i++) {
        const inBand = rand() < 0.72;
        const u = (rand() * 2 - 1) * half;
        const v = inBand ? gauss() * bandW * 0.9 : (rand() * 2 - 1) * half;
        const size = rand() < 0.93 ? 0.5 + rand() * 0.5 : 1 + rand() * 0.8;
        const hue = rand();
        g.fillStyle = hue < 0.82 ? C.light : (hue < 0.93 ? C.star : C.pink);
        g.globalAlpha = (inBand ? 0.25 : 0.18) + rand() * (light ? 0.35 : 0.55);
        g.fillRect(u, v, size, size);
      }
      g.globalAlpha = 1;
      milky.classList.add("is-ready");
    };

    later(passGlow);
  }

  /* ───────── a distant spiral galaxy ─────────
     Painted face-on into a small offscreen canvas once, then drawn each
     frame turned on its own axis and squashed to an ellipse, which is how a
     tilted disc actually looks as it rotates. Two logarithmic arms of points
     around a warm core, with a soft glow laid under them. */
  function paintGalaxy() {
    const size = 256, R = size / 2;
    const c = document.createElement("canvas");
    c.width = size; c.height = size;
    const g = c.getContext("2d");
    if (!g) return null;
    seed = 2718;
    g.globalCompositeOperation = "lighter";
    const core = g.createRadialGradient(R, R, 0, R, R, R * 0.42);
    // A soft core rather than a hot one: text can scroll over this corner,
    // and tools/test/sky.js caught the first version at 1.6:1 under --ink-3.
    core.addColorStop(0, rgba(C.star, 0.42));
    core.addColorStop(0.25, rgba(C.star, 0.16));
    core.addColorStop(0.6, rgba(C.pink, 0.07));
    core.addColorStop(1, rgba(C.pink, 0));
    g.fillStyle = core;
    g.fillRect(0, 0, size, size);
    // The arms are laid over the core normally, not additively: added up,
    // the packed inner points burned the centre to a hot white dot.
    g.globalCompositeOperation = "source-over";
    for (let arm = 0; arm < 2; arm++) {
      for (let i = 0; i < 1500; i++) {
        const t = rand();
        const r = 8 + t * (R - 22);
        const th = arm * Math.PI + t * 5.4 + gauss() * 0.16;
        const spread = gauss() * 2.6 * (0.3 + t * 0.8);
        const x = R + r * Math.cos(th) + spread * Math.cos(th + 1.57);
        const y = R + r * Math.sin(th) + spread * Math.sin(th + 1.57);
        const hue = rand();
        g.fillStyle = t < 0.22 ? C.star : (hue < 0.5 ? C.violet : (hue < 0.85 ? C.pink : C.light));
        g.globalAlpha = 0.14 + (1 - t) * 0.2;
        const s = rand() < 0.9 ? 1 : 1.8;
        g.fillRect(x, y, s, s);
      }
    }
    g.globalAlpha = 1;
    return c;
  }

  /* ───────── live layer ───────── */
  function buildStars() {
    seed = 20260930;
    const n = Math.min(260, Math.round((W * H) / 6500));
    stars = [];
    for (let i = 0; i < n; i++) {
      const layer = rand() < 0.55 ? 0 : (rand() < 0.7 ? 1 : 2);
      const hue = rand();
      stars.push({
        x: rand(), y: rand(),
        r: [0.6, 0.95, 1.4][layer] * (0.75 + rand() * 0.5),
        a: 0.4 + rand() * 0.6,
        tw: 0.6 + rand() * 1.8, ph: rand() * Math.PI * 2,
        depth: [0.02, 0.05, 0.1][layer], lean: [0.25, 0.6, 1][layer],
        c: hue < 0.74 ? "light" : (hue < 0.88 ? "star" : "pink")
      });
    }
    dust = [];
    const m = Math.min(34, Math.round((W * H) / 38000));
    for (let i = 0; i < m; i++) {
      dust.push({
        x: rand() * W, y: rand() * H,
        vx: (rand() - 0.5) * 7, vy: (rand() - 0.5) * 5,
        r: 0.6 + rand() * 0.9, a: 0.18 + rand() * 0.25,
        c: rand() < 0.5 ? "violet" : "pink"
      });
    }
  }

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    starsCv.width = Math.round(W * dpr); starsCv.height = Math.round(H * dpr);
    starsCv.style.width = W + "px"; starsCv.style.height = H + "px";
    sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildStars();
  }

  function drawComet(now) {
    const k = (now - comet.born) / comet.life;
    if (k >= 1) { comet = null; nextComet = now + 30000 + Math.random() * 30000; return; }
    const hx = comet.x0 + (comet.x1 - comet.x0) * k;
    const hy = comet.y0 + (comet.y1 - comet.y0) * k;
    const dx = comet.x1 - comet.x0, dy = comet.y1 - comet.y0;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len, uy = dy / len;
    const tail = 150;
    const fade = Math.min(1, k * 6, (1 - k) * 6);
    // The ion tail, straight back and pink; the dust tail, broader and warm.
    [[C.pink, tail, 3], [C.star, tail * 0.7, 6]].forEach(function (t, i) {
      const tx0 = hx - ux * t[1] + (i ? uy * 18 : 0), ty0 = hy - uy * t[1] - (i ? ux * 18 : 0);
      const grad = sctx.createLinearGradient(hx, hy, tx0, ty0);
      grad.addColorStop(0, rgba(t[0], 0.55 * fade));
      grad.addColorStop(1, rgba(t[0], 0));
      sctx.strokeStyle = grad;
      sctx.lineWidth = t[2];
      sctx.lineCap = "round";
      sctx.beginPath(); sctx.moveTo(hx, hy); sctx.lineTo(tx0, ty0); sctx.stroke();
    });
    const head = sctx.createRadialGradient(hx, hy, 0, hx, hy, 7);
    head.addColorStop(0, rgba(C.light, fade));
    head.addColorStop(1, rgba(C.light, 0));
    sctx.fillStyle = head;
    sctx.beginPath(); sctx.arc(hx, hy, 7, 0, Math.PI * 2); sctx.fill();
  }

  function draw(now) {
    const dt = lastT ? Math.min(0.1, (now - lastT) / 1000) : 0;
    lastT = now;
    const live = moving();
    const scroll = live ? (window.scrollY || 0) : 0;
    const t = now / 1000;
    cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;

    sctx.clearRect(0, 0, W, H);

    // The distant galaxy, low on the right, turning slowly on its own axis.
    if (galaxy) {
      const gr = Math.max(46, Math.min(W, H) * 0.14);
      const gx = W * 0.84 + cx * 0.4, gy = H * 0.8 + cy * 0.4 - scroll * 0.03;
      if (live) spin += dt * 0.035;
      sctx.save();
      sctx.globalAlpha = isLight() ? 0.22 : 0.5;
      sctx.globalCompositeOperation = isLight() ? "source-over" : "lighter";
      sctx.translate(gx, gy);
      sctx.rotate(-0.55);
      sctx.scale(1, 0.55);
      sctx.rotate(spin);
      sctx.drawImage(galaxy, -gr, -gr, gr * 2, gr * 2);
      sctx.restore();
    }

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      let y = (s.y * H - scroll * s.depth + cy * s.lean) % H;
      if (y < 0) y += H;
      const x = s.x * W + cx * s.lean;
      const tw = live ? 0.55 + 0.45 * Math.sin(t * s.tw + s.ph) : 1;
      sctx.globalAlpha = s.a * tw;
      sctx.fillStyle = C[s.c];
      sctx.beginPath();
      sctx.arc(x, y, s.r, 0, Math.PI * 2);
      sctx.fill();
      if (s.r > 1.3 && s.a > 0.8) {        // a four-point glint on the brightest
        sctx.globalAlpha = s.a * tw * 0.35;
        sctx.fillRect(x - s.r * 3, y - 0.3, s.r * 6, 0.6);
        sctx.fillRect(x - 0.3, y - s.r * 3, 0.6, s.r * 6);
      }
    }

    if (live) {
      for (let i = 0; i < dust.length; i++) {
        const d = dust[i];
        d.x += d.vx * dt; d.y += d.vy * dt;
        if (d.x < -4) d.x = W + 4; if (d.x > W + 4) d.x = -4;
        if (d.y < -4) d.y = H + 4; if (d.y > H + 4) d.y = -4;
        sctx.globalAlpha = d.a;
        sctx.fillStyle = C[d.c];
        sctx.beginPath();
        sctx.arc(d.x + cx * 1.3, d.y + cy * 1.3, d.r, 0, Math.PI * 2);
        sctx.fill();
      }

      if (!shooting && now > nextShot) {
        shooting = {
          x: W * (0.1 + Math.random() * 0.8), y: H * (0.04 + Math.random() * 0.4),
          vx: (Math.random() < 0.5 ? -1 : 1) * (0.5 + Math.random() * 0.3), vy: 0.22 + Math.random() * 0.14,
          born: now, life: 850 + Math.random() * 300
        };
      }
      if (shooting) {
        const k = (now - shooting.born) / shooting.life;
        if (k >= 1) { shooting = null; nextShot = now + 6000 + Math.random() * 9000; }
        else {
          const dist = k * W * 0.5;
          const hx = shooting.x + shooting.vx * dist, hy = shooting.y + shooting.vy * dist;
          const tail = 90 * (1 - Math.abs(0.5 - k));
          const grad = sctx.createLinearGradient(hx, hy, hx - shooting.vx * tail, hy - shooting.vy * tail);
          grad.addColorStop(0, C.light);
          grad.addColorStop(1, rgba(C.light, 0));
          sctx.globalAlpha = Math.sin(k * Math.PI);
          sctx.strokeStyle = grad;
          sctx.lineWidth = 1.4;
          sctx.beginPath();
          sctx.moveTo(hx, hy);
          sctx.lineTo(hx - shooting.vx * tail, hy - shooting.vy * tail);
          sctx.stroke();
        }
      }

      if (!comet && now > nextComet) {
        const fromLeft = Math.random() < 0.5;
        comet = {
          x0: fromLeft ? -60 : W + 60, y0: H * (0.08 + Math.random() * 0.3),
          x1: fromLeft ? W + 60 : -60, y1: H * (0.3 + Math.random() * 0.45),
          born: now, life: 9000 + Math.random() * 5000
        };
      }
      sctx.globalAlpha = 1;
      if (comet) drawComet(now);
    }
    sctx.globalAlpha = 1;

    // The Milky Way layer leans and drifts with the same pointer and scroll.
    if (milkyWrap) {
      milkyWrap.style.transform = "translate3d(" + (cx * 0.35).toFixed(2) + "px," +
        (cy * 0.35 - scroll * 0.015).toFixed(2) + "px,0)";
    }
  }

  function loop(now) {
    raf = null;
    if (!running) return;
    if (now - lastDraw > 33) { draw(now); lastDraw = now; }
    raf = requestAnimationFrame(loop);
  }
  function start() {
    if (!moving()) { lastT = 0; draw(performance.now()); return; }
    running = true;
    if (!raf) raf = requestAnimationFrame(loop);
  }
  function stop() {
    running = false;
    if (raf) { cancelAnimationFrame(raf); raf = null; }
  }

  function setStill(v) {
    still = !!v;
    try { localStorage.setItem("dc-sky", still ? "still" : "moving"); } catch (e) { /* ignore */ }
    document.documentElement.classList.toggle("sky-still", still);
    if (still) { stop(); tx = ty = 0; draw(performance.now()); }
    else start();
    paintToggle();
  }

  let toggle = null;
  function paintToggle() {
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", String(still || reduced));
    toggle.textContent = still || reduced ? "Let the sky move" : "Pause the moving sky";
    toggle.disabled = reduced;
    if (reduced) toggle.title = "Your device is set to reduce motion, so the sky is already still.";
  }

  /* ───────── cloud-chamber tracks ───────── */
  let fx = null, fctx = null, tracks = [], fxRaf = null;
  function fxCanvas() {
    if (fx) return true;
    fx = document.createElement("canvas");
    fx.className = "fx";
    fx.setAttribute("aria-hidden", "true");
    fctx = fx.getContext("2d");
    if (!fctx) { fx = null; return false; }
    document.body.appendChild(fx);
    return true;
  }
  function fxSize() {
    const r = Math.min(window.devicePixelRatio || 1, 2);
    fx.width = Math.round(window.innerWidth * r); fx.height = Math.round(window.innerHeight * r);
    fx.style.width = window.innerWidth + "px"; fx.style.height = window.innerHeight + "px";
    fctx.setTransform(r, 0, 0, r, 0, 0);
  }
  function addTrack(o) { tracks.push(Object.assign({ born: performance.now() }, o)); }

  function burst(kind, x, y) {
    if (!moving() || !fxCanvas()) return;
    if (!tracks.length) fxSize();
    const now = performance.now();
    if (kind === "alpha") {
      // Alpha particles are heavy: short, thick, dead straight.
      const n = 5 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.5;
        addTrack({ x: x, y: y, a: a, len: 16 + Math.random() * 16, w: 2.2, col: C.pink, curl: 0, grow: 120, life: 620 });
      }
    } else if (kind === "beta") {
      // Beta electrons are light: long, thin, and they wander.
      for (let i = 0; i < 3; i++) {
        addTrack({ x: x, y: y, a: -Math.PI / 2 + (Math.random() - 0.5) * 2.4, len: 60 + Math.random() * 60,
          w: 1, col: C.violet, curl: (Math.random() - 0.5) * 0.09, grow: 260, life: 820 });
      }
    } else if (kind === "gamma") {
      // Gamma leaves no track of its own: a ring, and the short electron it
      // knocks loose.
      addTrack({ x: x, y: y, ring: true, len: 34, w: 1.6, col: C.star, grow: 380, life: 620 });
      addTrack({ x: x, y: y, a: Math.random() * Math.PI * 2, len: 26, w: 1, col: C.star, curl: 0.06, grow: 200, life: 600 });
    } else if (kind === "chain") {
      burst("alpha", x, y);
      setTimeout(function () { burst("beta", x - 40, y + 20); }, 160);
      setTimeout(function () { burst("gamma", x + 44, y + 10); }, 320);
      setTimeout(function () { burst("alpha", x + 10, y + 36); }, 480);
    }
    if (!fxRaf) fxRaf = requestAnimationFrame(fxLoop);
    return now;
  }

  function fxLoop(now) {
    fxRaf = null;
    const w = window.innerWidth, h = window.innerHeight;
    fctx.clearRect(0, 0, w, h);
    tracks = tracks.filter(function (tr) { return now - tr.born < tr.life; });
    tracks.forEach(function (tr) {
      const age = now - tr.born;
      const grown = Math.min(1, age / tr.grow);
      const fade = age < tr.grow ? 1 : 1 - (age - tr.grow) / (tr.life - tr.grow);
      fctx.globalAlpha = Math.max(0, fade) * 0.9;
      fctx.strokeStyle = tr.col;
      fctx.lineWidth = tr.w;
      fctx.lineCap = "round";
      fctx.beginPath();
      if (tr.ring) {
        fctx.arc(tr.x, tr.y, 6 + tr.len * grown, 0, Math.PI * 2);
      } else {
        // Walk the track in small steps so a curling one bends as it goes.
        let px = tr.x, py = tr.y, a = tr.a;
        const steps = 14, step = (tr.len * grown) / steps;
        fctx.moveTo(px, py);
        for (let i = 0; i < steps; i++) {
          a += tr.curl * (1 + i * 0.15);
          px += Math.cos(a) * step; py += Math.sin(a) * step;
          fctx.lineTo(px, py);
        }
      }
      fctx.stroke();
    });
    fctx.globalAlpha = 1;
    if (tracks.length) fxRaf = requestAnimationFrame(fxLoop);
    else fctx.clearRect(0, 0, w, h);
  }

  /* ───────── wiring ───────── */
  function init() {
    root = document.createElement("div");
    root.className = "sky";
    root.setAttribute("aria-hidden", "true");
    nebula = document.createElement("div");
    nebula.className = "sky-nebula";
    milkyWrap = document.createElement("div");
    milkyWrap.className = "sky-milky-wrap";
    milky = document.createElement("canvas");
    milky.className = "sky-milky";
    starsCv = document.createElement("canvas");
    starsCv.className = "sky-stars";
    sctx = starsCv.getContext("2d");
    if (!sctx) return;
    milkyWrap.appendChild(milky);
    root.appendChild(nebula);
    root.appendChild(milkyWrap);
    root.appendChild(starsCv);
    document.body.insertBefore(root, document.body.firstChild);
    document.documentElement.classList.toggle("sky-still", still);

    readColours();
    size();
    paintMilky();
    galaxy = paintGalaxy();
    nextShot = performance.now() + 2500;
    nextComet = performance.now() + 12000 + Math.random() * 10000;
    start();

    toggle = document.getElementById("skyToggle");
    if (toggle) {
      paintToggle();
      toggle.addEventListener("click", function () { setStill(!still); });
    }

    let rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        const oldS = S;
        size();
        if (Math.abs(Math.ceil(Math.hypot(W, H) * 1.04) - oldS) > 40) paintMilky();
        if (!moving()) draw(performance.now());
      }, 150);
    });
    if (finePointer && !reduced) {
      window.addEventListener("pointermove", function (e) {
        if (!moving()) return;
        tx = (e.clientX / W - 0.5) * -18;
        ty = (e.clientY / H - 0.5) * -12;
      }, { passive: true });
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });
    // The theme toggle rewrites data-theme on <html>: re-read the tokens and
    // repaint the layers that baked colours in.
    new MutationObserver(function () {
      readColours();
      paintMilky();
      galaxy = paintGalaxy();
      if (!moving()) draw(performance.now());
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }

  window.DCSpace = {
    burst: function (kind, x, y) { try { burst(kind, x, y); } catch (e) { /* decoration must never break the page */ } },
    still: function () { return still || reduced; },
    setStill: setStill
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
