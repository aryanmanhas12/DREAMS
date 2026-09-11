/* Dream Counsellor — the routes that put an Indian medical student abroad,
   funded, before they graduate.

   Two things sit in this file. First, the two summer/semester research
   internships that take undergraduates directly and pay for them. Second — and
   this is the part nobody tells students — the three Indian government schemes
   that will buy your plane ticket to an international conference once you have
   an accepted abstract.

   That second category is the reason a foreign experience is far more
   reachable than it looks. You do not need a scholarship or an admission
   offer. You need an abstract accepted at a conference and an application filed
   sixty days ahead, and the Government of India will reimburse the airfare. The
   binding constraint is almost never money. It is that the application had to
   be in two months before the conference and nobody knew.

   Facts here; grades at the bottom, as everywhere. */

window.DB = window.DB || {};
window.DB.research = window.DB.research || [];
window.DB.funding = window.DB.funding || [];
window.DB.study = window.DB.study || [];

window.DB.research.push(
  {
    id: "oist-internship",
    name: "OIST Research Internship",
    org: "Okinawa Institute of Science and Technology",
    type: "research", country: "Japan", city: "Onna, Okinawa",
    fields: ["neuro", "compbio", "genomics", "biochem"],
    stages: ["clin", "intern"], funding: "full",
    money: "Stipend, flights and accommodation covered · ¥5,000 application fee, non-refundable",
    duration: "4–6 months (minimum 120 days)",
    window: "Two cycles a year — closes 15 October and 15 April",
    deadlineMonths: [10, 4],
    url: "https://www.oist.jp/research-internship-program",
    why: "A fully funded four-to-six-month placement in a real laboratory, open to undergraduates, at an English-language graduate university with world-class neuroscience and computational biology. Two intakes a year rather than one, so missing a deadline costs six months instead of twelve. The catch that filters most Indian applicants is not academic: it is that you need written permission from your medical college to be away for four months, and that has to be negotiated long before the deadline.",
    reqs: [
      "Enrolled in the final two years of an undergraduate degree — for MBBS this means 2nd or 3rd professional year",
      "Formal written permission from your medical college. This is the real gate; start it early",
      "English proficiency; TOEFL and IELTS are optional, not required",
      "Statement of purpose of no more than 250 words — the limit is strict",
      "One to three recommendation letters, uploaded by the referees themselves through the portal",
      "Passport, transcripts, enrolment certificate and CV, all as PDFs"
    ],
    steps: [
      "Go to the faculty and project availability page first and pick two or three units that genuinely match you — computational neuroscience, molecular genetics, human evolutionary genomics. A named unit is what makes the application competitive.",
      "Start the college permission letter before anything else. Four to six months away mid-MBBS needs your Dean's sign-off, and that conversation takes weeks. Every other document is easy by comparison.",
      "Create the portal account and enter your referees' emails EARLY. They upload directly, on their own schedule, and the deadline is on the letter arriving — not on you sending the request.",
      "The 250-word statement is the hard part precisely because it is short. Say what you want to accomplish and how it fits where you are going. Nothing else fits.",
      "Pay the ¥5,000 fee and submit. Deadlines: 15 October for placements the following April–September, 15 April for October–March.",
      "Confirm current fees, cycle dates and eligibility on the OIST admissions page — internship terms are revised between cycles."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "epfl-summer",
    name: "Summer Research Program, School of Life Sciences",
    org: "EPFL — École Polytechnique Fédérale de Lausanne",
    type: "research", country: "Switzerland", city: "Lausanne",
    fields: ["neuro", "compbio", "biochem", "genomics", "global", "onco"],
    stages: ["clin", "intern"], funding: "full",
    money: "Salary, travel and accommodation covered for the eight weeks",
    duration: "8 weeks, July to August",
    window: "Annual deadline 15 November, for the following July–August",
    deadlineMonths: [9, 10, 11],
    url: "https://www.epfl.ch/schools/sv/education/summer-research-program/",
    why: "Eight paid weeks inside one of Europe's strongest life-science schools — the Brain Mind Institute, the Global Health Institute, ISREC for cancer research — with travel and housing covered. Eight weeks fits an Indian summer vacation without needing leave from your college, which is what makes it far more practical mid-MBBS than a four-month placement. The bar is academic standing: they ask for roughly the top 5–10 per cent of your class.",
    reqs: [
      "At least two years of undergraduate study completed — 1st and 2nd professional MBBS satisfies this",
      "Strong academic standing, around the top 5–10 per cent of your cohort",
      "Academic CV of one to two pages: research experience, relevant coursework, technical skills",
      "Official transcripts for every completed MBBS year",
      "One recommendation letter from a research mentor or faculty member",
      "Short essays written directly in the portal on your background and lab preferences"
    ],
    steps: [
      "Read the participating units before you register and name real preferences. 'Life sciences' as a stated interest reads as no interest.",
      "The annual deadline is 15 NOVEMBER, for a programme running the following July and August. That is eight months of lead time and it is the single most misquoted date in this index — aggregator sites still repeat a January deadline that is not EPFL's. Confirm it on the School of Life Sciences page each year.",
      "Enter your referee's email as soon as you register, so the letter is not the thing that misses the deadline.",
      "Say plainly in the essay that you are a medical student. A clinical perspective is a differentiator in a pool of biology undergraduates, not a handicap.",
      "Eight weeks in July and August maps onto the Indian summer break — check your own college calendar against it before applying, not after."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "high", workExp: 0
  }
);

window.DB.funding.push(
  {
    id: "travel-grants-gov",
    name: "Government travel grants — ICMR, CSIR and ANRF (formerly SERB)",
    org: "Dept of Health Research · CSIR-HRDG · Anusandhan National Research Foundation",
    type: "scholarship", country: "Any", city: "Wherever the conference is",
    fields: ["pubhealth", "clinical", "neuro", "psych", "genomics", "biochem", "global", "infect", "onco"],
    stages: ["clin", "intern", "grad", "pg"], funding: "full",
    money: "ICMR up to ₹1,50,000 · CSIR 100% economy airfare · ANRF airfare, visa, airport taxes and registration up to ₹50,000",
    duration: "The length of the conference",
    window: "File 60–90 days before the conference. ANRF/SERB will not accept it outside that window at all",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.icmr.gov.in/international-travel-by-non-icmr-scientists",
    why: "This is the single most under-used route to a first foreign experience, and it inverts the usual problem. You do not need a scholarship, an admission offer or savings. You need an abstract accepted somewhere abroad, and the Government of India will reimburse the flight — up to ₹1.5 lakh under ICMR. What stops people is never the money and almost never the merit. It is that the application had to be filed sixty days before the conference and nobody told them, so they found the scheme three weeks out and were already ineligible.",
    reqs: [
      "An accepted oral or poster paper at an international conference, as lead or single author",
      "ICMR: no ICMR travel support in the past three years, and applications must reach them at least two weeks before the conference",
      "CSIR and ANRF: under 35 years of age. ICMR treats 35 as the young-scientist line too, measured on the date of the conference rather than the date you apply",
      "An endorsement or no-objection letter from your college Dean — allow weeks for this",
      "A flight quotation from a government-approved agent: Balmer Lawrie, Ashok Travels or IRCTC. A private booking site quote is rejected",
      "Conference acceptance letter, abstract, conference brochure, one-page CV, and age proof"
    ],
    steps: [
      "Submit the abstract first. Everything here is downstream of an acceptance letter, and acceptances usually arrive three to five months before the meeting, which is exactly the window these schemes need.",
      "The day the acceptance arrives, start the Dean's endorsement letter and the government travel-agent quote in parallel. Those two are the slow items and they are the ones that make people miss the window.",
      "File 60 to 90 days ahead. ANRF enforces both ends of that window — too early is rejected as firmly as too late. ICMR is the more forgiving of the three: its own minimum is two weeks before the conference, and it accepts on a rolling basis, so if a deadline has run away from you ICMR is the one still worth filing.",
      "Pick the right scheme rather than applying to all three: ICMR for health research, CSIR for the broader sciences, ANRF/SERB for young researchers under 35. They cover overlapping ground and duplicate applications are noticed.",
      "These are reimbursements, not advances. You pay for the ticket and claim it back afterwards with boarding passes and receipts, so plan the cash flow or ask your department about an advance.",
      "Verify current caps, forms and portal addresses on each scheme's own site before you file — the ICMR portal has already moved once, from sts.icmr.org.in to schemes.dhr.gov.in."
    ],
    indiaSpecific: true, competitiveness: "accessible", workExp: 0
  }
);

window.DB.study.push(
  {
    id: "guarantee-abroad",
    name: "How to guarantee one funded trip abroad before you graduate",
    org: "A sequence, not an institution",
    type: "skill", country: "India", city: "Starting where you are",
    fields: ["clinical", "pubhealth", "psych", "neuro", "global"],
    stages: ["pre", "clin", "intern", "grad"], funding: "full",
    money: "The whole point is that it can cost you nothing. Conference travel is reimbursable; research internships pay",
    duration: "12–18 months from starting to boarding",
    window: "Begin any time — the sequence is what matters, not the month",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://schemes.dhr.gov.in/",
    why: "Most students treat going abroad as a lottery they enter once, in final year, by applying to something enormous. It is better understood as a pipeline with three independent inlets, and you only need one of them to open. Run all three at once and the odds stop looking like a lottery. The order below is deliberate: it starts with the thing that is entirely within your control and needs nobody's permission.",
    reqs: [
      "An abstract you can submit — an audit, a case series or an ICMR-STS project all qualify",
      "One faculty member who will put their name to your work",
      "A passport, obtained in year one and not in the week you need it",
      "Roughly 18 months of runway before you want to travel"
    ],
    steps: [
      "Get the passport now, in your first or second year, before there is any reason to. It expires in ten years and it is the single most common reason a student cannot act on an opportunity that arrives with six weeks' notice.",
      "Inlet one, and the one you control: produce something presentable. An ICMR-STS project, a departmental audit, a case series. It does not need to be novel; it needs to exist and to have a supervisor's name on it.",
      "Submit that abstract to an international conference with a student category. Acceptance rates for student posters are far higher than people assume, and an acceptance letter is the key that unlocks the government travel grants.",
      "The moment it is accepted, file for ICMR, CSIR or ANRF/SERB travel support — 60 to 90 days ahead, with the Dean's letter and a government travel-agent quote. This is the cheapest, highest-probability route abroad that exists for an Indian medical student.",
      "Inlet two, running in parallel: apply to the summer research programmes that pay. EPFL closes 15 November for the following summer; OIST runs two intakes; the IISER and IAS summer fellowships run on similar timelines inside India as a fallback. Note how early that EPFL date is — an Indian summer break in June needs an application submitted the previous November.",
      "Inlet three: ask. Email three researchers abroad whose papers you have actually read, with one specific question and a concrete offer of what you would do for eight weeks. A self-funded 'no' costs nothing to receive, and unfunded lab invitations are what many travel grants are then used for.",
      "Negotiate college permission before you need it. For anything longer than a summer break, the Dean's sign-off is the real bottleneck — not admission, not money.",
      "Keep every acceptance letter, certificate and abstract-book page. The second trip is much easier than the first, and this is the evidence that makes it so."
    ],
    indiaSpecific: true, competitiveness: "accessible", workExp: 0
  }
);

/* ─────────────────────────── grades ─────────────────────────── */

window.DB.impact = window.DB.impact || {};
Object.assign(window.DB.impact, {
  "travel-grants-gov": { t: 1, odds: "High, and badly under-applied", effort: "15 hrs once the abstract is accepted", note: "The Government of India will reimburse your flight to an international conference — up to ₹1.5 lakh under ICMR — and almost nobody claims it. The failure is never merit or money; it is that the application closes 60 days before the conference and students find the scheme three weeks out." },
  "guarantee-abroad":  { t: 1, odds: "Near-certain if all three inlets run at once", effort: "18 months, spread thin", note: "Going abroad is not a lottery entered once in final year. It is three independent pipelines, and one opening is enough. Rated top tier because it costs nothing and it is the entry that makes the rest of this index reachable." },
  "epfl-summer":       { t: 1, odds: "Competitive — roughly top 5–10% of your class", effort: "20 hrs", note: "Paid, housed, eight weeks inside one of Europe's best life-science schools — and it lands in July and August, so it fits the Indian summer break without needing leave from your college. That timing is what makes it more practical mid-MBBS than anything longer." },
  "oist-internship":   { t: 2, odds: "Competitive, with two shots a year", effort: "25 hrs plus the permission letter", note: "Four to six funded months in Okinawa, and two intakes a year rather than one. The gate is not academic. It is getting your medical college to release you for four months, which has to be negotiated months before the deadline." }
});

/* ─── WHO, global health policy and digital health, added September 2026.
   The index was strong on degrees and scholarships and thin on the layer
   above them: who actually sets health policy, and how a clinician gets into
   that room. Every one below verified against the organisation's own page.

   Checked and deliberately NOT added: Fellows@EMRO, which several roundups
   offer to Indian applicants. It is the WHO Eastern Mediterranean Region.
   India is in South-East Asia (SEARO), so an Indian doctor is outside it
   before anything else is considered. ─── */
window.DB.research.push(
  {
    id: "openwho",
    name: "OpenWHO and the WHO Academy — free courses with a WHO certificate",
    org: "World Health Organization",
    type: "research", country: "Online", city: "Anywhere",
    fields: ["pubhealth", "global", "infect", "systems", "env"],
    stages: ["pre", "clin", "intern", "grad", "pg"], funding: "free",
    money: "Free · no fee, no entrance test, no English test",
    duration: "Self-paced, hours to weeks per course",
    window: "Open permanently · no deadline and no cohort to miss",
    url: "https://openwho.org/",
    why: "WHO's own learning platform, open to anyone in any country, in more than twenty languages, and it issues a certificate carrying the WHO name. For a second-year with no budget and no contacts, this is the cheapest credible line you can add to a CV this month, and it is the one that makes an email to a global health researcher read as serious rather than speculative.",
    reqs: [
      "None. No degree stage, no nationality restriction, no fee",
      "An email address and enough bandwidth for text and slides"
    ],
    steps: [
      "Pick courses that match a named ambition rather than collecting certificates. Three deep ones in epidemic preparedness read as a direction; fifteen scattered ones read as a hobby.",
      "Do the outbreak and epidemic courses before an outbreak, not during. They are written by the people who ran the responses and are the closest thing to field training you can get from a bedroom.",
      "The WHO Academy is the newer, more structured sibling of OpenWHO and is worth checking alongside it for longer programmes.",
      "Put the certificate in the education section of your CV with the issuing body spelled out in full, and be ready to say in an interview what you actually learned from it."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },
  {
    id: "cpigh-policy",
    name: "Global Health Policy Fellows Programme",
    org: "Center for Policy Impact in Global Health, Duke University",
    type: "fellowship", country: "Global", city: "Remote and Durham, USA",
    fields: ["pubhealth", "global", "systems"],
    stages: ["intern", "grad", "pg"], funding: "paid",
    money: "Paid fellowship · stipend set per cohort",
    duration: "Fixed term, set per cohort",
    window: "Calls are announced on the Center's own page rather than aggregated anywhere",
    deadlineMonths: [2, 3, 9, 10],
    url: "https://centerforpolicyimpact.org/about/fellows-program/",
    why: "A paid policy fellowship that names India in its own list of focus countries, alongside Ghana, Kenya, Myanmar, Nigeria and Sri Lanka. Most global health policy work is done to countries like yours by people from somewhere else; this is one of the few doors built the other way round, and it is aimed at health financing and governance rather than bench research.",
    reqs: [
      "Applications invited from candidates in low- and middle-income countries",
      "India is named among the preferred focus countries",
      "A background in health policy, health financing and delivery, or government financing of health services",
      "Experience conducting health research, quantitative or qualitative, is preferred rather than required",
      "Early- to mid-career researchers particularly encouraged"
    ],
    steps: [
      "Read two of the Center's own working papers before applying and reference them specifically. The applicant pool here is small enough that a generic letter is obvious.",
      "If your background is purely clinical, build one piece of health-systems work first — a costing exercise, a district-level access audit, an analysis of an existing NSSO or NFHS dataset. The open-data entry in this index is where to start tonight.",
      "Health financing is the part clinicians consistently skip and the part this field actually runs on. A free course in health economics closes more of the gap than another clinical posting.",
      "Watch their page directly. This role is not advertised through the usual scholarship aggregators."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 1
  },
  {
    id: "dth-lab",
    name: "DTH-Lab Fellowship — digital health governance",
    org: "Digital Transformations for Health Lab",
    type: "fellowship", country: "Global", city: "Remote",
    fields: ["pubhealth", "global", "systems", "compbio"],
    stages: ["clin", "intern", "grad"], funding: "stipend",
    money: "Supported fellowship · terms set per call",
    duration: "Project-length, alongside study or work",
    window: "Applications have opened in the spring, with an April close in the last cycle",
    deadlineMonths: [3, 4],
    url: "https://www.dthlab.org/research-fellows",
    why: "Digital health is being governed right now, by a small number of people writing the rules for data, AI and platforms in health systems. This fellowship exists specifically to put students and early-career researchers from low- and middle-income countries in that conversation instead of leaving them to inherit its conclusions.",
    reqs: [
      "Students or early-career researchers aged 30 or under",
      "Based in a low- or middle-income country, which includes India",
      "An interest in policy and governance rather than in building the technology itself"
    ],
    steps: [
      "The age ceiling is real and it is 30, which makes this one of the few things in this index that is genuinely easier to reach as a student than as a consultant. Do not save it for later.",
      "You do not need to code. The work is governance, and a clinician who can explain what a data rule does to a real patient is the rarer contributor.",
      "Read the Lab's published reports before writing. Their output is short, specific, and tells you exactly what kind of thinking they want.",
      "Pair this with the WHO digital health material and one open-data project, so the application shows a line of interest rather than a single application."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "takemi-harvard",
    name: "Takemi Program in International Health",
    org: "Harvard T.H. Chan School of Public Health",
    type: "fellowship", country: "USA", city: "Boston",
    fields: ["pubhealth", "global", "systems"],
    stages: ["pg"], funding: "paid",
    money: "Funded research year · fellows secure or are awarded support per cohort",
    duration: "One academic year",
    window: "Applications open in the autumn for the following academic year",
    deadlineMonths: [11, 12, 1],
    url: "https://www.hsph.harvard.edu/takemi-program/",
    why: "A year at Harvard to work on health systems, aimed squarely at people who will go back and run them. Worth knowing about early even though you cannot apply yet, because it changes what a mid-career plan looks like: the people who get this spent their twenties building a health-systems record, not only a clinical one.",
    reqs: [
      "Mid-career health professionals and scholars — this is not an entry-level route",
      "A track record in health systems, policy or health economics",
      "A defined research project to pursue during the year"
    ],
    steps: [
      "File this under 'later' deliberately, then work backwards from it. The record it requires takes a decade to build and almost none of it is clinical.",
      "The Takemi fellows list is public. Read where five of them worked before their year, and you have an unusually honest map of what this career actually looks like.",
      "In the meantime, the routes that lead here are in this index already: an MPH, a health-systems research post, or the Duke policy fellowship above."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 5
  }
);

Object.assign(window.DB.impact, {
  "openwho":        { t: 3, odds: "Open to everyone, always", effort: "Hours per course, free", note: "The cheapest credible line you can add to a CV this month, and the one that makes a cold email to a global health researcher read as serious. Three deep courses beat fifteen scattered ones." },
  "cpigh-policy":   { t: 1, odds: "Small pool, and India is a named focus country", effort: "A real health-systems piece of work first, then the application", note: "Most global health policy is done to countries like yours by people from elsewhere. This is one of the few doors built the other way round, and it is paid." },
  "dth-lab":        { t: 2, odds: "Small cohort, narrow eligibility that works in your favour", effort: "An application and a reading week", note: "Aged 30 or under and based in an LMIC — a ceiling that makes this easier as a student than it will ever be again. Digital health rules are being written now; this is a seat at that table." },
  "takemi-harvard": { t: 2, odds: "Mid-career only — years away for a student", effort: "A decade of health-systems record", note: "Listed so you can aim at it, not apply to it. Read where its fellows worked before their year and you have a map of the career." }
});
