/* Meridian — Scholarships and fellowships an Indian medical student or graduate can actually hold.
   Ordered roughly by how much money moves and how many people miss them. */

window.DB = window.DB || {};

window.DB.funding = [
  /* ─────────────────── GOVERNMENT-TO-GOVERNMENT, FULLY FUNDED ─────────────────── */
  {
    id: "chevening",
    name: "Chevening Scholarship",
    org: "UK Foreign, Commonwealth & Development Office",
    type: "scholarship", country: "UK", city: "Any UK university",
    fields: ["pubhealth", "global", "systems", "psych"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full tuition + monthly stipend + flights + arrival allowance. India is the largest Chevening cohort in the world.",
    duration: "1-year UK masters",
    window: "Opened 4 Aug · closes 6 October, 11:00 UTC. That is 4:30 pm IST, and there are no extensions, ever",
    deadlineMonths: [8, 9, 10],
    url: "https://www.chevening.org/scholarships/",
    why: "The largest fully-funded route from India to the UK. Roughly 8–10 % of Indian applicants are selected, which sounds brutal until you realise most applications are visibly rushed — the leadership and networking essays are where people lose, and they are the two you can actually prepare for.",
    reqs: [
      "Indian citizenship and intent to return to India for 2 years after the award",
      "Completed undergraduate degree — MBBS qualifies",
      "2,800 hours of work experience. Internship, paid research assistance, part-time and voluntary work all count",
      "Three UK master's course choices, and an unconditional offer from one by mid-July"
    ],
    steps: [
      "Count your 2,800 hours honestly and early. This is the criterion that silently disqualifies most medical applicants. Your MBBS internship year alone is usually enough.",
      "Four essays: leadership, networking, choice of course, career plan. Draft them in August, not September.",
      "Pick three DIFFERENT universities, not three courses at one. Selectors read the spread as judgement.",
      "Submit at least 48 hours before the deadline. The portal closes at 11:00 UTC — 4:30 pm IST — exactly, and has crashed under load in past years.",
      "Interviews at the British High Commission run Feb–Apr; results in June."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 2
  },
  {
    id: "commonwealth",
    name: "Commonwealth Scholarships — Master's and Shared Scholarship",
    org: "Commonwealth Scholarship Commission, UK",
    type: "scholarship", country: "UK", city: "Various",
    fields: ["pubhealth", "global", "systems", "infect", "repro"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full tuition + stipend + airfare + warm-clothing allowance + thesis grant",
    duration: "1-year masters (PhD route also exists)",
    window: "Opens ~Aug–Sept · Master's deadline around mid-October; Shared Scholarships vary by university",
    deadlineMonths: [9, 10, 11, 12],
    url: "https://cscuk.fcdo.gov.uk/scholarships/",
    why: "Explicitly designed for people from lower- and middle-income Commonwealth countries who cannot otherwise afford UK study, which means, unusually, that limited financial means is an advantage rather than something to hide. Health and wellbeing is one of its six named priority themes.",
    reqs: [
      "Indian citizenship, resident in India",
      "Upper second-class degree or equivalent — MBBS qualifies",
      "Must be unable to afford UK study without the award, and be prepared to say so",
      "Shared Scholarships are applied for THROUGH the university, not the Commission"
    ],
    steps: [
      "Understand which of the two schemes you want. Master's Scholarships go through a nominating body in India; Shared Scholarships go through the UK university directly.",
      "For the Master's route from India you must submit through TWO portals in the same cycle — the CSC's own system and the Ministry of Education's SAKSHAT portal. Completing only one disqualifies the application outright, and it is the most common way an otherwise strong Indian application is thrown out before anyone reads it.",
      "Check the Indian nominating body's internal deadline, not just the CSC one. National nominating bodies routinely close earlier than the CSC date, and the CSC deadline is the one every listicle quotes.",
      "For Shared Scholarships, check cscuk.fcdo.gov.uk's eligible-course list first — it changes yearly and LSHTM, UCL, Liverpool and Warwick usually feature.",
      "The development-impact statement is the whole application. Write about a specific problem in a specific Indian district, not about India's health system in general.",
      "Apply to the UK course AND the scholarship in parallel. The course deadline is usually later — do not let it set your pace."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "fulbright",
    name: "Fulbright-Nehru Master's Fellowship",
    org: "United States-India Educational Foundation (USIEF)",
    type: "scholarship", country: "USA", city: "Various",
    fields: ["pubhealth", "global", "psych", "systems", "env"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full tuition + airfare + living stipend + health cover, for up to 2 years",
    duration: "1–2 year US masters",
    window: "Opens Feb · closes mid-May, roughly 16 months before you would start",
    deadlineMonths: [2, 3, 4, 5],
    url: "https://www.usief.org.in/fulbright-fellowships/",
    why: "The most prestigious India-to-US route there is, and USIEF does the university placement work for you. Public health is an explicitly eligible field. The three-year experience requirement means this is something you plan for during internship and junior residency, not something you apply to as a student.",
    reqs: [
      "Indian citizenship, resident in India",
      "Bachelor's equivalent with at least 55 % — MBBS qualifies",
      "THREE years of full-time paid professional experience relevant to the field, by the deadline",
      "Cannot hold or be studying for a US degree already"
    ],
    steps: [
      "Start counting the three years now. Internship plus two years of clinical or research work gets you there, which means applying in your third post-MBBS year.",
      "The application closes in May for a course starting 16 months later. This is the longest lead time of any scholarship here.",
      "USIEF places you; you list preferences but do not need an offer in hand first. That removes the usual chicken-and-egg problem.",
      "Fulbright-Nehru Doctoral Research Fellowships are a separate scheme for people already registered for a PhD in India who want a year in a US lab."
    ],
    indiaSpecific: true, competitiveness: "high", workExp: 3
  },
  {
    id: "daad-epos",
    name: "DAAD EPOS — Development-Related Postgraduate Courses",
    org: "German Academic Exchange Service",
    type: "scholarship", country: "Germany", city: "Various",
    fields: ["global", "pubhealth", "systems", "env"],
    stages: ["grad", "pg"], funding: "full",
    money: "€992/month + tuition + travel + health insurance + a German language course before you start",
    duration: "12–24 months",
    window: "Course-dependent, mostly Aug–Oct for the following year",
    deadlineMonths: [7, 8, 9, 10],
    url: "https://www.daad.in/en/find-funding/scholarship-database/",
    why: "Germany charges no tuition and then pays you on top. EPOS funds a fixed list of English-taught masters — including Heidelberg's International Health and several health-systems programmes — and is aimed squarely at professionals from developing countries, which puts Indian doctors right in the target group.",
    reqs: [
      "Bachelor's or MBBS with above-average marks",
      "TWO years of relevant professional experience after the degree — non-negotiable for EPOS",
      "Degree completed no more than 6 years ago",
      "English proficiency; German not required for the degree itself"
    ],
    steps: [
      "Go to the DAAD scholarship database and filter by 'Development-Related Postgraduate Courses'. Only courses on that list are funded.",
      "You apply to the UNIVERSITY and to DAAD separately, with different documents and different deadlines. Missing one wastes the other.",
      "The two-year experience rule is checked strictly. Plan for this at two to three years post-MBBS.",
      "DAAD also runs research grants for PhD candidates and short-term stays — those have no experience requirement and are worth checking separately."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 2
  },
  {
    id: "erasmus-mundus",
    name: "Erasmus Mundus Joint Masters Scholarship",
    org: "European Commission / EACEA",
    type: "scholarship", country: "Europe", city: "Multi-country",
    fields: ["pubhealth", "global", "neuro", "compbio", "biochem", "env", "infect"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full tuition + €1,400/month living allowance + travel + installation + insurance",
    duration: "1–2 years, studied across 2–3 European countries",
    window: "Most consortia open Oct–Nov and close Dec–Jan",
    deadlineMonths: [10, 11, 12, 1, 2],
    url: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en",
    why: "The most under-applied major scholarship available to Indians, and the €1,400 monthly allowance is genuinely more than you need in most of Europe. There are over 200 funded joint masters covering neuroscience, public health, epidemiology, biomedical engineering and global health, and most Indian students have never opened the catalogue.",
    reqs: [
      "Any bachelor's or MBBS",
      "No work experience required for most programmes",
      "You may apply to a MAXIMUM of three Erasmus Mundus programmes per cycle — applying to more voids all of them",
      "English proficiency per consortium"
    ],
    steps: [
      "Open the official EACEA catalogue and filter by field. Spend an evening on it; this is the single highest-value hour in this whole guide.",
      "Programmes worth knowing for a medic: Europubhealth+, IMSOGLO (global one health), Neurasmus (neuroscience), and several infectious-disease and bioinformatics consortia.",
      "One application per consortium covers admission and the scholarship together.",
      "Check that the intake you are applying to actually has a scholarship round. A consortium's EU funding runs in multi-year editions, and some intakes admit on a self-funded basis only — the course page stays up either way, so it is entirely possible to write a full application for a year in which there is no money to win.",
      "Choose your three carefully and honestly rank fit over prestige — consortia reject people who obviously applied everywhere."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "gates-cambridge",
    name: "Gates Cambridge Scholarship",
    org: "Bill & Melinda Gates Foundation / University of Cambridge",
    type: "scholarship", country: "UK", city: "Cambridge",
    fields: ["pubhealth", "global", "neuro", "genomics", "compbio"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full cost of study + maintenance allowance + family, fieldwork and conference allowances",
    duration: "Full length of an MPhil or PhD",
    window: "International round closes 3 Dec OR 7 Jan — it depends on your course, so check the course directory",
    deadlineMonths: [9, 10, 11, 12, 1],
    url: "https://www.gatescambridge.org/apply/how-to-apply/",
    why: "Around 75 scholars a year worldwide, selected on academic excellence, leadership potential, and — unusually explicit — commitment to improving the lives of others. A medical graduate working on health equity is exactly the profile it was written for.",
    reqs: [
      "Citizen of any country outside the UK",
      "Applying for a PhD, MPhil, MLitt or one-year postgraduate course at Cambridge",
      "One application form covers both the course and the scholarship"
    ],
    steps: [
      "The international-round deadline in early December is earlier than the course deadline. Use the December one.",
      "Tick the Gates Cambridge funding box on the Cambridge Graduate Application. There is no separate form.",
      "The 'commitment to improving the lives of others' section is scored. Write about what you have actually done, at whatever scale you did it.",
      "Shortlisted candidates are interviewed in late January."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "rhodes-india",
    name: "Rhodes Scholarship — India",
    org: "Rhodes Trust, University of Oxford",
    type: "scholarship", country: "UK", city: "Oxford",
    fields: ["pubhealth", "global", "psych", "systems"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full Oxford fees + £19,000+ annual stipend + flights, for 2–3 years",
    duration: "2–3 years at Oxford",
    window: "India round opened 1 June and closed 23 July, 23:59 IST — 53 days, and the earliest major deadline of the year",
    deadlineMonths: [6, 7],
    url: "https://www.rhodeshouse.ox.ac.uk/scholarships/",
    why: "Five or six Indians a year. The bar is not just marks. It is a demonstrated record of using energy on behalf of other people. Medical students who have organised, built or campaigned for something are structurally well placed here; medical students with only a transcript are not.",
    reqs: [
      "Indian citizen or resident, aged 19–25 (some flexibility for MBBS holders)",
      "Completed or completing an undergraduate degree with strong academic standing",
      "Deadline is in July — a full year before you would go up"
    ],
    steps: [
      "Note the age limit carefully; MBBS graduates often sit right at the boundary, and there is a specific allowance for longer degrees.",
      "Six to eight referees are required. Line them up in May, not July.",
      "Rhodes reads for 'energy to use one's talents to the full' — write your leadership and service record concretely, with numbers.",
      "Interviews happen in India in the autumn."
    ],
    indiaSpecific: true, competitiveness: "high", workExp: 0
  },
  {
    id: "clarendon",
    name: "Clarendon Fund Scholarship",
    org: "University of Oxford",
    type: "scholarship", country: "UK", city: "Oxford",
    fields: ["pubhealth", "neuro", "genomics", "global", "compbio"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full tuition + £20,000+ annual living stipend",
    duration: "Full length of the course",
    window: "Tied to your Oxford course deadline — the early-January gathered field",
    deadlineMonths: [10, 11, 12, 1],
    url: "https://www.ox.ac.uk/clarendon",
    why: "About 200 awards a year across every Oxford department, and there is no separate application. You are automatically considered when you apply to Oxford by the relevant deadline. It is the single least-effort major scholarship in existence, and people still miss it by applying late.",
    reqs: [
      "Applying to any full-time Oxford graduate course",
      "Awarded purely on academic merit and potential",
      "No separate form, but you MUST meet the earlier gathered-field deadline"
    ],
    steps: [
      "Apply in the earliest gathered field for your course, usually November or early January.",
      "That is genuinely the whole mechanism. There is no Clarendon essay.",
      "Combine with the Oxford-India (Reliance / Weidenfeld-Hoffmann) schemes, which do have their own forms."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "felix",
    name: "Felix Scholarship",
    org: "Oxford, Cambridge, SOAS, Reading, LSHTM",
    type: "scholarship", country: "UK", city: "Various",
    fields: ["pubhealth", "global", "systems", "env"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full tuition + living allowance + return airfare",
    duration: "Full length of the course",
    window: "Deadlines Dec–Jan, aligned to each university",
    deadlineMonths: [11, 12, 1],
    url: "https://www.felixscholarship.org.uk/",
    why: "Reserved for Indian nationals specifically, with a stated preference for candidates from financially disadvantaged backgrounds who intend to return to India. Far fewer applicants than Chevening, comparable money.",
    reqs: [
      "Indian citizen, resident in India, first degree from an Indian university",
      "A first-class degree or equivalent",
      "Must not already hold a degree from a university outside India",
      "Commitment to return to India after the course"
    ],
    steps: [
      "Apply to the university course first; Felix is then applied for through that institution.",
      "The 'financially disadvantaged' criterion is real and assessed — do not inflate your circumstances, and do not hide them either.",
      "LSHTM is a Felix partner, which makes this one of the best public-health funding routes available to an Indian doctor."
    ],
    indiaSpecific: true, competitiveness: "high", workExp: 0
  },

  /* ─────────────────── INDIAN FOUNDATIONS AND TRUSTS ─────────────────── */
  {
    id: "jn-tata",
    name: "J.N. Tata Endowment for Higher Education",
    org: "Tata Trusts",
    type: "scholarship", country: "Any", city: "Any",
    fields: ["pubhealth", "neuro", "biochem", "genomics", "compbio", "global"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Interest-free loan scholarship of ₹1–10 lakh, plus travel and gift awards for top scorers",
    duration: "One-time award for a postgraduate degree abroad",
    window: "Opens ~Dec · closes mid-March",
    deadlineMonths: [12, 1, 2, 3],
    url: "https://www.jntataendowment.org/loan-scholarship",
    why: "Over a century old, open to every field including medicine, and it does not require an admission offer in hand when you apply. The interest-free structure means you repay only what you borrowed — in practice one of the cheapest ways to bridge a funding gap.",
    reqs: [
      "Indian citizen with a first degree",
      "Applying for postgraduate study abroad in any discipline",
      "Selection by interview in Mumbai or by video"
    ],
    steps: [
      "Apply between December and mid-March; the online form is straightforward but the interview is substantive.",
      "You do NOT need a confirmed offer to apply — this makes it a useful early-cycle safety net.",
      "Top-ranked candidates also receive outright travel grants and gift awards on top of the loan."
    ],
    indiaSpecific: true, competitiveness: "medium", workExp: 0
  },
  {
    id: "kc-mahindra",
    name: "K.C. Mahindra Scholarship for Post-Graduate Studies Abroad",
    org: "K.C. Mahindra Education Trust",
    type: "scholarship", country: "Any", city: "Any",
    fields: ["pubhealth", "systems", "global", "compbio", "biochem"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Interest-free loan scholarship up to ₹8 lakh; top three receive larger outright grants",
    duration: "One-time postgraduate award",
    window: "Opens ~Jan · closes end-March/April",
    deadlineMonths: [1, 2, 3, 4],
    url: "https://www.kcmet.org/",
    why: "Open to all disciplines including medicine, unlike Inlaks. The repayment terms are generous and it stacks freely with partial university scholarships — most winners use it to close the last ₹5–8 lakh of a gap.",
    reqs: ["Indian citizen, graduate of an Indian university", "Confirmed admission to a foreign postgraduate programme", "Interview round in Mumbai"],
    steps: [
      "Have your admission letter ready — unlike J.N. Tata, this one wants confirmation.",
      "Apply in the January–April window for an August–September start.",
      "Be specific about how you will use the degree in India. The trust cares about return."
    ],
    indiaSpecific: true, competitiveness: "medium", workExp: 0
  },
  {
    id: "inlaks",
    name: "Inlaks Shivdasani Foundation Scholarship",
    org: "Inlaks Shivdasani Foundation",
    type: "scholarship", country: "Any", city: "Any",
    fields: ["psych", "pubhealth", "global"],
    stages: ["grad", "pg"], funding: "full",
    money: "Up to USD 100,000 — one of the most generous Indian awards in existence",
    duration: "Full masters or specialised training",
    window: "Opens ~Jan · closes end-March",
    deadlineMonths: [1, 2, 3],
    url: "https://inlaksfoundation.org/scholarships/",
    why: "Enormous money, but read the exclusions before you invest time: medicine, engineering, computer science, MBA and management are all excluded. It remains open for psychology, public health as a social science, and pure sciences, which is exactly the boundary a medic pivoting into behavioural or population science is standing on.",
    reqs: [
      "Indian citizen resident in India, under 30",
      "First-class degree from a recognised Indian university",
      "Confirmed admission required before applying",
      "EXCLUDED fields: medicine (including MPH taken as a clinical qualification), engineering, computer science, business"
    ],
    steps: [
      "Check the current exclusion list on the Inlaks site before doing anything else — the boundary between an excluded 'medicine' course and an eligible social-science course is where applications live or die.",
      "You need an admission offer in hand by the March deadline.",
      "Frame a public health or psychology application in social-science terms, honestly, if that is what the course actually is."
    ],
    indiaSpecific: true, competitiveness: "high", workExp: 0
  },
  {
    id: "narotam",
    name: "Narotam Sekhsaria Scholarship",
    org: "Narotam Sekhsaria Foundation",
    type: "scholarship", country: "Any", city: "Any",
    fields: ["pubhealth", "global", "neuro", "biochem", "psych"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Interest-free loan of up to ₹20 lakh, repayable over 5 years after you start earning",
    duration: "Postgraduate study abroad, any discipline",
    window: "Opens Jan · closes late March/April",
    deadlineMonths: [1, 2, 3, 4],
    url: "https://www.nsfoundation.co.in/",
    why: "The largest interest-free loan scholarship open to Indians in any discipline, medicine included. Selection is by a genuinely rigorous interview rather than by marks alone, which favours people with an actual story.",
    reqs: ["Indian citizen under 30", "First-class graduate degree", "Applying to a postgraduate course abroad"],
    steps: [
      "Apply in January; interviews happen in Mumbai around May.",
      "The interview panel probes whether you have thought your plan through. Come with specifics.",
      "This stacks with partial university funding — most awardees combine several sources."
    ],
    indiaSpecific: true, competitiveness: "medium", workExp: 0
  },
  {
    id: "aga-khan",
    name: "Aga Khan Foundation International Scholarship Programme",
    org: "Aga Khan Foundation",
    type: "scholarship", country: "Any", city: "Any",
    fields: ["pubhealth", "global", "systems", "repro"],
    stages: ["grad", "pg"], funding: "partial",
    money: "50 % grant, 50 % interest-free loan, covering tuition and living costs",
    duration: "Masters or PhD",
    window: "Opens ~Jan · closes 31 March",
    deadlineMonths: [1, 2, 3],
    url: "https://the.akdn/en/how-we-work/our-agencies/aga-khan-foundation/international-scholarship-programme",
    why: "Explicitly prioritises applicants with a track record of community service and financial need, and health is a core AKF sector. Far fewer Indian applicants than the government schemes.",
    reqs: ["From a country where AKF operates — India qualifies", "Under 30 preferred", "Must show financial need and have tried other sources first"],
    steps: [
      "Applications are made to the AKF office in India, not centrally.",
      "You must show you have applied elsewhere too. This is a gap-filler by design.",
      "Community service history is weighted heavily. Document your outreach work properly."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },

  /* ─────────────────── OTHER NATIONAL GOVERNMENTS ─────────────────── */
  {
    id: "eiffel",
    name: "Eiffel Excellence Scholarship",
    org: "French Ministry for Europe and Foreign Affairs",
    type: "scholarship", country: "France", city: "Various",
    fields: ["pubhealth", "biochem", "neuro", "global", "compbio"],
    stages: ["grad", "pg"], funding: "full",
    money: "€1,181/month + return airfare + health cover + cultural allowance",
    duration: "12–36 months",
    window: "Institutions nominate; internal deadlines run Oct–Jan",
    deadlineMonths: [10, 11, 12, 1],
    url: "https://www.campusfrance.org/en/france-excellence-eiffel-scholarship-program",
    why: "You cannot apply directly — the French university nominates you. That sounds like a barrier and is actually an advantage: it means the number of competitors is capped by how many each institution puts forward, and simply asking the admissions office whether they will nominate you puts you ahead of everyone who did not ask.",
    reqs: ["Non-French citizen, under 25 for masters level", "Applying to a French institution", "Must be nominated by the institution — apply to them first"],
    steps: [
      "Apply to the French masters programme by October at the latest, and email the international office asking to be considered for Eiffel nomination. Say the word 'Eiffel'.",
      "The institution's internal deadline is what matters to you; the ministry's deadline is theirs.",
      "France has excellent, cheap, English-taught public health and biology masters — Sorbonne, Paris-Saclay, Institut Pasteur's programmes.",
      "Tuition at French public universities is a few hundred euros a year even before any scholarship."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "charpak",
    name: "France Excellence Charpak Scholarship — Master, Exchange and Lab tracks",
    org: "French Embassy in India / Campus France",
    type: "scholarship", country: "France", city: "Various",
    fields: ["biochem", "neuro", "genomics", "pubhealth", "compbio"],
    stages: ["pre", "clin", "intern", "grad"], funding: "partial",
    money: "≈ €860/month, visa fee waived, housing help, free health cover",
    duration: "Lab: 2–4 months · Exchange: 1 semester · Master: 1–2 years",
    window: "Lab and Summer tracks open Nov–Jan · Exchange autumn track opens ~Mar",
    deadlineMonths: [11, 12, 1, 2, 3],
    url: "https://www.inde.campusfrance.org/france-excellence-charpak-scholarship-program",
    why: "Charpak Lab is the rare funded research internship that a CURRENT medical student can take. You do not need to have graduated. A two to four month stint in a French laboratory, paid, while still in MBBS, is one of the most efficient credential-builders available to an Indian medico.",
    reqs: [
      "Indian citizen enrolled in an Indian institution (Lab and Exchange tracks) — current MBBS students qualify",
      "Lab track requires an invitation letter from a French laboratory",
      "No French language requirement for lab work in most research groups"
    ],
    steps: [
      "For Charpak Lab, the invitation letter is the whole game. Email French PIs from October, with a specific question about their work.",
      "Campus France India runs webinars each cycle — attend one, they tell you exactly what the reviewers want.",
      "Apply through the Institut Français en Inde scholarship portal, not the general Campus France site.",
      "The Master track is for full degrees and has a separate, later cycle."
    ],
    indiaSpecific: true, competitiveness: "medium", workExp: 0
  },
  {
    id: "swiss-excellence",
    name: "Swiss Government Excellence Scholarship",
    org: "Swiss Confederation",
    type: "scholarship", country: "Switzerland", city: "Various",
    fields: ["neuro", "biochem", "genomics", "compbio", "pubhealth"],
    stages: ["grad", "pg"], funding: "full",
    money: "CHF 1,920/month for research fellows, plus housing allowance, insurance and fee waiver",
    duration: "12 months research · full PhD in some cases",
    window: "Opens ~20 Aug · country deadlines run Sept–Dec, and India's recent cycle closed 10 November",
    deadlineMonths: [8, 9, 10, 11, 12],
    url: "https://www.sbfi.admin.ch/en/swiss-government-excellence-scholarships",
    why: "Switzerland pays doctoral researchers more than anywhere else on earth, and this scheme has a dedicated India quota that is chronically under-subscribed compared to its value. The research-fellowship track accepts medical graduates directly.",
    reqs: ["Indian citizen with a masters or MBBS/MD", "A Swiss supervisor who has agreed in writing to host you", "Under 35 for most tracks"],
    steps: [
      "Secure the Swiss supervisor's letter of support first — nothing proceeds without it. Start emailing in June.",
      "Applications go through the Swiss Embassy in New Delhi, and the deadline is country-specific rather than global — India's recent cycle opened in early August and closed on 10 November. Do not trust a date quoted for another country, and do not trust a September date you saw repeated on aggregator sites; check the India page each year.",
      "The research-fellowship route is open to medical graduates; the PhD route usually expects a masters."
    ],
    indiaSpecific: true, competitiveness: "medium", workExp: 0
  },
  {
    id: "australia-awards",
    name: "Australia Awards Scholarships",
    org: "Australian Government, DFAT",
    type: "scholarship", country: "Australia", city: "Various",
    fields: ["pubhealth", "global", "systems", "env"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full tuition + return air travel + establishment allowance + living stipend + health cover",
    duration: "Full masters or PhD",
    window: "Opens Feb · closes ~end April",
    deadlineMonths: [2, 3, 4],
    url: "https://www.dfat.gov.au/people-to-people/australia-awards",
    why: "Fully funded, and Australia's post-study work rights are the most generous of the major destinations. Health and public policy are priority sectors for the India programme.",
    reqs: ["Indian citizen, resident in India", "Minimum 2 years relevant work experience for most cycles", "Must return to India for 2 years after the award"],
    steps: [
      "Check whether India is in the current eligible-country list for the round; DFAT rotates priority countries.",
      "Applications go through OASIS, the DFAT online system.",
      "Also look at each university's own international scholarships — Melbourne, Monash and UQ fund heavily and independently."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 2
  },
  {
    id: "mext",
    name: "MEXT Japanese Government Scholarship",
    org: "Ministry of Education, Japan / Embassy of Japan in India",
    type: "scholarship", country: "Japan", city: "Various",
    fields: ["neuro", "genomics", "biochem", "onco", "compbio"],
    stages: ["grad", "pg"], funding: "full",
    money: "No tuition + ¥144,000–148,000/month + return airfare + 6-month Japanese course",
    duration: "2-year masters or 3–4 year PhD, plus language prep",
    window: "Embassy recommendation opens Apr–May",
    deadlineMonths: [4, 5, 6],
    url: "https://www.studyinjapan.go.jp/en/planning/scholarship/",
    why: "Total coverage, a language year included, and dramatically less competition than Anglophone destinations. Japanese neuroscience, genomics and cancer biology are world-leading, and Japan is actively trying to attract foreign researchers.",
    reqs: ["Under 35", "Bachelor's or MBBS", "No Japanese needed at application", "Written exam plus interview in India"],
    steps: [
      "Use the Embassy Recommendation route via the Embassy of Japan in New Delhi — better odds than applying through a university.",
      "The written exam covers English and your subject; past papers are published online.",
      "Contact a prospective supervisor before the interview and mention them. It materially strengthens the case.",
      "Applications open around April for enrolment 16 months later."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "stipendium-hungaricum",
    name: "Stipendium Hungaricum",
    org: "Government of Hungary / Tempus Public Foundation",
    type: "scholarship", country: "Hungary", city: "Various",
    fields: ["clinical", "biochem", "pubhealth", "neuro"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full tuition + dormitory or housing allowance + monthly stipend + health insurance",
    duration: "Full degree",
    window: "Opens Nov · closes mid-January",
    deadlineMonths: [11, 12, 1],
    url: "https://stipendiumhungaricum.hu/",
    why: "India holds one of the largest country quotas — roughly 200 fully-funded places a year — and applications route through India's own education ministry. Hungarian medical universities teach in English and are recognised internationally. For the money involved, this is the least-known major scholarship on this list.",
    reqs: ["Indian citizen", "Minimum 60 % in the qualifying examination", "Applications routed through the Indian nominating authority", "Nearly 900 English-taught programmes to choose from"],
    steps: [
      "Apply on the Stipendium Hungaricum portal AND submit to the Indian nominating body — both are required.",
      "Choose two programmes, ranked. Pick institutions, not just cities.",
      "The mid-January deadline is firm and the portal gets slow in the final week."
    ],
    indiaSpecific: true, competitiveness: "medium", workExp: 0
  },
  {
    id: "open-doors-russia",
    name: "Open Doors Russian Scholarship Project",
    org: "Global Universities Association, Russia",
    type: "scholarship", country: "Russia", city: "Various",
    fields: ["clinical", "biochem", "neuro", "pubhealth", "compbio"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full tuition waiver at leading Russian universities; stipend at many",
    duration: "Full masters or PhD",
    window: "Registration Nov–Dec · olympiad rounds Dec–Feb",
    deadlineMonths: [11, 12, 1, 2],
    url: "https://od.globaluni.ru/",
    why: "Won by examination rather than by essays and references, which suits people whose paper credentials do not yet match their ability. Free to enter, and the medical and biological sciences tracks include public health.",
    reqs: ["International applicant", "Compete in an online olympiad in your subject track", "No application fee"],
    steps: [
      "Register on od.globaluni.ru during the November–December window.",
      "Sit the online qualifying round, then the final round.",
      "Winners choose from a list of participating Russian universities.",
      "Verify degree recognition in India via the NMC before committing to a clinical programme."
    ],
    indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },
  {
    id: "csc-gks-taiwan",
    name: "China CSC · Korea GKS · Taiwan MOE Scholarships",
    org: "Governments of China, South Korea and Taiwan",
    type: "scholarship", country: "Asia", city: "Various",
    fields: ["biochem", "genomics", "neuro", "pubhealth", "onco"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full tuition + monthly stipend + accommodation + insurance across all three",
    duration: "2-year masters or 3–4 year PhD",
    window: "CSC Dec–Apr · GKS Feb–Mar (embassy track) · Taiwan MOE Feb–Mar",
    deadlineMonths: [12, 1, 2, 3, 4],
    url: "https://www.campuschina.org/",
    why: "East Asian governments are spending heavily to attract international researchers and the competition from India is far lighter than for Western destinations. Korean and Taiwanese biomedical research is excellent, English-taught at postgraduate level, and the stipends comfortably cover living costs.",
    reqs: ["Under 35 for masters, under 40 for PhD in most schemes", "Bachelor's or MBBS", "Language study is funded where required"],
    steps: [
      "For GKS Korea, the embassy track in New Delhi generally has better odds than the university track.",
      "For China CSC, secure a pre-admission letter from the host university first — it transforms the application.",
      "Taiwan MOE applications go through the Taipei Economic and Cultural Center in Delhi or Chennai.",
      "Confirm how the qualification will be recognised in India before committing, particularly for clinical degrees."
    ],
    indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },
  {
    id: "nordic-govt",
    name: "Nordic and Baltic government scholarships",
    org: "Sweden (SI), Norway, Finland, Estonia, Lithuania, Latvia",
    type: "scholarship", country: "Nordics", city: "Various",
    fields: ["pubhealth", "global", "neuro", "env", "compbio"],
    stages: ["grad", "pg"], funding: "full",
    money: "Swedish Institute: full tuition + SEK 12,000/month + travel + insurance",
    duration: "1–2 year masters",
    window: "SI opens Feb · closes late Feb — a very narrow window",
    deadlineMonths: [1, 2, 3],
    url: "https://si.se/en/apply/scholarships/",
    why: "The Swedish Institute Scholarship for Global Professionals is fully funded and explicitly targets people who will work on societal change in their home country. The Baltic states — Lithuania, Estonia, Latvia — run cheaper, less-known state scholarships with almost no Indian competition.",
    reqs: ["SI requires 3,000 hours of work or volunteering experience", "Admission to an eligible Swedish masters first", "Baltic schemes vary — check each national agency"],
    steps: [
      "For Sweden, you must first apply through universityadmissions.se by 15 January, THEN apply to SI in the February window. Two steps, two deadlines.",
      "The SI application is heavily weighted toward leadership and demonstrated commitment to change — a medic running community health drives fits perfectly.",
      "For the Baltics, check studyinlithuania.lt, studyinestonia.ee and studyinlatvia.lv directly. State scholarships there are small in number but almost unknown to Indian applicants."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 2
  },
  {
    id: "holland-orange",
    name: "NL Scholarship (formerly the Holland Scholarship)",
    org: "Dutch Government / Nuffic",
    type: "scholarship", country: "Netherlands", city: "Various",
    fields: ["pubhealth", "global", "compbio", "systems"],
    stages: ["grad", "pg"], funding: "partial",
    money: "€5,000 in the first year only · not renewable, and not a full ride",
    duration: "1–2 years",
    window: "Deadline 1 Feb or 1 May depending on the institution",
    deadlineMonths: [1, 2, 3, 4, 5],
    url: "https://www.studyinnl.org/finances/nl-scholarship",
    why: "Dutch universities teach almost everything in English at masters level and Rotterdam, Amsterdam and Maastricht are serious names in epidemiology and health policy. The award itself is small and deliberately easy to apply for — treat it as a discount on a plan you can already almost afford, never as the thing that makes the Netherlands possible.",
    reqs: ["Non-EEA national", "Applying to a participating Dutch institution", "First time studying in the Netherlands"],
    steps: [
      "Apply to the university first, then to the NL Scholarship through that university by 1 February.",
      "Search for the award under its current name. It was renamed from the Holland Scholarship, and most of the blog posts and listicles still carry the old name and the old link.",
      "The Orange Knowledge Programme, which older guides pair with this one, closed to new applications — do not build a plan around finding it.",
      "Dutch tuition for non-EU students is €15,000–20,000, so a €5,000 award is a real dent but not a solution on its own."
    ],
    indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },
  {
    id: "india-alliance",
    name: "DBT/Wellcome Trust India Alliance Fellowships",
    org: "India Alliance",
    type: "fellowship", country: "India", city: "Various",
    fields: ["neuro", "psych", "genomics", "biochem", "compbio", "infect"],
    stages: ["pg"], funding: "full",
    money: "Early Career Fellowship: full salary + research consumables + travel, for 5 years",
    duration: "5 years",
    window: "Two calls a year, typically Jan and Jul",
    deadlineMonths: [1, 2, 7, 8],
    url: "https://www.indiaalliance.org/apply",
    why: "The single most important structural fact for an Indian clinician-researcher: India Alliance runs a Clinical and Public Health Research fellowship stream where a medical degree plus a research record can substitute for a PhD. You can lead your own funded research programme in India without ever doing a doctorate. Almost nobody uses this.",
    reqs: [
      "MBBS/MD/MS/DNB with a demonstrated research record — a PhD is NOT required for the clinical stream",
      "A host institution in India that will support you",
      "A mentor and a clear five-year research plan"
    ],
    steps: [
      "Read the Clinical and Public Health Research Fellowship criteria specifically. It is a different track from the basic-science one.",
      "You need a host institution and a sponsor before you apply. Build that relationship during residency, not after.",
      "Two calls a year means a missed deadline costs six months, not a year.",
      "This is the endgame for anyone who wants to stay in India and still run real research. Work backwards from it."
    ],
    indiaSpecific: true, competitiveness: "high", workExp: 3
  },
  {
    id: "wellcome-emcr",
    name: "Wellcome Early-Career and Career Development Awards",
    org: "Wellcome Trust, UK",
    type: "fellowship", country: "UK", city: "Various / home country",
    fields: ["global", "infect", "pubhealth", "neuro", "genomics"],
    stages: ["pg"], funding: "full",
    money: "Salary + research costs, held at an eligible host organisation",
    duration: "5 years (Early-Career), 8 years (Career Development)",
    window: "Distinct calls with fixed closing dates; check the scheme page each quarter",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://wellcome.org/research-funding",
    why: "Wellcome funds researchers to build a group where they already are, rather than requiring permanent relocation. For a doctor who wants a research career without emigrating, this is the model, but read the next line before you spend a month on it.",
    reqs: [
      "Health-related research with a specific, answerable question",
      "An eligible host organisation and a sponsor",
      "A doctorate OR equivalent clinical research experience"
    ],
    steps: [
      "If you are based in India, start at India Alliance, not here. Wellcome's own guidance routes India-based applicants there, and the International Training Fellowship that older guides point you to is closed — the page for it now exists only to say so.",
      "Wellcome's India route is the DBT/Wellcome India Alliance, which is separately listed on this site and whose clinical stream does not require a PhD. That is the entry worth your month.",
      "Come back to Wellcome direct once you hold a position at an eligible host organisation outside India, or a joint appointment that gives you one.",
      "Wellcome cares intensely about the research question. Vague proposals about 'AI in healthcare' do not survive triage; a specific, answerable question does."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 3
  }
];
