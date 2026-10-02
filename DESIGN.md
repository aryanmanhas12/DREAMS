---
# DESIGN.md: how Dream Counsellor looks. Read this before any visual work.
# It wins over a skill's generic taste rules. Colour values here MUST match
# assets/styles.css: tools/check.js fails the build on any drift.
name: Dream Counsellor
system: Nebula (galaxy), 30 September 2026
colors:
  space:      # :root and :root[data-theme="dark"]: the default, whatever the system says
    "--paper": "#0F0A26"
    "--paper-2": "#150E33"
    "--surface": "#1C1340"
    "--line": "#3A2C6E"
    "--line-soft": "#261B52"
    "--line-strong": "#7A6AB8"
    "--ink": "#F6F1FF"
    "--ink-2": "#D3C9F2"
    "--ink-3": "#B8ADE0"
    "--accent": "#FF9AD5"
    "--accent-2": "#FFC2E6"
    "--accent-wash": "#2A1A4E"
    "--fill": "#FF4FA8"
    "--fill-2": "#FF74BB"
    "--on-fill": "#1A0414"
    "--signal": "#FF8C5A"
    "--signal-wash": "#3A1B2A"
    "--gold": "#FFD447"
    "--gold-wash": "#3A2F14"
    "--gold-ink": "#1E1500"
    "--ok": "#72F0C0"
    "--warn": "#FFC766"
    "--globe": "#B79BFF"
    "--star": "#FFE58A"
    "--note": "#1D1446"
    "--note-line": "#5B3FA8"
    "--nebula-a": "rgba(255, 79, 168, .16)"
    "--nebula-b": "rgba(124, 77, 255, .17)"
    "--starlight": "#FFF6FF"
    "--ooh-paper": "#FFF8EE"
    "--ooh-ink": "#2A1636"
    "--ooh-gold": "#FFC857"
    "--ooh-mouth": "#7A2748"
  daylight:   # :root[data-theme="light"]: lavender paper, for reading in sunlight
    "--paper": "#F4F0FF"
    "--paper-2": "#FAF8FF"
    "--surface": "#FFFCFF"
    "--line": "#D9D0F0"
    "--line-soft": "#E8E2F8"
    "--line-strong": "#8A7CB8"
    "--ink": "#1A1036"
    "--ink-2": "#41366A"
    "--ink-3": "#54497F"
    "--accent": "#A0106E"
    "--accent-2": "#780B52"
    "--accent-wash": "#FBE3F2"
    "--fill": "#FF4FA8"
    "--fill-2": "#FF74BB"
    "--on-fill": "#1A0414"
    "--signal": "#B3301A"
    "--signal-wash": "#FCE3DC"
    "--gold": "#F5B800"
    "--gold-wash": "#FFF1C2"
    "--gold-ink": "#1E1500"
    "--ok": "#0E7A52"
    "--warn": "#8A5A00"
    "--globe": "#6A45D9"
    "--star": "#C2187A"
    "--note": "#FBF0FF"
    "--note-line": "#D9B8F0"
    "--nebula-a": "rgba(255, 79, 168, .10)"
    "--nebula-b": "rgba(124, 77, 255, .10)"
    "--starlight": "#6A45D9"
    "--ooh-paper": "#FFF8EE"
    "--ooh-ink": "#2A1636"
    "--ooh-gold": "#FFC857"
    "--ooh-mouth": "#7A2748"
typography:
  display: "Cormorant Garamond (roman + italic, variable 300-700), font-display: swap"
  body: "IBM Plex Sans (variable 300-700), font-display: optional (LCP; cached by the worker)"
  script: "Petit Formal Script, subset to the wordmark, salutation and closing line only"
  root-size: "106.25% on phones, 112.5% from 700px (percent, never px)"
  rules: "sentence case everywhere; lining-nums on counts and stat tiles; no monospace"
radius:
  surface: "3px (--r): panels, tiles, fields"
  card: "20px shell / 15px core (double-bezel)"
  bubble: "18px, tail corner 5px"
  control: "100px pill for every button; the top-bar controls are circles"
