# Dreams Counsellor — project rules

A career-guidance site for Indian medical students. Three questions (skill / anger / flow)
plus practical and emotional constraints → a ranked list of real programmes with application
steps. Static, client-side, no backend.

## Maintenance: start here

Recurring work is scripted, and `tools/README.md` is the runbook. The whole cycle:

```
node tools/recheck.js        the monthly worklist: open-now tier 1-2 first, then stale text,
                             no-call entries, and anything unchecked for six months
node tools/find.js <q>       where an entry lives (file:line), its badge today, its window
node tools/stamp.js <ids>    record that you re-read those entries' official pages
node tools/refresh.js        pages, sitemap, share-card counts, share cards, bundle
node tools/verify.js         every check with a pass/fail summary (--quick: data + SEO)
tools/ship.sh                push the branch, fast-forward main, which deploys
```

The data check and all browser tests live in the repo (`tools/check.js`, `tools/test/`), not
in a scratchpad. The deploy deletes `tools/`, `build.js` and `CLAUDE.md`, so none of it is
published (verified live on 28 September 2026, after the Pages source fix; see "OVERTURNED" below). Each entry can carry
`checked: "YYYY-MM"`, written only by `stamp.js` and only for an entry whose official page was
actually read. It is data only; the page never shows it, because the official page is the
authority on dates. Shared code: `tools/lib/data.js` (the one data loader, and `urgency()`
lifted from `app.js` so tools cannot disagree with the badge) and `tools/lib/browser.js` (finds
Playwright and Chromium; serves the repo like Pages does).

## Architecture — do not break these

- **No framework, no build step for the site itself.** Plain `<script>` files that attach to
  `window`, deliberately NOT ES modules, so `index.html` works over `file://`. `build.js`
  exists only to produce the single-file artifact bundle in `dist/` (gitignored).
- **Script load order in `index.html` matters.** All `data-*.js` files push into `window.DB.*`;
  `app.js` must load last, `data-coast.js` before `globe.js`, and `space.js`, `sound.js`,
  `ooh.js`, then `ooh-guide.js`, then `intro.js` before `app.js` (the guide draws with `ooh.js`,
  the opening uses the globe, the guide and the sound, and `app.js` starts the opening). Every
  tag is `defer` (see "Known traps"), which preserves this order.
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
- **The stylesheet is RENDER-BLOCKING, deliberately; the preload pattern it replaced was a
  defect.** For weeks `styles.css` loaded as preload + `media="print"` swap + `<noscript>`, to
  take CSS off first paint, with no critical CSS inlined behind it. Measured on 30 September
  2026: whenever the page painted before the stylesheet landed it showed unstyled text and then
  the whole `body` jumped from the browser's 8px default margin to 0, and Lighthouse scored the
  LIVE site **CLS 0.563, performance 62**. The records here said 0.069 and 86-88; nobody had
  re-measured. One plain `<link rel="stylesheet">` took CLS to **0.000**. `build.js`'s
  `STYLE_BLOCK` now matches that single link and still throws loudly if it stops matching.
- **Every script is `defer`, and one tiny inline script in `<head>` applies the stored theme.**
  The 18 data files were render-blocking: Lighthouse put 2-3s of LCP "render delay" on them
  before the hero text (plain HTML) could paint. Deferred, they download in parallel and run in
  order before DOMContentLoaded, so load order still matters exactly as above. The inline head
  script exists because a daylight reader would otherwise see the space theme flash first; it
  also restores `sky-still`. `build.js`, `tools/lib/data.js` and `tools/check.js` all parse
  these tags and accept the optional ` defer`: add a new attribute and all three need it.
- **The body face is `font-display: optional`; the display serif and script stay `swap`.** With
  `swap`, the hero paragraph painted twice and the second paint (the Plex swap) was the LCP.
  Now the observed LCP equals FCP. A first-time reader on a slow link keeps the system sans for
  that one view; the service worker caches the file, so every later view is Plex from frame one.
- **The hero grid is flat, and that is deliberate.** `h1 / globe / lede /
  actions / how` are direct grid children (the eyebrow went in the 2026 redesign) so the source order *is* the phone order,
  with `grid-template-areas` moving the globe into a second column from 920px.
  Do not reintroduce a `.hero-copy` wrapper or reach for `order:` — `order` would
  desync tab order from reading order, which is the thing this layout avoids.
- **Space in the hero belongs to the grid `gap`, not to element margins.** Both
  `.hero-lede` and `.hero-actions` carried bottom/top margins that doubled with the
  row gap and pushed the primary button below the fold on a 390×844 phone.
- **The three claims are ruled lines, not quoted cards.** They carried big quote
  marks in a boxed card until September 2026; three identical quoted cards is one of
  the most recognised generated-page patterns, so each is now a `div.statement` with a
  top rule and a display-face sentence. Every number in them is still rendered from
  data. **Any claim written there must be checked against the data first:** the
  redesign draft said "most things are tier 3 or below", and the index held 50 tier-1
  and 75 tier-2 entries against 58 at tier 3 and below.
- **`REGIONS` in `app.js` must list every non-place `country` value**, and every country it
  does *not* exclude must have coordinates in `globe.js`. Counted-but-unplottable makes the
  stat tile and the globe disagree on screen — the same class of bug as the old India 16-vs-65.
  Plotted-but-not-counted is fine and deliberate (`Gulf`, `Baltics`). The data check enforces
  the one direction that matters.

- **Check eligibility before impact — a programme you cannot enter is worse than one you never listed.** DAAD WISE was in the index for months telling MBBS students "MBBS qualifies from year 2". It does not: WISE is restricted to Engineering, Maths and Science, to a 4-year bachelor's or 5-year integrated masters, and to a fixed institution list, so a medical student fails three separate tests. PMRF's *direct* entry fails the same way (science and technology degrees from the IITs, IISc, NITs and IISERs), but its *lateral* entry, from inside a PhD at a granting institute, has no degree-stream rule; the entry now says so, and the skipList line was corrected to match. WISE does not say no on its front page; you find out after weeks of cold-emailing for an invitation letter. **Before adding any entry, find the eligibility PDF and search it for the degree list. If MBBS is not named, assume excluded until the programme office says otherwise.** WISE lives in `skipList`, which is where "looks open, is not" belongs.
- **Aggregator listicles recycle these traps.** Every "fully funded internships for Indian students" roundup still lists WISE for medics. Aggregators are fine for *finding* candidates and worthless for *verifying* them — always land on the programme's own eligibility page before writing an entry.
- **The `<head>` social-card counts cannot be rendered from data in the browser.** Link scrapers read raw HTML and never run the script. They were typed by hand and fixed by hand after every addition; `tools/make-pages.js` now writes them (and the count in `llms.txt`) from data at build time, and the data check still *asserts* all three, which is the only thing standing between a share card and last month's number. The three claim cards in the body are the opposite case: they render from data, because nothing scrapes them.
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

- **An "open now" badge is the most consequential claim on the site, so it gets its own check.** In September 2026 the scroll atlas started naming each region's highest-graded programme "with its window open now", and verifying those seven names against official pages found something wrong with six of them. EMERALD (EU PhD for doctors) had not recruited since its second call closed on 28 August 2022; Amgen Scholars was telling Indian students to apply to the Europe programme, which takes only students enrolled in a Bologna-process country; ICGEB's Falaschi PhD fellowships name a BSc (Honours) or MSc, not MBBS (the MBBS door is the ICGEB-JNU PhD, which also needs a JRF); the Duke policy fellowship wants a master's plus five years and its call is closed; BIRAC BIG has not run a call since November 2025. Widening the check to every tier-1 entry marked open found stale Gates Cambridge, Schwarzman and Harvard MPH-45 dates and an unsupported "MBBS qualifies" on the New Zealand PhD. **Each cycle, re-read the official page of every tier-1 and tier-2 entry whose badge says open or opening soon.** `node tools/recheck.js` lists exactly that set first (roughly 40 to 75 entries depending on the month); it is what a student acts on this week.
- **`noOpenCall: true` is how an entry says "real, but you cannot apply now".** `urgency()` returns `"none"`, the badge reads "No call open", and ranking treats it like a closed window. Use it when the official page says the call is closed with no next date, or when a funder's stated calendar is not being followed (BIRAC's page says 1 January and 1 July; its last call ran in November). Empty `deadlineMonths` alone is worse than nothing: `urgency()` reads an empty list as "Rolling / always open", the opposite of true.
- **Search descriptions and `<meta>` tags lie the same way a 200 status can.** EMERALD's page body says "Closed call for PhD positions"; its `og:description`, which is what a search result shows, still says "Applications for the 2nd call are open!" four years later. Read the page body, never the snippet.
- **Window text and `deadlineMonths` must agree; `tools/check.js` catches the plain contradictions, and `tools/recheck.js` flags windows whose every date has passed.** Maitri's window said no round had been published while its months still marked it open, and L'Oréal/AAUW said "has closed" under an open badge. When you write "closed" or "not published" into a window, set `noOpenCall` in the same edit.
- **A media query written ABOVE the base rule it overrides loses the cascade silently.** The under-400px wordmark step-down sat above `.brand-text { font-size: 1.22rem }`; equal specificity, later rule wins, so the step-down never applied and "Counsellor" ran under the theme button at 320px for months while the rule looked correct in review. `audit.js` now measures the wordmark's text box against `.topbar-controls` at every viewport. Put responsive overrides after the rules they override.
- **Never hard-code `#fff` on a coloured fill.** Under the old palette the dark-theme accent was a bright teal and white on it measured 1.53:1 on the skip link. Today every pressable fill is `var(--fill)` with `var(--on-fill)` text in both themes, as `.btn-primary` does. This surfaced only because the contrast sweep was extended to the dark theme; it previously ran light-only at 390px.

