# Dream Counsellor

A career compass for Indian medical students — the ones who have been handed a map with
two roads on it (NEET-PG, or the USMLE) and told that is the whole territory.

It asks three questions that have nothing to do with marks:

1. **What do people come to you for?** — your real skill, the one that costs you no effort
2. **What angers you about this world?** — the most reliable long-range compass anyone has
3. **What makes time stop?** — which *method* you belong in, regardless of subject

Then it asks the questions a counsellor would actually ask — what you can afford, whether
you can handle a Swedish winter, whether you can find food you will eat, whether anyone
will be there when it gets hard — and returns a ranked, dated, costed list of real
programmes with step-by-step application instructions.

## Running it

No build step, no dependencies, no server required.

```bash
open index.html          # or just double-click it
```

To serve it locally instead:

```bash
python3 -m http.server 8000
```

Everything runs client-side. Nothing is ever sent to a server — the only place your
answers and shortlist are kept is this browser's own `localStorage`, and (for your survey
answers only) encoded into the page URL so a bookmark or a link you send yourself brings
the plan back exactly as it was.

## What it does

- **Three questions, then a plan.** Skill, anger, flow — weighted, cross-referenced with
  budget, stage, category-based Indian schemes, age ceilings, climate tolerance, diet and
  support needs — into a ranked, honest, dated list with a written counsellor's read.
- **Shortlist.** Star anything, anywhere it appears (survey results, the full index, or the
  shortlist itself). Persists across sessions, shows a live count in the nav, and folds
  into the exported plan.
- **Search and sort** the full index by name, institution, field, cost or country; sort by
  impact tier, nearest deadline, or A–Z.
- **Save, resume, export.** A finished plan lives in the URL and in local storage — reload,
  bookmark, or send yourself the link and it comes back. "Copy as text" for a notes app or
  an email to a mentor; a print stylesheet that expands every collapsed section for a
  usable offline PDF.
- **Specialty route maps** for 13 post-MBBS paths, each with the Indian and international
  entry routes, the research frontier inside it, and the thing nobody says out loud before
  you commit three years.

## What is indexed

| Category | Contents |
| --- | --- |
| Study | Masters and doctoral programmes across 17 countries, with the entry routes that accept MBBS directly |
| Funding | Government, foundation and university scholarships an Indian medico can hold — including the category-based Indian schemes that go unclaimed most years |
| Research | Funded internships and fellowships, many open to *currently enrolled* MBBS students |
| Conferences | Meetings that fund delegates from low- and middle-income countries |
| Skills | The free stack — almost none of this costs anything |
| Residency | Clinical licensing routes: USMLE, UKMLA, German Approbation, AMC, NEET-PG |
| Specialty routes | 13 full maps: what each specialty is day to day, Indian and international entry, where it leads, the honest trade-offs |
| Frontiers | Disciplines that exist and are hiring, and that nobody names in an Indian medical college |

### Impact tiers

Every programme is graded 1–5 on one question: **does holding this change what you are
eligible for next year?** Not on prestige. Tier 1 is career-defining and brutally
competitive; tier 4 is worth doing only if it is cheap; tier 5 is certificate collecting.
There is also a list of what to actively say no to, because a list of what to pursue is
only half the advice.

## Files

```
index.html                 app shell
assets/styles.css          design system — both themes, tokens at :root
assets/app.js              survey, matching engine, rendering
assets/data-study.js       masters and doctoral programmes
assets/data-funding.js     scholarships and fellowships
assets/data-research.js    research programmes, conferences, skill building
assets/data-frontiers.js   frontier fields + residency routes + equity schemes
assets/data-countries.js   country profiles: climate, food, community, visa, honesty
assets/data-impact.js      impact tiers and the skip list — the judgement layer
```

The judgement layer is deliberately kept in its own file. Facts and opinions about those
facts should be separable, and anyone forking this should be able to disagree with the
tiers without touching the data.

## Adding a programme

Append an object to the relevant array. The fields that matter:

```js
{
  id: "unique-slug",
  name: "Programme name",
  org: "Institution",
  type: "masters | phd | scholarship | fellowship | research | conference | skill | residency",
  country: "UK",                     // must match a key in data-countries.js to get climate matching
  fields: ["psych", "compbio"],      // taxonomy is defined at the top of app.js
  stages: ["pre", "clin"],           // who can apply — this is a hard eligibility gate
  funding: "full | free | stipend | paid | partial",
  zeroCost: true,                    // costs nothing AND covers travel — drives the zero-rupee path
  money: "What it pays or costs, in plain words",
  window: "When applications open and close",
  deadlineMonths: [10, 11, 12],      // drives the calendar and the urgency stripe
  url: "https://official-page",
  why: "Why this is worth someone's time",
  reqs: ["..."],
  steps: ["..."]
}
```

Then add a matching entry to `data-impact.js` with a tier, rough odds and realistic effort.

## Accuracy

Deadlines, amounts and eligibility rules change every cycle. Every entry links to the
official page, and that page is always the authority — this index is a starting point for
your own check, not a substitute for it. Nothing here is affiliated with any institution
listed.

## A note

If you are struggling right now, that is not a career problem and it does not wait for a
deadline. Tele-MANAS, India's free national mental health helpline: **14416**.