motion:
  ease-out: "cubic-bezier(.22, 1, .36, 1)"
  ease-spring: "cubic-bezier(.32, .72, 0, 1)"
  durations: "200-340ms for anything that answers the reader; the sky is slower"
  rule: "transform and opacity only, as transform keyframes on HTML elements; everything stops under prefers-reduced-motion and html.sky-still, and html.lite (2GB phones, Data Saver) gets the still version from the first paint"
---

# Dream Counsellor: design

A career compass for Indian medical students, drawn as a night sky. The page
is deep space; the three galaxy colours each do exactly one job, so colour
always means something.

## Colour roles

| Token | Space | Daylight | Job |
|---|---|---|---|
| `--paper` | `#0F0A26` | `#F4F0FF` | page ground (deep space) |
| `--paper-2` | `#150E33` | `#FAF8FF` | recessed panels |
| `--surface` | `#1C1340` | `#FFFCFF` | cards, bubbles, controls |
| `--line` | `#3A2C6E` | `#D9D0F0` | hairline dividers |
| `--line-soft` | `#261B52` | `#E8E2F8` | quieter dividers |
| `--line-strong` | `#7A6AB8` | `#8A7CB8` | edges of fields you type into (3:1+) |
| `--ink` | `#F6F1FF` | `#1A1036` | body text |
| `--ink-2` | `#D3C9F2` | `#41366A` | secondary text |
| `--ink-3` | `#B8ADE0` | `#54497F` | tertiary text, 4.5:1 even over the brightest sky |
| `--accent` | `#FF9AD5` | `#A0106E` | links, interactive text, focus |
| `--accent-2` | `#FFC2E6` | `#780B52` | emphasis inside the read |
| `--accent-wash` | `#2A1A4E` | `#FBE3F2` | hovers, the tier-2 chip, a chosen answer |
| `--fill` | `#FF4FA8` | `#FF4FA8` | anything you press (nebula pink) |
| `--fill-2` | `#FF74BB` | `#FF74BB` | its hover |
| `--on-fill` | `#1A0414` | `#1A0414` | text on --fill |
| `--signal` | `#FF8C5A` | `#B3301A` | deadlines ONLY (solar flare) |
| `--signal-wash` | `#3A1B2A` | `#FCE3DC` | behind a deadline |
| `--gold` | `#FFD447` | `#F5B800` | the tier-1 chip ONLY (star yellow) |
| `--gold-wash` | `#3A2F14` | `#FFF1C2` | tier-1 surroundings |
| `--gold-ink` | `#1E1500` | `#1E1500` | text on --gold |
| `--ok` | `#72F0C0` | `#0E7A52` | open now, funded, free (aurora) |
| `--warn` | `#FFC766` | `#8A5A00` | opening soon (amber) |
| `--globe` | `#B79BFF` | `#6A45D9` | globe graticule and body |
| `--star` | `#FFE58A` | `#C2187A` | globe programme dots |
| `--note` | `#1D1446` | `#FBF0FF` | speech bubbles |
| `--note-line` | `#5B3FA8` | `#D9B8F0` | bubble edges |
| `--nebula-a` | `rgba(255, 79, 168, .16)` | `rgba(255, 79, 168, .10)` | pink cloud behind the sky |
| `--nebula-b` | `rgba(124, 77, 255, .17)` | `rgba(124, 77, 255, .10)` | violet cloud behind the sky |
| `--starlight` | `#FFF6FF` | `#6A45D9` | the sky's stars |
| `--ooh-paper` | `#FFF8EE` | `#FFF8EE` | every speech bubble (Ooh's paper, shared with Ronak and Arun) |
| `--ooh-ink` | `#2A1636` | `#2A1636` | bubble text, border and hard shadow |
| `--ooh-gold` | `#FFC857` | `#FFC857` | Ooh's name plate, focus ring on Ooh's controls |
| `--ooh-mouth` | `#7A2748` | `#7A2748` | "Next", and emphasis inside a bubble |

Every text pair is AA in both themes. The painted sky is checked too:
`tools/test/sky.js` photographs it and fails if any text token on it drops
under 4.5:1.

## Components

- **Buttons** are pills. One primary (pink fill, near-black label) per screen;
  the hero's has a star orbiting its edge. Secondary buttons are outlined in
  `--line-strong`. Press feedback is a spring scale to .97.
- **Programme cards** are double-bezel: a translucent 5px shell with a hairline
  edge holding a surface core with a lit top edge. On a mouse, a soft nebula
  spotlight follows the pointer across the card.
- **The hero headline** rises word by word once on arrival (30ms apart, on the
  spring curve). The count inside it is rendered from data like every number.
- **Top-bar controls** (speaker, theme, menu) are three matching circles; their
  tap areas grow to 44px under the drawn circle, never through it. The menu's
  bars fold into an X and the drawer's links arrive in a short stagger.
- **Ooh** is the guide Dream Counsellor shares with Ronak and Arun: a small
  sunrise-gold creature drawn by `ooh.js` (their `ooh.mjs` as a plain script,
  never edited here). Ooh answers "What do you want?" in the hero, asks the
  survey questions, and says one or two lines at the top of each view, typed
  out with a soft blip. It can be tucked into the corner or hidden from the
  footer. A fixed script, never presented as an AI.
- **Speech bubbles** are all Ooh's: cream paper, plum ink, a 3px border, a
  4px hard offset shadow, a 20px radius with the tail corner at 6px, and the
  name on a gold plate. The survey question and its note, the results read
  and every notice use it.
- **Sounds**: the CC0 uisfx "soft" pack, the same files as Ronak and Arun,
  on taps; the synthesised galaxy effects keep the answer, Continue and save
  moments. One speaker in the top bar silences both.
- **Tier chips** are an ordinal scale: tier 1 is the only filled chip (gold),
  weight drops to a dashed outline at tier 5.
- **Status** is a dot plus a word (open, opening soon, closed, no call), never
  colour alone.
- **The opening** (intro.js): once a visit, the Earth turns once in the real
  sky, each country in the index lights as it crosses the middle and is named
  on the canvas, Ooh flies in and hops on the beat, and the turn lands on
  India with three pink rings; then the wordmark, then the page. Fifteen beats
  at 94 bpm, 9.6 seconds, Ronak's length. A gate first ("Begin", "Begin in
  silence") because sound needs a tap. Skip (top right, from the first
  frame) and Escape leave it at any moment, straight to the page with no tour
  on top. It never plays under reduced motion, after "Pause the moving sky",
  or for a plan link.
