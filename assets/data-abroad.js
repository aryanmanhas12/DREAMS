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
    url: "https://admissions.oist.jp/research-internship",
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
    window: "Opens mid-November · closes 31 January, 23:59 CET",
    deadlineMonths: [11, 12, 1],
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
      "Register on the EPFL programs recruiting portal when applications open in mid-November. The window is about ten weeks and closes hard at 23:59 CET on 31 January.",
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
    name: "Government travel grants — ICMR, CSIR and ANRF/SERB",
    org: "Dept of Health Research · CSIR-HRDG · Anusandhan National Research Foundation",
    type: "scholarship", country: "Any", city: "Wherever the conference is",
    fields: ["pubhealth", "clinical", "neuro", "psych", "genomics", "biochem", "global", "infect", "onco"],
    stages: ["clin", "intern", "grad", "pg"], funding: "full",
    money: "ICMR up to ₹1,50,000 · CSIR 100% economy airfare · ANRF/SERB airfare, visa, airport taxes and registration up to ₹50,000",
    duration: "The length of the conference",
    window: "File 60–90 days before the conference. ANRF/SERB will not accept it outside that window at all",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://schemes.dhr.gov.in/",
    why: "This is the single most under-used route to a first foreign experience, and it inverts the usual problem. You do not need a scholarship, an admission offer or savings. You need an abstract accepted somewhere abroad, and the Government of India will reimburse the flight — up to ₹1.5 lakh under ICMR. What stops people is never the money and almost never the merit. It is that the application had to be filed sixty days before the conference and nobody told them, so they found the scheme three weeks out and were already ineligible.",
    reqs: [
      "An accepted oral or poster paper at an international conference, as lead or single author",
      "ICMR: no ICMR travel support in the past three years",
      "CSIR and ANRF/SERB: under 35 years of age",
      "An endorsement or no-objection letter from your college Dean — allow weeks for this",
      "A flight quotation from a government-approved agent: Balmer Lawrie, Ashok Travels or IRCTC. A private booking site quote is rejected",
      "Conference acceptance letter, abstract, conference brochure, one-page CV, and age proof"
    ],
    steps: [
      "Submit the abstract first. Everything here is downstream of an acceptance letter, and acceptances usually arrive three to five months before the meeting — which is exactly the window these schemes need.",
      "The day the acceptance arrives, start the Dean's endorsement letter and the government travel-agent quote in parallel. Those two are the slow items and they are the ones that make people miss the window.",
      "File 60 to 90 days ahead. ANRF/SERB enforces both ends of that window — too early is rejected as firmly as too late.",
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
      "Inlet two, running in parallel: apply to the summer research programmes that pay. EPFL closes 31 January; OIST closes 15 October and 15 April; the IISER and IAS summer fellowships run on similar timelines inside India as a fallback.",
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
  "oist-internship":   { t: 2, odds: "Competitive, with two shots a year", effort: "25 hrs plus the permission letter", note: "Four to six funded months in Okinawa, and two intakes a year rather than one. The gate is not academic — it is getting your medical college to release you for four months, which has to be negotiated months before the deadline." }
});
