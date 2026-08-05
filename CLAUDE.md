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

## Test-harness rules (four false failures came from ignoring these)

- **Always scope selectors.** `[data-goto="x"]` matches several elements across views, some
  hidden. Use `#topnav .navlink[data-goto="x"]`.
- **`#view-results` precedes `#view-browse` in the DOM**, so a bare `.star-btn` `.first()`
  grabs a button inside the hidden results view. Use `#browseCards .star-btn`.
- **Freeze the globe before probing it** — launch with `reducedMotion: 'reduce'`, or
  auto-rotation moves the point between the assertion and the click.
- **Re-query after any re-render.** Clicking a filter or un-starring rebuilds the DOM and
  detaches previously collected element handles.
- Playwright is installed; Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
- `github.io` is blocked by this sandbox's proxy (403 on CONNECT). A failed fetch there says
  nothing about whether the site is live — never report it as a site problem.

## Design system

- **Fonts are self-hosted variable woff2 in `assets/fonts/`** — no CDN. Cormorant Garamond
  (display, calligraphic), IBM Plex Sans (body), IBM Plex Mono (instrument layer: tags, dates,
  counts). `build.js` inlines them as data URIs because the published artifact runs under a
  CSP that blocks external requests.
- **Do not use Inter.** It is the single font that most makes a page read as AI-generated.
  Same caution applies to the warm-cream + terracotta + serif combination.
- **Palette is entirely `:root` custom properties**, defined three times: `:root`, the
  `prefers-color-scheme: dark` media query, and both `:root[data-theme=…]` overrides. Swapping
  the palette is a token edit — never hard-code a colour in a component.
- **Vermilion `--signal` is reserved for deadlines only.** Jade `--accent` is for anything
  interactive. Do not spend the signal colour on decoration.
- **All motion must be disabled under `prefers-reduced-motion`**, and reveal states must fall
  back to *visible* — never stranded at `opacity: 0` when `IntersectionObserver` is missing.

## Workflow

- Develop and push to `claude/career-platform-indian-students-nc6yiq`; keep `main` in sync.
- Run `node build.js` before committing if any asset changed, then re-verify the bundle
  separately — the bundle has broken while the source was fine.
- Data integrity check lives in the scratchpad, not the repo; recreate it if needed. It should
  assert unique ids, that every `data-impact.js` key resolves to a real programme, that every
  field/stage tag is in the taxonomy, that every URL is https, and that every referenced
  country has a profile in `data-countries.js`.

## Open with the user

- **Colour palette**: they are researching one and will send hex values. Until then, keep the
  current identity — a vibrancy pass was applied, but no new brand hue was chosen.
- **GitHub Pages**: `.github/workflows/pages.yml` is committed but needs a one-time manual
  toggle at Settings → Pages → Source: GitHub Actions. Never confirmed live.
