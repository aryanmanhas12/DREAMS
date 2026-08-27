/* Dream Counsellor — frontier fields and specialty routes added August 2026.

   The frontier list had a bias worth naming: it leaned heavily on the
   brain — psychiatric genomics, computational psychiatry, neuroethics,
   neuroimmunology, BCI. Those are real, and they are also what a
   neuroscience-inclined author reaches for first. This batch deliberately
   goes elsewhere, and applies one filter throughout: India is not a
   footnote in any of these fields. It is either the largest affected
   population, the place the innovation actually happened, or both.

   Snakebite kills more people in India than anywhere on earth. AMR's
   sharpest edge is here. The world's cheapest CAR-T was built in Bombay.
   Global surgery's unmet-need denominator is rural India. A student reading
   this does not have to leave to work on any of them, which is the whole
   argument of this site, made in fields nobody named in five years of
   lectures. */

window.DB = window.DB || {};
window.DB.frontiers   = window.DB.frontiers   || [];
window.DB.specialties = window.DB.specialties || [];
window.DB.research    = window.DB.research    || [];
window.DB.impact      = window.DB.impact      || {};

/* ═══════════════════════ FRONTIER FIELDS ═══════════════════════ */

window.DB.frontiers.push(
  {
    id: "snakebite",
    name: "Snakebite Envenoming & Neglected Tropical Disease",
    tagline: "The disease that kills most in your country and is studied least",
    fields: ["clinical", "global", "pubhealth", "env"],
    what: "Snakebite envenoming was only reclassified by WHO as a category A neglected tropical disease in 2017, and carries a 2030 target of halving death and disability. The science runs from antivenom immunology and recombinant antibodies through to ambulance logistics and community first aid. It is one of the few fields where a laboratory question and a health-systems question sit inside the same problem.",
    whyIndia: "India records roughly 58,000 snakebite deaths a year from somewhere between 0.77 and 1.24 million envenomings — more than any other country, and close to half the world's total. South-East Asia carries almost 70 % of global snakebite deaths. India launched its National Action Plan for Prevention and Control of Snakebite Envenoming in March 2024. Indian antivenom is raised against four species and performs poorly against several regionally important snakes it was never designed for, which is an unsolved problem sitting in your own district hospital.",
    entry: "You do not need a further degree to start. A rural or district posting, a casualty rotation, or a community medicine department is the entry point. From there: MSc/PhD in toxinology, tropical medicine or epidemiology, or a clinical research fellowship. The Liverpool and Oxford tropical groups both take clinicians directly.",
    where: ["Liverpool School of Tropical Medicine (Centre for Snakebite Research)", "Oxford Tropical Medicine / MORU", "ICMR institutes and the NAP-SE network", "Kasturba Medical College and other high-burden district centres", "IDDO / WHO NTD programmes"],
    startNow: "Audit the snakebite admissions your own hospital saw last year — time from bite to antivenom, vials used, outcome. That data almost certainly is not published anywhere, and the WHO 2030 target is failing for lack of exactly it. A retrospective case series from one district hospital is a real, publishable contribution and needs no funding.",
    url: "https://www.who.int/teams/control-of-neglected-tropical-diseases/snakebite-envenoming"
  },
  {
    id: "amr-phage",
    name: "Antimicrobial Resistance & Phage Therapy",
    tagline: "The slow pandemic, with its epicentre where you already work",
    fields: ["infect", "global", "pubhealth", "genomics"],
    what: "Two joined problems: understanding and slowing the spread of resistant organisms, and finding what replaces antibiotics when they fail. Bacteriophage therapy — treating infection with the viruses that kill bacteria — has moved from Soviet-era curiosity to serious compassionate-use programmes and registered trials in the last decade.",
    whyIndia: "India is the single most consequential place on earth for this. Over-the-counter antibiotic sales, enormous pharmaceutical manufacturing effluent, high infection burden and dense living conditions produce resistance patterns years ahead of the West — carbapenem resistance in Indian ICUs is a routine clinical reality, not a projection. Anything learned here arrives everywhere else later. That makes an Indian clinician a primary source rather than a collaborator.",
    entry: "Microbiology or infectious disease is the obvious route, but hospital-infection-control work and antimicrobial stewardship committees are open to any clinician and are where the usable data lives. Then: MSc in infectious disease or a funded PhD in microbial genomics. Sequencing skills matter more than culture skills now.",
    where: ["Christian Medical College Vellore", "ICMR-NIRT and the AMR surveillance network", "Wellcome Sanger Institute", "GARDP (Geneva)", "Eliava Institute (Tbilisi) for phage", "Liverpool and LSHTM tropical groups"],
    startNow: "Pull your own hospital's antibiogram for the last two years and look at one organism's resistance trend. Most Indian hospitals generate this and nobody analyses it. That is a paper, and it is also the thing that gets you into a stewardship committee, which is where the field actually opens.",
    url: "https://www.who.int/health-topics/antimicrobial-resistance"
  },
  {
    id: "global-surgery",
    name: "Global Surgery",
    tagline: "Five billion people cannot get an operation, and it is a research field",
    fields: ["clinical", "global", "systems", "pubhealth"],
    what: "The discipline created by the 2015 Lancet Commission on Global Surgery, which established that 5 billion people lack access to safe, affordable surgical and anaesthesia care — 3.3 billion of them in low- and middle-income countries. It is measured through six indicators covering access, workforce, volume, mortality and the financial catastrophe an operation causes a family. This is surgery studied as a health system rather than as a technique.",
    whyIndia: "The Indian numbers are the argument. Analyses of the Commission's indicators for India found that only about 6.8 % of the need for major surgical operations was met in rural India, and the blood supply deficit and the rural surgical workforce are named as the two highest priorities. If you are a surgical trainee in India who wants to matter beyond the operating list, the unmet need is not abroad. It is one district away.",
    entry: "Any surgical, anaesthetic or obstetric trainee can enter through an audit. Formal routes: MPH or MSc in global health, the Harvard Program in Global Surgery and Social Change, or a research post attached to a surgical department. No fellowship is required to publish your first indicator study.",
    where: ["Program in Global Surgery and Social Change, Harvard", "King's Centre for Global Health", "WHO Emergency and Essential Surgical Care programme", "AIIMS and CMC surgical departments running LCoGS indicator work", "Lancet Regional Health — Southeast Asia"],
    startNow: "Measure one of the six indicators for your own hospital's catchment — the simplest is the proportion of the population within two hours of a facility that can deliver caesarean section, laparotomy and open fracture care. It is a map and a denominator, it costs nothing, and it is exactly what the Commission asks countries to report and most have not.",
    url: "https://www.pgssc.org/"
  },
  {
    id: "accessible-celltherapy",
    name: "Accessible Cell & Gene Therapy",
    tagline: "India built the world's cheapest CAR-T. That is now a field.",
    fields: ["onco", "genomics", "biochem", "systems"],
    what: "Engineering a patient's own immune cells to attack their cancer, and the separate, harder problem of making that affordable. CAR-T abroad costs on the order of a crore per patient, which puts it outside the reach of nearly every Indian family and most health systems on earth. The frontier is no longer only whether the biology works; it is manufacturing, supply chain, toxicity management and price.",
    whyIndia: "NexCAR19, developed out of IIT Bombay with Tata Memorial Centre and incubated through BIRAC, became India's first indigenous CAR-T approved by CDSCO — delivering comparable efficacy at close to a tenth of the global cost, with a lower rate of cytokine release syndrome in its trial cohort of 64 patients and no reported neurotoxicity. It has since treated several hundred patients. This is the clearest recent case of Indian translational science solving a problem the rest of the world had priced out of reach, and the people who built it are still in the country.",
    entry: "Medical oncology, haematology or transfusion medicine clinically; or immunology and bioprocess engineering on the science side. A medical graduate is unusually useful here because toxicity management — CRS, ICANS — is a bedside skill the engineers do not have.",
    where: ["Tata Memorial Centre, Mumbai", "IIT Bombay / ImmunoACT", "CMC Vellore haematology", "BIRAC-funded cell therapy programmes", "international sites for comparison, but the interesting work is here"],
    startNow: "Read the published NexCAR19 trial data properly, then ask your haematology department what happens to a relapsed ALL patient who cannot pay. Understanding that gap concretely is what separates people who work on access from people who talk about it.",
    url: "https://immunoact.com/"
  },
  {
    id: "biodesign-devices",
    name: "Medical Device Innovation & Biodesign",
    tagline: "Clinicians see the unmet need; almost none are trained to build the fix",
    fields: ["clinical", "systems", "compbio"],
    what: "A structured method — observe clinical practice, identify and filter unmet needs, invent, then navigate regulation and reimbursement — that came out of Stanford and was deliberately transplanted to India. It treats the clinician as the origin of the invention rather than its end user, which is the inversion the field rests on.",
    whyIndia: "Devices designed for well-resourced hospitals fail in Indian settings for unglamorous reasons: power, consumables, calibration, cost, maintenance. A device designed here for here often works everywhere, and the reverse is rarely true. India has a government-funded pipeline for exactly this through the Department of Biotechnology, which most medical students have never heard of despite it paying a stipend.",
    entry: "The School of International Biodesign fellowship at AIIMS New Delhi and IIT Delhi takes medical graduates into mixed teams with engineers, designers and MBAs. It is listed as a programme on this site, and it pays. No engineering background is required; being the clinician in the room is the contribution.",
    where: ["School of International Biodesign — AIIMS New Delhi & IIT Delhi", "Stanford Byers Center for Biodesign", "IIT Kanpur / KGMU SIB-SHInE", "BIRAC BioNEST incubators", "Jhpiego and PATH device programmes"],
    startNow: "Keep a needs notebook for one month on the wards. Write down every time something is worked around with tape, a syringe, a repurposed tube or a nurse's improvisation. That list is the raw material of the entire method, and it is only visible to someone standing where you are standing.",
    url: "https://schoolofbiodesign.in/"
  },
  {
    id: "hta-econ",
    name: "Health Technology Assessment & Health Economics",
    tagline: "Somebody decides what the state pays for. It should be someone clinical.",
    fields: ["systems", "pubhealth", "global"],
    what: "The formal evaluation of whether a drug, device or programme is worth public money — cost-effectiveness modelling, budget impact analysis, and the ethics of the threshold you set. It is the discipline that turns a clinical trial result into a decision about whether a state health scheme covers it.",
    whyIndia: "Ayushman Bharat covers a vast population against a finite budget, and every package rate is implicitly an HTA decision. India has a formal Health Technology Assessment body under the Department of Health Research to do this work. The people who build those models are overwhelmingly economists; clinicians who understand both the disease and the discounting are rare enough to be immediately useful, and the decisions being made are enormous.",
    entry: "MSc in health economics, or an MPH with a health-economics stream. Modelling is done in Excel, R and TreeAge. This is learnable without leaving your job. A clinician who can build a Markov model is a genuinely scarce combination.",
    where: ["Department of Health Research HTA network (India)", "PHFI health economics groups", "University of York Centre for Health Economics", "LSHTM and Imperial health economics", "NICE International"],
    startNow: "Take one decision your own hospital makes routinely — which stent, which insulin, which screening interval — and build the simplest possible cost-effectiveness comparison for it. The exercise teaches the method faster than a course, and it forces you to find out what things actually cost, which most clinicians never learn.",
    url: "https://www.icmr.gov.in/"
  }
);

