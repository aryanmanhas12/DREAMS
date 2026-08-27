/* Dream Counsellor — funding routes tied to who you are rather than only what
   you study, plus the emerging-field programmes that did not exist five years
   ago. Both categories are systematically under-applied by Indian medical
   students: the first because nobody tells you the schemes exist, the second
   because the fields are too new to have reached a curriculum. */

window.DB = window.DB || {};
window.DB.funding = window.DB.funding || [];
window.DB.research = window.DB.research || [];

window.DB.funding.push(
  {
    id: "faculty-future",
    name: "Faculty for the Future Fellowship",
    org: "Schlumberger Foundation",
    type: "fellowship", country: "Any", city: "Any host institution abroad",
    fields: ["genomics", "biochem", "compbio", "neuro", "pubhealth", "env"],
    stages: ["grad", "pg"], funding: "full",
    money: "Up to USD 50,000 a year for a PhD, renewable to completion; postdoctoral awards up to USD 40,000",
    duration: "Full doctorate or postdoc",
    window: "Opens ~September · closes ~November",
    deadlineMonths: [9, 10, 11],
    url: "https://www.facultyforthefuture.net/",
    why: "For women from developing countries in STEM, and India qualifies. Fifty thousand US dollars a year, renewable until you finish, for a doctorate anywhere in the world. It is one of the largest awards an Indian woman in science can hold and the applicant pool is a fraction of what the sum warrants — largely because it is filed under 'engineering' in most people's minds and never reaches medical students at all.",
    reqs: [
      "Female, and a citizen of a developing or emerging economy — India qualifies",
      "Dual citizenship with a developed country makes you ineligible",
      "PhD or postdoctoral level only — masters programmes are not funded",
      "Applied to, admitted by, or enrolled at a host institution abroad",
      "A record of community outreach and of encouraging girls into science is assessed, not decorative",
      "Commitment to return to your home country afterwards"
    ],
    steps: [
      "Confirm the current URL and cycle at the Schlumberger Foundation site — the programme has been renamed alongside the company and links move.",
      "The outreach requirement is real and weighted. If you have taught, mentored or run anything for girls in science, document it with numbers before you apply.",
      "You do not need a confirmed place to start the application, only to have applied, so this runs in parallel with your doctoral applications, not after them.",
      "Applications open around September and close in November for the following academic year."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "women-in-science",
    name: "L'Oréal-UNESCO For Women in Science & AAUW International Fellowships",
    org: "L'Oréal Foundation with UNESCO · American Association of University Women",
    type: "fellowship", country: "Any", city: "Various",
    fields: ["biochem", "genomics", "neuro", "pubhealth", "compbio", "onco"],
    stages: ["grad", "pg"], funding: "partial",
    money: "L'Oréal India For Young Women in Science: ₹2.5 lakh · International Rising Talents: €15,000 · AAUW International: USD 20,000–50,000",
    duration: "1 year, often renewable",
    window: "L'Oréal India around Oct–Dec · AAUW closes mid-November",
    deadlineMonths: [8, 9, 10, 11, 12],
    url: "https://www.forwomeninscience.com/",
    why: "A whole tier of funding exists specifically because women leave science at every career stage, and it is chronically under-applied in India relative to the number of eligible candidates. AAUW funds women who are not US citizens to study in the United States, which most Indian applicants never discover because they search for 'scholarships for Indians' rather than 'fellowships for women'.",
    reqs: [
      "Female applicants",
      "AAUW: non-US citizen, studying or researching in the US, closes mid-November",
      "L'Oréal India runs a separate national programme with its own criteria",
      "Research record and outreach both assessed"
    ],
    steps: [
      "Search by both axes. Almost everyone searches nationality and stops; the gendered schemes are a second, largely separate pool.",
      "AAUW's International Fellowship is the largest of these and specifically funds women who are not US citizens.",
      "Regional and national For Women in Science awards often have far smaller fields than the global one — check the India programme first."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "disability-support",
    name: "Disability, first-generation and single-parent support schemes",
    org: "National Scholarship Portal · university access funds · Snowdon Trust (UK)",
    type: "scholarship", country: "Any", city: "Various",
    fields: ["pubhealth", "clinical", "psych", "global"],
    stages: ["pre", "clin", "intern", "grad", "pg"], funding: "partial",
    money: "Varies — from equipment and access grants to full fee waivers",
    duration: "Varies",
    window: "Mostly aligned to the main admissions cycle",
    deadlineMonths: [1, 2, 3, 4, 5, 6],
    url: "https://scholarships.gov.in/",
    why: "Almost every university abroad holds an access or hardship fund that is separately budgeted from its headline scholarships, and separately under-spent. Disabled students, first-generation university students and students with caring responsibilities are eligible for money that is rarely advertised because the institution assumes you will ask. Ask.",
    reqs: [
      "Documentation of the relevant circumstance",
      "Usually applied for through the institution's student services rather than admissions",
      "India: the National Scholarship Portal carries central disability schemes"
    ],
    steps: [
      "Email the international office and the disability service of every institution you apply to, and ask directly what hardship, access and equipment funding exists. This single email finds money that appears in no prospectus.",
      "In the UK, the Snowdon Trust funds disabled students specifically; most other countries have an equivalent.",
      "Reasonable-adjustment provisions for examinations — including IELTS, USMLE and PLAB — must be requested months ahead, not on the day."
    ],
    indiaSpecific: false, competitiveness: "accessible", workExp: 0
  }
);

window.DB.research.push(
  {
    id: "ai-health-programmes",
    name: "AI and digital health research programmes",
    org: "Wellcome Trust data science · NVIDIA academic · Google Research India · MILA · Vector Institute",
    type: "research", country: "Global", city: "Various and remote",
    fields: ["compbio", "psych", "genomics", "pubhealth", "neuro"],
    stages: ["intern", "grad", "pg"], funding: "partial",
    money: "Salaried research roles, funded internships, and free compute grants for academic projects",
    duration: "3 months – 3 years",
    window: "Rolling; internship calls mostly Sept–Jan for the following summer",
    deadlineMonths: [9, 10, 11, 12, 1, 2],
    url: "https://wellcome.org/research-funding",
    why: "Clinical AI has a shortage the field talks about constantly: people who understand both the model and the patient. A doctor who can code is not competing against computer scientists here. They are the scarce half of the pair. Google Research India works on health specifically, and academic compute grants mean you do not need a laboratory's hardware budget to do serious work.",
    reqs: [
      "Demonstrable coding ability — a public repository counts for more than a course certificate",
      "Clinical training is the differentiator, not a handicap",
      "Most industry research internships want a current enrolment; academic posts do not"
    ],
    steps: [
      "Build the public artefact first. In this field a working repository someone can run is the application.",
      "Apply for academic compute credits rather than assuming hardware is the barrier — several providers grant them to student projects for free.",
      "Look at Google Research India, MILA, the Vector Institute and Wellcome's data-science funding; all take people from clinical backgrounds.",
      "Be specific about the clinical problem. 'AI in healthcare' as a stated interest reads as no interest at all."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "summer-schools-global",
    name: "University summer schools with full scholarships",
    org: "LSE · Oxford · Utrecht · Copenhagen · NUS · Tsinghua",
    type: "research", country: "Global", city: "Various",
    fields: ["pubhealth", "global", "compbio", "psych", "systems"],
    stages: ["clin", "intern", "grad"], funding: "partial",
    money: "Fee waivers and full scholarships exist at most; Utrecht and Copenhagen run some of the cheapest credible courses in Europe",
    duration: "2–4 weeks, June–August",
    window: "Applications open Nov–Feb; scholarship deadlines are earlier than general ones",
    deadlineMonths: [11, 12, 1, 2, 3],
    url: "https://www.utrechtsummerschool.nl/",
    why: "A two-week summer school is the cheapest way to test whether you actually like a field before committing years to it, and to be taught by the people whose papers you have been reading. The scholarship deadline is almost always weeks before the general application deadline, which is exactly why most people pay full price or miss it.",
    reqs: [
      "Current enrolment or a recent degree",
      "Scholarship applications are separate and earlier. This is the single most common way people lose the funding",
      "English proficiency; no test usually required for short courses"
    ],
    steps: [
      "Find the scholarship deadline before the course deadline, and work to the earlier one.",
      "Utrecht and Copenhagen run large catalogues at genuinely low cost, including epidemiology and global health.",
      "A summer school is not a research output. Treat it as a way to meet a supervisor and test a field, and judge it on whether it produces a contact."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "accessible", workExp: 0
  }
);

window.DB.impact = window.DB.impact || {};
Object.assign(window.DB.impact, {
  "faculty-future":       { t: 1, odds: "Under-applied for the sum involved", effort: "30 hrs plus documenting outreach", note: "USD 50,000 a year, renewable to completion, for women from developing countries. Most Indian medical students never encounter it because it is mentally filed under engineering." },
  "women-in-science":     { t: 2, odds: "Smaller fields than the general schemes", effort: "20 hrs", note: "A second, largely separate funding pool. Almost everyone searches by nationality and never searches by gender." },
  "ai-health-programmes": { t: 2, odds: "Competitive, but the clinical half is scarce", effort: "Ongoing — the repository is the application", note: "A doctor who can code is the scarce half of the pair here, not the redundant one." },
  "summer-schools-global":{ t: 3, odds: "Accessible; scholarships more competitive", effort: "10 hrs", note: "The cheapest way to test a field before committing years. The scholarship deadline is weeks before the course deadline. That is how people lose it." },
  "disability-support":   { t: 3, odds: "Chronically under-spent", effort: "One email per institution", note: "Access and hardship funds are separately budgeted and separately under-claimed. Institutions assume you will ask." }
});
