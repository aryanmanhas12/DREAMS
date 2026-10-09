/* Dreams Counsellor — when this index was last checked against the world.

   The standing risk on this whole project is staleness. Every deadline and
   amount here was correct when it was written and drifts every cycle, and a
   confidently-stated wrong date is worse than no date at all — a student who
   believes ICMR-STS closes in January will not look again in May.

   That failure has already happened once. The STS cycle moved from a January
   close to a 30 May close and this file carried the old date for months; the
   IAS summer fellowship was listed as closing mid-December when it actually
   runs to 31 January; and the National Overseas Scholarship was listed as a
   February–April window when its 2026 round ran late April to early June.
   None of those were visible as errors, because a date does not look wrong.

   So the review date is data, surfaced in the interface, and deliberately not
   a hardcoded string in the HTML. That way it cannot quietly disagree with
   itself in two places. Update it when, and only when, entries have actually
   been re-checked against their official pages. Backdating it is the one thing
   that would make this worse than having no stamp at all. */

window.DB = window.DB || {};

window.DB.meta = {
  /* ISO year-month of the last verification pass. */
  reviewed: "2026-10",
  reviewedLabel: "October 2026",
  /* What that pass actually covered, so the stamp does not over-claim. Spot
     checks are not a full audit and the interface should not imply one.

     The October pass worked down tools/recheck.js's "act now" list: tier-1
     and tier-2 entries whose badge says open or opening soon. Thirty-two
     entries changed. Eighteen were read on the programme's own page and
     carry checked: "2026-10"; the rest were brought to this cycle's dates
     from the programmes' published calendars and are not stamped.

     What it found, beyond dates that had simply rolled over:

       ITM Antwerp's scholarship was described as VLIR-UOS seats ring-fenced
       for Indian doctors, covering travel. It is Belgium's DGD scholarship:
       India is eligible as a low- or middle-income country but is not one of
       the 27 priority countries that receive most awards, and travel is never
       covered. Graded down from tier 1 to tier 2.
       Charpak's Summer Training (Charpak Lab until 2025) pays EUR 700 a month
       for up to two months with no travel, insurance or housing; the entry
       said EUR 860 with housing help and free health cover. Its eligibility
       list does not name MBBS, so the entry now says to confirm.
       KAUST's visiting programme was said to take MBBS students. Its page
       names 3rd- and 4th-year STEM bachelor's and master's students only, runs
       2 to 6 months all year, and pays USD 1,000 a month plus flights.
       The UK Academic Clinical Fellowship round is open on Oriel from 1 to 29
       October 2026; the entry said "around November".
       Clarendon's window had been garbled by an earlier cleanup pass, and the
       J.N. Tata entry called a loan "interest-free" on no source.

     Added in the same pass, each read on its own official page first: the
     Hong Kong PhD Fellowship Scheme (Hong Kong is the index's 34th country;
     CUHK names MBChB "or equivalent" as a PhD entry degree for its medical
     faculty), and CAMP@Pune with IISc's Brain, Computation and Learning
     workshop. The Bangalore Cognition Workshop names only engineering and
     science students, so it went to skipList.

     Then, on 9 October 2026, the official page of every one of the 190
     programmes was fetched from an unrestricted host and compared with its
     entry. No link was dead. 57 entries now carry checked: "2026-10". What
     that sweep corrected:

       Chevening and Knight-Hennessy both closed on 6 October and still showed
       as open. Open Doors (Russia) said registration ran November to
       December; it closes on 1 November 2026. Pasteur's PPU interviews are in
       early March, not February, after a joint application with the host lab
       by 14 December; its old page answers 502, so the entry now links the
       official call PDF. K.C. Mahindra's loans are up to ₹10 lakh for the top
       three and ₹5 lakh otherwise (the entry said ₹8 lakh plus outright
       grants). Aga Khan's programme moved to a new page, and its loan half
       carries a service charge, so it is not interest-free. INYAS closed on
       31 August, not "in the first half of the year". Dates were filled in
       for LSHTM (25 July 2027 for Student-visa applicants), NZREX (6 March
       2027), EPFL (15 November 2026), the IJMS conference (abstracts 15 March
       to 10 May 2027), Neuromatch (5 to 23 July 2027), Rotary (opens February
       2027), the NL Scholarship (opens 1 November) and Melbourne's 2027 PhD
       stipend (AUD 41,100).

     What this pass did NOT do: read the pages that block every non-browser
     fetch (LSHTM, JHU, the GMC, NBEMS) or refuse foreign connections (most
     Indian government portals). Those entries were not stamped. */
  scope: "The October 2026 pass fetched the official page of all 190 programmes and found no dead links. It corrected Chevening and Knight-Hennessy (both closed on 6 October), Open Doors (registration closes 1 November 2026, not in November and December), Pasteur's PhD timetable, the amounts for K.C. Mahindra and the terms for Aga Khan, and re-read ITM Antwerp, Charpak, KAUST and the UK clinical fellowship round, open on Oriel until 29 October 2026. It also added Hong Kong's PhD Fellowship, open until 1 December 2026. Pages that block automated reading were not re-checked and carry their earlier dates."
};
