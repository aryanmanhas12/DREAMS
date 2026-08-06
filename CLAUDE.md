# Dream Counsellor — project rules

A career-guidance site for Indian medical students. Three questions (skill / anger / flow)
plus practical and emotional constraints → a ranked list of real programmes with application
steps. Static, client-side, no backend.

## Architecture — do not break these

- **No framework, no build step for the site itself.** Plain `<script>` files that attach to
  `window`, deliberately NOT ES modules, so `index.html` works over `file://`. `build.js`
  exists only to produce the single-file artifact bundle in `dist/` (gitignored).
- **Script load order in `index.html` matters.** All `data-*.js` files push into `window.DB.*`;
  `app.js` must load last, `data-coast.js` before `globe.js`.
- **Facts and judgements live in separate files.** `data-impact.js` holds tiers, odds and
  verdicts; the programme data files hold facts. Anyone forking should be able to disagree
  with a tier without touching data. Keep them separate.
- **The globe is an enhancement, never the only route to anything.** Browse and search must
  always reach the same places — that is what keeps a `<canvas>` usable for keyboard and
  screen-reader users.
- **Every card links its official page, and the UI says that page is authoritative.** Deadlines
  and amounts drift each cycle; never present them as verified-current.

## Known traps — each of these cost real debugging time

- **`build.js` must use function replacers.** A string second argument to `String.replace()`
  treats `$$` as a pattern token, which silently corrupted the `$$` selector helper in the
  bundle. Same applies to any future inlining step.
- **ICS line folding measures UTF-8 BYTES, not characters.** RFC 5545 caps content lines at
  75 octets and this content is full of `≈ £ · —`. Character-length folding emits invalid
  over-long lines that stricter calendar parsers reject.
- **Grid columns need `minmax(min(Npx, 100%), 1fr)`.** A bare `minmax(310px, 1fr)` forces
  horizontal scroll on any viewport narrower than the minimum.
- **Form controls must be ≥16px** (`.search-input`, `.sort-select`, `.q-free`). Anything
  smaller triggers Safari's forced zoom-on-focus on iOS and yanks the layout on every tap.
- **`white-space: nowrap` is unsafe on `.record` spans** — some hold a full sentence
  (application windows), not a short badge.
- **Country filter is NOT the text search.** `countryFilter` matches `item.country` exactly.
  A text search for "india" also matches every description mentioning Indian students (65 vs
  16), which contradicts the count the globe shows.
- **Cormorant Garamond defaults to old-style figures** that descend below the baseline. Right
  inside a sentence, wrong in a data tile — force `lining-nums` on stat tiles and counts.
- **Decorative overlays must never use a negative horizontal inset.** `.hero::before` with
  `inset: -10% -5% 0` put 20px of horizontal scroll on every phone. Bleed vertically if you
  must; sideways is always a scrollbar. Let the gradient's own falloff do the softening.
- **A `<select>` in a flex row needs `min-width: 0`.** It is sized by its longest option and
  will not shrink below it — `flex: none` on `.sort-wrap` made that intrinsic width binding
  and broke 320px. `min-width: 0` is the part that does the work, not the flex basis.
- **A script face sets far wider than a serif at the same nominal size.** The wordmark that
  fits at 390px pushes the topbar controls off a 320px screen; step the size down under
  400px rather than truncating, because a clipped wordmark reads as broken.
- **`REGIONS` in `app.js` must list every non-place `country` value**, and every country it
  does *not* exclude must have coordinates in `globe.js`. Counted-but-unplottable makes the
  stat tile and the globe disagree on screen — the same class of bug as the old India 16-vs-65.
  Plotted-but-not-counted is fine and deliberate (`Gulf`, `Baltics`). The data check enforces
  the one direction that matters.

## Test-harness rules (six false failures came from ignoring these)

- **Always scope selectors.** `[data-goto="x"]` matches several elements across views, some
  hidden. Use `#topnav .navlink[data-goto="x"]`.
- **`#view-results` precedes `#view-browse` in the DOM**, so a bare `.star-btn` `.first()`
  grabs a button inside the hidden results view. Use `#browseCards .star-btn`.
- **Freeze the globe before probing it** — launch with `reducedMotion: 'reduce'`, or
  auto-rotation moves the point between the assertion and the click.
- **Re-query after any re-render.** Clicking a filter or un-starring rebuilds the DOM and
  detaches previously collected element handles.
- **Contrast checkers must handle `color(srgb 0.94 0.93 0.89 / 0.88)`.** Those are 0–1 floats;
  reading them as 0–255 turns near-white into near-black and invents failures. Distinguish by
  the function name, never by magnitude — `rgb(0,0,1)` is a legitimate near-black.
