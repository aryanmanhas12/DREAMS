/* The galaxy's sound. Everything is synthesised live with the Web Audio API:
   no audio files, so nothing to download, nothing fetched from anywhere, and
   it works from file:// and inside the single-file bundle.

   Two layers:
     ambient   a slow space drone (detuned low voices through a breathing
               filter), a pad of four A-minor chords that swell into one
               another every twelve seconds, a thin "solar wind" of noise,
               pentatonic star chimes with an echo, and sparse cosmic-ray
               clicks on a Poisson clock, the way a Geiger counter
               actually sounds in open air.
     effects   answering the reader's actions:
                 decay   a Geiger click when an answer is chosen
                 alpha   a heavy, short zip when you move to the next question
                         (alpha particles are heavy and stop in centimetres)
                 gamma   a bright, clean ping when a programme is saved
                 fade    the same ping falling, when it is removed
                 chain   a decay chain of clicks and a rising chord as your
                         results arrive
                 orbit   a soft whoosh when the view changes or a country is
                         picked on the globe

   Rules it keeps:
     - Browsers refuse to start audio before the reader interacts, so nothing
       plays until the first tap, click or key press. After that the ambient
       plays continuously, as the user asked, unless it has been muted.
     - WCAG 1.4.2: sound that plays by itself must be stoppable from the page.
       The speaker button in the top bar does that, it is keyboard operable,
       and the choice is remembered on this device.
     - It suspends while the tab is hidden, so it never plays to an empty room
       or drains a phone in a pocket.
   Public surface: window.DCSound.play(name), .isOn(), and a "dcsound" event on
   window whose detail is { on, first } when the sound starts or stops. */
