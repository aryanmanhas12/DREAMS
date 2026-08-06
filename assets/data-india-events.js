/* Dream Counsellor — what you can do without leaving the country.

   The rest of this index points outward. This file exists because the outward
   routes all quietly assume something you may not have yet: that you have stood
   up in front of a room and defended your own work. Almost nobody's first talk
   should be in another country, in a second language, to strangers. It should be
   in your own department, in front of people who already know you.

   So this is the ladder — journal club, institutional research day, state
   chapter, national conference — plus the Indian institutions that will train a
   medical student properly and charge nothing or close to it. NIMHANS, IISc,
   the IISERs, NCBS. These are not the consolation prize for people who cannot
   go abroad. A student who has presented twice at a national society meeting is
   a stronger applicant to everything else in this index than one who has not.

   Facts here; grades at the bottom, as everywhere else. */

window.DB = window.DB || {};
window.DB.research = window.DB.research || [];
window.DB.study = window.DB.study || [];

window.DB.research.push(
  {
    id: "nimhans-training",
    name: "NIMHANS — short courses, observerships and the free Digital Academy",
    org: "National Institute of Mental Health and Neurosciences, Bengaluru",
    type: "research", country: "India", city: "Bengaluru",
    fields: ["psych", "neuro", "pubhealth", "clinical", "global"],
    stages: ["pre", "clin", "intern", "grad", "pg"], funding: "full",
    money: "Digital Academy courses are free or a few hundred rupees · short-term training and observerships charge modest institutional fees · no travel funding, so budget for Bengaluru",
    duration: "A few hours for an online module · 2 weeks to 3 months for observership and short-term training",
    window: "Digital Academy runs continuously · observership and short course applications are reviewed through the year",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://nimhans.ac.in/",
    why: "The best mental health and neuroscience institution in the country will teach you for free, online, right now, and most Indian medical students have never opened the page. The NIMHANS Digital Academy runs proper structured courses in psychiatry, addiction medicine, child mental health and suicide prevention, taught by the people who write the national guidelines. On top of that the institute takes observers and short-term trainees from other colleges. If psychiatry or neurology is where you are heading, a NIMHANS certificate and a named supervisor there is worth more inside India than most foreign summer schools, and it costs a fraction as much.",
    reqs: [
      "Digital Academy courses: an MBBS enrolment is enough for most, and some are open to any health worker",
      "Observership and short-term training: a letter from your Dean or Head of Department, and a specific department you want to sit in",
      "No entrance test for the short courses",
      "Bengaluru accommodation is on you — factor a month's rent into the plan"
    ],
    steps: [
      "Start with the Digital Academy tonight. It is free, it is asynchronous, and finishing two courses gives you something concrete to name in every application in this index.",
      "For an observership, write to a specific department — child and adolescent psychiatry, addiction medicine, neurology — and to a specific consultant whose work you have actually read. A general letter to the institute goes nowhere.",
      "Ask about the ongoing research projects when you write. Observership becomes a data-collection role for many students, and that is how the authorship happens.",
      "Time it to your college holidays, and get the Dean's permission in writing before you book anything.",
      "Confirm current fees and course lists on the NIMHANS site — these change every academic year."
    ],
    zeroCost: true, indiaSpecific: true, competitiveness: "accessible", workExp: 0
  },
  {
    id: "iiser-summer",
    name: "IISER summer research programmes and winter schools",
    org: "IISER Pune, Mohali, Kolkata, Bhopal, Thiruvananthapuram and Tirupati",
    type: "research", country: "India", city: "Pune and other IISER campuses",
    fields: ["biochem", "neuro", "genomics", "compbio", "nutrition"],
    stages: ["pre", "clin", "intern", "grad"], funding: "full",
    money: "Stipend of roughly ₹6,000–10,000 a month plus hostel accommodation; several also reimburse second-class rail fare",
    duration: "6–8 weeks, usually May to July",
    window: "Applications open around December and close February–March",
    deadlineMonths: [12, 1, 2, 3],
    url: "https://www.iiserpune.ac.in/",
    why: "The IISERs were built to do basic science properly and they run summer programmes that pay you, house you and put you in a working laboratory for two months. IISER Pune's biology and neuroscience groups in particular publish at an international level. The reason to care as a medical student is that this is the cheapest way in the country to find out whether you actually like bench research before you commit a doctorate to it — and a supervisor here writes the reference that makes a foreign application credible.",
    reqs: [
      "Current enrolment in a science or medical degree; MBBS students are eligible and are a smaller part of the pool than you would think",
      "Marks matter for shortlisting — first-year and second-year results are what you have",
      "A short statement naming the laboratory and the problem you want to work on",
      "Some campuses ask for a faculty recommendation"
    ],
    steps: [
      "Read faculty pages before you write anything. Applications that name a specific group and a specific recent paper are shortlisted; generic ones are not.",
      "Apply to several IISERs and to the Indian Academy of Sciences fellowship in the same season — they run on similar timelines and cost you nothing but effort.",
      "Say plainly that you are an MBBS student. Basic-science groups value a clinical perspective and it is a differentiator in a pile of BSc applications, not a handicap.",
      "If nothing comes through the formal route, email individual faculty directly in January asking about an unfunded summer project. It works more often than the formal route for medical students."
    ],
    zeroCost: true, indiaSpecific: true, competitiveness: "medium", workExp: 0
  }
);