## The scroll atlas

- **A second globe, driven by scroll, between the hero and the claim cards.** `initGlobe(canvas, label, onPick, { autoSpin: false })` returns `focus(lat, lon, names)`, which eases the globe to a region and dims dots outside it (dimmed, never hidden). Its render loop runs only while it is easing or being dragged. Under reduced motion `focus` jumps instead of easing.
- **`ATLAS` in `app.js` is the region table.** Every `country` value in the data must belong to exactly one region, or the atlas silently undercounts; `check.js` asserts both directions. South Africa rides with the Asia step because one African entry is too thin for its own step.
- **Every number and name in the atlas is computed from data**: routes, funded-or-free, open this month, and the highest-graded pick. The copy paragraphs are hand-written and must stay free of counts.
- **Each step's button opens Browse filtered to that region** (`regionFilter`, separate from `countryFilter`), so the globe is never the only route, as the architecture rule requires.
- **The globe has no halo at all now** (a glow round a sphere is the "glowing orb" the design rules ban). Historical note, in case one is ever reintroduced: `R * 1.2` overshoots any canvas wider than about 170px, and a gradient cut off before it reaches zero paints a hard-edged square round the globe.

## Test-harness rules (a false-negative cost a real bug this time)

- **The contrast sweep's selector list is a whitelist, and a whitelist rots.** `.chip.is-key` failed AA at 4.08:1 (`#00787E` on `#CDE8E6`) and shipped anyway, because the audit's `sels` array checked `p, li, h1...` but nobody had added `.chip` when the chips were built. Lighthouse caught it; the project's own harness did not, on the same page, at the same viewport. When a new component introduces its own text-on-background combination, add its selector to the sweep in the same change — do not assume the generic tag list covers it.

## Test-harness rules (six false failures came from ignoring these)

