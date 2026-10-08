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

     What this pass did NOT do: re-read the 85 entries longest unchecked, or
     the generic cycles (conference abstract windows, UK rolling masters).
     Those carry the September and August checks. */
  scope: "The October 2026 pass re-read the programmes marked open or opening soon. It found ITM Antwerp's scholarship favours 27 other countries and never pays the flight, Charpak's summer track pays EUR 700 a month with no housing or insurance, KAUST's visiting programme names STEM students rather than MBBS, and the UK Academic Clinical Fellowship round open on Oriel until 29 October 2026, all corrected. It also added Hong Kong's PhD Fellowship, open until 1 December 2026. Entries outside that list carry their earlier checks."
};
