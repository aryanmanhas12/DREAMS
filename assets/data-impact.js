/* Dream Counsellor — impact tiers.
   Kept separate from the programme data on purpose: this is a judgement layer,
   and judgements should be visibly separable from facts.

   The question each tier answers is not "is this prestigious" but
   "does holding this change what I am eligible for next year?"

   odds   — rough share of applicants selected. Order-of-magnitude, not gospel.
   effort — realistic total time cost including the application itself.
*/

window.DB = window.DB || {};

window.DB.tierInfo = {
  1: {
    name: "Career-defining",
    blurb: "Changes what you are eligible for afterwards. Recognised by name anywhere in the world. Single-digit acceptance rates — which is exactly why holding one settles the question of whether you can do the work."
  },
  2: {
    name: "Strong signal",
    blurb: "Genuinely moves an application. A reviewer reads it and updates their estimate of you. Competitive, but attainable with a real record rather than a perfect one."
  },
  3: {
    name: "Solid foundation",
    blurb: "Real substance, moderate signal. These are the workhorses — they build the record that makes tier 1 and 2 applications credible. Most people should be doing several of these before reaching upward."
  },
  4: {
    name: "Worth it if cheap",
    blurb: "Useful, but not on its own. Do it if it costs little time or money, and never build a plan around it. The mistake is treating these as achievements rather than as inputs."
  },
  5: {
    name: "Mostly noise",
    blurb: "Certificate collecting. Feels like progress, produces nothing a reviewer can verify. Named here so you can recognise it and decline."
  }
};

