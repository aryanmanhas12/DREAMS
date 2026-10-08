/* Dreams Counsellor — hero globe.
   A wireframe graticule, not a textured earth: the rest of this design speaks in
   hairlines, mono labels and instrument dials, and a glossy 3D planet would be a
   different language. Point size is the real number of programmes indexed in that
   country, so the thing you are looking at is the database, not decoration.

   It is also navigation — drag to spin, tap a country to see its programmes — but
   never the ONLY route to anything: Browse and search reach the same places, which
   is what keeps a <canvas> honest for keyboard and screen-reader users. */

(function () {
  "use strict";

  // Representative centroids. Only concrete countries are plotted — entries filed
  // under "Europe", "Global", "Online" and similar are genuinely multi-country and
  // would be a lie as a single dot.
  const COORDS = {
    UK:          [54.0,   -2.0],
    USA:         [39.0,  -98.0],
    Germany:     [51.0,   10.0],
    Australia:   [-25.0, 133.0],
    Canada:      [56.0, -106.0],
    Netherlands: [52.2,    5.5],
    Sweden:      [62.0,   15.0],
    Switzerland: [46.8,    8.2],
    France:      [46.5,    2.3],
    Ireland:     [53.2,   -8.0],
    Singapore:   [1.35,  103.8],
    "Hong Kong": [22.3,  114.2],
    Japan:       [36.0,  138.0],
    Israel:      [31.0,   35.0],
    Hungary:     [47.2,   19.5],
    Russia:      [61.0,  100.0],
    India:       [21.0,   78.0],
    Czechia:     [49.8,   15.5],
    Italy:       [42.8,   12.5],
    Belgium:     [50.6,    4.6],
    Austria:     [47.6,   14.1],
    Portugal:    [39.5,   -8.0],
    Spain:       [40.2,   -3.7],
    Poland:      [52.0,   19.4],
    Lithuania:   [55.2,   23.9],
    Norway:      [61.0,    9.0],
    Denmark:     [56.0,    9.5],
    "South Korea": [36.5, 127.9],
    China:       [35.0,  104.0],
    Taiwan:      [23.7,  121.0],
    Thailand:    [15.0,  101.0],
    Turkey:      [39.0,   35.0],
    Bangladesh:  [23.7,   90.4],
    "South Africa": [-29.0, 24.5],
    "New Zealand":  [-41.5, 172.5],
    // Regions, plotted as one dot each because that is honest about what they
    // are. They are deliberately NOT counted in the "countries covered" tile —
    // see REGIONS in app.js. Plotted-but-not-counted is fine; the reverse is the
    // bug, and the data check enforces that direction.
    Gulf:        [24.0,   45.0],
    Baltics:     [57.0,   25.0]
  };

  const RAD = Math.PI / 180;
  const HOME = "India"; // the origin point — every route on this site starts here

  function readCssVar(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  /* Gradient stops need per-stop alpha, which globalAlpha cannot give, so the
     token has to be converted rather than used as-is. Every palette token is
     hex, but a computed custom property is not guaranteed to be — if it comes
     back as anything else, fall back to color-mix and let the browser do it.
     (A previous contrast checker on this project broke by assuming hex and
     silently mis-parsing `color(srgb …)`; this one degrades instead.) */
  function withAlpha(c, a) {
    const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(c);
    if (!m) return "color-mix(in srgb, " + c + " " + (a * 100).toFixed(1) + "%, transparent)";
    let h = m[1];
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    const n = parseInt(h, 16);
    return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
  }

  function project(lat, lon, spin, tilt, R, cx, cy) {
    const phi = lat * RAD, lambda = (lon + spin) * RAD;
    const x0 = Math.cos(phi) * Math.sin(lambda);
    const y0 = Math.sin(phi);
    const z0 = Math.cos(phi) * Math.cos(lambda);
    const ct = Math.cos(tilt * RAD), st = Math.sin(tilt * RAD);
    const y = y0 * ct - z0 * st;
    const z = y0 * st + z0 * ct;
    return { x: cx + R * x0, y: cy - R * y, z: z };
  }

  /* opts.autoSpin (default true): the hero globe drifts on its own. The atlas
     globe further down the page does not; it only moves when the reader's
     position asks it to, via focus(). A globe that turns by itself beside text
     that is trying to point at a region would be arguing with the text. */
  window.initGlobe = function initGlobe(canvas, labelEl, onPick, opts) {
    if (!canvas || !canvas.getContext) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    opts = opts || {};
    const autoSpin = opts.autoSpin !== false;
    // The one orchestrated moment on the page: the hero globe arrives turned
    // away over the Atlantic, comes round to India, and each country's dot
    // appears as the turn reaches it, nearest to India first. Off under
    // reduced motion, where the globe simply opens on India.
    let intro = !!opts.intro;
    // The opening (intro.js) names the countries on the canvas as they come
    // round, and leaves room round the sphere for those names.
    const labels = !!opts.labels;
    const margin = opts.margin || 14;

    // Count programmes per country straight from the database.
    const counts = {};
    const all = [].concat(
      window.DB.study || [], window.DB.funding || [], window.DB.research || [],
      window.DB.residency || [], window.DB.equity || []
    );
    all.forEach(function (item) {
      if (COORDS[item.country]) counts[item.country] = (counts[item.country] || 0) + 1;
    });
    const places = Object.keys(counts).map(function (k) {
      return { name: k, lat: COORDS[k][0], lon: COORDS[k][1], n: counts[k] };
    });
    if (!places.length) return null;
    const maxN = Math.max.apply(null, places.map((p) => p.n));

    /* Geometry, computed ONCE. Every coastline and graticule point is stored
       as its unit vector, so projecting it each frame is six multiplications
       against the frame's spin and tilt, where project() costs seven trig
       calls. On a phone-speed CPU (4x throttle) the per-point trig was most
       of what kept the main thread saturated while the globe idled. */
    function vecs(pairs) {
      const v = new Float32Array(pairs.length / 2 * 3);
      for (let i = 0, j = 0; i < pairs.length; i += 2, j += 3) {
        const phi = pairs[i] * RAD, lam = pairs[i + 1] * RAD;
        v[j] = Math.cos(phi) * Math.sin(lam);
        v[j + 1] = Math.sin(phi);
        v[j + 2] = Math.cos(phi) * Math.cos(lam);
      }
      return v;
    }
    const coastLines = ((window.DB && window.DB.coast) || []).map(function (ring) {
      const latlon = [];
      for (let i = 0; i < ring.length; i += 2) latlon.push(ring[i + 1], ring[i]);   // stored lon,lat
      return vecs(latlon);
    });
    const gratLines = [];
    for (let lon = -180; lon < 180; lon += 30) {          // meridians
      const pts = [];
      for (let lat = -90; lat <= 90; lat += 3) pts.push(lat, lon);
      gratLines.push(vecs(pts));
    }
    for (let lat = -60; lat <= 60; lat += 30) {           // parallels
      const pts = [];
      for (let lon = -180; lon <= 180; lon += 3) pts.push(lat, lon);
      gratLines.push(vecs(pts));
    }
    // Trace every line into the current path, near hemisphere only; crossing
    // the limb starts a new sub-path, which is what stops a landmass smearing
    // across the sphere as it rotates.
    function traceLines(lines, cs, ss, ct, st) {
      for (let l = 0; l < lines.length; l++) {
        const v = lines[l];
        let started = false;
        for (let j = 0; j < v.length; j += 3) {
          const a = v[j], y0 = v[j + 1], b = v[j + 2];
          const x = a * cs + b * ss;
          const z0 = b * cs - a * ss;
          const z = y0 * st + z0 * ct;
          if (z > 0) {
            const X = cx + R * x, Y = cy - R * (y0 * ct - z0 * st);
            if (started) ctx.lineTo(X, Y); else ctx.moveTo(X, Y);
            started = true;
          } else started = false;
        }
      }
    }

    /* Colours are read from the tokens once and cached, not eight
       getComputedStyle calls per frame; a theme change clears the cache. */
    let pal = null;
    function palette() {
      if (pal) return pal;
      const accent = readCssVar("--globe", readCssVar("--accent", "#B79BFF"));
      pal = {
        accent: accent,
        // Programme dots are the stars on this globe: yellow on space, violet
        // on the daylight theme.
        star: readCssVar("--star", accent),
        ink: readCssVar("--ink", "#0D1E24"),
        // India, where the reader is standing, is marked in the pink fill,
        // the same disc the app icon puts there. It must never borrow
        // --signal, which on this site means a deadline and nothing else.
        home: readCssVar("--fill", "#FF4FA8"),
        homeRim: readCssVar("--on-fill", "#1A0414"),
        line: readCssVar("--line", "#C9CFC9"),
        paper: readCssVar("--paper", "#0F0A26")
      };
      return pal;
    }
    new MutationObserver(function () { pal = null; if (!raf && !wait) draw(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Opens centred on India — the origin every route on this site starts from —
    // then drifts outward, which is the argument the page is making.
    let spin = -COORDS[HOME][1], tilt = 12;
    let dragging = false, lastX = 0, lastY = 0, idleAt = 0, hovered = null;
    let W = 0, H = 0, R = 0, cx = 0, cy = 0, dpr = 1;
    // raf is the next animation frame; wait is the timer that paces the idle
    // spin. At most one of them is pending at a time.
    let raf = null, wait = null, running = false;
    // Where focus() is steering to, and which dots belong to the region being
    // read about. Dots outside it are dimmed, never hidden: the rest of the
    // world is still there, it is just not the subject of this paragraph.
    let target = null, focusSet = null;

    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) intro = false;
    let introStart = 0;
    const homeLon = COORDS[HOME][1], homeLat = COORDS[HOME][0];
    // How far round the world each place is from India, 0 to 1, which sets
    // when its dot arrives during the intro.
    places.forEach(function (pl) {
      const d = Math.abs(((pl.lon - homeLon + 540) % 360) - 180) + Math.abs(pl.lat - homeLat) * 0.5;
      pl.delay = Math.min(1, d / 200);
    });
    if (intro) { spin = -homeLon + 150; tilt = -6; target = { spin: -homeLon, tilt: 12 }; }

    function resize() {
      // The layout size, not getBoundingClientRect: the opening's globe is
      // measured while its wrapper is still scaled down for the gate, and
      // the transformed box drew it at 84% resolution, stretched.
      const cw = canvas.clientWidth, ch = canvas.clientHeight;
      if (!cw) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cw; H = ch;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(W, H) / 2 - margin;
      cx = W / 2; cy = H / 2;
      labelPx = Math.max(10.5, Math.min(14, R / 12));
      widths = {};
    }

    /* ───── the opening's turn ─────
       intro.js asks for one scripted revolution that ends on India. Each
       country lights as it crosses the middle of the globe, so the lights
       arrive in the order the world turns, and the times are worked out in
       advance (plan) so the music can put a note on each one exactly. */
    let show = null, labelPx = 12, widths = {};
    function easeIO(k) { return (1 - Math.cos(Math.PI * k)) / 2; }
    function showPlan(o) {
      const s0 = o.from, turn = o.turn;
      return places.map(function (pl) {
        // the first spin at or after the start where lon + spin is a whole turn
        const sc = -pl.lon + 360 * Math.ceil((s0 + pl.lon) / 360);
        const f = Math.max(0, Math.min(1, (sc - s0) / turn));
        return { name: pl.name, t: o.delay + o.dur * Math.acos(1 - 2 * f) / Math.PI };
      }).sort(function (a, b) { return a.t - b.t; });
    }
    function showActive(now) {
      return !!(show && show.t0 && (!show.landedAt || now - show.landedAt < 2600));
    }
    function showStep(now) {
      const o = show.o, t = now - show.t0;
      const k = Math.max(0, Math.min(1, (t - o.delay) / o.dur));
      const e = easeIO(k);
      spin = o.from + o.turn * e;
      tilt = o.tilt[0] + (o.tilt[1] - o.tilt[0]) * e;
      places.forEach(function (pl) {
        if (pl.litAt || pl.lightT == null || t < pl.lightT) return;
        pl.litAt = now;
        if (show.hooks.light) show.hooks.light(pl);
      });
      if (k >= 1 && !show.landedAt) {
        show.landedAt = now;
        if (show.hooks.land) show.hooks.land();
      }
    }

    function draw() {
      if (!R) return;
      const P = palette();
      const accent = P.accent, starC = P.star, ink = P.ink, home = P.home, homeRim = P.homeRim, line = P.line;
      const sr = spin * RAD, tr = tilt * RAD;
      const cs = Math.cos(sr), ss = Math.sin(sr), ct = Math.cos(tr), st = Math.sin(tr);

      ctx.clearRect(0, 0, W, H);

      // Atmosphere: a thin violet haze just outside the limb, so the globe
      // reads as a planet hanging in the sky behind it. It ends at R + 12,
      // inside the 14px margin size() leaves, because a gradient cut off by
      // the canvas edge before it reaches zero paints a hard square (it did,
      // once, at R * 1.2).
      const halo = ctx.createRadialGradient(cx, cy, R * 0.96, cx, cy, R + 12);
      halo.addColorStop(0, withAlpha(accent, 0.28));
      halo.addColorStop(1, withAlpha(accent, 0));
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R + 12, 0, Math.PI * 2);
      ctx.fill();

      // A planet hides the stars behind it: fill the disc with the page's own
      // ground first, so the Milky Way does not show through the globe.
      ctx.fillStyle = withAlpha(P.paper, 0.94);
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Body: a barely-there fill so the near hemisphere is a surface the
      // graticule sits on, offset towards the upper left as if lit from there.
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, withAlpha(accent, 0.1));
      body.addColorStop(1, withAlpha(accent, 0.02));
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Limb — the sphere's silhouette.
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Coastlines first, so the graticule reads as an overlay on the land
      // rather than the land floating on a grid.
      if (coastLines.length) {
        ctx.strokeStyle = ink;
        ctx.globalAlpha = 0.34;
        ctx.lineWidth = 0.9;
        ctx.lineJoin = "round";
        ctx.beginPath();
        traceLines(coastLines, cs, ss, ct, st);
        ctx.stroke();
      }

      // Graticule, near hemisphere only so the sphere reads as solid without
      // shading. One path and one stroke for all seventeen lines.
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.16;
      ctx.lineWidth = 1;
      ctx.beginPath();
      traceLines(gratLines, cs, ss, ct, st);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Points, far-to-near so nearer ones overlap correctly.
      const drawn = places.map(function (pl) {
        const p = project(pl.lat, pl.lon, spin, tilt, R, cx, cy);
        return { pl: pl, p: p };
      }).filter((d) => d.p.z > -0.05).sort((a, b) => a.p.z - b.p.z);

      const nowMs = performance.now();
      drawn.forEach(function (d) {
        const isHome = d.pl.name === HOME;
        const isHover = hovered && hovered.name === d.pl.name;
        const outside = focusSet && !focusSet.has(d.pl.name);
        // Radius carries the count; depth only fades opacity.
        let r = 2.2 + (d.pl.n / maxN) * 4.6;
        const depth = Math.max(0, Math.min(1, d.p.z));
        // The opening: a country not yet reached is a faint point, and one
        // that has just been reached pops, with a ring that spreads and fades.
        if (show) {
          if (!d.pl.litAt) {
            ctx.globalAlpha = 0.18 + depth * 0.22;
            ctx.beginPath();
            ctx.arc(d.p.x, d.p.y, 1.6, 0, Math.PI * 2);
            ctx.fillStyle = starC;
            ctx.fill();
            return;
          }
          const age = nowMs - d.pl.litAt;
          if (age < 520) {
            const k = age / 520;
            r *= 1 + 1.4 * (1 - k) * (1 - k);
            ctx.globalAlpha = (1 - k) * 0.7 * (0.4 + depth * 0.6);
            ctx.beginPath();
            ctx.arc(d.p.x, d.p.y, r + 3 + k * 16, 0, Math.PI * 2);
            ctx.strokeStyle = isHome ? home : starC;
            ctx.lineWidth = 1.4;
            ctx.stroke();
          }
        }
        let arrive = 1;
        if (intro) {
          const t = (performance.now() - introStart) / 1100 - d.pl.delay * 0.7;
          arrive = Math.max(0, Math.min(1, t / 0.3));
        }
        ctx.globalAlpha = (0.25 + depth * 0.75) * (outside ? 0.28 : 1) * arrive;
        if (arrive === 0) return;

        if (isHome) {
          ctx.beginPath();
          ctx.arc(d.p.x, d.p.y, r + 4.5, 0, Math.PI * 2);
          ctx.strokeStyle = ink;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(d.p.x, d.p.y, isHover ? r + 1.6 : r, 0, Math.PI * 2);
        ctx.fillStyle = isHome ? home : starC;
        ctx.fill();
        if (isHome) {
          ctx.strokeStyle = homeRim;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        if (isHover) {
          ctx.beginPath();
          ctx.arc(d.p.x, d.p.y, r + 6, 0, Math.PI * 2);
          ctx.strokeStyle = ink;
          ctx.globalAlpha = 0.5;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;

      if (show && show.landedAt) drawPulse(nowMs, P);
      if (labels) drawLabels(drawn, P);
    }

    // India answering the landing: three rings, in the pink that marks it.
    function drawPulse(nowMs, P) {
      const pl = places.find(function (x) { return x.name === HOME; });
      if (!pl) return;
      const p = project(pl.lat, pl.lon, spin, tilt, R, cx, cy);
      for (let i = 0; i < 3; i++) {
        const k = (nowMs - show.landedAt - i * 320) / 1200;
        if (k <= 0 || k >= 1) continue;
        ctx.globalAlpha = (1 - k) * 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8 + k * R * 0.42, 0, Math.PI * 2);
        ctx.strokeStyle = P.home;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    /* Names beside the lit countries on the near side. Europe alone puts
       eighteen within a thumb's width of each other, so names are placed
       greedily, India first and then by how many programmes each country
       has, on the right of the dot or else the left, and a name with no room
       fades out rather than landing on another. Each name eases towards
       shown or hidden, so one that loses its place does not flicker. */
    function textWidth(s) {
      if (widths[s] == null) widths[s] = ctx.measureText(s).width;
      return widths[s];
    }
    function drawLabels(drawn, P) {
      const boxes = [];
      const font = '600 ' + labelPx.toFixed(1) + 'px "IBM Plex Sans", system-ui, sans-serif';
      ctx.font = font;
      ctx.textBaseline = "middle";
      const h = labelPx * 1.25;
      const order = drawn.filter(function (d) { return d.pl.litAt || !show; })
        .sort(function (a, b) {
          if (a.pl.name === HOME) return -1;
          if (b.pl.name === HOME) return 1;
          return b.pl.n - a.pl.n;
        });
      order.forEach(function (d) {
        const pl = d.pl, z = d.p.z;
        const r = 2.2 + (pl.n / maxN) * 4.6;
        const w = textWidth(pl.name);
        let want = 0;
        if (z > 0.22) {
          const tries = [d.p.x + r + 5, d.p.x - r - 5 - w];
          for (let i = 0; i < 2; i++) {
            const x = tries[i];
            if (x < 2 || x + w > W - 2) continue;
            const box = [x - 2, d.p.y - h / 2, x + w + 2, d.p.y + h / 2];
            if (boxes.some(function (b) { return box[0] < b[2] && box[2] > b[0] && box[1] < b[3] && box[3] > b[1]; })) continue;
            boxes.push(box);
            pl.side = i;
            want = 1;
            break;
          }
        }
        pl.la = (pl.la || 0) + (want - (pl.la || 0)) * 0.22;
        if (pl.la < 0.03) return;
        const x = pl.side ? d.p.x - r - 5 - w : d.p.x + r + 5;
        // A name still fading out keeps its room until it has gone, or the
        // next name down the list is printed straight over it.
        if (!want) boxes.push([x - 2, d.p.y - h / 2, x + w + 2, d.p.y + h / 2]);
        ctx.globalAlpha = pl.la * Math.max(0, Math.min(1, (z - 0.12) / 0.3));
        ctx.lineJoin = "round";
        ctx.lineWidth = 3;
        ctx.strokeStyle = P.paper;
        ctx.strokeText(pl.name, x, d.p.y);
        ctx.fillStyle = P.ink;
        ctx.fillText(pl.name, x, d.p.y);
      });
      ctx.globalAlpha = 1;
    }

    // Shortest way round, so a turn from Australia to the UK goes west rather
    // than all the way east.
    function angleDelta(from, to) {
      return ((to - from + 540) % 360 + 360) % 360 - 180;
    }

    let lastTick = 0;
    function tick(now) {
      raf = null;
      if (!running) return;
      now = now || performance.now();
      const dtms = lastTick ? Math.min(64, now - lastTick) : 16.7;
      lastTick = now;
      if (intro && !introStart) introStart = performance.now();
      if (intro && performance.now() - introStart > 2000) intro = false;
      const showing = showActive(now);
      if (show && show.t0) showStep(now);
      if (showing) {
        // the opening steers the globe itself; nothing else moves it
      } else if (target && !dragging) {
        const ds = angleDelta(spin, target.spin), dt = target.tilt - tilt;
        spin += ds * 0.075;
        tilt += dt * 0.075;
        if (Math.abs(ds) < 0.05 && Math.abs(dt) < 0.05) { spin = target.spin; tilt = target.tilt; target = null; idleAt = Date.now(); }
      } else if (autoSpin && !dragging && !reduced && Date.now() - idleAt > 1800 &&
                 !document.documentElement.classList.contains("is-scrolling")) {
        // The world keeps turning when nobody is holding it — but stays where
        // you put it for a beat after you let go. Time-based, so the speed is
        // the same whatever the frame rate.
        spin += 0.0072 * dtms;
      }
      // While the ONLY motion is the slow idle spin, 30 frames a second looks
      // identical and halves the cost. Easing, dragging and the intro draw
      // every frame, because those answer the reader.
      const idleOnly = !target && !dragging && !intro && !showing;
      // And while the page is scrolling (space.js sets html.is-scrolling),
      // the idle spin holds still, so the frame goes to the scroll.
      const scrolling = document.documentElement.classList.contains("is-scrolling");
      if (!idleOnly || !scrolling) draw();
      // A globe without auto-spin draws only while it has somewhere to go,
      // so the atlas costs nothing once it has arrived.
      if (!(autoSpin || target || dragging || intro || showing)) return;
      // The 30fps idle spin waits on a timer, not on every animation frame.
      // Asking for a frame and then skipping the draw still costs a full
      // main-thread frame (style, animations, lifecycle): measured at 4x CPU
      // with the hero on screen, that was about 270ms in every 4s for frames
      // that drew nothing. kick() cancels the wait the moment the reader grabs
      // the globe, so a drag still answers on the next frame.
      if (idleOnly) wait = setTimeout(function () { wait = null; if (running) raf = requestAnimationFrame(tick); }, 25);
      else raf = requestAnimationFrame(tick);
    }

    function kick() {
      if (!running || raf) return;
      if (wait) { clearTimeout(wait); wait = null; }
      raf = requestAnimationFrame(tick);
    }

    function hitTest(mx, my) {
      let best = null, bestD = 16 * 16;
      places.forEach(function (pl) {
        const p = project(pl.lat, pl.lon, spin, tilt, R, cx, cy);
        if (p.z <= 0) return;
        const dx = p.x - mx, dy = p.y - my, d = dx * dx + dy * dy;
        if (d < bestD) { bestD = d; best = pl; }
      });
      return best;
    }

    function setLabel(pl) {
      if (!labelEl) return;
      labelEl.textContent = pl
        ? pl.name + ": " + pl.n + " programme" + (pl.n === 1 ? "" : "s")
        : "Drag to spin, or tap a country";
      labelEl.classList.toggle("is-active", !!pl);
    }

    function localPoint(e) {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    canvas.addEventListener("pointerdown", function (e) {
      dragging = true; lastX = e.clientX; lastY = e.clientY;
      target = null;           // a hand on the globe outranks the page steering it
      canvas.setPointerCapture(e.pointerId);
      canvas.classList.add("is-grabbing");
      kick();
    });

    canvas.addEventListener("pointermove", function (e) {
      const pt = localPoint(e);
      if (dragging) {
        spin += (e.clientX - lastX) * 0.45;
        tilt = Math.max(-70, Math.min(70, tilt + (e.clientY - lastY) * -0.3));
        lastX = e.clientX; lastY = e.clientY;
        idleAt = Date.now();
        if (!raf && !wait) draw();
      } else {
        const hit = hitTest(pt.x, pt.y);
        if ((hit && hit.name) !== (hovered && hovered.name)) {
          hovered = hit;
          setLabel(hit);
          canvas.style.cursor = hit ? "pointer" : "grab";
          if (!raf && !wait) draw();
        }
      }
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      idleAt = Date.now();
      canvas.classList.remove("is-grabbing");
      try { canvas.releasePointerCapture(e.pointerId); } catch (err) { /* already released */ }
    }
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("pointerleave", function () {
      if (dragging) return;
      hovered = null; setLabel(null);
      if (!raf && !wait) draw();
    });

    canvas.addEventListener("click", function (e) {
      const pt = localPoint(e);
      const hit = hitTest(pt.x, pt.y);
      if (hit && typeof onPick === "function") onPick(hit.name);
    });

    // Touch: a tap should select, but a drag should not also fire a pick.
    let touchMoved = false;
    canvas.addEventListener("touchstart", function () { touchMoved = false; }, { passive: true });
    canvas.addEventListener("touchmove", function () { touchMoved = true; }, { passive: true });
    canvas.addEventListener("touchend", function (e) {
      if (touchMoved) return;
      const t = e.changedTouches && e.changedTouches[0];
      if (!t) return;
      const r = canvas.getBoundingClientRect();
      const hit = hitTest(t.clientX - r.left, t.clientY - r.top);
      if (hit) { hovered = hit; setLabel(hit); draw(); }
    }, { passive: true });

    window.addEventListener("resize", function () { resize(); draw(); });

    // Only animate while the hero is actually on screen.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        const visible = entries.some((en) => en.isIntersecting);
        if (visible && !running) { running = true; kick(); }
        else if (!visible && running) {
          running = false;
          if (raf) cancelAnimationFrame(raf);
          if (wait) clearTimeout(wait);
          raf = wait = null;
        }
      }, { threshold: 0.05 }).observe(canvas);
    } else {
      running = true; kick();
    }

    resize();
    setLabel(null);
    draw();
    if (!running) { running = true; kick(); }

    return {
      redraw: function () { resize(); draw(); },
      countries: places.length,
      /* The opening. plan(o) says when each country will light for a turn
         of o.turn degrees from spin o.from over o.dur ms (after o.delay),
         and poses the globe at its first frame, every country faint.
         play(times, hooks) starts it: times maps a name to the ms it lights
         (the plan, as intro.js quantised it to the music's grid). */
      plan: function (o) {
        show = { o: o, hooks: {} };
        spin = o.from; tilt = o.tilt[0]; target = null;
        draw();
        return showPlan(o);
      },
      play: function (times, hooks) {
        if (!show) return;
        places.forEach(function (pl) { pl.lightT = times[pl.name]; pl.litAt = 0; });
        show.hooks = hooks || {};
        show.t0 = performance.now();
        running = true;
        kick();
      },
      // Where a country is on the canvas right now, for effects drawn over it.
      where: function (name) {
        const pl = places.find(function (x) { return x.name === name; });
        if (!pl) return null;
        const p = project(pl.lat, pl.lon, spin, tilt, R, cx, cy);
        return { x: p.x, y: p.y, front: p.z > 0 };
      },
      stop: function () {
        running = false;
        if (raf) cancelAnimationFrame(raf);
        if (wait) clearTimeout(wait);
        raf = wait = null;
      },
      /* Turn to a point and pick out the countries a passage is about. Under
         reduced motion it cuts straight there: the information is the same,
         only the journey is dropped. */
      focus: function (lat, lon, names) {
        focusSet = names && names.length ? new Set(names) : null;
        const t = { spin: -lon, tilt: Math.max(-55, Math.min(55, lat * 0.85)) };
        if (reduced || !running) { spin = t.spin; tilt = t.tilt; target = null; draw(); return; }
        target = t;
        kick();
      }
    };
  };
})();
