/* The night sky behind every view, and the particle tracks in front of it.

   PERFORMANCE IS THE DESIGN CONSTRAINT HERE. The first version redrew a
   full-screen canvas 30 times a second on the main thread; on a phone-speed
   CPU (Lighthouse's 4x throttle) that, together with the hero globe, left
   the main thread saturated while the reader did nothing, janked scrolling
   and put taps at 400ms. So now:

     - Every layer is PAINTED ONCE, in small time-sliced chunks during idle
       time (never a long task), and never redrawn per frame.
     - Every piece of motion is a CSS animation of transform or opacity, which
       the compositor runs off the main thread, and only ONE full-screen layer
       exists. The first compositor version stacked six (nebula, Milky Way,
       far stars, two twinkle layers, dust) and a trace measured 8.6x the
       compositing work of the page without a sky: on a phone that is GPU
       overdraw, which is battery, heat and dropped frames. So:
         .sky          the container; the two nebula clouds are its static
                       CSS background
         .sky-milky    the ONE big layer: Milky Way glow, dust lanes, packed
                       band stars and the faint field stars, turning once
                       every 16 minutes
         .sky-tw-star  a few dozen bright stars as tiny elements, each on its
                       own twinkle rhythm, so only small squares animate
         .sky-galaxy   a distant spiral: a face-on disc spun by CSS inside a
                       tilted, flattened wrapper, which is how a tilted disc
                       really turns
         .sky-shoot / .sky-comet  short-lived elements, one CSS animation each
     - While the page scrolls, html.is-scrolling pauses the sky's animations:
       nobody watches a star twinkle mid-scroll, and the frame budget goes to
       the scroll.
     - Scroll parallax is a transform on three wrappers, updated once per frame
       and only while scrolling; pointer lean (mouse and trackpad only) eases
       through a CSS transition. No canvas is repainted for either.
     - A phone's address bar showing or hiding changes the viewport height at
       every change of scroll direction. Layers are painted for the tallest
       viewport, so that never triggers a repaint mid-scroll.

   In front of the page, .fx draws cloud-chamber tracks where you act (alpha
   on an answer, beta on Continue, gamma on save, a decay chain on results).
   It exists only while tracks are alive and takes no pointer events.

   Motion is optional twice over: prefers-reduced-motion stills everything,
   and "Pause the moving sky" in the footer does the same for anyone
   (WCAG 2.2.2), remembered on this device.
   Public surface: window.DCSpace.burst(kind, x, y), .still(), .setStill(bool). */
