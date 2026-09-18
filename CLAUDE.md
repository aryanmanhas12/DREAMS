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
- **The stylesheet link IS preloaded, deliberately, and that is a different case.** `index.html`
  loads `styles.css` as `<link rel="preload" as="style">` + a `media="print"` swap-on-load +
  a `<noscript>` fallback, to stop 61KB of CSS blocking first paint (Lighthouse: ~2.9s on Slow
  4G). This does not hit the font-preload trap above because a stylesheet preload needs no
  `crossorigin` — that restriction is specific to fonts. `build.js` matches all three tags as
  one block (`STYLE_BLOCK` regex) and collapses them to a single inline `<style>`; if you ever
  change this markup, the regex is written to throw loudly rather than silently stop matching,
  because a silent miss here ships a bundle that 404s on `assets/styles.css` with no local
  `assets/` directory beside it.
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

- **The service worker is network-first, and on this site that is a correctness rule, not a preference.** A cache-first worker serves a copy from three months ago to a reader sitting on full bars, which turns a closed deadline into an open one. That is the exact failure the whole project exists to prevent, so `sw.js` always tries the network and falls back to cache only when the fetch throws.
- **Network-first is not enough on its own: a bare `fetch(req)` is answered by the browser's own HTTP cache.** This was measured, not theorised. A published correction did not reach a reloading user, because the worker's `fetch` never left the machine. Anything that can carry a deadline (navigations, `.js`, `.css`, `.webmanifest`) must be fetched with `{ cache: "no-cache" }`, which forces a conditional request — the server answers 304 when nothing changed, so it costs a few bytes rather than a re-download. Fonts and icons are deliberately left on the default, because they never change and a needless round trip costs a student on a metered connection.
- **Precache individually, never `addAll`.** `addAll` is atomic: one missing file and the whole install rejects, leaving no worker at all. `cache.add(...).catch(() => {})` per entry degrades the offline copy instead of disabling it.
- **`isSecureContext`, not a hostname check.** `hostname === "localhost"` misses `127.0.0.1` and silently switched the worker off during local testing, which reads as "the worker is broken". Exclude `file:` explicitly on top of it: some builds report it as secure, `register()` still rejects, and the console error would fire on every local open of `index.html`.
- **The bundle must not carry the manifest link.** `build.js` strips the manifest/apple-touch block, and `app.js` keys service-worker registration off that link's presence — so removing it also switches off a `register("sw.js")` that would 404 inside a single-file artifact. The regex throws loudly if it stops matching, same as `STYLE_BLOCK`.
- **`sw.js`'s `SHELL` list has to track `index.html`'s script tags,** and nothing on screen tells you when it does not. Add a data file and forget the worker and the site is perfect online; it breaks only for the installed offline reader, who is the least likely person to report it. The data check asserts the coverage for that reason.
- **A page loaded during an outage outlives the outage, and the worker cannot fix it.** Measured with a real server stop/start, not emulated: after one offline load, the SAME tab kept serving the saved copy through reload, second reload and a same-URL navigation, while a fresh tab came back correct. The subresources never reach the fetch handler at all — Chromium answers them from the renderer's own cache, which sits *in front of* the service worker. No worker change fixes this, `cache: "reload"` included. The page has to notice and say so, which is what `initFreshnessCheck` does.
- **Do not probe freshness by re-fetching the file the page runs on.** The first two attempts both made it worse. Fetching `assets/data-meta.js` (plain, then with `cache: "no-store"`) replaced that one cache entry, so the next reload showed a NEW review stamp over OLD programme data — a page confidently certifying last month's deadlines, which is worse than being wholly stale. Measuring changed the thing measured. Probe under a different cache key (`?fresh=1&t=…`) so the canonical entry cannot be touched, and have `sw.js` skip any `?fresh=` request so nothing is stored under the probe URL either. **The harness asserts stamp and programme data are stale together or fresh together; that assertion is what caught both bad fixes.**
- **`deliveryType === "cache-storage"` is too narrow a staleness signal.** It was the third attempt. Once the HTTP cache holds the file, Resource Timing reports `"cache"` instead and a genuinely stale page passes the check. Compare review stamps instead of guessing from transport.
- **Recovery cannot be a reload, and cannot be a cache-busting document URL.** `location.reload()` re-runs the same cached files. `index.html?r=…` changes only the *document's* address while every `<script src>` still points at the same `assets/*.js` and is answered from the same store, so the page returns just as stale with a tidier URL. What works is re-requesting every script and the stylesheet with `cache: "reload"`, then reloading. It costs a full re-download, so it sits behind an explicit tap.
- **Meeting the install requirements is not the same as being installable.** The site had a valid manifest, a live worker, HTTPS and correct icons for a full day and the user still could not find any way to install it — because Chrome hides "Add to Home screen" in the ⋮ menu behind a passive address-bar hint, and iOS Safari never prompts at all. The offer has to be made on the page. Two routes, because the platforms differ: Chromium fires `beforeinstallprompt`, which is captured, `preventDefault()`ed and replayed from a real click (the only way to get the native dialogue); iOS exposes no API whatsoever, so the button names the taps instead of pretending it can act. Everything else gets **no button**, because an install control that cannot install is worse than none.
- **The install button must be hidden until the browser confirms it can install**, which means it is invisible to every headless sweep. Dispatch a synthetic `beforeinstallprompt` in `audit.js` before the contrast and tap-target checks, or the control ships unmeasured — the same whitelist rot that let `.chip.is-key` ship failing AA.
- **The tour's install step is conditional, so the step count is rendered, not typed.** `tourSteps()` filters `needsInstall` entries the way `activeQuestions()` slices the survey, and the hero note reads its number from that. It said "Six steps" as a hardcoded string, which was true until the seventh step started existing on some devices and not others.
- **Icons render from the real globe at `deviceScaleFactor: 1`.** `tools/make-icons.js` runs `globe.js` against real data rather than drawing a stand-in mark. Scale factor 2 silently produced a 1024px file labelled 512 and tripled the byte weight. The maskable variant draws at `scale: 0.62` so a circular mask crops background and never the globe.

