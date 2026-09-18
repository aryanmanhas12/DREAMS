#!/usr/bin/env node
/* Generates the crawlable category pages under /<slug>/index.html.
   Run: node tools/make-pages.js

   Why this exists. The site is one page that builds itself from data-*.js in
   the browser, and that is a good architecture for the reader and a disaster
   for discovery. Measured before this was written: the raw HTML carried 1,036
   words and NOT ONE of the 220 programme names — not "Chevening", not "ICMR",
   not "Fulbright". Even after JavaScript ran, the landing page still had none
   of them, because the browse view only fills once you navigate to it. So the
   whole substance of the project, 61,000 words about 220 programmes, was
   invisible to every search engine and every AI system that reads HTML.

   These pages are the crawlable copy. They are NOT SEO filler: every line on
   them is the real entry text, generated from the same files index.html loads,
   so they cannot drift from the index the way a hand-written landing page
   would. Re-run this whenever the data changes.

   Deliberately NOT done: a page per programme. 220 near-identical thin pages
   is the pattern search engines penalise and readers hate. The category pages
   carry the full text of each entry, which is the same content without the
   thinness. */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const BASE = "https://aryanmanhas12.github.io/DREAMS";

/* ── load the data exactly as index.html does ── */
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const FILES = [...html.matchAll(/<script src="assets\/(data-[^"]+\.js)"><\/script>/g)].map((m) => m[1]);
const sandbox = { window: {}, document: { addEventListener() {} }, console };
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);
for (const f of FILES) vm.runInContext(fs.readFileSync(path.join(ROOT, "assets", f), "utf8"), sandbox, { filename: f });
const DB = sandbox.window.DB;

const POOLS = ["study", "funding", "research", "residency", "equity"];
const items = POOLS.reduce((a, k) => a.concat(DB[k] || []), []);
const REGIONS = ["Global", "Online", "Any", "Europe", "Nordics", "Asia", "Gulf", "Baltics"];
const TOTAL = items.length + DB.frontiers.length + DB.specialties.length;

const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ── the pages, each defined by a real filter over real data ──
   Only categories with enough genuine content to be worth a page. Nothing
   here is invented: `pick` selects from the index, and if a filter ever
   returns too few entries the build refuses rather than shipping a thin
   page. */
