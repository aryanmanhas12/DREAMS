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
     checks are not a full audit and the interface should not imply one. */
  scope: "Every link in the index was checked and the dead ones repointed; Indian schemes and the largest government scholarships had their dates re-read from source."
};