- **Watch the em-dash count; it is the single most recognised AI tell.** Measured at 955 across 87k words (≈11 per 1,000) before a cleanup pass took it to 789 (≈9). Human prose typically runs 1–2 per 1,000. This matters for a site whose whole claim is that a person wrote it after checking things. Two rules learned the hard way: a dash joining two independent clauses can safely become a full stop, and one introducing *and/but/so/which* can become a comma — but **only transform lines carrying exactly ONE dash.** A line with two is a parenthetical, and converting half of it orphans the rest: the first attempt turned a list of psychiatry departments into "neurology, and to a specific consultant". Verify afterwards that no changed line still contains a dash.
- **Never write "X is not A, it is B".** It is the most commonly identified AI construction there is, and the site had eight. Say the thing directly instead. The vocabulary tells (*delve, tapestry, testament, landscape, realm, leverage, seamless, robust*) are already near-absent here and should stay that way — specificity is what keeps them out.
- **A cleanup pass exposes pre-existing errors; do not assume you caused them.** Removing a dash surfaced "helps nobody — but so is the arithmetic", which had no antecedent for "so is" and had been wrong since it was written. Check `git show HEAD:<file>` before apologising for a bug you did not introduce.

## Test-harness rules (a false-negative cost a real bug this time)

- **The contrast sweep's selector list is a whitelist, and a whitelist rots.** `.chip.is-key` failed AA at 4.08:1 (`#00787E` on `#CDE8E6`) and shipped anyway, because the audit's `sels` array checked `p, li, h1...` but nobody had added `.chip` when the chips were built. Lighthouse caught it; the project's own harness did not, on the same page, at the same viewport. When a new component introduces its own text-on-background combination, add its selector to the sweep in the same change — do not assume the generic tag list covers it.

## Test-harness rules (six false failures came from ignoring these)

