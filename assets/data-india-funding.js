/* Dream Counsellor — the funded routes inside India, and the ones in regions
   Indian medical students rarely look at. Appended to the core arrays.

   A recurring assumption worth dismantling: that a doctorate in India means
   self-funding. It does not. Every entry in the first block pays a monthly
   fellowship, and several pay more than a junior resident earns. */

window.DB = window.DB || {};
window.DB.funding = window.DB.funding || [];
window.DB.research = window.DB.research || [];
window.DB.study = window.DB.study || [];

window.DB.funding.push(
  {
    id: "pmrf",
    name: "Prime Minister's Research Fellowship (PMRF)",
    org: "Ministry of Education, Government of India",
    type: "fellowship", country: "India", city: "IITs, IISc, IISERs, NITs, central universities",
    fields: ["compbio", "genomics", "biochem", "neuro", "env"],
    stages: ["grad", "pg"], funding: "full",
    money: "₹70,000–80,000/month rising to ₹80,000 in later years, plus a ₹2 lakh annual research grant",
    duration: "4–5 years",
    window: "Two cycles a year, typically closing around March and October",
    deadlineMonths: [2, 3, 4, 9, 10, 11],
    url: "https://pmrf.in/",
    why: "The best-paid doctoral fellowship in India by a wide margin — more than most junior residents earn, with a research grant attached and a travel allowance for international conferences. It is aimed at technology and science disciplines, which means a medical graduate moving into computational biology, health data science or biomedical engineering is an unusual and often welcome applicant rather than a competitor in a crowded field.",
    reqs: [
      "Admission to, or application for, a PhD at a participating institution — IITs, IISc, IISERs, NITs and select central universities",
      "The direct-entry channel assesses your academic record and research proposal",
      "Interdisciplinary applicants are explicitly encouraged, which is where a medical degree becomes an advantage rather than an oddity"
    ],
    steps: [
      "Identify a PhD programme at a participating institution first — biomedical engineering, computational biology and health informatics groups at the IITs and IISc all take medical graduates.",
      "Apply through the PMRF portal in one of the two annual cycles; the direct-entry channel is the relevant one for most applicants.",
      "Your research proposal carries the application. Write it about a specific answerable question, not a field you find interesting.",
      "Contact the prospective supervisor before applying. At Indian institutions this matters as much as it does abroad and is done far less often."
    ],
    indiaSpecific: true, competitiveness: "high", workExp: 0
  },
  {
    id: "dbt-jrf",
    name: "DBT-JRF (Biotechnology Eligibility Test) & ICMR-JRF",
    org: "Department of Biotechnology / Indian Council of Medical Research",
    type: "fellowship", country: "India", city: "Any recognised institution",
    fields: ["biochem", "genomics", "infect", "pubhealth", "neuro"],
    stages: ["grad", "pg"], funding: "full",
    money: "₹37,000–42,000/month plus HRA and an annual contingency grant",
    duration: "5 years of doctoral support",
    window: "DBT-BET around Feb–Apr · ICMR-JRF around Mar–Jul",
    deadlineMonths: [2, 3, 4, 5, 6, 7],
    url: "https://dbtindia.gov.in/",
    why: "These are the examinations that turn an Indian PhD from something you pay for into something that pays you. A DBT or ICMR fellowship is portable — you take it to whichever institution accepts you, which inverts the usual power dynamic when approaching a supervisor. Very few medical students sit these because nobody tells them they are eligible.",
    reqs: [
      "MBBS holders are eligible for ICMR-JRF; DBT-BET is open to postgraduates in life sciences and to medical graduates",
      "Written examination followed by an interview",
      "The fellowship is portable across institutions"
    ],
    steps: [
      "Sit ICMR-JRF if your interest is biomedical and clinical; DBT-BET if it is molecular and biotechnological.",
      "Because the fellowship travels with you, approach a supervisor holding one and the conversation changes completely. You are bringing funding, not asking for it.",
      "CSIR-UGC NET JRF is a third route, though eligibility for MBBS holders varies by cycle — check the current notification rather than relying on what a senior told you."
    ],
    indiaSpecific: true, competitiveness: "medium", workExp: 0
  },
  {
    id: "inspire",
    name: "INSPIRE Fellowship & Faculty Scheme",
    org: "Department of Science and Technology, Government of India",
    type: "fellowship", country: "India", city: "Any recognised institution",
    fields: ["biochem", "genomics", "compbio", "neuro", "env"],
    stages: ["grad", "pg"], funding: "full",
    money: "Doctoral fellowship ₹37,000–42,000/month · INSPIRE Faculty gives an independent position with a research grant",
    duration: "5 years doctoral · 5 years faculty",
    window: "Doctoral calls usually mid-year; faculty calls announced periodically",
    deadlineMonths: [5, 6, 7, 8],
    url: "https://online-inspire.gov.in/",
    why: "The INSPIRE Faculty scheme is the interesting one and almost nobody outside basic science knows it exists: it gives an early-career researcher an independent position and a grant at an Indian institution, without needing to wait for a conventional faculty vacancy. For someone determined to build a research career in India rather than emigrate, it is one of the few genuine ladders that exists.",
    reqs: ["Doctoral scheme: strong academic record at the qualifying level", "Faculty scheme: a PhD, usually within a few years of completion", "Host institution needed for the faculty scheme"],
    steps: [
      "For the faculty scheme, secure the host institution's agreement before applying. That is the practical gate.",
      "Check the current eligibility notification for medical graduates; DST criteria have shifted between cycles.",
      "This pairs naturally with an India Alliance fellowship as the next step up."
    ],
    indiaSpecific: true, competitiveness: "medium", workExp: 2
  },
  {
    id: "state-schemes",
    name: "State government overseas scholarships",
    org: "Jammu & Kashmir, Kerala, Tamil Nadu, Maharashtra, Telangana, Karnataka and others",
    type: "scholarship", country: "Any", city: "Any",
    fields: ["pubhealth", "clinical", "global", "biochem", "compbio"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Varies by state — several fund overseas masters and doctorates in full for eligible categories",
    duration: "Full degree",
    window: "State-specific, mostly Feb–Aug",
    deadlineMonths: [2, 3, 4, 5, 6, 7, 8],
    url: "https://scholarships.gov.in/",
    why: "Almost invisible, because they are administered by state departments that do not advertise and are not aggregated anywhere useful. Several states fund overseas postgraduate study outright for students from specific categories or income bands, and applicant numbers are small enough that a complete, on-time application has real odds.",
    reqs: [
      "Domicile in the relevant state",
      "Category and income criteria vary considerably between states",
      "Usually requires an admission offer or a conditional offer"
    ],
    steps: [
      "Search your own state's social welfare, minority affairs and higher education department sites directly. The National Scholarship Portal aggregates some but not all of them.",
      "Ask at your college office — they often know about state schemes that never appear online.",
      "These stack with partial university funding, which is how most successful applicants actually close the gap."
    ],
    indiaSpecific: true, competitiveness: "accessible", workExp: 0
  }
);

window.DB.research.push(
  {
    id: "us-electives",
    name: "US clinical electives, observerships and externships",
    org: "US teaching hospitals via VSLO and direct application",
    type: "research", country: "USA", city: "Various",
    fields: ["clinical", "psych", "neuro"],
    stages: ["clin", "intern"], funding: "partial",
    money: "You pay: roughly $1,500–4,000 per rotation plus travel and accommodation",
    duration: "2–4 weeks per rotation",
    window: "Apply 6–12 months ahead; VSLO opens in the spring",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://students-residents.aamc.org/visiting-student-learning-opportunities/visiting-student-learning-opportunities",
    why: "US clinical experience is close to mandatory for matching into an American residency, and it is dramatically easier to arrange while you are still enrolled than after you graduate. A hands-on elective, where you are part of the team, is worth far more than a passive observership, and the letter of recommendation is the actual product, not the certificate.",
    reqs: [
      "Currently enrolled at a medical school listed in the World Directory of Medical Schools",
      "Most hands-on electives require you to still be a student — this window closes at graduation",
      "Health insurance, immunisation records and sometimes a visa"
    ],
    steps: [
      "Do this DURING MBBS, not after. Hands-on electives are largely closed to graduates, and that single fact reshapes the whole USMLE timeline.",
      "Apply through VSLO where possible; many institutions also accept direct applications with lower fees.",
      "The goal is a strong, specific letter of recommendation from a US faculty member. Say so to yourself at the outset — it changes how you behave on the rotation.",
      "Be alert to cost. Agencies charge several times what the institution charges for the same placement. Apply directly."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },
  {
    id: "gulf-research",
    name: "Gulf research institutions — KAUST, Weill Cornell Qatar, Sidra, Khalifa",
    org: "Saudi Arabia, Qatar and the UAE",
    type: "research", country: "Gulf", city: "Thuwal, Doha, Abu Dhabi",
    fields: ["genomics", "biochem", "compbio", "onco", "neuro"],
    stages: ["clin", "intern", "grad", "pg"], funding: "full",
    money: "KAUST fully funds masters and doctoral students: tuition, housing, health cover and a stipend of roughly $20,000–30,000/year. Its Visiting Student Research Programme covers travel too.",
    duration: "10 weeks (visiting programme) to 4 years (doctorate)",
    window: "KAUST VSRP applications typically close in the first quarter; degree admissions are rolling with January and August intakes",
    deadlineMonths: [1, 2, 3, 4, 11, 12],
    url: "https://www.kaust.edu.sa/en/study",
    why: "Four hours from India, extremely well funded, English-speaking, and almost entirely absent from Indian medical students' mental map. KAUST's stipends are generous by any standard and its bioscience and computational groups are genuinely strong. Sidra Medicine in Qatar runs serious genomics work on Middle Eastern and South Asian populations, which is directly relevant if consanguinity genetics interests you.",
    reqs: ["Strong academic record", "English only — no Arabic required", "KAUST's visiting programme is open to enrolled undergraduates including MBBS students"],
    steps: [
      "The KAUST Visiting Student Research Programme is the low-risk entry point: ten weeks, fully funded including flights, and it frequently converts into a doctoral offer.",
      "Apply in the first quarter for a summer placement.",
      "Consider carefully whether the social and legal environment suits you. That is a personal judgement and worth making deliberately rather than by default."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "lmic-partnerships",
    name: "Global health field research in low- and middle-income settings",
    org: "MSF · icddr,b Bangladesh · KEMRI-Wellcome Kenya · MRC Gambia · Sangath India",
    type: "research", country: "Global", city: "Field sites worldwide",
    fields: ["global", "pubhealth", "infect", "psych", "repro"],
    stages: ["intern", "grad", "pg"], funding: "partial",
    money: "Varies — several offer paid research assistant posts and fully funded internships",
    duration: "3 months – 2 years",
    window: "Rolling recruitment",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.msf.org/",
    why: "The most direct way to become a global health researcher is to do global health research, and these institutions hire medical graduates into real field posts. icddr,b in Dhaka and KEMRI-Wellcome in Kilifi are internationally significant research units that publish in the best journals, and both are more reachable from India than any Western institution.",
    reqs: ["Medical or public health degree", "Field tolerance — these are genuinely demanding postings", "Some roles require prior research experience"],
    steps: [
      "Sangath in Goa is the obvious first stop — internationally cited global mental health research, in India, hiring Indian medical graduates.",
      "icddr,b in Dhaka takes international research fellows and is culturally and geographically close.",
      "MSF recruits doctors for field posts and increasingly for operational research; a year in the field changes what you are able to write about permanently.",
      "These posts build the exact record that a Wellcome or India Alliance fellowship application needs later."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "medium", workExp: 1
  }
);

/* impact tiers for this batch */
window.DB.impact = window.DB.impact || {};
Object.assign(window.DB.impact, {
  "pmrf":          { t: 1, odds: "~10 %", effort: "30 hrs including the proposal", note: "The best-paid doctorate in India, and a medical graduate applying to a computational or biomedical engineering group is an unusual applicant rather than one of a thousand." },
  "dbt-jrf":       { t: 2, odds: "Exam-dependent, roughly 5–10 %", effort: "Months of exam preparation", note: "Turns an Indian PhD from something you pay for into something that pays you. Portable across institutions, which inverts the conversation with a prospective supervisor." },
  "gulf-research": { t: 2, odds: "Moderate — few Indian medical applicants", effort: "15 hrs", note: "KAUST's visiting programme is fully funded including flights, four hours from India, and frequently converts into a doctoral offer." },
  "us-electives":  { t: 2, odds: "Open, but costly", effort: "$1,500–4,000 per rotation", note: "Do it DURING MBBS. Hands-on electives are largely closed to graduates, and that one fact reshapes the entire USMLE timeline. Apply directly, never through an agency." },
  "inspire":       { t: 2, odds: "Moderate", effort: "25 hrs", note: "The Faculty scheme gives an independent position and a grant without waiting for a conventional vacancy. One of the few genuine ladders for building a research career inside India." },
  "lmic-partnerships": { t: 2, odds: "Moderate", effort: "Application plus relocation", note: "Sangath, icddr,b and KEMRI-Wellcome publish in the best journals and are more reachable from India than any Western institution. A year here builds exactly the record a Wellcome fellowship needs." },
  "state-schemes": { t: 3, odds: "Small applicant pools", effort: "1 hour of searching, then paperwork", note: "Administered by state departments that do not advertise and are aggregated nowhere useful. Ask your own college office — they often know what is not online." }
});

/* New Zealand, added September 2026. The country had one entry and deserved
   more, because of a policy almost nobody outside it knows about: New Zealand
   charges international PhD candidates the DOMESTIC tuition rate. That single
   rule moves a doctorate there from unaffordable to roughly the price of a
   private Indian masters, before any scholarship. */
window.DB.study.push(
  {
    id: "nz-doctorate",
    name: "PhD in New Zealand — at the domestic tuition rate",
    org: "University of Otago · University of Auckland · and the other NZ universities",
    type: "phd", country: "New Zealand", city: "Dunedin, Auckland, Wellington, Christchurch",
    fields: ["pubhealth", "clinical", "neuro", "genomics", "global", "env"],
    stages: ["grad", "pg"], funding: "full",
    money: "Tuition ≈ NZ$8,800/year at the domestic rate, against NZ$45,000+ charged to international doctoral students almost everywhere else · Otago's doctoral scholarship adds NZ$34,128/year plus a fee waiver for 36 months",
    duration: "3–4 years",
    window: "Applications accepted year-round · Otago assesses scholarships in quarterly rounds",
    deadlineMonths: [3, 6, 9, 11],
    url: "https://www.auckland.ac.nz/en/study/international-students/study-options-for-international-students/postgraduate-study-for-international-students/doctoral-programmes-international-students.html",
    why: "A government scheme lets New Zealand universities charge international PhD candidates what they charge New Zealanders. The comparison is not subtle: the same degree costs a fifth of what it costs in Australia or the UK, and that is the sticker price before any scholarship. It is the least-known affordability fact in this entire index, and it exists because the country is trying to attract research students rather than bill them.",
    reqs: [
      "A research degree or a strong research record; MBBS is accepted as the qualifying degree",
      "You must RESIDE in New Zealand for the doctorate to keep the domestic rate — research abroad is capped at about 12 months cumulative",
      "A supervisor who has agreed to take you, which is the real gate rather than the paperwork",
      "IELTS or equivalent English evidence"
    ],
    steps: [
      "Find the supervisor before the scholarship. Every route here runs through a named academic agreeing to supervise, and no amount of application polish substitutes for that.",
      "Apply for admission and the doctoral scholarship together. Otago assesses in quarterly rounds and Auckland runs its own; missing a round costs three months, not a year.",
      "Read the residence condition carefully. The domestic fee is conditional on living in New Zealand, so a plan built around remote enrolment loses the entire advantage.",
      "Cost it against Australia honestly. The salary after graduation is lower than Australia's, the fees during it are a fraction, and which of those matters more depends on whether you intend to stay."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  }
);

window.DB.residency.push(
  {
    id: "nzrex",
    name: "NZREX Clinical — practising medicine in New Zealand",
    org: "Medical Council of New Zealand",
    type: "residency", country: "New Zealand", city: "Various",
    fields: ["clinical", "psych", "pubhealth"],
    stages: ["intern", "grad"], funding: "paid",
    money: "House officer ≈ NZ$80,000–95,000/year once registered",
    duration: "Qualifying exam → NZREX Clinical → PGY1 post → registration",
    window: "NZREX sittings run a few times a year and fill early",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.mcnz.org.nz/registration/getting-registered/registration-exam-nzrex/",
    why: "The parallel route to Australia's AMC, with a smaller applicant pool and a country that is substantially cheaper to sit the process in. Worth knowing before you commit to the USMLE by default.",
    reqs: [
      "MBBS from a school listed in the World Directory of Medical Schools",
      "A qualifying exam FIRST — USMLE Step 1 and 2, AMC Part 1, PLAB Part 1 or MCCQE Part 1. NZREX is not an entry point on its own",
      "Primary source verification of your degree through ECFMG's EPIC service",
      "English evidence, and the ability to satisfy the Council you can communicate in a clinical setting"
    ],
    steps: [
      "Understand the gate before you spend anything: NZREX sits AFTER another country's exam. If you were going to sit PLAB or the AMC MCQ anyway, New Zealand costs you one extra exam rather than a whole new pathway.",
      "Start EPIC verification early. It is slow, it is administrative, and it blocks everything behind it.",
      "The part nobody mentions until late: passing NZREX does not register you. You then have to secure a PGY1 post with a training provider, and that post is the actual bottleneck. Ask about PGY1 availability before you sit the exam, not after.",
      "If Australia is also on your list, sequence them. AMC Part 1 satisfies the NZREX qualifying-exam requirement, so one exam can open both doors."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 1
  }
);

Object.assign(window.DB.impact, {
  "nz-doctorate": { t: 1, odds: "Turns on finding a supervisor, not on a competition", effort: "Emails to supervisors, then one application", note: "International candidates pay the DOMESTIC tuition rate — roughly NZ$8,800 against NZ$45,000+ elsewhere. The single most useful affordability fact in this index, and almost nobody outside New Zealand knows it." },
  "nzrex":        { t: 2, odds: "Smaller pool than the USMLE or AMC", effort: "A qualifying exam, then NZREX, then a PGY1 hunt", note: "Cheaper and less contested than the usual routes, with one catch worth knowing first: passing the exam does not register you, securing a PGY1 post does, and those posts are the real bottleneck." }
});

/* Added September 2026. Both verified against the funding body's own pages,
   not against an aggregator: BIRAC's BIG scheme names medical degree holders
   in its own eligibility text, and ACTREC's life-sciences page describes the
   short-term training it runs alongside the PhD. */
window.DB.research.push(
  {
    id: "birac-big",
    name: "BIRAC Biotechnology Ignition Grant (BIG)",
    org: "BIRAC, Department of Biotechnology",
    type: "research", country: "India", city: "Anywhere in India",
    fields: ["biochem", "clinical", "systems", "genomics", "infect"],
    stages: ["clin", "intern", "grad", "pg"], funding: "full",
    money: "Up to ₹50 lakh grant-in-aid over 18 months · no equity taken",
    duration: "Up to 18 months",
    window: "Calls open roughly twice a year · check the live call before planning",
    deadlineMonths: [3, 9],
    url: "https://birac.nic.in/big.php",
    why: "The largest sum in this index that an individual student can hold, and almost no medical student applies. BIRAC's own eligibility names medical degree holders alongside PhDs and biomedical engineers, so a clinician with a diagnostic or device idea is inside the intended audience rather than at its edge. Doctors see the unmet need every day in outpatients; the people who usually win these grants have to go looking for it.",
    reqs: [
      "An idea at nascent or planning stage — a prototype is not required to apply",
      "Medical degree holders are named in the scheme's own eligibility, alongside students and academics",
      "A No Objection Certificate from your institution if you are still enrolled",
      "Funds for an individual applicant go into a dedicated auditable no-lien account"
    ],
    steps: [
      "Start from a problem you have watched go unsolved on a ward round, not from a technology you find interesting. The clinical observation is the part nobody else on the applicant list has.",
      "Read the BIG user guide before writing anything. It states plainly what stage of idea the scheme funds, and most rejected applications are simply at the wrong stage.",
      "Get the institutional NOC moving early. It is administrative rather than difficult, and it is the step most likely to miss the date.",
      "Attach yourself to a BIRAC-recognised incubator. They exist to shepherd exactly this application and their support materially changes the odds.",
      "If the idea is a device rather than a molecule, run this alongside the School of International Biodesign fellowship in this index rather than choosing between them."
    ],
    zeroCost: true, indiaSpecific: true, competitiveness: "high", workExp: 0
  },
  {
    id: "actrec-tmc",
    name: "ACTREC / Tata Memorial Centre — short-term training and PhD",
    org: "Advanced Centre for Treatment, Research and Education in Cancer, TMC",
    type: "research", country: "India", city: "Navi Mumbai",
    fields: ["onco", "genomics", "biochem", "clinical", "compbio"],
    stages: ["pre", "clin", "intern", "grad", "pg"], funding: "stipend",
    money: "Short-term training is unpaid or nominally paid · the PhD and JRF routes carry a full UGC-rate fellowship",
    duration: "Weeks for training · 4–5 years for the doctorate",
    window: "Training requests accepted through the year · JRF and PhD calls advertised on the site",
    deadlineMonths: [2, 5, 6, 11],
    url: "https://actrec.gov.in/life-sciences",
    why: "India's largest cancer centre runs a research arm that takes undergraduates for short-term projects, and it is reachable by asking rather than by winning a competition. For anyone drawn to oncology this is the shortest path from a lecture hall to a laboratory that publishes.",
    reqs: [
      "Short-term training takes undergraduates, postgraduates and academics; individual training requests are accepted",
      "Specific technique courses set their own bar and some require an MSc, so read the advertisement for the course rather than assuming",
      "The JRF and PhD routes advertise separately and follow the usual national fellowship rules"
    ],
    steps: [
      "Read three recent papers from a single ACTREC group before writing to anyone, and name the paper in your email. Cold requests that could have been sent to any laboratory are the ones that go unanswered.",
      "Ask for a specific technique and a specific window. A vague request for exposure is harder to say yes to than a request for six weeks learning one assay.",
      "Watch the advertisements page directly. JRF and training calls appear there as PDFs and are aggregated nowhere reliable.",
      "Pair a training stint with an ICMR-STS proposal in the same year if you can. The techniques you learn here are what make an STS project deliverable in two months."
    ],
    zeroCost: false, indiaSpecific: true, competitiveness: "medium", workExp: 0
  }
);

Object.assign(window.DB.impact, {
  "birac-big":  { t: 1, odds: "Low, but the applicant pool has almost no clinicians in it", effort: "60+ hrs including the NOC and an incubator tie-up", note: "The largest single sum an individual in this index can hold, and the eligibility explicitly names medical degree holders. The clinical observation behind the idea is the part the usual applicants cannot manufacture." },
  "actrec-tmc": { t: 2, odds: "Reachable by asking rather than by competition", effort: "A well-researched email, then weeks on site", note: "India's largest cancer centre, taking undergraduates for short projects. The shortest route from a lecture hall to a laboratory that actually publishes." }
});