window.DB.study.push(
  {
    id: "present-first-paper",
    name: "Your first presentation — the ladder from journal club to a national podium",
    org: "Your own college, then your state chapter, then the national society",
    type: "skill", country: "India", city: "Wherever you already are",
    fields: ["clinical", "pubhealth", "psych", "neuro", "systems"],
    stages: ["pre", "clin", "intern", "grad", "pg"], funding: "full",
    money: "Nothing for the first two rungs. National conference registration for students is usually ₹2,000–6,000, and many societies waive it for presenting authors.",
    duration: "One academic year to climb all four rungs",
    window: "Rolling — your own department's sessions run every month",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.icmr.gov.in/",
    why: "Everything else in this index eventually asks you to stand up and defend your own work to people who did not have to be kind to you. That skill is built in a specific order, and the order matters: journal club in your own department, then your institution's research day, then a state chapter meeting, then a national conference. Students who skip to the top rung get destroyed in the question session and quietly stop trying. Students who climb it arrive at their first international abstract already knowing what a hostile question feels like.",
    reqs: [
      "Rung one — journal club: nothing but volunteering. Your department runs one and is usually short of presenters.",
      "Rung two — institutional research day or scientific day: a small project. An ICMR-STS study, an audit, even a well-done case series qualifies.",
      "Rung three — state chapter conference of your specialty society: an accepted abstract, typically 250–300 words.",
      "Rung four — national conference with a student or postgraduate paper session: the same abstract, submitted earlier and judged harder."
    ],
    steps: [
      "Volunteer for the next journal club this month. It is the only rung with no gatekeeper and it is the one that teaches you to stand still and speak slowly.",
      "Turn something you have already done into an abstract. Most students believe they have no data; most students have an audit, a case series or an STS project sitting unused.",
      "Submit to your state chapter first. Acceptance rates are high, the room is smaller, and the questions are gentler — which is exactly what you want for a first podium.",
      "Ask a senior resident to run a mock question session before you go. Two rounds of hostile questions in private is worth more than any amount of slide polishing.",
      "Enter the student or PG award paper category explicitly where one exists. The judging is separate from the main sessions and the competition is people at your own stage.",
      "Keep every certificate and every abstract book page. This is the evidence that fills the 'research experience' box on every application in this index."
    ],
    indiaSpecific: true, competitiveness: "accessible", workExp: 0
  },
  {
    id: "society-conferences-india",
    name: "National society conferences that run student and PG paper sessions",
    org: "ANCIPS · IAPSMCON · IANCON · ASICON · APICON and their state chapters",
    type: "conference", country: "India", city: "A different host city each year",
    fields: ["psych", "neuro", "pubhealth", "clinical", "systems", "infect"],
    stages: ["clin", "intern", "grad", "pg"], funding: "partial",
    money: "Student registration typically ₹2,000–6,000 · many societies waive it for presenting authors and several state chapters fund travel for award-paper finalists",
    duration: "2–4 days",
    window: "Abstract deadlines usually fall 3–5 months before the meeting; most national meetings sit between November and March",
    deadlineMonths: [7, 8, 9, 10, 11, 12],
    url: "https://www.indianpsychiatricsociety.org/",
    why: "Every major Indian specialty society runs an annual meeting with a paper session judged separately for students and postgraduates, and those sessions are chronically under-subscribed relative to the number of eligible students. This is where a network gets built — the person who chairs your session is often the person who later supervises your thesis or signs your reference. It is also the cheapest place in the world to learn how to answer a question you did not expect.",
    reqs: [
      "Membership of the relevant society, or a proposing member — most have a low student rate",
      "An accepted abstract, usually 250–300 words, submitted by the earlier abstract deadline rather than the registration deadline",
      "A supervising consultant as co-author for most clinical work",
      "Institutional ethics clearance for anything involving patient data — obtain it before you collect, not before you submit"
    ],
    steps: [
      "Pick the society that matches where you are actually heading. ANCIPS for psychiatry, IAPSMCON for community medicine and public health, IANCON for neurology, ASICON for surgery, APICON for internal medicine.",
      "Find the abstract deadline, not the conference date. It is usually months earlier and it is the only date that matters to you.",
      "Join your state chapter first. State meetings are smaller, cheaper, closer to home, and accept a much higher proportion of student abstracts.",
      "Ask explicitly about travel grants and registration waivers for presenting students. They exist at most societies and are almost never advertised.",
      "Go to the poster hall and talk to people whose posters you actually found interesting. That, not the sessions, is where the collaborations start.",
      "Verify dates, venue and abstract rules on the society's own site each cycle — these move every year."
    ],
    indiaSpecific: true, competitiveness: "accessible", workExp: 0
  },
  {
    id: "campus-research-culture",
    name: "Research societies, scientific days and campus events at the big institutes",
    org: "AIIMS · IISc Bengaluru · NCBS · JIPMER · CMC Vellore and your own college",
    type: "skill", country: "India", city: "Delhi, Bengaluru, Puducherry, Vellore and everywhere else",
    fields: ["clinical", "biochem", "neuro", "pubhealth", "compbio", "genomics"],
    stages: ["pre", "clin", "intern", "grad"], funding: "full",
    money: "Most campus lectures, open days and research-society events are free. Student festivals charge a small registration.",
    duration: "An evening to a week",
    window: "Through the academic year, concentrated between August and March",
    deadlineMonths: [8, 9, 10, 11, 12, 1, 2, 3],
    url: "https://www.iisc.ac.in/events/",
    why: "The institutions that run India's best science hold public lectures, open days and student research meets, and almost all of them are free to attend and open to anyone who turns up. IISc publishes its seminar calendar openly. NCBS runs public talks. AIIMS departments hold scientific days. Medical students spend years assuming these rooms are closed to them; they are not, and the person you introduce yourself to afterwards is how most Indian research careers actually begin.",
    reqs: [
      "Usually nothing at all for seminars and open days — check whether registration is required and turn up",
      "For a student research festival or paper competition, an abstract and often a small fee",
      "For a campus research society, membership of your own college's society, which typically needs no more than asking"
    ],
    steps: [
      "Put the IISc and NCBS public seminar calendars in your own calendar. They are published openly and cost nothing to attend if you are in Bengaluru.",
      "If your college has no research society, this is the single highest-return thing you can start. A journal club with six people and a shared drive of papers is enough to begin, and it is a leadership line that means something.",
      "Go to the annual open days at IISc, NCBS and the IISERs. They exist specifically to let outsiders in, and the laboratory tours are how you find a summer supervisor.",
      "Introduce yourself to one speaker after every talk with one specific question about their work. This is the entire networking skill and it is learnable.",
      "Ask your own department to let you run a scientific day if there is not one. Organising the event teaches you more than presenting at it."
    ],
    indiaSpecific: true, competitiveness: "accessible", workExp: 0
  }
);