- **The data check must load `data-*.js` in `index.html`'s order, not alphabetically.** Several files do `window.DB.study = window.DB.study || []` then push, while `data-study.js` does a bare `window.DB.study = [...]`. Load alphabetically and `data-abroad.js` pushes first, then `data-study.js` wipes it — 39 entries vanish and a dozen impact keys look orphaned. Parse the script tags out of `index.html` and follow them; that also catches a data file that exists on disk but is never loaded.
- **Playwright must open the mobile nav before clicking a navlink.** Below 760px `#topnav` is collapsed and a scoped `#topnav .navlink[data-goto=…]` click times out on "element is not visible", which reads like a broken view and is not. Click `#navToggle` first when the link is not visible.
- **Wait for `load`, not `domcontentloaded`, on the generated category pages.** They carry **no JavaScript at all**, and `DOMContentLoaded` does not wait for a stylesheet unless a script follows it — with no script, nothing holds it, so the probe can run against a completely unstyled page. That reported **175 contrast failures at 1.00:1** with links at `rgb(0, 0, 238)`, the browser default blue, which reads exactly like the stylesheet having been deleted. It had not been. `pagecheck.js` now waits for `load` AND re-checks that `document.styleSheets[0].cssRules` is populated and `body` has a real background, so a stylesheet that genuinely 404s still fails instead of quietly passing on the same condition. Verified by hiding `styles.css` and watching it fail, then restoring it.
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

## Pre-launch checklist — run this before any release, every time

The user asked for this list to be kept here permanently. Twenty items; this
project's status against each is recorded so a future pass checks rather than
re-decides. **Re-verify, do not assume — three of these were wrong when first
audited.**

| # | Item | Status here |
|---|---|---|
| 1 | Privacy policy page | `privacy.html`, linked in the footer. The homepage `<details>` stays as the short version. |
| 2 | Terms & conditions | `terms.html`. Leads with the one that matters: dates are a starting point, the official page is the authority. |
| 3 | Secrets off the frontend | None exist; there is no backend to hold a key. Grep for `api_key|secret|token|password|bearer` before every release. |
| 4 | Force HTTPS | GitHub Pages serves HTTPS only; the "Enforce HTTPS" toggle is on. **HSTS is live, and the earlier note here saying otherwise was wrong** — measured `strict-transport-security: max-age=31556952` on the response. No header is settable on Pages, but `github.io` is on the browser HSTS preload list and Pages sends the header itself. A custom domain would not inherit that, so re-measure if one is ever added. |
| 5 | Cookie consent banner | **Deliberately absent, and that is the correct answer.** The site sets no cookies and runs no analytics, so there is nothing to consent to. Adding a banner would be theatre that implies tracking exists. Do not add one unless tracking is ever added. |
| 6 | Meta title + description | Present. The counts inside them are asserted by the data check. |
| 7 | Social preview image | **Twelve cards**, all rendered from data by `tools/make-og.js`: `assets/og-image.png` for the homepage and legal pages, plus `assets/og/<slug>.png` per category, each carrying its own count. The headlines come from `make-pages.js`, not a second copy. |
| 8 | Favicon | Inline SVG globe data URI, matching the installed app icon. Was a compass until the two diverged. |
| 9 | Sitemap + robots.txt | Both at the repo root. `sitemap.xml` is **regenerated by `tools/make-pages.js`** and lists 14 canonical URLs (home, 11 category pages, privacy, terms), so it cannot name a page that does not exist. `robots.txt` disallows `/dist/`, `/tools/` and `/sw.js` and points at the sitemap. `llms.txt` sits beside them. |
| 10 | Alt text on images | No `<img>` elements at all; the globe is a `<canvas>` with `role="img"` and an `aria-label`, and `og:image:alt` is set. |
| 11 | Compress images | og-image went 335KB → ~195KB when it stopped being a 2x render. Icons are checked by `tools/make-icons.js` at `deviceScaleFactor: 1`. |
| 12 | Page load speed | CSS is non-blocking (preload + print-swap). **Lighthouse is not installed in this sandbox; `npm install lighthouse` into the scratchpad works and takes about a minute.** Serve over HTTP with gzip on text (a `file://` or uncompressed run measures the wrong thing). Last measured: homepage **87 perf / 100 a11y / 100 best-practices / 100 SEO**, `/specialties/` **99 / 100 / 100 / 100**. |
| 13 | Colour contrast | `audit.js` sweeps AA across 6 viewports × 2 themes on the app; `pagecheck.js` does the same over the 11 generated pages plus the 404, at 4 widths × 2 themes. Both selector lists are whitelists and rot — add new components in the same change. Lighthouse scores accessibility **100**. |
| 14 | Mobile friendly | `audit.js` covers 320–1280 on the app and `pagecheck.js` covers the generated pages, both asserting no horizontal scroll, ≥44px targets probed via `elementFromPoint`, and a visible focus ring on the first Tab. |
| 15 | Custom 404 | `404.html`; Pages serves it automatically with a real 404 status (verified live). Links are absolute `/DREAMS/...` because Pages serves it from any depth, and it carries the category nav. |
| 16 | Broken links | Full sweep from an unrestricted host via Composio. **403/405/000 are not failures** — see the sweep-reading rules above. |
| 17 | Form validation | The only inputs are the survey and search, all client-side with no submission. Nothing to validate server-side. |
| 18 | Spam protection | No forms post anywhere, so there is no attack surface. |
| 19 | Analytics | **Deliberately absent.** The site's central promise is "nothing is uploaded", and `privacy.html` states it. Adding third-party analytics would make both false. If it is ever wanted, say so on the privacy page *before* shipping it, and prefer a cookieless self-hosted count. |
| 20 | One clear call to action | "Answer the Three Questions" is the single primary button; everything else in the hero is a ghost button. |