- **iOS zoom-on-focus is a text-entry behaviour.** Only `input`, `select` and `textarea`
  trigger it. Flagging every `<button>` under 16px buried two real findings under 190 lines
  of noise.
- Playwright is installed; Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
- `github.io` is blocked by this sandbox's proxy (403 on CONNECT). A failed fetch there says
  nothing about whether the site is live — never report it as a site problem.

## Design system

- **Fonts are self-hosted woff2 in `assets/fonts/`** — no CDN. Cormorant Garamond (display),
  IBM Plex Sans (body), IBM Plex Mono (instrument layer: tags, dates, counts), Petit Formal
  Script (`--font-script`). The first three are variable; the script ships one weight.
  `build.js` inlines all of them as data URIs because the published artifact runs under a CSP
  that blocks external requests.
- **The script is the counsellor's voice and nothing else** — wordmark, the salutation on your
  read, the closing line. Never on anything the reader has to scan or compare. It was chosen
  over Pinyon and Parisienne on x-height; both of those vanish at wordmark size.
- **Root size is a percentage, and display sizes do not follow it.** `html` is 106.25% on
  phones and 112.5% from 700px, so a reader who raised their browser default still gets it.
  Raising that root inflated every `rem` display size by the same 12.5% and the hero went
  oversized — the display scale was hand-retuned down ~10% afterwards. Change one, check the
  other.
- **Do not use Inter.** It is the single font that most makes a page read as AI-generated.
  Same caution applies to the warm-cream + terracotta + serif combination.
- **Palette is entirely `:root` custom properties**, defined three times: `:root`, the
  `prefers-color-scheme: dark` media query, and both `:root[data-theme=…]` overrides. Swapping
  the palette is a token edit — never hard-code a colour in a component.
- **Vermilion `--signal` is reserved for deadlines only.** Teal `--accent` is for anything
  interactive, and `--gold` is tier 1 and nothing else. Signal used to leak onto the tier-1
  badge; `--gold` exists so it does not. Do not spend the signal colour on decoration.
- **Tier badges are an ordinal scale and are drawn as one** — tier 1 is the only filled chip
  on the page, and weight drops with the grade down to a dashed outline at tier 5. That is
  what lets someone find the handful of transformative entries by scanning.
- **All motion must be disabled under `prefers-reduced-motion`**, and reveal states must fall
  back to *visible* — never stranded at `opacity: 0` when `IntersectionObserver` is missing.

## Workflow

- Develop and push to `claude/career-platform-indian-students-nc6yiq`; keep `main` in sync.
- Run `node build.js` before committing if any asset changed, then re-verify the bundle
  separately — the bundle has broken while the source was fine.
- **`data-meta.js` carries the review date, and it is rendered from data, never written into
  the HTML.** Bump it only when entries have genuinely been re-checked against their official
  pages, and narrow `scope` to what was actually covered. Backdating or over-claiming makes
  the stamp worse than having none. When the meta is absent the UI says the page is unstamped
  rather than rendering a reassuring blank.
- **Deadlines move, and a wrong date is worse than no date** — a student who believes STS
  closes in January will not look again in May. Three were found stale in one pass: ICMR-STS
  had moved from a ~10 Jan close to **30 May**; the IAS-INSA-NASI summer fellowship runs to
  **31 January**, not mid-December; and NOS runs a first round **late April to early June**
  with a second round in Sept–Oct only when slots go unfilled. Re-check the Indian schemes
  first each cycle — they are the most used and they move the most.
- **This sandbox's proxy denies CONNECT to almost everything** (403), so `node`-based link
  checking and `WebFetch` both fail on live sites. That is the network policy, not a dead
  link — never record a URL as broken on that evidence. `WebSearch` still works and is the
  only way to verify a fact from here.
- Data integrity check lives in the scratchpad, not the repo; recreate it if needed. It should
  assert unique ids, that every `data-impact.js` key resolves to a real programme, that every
  field/stage tag is in the taxonomy, that every URL is https, and that every referenced
  country has a profile in `data-countries.js`.

## Open with the user

- **Colour palette**: settled. They picked "Citrus & Slate" from their own research, then asked
  for it turned up; the chroma was raised across both themes and the dark ground moved off
  neutral navy onto a real petrol. They have signed off on the result — do not change hues
  again without being asked.
- **GitHub Pages**: `.github/workflows/pages.yml` is committed but needs a one-time manual
  toggle at Settings → Pages → Source: GitHub Actions. Never confirmed live.