/* ═══════════════════════ SPECIALTY ROUTES ═══════════════════════ */

window.DB.specialties.push(
  {
    id: "sp-derm",
    name: "Dermatology",
    fields: ["clinical", "genomics", "global"],
    oneLine: "The most competitive seat in Indian postgraduate medicine, chosen by many for the lifestyle and by almost nobody for the science, which is where the opening is.",
    day: "Almost entirely outpatient, high volume, largely diagnostic by pattern recognition. Procedures if you want them — biopsies, lasers, aesthetics. Predictable hours, very few nights, and the rare clinical specialty where private practice is genuinely viable early.",
    india: "NEET-PG or INI-CET → MD Dermatology, Venereology and Leprology (3 years) or DNB. Consistently among the highest closing ranks in the country, which is the whole difficulty. Stipend roughly ₹60,000–95,000/month at government institutions.",
    abroad: [
      "USA — one of the hardest specialties in the Match for an IMG; realistically requires a US research year and exceptional scores, and many enter via a research fellowship first",
      "UK — dermatology training after MRCP; competitive but far more achievable than the US route",
      "Australia — highly competitive ACD training with limited posts",
      "Germany — Facharzt für Dermatologie, salaried, and the most accessible of the four once you have C1 German"
    ],
    supers: ["Dermatopathology", "Paediatric dermatology", "Dermatologic surgery and lasers", "Leprosy and infectious dermatology", "Immunodermatology and autoimmune blistering disease", "Teledermatology"],
    research: [
      "Teledermatology and AI image triage — skin is the one organ a phone camera can already see, and almost every trained model was built on pale skin",
      "Leprosy — India carries the majority of the world's new case detections and it remains scientifically unfinished",
      "Cutaneous manifestations of systemic disease in South Asian populations, which are under-described",
      "Vitiligo, atopic dermatitis and the immunology behind the new biologics",
      "Occupational and climate-related dermatoses in outdoor workers"
    ],
    masters: ["MSc Clinical Dermatology (Queen Mary / Cardiff)", "MSc Genomic Medicine", "MSc Health Data Science", "Diploma in Tropical Medicine for the infectious side"],
    fitIf: "You are a visual thinker who diagnoses by pattern. You want a clinical career with a life attached to it, and you are honest that this matters to you. You can tolerate a very high volume of brief consultations.",
    truth: "The competition is the point and also the trap. People spend three and four attempts chasing this seat because of the lifestyle and the private income, and the ones who arrive without any interest in the science find a career of acne and cosmetics that pays well and bores them. The scientific ground is real — dermatology AI is being trained almost entirely on white skin, and that failure is being documented right now by people who have access to the patients you see daily. If you want this seat, have a reason beyond the timetable."
  },
  {
    id: "sp-ophthal",
    name: "Ophthalmology",
    fields: ["clinical", "global", "compbio", "pubhealth"],
    oneLine: "The specialty where India genuinely leads the world — not in publications, but in having solved the delivery problem everyone else is still describing.",
    day: "Outpatient clinics with heavy instrument use, and an operating list that is high-volume and highly repeatable. Cataract surgery is among the most cost-effective interventions in all of medicine. Emergencies exist but are uncommon; hours are among the best of any surgical field.",
    india: "NEET-PG or INI-CET → MS Ophthalmology (3 years) or DNB. AIIMS's Dr R.P. Centre, Aravind, LV Prasad and Sankara Nethralaya are internationally serious institutions and their fellowships are sought after globally. Stipend roughly ₹60,000–95,000/month at government institutions.",
    abroad: [
      "USA — very difficult in the Match; the common route is a research or clinical fellowship after Indian training rather than a US residency",
      "UK — ophthalmic specialist training after FRCOphth part 1; competitive but real",
      "Australia — RANZCO training, small intake",
      "The unusual truth: an Aravind or LV Prasad fellowship is a stronger international credential in this specialty than in any other, and people fly to India for it"
    ],
    supers: ["Retina (medical and surgical)", "Cornea and refractive", "Glaucoma", "Paediatric ophthalmology and strabismus", "Oculoplasty", "Community ophthalmology"],
    research: [
      "Diabetic retinopathy screening by AI — the single most mature clinical AI application anywhere, and India is where it is being deployed at scale",
      "Cataract surgical delivery models — Aravind's assembly-line system is studied at Harvard Business School and was built in Madurai",
      "Retinopathy of prematurity, which is rising sharply in India as neonatal survival improves",
      "Gene therapy for inherited retinal dystrophy",
      "Corneal transplantation and eye banking logistics"
    ],
    masters: ["MSc Public Health for Eye Care (LSHTM)", "MSc Health Data Science", "MPH for community ophthalmology", "Fellowships at Aravind or LV Prasad"],
    fitIf: "You want microsurgery with a short learning loop and a visible result. You like technology and instruments. You are drawn to a field where a twelve-minute operation can return someone's sight and their livelihood in one afternoon.",
    truth: "The field's ceiling in India is unusually high and its floor is unusually comfortable, which makes it easy to coast. LSHTM runs an entire masters in public health for eye care because blindness is a systems problem, not a surgical one, and most of the world's avoidable blindness is cataract that simply never reached a table. If you take this specialty and only operate, you have taken the easiest version of it."
  },
  {
    id: "sp-ortho",
    name: "Orthopaedics & Trauma",
    fields: ["clinical", "systems", "global"],
    oneLine: "India's road traffic injury burden is among the worst on earth, and trauma systems research is almost entirely unclaimed.",
    day: "Heavy operating lists, fracture clinics, and an emergency load that does not negotiate. Physically demanding in a way few specialties still are. Long training, long hours, and outcomes you can usually see.",
    india: "NEET-PG or INI-CET → MS Orthopaedics (3 years) or DNB. Consistently competitive. Stipend roughly ₹60,000–95,000/month at government institutions. Superspecialty via MCh or fellowship.",
    abroad: [
      "UK — the most established route; MRCS then trauma and orthopaedic training, and Indian graduates are well represented",
      "USA — extremely difficult in the Match; research fellowships are the realistic entry",
      "Australia and New Zealand — competitive AOA training, and trauma fellowships take international candidates",
      "Germany — Facharzt für Orthopädie und Unfallchirurgie, salaried, C1 German required"
    ],
    supers: ["Arthroplasty", "Spine", "Paediatric orthopaedics", "Hand and microsurgery", "Sports medicine", "Orthopaedic oncology", "Trauma systems"],
    research: [
      "Trauma systems and pre-hospital care — India loses an enormous number of preventable deaths in the gap between the crash and the hospital, and that gap is barely measured",
      "Global surgery indicators for open fracture care, which is one of the Lancet Commission's three bellwether procedures",
      "Implant cost and access — the same plate can differ tenfold in price and outcome data is thin",
      "Osteoporosis and fragility fracture in South Asian populations",
      "Return-to-work and disability outcomes, which almost nobody follows up"
    ],
    masters: ["MSc Trauma Sciences (Queen Mary)", "MSc Global Health / MPH for trauma systems", "MSc Orthopaedic Engineering", "Diploma in Sports Medicine"],
    fitIf: "You want to fix things mechanically and see them work. You are physically robust and unbothered by unpredictable hours. You are drawn to trauma rather than repelled by it.",
    truth: "It is the specialty where the gap between what you do for one patient and what could be done for a population is widest, and almost nobody in it looks at the population end. Road traffic injury is a leading killer of young Indians and pre-hospital care is close to absent in most of the country. That is a research career sitting untouched next to a very busy operating list. The physical toll is real and people rarely mention it until their forties."
  },
  {
    id: "sp-pmr",
    name: "Physical Medicine & Rehabilitation",
    fields: ["clinical", "systems", "global", "neuro"],
    oneLine: "The specialty that treats what medicine leaves behind, and the one an ageing, surviving India will need most and has least of.",
    day: "Outpatient and rehabilitation-ward based, working in teams with physiotherapists, occupational therapists, prosthetists and speech therapists. Long relationships with patients across months. Procedures if you want them — spasticity injections, ultrasound-guided work, electrodiagnosis. Almost no nights.",
    india: "NEET-PG or INI-CET → MD Physical Medicine and Rehabilitation (3 years) or DNB. Far less competitive than the glamour specialties, which is a genuine opportunity rather than a consolation. Stipend roughly ₹60,000–95,000/month at government institutions.",
    abroad: [
      "USA — PM&R is one of the more IMG-accessible specialties in the Match and is well paid",
      "UK — rehabilitation medicine after MRCP; a small specialty with real demand",
      "Australia — AFRM training with shortage-list status in places",
      "Germany — Facharzt für Physikalische und Rehabilitative Medizin"
    ],
    supers: ["Spinal cord injury", "Neurorehabilitation and stroke", "Prosthetics and orthotics", "Paediatric rehabilitation and cerebral palsy", "Pain medicine", "Musculoskeletal and sports rehabilitation"],
    research: [
      "Assistive technology designed for Indian cost and terrain — a wheelchair built for a smooth floor is useless in most of the country",
      "Stroke rehabilitation delivery where no rehabilitation service exists — task-shifting to family caregivers is a live research question",
      "Disability measurement and the enormous undercount in Indian data",
      "Brain-computer interfaces and neuroprosthetics, which arrive in this specialty before any other",
      "Return-to-work outcomes after trauma, which is where PM&R meets global surgery"
    ],
    masters: ["MSc Rehabilitation Science", "MSc Assistive Technology / Disability Studies", "MPH with a disability focus", "MSc Clinical Neuroscience for the neurorehab route"],
    fitIf: "You measure success in function rather than in cure. You work well in teams and do not need to be the only decision-maker. You are more interested in the person's life after the illness than in the acute episode.",
    truth: "It is chosen late and often by people who did not get what they wanted, and that is a misreading of the field. India has an enormous and growing population of stroke, trauma and cerebral palsy survivors and almost no rehabilitation capacity to meet it — the specialty is undersupplied precisely because it is undervalued. The work is slow and the wins are partial; if you need dramatic outcomes this will frustrate you. If you want a field where you can still define how it is practised in your country, there are very few left, and this is one."
  },
  {
    id: "sp-palliative",
    name: "Palliative Medicine",
    fields: ["clinical", "psych", "global", "systems"],
    oneLine: "The specialty built on the admission that not everything is curable, and the one where India has a genuine world model in Kerala.",
    day: "Outpatient clinics, home visits, inpatient consults across every other specialty, and long conversations that are the actual clinical work. Symptom control, opioid prescribing, and family meetings. Emotionally demanding in a way that is different from being busy.",
    india: "NEET-PG → MD Palliative Medicine (3 years), a young and small specialty in India with limited seats but very limited competition. Also entered through fellowships and diplomas after any base specialty. Tata Memorial, AIIMS, CMC Vellore and the Kerala network are the main centres.",
    abroad: [
      "UK — palliative medicine after MRCP; a well-established specialty with structured training",
      "Australia — RACP training, and palliative care is a recognised shortage area",
      "USA — hospice and palliative medicine as a fellowship after a base residency",
      "The field is small everywhere, which means the international community is genuinely reachable. You can know most of the people working on your question"
    ],
    supers: ["Paediatric palliative care", "Cancer pain", "Palliative care in heart failure and end-stage organ disease", "Community and home-based care", "Bereavement and psychosocial care"],
    research: [
      "The Kerala community model — neighbourhood volunteer networks delivering palliative care at population scale, studied worldwide and built entirely in India",
      "Opioid access, where India's regulatory history is itself the case study: morphine availability collapsed under narcotics law and was partially restored by amendment",
      "Serious illness communication in cultures where the diagnosis is often disclosed to the family before the patient",
      "Integrating palliative care into non-cancer disease, which is where the unmet need is largest",
      "Measuring quality of death, which almost no Indian data captures"
    ],
    masters: ["MSc Palliative Medicine (Cardiff / King's)", "MSc Global Health", "Diploma in Palliative Medicine", "MSc Medical Ethics for the decision-making side"],
    fitIf: "People already tell you difficult things and you do not flinch. You think the conversation is the intervention. You can hold the fact that your patient will die and still find the work meaningful rather than futile.",
    truth: "You will be asked why you trained for years to 'give up on people', and that question never quite stops. The honest answer is that symptom control is technical medicine and the communication is a learnable clinical skill, and that most doctors do both badly because nobody taught them. Kerala's model means an Indian trainee has something to teach the field rather than only to learn from it. Burnout is real here and the specialty knows it better than most, which is why supervision and team structure are taken seriously — more so than in the specialties that pretend the problem does not exist."
  }
);

