# Keeping Dreams Counselor current

Three jobs come round again and again: the monthly recheck, editing an entry,
and shipping. Each is a handful of commands. Everything here runs from the repo
root with plain `node`; nothing needs installing except Playwright for the
browser checks, which this environment already has.

Nothing in `tools/` is published: the deploy workflow deletes it before
uploading the site. That depends on the repository's Pages source being set to
GitHub Actions (Settings → Pages → Build and deployment → Source), which it has
been since 28 September 2026. If it were ever switched back to "Deploy from a
branch", GitHub would publish the whole branch again, `tools/` included.

## The monthly recheck

Do this in the first week of each month. Deadlines move every cycle, and a
wrong date is worse than none: a student who believes something closes in
January will not look again in May.

1. **Get the worklist.**

   ```
   node tools/recheck.js
   ```

   It lists, in order:

   - **Act now**: tier 1–2 programmes whose badge says open or opening soon.
     These are what a student acts on this week.
   - **Stale text**: windows where every date named has already passed.
   - **No call open**: entries marked `noOpenCall`. Check whether a call has
     reopened.
   - **Oldest**: entries not checked for six months or more.

   Anything checked this month or last is left out, so the list shrinks as you
   go. Add `--md worklist.md` for a tickable checklist, or `--month 2026-11` to
   see what readers will see in a later month.

2. **Check each entry against its official page.** Read the page itself, not a
   search snippet or an aggregator: EMERALD's search description still said
   "applications open" four years after its last call. Check the date, the
   money, and above all **who may apply**. If the eligibility text does not name
   MBBS, treat MBBS as excluded until the programme office says otherwise.

3. **Fix the entry.** The worklist gives the file and line. Common fixes:

   | What you found | What to change |
   |---|---|
   | New dates | `window` text and `deadlineMonths` (the months a reader can act in) |
   | Call closed, no next date | `noOpenCall: true` and `deadlineMonths: []` |
   | Call has reopened | remove `noOpenCall`, set real `deadlineMonths` |
   | MBBS cannot enter | delete the entry and its impact line, add a `skipList` item in `data-impact.js` saying why |
   | Programme ended | same as above |

   Never set `deadlineMonths: []` on its own. An empty list shows as "Rolling /
   always open", which is the opposite of closed.

4. **Record what you verified.**

   ```
   node tools/stamp.js chevening gates-cambridge
   ```

   Only stamp entries whose page you actually read. The stamp is how next
   month's worklist knows what is done.

5. **Say what the pass covered.** Edit `assets/data-meta.js`: `reviewed`,
   `reviewedLabel`, and a `scope` that names what was checked. Do not claim
   more than you checked.

6. **Regenerate, verify, ship** (below).

## Editing or adding one entry

```
node tools/find.js <id or any word>      where it is, its badge today, its window
node tools/find.js <id> --full           the entry's source as well
```

Rules that have each cost real time when broken:

- Facts go in the programme's data file; the tier, odds and verdict go in
  `data-impact.js`. Keep them separate.
- Every entry needs an https link to its **official** page.
- Before adding anything, find the eligibility rules and search them for the
  degree list.
- If the entry's country is new, add it to a region in `ATLAS` in
  `assets/app.js` and give it coordinates in `assets/globe.js`. The data check
  will tell you if you forget.

While editing, `node tools/verify.js --quick` checks the data in a few seconds.

## Shipping

```
node tools/refresh.js     category pages, sitemap, counts, share cards, bundle
node tools/verify.js      every check, about eight minutes
git add -A && git commit
tools/ship.sh             push the branch, fast-forward main, which deploys
```

`refresh.js` also writes the programme counts into `index.html`'s share-card
tags and `llms.txt`, which used to be typed by hand. `ship.sh` refuses to run
with uncommitted changes, on `main`, or when `main` has commits the branch
lacks. After shipping, check the Actions list: "Deploy to GitHub Pages" should
be green, and "pages build and deployment" should not appear at all. If it
does, the Pages source has been switched back to a branch.

## What each tool is for

| Command | Does |
|---|---|
| `node tools/recheck.js` | the monthly worklist |
| `node tools/find.js <q>` | find an entry: file:line, badge, window, link |
| `node tools/stamp.js <ids>` | mark entries as checked this month |
| `node tools/refresh.js` | regenerate everything derived from the data |
| `node tools/verify.js [--quick] [suite…]` | run the checks, with a summary |
| `tools/ship.sh` | publish |
| `node tools/check.js` | the data check alone |
| `node tools/lib/browser.js` | serve the site at http://127.0.0.1:8093/ to look at |
| `node tools/make-pages.js`, `make-og.js`, `make-icons.js`, `make-fonts.js` | the individual generators (`refresh.js` runs the first two) |

The browser checks live in `tools/test/`: `seo`, `font`, `console`, `survey`,
`tour`, `intro`, `atlas`, `pages`, `sky`, `perf` and `audit`. `intro` is the
opening: it plays it through at four sizes and fails if it overruns, if the
count disagrees with the page, if it plays for reduced motion, a paused sky
or a plan link, if Skip (from the gate, mid-turn, or by Escape) does not
bring the page straight back without a tour on top, or if the gate does not
fit a 320px phone. Every other
browser check seeds sessionStorage `dc-intro` so the opening stays out of
its way, the same way they seed `dc-tour-seen`. `sky` photographs the
painted galaxy with the page hidden and fails if any text colour would drop
under 4.5:1 on its brightest patch, which no CSS-based contrast check can
see. `perf` runs a phone viewport at 4x CPU and fails if anything requests
animation frames while the page rests, if a load task runs over 450ms, or if
a tap takes over 450ms to paint. `verify.js` runs them all; each can also
run alone with `node tools/test/<name>.js`. When you build a new component with
its own text colour or background, add its selector to the contrast list in
`tools/test/audit.js` or `tools/test/pages.js` in the same change. Those lists
are whitelists, and a whitelist that is not updated misses things.
