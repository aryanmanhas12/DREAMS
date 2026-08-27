/* Dream Counsellor — six routes that did not exist anywhere else in this
   index: a US-government-funded research year that is based in India, two
   of the world's most famous leadership fellowships (both genuinely open to
   an Indian MBBS holder, neither requiring a US or UK undergraduate degree),
   a paid-but-serious short-course route into epidemiology, a real way into
   MSF that does not require the two years of field experience the field
   roles ask for, and the hackathon circuit nobody points students to.

   Facts here; grades at the bottom, as everywhere. */

window.DB = window.DB || {};
window.DB.research = window.DB.research || [];
window.DB.funding = window.DB.funding || [];
window.DB.study = window.DB.study || [];

window.DB.funding.push(
  {
    id: "fogarty-fellowship",
    name: "Fogarty/NIH Global Health Fellowship — NPGH LEADERs Consortium",
    org: "NIH Fogarty International Center, via the Northern Pacific Global Health consortium",
    type: "fellowship", country: "India", city: "An Indian research institution, with 1–3 months at a US partner site",
    fields: ["global", "infect", "pubhealth", "genomics", "biochem", "neuro"],
    stages: ["pg"], funding: "full",
    money: "A living stipend sized to local cost of living, plus research and travel support — paid whether you are based in India or briefly at the US site",
    duration: "12 months",
    window: "Cycle typically opens in autumn and closes in winter for a start the following July",
    deadlineMonths: [10, 11, 12, 1],
    url: "https://fogartyfellows.org/apply/",
    why: "A full year of US-government-funded mentored research, done mostly in India with a paired US mentor and a short spell at their university — the University of Washington, Indiana, Michigan and Minnesota consortium all take Indian trainees. This is not a relocation programme; it is US-calibre funding and mentorship landing on Indian soil, which is the opposite of every other route in this section.",
    reqs: [
      "Doctoral-level trainee in a health profession — MD, MBBS-with-research-registration, or enrolled in a relevant doctoral programme",
      "Citizen or permanent resident of India",
      "A proposed India-based mentor and, ideally, informal contact with a US-side mentor before applying",
      "Available to spend 1–3 months at the US consortium university during the fellowship year"
    ],
    steps: [
      "Read the NPGH LEADERs consortium's current partner list on fogartyfellows.org — the US-side mentor you approach should already have India ties or an active collaborator here.",
      "Draft a one-year research plan with your India-based mentor before you touch the application; the US partnership is easier to arrange once the local half exists.",
      "Apply through the portal in the autumn cycle for a July start. This is a once-a-year window, not rolling.",
      "Budget the 1–3 month US stint separately: visa timing (a J-1 exchange visa, typically) needs its own runway alongside the fellowship paperwork."
    ],
    indiaSpecific: true, competitiveness: "high", workExp: 0
  },
  {
    id: "knight-hennessy",
    name: "Knight-Hennessy Scholars",
    org: "Stanford University",
    type: "scholarship", country: "USA", city: "Stanford, California",
    fields: ["global", "systems", "compbio", "pubhealth", "clinical"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full cost of any Stanford graduate degree — tuition, housing, a living stipend, health insurance and one round-trip flight a year, for up to three years",
    duration: "Length of the Stanford graduate degree, up to 3 years of KHS funding",
    window: "Opens roughly May · KHS closed 6 October, 1 pm Pacific · the Stanford programme has its OWN, often earlier, deadline",
    deadlineMonths: [5, 6, 7, 8, 9, 10],
    url: "https://knight-hennessy.stanford.edu/admission/before-you-apply/eligibility",
    why: "This is not a scholarship you apply to on its own — you win a place in a Stanford graduate programme (an MS, a PhD, an MPP, occasionally the MD) and Knight-Hennessy then funds all of it, badged with a two-year leadership curriculum on top. No nationality restriction and no requirement that your first degree be American. The two-step nature — get into Stanford, then get funded — is exactly why almost nobody outside the US even considers it.",
    reqs: [
      "First bachelor's degree completed no earlier than January 2020 for the current cohort (the window rolls forward each year)",
      "Separate admission to, and enrolment in, an eligible full-time Stanford graduate degree programme",
      "Under 29 as of 1 August of your enrolment year"
    ],
    steps: [
      "Identify the actual Stanford graduate programme first — an MS in Epidemiology, Health Policy, or a relevant PhD track are the realistic entry points for a medical graduate, not the MD.",
      "The KHS application and the Stanford programme application are two separate submissions on two separate systems, and they do NOT share a deadline. KHS closes in early October; the Stanford programme is due by its own deadline or 1 December, whichever falls first, and for many programmes that is earlier than the KHS date. Look up your specific programme's deadline before you plan around October, because assuming they are the same is how people lose the degree application while winning the scholarship one.",
      "Because this funds up to three years and stacks a leadership cohort of ~70 scholars from every country on top, treat it as the single highest-ceiling entry in this whole index if your graduate plan is Stanford-shaped.",
      "Confirm the current cohort's exact age and degree-date cut-offs on the eligibility page before investing the months this application takes."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "schwarzman-scholars",
    name: "Schwarzman Scholars",
    org: "Tsinghua University, Beijing",
    type: "scholarship", country: "China", city: "Beijing",
    fields: ["global", "systems", "pubhealth"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full tuition, room and board at Schwarzman College, round-trip airfare, in-country study tours, a laptop and a personal stipend",
    duration: "1-year Master's in Global Affairs",
    window: "Opens spring · closes early October",
    deadlineMonths: [4, 5, 6, 7, 8, 9, 10],
    url: "https://www.schwarzmanscholars.org/admissions/",
    why: "A one-year, fully funded Master's in Global Affairs at Tsinghua built explicitly around leadership across public health, economics, technology and policy — open to any nationality, any first degree, no GPA cut-off published. For an MBBS graduate aiming at health policy or global health leadership rather than a lab bench, this is a faster and less specialised route than a two-year MPH, and it is barely applied to from Indian medical schools.",
    reqs: [
      "Bachelor's degree or equivalent completed by the programme's August start",
      "Aged 18 to 29 as of 1 August of the enrolment year",
      "Strong English; the programme is taught in English",
      "A leadership record — student government, research leadership, organising, not necessarily healthcare-specific"
    ],
    steps: [
      "Write the essays around a genuinely health-systems angle — reviewers see enough generic 'China is rising' essays that a specific, medical-background argument stands out.",
      "Two references who can speak to leadership, not just academic performance, matter more here than in a typical scholarship.",
      "The interview round (for shortlisted candidates) is conducted in person or by video in late autumn/winter — keep that window free.",
      "One year is short by design: treat it as a credential and network year before returning to clinical practice, an MPH, or policy work, not as a destination in itself."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  }
);

window.DB.study.push(
  {
    id: "jhu-summer-institute",
    name: "Johns Hopkins Summer Institute of Epidemiology and Biostatistics",
    org: "Johns Hopkins Bloomberg School of Public Health",
    type: "skill", country: "USA", city: "Baltimore, and online/hybrid",
    fields: ["pubhealth", "genomics", "compbio", "global"],
    stages: ["clin", "intern", "grad", "pg"], funding: "self",
    money: "Paid tuition per course — typically $1,000–3,000 depending on course length; no stipend",
    duration: "Individual courses run 4 hours to 2 weeks, taken across a 3-week Institute in June",
    window: "Registration opens in winter · Institute runs 8–26 June 2026",
    deadlineMonths: [1, 2, 3, 4, 5, 6],
    url: "https://publichealth.jhu.edu/academics/graduate-summer-institute-of-epidemiology-and-biostatistics",
    why: "This is the one entry in the whole index that is neither a scholarship nor a competition. It is a paid short course, open to anyone, that hands you a real Johns Hopkins transcript line in epidemiology or biostatistics without a multi-year admissions process. For a student who wants to test whether public health is actually their direction before committing to an MPH, a single two-week course here is the cheapest possible way to find out, and the credit is transferable if you do go on to a Hopkins degree.",
    reqs: [
      "None — open to clinicians, students, and public health practitioners worldwide",
      "Some quantitative courses assume undergraduate-level statistics; check individual course prerequisites",
      "Ability to pay course fees; no financial aid is offered for the short-course track"
    ],
    steps: [
      "Pick one course, not several — 'Statistical Reasoning in Public Health' and 'Epidemiologic Inference' are the two most commonly taken by clinicians testing the field.",
      "Online and hybrid formats exist alongside in-person Baltimore delivery; the online option removes the visa and travel cost entirely.",
      "Register early — popular courses fill before the formal deadline.",
      "If public health turns out to be the direction, the same school's MPH applications (see the separate JHU MPH entry) look at this favourably as demonstrated interest."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "accessible", workExp: 0
  }
);

window.DB.research.push(
  {
    id: "msf-india-internship",
    name: "MSF India Internship Programme",
    org: "Médecins Sans Frontières / Doctors Without Borders — South Asia",
    type: "research", country: "India", city: "Delhi (MSF India office)",
    fields: ["global", "pubhealth", "infect", "clinical"],
    stages: ["clin", "intern", "grad"], funding: "partial",
    money: "Pro-rata travel allowance (~₹9,900 for 22 days) and complimentary lunch; not a stipend",
    duration: "2 to 6 months",
    window: "Rolling applications, no fixed cycle",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://msfsouthasia.org/msf-internship-programme/",
    why: "The field roles everyone associates with MSF need two years of post-qualification clinical experience, which shuts out every medical student. This does not — it is an office internship in Delhi across Communications, Fundraising, HR, Finance or the Access Campaign, and it is the actual way most people's MSF career starts. Being able to say you interned at MSF, understanding how the organisation actually runs, and building the internal relationships that matter when you do qualify for a field post two years later — that is the real value, not the (small) travel allowance.",
    reqs: [
      "No prior MSF experience required",
      "Enrolled in or recently graduated from a relevant degree, matched to the department applied to",
      "Available for 2–6 months in Delhi"
    ],
    steps: [
      "Check msfsouthasia.org's current openings page rather than applying speculatively — internships are posted against specific department needs.",
      "Apply to Communications or the Access Campaign if your interest is global health policy; Fundraising or HR if it is organisational operations — both are legitimate paths to a field role later.",
      "Applications are rolling but high-volume; only shortlisted candidates hear back, so do not wait for a rejection before applying elsewhere.",
      "Use the internship to build one real reference inside MSF — that reference is what matters when you apply for a field post once you clear the two-year clinical-experience bar."
    ],
    zeroCost: false, indiaSpecific: true, competitiveness: "accessible", workExp: 0
  },
  {
    id: "health-hackathons",
    name: "Health-tech hackathons — MIT Hacking Medicine and the wider circuit",
    org: "MIT Hacking Medicine and regional partner hospitals/universities",
    type: "skill", country: "Global", city: "Varies — Boston GrandHack plus regional editions across Asia and elsewhere",
    fields: ["compbio", "systems", "clinical", "global"],
    stages: ["pre", "clin", "intern", "grad"], funding: "self",
    money: "Regional editions are usually free to enter; the annual Boston GrandHack normally charges a participation fee unless you win a 'Golden Ticket' (full flight, accommodation and fees) from a regional event",
    duration: "A single weekend, typically 24–48 hours",
    window: "Regional hackathons run through the year; GrandHack in Boston is usually March",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://hackingmedicine.mit.edu/",
    why: "No age or background restriction, no application essay, and a weekend is a far smaller bet than any fellowship in this index — you show up with a clinical problem you have actually seen and team up with engineers and designers to prototype a fix. The realistic payoff is not winning; it is the team you meet and the fact that a stand-out performance at a regional edition can win a fully funded seat at the Boston GrandHack, which is a genuine door into global health-tech.",
    reqs: [
      "None formally — open to anyone, students explicitly included",
      "Bring a real clinical problem, not a general interest in 'health-tech' — teams form around specific pitches"
    ],
    steps: [
      "Watch hackingmedicine.mit.edu's events page and MIT Hacking Medicine's social channels for the nearest regional edition — Southeast Asia (Siriraj x MIT Hacking Medicine) is the closest recurring one to India.",
      "Come with one specific clinical pain point you have personally observed on the wards — a triage delay, a documentation gap, a diagnostic bottleneck. That specificity is what gets a team to form around your pitch rather than someone else's.",
      "Standout individual performers at regional events are sometimes individually selected for a fully funded 'Golden Ticket' to the following year's Boston GrandHack — ask organisers directly whether the edition you attend runs this.",
      "Treat the weekend as networking and portfolio-building, not as the finish line — the strongest outcome is an ongoing side project with the team you meet, not the prize."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "accessible", workExp: 0
  }
);

/* ─────────────────────────── grades ─────────────────────────── */

window.DB.impact = window.DB.impact || {};
Object.assign(window.DB.impact, {
  "knight-hennessy":      { t: 1, odds: "Very low, but uncapped in payoff", effort: "40+ hrs across two linked applications", note: "Fully funds any Stanford graduate degree for up to three years with no nationality restriction — the highest ceiling in this index if your plan is Stanford-shaped. Rated top tier because almost nobody outside the US even applies, which is its own kind of odds improvement." },
  "fogarty-fellowship":   { t: 1, odds: "Moderate — needs a mentor relationship in place first", effort: "30 hrs plus months building the mentor link", note: "US-government-funded, India-based, mentored research year that does not require relocating. The rare route where the funding comes to you rather than the other way round." },
  "schwarzman-scholars":  { t: 2, odds: "Low, but genuinely open to any background", effort: "25 hrs", note: "One fully funded year at Tsinghua built around leadership, not medicine specifically — the fastest credentialed route into global health policy for someone who wants out of the lab bench." },
  "msf-india-internship": { t: 2, odds: "High relative to the MSF name", effort: "5 hrs to apply", note: "The field roles need two years of clinical experience nobody has as a student. This is the office-side door that is actually open now, and it is how most people's MSF career starts." },
  "jhu-summer-institute": { t: 3, odds: "Open enrolment, cost is the only gate", effort: "5 hrs to register, then the course itself", note: "Not a scholarship — a paid Johns Hopkins short course. The cheapest way that exists to find out whether public health is your direction before committing to a full MPH." },
  "health-hackathons":    { t: 3, odds: "Open enrolment", effort: "One weekend", note: "No application, no essay, the smallest possible bet in this entire index. The real payoff is the team you meet, occasionally a funded ticket to Boston GrandHack for a standout performance." }
});
