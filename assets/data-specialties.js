/* Dream Counsellor — specialty route maps.
   For each specialty: what it is day to day, how you enter it in India, how you enter
   it abroad, where it leads afterwards, and the thing nobody tells you before you commit
   three years to it. Non-clinical exits included, because they are real careers and
   almost nobody describes them honestly. */

window.DB = window.DB || {};

window.DB.specialties = [
  {
    id: "sp-psych",
    name: "Psychiatry",
    fields: ["psych", "neuro", "global"],
    oneLine: "The only specialty where the diagnostic instrument is still a conversation, and the field currently trying hardest to change that.",
    day: "Outpatient clinics, liaison work on medical wards, crisis assessments, long-term follow-up. Fewer procedures and fewer nights than almost any other specialty, and far more continuity with the same patients over years.",
    india: "NEET-PG or INI-CET → MD Psychiatry (3 years) or DNB. NIMHANS runs its own entrance and is the strongest department in the country. Stipend roughly ₹60,000–95,000/month at government institutions.",
    abroad: [
      "USA — one of the most IMG-friendly specialties in the Match, and US psychiatry residency includes protected research time",
      "UK — MRCPsych after GMC registration; chronic understaffing means active international recruitment, and Academic Clinical Fellowships give 25 % protected research time",
      "Australia — RANZCP training; psychiatry appears on skilled shortage lists, which shortens the immigration path",
      "Germany — Facharzt für Psychiatrie, salaried from day one once you have B2/C1 German"
    ],
    supers: ["Child and adolescent psychiatry", "Addiction medicine", "Forensic psychiatry", "Old age psychiatry", "Consultation-liaison psychiatry", "Neuropsychiatry"],
    research: [
      "Psychiatric genomics — polygenic risk in South Asian populations is a genuine open problem",
      "Computational psychiatry — modelling symptoms mathematically; the barrier to entry is a laptop",
      "Digital phenotyping and voice biomarkers — screening where no psychiatrist exists",
      "Global mental health and task-shifting — the field where Indian research already leads the world",
      "Inflammatory and immune psychiatry"
    ],
    masters: ["MSc Global Mental Health (LSHTM/KCL)", "MSc Psychiatric Research (KCL IoPPN)", "MSc Genomic Medicine", "MSc Health Data Science"],
    fitIf: "People tell you things they tell nobody else. You are more interested in why someone became unwell than in the drug you will prescribe. You can sit with uncertainty for years without needing it resolved.",
    truth: "The pay is lower than procedural specialties in India and the stigma extends to the doctors, not just the patients. You will be asked repeatedly why you are 'wasting' an MBBS. Against that: it is the specialty with the most unanswered questions, the most room for a researcher to matter, and the best working hours of any clinical discipline. If you want to change what medicine knows rather than apply what it already knows, there is more open ground here than anywhere else."
  },
  {
    id: "sp-neuro",
    name: "Neurology",
    fields: ["neuro", "clinical", "compbio"],
    oneLine: "Localise the lesion, then work out what it is. The most intellectually formalised bedside reasoning in medicine.",
    day: "Detailed examinations, imaging review, stroke calls, epilepsy and movement disorder clinics, electrophysiology. Increasingly interventional at the stroke end.",
    india: "MD Medicine (3 years) → DM Neurology (3 years) via NEET-SS. Long route. Alternatively DNB Neurology. NIMHANS, AIIMS, SCTIMST Trivandrum and CMC Vellore are the strongest centres.",
    abroad: [
      "USA — Neurology residency is 4 years and directly entered after the Match, not after internal medicine, which is significantly faster than India's MD-then-DM route",
      "UK — MRCP then neurology specialty training; Queen Square is the largest neuroscience centre in Europe",
      "Australia — RACP physician training then neurology advanced training",
      "Germany — Facharzt für Neurologie, salaried throughout"
    ],
    supers: ["Stroke and neurointervention", "Epilepsy and clinical neurophysiology", "Movement disorders", "Neuromuscular disease", "Neuroimmunology", "Behavioural neurology and dementia", "Sleep medicine"],
    research: [
      "Connectomics and network neuroscience",
      "EEG signal processing and low-cost diagnostics — the translation gap is where most of the opportunity is",
      "Neuroimmunology — autoimmune encephalitis rewrote what a psychiatric presentation can mean",
      "Brain-computer interfaces and neuroprosthetics",
      "Neurogenetics in consanguineous populations, where India has data almost nobody else can access"
    ],
    masters: ["MSc Clinical Neuroscience (UCL)", "MSc Neuroscience (Oxford)", "MSc Neuroimaging", "Neuromatch Academy for the computational side"],
    fitIf: "You like the diagnostic puzzle more than the fix. You are patient with slow disease. Pattern recognition across a physical examination genuinely satisfies you.",
    truth: "In India this is a seven-year post-MBBS commitment through two separate competitive entrances, and it is one of the hardest DM seats to get. Going abroad shortens it dramatically — US neurology is a four-year residency entered directly. That single structural difference is one of the strongest arguments for leaving that exists in any specialty, and very few students are told about it before they commit to the Indian route."
  },
  {
    id: "sp-commed",
    name: "Community Medicine & Public Health",
    fields: ["pubhealth", "global", "systems", "env"],
    oneLine: "The specialty that treats populations. Consistently the most underrated choice in Indian medicine and the one with the widest international ceiling.",
    day: "Surveillance, outbreak investigation, programme design and evaluation, health policy, teaching, field studies. Very little bedside work and a great deal of data, travel and negotiation.",
    india: "MD Community Medicine (3 years) via NEET-PG — historically among the easier MD seats to obtain, which says nothing about the ceiling of the career. Alternatively an MPH at PGIMER, PHFI's Indian Institutes of Public Health, TISS or CMC Vellore.",
    abroad: [
      "UK — Public Health specialty training, or MSc/MPH at LSHTM, which is the global reference institution",
      "USA — MPH then a career at the CDC, WHO, Gates Foundation, PATH or a university; Harvard's accelerated MPH-45 accepts MBBS as the doctoral degree",
      "Australia — the ANU Master of Applied Epidemiology places you inside a health department doing real outbreak investigation as your degree",
      "Field Epidemiology Training Programmes — India runs its own EIS with the NCDC and US CDC"
    ],
    supers: ["Field epidemiology", "Health economics and health technology assessment", "Implementation science", "Environmental and occupational health", "Health informatics and surveillance", "Global health policy"],
    research: [
      "Implementation science — why proven treatments never reach the people who need them",
      "Climate and health, where South Asian data gaps are repeatedly flagged as a global priority",
      "Health economics of mental health and task-shifting",
      "Large public cohorts — the NFHS is fully public and chronically under-analysed",
      "Antimicrobial resistance and One Health"
    ],
    masters: ["MPH (LSHTM, Harvard, Hopkins, Melbourne)", "MSc Epidemiology (Imperial, Oxford)", "MSc Health Economics", "MSc Health Data Science"],
    fitIf: "Your anger is systemic rather than individual. You would rather prevent a thousand cases than treat one brilliantly. You can tolerate slow feedback loops and institutional politics.",
    truth: "In India this specialty carries low prestige and people will assume you took it because you had to. Internationally it is the opposite — an MBBS with an MPH from a serious school is the standard profile at WHO, the Gates Foundation and every major health NGO, and the ceiling is genuinely global. The gap between how this specialty is regarded inside India and outside it is the largest of any discipline on this list, and that arbitrage is available to anyone willing to ignore the local status hierarchy."
  },
  {
    id: "sp-medicine",
    name: "Internal Medicine",
    fields: ["clinical", "infect", "nutrition", "compbio"],
    oneLine: "The broadest clinical training there is, and the gateway to most subspecialties.",
    day: "Ward rounds, undifferentiated admissions, complex multi-system patients, outpatient continuity. Heavy on-call load in most systems.",
    india: "MD General Medicine (3 years) via NEET-PG — one of the most competitive seats. Then DM in a subspecialty via NEET-SS, or practice as a physician.",
    abroad: [
      "USA — Internal Medicine is the most IMG-friendly residency in the Match by volume, and the standard route into cardiology, gastroenterology and endocrinology fellowships",
      "UK — MRCP then specialty training; India-trained physicians are heavily represented",
      "Australia — RACP basic then advanced training",
      "Germany — Facharzt für Innere Medizin"
    ],
    supers: ["Cardiology", "Gastroenterology", "Endocrinology", "Nephrology", "Rheumatology", "Infectious disease", "Medical oncology", "Critical care", "Geriatrics"],
    research: [
      "Metabolic disease — India carries a diabetes epidemic and undernutrition simultaneously, in the same population",
      "Antimicrobial resistance, where India is a global epicentre",
      "Clinical prediction models and machine learning on electronic records",
      "Cardiometabolic genomics in South Asians, whose risk profile differs from every population the guidelines were built on"
    ],
    masters: ["MSc Clinical Epidemiology (NIHES Rotterdam)", "MPH", "MSc Health Data Science", "MRes in a subspecialty"],
    fitIf: "You want the widest possible clinical foundation before narrowing. You like complexity and are comfortable being the person who has to hold the whole picture.",
    truth: "It is the safest choice and also the longest road to anything specific — the subspecialty you actually want is another entrance exam and another three years away. Internationally, US internal medicine residency is the single highest-volume route for Indian graduates, which makes it both the most achievable and the most crowded. If research is your real interest, note that a research-track residency or an academic clinical fellowship is a fundamentally different life from a standard one, and you have to select for it deliberately."
  },
  {
    id: "sp-surgery",
    name: "General Surgery & surgical specialties",
    fields: ["clinical", "onco"],
    oneLine: "The specialty where the intervention is immediate and the feedback is same-day.",
    day: "Theatre lists, ward rounds, emergency operating, outpatient clinics. Long hours, physically demanding, and the most hierarchical training culture in medicine.",
    india: "MS General Surgery (3 years) via NEET-PG, then MCh superspecialty via NEET-SS. Highly competitive and heavily dependent on the volume and teaching culture of your unit.",
    abroad: [
      "UK — MRCS then core and higher surgical training; a long path but well-defined",
      "USA — Surgery is one of the HARDEST specialties for an IMG to match into; be realistic and have a research-heavy application",
      "Australia — RACS training is notoriously difficult to enter for international graduates",
      "Germany — Facharzt für Chirurgie, more accessible than the Anglophone routes once your German is at C1"
    ],
    supers: ["Surgical oncology", "Transplant surgery", "Paediatric surgery", "Cardiothoracic", "Neurosurgery", "Plastic and reconstructive", "Trauma and acute care", "Minimal access and robotic surgery"],
    research: [
      "Global surgery — the Lancet Commission estimated five billion people lack access to safe surgical care, and it is now a funded academic field in its own right",
      "Surgical outcomes research and registries",
      "Robotics, image guidance and intraoperative AI",
      "Low-cost surgical device design, where Indian engineering and clinical need meet"
    ],
    masters: ["MSc Global Surgery", "MSc Surgical Science / Education", "MPH for the health-systems side of surgical access"],
    fitIf: "You want to fix things with your hands and see the result today. You tolerate hierarchy and long hours. You are decisive under pressure.",
    truth: "Two honest warnings. First, US surgical residency is among the least IMG-accessible routes in the Match — going in with only a good Step score is not a plan. Second, surgical training rewards volume and mentorship above all, and those vary enormously between Indian units in a way rankings do not capture; the unit matters more than the institution. Global surgery, however, is a genuinely open academic field with real funding and very few people in it — and it is the natural home for a surgeon whose anger is about access rather than technique."
  },
  {
    id: "sp-paeds",
    name: "Paediatrics",
    fields: ["repro", "clinical", "nutrition", "infect"],
    oneLine: "Where preventive medicine and clinical medicine are the same job.",
    day: "Outpatient clinics, neonatal and paediatric wards, developmental follow-up, vaccination, working with families as much as patients.",
    india: "MD Paediatrics (3 years) via NEET-PG, then DM in a subspecialty. Consistently one of the more sought-after seats.",
    abroad: [
      "USA — Paediatrics is relatively IMG-friendly in the Match",
      "UK — MRCPCH then specialty training",
      "Australia — RACP paediatric training",
      "Global health organisations recruit paediatricians heavily for maternal and child health programmes"
    ],
    supers: ["Neonatology", "Paediatric neurology and neurodevelopment", "Paediatric oncology", "Paediatric cardiology", "Developmental and behavioural paediatrics", "Paediatric infectious disease"],
    research: [
      "Early-life determinants of adult disease — the developmental origins hypothesis, where Indian cohorts are internationally important",
      "Malnutrition and the double burden of under- and over-nutrition",
      "Neurodevelopmental disorders and early autism detection, where digital screening tools could work at scale",
      "Vaccine effectiveness and hesitancy"
    ],
    masters: ["MSc Paediatric Global Health", "MPH with a maternal and child health track", "MSc Nutrition for Global Health (LSHTM)"],
    fitIf: "You are good with frightened people. You want prevention and treatment to be the same conversation. Long-term developmental outcomes interest you more than acute rescue.",
    truth: "Emotionally the heaviest specialty on this list, and nobody warns students about that honestly before they choose. It is also the specialty where a single intervention buys the most life-years, and where global health funding is most concentrated — maternal and child health is the best-funded area in global health by a wide margin, which makes it unusually easy to build an international career from."
  },
  {
    id: "sp-obgyn",
    name: "Obstetrics & Gynaecology",
    fields: ["repro", "clinical", "global"],
    oneLine: "Surgical, medical and public-health work in one specialty, on the health outcome India is most judged by internationally.",
    day: "Deliveries, theatre, antenatal and gynaecology clinics, emergencies at every hour. Among the highest-intensity specialties anywhere.",
    india: "MS/MD Obstetrics & Gynaecology (3 years) via NEET-PG. Highly competitive.",
    abroad: [
      "UK — MRCOG, which is sittable in India and internationally portable",
      "USA — OB-GYN is difficult for IMGs to match into; be realistic",
      "Australia — RANZCOG training",
      "Global health — maternal health is among the most heavily funded areas in the entire field"
    ],
    supers: ["Maternal-fetal medicine", "Reproductive endocrinology and IVF", "Gynaecological oncology", "Urogynaecology", "Family planning and reproductive rights"],
    research: [
      "Maternal mortality reduction and implementation science — India's numbers are the field's headline statistic",
      "PCOS, which carries a substantial and under-investigated mental health burden and sits where hormonal and psychiatric signals intersect",
      "Adolescent reproductive health and menstrual health, badly under-studied in South Asia",
      "Preeclampsia biomarkers and prediction"
    ],
    masters: ["MSc Reproductive and Sexual Health Research (LSHTM)", "MPH", "MSc Global Health"],
    fitIf: "You want surgery and medicine and advocacy at once. You are unbothered by unpredictable hours. Women's health being treated as a footnote makes you angry.",
    truth: "Medico-legal risk is higher here than in any other Indian specialty and that shapes the practice environment considerably. The counterweight is that this is where the largest global funding pools sit, where the most measurable population impact is available, and where an Indian researcher's data is internationally significant almost by default. MRCOG is unusually portable and can be started from India."
  },
  {
    id: "sp-anaes",
    name: "Anaesthesiology & Critical Care",
    fields: ["clinical", "compbio"],
    oneLine: "Applied physiology in real time, and the specialty most amenable to being augmented by algorithms.",
    day: "Theatre, intensive care, pre-operative assessment, resuscitation, pain management. Shift-based, which means genuinely defined hours in most systems.",
    india: "MD Anaesthesiology (3 years) via NEET-PG, then DM Critical Care or a pain fellowship. Seats are relatively more available than in medicine or surgery.",
    abroad: [
      "UK — anaesthesia training after GMC registration; the primary FRCA is sittable early",
      "USA — Anaesthesiology is moderately IMG-accessible and well compensated",
      "Australia — ANZCA training",
      "Germany — Facharzt für Anästhesiologie; among the specialties with the greatest German demand"
    ],
    supers: ["Critical care medicine", "Cardiac anaesthesia", "Neuroanaesthesia", "Pain medicine", "Transplant anaesthesia", "Paediatric anaesthesia"],
    research: [
      "Physiological signal processing and closed-loop control — the most directly computational bedside specialty",
      "Sepsis prediction models on ICU data; MIMIC, the reference public critical care dataset, is free after a short training module",
      "Perioperative outcomes and enhanced recovery",
      "Delirium and long-term cognitive outcomes after critical illness"
    ],
    masters: ["MSc Critical Care", "MSc Health Data Science", "MSc Pain Management"],
    fitIf: "You want physiology to be the daily subject rather than a first-year memory. You like defined shifts. You are calm when things go wrong quickly.",
    truth: "The most invisible specialty in the hospital — patients rarely know your name and families rarely thank you. Set against that: the best hours-to-income ratio in clinical medicine, high international demand, and by far the richest continuous physiological data of any specialty. If your flow state is finding patterns in a dataset, the ICU generates more of it per patient per hour than anywhere else in the building."
  },
  {
    id: "sp-radiology",
    name: "Radiology & Imaging",
    fields: ["clinical", "compbio", "onco", "neuro"],
    oneLine: "The specialty where machine learning arrived first, and where the argument about what that means is still being had.",
    day: "Reporting, multidisciplinary meetings, image-guided procedures. Largely screen-based, which makes it one of the most remote-compatible specialties in medicine.",
    india: "MD Radiodiagnosis (3 years) via NEET-PG — consistently among the most competitive seats in the country.",
    abroad: [
      "USA — Radiology is difficult for IMGs to match into and highly sought after",
      "UK — FRCR, which is sittable in India and is one of the most portable qualifications in medicine",
      "Australia — RANZCR training",
      "Teleradiology — genuine remote work for international clients, from India"
    ],
    supers: ["Neuroradiology", "Interventional radiology", "Paediatric radiology", "Breast imaging", "Nuclear medicine and molecular imaging", "Cardiac imaging"],
    research: [
      "Imaging AI — the most mature clinical machine learning field, and the one with the clearest regulatory pathway",
      "Neuroimaging biomarkers in psychiatry and dementia",
      "Radiomics in oncology",
      "Low-resource imaging: making diagnosis work where the scanner is a portable ultrasound and there is no radiologist"
    ],
    masters: ["MSc Neuroimaging", "MSc Health Data Science", "MSc Medical Imaging / Image Computing (UCL, KCL)"],
    fitIf: "You are a strong visual pattern-matcher. You want deep involvement in diagnosis without owning the ward. You are curious rather than defensive about what algorithms can do.",
    truth: "You will hear repeatedly that AI is going to replace radiologists. The evidence so far says the opposite. It is changing the job, not removing it, and the radiologists who understand the models are the ones shaping how they are deployed. If your instinct is to build things, this is the clinical specialty where that instinct is most immediately useful. FRCR being sittable from India also makes it one of the most portable qualifications available."
  },
  {
    id: "sp-path",
    name: "Pathology, Microbiology & Laboratory Medicine",
    fields: ["biochem", "genomics", "onco", "infect", "compbio"],
    oneLine: "Where the diagnosis is actually made, and the closest clinical specialty to a research laboratory.",
    day: "Reporting histopathology and cytology, running the laboratory, molecular diagnostics, multidisciplinary meetings. Predictable hours and almost no emergency call.",
    india: "MD Pathology or MD Microbiology (3 years) via NEET-PG. Less competitive than clinical specialties, which is not a reflection of the ceiling.",
    abroad: [
      "USA — Pathology is one of the most IMG-friendly residencies in the Match, and research output counts heavily",
      "UK — FRCPath",
      "Molecular diagnostics and genomics laboratories worldwide recruit medical graduates directly"
    ],
    supers: ["Haematopathology", "Molecular pathology and genomics", "Cytopathology", "Forensic pathology", "Clinical microbiology and infection control", "Transfusion medicine"],
    research: [
      "Clinical genomics and variant interpretation — a growing profession in its own right",
      "Digital pathology and computational image analysis",
      "Antimicrobial resistance surveillance; your own hospital's antibiogram is already a dataset",
      "Biomarker discovery, which is where laboratory medicine meets every other specialty"
    ],
    masters: ["MSc Genomic Medicine", "MSc Molecular Medicine", "MSc Biochemistry / MRes", "MSc Bioinformatics"],
    fitIf: "You want the mechanism, not the bedside. Predictable hours matter to you. You are as interested in the tissue as in the person.",
    truth: "The most direct clinical route into molecular research, and the most underrated by Indian students who read low competition as low value. Pathology is one of the friendliest US residencies for international graduates precisely because it selects on research output rather than clinical charisma, which means a strong publication record can carry you where a Step score alone cannot. If your flow state is a laboratory, this is the specialty that lets you stay in one and still be a doctor."
  },
  {
    id: "sp-nonclinical-md",
    name: "The non-clinical MDs: Biochemistry, Physiology, Pharmacology, Anatomy",
    fields: ["biochem", "genomics", "compbio", "neuro"],
    oneLine: "Three-year MD degrees that almost nobody chooses deliberately, and that lead somewhere very different from where students assume.",
    day: "Teaching, laboratory work, research supervision, and diagnostic service in the case of biochemistry. No wards, no call, and real time to think.",
    india: "MD Biochemistry, MD Physiology, MD Pharmacology or MD Anatomy (3 years) via NEET-PG. Among the least competitive seats in the country, which is a statement about student preference, not about where the degree can take you.",
    abroad: [
      "These map cleanly onto international research careers rather than clinical ones",
      "A funded PhD abroad is often a better move than one of these MDs if research is the only goal — European and US doctorates pay a salary and take medical graduates directly",
      "MD Pharmacology leads into pharmaceutical medicine, clinical trials and regulatory affairs, all of which are internationally portable and well paid"
    ],
    supers: ["Clinical biochemistry and metabolic medicine", "Clinical pharmacology and therapeutics", "Molecular diagnostics", "Medical education"],
    research: [
      "Metabolomics and the biochemistry of psychiatric and metabolic disease",
      "Pharmacogenomics — CYP450 variation across South Asian populations is genuinely under-studied and clinically consequential",
      "Neurochemistry and neuropharmacology",
      "Anything requiring sustained laboratory time, which clinical specialties structurally cannot give you"
    ],
    masters: ["Often unnecessary — go straight for a funded PhD instead", "MSc Molecular Medicine if you want to move abroad first", "MSc Clinical Pharmacology"],
    fitIf: "You are honestly more interested in mechanism than in patients. You want time and a laboratory. Teaching appeals to you. You are unbothered by the status hierarchy in an Indian medical college.",
    truth: "This is the most misunderstood entry on the whole site. These seats are the least contested in the NEET-PG counselling and students treat them as failure, but MD Biochemistry followed by an India Alliance clinical fellowship, or MD Pharmacology followed by a career in clinical trials, are perfectly good lives that involve far less suffering than the alternatives. The genuine caution is different: if pure research is the goal, a funded PhD abroad usually beats a non-clinical MD, because it pays you a salary, trains you better in method, and travels further. Choose the MD if you want to stay in India and teach; choose the PhD if you want to run your own research programme."
  },
  {
    id: "sp-emergency",
    name: "Emergency & Family Medicine",
    fields: ["clinical", "systems", "pubhealth"],
    oneLine: "The two specialties India is shortest of, and the two that international systems recruit hardest for.",
    day: "Emergency: undifferentiated presentations, resuscitation, rapid decisions, shift work. Family medicine: continuity, breadth, and the only specialty that treats the whole household.",
    india: "MD Emergency Medicine or MD Family Medicine (3 years) via NEET-PG, or DNB Family Medicine, which has more seats and is often overlooked.",
    abroad: [
      "UK — GP training is one of the most accessible routes for an international graduate and leads to genuinely good working conditions",
      "Australia and New Zealand — general practice and emergency medicine both appear on skilled shortage lists",
      "Canada — family medicine residency is two years, the shortest route to independent practice anywhere",
      "USA — Family Medicine and Emergency Medicine are both IMG-accessible in the Match"
    ],
    supers: ["Pre-hospital and retrieval medicine", "Toxicology", "Disaster and humanitarian medicine", "Palliative care", "Sports medicine", "Rural and remote medicine"],
    research: [
      "Health systems and access research. This is the frontline of who does and does not get care",
      "Triage prediction models",
      "Humanitarian and disaster health, where MSF and WHO recruit directly",
      "Primary care implementation science"
    ],
    masters: ["MPH", "MSc Humanitarian Health (Hopkins)", "MSc Palliative Medicine", "Diploma in Tropical Medicine and Hygiene"],
    fitIf: "You want breadth over depth. Shift work suits you, or continuity does. You would rather be useful in many situations than expert in one.",
    truth: "Both specialties carry low status in India and high status almost everywhere else, which is one of the clearest arbitrages available to a medical graduate. Canadian family medicine is two years to independent practice — the fastest route to being a fully qualified, well-paid, autonomous doctor of any pathway on this entire site. Nobody mentions this in Indian medical colleges because the local status hierarchy makes it invisible."
  },
  {
    id: "sp-exit",
    name: "Leaving clinical medicine — the honest options",
    fields: ["systems", "compbio", "global", "psych"],
    oneLine: "Real careers that use the degree without a ward. Included because pretending they do not exist helps nobody.",
    day: "Varies entirely. What they share is that the MBBS is the qualification that gets you in, and clinical judgement is the thing you are being paid for.",
    india: "No further degree required for most. Some benefit from an MBA, MPH or a data qualification.",
    abroad: [
      "Health technology and clinical AI — product and clinical roles at companies building diagnostic tools; a clinician who can code is genuinely scarce",
      "Pharmaceutical medicine — medical affairs, medical science liaison, clinical development; internationally portable and well paid",
      "Regulatory affairs — CDSCO, FDA and EMA submissions, increasingly including AI-based medical devices",
      "Global health programme management — WHO, Gates Foundation, PATH, MSF, national health missions",
      "Health economics and HTA — deciding what a health system should pay for",
      "Medical writing, science communication and medical education",
      "Consulting — healthcare practices at the large firms recruit doctors deliberately",
      "Bioethics and health policy — a field currently writing the rules for AI in medicine with very few clinically trained people in the room"
    ],
    supers: ["Digital health product management", "Clinical data science", "Medical device regulation", "Health policy and governance"],
    research: [
      "Health services research",
      "Implementation and dissemination science",
      "Regulatory science for AI-based medical devices, an almost empty field",
      "Health economics and outcomes research"
    ],
    masters: ["MPH", "MBA (healthcare)", "MSc Health Data Science", "MSc Health Policy / Bioethics", "MSc Health Economics"],
    fitIf: "The clinical work is not what draws you, and you have known that for a while. You would rather change the system than work inside it. Or you want a life where your hours are yours.",
    truth: "Nobody in an Indian medical college will tell you this without judgement, so here it is plainly: leaving clinical medicine is not a failure and the degree is not wasted. What these roles actually pay for is clinical judgement — knowing what a patient is, what a trial means, what a guideline misses. That is not a transferable skill you can pick up elsewhere, which is exactly why these industries recruit doctors specifically. The honest caveat is that autonomy and portability are what this buys you, not an easy life. Research and industry both have politics, rejection and pressure. What changes is that your hours and your location become yours — and against Indian clinical medicine, that difference is enormous."
  }
];