/* ═══════════════════════ PROGRAMMES ═══════════════════════ */

window.DB.research.push(
  {
    id: "dhr-fellowship-abroad",
    name: "DHR Short-Term and Long-Term Fellowship Abroad",
    org: "Department of Health Research, Ministry of Health & Family Welfare",
    type: "fellowship", country: "India", city: "Held at an international host institute",
    fields: ["clinical", "pubhealth", "genomics", "infect", "onco", "neuro"],
    stages: ["pg"], funding: "full",
    money: "Government-funded fellowship abroad under the DHR Human Resource Development scheme · free to apply",
    duration: "15 days to 3 months (short-term) · 6 to 12 months (long-term)",
    window: "Annual call, opened 22 April with a 30 June close in the 2026-27 cycle, then extended",
    deadlineMonths: [4, 5, 6, 7],
    url: "https://schemes.dhr.gov.in/hrd",
    why: "The Indian government will pay for you to train abroad and come back, and almost no medical graduate knows this scheme exists. It is designed explicitly to build a pool of health research personnel by putting Indian clinicians inside international laboratories in emerging areas of clinical and health science. The age limits are the giveaway that this is not aimed at students — below 45 for the long-term fellowship and below 57 for the short-term — which means it stays open for essentially your entire working career, unlike almost everything else on this site.",
    reqs: [
      "Long-term (6–12 months): below 45 years on the closing date",
      "Short-term (15 days–3 months): below 57 years on the closing date",
      "A health research role and an international host institution willing to take you",
      "Free to apply, through the DHR/ICMR international fellowship portal"
    ],
    steps: [
      "Secure the host first. The scheme funds you to go somewhere specific; it does not find the somewhere. Approach the group the way you would for any fellowship — read their work, write to the group leader, ask for a defined period.",
      "Read the eligibility and guidelines on the DHR HRD page before drafting, because the terms are revised between cycles and the amended guidelines are published as a separate PDF.",
      "Choose short-term if you are still building a case. Fifteen days to three months is enough to learn a technique and start a collaboration, and it is far easier to be released from your post for.",
      "Note the selection warning DHR prints itself: applying to a specific international institute carries no guarantee of selection. Have a second host in mind.",
      "This call has been extended in recent cycles, as most DHR calls are. Aim at the advertised date and treat any extension as a margin, not a plan."
    ],
    zeroCost: true, indiaSpecific: true, competitiveness: "medium", workExp: 2
  },
  {
    id: "sib-biodesign",
    name: "School of International Biodesign — iFellowship in Medical Device Innovation",
    org: "AIIMS New Delhi & IIT Delhi, under the Department of Biotechnology",
    type: "fellowship", country: "India", city: "New Delhi",
    fields: ["clinical", "systems", "compbio"],
    stages: ["grad", "pg"], funding: "full",
    money: "₹60,000/month stipend, plus travel costs and health cover · free to apply",
    duration: "1 year",
    window: "Applications accepted twice a year",
    deadlineMonths: [1, 2, 3, 7, 8, 9],
    url: "https://schoolofbiodesign.in/index.php/fellowship/",
    why: "A government-funded year that pays a medical graduate a real stipend to invent a medical device, inside a team with engineers, designers and MBAs, hosted between AIIMS and IIT Delhi. The Stanford biodesign method treats the clinician as the origin of the invention. You are in the room because you are the only person who has watched the problem happen. For anyone who has ever improvised a fix on a ward and thought someone should build this properly, this is the structured version of that thought, and it is one of very few routes on this site that pays you to leave clinical work temporarily without leaving medicine.",
    reqs: [
      "Graduates and postgraduates from medicine, engineering, design or management — MBBS qualifies directly",
      "Selection favours a demonstrated track record of innovation and willingness to work in a mixed team",
      "No engineering background needed; being the clinician is the contribution"
    ],
    steps: [
      "Before applying, keep a needs notebook on the wards for a month — every workaround, every improvised fix. The application and the interview both reward specific observed problems over general enthusiasm for innovation.",
      "Apply as someone who will still be a doctor afterwards. The strongest medical fellows treat this as clinical training in a different medium, not as an exit.",
      "Two intakes a year means missing one costs six months rather than a year. Check the current cycle on the fellowship page.",
      "Look also at the SIB-SHInE programme run by IIT Kanpur with KGMU Lucknow if Delhi does not suit — the model has been replicated."
    ],
    zeroCost: true, indiaSpecific: true, competitiveness: "medium", workExp: 0
  }
);

window.DB.impact["dhr-fellowship-abroad"] = {
  t: 1,
  odds: "Competitive but a small, self-selecting field — most eligible people never hear of it",
  effort: "20 hrs, free to apply, plus the time to secure a host",
  note: "The Indian government paying for an Indian clinician to train abroad and return, with an age ceiling of 45 or 57 rather than 30. That means it is still open when nearly everything else on this site has closed, and almost nobody applies."
};
window.DB.impact["sib-biodesign"] = {
  t: 2,
  odds: "Small cohort, two intakes a year",
  effort: "20 hrs, free to apply",
  note: "₹60,000 a month to spend a year inventing a device at AIIMS and IIT Delhi, with no engineering background required. The rare programme that pays a medic to step sideways without stepping out of medicine."
};
