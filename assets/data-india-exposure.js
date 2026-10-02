/* Dreams Counselor — exposure inside India.

   The research ladder in data-india-events.js covers labs and conferences.
   This file covers the other half of seeing India as a doctor: a year in a
   hospital where the nearest specialist is a day away, a week at Shodhgram
   learning how a community health programme is built, a year inside
   Parliament watching health policy get made, and the research methods
   course the National Medical Commission now requires of every postgraduate.

   Every entry was read on its own official page on 30 September and
   1 October 2026, and its eligibility rule is quoted from that page, because
   a route a medical student cannot enter is worse than one never listed.

   Facts here; grades at the bottom, as everywhere else. */

window.DB = window.DB || {};
window.DB.research = window.DB.research || [];
window.DB.funding = window.DB.funding || [];

window.DB.funding.push(
  {
    id: "azim-premji-hef",
    name: "Azim Premji Health Equity Fellowship: a paid year in a rural hospital",
    org: "Azim Premji Foundation, with 19 not-for-profit hospitals (MBBS track) and 15 (postgraduate track)",
    type: "fellowship", country: "India", city: "Rural and tribal hospitals across India",
    fields: ["clinical", "pubhealth", "systems", "repro"],
    stages: ["grad", "pg"], funding: "stipend",
    money: "MBBS track: ₹40,000 a month plus ₹1.2 lakh on finishing the full 12 months. Postgraduate track: ₹60,000 a month plus ₹2.4 lakh on completion, with insurance and provident fund. Relocation and travel between sites are paid on both. The foundation calls it an honorarium that covers expenses, not a salary",
    duration: "MBBS track: 12 months, mostly at one anchor hospital with a short visit to a second. Postgraduate track: January to December 2027 for the current batch",
    window: "Both 2026 calls are closed: the MBBS call on 15 March 2026 (selection February to March, results 10 April, start late May) and the postgraduate call for 2027 on 30 September 2026. The foundation keeps a register-your-interest form for the next round",
    deadlineMonths: [2, 3, 9],
    noOpenCall: true,
    url: "https://azimpremjifoundation.org/what-we-do/health/azim-premji-health-equity-fellowship-for-mbbs-doctors/",
    checked: "2026-10",
    why: "A year of medicine where it is hardest to practise, paid, mentored and with a CMC Vellore qualification attached. The MBBS track posts you to one of 19 hospitals the foundation trusts, among them Jan Swasthya Sahyog in Chhattisgarh, SEARCH in Gadchiroli, SEWA Rural in Gujarat and ASHWINI's Gudalur Adivasi Hospital in the Nilgiris, with a named mentor and a learning plan. Fellows also take CMC Vellore's certificate course in Foundations in Family Medicine and can go on to its Postgraduate Diploma in Family Medicine. For a doctor deciding what to do between NEET-PG attempts, it is a paid year of supervised work instead of a year of waiting.",
    reqs: [
      "MBBS track: an MBBS graduate who has finished internship and any service bond, ideally with state registration, from the batches that graduated between 2020 and 2025",
      "Postgraduate track: MD, MS or DNB in anaesthesia, community medicine, family medicine, general medicine, general surgery, obstetrics and gynaecology, or paediatrics",
      "Hindi and English, plus the regional language of the site you are posted to"
    ],
    steps: [
      "Fill in the foundation's register-your-interest form now, so the next call reaches you instead of the other way round.",
      "Read the partner hospitals' own pages and pick two whose work you actually want to learn. Interviews go better when you can say why Gudalur and not Gadchiroli.",
      "If you are still in MBBS, spend a vacation week at one of these hospitals first. SEWA Rural, for one, asks Indian volunteers simply to email it.",
      "Plan around service bonds: the MBBS track wants yours finished before you join."
    ],
    zeroCost: true, indiaSpecific: true, competitiveness: "medium", workExp: 0
  },
  {
    id: "prs-lamp",
    name: "LAMP Fellowship: a year as research aide to a Member of Parliament",
    org: "PRS Legislative Research, New Delhi",
    type: "fellowship", country: "India", city: "New Delhi",
    fields: ["global", "systems", "pubhealth"],
    stages: ["intern", "grad"], funding: "stipend",
    money: "₹23,000 a month for the length of the fellowship",
    duration: "About ten months: a month of training from mid-June, then work with your MP from the Monsoon session to the end of the following Budget session",
    window: "Applications open in December, with an online test in January and interviews after it; results by the end of March. The 2026-27 round is closed",
    deadlineMonths: [12, 1],
    url: "https://prsindia.org/lamp",
    checked: "2026-10",
    why: "A year on the other side of health policy: the questions, debates and bills that decide what a district hospital gets. LAMP Fellows work full time for one MP, researching parliamentary questions, debates and private members' bills, and spend the gaps between sessions in workshops with policy experts and on field visits. For a doctor heading towards public health or health policy, it is first-hand evidence of how decisions are made.",
    reqs: [
      "25 years of age or below",
      "At least a bachelor's degree in any discipline, so a finished MBBS counts",
      "Indian citizens only",
      "Two essays with the application: a statement of purpose and an analysis of one policy issue"
    ],
    steps: [
      "Check your age against the limit of 25 first. A doctor who started MBBS at 18 finishes internship at about 23 or 24, so the window is short.",
      "Draft the policy essay on a health issue you know from the wards, such as drug pricing or the shortage of specialists in district hospitals.",
      "Apply when the form opens in December, and prepare for the January online test by reading PRS's own bill summaries.",
      "Treat it as a deliberate year out before PG: the fellowship is full time and you cannot hold other academic or professional work alongside it."
    ],
    zeroCost: false, indiaSpecific: true, competitiveness: "high", workExp: 0
  }
);