**The lesson worth keeping from the first run of this list:** the three real
defects it caught were all things no automated check could see — a share card
with a number painted into the pixels (155 while the index held 207), a card
whose real dimensions disagreed with the `og:image:width` it declared, and a
favicon that no longer matched the app icon. Numbers inside binaries are
invisible to every text check, which is why `check.js` now compares the card's
mtime against the data files and its real size against the declared one.

## Discovery: the crawlable copy

- **The app renders itself from data in the browser, so none of its content was in the HTML.** Measured, not assumed: the raw homepage carried 1,036 words and **not one** of the 220 programme names — no "Chevening", no "ICMR", no "Fulbright". Even with JavaScript running, the landing page had none of them either, because the browse view only fills once you navigate to it. The whole substance of the project was invisible to every search engine and every AI system that reads HTML.
- **`tools/make-pages.js` is the fix, and it generates rather than duplicates.** Eleven category pages under `/<slug>/index.html`, each rendered from the same `data-*.js` files `index.html` loads, so they cannot drift from the index the way a hand-written landing page would. Re-run it whenever the data changes, exactly like `make-og.js`. It also rewrites `sitemap.xml`, so the sitemap can never list a page that does not exist.
- **`items` is not the whole index, and the first pass forgot that.** `POOLS` covers `study`, `funding`, `research`, `residency` and `equity`. It does NOT cover `specialties` (18) or `frontiers` (22), because those are not things you apply to, so every filter written over `items` silently skipped 40 records. They are also the only place on this site that explains what a career *consists* of rather than listing something to apply for: the day's work, the NEET-PG route, the superspecialities that follow, MRCP and the Match. That is the most useful prose here and it stayed invisible through the whole first discovery pass. `/specialties/` and `/research-fields/` render them through their own `render:` functions, because the record shape has no `url`, `org` or `money` and `entryHTML` would have emitted empty rows. When a new pool is added to `data-*.js`, ask whether it is in `items` before assuming a page covers it.
- **It refuses to publish a thin page.** Any category filtering to fewer than 8 entries throws rather than shipping. **Deliberately NOT done: a page per programme** — 220 near-identical pages is the pattern search engines penalise and readers hate. The category pages carry the full entry text, which is the same content without the thinness.
- **JSON-LD is minimal on purpose.** `WebSite`, `Organization`, `WebPage` on the homepage; `BreadcrumbList` + `CollectionPage` + `ItemList` on each category page. No `Course`, `Event`, `Offer`, `AggregateRating` or `Review`: this site sells nothing, teaches nothing directly, hosts no events and has no reviews, and inventing those types to win a rich result would be a lie told in machine-readable form. The audit asserts the declared `numberOfItems` equals the number of `<article>` elements actually rendered, so the markup cannot contradict the page.
- **Never grep serialised JSON-LD for a type name.** Doing so reported six pages as carrying a fabricated `Course` type; every hit was the word inside a programme NAME ("EMBL & EMBO Courses, Workshops and Fellowships"). Walk the object and collect actual `@type` VALUES. Eighth false failure of this project's favourite kind.
- **The category pages are deliberately NOT in the service worker precache.** They total about 950 KB of listings and are not app shell; precaching them would cost every installed reader that download for pages they may never open.
- **`build.js` must rewrite every relative link for the bundle.** The single-file artifact has no `privacy.html` and no `study-abroad/` beside it, so both shapes are rewritten to absolute published URLs. Adding a new kind of internal link means extending that rewrite.
- **Footer category links needed real height, not a `::after`.** The audit measured all nine at 226x20 and flagged them. They sit in normal flow in the footer with room beneath, so `min-height: 44px` on an `inline-flex` is the honest fix, the same call as `.tour-trigger`.
- **A `1fr` grid track has a min-content floor, and `overflow-wrap: break-word` will not remove it.** Four pixels of horizontal scroll appeared at 320px on `/research-fields/` and on no other page, because that page is the only one whose text contains `genomics/bioinformatics` — a slash compound that sets at 178px and cannot break. A `1fr` track cannot shrink below the widest unbreakable token in it, so the grid pushed past the viewport. The fix is two parts and needs both: `minmax(0, 1fr)` removes the floor, and **`overflow-wrap: anywhere`** is what lets the token wrap. `break-word` is the wrong keyword here and is the easy mistake — it changes only how overflow paints, never the intrinsic min-content size the grid is measuring. Same family as the `minmax(min(Npx, 100%), 1fr)` rule above, and as `min-width: 0` on the `<select>`.
- **Every category page has its own share card, and the headline has exactly one source.** `tools/make-og.js` renders 12 cards — the homepage one plus one per category — and it `require`s `PAGES` out of `tools/make-pages.js` rather than restating the titles. Two copies of a headline is precisely how the 155-on-a-207-index card happened; there is now one copy, so a card cannot advertise a count the page does not have. `make-pages.js` therefore guards its write loop behind `require.main === module` and exports `{ BASE, TOTAL, PAGES }`. The render asserts the copy has not overflowed the 1200×630 box before it screenshots, because a clipped headline is invisible in a screenshot, and `seo.js` asserts every declared `og:image` resolves to a real file at its declared size.
- **The card is bound by the same design rules as the page.** The count line first used `--signal`, which this project reserves for deadlines; it is `--accent-2` now. And "33 countries" was typed into the caption before being counted from `DB` — the same class of error the file exists to prevent, one layer down. Nothing on a card should be a literal that data could supply.
- **A custom domain is a one-line change in four places, and nothing warns you.** Canonicals, `og:url`, the JSON-LD `@id` values, `sitemap.xml`, `llms.txt` and `build.js`'s `SITE` constant all name `aryanmanhas12.github.io/DREAMS` absolutely, because a canonical has to be absolute. Point a domain at Pages without changing them and every page canonicalises to the old host, which tells search engines to ignore the new one. The origin lives in `tools/make-pages.js` (`BASE`) and `build.js` (`SITE`); the rest regenerate from there. HSTS would also need re-measuring, since the preload that covers `github.io` does not follow a custom domain.