/* id → { t: tier, odds, effort, note } */
window.DB.impact = {
  /* ─────── Tier 1 — career-defining ─────── */
  "gates-cambridge":   { t: 1, odds: "~1 in 60 worldwide", effort: "40–60 hrs over 3 months", note: "One of about 75 awarded globally each year. The name alone opens doors for the rest of your life." },
  "rhodes-india":      { t: 1, odds: "5–6 Indians a year", effort: "60+ hrs, referees lined up months ahead", note: "The most competitive award an Indian student can hold. Applying is worth it even at these odds — the essays force clarity you will reuse everywhere." },
  "fulbright":         { t: 1, odds: "~5 % of Indian applicants", effort: "50 hrs, plus a 16-month lead time", note: "USIEF places you at the university, which removes the hardest part of a US application." },
  "chevening":         { t: 1, odds: "8–10 % of Indian applicants", effort: "30–40 hrs on four essays", note: "The largest fully-funded India-to-UK route. Most rejected applications are visibly rushed — the essays reward preparation more than pedigree." },
  "commonwealth":      { t: 1, odds: "~5 %", effort: "30 hrs", note: "Unusually, financial need counts in your favour rather than against it." },
  "clarendon":         { t: 1, odds: "~1 in 12 of Oxford applicants", effort: "Zero extra — no separate form", note: "The highest value-per-hour award in existence. You are considered automatically; people miss it purely by applying after the early deadline." },
  "felix":             { t: 1, odds: "Restricted to Indians, so a far smaller field", effort: "25 hrs", note: "Reserved for Indian nationals with financial need. Comparable money to Chevening, a fraction of the applicants." },
  "erasmus-mundus":    { t: 1, odds: "5–10 % per consortium", effort: "20 hrs per application, max 3 allowed", note: "The most under-applied major scholarship available to Indians. The €1,400 monthly allowance exceeds what most students need." },
  "us-phd-neuro":      { t: 1, odds: "3–15 % depending on programme", effort: "100+ hrs across 8–12 applications", note: "A funded doctorate is a salaried job, not a fee. This is the single highest-leverage item on the entire site for anyone past MBBS." },
  "germany-phd-mpi":   { t: 1, odds: "~5 % at IMPRS schools", effort: "25 hrs, free to apply", note: "English-taught, fully funded, takes medical graduates directly, and no masters is required at several schools." },
  "swiss-neuro":       { t: 1, odds: "~8 %", effort: "20 hrs, centralised application", note: "The highest doctoral salary in the world. You can genuinely save money while doing a PhD." },
  "khorana":           { t: 1, odds: "~5 % of applicants", effort: "20 hrs, free to apply", note: "Fully funded US summer research that a currently-enrolled MBBS student can hold, with the marks bar lowered specifically for medics. Nothing else on this list does all three." },
  "cshl-urp":          { t: 1, odds: "~20 places worldwide", effort: "15 hrs, free to apply", note: "Brutally competitive and free to enter, which makes the expected value of applying very high even when you do not get it." },
  "weizmann-kupcinet": { t: 1, odds: "Small international cohort", effort: "15 hrs, free to apply", note: "Flights, accommodation, meals and a stipend, at one of the great research institutes. Almost no Indian medical students apply." },
  "amgen-scholars":    { t: 1, odds: "~5–10 %", effort: "20 hrs per hub, multiple hubs allowed", note: "Apply to the Europe, Japan and Australia hubs — the US hubs require enrolment at a US institution and will reject you on that alone." },
  "lindau":            { t: 1, odds: "600 places worldwide, nomination-gated", effort: "15 hrs plus securing a nomination", note: "A week with thirty Nobel laureates, fully funded including international travel. The highest-prestige item here that costs a student nothing." },
  "mitacs":            { t: 1, odds: "~10 % of Indian applicants", effort: "10 hrs — you rank projects, no supervisor hunt", note: "Flights, visa, housing, insurance and a stipend all covered, and no need to find your own supervisor. The most accessible fully-funded international research internship open to an Indian undergraduate." },
  "harvard-mph45":     { t: 1, odds: "~10 %", effort: "40 hrs via SOPHAS", note: "MBBS satisfies the doctoral-degree requirement, so you are eligible for the accelerated route most applicants are not. That is a full year and roughly $30,000 saved." },
  "jhu-mph":           { t: 1, odds: "~15 %", effort: "40 hrs", note: "The school that most reliably converts an MBBS into a global health career. A large share of every cohort already holds a medical degree." },
  "cam-mphil":         { t: 1, odds: "~10 %", effort: "35 hrs", note: "The standard Cambridge on-ramp to a doctorate, and the vehicle for a Gates Cambridge application." },
  "india-alliance":    { t: 1, odds: "~10 %", effort: "80+ hrs on the proposal", note: "The clinical stream does not require a PhD. An Indian doctor with a research record can lead their own funded five-year programme. Structurally the most important thing on this site and almost nobody uses it." },
  "wellcome-emcr":     { t: 1, odds: "~10 %", effort: "80+ hrs", note: "Funds you to do the research from India rather than requiring you to emigrate." },
  "nos-sc":            { t: 1, odds: "Under-subscribed — places go unfilled some years", effort: "20 hrs plus certificate paperwork", note: "Tier 1 money at tier 4 competition. If you are eligible, this is the best expected value on the entire site by a wide margin." },
  "nos-st":            { t: 1, odds: "~20 awards a year, few applicants", effort: "20 hrs plus paperwork", note: "Same logic as the SC scheme. A well-prepared application has genuinely meaningful odds." },

  /* ─────── Tier 2 — strong signal ─────── */
  "icmr-sts":          { t: 2, odds: "~20–25 %", effort: "30 hrs including ethics clearance", note: "The default first project, and the window closes permanently after second year. The stipend is the smallest part of the value — the publication is the point." },
  "ias-srfp":          { t: 2, odds: "~15 %", effort: "10 hrs, free to apply", note: "Train fare reimbursed, so the real cost is close to zero. MBBS students are eligible and rarely apply." },
  "neuromatch":        { t: 2, odds: "Accepts most prepared applicants", effort: "3 weeks full-time", note: "The cheapest credential that makes a cold email to a computational lab actually land. Tuition waivers available on request." },
  "ictp":              { t: 2, odds: "Moderate — designed for developing-country scientists", effort: "10 hrs", note: "Exists specifically to fund people from countries like yours. Almost no Indian medical students know it exists." },
  "charpak":           { t: 2, odds: "~20 %, Indians only", effort: "20 hrs plus finding a French lab", note: "Charpak Lab is the rare funded research internship a current MBBS student can take." },
  "lshtm-mph":         { t: 2, odds: "~30 % admission; funding much harder", effort: "25 hrs", note: "The most recognised public health masters in the world. The distance-learning route is the cheapest credible way to hold the degree." },
  "lshtm-gmh":         { t: 2, odds: "~25 %", effort: "25 hrs", note: "Joint with the IoPPN — the department that built the evidence base for task-shifted mental health care." },
  "ox-msc-gh":         { t: 2, odds: "~15 %", effort: "30 hrs", note: "You leave able to run a real epidemiological analysis, not just describe one." },
  "ox-msc-neuro":      { t: 2, odds: "~15 %", effort: "30 hrs", note: "A conversion year that makes a clinically trained doctor credible to a neuroscience PhD programme." },
  "kcl-ioppn":         { t: 2, odds: "~35 %", effort: "20 hrs", note: "Consistently the top-ranked psychiatry research institution outside the United States." },
  "aus-phd":           { t: 2, odds: "Supervisor-dependent, then ~20 %", effort: "40 hrs including supervisor outreach", note: "Tax-free stipend, full fee waiver, and a country that wants you to stay afterwards." },
  "india-phd":         { t: 2, odds: "Entrance-exam dependent", effort: "Exam preparation over months", note: "NIMHANS has psychiatric cohorts and biobanks no Western centre can access. If your question is about Indian populations, this may genuinely be the best place on earth to answer it." },
  "japan-mext":        { t: 2, odds: "~15 % via embassy route", effort: "40 hrs including a written exam", note: "Total coverage plus a funded language year, at a fraction of the competition Western programmes attract." },
  "mext":              { t: 2, odds: "~15 %", effort: "40 hrs", note: "One of the most generous government scholarships on earth and among the least contested by Indian applicants." },
  "daad-epos":         { t: 2, odds: "~15 %", effort: "30 hrs, two separate applications", note: "Germany charges no tuition and then pays you on top. The two-year experience rule is checked strictly." },
  "swiss-excellence":  { t: 2, odds: "Dedicated India quota, chronically under-subscribed", effort: "25 hrs plus securing a Swiss host", note: "The supervisor's letter is the gate. Start emailing in June for a September deadline." },
  "australia-awards":  { t: 2, odds: "~10 %", effort: "30 hrs", note: "Fully funded, with the most generous post-study work rights of the major destinations." },
  "karolinska-msc":    { t: 2, odds: "~20 %", effort: "20 hrs", note: "The institution that awards the Nobel Prize in Medicine. One national deadline in mid-January and no late round at all." },
  "anu-mae":           { t: 2, odds: "Small cohort, placement-matched", effort: "25 hrs", note: "Field epidemiology training — you do outbreak investigation as your degree. The closest thing outside the US CDC to being trained as a disease detective." },
  "usmle":             { t: 2, odds: "~55 % IMG match rate overall; higher in psychiatry", effort: "2–3 years and ₹4–6 lakh", note: "The best-paid clinical route out of India, and US psychiatry residency includes protected research time." },
  "jn-tata":           { t: 2, odds: "~15 %", effort: "15 hrs plus an interview", note: "Interest-free, over a century old, open to medicine, and you do not need an admission offer to apply." },
  "narotam":           { t: 2, odds: "~10 %", effort: "20 hrs plus interview", note: "The largest interest-free loan scholarship open to Indians in any discipline." },
  "kc-mahindra":       { t: 2, odds: "~15 %", effort: "15 hrs plus interview", note: "Open to medicine, unlike Inlaks, and stacks freely with partial university funding." },
  "inlaks":            { t: 2, odds: "~3 %", effort: "25 hrs", note: "Enormous money, but read the exclusions first — medicine is excluded and the boundary with social-science public health is where applications live or die." },
  "conf-neuro":        { t: 2, odds: "Abstract acceptance is high; travel awards moderate", effort: "20 hrs on the abstract", note: "IBRO funds neuroscientists from low- and middle-income countries specifically, and the schemes are chronically under-applied." },
  "conf-globalhealth": { t: 2, odds: "Good for LMIC delegates", effort: "20 hrs", note: "These conferences hold budgets for delegates from countries like yours and routinely fail to spend them." },
  "heidelberg-mscph":  { t: 2, odds: "~25 %", effort: "25 hrs", note: "Germany's flagship international health masters, fully funded through DAAD EPOS." },
  "columbia-mailman":  { t: 2, odds: "~30 %", effort: "35 hrs", note: "Runs an accelerated MPH specifically for holders of a professional doctorate — MBBS qualifies, which halves the cost." },
  "yale-mph":          { t: 2, odds: "~20 %", effort: "35 hrs", note: "Offers advanced standing to medical graduates, compressing the MPH to one year. You must request it explicitly." },
  "emory-mph":         { t: 2, odds: "~40 %", effort: "30 hrs", note: "Next door to the US CDC with a formal pipeline into it, and the most merit money for internationals of any top US school." },
  "ncbs-inStem":       { t: 2, odds: "~10 %", effort: "10 hrs", note: "One of the best basic-science institutes in Asia. Direct emails to individual PIs work here more often than almost anywhere." },
  "iisc-programs":     { t: 2, odds: "~10 %", effort: "10 hrs", note: "India's top-ranked research institution, and one of very few places a medical student can learn real computational biology with clinical framing." },
  "jncasr-srfp":       { t: 2, odds: "~15 %", effort: "8 hrs, free to apply", note: "A real molecular neuroscience laboratory, open from first year, with travel paid. A two-month, zero-risk experiment." },
  "embl-embo":         { t: 2, odds: "Course-dependent", effort: "10 hrs", note: "EMBO explicitly funds participants from lower-income countries. Always tick the fellowship box when applying — you usually cannot ask afterwards." },
  "stipendium-hungaricum": { t: 2, odds: "~200 Indian places a year", effort: "20 hrs, two parallel submissions", note: "For the money involved, the least-known major scholarship available to Indians." },

  /* ─────── Tier 3 — solid foundation ─────── */
  "ccmb-medsrt":       { t: 3, odds: "~20 %", effort: "6 hrs, free to apply", note: "Designed specifically for medical students, board and lodging covered. Two weeks that can change what you think you want to do." },
  "medengage":         { t: 3, odds: "~30 %", effort: "5 hrs — reuse your STS proposal", note: "Far less competition than ICMR STS, and open to all years including interns. The substitute if the STS window has closed." },
  "ucl-msc":           { t: 3, odds: "~40 %", effort: "20 hrs", note: "A genuine policy pipeline into WHO, MSF and health ministries." },
  "edin-msc":          { t: 3, odds: "~45 %", effort: "15 hrs", note: "The online route is the best-value top-25 degree you can hold while still working in India. The certificate does not say 'online'." },
  "imperial-msc":      { t: 3, odds: "~30 %", effort: "20 hrs", note: "The most mathematically serious epidemiology MSc in the UK. Punishing without prior statistics." },
  "melb-mph":          { t: 3, odds: "~50 %", effort: "20 hrs", note: "Advanced standing for a medical degree often halves the programme — worth roughly AUD 50,000. Ask for it at application." },
  "unsw-mph":          { t: 3, odds: "~55 %", effort: "15 hrs", note: "Home to the Kirby and George Institutes, both of which run large trials in South Asia." },
  "nihes-msc":         { t: 3, odds: "~50 %", effort: "15 hrs", note: "The three-week August summer programme is a genuine low-risk way to test whether epidemiology is for you before committing to a degree." },
  "maastricht-euro":   { t: 3, odds: "Scholarship ~8 %", effort: "20 hrs", note: "Study across two or three European countries on one funded degree." },
  "ireland-msc":       { t: 3, odds: "~55 %", effort: "12 hrs", note: "An English-speaking EU degree with a two-year work permit at lower cost and lower competition than the UK." },
  "nordic-free":       { t: 3, odds: "~40 %", effort: "20 hrs", note: "Verify current tuition policy — Norway has been revising fees for non-EU students. The financial-proof requirement is the real barrier." },
  "toronto-mph":       { t: 3, odds: "~35 %", effort: "25 hrs", note: "Apply to the thesis-based MSc rather than the professional MPH if funding matters. The MSc carries stipends; the MPH does not." },
  "nus-sph":           { t: 3, odds: "~30 %", effort: "20 hrs", note: "A top-ten university three and a half hours from Delhi, where food, climate and community are all close to frictionless." },
  "india-mph":         { t: 3, odds: "Entrance-dependent", effort: "Exam preparation", note: "An Indian MPH with two publications beats a foreign MPH with none, for PhD admissions anywhere." },
  "charite-msc":       { t: 3, odds: "~35 %", effort: "25 hrs plus credential recognition", note: "Effectively free — German public universities charge no tuition. Verify the teaching language of your exact track first." },
  "germany-drmed":     { t: 3, odds: "Supervisor-dependent, no committee", effort: "Mostly relationship-building", note: "There is no admissions committee. You find a professor who agrees, and that is the entire gate." },
  "ukmla":             { t: 3, odds: "High pass rates", effort: "6–12 months", note: "The lowest-barrier route to a paid clinical job in a high-income country. UK psychiatry actively recruits internationally." },
  "amc-australia":     { t: 3, odds: "Moderate", effort: "12–18 months", note: "Sit the AMC MCQ in India first — the cheapest way to test your own commitment to the pathway." },
  "germany-approbation": { t: 3, odds: "High once the language is done", effort: "12–18 months, almost all of it language", note: "No match, no lottery, no application season. Everything downstream depends on German — start it now or not at all." },
  "india-pg":          { t: 3, odds: "Highly rank-dependent", effort: "1–2 years", note: "Choose the department by its research output, not the institution's name. A publishing unit at a mid-tier college beats a silent one at a famous one." },
  "who-internship":    { t: 3, odds: "Competitive at Geneva, far less at SEARO", effort: "8 hrs", note: "Apply to the SEARO office in New Delhi as well — far fewer applicants, same institution on your CV." },
  "free-stack":        { t: 3, odds: "Open to everyone", effort: "20 minutes a day, indefinitely", note: "Every credential above assumes skills you can get for nothing. Coursera grants financial aid to Indian students at high rates." },
  "research-method":   { t: 3, odds: "Open to everyone", effort: "2–6 months for a full review", note: "A first-year student can be first author on a systematic review. No lab, no funding, no ethics delay — only method and persistence." },
  "conf-india":        { t: 3, odds: "High acceptance", effort: "15 hrs", note: "Start here, not internationally. A presented abstract costs a train ticket and gives you what every application asks for." },
  "open-doors-russia": { t: 3, odds: "Exam-based, moderate", effort: "Exam preparation", note: "Won by examination rather than essays and references, which genuinely suits people whose paper credentials understate them." },
  "csc-gks-taiwan":    { t: 3, odds: "Moderate — light Indian competition", effort: "25 hrs", note: "East Asian governments are spending heavily to attract researchers and Indian applications are few." },
  "nordic-govt":       { t: 3, odds: "~10 %", effort: "25 hrs across two deadlines", note: "The Swedish route needs two applications with two separate deadlines. Baltic state schemes are almost unknown to Indian applicants." },
  "holland-orange":    { t: 3, odds: "Moderate", effort: "8 hrs", note: "€5,000 is a real dent but not a solution on its own against €18,000 tuition." },
  "aga-khan":          { t: 3, odds: "Moderate", effort: "20 hrs", note: "A gap-filler by design — you must show you have applied elsewhere first. Community service history is weighted heavily." },
  "eiffel":            { t: 3, odds: "Nomination-capped, so a small field", effort: "10 hrs plus asking the institution", note: "Simply emailing the admissions office to ask about nomination puts you ahead of everyone who did not ask." },
  "minority-schemes":  { t: 3, odds: "Scheme-dependent", effort: "1 hour of searching", note: "The education loan interest subsidy schemes are the most under-claimed benefit here. One hour on the National Scholarship Portal is worth it." },

  /* ─────── Tier 4 — worth it if cheap ─────── */
  "ifmsa-score":       { t: 4, odds: "Reasonable if your college has a Local Committee", effort: "20 hrs plus travel cost", note: "The cheapest route to a month abroad — but be realistic. A four-week clinical observership is worth far less on a research CV than four weeks with an output. Choose SCORE over SCOPE if research is the goal." },
  "networks":          { t: 4, odds: "Open", effort: "₹750–1,000 and some hours", note: "The reason other people hear about opportunities first is that they are in these networks. Join one properly rather than five superficially — and organise something, because organisers hear before members." },
  "language":          { t: 4, odds: "Open", effort: "3–6 months per level", note: "Do not let language delay your applications. Almost every research programme here is taught in English. German matters for a life in Germany, not for a degree there." },
  "loan-route":        { t: 4, odds: "Approval-dependent", effort: "Paperwork", note: "Exhaust the funded routes first. A funded doctorate pays you; a self-funded masters costs you a decade of repayments." }
};

