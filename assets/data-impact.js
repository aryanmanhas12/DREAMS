/* Dreams Counsellor — impact tiers.
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
    blurb: "Changes what you are eligible for afterwards. Recognised by name anywhere in the world. Single-digit acceptance rates, which is exactly why holding one settles the question of whether you can do the work."
  },
  2: {
    name: "Strong signal",
    blurb: "Genuinely moves an application. A reviewer reads it and updates their estimate of you. Competitive, but attainable with a real record rather than a perfect one."
  },
  3: {
    name: "Solid foundation",
    blurb: "Real substance, moderate signal. These are the workhorses. They build the record that makes tier 1 and 2 applications credible. Most people should be doing several of these before reaching upward."
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
  "rhodes-india":      { t: 1, odds: "5–6 Indians a year", effort: "60+ hrs, referees lined up months ahead", note: "The most competitive award an Indian student can hold. Applying is worth it even at these odds. The essays force clarity you will reuse everywhere." },
  "fulbright":         { t: 1, odds: "~5 % of Indian applicants", effort: "50 hrs, plus a 16-month lead time", note: "USIEF places you at the university, which removes the hardest part of a US application." },
  "chevening":         { t: 1, odds: "8–10 % of Indian applicants", effort: "30–40 hrs on four essays", note: "The largest fully-funded India-to-UK route. Most rejected applications are visibly rushed. The essays reward preparation more than pedigree." },
  "commonwealth":      { t: 1, odds: "~5 %", effort: "30 hrs", note: "Unusually, financial need counts in your favour rather than against it." },
  "clarendon":         { t: 1, odds: "~1 in 12 of Oxford applicants", effort: "Zero extra — no separate form", note: "The highest value-per-hour award in existence. You are considered automatically; people miss it purely by applying after the early deadline." },
  "felix":             { t: 1, odds: "Restricted to Indians, so a far smaller field", effort: "25 hrs", note: "Reserved for Indian nationals with financial need. Comparable money to Chevening, a fraction of the applicants." },
  "erasmus-mundus":    { t: 1, odds: "5–10 % per consortium", effort: "20 hrs per application, max 3 allowed", note: "The most under-applied major scholarship available to Indians. The €1,400 monthly allowance exceeds what most students need." },
  "us-phd-neuro":      { t: 1, odds: "3–15 % depending on programme", effort: "100+ hrs across 8–12 applications", note: "A funded doctorate is a salaried job, not a fee. This is the single highest-leverage item on the entire site for anyone past MBBS." },
  "aus-short-term-training": { t: 2, odds: "Depends on securing a post", effort: "Months of outreach to units, then Board paperwork", note: "Up to two years of specialist training in Australia with no AMC exam, open to residents within two years of finishing. The post offer is the gate." },
  "maitri-phd":        { t: 2, odds: "Nomination-gated; small national pool", effort: "Supervisor outreach first", note: "Australia's PhD award for Indian scholars. Health was a named field in 2025-26, so ask your supervisor to nominate you." },
  "imprs-tp":          { t: 1, odds: "Competitive; medical degree named in the rules", effort: "25 hrs, free to apply", note: "Paid, English-taught psychiatry PhD that asks for trainee doctors by name. Open until 31 October 2026." },
  "germany-phd-mpi":   { t: 1, odds: "~5 % at IMPRS schools", effort: "25 hrs, free to apply", note: "English-taught and paid as employment. Some schools name a medical degree in their rules and some do not, so check each one before applying." },
  "swiss-neuro":       { t: 1, odds: "~8 %", effort: "20 hrs, centralised application", note: "The highest doctoral salary in the world. You can genuinely save money while doing a PhD." },
  "khorana":           { t: 1, odds: "~5 % of applicants", effort: "20 hrs, free to apply", note: "Fully funded US summer research that a currently-enrolled MBBS student can hold, with the marks bar lowered specifically for medics. Nothing else on this list does all three." },
  "cshl-urp":          { t: 1, odds: "~20 places worldwide", effort: "15 hrs, free to apply", note: "Brutally competitive and free to enter, which makes the expected value of applying very high even when you do not get it." },
  "weizmann-kupcinet": { t: 1, odds: "Small international cohort", effort: "15 hrs, free to apply", note: "Flights, accommodation, meals and a stipend, at one of the great research institutes. Almost no Indian medical students apply." },
  "amgen-scholars":    { t: 1, odds: "~5–10 %", effort: "20 hrs per host, several hosts allowed", note: "Apply to the Asia hosts, IIIT Hyderabad included. From an Indian university they are the only ones open to you: Europe, Australia and the US each take only their own region's students." },
  "lindau":            { t: 1, odds: "16 of 223 via DST in the last medicine year", effort: "15 hrs plus a rank certificate and two references", note: "A week with Nobel laureates in medicine, fully paid by DST. Open to MD/MS residents, PhD students and young postdocs, not to MBBS students." },
  "harvard-mph45":     { t: 1, odds: "~10 %", effort: "40 hrs via SOPHAS, plus a WES evaluation", note: "One year instead of the eighteen-month MPH-65, which at 2026-27 tuition is about $24,000 and half a year of Boston rent saved. Whether you can enter straight after internship depends on how WES reads your MBBS, so settle that first." },
  "jhu-mph":           { t: 1, odds: "~15 %", effort: "40 hrs", note: "The school that most reliably converts an MBBS into a global health career. A large share of every cohort already holds a medical degree." },
  "cam-mphil":         { t: 1, odds: "~10 %", effort: "35 hrs", note: "The standard Cambridge on-ramp to a doctorate, and the vehicle for a Gates Cambridge application." },
  "india-alliance":    { t: 1, odds: "~10 %", effort: "80+ hrs on the proposal", note: "The clinical stream does not require a PhD. An Indian doctor with a research record can lead their own funded five-year programme. Structurally the most important thing on this site and almost nobody uses it." },
  "wellcome-emcr":     { t: 1, odds: "~10 %", effort: "80+ hrs", note: "Funds you to do the research from India rather than requiring you to emigrate." },
  "nos-sc":            { t: 1, odds: "Under-subscribed — places go unfilled some years", effort: "20 hrs plus certificate paperwork", note: "Tier 1 money at tier 4 competition. If you are eligible, this is the best expected value on the entire site by a wide margin." },
  "nos-st":            { t: 1, odds: "~20 awards a year, few applicants", effort: "20 hrs plus paperwork", note: "Same logic as the SC scheme. A well-prepared application has genuinely meaningful odds." },

  /* ─────── Tier 2 — strong signal ─────── */
  "icmr-sts":          { t: 2, odds: "~20–25 %", effort: "30 hrs including ethics clearance", note: "The default first project, and the window closes permanently after second year. The stipend is the smallest part of the value. The publication is the point." },
  "ias-srfp":          { t: 2, odds: "~15 %", effort: "10 hrs, free to apply", note: "Train fare reimbursed, so the real cost is close to zero. MBBS students are eligible and rarely apply." },
  "neuromatch":        { t: 2, odds: "Accepts most prepared applicants", effort: "3 weeks full-time", note: "The cheapest credential that makes a cold email to a computational lab actually land. Tuition waivers available on request." },
  "ictp":              { t: 2, odds: "Moderate — designed for developing-country scientists", effort: "10 hrs", note: "Exists specifically to fund people from countries like yours. Almost no Indian medical students know it exists." },
  "charpak":           { t: 2, odds: "~20 %, Indians only", effort: "20 hrs plus finding a French lab", note: "Charpak Lab is the rare funded research internship a current MBBS student can take." },
  "lshtm-mph":         { t: 2, odds: "~30 % admission; funding much harder", effort: "25 hrs", note: "The most recognised public health masters in the world. The distance-learning route is the cheapest credible way to hold the degree." },
  "lshtm-gmh":         { t: 2, odds: "~25 %", effort: "25 hrs", note: "Joint with the IoPPN. The department that built the evidence base for task-shifted mental health care." },
  "ox-msc-gh":         { t: 2, odds: "~15 %", effort: "30 hrs", note: "You leave able to run a real epidemiological analysis, not just describe one." },
  "ox-msc-neuro":      { t: 2, odds: "~15 %", effort: "30 hrs", note: "A conversion year that makes a clinically trained doctor credible to a neuroscience PhD programme." },
  "kcl-ioppn":         { t: 2, odds: "~35 %", effort: "20 hrs", note: "Consistently the top-ranked psychiatry research institution outside the United States." },
  "aus-phd":           { t: 2, odds: "Supervisor-dependent, then ~20 %", effort: "40 hrs including supervisor outreach", note: "Tax-free stipend, fee offset, and up to four post-study years for an Indian PhD graduate under AI-ECTA." },
  "india-phd":         { t: 2, odds: "Entrance-exam dependent", effort: "Exam preparation over months", note: "NIMHANS has psychiatric cohorts and biobanks no Western centre can access. If your question is about Indian populations, this may genuinely be the best place on earth to answer it." },
  "japan-mext":        { t: 2, odds: "~15 % via embassy route", effort: "40 hrs including a written exam", note: "Total coverage plus a funded language year, at a fraction of the competition Western programmes attract." },
  "mext":              { t: 2, odds: "~15 %", effort: "40 hrs", note: "One of the most generous government scholarships on earth and among the least contested by Indian applicants." },
  "daad-epos":         { t: 2, odds: "~15 %", effort: "30 hrs, two separate applications", note: "€992 a month for a funded masters. The two-year experience rule is checked strictly, and a few listed courses charge fees, so ask how each one treats EPOS scholars." },
  "swiss-excellence":  { t: 2, odds: "Supervisor-gated; no published India quota", effort: "25 hrs plus securing a Swiss host", note: "The supervisor's letter is the gate. Start emailing in June for India's November deadline. SERI names young medical doctors in the target group, which few government schemes do." },
  "australia-awards":  { t: 4, odds: "Closed: no India round open", effort: "Check the page once a term", note: "Tier 2 would be right for an open round. There is none: the standard Australia Awards round excludes India, and the India-specific Masters programme is closed with no date. Graded on what you can act on today." },
  "karolinska-msc":    { t: 2, odds: "~20 %", effort: "20 hrs", note: "The institution that awards the Nobel Prize in Medicine. One national deadline in mid-January and no late round at all." },
  "usmle":             { t: 2, odds: "~55 % IMG match rate overall; higher in psychiatry", effort: "2–3 years and ₹4–6 lakh", note: "The best-paid clinical route out of India, and US psychiatry residency includes protected research time." },
  "jn-tata":           { t: 2, odds: "~15 %", effort: "15 hrs plus an interview", note: "Interest-free, over a century old, open to medicine, and you do not need an admission offer to apply." },
  "narotam":           { t: 2, odds: "~10 %", effort: "20 hrs plus interview", note: "The largest interest-free loan scholarship open to Indians in any discipline." },
  "kc-mahindra":       { t: 2, odds: "~15 %", effort: "15 hrs plus interview", note: "Open to medicine, unlike Inlaks, and stacks freely with partial university funding." },
  "inlaks":            { t: 2, odds: "~3 %", effort: "25 hrs", note: "Enormous money, but read the exclusions first — medicine is excluded and the boundary with social-science public health is where applications live or die." },
  "conf-neuro":        { t: 2, odds: "Abstract acceptance is high; travel awards moderate", effort: "20 hrs on the abstract", note: "IBRO funds neuroscientists from low- and middle-income countries specifically, and the schemes are chronically under-applied." },
  "conf-globalhealth": { t: 2, odds: "Strong for LMIC presenters", effort: "20 hrs, most of it the abstract", note: "The Union reserves full scholarships for presenters from low- and lower-middle-income countries, India included. The abstract is the application." },
  "heidelberg-mscph":  { t: 2, odds: "~25 %", effort: "25 hrs", note: "Germany's flagship international health masters. €14,100 self-funded; DAAD EPOS is the funded route and closes 15 October 2026." },
  "columbia-mailman":  { t: 2, odds: "~30 %", effort: "35 hrs", note: "Runs an accelerated MPH specifically for holders of a professional doctorate — MBBS qualifies, which halves the cost." },
  "yale-mph":          { t: 2, odds: "~20 %", effort: "35 hrs", note: "Offers advanced standing to medical graduates, compressing the MPH to one year. You must request it explicitly." },
  "emory-mph":         { t: 2, odds: "~40 %", effort: "30 hrs", note: "Next door to the US CDC with a formal pipeline into it, and the most merit money for internationals of any top US school." },
  "ncbs-inStem":       { t: 2, odds: "~10 %", effort: "10 hrs", note: "One of the best basic-science institutes in Asia. Direct emails to individual PIs work here more often than almost anywhere." },
  "iisc-programs":     { t: 2, odds: "~10 %", effort: "10 hrs", note: "India's top-ranked research institution, and one of very few places a medical student can learn real computational biology with clinical framing." },
  "jncasr-srfp":       { t: 2, odds: "~15 %", effort: "8 hrs, free to apply", note: "A real molecular neuroscience laboratory, open from first year, with travel paid. A two-month, zero-risk experiment." },
  "embl-embo":         { t: 2, odds: "Course-dependent", effort: "10 hrs", note: "EMBO explicitly funds participants from lower-income countries. Always tick the fellowship box when applying. You usually cannot ask afterwards." },
  "stipendium-hungaricum": { t: 2, odds: "~200 Indian places a year", effort: "20 hrs, two parallel submissions", note: "For the money involved, the least-known major scholarship available to Indians." },

  /* ─────── Tier 3 — solid foundation ─────── */
  "ccmb-medsrt":       { t: 3, odds: "~20 %", effort: "6 hrs, free to apply", note: "Designed specifically for medical students, board and lodging covered. Two weeks that can change what you think you want to do." },
  "medengage":         { t: 3, odds: "~30 %", effort: "5 hrs — reuse your STS proposal", note: "Far less competition than ICMR STS, and open to all years including interns. The substitute if the STS window has closed." },
  "ucl-msc":           { t: 3, odds: "~40 %", effort: "20 hrs", note: "A genuine policy pipeline into WHO, MSF and health ministries." },
  "edin-msc":          { t: 3, odds: "~45 %", effort: "15 hrs", note: "The online route is the best-value top-25 degree you can hold while still working in India. The certificate does not say 'online'." },
  "imperial-msc":      { t: 3, odds: "~30 %", effort: "20 hrs", note: "The most mathematically serious epidemiology MSc in the UK. Punishing without prior statistics." },
  "melb-mph":          { t: 3, odds: "~50 %", effort: "20 hrs", note: "AUD 70,976 a year for 2027. Ask for advanced standing at application, and count the three post-study years Indians get under AI-ECTA." },
  "unsw-mph":          { t: 3, odds: "~55 %", effort: "15 hrs", note: "Home to the Kirby Institute and linked to the George Institute, which has an India office. About AUD 55,300 a year." },
  "nihes-msc":         { t: 3, odds: "~50 %", effort: "15 hrs", note: "The three-week August summer programme is a genuine low-risk way to test whether epidemiology is for you before committing to a degree." },
  "maastricht-euro":   { t: 3, odds: "Scholarship ~8 %", effort: "20 hrs", note: "Study across two or three European countries on one funded degree." },
  "ireland-msc":       { t: 3, odds: "~55 %", effort: "12 hrs", note: "An English-speaking EU degree with a two-year work permit at lower cost and lower competition than the UK." },
  "nordic-phd":        { t: 2, odds: "Competitive per post; MBBS assessed case by case", effort: "10 hrs per application, after one email to check eligibility", note: "Paid, pensioned and tuition-free. Kept off tier 1 only because whether an MBBS counts as master's-level is decided post by post." },
  "toronto-mph":       { t: 3, odds: "~35 %", effort: "25 hrs", note: "Apply to the thesis-based MSc rather than the professional MPH if funding matters. The MSc carries stipends; the MPH does not." },
  "nus-sph":           { t: 3, odds: "~30 %", effort: "20 hrs", note: "A top-ten university three and a half hours from Delhi, where food, climate and community are all close to frictionless." },
  "india-mph":         { t: 3, odds: "Entrance-dependent", effort: "Exam preparation", note: "An Indian MPH with two publications beats a foreign MPH with none, for PhD admissions anywhere." },
  "charite-msc":       { t: 3, odds: "EPOS: three places, 800+ applicants", effort: "25 hrs plus credential recognition", note: "Not free: €2,500 a semester for Molecular Medicine, €12,900 for International Health. The EPOS route is the only funded way in." },
  "germany-drmed":     { t: 3, odds: "Supervisor-dependent, no national round", effort: "Mostly relationship-building", note: "A professor who agrees is the real gate, then a ZAB statement on your degree. Prefer the PhD if research is the career: a Dr. med. is often not counted as a research doctorate abroad." },
  "ukmla":             { t: 3, odds: "High pass rates", effort: "6–12 months", note: "The lowest-barrier route to a paid clinical job in a high-income country. UK psychiatry actively recruits internationally." },
  "amc-australia":     { t: 3, odds: "Moderate", effort: "12–18 months", note: "Check your school's AMC eligibility, then sit the CAT MCQ (AUD 2,920). The cheapest way to test your own commitment to the pathway." },
  "germany-approbation": { t: 3, odds: "High once the language is done", effort: "12–18 months, almost all of it language", note: "No match, no lottery, no application season, and from November 2026 no document check as standard. Everything downstream depends on German, so start it now or not at all." },
  "india-pg":          { t: 3, odds: "Highly rank-dependent", effort: "1–2 years", note: "Choose the department by its research output, not the institution's name. A publishing unit at a mid-tier college beats a silent one at a famous one." },
  "who-internship":    { t: 3, odds: "Competitive; one application per posted vacancy", effort: "8 hrs per vacancy", note: "Look for New Delhi regional-office vacancies as well as Geneva: same institution on your CV, no international flight. The allowance goes to interns who need it." },
  "free-stack":        { t: 3, odds: "Open to everyone", effort: "20 minutes a day, indefinitely", note: "Every credential above assumes skills you can get for nothing. Coursera grants financial aid to Indian students at high rates." },
  "research-method":   { t: 3, odds: "Open to everyone", effort: "2–6 months for a full review", note: "A first-year student can be first author on a systematic review. No lab, no funding, no ethics delay — only method and persistence." },
  "conf-india":        { t: 3, odds: "High acceptance", effort: "15 hrs", note: "Start here, not internationally. A presented abstract costs a train ticket and gives you what every application asks for." },
  "open-doors-russia": { t: 3, odds: "Exam-based, moderate", effort: "Exam preparation", note: "Won by examination rather than essays and references, which genuinely suits people whose paper credentials understate them." },
  "csc-gks-taiwan":    { t: 3, odds: "Moderate — light Indian competition", effort: "25 hrs", note: "East Asian governments are spending heavily to attract researchers and Indian applications are few." },
  "nordic-govt":       { t: 3, odds: "Merit-ranked at admission", effort: "15 hrs: the programme application does most of the work", note: "Tuition only, so it suits someone who can fund living costs. The Swedish Institute route most lists recommend excludes India." },
  "holland-orange":    { t: 3, odds: "Moderate", effort: "8 hrs", note: "€5,000 is a real dent but not a solution on its own against €18,000 tuition." },
  "aga-khan":          { t: 3, odds: "Moderate", effort: "20 hrs", note: "A gap-filler by design. You must show you have applied elsewhere first. Community service history is weighted heavily." },
  "eiffel":            { t: 3, odds: "Nomination-capped, so a small field", effort: "10 hrs plus asking the institution", note: "Simply emailing the admissions office to ask about nomination puts you ahead of everyone who did not ask." },
  "minority-schemes":  { t: 3, odds: "Scheme-dependent", effort: "1 hour of searching", note: "The education loan interest subsidy schemes are the most under-claimed benefit here. One hour on the National Scholarship Portal is worth it." },

  /* ─────── Tier 4 — worth it if cheap ─────── */
  "ifmsa-score":       { t: 4, odds: "Reasonable if your college has a Local Committee", effort: "20 hrs plus travel cost", note: "The cheapest route to a month abroad, but be realistic. A four-week clinical observership is worth far less on a research CV than four weeks with an output. Choose SCORE over SCOPE if research is the goal." },
  "networks":          { t: 4, odds: "Open", effort: "₹750–1,000 and some hours", note: "The reason other people hear about opportunities first is that they are in these networks. Join one properly rather than five superficially, and organise something, because organisers hear before members." },
  "language":          { t: 4, odds: "Open", effort: "3–6 months per level", note: "Do not let language delay your applications. Almost every research programme here is taught in English. German matters for a life in Germany, not for a degree there." },
  "loan-route":        { t: 4, odds: "Approval-dependent", effort: "Paperwork", note: "Exhaust the funded routes first. A funded doctorate pays you; a self-funded masters costs you a decade of repayments." }
};

