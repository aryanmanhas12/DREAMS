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
  reviewed: "2026-09",
  reviewedLabel: "September 2026",
  /* What that pass actually covered, so the stamp does not over-claim. Spot
     checks are not a full audit and the interface should not imply one.

     This cycle re-swept all 180 links from an unrestricted host and, for the
     first time, checked the failures against a public resolver rather than
     trusting the sweep box. That distinction found the pass's real work.
     Three domains in this index have stopped existing — NXDOMAIN, confirmed
     independently, not a firewall and not bot protection:

       felixscholarship.org.uk  the Felix Scholarship's own site
       medengage.in             MedEngage
       cpcourse.org             the Computational Psychiatry Course

     All three programmes are alive; only their addresses died. Felix now runs
     through its partner universities, MedEngage moved to med-engage.com, and
     the Zurich course sits under the TNU's own domain. Every one is repointed.

     Checking Felix turned up a second error worth more than the link. This
     index listed its partners as Oxford, Cambridge, SOAS, Reading and LSHTM,
     and told public-health applicants that "LSHTM is a Felix partner, which
     makes this one of the best public-health funding routes available". Felix
     runs at three universities: Oxford, Reading and SOAS. Cambridge and LSHTM
     are not among them, so that sentence sent people to build a plan around a
     scholarship they could not hold there.

     The US PhD entry had an eligibility trap of the DAAD WISE kind. It linked
     to the NSF Graduate Research Fellowship, which requires US citizenship,
     national status or a green card, so an Indian applicant is excluded before
     the first question. The entry's substance was right — US doctorates are
     salaried and MBBS is accepted — but the link pointed at the one route
     closed to the reader. It now points at a real departmental admissions page
     and names the GRFP as the trap it is, because it is the first thing anyone
     searching will find.

     Two links had drifted and were repointed: the J N Tata Endowment loan
     scholarship and the Inlaks scholarship page. ICMR-STS was re-read against
     the DHR portal and is correct as written, including the ₹60,000 stipend,
     the 1st and 2nd professional year restriction, and the 30 May close that
     DHR extended to 10 June. Nothing else in the Indian schemes had moved.

     What this pass did NOT do: re-verify all 161 fixed-window deadlines
     one by one. The Indian schemes and the dead links were the priority, and
     the rest carry the dates confirmed in the August pass. */
  scope: "All 180 links re-swept and every failure re-checked against a public resolver, which found three programmes whose domains have lapsed (Felix, MedEngage, the Zurich computational psychiatry course), all now repointed; the Felix partner list corrected from five universities to the three that actually run it; and an NSF fellowship closed to Indian nationals removed from the US doctorate entry and named as a trap."
};