const PAGES = [
  {
    slug: "during-mbbs",
    title: "Opportunities open while you are still in MBBS",
    desc: "Research projects, funded summers, exchanges and leadership routes an Indian medical student can apply for during MBBS, not after it. Each one links to its official page.",
    h1: "What you can do while you are still in MBBS",
    lede: "Most career advice for Indian medical students starts after the degree. These are the things that are open now, in first year or fifth, and several of them close permanently once you graduate.",
    pick: () => items.filter((i) => (i.stages || []).some((s) => s === "pre" || s === "clin"))
  },
  {
    slug: "study-abroad",
    title: "Studying medicine and public health abroad from India",
    desc: "Masters, doctorates and research placements abroad that accept MBBS as the qualifying degree, with what each one actually costs and who funds it.",
    h1: "Studying abroad from an Indian medical degree",
    lede: "Every entry here accepts an Indian medical degree. The money line says what it costs and what is covered, because that is the question that decides whether a place is real for you.",
    pick: () => items.filter((i) => i.country && i.country !== "India" && !REGIONS.includes(i.country))
  },
  {
    slug: "scholarships",
    title: "Scholarships for Indian medical students and graduates",
    desc: "Fully and partly funded scholarships open to Indian medical students, with the deadline window, what is covered and the eligibility rule that usually decides it.",
    h1: "Scholarships open to Indian medical students",
    lede: "Fully funded means different things to different funders. Each entry says what is actually covered, because the gap between tuition-only and tuition-plus-living-plus-flights is the difference between possible and not.",
    pick: () => items.filter((i) => i.type === "scholarship")
  },
  {
    slug: "fellowships",
    title: "Fellowships in research, global health and policy",
    desc: "Research, clinical and policy fellowships open to Indian medical graduates, including WHO, UN and global health routes, with eligibility stated plainly.",
    h1: "Fellowships open to Indian medical graduates",
    lede: "Fellowships are where a medical career stops being only clinical. Several of these take people still in training, and the entries say which.",
    pick: () => items.filter((i) => i.type === "fellowship")
  },
  {
    slug: "research",
    title: "Research opportunities and funded projects in medicine",
    desc: "Funded studentships, summer research programmes, grants and internships in medical research, open to Indian students, each linked to its official page.",
    h1: "Research opportunities in medicine",
    lede: "The first research project is the hardest one to get and the one everything else is built on. These run from a two-month studentship at your own college to a funded summer in a laboratory abroad.",
    pick: () => items.filter((i) => i.type === "research")
  },
  {
    slug: "india",
    title: "Research, funding and training inside India",
    desc: "Fellowships, studentships, grants and training programmes for medical students inside India, from ICMR-STS to BIRAC, with deadlines and eligibility.",
    h1: "What is available inside India",
    lede: "Leaving is not the only plan, and for many people it is not the first one. These are the funded routes that do not need a visa.",
    pick: () => items.filter((i) => i.country === "India")
  },
  {
    slug: "fully-funded",
    title: "Fully funded opportunities for Indian medical students",
    desc: "Programmes that cover the full cost — tuition, stipend and often flights — for Indian medical students and graduates, with what each one actually pays.",
    h1: "Fully funded, and what that actually means",
    lede: "Every entry on this page is marked as full funding by its own provider. Read the money line on each: some cover tuition and living and travel, others cover tuition alone and leave you to find the rest.",
    pick: () => items.filter((i) => i.funding === "full")
  },
  {
    slug: "free",
    title: "Opportunities that cost nothing to apply for or take part in",
    desc: "Courses, datasets, networks and programmes that are free at the point of use for Indian medical students, including WHO courses and UN youth routes.",
    h1: "Things that cost nothing",
    lede: "No fee, no travel, and in several cases no selection at all. If your constraint is money rather than ambition, start here.",
    pick: () => items.filter((i) => i.zeroCost)
  },
  {
    slug: "conferences",
    title: "Conferences where medical students can present",
    desc: "Conferences and congresses that accept student abstracts, with travel awards and student rates where they exist.",
    h1: "Conferences that take student work",
    lede: "Attending is not a credential; presenting is. Each of these takes abstracts from students, and several fund the trip.",
    pick: () => items.filter((i) => i.type === "conference")
  },
  /* The next two draw on pools that are NOT in `items`, and that is the
     reason they exist. `specialties` and `frontiers` are the only places on
     this site that explain what a career actually consists of rather than
     listing something to apply to — postgraduate training, what the day
     looks like, which superspecialities follow, how licensing works in four
     countries. Forty records of it, and none of it was in any HTML a crawler
     could read, because the first pass only covered the programme pools. */
  {
    slug: "specialties",
    title: "Medical specialties, and where each one leads",
    desc: "Eighteen specialties an Indian medical graduate can enter, with the training route through NEET-PG, the routes abroad, the superspecialities that follow and the honest trade-off in each.",
    h1: "Specialties, and where each one actually leads",
    lede: "Choosing a specialty is choosing a working life, and most of the information available treats it as choosing a rank. Each entry here says what the day consists of, how you train for it in India, what it takes to practise it abroad, and the part people leave out.",
    pick: () => DB.specialties,
    render: specialtyHTML
  },
  {
    slug: "research-fields",
    title: "Research fields in medicine that are open and unfinished",
    desc: "Twenty-two active research areas — genomics, computational psychiatry, implementation science, medical devices, health economics — with why each one is under-studied in India and how a medical student enters it.",
    h1: "Research fields that are open and unfinished",
    lede: "These are areas rather than applications. Each says what the field is, why India is under-represented in it, what qualification gets you in, which groups are doing the work, and one thing you could start this week without permission from anybody.",
    pick: () => DB.frontiers,
    render: frontierHTML
  }
];

/* ── shared chrome ── */
const NAV = PAGES.map((p) => ({ slug: p.slug, label: p.h1 }));

function head(p, url, count) {
  /* Each category has its own card, rendered from these same definitions by
     tools/make-og.js. A share of /scholarships/ is answering a narrower
     question than a share of the homepage, and repeating the homepage card
     wastes the one impression most readers ever get. */
  const ogImg = `${BASE}/assets/og/${p.slug}.png`;
  const ogAlt = `${p.h1} — ${count} of ${TOTAL} entries in the Dream Counsellor index, beside a globe marking the countries they lead to.`;
  return `<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(p.title)} — Dream Counsellor</title>
<meta name="description" content="${esc(p.desc)}" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<link rel="canonical" href="${url}" />
<meta name="theme-color" content="#F2EFE4" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#061A22" media="(prefers-color-scheme: dark)" />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="Dream Counsellor" />
<meta property="og:title" content="${esc(p.title)}" />
<meta property="og:description" content="${esc(p.desc)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${ogImg}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="${esc(ogAlt)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(p.title)}" />
<meta name="twitter:description" content="${esc(p.desc)}" />
<meta name="twitter:image" content="${ogImg}" />

<link rel="icon" href="${FAVICON}" />
<link rel="apple-touch-icon" href="../assets/icons/apple-touch-icon.png" />
<link rel="stylesheet" href="../assets/styles.css" />`;
}

const FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='12.5' fill='none' stroke='%2300787E' stroke-width='2.4'/%3E%3Cellipse cx='16' cy='16' rx='5.5' ry='12.5' fill='none' stroke='%2300787E' stroke-width='1.5'/%3E%3Cline x1='3.5' y1='16' x2='28.5' y2='16' stroke='%2300787E' stroke-width='1.5'/%3E%3Ccircle cx='20.5' cy='19.5' r='3' fill='%23C63A0E'/%3E%3C/svg%3E";

/* JSON-LD. Only types that genuinely describe the page: a CollectionPage
   holding an ItemList of real entries, plus the breadcrumb trail that matches
   the actual URL. No ratings, no prices, no fabricated organisations. */
function jsonld(p, url, list) {
  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Dream Counsellor", item: BASE + "/" },
        { "@type": "ListItem", position: 2, name: p.h1, item: url }
      ]
    },
    {
      "@type": "CollectionPage",
      "@id": url,
      url: url,
      name: p.title,
      description: p.desc,
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: "Dream Counsellor", url: BASE + "/" },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: list.length,
        /* `url` is omitted where the entry has none. Specialties and research
           fields are things this site describes, not things it links out to,
           and a ListItem is valid without one — inventing a URL to fill the
           slot would point somewhere that does not answer for the text. */
        itemListElement: list.slice(0, 100).map((it, n) => {
          const li = { "@type": "ListItem", position: n + 1, name: it.name };
          if (it.url) li.url = it.url;
          return li;
        })
      }
    }
  ];
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 1);
}

function entryHTML(it) {
  const facts = [
    it.org && `<dt>Provider</dt><dd>${esc(it.org)}</dd>`,
    it.country && `<dt>Where</dt><dd>${esc(it.country)}${it.city ? ", " + esc(it.city) : ""}</dd>`,
    it.money && `<dt>Cost and funding</dt><dd>${esc(it.money)}</dd>`,
    it.duration && `<dt>Length</dt><dd>${esc(it.duration)}</dd>`,
    it.window && `<dt>When to apply</dt><dd>${esc(it.window)}</dd>`
  ].filter(Boolean).join("\n      ");

  const reqs = (it.reqs || []).length
    ? `<h3>Who it is open to</h3>\n    <ul>${it.reqs.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>`
    : "";
  const steps = (it.steps || []).length
    ? `<h3>How to approach it</h3>\n    <ol>${it.steps.map((r) => `<li>${esc(r)}</li>`).join("")}</ol>`
    : "";

  return `  <article class="listing" id="${esc(it.id)}">
    <h2>${esc(it.name)}</h2>
    <p class="listing-why">${esc(it.why || "")}</p>
    <dl class="listing-facts">
      ${facts}
    </dl>
    ${reqs}
    ${steps}
    <p class="listing-link"><a href="${esc(it.url)}" rel="noopener nofollow" target="_blank">Official page for ${esc(it.name)}</a> — always the authority on dates and eligibility.</p>
  </article>`;
}

/* Specialties and frontiers carry prose rather than an application, so they
   get their own shape. Same <article class="listing"> wrapper and the same
   heading levels, so the stylesheet and the heading-order check both hold. */
const bullets = (title, arr) => (arr || []).length
  ? `<h3>${title}</h3>\n    <ul>${arr.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>`
  : "";

function specialtyHTML(it) {
  const facts = [
    it.day && `<dt>What the day is</dt><dd>${esc(it.day)}</dd>`,
    it.india && `<dt>Training for it in India</dt><dd>${esc(it.india)}</dd>`,
    it.fitIf && `<dt>It fits you if</dt><dd>${esc(it.fitIf)}</dd>`
  ].filter(Boolean).join("\n      ");

  return `  <article class="listing" id="${esc(it.id)}">
    <h2>${esc(it.name)}</h2>
    <p class="listing-why">${esc(it.oneLine || "")}</p>
    <dl class="listing-facts">
      ${facts}
    </dl>
    ${bullets("Practising it outside India", it.abroad)}
    ${bullets("Superspecialities that follow", it.supers)}
    ${bullets("Where the research is", it.research)}
    ${bullets("Masters that build on it", it.masters)}
    ${it.truth ? `<h3>The part people leave out</h3>\n    <p>${esc(it.truth)}</p>` : ""}
  </article>`;
}