/* Things that consume time and produce nothing verifiable.
   Included because a list of what to pursue is only half the advice. */
window.DB.skipList = [
  {
    name: "DAAD WISE, and the other 'open to Indian undergraduates' schemes that are not open to you",
    why: "WISE is the one people send you most often, and an MBBS student cannot win it. It is restricted to Engineering, Mathematics and Science, to a 4-year bachelor's or 5-year integrated master's, and to a fixed list of institutions — a medical college is not on it and MBBS is not one of those degrees. PMRF has the same shape: science and technology streams from the IITs, IISc, NITs and IISERs. Neither will tell you no on the front page; you find out after you have spent three weeks cold-emailing German professors for an invitation letter. Before you spend a cycle on any 'Indian undergraduates' scheme, find the eligibility PDF and search it for the degree list. If MBBS is not named, assume it is excluded and write to the programme office to confirm. Germany itself is wide open to medics — through Dr. med. positions, the IMPRS doctoral schools and DAAD EPOS, all of which are in this index. It is this one door that is shut."
  },
  {
    name: "Paid 'international observerships' sold by agencies",
    why: "Agencies charge ₹50,000–3,00,000 to arrange a two-week hospital shadowing placement you could have arranged by email for free. A certificate that says you watched is not evidence that you did anything. If you want clinical exposure abroad, IFMSA exchanges cost a fraction and carry an actual federation's name."
  },
  {
    name: "Pay-to-publish journals and paid authorship",
    why: "Any journal that guarantees acceptance, publishes within a week, or sells author slots actively damages your CV — reviewers recognise the names instantly, and a predatory publication reads worse than no publication at all. Check a journal against the DOAJ and its indexing before submitting anything."
  },
  {
    name: "Conference attendance without an abstract",
    why: "Attending is not a credential; presenting is. The same trip, with a poster attached, is worth several times more and often unlocks a travel award that pays for it. If you cannot present this year, watch the livestream and submit next year."
  },
  {
    name: "Certificate-collecting from short online webinars",
    why: "A folder of participation certificates is the single most common thing on an Indian medical student's CV and the single least persuasive. One finished project outweighs thirty of them. Do the webinar if it teaches you something; do not do it for the PDF."
  },
  {
    name: "Programmes built for American high-schoolers",
    why: "Several well-marketed 'research programmes' and 'neuroscience academies' are designed for US students assembling a college application. They cost thousands of dollars, carry no weight in graduate admissions, and advertise aggressively to Indian students. Check who the intended audience actually is before paying."
  },
  {
    name: "A sixth roadmap instead of a first finished thing",
    why: "Research, plan, optimise is the most satisfying part of the cycle and the part that never produces anything. Planning feels like progress and costs nothing, which is exactly why it is seductive at 3 a.m. before an exam. If you have written more plans than you have finished projects, the bottleneck is not information."
  }
];