window.DB.research.push(
  {
    id: "nirman-search",
    name: "NIRMAN at SEARCH, Gadchiroli: workshops on finding your work in rural India",
    org: "SEARCH (Drs Abhay and Rani Bang) with MKCL, Shodhgram, Gadchiroli",
    type: "research", country: "India", city: "Shodhgram, Gadchiroli, Maharashtra",
    fields: ["pubhealth", "systems", "global", "repro"],
    stages: ["pre", "clin", "intern", "grad"], funding: "partial",
    money: "Around ₹2,100 a workshop including stay and food, paid after selection. Selected students who cannot afford it can ask for the fee to be waived. Travel to Gadchiroli is on you",
    duration: "Residential workshops of about a week, roughly every six months, scheduled in college holidays; the whole process runs about two years",
    window: "Applications are accepted on a rolling basis. The 17th batch can still join at one of its remaining workshops: 12 to 18 December 2026, 15 to 20 January 2027, or 13 to 18 March 2027",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://nirman.mkcl.org/selection/selection-process",
    checked: "2026-10",
    why: "Run by Drs Abhay and Rani Bang, whose home-based newborn care model from Gadchiroli was taken up by India's national health mission, at the campus where they built it. NIRMAN takes about 500 young people a year through residential workshops on choosing a life's work in the social sector, and about two thirds of its alumni are doctors or engineers. It has a formal partnership with the Maharashtra University of Health Sciences for medical students. A week at Shodhgram shows you a community health programme from the inside, which no textbook chapter on the subject manages.",
    reqs: [
      "Aged 18 to 29, from any educational stream",
      "A written application, filled in online, then selection",
      "Reading set before the first workshop, including Sewagram to Shodhgram and Research, for Whom?"
    ],
    steps: [
      "Fill in the online application now; it is reviewed on a rolling basis.",
      "Pick the workshop that falls in your college holidays and get leave in writing before booking travel.",
      "Do the mandatory reading before the first workshop; the list is on the application page.",
      "Between workshops, NIRMAN expects two to three hours a week with a local group. Find the one nearest your college."
    ],
    zeroCost: false, indiaSpecific: true, competitiveness: "medium", workExp: 0
  },
  {
    id: "icmr-nie-research-methods",
    name: "ICMR-NIE research methods courses: Health Research Fundamentals, and the BCBR for postgraduates",
    org: "ICMR National Institute of Epidemiology, Chennai, on NPTEL/SWAYAM",
    type: "skill", country: "Online", city: "Self-paced",
    fields: ["pubhealth", "clinical", "compbio"],
    stages: ["pre", "clin", "intern", "grad", "pg"], funding: "free",
    money: "Free to learn. The Basic Course in Biomedical Research charges ₹1,000 for its proctored certificate exam, halved for SC and ST candidates and people with a disability above 40%",
    duration: "Self-paced video lectures; the BCBR has 23 lectures, each with an assignment",
    window: "Enrol at any time. BCBR exams run several times a year and need 50% or more in every lecture assignment first",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://nie.icmr.org.in/pages/basic-course-in-biomedical-research",
    checked: "2026-10",
    why: "Free research methods teaching from ICMR's own epidemiology institute. The Basic Course in Biomedical Research is the one the National Medical Commission requires of every postgraduate admitted since 2019 and of medical teachers. ICMR-NIE's own FAQ says MBBS students cannot enrol in it and directs them to its sister course, Health Research Fundamentals, which is open to undergraduates. Doing that one during MBBS means your first project and your ICMR-STS proposal start from a sound design.",
    reqs: [
      "MBBS students and anyone else interested in health research: Health Research Fundamentals",
      "BCBR: medical postgraduates (MD, MS, MCh, DM) admitted from 2019-20 onwards, and teachers in medical institutions"
    ],
    steps: [
      "If you are in MBBS, enrol in Health Research Fundamentals on NPTEL/SWAYAM and finish one module a week.",
      "Use what it teaches on sample size and study design before you write an ICMR-STS proposal, not after.",
      "Once you are a postgraduate, take the BCBR early. The NMC requires it, and its notifications on the ICMR-NIE page say when it must be complete."
    ],
    zeroCost: true, indiaSpecific: true, competitiveness: "accessible", workExp: 0
  },
  {
    id: "rural-hospital-electives",
    name: "A vacation in a rural or tribal hospital: how to arrange it yourself",
    org: "SEWA Rural and the not-for-profit hospitals of the Azim Premji partner network",
    type: "skill", country: "India", city: "Jhagadia (Gujarat), Ganiyari (Chhattisgarh), Gudalur (Tamil Nadu) and others",
    fields: ["clinical", "pubhealth", "repro", "infect"],
    stages: ["pre", "clin", "intern"], funding: "partial",
    money: "No fee is published. Expect to pay your own travel, and ask the hospital about food and a room when you write",
    duration: "One to four weeks, in college holidays",
    window: "No application round: write to the hospital two or three months before your holidays",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://sewarural.org/volunteering-opportunities/",
    checked: "2026-10",
    why: "A week in one of these hospitals shows what a district needs from a doctor. Hospitals like SEWA Rural's 275-bed Kasturba Hospital, which sees patients from more than 3,000 villages, Jan Swasthya Sahyog's 150-bed hospital in Chhattisgarh and the Gudalur Adivasi Hospital in the Nilgiris run community health programmes alongside their wards, and they are the institutions the Azim Premji Foundation chose to train its fellows. SEWA Rural's volunteering page says plainly that people in India should email it. A week there gives you a real story for every essay in this index and a reference from someone who has seen you work.",
    reqs: [
      "A letter from your Dean or Head of Department, and your college's permission in writing",
      "A clear ask: which department, which dates, and what you hope to learn",
      "Your own travel, and basic language skills for the region"
    ],
    steps: [
      "Pick two hospitals from the Azim Premji Health Equity Fellowship partner list whose work you have read about.",
      "Email each one with your year, dates and one specific interest, such as their sickle cell or maternal health programme.",
      "Ask whether students stay on campus and what food costs before you book anything.",
      "Afterwards, write a page on what you saw. It becomes your NIRMAN application, your SOP paragraph and your next interview answer."
    ],
    zeroCost: false, indiaSpecific: true, competitiveness: "accessible", workExp: 0
  }
);

Object.assign(window.DB.impact, {
  "azim-premji-hef": { t: 2, odds: "Not published", effort: "Application, selection interviews, then a full year", note: "A paid, mentored year with a CMC Vellore family medicine certificate. Unusual among Indian routes in paying a fresh MBBS graduate to learn." },
  "prs-lamp": { t: 2, odds: "Not published; essays, a test and interviews", effort: "Two essays in December, a January test, interviews", note: "Rare for a doctor and remembered for it. Strong for public health, health policy and any later MPH application." },
  "nirman-search": { t: 3, odds: "About 500 selected a year", effort: "A written application, then a week per workshop", note: "Shows you how a community health programme is built, by the people who built one that became national policy." },
  "icmr-nie-research-methods": { t: 3, odds: "Open to all eligible learners", effort: "One module a week; a proctored exam for the BCBR", note: "Free method training that makes every research proposal after it better, and the BCBR is compulsory for postgraduates anyway." },
  "rural-hospital-electives": { t: 4, odds: "Depends on the hospital's capacity", effort: "Two emails and a week of holidays", note: "Cheap, and worth it for what you see. Never a credential on its own, but the source of your best essay." }
});
