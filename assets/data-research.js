/* Dreams Counsellor — research programmes, conferences and skill-building.
   `zeroCost: true` means it costs you nothing to take part AND travel/living is covered
   or unnecessary. That flag drives the Zero-Rupee Path for students who cannot pay. */

window.DB = window.DB || {};

window.DB.research = [
  /* ═══════════════ INDIA — PAID, FREE TO APPLY, OPEN TO CURRENT STUDENTS ═══════════════ */
  {
    id: "icmr-sts",
    name: "ICMR Short Term Studentship (STS)",
    org: "Indian Council of Medical Research",
    type: "research", country: "India", city: "Your own college",
    fields: ["pubhealth", "clinical", "psych", "infect", "repro"],
    stages: ["pre", "clin"], funding: "stipend",
    money: "₹60,000 stipend · free to apply · no travel needed",
    duration: "2 months",
    window: "Opens in spring · advertised close 30 May, extended to 10 June (5 pm) in the 2026 cycle",
    deadlineMonths: [3, 4, 5, 6],
    url: "https://www.icmr.gov.in/short-term-studentship-sts",
    why: "The default first research project for every Indian medical student, and the one most people apply to a year too late. You can hold it ONCE, and only in 1st or 2nd year MBBS. Third and final year are ineligible, so the window genuinely closes.",
    reqs: ["1st or 2nd professional MBBS only", "A faculty guide from your own institution", "Institutional Ethics Committee clearance", "Free to apply"],
    steps: [
      "Find your guide in the term BEFORE you need them. A professor who already knows your face says yes; an emailed stranger does not.",
      "Write the proposal around a question you can actually answer in two months with the patients your hospital already sees.",
      "Start IEC clearance immediately — ethics committees are the slowest part of the chain and they gate publication whether or not ICMR funds you.",
      "Check the date on the DHR portal every year rather than trusting any secondhand figure, including this one. This cycle moves constantly: it used to close around 10 January, the 2026 round advertised 30 May, and DHR then extended it to 10 June at 5 pm.",
      "Expect an extension and never plan for one. DHR extended almost every 2026-27 call by one to two weeks — STS and MD Thesis to 10 June, the main HRD research call to 15 June, the Young Medical Faculty PhD to 14 July. The extension is announced days before the original date, always as a PDF notice on the portal and nowhere else, so the only way to benefit is to be already watching. Aim for the advertised date; treat the extra fortnight as a reprieve if your ethics clearance slips, not as your plan.",
      "Even if you are not selected, finish the study. The stipend is the smallest part of the value; the publication is the whole point."
    ],
    zeroCost: true, indiaSpecific: true, competitiveness: "medium", workExp: 0
  },
  {
    id: "ias-srfp",
    name: "IAS-INSA-NASI Summer Research Fellowship Programme",
    org: "Indian Academy of Sciences (joint with INSA and NASI)",
    type: "research", country: "India", city: "Host institute anywhere in India",
    fields: ["biochem", "genomics", "neuro", "compbio", "onco"],
    stages: ["pre", "clin", "intern"], funding: "stipend",
    money: "Stipend + second-class return train fare · free to apply",
    duration: "2 months, usually May–July",
    window: "Open now for 2027: the last date is 30 November 2026. Selections, with the guide’s agreement, go out around March–April 2027",
    deadlineMonths: [9, 10, 11],
    url: "https://web-japps.ias.ac.in/srfp/",
    why: "You pick actual scientists from a published list and they pick you back. Train fare is reimbursed, so a student with no money can spend a summer in a real laboratory at IISc, TIFR or NCBS at effectively zero personal cost. MBBS students are eligible and rarely apply.",
    reqs: ["Enrolled in MBBS or a science degree", "Good academic record", "Free to apply", "You name up to 7 preferred guides from the directory"],
    steps: [
      "Browse the guide directory BEFORE writing anything. Choose people whose recent papers you have actually read.",
      "The application asks for your preferred guides in order. Ranking a realistic spread beats listing seven Nobel-adjacent names.",
      "Apply by 30 November 2026 for a 2027 summer placement. The date moved two months earlier this cycle, so do not wait for January.",
      "Train fare reimbursement means the real cost to you is close to zero. Say yes to a placement far from home."
    ],
    zeroCost: true, indiaSpecific: true, competitiveness: "medium", workExp: 0
  },
  {
    id: "jncasr-srfp",
    name: "JNCASR Summer Research Fellowship",
    org: "Jawaharlal Nehru Centre for Advanced Scientific Research, Bengaluru",
    type: "research", country: "India", city: "Bengaluru",
    fields: ["neuro", "biochem", "genomics", "compbio"],
    stages: ["pre", "clin"], funding: "stipend",
    money: "≈ ₹10,000/month for 2 months + travel allowance · free to apply",
    duration: "2 months",
    window: "The 2026 round closed on 31 January 2026 and the 2027 call is expected around December. The page also lists GRIP, a longer internship open to final-year MBBS students",
    deadlineMonths: [12, 1],
    url: "https://www.jncasr.ac.in/academics",
    why: "A genuine molecular neuroscience laboratory, open to MBBS years 1–3, with travel paid. For a medical student who wants to find out whether bench science is actually for them, this is a two-month, zero-risk experiment.",
    reqs: ["MBBS year 1–3", "Strong academic record", "Free to apply"],
    steps: [
      "Apply in December or January for a summer placement.",
      "Name the laboratory you want. JNCASR's neuroscience and molecular biology units are small and specific.",
      "Ask for accommodation on campus. It is usually available and cheap."
    ],
    zeroCost: true, indiaSpecific: true, competitiveness: "medium", workExp: 0
  },
  {
    id: "ccmb-medsrt",
    name: "CSIR-CCMB Medical Student Research Training (MedSRT)",
    org: "Centre for Cellular and Molecular Biology, Hyderabad",
    type: "research", country: "India", city: "Hyderabad",
    fields: ["genomics", "biochem", "compbio", "infect"],
    stages: ["clin"], funding: "free",
    money: "Accommodation AND food provided · free to apply",
    duration: "2 weeks",
    window: "Applications Oct–Nov",
    deadlineMonths: [10, 11],
    url: "https://www.ccmb.res.in/",
    why: "Designed specifically for medical students, at one of India's best molecular biology institutes, with board and lodging covered. Two weeks is short enough to fit in a college break and long enough to change what you think you want to do.",
    reqs: ["2nd or 3rd year MBBS", "Free to apply", "Accommodation and meals provided"],
    steps: [
      "Watch the CCMB site from October. The call is short and poorly publicised.",
      "Write the statement of interest around a molecular question, not around wanting exposure.",
      "This pairs well with an ICMR STS project — CCMB techniques, your own college's patients."
    ],
    zeroCost: true, indiaSpecific: true, competitiveness: "medium", workExp: 0
  },
  {
    id: "ncbs-inStem",
    name: "NCBS / inStem Research Internships",
    org: "National Centre for Biological Sciences & Institute for Stem Cell Science, Bengaluru",
    type: "research", country: "India", city: "Bengaluru",
    fields: ["neuro", "genomics", "biochem", "compbio"],
    stages: ["clin", "intern", "grad"], funding: "stipend",
    money: "≈ ₹10,000/month · free to apply",
    duration: "2–6 months",
    window: "Main call Oct–Nov; some labs take rolling applications",
    deadlineMonths: [10, 11],
    url: "https://www.ncbs.res.in/",
    why: "One of the best basic-science institutes in Asia, and its neuroscience groups publish in the journals you actually want to be in. Direct emails to individual PIs work here more often than at most Indian institutions.",
    reqs: ["Final-year MBBS or graduate for the formal programme", "Earlier years can approach individual labs directly", "Free to apply"],
    steps: [
      "Apply through the formal call in October–November if you are eligible.",
      "If you are too junior for the formal route, email a PI directly with a specific technical question about their paper. This works more often than people expect.",
      "Bengaluru living costs are the real expense; ask about campus accommodation."
    ],
    zeroCost: false, indiaSpecific: true, competitiveness: "high", workExp: 0
  },
  {
    id: "iisc-programs",
    name: "IISc Summer Research & PHCCO Computational Oncology Programme",
    org: "Indian Institute of Science, Bengaluru",
    type: "research", country: "India", city: "Bengaluru",
    fields: ["compbio", "onco", "genomics", "pubhealth"],
    stages: ["clin", "intern", "grad"], funding: "stipend",
    money: "Stipend varies by programme · free to apply",
    duration: "6 weeks – 2 months",
    window: "PHCCO applications Jan–Feb · summer fellowship Dec–Feb",
    deadlineMonths: [12, 1, 2],
    url: "https://iisc.ac.in/",
    why: "India's top-ranked research institution, and the computational oncology programme is one of very few places a medical student can learn real computational biology with clinical framing. IISc also runs an MBBS-to-MPH internship track.",
    reqs: ["Varies by programme — some open to MBBS from 2nd year", "Free to apply"],
    steps: [
      "Check the specific programme page in December; IISc runs several parallel schemes with different deadlines.",
      "For PHCCO, some prior Python exposure genuinely helps. Do a free course first.",
      "IISc is also where you would sit for a PhD later. A summer here builds the relationship."
    ],
    zeroCost: false, indiaSpecific: true, competitiveness: "high", workExp: 0
  },
  {
    id: "medengage",
    name: "MedEngage Research Grant & IAP Research Grant",
    org: "MedEngage · Indian Academy of Pediatrics",
    type: "research", country: "India", city: "Your own college",
    fields: ["clinical", "pubhealth", "repro"],
    stages: ["pre", "clin", "intern"], funding: "stipend",
    money: "MedEngage ≈ ₹30,000 · IAP ≈ ₹10,000 · free to apply",
    duration: "Project-length",
    window: "MedEngage Nov–Dec · IAP around August",
    deadlineMonths: [8, 11, 12],
    url: "https://med-engage.com/",
    why: "Smaller grants, far less competition, and open to all MBBS years including interns, which matters because ICMR STS locks out third and final year. If you missed STS, these are the alternatives that keep your research record moving.",
    reqs: ["MBBS any year, interns included", "A guide and a project", "Free to apply"],
    steps: [
      "Reuse the ICMR STS proposal you already wrote. Reformatting takes an afternoon.",
      "IAP's grant is paediatrics-specific; MedEngage is open across specialties.",
      "Small grants still count on a CV as funded research. The word 'funded' is what a reviewer sees."
    ],
    zeroCost: true, indiaSpecific: true, competitiveness: "accessible", workExp: 0
  },

  /* ═══════════════ ABROAD — FULLY FUNDED, OPEN TO CURRENT MEDICAL STUDENTS ═══════════════ */
  {
    id: "khorana",
    name: "Khorana Program for Scholars",
    org: "DBT Govt of India · IUSSTF · WINStep Forward",
    type: "research", country: "USA", city: "US host university",
    fields: ["genomics", "biochem", "compbio", "neuro", "onco"],
    stages: ["clin"], funding: "full",
    money: "A USD 3,000 stipend for the 10–12 weeks, USD 600 health insurance and round-trip economy flights up to USD 2,500 (2025 guidelines) · free to apply",
    duration: "10–12 weeks, summer",
    window: "The last published call closed 7 October 2024, for summer 2025. No later call had been posted at last check; past deadlines fell in the first week of October",
    deadlineMonths: [9, 10],
    noOpenCall: true,
    url: "https://iusstf.org/khorana-program-for-scholars",
    checked: "2026-09",
    why: "A fully funded American summer research placement that a current MBBS student can hold — no graduation required, no fees, travel paid. The academic bar is set lower for MBBS candidates, 65 per cent rather than 80. Whether it runs again for 2027 is not yet known, so treat it as one to watch rather than to plan around.",
    reqs: [
      "Currently enrolled MBBS at a recognised Indian institution",
      "PRE-FINAL year — at least one year of your course must remain",
      "65 % and above for MBBS applicants (80 % for other streams)",
      "Free to apply"
    ],
    steps: [
      "Confirm your year status counts as pre-final BEFORE you invest in the application. Email WINStep Forward and ask directly. It takes ten minutes and saves a cycle.",
      "Apply through the IUSSTF visitation-programmes portal.",
      "IUSSTF and WINStep match you to up to three US professors. You do not have to find the lab yourself, which removes the hardest barrier.",
      "The statement of purpose should name a specific research area, not a general interest in the United States."
    ],
    zeroCost: true, indiaSpecific: true, competitiveness: "high", workExp: 0
  },
  {
    id: "weizmann-kupcinet",
    name: "Kupcinet-Getz International Summer School",
    org: "Weizmann Institute of Science, Israel",
    type: "research", country: "Israel", city: "Rehovot",
    fields: ["neuro", "genomics", "biochem", "compbio", "onco"],
    stages: ["pre", "clin"], funding: "full",
    money: "USD 1,100 stipend, up to USD 400 towards the flight, free dormitory housing and medical insurance, part of meals subsidised · free to apply",
    duration: "8 weeks, mid-June to mid-August",
    window: "Applications open around 1 January and close in early February (2 February in 2026) for an eight-week programme from mid-June. The list of host labs for the next round goes up on 29 December 2026",
    deadlineMonths: [1, 2],
    url: "https://info.weizmann.ac.il/kupcinet-getz-international-summer-program/",
    why: "One of the world's great research institutes, paying undergraduates from anywhere on earth to spend a summer in its laboratories. Small cohort, genuinely international, and Weizmann's neuroscience and immunology departments are exceptional.",
    reqs: [
      "A bachelor's or master's student past the first year, or a recent graduate, in the physical, chemical or life sciences, mathematics or computer science. Medicine is not named on the page, so confirm with the programme that MBBS counts before you apply",
      "A GPA of 3.6 out of 4.0, or the equivalent in your own grading",
      "At least one academic recommendation letter, uploaded by the recommender, and an official transcript",
      "Free to apply"
    ],
    steps: [
      "Email undergraduate.summer@weizmann.ac.il in December and ask whether an MBBS student counts as a life-sciences student here. Their answer decides whether the application is worth your time.",
      "Apply between 1 January and early February, once the host-lab list for the summer is up (29 December 2026 for 2027).",
      "Name the laboratories you want in order of preference; read their recent papers first.",
      "Reference letters carry heavy weight here — ask people who have supervised you on something real."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "cshl-urp",
    name: "Undergraduate Research Program (URP)",
    org: "Cold Spring Harbor Laboratory, USA",
    type: "research", country: "USA", city: "New York",
    fields: ["genomics", "neuro", "onco", "compbio", "biochem"],
    stages: ["pre", "clin"], funding: "full",
    money: "Stipend + travel + room and board fully covered · free to apply",
    duration: "10 weeks, June–August",
    window: "Applications close 15 January, 11:59 pm Pacific time, with letters of recommendation in by then. The 2027 programme runs 7 June to 7 August",
    deadlineMonths: [12, 1],
    url: "https://www.cshl.edu/education/undergraduate-research-program/",
    why: "Cold Spring Harbor is where the structure of the genome was argued out, and its undergraduate programme takes roughly twenty students from the entire world each year with everything paid. It is brutally competitive and free to enter, which makes the expected value of applying very high.",
    reqs: ["Undergraduate with at least one term remaining", "International applicants explicitly welcome", "Free to apply"],
    steps: [
      "Apply in December–January for the following summer.",
      "The research statement should show you can think about a problem, not that you are enthusiastic about science.",
      "Even an unsuccessful application forces you to articulate a research question properly, which is the exact skill your later applications need."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "amgen-scholars",
    name: "Amgen Scholars Programme (Asia)",
    org: "Amgen Foundation; Amgen India funds the IIIT Hyderabad site",
    type: "research", country: "Asia", city: "IIIT Hyderabad, Kyoto, Tokyo, NUS Singapore or Tsinghua",
    fields: ["biochem", "genomics", "neuro", "onco", "compbio"],
    stages: ["pre", "clin"], funding: "full",
    money: "Housing, travel support and a stipend, with details that vary by host; the Asia symposium is paid for · free to apply",
    duration: "About 8–10 weeks, summer",
    window: "Opens 1 November; all five Asia hosts close 1 February 2027. Programme dates are announced later",
    deadlineMonths: [11, 12, 1],
    url: "https://amgenscholars.com/asia-program/",
    checked: "2026-09",
    why: "Fully funded summer research at Kyoto, Tokyo, the National University of Singapore, Tsinghua and, since it joined, IIIT Hyderabad. The Asia programme has no citizenship rule and takes undergraduates enrolled at universities in Asia, which is the cleanest eligibility line in this index for an Indian student, and the Hyderabad site makes one version of it a domestic flight. The other regions are where people waste applications: Europe takes only students enrolled in a Bologna-process country, Australia only students in Oceania, and the US only its own students.",
    reqs: [
      "Enrolled undergraduate at a university in Asia, India included, with at least the first year complete by the time the programme starts",
      "You must not graduate before the programme, and must return for at least one more semester of undergraduate study after it, so plan it for a summer before your final year",
      "English: TOEFL iBT 72, IELTS 5.5, Cambridge FCE or TOEIC 1095 if English is not your first language",
      "A strong academic record and a stated interest in a PhD",
      "The Europe, Australia and US programmes are closed to students enrolled in India"
    ],
    steps: [
      "Apply only through the Asia programme. Each host runs its own application, so read each host's page from 1 November.",
      "You may apply to more than one host. Do so, and put IIIT Hyderabad on the list: far fewer Indian medical students know it hosts than know about Kyoto.",
      "Sort the English score early. For most Indian students English is not the first language, and a test booked in January can miss a 1 February deadline.",
      "Write the statement about a PhD you actually want. That interest is in the eligibility rules, not a courtesy line."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "ictp",
    name: "ICTP Programmes, Schools and Diploma",
    org: "Abdus Salam International Centre for Theoretical Physics, Trieste",
    type: "research", country: "Italy", city: "Trieste",
    fields: ["compbio", "genomics", "neuro"],
    stages: ["clin", "intern", "grad"], funding: "full",
    money: "Full travel, accommodation and living support for participants from developing countries · free to apply",
    duration: "1 week – 1 year",
    window: "Rolling calls throughout the year",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.ictp.it/",
    why: "ICTP exists specifically to fund scientists from developing countries, and it runs quantitative-biology and computational-neuroscience schools that a medical graduate can attend with every cost covered. Almost no Indian medical students know it exists.",
    reqs: ["From a developing country — India qualifies", "Relevant background", "Free to apply; travel grants standard"],
    steps: [
      "Browse the ICTP activities calendar and filter for quantitative life sciences and neuroscience.",
      "Tick the financial-support box on the application. It is expected, not exceptional.",
      "The ICTP Postgraduate Diploma is a fully-funded year that can bridge from a medical degree into a quantitative PhD."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "lindau",
    name: "Lindau Nobel Laureate Meeting",
    org: "Council for the Lindau Nobel Laureate Meetings, Germany",
    type: "conference", country: "Germany", city: "Lindau",
    fields: ["neuro", "genomics", "biochem", "onco", "pubhealth"],
    stages: ["grad", "pg"], funding: "full",
    money: "DST pays international travel, local transport, twin-share lodging and meals · free to apply",
    duration: "1 week: 27 June to 2 July 2027",
    window: "The 2027 meeting is Physiology/Medicine. Lindau's own form closes in November 2026; DST's Indian nomination call ended on 31 October in 2022 and 30 September in 2024, and the 2027 call was not yet posted at last check",
    deadlineMonths: [9, 10, 11],
    url: "https://www.lindau-nobel.org/young-scientists/",
    checked: "2026-09",
    why: "About six hundred young scientists spend a week with Nobel laureates, and 2027 is a medicine year, the first since 2023. From India the only door is the Department of Science & Technology, which pays the whole trip. That door is narrower than it looks and wider for doctors than people assume: in 2023 DST chose 16 of 223 applicants, and several were MD residents from AIIMS and government medical colleges.",
    reqs: [
      "Indian citizen studying or working at an institution in India. DST's award excludes Indians studying or working abroad, and Lindau's open application is closed to anyone in a country with a partner, which India is",
      "DST nominates master's students (MD and MS residents were selected in 2023), PhD students at least two years in, and postdocs under 35, ranked in the top three of their class. MBBS students are not among its categories",
      "Two detailed reference letters in English, and no previous Lindau meeting"
    ],
    steps: [
      "Watch dst.gov.in's calls page from September. The application goes to DST first, forwarded by your head of institution, and only DST's shortlist is sent on to Lindau.",
      "Get the rank certificate from your head of department now. DST asks for it and it takes longer to obtain than anything else in the file.",
      "In past calls DST required a posted hard copy by the deadline as well as an emailed PDF. Read the new call for the exact format; a late or incomplete file is rejected outright.",
      "If you are an MBBS student, DST's categories do not include you. Keep a research record now so that a later medicine meeting finds you ready as a resident."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "ifmsa-score",
    name: "IFMSA Research (SCORE) & Clinical (SCOPE) Exchanges",
    org: "IFMSA via Medical Students Association of India (MSAI)",
    type: "research", country: "Global", city: "80+ countries",
    fields: ["clinical", "pubhealth", "biochem", "neuro", "psych"],
    stages: ["pre", "clin"], funding: "partial",
    money: "MSAI membership ≈ ₹1,000 + exchange fee · host provides lodging and usually meals",
    duration: "4 weeks",
    window: "Exchange application rounds mostly Jan–Apr for summer placements",
    deadlineMonths: [1, 2, 3, 4],
    url: "https://ifmsa.org/student-exchange-program/",
    why: "The cheapest way for a medical student to get a month abroad. SCORE is the research track, SCOPE is clinical. Accommodation and often meals are covered by the host committee, so beyond flights the marginal cost is small.",
    reqs: ["Membership of MSAI (India's IFMSA national member organisation)", "Your college needs a Local Committee, or you help start one", "Some countries require a language certificate"],
    steps: [
      "Start at MSAI rather than at IFMSA. India applies through its national member organisation and the outgoing calls, fees and timelines are published there — msaindia.org/exchanges — not on the international site.",
      "Join MSAI first. If your college has no Local Committee, founding one is itself a leadership credential worth having.",
      "SCORE for research, SCOPE for clinical. If you want a lab, do not accidentally apply for the ward.",
      "Apply in the January–April rounds for summer placements.",
      "Be realistic: a four-week clinical observership abroad is worth less on a research CV than a four-week project with an output. Choose accordingly."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },
  {
    id: "embl-embo",
    name: "EMBL & EMBO Courses, Workshops and Fellowships",
    org: "European Molecular Biology Laboratory / Organisation",
    type: "research", country: "Europe", city: "Heidelberg, Hinxton, Rome and others",
    fields: ["genomics", "biochem", "compbio", "neuro"],
    stages: ["intern", "grad", "pg"], funding: "partial",
    money: "EMBO travel and registration fellowships routinely cover the full cost for applicants from lower-income countries",
    duration: "3 days – 3 months",
    window: "Rolling, per course",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.embl.org/about/info/course-and-conference-office/",
    why: "EMBO explicitly funds participants from countries with fewer resources, and EMBL-EBI's bioinformatics training is the reference standard. A week here teaches you more usable technique than a semester of lectures.",
    reqs: ["Relevant research background", "Fellowship application submitted WITH the course application, not after"],
    steps: [
      "Always tick the fellowship box at the point of applying. You usually cannot ask afterwards.",
      "EMBL-EBI also publishes its entire bioinformatics training catalogue free online. Start there tonight if money is the constraint.",
      "EMBO Short-Term Fellowships fund research visits of up to three months between labs."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "who-internship",
    name: "WHO Internship Programme & regional office placements",
    org: "World Health Organization",
    type: "research", country: "Global", city: "Geneva, New Delhi (SEARO) and country offices",
    fields: ["global", "pubhealth", "systems", "psych", "infect"],
    stages: ["clin", "intern", "grad", "pg"], funding: "partial",
    money: "Since January 2020 WHO pays a living allowance to selected interns who need financial support; each vacancy states the amount. Medical and accident insurance included; travel is yours",
    duration: "6–24 weeks, full time",
    window: "Posted as individual internship vacancies on WHO's careers site; there is no general roster to join",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.who.int/careers/internship-programme",
    checked: "2026-09",
    why: "The South-East Asia regional office is in New Delhi, which means a WHO placement is possible without paying for international travel. WHO paid interns nothing for decades; the living allowance it has offered since 2020 is what makes this viable for someone without family money, and it goes to interns who say they need it.",
    reqs: [
      "At least 20 on the day you apply, and three years of full-time university study completed before you start. A clinical-year MBBS student can qualify",
      "Enrolled in a relevant degree, or applying within 18 months of finishing it",
      "Fluent in at least one WHO working language; never a WHO intern before; no close relative on WHO staff"
    ],
    steps: [
      "Search WHO's careers site for internship vacancies in the regional office for South-East Asia as well as Geneva. Applications only go through those posted notices.",
      "Watch the 18-month clock. It runs from the day your degree is completed, which for an Indian MBBS means after internship, so the window closes about a year and a half into your first job.",
      "Mental health, NCDs and health systems are the units most relevant to a medic with public-health interests."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "high", workExp: 0
  },

  /* ═══════════════ CONFERENCES WITH BURSARIES AND TRAVEL AWARDS ═══════════════ */
  {
    id: "conf-neuro",
    name: "Neuroscience conferences with trainee travel awards",
    org: "SfN (USA) · FENS (Europe) · IBRO · ECNP · Indian Academy of Neurosciences",
    type: "conference", country: "Global", city: "Rotating",
    fields: ["neuro", "psych", "compbio"],
    stages: ["clin", "intern", "grad", "pg"], funding: "partial",
    money: "Travel awards of $1,000–2,500; IBRO explicitly funds researchers from lower-income countries",
    duration: "4–6 days",
    window: "Abstract deadlines usually 5–7 months before the meeting",
    deadlineMonths: [1, 2, 3, 4, 5, 10, 11, 12],
    url: "https://ibro.org/grants/",
    why: "You do not attend these by paying. You attend them by submitting an abstract and applying for the travel award in the same breath. IBRO in particular exists to fund neuroscientists from countries like India, and its schemes are chronically under-applied.",
    reqs: ["An accepted abstract, usually", "Trainee status", "Travel award applications are separate and have earlier deadlines"],
    steps: [
      "Submit the abstract AND the travel award application together. The award deadline is almost always earlier than you expect.",
      "IBRO runs travel grants, exchange fellowships and schools specifically for researchers in low- and middle-income countries. Start there.",
      "A poster at a national meeting first makes an international abstract far more likely to be accepted."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "conf-globalhealth",
    name: "Global health & public health congresses with student bursaries",
    org: "International AIDS Society · The Union (World Conference on Lung Health) · CUGH",
    type: "conference", country: "Global", city: "Rotating",
    fields: ["global", "pubhealth", "infect", "systems"],
    stages: ["clin", "intern", "grad", "pg"], funding: "partial",
    money: "In-person scholarships can cover travel, accommodation, a daily allowance and registration; sponsored registrations cover the fee only",
    duration: "3–5 days",
    window: "Scholarship deadlines fall 4–8 months before each meeting, usually alongside or just after the abstract deadline",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.iasociety.org/scholarships",
    checked: "2026-09",
    why: "The big infectious-disease meetings set money aside for people from low- and middle-income countries, and they say so in their rules. The Union's full scholarships for presenters are reserved for low- and lower-middle-income countries, which includes India. The IAS gives priority to abstract presenters, applicants from LMICs, people under 35 and first-time recipients. Very few Indian medical students apply for either.",
    reqs: ["An accepted abstract is the strongest route; the Union's full scholarship is for presenters and symposium speakers", "India qualifies for the Union's full scholarships as a lower-middle-income country", "IAS: aged 18 or over, and studying, working or volunteering in HIV"],
    steps: [
      "Write the abstract first. At both meetings, presenting is what moves you into the fully funded group.",
      "Apply for the scholarship through your conference profile as soon as the abstract is in. The IAS closed its AIDS 2026 round in January for a July meeting, and nearly everything was awarded before the late-breaker stage.",
      "If the full scholarship does not come, ask for a sponsored registration. It removes the fee, which is often the largest cost for a meeting held in India or nearby."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "conf-india",
    name: "Indian research conferences worth presenting at",
    org: "AIIMS INSIGHT · MEDICON · IAN · IPS · NIMHANS meetings",
    type: "conference", country: "India", city: "Various",
    fields: ["clinical", "psych", "neuro", "pubhealth"],
    stages: ["pre", "clin", "intern"], funding: "partial",
    money: "₹500 – ₹5,000 registration; many offer student rates and some waive them",
    duration: "2–3 days",
    window: "Abstract deadlines 2–4 months ahead",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.aiims.edu/",
    why: "Start here, not at an international meeting. A presented abstract at AIIMS INSIGHT costs a train ticket and gives you the thing every international application asks for: evidence you have presented work in public.",
    reqs: ["An abstract", "Student registration", "Nothing else"],
    steps: [
      "Present at a national meeting before applying to an international one. Acceptance rates and confidence both improve.",
      "Workshops attached to these conferences — multi-omics, molecular biology, AI in medicine — are certified and count.",
      "Volunteering to organise a session is worth more on an application than attending three."
    ],
    zeroCost: false, indiaSpecific: true, competitiveness: "accessible", workExp: 0
  },

  /* ═══════════════ SKILL BUILDING — ALMOST ALL FREE ═══════════════ */
  {
    id: "neuromatch",
    name: "Neuromatch Academy — Computational Neuroscience & Deep Learning",
    org: "Neuromatch",
    type: "skill", country: "Online", city: "Remote",
    fields: ["neuro", "compbio", "psych"],
    stages: ["pre", "clin", "intern", "grad", "pg"], funding: "free",
    money: "Tuition scaled to local cost of living, and full waivers are available on request",
    duration: "3 weeks, intensive, July",
    window: "Applications open February · info sessions in January",
    deadlineMonths: [1, 2, 3, 4],
    url: "https://neuromatch.io/computational-neuroscience/",
    why: "The single cheapest credential that makes a cold email to a computational neuroscience laboratory actually land. Three weeks, globally respected, remote, and the fee is waived if you ask. Right now a principal investigator has no way to verify you can do the work. This is the proof.",
    reqs: ["Basic Python — do a free course first if you have none", "No degree requirement", "Tuition waivers available; there is no cost to apply"],
    steps: [
      "Applications open in February for a July course. Attend the January information session.",
      "Request the tuition waiver during enrolment. It is a normal part of the process, not a favour.",
      "Do a free Python course beforehand. The academy assumes you can write a loop.",
      "The group project is the part that matters. Finish it, put it on GitHub, and link it in every application afterwards."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "free-stack",
    name: "The free skill stack: Python, statistics, epidemiology, bioinformatics",
    org: "Coursera financial aid · edX audit · EMBL-EBI · OpenWHO · Kaggle · Software Carpentry",
    type: "skill", country: "Online", city: "Remote",
    fields: ["compbio", "pubhealth", "genomics", "biochem"],
    stages: ["pre", "clin", "intern", "grad", "pg"], funding: "free",
    money: "Genuinely ₹0 — Coursera grants financial aid to Indian students on request for almost every course",
    duration: "Self-paced",
    window: "Always open",
    deadlineMonths: [],
    url: "https://www.ebi.ac.uk/training/",
    why: "Every credential on this page assumes skills you can acquire for nothing. Coursera's financial aid application takes fifteen minutes and is approved for Indian students at high rates, including for Johns Hopkins epidemiology and biostatistics certificates. EMBL-EBI's entire bioinformatics catalogue is free and unregistered.",
    reqs: ["An internet connection", "Nothing else"],
    steps: [
      "Apply for Coursera financial aid rather than paying. Write two honest paragraphs; approval takes about 15 days.",
      "The order that works: Python basics → pandas → statistics → the specific method your field uses.",
      "Free and genuinely good: Johns Hopkins Data Science and Epidemiology on Coursera, EMBL-EBI bioinformatics, OpenWHO for public health emergencies, Kaggle Learn for practical Python, Software Carpentry for reproducible workflows.",
      "Do CITI or NIH Good Clinical Practice training free online. It is a formal requirement for many research placements and takes one afternoon.",
      "Twenty minutes of code a day beats a weekend sprint every month. Nobody bridges medicine and computation heroically."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },
  {
    id: "research-method",
    name: "Research methods: systematic reviews, GCP, statistics",
    org: "Cochrane · PRISMA · NIH · CITI Program · Nature Masterclasses",
    type: "skill", country: "Online", city: "Remote",
    fields: ["pubhealth", "clinical", "psych"],
    stages: ["pre", "clin", "intern", "grad"], funding: "free",
    money: "Mostly free; Cochrane offers free access to learners in many low- and middle-income countries",
    duration: "Days to weeks",
    window: "Always open",
    deadlineMonths: [],
    url: "https://www.cochrane.org/learn",
    why: "A first-year medical student can be the first author on a systematic review. It requires no laboratory, no funding, no ethics clearance and no permission — only method and persistence. This is the fastest legitimate route from zero publications to one.",
    reqs: ["Access to PubMed", "A specific, answerable question", "A co-author or two"],
    steps: [
      "Learn the method properly through Cochrane Interactive Learning — free for learners in many eligible countries.",
      "Register your protocol on PROSPERO before you start screening. This is what separates a real review from a literature summary.",
      "Follow PRISMA reporting standards exactly; reviewers check.",
      "Use Zotero for references and Rayyan for screening. Both free.",
      "Complete GCP training via CITI or the NIH — free, certificated, and required for many clinical research placements."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },
  {
    id: "language",
    name: "Language preparation: German, French, Japanese",
    org: "Goethe-Institut · Alliance Française · Japan Foundation · Duolingo",
    type: "skill", country: "Online", city: "India and remote",
    fields: ["clinical", "global"],
    stages: ["pre", "clin", "intern", "grad"], funding: "partial",
    money: "Goethe-Institut A1 in India ≈ ₹15,000–25,000; self-study free",
    duration: "3–6 months per level",
    window: "Rolling intakes",
    deadlineMonths: [],
    url: "https://www.goethe.de/ins/in/en/index.html",
    why: "You do not need German to do a masters or PhD in Germany — those run in English. You need German to have a life there, and B2 to work clinically. The honest version: A1–A2 before you go, B1 within the first year, B2 only if you intend to practise medicine.",
    reqs: ["Time, and consistency more than intensity"],
    steps: [
      "Do not let language be the reason you delay applying. Almost every research programme listed here is taught in English.",
      "For Germany: A1 before departure, B1 within a year, B2 only if practising clinically.",
      "For France: many masters are English-taught, but B1 French transforms daily life and lab conversation.",
      "For Japan: MEXT includes a funded six-month intensive course. You do not need Japanese to apply."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },
  {
    id: "networks",
    name: "Student research networks and societies",
    org: "MSAI · AMSA India · GAIMS · NSRI · IFMSA · Cochrane India",
    type: "skill", country: "India", city: "Various",
    fields: ["clinical", "pubhealth", "global", "psych"],
    stages: ["pre", "clin", "intern"], funding: "partial",
    money: "MSAI ≈ ₹1,000 lifetime · AMSA India ≈ ₹750 · GAIMS and NSRI often free",
    duration: "Ongoing",
    window: "Open year-round",
    deadlineMonths: [],
    url: "https://ifmsa.org/",
    why: "The reason people in other colleges seem to know about opportunities you have never heard of is that they are in these networks and you are not. The membership fee is trivial; the information asymmetry it closes is not.",
    reqs: ["Enrolment in a medical college", "A small annual or lifetime fee for some"],
    steps: [
      "Join one national network properly rather than five superficially.",
      "Volunteer to organise something in the first three months. Organisers hear about opportunities before members do.",
      "Write up what you organise. An undocumented campaign is invisible on an application; a one-page field report with numbers is a credential.",
      "Watch for the national competitions these bodies run. GAIMS, a registered Section 8 non-profit with state and international chapters, ran a 2026 reel competition on the importance of HPV vaccination for MBBS students, interns and nurses, with a ₹100 entry fee and cash prizes, and posts calls for expressions of interest for its committees."
    ],
    zeroCost: false, indiaSpecific: true, competitiveness: "accessible", workExp: 0
  }
];
