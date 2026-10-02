/* Dreams Counselor — when this index was last checked against the world.

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
  reviewed: "2026-09",
  reviewedLabel: "September 2026",
  /* What that pass actually covered, so the stamp does not over-claim. Spot
     checks are not a full audit and the interface should not imply one.

     This is the second September pass. It re-read three groups of entries
     against their official pages: the UN, Germany and Australia routes; every
     tier-1 programme the index marked open this month, plus each programme
     the scroll atlas names as a region's highest-graded; and the tier-2
     entries whose own window text contradicted an "open" badge.

     It found more wrong than right in that last group, and the errors were
     the dangerous kind: an open badge on something that cannot be entered.

       EMERALD, the European PhD for medical doctors, was listed as recruiting.
       Its last call closed on 28 August 2022 and its grant ends in June 2027;
       only its search description still says the call is open. Now skipList.
       Amgen Scholars told Indian students to apply to the Europe programme,
       which takes only students enrolled in a Bologna-process country. Only
       the Asia hosts are open from India, and they close 1 February.
       ICGEB's Falaschi PhD fellowships were said to accept MBBS. They name a
       BSc (Honours) or an MSc. The door that names MBBS is the ICGEB-JNU PhD
       in New Delhi, which also needs a JRF-level fellowship in hand.
       Harvard's MPH-45 was described as requiring a doctoral degree that MBBS
       satisfies; it takes a master's or doctoral degree, or in some fields a
       bachelor's plus five years, as read through WES. One deadline, 1 Dec.
       Auckland's PhD asks for a thesis-bearing honours or master's degree, so
       the New Zealand domestic-fee doctorate opens after an MD or MS.
       The Duke policy fellowship wants a master's and five years' work, and
       its call is closed. Schwarzman closed on 9 September. Gates Cambridge
       moved to 8 December or 6 January. BIRAC BIG has not run a call since
       November 2025. FMI Basel's MD-PhD needs an approved experimental thesis.

     The first run of the new tools/recheck.js worklist then found three
     windows still describing finished rounds (Eiffel's 2026 session, the JHU
     Summer Institute's 2026 dates, and the WHO Youth Council call that closed
     in June and will not recur before 2028). All three were re-read and
     rewritten, and every entry verified this month carries checked: "2026-09".

     What this pass did NOT do: re-verify the generic cycles (US PhD
     admissions, most US MPH programmes, conference abstract windows) or the
     145 entries not marked open this month. Those carry the dates
     confirmed in the August pass. */
  scope: "The UN, Germany and Australia routes, and every tier-1 programme marked open in September 2026, re-read against official pages. That found an EU doctorate for doctors whose last call closed in 2022, two programmes whose stated degree rules exclude a bare MBBS (ICGEB's Falaschi fellowships and Auckland's PhD), Amgen's Europe programme wrongly listed as open to students in India, and stale dates for Gates Cambridge, Schwarzman and Harvard's MPH-45, all corrected."
};