- **The data check must load `data-*.js` in `index.html`'s order, not alphabetically.** Several files do `window.DB.study = window.DB.study || []` then push, while `data-study.js` does a bare `window.DB.study = [...]`. Load alphabetically and `data-abroad.js` pushes first, then `data-study.js` wipes it — 39 entries vanish and a dozen impact keys look orphaned. Parse the script tags out of `index.html` and follow them; that also catches a data file that exists on disk but is never loaded.
- **Playwright must open the mobile nav before clicking a navlink.** Below 760px `#topnav` is collapsed and a scoped `#topnav .navlink[data-goto=…]` click times out on "element is not visible", which reads like a broken view and is not. Click `#navToggle` first when the link is not visible.
- **Wait for `load`, not `domcontentloaded`, on the generated category pages.** They carry **no JavaScript at all**, and `DOMContentLoaded` does not wait for a stylesheet unless a script follows it — with no script, nothing holds it, so the probe can run against a completely unstyled page. That reported **175 contrast failures at 1.00:1** with links at `rgb(0, 0, 238)`, the browser default blue, which reads exactly like the stylesheet having been deleted. It had not been. `pagecheck.js` now waits for `load` AND re-checks that `document.styleSheets[0].cssRules` is populated and `body` has a real background, so a stylesheet that genuinely 404s still fails instead of quietly passing on the same condition. Verified by hiding `styles.css` and watching it fail, then restoring it.
- **Tap-target checks must probe `elementFromPoint`, not `getBoundingClientRect`.** The rect is the *visual* box and cannot see the `::after` that takes the topbar controls to 44px. Measuring the rect reports `36×36` on a button that is genuinely fine — a seventh false failure of the same family. Probe ±21px in all four directions and only report if a probe misses.
- **Seed `dc-tour-seen` before every Playwright load, or every click times out.** The tour auto-opens on a first visit, and *every fresh browser context is a first visit* — so it drops a modal scrim over the page and each click fails with "subtree intercepts pointer events", which reads exactly like a broken button and is not one. Use `ctx.addInitScript(() => localStorage.setItem("dc-tour-seen","1"))` so the run tests the returning-visitor page. The tour has its own harness (`tour.js`); do not exercise it by accident anywhere else.
- **Seed `sessionStorage` `dc-intro` too, for the same reason.** Since October 2026 every new visit opens on the opening (`intro.js`), which hides the whole page for about ten seconds behind a gate that waits for a tap. A harness that forgets the key measures an invisible page: contrast, tap targets and clicks all fail at once and look like a broken site. The opening has its own harness (`tools/test/intro.js`), which seeds nothing. Harnesses that run with `reducedMotion: "reduce"` (tour.js, the survey's tour pass) never see it, because the opening never plays under reduced motion.
- **The survey has two lengths, and `#startBtn` is now the SHORT one.** Three questions (skill/anger/flow) or the full set; `#startFullBtn` starts the long run and `#continueFullBtn` on the results page upgrades a short run in place, resuming at question 4. A harness that only clicks `#startBtn` therefore tests three questions and 44 result cards, not the full set and 50, which is correct behaviour, not a regression. Test all the paths (short, upgrade, full, and full while staying in India) or you are covering a fraction of the flow.
- **Rank on the defaults, speak only from `p.asked`.** `buildProfile` fills every constraint with a default so ranking still works on a three-question run. The prose must not. Saying "You told me you cannot pay" to someone never asked about money is a fabrication, and it is the precise failure this site exists to avoid — so every attributed sentence in `counsellorRead` is guarded on `p.asked.<id>`. The guards belong in `counsellorRead` ONLY; adding them to `score()` or `rankCountries()` breaks short-mode ranking entirely.
- **Since October 2026 the full survey is 9 questions, or 8.** `living` carries a `when` that skips it for a reader who answered "I want to build something here", so the count depends on an earlier answer: `survey.js` runs both and expects 9 and 8. A completion loop that stops early reports "never reached results", a harness limit that looks exactly like a dead end in the flow, so give it headroom and assert on `#view-results.is-active`. `check.js` counts the questions from `app.js` itself, so prose like "sixteen questions" fails the build the moment it is stale.

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
- Playwright is installed. `tools/lib/browser.js` finds it and the newest Chromium under `PLAYWRIGHT_BROWSERS_PATH` (currently `/opt/pw-browsers/chromium-1194`); override with `PLAYWRIGHT_PATH` / `CHROME_PATH`. Never hard-code either path in a test again.
- `github.io` is blocked by this sandbox's proxy (403 on CONNECT). A failed fetch there says
  nothing about whether the site is live — never report it as a site problem.

## Design system

- **Fonts are self-hosted woff2 in `assets/fonts/`** — no CDN. Cormorant Garamond (display,
  roman and italic), IBM Plex Sans (body and every label, date and count), Petit Formal
  Script (`--font-script`). IBM Plex Mono was removed in September 2026: a monospace face
  on small data labels is one of the standard generated-page tells, and it cost 14.7 KB to
  set tags that read better in the UI face. Do not bring back a third family.
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
- **Palette is entirely `:root` custom properties.** Since the galaxy redesign, `:root` IS the
  space theme (the default whatever the system scheme says), `:root[data-theme="dark"]` repeats
  it for the toggle, and `:root[data-theme="light"]` is the daylight variant. There is no
  `prefers-color-scheme` block any more. Swapping the palette is a token edit; never hard-code
  a colour in a component.
- **"Nebula" (30 September 2026). Every colour has one job; do not give it a second.**
  - `--fill` / `--on-fill`: nebula pink #FF4FA8 with near-black text, both themes. Things you
    press: the primary button, a chosen answer, the progress bar, India on the globe.
  - `--accent`: interactive text and focus. Pale pink on space, deep magenta on daylight.
  - `--signal`: solar-flare orange, **deadlines only**, kept well away from the pink so a
    deadline never reads as a button.
  - `--gold`: star yellow, the filled tier-1 chip and nothing else.
  - `--ok` aurora (open, funded, free), `--warn` amber (opening soon).
  - `--globe` violet graticule, `--star` the globe's dots, `--starlight` the sky's stars,
    `--nebula-a` / `--nebula-b` the two clouds.
  - `--ooh-paper` / `--ooh-ink` / `--ooh-gold` / `--ooh-mouth`: Ooh's speech bubble, the same in
    both themes and in all three apps. `--note` / `--note-line` remain for the mark fallback.
  Every text pair is AA in both themes. `--ink-3` was raised (space #B8ADE0, daylight
  #54497F) so it still clears 4.5:1 over the brightest patch of sky; see `tools/test/sky.js`.
- **The user overrode several of the earlier design rules for the galaxy, deliberately.** They
  asked for purple, pink and yellow, a Milky Way, "everything that moves", a glow and constant
  sound. So a violet-on-deep-indigo ground, nebula gradients, the globe's atmosphere, the pink
  glow on the primary button and a moving sky are now intended, where the older sections
  below call them tells. What still holds: no neon or glassmorphism on the UI itself, no
  emoji, no gradient text, no accent phrase in the headline, and every piece of motion
  optional (see the sky and sound sections).
- **Tier badges are an ordinal scale and are drawn as one** — tier 1 is the only filled chip
  on the page, and weight drops with the grade down to a dashed outline at tier 5. That is
  what lets someone find the handful of transformative entries by scanning.
- **All motion must be disabled under `prefers-reduced-motion`**, and reveal states must fall
  back to *visible* — never stranded at `opacity: 0` when `IntersectionObserver` is missing.
- **Motion answers the reader, and the sky moves on its own.** Section fade-ups on scroll
  (`initReveals`) stay removed. What plays unprompted is the sky (below) and the hero globe's
  intro, once. Everything else answers an action: the speech bubbles of each question, the
  tick when an answer is chosen, the pop when a card is saved, the unfold of a disclosure,
  the read arriving bubble by bubble, and the view transitions (`document.startViewTransition`,
  skipped under reduced motion; `html.has-vt` turns off the old per-view fade).
- **Buttons are pills at every width, and every top-bar control is a circle; surfaces keep the
  3px `--r`.** Desktop used to square the hero buttons while phones and the large CTA were
  round, so one button changed shape at 760px; the menu button was a 3px square beside two
  round buttons until the September 2026 pass. The exceptions are deliberate and are the
  things you handle: programme cards (20px, double-bezel) and Ooh's speech bubbles (20px).
- **Template tells removed in the Marigold redesign; still out under the galaxy.** All-caps
  tracked labels (26 rules), eyebrow labels above headings, an italic or coloured phrase
  inside the headline, coloured left-edge stripes on panels and a status stripe on cards,
  quote-mark cards, zero-padded "01" rank tags, strings joined with ` · `, `→` appended to
  link text. The urgency line on a card is a dot plus a word
  (`.urg-open`, `.urg-soon`...), so colour is never the only signal. Sources: Anthropic's
  `frontend-design` skill (github.com/anthropics/claude-plugins-official), and Krebs'
  sixteen AI-slop patterns.

## The galaxy: sky, sound, bubbles (30 September 2026)

- **`assets/space.js` draws the sky** into one fixed container (`.sky`, z-index -1, no pointer
  events, aria-hidden). The nebula clouds are the container's own background. Inside it:
  `.sky-milky`, the ONE full-screen canvas (Milky Way glow, lanes, field stars), painted once
  in idle-time chunks and turned by a 16-minute CSS `transform` keyframe; a few dozen
  `.sky-tw-star` elements twinkling on their own CSS rhythms; a spiral galaxy disc turning
  inside a tilted wrapper; shooting stars and a comet as short-lived elements that remove
  themselves on `animationend`. Nothing in the sky runs a per-frame loop. Each depth sits in
  a `.sky-par` (scroll parallax, written by space.js) wrapping a `.sky-lean` (pointer lean,
  `--lx`/`--ly`, fine pointers only): two wrappers because one element cannot take two
  transforms, and the first version that tried had the lean silently overwrite the scroll.
  The container is fixed with `overflow: hidden`, which is why its oversized children
  cannot add page scroll.
- **Canvas pixels are invisible to every contrast check, and that shipped a real failure.**
  The first Milky Way put a warm core behind the hero headline at about 2.5:1 for `--ink-3`,
  and a spiral-galaxy core burned by additive compositing measured 1.6:1, while `audit.js`
  and Lighthouse would both have passed. **`tools/test/sky.js`** hides the page, photographs
  the sky alone in both themes at two widths, averages 8px blocks (a star is a point, the glow
  under a line of text is the background), and fails if any text token on the sky drops under
  4.5:1. Raise any glow alpha and run it.
- **`lighter` compositing saturates.** Additive blending is right for faint glows and wrong
  wherever points pile up: the spiral's packed core went to a white dot. Arms are drawn with
  `source-over`; only the soft core gradient adds.
- **The sky must be stoppable from the page (WCAG 2.2.2).** Motion that starts on its own and
  lasts over five seconds beside content needs an on-page pause, and `prefers-reduced-motion`
  alone does not satisfy it. `#skyToggle` in the footer ("Pause the moving sky") sets
  `html.sky-still` and `dc-sky` in localStorage; reduced motion also stills it and disables
  the button with a title saying why.
- **The pages with no JavaScript** (categories, privacy, terms, 404) carry
  `<div class="sky sky-static">`: a CSS-only 240px star tile plus the clouds. `make-pages.js`
  writes it, so do not delete it from the hand-written three.
- **Cloud-chamber tracks** (`DCSpace.burst`) draw on `.fx`, a fixed canvas ABOVE the page that
  exists only while tracks live and has `pointer-events: none`, so `elementFromPoint` and taps
  pass through it: alpha tracks on choosing an answer, beta curls on Continue, a gamma ring on
  saving, a decay chain when results arrive. None under reduced motion or a paused sky.
- **`assets/sound.js` synthesises everything with Web Audio** (no files, works offline and in
  the bundle). Since October 2026 ("more calming and more exciting") it is one piece in D major
  at 94 bpm on a step sequencer that schedules 0.9s ahead: a drone, four chords of sixteen beats
  (Dmaj9, Bm11, Gmaj7#11, A6sus) through a generated convolution reverb (shorter under
  `html.lite`), half the old wind, rarer star chimes, and cosmic-ray ticks about one in six
  seconds instead of one in 2.5. The excitement is a forty-second flight in the same cycle: a
  felt-piano pulse that rests on the D, enters under the B minor, runs eighths under the G,
  climbs in sixteenths under the A with a riser, and releases into the next D. Effects `decay`,
  `alpha`, `gamma`, `fade`, `orbit`, `chain` are kept, softer, and retuned to D. Measured by
  rendering the opening and the minute after it offline (`DCSound._render`, the method Ronak's
  music uses): **peak 0.323, overall -25.8 dBFS RMS**; the opening runs at about -22 (it is
  meant to be the loudest moment) and the bed settles at -26 to -29, where the old bed measured
  -26.7. Keep the peak under 0.5.
- **Browsers block sound until a gesture, so it starts on the first tap anywhere**, as the user
  asked ("constantly"), unless muted. WCAG 1.4.2 needs an on-page stop: the speaker button is
  first among the top-bar controls, and a one-time bubble says where it is. **A first gesture
  ON the speaker button must not also auto-start**: `unlock()` returns early there, or the
  sound plays for a moment and stops in the same click. The button shows what is actually
  playing (`audible`), not the stored wish, so before the first tap it reads as off.
- **Three top-bar controls do not fit 320px** beside the script wordmark: `audit.js` measured
  the wordmark 44px into the controls. Under 370px the little globe beside the name goes, the
  wordmark steps down to .9rem, and the round buttons draw at 34px with 44px tap areas. That
  block sits AFTER the 640px rule it overrides, for the reason the wordmark trap above gives.
- **Space is the default theme, so the harnesses set the theme the way a reader does:**
  `localStorage.setItem("dc-theme", t)` in an init script. `colorScheme` emulation no longer
  changes anything and would test space twice and daylight never. `pages.js` runs one pass,
  because the script-free pages can only ever show space. Seed `dc-sound-told` wherever a
  harness probes the top of the page, or the one-time bubble covers what it measures.
- **Speech bubbles** (`.q-say`, `.read-main > .say`, `.bubble-toast`, `.ooh-say`) are Ooh's
  paper since October 2026, rounder than surfaces (20px against 3px) on purpose: a voice,
  not a panel. Notices dock under the top
  bar, never at the bottom, where the survey's Continue button would be under them. Removing a
  saved programme is the destructive direction, so it gets an Undo bubble.

## Mobile performance: what was measured, and what fixed it (30 September 2026)

Measured on a 390x844 phone viewport at 3x density with the CPU throttled 4x
(Lighthouse's mobile profile), using Chrome traces rather than impressions.
**This container has no GPU**: Chrome composites and rasterises in software
here, so compositor and canvas-upload costs are exaggerated compared with a
phone. Read `VizCompositorThread` time as a proxy for GPU overdraw, and trust
main-thread scripting numbers as they are.

- **The live Marigold site was already saturating the main thread at rest**
  (idle, the hero globe re-projected ~3,200 points with seven trig calls each,
  every frame). Taps took up to 328ms at 4x.
- **The first galaxy made it worse**: a full-screen sky canvas redrawn at 30fps
  on the main thread, 24 long tasks during load, scrolling at 64 frames in
  3.2s, taps at 400ms. A second attempt moved the motion to CSS but stacked six
  full-screen layers, which a trace measured at 8.6x the compositing work of
  the page without a sky: on a phone that is GPU overdraw, battery and heat.
- **What fixed it** (all in `space.js`, `globe.js`, `styles.css`):
  - the sky has ONE full-screen layer (the Milky Way canvas, which also holds
    the field stars and dust); the nebula is the container's static
    background; twinkling is a few dozen tiny elements with their own CSS
    rhythm; nothing in the sky runs a per-frame loop;
  - every sky canvas is painted once, in idle-time chunks small enough never
    to make a long task, and the sky is not even built until after `load`;
  - it is painted for the tallest viewport, so a phone's address bar hiding
    or showing never repaints it mid-scroll;
  - `html.is-scrolling` pauses the sky's animations and holds the globe's
    idle spin while the page scrolls;
  - the globe precomputes every point's unit vector (six multiplications per
    point per frame instead of seven trig calls), caches its colours instead
    of eight `getComputedStyle` reads a frame, strokes the graticule as one
    path, and idles at 30fps with time-based speed. Main-thread script time
    at rest fell 57% (618ms to 264ms per 4s at 4x);
  - `content-visibility: auto` on `.claims`, `.band` and `.foot`: the first
    style and layout pass was the biggest load task (281ms at 4x) and fell to
    about 200ms;
  - the audio engine starts after the first tap has painted, not inside it;
  - the stylesheet is render-blocking (CLS 0.563 to 0.000), every script is `defer`, and the
    body face is `font-display: optional` (see Known traps for all three).
- **Result at 4x, phone viewport:** load long tasks 24 to 6-10, worst tap 400ms to ~250ms
  (the live site: 328ms), scrolling 64 to 111 frames per 3.2s (live: 119), and ZERO animation
  frames requested at rest with the hero off screen. Lighthouse: 62 to 92.
- **`tools/test/sky.js` hides the twinkling star sprites** before it measures: at 6-13px they
  are bigger than its 8px averaging block, so one star read as "bright background". They are
  point sources; the glow text sits on is the Milky Way, nebula and galaxy.
- **`tools/test/perf.js` holds the line**: nothing may request an animation
  frame while the page rests with the hero off screen, no load task over
  450ms, no tap over 600ms (it was 450 until 2 October 2026, when a slower
  container had the published build itself at 368-464ms), all at 4x. Budgets sit well above today's numbers
  because this machine wanders; they catch regressions, not noise.
- **Lighthouse here needs two flags or it hangs**: `--no-proxy-server` in
  `--chrome-flags` (the sandbox proxy refuses Chrome's background requests)
  and `--max-wait-for-load=25000`. See the scratchpad runner pattern:
  serve the tree with `tools/lib/browser.js` `serve({ gzip: true })`, run
  three times, report the median and the spread.

## The craft pass: effects ported from the design skills (30 September 2026)

The user asked for every uploaded skill to be used. What each contributed, and what was
declined and why, so the next pass does not re-litigate it:

- **high-end-visual-design** gave the double-bezel card (a 5px translucent shell with a
  hairline edge holding a surface core with a lit top edge, radii 20/15 so the curves are
  concentric), the spring curve `--ease-spring: cubic-bezier(.32, .72, 0, 1)`, a press scale
  of .97 on every button, the hamburger that folds into an X, and the drawer links arriving in
  a 30ms stagger. **Declined:** the floating glass nav island and screen-filling blurred menu
  (glassmorphism is out here, and a blur on a sticky bar re-composites every scroll frame on
  a phone), eyebrow tags (a listed template tell), fade-and-blur reveals on every section
  (`initReveals` was removed on purpose), `py-24` macro whitespace (the primary button
  already sits at y=674 of 844 on a phone; 96px more above it lands it on the fold), and the arrow-in-a-circle button (the `→` tell).
- **animated-ui-libraries** (Aceternity, Cult UI, Componentry) is React + Tailwind + Motion,
  so nothing was installed: three effects were ported to plain CSS on the compositor.
  Card Spotlight is a `::after` radial light at `--mx`/`--my`, written by one rAF-gated
  `pointermove` on the hovered card only, under `(hover: hover) and (pointer: fine)`.
  Moving Border is `.btn-orbit`: a conic gradient on an oversized square turned by a
  `transform` keyframe, clipped to a 2px ring because `::after` refills the inside with the
  button's own pink (the button keeps its real background, so contrast checks read the true
  colour behind the label). Text Generate is `.rise`: the hero headline's words are spans
  that rise 30ms apart, once. **Declined:** 3D tilt, sparkles, marquees, meteors (the sky
  already has shooting stars).
- **design-md** gave `DESIGN.md` at the root: every colour token in YAML, plus radii,
  motion and component rules. **`tools/check.js` compares it with `styles.css` in both
  directions and fails on drift**, so a token change without the matching DESIGN.md line
  breaks the build (proved by changing `--fill`: three errors). The deploy removes it like
  the other build-only files.
- **web-design-guidelines**, and the Design plugin's **design-critique**,
  **accessibility-review** and **ux-copy** (read from
  `anthropics/knowledge-work-plugins/design/skills/`, because the plugin is not enabled on
  this account) were run as reviews. Their findings were field edges under 3:1 (WCAG 1.4.11,
  now `--line-strong` and asserted by `audit.js`), the sound and sky needing on-page stops
  (WCAG 1.4.2 and 2.2.2), and label wording.

What measurement taught in this pass:

- **Moving `overflow: hidden` off a grid item changes its minimum width.** The card used to
  clip itself, which silently zeroes a grid item's automatic minimum. The double-bezel moved
  the clip to the inner core, the card's minimum became its `contain-intrinsic-size` width
  (320px), and every card at 320px ran 30px off screen. `audit.js` caught it; `min-width: 0`
  on `.card` is the fix and the comment says why.
- **A new continuous effect costs nothing only if it stays on the compositor.** Measured with
  the orbit ring on and off at 4x CPU: identical main-thread time. Every new loop also gets a
  still state under `html.sky-still`, `html.lite` and reduced motion.
- **`html.lite`** is set by the inline head script when `navigator.deviceMemory <= 2` or
  Save-Data is on, so it applies before first paint: the sky becomes the CSS-only static
  tile, the globe does not auto-spin or play its intro, view transitions are skipped and the
  orbit ring holds still.
- **Asking for an animation frame and then not drawing still costs a whole frame.** The globe
  requested 60 frames a second and drew 30; each skipped frame still ran style, animations
  and lifecycle for the whole page. The idle spin now waits on a 25ms timer between frames,
  and `kick()` cancels the timer the moment the reader grabs the globe. With the hero on
  screen at 4x: about 3,870ms to 3,390ms of main thread per 4s here.
- **Most of that remaining number is this container, not a phone.** With the hero on screen,
  about 2,500ms per 4s is `CanvasResourceProviderSharedImage::ProduceCanvasResource`, the
  software GPU (SwiftShader) uploading the globe canvas; a phone's GPU does not pay it. The
  honest phone-relevant part is the globe's script (~170ms/4s at 4x) and the style pass the
  sky's ~44 CSS animations add to each frame the globe draws (~230ms/4s at 4x). With the hero
  off screen no main frames run at all and the whole page costs ~10ms/4s, which is what
  `perf.js` asserts.
- **Lighthouse mobile after this pass, three runs each, same machine and session:** performance
  **88** (88-91), CLS **0.000**, TBT ~200ms, simulated LCP 3.2s. The previous commit measured
  **93** (92-93), TBT ~135ms. An A/B with only the old globe loop put back scored 85 (73-91),
  so the idle-spin timer is not the cost; the remaining gap sits inside this machine's spread
  and was not isolated to one effect. Re-measure with three runs before claiming a direction.

## Ooh, the shorter survey and the India pages (1 October 2026)

The user asked for: the headline "The world is full of opportunities." with the question "What
do you want?"; good, researched answers to it; the 16-question survey trimmed as far as it
will go and made interesting; Ooh, the guide from their apps Ronak (aryanmanhas12/Psych) and
Arun (aryanmanhas12/Well-beings), with the same bubbles and sounds; and a special page for
exposure inside India plus the abroad fully funded one.

- **Ooh comes from the sister apps and is not redrawn here.** `assets/ooh.js` is their
  `ooh.mjs` (byte-identical between Arun's `lib/ooh.mjs` and Ronak's root) with only the
  `export` keywords removed and a wrapper that sets `window.OohArt` and `module.exports`.
  This site must work from `file://`, where a browser refuses ES module imports, which is
  the whole reason it is not the `.mjs`. Change the drawing in Arun, copy it to Ronak, then
  regenerate this file; its header records the source hash.
- **`assets/ooh-guide.js` is Ronak's `companion.js`, cut down.** A view's first visit gets
  Ooh's full lines typed into the bubble with the `typing` blip (pitch follows the mood);
  later visits get one line; × tucks Ooh into a corner button that brings the line back.
  Lines live in `OOH_LINES` in `app.js`: 120 characters or fewer, no em dashes, and nothing
  that implies anyone is watching or waiting (the sister apps' rules). It is a fixed script
  and the page says so; never present it as an AI.
- **Ooh asks the survey questions** (the figure replaces the little globe; the title is
  typed, but the whole title is in the `<h2>` from the first frame as typed + rest spans, so
  focus lands on a complete heading), **answers "What do you want?"** in the hero (six chips,
  each with a reply whose every number is counted from the index when it is said, and real
  buttons onward that appear at once rather than after the typing), and **says one line at
  the top of each view**. No corner Ooh on the intro or the survey, where Ooh already is,
  or while the tour has `body.tour-locked`.
- **Sounds: the sister apps' 17 CC0 uisfx files** in `assets/sounds/` (about 120 KB),
  fetched after the first tap, never precached. They play only while `DCSound.isOn()`, so
  the one speaker button silences the galaxy and Ooh together. Taps that already answer
  with a galaxy effect (an answer, Continue, saving a card) are skipped, so no tap makes two
  sounds, and changing view no longer plays the galaxy "orbit" because the tap already has
  its cue. Over `file://` the fetch is refused, so Ooh is silent there by design.
- **"Hide Ooh, the guide" in the footer** sets `html.ooh-off`; the survey falls back to the
  globe mark and the hero keeps the reply text without the figure.
- **Every speech bubble is Ooh's paper now** (`--ooh-paper`, `--ooh-ink`, `--ooh-gold`,
  `--ooh-mouth`, identical in both themes). Two contrast bugs this caused, both caught by
  looking at screenshots before any test ran, and both the same trap: **an older, later
  rule still set the colour the new bubble had replaced.** `.q-say .q-help { background:
  var(--surface) }` put plum ink on the dark surface, and `.read-main > .say { color:
  var(--ink) }` put lavender text on cream. When a component's palette changes, grep every
  rule that names it, not just the one you are editing.
- **The contrast sweep reads a background from the element or its ancestors**, so Ooh's ×
  (absolutely positioned over a sibling's paper) measured 1.16:1 against the page. The fix
  was structural, not a test exception: `.ooh-bubble` itself carries the paper at the same
  radius, so the × sits on paper by the DOM as well as by eye.
- **The dock watches `body`'s class, never `hidden` attributes across the subtree.** The
  first version observed `hidden` everywhere and set the dock's own `hidden` from the
  callback; re-setting an attribute to the same value still queues a mutation, which is an
  infinite microtask loop. Write only on change, and observe something the callback does
  not touch.
- **The survey went from 16 questions to 9.** The three core questions keep their wording
  with 8 options each (from 17 or 18): merged options carry the union of their old fields,
  so no ranking signal was lost. Stage, money, leaving India and category stay;
  climate, health and what you need around you became one multi-choice `living` (skipped
  for anyone staying in India); record and passport/test became `have`; age, time, timeline
  and named countries went, because each moved a handful of entries at most. `buildProfile`
  unpacks `living` and `have` into the fields `score()` and `rankCountries()` always read,
  and still reads the old answers, and `LEGACY` maps every merged option value, so a plan
  link saved before the trim reopens with the same results.
- **The survey talks back.** Under each question `liveLine()` says, from the live ranking,
  what the answers so far point at (fields), how many programmes are open at your stage,
  how many cost nothing, which country fits how you want to live, or your top pick right
  now. It is computed on every tap, so it can never be a canned compliment. It also exposed
  an older false sentence: the read told a first-year SC student the National Overseas
  Scholarship was "at the top of your list" when the ranking put it lower (it funds a
  postgraduate degree). That sentence now follows the real rank.
- **Only asked answers are shown as the reader's.** The results rail used to list time,
  timeline and paperwork from defaults; it now shows only what was answered, and marks an
  unasked stage as "Assumed". Same rule as `p.asked` in the prose.
- **The hero.** `h1` "The world is full of opportunities." then `.hero-ask` "What do you
  want?" (outside the `h1`, so the headline carries no accent phrase), the chips with Ooh,
  then the buttons, then the lede with the count. On a phone the lede and the globe now
  follow the buttons, which put the primary button at y=558 of 844 (it was 674 before this
  round). On desktop `grid-template-areas` puts the lede above the buttons; it holds no
  links, so tab order is unaffected.
- **Five new India entries** in `assets/data-india-exposure.js`, each read on its official
  page on 30 September and 1 October 2026: the Azim Premji Health Equity Fellowship (MBBS
  track ₹40,000 a month plus ₹1.2 lakh, postgraduate track ₹60,000 plus ₹2.4 lakh; both 2026
  calls closed, so `noOpenCall`), PRS's LAMP Fellowship (25 or under, any bachelor's,
  ₹23,000 a month, applications in December), NIRMAN at SEARCH Gadchiroli (18 to 29, rolling,
  about ₹2,100 a workshop with waivers), ICMR-NIE's research methods courses (the official
  FAQ says MBBS students cannot take the BCBR and sends them to Health Research
  Fundamentals), and arranging a rural hospital elective (SEWA Rural's page asks Indians to
  email). **Deliberately not added:** SBI Youth for India (its site hides an "update about
  the programme" notice that could not be read) and the NITI Aayog internship (its page
  refuses every non-browser fetch, so eligibility for MBBS students could not be confirmed).
- **Category pages can be grouped.** A page in `make-pages.js` may carry `groups` (named by
  `ids`, then by the first matching `test`) and an `ooh` line, drawn at build time from
  `ooh.js` into a static bubble on a page with no JavaScript. `/india/` is now "Get your
  exposure inside India" in six groups, and `/fully-funded/` puts abroad first in three
  groups, with India last. The JSON-LD list is built in rendered order, and an entry that
  fits no group throws instead of vanishing.
- **Measured after this round** (Lighthouse mobile, three runs each, same session): the
  published build and this one both score **89** median, CLS **0.000** for both, TBT 181ms
  and 146ms. Simulated LCP rose from 2.6s to 3.4s; the OBSERVED LCP equals FCP at about
  0.2s in both, so the gap is the simulation's model charging the three new deferred
  scripts (22 KB), and the LCP element is now `.hero-choice-note`, the largest text block
  on the first screen since the lede moved below the buttons.

## The opening: the Earth, every country, Ooh, 9.6 seconds (1 October 2026)

The user asked for an unskippable intro like Ronak's and Arun's, made the planet: the Earth seen,
every country seen, revolving, Ooh there and excited, the same length as Ronak's, workable on a
phone, and the music made calmer and more exciting.

- **Length is Ronak's, measured from its source:** Ronak's `otPlay` ends at 9,600ms. Arun's has
  no fixed end (it waits for "Come in"), so Ronak's is the one to match. Here it is fifteen beats
  at 94 bpm, 9,574ms, so every picture beat sits on the music's grid. `tools/test/intro.js`
  measures 10.5-10.8s from the tap to the page being back, which is the 9.6s plus the
  scheduling lead and the 0.6s fade.
- **Skip and Escape, since 2 October 2026.** It shipped unskippable on 1 October at the owner's
  request; a day later they asked for a skip. Skip sits top right from the gate onwards
  (outermost, beside the speaker, 12px apart like the top bar's controls so the 44px tap areas
  never meet), and Escape does the same. A skip marks the visit, fades in 0.3s instead of
  0.6s, lets the hero globe make its own short turn to India (the reader never saw the
  landing), and does **not** start the tour: Ronak's rule, a Skip answered by a second guided
  thing defeats the Skip. The tour waits for a visit where the opening is watched, and "Take
  the tour" stays in the hero. Music already playing crossfades to the calm bed through
  `DCSound.settle()`, because the opening's cue (the landing chord, the lights' run, the riser)
  is scheduled up to ten seconds ahead and would otherwise finish over the page. A skip that
  lands between Begin and the music starting is honoured: the music then starts as the bed.
  Two things this exposed: `stopSong()` faded only the bed bus, but chimes and the riser feed
  the reverb directly and were cut hard at the disconnect, so it now fades the old graph's
  master; and the motion now has the on-page stop WCAG 2.2.2 asks for. The harness's two
  canvas-bound budgets (worst long task, frames a second) were widened to 600ms and 8 frames:
  after a container restart the PUBLISHED opening measured 317-357ms and 11-12 frames/s on the
  same check that gave 227ms and 19 the day before, an A/B on one machine with Skip measuring
  the same. Script, the part a phone pays, held at ~0.75s throughout.
