/* ══════════════════════════════════════════════════════════════
   Ooh, the guide Dreams Counselor shares with Ronak and Arun
   ──────────────────────────────────────────────────────────────
   Ooh is drawn by ooh.js (the sister apps' ooh.mjs as a plain script),
   speaks in the same bubble, and makes the same sounds: the CC0 "soft"
   pack of uisfx (assets/sounds/LICENSE.txt). This file is a port of
   Ronak's companion.js, cut down to what this site needs and fitted to
   its rules:

   · Ooh speaks IN the page, under a view's heading, never floating over
     it. A few lines the first time a view is opened on this device, one
     line on every visit after, and it stays until tapped away. Tucked
     away, Ooh waits in the corner; a tap there brings the line back.
   · Ooh narrates the page it is on. It is a fixed script, not an AI
     chatbot, and nothing it says implies anyone is watching or waiting.
   · No corner Ooh during the questions: there, Ooh asks them itself.
   · Every line is 120 characters or fewer and has no em dashes, the
     same rule the sister apps check.

   SOUNDS. One speaker decides everything: they play only while the
   galaxy sound is on (window.DCSound.isOn()), so the speaker button in
   the top bar silences the lot. The AudioContext is created after a tap
   has painted, never inside it (sound.js measured why), and a sound
   whose file has not arrived yet is skipped: a late click is worse than
   none. Taps that already answer with a galaxy effect (an answer, Continue,
   saving a card) are left to it, so no tap ever makes two sounds. Over
   file:// a browser refuses to fetch the files, so Ooh is silent there.

   MOTION. Ooh's idle bob is a transform on an HTML wrapper and the blink
   is one class for 130ms every few seconds: animating groups inside an
   SVG makes Chrome repaint the drawing on the main thread every frame
   (Ronak measured ~300ms per 4s on a throttled phone). The typewriter,
   the bob and the blink all stop under reduced motion and html.lite, and
   the bob pauses with the rest of the sky under html.sky-still.
   ══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  if (window.Ooh) return;

  const ME = document.currentScript && document.currentScript.src;
  const BASE = ME ? new URL(".", ME).href : "assets/";
  const root = document.documentElement;
  const REDUCED = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const instant = function () { return REDUCED || root.classList.contains("lite"); };

  function readJSON(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }
  function writeJSON(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  const KEY = "dc-ooh";
  const pref = Object.assign({ on: true, seen: {} }, readJSON(KEY, {}));
  function savePref() { writeJSON(KEY, pref); }
  function tuckedThisVisit(k) { try { return sessionStorage.getItem("dc-ooh-tuck-" + k) === "1"; } catch (e) { return false; } }
  function markTucked(k) { try { sessionStorage.setItem("dc-ooh-tuck-" + k, "1"); } catch (e) { /* ignore */ } }
  root.classList.toggle("ooh-off", !pref.on);

  /* ══════════════ sounds ══════════════ */
  const CORE = ["press", "select", "typing", "forward", "back", "open", "close", "progress-step", "wake"];
  const REST = ["toggle-on", "toggle-off", "expand", "collapse", "check", "success", "delete", "complete"];
  // Ronak's levels: the typing blip is the quietest, because it repeats.
  const VOL = { typing: 0.16, press: 0.3, select: 0.38, wake: 0.3, complete: 0.3 };
  let actx = null, starting = false;
  const bufs = {}, loading = {};
  function wanted() { return !window.DCSound || window.DCSound.isOn(); }
  function startAudio() {
    if (actx || starting || !wanted() || location.protocol === "file:") return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    starting = true;
    // After the tap has painted, like sound.js: creating a context inside the
    // handler put tens of milliseconds in front of the tap's next frame.
    requestAnimationFrame(function () {
      setTimeout(function () {
        starting = false;
        if (actx) return;
        try { if (navigator.audioSession) navigator.audioSession.type = "ambient"; } catch (e) { /* older Safari */ }
        try { actx = new AC({ latencyHint: "interactive" }); } catch (e) { actx = null; return; }
        CORE.forEach(fetchBuf);
        const later = function () { REST.forEach(fetchBuf); };
        if (window.requestIdleCallback) requestIdleCallback(later, { timeout: 4000 }); else setTimeout(later, 1500);
      }, 0);
    });
  }
  function fetchBuf(n) {
    if (!actx || bufs[n] || loading[n]) return;
    loading[n] = true;
    fetch(BASE + "sounds/" + n + ".mp3?v=1")
      .then(function (r) { return r.ok ? r.arrayBuffer() : Promise.reject(r.status); })
      .then(function (a) { return new Promise(function (ok, no) { actx.decodeAudioData(a, ok, no); }); })
      .then(function (b) { bufs[n] = b; })
      .catch(function () { loading[n] = false; });
  }
  function play(n, rate) {
    if (!wanted() || !actx) return;
    const b = bufs[n];
    if (!b) { fetchBuf(n); return; }
    if (actx.state === "suspended") actx.resume().catch(function () {});
    try {
      const src = actx.createBufferSource(), g = actx.createGain();
      src.buffer = b;
      if (rate) src.playbackRate.value = rate;
      g.gain.value = VOL[n] || 0.32;
      src.connect(g); g.connect(actx.destination); src.start();
    } catch (e) { /* a sound is never worth an error */ }
  }
  ["pointerdown", "keydown", "touchend", "click"].forEach(function (t) {
    document.addEventListener(t, function () {
      if (actx) { if (actx.state === "suspended" && wanted()) actx.resume().catch(function () {}); return; }
      startAudio();
    }, { capture: true, passive: true });
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && actx && actx.state === "running") actx.suspend().catch(function () {});
  });

  /* Taps: the uisfx cue for whatever was pressed. Anything that already
     answers with a galaxy effect is skipped, so no tap makes two sounds. */
  const OWN_SOUND = ".opt, #nextBtn, .star-btn, #soundToggle, #intro, .ooh-say, .ooh-x, .ooh-me";
  document.addEventListener("click", function (e) {
    const t = e.target && e.target.closest && e.target.closest("button, a, summary, [role=button]");
    if (!t || t.closest(OWN_SOUND)) return;
    const href = t.getAttribute("href") || "";
    if (/^(tel|mailto):/.test(href)) return;   // a phone number is serious; it makes no sound
    if (t.matches(".want-chip")) { play("select"); return; }
    if (t.id === "navToggle") { play(t.getAttribute("aria-expanded") === "true" ? "close" : "open"); return; }
    if (t.matches("summary")) { play(t.parentElement && t.parentElement.open ? "collapse" : "expand"); return; }
    if (t.hasAttribute("aria-pressed")) { play(t.getAttribute("aria-pressed") === "true" ? "toggle-off" : "toggle-on"); return; }
    if (t.id === "backBtn" || t.id === "redoBtn") { play("back"); return; }
    if (t.id === "copyPlanBtn" || t.id === "icsBtn") { play("success"); return; }
    if (t.matches("[data-goto]")) { play(t.getAttribute("data-goto") === "intro" ? "back" : "forward"); return; }
    if (t.matches("a[href]")) { play("forward"); return; }
    play("press");
  }, true);

  /* ══════════════ drawing ══════════════ */
  function figure(mood, size) {
    const art = window.OohArt;
    return '<span class="ooh-bobw"><span class="ooh-talkw">' +
      (art ? art.oohSvg({ mood: mood || "hello", size: size || 66 }) : "") + "</span></span>";
  }
  let blinkT = null;
  function blinkLoop() {
    clearTimeout(blinkT);
    if (instant()) return;
    blinkT = setTimeout(function () {
      if (!document.hidden) {
        document.querySelectorAll(".ooh-svg").forEach(function (s) {
          if (!s.querySelector(".ooh-blink")) return;
          s.classList.add("blink");
          setTimeout(function () { s.classList.remove("blink"); }, 130);
        });
      }
      blinkLoop();
    }, 2800 + Math.random() * 3600);
  }

  /* ══════════════ the typewriter ══════════════
     type(typedEl, restEl, text, mood, figEl, done): the text is in the DOM
     from the first frame (typed + rest), so nothing moves as it types and a
     screen reader is never handed half a sentence. */
  const SEG = (window.Intl && Intl.Segmenter) ? new Intl.Segmenter(undefined, { granularity: "grapheme" }) : null;
  const graphemes = function (s) { return SEG ? Array.from(SEG.segment(s), function (x) { return x.segment; }) : Array.from(s); };
  const PITCH = { hello: 1.1, ooh: 1.18, happy: 1.14, calm: 0.92, listen: 0.98, care: 0.88, think: 0.96, sleepy: 0.82 };
  function type(typedEl, restEl, text, mood, figEl, done, quick) {
    const run = { timer: null, finished: false };
    const finish = function () {
      if (run.finished) return;
      run.finished = true;
      clearTimeout(run.timer);
      typedEl.textContent = text; restEl.textContent = "";
      if (figEl) figEl.classList.remove("ooh-talking");
      if (done) done();
    };
    run.finish = finish;
    if (instant()) { finish(); return run; }
    const parts = graphemes(text);
    let n = 0;
    typedEl.textContent = ""; restEl.textContent = text;
    if (figEl) figEl.classList.add("ooh-talking");
    const talkW = figEl && figEl.querySelector(".ooh-talkw");
    const tick = function () {
      if (n >= parts.length) { finish(); return; }
      const g = parts[n++];
      typedEl.textContent += g;
      restEl.textContent = parts.slice(n).join("");
      let wait = quick ? 14 : 26;
      if (/[.!?]/.test(g)) wait = quick ? 110 : 200; else if (/[,;:]/.test(g)) wait = quick ? 50 : 110;
      if (n % 3 === 1 && /\S/.test(g)) {
        play("typing", (PITCH[mood] || 1) * (0.95 + Math.random() * 0.1));
        if (talkW) { talkW.classList.remove("nod"); void talkW.offsetWidth; talkW.classList.add("nod"); }
      }
      run.timer = setTimeout(tick, wait);
    };
    run.timer = setTimeout(tick, 0);
    return run;
  }

  /* ══════════════ one bubble ══════════════ */
  function makeBubble() {
    const b = document.createElement("div");
    b.className = "ooh-bubble";
    b.innerHTML =
      '<button type="button" class="ooh-say"><span class="ooh-name" aria-hidden="true" translate="no">Ooh</span>' +
      '<span class="ooh-text"><span class="ooh-typed"></span><span class="ooh-rest" aria-hidden="true"></span></span>' +
      '<span class="ooh-next"></span></button>' +
      '<button type="button" class="ooh-x" aria-label="Close what Ooh is saying"><span aria-hidden="true">×</span></button>' +
      '<p class="ooh-sr" aria-live="polite"></p>';
    return b;
  }
  function sayLine(r) {
    const l = r.lines[r.i], last = r.i >= r.lines.length - 1;
    r.fig.innerHTML = figure(l[0], r.size);
    const next = r.bubble.querySelector(".ooh-next");
    next.innerHTML = (last ? "Got it" : "Next") + '<span aria-hidden="true"> ▸</span>';
    next.dataset.ready = "false";
    r.bubble.querySelector(".ooh-sr").textContent = "Ooh says: " + l[1];
    if (r.typing) r.typing.finish();
    r.typing = type(r.bubble.querySelector(".ooh-typed"), r.bubble.querySelector(".ooh-rest"), l[1], l[0],
      r.fig.querySelector(".ooh-bobw") || r.fig, function () {
        next.dataset.ready = "true";
        if (last && r.full) { pref.seen[r.id] = 1; savePref(); }
      });
  }

  /* ══════════════ the in-page strip ══════════════ */
  let strip = null;      // { el, run, key }
  function clearStrip() {
    if (!strip) return;
    if (strip.run.typing) strip.run.typing.finish();
    strip.el.remove(); strip = null;
  }
  function showStrip(k, sc) {
    clearStrip();
    const slot = document.querySelector('.ooh-slot[data-ooh="' + k + '"]');
    if (!slot) return false;
    const full = !pref.seen[sc.id];
    const lines = full ? sc.lines : [sc.short || sc.lines[sc.lines.length - 1]];
    const el = document.createElement("section");
    el.className = "ooh-strip";
    el.setAttribute("aria-label", "Ooh, your guide");
    const fig = document.createElement("span");
    fig.className = "ooh-figure"; fig.setAttribute("aria-hidden", "true");
    const size = full ? 84 : 66;
    fig.style.minWidth = size + "px"; fig.style.minHeight = size + "px";
    const bubble = makeBubble();
    el.appendChild(fig); el.appendChild(bubble);
    slot.textContent = ""; slot.appendChild(el);
    const r = { id: sc.id, lines: lines, i: 0, fig: fig, bubble: bubble, size: size, full: full, typing: null };
    strip = { el: el, run: r, key: k };
    bubble.querySelector(".ooh-say").addEventListener("click", function () {
      if (r.typing && !r.typing.finished) { r.typing.finish(); return; }
      if (r.i >= r.lines.length - 1) { tuck(k); return; }
      r.i++; play("progress-step"); sayLine(r);
    });
    bubble.querySelector(".ooh-x").addEventListener("click", function () { tuck(k); });
    play("wake");
    sayLine(r);
    return true;
  }
  function tuck(k) {
    if (strip && strip.key === k) {
      if (strip.run.full) { pref.seen[strip.run.id] = 1; savePref(); }
      clearStrip();
    }
    markTucked(k);
    play("close");
    dockState();
    if (me && !me.hidden) me.focus({ preventScroll: true });
  }

  /* ══════════════ the corner ══════════════ */
  let dock = null, me = null, floatRun = null, floatBubble = null, floatT = null, floatY = 0;
  let currentKey = null, currentScript = null;
  function buildDock() {
    dock = document.createElement("div");
    dock.className = "ooh-guide";
    dock.hidden = true;
    dock.innerHTML = '<button type="button" class="ooh-me" aria-expanded="false" aria-label="Ooh, your guide. Hear what Ooh says"></button>';
    document.body.appendChild(dock);
    me = dock.querySelector(".ooh-me");
    me.addEventListener("click", function () { if (floatRun) closeFloat(); else openFloat(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && floatRun) { closeFloat(); me.focus(); } });
    addEventListener("scroll", function () { if (floatRun && Math.abs(scrollY - floatY) > 200) closeFloat(); }, { passive: true });
  }
  function openFloat() {
    const sc = currentScript;
    if (!sc) return;
    const line = sc.short || sc.lines[sc.lines.length - 1];
    floatBubble = makeBubble();
    dock.insertBefore(floatBubble, me);
    floatRun = { id: sc.id, lines: [line], i: 0, fig: me, bubble: floatBubble, size: 54, full: false, typing: null };
    floatBubble.querySelector(".ooh-say").addEventListener("click", function () {
      if (floatRun && floatRun.typing && !floatRun.typing.finished) floatRun.typing.finish(); else closeFloat();
    });
    floatBubble.querySelector(".ooh-x").addEventListener("click", function () { closeFloat(); me.focus(); });
    dock.dataset.open = "true"; me.setAttribute("aria-expanded", "true");
    me.setAttribute("aria-label", "Ooh, your guide. Hide what Ooh says");
    floatY = scrollY; play("open"); sayLine(floatRun);
    clearTimeout(floatT);
    floatT = setTimeout(function linger() {
      if (!floatRun) return;
      if (floatRun.typing && floatRun.typing.finished) closeFloat(); else floatT = setTimeout(linger, 2000);
    }, 10000);
  }
  function closeFloat() {
    if (!floatRun) return;
    if (floatRun.typing) floatRun.typing.finish();
    floatBubble.remove(); floatRun = null; floatBubble = null;
    dock.dataset.open = "false"; me.setAttribute("aria-expanded", "false");
    me.setAttribute("aria-label", "Ooh, your guide. Hear what Ooh says");
    clearTimeout(floatT);
    dockState();
  }
  // The tour locks the body while it runs; Ooh keeps quiet until it ends.
  // The tour has the screen, or the opening does (html.intro-on, set before
  // the first paint): the corner Ooh and the per-view lines wait.
  function busy() { return document.body.classList.contains("tour-locked") || root.classList.contains("intro-on"); }
  function dockState() {
    if (!dock) return;
    // No corner Ooh on the questions (Ooh is asking them) or on the first
    // page (Ooh is already in it), and never while the tour is up.
    const show = pref.on && !!currentScript && !strip && !busy() &&
      currentKey !== "survey" && currentKey !== "intro";
    if (!show && floatRun) closeFloat();
    if (dock.hidden !== !show) dock.hidden = !show;
    if (show && !floatRun) {
      const sc = currentScript;
      me.innerHTML = figure((sc.short || sc.lines[0])[0], 54);
    }
  }

  /* ══════════════ the switch in the footer ══════════════ */
  function syncToggle() {
    const b = document.getElementById("oohToggle");
    if (!b) return;
    b.setAttribute("aria-pressed", String(!pref.on));
    b.textContent = pref.on ? "Hide Ooh, the guide" : "Show Ooh, the guide";
  }
  function wireToggle() {
    const b = document.getElementById("oohToggle");
    if (!b) return;
    syncToggle();
    b.addEventListener("click", function () {
      pref.on = !pref.on; savePref();
      root.classList.toggle("ooh-off", !pref.on);
      if (!pref.on) { clearStrip(); closeFloat(); }
      else if (currentKey) view(currentKey, currentScript);
      syncToggle(); dockState();
      window.dispatchEvent(new CustomEvent("dcooh", { detail: { on: pref.on } }));
    });
  }

  /* ══════════════ when to speak ══════════════ */
  function view(k, sc) {
    closeFloat();
    currentKey = k || null;
    currentScript = sc || null;
    if (sc && pref.on && !busy() && !tuckedThisVisit(k)) showStrip(k, sc); else clearStrip();
    dockState();
  }

  /* say(el, lines, done): Ooh answers inside an existing bubble on the page
     (the "What do you want?" block). el holds .ooh-typed, .ooh-rest and
     .ooh-sr; fig is Ooh's figure box beside it. Lines run one after another
     in the same bubble, then done() fires. */
  let sayRun = null;
  function say(el, fig, lines, done) {
    if (sayRun) { sayRun.cancelled = true; if (sayRun.typing) sayRun.typing.finish(); }
    const r = { cancelled: false, typing: null };
    sayRun = r;
    const typed = el.querySelector(".ooh-typed"), rest = el.querySelector(".ooh-rest"), sr = el.querySelector(".ooh-sr");
    const whole = lines.map(function (l) { return l[1]; }).join(" ");
    if (sr) sr.textContent = "Ooh says: " + whole;
    if (fig && lines.length) fig.innerHTML = figure(lines[0][0], parseInt(fig.dataset.size || "72", 10));
    play("wake");
    // One typing pass over the whole reply, so the bubble never re-wraps
    // between lines; the mood is the first line's.
    // The way onward appears at once; Ooh keeps talking while it is there.
    if (done) done();
    r.typing = type(typed, rest, whole, lines.length ? lines[0][0] : "hello", fig && fig.querySelector(".ooh-bobw"), function () {
      if (r.cancelled) return;
      if (fig && lines.length > 1) fig.innerHTML = figure(lines[lines.length - 1][0], parseInt(fig.dataset.size || "72", 10));
    }, true);
    return r;
  }

  let started = false;
  function init() {
    if (started) return; started = true;
    buildDock();
    wireToggle();
    blinkLoop();
    document.querySelectorAll("[data-ooh-figure]").forEach(function (f) {
      f.innerHTML = figure(f.getAttribute("data-ooh-figure"), parseInt(f.dataset.size || "72", 10));
    });
    // The tour opening or closing changes whether the corner may show. Only
    // the body's own class is watched, which nothing in dockState() touches.
    if (window.MutationObserver) {
      new MutationObserver(function () { dockState(); })
        .observe(document.body, { attributes: true, attributeFilter: ["class"] });
    }
  }

  window.Ooh = {
    view: view,
    say: say,
    figure: figure,
    sound: play,
    type: type,
    on: function () { return pref.on; },
    refresh: dockState
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
