/* The galaxy's sound. Everything is synthesised live with the Web Audio API:
   no audio files, so nothing to download, nothing fetched from anywhere, and
   it works from file:// and inside the single-file bundle.

   WHAT IT IS (October 2026, asked for "more calming and more exciting")
   One piece in D major at 94 beats a minute, on a step sequencer that looks
   a second ahead, so every note lands on the beat however busy the page is.

     calm      a low drone on D and A through a slowly breathing filter; four
               chords, sixteen beats each (Dmaj9, Bm11, Gmaj7#11, A6sus),
               swelling into one another through a soft generated reverb;
               a thin solar wind; a star chime now and then; and cosmic-ray
               ticks on a Poisson clock, far rarer and softer than before.
     exciting  the same forty-second cycle carries a flight: the D chord
               rests, a felt-piano pulse enters under the B minor, runs in
               eighths under the G, quickens to sixteenths and climbs under
               the A while a riser lifts into the next D, which lands with a
               rising chime. Calm, build, lift, release, over and over.
     opening   begin(lights) plays the cue for the opening (intro.js), on the
               same grid as its picture: B minor in the dark, a heartbeat kick
               from beat 2, G at beat 4, hi-hats and a riser from beat 6, A at
               beat 8, and on beat 10, as India lands, the D chord with a
               chime cascade. Every country that lights is one note of a
               rising run, at the exact moment it lights.
   Effects answer the reader's actions: decay (a Geiger click on an answer),
   alpha (a short zip to the next question), gamma (a ping on saving),
   fade (the ping falling, on removing), chain (results arriving), orbit (a
   whoosh for a change of view).

   Rules it keeps:
     - Browsers refuse audio before the reader interacts, so nothing plays
       until the first tap, click or key press, or the opening's Begin. After
       that it plays continuously, as the user asked, unless muted.
     - WCAG 1.4.2: the speaker button in the top bar stops it, it is keyboard
       operable, and the choice is remembered. "Begin in silence" silences
       this visit only.
     - It suspends while the tab is hidden.
     - Loudness was measured by rendering the opening and two minutes after
       it offline (_render): keep the peak under 0.5 and the level near the
       old bed's -27 dBFS RMS.
   Public surface: window.DCSound.play(name), .isOn(), .begin(lights),
   .quiet(), .toggle(), and a "dcsound" event on window whose detail is
   { on, first } when the sound starts or stops. */