(function () {
  "use strict";

  const mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  const reduced = !!(mq && mq.matches);
  const finePointer = window.matchMedia ? window.matchMedia("(pointer: fine)").matches : false;
  let still = false;
  try { still = localStorage.getItem("dc-sky") === "still"; } catch (e) { /* private mode */ }
  function moving() { return !reduced && !still; }

  let root = null, W = 0, H = 0, painted = 0;
  const L = {};            // layer elements
  let C = {};              // colours, read from the tokens

  /* Seeded, so the sky has the same shape on every visit. */
  let seed = 1;
  function rand() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
  function gauss() {
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

  /* ───────── idle-time work, sliced ─────────
     Each job paints a chunk and returns true once it has finished. The pump
     keeps running chunks until the idle deadline is nearly spent, then
     yields, so no single task gets long even on a slow phone. At least one
     chunk runs per callback, or a page that is never idle would never get a
     sky. */
  const queue = [];
  let pumping = false, generation = 0;
  function ric(fn) {
    if (window.requestIdleCallback) window.requestIdleCallback(fn, { timeout: 400 });
    else setTimeout(function () { fn(null); }, 16);
  }
  function enqueue(job) {
    queue.push(job);
    if (pumping) return;
    pumping = true;
    const run = function (deadline) {
      const t0 = performance.now();
      const left = function () {
        return deadline && !deadline.didTimeout ? deadline.timeRemaining() > 3 : performance.now() - t0 < 6;
      };
      do {
        if (queue[0]()) queue.shift();
      } while (queue.length && left());
      if (queue.length) ric(run); else pumping = false;
    };
    ric(run);
  }
  // A loop split into chunks: body(i) for i in [0, n), `per` at a time.
  function chunked(n, per, body, done) {
    let i = 0;
    return function () {
      const end = Math.min(n, i + per);
      for (; i < end; i++) body(i);
      if (i >= n) { if (done) done(); return true; }
      return false;
    };
  }

  function makeCanvas(cls, w, h, s) {
    const c = document.createElement("canvas");
    c.className = cls;
    c.width = Math.max(1, Math.round(w * s)); c.height = Math.max(1, Math.round(h * s));
    c.style.width = w + "px"; c.style.height = h + "px";
    const g = c.getContext("2d");
    if (g) g.setTransform(s, 0, 0, s, 0, 0);
    return { c: c, g: g };
  }
  function swap(key, parent, node) {
    if (L[key] && L[key].parentNode) L[key].parentNode.removeChild(L[key]);
    L[key] = node;
    parent.appendChild(node);
  }

  /* ───────── painting ───────── */
  function paintAll() {
    const gen = ++generation;
    queue.length = 0;
    readColours();
    W = window.innerWidth;
    // Paint for the tallest this viewport gets, so a mobile address bar
    // appearing or collapsing never needs a repaint.
    const sh = window.screen && window.screen.height ? window.screen.height : 0;
    H = Math.max(window.innerHeight, Math.min(Math.round(sh), Math.round(window.innerHeight * 1.4)));
    painted = W;
    const light = isLight();
    const alive = function () { return gen === generation; };

    /* The twinkling stars: a few dozen small elements, each with its own
       duration and delay, so every one twinkles on its own rhythm. Placed
       twice (y and y + H) so the scroll parallax can wrap with a modulo and
       never show an empty edge. The faint field stars live in the Milky Way
       canvas below, where they cost nothing per frame. */
    seed = 20260930;
    const nTw = Math.min(40, Math.round((W * H) / 16000));
    const frag = document.createDocumentFragment();
    for (let i = 0; i < nTw; i++) {
      const x = rand() * W, y = rand() * H;
      const hue = rand();
      const size = 6 + rand() * 7;
      const col = hue < 0.7 ? C.light : (hue < 0.87 ? C.star : C.pink);
      const glint = size > 11;
      const dur = (2.4 + rand() * 3.2).toFixed(2) + "s", delay = (-rand() * 5).toFixed(2) + "s";
      for (let k = 0; k < 2; k++) {
        const sp = document.createElement("span");
        sp.className = glint ? "sky-tw-star is-glint" : "sky-tw-star";
        sp.style.cssText = "left:" + x.toFixed(0) + "px;top:" + (y + k * H).toFixed(0) + "px;--s:" + size.toFixed(1) +
          "px;--c:" + col + ";--d:" + dur + ";--dl:" + delay;
        frag.appendChild(sp);
      }
    }
    const twHolder = document.createElement("div");
    twHolder.className = "sky-tw-field";
    twHolder.appendChild(frag);
    enqueue(function () { if (alive()) swap("twField", L.parNear, twHolder); return true; });

    /* A distant spiral galaxy, face-on; CSS tilts it and turns it. */
    paintGalaxy(alive);

    /* The Milky Way: glow, dust lanes cut through it, and a few thousand faint
       stars packed along it, in local coordinates where the band runs
       horizontally; CSS tilts and turns the whole canvas. */
    const S = Math.min(2600, Math.ceil(Math.hypot(W, H) * 1.04));
    const mw = makeCanvas("sky-milky", S, S, 1);
    const g = mw.g;
    if (!g) return;
    const half = S / 2, bandW = S * 0.075, coreU = S * 0.06;
    // Share cards set data-sky-lite: they get the stars without the glow and
    // dust lanes, whose dithered gradients PNG compresses worst (WhatsApp
    // drops previews over ~300 KB).
    const lite = document.documentElement.hasAttribute("data-sky-lite");
    enqueue(function () {
      g.setTransform(1, 0, 0, 1, half, half);
      g.globalCompositeOperation = light ? "source-over" : "lighter";
      seed = 7331;
      return true;
    });
    const blobs = lite ? 0 : Math.round(210 + S / 12);
    enqueue(chunked(blobs, 6, function () {
      if (!alive()) return;
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
    }, function () {
      const core = g.createRadialGradient(coreU, 0, 0, coreU, 0, S * 0.2);
      core.addColorStop(0, rgba(C.star, light ? 0.025 : 0.04));
      core.addColorStop(0.35, rgba(C.pink, light ? 0.015 : 0.025));
      core.addColorStop(1, rgba(C.pink, 0));
      g.fillStyle = core;
      g.fillRect(coreU - S * 0.2, -S * 0.2, S * 0.4, S * 0.4);
      g.globalCompositeOperation = "destination-out";
      seed = 4242;
    }));
    const lanes = lite ? 0 : Math.round(320 + S / 6);
    enqueue(chunked(lanes, 30, function () {
      if (!alive()) return;
      // The rift wanders around a line just off the centre of the band, in
      // small wisps stretched along it; round blobs read as smoke.
      const u = (rand() * 2 - 1) * half;
      const v = bandW * 0.18 + Math.sin(u / S * 9) * bandW * 0.35 + gauss() * bandW * 0.2;
      const r = S * (0.003 + rand() * 0.009);
      const stretch = 2 + rand() * 2.5;
      const grad = g.createRadialGradient(0, 0, 0, 0, 0, r);
      grad.addColorStop(0, "rgba(0,0,0,0.32)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      g.setTransform(stretch, 0, 0, 1, half + u, half + v);
      g.fillStyle = grad;
      g.fillRect(-r, -r, r * 2, r * 2);
    }, function () {
      g.setTransform(1, 0, 0, 1, half, half);
      g.globalCompositeOperation = "source-over";
      seed = 9001;
    }));
    // No band stars on a card: each single-pixel point costs PNG bytes, and
    // the field stars below already give a card its night sky.
    const ms = lite ? 0 : Math.min(6500, Math.round(S * S / 420));
    enqueue(chunked(ms, 300, function () {
      if (!alive()) return;
      const inBand = rand() < 0.72;
      const u = (rand() * 2 - 1) * half;
      const v = inBand ? gauss() * bandW * 0.9 : (rand() * 2 - 1) * half;
      const size = rand() < 0.93 ? 0.5 + rand() * 0.5 : 1 + rand() * 0.8;
      const hue = rand();
      g.fillStyle = hue < 0.82 ? C.light : (hue < 0.93 ? C.star : C.pink);
      g.globalAlpha = (inBand ? 0.25 : 0.18) + rand() * (light ? 0.35 : 0.55);
      g.fillRect(u, v, size, size);
    }, function () {
      seed = 6060;
    }));
    // The faint field stars and a few coloured dust motes, spread over the
    // whole square: the still background that the twinkling stars sit on.
    const field = lite ? 160 : Math.min(900, Math.round(S * S / 1400));
    enqueue(chunked(field, 150, function (i) {
      if (!alive()) return;
      const u = (rand() * 2 - 1) * half, v = (rand() * 2 - 1) * half;
      const dust = i % 12 === 0;
      g.globalAlpha = dust ? 0.16 + rand() * 0.2 : 0.3 + rand() * 0.5;
      g.fillStyle = dust ? (rand() < 0.5 ? C.violet : C.pink) : (rand() < 0.85 ? C.light : C.star);
      const r = dust ? 0.8 + rand() * 0.9 : 0.5 + rand() * 0.5;
      g.beginPath(); g.arc(u, v, r, 0, 6.2832); g.fill();
    }, function () {
      if (!alive()) return;
      g.globalAlpha = 1;
      swap("milky", L.milkyWrap, mw.c);
      requestAnimationFrame(function () { mw.c.classList.add("is-ready"); });
      root.classList.add("is-painted");
    }));
  }

  function paintGalaxy(alive) {
    const size = 256, R = size / 2;
    const c = document.createElement("canvas");
    c.className = "sky-galaxy-disc";
    c.width = size; c.height = size;
    const g = c.getContext("2d");
    if (!g) return;
    enqueue(function () {
    seed = 2718;
    g.globalCompositeOperation = "lighter";
    // A soft core rather than a hot one: text can scroll over this corner,
    // and tools/test/sky.js caught the first version at 1.6:1 under --ink-3.
    const core = g.createRadialGradient(R, R, 0, R, R, R * 0.42);
    core.addColorStop(0, rgba(C.star, 0.42));
    core.addColorStop(0.25, rgba(C.star, 0.16));
    core.addColorStop(0.6, rgba(C.pink, 0.07));
    core.addColorStop(1, rgba(C.pink, 0));
    g.fillStyle = core;
    g.fillRect(0, 0, size, size);
    // The arms are laid over the core normally, not additively: added up,
    // the packed inner points burned the centre to a hot white dot.
    g.globalCompositeOperation = "source-over";
    return true;
    });
    enqueue(chunked(3000, 500, function (i) {
      if (!alive()) return;
      const arm = i < 1500 ? 0 : 1;
      {
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
    }, function () {
      if (!alive()) return;
      g.globalAlpha = 1;
      swap("galaxyDisc", L.galaxyTilt, c);
      const gr = Math.max(46, Math.min(W, window.innerHeight) * 0.14);
      L.galaxy.style.setProperty("--gd", (gr * 2).toFixed(0) + "px");
    }));
  }

  /* ───────── parallax ─────────
     Scroll moves each depth by a different fraction of the scroll, wrapped
     with a modulo against the doubled paint. One rAF per frame, only while
     scrolling. */
  let parQueued = false;
  function parallax() {
    parQueued = false;
    if (!root) return;
    const s = moving() ? (window.scrollY || 0) : 0;
    const set = function (node, depth, wrap) {
      if (!node) return;
      let y = s * depth;
      if (wrap && H) y = y % H;
      node.style.transform = "translate3d(0," + (-y).toFixed(1) + "px,0)";
    };
    set(L.parNear, 0.06, true);
    set(L.parMilky, 0.012, false);
    set(L.parGalaxy, 0.03, false);
  }
  let scrollEnd = null;
  function onScroll() {
    if (!parQueued) { parQueued = true; requestAnimationFrame(parallax); }
    // Pause the sky's animations while scrolling (styles.css), and resume a
    // beat after the page comes to rest. Also read by globe.js.
    const html = document.documentElement;
    if (!html.classList.contains("is-scrolling")) html.classList.add("is-scrolling");
    clearTimeout(scrollEnd);
    scrollEnd = setTimeout(function () { html.classList.remove("is-scrolling"); }, 160);
  }
  let leanQueued = false, lx = 0, ly = 0;
  function onPointer(e) {
    if (!moving()) return;
    lx = (e.clientX / (W || 1) - 0.5) * -18;
    ly = (e.clientY / (window.innerHeight || 1) - 0.5) * -12;
    if (!leanQueued) {
      leanQueued = true;
      requestAnimationFrame(function () {
        leanQueued = false;
        root.style.setProperty("--lx", lx.toFixed(1) + "px");
        root.style.setProperty("--ly", ly.toFixed(1) + "px");
      });
    }
  }

  /* ───────── shooting stars and comets ───────── */
  let shotTimer = null, cometTimer = null;
  function transient(cls, x, y, ang, dist, dur) {
    const node = document.createElement("span");
    node.className = cls;
    node.style.left = x.toFixed(0) + "px";
    node.style.top = y.toFixed(0) + "px";
    node.style.setProperty("--ang", ang.toFixed(1) + "deg");
    node.style.setProperty("--dist", dist.toFixed(0) + "px");
    node.style.animationDuration = dur.toFixed(0) + "ms";
    node.addEventListener("animationend", function () { node.remove(); });
    root.appendChild(node);
  }
  function shoot() {
    shotTimer = setTimeout(shoot, 6000 + Math.random() * 9000);
    if (!moving() || document.hidden || !root) return;
    const left = Math.random() < 0.5;
    transient("sky-shoot", W * (0.1 + Math.random() * 0.8), window.innerHeight * (0.05 + Math.random() * 0.35),
      (left ? 158 : 22) + (Math.random() - 0.5) * 16, W * 0.45, 850 + Math.random() * 300);
  }
  function comet() {
    cometTimer = setTimeout(comet, 30000 + Math.random() * 30000);
    if (!moving() || document.hidden || !root) return;
    const fromLeft = Math.random() < 0.5;
    transient("sky-comet", fromLeft ? -180 : W + 180, window.innerHeight * (0.08 + Math.random() * 0.3),
      (fromLeft ? 12 : 168) + (Math.random() - 0.5) * 10, W + 360, 9000 + Math.random() * 5000);
  }
  function startTimers() {
    if (!moving() || shotTimer) return;
    shotTimer = setTimeout(shoot, 2500);
    cometTimer = setTimeout(comet, 12000 + Math.random() * 10000);
  }
  function stopTimers() {
    clearTimeout(shotTimer); clearTimeout(cometTimer);
    shotTimer = cometTimer = null;
  }

  function setStill(v) {
    still = !!v;
    try { localStorage.setItem("dc-sky", still ? "still" : "moving"); } catch (e) { /* ignore */ }
    document.documentElement.classList.toggle("sky-still", still);
    if (still) {
      stopTimers();
      if (root) { root.style.setProperty("--lx", "0px"); root.style.setProperty("--ly", "0px"); }
    } else startTimers();
    parallax();
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
    if (!C.pink) readColours();
    if (!tracks.length) fxSize();
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
      // Gamma leaves no track of its own: a ring, and the electron it frees.
      addTrack({ x: x, y: y, ring: true, len: 34, w: 1.6, col: C.star, grow: 380, life: 620 });
      addTrack({ x: x, y: y, a: Math.random() * Math.PI * 2, len: 26, w: 1, col: C.star, curl: 0.06, grow: 200, life: 600 });
    } else if (kind === "chain") {
      burst("alpha", x, y);
      setTimeout(function () { burst("beta", x - 40, y + 20); }, 160);
      setTimeout(function () { burst("gamma", x + 44, y + 10); }, 320);
      setTimeout(function () { burst("alpha", x + 10, y + 36); }, 480);
    }
    if (!fxRaf) fxRaf = requestAnimationFrame(fxLoop);
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
  function div(cls, parent) {
    const d = document.createElement("div");
    d.className = cls;
    if (parent) parent.appendChild(d);
    return d;
  }
  /* Controls are wired as soon as the DOM is ready; the sky itself waits
     for the load event and then for idle time, so none of it competes with
     the first paint. Measured: its setup was 30ms of the DOM-ready task at
     phone speed. */
  function wire() {
    document.documentElement.classList.toggle("sky-still", still);
    toggle = document.getElementById("skyToggle");
    if (toggle) {
      paintToggle();
      toggle.addEventListener("click", function () { setStill(!still); });
    }
    const boot = function () { ric(init); };
    if (document.readyState === "complete") boot();
    else window.addEventListener("load", boot, { once: true });
  }
  function init() {
    root = div("sky");
    root.setAttribute("aria-hidden", "true");
    L.parMilky = div("sky-par sky-lean sky-lean-milky", root);
    L.milkyWrap = div("sky-milky-wrap", L.parMilky);
    L.parNear = div("sky-par sky-lean", root);
    L.parGalaxy = div("sky-par", root);
    L.galaxy = div("sky-galaxy sky-lean", L.parGalaxy);
    L.galaxyTilt = div("sky-galaxy-tilt", L.galaxy);
    document.body.insertBefore(root, document.body.firstChild);

    paintAll();
    startTimers();
    parallax();

    window.addEventListener("scroll", onScroll, { passive: true });
    if (finePointer && !reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    let rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        // Height-only changes are the address bar; the paint already covers
        // them. Repaint for a new width, or a height beyond what was painted.
        if (window.innerWidth !== painted || window.innerHeight > H) paintAll();
      }, 200);
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stopTimers(); else startTimers();
    });
    // The theme toggle rewrites data-theme on <html>: repaint in the new colours.
    new MutationObserver(function () { paintAll(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }

  window.DCSpace = {
    burst: function (kind, x, y) { try { burst(kind, x, y); } catch (e) { /* decoration must never break the page */ } },
    still: function () { return still || reduced; },
    setStill: setStill
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire);
  else wire();
})();