- **It still never plays under `prefers-reduced-motion`, after "Pause the moving sky", or for a
  shared plan link (`#p=`)**, and storage that throws counts as "seen" so it fails open onto the
  page. Once per visit (sessionStorage `dc-intro`), Ronak's rule: a reload inside a tab does
  not replay it. The inline `<head>` script decides before first paint and sets
  `html.intro-on` (and `html.intro-wait` when the gate is needed); if `intro.js` has not taken
  over within 12 seconds (`html.intro-live`), the page shows without it.
- **The gate exists because sound needs a tap.** "Begin" starts the music and the turn in the
  same instant: `DCSound.begin()` resolves once the context is really running, with the
  scheduling lead plus the device's output latency, and the picture waits that long, so the
  heard and the seen start together (Arun's rule). "Begin in silence" is this visit only and
  does not touch the stored choice. With sound already off there is no gate; it simply plays.
- **Countries light as they cross the middle, and the timing is computed, not observed.**
  `globe.plan()` solves the eased turn for when each country's longitude crosses the central
  meridian; `intro.js` snaps those times to the 32nd-note grid and hands the same list to the
  globe and to the music, so each light is a note on the exact frame it appears (two at most
  per slot, as a chord). The first version gave each light its own slot and pushed Europe's
  eighteen a full second late, when they were already at the limb and could not be labelled.
- **The count is the page's count.** Lights for `REGIONS` entries (Gulf, Baltics) are plotted
  but not counted, so the counter and Ooh's "33 countries" equal `#claimCountries`; the harness
  asserts it.
- **Two bugs this round, both found by looking before any test was written.** (1) The globe
  measured its canvas with `getBoundingClientRect` while the opening's wrapper was still at
  `scale(.84)`, so it drew at 84% resolution, stretched, and the India burst landed off-centre.
  `resize()` now uses `clientWidth`, the layout size. (2) The html state class was first called
  `intro-gate`, the same name as the gate panel's own class, so `html` matched
  `.intro-gate { display: flex; flex-direction: column }` and the hidden page laid out 736px
  wide on a 390px phone. Never reuse a component's class name as a state on `html`.
- **Names on the canvas are placed greedily** (India first, then by programme count, right of
  the dot or else left) and ease in and out; a name still fading keeps its box until it has
  gone, or the next one prints straight over it ("Indiangladesh" shipped in a screenshot).
- **Cost, at 4x CPU on a 390px phone at 3x density:** about 0.7s of script and 0.8s of style
  across the 10.8s, no long task over 230ms, about 19 frames a second here. Nearly all the rest
  of the busy time is this container's software GPU uploading the canvas (stubbing all canvas
  text changed nothing measurable; removing the sky saved ~0.35s of style). The page underneath
  is `visibility: hidden`, so it is not painted, not focusable and not read out; the hero globe
  and the tour start only when the opening has finished, and the hero globe then opens on
  India rather than turning to it a second time.

