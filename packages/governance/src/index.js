// @kursu/governance — proposal thresholds and tallying (pure functions).

const TOTAL = Number(process.env.KURSU_TOTAL_MEMBERS || 1925000);
const ABS = process.env.KURSU_PROPOSAL_THRESHOLD_ABSOLUTE;
const RATIO = process.env.KURSU_PROPOSAL_THRESHOLD_RATIO;

/** Endorsements needed to promote a proposal to a live vote. */
export function proposalThreshold(total = TOTAL) {
  if (ABS) return Number(ABS);
  if (RATIO) return Math.round(total * Number(RATIO));
  return Math.round(total * 0.01); // default ~1%
}

/** A proposal becomes a live poll once endorsements reach the threshold. */
export function isPromoted(endorsements, total = TOTAL) {
  return endorsements >= proposalThreshold(total);
}

/**
 * The threshold (and other rules) are themselves votable. Changing a rule
 * requires a majority of ENROLLED members — note this is a quorum-of-enrolled,
 * not merely a majority of votes cast, so a low-turnout poll cannot flip a rule.
 * Decide quorum semantics explicitly per deployment.
 */
export function ruleChangePasses(yesVotes, enrolledCount) {
  const need = Number(process.env.KURSU_RULE_CHANGE_RATIO || 0.51);
  return yesVotes >= Math.ceil(enrolledCount * need);
}

/** Tally a set of {option} signals into counts. */
export function tally(votes, options) {
  const counts = Object.fromEntries(options.map((o) => [o, 0]));
  for (const v of votes) if (v.option in counts) counts[v.option] += 1;
  return counts;
}
