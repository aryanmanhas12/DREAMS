/* Dream Counsellor — research programmes, conferences and skill-building.
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
    window: "Applications open in spring · closed 30 May (5 pm) in the 2026 cycle",
    deadlineMonths: [3, 4, 5],
    url: "https://schemes.dhr.gov.in/",
    why: "The default first research project for every Indian medical student, and the one most people apply to a year too late. You can hold it ONCE — and only in 1st or 2nd year MBBS. Third and final year are ineligible, so the window genuinely closes.",
    reqs: ["1st or 2nd professional MBBS only", "A faculty guide from your own institution", "Institutional Ethics Committee clearance", "Free to apply"],
    steps: [
      "Find your guide in the term BEFORE you need them. A professor who already knows your face says yes; an emailed stranger does not.",
      "Write the proposal around a question you can actually answer in two months with the patients your hospital already sees.",
      "Start IEC clearance immediately — ethics committees are the slowest part of the chain and they gate publication whether or not ICMR funds you.",
      "Check the date on the ICMR site every year rather than trusting any secondhand figure, including this one. This cycle has moved: it used to close around 10 January, and the 2026 round closed on 30 May at 5 pm. Late submissions are refused absolutely.",
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
    window: "Applications open ~November · closed 31 January in the 2026 cycle",
    deadlineMonths: [11, 12, 1],
    url: "https://web-japps.ias.ac.in/srfp/",
    why: "You pick actual scientists from a published list and they pick you back. Train fare is reimbursed, so a student with no money can spend a summer in a real laboratory at IISc, TIFR or NCBS at effectively zero personal cost. MBBS students are eligible and rarely apply.",
    reqs: ["Enrolled in MBBS or a science degree", "Good academic record", "Free to apply", "You name up to 7 preferred guides from the directory"],
    steps: [
      "Browse the guide directory BEFORE writing anything. Choose people whose recent papers you have actually read.",
      "The application asks for your preferred guides in order. Ranking a realistic spread beats listing seven Nobel-adjacent names.",
      "Apply in the November–December window for a summer placement.",
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
    window: "Applications Dec–Jan",
    deadlineMonths: [12, 1],
    url: "https://www.jncasr.ac.in/academics",
    why: "A genuine molecular neuroscience laboratory, open to MBBS years 1–3, with travel paid. For a medical student who wants to find out whether bench science is actually for them, this is a two-month, zero-risk experiment.",
    reqs: ["MBBS year 1–3", "Strong academic record", "Free to apply"],
    steps: [
      "Apply in December or January for a summer placement.",
      "Name the laboratory you want. JNCASR's neuroscience and molecular biology units are small and specific.",
      "Ask for accommodation on campus — it is usually available and cheap."
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
      "IISc is also where you would sit for a PhD later — a summer here builds the relationship."
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
    url: "https://www.medengage.in/",
    why: "Smaller grants, far less competition, and open to all MBBS years including interns — which matters because ICMR STS locks out third and final year. If you missed STS, these are the alternatives that keep your research record moving.",
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
    money: "Fully funded: stipend, travel and accommodation · free to apply",
    duration: "10–12 weeks, summer",
    window: "Applications historically open Sept–Oct, close Oct–Nov",
    deadlineMonths: [9, 10, 11],
    url: "https://iusstf.org/khorana-program-for-scholars",
    why: "A fully funded American summer research placement that a current MBBS student can hold — no graduation required, no fees, travel paid. The academic bar is lowered specifically for MBBS candidates (65 % rather than 80 %) because the programme knows medical marking is different.",
    reqs: [
      "Currently enrolled MBBS at a recognised Indian institution",
      "PRE-FINAL year — at least one year of your course must remain",
      "65 % and above for MBBS applicants (80 % for other streams)",
      "Free to apply"
    ],
    steps: [
      "Confirm your year status counts as pre-final BEFORE you invest in the application. Email WINStep Forward and ask directly — it takes ten minutes and saves a cycle.",
      "Apply through the IUSSTF visitation-programmes portal.",
      "IUSSTF and WINStep match you to up to three US professors — you do not have to find the lab yourself, which removes the hardest barrier.",
      "The statement of purpose should name a specific research area, not a general interest in the United States."
    ],
    zeroCost: true, indiaSpecific: true, competitiveness: "high", workExp: 0
  },
  {
    id: "daad-wise",
    name: "DAAD WISE — Working Internships in Science and Engineering",
    org: "German Academic Exchange Service (India-specific)",
    type: "research", country: "Germany", city: "German host institute",
    fields: ["biochem", "neuro", "genomics", "compbio", "env"],
    stages: ["pre", "clin", "intern"], funding: "full",
    money: "€934/month + travel subsidy + insurance · free to apply",
    duration: "2–3 months, summer",
    window: "Applications open Aug · close late Oct/early Nov",
    deadlineMonths: [8, 9, 10, 11],
    url: "https://www.daad.in/en/study-research-in-germany/scholarships/",
    why: "Built exclusively for students enrolled at Indian institutions — you are not competing with the world, only with India. Fully funded summer research in a German laboratory, and you can apply from the second year of MBBS.",
    reqs: [
      "Enrolled full-time at an Indian institution — MBBS qualifies from year 2",
      "An invitation letter from a German professor",
      "Free to apply · no German language requirement"
    ],
    steps: [
      "The invitation letter is the entire application. Start emailing German PIs in July for an October deadline.",
      "Use the DAAD database and the Max Planck / Helmholtz institute directories to find groups, then write to the group leader — not the general office.",
      "Your email should be four sentences: who you are, what of theirs you read, what you can do, what you are asking for. Attach a one-page CV.",
      "Expect a low reply rate and send twenty. This is a numbers game and everyone who succeeds at it played it that way."
    ],
    zeroCost: true, indiaSpecific: true, competitiveness: "medium", workExp: 0
  },
  {
    id: "mitacs",
    name: "Mitacs Globalink Research Internship",
    org: "Mitacs, Canada",
    type: "research", country: "Canada", city: "Canadian host university",
    fields: ["compbio", "neuro", "genomics", "pubhealth", "biochem"],
    stages: ["pre", "clin"], funding: "full",
    money: "Fully funded: airfare, visa, accommodation, health insurance and a stipend · free to apply",
    duration: "12 weeks, May–October",
    window: "Applications open mid-July · close mid-September",
    deadlineMonths: [7, 8, 9],
    url: "https://www.mitacs.ca/our-programs/globalink-research-internship-students/",
    why: "India is one of Mitacs's largest partner countries and the programme covers everything — flights, visa, housing, insurance. You browse a catalogue of pre-approved projects and rank them, so you do not need to find a supervisor yourself. It is the most accessible fully-funded international research internship available to an Indian undergraduate.",
    reqs: [
      "Enrolled at an eligible Indian institution, with at least one semester remaining after the internship",
      "Usually years 1–3 of an undergraduate degree — MBBS qualifies",
      "Free to apply"
    ],
    steps: [
      "Browse the project catalogue when it opens in July and rank up to seven projects.",
      "Your ranking matters more than a personal statement — choose projects that genuinely match your background, because supervisors read for fit.",
      "Successful interns get preferential entry and funding for a later Canadian masters through Globalink Graduate Fellowship.",
      "Check your institution's eligibility on the Mitacs list before applying."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "weizmann-kupcinet",
    name: "Kupcinet-Getz International Summer School",
    org: "Weizmann Institute of Science, Israel",
    type: "research", country: "Israel", city: "Rehovot",
    fields: ["neuro", "genomics", "biochem", "compbio", "onco"],
    stages: ["pre", "clin"], funding: "full",
    money: "Fully funded: flights, accommodation, meals and a stipend · free to apply",
    duration: "8 weeks, July–August",
    window: "Applications open Oct · close around December/January",
    deadlineMonths: [10, 11, 12, 1],
    url: "https://www.weizmann.ac.il/wsos/",
    why: "One of the world's great research institutes, funding undergraduates from anywhere on earth to spend a summer in its laboratories with everything paid. Small cohort, genuinely international, and Weizmann's neuroscience and immunology departments are exceptional.",
    reqs: ["Undergraduate in a science or medical degree", "Two academic references", "Free to apply"],
    steps: [
      "Apply between October and December for the following summer.",
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
    window: "Applications open Dec · close mid-January",
    deadlineMonths: [12, 1],
    url: "https://www.cshl.edu/education/undergraduate-research-program/",
    why: "Cold Spring Harbor is where the structure of the genome was argued out, and its undergraduate programme takes roughly twenty students from the entire world each year with everything paid. It is brutally competitive and free to enter, which makes the expected value of applying very high.",
    reqs: ["Undergraduate with at least one term remaining", "International applicants explicitly welcome", "Free to apply"],
    steps: [
      "Apply in December–January for the following summer.",
      "The research statement should show you can think about a problem, not that you are enthusiastic about science.",
      "Even an unsuccessful application forces you to articulate a research question properly — which is the exact skill your later applications need."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "amgen-scholars",
    name: "Amgen Scholars Programme",
    org: "Amgen Foundation — Europe, Japan, Australia and US hosts",
    type: "research", country: "Global", city: "Cambridge, Munich, Kyoto, Melbourne and others",
    fields: ["biochem", "genomics", "neuro", "onco", "compbio"],
    stages: ["pre", "clin"], funding: "full",
    money: "Fully funded: travel, accommodation and stipend · free to apply",
    duration: "8–10 weeks, summer",
    window: "Australia opens ~Aug · all other regions open 1 Nov, close Jan–Feb",
    deadlineMonths: [8, 9, 11, 12, 1, 2],
    url: "https://amgenscholars.com/",
    why: "The European, Japanese and Australian hubs accept students enrolled anywhere in the world — unlike the US hubs, which require enrolment at a US institution. Cambridge, LMU Munich, Karolinska and Kyoto all host, fully funded.",
    reqs: [
      "Enrolled undergraduate in a science or medical programme",
      "For Europe/Japan/Australia hubs: enrolment anywhere in the world is acceptable",
      "For US hubs: must be enrolled at a US institution — check before applying",
      "Free to apply"
    ],
    steps: [
      "Apply to the EUROPE, JAPAN or AUSTRALIA hubs as an Indian student. The US hubs will reject you on enrolment grounds.",
      "Applications for most regions open on 1 November.",
      "You may apply to multiple hubs. Do so.",
      "Cambridge and Karolinska hosting means this doubles as a way to get known at institutions you might later apply to for a PhD."
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
    stages: ["clin", "intern", "grad", "pg"], funding: "full",
    money: "Fully funded including international travel · free to apply",
    duration: "1 week, late June/July",
    window: "Nominations through partner institutions, roughly Aug–Oct",
    deadlineMonths: [8, 9, 10],
    url: "https://www.lindau-nobel.org/",
    why: "Six hundred young scientists from around the world spend a week with thirty to forty Nobel laureates, with everything paid. The medicine meeting runs every three years. It is the highest-prestige thing on this list that costs a student nothing.",
    reqs: ["Undergraduate, masters, PhD or postdoc in the relevant field", "Nomination via an academic partner — in India, INSA, DST and DBT nominate", "Free to apply"],
    steps: [
      "Find the Indian nominating partner for the current cycle — usually the Indian National Science Academy or DST.",
      "Nominations open roughly a year ahead of the meeting.",
      "The medicine and physiology meeting is triennial. Check which discipline the next meeting covers before applying."
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
    url: "https://ifmsa.org/exchanges/",
    why: "The cheapest way for a medical student to get a month abroad. SCORE is the research track, SCOPE is clinical. Accommodation and often meals are covered by the host committee, so beyond flights the marginal cost is small.",
    reqs: ["Membership of MSAI (India's IFMSA national member organisation)", "Your college needs a Local Committee — or you help start one", "Some countries require a language certificate"],
    steps: [
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
      "Always tick the fellowship box at the point of applying — you usually cannot ask afterwards.",
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
    stages: ["grad", "pg"], funding: "partial",
    money: "WHO now provides a stipend to interns in most duty stations",
    duration: "6–24 weeks",
    window: "Rolling — the roster is open continuously",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.who.int/careers/internship-programme",
    why: "The SEARO regional office is in New Delhi, which means a WHO placement without leaving India or paying for international travel. WHO began paying interns a stipend after decades of not doing so, which finally makes it viable for people without family money.",
    reqs: ["Enrolled in or recently completed a relevant degree", "At least a bachelor's-level qualification — MBBS qualifies", "Applications through the WHO careers portal"],
    steps: [
      "Apply to the SEARO New Delhi office as well as Geneva — far fewer applicants, same institution on your CV.",
      "The roster is continuous; apply and wait rather than watching for a deadline.",
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
    url: "https://ibro.org/funding/",
    why: "You do not attend these by paying — you attend them by submitting an abstract and applying for the travel award in the same breath. IBRO in particular exists to fund neuroscientists from countries like India, and its schemes are chronically under-applied.",
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
    org: "CUGH · World Health Summit · Union World Conference on Lung Health · IAS",
    type: "conference", country: "Global", city: "Rotating",
    fields: ["global", "pubhealth", "infect", "systems"],
    stages: ["clin", "intern", "grad", "pg"], funding: "partial",
    money: "Full scholarships covering registration, flights and accommodation for delegates from LMICs",
    duration: "3–5 days",
    window: "Scholarship applications 4–8 months ahead",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.cugh.org/",
    why: "These conferences have explicit budgets for delegates from low- and middle-income countries and routinely fail to spend them. The International AIDS Society and the Union both run full scholarships including international flights.",
    reqs: ["Usually an accepted abstract for the full scholarship", "Residency in an eligible country — India qualifies for most", "Student or early-career status"],
    steps: [
      "Write the abstract first; the scholarship follows the abstract in almost every case.",
      "The World Health Summit runs a free or low-cost student track and streams sessions publicly.",
      "CUGH's annual meeting has a student and trainee rate plus travel awards for LMIC delegates."
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
    why: "The single cheapest credential that makes a cold email to a computational neuroscience laboratory actually land. Three weeks, globally respected, remote, and the fee is waived if you ask. Right now a principal investigator has no way to verify you can do the work — this is the proof.",
    reqs: ["Basic Python — do a free course first if you have none", "No degree requirement", "Tuition waivers available; there is no cost to apply"],
    steps: [
      "Applications open in February for a July course. Attend the January information session.",
      "Request the tuition waiver during enrolment. It is a normal part of the process, not a favour.",
      "Do a free Python course beforehand — the academy assumes you can write a loop.",
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
      "Do CITI or NIH Good Clinical Practice training free online — it is a formal requirement for many research placements and takes one afternoon.",
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
    url: "https://training.cochrane.org/",
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
      "Write up what you organise. An undocumented campaign is invisible on an application; a one-page field report with numbers is a credential."
    ],
    zeroCost: false, indiaSpecific: true, competitiveness: "accessible", workExp: 0
  }
];
