/* ════════════════════════════════════════════════════════
   Dream Counsellor — survey, matching engine, rendering.
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

  /* ───────────────── the survey ───────────────── */
  const QUESTIONS = [
    {
      id: "skills", act: "Question one of three", type: "multi", free: true,
      title: "What do people come to you for?",
      help: "Not what you score well in. What people actually knock on your door about — the thing you do so easily you have stopped noticing it is a skill. <em>Pick everything that is true.</em>",
      placeholder: "In your own words — what do people ask you for?",
      options: [
        { v: "execute",  t: "Getting things actually done",       d: "You are the one who finishes it", f: ["systems"] },
        { v: "findopps", t: "Knowing where the opportunities are", d: "People ask you what to apply for", f: ["global"] },
        { v: "lead",     t: "Leading and speaking",               d: "Rooms where communication carries weight", f: ["systems","global"] },
        { v: "listen",   t: "Listening when someone falls apart", d: "People tell you things they tell nobody else", f: ["psych","clinical"] },
        { v: "explain",  t: "Explaining hard things simply",      d: "You are the one who makes it click", f: ["global","pubhealth"] },
        { v: "build",    t: "Building or fixing things",          d: "Code, tools, systems, machines", f: ["compbio"] },
        { v: "numbers",  t: "Numbers and spotting patterns",      d: "You see the thing in the data", f: ["compbio","pubhealth"] },
        { v: "write",    t: "Writing",                            d: "People send you their drafts", f: ["global"] },
        { v: "calm",     t: "Staying calm when it goes wrong",    d: "You are who they want in an emergency", f: ["clinical"] },
        { v: "connect",  t: "Introducing people to each other",   d: "You are the node in the network", f: ["global","systems"] }
      ]
    },
    {
      id: "anger", act: "Question two of three", type: "multi", free: true,
      title: "What angers you about this world?",
      help: "Anger is the most reliable compass anyone has. The thing that makes you furious at 2 a.m. is the thing you will still care about in fifteen years, when the prestige has worn off. <em>Be honest rather than noble.</em>",
      placeholder: "What actually makes you angry?",
      options: [
        { v: "stigma",   t: "Mental illness treated as weakness",        d: "Stigma, silence, and families who will not name it", f: ["psych","global"] },
        { v: "prevent",  t: "People dying of things we know how to stop", d: "The gap between the guideline and the ward", f: ["pubhealth","infect","global"] },
        { v: "money",    t: "Healthcare only for those who can pay",     d: "Care rationed by bank balance", f: ["pubhealth","systems","global"] },
        { v: "caste",    t: "Caste and class deciding who lives",        d: "Whose body counts as worth studying", f: ["pubhealth","genomics","global"] },
        { v: "women",    t: "Women's health treated as a footnote",      d: "Half the population, a fraction of the research", f: ["repro","pubhealth"] },
        { v: "eurocent", t: "Science built entirely on other populations", d: "Every model trained somewhere that is not here", f: ["genomics","compbio"] },
        { v: "systemic", t: "Corruption and systems that do not work",    d: "Drains that flood, files that vanish", f: ["systems","global"] },
        { v: "climate",  t: "Air, heat and a poisoned environment",       d: "The health cost nobody counts", f: ["env","pubhealth"] },
        { v: "unsolved", t: "Diseases nobody has solved yet",             d: "We still do not know what schizophrenia is", f: ["biochem","neuro","genomics","onco"] },
        { v: "misinfo",  t: "Confident nonsense drowning out evidence",   d: "Misinformation as a health emergency", f: ["global","pubhealth"] },
        { v: "mentor",   t: "Talent wasted for lack of a single mentor",  d: "Brilliant people with nobody to open a door", f: ["global","systems"] }
      ]
    },
    {
      id: "flow", act: "Question three of three", type: "multi", free: true,
      title: "What makes time stop?",
      help: "The task where you look up and three hours have gone. Flow is not a mood, it is data — it tells you which <em>method</em> you belong in, regardless of which subject you love.",
      placeholder: "When did you last lose track of time completely?",
      options: [
        { v: "building", t: "Building something that works",       d: "Code, a tool, a thing that runs", f: ["compbio"] },
        { v: "reading",  t: "Falling down a paper at 1 a.m.",      d: "One citation leads to the next", f: ["biochem","neuro","genomics"] },
        { v: "patient",  t: "A proper conversation with a patient", d: "The history nobody else took", f: ["clinical","psych"] },
        { v: "teaching", t: "Teaching someone until they get it",   d: "The moment their face changes", f: ["global","pubhealth"] },
        { v: "organis",  t: "Organising something into existence",  d: "An event, a drive, a team", f: ["systems","global"] },
        { v: "writing",  t: "Writing until the argument is right",  d: "Sentence by sentence", f: ["global"] },
        { v: "hands",    t: "Working with my hands in a lab",       d: "Pipettes, slides, protocols", f: ["biochem","genomics"] },
        { v: "data",     t: "Finding the pattern in a dataset",     d: "The plot that finally makes sense", f: ["compbio","pubhealth"] },
        { v: "arguing",  t: "Arguing an idea out with someone",     d: "Until one of you changes your mind", f: ["global","systems"] },
        { v: "designing",t: "Designing a study properly",           d: "Sample size, controls, confounders", f: ["pubhealth","compbio"] }
      ]
    },
    {
      id: "stage", act: "Where you are", type: "single",
      title: "Where are you right now?",
      help: "This is the single hardest filter. Several of the best programmes on this site are open <em>only</em> to students in the first two years and close permanently afterwards.",
      options: [
        { v: "pre",    t: "1st or 2nd professional MBBS", d: "The widest window you will ever have" },
        { v: "clin",   t: "3rd or final professional MBBS", d: "International research internships open up here" },
        { v: "intern", t: "Internship year", d: "Experience starts counting toward the big scholarships" },
        { v: "grad",   t: "MBBS complete", d: "Masters, funded PhDs and residency routes all open" },
        { v: "pg",     t: "Post-MD / MS / DNB", d: "Fellowships and independent research funding" }
      ]
    },
    {
      id: "age", act: "Where you are", type: "single",
      title: "How old are you?",
      help: "Several major scholarships have hard age ceilings that nobody mentions until you are already invested — Rhodes, MEXT, Inlaks and the national overseas schemes all cap.",
      options: [
        { v: "u21", t: "Under 21", d: "Every age-capped scheme is open to you" },
        { v: "2124", t: "21 to 24", d: "Rhodes and Inlaks still within reach" },
        { v: "2529", t: "25 to 29", d: "Rhodes closes; most others remain open" },
        { v: "3034", t: "30 to 34", d: "MEXT and Swiss schemes still open" },
        { v: "35p", t: "35 or older", d: "Focus on merit-based and fellowship routes" }
      ]
    },
    {
      id: "money", act: "What is actually possible", type: "single",
      title: "Be honest about money.",
      help: "This changes the entire answer, and there is no wrong reply. Roughly a third of everything indexed here costs nothing at all and pays for your travel. If money is tight, that is a filter, not a disqualification.",
      options: [
        { v: "none",    t: "I cannot pay anything", d: "Show me only what is free or fully funded, including travel" },
        { v: "small",   t: "I could find ₹1–3 lakh", d: "Exam fees, applications, maybe a short trip" },
        { v: "loan",    t: "I would take an education loan", d: "Show me the arithmetic honestly too" },
        { v: "family",  t: "My family can support a degree abroad", d: "Full range, funded routes still preferred" }
      ]
    },
    {
      id: "category", act: "What is actually possible", type: "single",
      title: "Do any of these apply to you?",
      help: "Asked only because the Government of India runs fully-funded overseas scholarships for specific categories that go <em>unclaimed</em> most years. Skip if you would rather not say — nothing is stored anywhere.",
      options: [
        { v: "sc",   t: "Scheduled Caste / DNT / landless labourer family", d: "National Overseas Scholarship — full funding, under-subscribed" },
        { v: "st",   t: "Scheduled Tribe", d: "Ministry of Tribal Affairs overseas scheme, ~20 awards a year" },
        { v: "obc",  t: "OBC / EWS / minority community", d: "Loan interest subsidy and national fellowships" },
        { v: "gen",  t: "None of these", d: "Everything else on this site still applies" },
        { v: "skip", t: "Prefer not to say", d: "" }
      ]
    },
    {
      id: "abroad", act: "What is actually possible", type: "single",
      title: "Do you actually want to leave India?",
      help: "There is a real answer here that is not 'yes'. NIMHANS, AIIMS, IISc and NCBS produce internationally cited work, and India Alliance funds clinicians to lead their own research without a doctorate.",
      options: [
        { v: "yes",    t: "Yes — that is the plan", d: "Show me the world" },
        { v: "funded", t: "Only if someone else pays", d: "Fully funded routes only" },
        { v: "short",  t: "Short trips yes, moving no", d: "Summer programmes, exchanges, conferences" },
        { v: "india",  t: "I want to build something here", d: "Domestic routes, remote work, Indian funding" },
        { v: "unsure", t: "Genuinely do not know yet", d: "Show me both and let me decide later" }
      ]
    },
    {
      id: "countries", act: "What is actually possible", type: "multi",
      title: "Anywhere you already know you want — or do not want?",
      help: "Leave this blank and the country ranking will be worked out for you from your climate, food, community and budget answers instead.",
      options: [
        { v: "UK", t: "United Kingdom", d: "One-year masters, Chevening, Commonwealth" },
        { v: "USA", t: "United States", d: "Funded PhDs, the Match, highest ceiling" },
        { v: "Germany", t: "Germany", d: "No tuition, salaried doctorates" },
        { v: "Australia", t: "Australia", d: "Warm, tax-free stipends, easy landing" },
        { v: "Canada", t: "Canada", d: "Clearest immigration pathway" },
        { v: "Netherlands", t: "Netherlands", d: "All English, strong epidemiology" },
        { v: "Sweden", t: "Sweden", d: "Karolinska, fully funded, very dark winters" },
        { v: "Switzerland", t: "Switzerland", d: "Highest-paid doctorates on earth" },
        { v: "France", t: "France", d: "Nearly free tuition, Charpak for Indians" },
        { v: "Ireland", t: "Ireland", d: "English, two-year work visa, lower cost" },
        { v: "Singapore", t: "Singapore", d: "Close to home, warm, easy food" },
        { v: "Japan", t: "Japan", d: "MEXT pays for everything" },
        { v: "Israel", t: "Israel", d: "Weizmann summer school, fully funded" },
        { v: "Hungary", t: "Hungary", d: "200 funded Indian places a year" },
        { v: "Russia", t: "Russia", d: "Won by exam, not by essays" },
        { v: "India", t: "India", d: "Staying, deliberately" }
      ]
    },
    {
      id: "cold", act: "Can you actually live there", type: "single",
      title: "How do you handle cold and darkness?",
      help: "This is not a soft question. Stockholm gets six hours of grey light in December, and a degree you abandon in March because you cannot get out of bed is worth nothing.",
      options: [
        { v: "love",  t: "I love the cold", d: "Snow is a feature, not a bug" },
        { v: "fine",  t: "I can manage it", d: "Not my favourite, not a problem" },
        { v: "hard",  t: "I struggle, but I would cope", d: "Prefer milder places" },
        { v: "cant",  t: "Cold and darkness genuinely affect me", d: "Warm countries and long daylight only" }
      ]
    },
    {
      id: "health", act: "Can you actually live there", type: "multi",
      title: "Anything your body needs you to plan around?",
      help: "Melbourne has thunderstorm asthma. Japan has a cedar pollen season that floors newcomers. Japanese cooking puts fish stock in food that looks vegetarian. These are the things prospectuses never mention.",
      options: [
        { v: "asthma",  t: "Asthma or breathing problems", d: "Pollen and air-quality warnings will be flagged" },
        { v: "pollen",  t: "Bad hay fever or allergies", d: "Birch, cedar and ragweed seasons matter" },
        { v: "veg",     t: "Vegetarian", d: "Some countries make this hard" },
        { v: "jain",    t: "Jain or strictly vegetarian", d: "Significantly narrows practical options" },
        { v: "halal",   t: "Halal", d: "Availability varies sharply by city" },
        { v: "chronic", t: "A chronic condition needing regular care", d: "Health system access will be flagged" },
        { v: "mh",      t: "I have needed mental health support before", d: "Support availability will be weighted heavily" },
        { v: "none",    t: "Nothing to plan around", d: "" }
      ]
    },
    {
      id: "emotional", act: "Can you actually live there", type: "multi",
      title: "What do you need around you to be okay?",
      help: "The people who come home early rarely come home because the work was too hard. They come home because they were alone in a grey city for eight months.",
      options: [
        { v: "family",   t: "To be able to get home quickly", d: "Flight time and cost weighted heavily" },
        { v: "community",t: "Other Indians around me", d: "Diaspora size weighted" },
        { v: "warmpeople", t: "People who are easy to befriend", d: "Some cultures are much harder to enter" },
        { v: "support",  t: "Mental health support I can actually reach", d: "Waiting lists and language matter" },
        { v: "light",    t: "Daylight and sun", d: "Winter darkness weighted heavily" },
        { v: "alone",    t: "I am genuinely fine on my own", d: "Widens the map considerably" }
      ]
    },
    {
      id: "english", act: "Practicalities", type: "single",
      title: "Where are you with English tests and a passport?",
      help: "IELTS or TOEFL and a valid passport are the two things that quietly delay applications by months. Both take longer than people expect.",
      options: [
        { v: "both",  t: "Passport and test both done", d: "You can apply to anything today" },
        { v: "pass",  t: "Passport yes, test not yet", d: "Book the test — results take 2 weeks" },
        { v: "test",  t: "Test done, no passport", d: "Passport takes 3–6 weeks, apply now" },
        { v: "none",  t: "Neither yet", d: "Start both this month; nothing else moves without them" }
      ]
    },
    {
      id: "time", act: "Practicalities", type: "single",
      title: "Realistically, how much time do you have each week?",
      help: "Not the time you wish you had. The plan that works is the one built for your bad weeks, not your best ones.",
      options: [
        { v: "t2",  t: "Under 2 hours", d: "Exams are eating everything right now" },
        { v: "t5",  t: "About 5 hours", d: "Enough for one thread, done properly" },
        { v: "t10", t: "Around 10 hours", d: "A project and a course together" },
        { v: "t20", t: "20 hours or more", d: "Vacation, gap, or post-internship" }
      ]
    },
    {
      id: "record", act: "Practicalities", type: "multi",
      title: "What do you already have?",
      help: "This decides what you are competitive for <em>today</em> versus what you should be building toward. Tick nothing if the answer is nothing — that is the normal starting point and it is fine.",
      options: [
        { v: "project",  t: "A research project running", d: "Even unfinished" },
        { v: "pub",      t: "A publication or accepted abstract", d: "Any journal, any conference" },
        { v: "code",     t: "I can write some code", d: "Python or R, even badly" },
        { v: "poster",   t: "Presented at a conference", d: "National counts" },
        { v: "lead",     t: "Organised or led something real", d: "An event, a drive, a society" },
        { v: "mentor",   t: "A faculty member who would back me", d: "The rarest and most valuable item here" },
        { v: "lang",     t: "A second language beyond English and Hindi", d: "German, French or Japanese especially" },
        { v: "nothing",  t: "None of this yet", d: "Then that is exactly where we start" }
      ]
    },
    {
      id: "horizon", act: "Practicalities", type: "single",
      title: "When do you want to be somewhere else?",
      help: "Application cycles run 12 to 18 months ahead of the start date. Whatever you answer here, the work begins about a year earlier than feels natural.",
      options: [
        { v: "now",  t: "This year, if possible", d: "Focus on what is open right now" },
        { v: "y1",   t: "Within a year or two", d: "The realistic planning horizon" },
        { v: "y3",   t: "Three to five years out", d: "Build the record now, apply later" },
        { v: "open", t: "No fixed timeline", d: "Show me the whole map" }
      ]
    }
  ];

  /* ───────────────── state ───────────────── */
  const answers = {};
  let qIndex = 0;

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
    const p = {
      fields: {},          // field -> weight
      stage: answers.stage || "pre",
      age: answers.age || "2124",
      money: answers.money || "family",
      category: answers.category || "skip",
      abroad: answers.abroad || "unsure",
      countries: answers.countries || [],
      cold: answers.cold || "fine",
      health: answers.health || [],
      emotional: answers.emotional || [],
      english: answers.english || "none",
      time: answers.time || "t5",
      record: answers.record || [],
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
    return p;
  }

  /* ───────────────── deadline urgency ───────────────── */
  function urgency(item) {
    const m = new Date().getMonth() + 1;
    if (!item.deadlineMonths || !item.deadlineMonths.length) return "always";
    if (item.deadlineMonths.length >= 12) return "always";
    if (item.deadlineMonths.indexOf(m) !== -1) return "open";
    const next = (m % 12) + 1, next2 = (next % 12) + 1;
    if (item.deadlineMonths.indexOf(next) !== -1 || item.deadlineMonths.indexOf(next2) !== -1) return "soon";
    return "closed";
  }
  const URG_TEXT = { open: "Window open now", soon: "Opens soon", closed: "Next cycle", always: "Rolling / always open" };

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
      reasons.push("needs " + item.workExp + " years' experience — this is a later target");
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
      else if (u === "closed") s -= 8;
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
    open += ". Those two together are not a mood — they are a specification.";
    if (f1 && f2) {
      open += " They point at <strong>" + esc(FIELDS[f1].toLowerCase()) + "</strong> sitting against <strong>" +
        esc(FIELDS[f2].toLowerCase()) + "</strong>";
      if (f3) open += ", with <strong>" + esc(FIELDS[f3].toLowerCase()) + "</strong> underneath";
      open += ".";
    }
    paras.push(open);

    // the honest structural read
    let mid = "";
    if (p.money === "none") {
      mid += "You told me you cannot pay, so everything below has been reordered around that and nothing has been quietly dropped. " +
        "The thing worth understanding is that the funded routes are not the consolation prize — a funded doctorate pays you a salary, " +
        "German public universities charge no tuition at all, and a self-funded masters is the <em>worst</em>-value option on this entire site, not the best. ";
    } else if (p.money === "loan") {
      mid += "You would consider a loan, so here is the arithmetic nobody offers: ₹50 lakh at 10 % is roughly ₹65,000 a month for ten years. " +
        "That is survivable if the degree leads to income in that currency and punishing if it does not. Take the funded routes first and treat the loan as what closes a gap, not what opens a door. ";
    }
    if (p.category === "sc" || p.category === "st") {
      mid += "Given what you told me about your background, the National Overseas Scholarship is at the top of your list for a reason: " +
        "it funds a full masters or doctorate abroad including flights, and in most years places go <strong>unfilled</strong> because almost nobody applies. " +
        "That is the single highest-value item on your page. ";
    }
    if (p.stage === "pre") {
      mid += "Being in your first two years is the widest window you will ever have: ICMR STS is open to you now and closes permanently after second year, " +
        "and DAAD WISE, Mitacs and Charpak Lab all take currently-enrolled students. Most people discover these in final year, when three of them have already closed. ";
    } else if (p.stage === "clin") {
      mid += "You are in the years where the international research internships open — Khorana specifically wants pre-final-year MBBS students and lowers its marks bar for them. " +
        "ICMR STS has closed to you, so MedEngage and the summer fellowships are the substitutes that keep the record moving. ";
    } else if (p.stage === "grad" || p.stage === "pg") {
      mid += "With the degree finished, the funded doctorate becomes the main event — and the misconception worth killing early is that you need a masters first. " +
        "You usually do not. US, German, Swiss and Australian doctoral programmes take medical graduates directly and pay them. ";
    }
    if (mid) paras.push(mid);

    // readiness
    let ready = "";
    const hasNothing = p.record.indexOf("nothing") !== -1 || p.record.length === 0;
    if (hasNothing) {
      ready = "You ticked nothing under what you already have, which is the normal starting position and not a problem — but it does set the order of operations. " +
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
    if (p.abroad !== "india" && ctys.length) {
      const best = ctys[0];
      let cn = "On where: your answers about climate, food and what you need around you point first at <strong>" + esc(best.c.name) + "</strong>. ";
      cn += esc(best.c.honest);
      paras.push(cn);
    } else if (p.abroad === "india") {
      paras.push("You said you want to build something here, and that is a legitimate strategy rather than a fallback. " +
        "The strongest version of it is specific: NIMHANS and AIIMS have cohorts and biobanks no Western centre can access, GenomeIndia has put thousands of Indian genomes " +
        "into the public domain, and the India Alliance funds clinicians to lead their own research <em>without</em> a doctorate. " +
        "The honest case for leaving is better mentorship and better working conditions — not better science and not better data.");
    }

    // closing, calibrated to time
    let close = "";
    if (p.time === "t2") {
      close = "You have under two hours a week, so the plan has to survive a bad month. Do not start three things. " +
        "Take the single item at the top of the list, and give it twenty minutes at a time.";
    } else if (p.time === "t20") {
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
      plan.push({ when: "This month", what: "<b>Have one fifteen-minute conversation with a faculty member</b> whose corridor you already walk past. This is the highest-return, lowest-cost item you will ever do — and it gets much harder once you change year and stop being a face they recognise." });

    if (p.record.indexOf("code") === -1 && (p.fields.compbio || p.fields.genomics))
      plan.push({ when: "Starting now", what: "<b>Twenty minutes of Python a day.</b> On a bad day, five. Nobody bridges medicine and computation in a heroic sprint — and Coursera grants financial aid to Indian students on request." });

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
    bits.push('<span>' + esc(item.country) + (item.city && item.city !== item.country ? " · " + esc(item.city) : "") + '</span>');
    if (item.duration) bits.push('<span>' + esc(item.duration) + '</span>');
    bits.push('<span class="' + (urg === "open" ? "r-deadline" : "") + '">' + esc(URG_TEXT[urg]) + '</span>');
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
    if (idx != null) h += '<span class="card-rank">' + String(idx + 1).padStart(2, "0") + '</span>';
    h += '<h3>' + esc(item.name) + '</h3>';
    h += '<span class="tier tier-' + imp.t + '" title="' + esc(tierName) + '">Tier ' + imp.t +
         ' · ' + esc(tierName) + '</span>';
    h += '<button type="button" class="star-btn' + (saved ? " is-saved" : "") +
         '" data-star="' + esc(item.id) + '" aria-pressed="' + saved +
         '" title="' + (saved ? "Remove from shortlist" : "Save to shortlist") + '">' +
         starSVG(saved) + '</button>';
    h += '</div>';
    h += '<p class="card-org">' + esc(item.org) + '</p>';
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
    h += '<a class="card-link" href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer">Official page &rarr;</a>';
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

  /* ───────────────── views ───────────────── */
  function showView(name) {
    $$(".view").forEach((v) => v.classList.remove("is-active"));
    const v = $("#view-" + name);
    if (v) v.classList.add("is-active");
    $$(".navlink").forEach((b) => b.setAttribute("aria-current", b.dataset.goto === name ? "true" : "false"));
    window.scrollTo(0, 0);
    if (v) focusHeading(v);
  }

  /* ───────────────── survey rendering ───────────────── */
  function renderQuestion() {
    const q = QUESTIONS[qIndex];
    const slot = $("#questionSlot");
    const chosen = answers[q.id] || (q.type === "multi" ? [] : null);

    let h = '<p class="q-eyebrow">' + esc(q.act) + '</p>';
    h += '<h2 class="q-title">' + esc(q.title) + '</h2>';
    h += '<p class="q-help">' + q.help + '</p>';
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
      h += '<p class="q-note">Optional — but the words you use here shape the answer.</p>';
    }
    if (q.type === "multi") h += '<p class="q-note">Choose as many as are true. None is also an answer.</p>';

    slot.innerHTML = h;
    window.scrollTo(0, 0);
    focusHeading(slot);

    $$(".opt", slot).forEach(function (btn) {
      btn.addEventListener("click", function () {
        const v = btn.dataset.v;
        if (q.type === "multi") {
          const arr = answers[q.id] || (answers[q.id] = []);
          const i = arr.indexOf(v);
          if (i === -1) arr.push(v); else arr.splice(i, 1);
          btn.setAttribute("aria-pressed", i === -1 ? "true" : "false");
        } else {
          answers[q.id] = v;
          $$(".opt", slot).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        }
      });
    });

    const ft = $("#freeText");
    if (ft) ft.addEventListener("input", function () { answers[q.id + "_text"] = ft.value; });

    $("#qCount").textContent = "Question " + (qIndex + 1) + " of " + QUESTIONS.length;
    $("#backBtn").disabled = qIndex === 0;
    $("#nextBtn").textContent = qIndex === QUESTIONS.length - 1 ? "See what fits me" : "Continue";
    const pct = (qIndex / QUESTIONS.length) * 100;
    $("#progressBar").style.width = pct + "%";
    $(".progress").setAttribute("aria-valuenow", String(Math.round(pct)));
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
    h += '<div class="read-main"><h2>What your answers actually say</h2>';
    counsellorRead(p, ranked, ctys).forEach((para) => { h += "<p>" + para + "</p>"; });
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
    const rows = [
      ["Stage", STAGE_LABEL[p.stage]],
      ["Budget", MONEY_LABEL[p.money]],
      ["Leaving India", ABROAD_LABEL[p.abroad]],
      ["Climate", COLD_LABEL[p.cold]],
      ["Time each week", TIME_LABEL[p.time]],
      ["Timeline", HORIZON_LABEL[p.horizon]],
      ["Paperwork", ENG_LABEL[p.english]]
    ];
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
      h += '<div class="tl"><span class="tier tier-' + t + '">Tier ' + t + " · " + esc(ti.name) + "</span>";
      h += "<p>" + esc(ti.blurb) + "</p></div>";
    });
    h += "</div></section>";

    /* main matched sections — deliberately generous. The point is to widen
       the field of view, not to hand over a single answer. */
    const sections = [
      { key: ["research"], n: 9, h: "Research programmes to apply for", s: "Ranked against your field, your stage and your budget. Stage eligibility is already applied — nothing here is closed to you unless it says so." },
      { key: ["scholarship", "fellowship"], n: 10, h: "Money you could actually get", s: "Scholarships and fellowships you are eligible for now, or should be building toward. Several of these stack with each other." },
      { key: ["masters", "phd"], n: 10, h: "Degrees worth the years", s: "Where each one leads, what it costs, and who pays. Note how many of the doctorates pay you rather than the reverse." },
      { key: ["conference"], n: 4, h: "Conferences that will fly you there", s: "You do not attend these by paying. You attend by submitting an abstract and applying for the travel award in the same breath — and the award deadline is always earlier than you expect." },
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
    h += '<p class="sec-sub">A list of what to pursue is only half the advice. These consume time and money and produce nothing a reviewer can verify — and every one of them is marketed hard at Indian medical students.</p>';
    h += '<div class="skip-grid">';
    (window.DB.skipList || []).forEach(function (s) {
      h += '<article class="skip-card"><h3>' + esc(s.name) + "</h3><p>" + esc(s.why) + "</p></article>";
    });
    h += "</div></section>";

    /* specialty routes matched to the profile */
    const specs = rankSpecialties(p);
    h += '<section class="actions-block"><h2 class="sec-h">Specialties that fit what you said</h2>';
    h += '<p class="sec-sub">The three closest to your answers, out of thirteen route maps. Each one shows the day-to-day reality, the Indian and international entry routes, where it leads, and the thing nobody tells you before you commit three years to it.</p>';
    h += '<div class="routes">' + specs.slice(0, 3).map((x, i) => specialtyHTML(x.s, "Closest fit " + (i + 1))).join("") + "</div>";
    h += '<p class="sec-sub" style="margin-top:20px"><button type="button" class="btn btn-ghost" data-goto="routes">See all thirteen specialty routes</button></p>';
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
      h += '<p class="sec-sub">Ranked on climate, daylight, food, community and cost against what you told me you need — not on university league tables.</p>';
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
    h += '<p class="f-where">' + esc(f.where.join(" · ")) + "</p>";
    h += '<a class="card-link" href="' + esc(f.url) + '" target="_blank" rel="noopener noreferrer">Where to look &rarr;</a>';
    h += "</article>";
    return h;
  }

  /* ───────────────── browse: filter, search, sort ───────────────── */
  let activeFilter = "all";
  let searchQuery = "";
  let sortMode = "tier";

  function matchesSearch(item, q) {
    if (!q) return true;
    const hay = [
      item.name, item.org, item.why, item.money, item.country, item.city,
      TYPE_LABEL[item.type], (item.fields || []).map((f) => FIELDS[f]).join(" ")
    ].filter(Boolean).join(" • ").toLowerCase();
    return hay.indexOf(q) !== -1;
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

  function sortList(list) {
    if (sortMode === "az") return list.slice().sort((a, b) => a.name.localeCompare(b.name));
    if (sortMode === "deadline")
      return list.slice().sort((a, b) => monthsUntilDeadline(a) - monthsUntilDeadline(b) || impactOf(a).t - impactOf(b).t);
    return list.slice().sort((a, b) => impactOf(a).t - impactOf(b).t); // "tier", the default
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

    const preSearchCount = list.length;
    list = list.filter((i) => matchesSearch(i, searchQuery));
    list = sortList(list);

    const SORT_LABEL = { tier: "sorted by impact tier", deadline: "sorted by nearest deadline", az: "sorted A–Z" };
    let countText = list.length + " programme" + (list.length === 1 ? "" : "s");
    if (searchQuery) countText += " matching “" + searchQuery + "” of " + preSearchCount;
    countText += " · " + SORT_LABEL[sortMode];
    $("#browseCount").textContent = countText;

    $("#browseCards").innerHTML = list.length
      ? list.map((i) => cardHTML({ item: i, urg: urgency(i), reasons: [] }, null)).join("")
      : '<p class="empty">Nothing matches' + (searchQuery ? ' "' + esc(searchQuery) + '"' : " that filter") + '. Try a broader term or clear the filters.</p>';
  }

  /* ───────────────── calendar ───────────────── */
  function renderCalendar() {
    const now = new Date().getMonth() + 1;
    const items = allOpportunities();
    let h = "";
    for (let m = 1; m <= 12; m++) {
      const inMonth = items.filter((i) => i.deadlineMonths && i.deadlineMonths.length && i.deadlineMonths.length < 12 && i.deadlineMonths.indexOf(m) !== -1);
      h += '<article class="month' + (m === now ? " is-now" : "") + '">';
      h += "<h3>" + esc(MONTHS[m - 1]) + (m === now ? " · now" : "") + "</h3>";
      h += '<p class="m-count">' + inMonth.length + "</p>";
      h += "<ul>";
      inMonth.slice(0, 9).forEach((i) => { h += '<li title="' + esc(i.name) + '">' + esc(i.name) + "</li>"; });
      if (inMonth.length > 9) h += "<li>+ " + (inMonth.length - 9) + " more</li>";
      if (!inMonth.length) h += '<li style="color:var(--ink-3)">Nothing closing</li>';
      h += "</ul></article>";
    }
    $("#calendarGrid").innerHTML = h;
  }

  /* ───────────────── stats ───────────────── */
  function renderStats() {
    const items = allOpportunities();
    const countries = {};
    items.forEach(function (i) {
      if (["Any", "Global", "Online", "Europe", "Asia", "Nordics"].indexOf(i.country) === -1) countries[i.country] = 1;
    });
    const total = items.length + (window.DB.frontiers || []).length + (window.DB.specialties || []).length;
    $("#statTotal").textContent = total;
    const hc = $("#heroCount");
    if (hc) hc.textContent = total;
    $("#statFree").textContent = items.filter((i) => i.zeroCost).length;
    $("#statStudent").textContent = items.filter((i) => i.stages && (i.stages.indexOf("pre") !== -1 || i.stages.indexOf("clin") !== -1)).length;
    $("#statCountries").textContent = Object.keys(countries).length;
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
    let h = '<p class="result-count">' + items.length + ' saved</p>';
    h += '<div class="cards">' + items.map((i) => cardHTML({ item: i, urg: urgency(i), reasons: [] }, null)).join("") + '</div>';
    slot.innerHTML = h;
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
    return Object.keys(obj).length > 3;
  }

  /* A plan you can paste into a notes app, a document, or an email to a mentor. */
  function planAsText(p, ranked, plan, specs) {
    const L = [];
    L.push("DREAM COUNSELLOR — MY PLAN");
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
    }

    L.push("");
    L.push("Deadlines change every cycle. Confirm each one on its official page.");
    return L.join("\n");
  }

  /* ───────────────── wiring ───────────────── */
  function bindGoto(root) {
    $$("[data-goto]", root || document).forEach(function (b) {
      if (b.dataset.bound) return;
      b.dataset.bound = "1";
      b.addEventListener("click", function () {
        const t = b.dataset.goto;
        if (t === "browse") renderBrowse();
        if (t === "calendar") renderCalendar();
        if (t === "frontiers") $("#frontierGrid").innerHTML = (window.DB.frontiers || []).map(frontierHTML).join("");
        if (t === "routes") $("#routesGrid").innerHTML = (window.DB.specialties || []).map((s) => specialtyHTML(s, null)).join("");
        if (t === "shortlist") renderShortlist();
        showView(t);
        closeMobileNav();
      });
    });
  }

  /* ───────────────── mobile nav ─────────────────
     Below the collapse breakpoint the primary nav becomes a full-width panel
     toggled by a hamburger button, closed by: picking a destination (via the
     bindGoto hook above), tapping outside it, or Escape. Above the
     breakpoint this is inert — the toggle is hidden and .topnav lays out
     inline as normal, so nothing here runs on desktop. */
  function closeMobileNav() {
    const nav = $("#topnav"), toggle = $("#navToggle");
    if (!nav || !nav.classList.contains("is-open")) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function initMobileNav() {
    const nav = $("#topnav"), toggle = $("#navToggle");
    toggle.addEventListener("click", function () {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
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
    btn.addEventListener("click", function () {
      const cur = document.documentElement.getAttribute("data-theme");
      const sysDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const next = cur ? (cur === "dark" ? "light" : "dark") : (sysDark ? "light" : "dark");
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("dc-theme", next); } catch (e) { /* ignore */ }
    });
  }

  function init() {
    renderStats();
    initTheme();
    initMobileNav();
    bindGoto(document);
    loadShortlist();
    updateShortlistCount();

    // One delegated listener covers every star button on every card, in every
    // view, present now or rendered later — no per-card rewiring needed.
    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".star-btn");
      if (!btn) return;
      toggleShortlist(btn.dataset.star);
      if ($("#view-shortlist").classList.contains("is-active")) renderShortlist();
    });

    $("#startBtn").addEventListener("click", function () { qIndex = 0; renderQuestion(); showView("survey"); });
    $("#brandHome").addEventListener("click", function (e) { e.preventDefault(); showView("intro"); closeMobileNav(); });

    // Wired once: these inputs live in the static shell (not inside the
    // #filters/#browseCards nodes renderBrowse() replaces), so re-rendering
    // the list on every keystroke never disturbs focus or cursor position.
    let searchDebounce;
    $("#browseSearch").addEventListener("input", function () {
      clearTimeout(searchDebounce);
      const val = this.value;
      searchDebounce = setTimeout(function () {
        searchQuery = val.trim().toLowerCase();
        renderBrowse();
      }, 120);
    });
    $("#browseSort").addEventListener("change", function () {
      sortMode = this.value;
      renderBrowse();
    });

    $("#nextBtn").addEventListener("click", function () {
      if (qIndex === QUESTIONS.length - 1) { renderResults(); showView("results"); return; }
      qIndex++; renderQuestion();
    });
    $("#backBtn").addEventListener("click", function () {
      if (qIndex > 0) { qIndex--; renderQuestion(); }
    });

    // A returning visitor, or someone opening a shared link, lands on their plan.
    if (restore()) {
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
