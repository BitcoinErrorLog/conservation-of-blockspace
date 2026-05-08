# Hostile-read memo — Conservation of Blockspace

Anticipated objections and concise responses for Lightning implementers, mempool/policy reviewers, Ark and Spark builders, and academic readers.

## “You’re calling Lightning custodial / credit.”

**Response.** The paper separates bearer settlement on L1 from coordinated promises elsewhere. “Trusted credit” refers to reliance on peers, operators, or time windows—not necessarily legal custody. Narrow claims to **unilateral enforcement inside W′** and cite the formal credible-exit definition.

## “ρ will improve after package relay / cluster mempool.”

**Response.** Better relay improves **observed ρ** and reduces stranded bytes; it does not remove **Σ Nᵢ eᵢ ≤ ρ C_max(W′)** for disjoint unilateral packages under the stated assumptions. Treat cluster mempool as tightening the best case, not abolishing conservation.

## “Disjointness lemma is wrong for my protocol.”

**Response.** The lemma assumes non-overlapping minimal enforcing packages under the topology policy discussed. If your construction genuinely shares leaves across users without custody, spell out the mechanism—reviewers should challenge it explicitly. Many designs batch cooperatively or custody aggregated value.

## “Users never all exit at once.”

**Response.** Engineering worst cases matter when incentives correlate—bank runs, operator failures, feerate spikes. The bound is a **simultaneous cohort** envelope, not a prediction of average traffic.

## “Ark batches exits — your e is too high.”

**Response.** Trees amortize coordination overhead; unilateral timeout paths still terminate in user-specific claims with positive weight. Substitute your measured **e**—the inequality structure stays.

## “Spark scales payments differently.”

**Response.** Separate **cooperative throughput** from **unilateral L1 enforcement under fee stress**. If cooperative paths dominate, say so—and document operator trust explicitly. The toy’s Spark weights are **illustrative** until replaced by evidenced witnesses.

## “Your mempool snapshot / telemetry citation is wrong.”

**Response.** Empirical ρ is **worked-example methodology**, not the theorem. Challenge specifics by reproducing loss accounting from public archives; update numbers without touching the conservation bound.

## “Queueing citation / Little’s law is overkill.”

**Response.** Treat the prose proof as intuition for “backlog exceeds window.” If preferred, replace with a minimal counting argument: arrivals exceeding cumulative admissible weight cannot all schedule inside W′.

## “Security zones are arbitrary rounding.”

**Response.** Zones headline rounded bounds from explicit floors (83,060 active @ ρ=0.7 vs 232,087 idle @ ρ=1.0 at W′=137). Use exact integers in reviewer-facing tables; keep narrative rounding separate.
