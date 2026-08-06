/* Dream Counsellor — expansion set.
   Physician-scientist routes, biochemistry and molecular medicine, dual degrees,
   and the specialist training courses that are hard to find because nobody
   advertises them to medical students. Appended to the core arrays. */

window.DB = window.DB || {};
window.DB.study = window.DB.study || [];
window.DB.research = window.DB.research || [];

/* ═══════════ PHYSICIAN-SCIENTIST ROUTES — built for people with a medical degree ═══════════ */
window.DB.study.push(
  {
    id: "emerald-mdphd",
    name: "EMERALD — European PhD Programme for Medical Doctors",
    org: "EU-funded consortium of seven European centres of excellence",
    type: "phd", country: "Europe", city: "Multi-country",
    fields: ["clinical", "genomics", "neuro", "biochem", "compbio", "onco"],
    stages: ["grad", "pg"], funding: "full",
    money: "Fully funded doctoral contract with an EU salary, mobility and family allowances",
    duration: "3–4 years",
    window: "Cohort calls; watch the site from autumn",
    deadlineMonths: [9, 10, 11, 12, 1],
    url: "https://emerald-mdphd.eu/",
    why: "The first Europe-wide doctoral programme designed specifically for medical doctors rather than for science graduates who happen to accept doctors. It exists precisely because the physician-scientist pipeline was broken, and it recruits a small cohort across seven European institutes. If you have wondered whether anyone builds a route for people exactly like you, this is that route.",
    reqs: ["A medical degree — MBBS qualifies", "Research interest matched to one of the consortium centres", "English; no other language required", "Mobility rule: you generally cannot have lived in the host country for long recently"],
    steps: [
      "Read the consortium list first and identify the two centres whose work genuinely overlaps with your question.",
      "Cohort recruitment is periodic rather than annual — check the site every few months rather than assuming a fixed date.",
      "Because it is Marie Skłodowska-Curie style funding, the salary and conditions are unusually good and the mobility rules are strict. Read them before you invest.",
      "Contact a supervisor at your target centre before the call opens. Every European doctoral application improves with that."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "fmi-basel",
    name: "International MD-PhD Programme",
    org: "Friedrich Miescher Institute & University of Basel, Switzerland",
    type: "phd", country: "Switzerland", city: "Basel",
    fields: ["biochem", "genomics", "neuro", "onco", "compbio"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full Swiss doctoral salary — among the highest in the world",
    duration: "3–4 years",
    window: "Annual call, typically closing in the first half of the year",
    deadlineMonths: [1, 2, 3, 4, 5],
    url: "https://www.fmi.ch/training/phd-program/",
    why: "Built for medical students and physicians who want serious bench or computational research, affiliated with the Novartis research institutes and the Basel medical faculty. The combination of a clinical degree, a Swiss salary and industry proximity is rare.",
    reqs: ["Medical degree or final-year medical student", "Strong research motivation and ideally some prior lab exposure", "English only"],
    steps: [
      "Apply through the FMI PhD programme portal, flagging the MD-PhD track specifically.",
      "Interviews are held in Basel or remotely; the scientific discussion is the whole assessment.",
      "The Swiss Government Excellence Scholarship is a parallel route to the same institutions — apply to both."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "pasteur-mdphd",
    name: "MD-PhD Programme",
    org: "Institut Pasteur, Paris",
    type: "phd", country: "France", city: "Paris",
    fields: ["infect", "biochem", "genomics", "neuro", "global"],
    stages: ["grad", "pg"], funding: "full",
    money: "Funded doctoral position with a stipend; French public tuition is negligible",
    duration: "3–4 years",
    window: "Annual call, typically opening in the first quarter",
    deadlineMonths: [1, 2, 3, 4],
    url: "https://www.pasteur.fr/en/education",
    why: "Institut Pasteur is one of the great research institutions in the history of medicine, and it explicitly designs this programme to bridge clinical practice and fundamental research. Infectious disease and global health work here is world-leading and directly relevant to Indian disease burden.",
    reqs: ["Medical degree", "Research project aligned with a Pasteur unit", "English is sufficient for the science; French helps for life in Paris"],
    steps: [
      "Identify the Pasteur unit first. The institute is a federation of units and the unit matters more than the brand.",
      "Contact the unit head with a specific question about their published work.",
      "Combine with the Charpak or Eiffel scholarship routes if the internal funding does not cover everything."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "uk-acf",
    name: "Academic Clinical Fellowship (ACF) & Academic Foundation Programme",
    org: "NIHR / UK Royal Colleges",
    type: "residency", country: "UK", city: "Various",
    fields: ["clinical", "psych", "neuro", "pubhealth"],
    stages: ["grad", "pg"], funding: "paid",
    money: "Full NHS training salary with 25 % of your time protected for research",
    duration: "3–4 years alongside specialty training",
    window: "Applications open around November for the following August",
    deadlineMonths: [10, 11, 12],
    url: "https://www.nihr.ac.uk/career-development/",
    why: "The answer to the question every clinically-minded researcher eventually asks: do I have to choose? An ACF gives you a quarter of your working week for research while you train as a psychiatrist, on a full salary. UK psychiatry is understaffed and recruits internationally, which makes this unusually reachable.",
    reqs: ["GMC registration (via UKMLA/PLAB for Indian graduates)", "Eligibility for UK specialty training", "A research track record helps enormously at interview"],
    steps: [
      "Get GMC registration first — the ACF sits on top of the normal training application, it is not a separate entry route.",
      "Apply through Oriel in the November round alongside standard specialty applications.",
      "Name the research group you want to work with in your application. ACFs are attached to specific academic departments.",
      "This route ends in a clinical lectureship and often a funded PhD, which is the classic UK physician-scientist ladder."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "high", workExp: 1
  },

  /* ═══════════ BIOCHEMISTRY, MOLECULAR MEDICINE AND GENOMICS MASTERS ═══════════ */
  {
    id: "biochem-msc-uk",
    name: "MSc Biochemistry / Molecular & Cellular Biochemistry",
    org: "Oxford, UCL, Manchester, Bristol, Glasgow",
    type: "masters", country: "UK", city: "Various",
    fields: ["biochem", "genomics", "onco", "neuro"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ £30,000–36,000 · Commonwealth and Felix both fund UK science masters",
    duration: "1 year taught, or 2 years by research (MRes/MPhil)",
    window: "Opens Oct · rolling through to June",
    deadlineMonths: [10, 11, 12, 1, 2, 3, 4, 5, 6],
    url: "https://www.findamasters.com/masters-degrees/biochemistry/",
    why: "The most direct conversion from a clinical degree into bench science. An MBBS gives you more physiology and pathology than most biochemistry graduates have, and less molecular technique — which is precisely the gap a taught masters closes. Choose the MRes variant over the MSc if a doctorate is the eventual aim, because it is mostly laboratory work rather than lectures.",
    reqs: ["MBBS or a science degree with a strong biochemistry component", "IELTS 6.5–7.0", "Some programmes ask for prior laboratory experience — an ICMR STS project counts"],
    steps: [
      "Choose MRes over MSc if you want a doctorate afterwards. An MRes is essentially a year in a lab with a thesis and reads far better to a PhD admissions panel.",
      "Email the programme director and ask which projects have been available in recent years. This tells you more than any prospectus.",
      "A UK science masters is one of the routes Felix and Commonwealth both fund — apply for those in the same cycle, not after."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "molmed-europe",
    name: "MSc Molecular Medicine / Molecular Biosciences",
    org: "Göttingen, Uppsala, Amsterdam UMC, Charité, Heidelberg",
    type: "masters", country: "Europe", city: "Various",
    fields: ["biochem", "genomics", "neuro", "onco", "infect"],
    stages: ["grad", "pg"], funding: "free",
    money: "German and Nordic public universities: no tuition, only a semester fee",
    duration: "2 years",
    window: "Applications Dec–May depending on country",
    deadlineMonths: [12, 1, 2, 3, 4, 5],
    url: "https://www.mastersportal.com/search/master/molecular-medicine/",
    why: "Molecular medicine is biochemistry taught for people who intend to apply it clinically, and continental Europe teaches it in English at close to zero tuition. Göttingen's programme in particular is a well-known feeder into German doctoral schools, which is the natural next step.",
    reqs: ["MBBS or bioscience bachelor's", "English proficiency; no German required for these tracks", "Blocked account or proof of funds for the visa"],
    steps: [
      "Verify the teaching language of the specific track — this is where most Indian applicants lose a whole cycle.",
      "Get your MBBS assessed on ANABIN and uni-assist early for Germany; recognition is procedural and slow.",
      "Two years with no tuition means your only cost is living, which in Leipzig or Göttingen is far lower than in any UK city."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "genomic-medicine-msc",
    name: "MSc Genomic Medicine",
    org: "Cambridge, Imperial, Queen Mary, Exeter, Manchester",
    type: "masters", country: "UK", city: "Various",
    fields: ["genomics", "compbio", "clinical", "onco"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ £28,000–35,000 · part-time and modular routes available",
    duration: "1 year full-time, or 2–3 years part-time",
    window: "Opens Oct · closes Mar–Jul",
    deadlineMonths: [10, 11, 12, 1, 2, 3, 4, 5, 6],
    url: "https://www.genomicseducation.hee.nhs.uk/",
    why: "Built out of the 100,000 Genomes Project to retrain practising clinicians for genomic medicine, so it is designed around people with a medical degree and no bioinformatics. The part-time modular route means you can hold it while working, and it is the most direct on-ramp from clinical medicine into psychiatric or cancer genomics.",
    reqs: ["Medical, nursing or bioscience degree", "No prior programming required — that is the point of the course", "IELTS 7.0"],
    steps: [
      "Take individual modules first if you are unsure — most of these programmes allow standalone module enrolment.",
      "Pair this with a public dataset project. A genomics masters plus an independent analysis of GenomeIndia or UK Biobank data is a genuinely strong doctoral application.",
      "Check whether the programme includes a bioinformatics stream; some are clinically weighted and teach very little computation."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "health-data-science",
    name: "MSc Health Data Science / Biostatistics",
    org: "LSHTM, UCL, Oxford, Harvard, Melbourne",
    type: "masters", country: "Global", city: "Various",
    fields: ["compbio", "pubhealth", "genomics", "psych"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ £30,000–70,000 · many US biostatistics programmes fund students as teaching assistants",
    duration: "1–2 years",
    window: "Opens Sept–Oct · US deadlines Dec, UK rolling to June",
    deadlineMonths: [9, 10, 11, 12, 1, 2, 3, 4, 5],
    url: "https://www.lshtm.ac.uk/study/courses/masters-degrees/health-data-science",
    why: "The highest-employability degree on this entire site, and the one that keeps every door open — clinical research, industry, global health and academia all need people who can genuinely analyse data and also understand what a patient is. US biostatistics departments frequently fund masters students through teaching assistantships, which almost nobody realises.",
    reqs: ["Quantitative comfort — this is genuinely required", "MBBS accepted; some programmes ask for evidence of mathematics", "Prior Python or R helps a great deal"],
    steps: [
      "Do a free statistics and Python course before applying. It changes both your application and your first term.",
      "Ask US biostatistics departments directly about teaching assistantship funding for masters students. It exists more often than it is advertised.",
      "This degree makes you employable in a way an MPH alone does not. If you are risk-averse about leaving clinical medicine, this is the least risky exit."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "dual-degrees",
    name: "Dual and combined degrees: MD-MPH, MPH-MBA, MSc + integrated PhD",
    org: "Harvard, Hopkins, LSHTM-Imperial, Melbourne, Duke-NUS",
    type: "masters", country: "Global", city: "Various",
    fields: ["pubhealth", "systems", "global", "compbio"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Varies widely; integrated MSc+PhD routes are usually fully funded",
    duration: "2–6 years",
    window: "Follows the host institution's main cycle",
    deadlineMonths: [9, 10, 11, 12, 1],
    url: "https://publichealth.jhu.edu/academics/dual-degree-programs",
    why: "Combined degrees compress two qualifications into less time than taking them separately, and the integrated masters-plus-doctorate routes in Europe are fully funded throughout. The MPH-MBA combination in particular is what health-systems leadership roles at WHO, the Gates Foundation and large NGOs actually recruit for.",
    reqs: ["Meet the entry requirements of both component programmes", "Usually applied for at the point of entry rather than added later", "Integrated PhD routes need a research proposal"],
    steps: [
      "Ask explicitly whether the dual degree can be applied for after you start — at many institutions it cannot, and that decision is made once.",
      "In Europe, look for '1+3' or 'MRes+PhD' integrated studentships. These fund the masters year as part of the doctorate.",
      "If you want systems and leadership rather than bench science, the MPH-MBA is the honest answer and very few Indian medics consider it."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "czech-charles",
    name: "Charles University — Václav Havel Scholarship & English-taught programmes",
    org: "Charles University, Prague",
    type: "masters", country: "Czechia", city: "Prague",
    fields: ["biochem", "neuro", "clinical", "pubhealth", "genomics"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Scholarship covers tuition and living costs; Czech-taught programmes are free to everyone",
    duration: "2 years masters, 4 years doctorate",
    window: "Applications typically Dec–Apr",
    deadlineMonths: [12, 1, 2, 3, 4],
    url: "https://cuni.cz/UKEN-1.html",
    why: "One of the oldest universities in Europe, India is explicitly eligible for the Václav Havel scholarship, and Prague is among the cheapest capitals on the continent. A genuinely overlooked route — the competition from India is a fraction of what it is for the UK.",
    reqs: ["Bachelor's or MBBS", "English-taught programmes carry a fee; Czech-taught programmes are free at public universities", "Scholarship applied for separately"],
    steps: [
      "Check the Václav Havel Scholarship eligibility list each cycle — India has featured, but lists change.",
      "If you are willing to learn Czech, tuition at public universities drops to zero entirely. That is a serious option for a doctorate.",
      "Central European universities are excellent value and are almost invisible in Indian study-abroad conversations."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },
  {
    id: "baltics",
    name: "Baltic state scholarships — Lithuania, Estonia, Latvia",
    org: "Education Exchanges Support Foundation and national agencies",
    type: "masters", country: "Baltics", city: "Vilnius, Tartu, Riga",
    fields: ["biochem", "compbio", "pubhealth", "neuro"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Lithuanian state scholarships: tuition plus roughly €592/month for eligible nationals",
    duration: "2 years",
    window: "Applications typically Feb–May",
    deadlineMonths: [2, 3, 4, 5],
    url: "https://studyin.lt/scholarships/",
    why: "Very low cost of living, English-taught programmes, EU degrees, and almost no competition from Indian applicants. Tartu in Estonia has a genuinely strong bioinformatics and genomics group — Estonia runs one of the world's most advanced national biobanks relative to its size.",
    reqs: [
      "Check the eligible-nationality list carefully — India has NOT consistently appeared on the Baltic state scholarship lists, so verify before planning",
      "University-level scholarships are a separate and often more accessible route",
      "English-taught programmes throughout"
    ],
    steps: [
      "Verify India's eligibility for the current cycle on the national agency site before investing time — this is the one thing that decides whether the route exists for you.",
      "Even without a state scholarship, tuition of €3,000–6,000 a year with low living costs beats a part-funded UK place on total cost.",
      "The University of Tartu's genomics and biobank work is the standout scientific reason to look here."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "accessible", workExp: 0
  }
);

/* ═══════════ SPECIALIST TRAINING COURSES AND SUMMER SCHOOLS ═══════════ */
window.DB.research.push(
  {
    id: "cpc-zurich",
    name: "Computational Psychiatry Course (CPC / CPC++)",
    org: "Translational Neuromodeling Unit, UZH & ETH Zürich",
    type: "skill", country: "Switzerland", city: "Zurich / hybrid",
    fields: ["psych", "neuro", "compbio"],
    stages: ["clin", "intern", "grad", "pg"], funding: "partial",
    money: "Modest registration fee, reduced rates for students; online attendance is far cheaper",
    duration: "1 week, usually late summer",
    window: "Registration typically opens in spring",
    deadlineMonths: [3, 4, 5, 6],
    url: "https://www.cpcourse.org/",
    why: "The definitive training course in the field — the one where the people who invented computational psychiatry teach it. It runs in a hybrid format, which means you can attend the whole thing from India for a fraction of the cost. For anyone whose interests sit between psychiatry, modelling and code, this is the single most targeted week available anywhere.",
    reqs: ["Basic programming and statistics", "Open to students, clinicians and researchers", "No degree requirement"],
    steps: [
      "Take the online option if travel is the barrier. The material and the lecturers are identical.",
      "Do Neuromatch Academy first if you have never modelled anything — CPC assumes a working baseline.",
      "The course materials from previous years are published openly. Start with those tonight, free."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },
  {
    id: "wellcome-connecting",
    name: "Wellcome Connecting Science courses & Advanced Courses",
    org: "Wellcome Genome Campus, Hinxton, UK",
    type: "skill", country: "UK", city: "Hinxton / online / regional",
    fields: ["genomics", "compbio", "biochem", "infect"],
    stages: ["clin", "intern", "grad", "pg"], funding: "full",
    money: "Bursaries routinely cover full registration, travel and accommodation for participants from lower-income countries",
    duration: "3 days – 2 weeks",
    window: "Rolling calls throughout the year, usually 4–6 months ahead",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://coursesandconferences.wellcomeconnectingscience.org/",
    why: "The genomics training arm of the Sanger Institute, and it explicitly funds participants from low- and middle-income countries with full bursaries including flights. It also runs courses regionally in Asia and Africa. World-class genomics training that can cost an Indian medical graduate nothing at all.",
    reqs: ["Relevant research background or clear intent", "Bursary application submitted WITH the course application", "Many courses also released free online"],
    steps: [
      "Always tick the bursary box at the point of applying. You generally cannot request it afterwards.",
      "Check the regional courses as well as the Hinxton ones — those run in Asia and cost even less to reach.",
      "Wellcome also publishes much of this material free on its online learning platform. Start there if a deadline is months away."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "cajal",
    name: "Cajal Advanced Neuroscience Training Programme",
    org: "FENS, IBRO and partner institutes across Europe",
    type: "skill", country: "Europe", city: "Bordeaux, Lisbon, Budapest and others",
    fields: ["neuro", "compbio", "psych"],
    stages: ["intern", "grad", "pg"], funding: "partial",
    money: "IBRO and FENS stipends frequently cover the full fee and travel for applicants from lower-income countries",
    duration: "2–3 weeks, intensive hands-on",
    window: "Applications 4–6 months before each course",
    deadlineMonths: [1, 2, 3, 4, 5, 9, 10, 11],
    url: "https://cajal-training.org/",
    why: "Hands-on laboratory and computational neuroscience training at a level Indian medical colleges simply cannot offer — two weeks of doing rather than watching. IBRO funds participants from countries like India specifically, and these stipends are consistently under-applied.",
    reqs: ["Neuroscience research background or serious intent", "Stipend application is part of the course application", "Highly practical — you will be at a bench or a terminal all day"],
    steps: [
      "Pick the course by technique, not by city. These are skills courses and the technique is the product.",
      "Apply for the IBRO or FENS stipend in the same form. Do not assume you will be asked later.",
      "A Cajal course on your CV signals hands-on competence in a way no online certificate does."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "cshl-courses",
    name: "Cold Spring Harbor Advanced Courses & Meetings",
    org: "Cold Spring Harbor Laboratory, USA",
    type: "skill", country: "USA", city: "New York",
    fields: ["genomics", "neuro", "compbio", "onco"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Substantial fee, but scholarships and travel awards are available and specifically flagged for international applicants",
    duration: "1–3 weeks",
    window: "Applications 3–5 months ahead of each course",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://meetings.cshl.edu/courseshome.aspx",
    why: "The courses at Cold Spring Harbor are legendary — the computational neuroscience and genomics courses in particular have trained a substantial share of the people currently leading those fields. Scholarships exist and are worth applying for even when the sticker price looks impossible.",
    reqs: ["Graduate-level background", "Scholarship application submitted with the course application", "Competitive — small cohorts"],
    steps: [
      "Apply for the scholarship in the same submission. The fee without one is genuinely prohibitive.",
      "The computational neuroscience and genomics courses are the ones most relevant to a psychiatry-and-data trajectory.",
      "Many CSHL lecture materials are published openly through their meetings archive."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "gsoc",
    name: "Google Summer of Code with INCF and neuroscience organisations",
    org: "Google, via the International Neuroinformatics Coordinating Facility and open-source labs",
    type: "research", country: "Online", city: "Remote",
    fields: ["compbio", "neuro", "genomics", "psych"],
    stages: ["pre", "clin", "intern", "grad", "pg"], funding: "paid",
    money: "Stipend paid by Google — roughly $1,500–3,300 depending on project size and country",
    duration: "12 weeks, summer",
    window: "Organisations announced Feb · student applications late Mar–Apr",
    deadlineMonths: [2, 3, 4],
    url: "https://summerofcode.withgoogle.com/",
    why: "The most overlooked opportunity on this entire site for a medical student who codes. INCF and several neuroscience and bioinformatics organisations participate every year, you work remotely from India, you are paid, and you need no institutional affiliation, no professor and no visa. A merged contribution to a tool that real neuroscientists use is a credential a principal investigator can verify in thirty seconds.",
    reqs: [
      "Aged 18 or over — no degree or enrolment requirement at all",
      "Ability to write code and, more importantly, to communicate on a public issue tracker",
      "Free to apply"
    ],
    steps: [
      "Watch for the participating-organisations list in February and look for INCF, NeuroStars, the Turing Way, Open Bioinformatics Foundation and similar.",
      "Start contributing small fixes BEFORE applying. Accepted proposals almost always come from people already visible in the project.",
      "The proposal is a technical document, not a personal statement. Describe what you will build, in what order, with milestones.",
      "Even an unsuccessful attempt leaves you with merged contributions to a real scientific tool — which is worth more than most certificates."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "ohbm-ashg",
    name: "OHBM, ASHG and ESHG — imaging and genetics meetings with trainee awards",
    org: "Organization for Human Brain Mapping · American & European Societies of Human Genetics",
    type: "conference", country: "Global", city: "Rotating",
    fields: ["neuro", "genomics", "compbio", "psych"],
    stages: ["intern", "grad", "pg"], funding: "partial",
    money: "Trainee travel awards and heavily reduced registration; some meetings offer free virtual attendance",
    duration: "4–5 days",
    window: "Abstract deadlines usually 4–6 months before the meeting",
    deadlineMonths: [1, 2, 3, 10, 11, 12],
    url: "https://www.humanbrainmapping.org/",
    why: "These are where psychiatric imaging and genetics are actually argued out. OHBM has an active and welcoming trainee community, runs an educational course alongside the main meeting, and its abstract acceptance rate is high — which makes it a realistic first international presentation.",
    reqs: ["An abstract", "Trainee membership, which is cheap", "Travel award applications are separate and earlier"],
    steps: [
      "OHBM's educational day is worth attending on its own and is included in registration.",
      "Virtual attendance is often dramatically cheaper and sometimes free — check before assuming you cannot go.",
      "Submit the abstract first; the travel award follows the abstract in almost every case."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "erasmus-traineeship",
    name: "Erasmus+ Traineeships & short-term research mobility",
    org: "European Commission, via host institutions",
    type: "research", country: "Europe", city: "Various",
    fields: ["biochem", "neuro", "genomics", "pubhealth", "compbio"],
    stages: ["clin", "intern", "grad"], funding: "stipend",
    money: "Monthly grant covering living costs for the placement period",
    duration: "2–12 months",
    window: "Rolling — depends entirely on the host institution",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students",
    why: "Most Indian students assume Erasmus+ is only for EU nationals. Traineeship funding is administered by the host institution, and third-country participants are eligible for several strands. If a European lab wants you, there is often money attached that neither of you knew about — so ask.",
    reqs: ["A host institution willing to take you", "Eligibility depends on the specific strand and host — ask them directly", "No fixed cycle"],
    steps: [
      "When a European laboratory expresses interest, ask directly: 'is there any Erasmus+ or institutional mobility funding attached to this placement?' The answer is yes more often than you would guess.",
      "The host's international office, not the professor, is who knows the answer.",
      "This works best as a follow-up to a cold email that has already succeeded, rather than as a first approach."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },
  {
    id: "open-data",
    name: "Public datasets you can analyse from anywhere, tonight",
    org: "UK Biobank · PGC · GenomeIndia / IBDC · OpenNeuro · MIMIC · NHANES · NFHS · DHS",
    type: "research", country: "Online", city: "Remote",
    fields: ["compbio", "genomics", "pubhealth", "neuro", "psych"],
    stages: ["pre", "clin", "intern", "grad", "pg"], funding: "free",
    money: "Free or a modest access fee; several require nothing but registration",
    duration: "As long as you want",
    window: "Always open",
    deadlineMonths: [],
    url: "https://www.ukbiobank.ac.uk/enable-your-research",
    why: "The single most under-used fact in Indian medical research: you can run a study on half a million people from a laptop in Jammu. UK Biobank grants access to approved researchers worldwide. The Psychiatric Genomics Consortium publishes its summary statistics openly. India's own National Family Health Survey is fully public and chronically under-analysed. No ethics delay, no funding, no permission — only a question and the method to answer it.",
    reqs: [
      "An answerable question — this is the actual bottleneck, not access",
      "R or Python",
      "Some datasets need a supervisor or institutional affiliation on the application; many need nothing"
    ],
    steps: [
      "Start with something with no gatekeeping: NFHS for Indian population health, OpenNeuro for brain imaging, PGC summary statistics for psychiatric genetics, MIMIC for critical care (after a short free training module).",
      "Reproduce a published figure before attempting anything original. It teaches the pipeline and gives you something to show.",
      "Register the analysis plan before you look at the outcome. It is what separates a study from a fishing expedition.",
      "Publish the code publicly. A repository someone else can run is a stronger credential than a certificate, and it is entirely within your control."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "accessible", workExp: 0
  }
);

/* ═══════════ impact tiers for the expansion set ═══════════ */
window.DB.impact = window.DB.impact || {};
Object.assign(window.DB.impact, {
  "emerald-mdphd":     { t: 1, odds: "24 places across Europe per cohort", effort: "30 hrs", note: "A doctoral programme designed for medical doctors rather than one that merely tolerates them. If the physician-scientist path is what you want, this was built for you." },
  "fmi-basel":         { t: 1, odds: "~5 %", effort: "20 hrs", note: "Clinical degree, Swiss salary and Novartis proximity in one place. Rare combination." },
  "pasteur-mdphd":     { t: 1, odds: "~8 %", effort: "20 hrs", note: "Pick the unit, not the brand. Pasteur is a federation and the unit is what you actually join." },
  "uk-acf":            { t: 1, odds: "Competitive but IMG-accessible in psychiatry", effort: "Follows GMC registration", note: "A quarter of your working week protected for research, on a full salary, while you train. The answer to 'do I have to choose?'" },
  "gsoc":              { t: 1, odds: "~15–20 % of serious applicants", effort: "12 weeks + weeks of prior contributions", note: "Paid, remote, no visa, no professor, no institution required. The most overlooked opportunity here for a medical student who codes." },
  "open-data":         { t: 1, odds: "Open to everyone", effort: "Ongoing", note: "You can run a study on half a million people from your bedroom. The bottleneck is the question, not the access — and almost nobody in Indian medicine has noticed." },
  "wellcome-connecting": { t: 1, odds: "Moderate — bursaries designed for LMIC applicants", effort: "10 hrs", note: "World-class genomics training that can cost an Indian medical graduate literally nothing, flights included." },
  "cpc-zurich":        { t: 2, odds: "Open registration", effort: "1 week", note: "The people who invented computational psychiatry, teaching it. Hybrid format means you can do the whole thing from India." },
  "biochem-msc-uk":    { t: 2, odds: "~40 %", effort: "20 hrs", note: "Choose the MRes over the MSc if a doctorate is the aim — it is a year in a lab rather than a year in lectures." },
  "genomic-medicine-msc": { t: 2, odds: "~45 %", effort: "18 hrs", note: "Designed to retrain clinicians who cannot yet code. The most direct on-ramp from medicine into psychiatric or cancer genomics." },
  "health-data-science": { t: 2, odds: "~30 %", effort: "25 hrs", note: "The highest-employability degree here, and the one that keeps every door open. US biostatistics departments fund masters students more often than they advertise." },
  "cajal":             { t: 2, odds: "Moderate; IBRO stipends under-applied", effort: "2–3 weeks", note: "Two weeks of doing rather than watching. Signals hands-on competence in a way no online certificate can." },
  "cshl-courses":      { t: 2, odds: "Competitive, small cohorts", effort: "1–3 weeks", note: "These courses trained a substantial share of the people currently leading genomics and computational neuroscience." },
  "molmed-europe":     { t: 2, odds: "~35 %", effort: "25 hrs", note: "Two years, no tuition, taught in English. Your only real cost is living in a cheap German city." },
  "dual-degrees":      { t: 2, odds: "Varies", effort: "Varies", note: "Ask whether it can be added later — at most institutions it cannot, and that decision is made once, at entry." },
  "ohbm-ashg":         { t: 2, odds: "High abstract acceptance", effort: "20 hrs", note: "A realistic first international presentation. Virtual attendance is often dramatically cheaper or free." },
  "czech-charles":     { t: 3, odds: "Accessible", effort: "15 hrs", note: "India has featured on the Václav Havel eligibility list. Learn Czech and public university tuition drops to zero entirely." },
  "erasmus-traineeship": { t: 3, odds: "Host-dependent", effort: "Low, once a host says yes", note: "Most Indian students assume this is EU-only. When a European lab wants you, ask their international office about mobility funding — the answer is yes more often than you would guess." },
  "baltics":           { t: 3, odds: "Low competition, but verify eligibility", effort: "15 hrs", note: "India has NOT consistently appeared on Baltic state scholarship lists. Verify before planning — but Tartu's genomics work is a real scientific draw regardless." }
});