## The October 2026 recheck, and Hong Kong (7–8 October 2026)

The user asked for every deadline and course re-checked, more countries that suit an Indian
MBBS, and every opportunity they had asked to be remembered, each judged for feasibility.

- **The worst errors were eligibility and money, not dates.** ITM Antwerp's scholarship was
  written up as VLIR-UOS seats "ring-fenced" for Indian doctors with travel paid; it is Belgium's
  DGD scholarship, which favours 27 priority countries (India is not one) and never pays the
  flight, so it dropped from tier 1 to tier 2. Charpak's summer track pays €700 a month with no
  housing or insurance (the entry said €860 with both). KAUST's visiting programme names STEM
  bachelor's and master's students, not MBBS. J.N. Tata was called "interest-free" on no source.
  Each entry now says what its own page says, and to confirm MBBS where the page does not name it.
- **Hong Kong is the 34th country.** The RGC's PhD Fellowship (HK$344,400 a year, 400 awards,
  closing 1 December 2026) has no nationality rule, and CUHK names "MBChB or equivalent" as a
  PhD entry degree for its Faculty of Medicine. Adding a country took four edits: the profile in
  `data-countries.js`, `COORDS` in `globe.js`, the `asia` row of `ATLAS` in `app.js`, and the
  entry. `check.js` enforces the first three; the counts and cards regenerate from data.