/* Things that consume time and produce nothing verifiable.
   Included because a list of what to pursue is only half the advice. */
window.DB.skipList = [
  {
    name: "DAAD WISE, and the other 'open to Indian undergraduates' schemes that are not open to you",
    why: "WISE is the one people send you most often, and an MBBS student cannot win it. It is restricted to Engineering, Mathematics and Science, to a 4-year bachelor's or 5-year integrated master's, and to a fixed list of institutions — a medical college is not on it and MBBS is not one of those degrees. PMRF's direct entry has the same shape: science and technology degrees from the IITs, IISc, NITs and IISERs. (Its lateral entry, from inside a PhD, has no degree-stream rule, and that door is in this index.) Neither will tell you no on the front page; you find out after you have spent three weeks cold-emailing German professors for an invitation letter. Before you spend a cycle on any 'Indian undergraduates' scheme, find the eligibility PDF and search it for the degree list. If MBBS is not named, assume it is excluded and write to the programme office to confirm. Germany itself is wide open to medics — through Dr. med. positions, the IMPRS doctoral schools and DAAD EPOS, all of which are in this index. It is this one door that is shut."
  },
  {
    name: "DAAD RISE — both halves of it, and this is the same funder as WISE",
    why: "RISE is the other DAAD programme that gets recommended to Indian medical students constantly, and it comes in two versions that exclude you for two different reasons. RISE Germany requires that you have been enrolled at a university in the United States, Canada, the United Kingdom or Ireland for more than twelve months, and its subject list is biology, chemistry, physics, earth sciences, engineering and computer science, so an Indian medical student fails on both the country and the subject. RISE Worldwide sends students the other way and requires enrolment at a GERMAN university, so you fail on country again. Read those two sentences together and the pattern is clear: RISE moves students between a fixed set of countries, and India is not one of them. None of this is on the front page. Germany itself remains wide open to medics through Dr. med. positions, the IMPRS doctoral schools and DAAD EPOS, all of which are in this index; it is these two doors that are shut."
  },
  {
    name: "Government scholarships whose country list leaves India out: the Swedish Institute and the standard Australia Awards",
    why: "Both are recommended to Indian doctors in almost every list of fully funded masters, and neither will take you. The Swedish Institute Scholarship for Global Professionals is open to a published list of countries and India is not on it. The standard Australia Awards round for South and West Asia covers Bangladesh, Bhutan, the Maldives, Nepal, Pakistan, Sri Lanka and Mongolia, and India is excluded from it; India's own Australia Awards programme is a separate scheme with no round open at present. Aggregators copy the programme's headline and skip the country table, which is the only part that matters. For Sweden the realistic funding is a Karolinska or Lund tuition scholarship, and for Australia it is a university research scholarship; both are in this index. Before you write a single essay for any government scholarship, open the eligible-countries list and find India on it yourself."
  },
  {
    name: "Internships that promise a stipend but ask you to pay first, especially 'Government of India' or 'MSME-approved' ones",
    why: "The pattern is always the same: a work-from-home internship, a named domain such as molecular biology, a stipend of several thousand rupees a month, and a 'registration' or 'training' fee of a few thousand, often split into instalments to make it feel small. In July 2026 the Press Information Bureau's Fact Check unit said that forms offering doctors and other professionals an internship 'approved by the Ministry of MSME and the Ministry of Corporate Affairs' were fake, and that neither ministry had announced any such programme. A real internship never charges you to be selected, and a real government scheme is applied for only on its own .gov.in portal: the PM Internship Scheme, for one, is free and runs only through pminternship.mca.gov.in. If you have already paid, stop further instalments, keep the payment receipts, and report it at cybercrime.gov.in or on the 1930 helpline."
  },
  {
    name: "Mitacs Globalink from India, for medical students",
    why: "Mitacs is fully funded and hugely popular, and for 2027 its Indian intake runs only through AICTE: the call is open to full-time BE and BTech students at eligible institutions, with at least two years completed. An MBBS student cannot apply through it, however often it appears in lists for Indian undergraduates. This index recommended it to medical students until September 2026. The funded research internships that do take MBBS students are OIST's, which needs you in your final two years, and the Science Academies' summer fellowship."
  },
  {
    name: "Faculty for the Future (Schlumberger Foundation), for Indian women",
    why: "It pays up to USD 50,000 a year for a PhD abroad and is routinely listed for women from India. Its eligible-country list for 2026-27 names Nepal, Bangladesh, Bhutan and Myanmar and does not include India, and in the biological sciences it funds only work that crosses into the physical sciences. This index said India qualified until September 2026. Women doctors looking for funded PhDs should look instead at the Nordic and Max Planck doctoral posts, which are salaried jobs, and at L'Oréal India for earlier stages."
  },
  {
    name: "The UN Young Professionals Programme exam",
    why: "It is the best-known entry route into the UN Secretariat, and it is open only to nationals of countries that are un- or under-represented there, a list that changes every year. India was not on the 2025 list, which named countries such as Indonesia, Japan, Germany and the United States. Check the current year's list on the UN careers site before you prepare; if India is absent, the exam is closed to you whatever your degree. The UN also warns that it charges no fee at any stage and endorses no paid coaching for this exam. The UN routes that stay open to Indians are internships, UN Volunteer assignments and agency posts, which are in this index."
  },
  {
    name: "Australia's field epidemiology master's at ANU",
    why: "The Master of Philosophy in Applied Epidemiology is Australia's only accredited field epidemiology training programme, and it gets recommended to Indian doctors who want outbreak work. It places every student inside an Australian government health department, so ANU requires applicants to be Australian citizens or permanent residents and says it cannot consider anyone else. This index listed it until September 2026. India has its own field epidemiology route in the National Centre for Disease Control's two-year Epidemic Intelligence Service in Delhi, whose last published brochure (2024) asked for an MD in community medicine, or an MBBS with public health experience; check NCDC for the current intake before planning on it."
  },
  {
    name: "EMERALD, the European PhD programme for medical doctors",
    why: "It is exactly what it sounds like, which is why it still gets recommended: an EU-funded doctorate designed for medical doctors, salaried, across eight European institutes. It was funded by a single Marie Skłodowska-Curie grant that runs from January 2022 to June 2027, it recruited in two calls, and the second closed on 28 August 2022. There is no further intake. Its homepage still carries a search description saying 'Applications for the 2nd call are open!', so a search result will tell you it is open when the page itself says the call is closed. This index listed it as recruiting until September 2026. The programmes still recruiting doctors into salaried European PhDs are Institut Pasteur's PPU MD-PhD track, the FMI MD-PhD in Basel and the Max Planck research schools, all in this index."
  },
  {
    name: "'Tuition-free masters' in Norway, Finland or Denmark",
    why: "This was true once and is still repeated everywhere. Denmark has charged students from outside the EU since 2006, Finland since 2017, and Norway since autumn 2023. Some Norwegian universities cut their fees for 2026/27, but a cut is not zero: Nord University, for one, lists NOK 85,000 a year for health subjects. If free Nordic study is what drew you, look at the doctorate instead. Nordic PhD positions are salaried jobs with a pension, they charge no tuition, and they are in this index."
  },
  {
    name: "Molecular medicine masters that turn out to exclude medicine",
    why: "The name sounds made for a doctor, and Göttingen's English-taught MSc Molecular Medicine is often recommended to MBBS graduates on exactly that basis. Its own requirements ask for a bachelor's in molecular medicine, biology, biochemistry or a related field, and add in brackets: 'but not in medicine'. This index listed it until September 2026, which is how easy the mistake is to make. If you want the laboratory side of disease, the International Max Planck Research Schools and Nordic PhD posts take medical graduates straight into a funded doctorate, which is where a molecular medicine masters would have led anyway."
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
