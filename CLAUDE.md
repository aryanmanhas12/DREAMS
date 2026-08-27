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
- **Do not add `<link rel="preload">` for the fonts.** A font preload needs
  `crossorigin` or HTTP fetches each file twice; with `crossorigin` the request is
  CORS-mode, which a `file://` page (origin `null`) may not make, so it errors on
  every local open. This page must work from the filesystem, and the published
  bundle inlines every face as a data URI, so there is nothing to win. Tried and
  reverted once already.
- **The hero grid is flat, and that is deliberate.** `eyebrow / h1 / globe / lede /
  actions / how` are direct grid children so the source order *is* the phone order,
  with `grid-template-areas` moving the globe into a second column from 920px.
  Do not reintroduce a `.hero-copy` wrapper or reach for `order:` — `order` would
  desync tab order from reading order, which is the thing this layout avoids.
- **Space in the hero belongs to the grid `gap`, not to element margins.** Both
  `.hero-lede` and `.hero-actions` carried bottom/top margins that doubled with the
  row gap and pushed the primary button below the fold on a 390×844 phone.
- **Quote marks on `.statement` mean "this is a claim", and only that.** The three
  intro cards carry them because they are positions the site asserts; the survey
  question reuses the same card shape *without* them, because a question is not a
  quotation and the mark would misdescribe the text. Do not add them there.
- **`REGIONS` in `app.js` must list every non-place `country` value**, and every country it
  does *not* exclude must have coordinates in `globe.js`. Counted-but-unplottable makes the
  stat tile and the globe disagree on screen — the same class of bug as the old India 16-vs-65.
  Plotted-but-not-counted is fine and deliberate (`Gulf`, `Baltics`). The data check enforces
  the one direction that matters.

- **Check eligibility before impact — a programme you cannot enter is worse than one you never listed.** DAAD WISE was in the index for months telling MBBS students "MBBS qualifies from year 2". It does not: WISE is restricted to Engineering, Maths and Science, to a 4-year bachelor's or 5-year integrated masters, and to a fixed institution list, so a medical student fails three separate tests. PMRF fails the same way — science and technology streams from the IITs, IISc, NITs and IISERs. Neither says no on its front page; you find out after weeks of cold-emailing for an invitation letter. **Before adding any entry, find the eligibility PDF and search it for the degree list. If MBBS is not named, assume excluded until the programme office says otherwise.** Both now live in `skipList`, which is where "looks open, is not" belongs.
- **Aggregator listicles recycle these traps.** Every "fully funded internships for Indian students" roundup still lists WISE for medics. Aggregators are fine for *finding* candidates and worthless for *verifying* them — always land on the programme's own eligibility page before writing an entry.
- **The `<head>` social-card counts cannot be rendered from data.** Link scrapers read raw HTML and never run the script, so those two numbers are typed by hand — and therefore have to be *asserted* by the data check, which is the only thing standing between a share card and last month's number. The three claim cards in the body are the opposite case: they render from data, because nothing scrapes them.
- **Touch targets grow under the visual box, never through it.** The topbar has to survive 320px next to a script wordmark that sets far wider than a serif, so the theme and menu buttons stay 32–36px visually and get to 44px via a centred `::after`. That adds zero layout. Two cautions: keep `.topbar-controls` gap at 12px or the two hit areas overlap and an edge tap on the theme toggle opens the menu instead; and always re-check 320px afterwards, because this is exactly the horizontally-bleeding overlay the `.hero::before` rule above warns about.

- **Watch the em-dash count; it is the single most recognised AI tell.** Measured at 955 across 87k words (≈11 per 1,000) before a cleanup pass took it to 789 (≈9). Human prose typically runs 1–2 per 1,000. This matters for a site whose whole claim is that a person wrote it after checking things. Two rules learned the hard way: a dash joining two independent clauses can safely become a full stop, and one introducing *and/but/so/which* can become a comma — but **only transform lines carrying exactly ONE dash.** A line with two is a parenthetical, and converting half of it orphans the rest: the first attempt turned a list of psychiatry departments into "neurology, and to a specific consultant". Verify afterwards that no changed line still contains a dash.
- **Never write "X is not A, it is B".** It is the most commonly identified AI construction there is, and the site had eight. Say the thing directly instead. The vocabulary tells (*delve, tapestry, testament, landscape, realm, leverage, seamless, robust*) are already near-absent here and should stay that way — specificity is what keeps them out.
- **A cleanup pass exposes pre-existing errors; do not assume you caused them.** Removing a dash surfaced "helps nobody — but so is the arithmetic", which had no antecedent for "so is" and had been wrong since it was written. Check `git show HEAD:<file>` before apologising for a bug you did not introduce.

## Test-harness rules (six false failures came from ignoring these)