- **Researched and not added, because the deciding page could not be read:** the UAE licence
  route (Abu Dhabi's PQR renders with JavaScript, so the GP experience rule went unread), HBKU's
  PhD in Qatar (same), NBRC's imaging courses (the site answered empty). A rule you cannot read
  does not go into an eligibility line.
- **From the owner's notes:** CAMP@Pune (moved from NCBS; takes final-year undergraduates "from
  all backgrounds") and IISc's Brain, Computation and Learning workshop (free, encourages
  clinicians) are one new entry. The Bangalore Cognition Workshop names only BE/BTech and
  science master's students and went to `skipList`. The fee-charging "government internship"
  is already covered by the skipList entry on paying for internships.
- **Client-rendered pages read as empty to curl** (USIEF, HBKU, DOH's PQR, CAMP's FAQ answers).
  An empty read is not evidence of anything; say the page could not be read and move on.
- **The whole index can be fetched in one go (9 October 2026).** All 190 official pages were
  pulled in parallel on Composio's remote host by a background script (16 threads, curl first,
  r.jina.ai when the HTML was empty or a bot wall), then compared with each entry. It took about
  a minute; reading the results took the time. Two cautions: r.jina.ai rate-limits per IP, so
  about 20 pages came back as a 429 JSON body and needed a slow second pass, and a remote call
  that runs past 60 seconds is cut off, so launch with `nohup … &` and poll. No link was dead.
  57 entries were stamped; pages behind Cloudflare and Indian government portals were not.
- **A month-level badge says "open" until the month ends.** Chevening and Knight-Hennessy closed
  on 6 October 2026 and still read "open now" three days later, because October was in their
  `deadlineMonths`. Chevening's window said "closes 6 October" with no year, which the stale-text
  check cannot judge; Knight-Hennessy's named a later December date, so not every date had
  passed. `recheck.js` now lists any open entry whose window names a closing date earlier in the
  current month (verified on the pre-fix data: it flags exactly those two). When a round closes
  early in a month, take that month out of `deadlineMonths` and say the next date in words.
- **Found by that sweep:** Open Doors registration closes 1 November (the entry said November
  to December), Pasteur's PPU interviews are in March after a joint lab application by 14
  December (its old page answers 502; the entry links the call PDF), K.C. Mahindra's loans are
  up to ₹10 lakh for the top three and ₹5 lakh otherwise, Aga Khan's programme moved to
  `the.akdn/en/international-scholarships` and its loan half carries a service charge, and
  INYAS closed on 31 August.

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
| 8 | Favicon | Inline SVG globe data URI on a deep-space tile (violet strokes, pink India marker), matching the installed app icon, which adds three yellow stars. Was a compass until the two diverged. |
| 9 | Sitemap + robots.txt | Both at the repo root. `sitemap.xml` is **regenerated by `tools/make-pages.js`** and lists 14 canonical URLs (home, 11 category pages, privacy, terms), so it cannot name a page that does not exist. `robots.txt` disallows `/dist/`, `/tools/` and `/sw.js` and points at the sitemap. `llms.txt` sits beside them. |
| 10 | Alt text on images | No `<img>` elements at all; the globe is a `<canvas>` with `role="img"` and an `aria-label`, and `og:image:alt` is set. |
| 11 | Compress images | og-image went 335KB → ~195KB when it stopped being a 2x render. Since the galaxy, `make-og.js` **throws if any card passes 300 KB** (WhatsApp drops larger previews). Chrome dithers gradients and PNG compresses dither worst: the full sky took cards to ~830 KB, and even a stars-only Milky Way cost ~110 KB, so cards carry the twinkling stars, ONE cloud, the spiral galaxy and the globe, and no Milky Way (homepage card ~238 KB). The card's sky CSS is read out of `styles.css` itself, so it cannot drift. Icons are checked by `tools/make-icons.js` at `deviceScaleFactor: 1`. |
| 12 | Page load speed | CSS is render-blocking and scripts are `defer` (see Known traps: the non-blocking CSS was the CLS 0.563 defect). **Lighthouse is not installed in this sandbox; `npm install lighthouse` into the scratchpad works and takes about a minute.** Serve over HTTP with gzip on text (a `file://` or uncompressed run measures the wrong thing). Last measured (1 Oct 2026, three runs, after Ooh): homepage performance **89** median (84-89), CLS **0.000**, TBT ~150ms, observed LCP = FCP (~0.2s); the published build before it measured 89 in the same session. Runner pattern and flags in "Mobile performance". |
| 13 | Colour contrast | `tools/test/audit.js` sweeps AA across 6 viewports × 2 themes on the app; `tools/test/pages.js` does the same over the 11 generated pages plus the 404, at 4 widths in the one theme they can show. `audit.js`'s `fieldEdgeCheck` holds editable fields to 3:1 non-text contrast (WCAG 1.4.11): the search box, sort menu and free-text box had sat at 1.3-1.6:1 in both themes until the Design plugin's accessibility-review checklist named the criterion. Both selector lists are whitelists and rot — add new components in the same change. `tools/test/sky.js` checks text against the painted sky, which neither of the others can see. Lighthouse scores accessibility **100**. |
| 14 | Mobile friendly | `tools/test/audit.js` covers 320–1280 on the app and `tools/test/pages.js` covers the generated pages, both asserting no horizontal scroll, ≥44px targets probed via `elementFromPoint`, and a visible focus ring on the first Tab. |
| 15 | Custom 404 | `404.html`; Pages serves it automatically with a real 404 status (verified live). Links are absolute `/DREAMS/...` because Pages serves it from any depth, and it carries the category nav. |
| 16 | Broken links | Full sweep from an unrestricted host via Composio. **403/405/000 are not failures** — see the sweep-reading rules above. |
| 17 | Form validation | The only inputs are the survey and search, all client-side with no submission. Nothing to validate server-side. |
| 18 | Spam protection | No forms post anywhere, so there is no attack surface. |
| 19 | Analytics | **Deliberately absent.** The site's central promise is "nothing is uploaded", and `privacy.html` states it. Adding third-party analytics would make both false. If it is ever wanted, say so on the privacy page *before* shipping it, and prefer a cookieless self-hosted count. |
| 20 | One clear call to action | "Answer the three questions" is the single primary button (sentence case, like every other button, since the design-critique pass); everything else in the hero is a ghost button, and so are Ooh's onward buttons under "What do you want?". |

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
- **An email address in entry text is the same trap, and it struck six pages at once.** The October 2026 recheck wrote "Email scholarship.france@institutfrancaisindia.in" into a step; one 43-character token put 45px of horizontal scroll on six category pages at 320px. `.listing` now carries `overflow-wrap: anywhere` for every line in it, not only the facts list. `pages.js` caught it; `audit.js` did not, because the app's cards already wrap.
- **Every category page has its own share card, and the headline has exactly one source.** `tools/make-og.js` renders 12 cards — the homepage one plus one per category — and it `require`s `PAGES` out of `tools/make-pages.js` rather than restating the titles. Two copies of a headline is precisely how the 155-on-a-207-index card happened; there is now one copy, so a card cannot advertise a count the page does not have. `make-pages.js` therefore guards its write loop behind `require.main === module` and exports `{ BASE, TOTAL, PAGES }`. The render asserts the copy has not overflowed the 1200×630 box before it screenshots, because a clipped headline is invisible in a screenshot, and `seo.js` asserts every declared `og:image` resolves to a real file at its declared size.
- **The card is bound by the same design rules as the page.** The count line first used `--signal`, which this project reserves for deadlines; it is `--accent-2` now. And "33 countries" was typed into the caption before being counted from `DB` — the same class of error the file exists to prevent, one layer down. Nothing on a card should be a literal that data could supply.
- **A custom domain is a one-line change in four places, and nothing warns you.** Canonicals, `og:url`, the JSON-LD `@id` values, `sitemap.xml`, `llms.txt` and `build.js`'s `SITE` constant all name `aryanmanhas12.github.io/DREAMS` absolutely, because a canonical has to be absolute. Point a domain at Pages without changing them and every page canonicalises to the old host, which tells search engines to ignore the new one. The origin lives in `tools/make-pages.js` (`BASE`) and `build.js` (`SITE`); the rest regenerate from there. HSTS would also need re-measuring, since the preload that covers `github.io` does not follow a custom domain.

