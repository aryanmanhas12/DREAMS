/* Dream Counsellor — Frontier fields.
   Disciplines that exist, are hiring, and are almost never mentioned in an Indian
   medical college. Each one is a real answer to "what else could I be?" */

window.DB = window.DB || {};

window.DB.frontiers = [
  {
    id: "psychgenomics",
    name: "Psychiatric Genomics",
    tagline: "Finding the genetic architecture of mental illness",
    fields: ["psych", "genomics", "compbio"],
    what: "Large-scale genome-wide studies that ask which common and rare variants raise the risk of schizophrenia, depression and bipolar disorder — and what those variants do biologically. The field went from zero replicated findings to hundreds of loci in about fifteen years.",
    whyIndia: "Polygenic risk scores were built almost entirely on European cohorts and transfer badly to South Asian populations — a well-documented failure that nobody has fixed. GenomeIndia has released thousands of Indian genomes into the public Indian Biological Data Centre. The field's largest blind spot is your home population, and the data is already public.",
    entry: "MBBS → MSc in genomics/bioinformatics or a direct funded PhD → analyse public cohort data in the meantime. You need Python or R and population genetics, not a wet lab.",
    where: ["Broad Institute (Boston)", "Cardiff MRC Centre for Neuropsychiatric Genetics", "QIMR Berghofer (Brisbane)", "NIMHANS ADBS programme (Bengaluru)", "Karolinska"],
    startNow: "Download summary statistics from the Psychiatric Genomics Consortium — they are free and public — and reproduce one published figure. That single notebook is a better credential than any certificate.",
    url: "https://pgc.unc.edu/"
  },
  {
    id: "compsych",
    name: "Computational Psychiatry",
    tagline: "Mathematical models of what goes wrong in a mind",
    fields: ["psych", "neuro", "compbio"],
    what: "Using reinforcement learning, Bayesian inference and dynamical systems to formalise psychiatric symptoms — modelling delusions as faulty belief-updating, or anhedonia as an altered reward-prediction error, and then testing those models against behaviour and brain data.",
    whyIndia: "The barrier to entry is a laptop. Not a laboratory, not AIIMS. Open datasets (LEMON, TD-BRAIN, UK Biobank derivatives, HCP) plus code plus a question is the entire requirement. This is the one corner of medicine where geography genuinely does not gate you.",
    entry: "Neuromatch Academy → a reproducible analysis on an open EEG or fMRI dataset → cold-email a lab with the notebook attached. Several PhD programmes take medical graduates directly.",
    where: ["Max Planck Institute of Psychiatry (Munich)", "UCL Max Planck Centre for Computational Psychiatry", "Zurich (Translational Neuromodeling Unit)", "Mount Sinai", "Yale"],
    startNow: "Take one open EEG dataset, write a preprocessing pipeline in MNE-Python, and publish the repository. Finished and public beats ambitious and private.",
    url: "https://www.translationalneuromodeling.org/"
  },
  {
    id: "digitalphenotyping",
    name: "Digital Phenotyping & Voice Biomarkers",
    tagline: "Reading illness from a phone, a voice, a sleep pattern",
    fields: ["psych", "compbio", "global"],
    what: "Inferring mental and neurological state from passively collected data — typing dynamics, GPS-derived mobility, sleep regularity, and especially the acoustic properties of speech. Vocal changes in depression, Parkinson's and psychosis are measurable before a clinician notices them.",
    whyIndia: "There are a handful of practising psychiatrists per million people across much of India. A screening tool that works from a thirty-second phone recording is not a convenience here — it is the only version of the service that can scale. And multilingual voice data is exactly what Western datasets lack.",
    entry: "This is buildable now, by you, without institutional permission. Signal processing plus a validated clinical scale plus a consented sample. The paper gets written about the tool afterwards.",
    where: ["Harvard Digital Psychiatry Division", "KCL IoPPN RADAR-CNS", "Vanderbilt", "Mount Sinai", "Indian Institute of Technology digital health groups"],
    startNow: "Build the multilingual screener you already started, validate it against a standard instrument like DASS-21 or PHQ-9, and publish the repository. A working tool that screens across languages is, in global health terms, worth more than an early letter to the editor.",
    url: "https://www.digitalpsych.org/"
  },
  {
    id: "neuroimmuno",
    name: "Neuroimmunology & Inflammatory Psychiatry",
    tagline: "The immune system as a driver of mental illness",
    fields: ["psych", "neuro", "biochem", "infect"],
    what: "The evidence that inflammation, autoimmunity and the gut microbiome participate causally in depression, psychosis and cognitive decline. Anti-NMDA receptor encephalitis rewrote what a psychiatric presentation can mean; the field is now asking how much else has been misclassified.",
    whyIndia: "India's infectious disease burden means a population where infection, inflammation and mental illness overlap constantly — and almost nobody is characterising it. Post-infectious neuropsychiatric syndromes are systematically under-diagnosed here.",
    entry: "Biochemistry and immunology are unusually direct routes in. This is one of the few frontier fields where an MSc in biochemistry is the right first move rather than a detour.",
    where: ["Cambridge (Psychiatry & Immunology)", "KCL", "Charité Berlin", "Johns Hopkins", "NIMHANS"],
    startNow: "Look at what your own hospital already measures. CRP, ferritin and differential counts sit in records alongside psychiatric admissions — a retrospective association study needs no new funding.",
    url: "https://www.neuroimmunology.org/"
  },
  {
    id: "implementation",
    name: "Implementation Science",
    tagline: "Why proven treatments never reach the people who need them",
    fields: ["pubhealth", "global", "systems", "psych"],
    what: "The formal study of the gap between what works in trials and what happens in clinics. Not 'does this drug work' but 'why, after twenty years of evidence, is it still not being given'. It has its own methods, journals and funding streams.",
    whyIndia: "This is the discipline for anyone whose real frustration is not scientific ignorance but systemic failure — the treatment exists, the guideline exists, and the patient still does not get it. India is the largest natural laboratory on earth for this question.",
    entry: "MPH or MSc in health services research. Career paths run through WHO, the Gates Foundation, PATH, national health missions and university global health departments.",
    where: ["LSHTM", "Johns Hopkins", "University of Washington (Global Health)", "PHFI / Indian Institutes of Public Health", "George Institute India"],
    startNow: "Pick one national guideline and audit its adherence in your own hospital. That is a publishable implementation study and it costs nothing but time.",
    url: "https://link.springer.com/journal/13012"
  },
  {
    id: "precisionpsych",
    name: "Precision & Pharmaco-Psychiatry",
    tagline: "Ending trial-and-error prescribing in mental health",
    fields: ["psych", "genomics", "biochem", "compbio"],
    what: "Using genotype, metabolomics and biomarkers to predict who will respond to which antidepressant or antipsychotic, and at what dose — replacing the current practice of sequential guessing over months.",
    whyIndia: "CYP450 metabolic variants differ substantially across South Asian populations, and prescribing guidelines are calibrated on other groups. This is a concrete, high-impact, under-studied Indian question with immediate clinical consequence.",
    entry: "Pharmacogenomics sits between biochemistry, psychiatry and data science. An MSc in clinical pharmacology or genomics is the standard route; clinical trial units also hire medical graduates directly.",
    where: ["Mayo Clinic (pharmacogenomics)", "Max Planck Munich", "Vanderbilt", "NIMHANS", "CSIR-IGIB Delhi"],
    startNow: "Read the PharmGKB annotations for one commonly prescribed antidepressant and check what the guideline assumes about metabolism. The gap will be obvious within an hour.",
    url: "https://www.clinpgx.org/"
  },
  {
    id: "nutripsych",
    name: "Nutritional Psychiatry & Metabolic Mental Health",
    tagline: "Diet, metabolism and the brain, taken seriously",
    fields: ["psych", "nutrition", "biochem", "pubhealth"],
    what: "The bidirectional relationship between diet, metabolic state, the gut microbiome and mental illness — moving from correlation into intervention trials.",
    whyIndia: "India carries simultaneous undernutrition and a diabetes epidemic in the same population, with dietary patterns unlike anywhere the evidence was generated. Almost every published cohort is Western.",
    entry: "This is one of the rare frontier fields you can enter from a first-year cross-sectional study. Diet screener plus a validated distress scale in your own institution is a real contribution.",
    where: ["Deakin Food & Mood Centre (Australia)", "University College Cork APC Microbiome", "Harvard Chan Nutrition", "NIN Hyderabad"],
    startNow: "You may already be doing this. A REAP-S plus DASS-21 cross-sectional study in a medical college is exactly the design this field publishes.",
    url: "https://foodandmoodcentre.com.au/"
  },
  {
    id: "planetary",
    name: "Planetary Health & Climate Psychiatry",
    tagline: "Heat, air and displacement as determinants of the mind",
    fields: ["env", "pubhealth", "psych", "global"],
    what: "How environmental change alters disease burden — including the measured relationship between ambient temperature and suicide rates, air pollution and cognitive decline, and displacement and psychiatric morbidity.",
    whyIndia: "India is simultaneously among the most heat-exposed and most air-polluted large countries on earth, and among the least studied for mental health consequences. The Lancet Countdown repeatedly flags South Asian data gaps.",
    entry: "MPH with environmental epidemiology, or direct entry through modelling groups. Heavily funded right now — Wellcome has committed large sums specifically to climate and health.",
    where: ["Harvard Chan C-CHANGE", "LSHTM Centre on Climate Change", "Umeå University", "IIT and PHFI environmental health groups"],
    startNow: "District-level temperature data and state suicide statistics are both public in India. That analysis has been done for other countries and barely for yours.",
    url: "https://www.lancetcountdown.org/"
  },
  {
    id: "globalmh-econ",
    name: "Mental Health Economics & Task-Shifting",
    tagline: "Proving that treating minds pays for itself",
    fields: ["psych", "global", "systems", "pubhealth"],
    what: "Costing mental health interventions, modelling their return, and designing systems where lay counsellors rather than psychiatrists deliver care. India produced the foundational evidence for this — the Healthy Activity Program trials in Goa are cited worldwide.",
    whyIndia: "The most influential task-shifting trials in global mental health were run in India by Indian researchers. This is a field where the centre of gravity is genuinely here, and where working from India is an advantage rather than a compromise.",
    entry: "MSc health economics or global mental health. Sangath, the George Institute and PHFI all hire medical graduates into this work directly.",
    where: ["Sangath (Goa)", "LSHTM / KCL Centre for Global Mental Health", "Harvard", "PHFI"],
    startNow: "Read the Healthy Activity Program trial papers. Then look at what your own district actually offers, and cost the gap.",
    url: "https://sangath.in/"
  },
  {
    id: "neuroethics",
    name: "Neuroethics, Health Policy & AI Regulation",
    tagline: "Deciding what medicine is allowed to do next",
    fields: ["global", "systems", "psych", "compbio"],
    what: "The governance of brain data, algorithmic diagnosis, consent in digital health and the regulation of AI-based medical devices. Every country is currently writing these rules and very few of the people writing them have clinical training.",
    whyIndia: "India is drafting digital health and AI governance frameworks right now, and clinically trained voices in that room are scarce. This is a field where being early matters more than being senior.",
    entry: "MSc bioethics, health policy, or law and medicine. Roles at WHO, national regulators, the Wellcome Trust and university ethics centres.",
    where: ["Oxford Uehiro Centre", "KCL", "Johns Hopkins Berman Institute", "NUS Centre for Biomedical Ethics", "ICMR Bioethics Unit"],
    startNow: "Write one clear, short commentary on a real regulatory gap you have observed. Journals publish student commentaries and policy work compounds fast.",
    url: "https://www.who.int/teams/digital-health-and-innovation"
  },
  {
    id: "chrono",
    name: "Chronobiology & Sleep Medicine",
    tagline: "Time-of-day as a clinical variable",
    fields: ["neuro", "psych", "biochem", "clinical"],
    what: "Circadian rhythm disruption as a cause rather than a symptom — in mood disorders, metabolic disease and cognitive performance. Sleep medicine remains a small, under-supplied specialty almost everywhere.",
    whyIndia: "Shift work, extreme summer heat and late social schedules make Indian circadian patterns distinctive and largely uncharacterised. Medical students are themselves a chronically sleep-deprived, easily studied population.",
    entry: "Fellowships in sleep medicine after any of medicine, psychiatry, neurology or pulmonology. Research entry is unusually cheap — actigraphy and validated questionnaires, not scanners.",
    where: ["Surrey Sleep Research Centre", "Munich (Chronobiology, LMU)", "Harvard Division of Sleep Medicine", "AIIMS and NIMHANS sleep laboratories"],
    startNow: "A chronotype and sleep-quality survey in your own cohort is a genuinely publishable study needing no equipment at all.",
    url: "https://sleepresearchsociety.org/"
  },
  {
    id: "bci",
    name: "Neuroengineering & Brain-Computer Interfaces",
    tagline: "Building the hardware that reads and writes to the nervous system",
    fields: ["neuro", "compbio", "clinical"],
    what: "Implanted and non-invasive interfaces for paralysis, epilepsy, deafness and — increasingly — psychiatric indications. Closed-loop deep brain stimulation for depression and OCD is now in trials.",
    whyIndia: "Assistive neurotechnology is priced for high-income systems. Low-cost EEG-based interfaces are a genuine unsolved engineering-and-clinical problem, and India has the manufacturing base to solve it.",
    entry: "Requires signal processing and some hardware literacy. Medical graduates enter through neurology or neurosurgery research, or through biomedical engineering masters.",
    where: ["EPFL / Wyss Center (Geneva)", "Stanford Neural Prosthetics Lab", "Imperial College", "IIT Bombay and IISc biomedical groups"],
    startNow: "Consumer EEG headsets cost less than a textbook. Record your own signal, filter it, classify something simple. That is the whole first step.",
    url: "https://bcisociety.org/"
  },
  {
    id: "onehealth",
    name: "One Health & Antimicrobial Resistance",
    tagline: "Human, animal and environmental health as one system",
    fields: ["infect", "global", "env", "pubhealth"],
    what: "Zoonotic spillover, antimicrobial resistance and food-system health treated as a single problem. AMR is projected to become one of the largest causes of death worldwide, and India is at the centre of it.",
    whyIndia: "India is among the world's largest consumers of antibiotics in both humans and livestock, and a global epicentre of resistance. Work done here is immediately globally relevant.",
    entry: "MPH or MSc in infectious disease epidemiology, One Health, or veterinary public health. Erasmus Mundus funds several joint One Health masters fully.",
    where: ["LSHTM", "Utrecht One Health", "IMSOGLO Erasmus Mundus consortium", "ICMR AMR surveillance network"],
    startNow: "Your hospital's antibiogram is a dataset. Analysing local resistance patterns is publishable and immediately useful to the people around you.",
    url: "https://www.who.int/health-topics/one-health"
  },
  {
    id: "spacemed",
    name: "Space & Extreme Environment Medicine",
    tagline: "Physiology where the body was never meant to go",
    fields: ["clinical", "neuro", "biochem"],
    what: "How microgravity, hypoxia, isolation and radiation alter human physiology — with direct application to high-altitude and disaster medicine on the ground.",
    whyIndia: "ISRO's human spaceflight programme means India is building an aerospace medicine capability now. India also has more people living at genuine high altitude than almost any other country, and Ladakh-based high-altitude physiology is world-relevant.",
    entry: "Aerospace medicine is a recognised MD specialty in India (Institute of Aerospace Medicine, Bengaluru). International routes run through ESA, NASA and university extreme-physiology groups.",
    where: ["Institute of Aerospace Medicine IAF (Bengaluru)", "King's College London Extreme Environments", "DLR (Germany)", "UTMB Aerospace Medicine"],
    startNow: "If you are anywhere near a high-altitude region, altitude physiology fieldwork is accessible in a way that almost no other frontier field is.",
    url: "https://www.esa.int/About_Us/Careers_at_ESA"
  },
  {
    id: "psychedelic",
    name: "Psychedelic & Novel Therapeutics Research",
    tagline: "A pharmacological class returning to psychiatry after fifty years",
    fields: ["psych", "neuro", "biochem"],
    what: "Controlled trials of psilocybin, MDMA and ketamine analogues for treatment-resistant depression and PTSD, alongside the mechanistic neuroscience of how a single dose produces durable change.",
    whyIndia: "Regulatory constraints make clinical trials difficult in India, but the mechanistic, imaging and modelling work is open to anyone — and ketamine research is already permissible and active.",
    entry: "Psychiatry research training, then a group running trials. Imperial and Johns Hopkins both have dedicated centres and take international researchers.",
    where: ["Imperial College Centre for Psychedelic Research", "Johns Hopkins Center for Psychedelic Research", "Maastricht", "Zurich"],
    startNow: "Read the mechanistic literature rather than the media coverage. The interesting open questions are about plasticity and prediction error, not about the experience.",
    url: "https://www.imperial.ac.uk/psychedelic-research-centre/"
  },
  {
    id: "biobank",
    name: "Biobank & Population Cohort Science",
    tagline: "Answering clinical questions with half a million people at once",
    fields: ["genomics", "pubhealth", "compbio"],
    what: "Using large linked cohorts — UK Biobank, All of Us, GenomeIndia, the Rotterdam Study — to test hypotheses that no single hospital could ever power. Much of it is desk work on data someone else collected.",
    whyIndia: "UK Biobank grants access to approved researchers anywhere in the world, including India, for a modest fee. You can run a study on 500,000 people from Jammu. Almost nobody does.",
    entry: "Apply for data access with a supervisor. R or Python plus epidemiology. No laboratory, no patients, no ethics committee delay.",
    where: ["UK Biobank (remote access worldwide)", "All of Us (US)", "Indian Biological Data Centre / GenomeIndia", "Rotterdam Study"],
    startNow: "Read the UK Biobank access procedure. The realisation that this data is available to you, from India, changes what feels possible.",
    url: "https://www.ukbiobank.ac.uk/enable-your-research"
  }
];

