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
      "Apply for Commonwealth Shared Scholarship in the SAME cycle. It is applied for through LSHTM, not separately, and closes months before term.",
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
    why: "Run jointly with the Institute of Psychiatry, Psychology & Neuroscience. The department that produced most of the evidence base for task-shifted mental health care in low-income countries. If your anger is about mental health being ignored, this is the degree that trains you to fix it at population scale.",
    reqs: ["MBBS, psychology, or social science degree", "IELTS 7.0", "Demonstrated interest in mental health. A project, an internship, a screener you built"],
    steps: [
      "Write the personal statement around one concrete gap you have seen. A district with no psychiatrist, a stigma you watched play out. Specific beats passionate.",
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
    window: "One deadline for 2027–28 entry: 12:00 midday UK time on 1 December 2026. About 28 places",
    deadlineMonths: [9, 10, 11],
    url: "https://www.ox.ac.uk/admissions/graduate/courses/msc-global-health-science-and-epidemiology",
    why: "Heavy quantitative training. You leave able to run a real epidemiological analysis, not just describe one. Sits inside the Nuffield Department of Population Health, which runs some of the largest cohort studies on earth.",
    reqs: ["Strong first degree; MBBS accepted", "Comfort with numbers. They test this", "IELTS 7.5 overall"],
    steps: [
      "Apply by 1 December 2026, 12:00 UK time. There is one deadline for this course, and meeting it is also what puts you in front of the Clarendon, Felix and other Oxford scholarship panels.",
      "One tick-box on the Oxford form puts you in the Clarendon pool automatically — do not miss it.",
      "Rhodes India is a separate application with an earlier deadline (usually July–Aug). If you want it, you are applying a year ahead.",
      "Submit a written work sample if requested. A research proposal you actually wrote counts."
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
    window: "One deadline for 2027–28 entry: 12:00 midday UK time on 1 December 2026. About 16 places",
    deadlineMonths: [9, 10, 11],
    url: "https://www.ox.ac.uk/admissions/graduate/courses/msc-neuroscience",
    why: "A laboratory-based conversion year that turns a clinically trained doctor into someone a neuroscience PhD programme will take seriously. Two research projects, both examinable.",
    reqs: ["MBBS or science degree", "Prior lab or computational experience helps a great deal", "IELTS 7.5"],
    steps: [
      "Identify two Oxford labs you would want your rotations in and say so in the statement.",
      "Apply by 1 December 2026, 12:00 UK time. There is one deadline, and it is also the one that puts you in front of the scholarship panels.",
      "If your quantitative background is thin, finish an online neuroscience or Python course BEFORE applying and name it. It converts intent into evidence."
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
      "Decide on-campus versus online honestly. Online is not lesser. The certificate does not say 'online'.",
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
    window: "Opens Sept · for Gates Cambridge funding the deadline is the course funding deadline: 8 December 2026 or 6 January 2027, depending on course",
    deadlineMonths: [9, 10, 11, 12],
    url: "https://www.postgraduate.study.cam.ac.uk/courses",
    why: "The MPhil is the standard Cambridge on-ramp to a PhD. Gates Cambridge funds roughly 25 international scholars a year at full cost and explicitly looks for people committed to improving the lives of others, which is exactly the framing a public-health medic already has.",
    reqs: ["High 2:1 / first equivalent", "IELTS 7.5", "Research proposal for research-track MPhils"],
    steps: [
      "One Cambridge application form covers both course admission and Gates Cambridge — tick the funding box.",
      "For funding, the date that matters is the Course Funding Deadline on the course page (8 December 2026 or 6 January 2027), not the later admission deadline. Gates Cambridge applications must be in by that date.",
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
    name: "MPH-45 (one-year MPH): Global Health, Health Policy and other fields",
    org: "Harvard T.H. Chan School of Public Health",
    type: "masters", country: "USA", city: "Boston",
    fields: ["pubhealth", "global", "systems", "infect"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Tuition $77,400 for 2026-27 plus $4,954 health insurance, before living costs · Fulbright-Nehru and Inlaks both fund Harvard",
    duration: "1 year full-time (the 2-year part-time online MPH is a separate programme, MPH-GEN)",
    window: "Apply through SOPHAS. One deadline, 1 December, with decisions in late February or early March",
    deadlineMonths: [9, 10, 11],
    url: "https://hsph.harvard.edu/admissions/applying-to-a-degree-program/program-eligibility-requirements/",
    checked: "2026-09",
    why: "The 45-credit MPH is Harvard's one-year route, and its entry rule is what makes it matter to a medical graduate: a master's or a doctoral degree, or, in Global Health, Health Policy, Health Management, Health and Social Behavior and Nutrition, a bachelor's plus five years of work. Harvard reads a foreign degree by its US equivalent through WES. If WES reads your MBBS as a doctoral-level medical degree, every field is open straight after internship; if it reads it as a bachelor's, the five-year route still gets you in later.",
    reqs: [
      "A master's or doctoral degree. For Global Health, Health Policy, Health Management, Health and Social Behavior and Nutrition, a bachelor's plus at least five years of work also qualifies",
      "Clinical Effectiveness, Occupational and Environmental Health and Quantitative Methods take a master's or doctoral degree only",
      "A WES credential evaluation for degrees from outside the US; Harvard points applicants to WES's Degree Equivalency Tool",
      "TOEFL, IELTS or the Duolingo English Test, if applicable"
    ],
    steps: [
      "Run your MBBS through WES's free Degree Equivalency Tool before anything else. What it says decides which fields you can apply to this year.",
      "Apply through SOPHAS (the shared public-health application system), to one programme only.",
      "There is a single deadline, 1 December. Order the full WES evaluation by early October, because Indian transcripts take weeks to verify.",
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
    why: "The largest school of public health in the world, and the one that most reliably converts an MBBS into a global health career. Bloomberg expects and welcomes physicians. A large share of every MPH cohort holds a medical degree.",
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
      "Explicitly request advanced-standing consideration in your application. It is not automatic.",
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
    window: "Opens in September; the priority deadline for master’s programmes, which is also the scholarship deadline, is 5 January",
    deadlineMonths: [9, 10, 11, 12, 1],
    url: "https://sph.emory.edu/admissions/",
    why: "Next door to the US CDC, with a formal pipeline into it. Emory is meaningfully cheaper than the Ivy-adjacent schools and hands out more merit money to international applicants, which makes it the best value-per-prestige MPH in America.",
    reqs: ["Bachelor's or MBBS", "TOEFL 100", "Some global health experience preferred"],
    steps: [
      "Apply in the December priority round. That is when the merit scholarships are allocated.",
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
    url: "https://biosciences.stanford.edu/admissions/",
    why: "The most important thing Indian medical students get wrong: US PhDs are PAID. You do not need a masters first, you do not need to self-fund, and MBBS is accepted as the prior degree. A funded PhD is a job with a salary, not a fee you have to raise.",
    reqs: ["MBBS accepted as the qualifying degree", "Research experience is the single deciding factor — publications help but a real project matters more", "TOEFL 100; GRE now optional at most programmes", "Three strong letters, at least two from researchers", "The money comes from the department, not from a fellowship you win first — which matters, because the NSF GRFP that dominates the search results is closed to you"],
    steps: [
      "Build the research record FIRST. One completed project with an output beats five certificates of attendance.",
      "Email 3–5 potential supervisors in September with a specific, technical question about their work — ideally after reproducing one of their figures. This single habit converts applications more than any credential.",
      "Almost every US PhD deadline is 1–15 December. Work backwards: letters requested by early November, statement drafted by October.",
      "Apply to 8–12 programmes across a range of selectivity. Admission is noisy, and fit matters more than rank.",
      "Ignore the NSF Graduate Research Fellowship. It is the first thing you will find and it requires US citizenship, US national status or a green card, so an Indian applicant is excluded before the first question. Departmental funding is the actual route and it is attached to the admission offer itself.",
      "Never pay for a US PhD. If a programme offers admission without funding, that is a signal, not an opportunity."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },

  /* ───────────────────────── GERMANY ───────────────────────── */
  {
    id: "heidelberg-mscph",
    name: "MSc International Health (MScIH)",
    org: "Heidelberg Institute of Global Health, Universität Heidelberg",
    type: "masters", country: "Germany", city: "Heidelberg",
    fields: ["global", "pubhealth", "systems"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Full-time tuition €14,100 for the year; part-time €7,863 plus about €6,000 of short courses. DAAD EPOS is the funded route",
    duration: "1 year full-time, or part-time through the tropEd network",
    window: "DAAD-EPOS applicants: 15 Aug to 15 Oct 2026. Self-funded: 16 Oct 2026 to 31 Mar 2027 (planned). Course starts September 2027",
    deadlineMonths: [8, 9, 10, 11, 12, 1, 2, 3],
    url: "https://www.klinikum.uni-heidelberg.de/heidelberger-institut-fuer-global-health/education/master-of-science-in-international-health/how-to-apply",
    checked: "2026-09",
    why: "Germany's flagship international health masters, and one of the courses on the DAAD EPOS list, which pays a monthly stipend, travel and insurance. Heidelberg names medical degrees as a qualifying first degree, and the part-time tropEd route lets you take modules across European partner schools while you keep working.",
    reqs: ["A 240-ECTS first degree in a public-health-relevant discipline; Heidelberg names medical degrees", "At least one year of relevant work experience, including public health work in a low- or middle-income setting", "For the DAAD-EPOS route: two years of professional experience and a degree no older than six years", "English-taught; no German needed for the degree"],
    steps: [
      "Decide the route first. The EPOS scholarship window closes on 15 October 2026 and the self-funded window only opens the day after.",
      "The experience rules differ: one year gets you admitted, two years gets you EPOS funding. Count yours honestly before choosing.",
      "Ask the course in writing whether the €14,100 fee is waived for EPOS scholars before you rely on it. The stipend covers living costs, not necessarily fees.",
      "Learn A1–A2 German anyway. It changes daily life, and EPOS can include a German course before the programme starts."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 2
  },
  {
    id: "charite-msc",
    name: "MSc Molecular Medicine / MSc International Health",
    org: "Charité — Universitätsmedizin Berlin",
    type: "masters", country: "Germany", city: "Berlin",
    fields: ["biochem", "genomics", "global", "pubhealth"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Both charge tuition. Molecular Medicine: €2,500 a semester (2026/27) plus fees. International Health: €12,900 in total, or DAAD EPOS for three scholars a year",
    duration: "Molecular Medicine 2 years; International Health 1 year full-time",
    window: "International Health DAAD-EPOS: 1 Aug to 15 Oct 2026. Molecular Medicine: portal opens December 2026, closes 31 May 2027",
    deadlineMonths: [8, 9, 10, 12, 1, 2, 3, 4, 5],
    url: "https://internationalhealth.charite.de/en/application_admission/",
    checked: "2026-09",
    why: "Europe's largest university hospital, with two English-taught masters an Indian doctor can reach. Neither is free, whatever the general rule about German public universities suggests. Molecular Medicine is for someone who wants the lab side of disease and has real bench experience. International Health is Charité's tropEd programme; its EPOS scholars take a German course in July and write their thesis at Mexico's National Institute of Public Health.",
    reqs: ["Molecular Medicine wants substantial hands-on lab training, not only a degree; the programme offers no stipends", "International Health EPOS route: a 240-ECTS degree with results in the upper third, two years' related work after it, and a degree under six years old", "Visa: a blocked account of about €12,000"],
    steps: [
      "Price it honestly first. Tuition plus about €12,000 of blocked-account living money is the real cost; the EPOS route is the only funded one here.",
      "International Health gets over 800 EPOS applications for three places. Apply, but put Heidelberg's EPOS course alongside it rather than instead.",
      "For Molecular Medicine, the lab experience is the application. List specific techniques you have run yourself.",
      "Book the German student visa appointment the day you get an offer. Indian slots at the consulates run months behind."
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
    money: "A Max Planck doctoral support contract, from 65 % of public-sector pay grade E13: just under €2,700 a month gross, about €2,100 net, with pension and no tuition",
    duration: "3 years, extendable by one",
    window: "Each school sets its own call; many run one or two a year, often closing October to January",
    deadlineMonths: [8, 9, 10, 11, 12, 1],
    url: "https://www.mpg.de/en/imprs",
    checked: "2026-09",
    why: "The International Max Planck Research Schools are free to apply to, taught in English and paid as employment, and some of them name a medical degree in their entry rules. The Max Planck Institute of Psychiatry's school in Munich is the clearest example and has its own card here. Entry rules differ school by school, so the degree question has to be settled for each one rather than assumed.",
    reqs: ["A master's or a medical degree, depending on the school. Check each school's own page for whether MBBS is named", "No German required", "Research experience matters far more than marks"],
    steps: [
      "Browse the IMPRS list by topic, not by city. Find the three schools doing your exact question.",
      "Open each school's application page and search it for 'medical'. If a medical degree is not named, email the coordinator before writing anything.",
      "Most schools run one central application: one form, several possible labs. Name the group leaders you want and say why.",
      "Write to the group leader before applying. German PIs answer specific emails and ignore generic ones."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "imprs-tp",
    name: "IMPRS for Translational Psychiatry: PhD",
    org: "Max Planck Institute of Psychiatry · LMU Munich",
    type: "phd", country: "Germany", city: "Munich",
    fields: ["psych", "neuro", "genomics"],
    stages: ["intern", "grad", "pg"], funding: "paid",
    money: "A salary and contract on the public-sector scale (TV-L), no tuition, conference travel funded, and interview travel covered",
    duration: "PhD, starting September to October 2027",
    window: "Open 15 Aug 2026. Applications close 31 Oct 2026, 24:00 CET; references by 7 Nov 2026. Selection March to May 2027",
    deadlineMonths: [8, 9, 10],
    url: "https://www.imprs-tp.mpg.de/2879/application",
    checked: "2026-09",
    why: "One of the very few doctoral schools that names a medical degree in its entry rules and says it particularly wants trainee doctors with lab experience. Depression, schizophrenia and anxiety are studied here from molecule to clinic, which is the psychiatry most Indian training never shows you. It is paid, English-taught, and the interview trip to Munich is on them.",
    reqs: [
      "A medical degree or a master's in a relevant field, completed by the time you start (not by the time you apply)",
      "MBBS holders qualify for the traditional PhD. The joint residency and PhD track does not accept an MBBS or an MD: it needs a degree equivalent to the German state exam, plus German at C1",
      "English proficiency (TOEFL or IELTS); no German for the PhD itself"
    ],
    steps: [
      "Apply for the traditional PhD position. Do not tick the joint residency track with an MBBS; the school says plainly that it will not qualify.",
      "Read the faculty list and name two or three PIs whose papers you have actually read. The two short essays are about your prior research and why these labs.",
      "Line up two referees now. References are due on 7 November, a week after your own deadline, and a late one sinks the application.",
      "A final-year student or intern can apply this October, because the degree only has to be finished by the September 2027 start."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "germany-drmed",
    name: "Dr. med. or a medical-faculty PhD in Germany",
    org: "German university medical faculties (Charité, LMU, Heidelberg, Hannover MHH and others)",
    type: "phd", country: "Germany", city: "Various",
    fields: ["clinical", "biochem", "neuro", "genomics"],
    stages: ["grad", "pg"], funding: "partial",
    money: "No tuition for the doctorate, but no funding is built in either. You live on a paid research post or a scholarship you find yourself",
    duration: "1–3 years",
    window: "Rolling. It starts when a professor agrees to supervise you",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://promotion.charite.de/en/doctoral_procedure/regulations_2017/requirements/",
    checked: "2026-09",
    why: "The least bureaucratic research doctorate in Europe for a doctor with a question and a contact: there is no national admissions round, and the supervisor is the real gate. Know which degree you are signing up for, though. The Dr. med. is shorter and clinical, and outside Germany it is often read as a professional title rather than a research doctorate. Freiburg's medical faculty, advising its own doctors on European Research Council eligibility in 2025, lists a PhD, a postdoc, a professorship or a Habilitation as proof of doctoral equivalence, and a Dr. med. is not on the list. Charité and several other faculties also offer a PhD to medicine graduates, which is the one that travels.",
    reqs: [
      "A completed medical degree; Charité's rule for the Dr. med. is exactly that, and its PhD accepts medicine too",
      "A statement from Germany's Central Office for Foreign Education (ZAB) that your MBBS entitles you to a doctorate, obtained before the project is registered. Your supervisor normally requests it",
      "A supervising professor. German is usually needed for clinical projects; lab projects often run in English"
    ],
    steps: [
      "Identify the professor first, the institution second. The relationship is the application.",
      "Send a two-paragraph email: what you have done, what you want to study, what you can contribute. Attach a one-page CV.",
      "Ask directly whether the project leads to a Dr. med. or a PhD. If you want a research career outside Germany, choose the PhD.",
      "Ask how you will be paid before you accept. A Dr. med. is often done unpaid alongside clinical work, which is not an option on a visa."
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
    money: "AUD 70,976 a year for 2027 entry (indicative total AUD 149,050); advanced standing for a health degree or experience can shorten it",
    duration: "2 years, shorter with advanced standing",
    window: "February and July intakes. The February 2027 intake closes 30 November 2026; the July 2026 intake closed 31 May 2026",
    deadlineMonths: [3, 4, 5, 9, 10, 11],
    url: "https://study.unimelb.edu.au/find/courses/graduate/master-of-public-health/how-to-apply/",
    checked: "2026-09",
    why: "One of Australia's strongest public health schools, and Melbourne says applicants with a professional health degree or relevant work experience may be granted advanced standing, which is where an MBBS helps. The part Indian applicants rarely know: under the Australia-India trade agreement (AI-ECTA), Indian graduates of a coursework master's can stay and work for up to three years afterwards, a year longer than most nationalities get.",
    reqs: ["An undergraduate degree with a weighted average of at least 2.8 on a 4-point scale; MBBS qualifies", "Advanced standing is assessed on application, not promised", "Post-study work (subclass 485): apply within six months of finishing, aged 35 or under for a coursework master's"],
    steps: [
      "Ask for advanced standing at the point of application, with your full MBBS transcript and syllabus. A year of credit is worth roughly AUD 71,000 at 2027 fees.",
      "Two intakes per year means a missed deadline costs six months, not twelve. The February 2027 round closes 30 November 2026.",
      "Budget for no scholarship. Melbourne's research scholarships are for research degrees, not this coursework MPH.",
      "Count the post-study years in the price: three for an Indian national after a coursework master's, under AI-ECTA. That is the reason Australia can out-compete the UK on total value."
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
    money: "About AUD 55,300 a year in tuition for 2027 entry, plus roughly AUD 1,000 a year of study costs",
    duration: "1.5–2 years",
    window: "February and September 2027 intakes are listed; check the programme page for each closing date",
    deadlineMonths: [1, 2, 5, 6, 9, 10],
    url: "https://www.unsw.edu.au/study/postgraduate/master-of-public-health",
    checked: "2026-09",
    why: "Home to the Kirby Institute and closely linked to the George Institute for Global Health, which runs an India office alongside its Sydney base. If you want to work on Indian populations from an Australian base, this is the most direct link.",
    reqs: ["MBBS or health-related bachelor's", "IELTS 6.5", "Recognition of prior learning available"],
    steps: [
      "More than one intake a year makes UNSW forgiving of timing: a missed round is not a lost year.",
      "Look at the George Institute's India office specifically, and read which of its projects have Sydney co-investigators before you choose a thesis supervisor.",
      "Apply for course credit based on MBBS at the same time as admission."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "aus-phd",
    name: "PhD with scholarship (RTP)",
    org: "Australian universities — Melbourne, Sydney, Monash, UQ, UNSW",
    type: "phd", country: "Australia", city: "Various",
    fields: ["neuro", "psych", "pubhealth", "genomics", "compbio"],
    stages: ["grad", "pg"], funding: "full",
    money: "A fee offset plus a tax-free living stipend. Melbourne's 2026 rate is AUD 39,500 a year; each university sets its own",
    duration: "3–4 years",
    window: "Each university runs its own rounds. Melbourne's for 2027 starts closes 31 October 2026",
    deadlineMonths: [4, 5, 8, 9, 10],
    url: "https://scholarships.unimelb.edu.au/awards/graduate-research-scholarships",
    checked: "2026-09",
    why: "Australian research scholarships are tax-free, domestic and international candidates compete for the same stipend-plus-fee awards at universities such as Melbourne, and the country lets you stay afterwards: under the Australia-India trade agreement, an Indian PhD graduate can hold a post-study work visa for up to four years, a year more than most nationalities. A medical degree plus one solid research project is a competitive application.",
    reqs: ["MBBS + demonstrated research capacity (a thesis, publication, or substantial project)", "A supervisor who has agreed to take you. This is mandatory before you apply", "IELTS 6.5"],
    steps: [
      "Find the supervisor before you find the university. No Australian PhD application progresses without one.",
      "Send a proposal of one to two pages plus your CV. Australian academics reply to concrete proposals.",
      "Rounds are ranked on merit, not first-come, but applying in the main round puts you in the largest pool of awards. For Melbourne that round closes 31 October 2026.",
      "Ask your prospective supervisor whether the university will also nominate you for a Maitri Scholarship, the Australian Government's PhD award for Indian scholars, which lists health among its fields."
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
    window: "One national round for autumn 2027: 16 October 2026 to 15 January 2027 on universityadmissions.se; documents by 1 February, results 1 April",
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
      "Search the official EACEA catalogue for your field. There are over 200 funded joint masters and most Indian students have heard of none of them.",
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
    money: "PhD salary ≈ CHF 47,000–55,000/year. The highest-paid doctorate in the world",
    duration: "3–4 years",
    window: "Two calls a year through the Life Science Zurich Graduate School, deadlines 1 May and 1 November; or write to a ZNZ group leader directly at any time",
    deadlineMonths: [3, 4, 9, 10],
    url: "https://www.neuroscience.uzh.ch/en.html",
    why: "Swiss PhD students are employees on a real salary — enough to save on, which is unheard of elsewhere. The Zurich neuroscience programme takes medical graduates directly and runs entirely in English.",
    reqs: ["MBBS or MSc", "Strong research record", "No German required for the programme itself"],
    steps: [
      "Two application rounds a year with fixed deadlines, both fully centralised. You do not need a supervisor beforehand.",
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
      "Check the two-year Third Level Graduate Programme visa. It is the reason Ireland's total cost often beats the UK's."
    ],
    indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },
  {
    /* Replaced September 2026. This slot used to be "Tuition-free masters in
       Norway, Finland, Denmark", which has been false for Indian applicants
       since Denmark (2006), Finland (2017) and Norway (autumn 2023) began
       charging non-EU students. The free Nordic route is the doctorate, which
       is a salaried job; the old claim now sits in skipList. */
    id: "nordic-phd",
    name: "Nordic PhD positions: a salaried job, not a scholarship",
    org: "Universities of Oslo, Bergen, Copenhagen, Aarhus, Helsinki · Karolinska Institutet",
    type: "phd", country: "Nordics", city: "Various",
    fields: ["pubhealth", "global", "neuro", "genomics", "biochem", "psych"],
    stages: ["grad", "pg"], funding: "paid",
    money: "An employment contract with pension, and no tuition. Oslo pays doctoral research fellows from NOK 550,800 a year (position code 1017); Sweden, Denmark and Finland also employ PhD candidates on salary",
    duration: "3–4 years",
    window: "Rolling: every position is advertised on its own, usually with three to six weeks to apply",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.uio.no/english/research/phd/before-applying/",
    checked: "2026-09",
    why: "The masters degrees in these countries now charge Indian students, but the doctorates never stopped paying. A Nordic PhD candidate is usually an employee with a salary, a pension and parental leave, hired into a funded project rather than admitted to a course. That makes it one of the few routes where an MBBS graduate can go abroad, earn and train at the same time, and it is under-used because people search for 'scholarships' and these are advertised as jobs.",
    reqs: [
      "A master's-level degree or an equivalent the faculty accepts. Oslo asks for a relevant five-year master's or equivalent; Karolinska asks for 240 credits with 60 at advanced level. An MBBS is assessed case by case, so ask before you write a proposal",
      "Fluent English; no Nordic language needed for the research",
      "You apply to a specific advertised post, so your fit with that project matters more than your marks"
    ],
    steps: [
      "Search the job boards, not scholarship lists: Jobbnorge for Norway, Varbi for Karolinska, and each Danish and Finnish university's vacancies page.",
      "Before applying, email the named contact and ask in one line whether an Indian MBBS meets the degree requirement. The answer decides whether the rest is worth your time.",
      "Research experience and a first-author paper count for far more than exam ranks here. A finished ICMR-STS project is exactly the right evidence.",
      "Winter daylight in Oslo and Helsinki is under six hours in December. Be honest with yourself about that before committing four years."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
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
      "Apply to the thesis-based MSc rather than the course-based MPH if funding matters. The MSc carries stipends, the MPH usually does not.",
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
    reqs: ["Under 35 for most categories", "MBBS accepted", "No Japanese required at application. It is taught to you"],
    steps: [
      "Apply through the Embassy of Japan in India (embassy recommendation route). It has better odds than the university recommendation route.",
      "The application opens around April and involves a written exam plus interview in India.",
      "Contact a potential supervisor early; a letter of acceptance from a professor strengthens the application enormously.",
      "Budget for the six-month intensive Japanese course. It is part of the award, not an obstacle."
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
    why: "NIMHANS Bengaluru is genuinely world-class in psychiatry and neurosciences. Its cohorts are cited internationally and it has data no Western institution can access. If your question is about Indian brains and Indian populations, the answer may be that the best place to study it is here.",
    reqs: ["MBBS accepted directly for most biomedical PhDs", "DBT-JRF / ICMR-JRF / CSIR-NET or institutional entrance", "MD/MS holders get preferential entry at NIMHANS"],
    steps: [
      "Sit DBT-BET or ICMR-JRF — these are the fellowships that make an Indian PhD paid rather than self-funded.",
      "For NIMHANS, the PhD in Clinical Neurosciences and Psychiatric Genetics both accept MBBS holders.",
      "The India Alliance (DBT/Wellcome Trust) Early Career Fellowship does NOT require a PhD for clinicians. A clinician with a research record can hold one directly. This is the single biggest structural advantage Indian doctors have and almost nobody uses it.",
      "Look at GenomeIndia data through the Indian Biological Data Centre. Ten thousand Indian genomes are publicly available and desperately under-analysed."
    ],
    indiaSpecific: true, competitiveness: "medium", workExp: 0
  }
];
