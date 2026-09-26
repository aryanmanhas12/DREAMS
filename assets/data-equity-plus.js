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
    id: "women-in-science",
    name: "L'Oréal India For Young Women in Science & AAUW International Fellowships",
    org: "L'Oréal India (with Buddy4Study) · American Association of University Women",
    type: "fellowship", country: "Any", city: "India, or a US university",
    fields: ["biochem", "genomics", "neuro", "pubhealth", "compbio", "onco"],
    stages: ["pre", "clin", "grad", "pg"], funding: "partial",
    money: "L'Oréal India: ₹62,500 for undergraduates, up to ₹1,00,000 for PG and PhD students · AAUW International: USD 20,000 for a master's, 25,000 doctoral, 50,000 postdoctoral",
    duration: "1 year",
    window: "L'Oréal India: an annual round run through Buddy4Study; the 2025-26 round is the latest posted. AAUW: the 2027-28 round ran 17 August to 17 September 2026 and has closed",
    deadlineMonths: [],
    noOpenCall: true,
    url: "https://www.foryoungwomeninscience.co.in/",
    why: "Two funding pools that exist because women leave science at every career stage, and that people searching 'scholarships for Indians' tend to miss. L'Oréal India names medicine among its eligible fields and takes MBBS students in any year but the last, which makes it one of the few awards here open to a first-year. AAUW funds women who are not US citizens to study full-time in the United States.",
    reqs: [
      "Women only, for both",
      "L'Oréal India (UG): at least 85% in Class 12 science, family income under ₹6 lakh a year, studying a science degree in India in any year except the final one",
      "AAUW: not a US citizen or permanent resident; a bachelor's-equivalent degree with a GPA of at least 3.5 on the highest degree; full-time study at an accredited US institution"
    ],
    steps: [
      "If you are an MBBS student with the marks and the income profile, apply to L'Oréal India first. It is the one that fits you now.",
      "Watch Buddy4Study and the L'Oréal India site for the next round; the criteria are revised each cycle, so read the current year's page before applying.",
      "AAUW is a postgraduate route. The next round will be for 2028-29; line up a US admission and your GPA evidence before it opens."
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
      "Demonstrable coding ability. A public repository counts for more than a course certificate",
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
  "women-in-science":     { t: 2, odds: "Criteria-gated rather than a lottery", effort: "10–20 hrs", note: "L'Oréal India takes MBBS students from first year on marks and income; AAUW is the postgraduate route to the US. A second pool most searches miss." },
  "ai-health-programmes": { t: 2, odds: "Competitive, but the clinical half is scarce", effort: "Ongoing. The repository is the application", note: "A doctor who can code is the scarce half of the pair here, not the redundant one." },
  "summer-schools-global":{ t: 3, odds: "Accessible; scholarships more competitive", effort: "10 hrs", note: "The cheapest way to test a field before committing years. The scholarship deadline is weeks before the course deadline. That is how people lose it." },
  "disability-support":   { t: 3, odds: "Chronically under-spent", effort: "One email per institution", note: "Access and hardship funds are separately budgeted and separately under-claimed. Institutions assume you will ask." }
});
