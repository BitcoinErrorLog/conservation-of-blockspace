# Hostile-read memo — Conservation of Blockspace

Anticipated objections and concise responses for Lightning implementers, mempool/policy reviewers, Ark builders, operator-assisted system designers, and academic readers.

## “You’re calling Lightning custodial / credit.”

**Response.** The paper separates unilateral enforcement from cooperative coordination. It does not need legal-custody claims: the narrow test is whether each user can force a spendable L1 claim inside W′ without cooperation.

## “ρ will improve after package relay / cluster mempool.”

**Response.** Better relay improves **ρ** and reduces stranded bytes; it does not remove **Σ Nᵢ eᵢ ≤ ρ C_max(W′)** for a simultaneous cohort with positive unilateral footprints. Treat cluster mempool as tightening the best case, not abolishing conservation.

## “Disjointness lemma is wrong for my protocol.”

**Response.** The lemma is a positive-footprint test. If your construction claims zero marginal unilateral exit weight, specify the transaction, output, script path, proof, or operator-independent mechanism that gives each user a spendable L1 claim.

## “Users never all exit at once.”

**Response.** Engineering worst cases matter when incentives correlate—bank runs, operator failures, feerate spikes. The bound is a **simultaneous cohort** envelope, not a prediction of average traffic.

## “Why use one day if layers use 14–28 days?”

**Response.** One day is the **fast-exit stress case**, not the default for all layers. The paper uses **14 days** as the cross-layer benchmark and **28 days** as the slow-settlement runway. Longer windows raise capacity by delaying finality, not by creating blockspace.

## “Ark batches exits — your e is too high.”

**Response.** Trees amortize coordination overhead; unilateral timeout paths still terminate in user-specific claims with positive weight. Substitute your measured **e**—the inequality structure stays.

## “Operator-assisted systems scale payments differently.”

**Response.** Separate **cooperative throughput** from **unilateral L1 enforcement under fee stress**. If cooperative paths dominate, say so, and document operator trust explicitly. The toy’s operator-assisted weights are **illustrative** until replaced by evidenced witness paths.

## “Your ρ example is not a measured dataset.”

**Response.** Correct. The ρ example is **illustrative methodology**, not the theorem. Treat measured ρ_obs as publication-grade only when the dataset, parser, checksums, and intermediate outputs are published.

## “Security zones are arbitrary rounding.”

**Response.** The `~66k–232k` range is only the fast-exit stress envelope at W′=137. The main cross-layer comparison is the 14-day benchmark table.