(function () {
  "use strict";

  const KEY = "dc-sound";
  const AC = window.AudioContext || window.webkitAudioContext;
  let pref = "on";
  try { pref = localStorage.getItem(KEY) || "on"; } catch (e) { /* private mode */ }

  let ac = null, master = null, ambBus = null, fxBus = null, echo = null;
  let ambient = null, chimeTimer = null, rayTimer = null, padTimer = null, unlocked = false;
  let audible = false;   // what the button shows: is the galaxy actually playing

  function now() { return ac.currentTime; }

  function ensure() {
    if (ac || !AC) return ac;
    try { ac = new AC(); } catch (e) { ac = null; return null; }
    const limiter = ac.createDynamicsCompressor();
    limiter.threshold.value = -12; limiter.ratio.value = 6;
    master = ac.createGain(); master.gain.value = 0.9;
    master.connect(limiter); limiter.connect(ac.destination);
    ambBus = ac.createGain(); ambBus.gain.value = 0; ambBus.connect(master);
    fxBus = ac.createGain(); fxBus.gain.value = 0.55; fxBus.connect(master);

    // A long, soft echo for the chimes: the "size" of the room is space.
    echo = ac.createDelay(1.5); echo.delayTime.value = 0.46;
    const fb = ac.createGain(); fb.gain.value = 0.38;
    const tone = ac.createBiquadFilter(); tone.type = "lowpass"; tone.frequency.value = 2600;
    echo.connect(tone); tone.connect(fb); fb.connect(echo); tone.connect(ambBus);
    return ac;
  }

  let noiseBuf = null;
  function noise() {
    if (noiseBuf) return noiseBuf;
    const len = ac.sampleRate * 2;
    noiseBuf = ac.createBuffer(1, len, ac.sampleRate);
    const d = noiseBuf.getChannelData(0);
    let b = 0;
    for (let i = 0; i < len; i++) {           // gently pinked white noise
      const w = Math.random() * 2 - 1;
      b = 0.97 * b + 0.03 * w;
      d[i] = (w * 0.35 + b * 3.2) * 0.5;
    }
    return noiseBuf;
  }

  /* ───────── ambient ───────── */
  function startAmbient() {
    if (!ensure() || ambient) return;
    const t = now();
    const nodes = [];

    // The drone: A1, E2 and A2, each slightly detuned so they beat slowly.
    const filt = ac.createBiquadFilter();
    filt.type = "lowpass"; filt.frequency.value = 380; filt.Q.value = 0.8;
    const lfo = ac.createOscillator(); lfo.frequency.value = 0.045;
    const lfoAmt = ac.createGain(); lfoAmt.gain.value = 170;
    lfo.connect(lfoAmt); lfoAmt.connect(filt.frequency); lfo.start(t);
    const droneGain = ac.createGain(); droneGain.gain.value = 0.11;
    filt.connect(droneGain); droneGain.connect(ambBus);
    [[55, "sine", 0], [82.41, "triangle", 4], [110, "sine", -5], [164.8, "sine", 7]].forEach(function (v, i) {
      const o = ac.createOscillator(); o.type = v[1]; o.frequency.value = v[0]; o.detune.value = v[2];
      const g = ac.createGain(); g.gain.value = i === 3 ? 0.25 : 0.6;
      o.connect(g); g.connect(filt); o.start(t);
      nodes.push(o);
    });

    // Solar wind: noise through a narrow band that wanders slowly.
    const wind = ac.createBufferSource(); wind.buffer = noise(); wind.loop = true;
    const band = ac.createBiquadFilter(); band.type = "bandpass"; band.frequency.value = 1400; band.Q.value = 6;
    const wLfo = ac.createOscillator(); wLfo.frequency.value = 0.027;
    const wAmt = ac.createGain(); wAmt.gain.value = 900;
    wLfo.connect(wAmt); wAmt.connect(band.frequency); wLfo.start(t);
    const wGain = ac.createGain(); wGain.gain.value = 0.05;
    wind.connect(band); band.connect(wGain); wGain.connect(ambBus); wind.start(t);

    nodes.push(lfo, wLfo, wind);
    ambient = nodes;

    // Fade the whole bed in over three seconds so it arrives, never starts.
    ambBus.gain.cancelScheduledValues(t);
    ambBus.gain.setValueAtTime(ambBus.gain.value, t);
    ambBus.gain.linearRampToValueAtTime(0.5, t + 3);

    scheduleChime();
    scheduleRay();
    padIndex = 0;
    schedulePad(0.5);
  }

  function stopAmbient() {
    if (!ac || !ambient) return;
    const t = now();
    ambBus.gain.cancelScheduledValues(t);
    ambBus.gain.setValueAtTime(ambBus.gain.value, t);
    ambBus.gain.linearRampToValueAtTime(0, t + 0.6);
    const nodes = ambient; ambient = null;
    setTimeout(function () { nodes.forEach(function (n) { try { n.stop(); } catch (e) { /* already stopped */ } }); }, 700);
    clearTimeout(chimeTimer); clearTimeout(rayTimer); clearTimeout(padTimer);
  }

  /* The pad: four chords in A minor that swell and fade into one another
     every twelve seconds over the drone, so the sound drifts the way the sky
     does instead of holding one note. Each chord lives about twenty seconds:
     a five-second rise, a hold, a seven-second fall that overlaps the next. */
  const CHORDS = [
    [110, 164.81, 246.94, 261.63],     // A minor, added ninth
    [87.31, 130.81, 164.81, 220],      // F major seventh
    [98, 146.83, 196, 246.94],         // G, open
    [82.41, 123.47, 146.83, 196]       // E minor seventh
  ];
  let padIndex = 0;
  function schedulePad(delay) {
    padTimer = setTimeout(function () {
      if (!ambient) return;
      pad(CHORDS[padIndex % CHORDS.length]);
      padIndex++;
      schedulePad(12);
    }, delay * 1000);
  }
  function pad(freqs) {
    const t = now();
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 900; lp.Q.value = 0.5;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.06, t + 5);
    g.gain.setValueAtTime(0.06, t + 12);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 19);
    lp.connect(g); g.connect(ambBus); g.connect(echo);
    freqs.forEach(function (f, i) {
      [["sine", 0], ["triangle", i % 2 ? 6 : -6]].forEach(function (v) {
        const o = ac.createOscillator(); o.type = v[0]; o.frequency.value = f; o.detune.value = v[1];
        const vg = ac.createGain(); vg.gain.value = v[0] === "sine" ? 0.5 : 0.18;
        o.connect(vg); vg.connect(lp);
        o.start(t); o.stop(t + 19.5);
      });
    });
  }

  // A star chime every few seconds: one note of A minor pentatonic, soft
  // attack, long ring, into the echo.
  const PENT = [440, 523.25, 587.33, 659.25, 783.99, 880, 1046.5];
  function scheduleChime() {
    chimeTimer = setTimeout(function () {
      if (!ambient) return;
      chime(PENT[Math.floor(Math.random() * PENT.length)], 0.05 + Math.random() * 0.03, echo);
      scheduleChime();
    }, 2500 + Math.random() * 6000);
  }
  function chime(freq, level, dest) {
    const t = now();
    const o = ac.createOscillator(); o.type = "sine"; o.frequency.value = freq;
    const o2 = ac.createOscillator(); o2.type = "sine"; o2.frequency.value = freq * 2.01;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(level, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);
    const g2 = ac.createGain(); g2.gain.value = 0.18;
    o.connect(g); o2.connect(g2); g2.connect(g);
    g.connect(dest || ambBus);
    o.start(t); o2.start(t); o.stop(t + 3.3); o2.stop(t + 3.3);
  }

  // Cosmic rays: a Poisson process, so the gaps are random the way real
  // decays are, averaging one every ~2.5 seconds, very quiet.
  function scheduleRay() {
    const gap = -Math.log(1 - Math.random()) * 2500;
    rayTimer = setTimeout(function () {
      if (!ambient) return;
      click(0.06, ambBus);
      scheduleRay();
    }, gap);
  }

  /* ───────── effects ───────── */
  function click(level, dest, when) {
    const t = when || now();
    const src = ac.createBufferSource(); src.buffer = noise();
    const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 2600;
    const g = ac.createGain();
    g.gain.setValueAtTime(level, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.012);
    src.connect(hp); hp.connect(g); g.connect(dest || fxBus);
    src.start(t, Math.random() * 1.5, 0.02);
    // The body of a Geiger click: a very short, pitched knock.
    const o = ac.createOscillator(); o.type = "square"; o.frequency.value = 1900 + Math.random() * 300;
    const og = ac.createGain();
    og.gain.setValueAtTime(level * 0.35, t);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.006);
    o.connect(og); og.connect(dest || fxBus); o.start(t); o.stop(t + 0.01);
  }

  function sweep(from, to, dur, type, level, dest) {
    const t = now();
    const o = ac.createOscillator(); o.type = type; o.frequency.setValueAtTime(from, t);
    o.frequency.exponentialRampToValueAtTime(to, t + dur);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(level, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(dest || fxBus); o.start(t); o.stop(t + dur + 0.02);
  }

  function hiss(fFrom, fTo, dur, level) {
    const t = now();
    const src = ac.createBufferSource(); src.buffer = noise();
    const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 3;
    bp.frequency.setValueAtTime(fFrom, t); bp.frequency.exponentialRampToValueAtTime(fTo, t + dur);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(level, t + dur * 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(bp); bp.connect(g); g.connect(fxBus);
    src.start(t, Math.random(), dur + 0.05);
  }

  const FX = {
    decay: function () { click(0.5); if (Math.random() < 0.35) click(0.35, fxBus, now() + 0.045); },
    alpha: function () { sweep(900, 130, 0.2, "triangle", 0.35); hiss(3200, 500, 0.22, 0.25); },
    gamma: function () { chime(1567.98, 0.22, fxBus); chime(2349.3, 0.08, fxBus); },
    fade: function () { sweep(1400, 520, 0.35, "sine", 0.18); },
    orbit: function () { hiss(380, 1800, 0.42, 0.18); sweep(196, 294, 0.4, "sine", 0.08); },
    chain: function () {
      // A decay chain: clicks that start sparse, crowd together, then thin
      // out, while a pentatonic chord swells under them.
      let t = now() + 0.02;
      for (let i = 0; i < 16; i++) {
        const k = i / 15;
        t += 0.02 + 0.11 * Math.pow(Math.abs(k - 0.55) * 1.8, 1.5) * Math.random();
        click(0.3 + 0.2 * Math.random(), fxBus, t);
      }
      [440, 554.37, 659.25, 880].forEach(function (f, i) {
        setTimeout(function () { if (isOn()) chime(f, 0.09, echo); }, 180 + i * 110);
      });
    }
  };

  /* ───────── control ───────── */
  function isOn() { return pref === "on"; }
  function running() { return ac && ac.state === "running"; }

  function play(name) {
    if (!isOn() || !unlocked || !ensure() || !FX[name]) return;
    if (!running()) { ac.resume(); }
    try { FX[name](); } catch (e) { /* a failed effect must never break the page */ }
  }

  function announce(first) {
    window.dispatchEvent(new CustomEvent("dcsound", { detail: { on: isOn(), first: !!first } }));
  }

  function turnOn(first) {
    if (!ensure()) return;
    const go = function () { startAmbient(); audible = true; paint(); announce(first); };
    if (ac.state !== "running") ac.resume().then(go, function () { /* still blocked */ });
    else go();
  }
  function turnOff() {
    stopAmbient();
    audible = false; paint();
    if (ac) setTimeout(function () { if (!isOn() && ac.state === "running") ac.suspend(); }, 700);
    announce(false);
  }

  function setPref(v) {
    pref = v;
    try { localStorage.setItem(KEY, v); } catch (e) { /* ignore */ }
    paint();
  }

  // The first gesture anywhere unlocks audio. Several event types, because
  // iOS unlocks Web Audio on touchend and others on pointerdown or a key.
  function listen(on) {
    ["pointerdown", "touchend", "keydown", "click"].forEach(function (ev) {
      if (on) document.addEventListener(ev, unlock, true);
      else document.removeEventListener(ev, unlock, true);
    });
  }
  function unlock(e) {
    if (unlocked) return;
    unlocked = true;
    listen(false);
    if (retrySync) { unlockSync(e); return; }
    // A first gesture ON the speaker button is the reader choosing, so the
    // button's own handler decides; starting here too would play a second of
    // sound they were in the act of refusing.
    if (e && btn && e.target && btn.contains(e.target)) return;
    if (!isOn()) return;
    // Start AFTER this tap has painted. Creating an AudioContext and its
    // noise buffer inside the tap's own handler put tens of milliseconds in
    // front of that tap's next frame on Android, which is the first thing a
    // reader does on the page. The page already has user activation by then,
    // so the browser lets the context start. If one refuses anyway (older
    // iOS wants the call inside the gesture), the next tap tries again,
    // synchronously this time.
    requestAnimationFrame(function () {
      setTimeout(function () {
        turnOn(true);
        setTimeout(function () {
          if (ac && ac.state !== "running" && isOn()) { unlocked = false; retrySync = true; listen(true); }
        }, 300);
      }, 0);
    });
  }
  let retrySync = false;
  function unlockSync(e) {
    if (e && btn && e.target && btn.contains(e.target)) return;
    if (isOn()) turnOn(true);
  }

  let btn = null;
  function paint() {
    if (!btn) return;
    // The button shows what is actually happening, not the stored wish:
    // before the first tap nothing can play, so it reads as off until then.
    btn.setAttribute("aria-pressed", String(audible));
    btn.classList.toggle("is-on", audible);
    btn.title = audible ? "Mute the galaxy sound" : "Play the galaxy sound";
  }

  function init() {
    btn = document.getElementById("soundToggle");
    if (!AC) { if (btn) btn.hidden = true; return; }
    paint();
    if (btn) btn.addEventListener("click", function () {
      unlocked = true;
      if (audible) { setPref("off"); turnOff(); }
      else { setPref("on"); turnOn(false); setTimeout(function () { play("gamma"); }, 60); }
    });
    listen(true);
    document.addEventListener("visibilitychange", function () {
      if (!ac) return;
      if (document.hidden) ac.suspend();
      else if (isOn() && unlocked) ac.resume();
    });
  }

  window.DCSound = { play: play, isOn: isOn };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
