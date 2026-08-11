/* Meridian — Study programmes open to medical graduates (MBBS / MD / MBChB).
   Every entry verified against the institution's own admissions page.
   `fields` uses the shared taxonomy in app.js. */

window.DB = window.DB || {};

window.DB.study = [
  /* ─────────────────────────── UNITED KINGDOM ─────────────────────────── */
  {
    id: "lshtm-mph",
    name: "MSc Public Health",
    org: "London School of Hygiene & Tropical Medicine",
    type: "masters", country: "UK", city: "London",
    fields: ["pubhealth", "global", "systems", "infect"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ £30,000 tuition · Commonwealth Shared & Chevening both fund it",
    duration: "1 year full-time (or 2–5 yrs by distance learning)",
    window: "Opens Oct · rolling until courses fill · apply by Jan for funding",
    deadlineMonths: [10, 11, 12, 1, 2, 3],
    url: "https://www.lshtm.ac.uk/study/courses/masters-degrees",
    why: "The single most recognised public-health masters in the world for people who want to work in global health. Its distance-learning route is the cheapest credible way for an Indian doctor to hold an LSHTM degree without leaving the country.",
    reqs: ["MBBS or equivalent second-class honours", "IELTS 7.0 (6.5 per component)", "No work experience required for MSc Public Health"],
    steps: [
      "Pick your stream first — Public Health, Health Services Management, Environment & Health, or Health Promotion. They have different cores.",
      "Register on the LSHTM online application portal and start early: the personal statement asks for a specific public-health problem you want to work on.",
      "Two academic references. For an MBBS student, one should be a department head who has seen you do research, not just teach you.",
      "Apply for Commonwealth Shared Scholarship in the SAME cycle — it is applied for through LSHTM, not separately, and closes months before term.",
      "If cost is the blocker, apply to the distance-learning MSc instead: roughly a third of the price, same degree certificate."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "lshtm-gmh",
    name: "MSc Global Mental Health",
    org: "LSHTM & King's College London (joint)",
    type: "masters", country: "UK", city: "London",
    fields: ["psych", "global", "pubhealth"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ £32,000 · Commonwealth and Chevening eligible",
    duration: "1 year full-time",
    window: "Opens Oct · apply by Jan–Mar for scholarship alignment",
    deadlineMonths: [10, 11, 12, 1, 2, 3],
    url: "https://www.lshtm.ac.uk/study/courses/masters-degrees/global-mental-health",
    why: "Run jointly with the Institute of Psychiatry, Psychology & Neuroscience — the department that produced most of the evidence base for task-shifted mental health care in low-income countries. If your anger is about mental health being ignored, this is the degree that trains you to fix it at population scale.",
    reqs: ["MBBS, psychology, or social science degree", "IELTS 7.0", "Demonstrated interest in mental health — a project, an internship, a screener you built"],
    steps: [
      "Write the personal statement around one concrete gap you have seen — a district with no psychiatrist, a stigma you watched play out. Specific beats passionate.",
      "Name the faculty whose work you have actually read. This course reads for that.",
      "Apply through LSHTM's portal; the degree is awarded jointly with KCL.",
      "Flag Commonwealth Shared Scholarship interest inside the application — India is eligible and mental health is a priority theme."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "ox-msc-gh",
    name: "MSc Global Health Science & Epidemiology",
    org: "University of Oxford",
    type: "masters", country: "UK", city: "Oxford",
    fields: ["pubhealth", "global", "infect", "compbio"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ £34,000 · Clarendon, Rhodes and Weidenfeld all fund it",
    duration: "1 year full-time",
    window: "Two gathered fields: early Nov and early Jan",
    deadlineMonths: [10, 11, 12, 1],
    url: "https://www.ndph.ox.ac.uk/study-with-us",
    why: "Heavy quantitative training — you leave able to run a real epidemiological analysis, not just describe one. Sits inside the Nuffield Department of Population Health, which runs some of the largest cohort studies on earth.",
    reqs: ["Strong first degree; MBBS accepted", "Comfort with numbers — they test this", "IELTS 7.5 overall"],
    steps: [
      "Apply in the NOVEMBER gathered field, not January. Scholarship consideration at Oxford is tied to the earlier deadline.",
      "One tick-box on the Oxford form puts you in the Clarendon pool automatically — do not miss it.",
      "Rhodes India is a separate application with an earlier deadline (usually July–Aug). If you want it, you are applying a year ahead.",
      "Submit a written work sample if requested — a research proposal you actually wrote counts."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "ox-msc-neuro",
    name: "MSc Neuroscience",
    org: "University of Oxford",
    type: "masters", country: "UK", city: "Oxford",
    fields: ["neuro", "compbio", "psych"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ £36,000 · Clarendon eligible",
    duration: "1 year full-time",
    window: "Gathered field deadlines Nov and Jan",
    deadlineMonths: [10, 11, 12, 1],
    url: "https://www.ox.ac.uk/admissions/graduate/courses",
    why: "A laboratory-based conversion year that turns a clinically trained doctor into someone a neuroscience PhD programme will take seriously. Two research projects, both examinable.",
    reqs: ["MBBS or science degree", "Prior lab or computational experience helps a great deal", "IELTS 7.5"],
    steps: [
      "Identify two Oxford labs you would want your rotations in and say so in the statement.",
      "Apply in the November gathered field for scholarship consideration.",
      "If your quantitative background is thin, finish an online neuroscience or Python course BEFORE applying and name it — it converts intent into evidence."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "kcl-ioppn",
    name: "MSc Mental Health Studies / Neuroscience / Psychiatric Research",
    org: "King's College London — Institute of Psychiatry, Psychology & Neuroscience",
    type: "masters", country: "UK", city: "London",
    fields: ["psych", "neuro", "compbio"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ £33,000 · Commonwealth and Chevening eligible",
    duration: "1 year full-time",
    window: "Opens Oct · rolling admissions, apply by Mar",
    deadlineMonths: [10, 11, 12, 1, 2, 3, 4, 5],
    url: "https://www.kcl.ac.uk/ioppn",
    why: "The IoPPN is consistently the top-ranked psychiatry research institution outside the United States. Its MSc Psychiatric Research is unusually good preparation for a PhD, because the dissertation is treated as a real study rather than a coursework exercise.",
    reqs: ["MBBS or psychology/biomedical degree, 2:1 equivalent", "IELTS 7.0", "Research statement"],
    steps: [
      "Choose deliberately between the three: Mental Health Studies is broad, Neuroscience is wet-lab and computational, Psychiatric Research is methods-heavy.",
      "Apply early — rolling admissions means late strong applicants lose to earlier adequate ones.",
      "Email a potential dissertation supervisor before you apply. At IoPPN this is normal and welcomed."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "ucl-msc",
    name: "MSc Global Health & Development / Clinical Neuroscience",
    org: "University College London",
    type: "masters", country: "UK", city: "London",
    fields: ["global", "pubhealth", "neuro"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ £31,000 · Commonwealth Shared Scholarship partner",
    duration: "1 year full-time",
    window: "Opens Oct · closes Mar–Jun by programme",
    deadlineMonths: [10, 11, 12, 1, 2, 3, 4, 5, 6],
    url: "https://www.ucl.ac.uk/study/prospective-students/graduate",
    why: "UCL's Institute for Global Health is a genuine policy pipeline — students routinely move into WHO, MSF and national health ministries. The Queen Square neurology campus next door is the largest neuroscience centre in Europe.",
    reqs: ["2:1 equivalent; MBBS accepted", "IELTS 7.0", "Relevant experience valued but not required"],
    steps: [
      "UCL is a Commonwealth Shared Scholarship partner — check the eligible-course list before choosing your programme, it changes yearly.",
      "The personal statement should show you have read UCL-specific work, not generic global health enthusiasm.",
      "Apply by January if you want any chance at departmental bursaries."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "edin-msc",
    name: "MSc Global Health / Epidemiology (on-campus & online)",
    org: "University of Edinburgh",
    type: "masters", country: "UK", city: "Edinburgh",
    fields: ["pubhealth", "global", "infect"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ £28,000 on-campus · online route ≈ £11,000 total, paid per year",
    duration: "1 year on-campus · 3 years online part-time",
    window: "Opens Sept · rolling to Jun",
    deadlineMonths: [9, 10, 11, 12, 1, 2, 3, 4, 5, 6],
    url: "https://study.ed.ac.uk/postgraduate",
    why: "Edinburgh's online masters programmes are the best-value route to a top-25 university degree while you are still working in India. You can start it during internship and finish it before you leave.",
    reqs: ["2:1 equivalent", "IELTS 7.0", "Online route has identical entry standards"],
    steps: [
      "Decide on-campus versus online honestly. Online is not lesser — the certificate does not say 'online'.",
      "Pay per year rather than upfront on the online route; you can pause between years.",
      "Edinburgh Global Research Scholarships are separate and close in February."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "cam-mphil",
    name: "MPhil Population Health Sciences / Basic & Translational Neuroscience",
    org: "University of Cambridge",
    type: "masters", country: "UK", city: "Cambridge",
    fields: ["pubhealth", "neuro", "compbio", "genomics"],
    stages: ["grad", "pg"], funding: "full",
    money: "≈ £40,000 · Gates Cambridge covers it entirely",
    duration: "9–12 months",
    window: "Opens Sept · Gates deadline early Dec for international",
    deadlineMonths: [9, 10, 11, 12],
    url: "https://www.postgraduate.study.cam.ac.uk/courses",
    why: "The MPhil is the standard Cambridge on-ramp to a PhD. Gates Cambridge funds roughly 25 international scholars a year at full cost and explicitly looks for people committed to improving the lives of others — which is exactly the framing a public-health medic already has.",
    reqs: ["High 2:1 / first equivalent", "IELTS 7.5", "Research proposal for research-track MPhils"],
    steps: [
      "One Cambridge application form covers both course admission and Gates Cambridge — tick the funding box.",
      "The international Gates deadline is in early December and is HARD. Cambridge course deadlines are later; do not use the later one.",
      "Gates wants a clear answer to 'why you, why this, why now' — write the leadership and service parts honestly, they are assessed."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "imperial-msc",
    name: "MSc Public Health / Epidemiology / Human Molecular Genetics",
    org: "Imperial College London",
    type: "masters", country: "UK", city: "London",
    fields: ["pubhealth", "genomics", "compbio", "infect"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ £34,000",
    duration: "1 year full-time",
    window: "Opens Oct · closes Mar–Jul",
    deadlineMonths: [10, 11, 12, 1, 2, 3, 4, 5, 6, 7],
    url: "https://www.imperial.ac.uk/study/courses",
    why: "Imperial's MSc Epidemiology is the most mathematically serious in the UK, and the school modelled COVID for the British government. Choose it if you want to become genuinely quantitative rather than conversant.",
    reqs: ["2:1 in a relevant subject; MBBS accepted", "IELTS 7.0", "Mathematics comfort is genuinely required for Epidemiology"],
    steps: [
      "Be honest about your quantitative level. The Epidemiology MSc will be punishing without prior statistics.",
      "Human Molecular Genetics is the better fit if your interest is bench and genome rather than population.",
      "President's Scholarships are separate and highly competitive."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },

  /* ───────────────────────── UNITED STATES ───────────────────────── */
  {
    id: "harvard-mph45",
    name: "MPH-45 (accelerated) — Global Health, Epidemiology, or Health Policy",
    org: "Harvard T.H. Chan School of Public Health",
    type: "masters", country: "USA", city: "Boston",
    fields: ["pubhealth", "global", "systems", "infect"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ $75,000 total · Fulbright-Nehru and Inlaks both fund Harvard",
    duration: "11 months (on-campus) or 2 years part-time online",
    window: "Opens Sept · Round 1 early Dec, final deadline Jan",
    deadlineMonths: [9, 10, 11, 12, 1],
    url: "https://hsph.harvard.edu/admissions/",
    why: "This is the single most important fact on this page for an Indian medical graduate: Harvard's 45-credit MPH requires a prior DOCTORAL degree — and MBBS counts. You are eligible for the accelerated route that most applicants are not, and it costs a year less than the 65-credit programme.",
    reqs: ["MBBS satisfies the doctoral-degree requirement", "TOEFL/IELTS unless prior degree taught in English", "GRE not required for most departments"],
    steps: [
      "Confirm your MBBS is being read as the doctoral-equivalent qualification — state it plainly in the application, do not assume the reader knows what MBBS is.",
      "Apply through SOPHAS (the shared public-health application system), not directly to Harvard.",
      "Round 1 in early December carries the best funding odds. The January round is effectively for people who missed it.",
      "Ask for the WES or ECE credential evaluation early — Indian transcripts take weeks to verify.",
      "Apply to Fulbright-Nehru in parallel, one cycle ahead: it needs three years of work experience, so plan for it during internship and junior residency rather than immediately."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "jhu-mph",
    name: "Master of Public Health",
    org: "Johns Hopkins Bloomberg School of Public Health",
    type: "masters", country: "USA", city: "Baltimore",
    fields: ["pubhealth", "global", "systems", "repro", "infect"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ $70,000 · substantial internal aid for strong applicants",
    duration: "11 months full-time · or part-time online over 2–3 yrs",
    window: "Rounds from Oct through Mar",
    deadlineMonths: [10, 11, 12, 1, 2, 3],
    url: "https://publichealth.jhu.edu/academics",
    why: "The largest school of public health in the world, and the one that most reliably converts an MBBS into a global health career. Bloomberg expects and welcomes physicians — a large share of every MPH cohort holds a medical degree.",
    reqs: ["Bachelor's degree; MBBS strongly preferred", "Two years of post-bachelor's health experience (internship counts)", "TOEFL 100 / IELTS 7.0"],
    steps: [
      "The two-year experience requirement is real but generously interpreted — your MBBS internship and any research employment counts. Document it explicitly.",
      "Apply through SOPHAS. Start six weeks before the deadline; transcript verification is the bottleneck.",
      "Bloomberg's online/part-time MPH lets you keep working in India while studying — same faculty, same degree.",
      "Ask each recommender for a letter that names one thing you built or finished. Generic praise is invisible here."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 2
  },
  {
    id: "yale-mph",
    name: "MPH — Social & Behavioral Sciences / Chronic Disease Epidemiology",
    org: "Yale School of Public Health",
    type: "masters", country: "USA", city: "New Haven",
    fields: ["pubhealth", "psych", "global"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ $65,000 · Yale gives need- and merit-based aid to internationals",
    duration: "2 years (advanced-standing 1 year for physicians)",
    window: "Opens Sept · deadline Jan",
    deadlineMonths: [9, 10, 11, 12, 1],
    url: "https://ysph.yale.edu/admissions-financial-aid/",
    why: "Yale offers advanced standing to applicants who already hold a medical degree, compressing the MPH to one year. Its Social & Behavioral Sciences track is where mental health, stigma and health behaviour actually live.",
    reqs: ["MBBS qualifies for advanced standing consideration", "TOEFL 100", "GRE optional"],
    steps: [
      "Explicitly request advanced-standing consideration in your application — it is not automatic.",
      "Apply through SOPHAS by the January deadline.",
      "Yale's funding for internationals is real but need-blind admission is not — apply for aid at the same time, never after."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "columbia-mailman",
    name: "MPH — Sociomedical Sciences / Epidemiology",
    org: "Columbia Mailman School of Public Health",
    type: "masters", country: "USA", city: "New York",
    fields: ["pubhealth", "psych", "global", "systems"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ $80,000 · accelerated 1-yr option for physicians",
    duration: "2 years · 1 year accelerated for MD/MBBS holders",
    window: "Rounds Oct through Feb",
    deadlineMonths: [10, 11, 12, 1, 2],
    url: "https://www.publichealth.columbia.edu/academics",
    why: "Mailman runs an accelerated MPH specifically for applicants who already hold a professional doctorate — including MBBS. Being in New York also means real access to UN agencies and the largest health NGOs on earth.",
    reqs: ["MBBS qualifies for the accelerated programme", "TOEFL 100 / IELTS 7.0", "SOPHAS application"],
    steps: [
      "Apply to the Accelerated MPH, not the standard two-year, if you hold MBBS — it halves the cost.",
      "Sociomedical Sciences is the department for stigma, mental health and structural determinants.",
      "New York's cost of living is the hidden fee. Budget roughly $2,000/month beyond tuition."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "emory-mph",
    name: "MPH / MSPH — Global Health, Hubert Department",
    org: "Emory Rollins School of Public Health",
    type: "masters", country: "USA", city: "Atlanta",
    fields: ["pubhealth", "global", "infect", "repro"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ $55,000 · Rollins gives generous merit aid to internationals",
    duration: "2 years",
    window: "Opens Sept · priority deadline Dec, final Feb",
    deadlineMonths: [9, 10, 11, 12, 1, 2],
    url: "https://sph.emory.edu/admissions/",
    why: "Next door to the US CDC, with a formal pipeline into it. Emory is meaningfully cheaper than the Ivy-adjacent schools and hands out more merit money to international applicants, which makes it the best value-per-prestige MPH in America.",
    reqs: ["Bachelor's or MBBS", "TOEFL 100", "Some global health experience preferred"],
    steps: [
      "Apply in the December priority round — that is when the merit scholarships are allocated.",
      "Say clearly which CDC-adjacent problem you want to work on. Emory reads for placement fit.",
      "The MSPH is the research-heavy variant; choose it if a PhD is the eventual goal."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "us-phd-neuro",
    name: "PhD in Neuroscience / Epidemiology / Computational Biology",
    org: "US research universities (Stanford, MIT, UCSF, Michigan, UNC, Washington)",
    type: "phd", country: "USA", city: "Various",
    fields: ["neuro", "compbio", "pubhealth", "genomics", "psych"],
    stages: ["grad", "pg"], funding: "full",
    money: "Fully funded: tuition waived + $38,000–$52,000 annual stipend + health cover",
    duration: "5–6 years",
    window: "Opens Sept · deadlines 1–15 Dec almost universally",
    deadlineMonths: [9, 10, 11, 12],
    url: "https://www.nsfgrfp.org/",
    why: "The most important thing Indian medical students get wrong: US PhDs are PAID. You do not need a masters first, you do not need to self-fund, and MBBS is accepted as the prior degree. A funded PhD is a job with a salary, not a fee you have to raise.",
    reqs: ["MBBS accepted as the qualifying degree", "Research experience is the single deciding factor — publications help but a real project matters more", "TOEFL 100; GRE now optional at most programmes", "Three strong letters, at least two from researchers"],
    steps: [
      "Build the research record FIRST. One completed project with an output beats five certificates of attendance.",
      "Email 3–5 potential supervisors in September with a specific, technical question about their work — ideally after reproducing one of their figures. This single habit converts applications more than any credential.",
      "Almost every US PhD deadline is 1–15 December. Work backwards: letters requested by early November, statement drafted by October.",
      "Apply to 8–12 programmes across a range of selectivity. Admission is noisy, and fit matters more than rank.",
      "Never pay for a US PhD. If a programme offers admission without funding, that is a signal, not an opportunity."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },

  /* ───────────────────────── GERMANY ───────────────────────── */
  {
    id: "heidelberg-mscph",
    name: "MSc International Health / Master of Science in Health Economics",
    org: "Heidelberg Institute of Global Health, Universität Heidelberg",
    type: "masters", country: "Germany", city: "Heidelberg",
    fields: ["global", "pubhealth", "systems"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Tuition ≈ €7,000–14,000 · DAAD EPOS covers it fully",
    duration: "1 year full-time, or modular over 3 years",
    window: "DAAD EPOS applications close Aug–Oct for the following year",
    deadlineMonths: [7, 8, 9, 10],
    url: "https://www.klinikum.uni-heidelberg.de/",
    why: "Germany's flagship international health masters, and one of the courses DAAD EPOS funds completely — tuition, a monthly stipend, flights and health insurance. The modular tropEd route lets you take individual modules across European partner schools.",
    reqs: ["MBBS + normally 2 years professional experience for the DAAD-funded route", "English-taught — no German needed for the degree", "IELTS 6.5 or equivalent"],
    steps: [
      "Check whether your target course sits on the DAAD EPOS development-related postgraduate list. If it does, apply through DAAD, not only through the university.",
      "The two-year experience requirement for EPOS is firm — plan this for after internship plus a year, not straight out of MBBS.",
      "Learn A1–A2 German anyway. It changes daily life and it is free at Goethe-Institut partner centres in India.",
      "Apply to the university AND to DAAD; they are separate processes with separate deadlines."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 2
  },
  {
    id: "charite-msc",
    name: "MSc Molecular Medicine / International Health / Health & Society",
    org: "Charité — Universitätsmedizin Berlin",
    type: "masters", country: "Germany", city: "Berlin",
    fields: ["biochem", "genomics", "global", "pubhealth"],
    stages: ["grad", "pg"], funding: "free",
    money: "No tuition fee — only a semester contribution of ≈ €350",
    duration: "2 years",
    window: "Applications typically Feb–May for October start",
    deadlineMonths: [2, 3, 4, 5],
    url: "https://www.charite.de/en/",
    why: "Europe's largest university hospital, and the degree is effectively free — German public universities charge no tuition even to international students. Your only real cost is living in Berlin, which is the cheapest major capital in Western Europe.",
    reqs: ["MBBS or biomedical bachelor's", "Some courses require German B2, molecular tracks are English-taught", "Blocked account of ≈ €11,900 for the student visa"],
    steps: [
      "Verify the teaching language of the specific track before anything else. This is where most Indian applicants waste a cycle.",
      "Get your MBBS assessed on ANABIN / uni-assist early — German recognition of Indian degrees is procedural and slow.",
      "Open the blocked account (Sperrkonto) with Expatrio, Fintiba or Coracle before the visa appointment; it is the hard requirement, not the university offer.",
      "Book the German student visa appointment the day you get an offer. Indian slots at the Consulate run months behind."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "germany-phd-mpi",
    name: "PhD / IMPRS Doctoral Programmes",
    org: "Max Planck Institutes & Helmholtz Association",
    type: "phd", country: "Germany", city: "Various",
    fields: ["neuro", "genomics", "biochem", "compbio", "psych"],
    stages: ["grad", "pg"], funding: "full",
    money: "Fully funded — TVöD contract or fellowship ≈ €1,800–2,500/month net, no tuition",
    duration: "3–4 years",
    window: "IMPRS calls usually open Sept–Nov and Mar–May",
    deadlineMonths: [3, 4, 5, 9, 10, 11],
    url: "https://www.mpg.de/en/imprs",
    why: "The International Max Planck Research Schools are free to apply to, taught entirely in English, fully funded, and take applicants directly from a medical degree. The Max Planck Institute of Psychiatry in Munich is one of the few places in the world doing exactly the molecular-plus-clinical psychiatry you would otherwise have to invent for yourself.",
    reqs: ["MBBS accepted; some schools ask for a masters, many do not for medical graduates", "No German required", "Research experience matters far more than marks"],
    steps: [
      "Browse imprs.mpg.de by topic, not by city. Find the three institutes doing your exact question.",
      "IMPRS runs a single central application per school — one form, several possible labs.",
      "Write to the group leader before applying. German PIs answer specific emails and ignore generic ones.",
      "If you have no masters, apply anyway and address it directly: many IMPRS schools take medical graduates on a 'fast-track' basis."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "germany-drmed",
    name: "Dr. med. / Dr. rer. nat. clinical doctorate",
    org: "German university hospitals (Hannover MHH, LMU, TUM, Tübingen)",
    type: "phd", country: "Germany", city: "Various",
    fields: ["clinical", "biochem", "neuro", "genomics"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Often a research scholarship of ≈ €800–1,500/month; no tuition",
    duration: "1–3 years",
    window: "Rolling — depends entirely on the supervising professor",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.mhh.de/en",
    why: "A shorter research doctorate that runs alongside or just after clinical training. There is no admissions committee — you find a professor who agrees to supervise you, and that is the entire gate. For a doctor with a specific question and a contact, it is the least bureaucratic research doctorate in Europe.",
    reqs: ["Medical degree", "A willing supervisor — this is the whole process", "German usually needed for clinical work; lab-based projects often English"],
    steps: [
      "Identify the professor first, the institution second. The relationship is the application.",
      "Send a two-paragraph email: what you have done, what you want to study, what you can contribute. Attach a one-page CV.",
      "Ask directly whether the project is Dr. med. (clinical, shorter) or Dr. rer. nat. (science, longer, more portable). The second travels better internationally.",
      "Learn German to B1 regardless — it is what turns a research stay into a career."
    ],
    indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },

  /* ───────────────────────── AUSTRALIA ───────────────────────── */
  {
    id: "melb-mph",
    name: "Master of Public Health",
    org: "University of Melbourne",
    type: "masters", country: "Australia", city: "Melbourne",
    fields: ["pubhealth", "global", "systems", "env"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ AUD 100,000 for 2 yrs · 1 year with advanced standing for MBBS",
    duration: "1–2 years (MBBS holders often get 50 % credit)",
    window: "Two intakes: apply by Oct for Feb start, by Apr for Jul start",
    deadlineMonths: [3, 4, 5, 9, 10, 11],
    url: "https://study.unimelb.edu.au/find/courses/graduate/master-of-public-health/",
    why: "Australia gives advanced standing for a medical degree far more readily than the UK or US, often halving the programme to one year. Post-study work rights of 2–3 years follow automatically, which makes the maths work differently from Britain.",
    reqs: ["MBBS with credit average", "IELTS 6.5 overall", "Advanced standing assessed on application"],
    steps: [
      "Apply for advanced standing / credit at the point of application, with your full MBBS transcript and syllabus. It can cut a year and roughly AUD 50,000.",
      "Two intakes per year means a missed deadline costs six months, not twelve.",
      "The Graduate Research Scholarship and Melbourne International Scholarship are separate applications.",
      "Factor in the post-study work visa (subclass 485) — it is the reason Australia often out-competes the UK on total value."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "unsw-mph",
    name: "Master of Public Health / Master of Global Health",
    org: "University of New South Wales, Sydney",
    type: "masters", country: "Australia", city: "Sydney",
    fields: ["pubhealth", "global", "infect", "systems"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ AUD 55,000/year · Kirby Institute scholarships available",
    duration: "1.5–2 years",
    window: "Three intakes per year; apply 3 months ahead",
    deadlineMonths: [1, 2, 5, 6, 9, 10],
    url: "https://www.unsw.edu.au/study",
    why: "Home to the Kirby Institute and the George Institute for Global Health, both of which run large trials in South Asia. If you want to work on Indian populations from an Australian base, this is the most direct link.",
    reqs: ["MBBS or health-related bachelor's", "IELTS 6.5", "Recognition of prior learning available"],
    steps: [
      "Three intakes a year makes UNSW unusually forgiving of timing.",
      "Look at the George Institute's India operation specifically — it employs and supervises Indian medical graduates.",
      "Apply for course credit based on MBBS at the same time as admission."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "anu-mae",
    name: "Master of Philosophy in Applied Epidemiology (MAE)",
    org: "Australian National University",
    type: "masters", country: "Australia", city: "Canberra",
    fields: ["pubhealth", "infect", "compbio"],
    stages: ["grad", "pg"], funding: "full",
    money: "Scholarship-supported with a living stipend for accepted scholars",
    duration: "2 years",
    window: "Applications usually close Aug–Sept for the following year",
    deadlineMonths: [7, 8, 9],
    url: "https://nceph.anu.edu.au/study",
    why: "Australia's field epidemiology training programme — you are placed inside a real health department and do outbreak investigation as your degree. It is the closest thing outside the US CDC to being trained as a disease detective.",
    reqs: ["Health or science degree; medical graduates strongly favoured", "Placement-based, so competitive", "IELTS 6.5"],
    steps: [
      "This is a placement programme — your application is assessed on fit with a host field site.",
      "Apply early; cohorts are small.",
      "If you cannot get in, the equivalent in India is the India EIS (Epidemic Intelligence Service) run with the NCDC and US CDC. Apply there too."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 1
  },
  {
    id: "aus-phd",
    name: "PhD with scholarship (RTP)",
    org: "Australian universities — Melbourne, Sydney, Monash, UQ, UNSW",
    type: "phd", country: "Australia", city: "Various",
    fields: ["neuro", "psych", "pubhealth", "genomics", "compbio"],
    stages: ["grad", "pg"], funding: "full",
    money: "Research Training Program: fees waived + ≈ AUD 33,000–37,000 tax-free stipend",
    duration: "3–4 years",
    window: "Two rounds a year, typically closing Aug–Oct and Apr–May",
    deadlineMonths: [4, 5, 8, 9, 10],
    url: "https://www.education.gov.au/research-block-grants/research-training-program",
    why: "Australian PhD scholarships are tax-free, cover full fees for international students, and — unlike the UK — the country actively wants you to stay afterwards. A medical degree plus one solid research project is a competitive application.",
    reqs: ["MBBS + demonstrated research capacity (a thesis, publication, or substantial project)", "A supervisor who has agreed to take you — this is mandatory before you apply", "IELTS 6.5"],
    steps: [
      "Find the supervisor before you find the university. No Australian PhD application progresses without one.",
      "Send a proposal of one to two pages plus your CV. Australian academics reply to concrete proposals.",
      "Apply in the earlier round — scholarship pools are allocated first-come.",
      "Ask explicitly about RTP Stipend eligibility for international students; some scholarships are domestic-only and you want to know before investing months."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },

  /* ───────────────────────── EUROPE (non-UK/DE) ───────────────────────── */
  {
    id: "karolinska-msc",
    name: "MSc Global Health / Public Health Sciences / Biomedicine",
    org: "Karolinska Institutet",
    type: "masters", country: "Sweden", city: "Stockholm",
    fields: ["global", "pubhealth", "biochem", "neuro"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ SEK 200,000/yr · KI Global Master's Scholarship waives all tuition",
    duration: "2 years",
    window: "Single national round: 16 Oct – 15 Jan for autumn start",
    deadlineMonths: [10, 11, 12, 1],
    url: "https://education.ki.se/",
    why: "The institution that awards the Nobel Prize in Physiology or Medicine. Sweden runs one national application portal with a single hard deadline in mid-January — miss it and there is no late round, so it belongs in your calendar a year ahead.",
    reqs: ["MBBS accepted", "IELTS 6.5", "Sweden's universityadmissions.se portal — one application, up to four choices"],
    steps: [
      "Apply through universityadmissions.se, not the university site. Ranking your four choices matters.",
      "The 15 January deadline is absolute. Document upload has a slightly later date — do not confuse the two.",
      "Apply for the KI Global Master's Scholarship in the same window; it covers full tuition for non-EU students.",
      "Sweden is dark from November to February. Take that seriously if low light affects your mood — vitamin D and a light lamp are standard equipment, not a joke."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "nihes-msc",
    name: "MSc Clinical Epidemiology / Health Sciences (NIHES)",
    org: "Erasmus MC, Rotterdam",
    type: "masters", country: "Netherlands", city: "Rotterdam",
    fields: ["pubhealth", "compbio", "genomics"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ €22,000 · Holland Scholarship and Erasmus MC grants available",
    duration: "1–2 years, modular",
    window: "Rolling with intake rounds; summer programme each August",
    deadlineMonths: [1, 2, 3, 4, 5, 6],
    url: "https://www.erasmusmc.nl/en/graduate-school/nihes",
    why: "The Netherlands Institute for Health Sciences trains clinicians to become epidemiologists, and its modular structure means you can take a three-week summer course to test the field before committing to a degree. The Rotterdam Study, run here, is one of the longest-running population cohorts in existence.",
    reqs: ["Medical or health science degree", "IELTS 6.5", "Modules can be taken individually"],
    steps: [
      "Start with the three-week August summer programme if you are unsure. It is a genuine low-risk trial of the field.",
      "Dutch universities are English-taught at postgraduate level throughout — no Dutch needed.",
      "The Holland Scholarship is €5,000 in the first year only, awarded by the institution; apply directly to Erasmus MC."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "maastricht-euro",
    name: "Europubhealth+ — Erasmus Mundus European Public Health Master",
    org: "Consortium: Rennes EHESP, Sheffield, Kraków, Granada, Copenhagen",
    type: "masters", country: "Europe", city: "Multi-country",
    fields: ["pubhealth", "global", "systems"],
    stages: ["grad", "pg"], funding: "full",
    money: "Erasmus Mundus scholarship: full tuition + €1,400/month + travel + insurance",
    duration: "2 years across two or more countries",
    window: "Opens Oct–Nov · scholarship deadline usually Jan",
    deadlineMonths: [10, 11, 12, 1],
    url: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en",
    why: "Erasmus Mundus is the most under-applied major scholarship available to Indians — full funding, a living allowance well above student needs, and you study in two or three European countries on one degree. Indians are consistently among the top three nationalities awarded.",
    reqs: ["Bachelor's or MBBS", "English proficiency", "No work experience required for most consortia"],
    steps: [
      "Search the official EACEA catalogue for your field — there are over 200 funded joint masters and most Indian students have heard of none of them.",
      "Apply to a maximum of three Erasmus Mundus programmes per cycle. Applying to more makes you ineligible.",
      "One application per consortium covers both admission and the scholarship.",
      "Deadlines cluster in December and January for an August–September start. Build the calendar backwards from there."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "swiss-neuro",
    name: "MSc / PhD Neuroscience — Neuroscience Center Zurich",
    org: "University of Zurich & ETH Zürich",
    type: "phd", country: "Switzerland", city: "Zurich",
    fields: ["neuro", "compbio", "psych"],
    stages: ["grad", "pg"], funding: "full",
    money: "PhD salary ≈ CHF 47,000–55,000/year — the highest-paid doctorate in the world",
    duration: "3–4 years",
    window: "Two calls a year: deadlines around 1 Dec and 1 Jun",
    deadlineMonths: [5, 6, 11, 12],
    url: "https://www.neuroscience.uzh.ch/en.html",
    why: "Swiss PhD students are employees on a real salary — enough to save on, which is unheard of elsewhere. The Zurich neuroscience programme takes medical graduates directly and runs entirely in English.",
    reqs: ["MBBS or MSc", "Strong research record", "No German required for the programme itself"],
    steps: [
      "Two application rounds a year with fixed deadlines, both fully centralised — you do not need a supervisor beforehand.",
      "Swiss Government Excellence Scholarships are a separate, parallel route with a September deadline through the Swiss embassy in India.",
      "Living costs are extreme. The salary covers it, but do not go on savings."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "ireland-msc",
    name: "MSc Global Health / Public Health",
    org: "Trinity College Dublin & University College Dublin",
    type: "masters", country: "Ireland", city: "Dublin",
    fields: ["global", "pubhealth", "systems"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ €18,000–25,000 · Government of Ireland scholarships available",
    duration: "1 year",
    window: "Rolling from Nov to Jun",
    deadlineMonths: [11, 12, 1, 2, 3, 4, 5, 6],
    url: "https://www.tcd.ie/courses/postgraduate/",
    why: "English-speaking, one-year masters, EU degree, and a two-year post-study work visa — Ireland quietly matches the UK's offer at a lower price with less competition.",
    reqs: ["Second-class honours or MBBS", "IELTS 6.5", "Rolling admission"],
    steps: [
      "Apply early in the cycle; rolling admissions reward it.",
      "The Government of Ireland International Education Scholarship is a separate March deadline.",
      "Check the two-year Third Level Graduate Programme visa — it is the reason Ireland's total cost often beats the UK's."
    ],
    indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },
  {
    id: "nordic-free",
    name: "Tuition-free masters — Norway, Finland, Denmark",
    org: "Oslo, Bergen, Helsinki, Copenhagen, Aarhus",
    type: "masters", country: "Nordics", city: "Various",
    fields: ["pubhealth", "global", "neuro", "env"],
    stages: ["grad", "pg"], funding: "free",
    money: "Norway: no tuition at public universities for many programmes · others ≈ €10,000–16,000",
    duration: "2 years",
    window: "Deadlines cluster Dec–Feb for an August start",
    deadlineMonths: [11, 12, 1, 2, 3],
    url: "https://www.studyinnorway.no/",
    why: "Norway's public universities have historically charged no tuition at all, including to international students — you pay only living costs. The trade is a high cost of living and long dark winters, but the degree itself can be free.",
    reqs: ["Recognised bachelor's or MBBS", "IELTS 6.5", "Proof of ≈ NOK 150,000 in a Norwegian account for the study permit"],
    steps: [
      "Verify current tuition policy for your exact programme before planning around it — Norway has been revising fees for non-EU students.",
      "The financial-proof requirement is the real barrier, not the tuition. Arrange it months ahead.",
      "Winter daylight in Oslo is under six hours in December. Be honest with yourself about that before committing two years."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },

  /* ───────────────────────── CANADA & ASIA ───────────────────────── */
  {
    id: "toronto-mph",
    name: "MPH / MSc — Dalla Lana School of Public Health",
    org: "University of Toronto",
    type: "masters", country: "Canada", city: "Toronto",
    fields: ["pubhealth", "global", "systems", "psych"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ CAD 60,000 total · funded MSc route available",
    duration: "2 years",
    window: "Opens Sept · deadline Dec–Jan",
    deadlineMonths: [9, 10, 11, 12, 1],
    url: "https://www.dlsph.utoronto.ca/",
    why: "Canada's largest public health school, with a three-year post-graduation work permit and a genuine route to permanent residency. The research-stream MSc is often funded, unlike the professional MPH.",
    reqs: ["MBBS accepted", "IELTS 7.0 / TOEFL 100", "MSc stream requires a supervisor match"],
    steps: [
      "Apply to the thesis-based MSc rather than the course-based MPH if funding matters — the MSc carries stipends, the MPH usually does not.",
      "Canada's post-graduation work permit length tracks your programme length. A two-year degree earns a three-year permit.",
      "Vanier Canada Graduate Scholarships apply at doctoral level and are worth CAD 50,000/year for three years."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "nus-sph",
    name: "MPH / MSc — Saw Swee Hock School of Public Health",
    org: "National University of Singapore",
    type: "masters", country: "Singapore", city: "Singapore",
    fields: ["pubhealth", "infect", "compbio", "systems"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ SGD 50,000 · substantial NUS scholarships for Asian applicants",
    duration: "1 year full-time",
    window: "Opens Oct · deadline typically Jan–Feb",
    deadlineMonths: [10, 11, 12, 1, 2],
    url: "https://sph.nus.edu.sg/",
    why: "A top-ten global university three and a half hours from Delhi, in a country where the food, climate and Indian community make the transition close to frictionless. If cold weather or distance from family is a real constraint for you, Singapore solves both without lowering the ceiling.",
    reqs: ["MBBS with good standing", "IELTS 6.5 / TOEFL 90", "Some tracks prefer clinical experience"],
    steps: [
      "Apply by the January round; Singapore's cycles are short and unforgiving.",
      "Look at the NUS Graduate Scholarship for ASEAN and Asian applicants specifically.",
      "Singapore's Long Term Visit Pass makes bringing family more feasible than most destinations."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "japan-mext",
    name: "MEXT-funded Masters / PhD in Medical Sciences",
    org: "Japanese national universities (Tokyo, Kyoto, Osaka, Tohoku)",
    type: "phd", country: "Japan", city: "Various",
    fields: ["neuro", "genomics", "biochem", "onco"],
    stages: ["grad", "pg"], funding: "full",
    money: "MEXT: no tuition + ¥144,000–148,000/month + return airfare",
    duration: "2 years masters · 3–4 years PhD (+ 6-month language prep)",
    window: "Embassy recommendation opens ~Apr–May each year",
    deadlineMonths: [4, 5, 6],
    url: "https://www.studyinjapan.go.jp/en/",
    why: "One of the most generous and least-contested government scholarships available to Indians. It covers everything, includes a language year, and Japanese neuroscience and genomics institutes are world-class while attracting a fraction of the applications that US programmes do.",
    reqs: ["Under 35 for most categories", "MBBS accepted", "No Japanese required at application — it is taught to you"],
    steps: [
      "Apply through the Embassy of Japan in India (embassy recommendation route) — it has better odds than the university recommendation route.",
      "The application opens around April and involves a written exam plus interview in India.",
      "Contact a potential supervisor early; a letter of acceptance from a professor strengthens the application enormously.",
      "Budget for the six-month intensive Japanese course — it is part of the award, not an obstacle."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },

  /* ───────────────────────── INDIA (strong domestic routes) ───────────────────────── */
  {
    id: "india-mph",
    name: "MPH / MSc — domestic routes worth taking seriously",
    org: "PGIMER Chandigarh · AIIMS · IIPH (PHFI) · TISS · CMC Vellore · Manipal",
    type: "masters", country: "India", city: "Various",
    fields: ["pubhealth", "global", "systems", "repro"],
    stages: ["grad", "pg"], funding: "partial",
    money: "₹50,000 – ₹8,00,000 depending on institution",
    duration: "2 years",
    window: "Entrance exams Feb–Jun",
    deadlineMonths: [2, 3, 4, 5, 6],
    url: "https://phfi.org/",
    why: "Going abroad is not the only serious answer, and pretending otherwise is how good people waste years. PGIMER and the Indian Institutes of Public Health produce researchers who publish in the same journals. An Indian MPH plus a strong publication record is a better PhD application than a foreign masters with nothing attached to it.",
    reqs: ["MBBS or BDS/BAMS/nursing depending on institution", "Institution-specific entrance examination", "Some require one year of experience"],
    steps: [
      "PGIMER Chandigarh's MPH is the strongest public-sector option and costs a fraction of a private one.",
      "PHFI's Indian Institutes of Public Health have campuses in Delhi, Gandhinagar, Hyderabad, Bhubaneswar and Shillong.",
      "Treat this as a launchpad: an Indian MPH with two publications beats a foreign MPH with none, for PhD admissions everywhere."
    ],
    indiaSpecific: true, competitiveness: "medium", workExp: 0
  },
  {
    id: "india-phd",
    name: "PhD in Biomedical Sciences — funded Indian routes",
    org: "NIMHANS · NBRC · CCMB · IISc · inStem · NCBS · IITs",
    type: "phd", country: "India", city: "Various",
    fields: ["neuro", "psych", "genomics", "biochem", "compbio"],
    stages: ["grad", "pg"], funding: "full",
    money: "CSIR/UGC-JRF or institutional fellowship ≈ ₹37,000–42,000/month + HRA",
    duration: "4–5 years",
    window: "Entrance rounds in Dec–Feb and May–Jul; DBT-BET and CSIR-NET are the gateways",
    deadlineMonths: [1, 2, 5, 6, 7, 12],
    url: "https://nimhans.ac.in/",
    why: "NIMHANS Bengaluru is genuinely world-class in psychiatry and neurosciences — its cohorts are cited internationally and it has data no Western institution can access. If your question is about Indian brains and Indian populations, the answer may be that the best place to study it is here.",
    reqs: ["MBBS accepted directly for most biomedical PhDs", "DBT-JRF / ICMR-JRF / CSIR-NET or institutional entrance", "MD/MS holders get preferential entry at NIMHANS"],
    steps: [
      "Sit DBT-BET or ICMR-JRF — these are the fellowships that make an Indian PhD paid rather than self-funded.",
      "For NIMHANS, the PhD in Clinical Neurosciences and Psychiatric Genetics both accept MBBS holders.",
      "The India Alliance (DBT/Wellcome Trust) Early Career Fellowship does NOT require a PhD for clinicians — a clinician with a research record can hold one directly. This is the single biggest structural advantage Indian doctors have and almost nobody uses it.",
      "Look at GenomeIndia data through the Indian Biological Data Centre. Ten thousand Indian genomes are publicly available and desperately under-analysed."
    ],
    indiaSpecific: true, competitiveness: "medium", workExp: 0
  }
];