(function () {
  "use strict";

  const KEY = "dc-sound";
  const AC = window.AudioContext || window.webkitAudioContext;
  let pref = "on";
  try { pref = localStorage.getItem(KEY) || "on"; } catch (e) { /* private mode */ }
  let quietVisit = false;      // "Begin in silence": off for this visit only

  const BPM = 94, BEAT = 60 / BPM;
  const mtof = function (m) { return 440 * Math.pow(2, (m - 69) / 12); };
  const lite = function () { return document.documentElement.classList.contains("lite"); };

  /* The harmony, as MIDI notes. */
  const LOOP = [
    [50, 57, 61, 64, 66],        // Dmaj9      D3 A3 C#4 E4 F#4
    [47, 54, 57, 62, 64],        // Bm11       B2 F#3 A3 D4 E4
    [43, 50, 54, 59, 61],        // Gmaj7#11   G2 D3 F#3 B3 C#4
    [45, 52, 54, 59, 62]         // A6sus      A2 E3 F#3 B3 D4
  ];
  const NIGHT = [47, 54, 61, 62, 66];          // Bm(add9), the dark before the turn
  const WONDER = LOOP[2];
  const LIFT = [45, 52, 57, 59, 64];           // Asus2, open and leaning
  const HOME = [38, 50, 57, 61, 64, 66, 69];   // Dmaj9, wide, for the landing
  const PENT = [62, 64, 66, 69, 71, 74, 76, 78, 81, 83, 86];  // D major pentatonic, D4 to D6
  const OPENING_BEATS = 26;                    // the cue hands over to the loop's B minor here

  let ac = null, out = null;   // out: the buses for whichever context is playing
  let song = null, stepT = null, chimeT = null, rayT = null, unlocked = false;
  let drone = null;            // the continuous nodes, stopped together
  let audible = false;         // what the button shows: is the galaxy actually playing

  function now() { return ac.currentTime; }

  /* A generated room: decaying noise, two channels with different seeds so
     the tail is wide. No file, so nothing to fetch. */
  function room(seconds, decay) {
    const rate = ac.sampleRate, len = Math.floor(rate * seconds);
    const buf = ac.createBuffer(2, len, rate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      let seed = c ? 48271 : 16807;
      for (let i = 0; i < len; i++) {
        seed = (seed * 16807) % 2147483647;
        d[i] = ((seed / 2147483647) * 2 - 1) * Math.pow(1 - i / len, decay);
      }
    }
    return buf;
  }

  function build() {
    const limiter = ac.createDynamicsCompressor();
    limiter.threshold.value = -14; limiter.knee.value = 10; limiter.ratio.value = 5;
    limiter.attack.value = 0.01; limiter.release.value = 0.4;
    const master = ac.createGain(); master.gain.value = 0.9;
    master.connect(limiter); limiter.connect(ac.destination);

    // The reverb is what makes it calm: everything sits in a large soft room.
    // Shorter on 2GB phones, where a long convolution costs real CPU.
    const verb = ac.createConvolver(); verb.buffer = room(lite() ? 1.8 : 3.4, 2.4);
    const wet = ac.createGain(); wet.gain.value = 0.55;
    verb.connect(wet); wet.connect(master);

    const bed = ac.createGain(); bed.gain.value = 0;          // faded in, never started
    const bedSend = ac.createGain(); bedSend.gain.value = 0.7;
    bed.connect(master); bed.connect(bedSend); bedSend.connect(verb);

    // The pad's light: a lowpass the opening opens.
    const tone = ac.createBiquadFilter(); tone.type = "lowpass"; tone.frequency.value = 1300; tone.Q.value = 0.5;
    tone.connect(bed);

    // The pulse runs through a dotted-eighth echo, so a few notes sound like many.
    const pulse = ac.createGain(); pulse.gain.value = 1;
    const echo = ac.createDelay(1.5); echo.delayTime.value = BEAT * 0.75;
    const fb = ac.createGain(); fb.gain.value = 0.32;
    const etone = ac.createBiquadFilter(); etone.type = "lowpass"; etone.frequency.value = 2600;
    pulse.connect(bed); pulse.connect(echo);
    echo.connect(etone); etone.connect(fb); fb.connect(echo); etone.connect(bed);

    // The beat: kick and hats for the opening, dry and close.
    const beat = ac.createGain(); beat.gain.value = 1; beat.connect(bed);

    const fx = ac.createGain(); fx.gain.value = 0.5;
    const fxSend = ac.createGain(); fxSend.gain.value = 0.25;
    fx.connect(master); fx.connect(fxSend); fxSend.connect(verb);
    return { master: master, verb: verb, bed: bed, tone: tone, pulse: pulse, echo: echo, beat: beat, fx: fx };
  }

  function ensure() {
    if (ac || !AC) return ac;
    try { ac = new AC({ latencyHint: "playback" }); } catch (e) { try { ac = new AC(); } catch (e2) { ac = null; return null; } }
    try { if (navigator.audioSession) navigator.audioSession.type = "ambient"; } catch (e) { /* older Safari */ }
    out = build();
    return ac;
  }

  let noiseBuf = null;
  function noise() {
    if (noiseBuf && noiseBuf.sampleRate === ac.sampleRate) return noiseBuf;
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

  function pan(v) {
    if (!ac.createStereoPanner) return null;
    const p = ac.createStereoPanner(); p.pan.value = v; return p;
  }
  function route(node, dest, p) {
    const pn = p == null ? null : pan(p);
    if (pn) { node.connect(pn); pn.connect(dest); } else node.connect(dest);
  }

  /* ───────── instruments ───────── */

  // A pad voice: a sine and a quieter detuned triangle that swell in on a
  // time constant and let go slowly, so chords overlap instead of switching.
  function voice(t, midi, dur, level, spread) {
    const v = ac.createGain();
    v.gain.setValueAtTime(0, t);
    v.gain.setTargetAtTime(level, t, 1.3);
    v.gain.setTargetAtTime(0, t + dur, 1.9);
    route(v, out.tone, spread);
    const end = t + dur + 9;
    [["sine", -5, 1], ["triangle", 6, 0.26]].forEach(function (s) {
      const o = ac.createOscillator(); o.type = s[0];
      o.frequency.value = mtof(midi); o.detune.value = s[1];
      const a = ac.createGain(); a.gain.value = s[2];
      o.connect(a); a.connect(v); o.start(t); o.stop(end);
    });
  }
  function chord(t, notes, dur, lvl) {
    notes.forEach(function (m, i) {
      voice(t + i * 0.12, m, dur, (i === 0 ? 0.052 : 0.032) * (lvl || 1), (i % 2 ? 1 : -1) * (0.1 + i * 0.07));
    });
  }

  // The felt-piano pluck: a sine and two upper partials that fade faster.
  function pluck(t, midi, level, dest) {
    const bus = ac.createGain();
    route(bus, dest || out.pulse, ((midi % 7) / 7) - 0.45);
    [[1, 1, 1.9], [2, 0.2, 0.7], [3, 0.07, 0.35]].forEach(function (p) {
      const o = ac.createOscillator(); o.frequency.value = mtof(midi) * p[0];
      const e = ac.createGain();
      e.gain.setValueAtTime(0, t);
      e.gain.linearRampToValueAtTime(level * p[1], t + 0.008);
      e.gain.exponentialRampToValueAtTime(0.00001, t + p[2]);
      o.connect(e); e.connect(bus); o.start(t); o.stop(t + p[2] + 0.05);
    });
  }

  // A heartbeat: a sine that drops in pitch. On a phone speaker the low end
  // vanishes and what is left is the soft thump of its first few cycles.
  function kick(t, level) {
    const o = ac.createOscillator(); o.type = "sine";
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(47, t + 0.14);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(level, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.38);
    o.connect(g); g.connect(out.beat); o.start(t); o.stop(t + 0.42);
  }
  function hat(t, level) {
    const src = ac.createBufferSource(); src.buffer = noise();
    const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 7200;
    const g = ac.createGain();
    g.gain.setValueAtTime(level, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    route(src, hp, null); hp.connect(g); route(g, out.beat, 0.3);
    src.start(t, Math.random() * 1.5, 0.07);
  }
  // A riser: noise through a band that climbs, swelling, into the reverb.
  function riser(t, dur, peak) {
    const src = ac.createBufferSource(); src.buffer = noise(); src.loop = true;
    const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 2.2;
    bp.frequency.setValueAtTime(420, t); bp.frequency.exponentialRampToValueAtTime(5200, t + dur);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + dur * 0.92);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.25);
    src.connect(bp); bp.connect(g); g.connect(out.bed); g.connect(out.verb);
    src.start(t); src.stop(t + dur + 0.3);
  }
  function chime(t, freq, level, dest) {
    const o = ac.createOscillator(); o.type = "sine"; o.frequency.value = freq;
    const o2 = ac.createOscillator(); o2.type = "sine"; o2.frequency.value = freq * 2.01;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(level, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3);
    const g2 = ac.createGain(); g2.gain.value = 0.16;
    o.connect(g); o2.connect(g2); g2.connect(g);
    g.connect(dest || out.echo); g.connect(out.verb);
    o.start(t); o2.start(t); o.stop(t + 3.1); o2.stop(t + 3.1);
  }

  /* ───────── the bed ───────── */
  function startDrone(t) {
    const nodes = [];
    const filt = ac.createBiquadFilter(); filt.type = "lowpass"; filt.frequency.value = 300; filt.Q.value = 0.7;
    const lfo = ac.createOscillator(); lfo.frequency.value = 1 / 22;
    const lfoAmt = ac.createGain(); lfoAmt.gain.value = 110;
    lfo.connect(lfoAmt); lfoAmt.connect(filt.frequency); lfo.start(t);
    const g = ac.createGain(); g.gain.value = 0.085;
    filt.connect(g); g.connect(out.bed);
    [[38, "sine", 0, 0.6], [45, "triangle", 4, 0.45], [50, "sine", -5, 0.5], [57, "sine", 6, 0.16]].forEach(function (v) {
      const o = ac.createOscillator(); o.type = v[1]; o.frequency.value = mtof(v[0]); o.detune.value = v[2];
      const vg = ac.createGain(); vg.gain.value = v[3];
      o.connect(vg); vg.connect(filt); o.start(t);
      nodes.push(o);
    });
    // Solar wind, half as loud as it was: a narrow band of noise that wanders.
    const wind = ac.createBufferSource(); wind.buffer = noise(); wind.loop = true;
    const band = ac.createBiquadFilter(); band.type = "bandpass"; band.frequency.value = 1500; band.Q.value = 5;
    const wl = ac.createOscillator(); wl.frequency.value = 0.023;
    const wa = ac.createGain(); wa.gain.value = 800;
    wl.connect(wa); wa.connect(band.frequency); wl.start(t);
    const wg = ac.createGain(); wg.gain.value = 0.026;
    wind.connect(band); band.connect(wg); wg.connect(out.bed); wind.start(t);
    nodes.push(lfo, wl, wind);
    return nodes;
  }

  /* One beat of the loop. lb is the loop's own beat count: sixteen to a
     chord, four chords to the cycle. */
  function loopBeat(lb, t) {
    const ci = Math.floor(lb / 16) % 4, pos = lb % 16, notes = LOOP[ci];
    if (pos === 0) chord(t, notes, 16 * BEAT);
    const up = notes.slice(1).map(function (m) { return m + 12; });
    const arp = [0, 1, 2, 3, 2, 1, 3, 2];
    const light = lite();
    if (ci === 0) {
      // rest: the release lands here, then one small figure that climbs
      if (pos === 0 && song.flown) {
        PENT.slice(3, 9).forEach(function (m, i) { pluck(t + i * BEAT / 4, m + 12, 0.03 - i * 0.003); });
      }
      if (pos === 6 && Math.random() < 0.7) [0, 1, 2].forEach(function (k) { pluck(t + k * BEAT / 2, up[k], 0.026); });
    } else if (ci === 1) {
      // the pulse enters: quarter notes, then eighths, growing
      const lvl = 0.012 + 0.016 * pos / 15;
      pluck(t, up[arp[pos % 8]], lvl);
      if (pos >= 8 && !light) pluck(t + BEAT / 2, up[arp[(pos + 3) % 8]], lvl * 0.8);
    } else if (ci === 2) {
      // eighths, with a sixteenth pickup into every bar
      for (let k = 0; k < 2; k++) pluck(t + k * BEAT / 2, up[arp[(pos * 2 + k) % 8]], 0.028);
      if (pos % 4 === 3 && !light) pluck(t + BEAT * 0.75, up[3] + 2, 0.02);
    } else {
      // the lift: sixteenths that climb an octave, and a riser into the D
      const n = pos < 8 || light ? 2 : 4;
      for (let k = 0; k < n; k++) {
        const step = pos * n + k, oct = pos >= 12 ? 12 : 0;
        pluck(t + k * BEAT / n, up[arp[step % 8]] + oct, 0.024 + 0.008 * pos / 15);
      }
      if (pos === 8) riser(t, 8 * BEAT, 0.05);
      song.flown = true;
    }
  }

  /* One beat of the opening cue. */
  function openingBeat(b, t) {
    if (b === 0) chord(t, NIGHT, 4 * BEAT, 0.9);
    if (b === 4) chord(t, WONDER, 4 * BEAT, 1);
    if (b === 8) chord(t, LIFT, 2 * BEAT, 1.05);
    if (b >= 2 && b < 10) kick(t, 0.07 + 0.018 * (b - 2));
    if (b >= 6 && b < 10) { hat(t + BEAT / 2, 0.02 + 0.006 * (b - 6)); if (!lite()) hat(t + BEAT * 0.75, 0.012); }
    if (b === 4) riser(t, 6 * BEAT, 0.055);
    if (b === 10) {
      // India lands
      kick(t, 0.2);
      chord(t, HOME, 16 * BEAT, 1.15);
      PENT.forEach(function (m, i) { pluck(t + i * BEAT / 4, m + 12, 0.034 - i * 0.002); });
      chime(t + 0.02, mtof(86), 0.05);
    }
    if (b === 12) {
      // the name: the home note and its fifth, once
      chime(t + BEAT / 2, mtof(74), 0.06);
      chime(t + BEAT / 2 + 0.09, mtof(81), 0.035);
    }
  }

  // The step sequencer: every 300ms, schedule whatever falls in the next 0.9s.
  function stepper() {
    clearTimeout(stepT);
    if (!song || !ac) return;
    const ahead = now() + 0.9;
    while (song.t0 + song.beat * BEAT < ahead) {
      const b = song.beat, t = song.t0 + b * BEAT;
      if (t >= now() - 0.05) {
        if (song.opening && b < OPENING_BEATS) openingBeat(b, t);
        else loopBeat(song.opening ? b - OPENING_BEATS + 16 : b, t);
      }
      song.beat++;
    }
    stepT = setTimeout(stepper, 300);
  }

  /* Random, sparse things on top: a star chime every few seconds and a
     cosmic-ray tick on a Poisson clock (gaps random the way real decays
     are), now about one in six seconds and soft. */
  const STARS = [74, 76, 78, 81, 83, 86];
  function scheduleChime() {
    chimeT = setTimeout(function () {
      if (!song) return;
      chime(now() + 0.02, mtof(STARS[Math.floor(Math.random() * STARS.length)]), 0.032 + Math.random() * 0.02);
      scheduleChime();
    }, 4000 + Math.random() * 7000);
  }
  function scheduleRay() {
    rayT = setTimeout(function () {
      if (!song) return;
      tick(now() + 0.01, 0.028, out.bed);
      scheduleRay();
    }, -Math.log(1 - Math.random()) * 6000);
  }

  function startSong(opening, lights) {
    if (!ensure() || song) return;
    const t = now() + 0.06;
    song = { t0: t, beat: 0, opening: !!opening, flown: false };
    drone = startDrone(t);
    const bed = out.bed.gain;
    bed.cancelScheduledValues(t);
    bed.setValueAtTime(Math.max(0.0001, bed.value), t);
    if (opening) {
      // The opening swells in over two beats and the pad's filter opens with
      // the turn, wide at the landing, then settles.
      bed.linearRampToValueAtTime(0.62, t + 2 * BEAT);
      bed.setTargetAtTime(0.44, t + 16 * BEAT, 3);
      const f = out.tone.frequency;
      f.cancelScheduledValues(t);
      f.setValueAtTime(420, t);
      f.exponentialRampToValueAtTime(1100, t + 8 * BEAT);
      f.exponentialRampToValueAtTime(2600, t + 10 * BEAT);
      f.setTargetAtTime(1300, t + 13 * BEAT, 3);
      // Every country that lights is a note, rising from D4 to D6 as the
      // count rises, on the moment it lights.
      // Lights that share a grid slot sound as a chord of two at most.
      const inSlot = {};
      (lights || []).forEach(function (l) {
        const slot = Math.round(l.t);
        inSlot[slot] = (inSlot[slot] || 0) + 1;
        if (inSlot[slot] > 2) return;
        const k = Math.floor((l.i / Math.max(1, l.n)) * (PENT.length - 1)) + (inSlot[slot] === 2 ? 2 : 0);
        pluck(t + l.t / 1000, PENT[Math.min(PENT.length - 1, k)], inSlot[slot] === 1 ? 0.036 : 0.022);
      });
    } else {
      bed.linearRampToValueAtTime(0.44, t + 3);
    }
    stepper();
    scheduleChime();
    scheduleRay();
  }

  function stopSong() {
    if (!ac || !song) return;
    const t = now();
    out.bed.gain.cancelScheduledValues(t);
    out.bed.gain.setValueAtTime(out.bed.gain.value, t);
    out.bed.gain.linearRampToValueAtTime(0, t + 0.6);
    const nodes = drone || [];
    drone = null; song = null;
    clearTimeout(stepT); clearTimeout(chimeT); clearTimeout(rayT);
    setTimeout(function () { nodes.forEach(function (n) { try { n.stop(); } catch (e) { /* already stopped */ } }); }, 700);
    // Notes already scheduled ahead play out under the fade; a fresh graph
    // next time means none of them can leak into the next start.
    const old = out;
    setTimeout(function () { try { old.master.disconnect(); } catch (e) { /* gone */ } }, 900);
    out = build();
  }

  /* ───────── effects ───────── */
  // A Geiger tick, softer than it was: filtered noise and a short sine knock.
  function tick(t, level, dest) {
    const src = ac.createBufferSource(); src.buffer = noise();
    const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 2400;
    const g = ac.createGain();
    g.gain.setValueAtTime(level, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.012);
    src.connect(hp); hp.connect(g); g.connect(dest || out.fx);
    src.start(t, Math.random() * 1.5, 0.02);
    const o = ac.createOscillator(); o.type = "sine"; o.frequency.value = 1700 + Math.random() * 300;
    const og = ac.createGain();
    og.gain.setValueAtTime(level * 0.4, t);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.008);
    o.connect(og); og.connect(dest || out.fx); o.start(t); o.stop(t + 0.012);
  }

  function sweep(from, to, dur, type, level) {
    const t = now();
    const o = ac.createOscillator(); o.type = type; o.frequency.setValueAtTime(from, t);
    o.frequency.exponentialRampToValueAtTime(to, t + dur);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(level, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(out.fx); o.start(t); o.stop(t + dur + 0.02);
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
    src.connect(bp); bp.connect(g); g.connect(out.fx);
    src.start(t, Math.random(), dur + 0.05);
  }

  const FX = {
    decay: function () { tick(now(), 0.34); if (Math.random() < 0.35) tick(now() + 0.045, 0.24); },
    alpha: function () { sweep(900, 130, 0.2, "triangle", 0.3); hiss(3200, 500, 0.22, 0.2); },
    gamma: function () { chime(now(), mtof(86), 0.2, out.fx); chime(now(), mtof(93), 0.07, out.fx); },
    fade: function () { sweep(1400, 520, 0.35, "sine", 0.16); },
    orbit: function () { hiss(380, 1800, 0.42, 0.15); sweep(196, 294, 0.4, "sine", 0.07); },
    chain: function () {
      // A decay chain: ticks that start sparse, crowd together, then thin
      // out, while D major rises under them.
      let t = now() + 0.02;
      for (let i = 0; i < 16; i++) {
        const k = i / 15;
        t += 0.02 + 0.11 * Math.pow(Math.abs(k - 0.55) * 1.8, 1.5) * Math.random();
        tick(t, 0.2 + 0.15 * Math.random());
      }
      [74, 78, 81, 86].forEach(function (m, i) { chime(now() + 0.18 + i * 0.11, mtof(m), 0.08); });
    }
  };

  /* ───────── control ───────── */
  function isOn() { return pref === "on" && !quietVisit; }
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
    const go = function () { startSong(false); audible = true; paint(); announce(first); };
    if (ac.state !== "running") ac.resume().then(go, function () { /* still blocked */ });
    else go();
  }
  function turnOff() {
    stopSong();
    audible = false; paint();
    if (ac) setTimeout(function () { if (!audible && ac.state === "running") ac.suspend(); }, 700);
    announce(false);
  }

  function setPref(v) {
    pref = v;
    quietVisit = false;
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
    // The opening's gate decides for itself: Begin starts the music with the
    // turn, and Begin in silence does not start it at all.
    if (e && e.target && e.target.closest && e.target.closest("#intro")) return;
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

  /* The opening's Begin. Called inside the tap, so the context may start
     here even where a browser wants that; resolves with how many ms the
     picture should wait so that what is heard and what is seen start
     together (the scheduling lead plus the device's output latency). If the
     context will not run, the picture goes anyway after a moment. */
  function begin(lights) {
    unlocked = true;
    listen(false);
    if (!isOn() || !ensure()) return Promise.resolve(0);
    return new Promise(function (resolve) {
      let settled = false;
      const settle = function (ms) { if (!settled) { settled = true; resolve(ms); } };
      ac.resume().then(function () {
        if (!song) {
          // Late (the picture already went without it): the plain bed, not
          // a cue that would now be out of step with what is on screen.
          startSong(!settled, lights);
          audible = true; paint(); announce(true);
        }
        const lat = (ac.outputLatency || ac.baseLatency || 0);
        settle(Math.round((0.06 + Math.min(0.25, lat)) * 1000));
      }, function () { settle(0); });
      setTimeout(function () { settle(0); }, 450);
    });
  }

  let btn = null, introBtn = null;
  function paint() {
    // The buttons show what is actually happening, not the stored wish:
    // before the first tap nothing can play, so they read as off until then.
    [btn, introBtn].forEach(function (b) {
      if (!b) return;
      b.setAttribute("aria-pressed", String(audible));
      b.classList.toggle("is-on", audible);
      b.title = audible ? "Mute the galaxy sound" : "Play the galaxy sound";
    });
  }
  function toggle() {
    unlocked = true;
    listen(false);
    if (audible) { setPref("off"); turnOff(); }
    else { setPref("on"); turnOn(false); setTimeout(function () { play("gamma"); }, 60); }
  }

  function init() {
    btn = document.getElementById("soundToggle");
    introBtn = document.getElementById("introSound");
    if (!AC) { if (btn) btn.hidden = true; if (introBtn) introBtn.hidden = true; return; }
    paint();
    if (btn) btn.addEventListener("click", toggle);
    if (introBtn) introBtn.addEventListener("click", toggle);
    listen(true);
    document.addEventListener("visibilitychange", function () {
      if (!ac) return;
      if (document.hidden) ac.suspend();
      else if (audible) ac.resume();
    });
  }

  /* For the loudness check only: render the opening and what follows offline
     through the same graph and return the samples' promise. Never used by
     the page itself. */
  function render(seconds) {
    const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    const saved = [ac, out, song, noiseBuf, drone];
    ac = new OAC(2, Math.ceil(44100 * seconds), 44100);
    noiseBuf = null;
    out = build();
    const lights = [];
    for (let i = 0; i < 34; i++) lights.push({ t: 300 + i * 175, i: i, n: 34 });
    song = null;
    startSong(true, lights);
    clearTimeout(stepT); clearTimeout(chimeT); clearTimeout(rayT);
    while (song.t0 + song.beat * BEAT < seconds) {
      const b = song.beat, t = song.t0 + b * BEAT;
      if (song.opening && b < OPENING_BEATS) openingBeat(b, t); else loopBeat(b - OPENING_BEATS + 16, t);
      if (b % 6 === 3) chime(t, mtof(STARS[b % STARS.length]), 0.045);
      if (b % 9 === 5) tick(t, 0.028, out.bed);
      song.beat++;
    }
    const off = ac;
    ac = saved[0]; out = saved[1]; song = saved[2]; noiseBuf = saved[3]; drone = saved[4];
    return off.startRendering();
  }

  window.DCSound = {
    play: play, isOn: isOn, begin: begin, toggle: toggle,
    quiet: function () { quietVisit = true; unlocked = true; listen(false); paint(); },
    _render: render
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