/* ─────────────────────────── grades ─────────────────────────── */

window.DB.impact = window.DB.impact || {};
Object.assign(window.DB.impact, {
  "nimhans-training":        { t: 1, odds: "Open now, and free", effort: "A few hours for the first course", note: "The country's best mental health institute teaches structured courses online for nothing, and most Indian medical students have never opened the page. If psychiatry or neurology is the destination, this outranks most foreign summer schools on value and costs a hundredth as much." },
  "present-first-paper":     { t: 1, odds: "Entirely within your control", effort: "One academic year, spread thin", note: "Rated top tier because everything else in this index eventually asks you to defend your own work in a hostile room, and this is the only entry that builds that. The order matters — students who skip to a national podium get taken apart and quietly stop trying." },
  "iiser-summer":            { t: 2, odds: "Competitive, and MBBS students are a small part of the pool", effort: "12 hrs to apply properly", note: "Paid, housed, two months in a real laboratory, and the cheapest way in India to find out whether you like bench work before committing a doctorate to it. Name a specific group and a specific paper or the application goes nowhere." },
  "society-conferences-india":{ t: 2, odds: "Student paper sessions are under-subscribed", effort: "20 hrs including the abstract", note: "The cheapest place on earth to learn to answer a question you did not expect, and the chair of your session is often your future supervisor. Track the abstract deadline, not the conference date — it is months earlier and it is the one that matters." },
  "campus-research-culture": { t: 3, odds: "Open to anyone who turns up", effort: "An evening at a time", note: "IISc and NCBS publish their seminar calendars openly and medical students assume the rooms are closed. They are not. Starting a research society at your own college, if none exists, returns more than attending any of it." }
});
