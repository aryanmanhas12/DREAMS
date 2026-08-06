/* Dream Counsellor — the second ring of the world.

   Everything in this file exists because the first version of the index had a
   gravity problem: UK, US, Australia, Germany. Those four absorb almost every
   Indian medical student's attention and almost every application, which is
   exactly why they are the hardest places to win anything.

   The countries here are not consolation prizes. Belgium runs the tropical
   medicine institute that trains WHO staff. Portugal runs one of the best
   funded neuroscience doctorates in Europe. Taiwan and Korea both pay a full
   salary to international doctoral students and receive a fraction of the
   applications the equivalent German or British programme does. The point of
   this file is that scarcity of applicants is itself an opportunity, and nobody
   tells medical students that.

   Facts only. Grades, odds and verdicts live in window.DB.impact at the bottom,
   the same separation the rest of the data uses. */

window.DB = window.DB || {};
window.DB.study = window.DB.study || [];
window.DB.funding = window.DB.funding || [];
window.DB.research = window.DB.research || [];
window.DB.countries = window.DB.countries || {};

/* ─────────────────────────── country profiles ─────────────────────────── */

Object.assign(window.DB.countries, {
  Lithuania: {
    name: "Lithuania",
    climate: "cold",
    winter: "−5 to 0 °C, snow from December to March, grey for months",
    summer: "18–25 °C, long bright evenings",
    daylight: "About 7.5 hours in December — the dark is the part people underestimate",
    cost: "₹45,000–70,000/month including rent. One of the cheapest routes to an EU degree.",
    diaspora: "growing fast — Kaunas has a large and well-organised Indian student community",
    vegFood: "manageable",
    food: "Lithuanian cuisine is meat and potatoes, but Kaunas and Vilnius both have Indian grocers and restaurants that exist precisely because of the student population. Cooking for yourself is normal and cheap.",
    mentalHealth: "Universities provide counselling, though English-language provision is thin. Lithuania has historically had one of Europe's highest suicide rates and is investing heavily in services; do not assume the infrastructure matches Western Europe.",
    people: "Reserved on first meeting and warm once you are known — closer to Nordic than Mediterranean. Younger Lithuanians speak good English; older generations often do not.",
    visa: "National D visa then a temporary residence permit. As an EU member state, the degree is recognised across the EU and the residence permit allows travel in Schengen.",
    work: "20 hours/week during term once you hold a residence permit.",
    allergy: "Birch pollen in April and May is significant. Damp winters aggravate asthma.",
    honest: "This is the pragmatic entry to Europe, and it should be chosen with open eyes. LSMU is a genuine, EU-accredited university with real research, and it is also the destination of a very large number of Indian students, which means the experience can become an Indian bubble if you let it. The degree opens the EU. It does not open the UK or US without further examinations."
  },

  Belgium: {
    name: "Belgium",
    climate: "temperate",
    winter: "2–8 °C, wet and overcast more than genuinely cold",
    summer: "18–25 °C",
    daylight: "About 8 hours in December",
    cost: "₹85,000–1.3 lakh/month in Antwerp or Leuven",
    diaspora: "moderate",
    vegFood: "easy",
    food: "Antwerp and Brussels are properly multicultural with established Indian and Pakistani districts. Vegetarian eating is straightforward.",
    mentalHealth: "Good university provision, English-speaking psychologists available in both Antwerp and Leuven.",
    people: "Understated and direct without being cold. Flanders is Dutch-speaking and Brussels is French-speaking; English works at the institutes but learning some Dutch changes daily life considerably.",
    visa: "Student visa type D. Belgium is Schengen, and the Institute of Tropical Medicine has decades of experience processing scholarship students from South Asia and Africa.",
    work: "20 hours/week during term. VLIR-UOS scholars receive a stipend that removes the need.",
    allergy: "Grass and birch pollen in spring; damp air is hard on asthma.",
    honest: "Belgium is on this list almost entirely for one institution. The Institute of Tropical Medicine in Antwerp is one of three or four places on earth that seriously trains people for tropical and global health practice, and its scholarships are ring-fenced for people from countries like India. Outside of ITM and KU Leuven, Belgium is not a particular destination for an Indian medical graduate."
  },

  Portugal: {
    name: "Portugal",
    climate: "warm",
    winter: "8–16 °C in Lisbon — mild, but housing is poorly heated and feels colder indoors than out",
    summer: "20–32 °C, dry and bright",
    daylight: "About 9.5 hours in December",
    cost: "₹70,000–1 lakh/month in Lisbon; less elsewhere",
    diaspora: "established — Portugal has a long-standing Goan and Gujarati population",
    vegFood: "manageable",
    food: "Fish and pork dominate traditional food, but Lisbon has a real Indian community and Portuguese cooking uses more vegetables than Spanish. Goan food exists here as a native cuisine, not an import.",
    mentalHealth: "University and institute counselling available; private English-speaking therapy is affordable by Western European standards.",
    people: "Genuinely warm and unhurried, and among the easiest Europeans for an Indian student to make friends with. The historical Goa connection is understood and often remarked on kindly.",
    visa: "Student residence visa; Portugal is Schengen and has one of Europe's more workable post-study residence routes.",
    work: "20 hours/week permitted. Fully funded doctoral students do not need it.",
    allergy: "Olive and grass pollen in spring. Very low humidity in summer suits most people.",
    honest: "Portugal is underrated in exactly the way this site exists to correct. The Champalimaud neuroscience programme is world class and pays a full stipend, the weather and the people are the gentlest adjustment on this list, and the cost of living is the lowest in Western Europe. What Portugal does not have is a broad research base — it is a small number of excellent institutions, not a deep national system."
  },

  Norway: {
    name: "Norway",
    climate: "cold",
    winter: "−5 to 2 °C in Oslo and far colder inland; Bergen is wet rather than frozen",
    summer: "15–22 °C, and light almost around the clock",
    daylight: "About 6 hours in December in Oslo, and none at all above the Arctic circle",
    cost: "₹1.5–2.2 lakh/month. Among the most expensive countries in the world.",
    diaspora: "small",
    vegFood: "manageable",
    food: "Oslo has Indian grocers and the Pakistani community is long-established, so spices and lentils are available. Eating out is punishingly expensive; almost everyone cooks.",
    mentalHealth: "Excellent, well-funded and genuinely destigmatised. The winter dark is taken seriously as a health issue rather than as a personal weakness.",
    people: "Reserved to the point that many international students find the first year lonely, and then unusually loyal once a friendship forms. Nearly everyone speaks fluent English.",
    visa: "Student residence permit, which requires proof you hold roughly NOK 150,000 for living costs — this financial requirement stops more people than the academic one.",
    work: "20 hours/week permitted.",
    allergy: "Birch pollen in spring is severe. Very low pollution otherwise.",
    honest: "Read this before you build a plan on old advice: Norway charged non-EU students no tuition for decades and stopped in autumn 2023. Public universities now charge international students real fees. Norway remains outstanding for global health at Bergen and for a working culture that protects your evenings, but the free-tuition Norway that circulates in student forums no longer exists. Verify current fees on the university's own page."
  },

  Denmark: {
    name: "Denmark",
    climate: "cold",
    winter: "0–5 °C, wind that makes it feel worse, grey",
    summer: "17–23 °C",
    daylight: "About 7 hours in December",
    cost: "₹1.3–1.9 lakh/month in Copenhagen",
    diaspora: "small but present",
    vegFood: "easy",
    food: "Copenhagen is a serious food city with good vegetarian provision and Indian grocers in Nørrebro.",
    mentalHealth: "Strong provision and low stigma. Universities have dedicated international-student psychologists.",
    people: "Egalitarian, informal and hard to befriend quickly — the same Nordic pattern. Workplace hierarchy is genuinely flat, which surprises people trained in Indian medical culture.",
    visa: "Student residence permit. Denmark is Schengen and has an established post-study job search scheme.",
    work: "20 hours/week, 37 in summer.",
    allergy: "Birch and grass pollen in spring.",
    honest: "Copenhagen's global health and epidemiology teaching is excellent and its summer school catalogue is one of the cheapest credible ways to test the field. Non-EU tuition is high and scholarships are limited — Denmark is realistic as a funded doctorate or a short course, and difficult as a self-funded masters."
  },

  "South Korea": {
    name: "South Korea",
    climate: "temperate",
    winter: "−6 to 3 °C in Seoul, dry and bright",
    summer: "25–33 °C, humid, with a real monsoon",
    daylight: "About 9.5 hours in December",
    cost: "₹60,000–1 lakh/month — GKS covers this entirely",
    diaspora: "small",
    vegFood: "hard",
    food: "Honest warning: fish stock, anchovy and shrimp paste are in a great many dishes that look vegetarian, and the concept is not widely understood. Seoul has Indian restaurants and a Muslim quarter in Itaewon with halal and vegetarian food. Outside Seoul it is difficult and you will cook.",
    mentalHealth: "University counselling exists and English-language support is improving, but stigma in wider Korean society is significant and academic pressure is intense.",
    people: "Formal, hierarchical and hard-working, with strong senior-junior conventions that are recognisable to anyone who has trained in an Indian hospital. Warm in private, reserved in public.",
    visa: "D-2 student visa. GKS scholars get administrative support through the programme, including a year of Korean language training.",
    work: "Permitted with approval after six months; GKS scholars do not need it.",
    allergy: "Spring yellow dust and fine-particle pollution from March to May is a genuine respiratory issue. Take it seriously if you are asthmatic.",
    honest: "The Global Korea Scholarship is one of the most complete funding packages in the world — flight, tuition, a monthly stipend, medical insurance and a year of paid language training — and it is quietly under-applied from India relative to its generosity. The real costs are food if you are strictly vegetarian, and a research culture with long hours."
  },

  Taiwan: {
    name: "Taiwan",
    climate: "warm",
    winter: "14–20 °C in Taipei, damp",
    summer: "27–35 °C, very humid, with typhoons from July to September",
    daylight: "About 10.5 hours in December",
    cost: "₹45,000–75,000/month — low, and TIGP stipends cover it comfortably",
    diaspora: "small",
    vegFood: "easy",
    food: "One of the genuinely easiest countries on this list for a vegetarian. Taiwan has a large Buddhist vegetarian tradition, and 素食 restaurants are everywhere and clearly marked.",
    mentalHealth: "Reasonable university provision; English-speaking counselling available in Taipei.",
    people: "Widely described by international students as the friendliest place in East Asia. Genuinely helpful to strangers, curious about foreigners, low-hostility.",
    visa: "Resident visa then an ARC. Academia Sinica handles the paperwork for its doctoral students.",
    work: "Permitted with a work permit; TIGP fellows are funded and do not need it.",
    allergy: "Dust mites and mould thrive in the humidity — the main issue for anyone with allergic asthma. Air quality is moderate.",
    honest: "Academia Sinica's Taiwan International Graduate Program is a fully funded English-language doctorate with a real stipend, at a research institute that publishes seriously in molecular biology and computational biology, and almost no Indian medical student has heard of it. The weakness is that a Taiwanese doctorate carries less name recognition with Indian and Western employers than its research quality deserves."
  },

  Thailand: {
    name: "Thailand",
    climate: "hot",
    winter: "22–32 °C — there is no winter",
    summer: "28–38 °C, humid, monsoon from June to October",
    daylight: "About 11.5 hours in December",
    cost: "₹35,000–60,000/month in Bangkok — the cheapest destination on this site outside India",
    diaspora: "large and long-established",
    vegFood: "easy",
    food: "Thai food is vegetable-heavy and Bangkok has a large Indian community around Phahurat with proper Indian groceries. Watch for fish sauce, which is in almost everything by default — the phrase you need is 'jay' (เจ), meaning strict vegetarian.",
    mentalHealth: "Mahidol has student services; private English-speaking psychiatry in Bangkok is good and affordable.",
    people: "Warm, non-confrontational and welcoming. The cultural distance from India is smaller than any Western destination on this list.",
    visa: "Non-immigrant ED visa, straightforward for admitted students. Four hours' flight from most Indian metros.",
    work: "Restricted for students — plan on the scholarship or your savings.",
    allergy: "Humidity, mould and Bangkok's air quality in the burning season (February to April) are the real issues.",
    honest: "Mahidol's tropical medicine school is genuinely world-ranked in its field and sits in the region where tropical disease actually is — which matters more than it sounds. It is close, cheap, warm and culturally easy. What it is not is a name that impresses a Western academic committee, so choose it for the training and the fieldwork, not for the letterhead."
  },

  "South Africa": {
    name: "South Africa",
    climate: "warm",
    winter: "5–18 °C in Johannesburg, dry and sunny; Cape Town is wet in winter",
    summer: "16–30 °C",
    daylight: "About 10 hours in June, which is their winter",
    cost: "₹50,000–85,000/month",
    diaspora: "very large — one of the oldest Indian communities outside India",
    vegFood: "easy",
    food: "Durban has the largest Indian population of any city outside India and its own century-old Indian cuisine. Johannesburg and Cape Town both have full Indian grocery provision.",
    mentalHealth: "University counselling available; the wider system is stretched. Private care is good in the major cities.",
    people: "Direct, hospitable and used to Indian communities as part of the national fabric rather than as newcomers. English is an official language and the medium of instruction.",
    visa: "Study visa through the South African mission. Processing can be slow — start early.",
    work: "20 hours/week permitted with a study visa endorsement.",
    allergy: "Highveld grass pollen and dry winter air in Johannesburg; Cape Town has a long spring pollen season.",
    honest: "The honest part is security: crime is a genuine constraint on daily life in a way it is not in the other countries here, and it shapes where you can live and how you move at night. Weighed against that, Wits and UCT do HIV, tuberculosis and health-systems research at a level nowhere else can match, because the epidemiology is on their doorstep. If infectious disease or health systems is your field, this is one of the few places where the work is more advanced than in the West."
  },

  "New Zealand": {
    name: "New Zealand",
    climate: "temperate",
    winter: "3–12 °C in Dunedin, wet and windy",
    summer: "12–24 °C",
    daylight: "About 9 hours in June, their winter",
    cost: "₹1–1.5 lakh/month",
    diaspora: "large and growing",
    vegFood: "easy",
    food: "Auckland and Wellington have substantial Indian populations and full grocery provision. Dunedin is a small student city — stock up.",
    mentalHealth: "Good university provision and a genuinely open culture about it.",
    people: "Informal, friendly, unpretentious. Small-country social networks mean you are known quickly.",
    visa: "Student visa; post-study work rights are reasonable and the country actively recruits health workers.",
    work: "20 hours/week during term, full-time in holidays.",
    allergy: "Very high grass pollen in spring and the world's highest rates of childhood asthma — worth knowing if you are asthmatic. Air is otherwise exceptionally clean.",
    honest: "Otago's public health and preventive medicine teaching is strong and the country is a comfortable adjustment. It is remote — a long, expensive flight from India — and the research base is small, so a doctorate here means a smaller field of supervisors than in Australia."
  },

  Poland: {
    name: "Poland",
    climate: "cold",
    winter: "−4 to 2 °C, snow, grey",
    summer: "18–27 °C",
    daylight: "About 8 hours in December",
    cost: "₹45,000–70,000/month",
    diaspora: "growing, concentrated around the medical universities",
    vegFood: "manageable",
    food: "Traditional Polish food is meat-heavy but Kraków, Warsaw and Wrocław all have Indian restaurants and grocers. Cooking is cheap.",
    mentalHealth: "Provision is thin in English. Do not assume Western European levels of support.",
    people: "Reserved and formal at first, hospitable once known. English is widespread among the young.",
    visa: "National D visa then a residence card. EU member, Schengen.",
    work: "Permitted for students holding a residence card.",
    allergy: "Winter smog in Kraków and other southern cities is among the worst in Europe — a real consideration for asthmatics.",
    honest: "Poland deserves a plain assessment rather than a brochure. It is an affordable, EU-accredited route and its English-taught medical programmes are legitimate. It is also heavily marketed to Indian families by agents who take a commission, the research output is modest, and a Polish degree does not shortcut licensing anywhere. Choose it if EU access at low cost is the actual goal, and go in without illusions about the research."
  },

  Austria: {
    name: "Austria",
    climate: "cold",
    winter: "−2 to 5 °C in Vienna, snow, crisp rather than damp",
    summer: "18–28 °C",
    daylight: "About 8.5 hours in December",
    cost: "₹90,000–1.3 lakh/month in Vienna; ISTA salaries cover it well",
    diaspora: "moderate",
    vegFood: "easy",
    food: "Vienna has excellent vegetarian provision and a real Indian community.",
    mentalHealth: "Good provision, and ISTA specifically runs support for its international doctoral students.",
    people: "Formal, correct, initially cool. Vienna consistently ranks at the top of global liveability surveys and consistently mid-table on how easy it is to make friends — both are true at once.",
    visa: "Student residence permit; ISTA employs its doctoral students, which changes the visa route to an employment-based one and simplifies it.",
    work: "Doctoral students at ISTA hold employment contracts rather than needing work permission.",
    allergy: "Ragweed in late summer is significant in eastern Austria.",
    honest: "The Institute of Science and Technology Austria pays its doctoral students a full salary, charges no fees, teaches entirely in English and admits people with a bachelor's degree directly. It is small, extremely well funded, and mostly unknown to Indian medical students because it does not look like a medical school. If computational neuroscience or quantitative biology is where you are heading, this is one of the best-value doctorates in Europe."
  },

  Spain: {
    name: "Spain",
    climate: "warm",
    winter: "8–16 °C in Barcelona",
    summer: "22–31 °C, humid on the coast",
    daylight: "About 9.5 hours in December",
    cost: "₹75,000–1.1 lakh/month in Barcelona",
    diaspora: "moderate",
    vegFood: "manageable",
    food: "Barcelona is cosmopolitan with good vegetarian options and Indian grocers in the Raval. Traditional Spanish food is difficult for strict vegetarians — ham is treated as a vegetable.",
    mentalHealth: "University provision is adequate; private English-speaking therapy is available in Barcelona.",
    people: "Sociable, late-running, physically warm. Among the easier European cultures to enter socially, though close friendships still cluster around language.",
    visa: "Student visa; Spain is Schengen with a workable post-study route.",
    work: "30 hours/week permitted, unusually generous.",
    allergy: "Olive and plane-tree pollen in spring; plane trees line Barcelona's streets and catch people out.",
    honest: "ISGlobal in Barcelona is a serious global health research institute with strong ties to Africa and South Asia, and its masters is taught in English. Spanish academic salaries are low and the wider system is bureaucratic; come for ISGlobal specifically rather than for Spain generally."
  },

  /* Two regional profiles rather than country ones. Both exist because an entry
     in this index points at a group of countries rather than one — and without
     a profile the climate, food and allergy matching silently does nothing for
     that entry, which is a failure you cannot see. A shared profile is honest
     here because the members really do share a climate. */
  Baltics: {
    name: "the Baltic states",
    climate: "cold",
    winter: "−6 to 0 °C, snow from December to March, and dark",
    summer: "18–25 °C with very long evenings",
    daylight: "Around 6.5–7.5 hours in December, less as you go north to Tallinn",
    cost: "₹45,000–75,000/month across Lithuania, Latvia and Estonia",
    diaspora: "growing, concentrated around the medical universities in Kaunas and Riga",
    vegFood: "manageable",
    food: "Meat and potatoes traditionally, with Indian grocers in every university city because of the student population. Cooking is normal and cheap.",
    mentalHealth: "Counselling exists at the universities but English-language provision is thin, and the region has historically had high suicide rates. Do not assume Western European infrastructure.",
    people: "Reserved, closer to Nordic than Mediterranean, and warm once you are known. Estonia is the most digitally organised country in Europe and the least bureaucratic of the three.",
    visa: "National D visa then a residence permit. All three are EU and Schengen members.",
    work: "20 hours/week during term once the residence permit is issued.",
    allergy: "Birch pollen in April and May is significant; damp winters aggravate asthma.",
    honest: "The Baltics are the cheapest honest route into the EU, and Estonia in particular has a genuinely strong digital-health and bioinformatics scene that gets no attention from Indian applicants. The caution is the same across all three: the degree opens Europe, it does not shortcut PLAB or USMLE, and the agent industry around these universities is large and expensive for what it does."
  },

  Gulf: {
    name: "the Gulf states",
    climate: "hot",
    winter: "15–25 °C — the pleasant season, and the reason the academic year is built around it",
    summer: "35–48 °C, and genuinely dangerous outdoors between June and September",
    daylight: "About 10.5 hours in December",
    cost: "Usually irrelevant — the serious research institutions here house and pay their students",
    diaspora: "very large. Indians are among the largest population groups in the UAE, Qatar and Saudi Arabia",
    vegFood: "easy",
    food: "The easiest food environment outside India. Indian groceries, restaurants and regional cuisines are everywhere, and vegetarian is a completely normal request.",
    mentalHealth: "Provision at the international institutions is reasonable; the wider system is developing and stigma is significant.",
    people: "Highly international campuses where a large share of colleagues are themselves expatriates. Social life is organised around compounds and institutions more than around neighbourhoods.",
    visa: "Sponsored residence tied to the institution, which handles it. Straightforward while you are employed or enrolled, and it ends when that does.",
    work: "Tied to your sponsor. Fully funded students do not need outside work and generally cannot take it.",
    allergy: "Desert dust year-round and heavy indoor air conditioning are the main irritants; both matter for asthma.",
    honest: "KAUST in Saudi Arabia funds its graduate students more generously than almost anywhere on earth — full fees, housing, and a stipend well above European levels — and Weill Cornell Qatar and Sidra do real clinical research. Weigh that against what it means to live under these countries' laws, which restrict speech, personal life and dissent in ways that fall harder on some people than others. That is a decision only you can make, and it should be made with facts rather than avoided."
  },

  China: {
    name: "China",
    climate: "temperate",
    winter: "−5 to 5 °C in Beijing, dry; Shanghai is damp and heated poorly",
    summer: "25–35 °C, humid",
    daylight: "About 9.5 hours in December in Beijing",
    cost: "₹40,000–80,000/month — CSC scholarships cover it fully",
    diaspora: "present in the major university cities",
    vegFood: "manageable",
    food: "Vegetarian eating is possible and Buddhist vegetarian restaurants exist, but meat stock is common and the concept needs explaining. Indian restaurants exist in Beijing, Shanghai and Guangzhou.",
    mentalHealth: "Provision is limited and stigma is high. English-language therapy is available privately in the biggest cities only.",
    people: "Hospitable to guests and curious about foreigners; the language barrier is the real wall, as English is much less widespread than in Korea or Taiwan.",
    visa: "X1 student visa then a residence permit. CSC handles much of the process.",
    work: "Restricted. Plan on the scholarship.",
    allergy: "Air quality in northern cities in winter is a genuine health consideration, particularly for asthmatics.",
    honest: "The Chinese Government Scholarship is large, fully funded and administratively real, and Chinese biomedical research has become genuinely first-rate in genomics and structural biology. Set against that: the language barrier is steeper than anywhere else here, internet restrictions affect daily academic work, and India–China visa and travel policy has been volatile enough that it must be checked as a live risk rather than a formality."
  }
});