## The tour was most of the page's layout shift, and no in-house check could see it

- **A first visit scored CLS 0.271; the tour was 0.34 of the 0.35 total.** Every harness in this project seeds `dc-tour-seen` — it has to, or the scrim intercepts its clicks — so every harness was measuring the returning-visitor page and the first-visit experience went unmeasured for months. Lighthouse runs a fresh profile, which is what surfaced it. **When a check must disable a feature to work, something else has to test that feature.**
- **The cause: `tourGo` defers placement through a `requestAnimationFrame` AND a 220ms timeout** so the target view can paint and scroll first. The card was therefore visible at its default corner for a quarter of a second and then jumped to its real position. Fixed with `.tour-pop:not(.is-placed) { visibility: hidden }`, the class added at the end of `tourPlace` and cleared in `tourEnd`. **`visibility`, never `display: none`** — `tourPlace` measures `offsetWidth`/`offsetHeight` to choose above, below or centred, and a `display: none` element measures zero, which would silently centre every card.
- **`overflow: hidden` on a locked body is itself a layout shift**, worth 0.0693 alone: taking the scrollbar away widens the content box and steps every element sideways. `html { scrollbar-gutter: stable }` reserves it up front, and costs nothing on the overlay-scrollbar platforms most readers use.
- Result: **CLS 0.271 → 0.081, performance 71 → 87, FCP 1.8s → 1.1s**, no remaining shift sources. `tools/test/tour.js` asserts the card is genuinely *visible* and inside the viewport at every step across three widths — because the gating rule's failure mode is a permanently invisible tour behind a dark scrim, which every other check would still pass.
- **That harness is the one place `dc-tour-seen` must NOT be seeded.** Everywhere else, seeding it is mandatory.

## Two performance worries that measurement killed, and the one that was real

Both of these were written down as open concerns and both were wrong. Recorded so nobody spends an afternoon on them again.

- **"The app ships ~237 KB gzipped of JavaScript and should be split."** It should not, and the weight is not the problem. The network waterfall shows **every request complete by 380ms**, `app.js` finishing at 92ms, with total blocking time of 10–30ms. Splitting would buy nothing measurable and would cost the `file://` guarantee the whole architecture rests on. Closed.
- **"The category pages should get critical CSS."** They score **99** on Lighthouse performance as they stand. There is nothing to win, and forking the stylesheet to chase it would create drift between the app and the pages. Closed.
- **What was actually costing LCP: the webfont swap.** `.hero-lede` registers a first LCP candidate at FCP with the fallback face and a *second* at ~1.7s when the real font swaps in. Geometry is settled by 571ms, so this is a repaint, not a reflow. The documented font-preload prohibition still stands, so the lever is bytes. **Resolved 30 September 2026 a different way:** the body face is now `font-display: optional` (see Known traps), and the observed LCP equals FCP.
- **Only the script face may be subset, and `tools/make-fonts.js` does it.** Petit Formal Script was shipping 215 codepoints and 221 glyphs to render three fixed strings — the wordmark, the salutation and the closing line. Subset to 44 codepoints: **27.5 KB → 9.3 KB, 66% smaller**. The three strings are read from source by regex (throwing loudly if one stops matching), the original stays at `tools/fonts/petit-formal-script.full.woff2` as build input, and the tool re-opens what it wrote to confirm every needed glyph survived.
- **`robots.txt` disallowing a path does not stop it being served, and that caught me out.** The note above originally claimed the unsubset original was "never served". It was: `/tools/fonts/petit-formal-script.full.woff2` answered **200** on the live site, because `pages.yml` uploads `path: '.'` and `Disallow` only asks crawlers not to look. The deploy now removes `tools/`, `build.js` and `CLAUDE.md` before the artifact is uploaded. That removal step is deliberately a **denylist**: forgetting to remove a file leaves it served, which is merely the status quo, whereas forgetting to copy one in an allowlist 404s the live site. It asserts `index.html`, `styles.css` and the subset font survive, and that `tools/` is genuinely gone.
- **OVERTURNED in September 2026: two deploys run on every push, and the branch one wins.** The two bullets below concluded that the Actions artifact is what Pages serves. It is not. Every push to `main` starts BOTH our "Deploy to GitHub Pages" workflow AND GitHub's own "pages build and deployment" (the branch publisher, `dynamic/pages/pages-build-deployment`, which had run 60 times by then). The branch publisher checks out the whole branch and deploys it unfiltered, and it usually finishes last: on `3d1b25c` ours deployed at 10:42:33 and the branch build at 10:43:14. Proof: `tools/recheck.js` and `tools/README.md`, files that had NEVER been in any artifact, answered 200 with their new content, while a made-up path under `tools/` answered 404. So `tools/`, `build.js` and `CLAUDE.md` are publicly served, the "Drop build-only files" step changes nothing, and the old "stale paths" were never stale. The site pages themselves are identical in both deploys, so readers see nothing wrong. **The fix was one setting only the repo owner could change: Settings → Pages → Build and deployment → Source: GitHub Actions. The user switched it on 28 September 2026**, and the next deploy (run 58) was verified from an unrestricted host: `/tools/README.md`, `/tools/recheck.js`, the unsubset font, `/build.js` and `/CLAUDE.md` all answer 404, while every page, `sitemap.xml`, `llms.txt` and the assets answer 200. `README.md` and `.gitignore` are still served because the removal step never listed them; both are harmless. **If a "pages build and deployment" run ever appears in the Actions list again, the source has been switched back**, and the artifact's tar listing stops being the published file set.
- **A removed path keeps answering 200 indefinitely, and the artifact is the only thing worth trusting. Settled by experiment, not inference.** Two clean deploys after the removal, `/build.js` was still live. The proof that the deploy is right is in the run log: `upload-pages-artifact` prints the full `tar` listing, and it showed 66 files with no `tools/`, no `build.js` and no `CLAUDE.md`. **Read that listing — it is the actual published file set.** Three things that look like evidence and are not: `last-modified` is stamped per DEPLOYMENT, so a stale path still reports the newest deploy's time; a `?cachebust=` query does not change the cache key for Pages static files; and `content-length` matching the local file proves nothing when the file has not changed recently. `.github` 404s while `.gitignore` 200s because `upload-pages-artifact` excludes `.git` and `.github` itself — that pair is a quick way to confirm the artifact really is the source.
- **The experiment that answered it, worth repeating if this ever comes up again.** The artifact is a SUBSET of the branch, so every file served exists in both and nothing observable separates "stale cache" from "Pages is serving the branch". The one case that differs is a path that has **never been deployed**, placed inside the directory the workflow deletes. `tools/_serving-probe.txt` was committed to `main`, deployed once, and answered **404** — so the Actions artifact is authoritative, the removal step works, and the build files still answering 200 are purely stale entries for paths Pages no longer holds. It was deleted immediately afterwards. Five deploys and forty-five minutes did not clear those stale paths, so do not treat their disappearance as a milestone; treat the tar listing as the answer.
- **The other four faces must NOT be subset.** They render arbitrary entry text — 220 programmes, every country name, every money line — so trimming them to "characters currently used" means one new entry with an unanticipated glyph falls back to a system serif *mid-sentence*, weeks after the change that caused it. They are already Latin-subset at ~230 codepoints. Leave them.
- **`check.js` asserts the subset covers all three strings**, by reading the font's cmap, because a font is a binary and no text check sees inside it. Reword the footer line without re-running `make-fonts.js` and the check names the missing letter. Proved by breaking it deliberately.
- **Lighthouse's LCP is simulated and noisy; never report a single-run delta.** Measured across three identical runs of the same build: performance **86–88**, LCP **3.5–3.7s**, FCP **1.1–2.0s**. A run showing "85 / 4.0s" after a change that removed 18 KB is the bottom of that spread, not a regression. Run it at least three times before believing any movement smaller than the spread.
- **The `&` in a `sed` replacement means "the whole match".** A test meant to break the font check by rewording the footer to "bigger & brighter" silently produced something else entirely, and the check's apparent silence looked like a broken assertion. Same replacement-token family as the `build.js` string-replacer trap. Use a function replacer, or escape it.

## Design rules the user set, and what they cost here