- **Music** (sound.js): one piece in D major on a step sequencer. A calm bed
  (drone, four chords through a soft reverb, a thin wind, rare chimes and
  ticks) carries a forty-second flight: a felt-piano pulse that enters,
  quickens, climbs and releases into the next D. The opening's cue is on the
  same grid as its picture, and every country that lights is a note.
- **The sky** (space.js): one Milky Way canvas painted once and turned by CSS,
  tiny CSS-twinkled stars, a spiral galaxy, shooting stars and comets. Nothing
  runs per frame. "Pause the moving sky" in the footer stops it (WCAG 2.2.2).

## Do

- Use only these tokens; a new colour is a new token here AND in styles.css,
  in the same commit.
- Animate transform and opacity with transform keyframes on HTML elements.
- Gate pointer effects on `(hover: hover) and (pointer: fine)`.
- Give every new continuous animation a still state under `html.sky-still`,
  `html.lite` and reduced motion.
- Keep the signal colour for deadlines and gold for tier 1.

## Don't

- No gradient text, no accent phrase inside a headline, no all-caps labels,
  no eyebrow tags above headings, no emoji, no glassmorphism on the UI, no
  `->` on link text, no coloured edge stripes, no fade-up on every section.
- No animation of layout properties, of SVG children, or of the individual
  `rotate:`/`scale:` properties.
- No font preload (it breaks file://), no render-deferred stylesheet (it caused
  CLS 0.563).
