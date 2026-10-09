# Keeping Dreams Counsellor current

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

Deadlines move every cycle, and a wrong date is worse than none: a student who
believes something closes in January will not look again in May. The reading
is done by machine; you only look at what moved.

```
node tools/recheck.js                    the worklist (fetches the latest sweep itself)
node tools/find.js <id>                  the entry beside what its page says today
node tools/set.js <id> window="…" months=1,2 --stamp      fix and verify in one line
node tools/stamp.js <ids>                verified as it stands (--accept: change was irrelevant)
node tools/refresh.js && node tools/verify.js && tools/ship.sh
```

**How it works.** `.github/workflows/recheck.yml` reads every programme's
official page on GitHub's runners (this sandbox cannot reach most sites) after
every publish that touches the data or tools, and on the 1st and 15th of the
month once the workflow is on the repository's default branch. It keeps only
the lines that state a deadline, an amount or who may apply, and pushes them to
the `recheck` branch. `tools/snapshots.json` holds the same lines as they were
when each entry was last verified. `recheck.js` compares the two, so:

- **unchanged pages drop out.** An entry verified once and whose page has not
  moved needs nothing this month;
- **changed pages come with the diff**, so most can be judged without opening
  the page (`- old line`, `+ new line`);
- **LINKS** lists official URLs that answer 404 or 410;
- **ACT NOW**, **STALE**, **NO CALL** and **OLDEST** work as before, minus
  everything already verified or unchanged. An open entry whose window names a
  closing date earlier this month is always listed, because the badge works by
  month and keeps saying "open now" until the month ends;
- pages the sweep cannot read (bot walls, Indian government portals that refuse
  foreign connections) are listed with `--all` and need a browser.

`node tools/sweep.js --trigger` gets a fresh sweep in about four minutes.

**Reading an entry.** Check the date, the money and above all **who may
apply**. If the eligibility text does not name MBBS, treat MBBS as excluded
until the programme office says otherwise. Read the page itself, never a search
snippet: EMERALD's search description said "applications open" four years after
its last call.

**Fixing an entry.** `tools/set.js` changes `window`, `months`, `money`,
`duration`, `url` and `nocall` in one line, checks the result through the real
loader, restores the file if anything is off, and prints the badge readers will
see. It refuses an empty month list without `nocall=true`, which would read as
"Rolling / always open". `--stamp` records the entry as verified and saves its
page as the new baseline. Anything else (requirements, steps, a new entry, an
entry MBBS students cannot enter, which moves to `skipList` in
`data-impact.js`) is a hand edit; the section below covers it.

**The review stamp writes itself.** `refresh.js` runs `tools/meta.js`, which
sets the month and the sentence readers see from the `checked` stamps and the
sweep ("In October 2026, 56 of 190 programmes were re-read…"). To add what the
pass found: `node tools/meta.js --note "Chevening closed on 6 October."` The note
lapses at the end of the month.

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
| `node tools/recheck.js` | the monthly worklist: only what changed or needs a first read |
| `node tools/sweep.js --trigger` | a fresh read of every official page, on GitHub (≈4 min) |
| `node tools/find.js <q>` | find an entry: file:line, badge, window, link, and what its page says today |
| `node tools/set.js <id> k=v… [--stamp]` | change window, months, money, duration, url or nocall |
| `node tools/stamp.js <ids>` | mark entries as verified this month and save their page baselines |
| `node tools/meta.js [--note "…"]` | the review stamp readers see (`refresh.js` runs it) |
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