/* ─────────────────────────── programmes ─────────────────────────── */

window.DB.study.push(
  {
    id: "itm-antwerp-tropmed",
    name: "Master of Science in Tropical Medicine & International Health",
    org: "Institute of Tropical Medicine, Antwerp",
    type: "masters", country: "Belgium", city: "Antwerp",
    fields: ["global", "infect", "pubhealth", "systems"],
    stages: ["grad", "pg"], funding: "full",
    money: "VLIR-UOS scholarships cover tuition, travel, insurance and a full monthly living allowance for candidates from India and other partner countries",
    duration: "1 year, plus an optional preceding diploma year",
    window: "Scholarship applications typically close ~January–February for the following September",
    deadlineMonths: [11, 12, 1, 2],
    url: "https://www.itg.be/en/study",
    why: "This is where a large part of the world's tropical-medicine and outbreak-response workforce is actually trained, and the Belgian government funds seats specifically for doctors from countries like India. A fully funded European masters in the field that matters most to Indian public health, at an institute whose alumni run WHO country offices — and the applicant pool from India is a fraction of what it should be, because almost nobody here knows the place exists.",
    reqs: [
      "A medical degree (MBBS qualifies) or an equivalent health-sciences degree",
      "Clinical or public-health work experience strengthens the application considerably",
      "English proficiency; ITM accepts several routes to proving it",
      "For the VLIR-UOS scholarship: nationality of a partner country, and a demonstrated intention to work in your own country's health system afterwards"
    ],
    steps: [
      "Read the VLIR-UOS eligibility page before the course page. The scholarship, not the seat, is the hard part, and it has its own nationality and age criteria.",
      "Apply to ITM and to the scholarship in the same cycle — the scholarship deadline is the earlier of the two and missing it means self-funding a European masters.",
      "The motivation letter is assessed on whether you will use the training in your own health system. Write about a specific Indian problem you have seen, not about a general interest in global health.",
      "An internship year or district-hospital posting is genuinely useful evidence here in a way it is not for most Western masters.",
      "Confirm current fees, deadlines and scholarship rules on the ITM site — this programme's funding rules change with Belgian development-aid cycles."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 1
  },
  {
    id: "isglobal-msc",
    name: "MSc Global Health",
    org: "ISGlobal / University of Barcelona",
    type: "masters", country: "Spain", city: "Barcelona",
    fields: ["global", "pubhealth", "infect", "env"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ €9,000–13,000 tuition · partial ISGlobal and Spanish government scholarships exist",
    duration: "1 year full-time",
    window: "Applications open ~January, close ~June",
    deadlineMonths: [1, 2, 3, 4, 5, 6],
    url: "https://www.isglobal.org/en/masters",
    why: "A serious global health institute with deep field programmes in Mozambique and South Asia, teaching in English, at roughly a third of what the equivalent London degree costs. Barcelona is also the gentlest climate adjustment in Europe for someone coming from India.",
    reqs: [
      "A degree in medicine, biology, pharmacy or a related health science",
      "English proficiency; no Spanish required for the taught programme",
      "Research or fieldwork experience helps but is not mandatory"
    ],
    steps: [
      "Decide between the research-oriented and the practice-oriented track before applying — the application asks and the answer shapes your thesis placement.",
      "Ask directly about field placement sites. ISGlobal's value is its African and South Asian field programmes, and access to them is what separates this from a generic European masters.",
      "Apply for the Spanish government and ISGlobal scholarships separately and earlier than the course deadline."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "mahidol-tropmed",
    name: "Diploma and MSc in Tropical Medicine",
    org: "Mahidol University, Faculty of Tropical Medicine",
    type: "masters", country: "Thailand", city: "Bangkok",
    fields: ["infect", "global", "pubhealth", "clinical"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ ₹2–4 lakh a year total including living costs — the cheapest credible international option on this site",
    duration: "6-month diploma or 2-year MSc",
    window: "Main intake applications close around March–May",
    deadlineMonths: [1, 2, 3, 4, 5],
    url: "https://www.tm.mahidol.ac.th/eng/",
    why: "Tropical medicine taught in the tropics, by a faculty that runs its own hospital for tropical disease and long-running field sites on the Thai–Myanmar border. Four hours from India, cheaper than most Indian private programmes, and the clinical material is the disease you will actually meet in an Indian district hospital rather than the imported-case teaching a European course gives you.",
    reqs: [
      "MBBS or an equivalent medical degree for the clinical diploma",
      "English proficiency; teaching is in English",
      "The MSc requires a research proposal; the diploma does not"
    ],
    steps: [
      "Choose the diploma first if you are unsure. Six months, low cost, and it tells you whether the field is yours before you commit two years.",
      "Ask about attachment to the Shoklo Malaria Research Unit or the border field sites — that fieldwork is the real value and it is not automatic.",
      "Thai student visas are straightforward but must be applied for from India before travel, not converted on arrival."
    ],
    indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },
  {
    id: "lsmu-lithuania",
    name: "English-taught masters and doctoral programmes",
    org: "Lithuanian University of Health Sciences · Vilnius University",
    type: "masters", country: "Lithuania", city: "Kaunas and Vilnius",
    fields: ["pubhealth", "clinical", "biochem", "neuro", "nutrition"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ €4,000–8,000 a year tuition · Lithuanian state scholarships available for some programmes",
    duration: "1.5–2 years",
    window: "Main intake closes around May–July for September",
    deadlineMonths: [3, 4, 5, 6, 7],
    url: "https://lsmu.lt/en/",
    why: "The cheapest route to a fully EU-accredited postgraduate degree, in a country that has built its higher education partly around international medical students. Public health, nutrition and clinical programmes run in English, and the residence permit carries Schengen mobility.",
    reqs: [
      "A recognised medical or health-sciences degree",
      "English proficiency, usually IELTS 6.0–6.5 — lower than the UK requires",
      "Degree recognition through the Lithuanian centre for quality assessment, which takes weeks and is the step people leave too late"
    ],
    steps: [
      "Start the degree-recognition process before you apply, not after you are accepted. It is the single most common cause of a missed September start.",
      "Apply directly to the university. Agents are widely used for Lithuania and charge substantial commission for filing a form you can file yourself.",
      "Check whether your specific programme is eligible for a Lithuanian state scholarship — several are, and it is not advertised prominently.",
      "Be clear with yourself about the goal. This is EU access and a real degree; it is not a shortcut to UK or US licensing, which still requires PLAB or USMLE."
    ],
    indiaSpecific: false, competitiveness: "accessible", workExp: 0
  },
  {
    id: "poland-english-med",
    name: "English-taught postgraduate programmes",
    org: "Jagiellonian University · Medical University of Warsaw and others",
    type: "masters", country: "Poland", city: "Kraków, Warsaw, Wrocław",
    fields: ["pubhealth", "clinical", "biochem"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ €4,000–9,000 a year tuition",
    duration: "1.5–2 years",
    window: "Rolling through spring and summer for a September start",
    deadlineMonths: [3, 4, 5, 6, 7, 8],
    url: "https://en.uj.edu.pl/en_GB/admissions",
    why: "Legitimate, affordable and inside the EU. Included here mainly so that the comparison is fair rather than because it is exceptional — Jagiellonian is a genuinely old and respectable university, and the research output you would join is modest next to the other European options on this list.",
    reqs: [
      "A recognised prior degree",
      "English proficiency, typically IELTS 6.0",
      "Degree apostille and recognition"
    ],
    steps: [
      "Apply directly. Poland is the most heavily agent-brokered destination for Indian students on this site, and the commission buys you nothing you cannot do yourself.",
      "Compare against Lithuania and Czechia on total cost including living, not on tuition alone.",
      "If your reason for choosing Poland is that it is easy to get into, be honest with yourself that admissions committees later will read it the same way."
    ],
    indiaSpecific: false, competitiveness: "accessible", workExp: 0
  }
);

window.DB.research.push(
  {
    id: "champalimaud-indp",
    name: "International Neuroscience Doctoral Programme",
    org: "Champalimaud Foundation, Lisbon",
    type: "phd", country: "Portugal", city: "Lisbon",
    fields: ["neuro", "compbio", "psych"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full stipend, no tuition, plus a first year of rotations before you commit to a laboratory",
    duration: "4–5 years",
    window: "Applications typically open ~November and close ~February",
    deadlineMonths: [11, 12, 1, 2],
    url: "https://research.fchampalimaud.org/education/inp/",
    why: "One of the best-funded neuroscience institutes in Europe, built deliberately as an international programme, teaching in English, on the Lisbon waterfront. The structure is the thing worth noticing: a year of rotations before you choose a laboratory, which means you are not gambling five years on a supervisor you met once over a video call. A medical degree is a real advantage in this pool rather than an oddity.",
    reqs: [
      "A degree in medicine, biology, engineering, physics, psychology or mathematics — the programme deliberately recruits across all of them",
      "No neuroscience background required; they train it",
      "English; no Portuguese needed",
      "Strong quantitative ability matters more than laboratory experience"
    ],
    steps: [
      "Apply in the single annual cycle — there is no rolling admission and missing it costs a year.",
      "The interview weekend is in person and expenses are usually covered. Ask, rather than assuming you must pay to attend.",
      "Write the application around a scientific question you find genuinely interesting, not around your CV. This programme selects for curiosity and explicitly says so.",
      "An MBBS with any exposure to neurology or psychiatry is a distinctive profile here. Say plainly what clinical observation made you want to understand the brain."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "ista-phd",
    name: "PhD Programme — a salary, no fees, direct entry after a bachelor's",
    org: "Institute of Science and Technology Austria",
    type: "phd", country: "Austria", city: "Klosterneuburg, near Vienna",
    fields: ["neuro", "compbio", "biochem", "genomics"],
    stages: ["grad", "pg"], funding: "full",
    money: "A full employment contract — roughly €31,000–39,000 a year gross, with social insurance — and no tuition at all",
    duration: "4–5 years, with rotations in the first year",
    window: "Main deadline in early January; a second smaller call sometimes in May",
    deadlineMonths: [11, 12, 1, 5],
    url: "https://ista.ac.at/en/education/phd-programme/",
    why: "Doctoral students here are employees with a salary and a pension contribution, not students paying for the privilege. Entry is open directly after a bachelor's degree, which an MBBS satisfies, and the first year is rotations across laboratories. It is small, exceptionally well funded, entirely English-speaking, and almost invisible to Indian medical students because it does not present itself as a medical institution.",
    reqs: [
      "A bachelor's or master's degree — MBBS is accepted for direct entry",
      "Strong quantitative or laboratory ability; the neuroscience and computational groups take people from medicine",
      "English only. No German required, though it makes life in Vienna easier",
      "GRE is not required"
    ],
    steps: [
      "Apply through the central portal and name several potential supervisors rather than one — admission is to the institute, not to a laboratory.",
      "Because the first year is rotations, the application is assessed on general scientific ability, so a broad, strong statement beats a narrow one.",
      "The January deadline is firm and it is the main intake. Treat the May call as a fallback, not a plan.",
      "Ask about the relocation allowance and the housing on campus — both exist and both are commonly missed."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "tigp-academia-sinica",
    name: "Taiwan International Graduate Program",
    org: "Academia Sinica",
    type: "phd", country: "Taiwan", city: "Taipei",
    fields: ["compbio", "genomics", "biochem", "neuro", "infect"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full fellowship of about NT$34,000 a month for the first year, continued by the laboratory afterwards, plus tuition waiver",
    duration: "4–6 years",
    window: "Applications usually close ~March for a September start",
    deadlineMonths: [12, 1, 2, 3],
    url: "https://tigp.sinica.edu.tw/",
    why: "A fully funded, entirely English-language doctorate at Taiwan's national academy, across molecular medicine, bioinformatics and infectious disease. Living costs in Taipei are low enough that the stipend is genuinely comfortable rather than survivable, the country is one of the easiest in Asia for a vegetarian, and the applicant pool from India is tiny relative to the quality of the science.",
    reqs: [
      "A bachelor's or master's degree in a relevant field — MBBS qualifies",
      "English proficiency; no Mandarin required for the programme, though it helps outside it",
      "Two or three academic references",
      "Research experience helps, particularly anything computational"
    ],
    steps: [
      "Pick the specific TIGP programme first — molecular medicine, bioinformatics, and molecular science each admit separately with different criteria.",
      "Email the programme coordinator with a short, specific question before applying. Response rates are high and it is remembered.",
      "The fellowship is guaranteed for the first year and then transfers to your supervisor's grant. Ask a current student how reliably that transition happens in the group you are joining.",
      "Confirm current stipend figures on the TIGP site — the number above moves with Taiwanese science funding."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "wits-uct-global",
    name: "HIV, tuberculosis and health-systems research",
    org: "University of the Witwatersrand · University of Cape Town",
    type: "research", country: "South Africa", city: "Johannesburg and Cape Town",
    fields: ["infect", "global", "pubhealth", "systems"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Funded doctoral positions through Wellcome, the NIH and the South African MRC; masters usually part-funded",
    duration: "1–4 years",
    window: "Rolling, with most funded posts advertised January–April",
    deadlineMonths: [1, 2, 3, 4, 9, 10],
    url: "https://www.wits.ac.za/health/",
    why: "For infectious disease and health systems, this is one of the few places where the research is genuinely ahead of Europe and North America, because the epidemiology is on the doorstep and the trial infrastructure was built around it. Teaching is in English, the Indian community is a century old, and the cost of living is a fraction of the Western options.",
    reqs: [
      "MBBS or a health-sciences degree",
      "No English test needed for most programmes — English is the medium of instruction",
      "Funded doctoral posts usually require a prior masters or demonstrable research output"
    ],
    steps: [
      "Approach a specific research unit rather than the university — the Wits Reproductive Health and HIV Institute and the Desmond Tutu HIV Centre both recruit directly.",
      "Ask about the funding source before you accept. Grant-funded posts end when the grant does, and that timeline should match your degree's.",
      "Be realistic about security when choosing where to live, and ask current international students rather than the international office.",
      "South African study visas are slow. Begin the application months before you need it."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "otago-nz-pubhealth",
    name: "Postgraduate public health and preventive medicine",
    org: "University of Otago · University of Auckland",
    type: "masters", country: "New Zealand", city: "Dunedin, Wellington and Auckland",
    fields: ["pubhealth", "global", "env", "systems"],
    stages: ["grad", "pg"], funding: "partial",
    money: "≈ NZ$40,000–55,000 a year tuition · doctoral students pay domestic fees, which is a very large discount",
    duration: "1 year for the masters, 3–4 for a doctorate",
    window: "Two intakes, February and July; scholarship rounds close earlier",
    deadlineMonths: [8, 9, 10, 11, 4, 5],
    url: "https://www.otago.ac.nz/courses/",
    why: "One rule makes New Zealand worth a serious look: international doctoral students pay the same fees as New Zealanders. That turns a doctorate here from expensive into one of the cheapest in the English-speaking world, and Otago's preventive and environmental health work is strong.",
    reqs: [
      "A recognised medical or health-sciences degree",
      "English proficiency, typically IELTS 6.5",
      "Doctoral entry requires a research proposal and a supervisor who has agreed in advance"
    ],
    steps: [
      "Secure a supervisor before applying for the doctorate. Without an agreed supervisor the application does not progress, and this is the step people skip.",
      "The domestic-fee rule applies to doctorates, not to taught masters. Check which you are actually applying for.",
      "Apply for the University of Otago doctoral scholarship in the same cycle — it covers fees and a stipend and closes before the general deadline.",
      "Factor the flight. It is the most expensive travel on this site and you will not come home often."
    ],
    zeroCost: false, indiaSpecific: false, competitiveness: "medium", workExp: 0
  }
);

window.DB.funding.push(
  {
    id: "gks-korea",
    name: "Global Korea Scholarship",
    org: "Korean government · NIIED",
    type: "scholarship", country: "South Korea", city: "Seoul and nationwide",
    fields: ["biochem", "genomics", "compbio", "neuro", "pubhealth", "onco"],
    stages: ["grad", "pg"], funding: "full",
    money: "Return airfare, full tuition, a monthly living allowance, medical insurance, a settlement allowance, and a fully paid year of Korean language training before the degree begins",
    duration: "2 years for a masters, 3 for a doctorate, plus the language year",
    window: "Embassy track applications open ~February; university track ~March",
    deadlineMonths: [2, 3, 4],
    url: "https://www.studyinkorea.go.kr/",
    why: "One of the most complete government scholarship packages that exists — it pays for the flight, the fees, the living, the insurance and a year of language teaching, and it is applied for from India through the Korean embassy. Korean biomedical research is strong and getting stronger, and the number of Indian medical graduates applying is far below what the generosity of the award would justify.",
    reqs: [
      "Under 25 for undergraduate, under 40 for graduate awards",
      "A grade average in roughly the top 20 per cent of your class",
      "Indian nationality qualifies — India is a designated country",
      "Neither you nor your parents may hold Korean citizenship",
      "Good health, certified"
    ],
    steps: [
      "Choose your track first. The embassy track lets you name three universities and is the more common route from India; the university track applies to one institution directly and is sometimes less competitive.",
      "The documents are the hard part, not the essays — apostilled degree certificates, notarised transcripts and a medical certificate all take weeks. Start in December for a February deadline.",
      "The study plan is weighted heavily. Name a specific laboratory and a specific problem, not a general interest in Korea.",
      "The language year is compulsory unless you already hold TOPIK level 3. Treat it as a paid year, not as a delay."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "csc-china",
    name: "Chinese Government Scholarship",
    org: "China Scholarship Council",
    type: "scholarship", country: "China", city: "Nationwide",
    fields: ["biochem", "genomics", "compbio", "clinical", "pubhealth"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full tuition, on-campus accommodation, a monthly stipend and comprehensive medical insurance",
    duration: "2–4 years",
    window: "Applications generally close between January and April depending on the route",
    deadlineMonths: [12, 1, 2, 3, 4],
    url: "https://www.campuschina.org/",
    why: "A large, fully funded scholarship into a research system that has become genuinely world-leading in genomics and structural biology. It is listed with a clear-eyed caveat rather than an endorsement: the science is real, and so are the language barrier, the internet restrictions on academic work, and the fact that India–China travel and visa policy has been volatile enough to be a live risk rather than a formality.",
    reqs: [
      "Under 35 for a masters, under 40 for a doctorate",
      "A relevant prior degree with strong marks",
      "Two academic references",
      "Some programmes require HSK Chinese proficiency; English-taught medical and science programmes generally do not"
    ],
    steps: [
      "Apply through a Chinese university's own portal and through the CSC portal — most routes require both, and applicants routinely complete only one.",
      "Secure an acceptance letter from a supervisor first. It converts the application from a lottery into a strong one.",
      "Verify the current state of India–China student visa issuance before you build a plan around this, and keep a second option live.",
      "Confirm that your degree will be recognised for whatever you intend to do next — check with the Indian regulator, not with the university."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "nordic-global-health",
    name: "Nordic global health and epidemiology routes",
    org: "University of Bergen · University of Copenhagen · Karolinska",
    type: "scholarship", country: "Norway", city: "Bergen, Copenhagen and Stockholm",
    fields: ["global", "pubhealth", "env", "infect"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Funded doctoral positions are salaried employment; taught masters now carry real fees for non-EU students",
    duration: "1–2 years taught, 3–4 for a salaried doctorate",
    window: "Doctoral vacancies advertised year-round; masters close ~December–March",
    deadlineMonths: [11, 12, 1, 2, 3],
    url: "https://www.uib.no/en/cih",
    why: "The Nordic doctorate is an employment contract — a salary, a pension and parental leave — rather than a studentship, which is a materially different life from a stipend in London. Bergen's Centre for International Health has worked with South Asian partners for decades. The correction worth reading carefully is below.",
    reqs: [
      "A medical or health-sciences degree",
      "English proficiency; teaching and research are in English throughout",
      "Doctoral posts are advertised jobs with named projects — you apply to a vacancy, not to a department"
    ],
    steps: [
      "Correct your assumptions about cost first. Norway charged non-EU students nothing for decades and began charging tuition in autumn 2023, and a great deal of advice online has not caught up. Check current fees on the university's own page before anything else.",
      "Target the salaried doctoral vacancies rather than the taught masters — that is where the Nordic advantage now sits for a non-EU applicant.",
      "Watch the financial requirement for the residence permit. Proving you hold the required living costs stops more applicants than admissions does.",
      "Take the winter dark seriously when choosing between Bergen, Copenhagen and Stockholm. It is a real variable, not a joke."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  }
);

/* ─────────────────────────── grades ───────────────────────────
   Kept apart from the facts above on purpose: fork this project and disagree
   with a tier without touching a single fact. */

window.DB.impact = window.DB.impact || {};
Object.assign(window.DB.impact, {
  "itm-antwerp-tropmed": { t: 1, odds: "Competitive, but the Indian applicant pool is small", effort: "40 hrs including the scholarship file", note: "A fully funded European masters in the field that matters most to Indian public health, at the institute that trains WHO country staff. The reason to rate it top tier is not the degree — it is that Belgian development funding ring-fences seats for exactly this candidate and almost nobody in India applies." },
  "champalimaud-indp":    { t: 1, odds: "Very competitive; a medical degree is an advantage here", effort: "30 hrs", note: "A rotation year before you commit to a laboratory is worth more than it sounds: it is the difference between choosing a supervisor on evidence and choosing one on a video call. Full stipend, no fees, English, Lisbon." },
  "ista-phd":             { t: 1, odds: "Competitive, and open directly after MBBS", effort: "25 hrs", note: "A salary and a pension contribution rather than a stipend, no tuition, rotations in year one, and direct entry on a bachelor's degree. Invisible to Indian medical students only because it does not look like a medical school." },
  "gks-korea":            { t: 1, odds: "Genuinely under-applied from India for what it pays", effort: "45 hrs, mostly document chasing", note: "Flight, fees, living, insurance and a paid language year. The documents defeat more applicants than the essays do — apostilles take weeks, so the real deadline is December." },
  "tigp-academia-sinica": { t: 2, odds: "Tiny Indian applicant pool for the quality of the science", effort: "20 hrs", note: "Fully funded English-language doctorate at a national academy, in a country that is unusually easy for a vegetarian. The weakness is name recognition, not research quality — weigh that honestly against where you want to work afterwards." },
  "wits-uct-global":      { t: 2, odds: "Reachable, especially with prior research", effort: "20 hrs", note: "For HIV, TB and health systems this is ahead of Europe, because the epidemiology and the trial infrastructure are on the doorstep. Security is a real constraint on daily life and should be researched from students, not from the prospectus." },
  "isglobal-msc":         { t: 2, odds: "Moderately competitive", effort: "15 hrs", note: "A third of the price of the London equivalent with genuine African and South Asian field programmes. Ask about field placement access before accepting — that is the part that distinguishes it." },
  "mahidol-tropmed":      { t: 2, odds: "Accessible", effort: "12 hrs", note: "Tropical medicine taught where the disease is, four hours from home, for less than an Indian private programme. Choose it for the fieldwork and the border research units, not for the letterhead." },
  "nordic-global-health": { t: 2, odds: "Doctoral vacancies are winnable; masters are expensive", effort: "20 hrs per vacancy", note: "A Nordic doctorate is a job with a pension, which is a different life from a stipend. Read the Norway tuition correction before planning — the free-tuition Norway in old forum posts stopped existing in 2023." },
  "otago-nz-pubhealth":   { t: 3, odds: "Reachable with an agreed supervisor", effort: "18 hrs", note: "International doctoral students pay domestic fees, which quietly makes this one of the cheapest doctorates in the English-speaking world. The taught masters gets no such discount." },
  "csc-china":            { t: 3, odds: "Large intake, moderate competition", effort: "30 hrs", note: "The funding is real and the genomics is world-class. Rated third tier not on quality but on risk: language, internet restrictions on academic work, and India–China visa policy that has to be checked as a live variable." },
  "lsmu-lithuania":       { t: 4, odds: "Accessible", effort: "15 hrs plus degree recognition", note: "An honest EU degree at the lowest price on this site, and no more than that. It opens Europe; it does not shortcut PLAB or USMLE. Apply directly — the agent commission buys you nothing." },
  "poland-english-med":   { t: 4, odds: "Accessible", effort: "12 hrs", note: "Listed so the comparison is fair rather than because it stands out. Jagiellonian is old and respectable, the research base you would join is thin, and it is the most heavily agent-brokered destination here. If the appeal is that it is easy to enter, committees later will read it that way too." }
});
