/* Dream Counsellor — hero globe.
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

  window.initGlobe = function initGlobe(canvas, labelEl, onPick) {
    if (!canvas || !canvas.getContext) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

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

    // Opens centred on India — the origin every route on this site starts from —
    // then drifts outward, which is the argument the page is making.
    let spin = -COORDS[HOME][1], tilt = 12;
    let dragging = false, lastX = 0, lastY = 0, idleAt = 0, hovered = null;
    let W = 0, H = 0, R = 0, cx = 0, cy = 0, dpr = 1;
    let raf = null, running = false;

    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(W, H) / 2 - 14;
      cx = W / 2; cy = H / 2;
    }

    function draw() {
      if (!R) return;
      const accent = readCssVar("--accent", "#0E6B70");
      const ink = readCssVar("--ink", "#0D1E24");
      const signal = readCssVar("--signal", "#B32450");
      const line = readCssVar("--line", "#C9CFC9");

      ctx.clearRect(0, 0, W, H);

      // Atmosphere. A sphere drawn as pure wireframe sits flat on the page; a
      // faint halo just outside the limb is what gives it air around it and
      // reads as a planet rather than a diagram. Two stops only, both weak — the
      // moment this is visible as a ring it looks like a glow effect.
      const halo = ctx.createRadialGradient(cx, cy, R * 0.86, cx, cy, R * 1.2);
      halo.addColorStop(0, withAlpha(accent, 0.16));
      halo.addColorStop(0.55, withAlpha(accent, 0.06));
      halo.addColorStop(1, withAlpha(accent, 0));
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.2, 0, Math.PI * 2);
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
      // rather than the land floating on a grid. Each ring is stroked only
      // where it faces us; crossing the limb starts a new sub-path, which is
      // what stops a landmass smearing across the sphere as it rotates.
      const coast = window.DB && window.DB.coast;
      if (coast) {
        ctx.strokeStyle = ink;
        ctx.globalAlpha = 0.34;
        ctx.lineWidth = 0.9;
        ctx.lineJoin = "round";
        ctx.beginPath();
        for (let r = 0; r < coast.length; r++) {
          const ring = coast[r];
          let started = false;
          for (let i = 0; i < ring.length; i += 2) {
            const p = project(ring[i + 1], ring[i], spin, tilt, R, cx, cy);
            if (p.z > 0) {
              if (started) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y);
              started = true;
            } else started = false;
          }
        }
        ctx.stroke();
      }

      // Graticule. Only the near hemisphere is stroked, so the sphere reads as
      // solid without any shading.
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.16;
      ctx.lineWidth = 1;

      for (let lon = -180; lon < 180; lon += 30) {       // meridians
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 3) {
          const p = project(lat, lon, spin, tilt, R, cx, cy);
          if (p.z > 0) { started ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); started = true; }
          else started = false;
        }
        ctx.stroke();
      }
      for (let lat = -60; lat <= 60; lat += 30) {        // parallels
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 3) {
          const p = project(lat, lon, spin, tilt, R, cx, cy);
          if (p.z > 0) { started ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); started = true; }
          else started = false;
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Points, far-to-near so nearer ones overlap correctly.
      const drawn = places.map(function (pl) {
        const p = project(pl.lat, pl.lon, spin, tilt, R, cx, cy);
        return { pl: pl, p: p };
      }).filter((d) => d.p.z > -0.05).sort((a, b) => a.p.z - b.p.z);

      drawn.forEach(function (d) {
        const isHome = d.pl.name === HOME;
        const isHover = hovered && hovered.name === d.pl.name;
        // Radius carries the count; depth only fades opacity.
        const r = 2.2 + (d.pl.n / maxN) * 4.6;
        const depth = Math.max(0, Math.min(1, d.p.z));
        ctx.globalAlpha = 0.25 + depth * 0.75;

        if (isHome) {
          ctx.beginPath();
          ctx.arc(d.p.x, d.p.y, r + 4.5, 0, Math.PI * 2);
          ctx.strokeStyle = signal;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(d.p.x, d.p.y, isHover ? r + 1.6 : r, 0, Math.PI * 2);
        ctx.fillStyle = isHome ? signal : accent;
        ctx.fill();

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
    }

    function tick() {
      if (!running) return;
      // The world keeps turning when nobody is holding it — but stays where you
      // put it for a beat after you let go.
      if (!dragging && !reduced && Date.now() - idleAt > 1800) spin += 0.12;
      draw();
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
        ? pl.name + " · " + pl.n + " programme" + (pl.n === 1 ? "" : "s")
        : "Drag to spin · tap a country";
      labelEl.classList.toggle("is-active", !!pl);
    }

    function localPoint(e) {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    canvas.addEventListener("pointerdown", function (e) {
      dragging = true; lastX = e.clientX; lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.classList.add("is-grabbing");
    });

    canvas.addEventListener("pointermove", function (e) {
      const pt = localPoint(e);
      if (dragging) {
        spin += (e.clientX - lastX) * 0.45;
        tilt = Math.max(-70, Math.min(70, tilt + (e.clientY - lastY) * -0.3));
        lastX = e.clientX; lastY = e.clientY;
        idleAt = Date.now();
        if (reduced) draw();
      } else {
        const hit = hitTest(pt.x, pt.y);
        if ((hit && hit.name) !== (hovered && hovered.name)) {
          hovered = hit;
          setLabel(hit);
          canvas.style.cursor = hit ? "pointer" : "grab";
          if (reduced) draw();
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
      if (reduced) draw();
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
        if (visible && !running) { running = true; raf = requestAnimationFrame(tick); }
        else if (!visible && running) { running = false; if (raf) cancelAnimationFrame(raf); }
      }, { threshold: 0.05 }).observe(canvas);
    } else {
      running = true; raf = requestAnimationFrame(tick);
    }

    resize();
    setLabel(null);
    draw();
    if (!running) { running = true; raf = requestAnimationFrame(tick); }

    return {
      redraw: function () { resize(); draw(); },
      countries: places.length
    };
  };
})();
