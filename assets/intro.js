/* Dreams Counselor — the opening.

   The Earth turns once in the galaxy, every country in the index lights as
   it crosses the middle and is named, Ooh arrives and cannot keep still,
   and the turn lands on India, where every route on this site starts. Then
   the name, then the page. Same length as Ronak's overture, which ends at
   9.6 seconds; here it is fifteen beats of the music, 9.57 seconds.

   How it runs, and the rules it keeps:
     - Once per visit (a tab session, sessionStorage "dc-intro"), like Ronak:
       reloading inside a visit does not replay it, closing the tab and
       coming back does. The inline script in <head> decides before the first
       paint and sets html.intro-on, so the page never flashes first.
     - Skip (and Escape) leave it at any moment, from the gate onwards; it
       was unskippable for its first day, and the owner asked for a way out.
       A skip goes straight to the page: no tour on top of it (Ronak's rule:
       answering Skip with a second guided thing defeats the Skip), and music
       already playing crossfades to the calm bed instead of finishing the
       opening's cue over the page. It still never plays for anyone who has
       said no to motion (prefers-reduced-motion, "Pause the moving sky") or
       who came by a shared plan link (#p=) for their results.
     - Browsers refuse sound before a tap, so with music on it opens on a
       gate: "Begin" starts the music and the turn in the same instant, and
       the music is scheduled on the same beat grid as every light and hop.
       "Begin in silence" is the same opening with no sound, for this visit.
       With the sound switched off there is nothing to wait for: it plays.
     - Everything moving is either the globe's canvas (one, drawn per frame
       only while it turns) or a CSS transform on an HTML element, so the
       compositor runs it. Every number said is counted from the data.
     - Storage that throws counts as "seen": an opening nobody can get past
       must fail open onto the page, never closed onto the opening.
   Public surface: window.DCIntro.start(info) from app.js; it returns true
   when the opening is showing and calls info.done(skipped) when the page is
   back. */
