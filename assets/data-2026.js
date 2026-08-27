/* Dream Counsellor — routes added in the August 2026 pass.

   Every entry here was found and checked in this cycle, against the
   programme's own page rather than an aggregator. The theme of the batch is
   the gap this index still had: routes that do not require you to already be
   somewhere else. Three of the five are open to a doctor sitting in a district
   hospital in India with no institutional backing and no money, which is the
   population this site was built for and the population most listicles quietly
   skip.

   Kept in its own file rather than appended to the topic files so that a
   reviewer can see exactly what one verification pass added, and revert it as
   a unit if a call turns out to have closed for good. */

window.DB = window.DB || {};
window.DB.study    = window.DB.study    || [];
window.DB.funding  = window.DB.funding  || [];
window.DB.research = window.DB.research || [];
window.DB.impact   = window.DB.impact   || {};

/* ─────────────────────────── SCHOLARSHIPS ─────────────────────────── */

window.DB.funding.push(
  {
    id: "turkiye-burslari",
    name: "Türkiye Bursları (Türkiye Scholarships)",
    org: "Presidency for Turks Abroad and Related Communities (YTB)",
    type: "scholarship", country: "Turkey", city: "Ankara, Istanbul, Izmir and 50+ other cities",
    fields: ["clinical", "pubhealth", "global", "infect", "systems"],
    stages: ["grad", "pg"], funding: "full",
    money: "Tuition, accommodation, monthly stipend, health insurance, return airfare and a year of Turkish language teaching — all of it, not a contribution towards it",
    duration: "2 years (masters) · 4 years (doctorate), plus the language year",
    window: "One annual round, opening early in the year and closing around February",
    deadlineMonths: [1, 2, 3],
    url: "https://turkiyeburslari.gov.tr/",
    why: "One of the few genuinely full scholarships anywhere that names medical sciences as an eligible field and does not require a language test to apply. Turkish medical faculties are strong in transplant surgery, cardiology and emergency medicine, and Türkiye's own health system reform is one of the most studied in the world, which makes it a real subject to work on rather than just a place to hold a degree. It is also the rare fully funded route where placement is done for you: you rank up to twelve programmes and the committee assigns one.",
    reqs: [
      "Not a Turkish citizen and never a Turkish citizen",
      "Medical sciences carry the highest academic bar of any field here — around 90 % in your prior degree",
      "Under 30 for a masters, under 35 for a doctorate",
      "No language certificate needed to apply; teaching is in Turkish or English depending on the programme"
    ],
    steps: [
      "Check which of your target programmes are taught in English before you rank them. Many medical and public health programmes are Turkish-medium, and the funded language year is designed to get you there, but you should choose that deliberately, not discover it after acceptance.",
      "You rank up to twelve programmes in one application and are assigned one. Rank honestly by what you want to study, not by city prestige; there is no second round to correct it.",
      "The letter of intent carries this application. Write it about Türkiye specifically — its health system, a department, a named researcher — because the reviewers can see instantly who has applied to nine countries with one essay.",
      "Two academic references and your marksheets need attesting. Start that in December; Indian university administrations do not move at application speed.",
      "Verify this year's exact opening and closing dates on the portal before planning around them. The window is roughly a month and it has moved between January and February in recent cycles."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "rotary-peace",
    name: "Rotary Peace Fellowship",
    org: "The Rotary Foundation",
    type: "fellowship", country: "Global", city: "Peace Centres in the USA, UK, Japan, Sweden, Uganda and Thailand",
    fields: ["global", "pubhealth", "psych", "systems"],
    stages: ["grad", "pg"], funding: "full",
    money: "Tuition and fees, room and board, return airfare, and all field-study and internship costs. Up to 50 masters fellowships a year.",
    duration: "15–24 months (masters) · 11 weeks (professional development certificate)",
    window: "One annual round, closing 15 May; Peace Centre assignments announced the following November",
    deadlineMonths: [3, 4, 5],
    url: "https://www.rotary.org/get-involved/our-programs/peace-fellowships",
    why: "The most under-applied full scholarship open to a doctor whose anger is about conflict, displacement or health in emergencies. Because it is framed as peacebuilding rather than health, medics rarely look at it, and yet the fellows who work on health in conflict zones are exactly who the programme wants. The certificate route at Chulalongkorn or Makerere is the unusual part: eleven weeks, fully funded, and designed for people already working, so it does not require you to abandon a job for two years.",
    reqs: [
      "Proficiency in English, and a bachelor's degree — MBBS qualifies",
      "Masters route: at least three years of relevant work or volunteer experience",
      "Certificate route: at least five years, and it is aimed at people mid-career",
      "A commitment to international understanding and peace, evidenced by what you have actually done"
    ],
    steps: [
      "Decide which of the two routes you are actually eligible for before writing anything. The masters and the certificate have different experience bars and different audiences.",
      "Selection by Rotary does not admit you to the university — you apply to the host institution separately, and that admission is not guaranteed. Budget for two applications, not one.",
      "You need a Rotary club endorsement. Find your district's contact early; this is the step that catches people out, and it cannot be done in the final week.",
      "Write the essays about a specific conflict or displacement problem you have seen in your own work. Health in emergencies, mental health after disaster, and access under blockade are all squarely within scope and are argued far less often than the generic peace essay.",
      "Selected fellows hear in November for a course starting the following year, so this is an eighteen-month lead time from application to arrival. Plan the gap deliberately."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 3
  }
);

/* ─────────────────────────── RESEARCH & TRAINING ─────────────────────────── */

window.DB.research.push(
  {
    id: "tdr-clinical-leadership",
    name: "TDR Clinical Research Leadership Fellowship",
    org: "TDR — the WHO Special Programme for Research and Training in Tropical Diseases",
    type: "fellowship", country: "Global", city: "Placed with a partner research institution or product developer",
    fields: ["infect", "global", "pubhealth", "clinical"],
    stages: ["pg"], funding: "full",
    money: "Funded placement — TDR covers the fellowship; your home institution holds your post open",
    duration: "12 months",
    window: "Calls run roughly annually; watch the capacity-strengthening page",
    deadlineMonths: [6, 7, 8, 9],
    url: "https://tdr.who.int/home/our-work/strengthening-research-capacity",
    why: "A WHO programme built specifically so that clinical trials in diseases of poverty are led from the countries where those diseases actually are, rather than run remotely from Europe. It trains you to run a trial, not to assist on one, and it is explicitly reserved for people working in low- and middle-income countries, which for once puts an Indian applicant inside the target group rather than competing against it.",
    reqs: [
      "Employed in a clinical research role for at least 24 months at a registered institution in an LMIC",
      "Demonstrable experience in trial-related work in diseases of poverty",
      "Your institution must agree to release you and take you back"
    ],
    steps: [
      "The institutional commitment is the hard part, not the form. Secure your head of department's written agreement before you draft anything.",
      "The 24-month clinical research requirement is counted properly. Get your trial roles documented — protocol work, site coordination, data management all count, and most people undercount their own.",
      "Read TDR's own published trial priorities before writing. Applications that name a disease TDR is actually funding work on read entirely differently from generic ones.",
      "If you do not yet clear the 24-month bar, the Postgraduate Training Scheme and the Implementation Research fellowship on this list are the earlier rungs of the same ladder — do one of those first."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "high", workExp: 2
  },
  {
    id: "tdr-implementation-research",
    name: "TDR Implementation Research Leadership Fellowship",
    org: "TDR (WHO), with UNICEF, UNDP and the World Bank",
    type: "fellowship", country: "Global", city: "Hosted at a partner university in the global South",
    fields: ["global", "pubhealth", "systems", "infect"],
    stages: ["grad", "pg"], funding: "full",
    money: "Fully funded, including the taught component · free to apply",
    duration: "About 12 months, blended",
    window: "Annual call, recent rounds closing end of January",
    deadlineMonths: [11, 12, 1],
    url: "https://tdr.who.int/home/our-work/strengthening-research-capacity",
    why: "Implementation research is the discipline that asks why a treatment that works in a trial does not work in a district, which is the single most common frustration of anyone who has done a rural posting. This fellowship teaches it formally, hosts it in the global South rather than flying you to Geneva, and costs nothing. For a doctor whose anger is about the gap between guideline and reality, it is the most direct training that exists.",
    reqs: [
      "Working in a health-related role in a low- or middle-income country",
      "A concrete implementation problem you can actually study where you work",
      "Institutional support to take on the taught component alongside your post"
    ],
    steps: [
      "Bring a real problem. The strongest applications name one specific failure in one specific place — a stockout, a follow-up rate, a referral that never happens — rather than a topic.",
      "Get your supervisor's agreement in writing early; the blended format needs protected time and departments agree to it far more slowly than you expect.",
      "The host university changes between rounds, so check where the current cohort sits before assuming a location.",
      "Recent rounds have closed at the end of January, which means drafting over December. Confirm the current date on the TDR page — this call has moved before."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "high", workExp: 1
  },
  {
    id: "icgeb-falaschi",
    name: "Arturo Falaschi Fellowships (PhD, short-term and postdoctoral)",
    org: "ICGEB — International Centre for Genetic Engineering and Biotechnology",
    type: "fellowship", country: "India", city: "New Delhi, Trieste (Italy) or Cape Town (South Africa)",
    fields: ["genomics", "biochem", "infect", "compbio", "onco"],
    stages: ["grad", "pg"], funding: "full",
    money: "Full stipend, health insurance and travel · free to apply",
    duration: "1–12 months (short-term) · 3–4 years (full PhD) · 2 years (postdoctoral)",
    window: "Main call closes 31 March; a second short-term round runs to 30 September",
    deadlineMonths: [1, 2, 3, 8, 9],
    url: "https://www.icgeb.org/fellowship/",
    why: "An intergovernmental research centre with one of its three laboratories in New Delhi, which makes this the rare world-class fellowship you can hold without leaving India, and the rare Indian position that comes with an automatic route to Trieste or Cape Town. India is a founding member state, so Indian nationals are inside the priority group rather than competing as foreign applicants. Almost no medical students have heard of it, because it recruits through biotechnology departments and never through medical colleges.",
    reqs: [
      "A degree in life sciences, medicine or a related field — MBBS is accepted",
      "A written statement of support from the ICGEB group leader you want to work with. This is mandatory and there is no way around it.",
      "For the short-term route, current enrolment in a PhD elsewhere; the long-term route is the PhD itself"
    ],
    steps: [
      "Choose the group before the fellowship. Read the ICGEB New Delhi group pages, find two or three whose actual published work you can discuss, and write to those group leaders directly.",
      "The supporting statement from the group leader is the application's spine. Allow two months to secure it. This is the step that fails, not the form.",
      "If you are still in MBBS, the short-term route is not yet open to you; build toward it by finishing a real project first, then apply as a PhD student or a graduate.",
      "Note the two windows. The main call closes at the end of March, and a separate short-term round runs through to the end of September, so a missed deadline is not a missed year."
    ],
    zeroCost: true, indiaSpecific: false, competitiveness: "high", workExp: 0
  },
  {
    id: "icddrb",
    name: "icddr,b research fellowships, internships and short courses",
    org: "icddr,b — International Centre for Diarrhoeal Disease Research, Bangladesh",
    type: "research", country: "Bangladesh", city: "Dhaka and Matlab",
    fields: ["infect", "pubhealth", "global", "nutrition", "repro"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Fellowships are stipended; short courses are paid but cost a fraction of the European equivalents",
    duration: "Weeks (courses) to 1–2 years (fellowships)",
    window: "Courses run through the year; fellowship and internship calls are posted as they open",
    deadlineMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    url: "https://www.icddrb.org/knowledge-sharing/education-and-training/internship",
    why: "The most consequential public health research institute in South Asia, and the one an Indian medical graduate can most easily reach — a short flight, no visa ordeal, and disease patterns that are actually the ones you will spend your career on. Oral rehydration solution was proven here, and the Matlab field site is the longest-running demographic surveillance system in the developing world. If you want field epidemiology rather than a lecture about it, this is a far better use of a year than a European summer school, and it costs a fraction as much.",
    reqs: [
      "Fellowships: within about three years of your last degree — a recent MBBS or a masters both qualify",
      "Internships are open earlier and are the realistic entry point for a student",
      "Short courses in epidemiology, biostatistics and research ethics are open to anyone who can pay the fee"
    ],
    steps: [
      "Start with a short course if you are still studying. They are open-enrolment, genuinely taught by working researchers, and they put your name in front of the people who run the fellowships.",
      "For the research fellowship, the three-year window after your last degree is the constraint that catches people — if you are in your internship year, diarise this now rather than discovering it after your MD.",
      "Ask about the Matlab field site specifically. Fieldwork there is the part of this that no other institution in the region can offer, and it is what makes the year legible on an application afterwards.",
      "Costs are in taka and are low by international standards, but funding is not automatic for every route. Confirm what your specific programme covers before booking anything."
    ],
    indiaSpecific: false, competitiveness: "medium", workExp: 0
  },
  {
    id: "ev4gh",
    name: "Emerging Voices for Global Health (EV4GH)",
    org: "Health Systems Global and partner institutions",
    type: "skill", country: "Global", city: "Online, then in person before the Global Symposium",
    fields: ["global", "pubhealth", "systems", "psych"],
    stages: ["grad", "pg"], funding: "partial",
    money: "Full and partial scholarships available, prioritised for applicants from low- and middle-income countries",
    duration: "4 weeks online, then 2 weeks in person",
    window: "Runs with the Global Symposium on Health Systems Research; the 2026 round closed 20 March",
    deadlineMonths: [1, 2, 3],
    url: "https://www.ev4gh.net/",
    why: "A training programme whose stated purpose is to get researchers from the global South into the rooms where global health is argued about, rather than cited in it. It ends immediately before the Global Symposium on Health Systems Research, so you arrive at the largest gathering in the field already holding a cohort of colleagues, which is the part that actually changes a career, and the part that no conference registration can buy you. The 2026 cohort ran into the symposium in Dubai.",
    reqs: [
      "Early-career, and from or working in a low- or middle-income country",
      "Not only researchers — implementers, decision-makers, journalists and knowledge brokers are explicitly wanted",
      "An abstract or a piece of work you are willing to be challenged on"
    ],
    steps: [
      "Apply in the same season you submit an abstract to the Global Symposium. The two are designed to be held together and the combination is what makes the trip worth it.",
      "Say plainly which health system you work in and what is broken in it. This programme selects for people with a position, not people with a summary of the literature.",
      "Ask for the scholarship in the application — do not assume you will fund it yourself and then discover you cannot. LMIC applicants are the priority group for exactly this.",
      "The cycle follows the symposium rather than the calendar, so check the current call before assuming a March deadline."
    ],
    indiaSpecific: false, competitiveness: "high", workExp: 1
  }
);

/* ─────────────────────────── the judgement layer ───────────────────────────
   Separate from the facts above, as everywhere else on this site. Disagree
   with a tier without touching a single fact. */

window.DB.impact["turkiye-burslari"] = {
  t: 1,
  odds: "~5,000 selected from 165,000+ applicants worldwide",
  effort: "25 hrs, free to apply, plus attestation lead time",
  note: "A genuinely full ride — tuition, housing, stipend, flights and a language year — that names medical sciences as eligible and asks for no language test to apply. The 90 % bar in medical sciences is the real filter, not the application."
};
window.DB.impact["rotary-peace"] = {
  t: 1,
  odds: "Up to 50 masters fellowships worldwide each year",
  effort: "35 hrs, plus finding a Rotary district endorsement",
  note: "Almost no medics apply, because it is filed under peace rather than health. If your work is health in conflict, displacement or disaster, you are the intended candidate and the field you are competing in is far thinner than the funding level suggests."
};
window.DB.impact["tdr-clinical-leadership"] = {
  t: 1,
  odds: "Small cohort, restricted to LMIC applicants",
  effort: "20 hrs, free to apply",
  note: "The rare programme where being based in India is the eligibility criterion rather than the obstacle. It trains trial leaders, not trial assistants, and the 24-month bar is lower than most people assume once they count their own work honestly."
};
window.DB.impact["tdr-implementation-research"] = {
  t: 2,
  odds: "Competitive but narrowly targeted",
  effort: "15 hrs, free to apply",
  note: "The formal training for the exact frustration a rural posting produces — why the thing that works in the trial does not work in the district. Free, hosted in the global South, and a credible route into WHO-adjacent work."
};
window.DB.impact["icgeb-falaschi"] = {
  t: 1,
  odds: "Small intake per laboratory, but a founding-member-state field",
  effort: "20 hrs, free to apply, plus two months to secure the group leader's statement",
  note: "A world-class intergovernmental fellowship with a laboratory in New Delhi, which means you can hold it without emigrating and still be inside an international system. Recruits through biotechnology departments, so medical students almost never see it — that thin field is the whole opportunity."
};
window.DB.impact["icddrb"] = {
  t: 2,
  odds: "Realistic — internships and short courses are genuinely accessible",
  effort: "10 hrs for a course, more for a fellowship",
  note: "The best field epidemiology available to an Indian medic per rupee and per hour of travel, on the disease patterns you will actually work on. Matlab is the longest-running demographic surveillance site in the developing world and there is no European equivalent to it."
};
window.DB.impact["ev4gh"] = {
  t: 2,
  odds: "Small cohort, LMIC-prioritised",
  effort: "15 hrs plus an abstract",
  note: "Buys you the one thing a conference ticket cannot: arriving at the field's largest gathering already inside a cohort. Pair it with a symposium abstract or most of the value is left on the table."
};
