/* Dream Counsellor — when this index was last checked against the world.

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
   a hardcoded string in the HTML — that way it cannot quietly disagree with
   itself in two places. Update it when, and only when, entries have actually
   been re-checked against their official pages. Backdating it is the one thing
   that would make this worse than having no stamp at all. */

window.DB = window.DB || {};

window.DB.meta = {
  /* ISO year-month of the last verification pass. */
  reviewed: "2026-08",
  reviewedLabel: "August 2026",
  /* What that pass actually covered, so the stamp does not over-claim. Spot
     checks are not a full audit and the interface should not imply one.

     This cycle swept all 161 links again from an unrestricted host. No entry
     was dead, but eighteen had drifted to a new address and two were pointing
     somewhere actively wrong. The more useful finding was an eligibility one,
     not a link one: DAAD WISE and PMRF are both closed to MBBS students by
     rules that are not on their front pages, and this index was recommending
     the first of them. Both are now named in the skip list instead. Deadlines
     were re-read for the Indian schemes against the DHR and ministry portals
     rather than against aggregators. ICMR-STS advertised 30 May and was then
     extended to 10 June, which is the pattern across DHR's 2026-27 calls —
     the main HRD research call went to 15 June and the Young Medical Faculty
     PhD to 14 July. That is now written into the STS entry, with the warning
     that the extension is announced days beforehand and must never be planned
     around. IAS-SRFP holds at 31 January. NOS opened 24 April and closed
     2 June with a correction window to the 7th.

     One link was worth the whole sweep: lancetglobalsurgery.org has lapsed
     and now redirects to a gambling site. It was never in the index, but it
     is the first result for global surgery and students will find it.

     A second pass then re-read the major international awards against their
     own pages rather than aggregators, and found two wrong dates and one
     wrong instruction. EPFL's summer research programme closes 15 November,
     not 31 January — the old date was repeated in three places here and would
     have cost a reader the whole cycle. The Swiss Government Excellence
     deadline is country-specific and India's fell on 10 November, not early
     September. And Knight-Hennessy's Stanford programme application does NOT
     share the scholarship's October deadline. Chevening (6 Oct, 11:00 UTC),
     Rhodes India (23 July), Mitacs (16 Sept), Amgen (1 Feb), OIST (15 Oct),
     IAS-SRFP (31 Jan) and Fulbright all verified correct as written. */
  scope: "Every link re-swept and eighteen repointed; two eligibility traps that quietly exclude MBBS students removed and named; Indian scheme dates re-read from the government portals including the ICMR-STS extension to 10 June; the major international awards re-checked against their own pages, correcting the EPFL and Swiss Excellence deadlines."
};