## The tour was most of the page's layout shift, and no in-house check could see it

- **A first visit scored CLS 0.271; the tour was 0.34 of the 0.35 total.** Every harness in this project seeds `dc-tour-seen` — it has to, or the scrim intercepts its clicks — so every harness was measuring the returning-visitor page and the first-visit experience went unmeasured for months. Lighthouse runs a fresh profile, which is what surfaced it. **When a check must disable a feature to work, something else has to test that feature.**
- **The cause: `tourGo` defers placement through a `requestAnimationFrame` AND a 220ms timeout** so the target view can paint and scroll first. The card was therefore visible at its default corner for a quarter of a second and then jumped to its real position. Fixed with `.tour-pop:not(.is-placed) { visibility: hidden }`, the class added at the end of `tourPlace` and cleared in `tourEnd`. **`visibility`, never `display: none`** — `tourPlace` measures `offsetWidth`/`offsetHeight` to choose above, below or centred, and a `display: none` element measures zero, which would silently centre every card.
- **`overflow: hidden` on a locked body is itself a layout shift**, worth 0.0693 alone: taking the scrollbar away widens the content box and steps every element sideways. `html { scrollbar-gutter: stable }` reserves it up front, and costs nothing on the overlay-scrollbar platforms most readers use.
- Result: **CLS 0.271 → 0.081, performance 71 → 87, FCP 1.8s → 1.1s**, no remaining shift sources. `tour.js` in the scratchpad now asserts the card is genuinely *visible* and inside the viewport at every step across three widths — because the gating rule's failure mode is a permanently invisible tour behind a dark scrim, which every other check would still pass.
- **That harness is the one place `dc-tour-seen` must NOT be seeded.** Everywhere else, seeding it is mandatory.