- **The data check must load `data-*.js` in `index.html`'s order, not alphabetically.** Several files do `window.DB.study = window.DB.study || []` then push, while `data-study.js` does a bare `window.DB.study = [...]`. Load alphabetically and `data-abroad.js` pushes first, then `data-study.js` wipes it — 39 entries vanish and a dozen impact keys look orphaned. Parse the script tags out of `index.html` and follow them; that also catches a data file that exists on disk but is never loaded.
- **Playwright must open the mobile nav before clicking a navlink.** Below 760px `#topnav` is collapsed and a scoped `#topnav .navlink[data-goto=…]` click times out on "element is not visible", which reads like a broken view and is not. Click `#navToggle` first when the link is not visible.
- **Tap-target checks must probe `elementFromPoint`, not `getBoundingClientRect`.** The rect is the *visual* box and cannot see the `::after` that takes the topbar controls to 44px. Measuring the rect reports `36×36` on a button that is genuinely fine — a seventh false failure of the same family. Probe ±21px in all four directions and only report if a probe misses.
- **Seed `dc-tour-seen` before every Playwright load, or every click times out.** The tour auto-opens on a first visit, and *every fresh browser context is a first visit* — so it drops a modal scrim over the page and each click fails with "subtree intercepts pointer events", which reads exactly like a broken button and is not one. Use `ctx.addInitScript(() => localStorage.setItem("dc-tour-seen","1"))` so the run tests the returning-visitor page. The tour has its own harness (`tour.js`); do not exercise it by accident anywhere else.
- **The survey has two lengths, and `#startBtn` is now the SHORT one.** Three questions (skill/anger/flow) or all sixteen; `#startFullBtn` starts the long run and `#continueFullBtn` on the results page upgrades a short run in place, resuming at question 4. A harness that only clicks `#startBtn` therefore tests three questions and 44 result cards, not sixteen and 50 — that is correct behaviour, not a regression. Test all three paths (short, upgrade, full) or you are covering a third of the flow.
- **Rank on the defaults, speak only from `p.asked`.** `buildProfile` fills every constraint with a default so ranking still works on a three-question run. The prose must not. Saying "You told me you cannot pay" to someone never asked about money is a fabrication, and it is the precise failure this site exists to avoid — so every attributed sentence in `counsellorRead` is guarded on `p.asked.<id>`. The guards belong in `counsellorRead` ONLY; adding them to `score()` or `rankCountries()` breaks short-mode ranking entirely.
- **The survey is 16 questions, not 14.** A completion loop that stops early reports "never reached results" — a harness limit that looks exactly like a dead end in the flow. Give it headroom and assert on `#view-results.is-active`.

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

- **Branching: work on the feature branch, and keep `main` identical to it.** `.github/workflows/pages.yml` deploys on push to `main` **only**, so nothing a feature branch alone can do will ever reach the live site. The sequence that has worked every time: commit to the feature branch → push it → fast-forward `main` to it → push `main` (that push is what triggers the deploy). Never commit directly on `main`, and never let the two diverge — a divergence means the published site and the branch you are reviewing are different pages, which is the most confusing state this repo can be in. The branch name changes per work session and does not matter; the invariant is that `main` is a fast-forward of it when you finish.
- Earlier sessions used `claude/career-platform-indian-students-nc6yiq`; the current one is `claude/wellness-journal-architecture-n8i82l`. Both are the same site — the branch name is just a session label.
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
  link — never record a URL as broken on that evidence. `WebSearch` works, and the Composio
  `COMPOSIO_REMOTE_BASH_TOOL` runs `curl` from an unrestricted host, which is how the link
  sweep actually gets done. Use `curl -s -o /dev/null -L -w '%{http_code} %{url_effective}'`
  with a real browser User-Agent.
- **Reading the sweep's output is the hard part, and three codes are NOT failures.**
  `403`/`405`/`406` is bot protection — LSHTM, Oxford, JHU, Emory, Otago, GMC, ifmsa and
  UK Biobank all serve it to curl and are perfectly fine in a browser. `000` means the
  connection never completed and needs diagnosing before it means anything: `nimhans.ac.in`
  returns an incomplete TLS chain that browsers tolerate, and most Indian government hosts
  (`dbtindia`, `online-inspire`, `tribal.nic.in`, `nosmsje`) simply refuse foreign IPs. Only
  a hard `404`, or a `200` that renders an error page, is evidence of a dead link. Follow
  redirects and read `url_effective` too — that is how the ICMR-STS portal move from
  `sts.icmr.org.in` to `schemes.dhr.gov.in` surfaced.
- Data integrity check lives in the scratchpad, not the repo; recreate it if needed. It should
  assert unique ids, that every `data-impact.js` key resolves to a real programme, that every
  field/stage tag is in the taxonomy, that every URL is https, and that every referenced
  country has a profile in `data-countries.js`.

## Open with the user

- **Colour palette**: settled. They picked "Citrus & Slate" from their own research, then asked
  for it turned up; the chroma was raised across both themes and the dark ground moved off
  neutral navy onto a real petrol. They have signed off on the result — do not change hues
  again without being asked.
- **GitHub Pages**: settled and confirmed live. The one-time Settings → Pages → Source:
  GitHub Actions toggle was evidently done — `pages.yml` has run green on every push to
  `main` since 6 August, including this pass (run 31526653499, commit `e2d64de`). A
  successful `actions/deploy-pages@v4` step is itself the proof, because it errors when
  the source is not set to Actions, so a green run cannot happen without the toggle.
  Trust the workflow conclusion, not a fetch: `github.io` is blocked by this sandbox's
  proxy, and a failed fetch there says nothing about whether the site is up.