function frontierHTML(it) {
  const facts = [
    it.what && `<dt>What the field is</dt><dd>${esc(it.what)}</dd>`,
    it.whyIndia && `<dt>Why it matters from India</dt><dd>${esc(it.whyIndia)}</dd>`,
    it.entry && `<dt>How you get into it</dt><dd>${esc(it.entry)}</dd>`
  ].filter(Boolean).join("\n      ");

  return `  <article class="listing" id="${esc(it.id)}">
    <h2>${esc(it.name)}</h2>
    <p class="listing-why">${esc(it.tagline || "")}</p>
    <dl class="listing-facts">
      ${facts}
    </dl>
    ${bullets("Groups doing the work", it.where)}
    ${it.startNow ? `<h3>What you could start this week</h3>\n    <p>${esc(it.startNow)}</p>` : ""}
    ${it.url ? `<p class="listing-link"><a href="${esc(it.url)}" rel="noopener nofollow" target="_blank">Official page for ${esc(it.name)}</a> — always the authority on dates and eligibility.</p>` : ""}
  </article>`;
}

function related(slug) {
  const others = NAV.filter((n) => n.slug !== slug);
  return others.map((n) => `<li><a href="../${n.slug}/">${esc(n.label)}</a></li>`).join("\n      ");
}

function page(p) {
  const url = `${BASE}/${p.slug}/`;
  const list = p.pick();
  if (list.length < 8) throw new Error(`${p.slug}: only ${list.length} entries — too thin to publish as its own page`);
  const stamp = (DB.meta && DB.meta.reviewedLabel) || "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
${head(p, url, list.length)}
<script type="application/ld+json">
${jsonld(p, url, list)}
</script>
</head>
<body>
<main class="wrap doc-page listing-page">

  <nav class="crumbs" aria-label="Breadcrumb">
    <ol>
      <li><a href="../">Dream Counsellor</a></li>
      <li aria-current="page">${esc(p.h1)}</li>
    </ol>
  </nav>

  <h1>${esc(p.h1)}</h1>
  <p class="doc-lede">${esc(p.lede)}</p>
  <p class="doc-small">${list.length} of ${TOTAL} entries in this index match this page.${stamp ? ` Entries last checked against their official pages in ${esc(stamp)}; the official page linked on each one is always the authority.` : ""}</p>

  <p class="doc-actions">
    <a class="btn btn-primary" href="../">Answer three questions and get a ranked plan</a>
    <a class="btn btn-ghost" href="../#browse">Browse all ${TOTAL} in the app</a>
  </p>

${list.map(p.render || entryHTML).join("\n\n")}

  <section class="related">
    <h2>Related pages</h2>
    <ul>
      ${related(p.slug)}
    </ul>
  </section>

  <p class="doc-back"><a href="../">← Dream Counsellor</a> · <a href="../privacy.html">Privacy</a> · <a href="../terms.html">Terms of use</a></p>
</main>
</body>
</html>
`;
}

/* ── exported so tools/make-og.js renders one share card per category from
      the SAME definitions these pages are built from. A card is the first
      impression far more often than the page is, and the project has already
      shipped one advertising 155 programmes while the index held 207. Two
      copies of a headline is how that happens again, so there is one copy. ── */
module.exports = {
  BASE,
  TOTAL,
  PAGES: PAGES.map((p) => ({ slug: p.slug, title: p.title, desc: p.desc, h1: p.h1, count: p.pick().length }))
};

/* ── write ── */
if (require.main === module) {
  let written = 0, entries = 0;
  for (const p of PAGES) {
    const dir = path.join(ROOT, p.slug);
    fs.mkdirSync(dir, { recursive: true });
    const out = page(p);
    fs.writeFileSync(path.join(dir, "index.html"), out);
    const n = p.pick().length;
    entries += n;
    written++;
    console.log(`  /${p.slug}/`.padEnd(22) + String(n).padStart(3) + " entries   " + (Buffer.byteLength(out) / 1024).toFixed(0) + " KB");
  }
  console.log(`\n${written} pages written, ${entries} entry renderings in crawlable HTML`);

  /* ── sitemap, regenerated so it can never disagree with what exists ── */
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: BASE + "/", pri: "1.0", freq: "monthly" },
    ...PAGES.map((p) => ({ loc: `${BASE}/${p.slug}/`, pri: "0.8", freq: "monthly" })),
    { loc: BASE + "/privacy.html", pri: "0.3", freq: "yearly" },
    { loc: BASE + "/terms.html", pri: "0.3", freq: "yearly" }
  ];
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.pri}</priority>\n  </url>`).join("\n") +
    `\n</urlset>\n`);
  console.log(`sitemap.xml rewritten with ${urls.length} canonical URLs`);
}