(function () {
  "use strict";

  const root = document.documentElement;
  const KEY = "dc-intro";
  const BEAT = 60 / 94;                              // sound.js plays at 94 bpm
  const B = function (n) { return Math.round(n * BEAT * 1000); };
  const Q = BEAT * 1000 / 8;                         // the grid every light snaps to
  // The beats. The turn runs from just after the tap to the landing on beat 10.
  const T = { turn: 160, ooh: B(2), say1: B(3), land: B(10), say2: B(10.75), name: B(12.5), end: B(15) };
  const TURN = 380;                                  // one revolution, and a little more
  const HOME_LON = 78;                               // India, as globe.js places it

  let el = null, globe = null, info = null, timers = [], plan = null, lit = 0;
  let over = false, typing = null;   // over: finished or skipped, so nothing late may run
  const $ = function (s) { return document.getElementById(s); };
  function at(ms, fn) { timers.push(setTimeout(fn, ms)); }

  function markVisit() { try { sessionStorage.setItem(KEY, "1"); } catch (e) { /* private mode */ } }

  function figure(mood, size) {
    if (window.Ooh && window.Ooh.figure) return window.Ooh.figure(mood, size);
    return window.OohArt ? window.OohArt.oohSvg({ mood: mood, size: size }) : "";
  }

  function start(i) {
    el = $("intro");
    if (!el || !root.classList.contains("intro-on") || typeof window.initGlobe !== "function") {
      root.classList.remove("intro-on", "intro-wait");
      return false;
    }
    info = i || {};
    root.classList.add("intro-live");
    const exclude = info.exclude || [];
    const lite = root.classList.contains("lite");

    globe = window.initGlobe($("introCanvas"), null, null, {
      autoSpin: false, labels: true, margin: lite ? 30 : 34
    });
    // No canvas to draw on: no opening. Returning false is enough, because
    // app.js then starts the hero globe and the tour itself; calling done
    // here as well would start them twice.
    if (!globe) {
      root.classList.remove("intro-on", "intro-wait");
      el.hidden = true;
      return false;
    }
    // Start one revolution and a little more before India, with the north
    // tipped towards the reader (most of the index lives there) and easing
    // back to the hero globe's own tilt as it lands.
    const o = { from: -HOME_LON - TURN, turn: TURN, dur: T.land - T.turn, delay: T.turn, tilt: [22, 12] };
    plan = globe.plan(o);

    // Snap every light onto the music's 32nd-note grid (at most 40ms off
    // where it crosses), so a light and its note are the same moment rather
    // than nearly. Europe puts several in one slot; sound.js plays two of
    // them as a chord. Giving each its own slot pushed Europe's lights a
    // second late, by when the countries were at the edge of the globe.
    plan.forEach(function (p) {
      p.t = Math.max(Q, Math.round(p.t / Q) * Q);
      p.counts = exclude.indexOf(p.name) === -1;
    });
    const total = plan.filter(function (p) { return p.counts; }).length;
    el.style.setProperty("--intro-ms", T.end + "ms");
    el.style.setProperty("--beat", (BEAT * 1000).toFixed(1) + "ms");

    $("introSkip").addEventListener("click", skip);
    document.addEventListener("keydown", onKey);

    $("introGateOoh").innerHTML = figure("hello", 84);
    $("introOoh").innerHTML = figure("ooh", 92);
    $("introLine2Count").textContent = String(total);

    const sound = window.DCSound;
    const gated = root.classList.contains("intro-wait") && sound && sound.isOn();
    if (gated) {
      $("introBegin").addEventListener("click", function () { begin(true, total); });
      $("introQuiet").addEventListener("click", function () { begin(false, total); });
      el.classList.add("is-ready");
      setTimeout(function () { $("introBegin").focus({ preventScroll: true }); }, 60);
    } else {
      root.classList.remove("intro-wait");
      begin(false, total);
    }
    return true;
  }

  function begin(withMusic, total) {
    if (el.classList.contains("is-playing")) return;
    markVisit();
    root.classList.remove("intro-wait");
    el.classList.add("is-playing");
    el.focus({ preventScroll: true });
    const sound = window.DCSound;
    const lights = plan.map(function (p, i) { return { t: p.t, i: i, n: plan.length }; });
    const go = function (lead) { setTimeout(function () { if (!over) run(total); }, lead || 0); };
    // A skip can land in the moment between Begin and the music starting;
    // the music then starts as the calm bed, not as the opening's cue.
    const started = function (lead) { if (over) { if (sound.settle) sound.settle(); } else go(lead); };
    if (withMusic && sound && sound.begin) sound.begin(lights).then(started, function () { go(0); });
    else { if (sound && sound.quiet) sound.quiet(); go(0); }
  }

  function run(total) {
    el.classList.add("is-running");
    const times = {};
    plan.forEach(function (p) { times[p.name] = p.t; });
    const count = $("introCount");
    globe.play(times, {
      light: function (pl) {
        if (!plan.some(function (p) { return p.name === pl.name && p.counts; })) return;
        lit++;
        count.textContent = String(lit);
        if (lit === 1) el.classList.add("has-count");
      },
      land: function () {
        el.classList.add("is-home");
        const p = globe.where("India"), c = $("introCanvas").getBoundingClientRect();
        if (p && window.DCSpace && !root.classList.contains("lite")) window.DCSpace.burst("gamma", c.left + p.x, c.top + p.y);
      }
    });

    const oohWrap = $("introOohWrap");
    at(T.ooh, function () {
      el.classList.add("has-ooh");
      oohWrap.classList.add("is-hopping");
      const r = oohWrap.getBoundingClientRect();
      if (window.DCSpace && !root.classList.contains("lite")) window.DCSpace.burst("alpha", r.left + r.width / 2, r.top + r.height * 0.4);
    });
    at(T.say1, function () { say($("introSay1"), "ooh"); });
    at(T.land, function () {
      oohWrap.classList.remove("is-hopping");
      void oohWrap.offsetWidth;
      oohWrap.classList.add("is-twirl");
      $("introOoh").innerHTML = figure("happy", 92);
    });
    at(T.say2, function () {
      $("introSay1").hidden = true;
      $("introSay2").hidden = false;
      say($("introSay2"), "happy");
    });
    at(T.name, function () { el.classList.add("has-name"); });
    at(T.end, function () { finish(false); });
  }

  // Ooh's line, typed with the sister apps' blip when the guide is loaded,
  // and whole at once when it is not. The words are in the DOM throughout.
  function say(box, mood) {
    box.hidden = false;
    const typed = box.querySelector(".ooh-typed"), rest = box.querySelector(".ooh-rest");
    const text = typed.textContent + rest.textContent;
    if (window.Ooh && window.Ooh.type) typing = window.Ooh.type(typed, rest, text, mood, $("introOoh"), null, true);
  }

  function onKey(e) {
    if (e.key === "Escape" && root.classList.contains("intro-on")) { e.preventDefault(); skip(); }
  }

  // Skip, from the gate or mid-turn. The visit counts as opened either way,
  // so a reload does not bring the opening straight back.
  function skip() {
    if (over) return;
    markVisit();
    if (window.DCSound && window.DCSound.settle) window.DCSound.settle();
    finish(true);
  }

  function finish(skipped) {
    if (over) return;
    over = true;
    timers.forEach(clearTimeout); timers = [];
    if (typing && !typing.finished) typing.finish();
    document.removeEventListener("keydown", onKey);
    if (document.activeElement && el.contains(document.activeElement)) document.activeElement.blur();
    root.classList.remove("intro-on", "intro-wait");
    globe.stop();
    // The opening fades out as the page fades in; both are opacity only.
    // A skip is the reader in a hurry, so it fades in half the time.
    const ms = skipped ? 300 : 620;
    root.classList.toggle("intro-fast", !!skipped);
    root.classList.add("intro-out");
    el.classList.add("is-leaving");
    setTimeout(function () {
      el.hidden = true;
      root.classList.remove("intro-out", "intro-fast");
      if (window.Ooh && window.Ooh.refresh) window.Ooh.refresh();
      if (info && info.done) info.done(!!skipped);
    }, ms);
  }

  window.DCIntro = { start: start, on: function () { return root.classList.contains("intro-on"); } };
})();
