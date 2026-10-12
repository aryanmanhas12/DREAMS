/* ════════════════════════════════════════════════════════
   Dreams Counsellor — survey, matching engine, rendering.
   No build step, no dependencies. Open index.html and it runs.
   ════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ───────────────── shared taxonomy ───────────────── */
  const FIELDS = {
    psych:     "Psychiatry & mental health",
    neuro:     "Neuroscience",
    pubhealth: "Public health & epidemiology",
    biochem:   "Biochemistry & molecular biology",
    genomics:  "Genetics & genomics",
    compbio:   "Data, AI & computation",
    global:    "Global health & policy",
    clinical:  "Clinical medicine",
    systems:   "Health systems & management",
    nutrition: "Nutrition & metabolism",
    infect:    "Infectious disease",
    onco:      "Cancer biology",
    repro:     "Reproductive & child health",
    env:       "Planetary & environmental health"
  };

  /* Values of `country` that name a region rather than a place. They are
     excluded from the "countries covered" tile, because the globe can only plot
     somewhere it has coordinates for, and a tile claiming 33 while the globe
     shows 31 is the same contradiction that made the old India count read 16 in
     one place and 65 in another. The scratchpad data check asserts that every
     non-region country here has globe coordinates, so the two cannot drift. */
  const REGIONS = ["Any", "Global", "Online", "Europe", "Asia", "Nordics", "Baltics", "Gulf"];

  const STAGE_LABEL = {
    pre:    "1st–2nd professional MBBS",
    clin:   "3rd–final professional MBBS",
    intern: "Internship year",
    grad:   "MBBS complete",
    pg:     "Post-MD / MS / DNB"
  };

  const TYPE_LABEL = {
    masters: "Masters", phd: "Doctorate", scholarship: "Scholarship",
    fellowship: "Fellowship", research: "Research programme",
    conference: "Conference", skill: "Skill building", residency: "Clinical training"
  };

  const MONTHS = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];

  /* ───────────────── the survey ─────────────────
     Trimmed in October 2026 from 16 questions and up to 18 options
     each to three core questions of eight options and six short practical
     ones. Nothing the ranking uses was dropped: merged options carry the
     union of their old fields, and the questions folded together (climate,
     health and what you need around you into `living`; record and passport
     into `have`) are unpacked again in buildProfile. Age, time, timeline and
     named countries went, because each moved the list for a handful of
     entries at most. `ooh` is the mood Ooh asks the question in; `when`
     skips a question that cannot apply, so a reader staying in India is
     never asked how they would cope with a Swedish winter. */
  const QUESTIONS = [
    {
      id: "skills", ooh: "hello", act: "Question one of three", type: "multi", free: true,
      title: "What do people come to you for?",
      help: "Not what you score well in. What people actually knock on your door about: the thing you do so easily you have stopped noticing it is a skill. <em>Pick everything that is true.</em>",
      placeholder: "In your own words, what do people ask you for?",
      options: [
        { v: "execute",  t: "Getting things done",                 d: "You finish it, and people know you will", f: ["systems", "clinical"] },
        { v: "findopps", t: "Knowing people and openings",         d: "Who to ask, what to apply for, who should meet whom", f: ["global", "systems"] },
        { v: "lead",     t: "Leading a room",                      d: "Speaking, organising, getting people who disagree to agree", f: ["systems", "global"] },
        { v: "listen",   t: "Listening when someone falls apart",  d: "People tell you what they tell nobody else", f: ["psych", "clinical", "repro"] },
        { v: "explain",  t: "Explaining and writing",              d: "You make hard things click, on paper or out loud", f: ["global", "pubhealth"] },
        { v: "build",    t: "Building things",                     d: "Code, tools, designs: something that works when you are done", f: ["compbio"] },
        { v: "numbers",  t: "Numbers, and the detail others miss", d: "The pattern in the data, the error on page four", f: ["compbio", "pubhealth", "clinical", "biochem"] },
        { v: "calm",     t: "Steady hands and a calm head",        d: "The one they want when it goes wrong", f: ["clinical", "onco"] }
      ]
    },
    {
      id: "anger", ooh: "listen", act: "Question two of three", type: "multi", free: true,
      title: "What angers you about this world?",
      help: "Anger is the most reliable compass anyone has. The thing that makes you furious at 2 a.m. is the thing you will still care about in fifteen years. <em>Be honest rather than noble.</em>",
      placeholder: "What actually makes you angry?",
      options: [
        { v: "stigma",   t: "Mental illness treated as weakness",       d: "Stigma, silence, and families who will not name it", f: ["psych", "global", "clinical"] },
        { v: "prevent",  t: "People dying of things we can stop",       d: "Vaccines, TB, the gap between the guideline and the ward", f: ["pubhealth", "infect", "global", "repro"] },
        { v: "money",    t: "Care that depends on money or where you live", d: "Caste, class, and 200 km for something basic", f: ["pubhealth", "systems", "global", "genomics"] },
        { v: "women",    t: "Women's health treated as a footnote",     d: "Half the population, a fraction of the research", f: ["repro", "pubhealth"] },
        { v: "systemic", t: "Systems that fail, doctors included",      d: "Files that vanish, violence on duty, burnout as a rite of passage", f: ["systems", "psych"] },
        { v: "climate",  t: "Air, heat and a poisoned environment",     d: "The health cost nobody counts", f: ["env", "pubhealth"] },
        { v: "unsolved", t: "Diseases nobody has solved",               d: "Schizophrenia, pain, cancers, in people nobody has studied", f: ["biochem", "neuro", "genomics", "onco", "compbio", "clinical"] },
        { v: "misinfo",  t: "Knowledge kept from people",               d: "Confident nonsense, paywalls, and talent with no mentor", f: ["global", "pubhealth", "compbio", "systems"] }
      ]
    },
    {
      id: "flow", ooh: "ooh", act: "Question three of three", type: "multi", free: true,
      title: "What makes time stop?",
      help: "The task where you look up and three hours have gone. Treat that as data rather than mood. It tells you which <em>method</em> you belong in, whatever subject you love.",
      placeholder: "When did you last lose track of time completely?",
      options: [
        { v: "building", t: "Building or taking things apart", d: "Code, a machine, a pathway, an argument", f: ["compbio", "biochem", "genomics"] },
        { v: "reading",  t: "A paper at 1 a.m.",               d: "One citation leads to the next, with no exam attached", f: ["biochem", "neuro", "genomics"] },
        { v: "patient",  t: "A real conversation with a patient", d: "The history nobody else took, or staying with someone frightened", f: ["clinical", "psych"] },
        { v: "teaching", t: "Teaching, writing, arguing it out", d: "Until it clicks for them, or one of you changes your mind", f: ["global", "pubhealth", "systems"] },
        { v: "organis",  t: "Getting a group to work",         d: "An event, a drive, a rota that finally holds", f: ["systems", "global"] },
        { v: "hands",    t: "Hands at work",                   d: "A lab bench or a procedure, until your hands know it", f: ["biochem", "genomics", "clinical", "onco"] },
        { v: "data",     t: "The pattern in a dataset",        d: "Designing the study, then the plot that finally makes sense", f: ["compbio", "pubhealth"] },
        { v: "outdoors", t: "Out in the field",                d: "Villages, camps and households, away from the building", f: ["pubhealth", "global", "env"] }
      ]
    },
    {
      id: "stage", ooh: "think", act: "Where you are", type: "single",
      title: "Where are you right now?",
      help: "The hardest filter there is. Some programmes take only current MBBS students and close the day you graduate.",
      options: [
        { v: "pre",    t: "1st or 2nd professional",  d: "The widest window you will ever have" },
        { v: "clin",   t: "3rd or final professional", d: "International research internships open up" },
        { v: "intern", t: "Internship year",           d: "Experience starts counting" },
        { v: "grad",   t: "MBBS done",                 d: "Masters, funded PhDs and residency routes" },
        { v: "pg",     t: "MD, MS or DNB done",        d: "Fellowships and your own research funding" }
      ]
    },
    {
      id: "money", ooh: "care", act: "What is possible", type: "single",
      title: "Be honest about money.",
      help: "This changes the whole answer, and there is no wrong reply. If money is tight, that is a filter, not a disqualification.",
      options: [
        { v: "none",   t: "I cannot pay anything",           d: "Only what is free or fully funded" },
        { v: "small",  t: "I could find ₹1 to 3 lakh",       d: "Fees, applications, maybe a short trip" },
        { v: "loan",   t: "I would take an education loan",  d: "Show me the arithmetic too" },
        { v: "family", t: "My family can back a degree abroad", d: "The full range, funded routes still first" }
      ]
    },
    {
      id: "abroad", ooh: "think", act: "What is possible", type: "single",
      title: "Do you want to leave India?",
      help: "There is a real answer here that is not yes. NIMHANS, AIIMS, IISc and NCBS produce work cited worldwide, and the India Alliance funds clinicians to lead research without a doctorate.",
      options: [
        { v: "yes",    t: "Yes, that is the plan",          d: "Show me the world" },
        { v: "funded", t: "Only if someone else pays",      d: "Fully funded routes only" },
        { v: "short",  t: "Short trips, not moving",        d: "Summer programmes, exchanges, conferences" },
        { v: "india",  t: "I want to build something here", d: "Routes inside India, and Indian funding" },
        { v: "unsure", t: "I do not know yet",              d: "Show me both" }
      ]
    },
    {
      id: "category", ooh: "listen", act: "What is possible", type: "single",
      title: "Do any of these apply to you?",
      help: "Asked only because the Government of India runs fully funded overseas scholarships for specific categories, and places can go unfilled. Nothing is stored anywhere.",
      options: [
        { v: "sc",  t: "Scheduled Caste, DNT or landless labourer family", d: "The National Overseas Scholarship funds a full degree abroad" },
        { v: "st",  t: "Scheduled Tribe",                d: "The Ministry of Tribal Affairs overseas scheme" },
        { v: "obc", t: "OBC, EWS or a minority community", d: "Loan interest subsidy and national fellowships" },
        { v: "gen", t: "None of these, or I would rather not say", d: "Everything else here still applies" }
      ]
    },
    {
      id: "living", ooh: "care", act: "Living abroad", type: "multi",
      when: function (a) { return a.abroad !== "india"; },
      title: "What would make living abroad hard for you?",
      help: "Stockholm gets about six hours of grey light in December, and prospectuses never say so. A degree you leave in March because you cannot get out of bed is worth nothing. <em>Pick everything that matters.</em>",
      options: [
        { v: "cold",      t: "Cold, dark winters",          d: "Warm places and long daylight first" },
        { v: "veg",       t: "I am vegetarian or Jain",      d: "Some countries make this genuinely hard" },
        { v: "halal",     t: "I eat halal",                  d: "Availability varies a lot by city" },
        { v: "breath",    t: "Asthma or bad allergies",      d: "Pollen seasons and air quality get flagged" },
        { v: "home",      t: "Being far from home",          d: "A short flight home counts for more" },
        { v: "community", t: "Having no Indians around",     d: "Big Indian communities count for more" },
        { v: "support",   t: "Getting mental health support", d: "Places where help is easier to reach" },
        { v: "none",      t: "None of these",                d: "I would manage almost anywhere" }
      ]
    },
    {
      id: "have", ooh: "happy", act: "What you already have", type: "multi",
      title: "What do you already have?",
      help: "This decides what you can win today and what to build towards. Ticking nothing is the normal starting point, and it is fine.",
      options: [
        { v: "project",  t: "A research project",            d: "Even an unfinished one" },
        { v: "pub",      t: "A paper, abstract or poster",   d: "Any journal, any conference" },
        { v: "code",     t: "Some coding",                   d: "Python or R, even badly" },
        { v: "mentor",   t: "A faculty member who would back me", d: "The rarest thing on this list" },
        { v: "lead",     t: "Something I organised or led",  d: "An event, a drive, a society" },
        { v: "passport", t: "A passport",                    d: "It takes weeks to get one" },
        { v: "test",     t: "IELTS or TOEFL done",           d: "Most applications abroad ask for it" },
        { v: "nothing",  t: "None of this yet",              d: "Then that is where we start" }
      ]
    }
  ];

  /* Answers saved before the trim used option values that were merged. A
     plan link from then still opens: each old value maps to the option it
     was folded into, and the old practical answers are still read in
     buildProfile. */
  const LEGACY = {
    skills: { reliable: "execute", connect: "findopps", mediate: "lead", comfort: "listen", write: "explain",
              make: "build", detail: "numbers", memory: "numbers", hands2: "calm" },
    anger:  { children: "prevent", caste: "money", rural: "money", quack: "money", doctors: "systemic",
              eurocent: "unsolved", pain: "unsolved", paywall: "misinfo", mentor: "misinfo", elderly: "stigma" },
    flow:   { takeapart: "building", making: "building", curious: "reading", sitting: "patient", writing: "teaching",
              arguing: "teaching", team: "organis", procedure: "hands", designing: "data" },
    category: { skip: "gen" }
  };
  function upgradeAnswers() {
    Object.keys(LEGACY).forEach(function (qid) {
      const map = LEGACY[qid], a = answers[qid];
      if (Array.isArray(a)) {
        const out = [];
        a.forEach(function (v) { const nv = map[v] || v; if (out.indexOf(nv) === -1) out.push(nv); });
        answers[qid] = out;
      } else if (a && map[a]) answers[qid] = map[a];
    });
  }

  /* ───────────────── state ───────────────── */
  const answers = {};
  let qIndex = 0;

  /* Two lengths of the same survey.

     "short" asks only skill, anger and flow — the three questions the site is
     named for, and the only three that are about who you are rather than what
     you can currently afford. "full" adds the thirteen practical constraints
     that decide what is actually open to you.

     The three come first in QUESTIONS precisely so this is a slice rather than
     a filter, which keeps qIndex meaning the same thing in both modes and lets
     someone upgrade mid-flow without re-answering anything.

     The mode rides inside `answers` so it survives the URL and localStorage
     round-trip for free — a shared short plan reopens as a short plan. It is
     underscore-prefixed because buildProfile reads answers by question id and
     nothing should ever mistake this for one. */
  const CORE_COUNT = 3;
  function surveyMode() { return answers._mode === "short" ? "short" : "full"; }
  function activeQuestions() {
    const qs = QUESTIONS.filter(function (q) { return !q.when || q.when(answers); });
    return surveyMode() === "short" ? qs.slice(0, CORE_COUNT) : qs;
  }
  function startSurvey(mode, fromIndex) {
    answers._mode = mode === "short" ? "short" : "full";
    qIndex = fromIndex || 0;
    renderQuestion();
    showView("survey");
  }

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  function allOpportunities() {
    return []
      .concat(window.DB.study || [], window.DB.funding || [], window.DB.research || [],
              window.DB.residency || [], window.DB.equity || []);
  }

  /* impact tier lookup — the judgement layer, kept separate from the facts */
  function impactOf(item) {
    return (window.DB.impact && window.DB.impact[item.id]) || { t: 3, odds: "", effort: "", note: "" };
  }

  /* ───────────────── derive a profile ───────────────── */
  function buildProfile() {
    // `living` and `have` each stand for several of the old questions. They
    // are unpacked into the same fields score() and rankCountries() have
    // always read; a plan saved before the trim still carries the old ones.
    const living = answers.living || [];
    const have = answers.have || [];
    const pick = function (arr, v, out) { return arr.indexOf(v) !== -1 ? out : []; };
    const livCold = living.indexOf("cold") !== -1 ? "cant" : living.indexOf("none") !== -1 ? "fine" : null;
    const livHealth = [].concat(pick(living, "veg", ["veg"]), pick(living, "halal", ["halal"]),
      pick(living, "breath", ["asthma", "pollen"]), pick(living, "support", ["mh"]));
    const livEmotional = [].concat(pick(living, "cold", ["light"]), pick(living, "home", ["family"]),
      pick(living, "community", ["community"]), pick(living, "support", ["support"]), pick(living, "none", ["alone"]));
    const haveRecord = have.filter(function (v) { return ["project", "pub", "code", "mentor", "lead", "nothing"].indexOf(v) !== -1; })
      .concat(pick(have, "pub", ["poster"]));
    const pass = have.indexOf("passport") !== -1, test = have.indexOf("test") !== -1;
    const haveEnglish = pass && test ? "both" : pass ? "pass" : test ? "test" : "none";
    const p = {
      fields: {},          // field -> weight
      stage: answers.stage || "pre",
      age: answers.age || "2124",
      money: answers.money || "family",
      category: answers.category || "gen",
      abroad: answers.abroad || "unsure",
      countries: answers.countries || [],
      cold: living.length ? (livCold || "fine") : (answers.cold || "fine"),
      health: living.length ? livHealth : (answers.health || []),
      emotional: living.length ? livEmotional : (answers.emotional || []),
      english: have.length ? haveEnglish : (answers.english || "none"),
      time: answers.time || "t5",
      record: have.length ? haveRecord : (answers.record || []),
      horizon: answers.horizon || "open",
      notes: {
        skills: answers.skills_text || "",
        anger: answers.anger_text || "",
        flow: answers.flow_text || ""
      },
      picked: {
        skills: answers.skills || [],
        anger: answers.anger || [],
        flow: answers.flow || []
      }
    };

    // Weight fields from the three core questions. Anger counts most —
    // it is the most stable predictor of what someone still cares about later.
    const weightBy = { skills: 2, anger: 3, flow: 2 };
    ["skills", "anger", "flow"].forEach(function (qid) {
      const q = QUESTIONS.find((x) => x.id === qid);
      (answers[qid] || []).forEach(function (val) {
        const opt = q.options.find((o) => o.v === val);
        if (!opt) return;
        (opt.f || []).forEach(function (f) {
          p.fields[f] = (p.fields[f] || 0) + weightBy[qid];
        });
      });
    });

    // free text nudges
    const text = (p.notes.skills + " " + p.notes.anger + " " + p.notes.flow).toLowerCase();
    const KEYS = {
      psych: ["mental", "psychiatr", "depress", "suicide", "anxiet", "stigma", "schizo"],
      neuro: ["brain", "neuro", "eeg", "cognit", "neural"],
      compbio: ["code", "coding", "python", "machine learning", "ai ", "algorithm", "data", "model", "build", "app", "software"],
      genomics: ["gene", "genom", "dna", "variant", "omics", "hered"],
      pubhealth: ["public health", "epidem", "population", "communit", "screening", "prevent"],
      global: ["policy", "global", "advoca", "inequal", "access", "teach", "writ"],
      biochem: ["molecul", "biochem", "protein", "metabol", "lab"],
      env: ["climate", "pollut", "environment", "heat", "air"],
      nutrition: ["diet", "nutrition", "food", "obes"],
      infect: ["infect", "tb", "tuberc", "malaria", "antibiot", "resist"],
      repro: ["women", "maternal", "child", "pregnan", "menstrua"],
      onco: ["cancer", "tumour", "tumor", "oncol"]
    };
    Object.keys(KEYS).forEach(function (f) {
      if (KEYS[f].some((k) => text.indexOf(k) !== -1)) p.fields[f] = (p.fields[f] || 0) + 2;
    });

    p.topFields = Object.keys(p.fields).sort((a, b) => p.fields[b] - p.fields[a]);
    p.exp = p.stage === "pg" ? 4 : p.stage === "grad" ? 2 : p.stage === "intern" ? 1 : 0;
    p.needsFree = p.money === "none" || p.abroad === "funded";

    /* Which constraints the reader ACTUALLY answered, as opposed to which ones
       have a default above. Every field on `p` is populated either way — that
       is what keeps ranking working on a three-question run, but the prose is
       a different matter. "You told me you cannot pay" attributed to someone
       who was never asked about money is a fabrication, and it is the exact
       failure this site exists to avoid. So: rank on the defaults, speak only
       from `asked`. */
    p.short = surveyMode() === "short";
    p.asked = {};
    const has = function (k) {
      const a = answers[k];
      return Array.isArray(a) ? a.length > 0 : a != null && a !== "";
    };
    QUESTIONS.forEach(function (q) { p.asked[q.id] = has(q.id); });
    // The prose still speaks of record, climate and so on. Each counts as
    // asked when the merged question that now covers it was answered, or
    // when an older saved plan answered it directly.
    p.asked.record = p.asked.have || has("record");
    p.asked.english = p.asked.have || has("english");
    ["cold", "health", "emotional"].forEach(function (k) { p.asked[k] = p.asked.living || has(k); });
    ["time", "horizon", "countries", "age"].forEach(function (k) { p.asked[k] = has(k); });
    return p;
  }

  /* ───────────────── deadline urgency ───────────────── */
  function urgency(item) {
    const m = new Date().getMonth() + 1;
    // A programme with no round open and no date announced has no months to
    // list, which would otherwise read as "always open", the opposite of true.
    if (item.noOpenCall) return "none";
    if (!item.deadlineMonths || !item.deadlineMonths.length) return "always";
    if (item.deadlineMonths.length >= 12) return "always";
    if (item.deadlineMonths.indexOf(m) !== -1) return "open";
    const next = (m % 12) + 1, next2 = (next % 12) + 1;
    if (item.deadlineMonths.indexOf(next) !== -1 || item.deadlineMonths.indexOf(next2) !== -1) return "soon";
    return "closed";
  }
  const URG_TEXT = { open: "Window open now", soon: "Opens soon", closed: "Next cycle", always: "Rolling / always open", none: "No call open" };

  /* ───────────────── scoring ───────────────── */
  function score(item, p) {
    let s = 0;
    const reasons = [];

    // ── field alignment, the core signal
    let fieldHit = 0;
    (item.fields || []).forEach(function (f) {
      if (p.fields[f]) { fieldHit += p.fields[f]; }
    });
    s += fieldHit * 4;
    if (fieldHit > 0) {
      const named = (item.fields || []).filter((f) => p.fields[f]).slice(0, 2).map((f) => FIELDS[f]);
      if (named.length) reasons.push("matches your interest in " + named.join(" and ").toLowerCase());
    }

    // ── stage eligibility. Hard gate for stage-bound programmes.
    if (item.stages && item.stages.length) {
      if (item.stages.indexOf(p.stage) === -1) {
        const order = ["pre", "clin", "intern", "grad", "pg"];
        const mine = order.indexOf(p.stage);
        const earliest = Math.min.apply(null, item.stages.map((x) => order.indexOf(x)));
        if (earliest > mine) { s -= 26; reasons.push("you are not eligible yet — plan for it"); }
        else { return null; } // window has closed permanently
      } else {
        s += 14;
      }
    }

    // ── money
    const funded = item.funding === "full" || item.funding === "free" ||
                   item.funding === "stipend" || item.funding === "paid";
    if (p.money === "none") {
      if (item.zeroCost) { s += 34; reasons.push("costs you nothing and covers travel"); }
      else if (funded) { s += 20; reasons.push("fully funded"); }
      else { s -= 34; }
    } else if (p.money === "small") {
      if (item.zeroCost) s += 20;
      else if (funded) s += 12;
      else s -= 10;
    } else if (p.money === "loan") {
      if (funded) s += 10;
    } else {
      if (funded) s += 6;
    }

    // ── willingness to leave
    const home = item.country === "India" || item.country === "Online";
    if (p.abroad === "india") {
      if (home) { s += 24; } else { s -= 30; }
    } else if (p.abroad === "short") {
      if (home) s += 10;
      if (!home && (item.type === "masters" || item.type === "phd" || item.type === "residency")) s -= 24;
      if (!home && (item.type === "research" || item.type === "conference")) s += 14;
    } else if (p.abroad === "funded") {
      if (!home && !funded) s -= 26;
      if (funded) s += 10;
    } else if (p.abroad === "yes") {
      if (!home) s += 8;
    }

    // ── explicit country choices
    if (p.countries.length) {
      if (p.countries.indexOf(item.country) !== -1) { s += 20; reasons.push("in a country you chose"); }
      else if (["Global", "Online", "Europe", "Any", "Asia", "Nordics"].indexOf(item.country) === -1) s -= 6;
    }

    // ── climate and daylight
    const c = window.DB.countries[item.country];
    if (c) {
      if (p.cold === "cant") {
        if (c.climate === "cold") { s -= 22; reasons.push("cold climate — you flagged this"); }
        if (c.climate === "warm") s += 12;
      } else if (p.cold === "hard" && c.climate === "cold") s -= 8;
      if (p.emotional.indexOf("light") !== -1 && c.climate === "cold") s -= 10;
      if (p.emotional.indexOf("community") !== -1) {
        if (c.diaspora === "very large") s += 12;
        else if (c.diaspora === "small") s -= 8;
      }
      if (p.emotional.indexOf("family") !== -1) {
        if (["Singapore", "India", "Japan"].indexOf(item.country) !== -1) s += 10;
        if (["USA", "Canada", "Australia"].indexOf(item.country) !== -1) s -= 6;
      }
      if ((p.health.indexOf("jain") !== -1 || p.health.indexOf("veg") !== -1) && c.vegFood === "hard") {
        s -= 14; reasons.push("food will be genuinely difficult here");
      }
    }

    // ── experience requirement
    if (item.workExp && item.workExp > p.exp) {
      s -= 8 * (item.workExp - p.exp);
      reasons.push("needs " + item.workExp + " years' experience. This is a later target");
    }

    // ── category-gated equity schemes
    if (item.id === "nos-sc" && p.category !== "sc") return null;
    if (item.id === "nos-st" && p.category !== "st") return null;
    if (item.id === "minority-schemes" && ["obc", "sc", "st"].indexOf(p.category) === -1) return null;
    if (item.id === "nos-sc" || item.id === "nos-st") { s += 60; reasons.push("you are eligible and most years this goes unclaimed"); }
    if (item.id === "loan-route" && p.money !== "loan") s -= 20;

    // ── age ceilings
    if (item.id === "rhodes-india" && ["2529", "3034", "35p"].indexOf(p.age) !== -1) { s -= 40; reasons.push("age limit is likely to exclude you"); }
    if (item.id === "inlaks" && ["3034", "35p"].indexOf(p.age) !== -1) s -= 30;
    if ((item.id === "mext" || item.id === "csc-gks-taiwan") && p.age === "35p") s -= 25;

    // ── readiness
    if (item.type === "phd" && p.record.indexOf("project") === -1 && p.record.indexOf("pub") === -1) s -= 6;
    if (item.type === "skill") {
      s += 12;
      if (p.record.indexOf("nothing") !== -1) { s += 18; reasons.push("the right starting point from zero"); }
      if (p.time === "t2") s += 8;
    }
    if (item.id === "neuromatch" && p.fields.compbio) s += 18;
    if (p.record.indexOf("code") === -1 && item.fields && item.fields.indexOf("compbio") !== -1 && item.type !== "skill") s -= 4;

    // ── urgency and horizon
    const u = urgency(item);
    if (p.horizon === "now") {
      if (u === "open") { s += 22; reasons.push("the window is open right now"); }
      else if (u === "soon") s += 12;
      else if (u === "closed" || u === "none") s -= 8;
    } else {
      if (u === "open") s += 10;
      else if (u === "soon") s += 6;
    }

    // ── English / passport readiness
    if (p.english === "none" && !home && item.type !== "skill") s -= 5;

    // ── impact tier. Deliberately a nudge, not a hammer: a tier-1 award you are
    //    wrong for is worth less to you than a tier-3 one you will actually get.
    const tier = impactOf(item).t;
    s += { 1: 18, 2: 11, 3: 4, 4: -6, 5: -22 }[tier] || 0;

    return { score: s, reasons: reasons.slice(0, 3), urg: u, tier: tier };
  }

  function rank(p) {
    const out = [];
    allOpportunities().forEach(function (item) {
      const r = score(item, p);
      if (r === null) return;
      out.push({ item: item, score: r.score, reasons: r.reasons, urg: r.urg });
    });
    out.sort((a, b) => b.score - a.score);
    return out;
  }

  function rankCountries(p) {
    const keys = Object.keys(window.DB.countries);
    const scored = keys.map(function (k) {
      const c = window.DB.countries[k];
      let s = 0;
      if (p.countries.length) s += p.countries.indexOf(k) !== -1 ? 40 : -10;

      if (p.cold === "cant") s += c.climate === "warm" ? 26 : c.climate === "cold" ? -30 : 4;
      else if (p.cold === "hard") s += c.climate === "cold" ? -12 : 8;
      else if (p.cold === "love") s += c.climate === "cold" ? 12 : 0;

      if (p.emotional.indexOf("light") !== -1) s += c.climate === "cold" ? -18 : 12;
      if (p.emotional.indexOf("community") !== -1)
        s += c.diaspora === "very large" ? 20 : c.diaspora === "large" ? 12 : c.diaspora === "small" ? -12 : 0;
      if (p.emotional.indexOf("family") !== -1)
        s += ["Singapore", "India", "Japan", "Hungary", "Russia"].indexOf(k) !== -1 ? 14 : -6;
      if (p.emotional.indexOf("warmpeople") !== -1)
        s += ["Ireland", "Australia", "Canada", "India", "Israel"].indexOf(k) !== -1 ? 16 : 0;
      if (p.emotional.indexOf("support") !== -1)
        s += ["UK", "Australia", "Canada", "Netherlands", "Sweden"].indexOf(k) !== -1 ? 12 : 0;

      if (p.health.indexOf("jain") !== -1 || p.health.indexOf("veg") !== -1)
        s += c.vegFood === "easy" ? 14 : c.vegFood === "hard" ? -22 : 0;
      if (p.health.indexOf("halal") !== -1) s += ["UK", "Singapore", "Australia", "Canada", "France"].indexOf(k) !== -1 ? 10 : 0;
      if (p.health.indexOf("asthma") !== -1 || p.health.indexOf("pollen") !== -1) {
        if (k === "Japan" || k === "Hungary" || k === "Australia") { s -= 12; }
        if (k === "Israel" || k === "Singapore") s += 6;
      }

      if (p.money === "none" || p.money === "small") {
        s += ["Germany", "France", "Hungary", "Russia", "India", "Japan", "Sweden"].indexOf(k) !== -1 ? 20 : 0;
        s += ["USA", "UK", "Switzerland", "Singapore", "Australia"].indexOf(k) !== -1 ? -14 : 0;
      }
      if (p.abroad === "india") s += k === "India" ? 60 : -25;

      return { key: k, c: c, score: s };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored;
  }

  /* ───────────────── the counsellor's read ───────────────── */
  function counsellorRead(p, ranked, ctys) {
    const f1 = p.topFields[0], f2 = p.topFields[1], f3 = p.topFields[2];
    const paras = [];

    // opening: name what they said back to them
    const flowPick = (p.picked.flow || [])[0];
    const angerPick = (p.picked.anger || [])[0];
    const flowQ = QUESTIONS.find((q) => q.id === "flow");
    const angerQ = QUESTIONS.find((q) => q.id === "anger");
    const flowTxt = flowPick ? (flowQ.options.find((o) => o.v === flowPick) || {}).t : null;
    const angerTxt = angerPick ? (angerQ.options.find((o) => o.v === angerPick) || {}).t : null;

    let open = "You said the thing that stops time for you is <strong>" +
      esc((flowTxt || "still being worked out").toLowerCase()) + "</strong>";
    if (angerTxt) open += ", and that what makes you angry is <strong>" + esc(angerTxt.toLowerCase()) + "</strong>";
    open += ". Those two together are not a mood. They are a specification.";
    if (f1 && f2) {
      open += " They point at <strong>" + esc(FIELDS[f1].toLowerCase()) + "</strong> sitting against <strong>" +
        esc(FIELDS[f2].toLowerCase()) + "</strong>";
      if (f3) open += ", with <strong>" + esc(FIELDS[f3].toLowerCase()) + "</strong> underneath";
      open += ".";
    }
    paras.push(open);

    // the honest structural read
    let mid = "";
    if (p.asked.money && p.money === "none") {
      mid += "You told me you cannot pay, so everything below has been reordered around that and nothing has been quietly dropped. " +
        "The thing worth understanding is that the funded routes are not the consolation prize — a funded doctorate pays you a salary, " +
        "most German public universities charge no tuition, and a self-funded masters is the <em>worst</em>-value option on this entire site, not the best. ";
    } else if (p.asked.money && p.money === "loan") {
      mid += "You would consider a loan, so here is the arithmetic nobody offers: ₹50 lakh at 10 % is roughly ₹65,000 a month for ten years. " +
        "That is survivable if the degree leads to income in that currency and punishing if it does not. Take the funded routes first and treat the loan as what closes a gap, not what opens a door. ";
    }
    if (p.asked.category && (p.category === "sc" || p.category === "st")) {
      // Where it actually ranks, not where it would rank for a graduate: the
      // scheme funds a masters or doctorate, so a student still in MBBS sees
      // it lower on the list, marked as one to plan for.
      const nosId = p.category === "sc" ? "nos-sc" : "nos-st";
      const nosAt = ranked.findIndex((r) => r.item.id === nosId);
      const nos = nosAt === -1 ? null : ranked[nosAt].item;
      const nosOpen = nos && (!nos.stages || nos.stages.indexOf(p.stage) !== -1);
      mid += "Given what you told me about your background, the National Overseas Scholarship " +
        (nosAt === 0 ? "is at the top of your list for a reason: " : "is on your list, and it matters more than its place suggests: ") +
        "it funds a full masters or doctorate abroad including flights, and its own rules provide a <strong>second round</strong> when places are left unfilled, which tells you the competition is thinner than people assume. " +
        (nosAt === 0 ? "That is the single highest-value item on your page. "
          : nos && !nosOpen ? "It opens once you have your degree, so it belongs in your plan now rather than in this year's applications. " : "");
    }
    if (p.asked.stage && p.stage === "pre") {
      mid += "Being in your first two years is the widest window you will ever have: ICMR STS is open to you now and closes permanently after second year, " +
        "and Charpak Lab and the Science Academies' summer fellowship both take currently-enrolled students. Most people discover these in final year, when the student-only ones have already closed. ";
    } else if (p.asked.stage && p.stage === "clin") {
      mid += "You are in the years where the international research internships open: OIST takes students in their final two years, and Khorana, when it runs, wants pre-final-year MBBS students and lowers its marks bar for them. " +
        "ICMR STS has closed to you, so MedEngage and the summer fellowships are the substitutes that keep the record moving. ";
    } else if (p.asked.stage && (p.stage === "grad" || p.stage === "pg")) {
      mid += "With the degree finished, the funded doctorate becomes the main event, and the misconception worth killing early is that you need a masters first. " +
        "You usually do not. US, German, Swiss and Australian doctoral programmes take medical graduates directly and pay them. ";
    }
    if (mid) paras.push(mid);

    // readiness
    let ready = "";
    const hasNothing = p.record.indexOf("nothing") !== -1 || p.record.length === 0;
    if (!p.asked.record) {
      // Never asked what they already have, so claim nothing about it. The
      // order-of-operations point below holds regardless of the answer.
      ready = "I have not asked what you already have, and on a three-question run I am not going to pretend I know. " +
        "What holds either way is the order of operations: credentials are not what gets you in, a finished thing is. " +
        "One completed project with an output beats five certificates of attendance, every time.";
    } else if (hasNothing) {
      ready = "You ticked nothing under what you already have, which is the normal starting position and not a problem, but it does set the order of operations. " +
        "Credentials are not what gets you in; a finished thing is. One completed project with an output beats five certificates of attendance, every time. " +
        "Start with the free skill stack and one small piece of research at your own institution.";
    } else if (p.record.indexOf("mentor") !== -1) {
      ready = "You have a faculty member who would back you, and that is the rarest item on the entire list — rarer than a publication, rarer than a good rank. " +
        "Protect that relationship and use it early. A named supervisor is what converts most of the applications below from a lottery into a conversation.";
    } else if (p.record.indexOf("code") !== -1 && p.record.indexOf("project") !== -1) {
      ready = "You can code and you have a project running. That combination is unusual in an Indian medical college and it is the exact profile computational psychiatry, " +
        "biobank science and health data groups are short of. Finish the project, put the analysis on GitHub, and cold-email with the notebook attached rather than the CV.";
    } else {
      ready = "You have something started, which puts you ahead of most applicants — the failure mode from here is not laziness but never finishing. " +
        "Planning feels like progress and costs nothing, which is exactly why it is seductive. Pick one thread and take it to an output.";
    }
    paras.push(ready);

    // country note
    if (p.asked.abroad && p.abroad !== "india" && ctys.length) {
      const best = ctys[0];
      let cn = "On where: your answers about climate, food and what you need around you point first at <strong>" + esc(best.c.name) + "</strong>. ";
      cn += esc(best.c.honest);
      paras.push(cn);
    } else if (p.asked.abroad && p.abroad === "india") {
      paras.push("You said you want to build something here, and that is a legitimate strategy rather than a fallback. " +
        "The strongest version of it is specific: NIMHANS and AIIMS have cohorts and biobanks no Western centre can access, GenomeIndia has put thousands of Indian genomes " +
        "into the public domain, and the India Alliance funds clinicians to lead their own research <em>without</em> a doctorate. " +
        "The honest case for leaving is better mentorship and better working conditions — not better science and not better data.");
    }

    // closing, calibrated to time
    let close = "";
    if (p.asked.time && p.time === "t2") {
      close = "You have under two hours a week, so the plan has to survive a bad month. Do not start three things. " +
        "Take the single item at the top of the list, and give it twenty minutes at a time.";
    } else if (p.asked.time && p.time === "t20") {
      close = "You have real time available, which is the rarest resource here. Use it on the thing that produces an artefact — " +
        "a finished analysis, a submitted proposal, a working tool — rather than on more reading. Output is legible from anywhere; preparation is not.";
    } else {
      close = "With the time you have, one thread done properly beats three half-run. The list below is ordered — start at the top and ignore the rest until it is done.";
    }
    paras.push(close);

    return paras;
  }

  /* ───────────────── next-90-days plan ───────────────── */
  function buildPlan(p, ranked) {
    const plan = [];
    if (p.english === "none" || p.english === "test")
      plan.push({ when: "This week", what: "<b>Apply for your passport.</b> Nothing on this list moves without it, and it takes three to six weeks." });
    if (p.english === "none" || p.english === "pass")
      plan.push({ when: "This month", what: "<b>Book IELTS or TOEFL.</b> Results take about two weeks and almost every application asks for them." });

    if (p.record.indexOf("mentor") === -1)
      plan.push({ when: "This month", what: "<b>Have one fifteen-minute conversation with a faculty member</b> whose corridor you already walk past. This is the highest-return, lowest-cost item you will ever do, and it gets much harder once you change year and stop being a face they recognise." });

    if (p.record.indexOf("code") === -1 && (p.fields.compbio || p.fields.genomics))
      plan.push({ when: "Starting now", what: "<b>Twenty minutes of Python a day.</b> On a bad day, five. Nobody bridges medicine and computation in a heroic sprint, and Coursera grants financial aid to Indian students on request." });

    if (p.category === "sc" || p.category === "st")
      plan.push({ when: "Before March", what: "<b>Get your category and income certificates reissued.</b> The National Overseas Scholarship turns on these two documents and district offices are slow." });

    const openNow = ranked.filter((r) => r.urg === "open" && r.item.type !== "skill").slice(0, 2);
    openNow.forEach(function (r) {
      plan.push({ when: "Window open", what: "<b>" + esc(r.item.name) + "</b> — the application window is open right now. " + esc((r.item.steps || [])[0] || "") });
    });

    if (p.record.indexOf("project") === -1 && (p.stage === "pre" || p.stage === "clin"))
      plan.push({ when: "This term", what: "<b>Start one small study at your own institution.</b> A cross-sectional survey with a validated instrument needs no funding and no laboratory — only a guide, ethics clearance and persistence." });

    if (p.record.indexOf("project") !== -1 && p.record.indexOf("pub") === -1)
      plan.push({ when: "Next 90 days", what: "<b>Finish the project you already started</b> and get it to an output. An unfinished study is worth nothing on an application; a finished small one is worth a great deal." });

    plan.push({ when: "Ongoing", what: "<b>Write one specific cold email a week.</b> Not \"I am passionate and would love to learn\" — instead: \"I reproduced Figure 3 of your 2025 paper, here is my notebook, I got a different result in the South Asian subgroup, is that expected?\" One is a request. The other is a colleague." });

    return plan.slice(0, 7);
  }

  /* ───────────────── rendering ───────────────── */
  function recordLine(item, urg) {
    const bits = [];
    bits.push('<span>' + esc(TYPE_LABEL[item.type] || item.type) + '</span>');
    bits.push('<span>' + (item.city && item.city !== item.country ? esc(item.city) + ", " : "") + esc(item.country) + '</span>');
    if (item.duration) bits.push('<span>' + esc(item.duration) + '</span>');
    // A dot for scanning and words for meaning: the status used to be a
    // coloured stripe down the card's edge, which said nothing to anyone who
    // cannot tell green from amber.
    bits.push('<span class="urg urg-' + urg + '">' + esc(URG_TEXT[urg]) + '</span>');
    if (item.zeroCost) bits.push('<span class="r-free">Costs you nothing</span>');
    return '<p class="record">' + bits.join('<span class="sep">/</span>') + '</p>';
  }

  const STAR_PATH = "M10 1.5l2.47 5.51 5.98.55-4.53 4.06 1.35 5.94L10 14.6l-5.27 2.96 1.35-5.94L1.55 7.56l5.98-.55z";
  function starSVG(saved) {
    return '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="' + STAR_PATH +
      '" fill="' + (saved ? "currentColor" : "none") + '" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"/></svg>';
  }

  function cardHTML(entry, idx) {
    const item = entry.item || entry;
    const urg = entry.urg || urgency(item);
    const reasons = entry.reasons || [];

    const imp = impactOf(item);
    const tierName = (window.DB.tierInfo[imp.t] || {}).name || "";
    const saved = isShortlisted(item.id);

    let h = '<article class="card" data-urg="' + urg + '" data-tier="' + imp.t + '">';
    h += '<div class="card-in">';
    h += '<header class="card-head"><div class="card-top">';
    if (idx != null) h += '<span class="card-rank">' + (idx + 1) + '</span>';
    h += '<h3 translate="no">' + esc(item.name) + '</h3>';
    h += '<span class="tier tier-' + imp.t + '" title="' + esc(tierName) + '">Tier ' + imp.t +
         ': ' + esc(tierName) + '</span>';
    // Icon-only, so the accessible name has to be spelled out. title is a
    // tooltip and not a reliable name; aria-label names the ACTION and the
    // programme, because "Save to shortlist" repeated 171 times down a card
    // list tells a screen-reader user nothing about which one they are on.
    const starAct = (saved ? "Remove " : "Save ") + item.name + (saved ? " from" : " to") + " shortlist";
    h += '<button type="button" class="star-btn' + (saved ? " is-saved" : "") +
         '" data-star="' + esc(item.id) + '" aria-pressed="' + saved +
         '" aria-label="' + esc(starAct) +
         '" title="' + (saved ? "Remove from shortlist" : "Save to shortlist") + '">' +
         starSVG(saved) + '</button>';
    h += '</div>';
    h += '<p class="card-org" translate="no">' + esc(item.org) + '</p>';
    h += recordLine(item, urg);
    h += '</header>';

    /* left: the argument */
    h += '<div class="card-main">';
    if (reasons.length)
      h += '<div class="chips">' + reasons.map((r) => '<span class="chip is-key">' + esc(r) + '</span>').join("") + '</div>';
    if (item.why) h += '<p class="card-why">' + esc(item.why) + '</p>';
    if (imp.note) h += '<p class="card-verdict"><b>Verdict</b>' + esc(imp.note) + '</p>';

    h += '<details class="disclose"><summary>How to actually apply</summary><div class="disclose-body">';
    if (item.reqs && item.reqs.length) {
      h += '<p class="mini-h">What you need</p><ul>';
      item.reqs.forEach((r) => { h += '<li>' + esc(r) + '</li>'; });
      h += '</ul>';
    }
    if (item.steps && item.steps.length) {
      h += '<p class="mini-h">Step by step</p><ol>';
      item.steps.forEach((s) => { h += '<li>' + esc(s) + '</li>'; });
      h += '</ol>';
    }
    h += '</div></details>';
    h += '</div>';

    /* right: the instrument panel */
    h += '<aside class="card-rail">';
    if (item.money) h += '<div class="rail-cell"><b>What it pays / costs</b>' + esc(item.money) + '</div>';
    if (item.window) h += '<div class="rail-cell rail-when"><b>Application window</b>' + esc(item.window) + '</div>';
    if (imp.odds) h += '<div class="rail-cell"><b>Odds</b>' + esc(imp.odds) + '</div>';
    if (imp.effort) h += '<div class="rail-cell"><b>Effort</b>' + esc(imp.effort) + '</div>';
    h += '<a class="card-link" href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer">Open the official page<span class="sr-only"> (new tab)</span></a>';
    h += '</aside>';

    h += '</div></article>';
    return h;
  }

  /* Move keyboard/screen-reader focus to a view's heading after a navigation
     that doesn't come from clicking that heading directly — otherwise focus
     silently falls back to <body> and a keyboard user has to tab in from
     the very top of the page after every click. tabindex="-1" makes an
     element programmatically focusable without adding it to the tab order. */
  function focusHeading(container) {
    const h = container && container.querySelector("h1, h2");
    if (!h) return;
    if (!h.hasAttribute("tabindex")) h.setAttribute("tabindex", "-1");
    h.focus({ preventScroll: true });
  }

  /* ───────────────── sound and bubbles ───────────────── */
  // sound.js owns the audio; this only names the moment. A missing or muted
  // engine makes every call a no-op.
  function sfx(name) { if (window.DCSound) window.DCSound.play(name); }

  // A cloud-chamber burst centred on an element (space.js draws it, and
  // skips it when the sky is paused or the system asks for reduced motion).
  function fxAt(kind, el) {
    if (!window.DCSpace || !el) return;
    const r = el.getBoundingClientRect();
    window.DCSpace.burst(kind, r.left + r.width / 2, r.top + r.height / 2);
  }

  // The small globe the counsellor speaks from: the favicon's construction.
  const MARK_SVG = '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">' +
    '<g fill="none" stroke="currentColor"><circle cx="16" cy="16" r="12.5" stroke-width="2.6"/>' +
    '<ellipse cx="16" cy="16" rx="5.5" ry="12.5" stroke-width="1.8"/>' +
    '<line x1="3.5" y1="16" x2="28.5" y2="16" stroke-width="1.8"/></g>' +
    '<circle class="bm-dot" cx="20.5" cy="19.5" r="3.6"/></svg>';

  /* A notice in a speech bubble at the bottom of the screen, announced
     politely to screen readers. One at a time: a new one replaces the last.
     `action` adds a button (Undo) that runs once and dismisses the bubble. */
  let toastTimer = null;
  function toast(text, action) {
    let dock = $("#bubbleDock");
    if (!dock) {
      dock = document.createElement("div");
      dock.id = "bubbleDock"; dock.className = "bubble-dock";
      dock.setAttribute("role", "status"); dock.setAttribute("aria-live", "polite");
      document.body.appendChild(dock);
    }
    clearTimeout(toastTimer);
    dock.innerHTML = "";
    const b = document.createElement("div");
    b.className = "bubble-toast";
    const t = document.createElement("span"); t.textContent = text; b.appendChild(t);
    if (action) {
      const btn = document.createElement("button");
      btn.type = "button"; btn.textContent = action.label;
      btn.addEventListener("click", function () { action.run(); dock.innerHTML = ""; });
      b.appendChild(btn);
    }
    dock.appendChild(b);
    toastTimer = setTimeout(function () { dock.innerHTML = ""; }, action ? 7000 : 4500);
  }

  /* What Ooh says at the top of each view: the first time in full, then one
     line. 120 characters a line at most and no em dashes, the sister apps'
     rule. The intro and the survey have none: Ooh is already in both. */
  const OOH_LINES = {
    results: { id: "results",
      lines: [["happy", "Here is your read. It is built only from what you told me, and it changes if you answer again."],
              ["think", "Every card links its official page. Dates move every year, so check there before you plan."]],
      short: ["think", "Ranked from your answers. Check each official page before you plan around a date."] },
    browse: { id: "browse",
      lines: [["hello", "Type a country, a field or a word like free. Suggestions appear as you type, and / jumps here."],
              ["think", "Tier 1 changes what you can apply for next. Most entries are lower, and that is fine."]],
      short: ["think", "Filter, search, or sort by deadline. Every card links its official page."] },
    shortlist: { id: "shortlist",
      lines: [["happy", "Everything you star lands here. It stays in this browser, and nothing is uploaded."]],
      short: ["happy", "Your starred programmes, kept in this browser only."] },
    routes: { id: "routes",
      lines: [["think", "Each map shows the day's work, the NEET-PG route and what follows. Pick the day you want to live."]],
      short: ["think", "The day's work, the route in, and where each specialty leads."] },
    frontiers: { id: "frontiers",
      lines: [["ooh", "Each of these is a whole field you could join. Every one ends with something to start this week."]],
      short: ["ooh", "Whole fields you could join, each with one thing to start this week."] },
    countries: { id: "countries",
      lines: [["hello", "Every place in the index has a tile. The bar shows what is open this month and what opens soon."],
              ["think", "Open a country for its programmes and an honest note on winters, food and visas."]],
      short: ["think", "Tap a country for its programmes and what living there is like."] },
    calendar: { id: "calendar",
      lines: [["think", "Pick your year and I will show what closes first, and what stops taking you once you move on."],
              ["think", "Dates move, so confirm each one on its official page."]],
      short: ["think", "Your year first, then the whole calendar. Confirm each date on its official page."] }
  };

  /* ───────────────── views ───────────────── */
  // Where the browser supports it, a view change is a view transition: the
  // old page fades and settles as the new one arrives (styles.css, "views").
  // Under reduced motion, or without the API, it is the plain swap.
  const canTransition = typeof document.startViewTransition === "function" &&
    !document.documentElement.classList.contains("lite") &&
    !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  if (canTransition) document.documentElement.classList.add("has-vt");
  let currentView = "intro";

  function swapView(name) {
    $$(".view").forEach((v) => v.classList.remove("is-active"));
    const v = $("#view-" + name);
    if (v) v.classList.add("is-active");
    $$(".navlink").forEach((b) => b.setAttribute("aria-current", b.dataset.goto === name ? "true" : "false"));
    if (window.Ooh) window.Ooh.view(name, OOH_LINES[name] || null);
    window.scrollTo(0, 0);
    if (v) focusHeading(v);
  }
  /* Each browsing view has its own address (#browse, #countries...), so the
     browser's Back button walks back through views instead of leaving the
     site, and a category page's "Browse all in the app" link lands where it
     says. The survey has none (a half-answered form cannot be restored from
     a link), and results keep the #p= plan address persist() writes. */
  const ROUTED = ["browse", "countries", "calendar", "routes", "frontiers", "shortlist"];
  let fromHistory = false;
  function syncHash(name) {
    if (fromHistory) return;
    try {
      if (ROUTED.indexOf(name) !== -1) {
        if (location.hash !== "#" + name) history.pushState({ v: name }, "", "#" + name);
      } else if (name === "intro" && location.hash) {
        history.pushState({ v: "intro" }, "", location.pathname + location.search);
      }
    } catch (e) { /* some file:// contexts refuse history writes */ }
  }
  function routeFromHash() {
    const h = (location.hash || "").replace(/^#/, "");
    fromHistory = true;
    try {
      if (/(^|&)p=/.test(h)) { if (restore()) { renderResults(); showView("results"); } }
      else if (ROUTED.indexOf(h) !== -1) gotoView(h);
      else showView("intro");
    } finally { fromHistory = false; }
  }

  function showView(name) {
    // Moving between views is a tap, and taps make Ooh's sounds now
    // (ooh-guide.js). Only arriving at your results keeps its galaxy chord.
    if (name !== currentView && name === "results") sfx("chain");
    currentView = name;
    syncHash(name);
    if (canTransition) document.startViewTransition(function () { swapView(name); });
    else swapView(name);
  }

  /* ───────────────── survey rendering ───────────────── */
  function renderQuestion() {
    const QS = activeQuestions();
    if (qIndex >= QS.length) qIndex = QS.length - 1;   // mode switched under us
    const q = QS[qIndex];
    const slot = $("#questionSlot");
    const chosen = answers[q.id] || (q.type === "multi" ? [] : null);

    // Ooh asks the question, typing it out with the sister apps' blip. The
    // whole title is in the heading from the first frame (typed + rest), so
    // a screen reader focusing it hears the full question.
    const oohOn = !!(window.Ooh && window.Ooh.on() && window.OohArt);
    let h = '<p class="q-eyebrow">' + esc(q.act) + '</p>';
    h += '<div class="q-say"><span class="q-avatar' + (oohOn ? "" : " is-mark") + '" aria-hidden="true">' +
      (oohOn ? window.Ooh.figure(q.ooh || "hello", 64) : MARK_SVG) + '</span><div class="q-bubbles">';
    h += '<h2 class="q-title"><span class="q-typed"></span><span class="q-rest">' + esc(q.title) + '</span></h2>';
    h += '<p class="q-help">' + q.help + '</p>';
    h += '</div></div>';
    h += '<div class="opts' + (q.options.length > 6 ? " two" : "") + '">';
    q.options.forEach(function (o) {
      const on = q.type === "multi" ? chosen.indexOf(o.v) !== -1 : chosen === o.v;
      h += '<button type="button" class="opt" data-v="' + esc(o.v) + '" aria-pressed="' + on + '">';
      h += '<span class="opt-box" aria-hidden="true"></span><span class="opt-body"><strong>' + esc(o.t) + '</strong>';
      if (o.d) h += '<span>' + esc(o.d) + '</span>';
      h += '</span></button>';
    });
    h += '</div>';

    if (q.free) {
      h += '<textarea class="q-free" rows="3" id="freeText" placeholder="' + esc(q.placeholder || "") + '">' +
           esc(answers[q.id + "_text"] || "") + '</textarea>';
      h += '<p class="q-note">Optional, but the words you use here shape the answer.</p>';
    }
    if (q.type === "multi") h += '<p class="q-note" id="qPicked" aria-live="polite">' + pickedText(chosen.length) + '</p>';
    h += '<p class="q-live" id="qLive" aria-live="polite">' + liveLine(q) + '</p>';

    slot.innerHTML = h;
    const typed = $(".q-typed", slot), rest = $(".q-rest", slot);
    if (oohOn) window.Ooh.type(typed, rest, q.title, q.ooh || "hello", $(".q-avatar .ooh-bobw", slot));
    else { typed.textContent = q.title; rest.textContent = ""; }
    // Retrigger the arrival animation on every question, so the survey reads
    // as a sequence of things being asked rather than a form being repainted.
    slot.classList.remove("q-anim");
    void slot.offsetWidth; // force reflow so the animation restarts
    slot.classList.add("q-anim");
    window.scrollTo(0, 0);
    focusHeading(slot);

    $$(".opt", slot).forEach(function (btn) {
      btn.addEventListener("click", function () {
        const v = btn.dataset.v;
        sfx("decay");
        if (btn.getAttribute("aria-pressed") !== "true") fxAt("alpha", btn.querySelector(".opt-box"));
        if (q.type === "multi") {
          const arr = answers[q.id] || (answers[q.id] = []);
          const i = arr.indexOf(v);
          if (i === -1) arr.push(v); else arr.splice(i, 1);
          btn.setAttribute("aria-pressed", i === -1 ? "true" : "false");
          const note = $("#qPicked");
          if (note) note.textContent = pickedText(arr.length);
        } else {
          answers[q.id] = v;
          $$(".opt", slot).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
          // Choosing to stay in India removes the living-abroad question
          // ahead, so the count has to follow.
          $("#qCount").textContent = "Question " + (qIndex + 1) + " of " + activeQuestions().length;
        }
        const live = $("#qLive");
        if (live) live.innerHTML = liveLine(q);
      });
    });

    const ft = $("#freeText");
    if (ft) ft.addEventListener("input", function () { answers[q.id + "_text"] = ft.value; });

    $("#qCount").textContent = "Question " + (qIndex + 1) + " of " + QS.length;
    $("#backBtn").disabled = qIndex === 0;
    $("#nextBtn").textContent = qIndex === QS.length - 1 ? "See what fits me" : "Continue";
    const pct = (qIndex / QS.length) * 100;
    $("#progressBar").style.width = pct + "%";
    $(".progress").setAttribute("aria-valuenow", String(Math.round(pct)));
  }

  /* The live line under a question: what the answers so far already mean,
     counted from the index each time, so it is never a canned compliment.
     The three core questions point at fields; the practical ones narrow or
     reorder the list, and the line says how. */
  function liveLine(q) {
    const p = buildProfile();
    if (q.id === "skills" || q.id === "anger" || q.id === "flow") {
      const top = p.topFields.slice(0, 2).map(function (f) { return esc(FIELDS[f].toLowerCase()); });
      return top.length ? "So far your answers point at <b>" + top.join("</b> and <b>") + "</b>." : "";
    }
    const a = answers[q.id];
    if (a == null || (Array.isArray(a) && !a.length)) return "";
    const ranked = rank(p);
    const top = ranked[0];
    const topLine = top ? "Your top pick right now: <b>" + esc(top.item.name) + "</b>." : "";
    if (q.id === "stage") return "<b>" + fmtNum(ranked.length) + "</b> programmes here are open to someone at your stage.";
    if (q.id === "money" && a === "none")
      return "<b>" + fmtNum(ranked.filter((r) => r.item.zeroCost).length) + "</b> of the routes open to you cost nothing at all.";
    if (q.id === "abroad" && a === "india")
      return "<b>" + fmtNum(ranked.filter((r) => r.item.country === "India").length) + "</b> of the routes open to you are inside India.";
    if (q.id === "category" && (a === "sc" || a === "st")) {
      const nos = a === "sc" ? "nos-sc" : "nos-st";
      return top && top.item.id === nos
        ? "The National Overseas Scholarship has moved to the top of your list."
        : "The National Overseas Scholarship is now on your list. " + topLine;
    }
    if (q.id === "living") {
      const c = rankCountries(p)[0];
      return c ? "So far <b>" + esc(c.c.name) + "</b> fits how you want to live best." : "";
    }
    return topLine;
  }

  // Honest running feedback on a multi-choice question: how many are picked,
  // and that none is a valid answer too. Counts only; it never interprets.
  function pickedText(n) {
    if (!n) return "Choose as many as are true. None is also an answer.";
    return (n === 1 ? "1 picked." : n + " picked.") + " Choose more, or continue.";
  }

  /* ───────────────── results ───────────────── */
  function renderResults() {
    const p = buildProfile();
    const ranked = rank(p);
    const ctys = rankCountries(p);
    const slot = $("#resultsSlot");

    const byType = function (types, n) {
      return ranked.filter((r) => types.indexOf(r.item.type) !== -1).slice(0, n);
    };

    let h = "";

    /* counsellor's read, with the profile it was derived from alongside it */
    h += '<div class="read">';
    h += '<div class="read-main">';
    h += '<p class="salutation">Alright. Here is what I see.</p>';
    h += "<h2>What your answers actually say</h2>";
    counsellorRead(p, ranked, ctys).forEach((para) => { h += '<p class="say">' + para + "</p>"; });

    /* On a three-question run, say plainly what this read is missing rather
       than letting it pass as the finished article. The ranking below is real
       but it is running on defaults for money, category, year and climate —
       and those are the four things that most change what is actually open to
       someone. Naming the gap is also the honest version of an upsell. */
    if (p.short) {
      h += '<div class="upgrade">';
      h += "<h3>This is the short read</h3>";
      h += "<p>You answered the three questions about who you are, and that is enough to point at fields, " +
           "specialties and a starting list. What it cannot do is tell you what you can <em>reach</em>. " +
           "The ranking below is currently assuming you are in your first two years, that money is not the " +
           "binding constraint, and that you are open to anywhere, because you have not told me otherwise.</p>";
      const more = QUESTIONS.length - CORE_COUNT;
      h += "<p>Up to " + numberWord(more) + " more short questions cover your year, money, category, whether you " +
           "want to leave India, and what you already have. They take about two minutes, they change the order of " +
           "nearly everything below, and they unlock the category-specific funding that most people never find. " +
           "Your three answers are kept.</p>";
      h += '<button type="button" class="btn btn-primary" id="continueFullBtn">Answer the rest</button>';
      h += "</div>";
    }
    if (p.topFields.length) {
      h += '<div class="chips">';
      p.topFields.slice(0, 6).forEach((f, i) => {
        h += '<span class="chip' + (i < 2 ? " is-key" : "") + '">' + esc(FIELDS[f]) + "</span>";
      });
      h += "</div>";
    }
    h += "</div>";

    const MONEY_LABEL = { none: "Cannot pay anything", small: "₹1–3 lakh available", loan: "Would take a loan", family: "Family can support" };
    const ABROAD_LABEL = { yes: "Wants to go abroad", funded: "Abroad only if funded", short: "Short trips only", india: "Building here", unsure: "Undecided" };
    const COLD_LABEL = { love: "Loves the cold", fine: "Manages cold fine", hard: "Prefers milder", cant: "Cold is a real problem" };
    const TIME_LABEL = { t2: "Under 2 hrs a week", t5: "~5 hrs a week", t10: "~10 hrs a week", t20: "20+ hrs a week" };
    const HORIZON_LABEL = { now: "Wants to move this year", y1: "1–2 years out", y3: "3–5 years out", open: "No fixed timeline" };
    const ENG_LABEL = { both: "Passport and test done", pass: "Passport only", test: "Test only", none: "Neither yet" };

    h += '<aside class="read-rail"><p class="mini-h">The profile this is built on</p>';
    // Only what the reader actually told me is shown as theirs. Stage is
    // always used for eligibility, so when it was never asked the row says
    // the value is an assumption rather than passing it off as an answer.
    const LIVING_LABEL = { cold: "cold winters", veg: "vegetarian food", halal: "halal food", breath: "breathing and allergies",
      home: "distance from home", community: "an Indian community", support: "mental health support" };
    const rows = [["Stage", (p.asked.stage ? "" : "Assumed: ") + STAGE_LABEL[p.stage]]];
    if (p.asked.money) rows.push(["Budget", MONEY_LABEL[p.money]]);
    if (p.asked.abroad) rows.push(["Leaving India", ABROAD_LABEL[p.abroad]]);
    if (p.asked.living) {
      const worries = (answers.living || []).filter((v) => LIVING_LABEL[v]).map((v) => LIVING_LABEL[v]);
      rows.push(["Living abroad", worries.length ? "Weighs " + worries.join(", ") : "Would manage almost anywhere"]);
    } else if (p.asked.cold) rows.push(["Climate", COLD_LABEL[p.cold]]);
    if (p.asked.time) rows.push(["Time each week", TIME_LABEL[p.time]]);
    if (p.asked.horizon) rows.push(["Timeline", HORIZON_LABEL[p.horizon]]);
    if (p.asked.english) rows.push(["Paperwork", ENG_LABEL[p.english]]);
    if (p.category === "sc") rows.push(["Category schemes", "SC / DNT — NOS eligible"]);
    if (p.category === "st") rows.push(["Category schemes", "ST — NOS eligible"]);
    if (p.category === "obc") rows.push(["Category schemes", "OBC / EWS / minority"]);
    const shown = ranked.length;
    rows.push(["Programmes you are eligible for", String(shown)]);
    rows.forEach(function (r) {
      h += '<div class="rr"><b>' + esc(r[0]) + "</b><span>" + esc(r[1] || "—") + "</span></div>";
    });
    h += '<p class="rr-note">Nothing here leaves your browser. Answer again any time to see how a different constraint changes the list.</p>';
    h += "</aside>";
    h += "</div>";

    /* the next 90 days */
    const plan = buildPlan(p, ranked);
    h += '<section class="actions-block"><h2 class="sec-h">Do these, in this order</h2>';
    h += '<p class="sec-sub">Not a reading list. Seven things, ordered, that move your position in the next ninety days.</p>';
    h += '<ol class="steps-now">';
    plan.forEach((s) => { h += '<li><span class="sn-when">' + esc(s.when) + '</span><span class="sn-what">' + s.what + "</span></li>"; });
    h += "</ol></section>";

    /* zero-rupee path */
    if (p.money === "none" || p.money === "small") {
      const free = ranked.filter((r) => r.item.zeroCost).slice(0, 6);
      if (free.length) {
        h += '<section class="actions-block"><h2 class="sec-h">The zero-rupee path</h2>';
        h += '<p class="sec-sub">Every one of these costs nothing to apply for and nothing to take part in — travel, accommodation and living costs are covered or unnecessary. This is a complete route from where you are to a funded doctorate without paying for any of it.</p>';
        h += '<div class="cards">' + free.map((r, i) => cardHTML(r, i)).join("") + "</div></section>";
      }
    }

    /* how to read the tiers */
    h += '<section class="actions-block"><h2 class="sec-h">How to read the tiers</h2>';
    h += '<p class="sec-sub">Everything below is graded on one question — does holding this change what you are eligible for next year? Not on prestige, and not on how good it looks on Instagram.</p>';
    h += '<div class="tier-legend">';
    [1, 2, 3, 4, 5].forEach(function (t) {
      const ti = window.DB.tierInfo[t];
      h += '<div class="tl"><span class="tier tier-' + t + '">Tier ' + t + ": " + esc(ti.name) + "</span>";
      h += "<p>" + esc(ti.blurb) + "</p></div>";
    });
    h += "</div></section>";

    /* main matched sections — deliberately generous. The point is to widen
       the field of view, not to hand over a single answer. */
    const sections = [
      { key: ["research"], n: 9, h: "Research programmes to apply for", s: "Ranked against your field, your stage and your budget. Stage eligibility is already applied — nothing here is closed to you unless it says so." },
      { key: ["scholarship", "fellowship"], n: 10, h: "Money you could actually get", s: "Scholarships and fellowships you are eligible for now, or should be building toward. Several of these stack with each other." },
      { key: ["masters", "phd"], n: 10, h: "Degrees worth the years", s: "Where each one leads, what it costs, and who pays. Note how many of the doctorates pay you rather than the reverse." },
      { key: ["conference"], n: 4, h: "Conferences that will fly you there", s: "You do not attend these by paying. You attend by submitting an abstract and applying for the travel award in the same breath, and the award deadline is always earlier than you expect." },
      { key: ["skill"], n: 6, h: "Build the skills first", s: "Almost all of this is free. Every credential above quietly assumes skills you can acquire for nothing." },
      { key: ["residency"], n: 5, h: "If you want to practise, not just research", s: "Clinical training routes abroad and at home, with the real barriers named rather than glossed." }
    ];

    sections.forEach(function (sec) {
      const list = byType(sec.key, sec.n);
      if (!list.length) return;
      h += '<section class="actions-block"><h2 class="sec-h">' + esc(sec.h) + "</h2>";
      h += '<p class="sec-sub">' + esc(sec.s) + "</p>";
      h += '<div class="cards">' + list.map((r, i) => cardHTML(r, i)).join("") + "</div></section>";
    });

    /* what to skip */
    h += '<section class="actions-block"><h2 class="sec-h">What to say no to</h2>';
    h += '<p class="sec-sub">A list of what to pursue is only half the advice. These consume time and money and produce nothing a reviewer can verify, and every one of them is marketed hard at Indian medical students.</p>';
    h += '<div class="skip-grid">';
    (window.DB.skipList || []).forEach(function (s) {
      h += '<article class="skip-card"><h3>' + esc(s.name) + "</h3><p>" + esc(s.why) + "</p></article>";
    });
    h += "</div></section>";

    /* specialty routes matched to the profile */
    const specs = rankSpecialties(p);
    // Counted, not spelled out. This read "thirteen" while the data held
    // eighteen — the same drift the claim cards had, and the reason no number
    // on this site is written by hand where the data can supply it.
    const nSpecs = (window.DB.specialties || []).length;
    h += '<section class="actions-block"><h2 class="sec-h">Specialties that fit what you said</h2>';
    h += '<p class="sec-sub">The three closest to your answers, out of ' + nSpecs + ' route maps. Each one shows the day-to-day reality, the Indian and international entry routes, where it leads, and the thing nobody tells you before you commit three years to it.</p>';
    h += '<div class="routes">' + specs.slice(0, 3).map((x, i) => specialtyHTML(x.s, "Closest fit " + (i + 1))).join("") + "</div>";
    h += '<p class="sec-sub" style="margin-top:20px"><button type="button" class="btn btn-ghost" data-goto="routes">See all ' + nSpecs + ' specialty routes</button></p>';
    h += "</section>";

    /* frontier fields */
    const fr = (window.DB.frontiers || []).map(function (f) {
      let s = 0;
      (f.fields || []).forEach((x) => { if (p.fields[x]) s += p.fields[x]; });
      return { f: f, s: s };
    }).sort((a, b) => b.s - a.s).slice(0, 4);

    h += '<section class="actions-block"><h2 class="sec-h">Fields you may not know exist</h2>';
    h += '<p class="sec-sub">Every one of these is a real discipline with journals, funding and people hiring right now. Ranked against what you told me. Each includes one thing you could start this week.</p>';
    h += '<div class="frontier-grid">' + fr.map((x) => frontierHTML(x.f)).join("") + "</div></section>";

    /* country fit */
    if (p.abroad !== "india") {
      h += '<section class="actions-block"><h2 class="sec-h">Where you would actually be okay</h2>';
      /* In a three-question run the reader was asked about skill, anger and
         flow and nothing else. Climate, food, community and cost come from
         defaults, which is correct for RANKING and a fabrication in PROSE:
         "what you told me you need" claims they supplied preferences they
         were never asked for. Same rule as every attributed line in
         counsellorRead, and the short run has to earn the sentence too. */
      const toldLiveability = p.asked.money || p.asked.abroad;
      h += '<p class="sec-sub">' + (toldLiveability
        ? 'Ranked on climate, daylight, food, community and cost against what you told me you need — not on university league tables.'
        : 'Ranked on climate, daylight, food, community and cost, because those decide whether you could actually live somewhere. These are general rankings: answer the full set and they are re-ranked against your own limits instead.') + '</p>';
      h += '<div class="countries">';
      ctys.slice(0, 4).forEach(function (x, i) {
        const c = x.c;
        h += '<article class="cty"><div class="cty-top"><h3>' + esc(c.name) + "</h3>";
        h += '<span class="cty-score">Fit rank ' + (i + 1) + "</span></div>";
        h += '<div class="cty-grid">';
        h += "<div><b>Winter</b>" + esc(c.winter) + "</div>";
        h += "<div><b>Daylight in December</b>" + esc(c.daylight) + "</div>";
        h += "<div><b>Living cost</b>" + esc(c.cost) + "</div>";
        h += "<div><b>Indian community</b>" + esc(c.diaspora) + "</div>";
        h += "<div><b>Vegetarian food</b>" + esc(c.food) + "</div>";
        h += "<div><b>Mental health support</b>" + esc(c.mentalHealth) + "</div>";
        h += "<div><b>People</b>" + esc(c.people) + "</div>";
        h += "<div><b>Staying afterwards</b>" + esc(c.visa) + "</div>";
        if (p.health.length && p.health.indexOf("none") === -1)
          h += "<div><b>Allergies and health</b>" + esc(c.allergy) + "</div>";
        h += "</div>";
        h += '<p class="cty-honest">' + esc(c.honest) + "</p>";
        h += "</article>";
      });
      h += "</div></section>";
    }

    h += '<div class="restart">';
    h += '<button type="button" class="btn btn-primary" id="copyPlanBtn">Copy my plan as text</button>';
    h += '<button type="button" class="btn btn-ghost" id="printBtn">Print or save as PDF</button>';
    h += '<button type="button" class="btn btn-ghost" id="redoBtn">Answer again</button>';
    h += '<button type="button" class="btn btn-ghost" data-goto="browse">Browse everything</button>';
    h += '<button type="button" class="btn btn-ghost" data-goto="calendar">Deadline calendar</button>';
    h += '<p class="save-note" id="saveNote">Your answers are saved in this browser and written into the page address — bookmark it, or send yourself the link, and this plan comes back exactly as it is. Nothing is uploaded anywhere.</p>';
    h += "</div>";

    slot.innerHTML = h;
    persist();

    const redo = $("#redoBtn");
    if (redo) redo.addEventListener("click", function () { qIndex = 0; renderQuestion(); showView("survey"); });

    // Continue straight into question four rather than restarting — the three
    // answers are already in `answers`, and making someone retype them is how
    // you turn an upgrade into an abandonment.
    const contFull = $("#continueFullBtn");
    if (contFull) contFull.addEventListener("click", function () { startSurvey("full", CORE_COUNT); });

    const printBtn = $("#printBtn");
    if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

    const copyBtn = $("#copyPlanBtn");
    if (copyBtn) copyBtn.addEventListener("click", function () {
      const text = planAsText(p, ranked, plan, specs);
      const done = function () {
        copyBtn.textContent = "Copied — paste it anywhere";
        setTimeout(function () { copyBtn.textContent = "Copy my plan as text"; }, 2600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
      } else { fallbackCopy(text, done); }
    });

    bindGoto(slot);
  }

  function specialtyHTML(s, rankLabel) {
    let h = '<article class="route">';
    h += '<header class="route-head">';
    h += "<h3>" + esc(s.name) + "</h3>";
    if (rankLabel) h += '<span class="cty-score">' + esc(rankLabel) + "</span>";
    h += '<p class="route-one">' + esc(s.oneLine) + "</p>";
    h += "</header>";

    h += '<div class="route-body">';
    h += '<div class="route-col">';
    h += '<p class="mini-h">What the day looks like</p><p class="route-p">' + esc(s.day) + "</p>";
    h += '<p class="mini-h">Entering it in India</p><p class="route-p">' + esc(s.india) + "</p>";
    h += '<p class="mini-h">Entering it abroad</p><ul class="route-ul">';
    s.abroad.forEach((x) => { h += "<li>" + esc(x) + "</li>"; });
    h += "</ul>";
    h += '<p class="mini-h">Where it leads</p><p class="route-tags">' +
         s.supers.map((x) => '<span class="chip">' + esc(x) + "</span>").join("") + "</p>";
    h += "</div>";

    h += '<div class="route-col">';
    h += '<p class="mini-h">The research frontier inside it</p><ul class="route-ul">';
    s.research.forEach((x) => { h += "<li>" + esc(x) + "</li>"; });
    h += "</ul>";
    h += '<p class="mini-h">Degrees that pair with it</p><p class="route-tags">' +
         s.masters.map((x) => '<span class="chip">' + esc(x) + "</span>").join("") + "</p>";
    h += '<p class="route-fit"><b>This fits you if</b>' + esc(s.fitIf) + "</p>";
    h += "</div>";
    h += "</div>";

    h += '<p class="route-truth"><b>What nobody tells you</b>' + esc(s.truth) + "</p>";
    h += "</article>";
    return h;
  }

  function rankSpecialties(p) {
    return (window.DB.specialties || []).map(function (s) {
      let sc = 0;
      (s.fields || []).forEach((f) => { if (p.fields[f]) sc += p.fields[f]; });
      return { s: s, score: sc };
    }).sort((a, b) => b.score - a.score);
  }

  function frontierHTML(f) {
    let h = '<article class="fcard">';
    h += "<h3>" + esc(f.name) + "</h3>";
    h += '<p class="f-tag">' + esc(f.tagline) + "</p>";
    h += "<p>" + esc(f.what) + "</p>";
    h += '<p class="f-why">' + esc(f.whyIndia) + "</p>";
    h += "<p><strong>Getting in:</strong> " + esc(f.entry) + "</p>";
    h += '<p class="f-start"><b>Start this week</b>' + esc(f.startNow) + "</p>";
    h += '<p class="f-where">' + esc(f.where.join(", ")) + "</p>";
    h += '<a class="card-link" href="' + esc(f.url) + '" target="_blank" rel="noopener noreferrer">Where to look<span class="sr-only"> (new tab)</span></a>';
    h += "</article>";
    return h;
  }

  /* ───────────────── browse: filter, search, sort ───────────────── */
  let activeFilter = "all";
  let searchQuery = "";
  let sortMode = "tier";
  // The sort follows the search until the reader picks one: typing switches
  // it to "Best match", clearing the box switches it back to tier.
  let sortAuto = true;
  // Set by picking a country on the hero globe. Kept separate from searchQuery
  // on purpose: a text search for "india" also matches every programme whose
  // description mentions Indian students, which is useful when you typed it but
  // wrong when the globe just told you the country holds 16 programmes.
  let countryFilter = "";
  // Set from the atlas: a named group of countries, such as Europe. Exact
  // matches on item.country for the same reason as countryFilter above.
  let regionFilter = null;

  /* ───────────────── search ─────────────────
     The box splits what you type into words, and every word has to find
     something in the entry: its name, institution, country, fields, window,
     requirements or steps. A word matches the START of a word, so "neuro"
     finds neuroscience and "psych" finds psychiatry, while "us" does not
     find "must". Some words are facts rather than text: "free" means the
     entry costs nothing, "open now" means its window is open this month,
     "first year" means it takes 1st-2nd professional students. Common
     aliases are folded in (UK, USA, PhD, MPH, AI). When no entry has every
     word, the ones with most of them are shown, and the count says so. All
     of it runs on this page; nothing typed is sent anywhere. */
  const STAGE_ORDER = ["pre", "clin", "intern", "grad", "pg"];
  const STOP = new Set(["the", "a", "an", "and", "or", "of", "for", "in", "on", "to", "with", "at", "by", "from",
    "me", "my", "i", "want", "show", "find", "programme", "programmes", "program", "programs",
    "opportunity", "opportunities", "mbbs", "doctor", "doctors", "medical", "student", "students"]);
  const PHRASES = [
    ["fully funded", "fullyfunded"], ["costs nothing", "free"], ["no cost", "free"], ["no fee", "free"],
    ["open now", "opennow"], ["open right now", "opennow"], ["closing soon", "closingsoon"], ["closes soon", "closingsoon"],
    ["first year", "yearpre"], ["1st year", "yearpre"], ["second year", "yearpre"], ["2nd year", "yearpre"],
    ["pre clinical", "yearpre"], ["preclinical", "yearpre"],
    ["third year", "yearclin"], ["3rd year", "yearclin"], ["final year", "yearclin"], ["fourth year", "yearclin"], ["4th year", "yearclin"],
    ["internship year", "yearintern"], ["after mbbs", "yeargrad"], ["mbbs graduate", "yeargrad"], ["after md", "yearpg"],
    ["tier 1", "tierone"], ["tier one", "tierone"],
    ["public health", "publichealth"], ["mental health", "mentalhealth"], ["global health", "globalhealth"],
    ["united states", "usa"], ["united kingdom", "uk"], ["great britain", "uk"],
    ["new zealand", "newzealand"], ["hong kong", "hongkong"], ["south korea", "southkorea"], ["south africa", "southafrica"],
    ["machine learning", "ai"], ["artificial intelligence", "ai"], ["data science", "datasci"]
  ];
  // A string value points at another key. Aliases of three letters or fewer
  // must match a whole word, so "ai" never finds "aiims" or "aids".
  const ALIAS = {
    uk: ["uk", "united kingdom", "britain", "british", "england", "scotland", "wales", "london"],
    usa: ["usa", "united states", "america", "american"], us: "usa", america: "usa", american: "usa",
    phd: ["phd", "doctorate", "doctoral", "dphil", "dr med"], doctorate: "phd", doctoral: "phd",
    masters: ["master", "msc", "mph", "mphil", "mres"], master: "masters", msc: "masters",
    mph: ["mph", "public health"], publichealth: ["public health", "mph", "epidemiolog"],
    mentalhealth: ["mental health", "psych"], globalhealth: ["global health"],
    psych: ["psych", "mental health"], psychiatry: ["psychiatr", "mental health"],
    neuroscience: ["neuroscien", "neuro"],
    ai: ["ai", "artificial intelligence", "machine learning", "data science", "computation", "bioinformatic"],
    datasci: ["data science", "data", "computation", "statistic", "bioinformatic"],
    cancer: ["cancer", "onco", "tumour", "tumor"], oncology: "cancer",
    internship: ["internship", "elective", "observership", "studentship", "traineeship", "attachment"],
    elective: ["elective", "observership", "attachment"],
    usmle: ["usmle", "ecfmg", "residency"], plab: ["plab", "ukmla", "gmc"], ukmla: "plab",
    germany: ["germany", "german"], german: "germany",
    conference: ["conference", "congress", "symposium"], course: ["course", "school", "workshop", "training"],
    online: ["online", "remote", "virtual", "self paced"],
    women: ["women", "woman", "female", "girl"],
    stipend: ["stipend", "salary", "salaried", "paid", "allowance"], salary: "stipend", paid: "stipend",
    scholarship: ["scholarship", "bursary"],
    southkorea: ["south korea", "korea"], newzealand: ["new zealand"], hongkong: ["hong kong"], southafrica: ["south africa"]
  };
  const stageHas = (s) => (i) => !i.stages || i.stages.indexOf(s) !== -1;
  const FACET = {
    free: (i) => !!i.zeroCost || i.funding === "free",
    fullyfunded: (i) => i.funding === "full",
    funded: (i) => ["full", "stipend", "paid", "free"].indexOf(i.funding) !== -1,
    opennow: (i) => urgency(i) === "open", open: (i) => urgency(i) === "open",
    closingsoon: (i) => urgency(i) === "open" || urgency(i) === "soon",
    soon: (i) => urgency(i) === "open" || urgency(i) === "soon",
    yearpre: stageHas("pre"), yearclin: stageHas("clin"), yearintern: stageHas("intern"),
    yeargrad: stageHas("grad"), yearpg: stageHas("pg"),
    tierone: (i) => impactOf(i).t === 1,
    phd: (i) => i.type === "phd", masters: (i) => i.type === "masters",
    scholarship: (i) => i.type === "scholarship", fellowship: (i) => i.type === "fellowship",
    conference: (i) => i.type === "conference", online: (i) => i.country === "Online"
  };
  // Words that are only a fact: "free" in running text ("free to apply") is
  // not the same as costing nothing, so these never match text.
  const FACET_ONLY = new Set(["free", "fullyfunded", "opennow", "open", "closingsoon", "soon",
    "yearpre", "yearclin", "yearintern", "yeargrad", "yearpg", "tierone"]);

  const norm = (s) => String(s == null ? "" : s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "").replace(/[^a-z0-9₹]+/g, " ").trim();
  function stem(w) {
    if (w.length > 4 && /ies$/.test(w)) return w.slice(0, -3) + "y";
    if (w.length > 3 && /s$/.test(w) && !/(ss|us)$/.test(w)) return w.slice(0, -1);
    return w;
  }

  const SEARCH_INDEX = new Map();
  function searchDoc(item) {
    let x = SEARCH_INDEX.get(item.id);
    if (x) return x;
    const prof = (window.DB.countries || {})[item.country];
    const pad = (s) => " " + norm(s) + " ";
    x = {
      name: pad(item.name),
      org: pad(item.org),
      place: pad([item.country, item.city, prof && prof.name].join(" ")),
      tags: pad([TYPE_LABEL[item.type], (item.fields || []).map((f) => FIELDS[f]).join(" ")].join(" ")),
      text: pad([item.why, item.money, item.window, item.duration, (item.reqs || []).join(" "),
        (item.steps || []).join(" "), (item.stages || []).map((s) => STAGE_LABEL[s]).join(" ")].join(" "))
    };
    SEARCH_INDEX.set(item.id, x);
    return x;
  }

  function parseQuery(q) {
    let s = " " + norm(q) + " ";
    PHRASES.forEach(function (p) { s = s.split(" " + p[0] + " ").join(" " + p[1] + " "); });
    return s.trim().split(" ").filter((w) => w && !STOP.has(w)).map(function (w) {
      const key = ALIAS[w] !== undefined ? w : (ALIAS[stem(w)] !== undefined ? stem(w) : null);
      let alts = key ? ALIAS[key] : null;
      if (typeof alts === "string") alts = ALIAS[alts];
      const list = alts ? alts.map((a) => ({ s: a, whole: a.length <= 3 })) : [{ s: stem(w), whole: false }];
      return { w: w, alts: FACET_ONLY.has(w) ? [] : list, facet: FACET[w] || (key && FACET[key]) || null };
    });
  }

  // How well one word fits one entry: a hit in the name beats a hit in the
  // country, which beats the institution, the tags and then the running text.
  function tokenScore(x, t, item) {
    let best = 0;
    t.alts.forEach(function (a) {
      const needle = " " + a.s + (a.whole ? " " : "");
      if (x.name.indexOf(needle) !== -1) best = Math.max(best, 8);
      else if (x.place.indexOf(needle) !== -1) best = Math.max(best, 6);
      else if (x.org.indexOf(needle) !== -1) best = Math.max(best, 4);
      else if (x.tags.indexOf(needle) !== -1) best = Math.max(best, 3);
      else if (x.text.indexOf(needle) !== -1) best = Math.max(best, 1);
    });
    if (t.facet && t.facet(item)) best = Math.max(best, 3);
    return best;
  }

  function runSearch(list, q) {
    const toks = parseQuery(q);
    if (!toks.length) return { list: list, partial: false, scores: null };
    const scored = [];
    list.forEach(function (item) {
      const x = searchDoc(item);
      let sum = 0, hit = 0;
      toks.forEach(function (t) { const sc = tokenScore(x, t, item); if (sc) { hit++; sum += sc; } });
      if (hit) scored.push({ item: item, hit: hit, sum: sum + (5 - impactOf(item).t) * 0.4 + (urgency(item) === "open" ? 0.6 : 0) });
    });
    const full = scored.filter((s) => s.hit === toks.length);
    const use = full.length ? full : scored;
    const scores = new Map(use.map((s) => [s.item.id, s.hit * 100 + s.sum]));
    return { list: use.map((s) => s.item), partial: !full.length && use.length > 0, scores: scores };
  }
  const countFor = (q) => { const r = runSearch(allOpportunities(), q); return r.partial ? 0 : r.list.length; };

  /* "Did you mean": only when nothing matched, and only for a word of four
     letters or more that starts no word anywhere in the index. */
  let VOCAB = null;
  function vocab() {
    if (VOCAB) return VOCAB;
    const set = new Set();
    const add = (s) => norm(s).split(" ").forEach((w) => { if (w.length >= 4 && !/\d/.test(w)) set.add(w); });
    allOpportunities().forEach((i) => add([i.name, i.org, i.country, i.city].join(" ")));
    Object.keys(FIELDS).forEach((k) => add(FIELDS[k]));
    Object.keys(TYPE_LABEL).forEach((k) => add(TYPE_LABEL[k]));
    Object.keys(window.DB.countries || {}).forEach((k) => add(window.DB.countries[k].name));
    Object.keys(ALIAS).forEach((k) => { if (k.length >= 4) set.add(k); });
    VOCAB = Array.from(set);
    return VOCAB;
  }
  function editDistance(a, b, max) {
    let prev = [];
    for (let j = 0; j <= b.length; j++) prev[j] = j;
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      let rowMin = i;
      for (let j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (cur[j] < rowMin) rowMin = cur[j];
      }
      if (rowMin > max) return max + 1;
      prev = cur;
    }
    return prev[b.length];
  }
  function didYouMean(q) {
    const items = allOpportunities();
    const known = (w) => items.some(function (i) {
      const x = searchDoc(i);
      return (x.name + x.org + x.place + x.tags + x.text).indexOf(" " + w) !== -1;
    });
    let changed = false;
    const fixed = norm(q).split(" ").filter(Boolean).map(function (w) {
      if (w.length < 4 || STOP.has(w) || ALIAS[w] !== undefined || FACET[w] || known(w)) return w;
      const max = w.length >= 7 ? 2 : 1;
      let best = null, bestD = max + 1;
      vocab().forEach(function (v) {
        if (Math.abs(v.length - w.length) > max) return;
        const d = editDistance(w, v, max);
        if (d < bestD) { bestD = d; best = v; }
      });
      if (best) { changed = true; return best; }
      return w;
    });
    if (!changed) return null;
    const out = fixed.join(" ");
    return countFor(out) ? out : null;
  }

  // Months from now until an item's nearest deadline; no fixed deadline sorts last.
  function monthsUntilDeadline(item) {
    const dm = item.deadlineMonths;
    if (!dm || !dm.length || dm.length >= 12) return Infinity;
    const now = new Date().getMonth() + 1;
    let best = Infinity;
    dm.forEach(function (m) {
      let diff = m - now;
      if (diff < 0) diff += 12;
      if (diff < best) best = diff;
    });
    return best;
  }

  let lastScores = null;
  function sortList(list) {
    if (sortMode === "az") return list.slice().sort((a, b) => a.name.localeCompare(b.name));
    if (sortMode === "deadline")
      return list.slice().sort((a, b) => monthsUntilDeadline(a) - monthsUntilDeadline(b) || impactOf(a).t - impactOf(b).t);
    if (sortMode === "match" && lastScores)
      return list.slice().sort((a, b) => (lastScores.get(b.id) || 0) - (lastScores.get(a.id) || 0) || impactOf(a).t - impactOf(b).t);
    return list.slice().sort((a, b) => impactOf(a).t - impactOf(b).t); // "tier", the default
  }

  function placeName(c) {
    const PLACE_LABEL = { Global: "Global organisations", Any: "Anywhere", Online: "Online", Europe: "Across Europe",
      Asia: "Across Asia", Nordics: "Nordic countries", Baltics: "Baltic states", Gulf: "Gulf states", UK: "United Kingdom", USA: "United States" };
    return PLACE_LABEL[c] || c;
  }

  function renderBrowse() {
    const types = ["all"].concat(Object.keys(TYPE_LABEL));
    let fh = types.map(function (t) {
      const label = t === "all" ? "Everything" : TYPE_LABEL[t];
      return '<button type="button" class="fbtn" data-f="' + t + '" aria-pressed="' + (activeFilter === t) + '">' + esc(label) + "</button>";
    }).join("");
    fh += '<button type="button" class="fbtn" data-f="free" aria-pressed="' + (activeFilter === "free") + '">Costs nothing</button>';
    fh += '<button type="button" class="fbtn" data-f="open" aria-pressed="' + (activeFilter === "open") + '">Open right now</button>';
    fh += '<button type="button" class="fbtn" data-f="t1" aria-pressed="' + (activeFilter === "t1") + '">Tier 1 only</button>';
    fh += '<button type="button" class="fbtn" data-f="t12" aria-pressed="' + (activeFilter === "t12") + '">Tier 1 &amp; 2</button>';
    fh += '<button type="button" class="fbtn" data-f="student" aria-pressed="' + (activeFilter === "student") + '">Open to current MBBS students</button>';
    $("#filters").innerHTML = fh;

    $$("#filters .fbtn").forEach(function (b) {
      b.addEventListener("click", function () { activeFilter = b.dataset.f; renderBrowse(); });
    });

    let list = allOpportunities();
    if (activeFilter === "free") list = list.filter((i) => i.zeroCost);
    else if (activeFilter === "open") list = list.filter((i) => urgency(i) === "open");
    else if (activeFilter === "t1") list = list.filter((i) => impactOf(i).t === 1);
    else if (activeFilter === "t12") list = list.filter((i) => impactOf(i).t <= 2);
    else if (activeFilter === "student")
      list = list.filter((i) => i.stages && (i.stages.indexOf("pre") !== -1 || i.stages.indexOf("clin") !== -1));
    else if (activeFilter !== "all") list = list.filter((i) => i.type === activeFilter);

    if (countryFilter) list = list.filter((i) => i.country === countryFilter);
    else if (regionFilter) list = list.filter((i) => regionFilter.countries.indexOf(i.country) !== -1);
    const placeLabel = countryFilter ? placeName(countryFilter) : (regionFilter && regionFilter.label) || "";

    const preSearchCount = list.length;
    const found = runSearch(list, searchQuery);
    lastScores = found.scores;
    list = sortList(found.list);

    const SORT_LABEL = { tier: "sorted by impact tier", match: "best match first", deadline: "sorted by nearest deadline", az: "sorted A–Z" };
    let countText;
    if (found.partial) {
      countText = "No programme has every word of “" + searchQuery + "”. Showing the " + fmtNum(list.length) +
        " that have the most of them";
    } else {
      countText = fmtNum(list.length) + " programme" + (list.length === 1 ? "" : "s");
      if (searchQuery) countText += " matching “" + searchQuery + "” of " + fmtNum(preSearchCount);
    }
    if (placeLabel) countText += " in " + placeLabel;
    countText += ", " + SORT_LABEL[sortMode === "match" && !lastScores ? "tier" : sortMode];
    $("#browseCount").textContent = countText;

    // A country filter arrives from the globe, not from the visible controls, so
    // it needs its own visible, dismissible affordance — otherwise the list looks
    // inexplicably short with nothing on screen explaining why. A country with a
    // profile also gets a way across to what living there is like.
    const chipSlot = $("#activeCountry");
    if (chipSlot) {
      const prof = countryFilter && (window.DB.countries || {})[countryFilter];
      chipSlot.innerHTML = placeLabel
        ? '<div class="chip-row"><button type="button" class="country-chip" id="clearCountry">' +
          'Showing ' + esc(placeLabel) + ' only <span aria-hidden="true">×</span>' +
          '<span class="sr-only">, clear this filter</span></button>' +
          (prof ? '<button type="button" class="btn btn-ghost btn-sm" id="livingThere">Living in ' + esc(prof.name) + '</button>' : "") +
          "</div>"
        : "";
      const clear = $("#clearCountry");
      if (clear) clear.addEventListener("click", function () { countryFilter = ""; regionFilter = null; renderBrowse(); });
      const living = $("#livingThere");
      if (living) living.addEventListener("click", function () { openCountry(countryFilter); });
    }

    let empty = "";
    if (!list.length) {
      const dym = searchQuery ? didYouMean(searchQuery) : null;
      empty = '<div class="empty"><p>Nothing matches' + (searchQuery ? ' “' + esc(searchQuery) + '”' : " that filter") +
        (placeLabel ? " in " + esc(placeLabel) : "") + ".</p>" +
        (dym ? '<p><button type="button" class="btn btn-ghost" data-dym="' + esc(dym) + '">Search for “' + esc(dym) + '” instead</button></p>' : "") +
        '<p class="empty-small">Try a broader word, or clear the filters above.</p></div>';
    }
    $("#browseCards").innerHTML = list.length
      ? list.map((i) => cardHTML({ item: i, urg: urgency(i), reasons: [] }, null)).join("")
      : empty;
    const dymBtn = $("#browseCards [data-dym]");
    if (dymBtn) dymBtn.addEventListener("click", function () { setSearch(dymBtn.dataset.dym, true); $("#browseSearch").focus(); });
    renderTry();
  }

  /* ───────────────── search box: suggestions and your searches ─────────────────
     The suggestions under the box are a listbox driven from the input
     (aria-activedescendant), so focus never leaves the field: arrows move,
     Enter picks, Escape closes. Each suggestion carries its count from the
     index. "Your searches" are kept in this browser only, like the
     shortlist, and can be cleared; the "Try" terms are fixed starting
     points, each with its live count, and never claim to be anyone else's
     searches, because nothing here is measured. */
  const TRY_TERMS = ["ICMR", "Germany", "free", "fully funded", "neuroscience", "public health", "PhD", "summer", "first year", "USMLE"];

  function loadSearches() {
    try { const v = JSON.parse(localStorage.getItem("dc-searches") || "[]"); return Array.isArray(v) ? v : []; }
    catch (e) { return []; }
  }
  function saveSearches(list) {
    try { localStorage.setItem("dc-searches", JSON.stringify(list.slice(0, 20))); } catch (e) { /* private mode */ }
  }
  function recordSearch(q) {
    q = String(q || "").trim();
    if (q.length < 2 || !countFor(q)) return;
    const list = loadSearches(), k = norm(q), now = Date.now();
    const same = list.find((s) => norm(s.q) === k);
    // "neur" saved on the way to "neuroscience" is the same search, not two.
    const prefix = !same && list.find((s) => now - s.t < 30000 && s.n === 1 && k.indexOf(norm(s.q)) === 0);
    if (same) { same.n++; same.t = now; same.q = q; }
    else if (prefix) { prefix.q = q; prefix.t = now; }
    else list.push({ q: q, n: 1, t: now });
    list.sort((a, b) => b.t - a.t);
    saveSearches(list);
  }

  function tryChip(q, n, cls) {
    return '<button type="button" class="try-chip' + (cls ? " " + cls : "") + '" data-q="' + esc(q) + '">' + esc(q) +
      ' <span class="try-n">' + fmtNum(n) + '<span class="sr-only"> programmes</span></span></button>';
  }
  function renderTry() {
    const slot = $("#browseTry");
    if (!slot) return;
    const mine = loadSearches().map((s) => ({ q: s.q, n: s.n, t: s.t, c: countFor(s.q) })).filter((s) => s.c)
      .sort((a, b) => b.n - a.n || b.t - a.t).slice(0, 5);
    let h = "";
    if (mine.length) {
      const often = mine.some((s) => s.n > 1);
      h += '<div class="try-row"><span class="try-l">' + (often ? "You often search" : "Your recent searches") + "</span>" +
        mine.map((s) => tryChip(s.q, s.c, "is-mine")).join("") +
        '<button type="button" class="try-clear" id="trySearchesClear">Clear<span class="sr-only"> your searches</span></button></div>';
    }
    const mineKeys = new Set(mine.map((s) => norm(s.q)));
    const terms = TRY_TERMS.filter((q) => !mineKeys.has(norm(q))).map((q) => ({ q: q, c: countFor(q) })).filter((t) => t.c);
    h += '<div class="try-row"><span class="try-l">Try</span>' + terms.map((t) => tryChip(t.q, t.c)).join("") + "</div>";
    slot.innerHTML = h;
    $$(".try-chip", slot).forEach(function (b) {
      b.addEventListener("click", function () { setSearch(b.dataset.q, true); });
    });
    const clr = $("#trySearchesClear");
    if (clr) clr.addEventListener("click", function () {
      const kept = loadSearches();
      saveSearches([]);
      renderTry();
      const box = $("#browseSearch");
      if (box) box.focus();
      toast("Your searches are cleared from this browser.", {
        label: "Undo", run: function () { saveSearches(kept); renderTry(); }
      });
    });
  }

  // Put a query in the box and run it, as if typed. `record` saves it to
  // your searches (chips, Enter, a picked suggestion; never every keystroke).
  function setSearch(q, record) {
    const box = $("#browseSearch");
    if (box) box.value = q;
    searchQuery = String(q || "").trim();
    syncSortToSearch();
    if (record) recordSearch(searchQuery);
    renderBrowse();
  }
  function syncSortToSearch() {
    const sel = $("#browseSort");
    if (!sortAuto) return;
    sortMode = searchQuery ? "match" : "tier";
    if (sel) sel.value = sortMode;
  }

  // From anywhere else on the site (the home search, a chip, the "/" key):
  // land in Browse with the query run and every other filter cleared.
  function goSearch(q) {
    countryFilter = ""; regionFilter = null; activeFilter = "all";
    const box = $("#browseSearch");
    if (box) box.value = q || "";
    searchQuery = String(q || "").trim();
    syncSortToSearch();
    if (searchQuery) recordSearch(searchQuery);
    renderBrowse();
    showView("browse");
  }

  function suggestionsFor(q) {
    const n = norm(q);
    if (!n) return [];
    const starts = (label) => (" " + norm(label)).indexOf(" " + n) !== -1;
    const items = allOpportunities();
    const out = [];
    const counts = {};
    items.forEach((i) => { counts[i.country] = (counts[i.country] || 0) + 1; });
    Object.keys(counts).filter((c) => starts(placeName(c)) || starts(c))
      .sort((a, b) => counts[b] - counts[a]).slice(0, 3)
      .forEach((c) => out.push({ kind: "country", label: placeName(c), value: c, n: counts[c], tag: "Country" }));
    Object.keys(FIELDS).filter((f) => starts(FIELDS[f])).slice(0, 2).forEach(function (f) {
      out.push({ kind: "field", label: FIELDS[f], value: FIELDS[f], n: items.filter((i) => (i.fields || []).indexOf(f) !== -1).length, tag: "Field" });
    });
    Object.keys(TYPE_LABEL).filter((t) => starts(TYPE_LABEL[t]) || t.indexOf(n) === 0).slice(0, 2).forEach(function (t) {
      out.push({ kind: "kind", label: TYPE_LABEL[t], value: t, n: items.filter((i) => i.type === t).length, tag: "Kind" });
    });
    const r = runSearch(items, q);
    if (!r.partial && r.scores) {
      r.list.slice().sort((a, b) => r.scores.get(b.id) - r.scores.get(a.id)).slice(0, 8 - Math.min(out.length, 4))
        .forEach((i) => out.push({ kind: "programme", label: i.name, value: i.id, tag: placeName(i.country) }));
    }
    return out.slice(0, 8);
  }

  function initSearchBox() {
    const box = $("#browseSearch"), ul = $("#searchSuggest");
    if (!box || !ul) return;
    let items = [], active = -1, debounce = null;

    function close() {
      ul.hidden = true; ul.innerHTML = ""; items = []; active = -1;
      box.setAttribute("aria-expanded", "false");
      box.removeAttribute("aria-activedescendant");
    }
    function mark() {
      $$(".sg-opt", ul).forEach((li, i) => li.setAttribute("aria-selected", String(i === active)));
      if (active >= 0) {
        box.setAttribute("aria-activedescendant", "sg-" + active);
        const li = $("#sg-" + active);
        if (li && li.scrollIntoView) li.scrollIntoView({ block: "nearest" });
      } else box.removeAttribute("aria-activedescendant");
    }
    function open() {
      items = suggestionsFor(box.value);
      active = -1;
      if (!items.length) { close(); return; }
      ul.innerHTML = items.map(function (s, i) {
        return '<li class="sg-opt" role="option" id="sg-' + i + '" aria-selected="false" data-i="' + i + '">' +
          '<span class="sg-label">' + esc(s.label) + "</span>" +
          '<span class="sg-tag">' + esc(s.tag) + (s.n != null ? ", " + fmtNum(s.n) : "") + "</span></li>";
      }).join("");
      ul.hidden = false;
      box.setAttribute("aria-expanded", "true");
      $$(".sg-opt", ul).forEach(function (li) {
        // mousedown, not click: a click lands after the box has blurred.
        li.addEventListener("mousedown", function (e) { e.preventDefault(); pick(items[Number(li.dataset.i)]); });
      });
    }
    function pick(s) {
      close();
      if (!s) return;
      if (s.kind === "country") {
        recordSearch(s.label);
        countryFilter = s.value; regionFilter = null; activeFilter = "all";
        box.value = ""; searchQuery = ""; syncSortToSearch();
        renderBrowse();
      } else if (s.kind === "kind") {
        activeFilter = s.value;
        box.value = ""; searchQuery = ""; syncSortToSearch();
        renderBrowse();
      } else setSearch(s.kind === "programme" ? s.label : s.value, true);
      box.focus();
    }

    box.addEventListener("input", function () {
      open();
      clearTimeout(debounce);
      const val = box.value;
      debounce = setTimeout(function () {
        searchQuery = val.trim();
        syncSortToSearch();
        renderBrowse();
      }, 120);
    });
    box.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (ul.hidden) open();
        if (items.length) { active = (active + 1) % items.length; mark(); }
      } else if (e.key === "ArrowUp") {
        if (!items.length) return;
        e.preventDefault();
        active = active <= 0 ? items.length - 1 : active - 1; mark();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (active >= 0) { pick(items[active]); return; }
        close();
        clearTimeout(debounce);
        setSearch(box.value, true);
      } else if (e.key === "Escape") {
        if (!ul.hidden) { e.preventDefault(); close(); }
      } else if (e.key === "Tab") close();
    });
    box.addEventListener("blur", function () {
      setTimeout(close, 120);
      if (box.value.trim().length >= 3) recordSearch(box.value);
    });
    $("#browseSort").addEventListener("change", function () {
      sortMode = this.value;
      sortAuto = false;
      renderBrowse();
    });

    // "/" from anywhere (outside a field) jumps to the search box.
    document.addEventListener("keydown", function (e) {
      if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (document.body.classList.contains("tour-locked") || document.documentElement.classList.contains("intro-on")) return;
      e.preventDefault();
      if (currentView !== "browse") gotoView("browse");
      setTimeout(function () { box.focus(); }, 60);
    });
  }

  /* ───────────────── countries ─────────────────
     Every value of item.country gets a tile, grouped by the same ATLAS
     regions as the scroll atlas, so a region's tiles add up to the number
     its atlas step shows. A tile opens the place: its counts, the honest
     profile from data-countries.js where there is one, and every programme
     there as a full card. The hue on each tile is its region's (the
     --rg-* tokens), a name and never a status: status is the open/soon bar
     and its words. */
  const REGION_SHORT = { india: "India", uk: "UK and Ireland", europe: "Europe", americas: "USA and Canada",
    anz: "Australia and NZ", asia: "Asia and Africa", global: "No single country" };
  let cxRegion = "all", cxSort = "count", cxOpen = "";

  function regionOf(country) {
    const keys = Object.keys(ATLAS);
    for (let k = 0; k < keys.length; k++) if (ATLAS[keys[k]].countries.indexOf(country) !== -1) return keys[k];
    return "global";
  }
  function placeStats(country) {
    const list = allOpportunities().filter((i) => i.country === country);
    return {
      list: list, total: list.length,
      open: list.filter((i) => urgency(i) === "open").length,
      soon: list.filter((i) => urgency(i) === "soon").length,
      funded: list.filter((i) => ["full", "free", "stipend", "paid"].indexOf(i.funding) !== -1 || i.zeroCost).length,
      student: list.filter((i) => i.stages && (i.stages.indexOf("pre") !== -1 || i.stages.indexOf("clin") !== -1)).length
    };
  }
  function statLine(s) {
    const bits = [fmtNum(s.open) + " open this month"];
    if (s.soon) bits.push(fmtNum(s.soon) + " opening soon");
    bits.push(fmtNum(s.funded) + " funded or free");
    return bits.join(", ");
  }

  function renderCountries() {
    const grid = $("#cxGrid"), detail = $("#cxDetail");
    if (!grid) return;
    const places = {};
    allOpportunities().forEach((i) => { if (i.country) places[i.country] = 1; });
    const all = Object.keys(places).map((c) => ({ c: c, r: regionOf(c), s: placeStats(c) }));

    // Each chip carries its number of routes, the same count its atlas step shows.
    const regionCount = {};
    all.forEach((p) => { regionCount[p.r] = (regionCount[p.r] || 0) + p.s.total; });
    const everything = all.reduce((n, p) => n + p.s.total, 0);
    let rh = '<button type="button" class="fbtn cx-rbtn" data-r="all" aria-pressed="' + (cxRegion === "all") + '">Everywhere <span class="try-n">' + fmtNum(everything) + "</span></button>";
    Object.keys(ATLAS).forEach(function (k) {
      if (!regionCount[k]) return;
      rh += '<button type="button" class="fbtn cx-rbtn" data-r="' + k + '" aria-pressed="' + (cxRegion === k) +
        '" style="--rg: var(--rg-' + k + ')"><span class="cx-dot" aria-hidden="true"></span>' + esc(REGION_SHORT[k]) +
        ' <span class="try-n">' + fmtNum(regionCount[k]) + "</span></button>";
    });
    $("#cxRegions").innerHTML = rh;
    $$("#cxRegions .cx-rbtn").forEach(function (b) {
      b.addEventListener("click", function () { cxRegion = b.dataset.r; cxOpen = ""; renderCountries(); });
    });

    let shown = all.filter((p) => cxRegion === "all" || p.r === cxRegion);
    const SORTS = {
      count: (a, b) => b.s.total - a.s.total || a.c.localeCompare(b.c),
      open: (a, b) => b.s.open - a.s.open || b.s.soon - a.s.soon || b.s.total - a.s.total,
      funded: (a, b) => b.s.funded - a.s.funded || b.s.total - a.s.total,
      az: (a, b) => placeName(a.c).localeCompare(placeName(b.c))
    };
    shown.sort(SORTS[cxSort] || SORTS.count);
    const realCountries = shown.filter((p) => REGIONS.indexOf(p.c) === -1).length;
    const routes = shown.reduce((n, p) => n + p.s.total, 0);
    $("#cxCount").textContent = fmtNum(realCountries) + " countr" + (realCountries === 1 ? "y" : "ies") +
      (shown.length > realCountries ? " and " + fmtNum(shown.length - realCountries) + " wider regions" : "") +
      ", " + fmtNum(routes) + " routes" + (cxRegion !== "all" ? " in " + REGION_SHORT[cxRegion] : "") + ".";

    grid.innerHTML = shown.map(function (p, idx) {
      const s = p.s, w = (n) => (s.total ? (100 * n / s.total).toFixed(1) : 0) + "%";
      return '<button type="button" class="cx-tile" data-cx="' + esc(p.c) + '" style="--rg: var(--rg-' + p.r + "); --i:" + Math.min(idx, 24) + '">' +
        '<span class="cx-top"><span class="cx-dot" aria-hidden="true"></span><span class="cx-name">' + esc(placeName(p.c)) + "</span></span>" +
        '<span class="cx-n">' + fmtNum(s.total) + ' <span class="cx-n-l">route' + (s.total === 1 ? "" : "s") + "</span></span>" +
        '<span class="cx-bar" aria-hidden="true"><i class="cx-b-open" style="width:' + w(s.open) + '"></i><i class="cx-b-soon" style="width:' + w(s.soon) + '"></i></span>' +
        '<span class="cx-meta">' + esc(statLine(s)) + "</span></button>";
    }).join("");
    $$(".cx-tile", grid).forEach(function (t) {
      t.addEventListener("click", function () { openCountry(t.dataset.cx, true); });
    });

    // While one place is open its page has the screen: the region chips, the
    // order menu and the count step aside, and "All countries" brings them back.
    $("#view-countries").classList.toggle("cx-is-detail", !!cxOpen);
    if (cxOpen) renderCountryDetail(cxOpen);
    else { detail.hidden = true; detail.innerHTML = ""; grid.hidden = false; }
  }

  function renderCountryDetail(c) {
    const grid = $("#cxGrid"), detail = $("#cxDetail");
    const s = placeStats(c), r = regionOf(c);
    const prof = (window.DB.countries || {})[c];
    let h = '<button type="button" class="btn btn-ghost btn-sm cx-back" id="cxBack">All countries</button>';
    h += '<header class="cx-d-head" style="--rg: var(--rg-' + r + ')"><p class="cx-d-region"><span class="cx-dot" aria-hidden="true"></span>' + esc(REGION_SHORT[r]) + "</p>";
    h += '<h3 id="cxDetailH" tabindex="-1">' + esc(prof ? prof.name : placeName(c)) + "</h3></header>";
    h += '<dl class="cx-d-stats">' +
      "<div><dt>Routes</dt><dd>" + fmtNum(s.total) + "</dd></div>" +
      '<div class="is-open"><dt>Open this month</dt><dd>' + fmtNum(s.open) + "</dd></div>" +
      '<div class="is-soon"><dt>Opening soon</dt><dd>' + fmtNum(s.soon) + "</dd></div>" +
      '<div class="is-funded"><dt>Funded or free</dt><dd>' + fmtNum(s.funded) + "</dd></div>" +
      "<div><dt>Open while in MBBS</dt><dd>" + fmtNum(s.student) + "</dd></div></dl>";
    if (prof) {
      const facts = [["Winter", prof.winter], ["Daylight", prof.daylight], ["Living costs", prof.cost], ["Food", prof.food],
        ["Mental health support", prof.mentalHealth], ["Visa and work after", [prof.visa, prof.work].filter(Boolean).join(" ")]]
        .filter((f) => f[1]);
      h += '<dl class="cx-facts">' + facts.map((f) => "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>").join("") + "</dl>";
      if (prof.honest) h += '<p class="cx-honest"><b>Honestly</b> ' + esc(prof.honest) + "</p>";
    }
    h += '<div class="cx-actions">' +
      '<button type="button" class="btn btn-ghost" id="cxBrowse">Search and filter these in Browse</button>' +
      (s.open ? '<button type="button" class="btn btn-ghost" id="cxOpenNow">Only the ' + fmtNum(s.open) + " open this month</button>" : "") +
      "</div>";
    const list = s.list.slice().sort(function (a, b) {
      const ua = urgency(a) === "open" ? 0 : urgency(a) === "soon" ? 1 : 2;
      const ub = urgency(b) === "open" ? 0 : urgency(b) === "soon" ? 1 : 2;
      return impactOf(a).t - impactOf(b).t || ua - ub || a.name.localeCompare(b.name);
    });
    h += '<p class="cx-list-l">Every route here, highest graded first</p>';
    h += '<div class="cards">' + list.map((i) => cardHTML({ item: i, urg: urgency(i), reasons: [] }, null)).join("") + "</div>";
    detail.innerHTML = h;
    detail.hidden = false;
    grid.hidden = true;
    $("#cxBack").addEventListener("click", function () {
      const was = cxOpen;
      cxOpen = "";
      renderCountries();
      const tile = $$("#cxGrid .cx-tile").find((t) => t.dataset.cx === was);
      if (tile) { tile.focus({ preventScroll: true }); tile.scrollIntoView({ block: "center" }); }
    });
    $("#cxBrowse").addEventListener("click", function () { openPlace(c, null); });
    const on = $("#cxOpenNow");
    if (on) on.addEventListener("click", function () { openPlace(c, null); activeFilter = "open"; renderBrowse(); });
  }

  // Open one place's page. From a tile the reader is already here, so it only
  // swaps the panel; from anywhere else it changes view first.
  function openCountry(c, fromTile) {
    cxOpen = c;
    if (!fromTile) { cxRegion = "all"; renderCountries(); showView("countries"); }
    else renderCountries();
    const go = function () {
      const d = $("#cxDetail"), h = $("#cxDetailH");
      if (!d || !h) return;
      d.scrollIntoView({ block: "start" });
      h.focus({ preventScroll: true });
    };
    // From another view, wait for the view change (and its scroll to the
    // top) to finish before moving to the place.
    if (fromTile) go(); else setTimeout(go, 380);
  }

  /* ───────────────── deadlines for your year ─────────────────
     Two lists the month grid cannot give. "Closing soon" is what is open
     this month or opens in the next two, for your stage, nearest first.
     "Last chance" is what takes you now and stops taking you when you move
     on: an entry whose last listed stage is yours (or, while you are still
     in MBBS, one that takes only students). Both come straight from each
     entry's stages and deadlineMonths, so they are as right as those are,
     and every row links its official page for the real date. */
  const YEAR_LABEL = { pre: "1st–2nd prof", clin: "3rd–final prof", intern: "Internship", grad: "MBBS done", pg: "After MD/MS" };
  let dlStage = null, dlMonth = 0, dlShowAll = false;

  function yearDefault() {
    let stored = null;
    try { stored = localStorage.getItem("dc-year"); } catch (e) { /* private mode */ }
    if (stored && STAGE_LABEL[stored]) return stored;
    if (answers.stage && STAGE_LABEL[answers.stage]) return answers.stage;
    return null;
  }
  const forStage = (i, st) => !st || !i.stages || i.stages.indexOf(st) !== -1;
  const hasWindow = (i) => !i.noOpenCall && i.deadlineMonths && i.deadlineMonths.length && i.deadlineMonths.length < 12;

  function whenText(item) {
    const m = new Date().getMonth() + 1, u = urgency(item);
    const dm = item.deadlineMonths || [];
    if (u === "open") {
      let last = m;
      for (let k = 1; k < 12; k++) { const nx = ((m - 1 + k) % 12) + 1; if (dm.indexOf(nx) === -1) break; last = nx; }
      return last === m ? { cls: "urg urg-open dl-closing", t: "Closes this month" }
        : { cls: "urg urg-open", t: "Open now, through " + MONTHS[last - 1] };
    }
    if (u === "soon") {
      const nm = monthsUntilDeadline(item);
      return { cls: "urg urg-soon", t: "Opens in " + MONTHS[((m - 1 + nm) % 12)] };
    }
    if (u === "always") return { cls: "urg urg-always", t: URG_TEXT.always };
    if (u === "none") return { cls: "urg urg-none", t: URG_TEXT.none };
    const nm = monthsUntilDeadline(item);
    return { cls: "urg urg-closed", t: nm === Infinity ? URG_TEXT.closed : "Next window: " + MONTHS[((m - 1 + nm) % 12)] };
  }

  function dlRow(item) {
    const w = whenText(item), saved = isShortlisted(item.id);
    return '<li class="dl-row" style="--rg: var(--rg-' + regionOf(item.country) + ')">' +
      '<p class="dl-when"><span class="' + w.cls + '">' + esc(w.t) + "</span></p>" +
      '<div class="dl-main"><p class="dl-name" translate="no">' + esc(item.name) + "</p>" +
      '<p class="dl-org"><span class="cx-dot" aria-hidden="true"></span>' + esc(placeName(item.country)) +
      ", " + esc(item.org) + ', tier ' + impactOf(item).t + "</p>" +
      (item.window ? '<p class="dl-window">' + esc(item.window) + "</p>" : "") + "</div>" +
      '<div class="dl-acts"><a class="card-link" href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer">Official page<span class="sr-only"> for ' + esc(item.name) + ' (new tab)</span></a>' +
      '<button type="button" class="star-btn' + (saved ? " is-saved" : "") + '" data-star="' + esc(item.id) +
      '" aria-pressed="' + saved + '" aria-label="' + esc((saved ? "Remove " : "Save ") + item.name + (saved ? " from" : " to") + " shortlist") +
      '" title="' + (saved ? "Remove from shortlist" : "Save to shortlist") + '">' + starSVG(saved) + "</button></div></li>";
  }

  function lastChance(st) {
    if (!st || st === "pg") return null;
    const idx = STAGE_ORDER.indexOf(st);
    // While you are in MBBS, "last chance" is everything that takes only
    // students: it shuts the day you start the internship year.
    const cutoff = idx <= 1 ? 1 : idx;
    return allOpportunities().filter((i) => i.stages && i.stages.indexOf(st) !== -1 &&
      !i.stages.some((s) => STAGE_ORDER.indexOf(s) > cutoff));
  }
  const LAST_SUB = {
    pre: "These take you only while you are a student. They stop the day you start the internship year, so the earlier years are when to use them.",
    clin: "These take you only while you are a student, and some only in the final years. They stop the day you start the internship year.",
    intern: "These take you during the internship year and stop once it is over.",
    grad: "These are for MBBS graduates and stop once you hold an MD, MS or DNB."
  };

  function renderYear() {
    const slot = $("#dlStages");
    if (!slot) return;
    if (dlStage === null) dlStage = yearDefault();
    const now = new Date().getMonth() + 1;
    let sh = '<button type="button" class="fbtn" data-st="" aria-pressed="' + (!dlStage) + '">Any year</button>';
    STAGE_ORDER.forEach(function (st) {
      sh += '<button type="button" class="fbtn" data-st="' + st + '" aria-pressed="' + (dlStage === st) + '">' + esc(YEAR_LABEL[st]) + "</button>";
    });
    slot.innerHTML = sh;
    $$("button", slot).forEach(function (b) {
      b.addEventListener("click", function () {
        dlStage = b.dataset.st || "";
        dlShowAll = false;
        try { if (dlStage) localStorage.setItem("dc-year", dlStage); else localStorage.removeItem("dc-year"); } catch (e) { /* ignore */ }
        renderYear();
      });
    });

    const pool = allOpportunities().filter((i) => forStage(i, dlStage));
    // The next six months, this one first: how many windows each holds.
    let strip = "", max = 1;
    const months = [];
    for (let k = 0; k < 6; k++) {
      const m = ((now - 1 + k) % 12) + 1;
      const n = pool.filter((i) => hasWindow(i) && i.deadlineMonths.indexOf(m) !== -1).length;
      months.push({ m: m, n: n });
      if (n > max) max = n;
    }
    months.forEach(function (x, k) {
      strip += '<button type="button" class="dl-bar' + (k === 0 ? " is-now" : "") + '" data-m="' + x.m + '" aria-pressed="' + (dlMonth === x.m) + '">' +
        '<span class="dl-bar-n">' + fmtNum(x.n) + "</span>" +
        '<span class="dl-bar-col" aria-hidden="true"><i style="transform: scaleY(' + (x.n / max).toFixed(3) + ')"></i></span>' +
        '<span class="dl-bar-m">' + esc(MONTHS[x.m - 1].slice(0, 3)) + '<span class="sr-only">' + esc(MONTHS[x.m - 1].slice(3)) + ", windows open</span></span></button>";
    });
    $("#dlStrip").innerHTML = strip;
    $$("#dlStrip .dl-bar").forEach(function (b) {
      b.addEventListener("click", function () {
        const m = Number(b.dataset.m);
        dlMonth = dlMonth === m ? 0 : m;
        dlShowAll = false;
        renderYear();
      });
    });

    let list = dlMonth
      ? pool.filter((i) => hasWindow(i) && i.deadlineMonths.indexOf(dlMonth) !== -1)
      : pool.filter((i) => { const u = urgency(i); return u === "open" || u === "soon"; });
    list = list.sort((a, b) => monthsUntilDeadline(a) - monthsUntilDeadline(b) ||
      (whenText(b).cls.indexOf("dl-closing") !== -1) - (whenText(a).cls.indexOf("dl-closing") !== -1) ||
      impactOf(a).t - impactOf(b).t || a.name.localeCompare(b.name));
    const who = dlStage ? "for " + STAGE_LABEL[dlStage] : "for any year";
    $("#dlCount").textContent = dlMonth
      ? fmtNum(list.length) + " with a window in " + MONTHS[dlMonth - 1] + ", " + who + ". Tap the month again to see everything open or opening soon."
      : fmtNum(list.length) + " open now or opening in the next two months, " + who + ", nearest first.";
    const LIMIT = 12;
    $("#dlList").innerHTML = list.slice(0, dlShowAll ? list.length : LIMIT).map(dlRow).join("") +
      (list.length > LIMIT && !dlShowAll ? '<li class="dl-more"><button type="button" class="btn btn-ghost btn-sm" id="dlMore">Show all ' + fmtNum(list.length) + "</button></li>" : "") +
      (!list.length ? '<li class="empty">Nothing in that window for this year. Try another month or year.</li>' : "");
    const more = $("#dlMore");
    if (more) more.addEventListener("click", function () { dlShowAll = true; renderYear(); });

    const wrap = $("#dlLastWrap"), last = lastChance(dlStage);
    if (!last) {
      wrap.hidden = false;
      $("#dlLastSub").textContent = dlStage === "pg"
        ? "Nothing listed here stops taking you after an MD, MS or DNB."
        : "Pick your year above to see the programmes that stop taking you once you move on.";
      $("#dlLast").innerHTML = "";
      return;
    }
    wrap.hidden = false;
    $("#dlLastSub").textContent = LAST_SUB[dlStage] + " " + fmtNum(last.length) + " in the index.";
    const order = { open: 0, soon: 1, closed: 2, always: 3, none: 4 };
    $("#dlLast").innerHTML = last.sort((a, b) => order[urgency(a)] - order[urgency(b)] ||
      monthsUntilDeadline(a) - monthsUntilDeadline(b) || impactOf(a).t - impactOf(b).t).map(dlRow).join("");
  }

  /* ───────────────── calendar ───────────────── */
  function renderCalendar() {
    renderYear();
    const now = new Date().getMonth() + 1;
    const items = allOpportunities();
    let h = "";
    for (let m = 1; m <= 12; m++) {
      const inMonth = items.filter((i) => i.deadlineMonths && i.deadlineMonths.length && i.deadlineMonths.length < 12 && i.deadlineMonths.indexOf(m) !== -1);
      h += '<article class="month' + (m === now ? " is-now" : "") + '">';
      h += "<h4>" + esc(MONTHS[m - 1]) + (m === now ? " (this month)" : "") + "</h4>";
      h += '<p class="m-count">' + inMonth.length + "</p>";
      h += "<ul>";
      inMonth.slice(0, 9).forEach((i) => { h += '<li title="' + esc(i.name) + '">' + esc(i.name) + "</li>"; });
      if (inMonth.length > 9) h += "<li>+ " + (inMonth.length - 9) + " more</li>";
      if (!inMonth.length) h += '<li style="color:var(--ink-3)">Nothing closing</li>';
      h += "</ul></article>";
    }
    $("#calendarGrid").innerHTML = h;
  }

  /* ───────────────── home: the doors ───────────────── */
  function initDoors() {
    const items = allOpportunities();
    const places = {};
    items.forEach((i) => { if (i.country && REGIONS.indexOf(i.country) === -1) places[i.country] = 1; });
    const open = items.filter((i) => urgency(i) === "open").length;
    const free = items.filter((i) => i.zeroCost).length;
    const TEXT = {
      countries: fmtNum(Object.keys(places).length) + " countries, each with what is open there and what living there is like",
      year: fmtNum(open) + " windows open this month. Pick your year and see what closes first, and what you lose by waiting",
      free: fmtNum(free) + " programmes that cost you nothing at all, from courses to funded research",
      routes: fmtNum((window.DB.specialties || []).length) + " specialties: the day's work, the route in and where each leads"
    };
    $$("[data-door-text]").forEach((el) => { el.textContent = TEXT[el.dataset.doorText] || ""; });
    $$(".door").forEach(function (d) {
      d.addEventListener("click", function () {
        const k = d.dataset.door;
        if (k === "countries") { cxOpen = ""; cxRegion = "all"; gotoView("countries"); }
        else if (k === "year") {
          gotoView("calendar");
          setTimeout(function () {
            const y = $("#dlYearH");
            if (y) { y.setAttribute("tabindex", "-1"); y.scrollIntoView({ block: "start" }); y.focus({ preventScroll: true }); }
          }, 80);
        } else if (k === "free") openBrowseWith("free");
        else if (k === "routes") gotoView("routes");
      });
    });

    const form = $("#quickSearch"), input = $("#quickSearchInput"), tryEl = $("#doorTry");
    if (tryEl) {
      tryEl.innerHTML = '<div class="try-row"><span class="try-l">Try</span>' +
        TRY_TERMS.slice(0, 6).map((q) => ({ q: q, c: countFor(q) })).filter((t) => t.c).map((t) => tryChip(t.q, t.c)).join("") + "</div>";
      $$(".try-chip", tryEl).forEach((b) => b.addEventListener("click", function () { goSearch(b.dataset.q); }));
    }
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      goSearch(input.value);
      setTimeout(function () { const b = $("#browseSearch"); if (b) b.focus({ preventScroll: true }); }, 60);
    });
  }

  /* ───────────────── motion ───────────────── */
  const prefersReduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Count a number up to its target. The point is that "150" lands as a
  // quantity rather than as a label you skim past, so it eases out, and
  // under reduced-motion it simply appears.
  /* Counts are formatted rather than concatenated. At today's sizes this is
     invisible — 211 renders as "211" in every locale — but this index went
     from 155 to 220 in two months and will cross a thousand, and that is the
     point where a hand-built string starts printing "1220" to a reader whose
     locale wants "1,220". Falls back to the raw number on a browser without
     Intl rather than throwing. */
  const NUMFMT = (function () {
    try { return new Intl.NumberFormat(undefined); } catch (e) { return null; }
  })();
  function fmtNum(n) { return NUMFMT ? NUMFMT.format(n) : String(n); }

  /* Was a 900ms eased count-up. Removed, and the reasoning is the same one
     already written a few lines below about the claim cards: a number that
     rolls is a number you cannot read yet. The reader came here to find out
     how many routes exist, and the animation answered a third of a second
     late while spending 900ms of requestAnimationFrame during first paint on
     a phone. It showed nothing the final value does not.
     Kept as a function rather than inlined so the four call sites still read
     as one decision, and so this note sits where the next person looks. */
  function setNum(el, target) {
    if (el) el.textContent = fmtNum(target);
  }

  /* ───────────────── stats ───────────────── */
  function renderStats() {
    const items = allOpportunities();
    const countries = {};
    items.forEach(function (i) {
      if (REGIONS.indexOf(i.country) === -1 && i.country) countries[i.country] = 1;
    });
    const total = items.length + (window.DB.frontiers || []).length + (window.DB.specialties || []).length;
    const free = items.filter((i) => i.zeroCost).length;
    const student = items.filter((i) => i.stages && (i.stages.indexOf("pre") !== -1 || i.stages.indexOf("clin") !== -1)).length;
    const nCountries = Object.keys(countries).length;

    // Every count is set directly, prose and tiles alike. Nothing on this
    // page animates its way to a number.
    const hc = $("#heroCount");
    if (hc) hc.textContent = fmtNum(total);

    // The three claim cards quote the same figures inside prose. They are
    // written from data for the same reason the review stamp is: a number
    // typed into the HTML drifts on the next commit and then disagrees with
    // the stat tile a few inches above it. Prose does not count up — it would
    // read as a slot machine mid-sentence, so these are set directly.
    const claims = { "#claimTotal": total, "#claimFree": free, "#claimCountries": nCountries };
    Object.keys(claims).forEach(function (sel) {
      const el = $(sel);
      if (el) el.textContent = fmtNum(claims[sel]);
    });

    setNum($("#statTotal"), total);
    setNum($("#statFree"), free);
    setNum($("#statStudent"), student);
    setNum($("#statCountries"), nCountries);
  }

  /* ───────────────── shortlist ───────────────── */
  let shortlist = new Set();
  function loadShortlist() {
    try {
      const raw = localStorage.getItem("dc-shortlist");
      if (raw) shortlist = new Set(JSON.parse(raw));
    } catch (e) { /* private mode or corrupt data — start empty */ }
  }
  function saveShortlist() {
    try { localStorage.setItem("dc-shortlist", JSON.stringify([...shortlist])); } catch (e) { /* ignore */ }
  }
  function isShortlisted(id) { return shortlist.has(id); }
  function toggleShortlist(id) {
    if (shortlist.has(id)) shortlist.delete(id); else shortlist.add(id);
    saveShortlist();
    updateShortlistCount();
  }
  function shortlistedItems() {
    return allOpportunities().filter((i) => shortlist.has(i.id));
  }
  function updateShortlistCount() {
    const n = $("#shortlistCount");
    if (n) n.textContent = shortlist.size ? String(shortlist.size) : "";
    $$(".star-btn").forEach(function (b) {
      const saved = isShortlisted(b.dataset.star);
      b.setAttribute("aria-pressed", String(saved));
      b.classList.toggle("is-saved", saved);
      b.title = saved ? "Remove from shortlist" : "Save to shortlist";
      b.innerHTML = starSVG(saved);
    });
  }

  function renderShortlist() {
    const slot = $("#shortlistSlot");
    const items = shortlistedItems();
    if (!items.length) {
      slot.innerHTML = '<p class="empty">Nothing saved yet. Click the star on any programme, anywhere on the site, to keep it here — ' +
        'useful while you are comparing options across several browsing sessions. Saved locally in this browser; nothing is uploaded.</p>';
      return;
    }
    const datedCount = items.filter(hasFixedWindow).length;
    let h = '<div class="shortlist-bar">';
    h += '<p class="result-count">' + fmtNum(items.length) + ' saved</p>';
    if (datedCount) {
      h += '<button type="button" class="btn btn-ghost btn-sm" id="icsBtn">' +
           'Add ' + datedCount + ' deadline' + (datedCount === 1 ? '' : 's') + ' to my calendar</button>';
    }
    h += '</div>';
    if (datedCount) {
      h += '<p class="ics-note">Downloads a calendar file you can open in Google Calendar, Apple Calendar or Outlook. ' +
           'These are <strong>month-level reminders</strong> set to the first of each opening month, not exact dates — ' +
           'windows shift every cycle, so each reminder carries the official page to confirm against.</p>';
    }
    h += prepListHTML(items);
    h += '<div class="cards">' + items.map((i) => cardHTML({ item: i, urg: urgency(i), reasons: [] }, null)).join("") + '</div>';
    slot.innerHTML = h;

    const icsBtn = $("#icsBtn");
    if (icsBtn) icsBtn.addEventListener("click", function () { downloadICS(items); });
  }

  /* ───────────────── prep list ─────────────────
     Requirements live as free prose on each programme, which reads well on a
     card but means someone with eight things shortlisted has to re-read
     forty sentences to work out what to actually go and obtain. This scans
     those strings for the handful of things that recur across programmes and
     collapses them into one checklist, so the shared work (one IELTS sitting,
     one set of references, one credential evaluation) is visible as shared
     rather than repeated per programme.

     Keyword matching, deliberately: the prose is human-written and varies, so
     this errs toward catching a requirement and naming which programmes it
     came from, rather than silently missing it. The card's own text stays the
     authority. This is a summary, and says so. */
  const PREP_RULES = [
    { id: "english", label: "An English test score",
      hint: "IELTS or TOEFL results take about two weeks. One sitting covers every programme here.",
      re: /IELTS|TOEFL|OET|English proficiency|English language/i },
    { id: "docs", label: "Passport and visa paperwork",
      hint: "A fresh passport takes three to six weeks in India. Nothing else moves without it.",
      re: /passport|visa|blocked account|Sperrkonto|proof of funds|financial proof/i },
    { id: "refs", label: "Academic references",
      hint: "Ask early and ask people who supervised you on something real, not just taught you.",
      re: /reference|recommendation|referee|letters? of support|LOR/i },
    { id: "transcripts", label: "Transcripts and credential evaluation",
      hint: "WES, ECE and uni-assist verification of Indian transcripts takes weeks — start before you need it.",
      re: /transcript|WES|ECE|credential|ANABIN|uni-assist|degree certificate|attested/i },
    { id: "experience", label: "Documented work experience",
      hint: "Internship, paid research and voluntary work usually all count, but you have to be able to evidence the hours.",
      re: /years? of (?:relevant )?(?:full-time |professional |post-bachelor's )?experience|work experience|professional experience|\d[\d,]* hours/i },
    { id: "research", label: "A research record",
      hint: "One finished project with an output beats five certificates of attendance.",
      re: /research (?:experience|record|capacity|track record)|publication|thesis|prior lab|demonstrated research/i },
    { id: "supervisor", label: "A supervisor or invitation letter",
      hint: "This is the real gate on most European routes. Start emailing months before the deadline.",
      re: /supervisor|invitation letter|host institution|willing (?:professor|PI)|sponsor|agreed to (?:take|host)/i },
    { id: "language", label: "A second language",
      hint: "Almost every research programme here is taught in English. This is for living and clinical work, not admission.",
      re: /\b(?:German|French|Japanese|Czech)\b|\b[ABC][12]\b|Fachsprachprüfung|language certificate/i },
    { id: "category", label: "Category and income certificates",
      hint: "District offices are slow, and these two documents decide the entire application.",
      re: /category certificate|income certificate|Scheduled (?:Caste|Tribe)|\bSC\b|\bST\b|\bOBC\b|\bEWS\b|family income/i },
    { id: "exam", label: "An entrance examination",
      hint: "These run on fixed annual cycles — the exam date, not the application date, sets your timeline.",
      re: /NEET|INI-CET|entrance (?:exam|test)|written exam|olympiad|\bGRE\b|\bMCQ\b|BET|JRF|NET/i },
    { id: "ethics", label: "Ethics or GCP training",
      hint: "CITI and NIH Good Clinical Practice training are free and take an afternoon. Many placements require them.",
      re: /ethics|\bGCP\b|CITI|IEC|Good Clinical Practice|institutional review/i }
  ];

  function buildPrepList(items) {
    return PREP_RULES.map(function (rule) {
      const needed = items.filter(function (item) {
        return (item.reqs || []).some((r) => rule.re.test(r));
      });
      return { rule: rule, items: needed };
    }).filter((g) => g.items.length > 0)
      .sort((a, b) => b.items.length - a.items.length);
  }

  function prepListHTML(items) {
    const groups = buildPrepList(items);
    if (!groups.length) return "";
    let h = '<details class="prep"><summary>What you need to prepare — ' + groups.length +
            ' thing' + (groups.length === 1 ? '' : 's') + ' across ' + items.length + ' saved</summary>';
    h += '<div class="prep-body">';
    h += '<p class="prep-intro">Pulled from the requirements on the programmes you saved, so the shared work shows up as shared. ' +
         'Each card’s own text is the authority. This is a summary to plan around, not a substitute for reading them.</p>';
    groups.forEach(function (g) {
      h += '<div class="prep-row">';
      h += '<div class="prep-head"><strong>' + esc(g.rule.label) + '</strong>' +
           '<span class="prep-count">' + g.items.length + ' of ' + items.length + '</span></div>';
      h += '<p class="prep-hint">' + esc(g.rule.hint) + '</p>';
      h += '<p class="prep-for">' + g.items.map((i) => '<span class="chip">' + esc(i.name) + '</span>').join("") + '</p>';
      h += '</div>';
    });
    h += '</div></details>';
    return h;
  }

  /* ───────────────── calendar export ─────────────────
     The data carries deadline MONTHS, not exact dates — windows move every
     cycle, so inventing a precise day would be false precision. Each event
     is therefore an all-day reminder on the 1st of the opening month, with
     the real window text and the official URL in the body. */
  function hasFixedWindow(item) {
    return !!(item.deadlineMonths && item.deadlineMonths.length && item.deadlineMonths.length < 12);
  }

  function icsEscape(s) {
    // RFC 5545: backslash, semicolon, comma are escaped; newlines become \n.
    return String(s == null ? "" : s)
      .replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,")
      .replace(/\r?\n/g, "\\n");
  }

  /* RFC 5545 caps lines at 75 OCTETS, not characters, and this content is
     full of multi-byte UTF-8 (≈, £, ·, —, en dashes in every money field),
     so folding on string length silently produces over-long lines. Measure
     in bytes, and iterate code points (for...of) so a surrogate pair is
     never split down the middle. Continuation lines carry a leading space,
     which costs one of the 75. */
  function icsFold(line) {
    const enc = new TextEncoder();
    if (enc.encode(line).length <= 74) return line;
    const parts = [];
    let cur = "", curBytes = 0, limit = 74;
    for (const ch of line) {
      const b = enc.encode(ch).length;
      if (curBytes + b > limit) {
        parts.push(cur);
        cur = ""; curBytes = 0; limit = 73;
      }
      cur += ch; curBytes += b;
    }
    if (cur) parts.push(cur);
    return parts.map((s, i) => (i === 0 ? s : " " + s)).join("\r\n");
  }

  function nextDateForMonth(month) {
    // The next occurrence of that month, so a January window on a December
    // visit lands next year rather than in the past.
    const now = new Date();
    const y = month >= now.getMonth() + 1 ? now.getFullYear() : now.getFullYear() + 1;
    return { y: y, m: month };
  }

  function downloadICS(items) {
    const pad = (n) => String(n).padStart(2, "0");
    const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Dreams Counsellor//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];

    items.filter(hasFixedWindow).forEach(function (item) {
      const earliest = item.deadlineMonths.slice().sort(function (a, b) {
        const now = new Date().getMonth() + 1;
        return ((a - now + 12) % 12) - ((b - now + 12) % 12);
      })[0];
      const d = nextDateForMonth(earliest);
      const start = d.y + pad(d.m) + "01";
      const endDate = new Date(Date.UTC(d.y, d.m - 1, 2));
      const end = endDate.getUTCFullYear() + pad(endDate.getUTCMonth() + 1) + pad(endDate.getUTCDate());
      const imp = impactOf(item);

      const desc = [
        item.org,
        "",
        "Application window: " + (item.window || "rolling"),
        item.money ? "Funding: " + item.money : "",
        imp.t ? "Impact tier " + imp.t + ((window.DB.tierInfo[imp.t] || {}).name ? " — " + window.DB.tierInfo[imp.t].name : "") : "",
        imp.odds ? "Odds: " + imp.odds : "",
        "",
        "Confirm the exact date on the official page — windows shift every cycle:",
        item.url
      ].filter(Boolean).join("\n");

      L.push("BEGIN:VEVENT");
      // The UID suffix keeps the product's old name on purpose: it is an identifier,
      // not text anyone reads, and changing it would make a calendar that already
      // holds these deadlines import every one of them a second time.
      L.push("UID:" + item.id + "-" + d.y + "@dream-counsellor");
      L.push("DTSTAMP:" + stamp);
      L.push("DTSTART;VALUE=DATE:" + start);
      L.push("DTEND;VALUE=DATE:" + end);
      L.push(icsFold("SUMMARY:" + icsEscape("Window opens: " + item.name)));
      L.push(icsFold("DESCRIPTION:" + icsEscape(desc)));
      L.push(icsFold("URL:" + icsEscape(item.url)));
      // Nudge a week ahead of the month opening, so it is actionable.
      L.push("BEGIN:VALARM", "TRIGGER:-P7D", "ACTION:DISPLAY",
             icsFold("DESCRIPTION:" + icsEscape(item.name + " — application window opens soon")), "END:VALARM");
      L.push("END:VEVENT");
    });

    L.push("END:VCALENDAR");
    const blob = new Blob([L.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dreams-counsellor-deadlines.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);

    const btn = $("#icsBtn");
    if (btn) {
      const original = btn.textContent;
      btn.textContent = "Calendar file downloaded";
      setTimeout(function () { btn.textContent = original; }, 2600);
    }
  }

  /* Clipboard without the async API — file:// and older browsers need this. */
  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:absolute;left:-9999px;top:0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { /* nothing more to try */ }
    document.body.removeChild(ta);
  }

  /* ───────────────── save, resume, share, export ───────────────── */
  function encodeAnswers() {
    try {
      const json = JSON.stringify(answers);
      return btoa(unescape(encodeURIComponent(json))).replace(/=+$/, "");
    } catch (e) { return ""; }
  }

  function decodeAnswers(str) {
    try {
      const json = decodeURIComponent(escape(atob(str)));
      const obj = JSON.parse(json);
      return obj && typeof obj === "object" ? obj : null;
    } catch (e) { return null; }
  }

  function persist() {
    const code = encodeAnswers();
    if (!code) return;
    try { history.replaceState(null, "", "#p=" + code); } catch (e) { /* file:// */ }
    try { localStorage.setItem("dc-answers", code); } catch (e) { /* private mode */ }
  }

  function restore() {
    let code = "";
    const m = (location.hash || "").match(/#p=([A-Za-z0-9+/]+)/);
    if (m) code = m[1];
    if (!code) { try { code = localStorage.getItem("dc-answers") || ""; } catch (e) { /* ignore */ } }
    if (!code) return false;
    const obj = decodeAnswers(code);
    if (!obj) return false;
    Object.keys(obj).forEach((k) => { answers[k] = obj[k]; });
    upgradeAnswers();
    return Object.keys(obj).length > 3;
  }

  /* A plan you can paste into a notes app, a document, or an email to a mentor. */
  function planAsText(p, ranked, plan, specs) {
    const L = [];
    L.push("DREAMS COUNSELLOR — MY PLAN");
    L.push("Generated " + new Date().toDateString());
    L.push("");
    L.push("MY PROFILE");
    L.push("- Stage: " + STAGE_LABEL[p.stage]);
    L.push("- Strongest fields: " + p.topFields.slice(0, 3).map((f) => FIELDS[f]).join(", "));
    L.push("- Eligible programmes found: " + ranked.length);
    L.push("");
    L.push("DO THESE, IN THIS ORDER");
    plan.forEach(function (s, i) {
      L.push((i + 1) + ". [" + s.when + "] " + s.what.replace(/<[^>]+>/g, ""));
    });
    L.push("");
    L.push("TOP MATCHES");
    ranked.slice(0, 15).forEach(function (r, i) {
      const imp = impactOf(r.item);
      L.push((i + 1) + ". " + r.item.name + " — " + r.item.org);
      L.push("   Tier " + imp.t + " · " + r.item.country + " · " + (r.item.window || "rolling"));
      L.push("   " + r.item.url);
    });
    L.push("");
    L.push("SPECIALTY ROUTES CLOSEST TO MY ANSWERS");
    specs.slice(0, 3).forEach(function (x, i) { L.push((i + 1) + ". " + x.s.name + " — " + x.s.oneLine); });

    const saved = shortlistedItems();
    if (saved.length) {
      L.push("");
      L.push("MY SHORTLIST (" + saved.length + " starred)");
      saved.forEach(function (item, i) {
        const imp = impactOf(item);
        L.push((i + 1) + ". " + item.name + " — " + item.org);
        L.push("   Tier " + imp.t + " · " + item.country + " · " + (item.window || "rolling"));
        L.push("   " + item.url);
      });

      const prep = buildPrepList(saved);
      if (prep.length) {
        L.push("");
        L.push("WHAT I NEED TO PREPARE");
        prep.forEach(function (g) {
          L.push("[ ] " + g.rule.label + " (" + g.items.length + " of " + saved.length + ")");
          L.push("    " + g.rule.hint);
        });
      }
    }

    L.push("");
    L.push("Deadlines change every cycle. Confirm each one on its official page.");
    return L.join("\n");
  }

  /* ═══════════════════════ THE TOUR ═══════════════════════
     A guided walk through what this page actually does, because the honest
     problem with this site is that it looks like a list and is not one.

     Runs itself ONCE per browser, then never again unless asked. That is a
     deliberate limit and the interface says so: there is no account here, so
     "seen it" lives in this browser's local storage and nowhere else. A
     different phone, a different browser, or cleared site data all count as a
     first visit, which is why the trigger in the hero is permanent rather
     than something that disappears after the first run.

     Steps may name a view; the tour switches to it exactly the way the nav
     does, so nothing here is a special case that can drift from the real
     navigation. Steps may name a target to spotlight, and when that target is
     not on screen — the nav collapses below 760px — the step degrades to a
     centred card rather than pointing at nothing. */

  const TOUR_KEY = "dc-tour-seen";

  /* Six steps, not ten. The first version explained the site accurately and
     was too long to finish, and an explainer nobody reaches the end of is
     worse than none, because it spends the goodwill and delivers half the
     map. Each step now carries one idea and about thirty words. Anything that
     could be discovered by looking has been cut; what is left is the four
     things that are genuinely not visible (the grading is a judgement, the
     globe is optional, nothing is uploaded, the official page wins) plus the
     two ways in. */
  const TOUR = [
    {
      title: "This is not a list of links",
      body: "It is %TOTAL% real programmes, each graded by how much it would actually change for you. Thirty seconds and you will know how to use it."
    },
    {
      target: "#startBtn", view: "intro",
      title: "Two ways in",
      body: "Three questions about who you are: skill, anger and flow. Or the full set, which adds your year, money and category and sharpens the ranking. You can switch later without losing an answer."
    },
    {
      target: "#browseSearch", view: "browse",
      title: "Or skip the questions",
      body: "The whole index, unfiltered. Search by name, institution or field. Sort by impact, or by which deadline is closest."
    },
    {
      target: "#browseCards .tier", view: "browse",
      title: "The badge is a judgement, not a label",
      body: "Tier 1 is career-defining and the only filled badge here. It fades to a dashed outline at tier 5, meaning: do not build a plan on this. Most things are not tier 1, and this site says so."
    },
    {
      view: "countries",
      title: "More ways in",
      body: "Countries puts every place on one page with what is open there. Deadlines starts with your year: what closes first, and what stops taking you once you move on. Specialties and Frontiers map careers and fields."
    },
    {
      view: "intro",
      title: "Star anything. Nothing is uploaded.",
      body: "The star on any card saves it. No account, no server: your list stays in this browser, and your answers ride in the page address — send yourself that link to move a plan between devices. Every date here is a starting point, never the authority. That is always the official page."
    },
    {
      target: "#installBtn", view: "intro", needsInstall: true,
      title: "Keep it on your home screen",
      body: "Install it and it opens like an app and still works on a train with no signal. If you ever open it offline and the signal comes back, it tells you that you are reading a saved copy rather than letting you plan around an old deadline."
    }
  ];

  /* The install step is only true on a device that can install, so it is
     filtered out rather than shown as a step about a button that is not
     there. Same shape as activeQuestions(): the array is the script, and what
     applies to this reader is computed from it. */
  function tourSteps() {
    return TOUR.filter(function (s) { return !s.needsInstall || installAvailable(); });
  }

  /* Rendered rather than typed, because the count moves with the device: the
     install step exists only where installing does. A hardcoded "Six steps"
     was right until this line stopped always being true. */
  function renderTourNote() {
    const el = $("#tourLineNote");
    if (el) el.textContent = tourSteps().length + " steps, about a minute";
  }

  let tourStep = 0, tourOpen = false, tourReturnFocus = null, tourNodes = null;

  function tourGotoView(name) {
    if (!name) return;
    if (name === "browse") renderBrowse();
    if (name === "countries") renderCountries();
    if (name === "calendar") renderCalendar();
    if (name === "frontiers") $("#frontierGrid").innerHTML = (window.DB.frontiers || []).map(frontierHTML).join("");
    if (name === "routes") $("#routesGrid").innerHTML = (window.DB.specialties || []).map((s) => specialtyHTML(s, null)).join("");
    if (name === "shortlist") renderShortlist();
    showView(name);
  }

  function tourBuild() {
    const wrap = document.createElement("div");
    wrap.className = "tour";
    wrap.innerHTML =
      '<div class="tour-scrim" id="tourScrim"></div>' +
      '<div class="tour-hole" id="tourHole" aria-hidden="true"></div>' +
      '<div class="tour-pop" id="tourPop" role="dialog" aria-modal="true" aria-labelledby="tourTitle" tabindex="-1">' +
        '<p class="tour-step"><span id="tourStep"></span><span class="tour-esc">. Esc closes it.</span></p>' +
        '<h2 class="tour-title" id="tourTitle"></h2>' +
        '<p class="tour-body" id="tourBody"></p>' +
        '<div class="tour-nav">' +
          '<button type="button" class="btn btn-ghost tour-skip" id="tourSkip">Skip tour</button>' +
          '<span class="tour-spacer"></span>' +
          '<button type="button" class="btn btn-ghost" id="tourPrev">Back</button>' +
          '<button type="button" class="btn btn-primary" id="tourNext">Next</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);
    tourNodes = {
      wrap: wrap, scrim: $("#tourScrim"), hole: $("#tourHole"), pop: $("#tourPop"),
      step: $("#tourStep"), title: $("#tourTitle"), body: $("#tourBody"),
      prev: $("#tourPrev"), next: $("#tourNext"), skip: $("#tourSkip")
    };
    tourNodes.next.addEventListener("click", function () { tourGo(tourStep + 1); });
    tourNodes.prev.addEventListener("click", function () { tourGo(tourStep - 1); });
    tourNodes.skip.addEventListener("click", tourEnd);
    tourNodes.scrim.addEventListener("click", tourEnd);
    return tourNodes;
  }

  function tourPlace(target) {
    const n = tourNodes, pad = 8;
    const vw = document.documentElement.clientWidth, vh = window.innerHeight;
    let r = null;
    if (target) {
      const el = $(target);
      if (el) {
        const b = el.getBoundingClientRect();
        // A collapsed nav has a zero box; do not point at nothing.
        if (b.width > 4 && b.height > 4 && b.bottom > 0 && b.top < vh) r = b;
      }
    }

    if (r) {
      n.hole.style.display = "block";
      n.hole.style.top = (r.top - pad) + "px";
      n.hole.style.left = (r.left - pad) + "px";
      n.hole.style.width = (r.width + pad * 2) + "px";
      n.hole.style.height = (r.height + pad * 2) + "px";
    } else {
      n.hole.style.display = "none";
    }

    // Measure the card, then place it below the target, or above, or centred.
    n.pop.style.top = "0px"; n.pop.style.left = "0px";
    const pw = Math.min(n.pop.offsetWidth, vw - 24), ph = n.pop.offsetHeight;
    let top, left;
    if (r && r.bottom + ph + 20 < vh) {
      top = r.bottom + 14;
      left = r.left + r.width / 2 - pw / 2;
    } else if (r && r.top - ph - 20 > 0) {
      top = r.top - ph - 14;
      left = r.left + r.width / 2 - pw / 2;
    } else {
      top = Math.max(12, (vh - ph) / 2);
      left = (vw - pw) / 2;
    }
    // Clamp inside the viewport. Never let the card be the thing that puts a
    // horizontal scrollbar on a 320px screen.
    left = Math.max(12, Math.min(left, vw - pw - 12));
    top = Math.max(12, Math.min(top, vh - ph - 12));
    n.pop.style.top = top + "px";
    n.pop.style.left = left + "px";
    // Only now is it safe to show. See the .tour-pop:not(.is-placed) rule.
    n.pop.classList.add("is-placed");
  }

  function tourGo(i) {
    if (i < 0) return;
    const steps = tourSteps();
    if (i >= steps.length) return tourEnd();
    tourStep = i;
    const s = steps[i], n = tourNodes;
    if (s.view) tourGotoView(s.view);

    n.step.textContent = "Step " + (i + 1) + " of " + steps.length;
    n.title.textContent = s.title;
    // %TOTAL% is filled from data for the same reason every other count is.
    n.body.textContent = s.body.replace("%TOTAL%", String(tourTotal()));
    n.prev.disabled = i === 0;
    n.next.textContent = i === steps.length - 1 ? "Done" : "Next";

    // Let the view switch paint before measuring the target.
    requestAnimationFrame(function () {
      const el = s.target ? $(s.target) : null;
      if (el && el.scrollIntoView) {
        try { el.scrollIntoView({ block: "center", behavior: prefersReduced ? "auto" : "smooth" }); }
        catch (e) { el.scrollIntoView(); }
      }
      setTimeout(function () { tourPlace(s.target); n.pop.focus(); }, prefersReduced ? 0 : 220);
    });
  }

  function tourTotal() {
    return allOpportunities().length + (window.DB.frontiers || []).length + (window.DB.specialties || []).length;
  }

  function tourKey(e) {
    if (!tourOpen) return;
    if (e.key === "Escape") { e.preventDefault(); return tourEnd(); }
    if (e.key === "ArrowRight") { e.preventDefault(); return tourGo(tourStep + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); return tourGo(tourStep - 1); }
    if (e.key !== "Tab") return;
    // Trap focus inside the card: it is a modal dialog, and letting Tab escape
    // into a page the scrim has covered strands the keyboard user completely.
    const f = $$("button:not([disabled])", tourNodes.pop);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function tourReposition() {
    if (!tourOpen) return;
    const s = tourSteps()[tourStep];
    if (s) tourPlace(s.target);
  }

  function tourStart() {
    if (tourOpen) return;
    tourReturnFocus = document.activeElement;
    if (!tourNodes) tourBuild();
    tourNodes.wrap.classList.add("is-on");
    document.body.classList.add("tour-locked");
    tourOpen = true;
    document.addEventListener("keydown", tourKey);
    window.addEventListener("resize", tourReposition);
    window.addEventListener("scroll", tourReposition, { passive: true });
    tourGo(0);
  }

  function tourEnd() {
    if (!tourOpen) return;
    tourOpen = false;
    tourNodes.wrap.classList.remove("is-on");
    tourNodes.pop.classList.remove("is-placed");
    document.body.classList.remove("tour-locked");
    document.removeEventListener("keydown", tourKey);
    window.removeEventListener("resize", tourReposition);
    window.removeEventListener("scroll", tourReposition);
    try { localStorage.setItem(TOUR_KEY, "1"); } catch (e) { /* private mode — it will offer again */ }
    showView("intro");
    if (tourReturnFocus && tourReturnFocus.focus) tourReturnFocus.focus();
  }

  function initTour(auto) {
    const btn = $("#tourBtn");
    if (btn) btn.addEventListener("click", tourStart);
    if (auto !== false) autoTour();
  }
  // The tour offers itself once per device. After the opening, it waits for
  // the opening to finish, so the two never stack.
  function autoTour() {
    let seen = true;   // fail closed: if storage is unreadable, do NOT ambush
    try { seen = localStorage.getItem(TOUR_KEY) === "1"; } catch (e) { seen = true; }

    // Only auto-run for a genuinely fresh arrival. Someone opening a shared
    // plan link has come for their results, not for an explainer.
    const arrivingAtPlan = /[#&]p=/.test(location.hash);
    if (!seen && !arrivingAtPlan) {
      setTimeout(function () { if (!tourOpen) tourStart(); }, 900);
    }
  }

  /* ───────────────── wiring ───────────────── */
  function gotoView(t) {
    if (t === "browse") renderBrowse();
    if (t === "countries") renderCountries();
    if (t === "calendar") renderCalendar();
    if (t === "frontiers") $("#frontierGrid").innerHTML = (window.DB.frontiers || []).map(frontierHTML).join("");
    if (t === "routes") $("#routesGrid").innerHTML = (window.DB.specialties || []).map((s) => specialtyHTML(s, null)).join("");
    if (t === "shortlist") renderShortlist();
    showView(t);
    closeMobileNav();
  }
  function bindGoto(root) {
    $$("[data-goto]", root || document).forEach(function (b) {
      if (b.dataset.bound) return;
      b.dataset.bound = "1";
      b.addEventListener("click", function () { gotoView(b.dataset.goto); });
    });
  }

  // Browse with one of its own filters already applied, as if the reader had
  // pressed that filter button themselves.
  function openBrowseWith(filter) {
    countryFilter = ""; regionFilter = null; searchQuery = ""; activeFilter = filter || "all";
    const box = $("#browseSearch");
    if (box) box.value = "";
    renderBrowse();
    showView("browse");
  }

  // A category page's address, read from the footer's own link: build.js
  // rewrites those for the single-file bundle, so this is right in both.
  function pageHref(slug) {
    const a = $$(".foot-map a").find((x) => (x.getAttribute("href") || "").replace(/\/$/, "").split("/").pop() === slug);
    return a ? a.href : slug + "/";
  }

  const NUM_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
  function numberWord(n) { return NUM_WORDS[n] || String(n); }

  /* ───────────────── "What do you want?" ─────────────────
     Ooh's answers to the hero's question. A fixed script: one reply per
     chip, every number counted from the index at the moment it is said, and
     every reply ends in a real place to go. */
  function initWant() {
    const box = $("#want");
    if (!box) return;
    const bubble = $("#wantBubble"), fig = $(".want-ooh", box), go = $("#wantGo");
    const items = function () { return allOpportunities(); };
    const REPLIES = {
      research: function () {
        const n = items().filter((i) => i.stages && (i.stages.indexOf("pre") !== -1 || i.stages.indexOf("clin") !== -1)).length;
        return { lines: [["ooh", fmtNum(n) + " programmes here take students who are still in MBBS."],
                         ["think", "ICMR STS is the best known. Its card has the window and the stipend, so start there."]],
                 go: [{ label: "Show me all " + fmtNum(n), run: function () { openBrowseWith("student"); } }] };
      },
      abroad: function () {
        const n = items().filter((i) => i.funding === "full" && REGIONS.indexOf(i.country) === -1 && i.country !== "India").length;
        return { lines: [["happy", fmtNum(n) + " routes in other countries describe themselves as fully funded."],
                         ["think", "Read each money line: some cover flights and living costs, some only the fees."]],
                 go: [{ label: "Open the fully funded page", href: pageHref("fully-funded") },
                      { label: "Scholarships only", run: function () { openBrowseWith("scholarship"); } }] };
      },
      phd: function () {
        const n = items().filter((i) => i.type === "phd" && ["full", "stipend", "paid"].indexOf(i.funding) !== -1).length;
        return { lines: [["ooh", fmtNum(n) + " doctorates here pay you a stipend or a salary."],
                         ["think", "In Germany, Switzerland and the Nordic countries a doctoral student is usually hired as staff."]],
                 go: [{ label: "Show me the doctorates", run: function () { openBrowseWith("phd"); } }] };
      },
      india: function () {
        // The same filter as the India page (tools/make-pages.js), so Ooh and
        // the page it points to never disagree on the count.
        const n = items().filter((i) => i.country === "India" || (i.country === "Online" && i.indiaSpecific)).length;
        return { lines: [["happy", fmtNum(n) + " routes for exposure in India, from ICMR STS to a paid year in a rural hospital."],
                         ["think", "The India page sorts them into research, rural medicine, policy and free courses."]],
                 go: [{ label: "Open the India page", href: pageHref("india") },
                      { label: "Browse them here", run: function () { openPlace("", { label: ATLAS.india.label, countries: ATLAS.india.countries }); } }] };
      },
      specialty: function () {
        const n = (window.DB.specialties || []).length;
        return { lines: [["think", "There are " + fmtNum(n) + " specialty maps here: the day's work, the NEET-PG route, where each leads."],
                         ["hello", "The three questions match you to your closest three. That takes about a minute."]],
                 go: [{ label: "Answer the three questions", run: function () { startSurvey("short", 0); } },
                      { label: "See all " + fmtNum(n), run: function () { gotoView("routes"); } }] };
      },
      unsure: function () {
        return { lines: [["hello", "That is a fine place to start. Nothing here needs you to know yet."],
                         ["think", "Three questions about you, none about marks. About a minute, then I show you what fits."]],
                 go: [{ label: "Start the three questions", run: function () { startSurvey("short", 0); } }] };
      }
    };
    $$(".want-chip", box).forEach(function (chip) {
      chip.addEventListener("click", function () {
        const reply = REPLIES[chip.dataset.want];
        if (!reply) return;
        $$(".want-chip", box).forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
        const r = reply();
        go.innerHTML = "";
        const showGo = function () {
          go.innerHTML = r.go.map(function (g, i) {
            return g.href
              ? '<a class="btn btn-ghost" href="' + esc(g.href) + '">' + esc(g.label) + "</a>"
              : '<button type="button" class="btn btn-ghost" data-want-go="' + i + '">' + esc(g.label) + "</button>";
          }).join("");
          $$("[data-want-go]", go).forEach(function (b) {
            b.addEventListener("click", function () { r.go[Number(b.dataset.wantGo)].run(); });
          });
        };
        if (window.Ooh) window.Ooh.say(bubble, fig, r.lines, showGo);
        else {
          $(".ooh-typed", bubble).textContent = r.lines.map((l) => l[1]).join(" ");
          showGo();
        }
      });
    });
  }

  /* ───────────────── mobile nav ─────────────────
     Below the collapse breakpoint the primary nav becomes a full-width panel
     toggled by a hamburger button, closed by: picking a destination (via the
     bindGoto hook above), tapping outside it, or Escape. Above the
     breakpoint this is inert — the toggle is hidden and .topnav lays out
     inline as normal, so nothing here runs on desktop. */
  // aria-expanded carries the state, but the accessible NAME is what most
  // screen readers announce on activation — leaving it as "Open menu" while
  // the menu is open describes the wrong action.
  function setNavToggleState(toggle, open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  function closeMobileNav() {
    const nav = $("#topnav"), toggle = $("#navToggle");
    if (!nav || !nav.classList.contains("is-open")) return;
    nav.classList.remove("is-open");
    setNavToggleState(toggle, false);
  }

  function initMobileNav() {
    const nav = $("#topnav"), toggle = $("#navToggle");
    toggle.addEventListener("click", function () {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      setNavToggleState(toggle, open);
    });
    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      closeMobileNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMobileNav();
    });
    // A resize past the breakpoint (rotating to landscape, or a folded/
    // resizable window) shouldn't leave the panel stuck open under desktop
    // layout rules.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeMobileNav();
    });
  }

  function initTheme() {
    const btn = $("#themeToggle");
    let stored = null;
    try { stored = localStorage.getItem("dc-theme"); } catch (e) { /* private mode */ }
    if (stored) document.documentElement.setAttribute("data-theme", stored);
    syncThemeColor();
    btn.addEventListener("click", function () {
      // Space is the default whatever the system says (styles.css, :root), so
      // the first press always goes to daylight.
      const cur = document.documentElement.getAttribute("data-theme") || "dark";
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("dc-theme", next); } catch (e) { /* ignore */ }
      syncThemeColor();
    });
  }

  /* Desktop only: the spotlight in styles.css (.card-in::after) follows the
     pointer across the card under it. One card at a time, one write per
     frame, and nothing at all on touch screens. */
  function initSpotlight() {
    if (!window.matchMedia || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let pending = null, queued = false;
    document.addEventListener("pointermove", function (e) {
      const core = e.target && e.target.closest ? e.target.closest(".card-in") : null;
      if (!core) return;
      pending = { core: core, x: e.clientX, y: e.clientY };
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        queued = false;
        const r = pending.core.getBoundingClientRect();
        pending.core.style.setProperty("--mx", (pending.x - r.left).toFixed(0) + "px");
        pending.core.style.setProperty("--my", (pending.y - r.top).toFixed(0) + "px");
      });
    }, { passive: true });
  }

  /* The first time the galaxy's sound starts on this device, say so and say
     how to stop it. Once only: after that the speaker button speaks for it. */
  let soundNoticeWaiting = false;
  function initSoundNotice() {
    window.addEventListener("dcsound", function (e) {
      if (!e.detail || !e.detail.on || !e.detail.first) return;
      // Started by the opening's Begin: say it once the page is back.
      if (window.DCIntro && window.DCIntro.on()) { soundNoticeWaiting = true; return; }
      soundNotice();
    });
  }
  function soundNotice() {
    let told = null;
    try { told = localStorage.getItem("dc-sound-told"); } catch (err) { /* private mode */ }
    if (told) return;
    try { localStorage.setItem("dc-sound-told", "1"); } catch (err) { /* ignore */ }
    toast("Galaxy sound is on. Turn it off with the speaker button at the top.");
  }

  // The page is back after the opening: the hero globe starts (already on
  // India, where the opening landed), the tour may offer itself, and the
  // sound notice the opening's Begin earned is said now that it can be seen.
  // After a Skip the reader never saw the landing, so the hero globe makes
  // its own small turn to India, and the tour waits for a visit where the
  // opening was watched: a Skip answered by a second guided thing is the
  // opposite of what Skip was for (Ronak's rule). "Take the tour" stays in
  // the hero.
  function afterOpening(skipped) {
    initHeroGlobe(!skipped);
    if (!skipped) autoTour();
    if (soundNoticeWaiting) { soundNoticeWaiting = false; soundNotice(); }
  }

  /* The theme-color metas follow the SYSTEM scheme through their media
     attributes, so a reader who picked the other theme by hand got a light
     browser bar over a dark page. Once a theme is chosen, both metas take that
     theme's ground, read from the token so it cannot drift from styles.css. */
  function syncThemeColor() {
    if (!document.documentElement.getAttribute("data-theme")) return;
    const bg = getComputedStyle(document.documentElement).getPropertyValue("--paper").trim();
    if (!bg) return;
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) { m.setAttribute("content", bg); });
  }

  /* The globe is an enhancement, never the only route: picking a country just
     drives the same search the Browse box does, so nothing here is reachable
     only by pointing at a canvas. */
  function openPlace(country, region) {
    countryFilter = country || "";
    regionFilter = region || null;
    searchQuery = "";
    activeFilter = "all";
    const box = $("#browseSearch");
    if (box) box.value = "";
    renderBrowse();
    showView("browse");
  }

  function initHeroGlobe(afterOpening) {
    const canvas = $("#globeCanvas");
    if (!canvas || typeof window.initGlobe !== "function") return;
    // On html.lite phones the globe holds still until touched: no intro, no
    // idle spin, so a 2GB phone spends nothing on it while the reader reads.
    // After the opening, which has just landed on India, it opens there too
    // rather than turning round to it a second time.
    const lite = document.documentElement.classList.contains("lite");
    const globe = window.initGlobe(canvas, $("#globeLabel"), function (country) { openPlace(country, null); }, { intro: !lite && !afterOpening, autoSpin: !lite });
    // Theme switches change every colour the globe draws with.
    if (globe) {
      const btn = $("#themeToggle");
      if (btn) btn.addEventListener("click", function () { setTimeout(globe.redraw, 30); });
    }
  }

  /* ───────────────── atlas ─────────────────
     The regions the scroll chapter walks through. `countries` are exact
     item.country values, so each region's count is the same number Browse
     shows after the button is pressed. `focus` is where the globe turns.
     The last region has no single place, so it highlights nothing and turns
     to Geneva, where most of the organisations in it sit. */
  const ATLAS = {
    india:    { label: "India", countries: ["India"], focus: [21, 78] },
    uk:       { label: "the UK and Ireland", countries: ["UK", "Ireland"], focus: [53.5, -4] },
    europe:   { label: "Europe", focus: [50, 12], countries: [
                "Germany", "Switzerland", "France", "Netherlands", "Nordics", "Sweden", "Norway", "Denmark",
                "Czechia", "Baltics", "Belgium", "Spain", "Lithuania", "Poland", "Hungary", "Italy",
                "Portugal", "Austria", "Russia", "Europe"] },
    americas: { label: "the USA and Canada", countries: ["USA", "Canada"], focus: [42, -96] },
    anz:      { label: "Australia and New Zealand", countries: ["Australia", "New Zealand"], focus: [-32, 150] },
    // Africa rides with this step because the index holds a single African
    // entry, too thin for a step of its own, and leaving it out of every
    // region made it the one programme the atlas could not reach. The focus
    // sits over the Arabian Sea so Japan, Israel and South Africa all stay on
    // the visible hemisphere.
    asia:     { label: "Asia beyond India, and Africa", focus: [10, 75], countries: [
                "Japan", "China", "Hong Kong", "South Korea", "Taiwan", "Singapore", "Thailand", "Asia", "Bangladesh",
                "Israel", "Turkey", "Gulf", "South Africa"] },
    global:   { label: "no single country", countries: ["Global", "Any", "Online"], focus: [46.2, 6.1], highlight: false }
  };

  function atlasStats(region) {
    const list = allOpportunities().filter((i) => region.countries.indexOf(i.country) !== -1);
    const funded = list.filter((i) => ["full", "free", "stipend", "paid"].indexOf(i.funding) !== -1).length;
    const open = list.filter((i) => urgency(i) === "open").length;
    // The one to read first: best tier, and among equals the one open now.
    const pick = list.slice().sort(function (a, b) {
      return impactOf(a).t - impactOf(b).t ||
        (urgency(b) === "open") - (urgency(a) === "open") ||
        a.name.localeCompare(b.name);
    })[0];
    return { total: list.length, funded: funded, open: open, pick: pick };
  }

  function initAtlas() {
    const section = $("#atlas");
    const steps = $$(".atlas-step");
    if (!section || !steps.length) return;

    steps.forEach(function (step) {
      const region = ATLAS[step.dataset.region];
      if (!region) return;
      const s = atlasStats(region);
      ["total", "funded", "open"].forEach(function (k) {
        const el = step.querySelector('[data-stat="' + k + '"]');
        if (el) el.textContent = fmtNum(s[k]);
      });
      const pickEl = step.querySelector('[data-stat="pick"]');
      if (pickEl && s.pick) {
        pickEl.innerHTML = "Highest-graded here: <b>" + esc(s.pick.name) + "</b>, tier " + impactOf(s.pick).t +
          (urgency(s.pick) === "open" ? ", with its window open now." : ".");
      }
      const go = step.querySelector("[data-region-go]");
      if (go) go.addEventListener("click", function () {
        openPlace("", { label: region.label, countries: region.countries });
      });
    });

    const canvas = $("#atlasCanvas");
    const globe = canvas && typeof window.initGlobe === "function"
      ? window.initGlobe(canvas, null, function (country) { openPlace(country, null); }, { autoSpin: false })
      : null;
    // Without a globe the chapter is still a complete list of regions; the
    // empty stage would only be a hole in the page.
    if (!globe) { section.classList.add("no-globe"); return; }
    const btn = $("#themeToggle");
    if (btn) btn.addEventListener("click", function () { setTimeout(globe.redraw, 30); });

    let current = null;
    function activate(step) {
      if (step === current) return;
      current = step;
      steps.forEach((s) => s.classList.toggle("is-active", s === step));
      const region = ATLAS[step.dataset.region];
      if (region) globe.focus(region.focus[0], region.focus[1], region.highlight === false ? null : region.countries);
    }
    activate(steps[0]);
    if (!("IntersectionObserver" in window)) return;
    // A thin band just below the middle of the viewport: the region whose text
    // is crossing it is the one on the globe. On a phone that band sits just
    // under the sticky globe, which is exactly where the eye is reading.
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) activate(en.target); });
    }, { rootMargin: "-50% 0px -44% 0px", threshold: 0 });
    steps.forEach((s) => io.observe(s));
  }

  /* The review stamp. Rendered from data rather than written into the HTML in
     two places, so the footer and the calendar can never disagree about how
     fresh this is. If the meta is missing the stamp says so plainly instead of
     rendering an empty reassuring blank — an unstamped page should look
     unstamped. */
  function renderReviewed() {
    const meta = (window.DB && window.DB.meta) || null;
    const targets = [
      [$("#reviewedFoot"), true],
      [$("#reviewedCal"), false]
    ];
    targets.forEach(function (pair) {
      const el = pair[0];
      if (!el) return;
      if (!meta || !meta.reviewedLabel) {
        el.textContent = "These entries carry no review date, so treat every figure as unverified.";
        return;
      }
      el.textContent = pair[1]
        ? "Entries last checked against their official pages in " + meta.reviewedLabel + ". " + (meta.scope || "")
        : "Last checked " + meta.reviewedLabel + " — confirm any date below on the official page before you plan around it.";
    });
  }

  /* Registers the offline worker, and does nothing at all when it cannot.
     Three cases have to stay quiet rather than throwing a console error:
     a file:// open (service workers need a secure origin), a browser without
     support, and the single-file bundle — build.js strips the manifest link,
     so its absence is the signal that there is no sw.js beside us either. */
  /* Meeting the install requirements is not the same as being installable by
     the person holding the phone. Chrome buries "Add to Home screen" in the ⋮
     menu behind a passive address-bar hint, and iOS Safari never prompts at
     all — you have to know to tap Share and scroll. So the offer is made on
     the page, out loud.

     Two routes, because the platforms genuinely differ:
       Chromium fires beforeinstallprompt, which can be saved and replayed
       from a real click. That is the only way to get the native dialogue.
       iOS fires nothing and exposes no API, so the button spells out the
       actual taps rather than pretending it can do it for you.
     Anything else (desktop Firefox, an in-app webview) gets no button at
     all — an install control that cannot install is worse than none. */
  let deferredInstall = null;

  function isStandalone() {
    return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true;
  }

  /* iPadOS reports itself as MacIntel, so the touch-point count is what
     separates an iPad from a desktop Mac. */
  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }

  function installAvailable() {
    const line = $("#installLine");
    return !!(line && !line.hidden);
  }

  function showInstallLine(mode) {
    const line = $("#installLine");
    if (!line || isStandalone()) return;
    line.hidden = false;
    line.dataset.mode = mode;
    renderTourNote();
  }

  function hideInstallLine() {
    const line = $("#installLine");
    if (line) line.hidden = true;
    renderTourNote();
  }

  function initInstall() {
    const line = $("#installLine"), btn = $("#installBtn"), steps = $("#installSteps");
    if (!line || !btn || !steps) return;
    // Nothing to offer inside the installed app, or in the bundle, which has
    // no manifest beside it.
    if (isStandalone()) return;
    if (!document.querySelector('link[rel="manifest"]')) return;

    window.addEventListener("beforeinstallprompt", function (e) {
      // Suppress Chrome's own mini-infobar so this button is the single place
      // the offer is made.
      e.preventDefault();
      deferredInstall = e;
      showInstallLine("prompt");
    });

    if (isIOS()) showInstallLine("ios");

    btn.addEventListener("click", function () {
      if (line.dataset.mode === "prompt" && deferredInstall) {
        const evt = deferredInstall;
        deferredInstall = null;
        evt.prompt();
        evt.userChoice.then(function (choice) {
          if (choice && choice.outcome === "accepted") hideInstallLine();
          else showInstallLine("prompt");   // let them change their mind
        }).catch(function () {});
        return;
      }
      // iOS: no API exists, so name the taps.
      const open = !steps.hidden;
      steps.hidden = open;
      btn.setAttribute("aria-expanded", String(!open));
      if (!open && !steps.childNodes.length) {
        steps.appendChild(document.createTextNode("In Safari, tap "));
        const share = document.createElement("b");
        share.textContent = "Share";
        steps.appendChild(share);
        steps.appendChild(document.createTextNode(" at the bottom of the screen, scroll down, then tap "));
        const add = document.createElement("b");
        add.textContent = "Add to Home Screen";
        steps.appendChild(add);
        steps.appendChild(document.createTextNode(". Chrome on iPhone cannot do this; Safari can."));
      }
    });

    window.addEventListener("appinstalled", function () {
      deferredInstall = null;
      hideInstallLine();
    });
  }

  function initServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    if (!document.querySelector('link[rel="manifest"]')) return;
    // isSecureContext is the browser's own answer to "can a worker run here",
    // and it covers https, localhost AND 127.0.0.1 — a hand-rolled hostname
    // check missed the loopback IP and silently disabled the worker in local
    // testing. file:// is excluded separately: some builds report it as a
    // secure context, but register() still rejects there, and the resulting
    // console error would be noise on every local open of index.html.
    if (location.protocol === "file:") return;
    if (!window.isSecureContext) return;
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {
        /* Offline support is a bonus; the site works without it. */
      });
    });
  }

  /* A page that was opened during an outage can outlive the outage.
     Chromium keeps a document's subresources in the renderer's own memory
     cache, and that cache is consulted BEFORE the service worker, so an
     in-place reload after the signal returns can still run the data files
     from the offline session. Measured here, not assumed: with the server
     stopped and restarted, reload, second reload and a same-URL navigation
     all kept serving the old copy, while a fresh tab came back correct.

     The first attempt at fixing this asked the network what the review stamp
     said now, and it made things WORSE. Fetching data-meta.js was enough to
     invalidate that one entry, so the next reload picked up a new stamp while
     every programme file stayed on the old copy: a freshly-dated page
     certifying last month's deadlines. Measuring by fetching changed the
     thing being measured.

     Detecting it is harder than it looks. Two signals were tried and both
     were wrong. Resource Timing's deliveryType == "cache-storage" is too
     narrow: once the HTTP cache has the file it reports "cache" instead, and
     a genuinely stale page slips through. Re-fetching data-meta.js normally
     is worse than useless, because the fetch REPLACES that one cache entry,
     so the next reload picks up a new review stamp while every programme file
     stays old. That is a page confidently certifying last month's deadlines,
     and it is the single worst state this site can be in.

     cache:"no-store" was not the way out either — Chromium still drops the
     existing entry, and the split-brain came straight back.

     What works is asking under a DIFFERENT URL. A query string makes a
     separate cache key, so fetching assets/data-meta.js?fresh=1 cannot
     replace the entry behind assets/data-meta.js no matter how it is cached.
     The worker leaves any ?fresh= request alone so nothing is stored under
     the probe URL either. Compare the stamp it reports against the one this
     document is running on: if they differ, this document is a saved copy,
     whatever route it arrived by. */
  function initFreshnessCheck() {
    if (!("serviceWorker" in navigator)) return;
    if (!navigator.serviceWorker.controller) return;
    const running = (window.DB && window.DB.meta && window.DB.meta.reviewed) || null;
    if (!running) return;

    function check() {
      if ($("#staleBar")) return;
      if (!navigator.onLine) return;
      fetch("assets/data-meta.js?fresh=1&t=" + Date.now(), { cache: "no-store" })
        .then(function (r) { return r.ok ? r.text() : null; })
        .then(function (src) {
          if (!src) return;
          const m = src.match(/reviewed:\s*"([^"]+)"/);
          if (m && m[1] !== running) showStaleBar();
        })
        .catch(function () { /* still offline, or the probe failed: say nothing */ });
    }

    /* Recovery is fiddlier than it looks, and two obvious moves both failed a
       real outage test. A plain location.reload() re-runs the same cached
       files. Navigating to a cache-busting URL (index.html?r=…) changes only
       the DOCUMENT's address, while every script tag still points at the same
       assets/*.js and is answered from the same store, so the page comes back
       just as stale with a tidier URL.

       What does work is re-requesting each file with cache:"reload", which
       goes past both the memory cache and the HTTP cache and replaces the
       entry, and only then reloading. It costs a full re-download of the
       index, which is why it is behind an explicit tap rather than automatic. */
    function showStaleBar() {
      if ($("#staleBar")) return;
      const bar = document.createElement("div");
      bar.id = "staleBar";
      bar.className = "stale-bar";
      bar.setAttribute("role", "status");
      const msg = document.createElement("span");
      msg.textContent = "You are reading a copy saved while you were offline. Deadlines may have moved since.";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "stale-bar-btn";
      btn.textContent = "Load the current version";
      btn.addEventListener("click", function () {
        btn.disabled = true;
        btn.textContent = "Loading\u2026";
        const urls = [];
        for (let i = 0; i < document.scripts.length; i++) {
          if (document.scripts[i].src) urls.push(document.scripts[i].src);
        }
        const link = document.querySelector('link[rel="stylesheet"], link[rel="preload"][as="style"]');
        if (link && link.href) urls.push(link.href);
        Promise.all(urls.map(function (u) {
          return fetch(u, { cache: "reload" }).catch(function () {});
        })).then(function () { location.reload(); });
      });
      bar.appendChild(msg);
      bar.appendChild(btn);
      document.body.appendChild(bar);
    }

    check();
    window.addEventListener("online", check);
  }

  function init() {
    initServiceWorker();
    initInstall();
    renderTourNote();
    initFreshnessCheck();
    renderStats();
    renderReviewed();
    initTheme();
    initSoundNotice();
    initSpotlight();
    initMobileNav();
    // A new visit opens on the opening (intro.js). The hero globe and the
    // tour wait for it, so neither runs unseen underneath it.
    const opening = !!(window.DCIntro && window.DCIntro.start({ exclude: REGIONS, done: afterOpening }));
    if (!opening) initHeroGlobe(false);
    initAtlas();
    initWant();
    bindGoto(document);
    initTour(!opening);
    loadShortlist();
    updateShortlistCount();

    // One delegated listener covers every star button on every card, in every
    // view, present now or rendered later — no per-card rewiring needed.
    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".star-btn");
      if (!btn) return;
      const id = btn.dataset.star;
      const wasSaved = isShortlisted(id);
      toggleShortlist(id);
      if ($("#view-shortlist").classList.contains("is-active")) renderShortlist();
      if (!wasSaved) { sfx("gamma"); fxAt("gamma", btn); return; }
      // Removing is the destructive direction, so it can be taken back.
      sfx("fade");
      const item = allOpportunities().find((i) => i.id === id);
      toast("Removed " + (item ? item.name : "it") + " from your shortlist.", {
        label: "Undo",
        run: function () {
          if (!isShortlisted(id)) toggleShortlist(id);
          if ($("#view-shortlist").classList.contains("is-active")) renderShortlist();
          sfx("gamma");
        }
      });
    });

    $("#startBtn").addEventListener("click", function () { startSurvey("short", 0); });
    const startFull = $("#startFullBtn");
    if (startFull) startFull.addEventListener("click", function () { startSurvey("full", 0); });
    const startShort2 = $("#startShortBtn2");
    if (startShort2) startShort2.addEventListener("click", function () { startSurvey("short", 0); });
    $("#brandHome").addEventListener("click", function (e) { e.preventDefault(); showView("intro"); closeMobileNav(); });

    // Wired once: these inputs live in the static shell (not inside the
    // #filters/#browseCards nodes renderBrowse() replaces), so re-rendering
    // the list on every keystroke never disturbs focus or cursor position.
    initSearchBox();
    initDoors();
    const cxSel = $("#cxSort");
    if (cxSel) cxSel.addEventListener("change", function () { cxSort = this.value; renderCountries(); });
    window.addEventListener("popstate", routeFromHash);

    $("#nextBtn").addEventListener("click", function () {
      if (qIndex === activeQuestions().length - 1) {
        renderResults(); showView("results");
        if (window.DCSpace) window.DCSpace.burst("chain", window.innerWidth / 2, 150);
        return;
      }
      sfx("alpha");
      fxAt("beta", $("#nextBtn"));
      qIndex++; renderQuestion();
    });
    $("#backBtn").addEventListener("click", function () {
      if (qIndex > 0) { qIndex--; renderQuestion(); }
    });

    // An address naming a view (#countries, or #browse from a category page)
    // opens that view. Otherwise a returning visitor, or someone opening a
    // shared link, lands on their plan.
    const hashView = (location.hash || "").replace(/^#/, "");
    if (ROUTED.indexOf(hashView) !== -1) {
      restore();   // your answers still inform Deadlines' year and the like
      fromHistory = true;
      try { gotoView(hashView); } finally { fromHistory = false; }
    } else if (restore()) {
      renderResults();
      showView("results");
      const note = $("#saveNote");
      if (note) note.textContent =
        "Picked up where you left off — these are the answers you gave last time. " +
        "Answer again to change any of them.";
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