## Two performance worries that measurement killed, and the one that was real

Both of these were written down as open concerns and both were wrong. Recorded so nobody spends an afternoon on them again.

- **"The app ships ~237 KB gzipped of JavaScript and should be split."** It should not, and the weight is not the problem. The network waterfall shows **every request complete by 380ms**, `app.js` finishing at 92ms, with total blocking time of 10–30ms. Splitting would buy nothing measurable and would cost the `file://` guarantee the whole architecture rests on. Closed.
- **"The category pages should get critical CSS."** They score **99** on Lighthouse performance as they stand. There is nothing to win, and forking the stylesheet to chase it would create drift between the app and the pages. Closed.
- **What was actually costing LCP: the webfont swap.** `.hero-lede` registers a first LCP candidate at FCP with the fallback face and a *second* at ~1.7s when the real font swaps in. Geometry is settled by 571ms, so this is a repaint, not a reflow. The documented font-preload prohibition still stands, so the lever is bytes.
- **Only the script face may be subset, and `tools/make-fonts.js` does it.** Petit Formal Script was shipping 215 codepoints and 221 glyphs to render three fixed strings — the wordmark, the salutation and the closing line. Subset to 44 codepoints: **27.5 KB → 9.3 KB, 66% smaller**. The three strings are read from source by regex (throwing loudly if one stops matching), the original stays at `tools/fonts/petit-formal-script.full.woff2` as build input, and the tool re-opens what it wrote to confirm every needed glyph survived.
- **`robots.txt` disallowing a path does not stop it being served, and that caught me out.** The note above originally claimed the unsubset original was "never served". It was: `/tools/fonts/petit-formal-script.full.woff2` answered **200** on the live site, because `pages.yml` uploads `path: '.'` and `Disallow` only asks crawlers not to look. The deploy now removes `tools/`, `build.js` and `CLAUDE.md` before the artifact is uploaded. That removal step is deliberately a **denylist**: forgetting to remove a file leaves it served, which is merely the status quo, whereas forgetting to copy one in an allowlist 404s the live site. It asserts `index.html`, `styles.css` and the subset font survive, and that `tools/` is genuinely gone.
- **The other four faces must NOT be subset.** They render arbitrary entry text — 220 programmes, every country name, every money line — so trimming them to "characters currently used" means one new entry with an unanticipated glyph falls back to a system serif *mid-sentence*, weeks after the change that caused it. They are already Latin-subset at ~230 codepoints. Leave them.
- **`check.js` asserts the subset covers all three strings**, by reading the font's cmap, because a font is a binary and no text check sees inside it. Reword the footer line without re-running `make-fonts.js` and the check names the missing letter. Proved by breaking it deliberately.
- **Lighthouse's LCP is simulated and noisy; never report a single-run delta.** Measured across three identical runs of the same build: performance **86–88**, LCP **3.5–3.7s**, FCP **1.1–2.0s**. A run showing "85 / 4.0s" after a change that removed 18 KB is the bottom of that spread, not a regression. Run it at least three times before believing any movement smaller than the spread.
- **The `&` in a `sed` replacement means "the whole match".** A test meant to break the font check by rewording the footer to "bigger & brighter" silently produced something else entirely, and the check's apparent silence looked like a broken assertion. Same replacement-token family as the `build.js` string-replacer trap. Use a function replacer, or escape it.

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
- **A 200 can lie about its body, and that is a fourth code to read carefully.** `unv.org` answers every path with HTTP **200** whose content is an Imperva/Incapsula block page — "Request unsuccessful. Incapsula incident ID: …", about 950 bytes. A status-only sweep records that as healthy. So for any host that matters, check the BODY as well as the code: a few hundred bytes, a missing `<title>`, or the words "Request unsuccessful", "Just a moment", "Attention Required" or "enable JavaScript to run this app" all mean the sweep did not see the real page. The last of those is usually a JS app and genuinely fine (med-engage.com, app.unv.org); the others mean the check was blocked and the link needs verifying another way.
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