The user supplied a list of 30 patterns to avoid ("vibecoded" AI-website
clichés) with the instruction that the site should feel designed for THIS
product rather than replacing one set of trends with another. Audited all 30
against the real CSS and markup rather than against this file's claims. Most
were already clean. **These are standing rules — check a change against them
before shipping it.**

**Five were genuinely violated and are fixed:**

- **Decorative radial gradients (#22, #1).** `.hero::before` carried two
  full-width radial washes whose own comment admitted their job was to "stop
  the hero reading as text on a flat rectangle", and `.read` had a corner
  wash. Both removed. The hero separates by type scale and 68px of lead; the
  globe is the colour in the composition. It also takes two full-viewport
  gradient layers off first paint on a phone.
- **Glassmorphism (#8).** `.topbar` had `backdrop-filter: saturate(140%)
  blur(10px)`. A blur on a *sticky* element re-composites on every scroll
  frame, paid on the phones this is mostly read on, for an effect whose only
  job was to look expensive. Now an opaque `--paper` with the hairline rule.
- **Hover flourish + stacked shadows (#28, #5).** `.card:hover` lifted 2.5px
  under two drop shadows. Hover only needs to say *which* card the pointer is
  on, so the border does it. Still gated on `(hover: hover)`.
- **Decorative em dashes (#9).** Measured, not guessed: index.html was at
  **12.7 per 1,000 words** against a human norm of 1–2. Visible prose on all
  four hand-written pages is now **0**. See the dash rules already documented
  above for the safe transforms.
- **Em dash as a loading state (#9 + #21).** Eight counts shipped as `—`
  until `app.js` filled them, so a reader whose JS failed saw "This page has
  — of them" as though the dash were content. They now ship EMPTY with a
  `.num-pending:empty::before` skeleton that vanishes the instant
  `textContent` is set. No JS knows it exists.

**Deliberately NOT "fixed", because the rule does not apply here:**

- **Three cards in a row (#6).** The three `.statement` blocks are *stacked*,
  not a 3-across grid, and each carries a distinct claim rendered from live
  data. Not filler.
- **Pillowy radii (#19).** `--r` is **3px**. The `border-radius: 100px` hits
  are all pill-shaped *controls*. A crisp surface radius with pill buttons is
  a coherent system, not softness everywhere.
- **Banned typefaces (#10).** Cormorant Garamond, IBM Plex Sans/Mono, Petit
  Formal Script. No Inter, Geist or Space Grotesk.
- **Emoji, sparkles, checkmark bullets, animated arrows, bento, fake
  terminals, testimonials, pricing tiers (#7, #24, #16, #25, #13, #14, #12,
  #17).** Grepped. Zero instances of any of them.
- **ToS and Privacy (#26, #27).** Both present and linked.

**The count-up went too.** `countUp()` rolled the four stat tiles to their
values over 900ms. A number that is rolling is a number you cannot read yet:
the reader came to find out how many routes exist and the animation answered
a third of a second late, while spending 900ms of `requestAnimationFrame`
during first paint on a phone. `setNum()` sets them directly. The code's own
comment already said prose must not count up "like a slot machine" — the
tiles were not different.

**Not done, and this is a judgement call worth re-examining rather than a
miss.** The `data-*.js` entry text is 74,800 words carrying **558** dashes
(7.4/1,000). Only **1** of the 483 lone-dash lines matches the safe
conjunction transform; the rest are appositives and clause joins inside
sentences that state eligibility rules and deadlines. A regex pass over 483
hand-written programme descriptions to win a stylistic metric risks garbling
a line that tells a student who may apply, and this repo has already broken
a sentence that way once. A dash is cheaper than a wrong eligibility line.
If this is ever done it should be a reviewed pass, entry by entry.

## The app icon is drawn, not captured

- **Rendering the real globe into the icon was the wrong call, and the
  measurement is why.** `tools/make-icons.js` used to run `globe.js` against
  real data. Rendered at the sizes an icon is actually used — 60px on a home
  screen, 40px in a switcher, 29px in settings — the coastlines collapsed
  into grey mush, the twenty programme dots became noise, and by 29px there
  was no readable mark. It was detail drawn for a 340px canvas shown at an
  eighth of that, sitting in a soft glow inside a large dark margin.
- **The mark is now three strokes and one disc:** outer circle, meridian
  ellipse, equator, plus a nebula-pink marker on India that punches a
  ground-coloured hole through the strokes behind it.
- **The marker's position is derived by arithmetic from the favicon**, not
  eyeballed: the favicon's globe is r=12.5 in a 32 box with the dot at
  (+4.5, +3.5) r=3, which scales to (+12.2, +9.5) r=8.2 in the icon's 100
  box. "Favicon matches the app icon" is an invariant this project has
  already broken once, and matching by construction is the only version that
  survives.
- **An earlier offset put the marker's hole within 2 units of the outer
  stroke** and bit a notch out of it, which reads as a rendering fault rather
  than a marker. It has to sit ON the face with clear ground around it.
- **The generator asserts legibility before it writes**, by downscaling the
  shipped 192 to 29px and requiring the warm marker and the cool globe to
  still be distinct pixel clusters. A mark that has dissolved fails the build.
- **Worth 344 KB to every installed reader.** The icon set went 394 KB → 50 KB
  (192: 47.9→8.4, 512: 236.5→23.8, maskable: 110.2→18.0). All three are in
  `sw.js`'s `SHELL`, so that is download every install used to pay.
- Maskable is at `scale: 0.72` inside the 80% safe zone; Android crops
  adaptive icons to an OEM-chosen shape and anything outside gets shaved.

## Mobile

- **`100vh` is a bug on iOS Safari, and there were two.** It measures the
  LARGEST viewport, as though the address bar were hidden. `.survey-shell`
  sized to it put the Next button under the browser chrome, and `.topnav`'s
  `max-height` ran the drawer past the bottom of the screen so the last
  category could not be reached. Both now declare `vh` first and `dvh`
  second, so an old browser still gets a sane value and everything else gets
  the viewport that is actually on screen. Verified resolving to 782px on an
  844px viewport.
- Already sound, checked rather than assumed: the globe pauses via
  `IntersectionObserver` when off-screen and does not auto-spin under
  `prefers-reduced-motion`; `-webkit-text-size-adjust: 100%` is set;
  `overscroll-behavior` is contained on the drawer and the tour;
  `env(safe-area-inset-*)` is honoured on `.wrap`, the browse footer and
  `.stale-bar`; `content-visibility: auto` keeps the 180-card style pass at
  ~8ms.
- **Measured on Lighthouse mobile, three runs each, 30 September 2026** (see "Mobile
  performance" above for method): the live Marigold site scored **62**, CLS **0.563**, TBT
  **294ms**. The galaxy build ships at **92** (91-97), CLS **0.000**, TBT **~100ms**, FCP
  **1.66s**. Simulated LCP is 3.2s; the OBSERVED LCP equals FCP, and the simulation's gap is its
  pessimistic model counting the deferred scripts, which start before first paint but no
  longer block it.

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
- The data integrity check is `tools/check.js` (it used to live in a scratchpad and was lost and
  rebuilt several times). It asserts unique ids, that every `data-impact.js` key resolves to a real programme, that every
  field/stage tag is in the taxonomy, that every URL is https, and that every referenced
  country has a profile in `data-countries.js`. It also asserts that every `country` value belongs to exactly one `ATLAS` region in
  `app.js`, and that no entry marked open this month has window text saying "has closed",
  "currently closed" or "not been published" (the Maitri and L'Oréal contradictions).

## Open with the user

- **The name is "Dreams Counsellor"** (since 7 October 2026). It was "Dream Counsellor" until
  2 October, then "Dreams Counselor" for five days, spelled as the user first typed it; they
  then asked for the double l, which also matches the site's British spelling ("programmes").
  The generic noun "counsellor" in prose is unchanged. Everything that carries the name is
  rendered from `index.html`, `make-pages.js` or `make-og.js`, so after any rename run
  `node tools/refresh.js` (pages, share cards, bundle). Two things deliberately never change
  with the name: the repository, URL and `DREAMS` path, and the calendar UID suffix
  `@dream-counsellor` in `app.js`, because a calendar that already holds an exported deadline
  would import it a second time under a new UID. The wordmark's script word is read from the
  markup by `make-fonts.js` and `check.js`.

- **Colour palette**: changed twice on 30 September 2026 at the user's request. "Citrus &
  Slate" became "Marigold & Neem" (yellow, red, orange, green), which they then found too
  yellow and asked to become a galaxy: purple, yellow and pink, a Milky Way, stars, things
  that move, and a constant galaxy sound with nuclear-decay and alpha-particle effects. That
  is "Nebula", above. Do not change hues again without being asked.
- **GitHub Pages: settled, and this time verified from outside.** The source setting was
  "Deploy from a branch" for weeks while this file claimed otherwise, on the false theory that
  a green `actions/deploy-pages@v4` step proves the source is Actions (it does not; GitHub's
  branch publisher deployed the whole branch on top of it). The user switched Settings →
  Pages → Source to GitHub Actions on 28 September 2026, and the build files now 404 live.
  The check from here on: after any push, the Actions list should show only "Deploy to GitHub
  Pages", never "pages build and deployment". `github.io` is blocked by this sandbox's proxy;
  use Composio's remote curl to test paths.