/* ── Clinical practice abroad: the residency and licensing routes ── */
window.DB.residency = [
  {
    id: "usmle",
    name: "USMLE → US Residency (Match)",
    org: "ECFMG / NRMP",
    type: "residency", country: "USA", city: "Various",
    fields: ["clinical", "psych", "neuro"],
    stages: ["clin", "intern", "grad"], funding: "paid",
    money: "Residency salary $60,000–75,000/year · exam costs ≈ ₹4–6 lakh total including travel",
    duration: "Step 1 → Step 2 CK → OET/Pathway → Match → 3–7 years residency",
    window: "ERAS opens Sept · Match results in March",
    deadlineMonths: [9, 10, 11, 12, 1, 2, 3],
    url: "https://www.ecfmg.org/",
    why: "The best-paid and most research-integrated clinical route out of India. Psychiatry is one of the most IMG-friendly specialties in the American Match, and US psychiatry residency includes protected research time — which makes it a genuine physician-scientist pathway, not just an emigration route.",
    reqs: [
      "MBBS from a WDOMS-listed college — verify yours",
      "Step 1 is now pass/fail, so Step 2 CK score and US clinical experience carry the weight",
      "US clinical experience (observership or externship) is close to mandatory",
      "ECFMG certification, including the English proficiency pathway"
    ],
    steps: [
      "Confirm your college is listed in the World Directory of Medical Schools with the ECFMG sponsor note. Do this before spending a rupee.",
      "Step 1 is pass/fail now. The score that matters is Step 2 CK — plan the timeline around it.",
      "Get US clinical experience through observerships and electives during MBBS, not after. It is far harder to arrange as a graduate.",
      "Research output substitutes for a lot in psychiatry and pathology matching. Publications genuinely move the needle for IMGs.",
      "Budget realistically: exams, applications and travel run to several lakh rupees over two to three years."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "ukmla",
    name: "UKMLA / PLAB → UK Training",
    org: "General Medical Council, UK",
    type: "residency", country: "UK", city: "Various",
    fields: ["clinical", "psych"],
    stages: ["intern", "grad"], funding: "paid",
    money: "Foundation/trust doctor salary ≈ £34,000–50,000 · exam and visa costs ≈ ₹3–4 lakh",
    duration: "PLAB/UKMLA → GMC registration → trust job → specialty training",
    window: "Rolling; specialty training applications open Nov",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.gmc-uk.org/registration-and-licensing",
    why: "The lowest-barrier route to a paid clinical job in a high-income country. UK psychiatry is chronically understaffed and actively recruits internationally, with a Royal College training pathway that includes academic clinical fellowships.",
    reqs: ["MBBS + internship completed", "IELTS 7.5 or OET B", "PLAB 1 and 2, or the UKMLA as it replaces them", "GMC registration"],
    steps: [
      "Check the current status of UKMLA versus PLAB before booking anything — the GMC has been transitioning between them.",
      "PLAB 1 can be sat in India; PLAB 2 requires travel to the UK.",
      "Most Indian doctors take a non-training trust job first, then apply into specialty training. That is the normal route, not a failure.",
      "Academic Clinical Fellowships combine psychiatry training with protected research time — apply for those specifically if research is the goal."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 1
  },
  {
    id: "germany-approbation",
    name: "German Approbation → Facharzt Training",
    org: "German State Medical Boards (Landesärztekammer)",
    type: "residency", country: "Germany", city: "Various",
    fields: ["clinical", "psych", "neuro"],
    stages: ["grad"], funding: "paid",
    money: "Assistenzarzt salary ≈ €4,800–5,800/month gross from day one",
    duration: "German B2 → C1 medical → Fachsprachprüfung → Kenntnisprüfung → 5–6 yrs Facharzt",
    window: "Rolling — no annual cycle, apply when ready",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.bundesgesundheitsministerium.de/",
    why: "No entrance exam lottery, no match, no application season — you learn the language, pass a professional exam, and get a salaried training post. Germany has a genuine physician shortage and specialty training pays from the first day. Psychiatry and neurology posts are widely available.",
    reqs: [
      "MBBS + internship",
      "German to B2 general and C1 medical — this is the real barrier and it takes 12–18 months",
      "Fachsprachprüfung (medical language exam) and usually Kenntnisprüfung (knowledge exam)",
      "Recognition of your degree by the state medical board"
    ],
    steps: [
      "Start German now if this interests you at all. Everything else in this pathway is downstream of the language.",
      "Goethe-Institut A1 to B2 in India costs a fraction of what agencies charge for the same thing.",
      "Choose the federal state carefully — recognition procedures and Kenntnisprüfung requirements vary considerably between them.",
      "Avoid paid recruitment agencies until you have B2. Before that they cannot help you and will charge you anyway."
    ],
    indiaSpecific: false, competitiveness: "accessible", workExp: 1
  },
  {
    id: "amc-australia",
    name: "AMC → Australian & New Zealand Practice",
    org: "Australian Medical Council",
    type: "residency", country: "Australia", city: "Various",
    fields: ["clinical", "psych"],
    stages: ["grad"], funding: "paid",
    money: "Resident medical officer ≈ AUD 75,000–95,000/year",
    duration: "AMC MCQ → clinical exam or workplace-based assessment → registration → training",
    window: "Rolling",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.amc.org.au/",
    why: "High salaries, strong working-hours culture and a clear route to permanent residency. Psychiatry is on Australia's skilled occupation shortage lists, which shortens the immigration path considerably.",
    reqs: ["MBBS recognised by the AMC", "IELTS 7.0 across all bands or OET B", "AMC MCQ examination, sittable in India", "Registration with AHPRA"],
    steps: [
      "Sit the AMC MCQ in India first — it is the cheapest way to test your commitment to the pathway.",
      "The workplace-based assessment route is often faster than the clinical examination if you can secure a post.",
      "Check the current skilled occupation list; psychiatry's presence on it changes the visa maths substantially.",
      "New Zealand's NZREX is a parallel and often less contested route into the same region."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 1
  },
  {
    id: "india-pg",
    name: "NEET-PG / INI-CET → MD Psychiatry at a research-active centre",
    org: "National Board / AIIMS / NIMHANS",
    type: "residency", country: "India", city: "Various",
    fields: ["clinical", "psych", "neuro"],
    stages: ["intern", "grad"], funding: "paid",
    money: "Stipend ≈ ₹60,000–95,000/month at government institutions",
    duration: "3 years MD/MS",
    window: "NEET-PG usually mid-year · INI-CET twice yearly",
    deadlineMonths: [3, 4, 5, 6, 10, 11],
    url: "https://natboard.edu.in/",
    why: "Do not let the noise about going abroad obscure this: MD Psychiatry at NIMHANS or AIIMS puts you inside institutions with patient cohorts, biobanks and longitudinal data that no Western centre can access. If your research question is about Indian populations, the best place in the world to answer it may be here.",
    reqs: ["MBBS + internship completed", "NEET-PG or INI-CET rank", "NIMHANS runs its own entrance for some programmes"],
    steps: [
      "Choose the department by its research output, not only by the institution's name. A publishing unit at a mid-tier college beats a silent one at a famous college.",
      "NIMHANS and AIIMS psychiatry both have active genomics, neuroimaging and computational groups.",
      "An MD plus a strong research record makes you eligible for an India Alliance Clinical Fellowship — where you can lead funded research without ever doing a PhD."
    ],
    indiaSpecific: true, competitiveness: "high", workExp: 0
  }
];

/* ── Category- and income-based Indian government schemes.
      Chronically under-used and worth more than most people realise. ── */
window.DB.equity = [
  {
    id: "nos-sc",
    name: "National Overseas Scholarship (NOS)",
    org: "Ministry of Social Justice & Empowerment, Government of India",
    type: "scholarship", country: "Any", city: "Any",
    fields: ["pubhealth", "biochem", "neuro", "compbio", "global", "genomics"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full tuition + annual maintenance (≈ US$15,400 or £9,900) + airfare + visa fees + contingency",
    duration: "Masters (up to 3 yrs) or PhD (up to 4 yrs)",
    window: "First round ~April to early June · a second round opens Sept–Oct only when slots go unfilled",
    deadlineMonths: [4, 5, 6, 9, 10],
    url: "https://nosmsje.gov.in/",
    why: "Fully funded overseas masters or PhD for students from Scheduled Caste, Denotified/Nomadic/Semi-Nomadic tribe, landless agricultural labourer and traditional artisan families. Total family income must be under ₹8 lakh. It is one of the most generous awards available to any Indian student and it is routinely under-subscribed — places go unfilled in some years.",
    reqs: [
      "SC, DNT, landless agricultural labourer or traditional artisan category",
      "Total family income below ₹8 lakh per annum",
      "At least 60 % in the qualifying degree — MBBS qualifies",
      "Admission to a foreign institution ranked in the top 500 QS/THE"
    ],
    steps: [
      "Apply on the NOS portal in the first round, which in the 2026 cycle ran from late April to 2 June.",
      "If you miss it, watch for the second round. The scheme reopens the portal for about 40 days in September or October in any year where slots are left unfilled — which is the clearest evidence there is that this award is under-subscribed.",
      "You need an admission offer or a conditional offer from a top-500 ranked institution.",
      "There is a separate parallel scheme for Scheduled Tribe candidates run by the Ministry of Tribal Affairs — check that one too if it applies.",
      "The income ceiling and category certificate are the two documents that decide the application. Get them issued well in advance; district offices are slow."
    ],
    indiaSpecific: true, competitiveness: "accessible", workExp: 0
  },
  {
    id: "nos-st",
    name: "National Overseas Scholarship for Scheduled Tribe candidates",
    org: "Ministry of Tribal Affairs, Government of India",
    type: "scholarship", country: "Any", city: "Any",
    fields: ["pubhealth", "biochem", "neuro", "global", "genomics"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full tuition + maintenance + airfare + visa and contingency costs",
    duration: "Masters or PhD abroad",
    window: "Typically opens Mar–Jun",
    deadlineMonths: [3, 4, 5, 6],
    url: "https://tribal.nic.in/",
    why: "Twenty fully-funded awards a year for Scheduled Tribe students to study abroad, with an income ceiling of ₹6 lakh. The number of applicants is small enough that a well-prepared application has meaningful odds — a completely different competitive landscape from Chevening or Fulbright.",
    reqs: ["Scheduled Tribe category", "Family income below ₹6 lakh per annum", "Admission to a recognised foreign institution", "Age limit usually 35"],
    steps: [
      "Watch tribal.nic.in from March. The notification is poorly publicised and the window is short.",
      "Category and income certificates must be current — reissue them if they are more than a year old.",
      "This can be combined with a partial university scholarship to cover anything the award does not."
    ],
    indiaSpecific: true, competitiveness: "accessible", workExp: 0
  },
  {
    id: "minority-schemes",
    name: "Minority, OBC and EWS overseas and research support",
    org: "Ministry of Minority Affairs · Ministry of Social Justice · UGC",
    type: "scholarship", country: "Any", city: "Any",
    fields: ["pubhealth", "global", "psych", "biochem"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Interest subsidy on education loans, national fellowships for PhD, and merit-cum-means support",
    duration: "Varies",
    window: "Varies by scheme; most run Feb–Jun",
    deadlineMonths: [2, 3, 4, 5, 6],
    url: "https://scholarships.gov.in/",
    why: "The National Scholarship Portal aggregates dozens of central and state schemes that almost nobody reads through. The education-loan interest subsidy schemes alone can remove several lakh rupees of cost from an overseas degree, and they stack with university funding.",
    reqs: ["Category and income criteria vary by scheme", "Most require an income certificate below a stated ceiling", "Some are loan-linked rather than grant-based"],
    steps: [
      "Spend one hour on scholarships.gov.in filtering by your category and level. Most people never do this once.",
      "Check your STATE's schemes separately — Jammu & Kashmir, Kerala, Tamil Nadu and Maharashtra all run their own overseas education support.",
      "Education loan interest subsidy schemes are the most under-claimed benefit here. If you are taking a loan anyway, check eligibility before signing."
    ],
    indiaSpecific: true, competitiveness: "accessible", workExp: 0
  },
  {
    id: "loan-route",
    name: "The education loan route, honestly assessed",
    org: "SBI Global Ed-Vantage · HDFC Credila · Avanse · Prodigy Finance",
    type: "scholarship", country: "Any", city: "Any",
    fields: ["pubhealth", "clinical", "global", "systems"],
    stages: ["grad", "pg"], funding: "partial",
    money: "₹20 lakh – ₹1.5 crore · collateral-free up to ₹7.5 lakh under the CGFSEL guarantee",
    duration: "Repayment over 10–15 years",
    window: "Apply once you hold an admission offer",
    deadlineMonths: [],
    url: "https://sbi.bank.in/web/personal-banking/loans/education-loans",
    why: "Included here because pretending loans do not exist helps nobody — but so is the arithmetic. A ₹50 lakh loan at 10 % costs roughly ₹65,000 a month for ten years. If the degree does not clearly lead to income in that currency, a funded PhD or a free German masters is not a lesser option, it is a better one.",
    reqs: ["Admission offer", "Co-applicant, usually a parent", "Collateral for larger amounts; up to ₹7.5 lakh can be collateral-free"],
    steps: [
      "Exhaust the funded routes on this site before borrowing. A fully funded PhD pays you; a self-funded masters costs you a decade of repayments.",
      "Prodigy Finance and similar lenders lend without collateral against future earnings for specific institutions — useful, but at higher interest.",
      "Claim the Section 80E tax deduction on education loan interest; it has no upper limit and runs for eight years.",
      "Run the actual monthly repayment number before signing. If it frightens you, that is information, not weakness."
    ],
    indiaSpecific: true, competitiveness: "accessible", workExp: 0
  }
];
