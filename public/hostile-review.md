# Anticipated Objections

Anticipated objections and concise responses for Lightning implementers, mempool/policy reviewers, Ark builders, operator-assisted system designers, and academic readers.

## “Are you saying layers are useless?”

**Response.** No. Layers can scale coordination, UX, liquidity, routing, batching, netting, and common-path payment flow. They do not scale Bitcoin’s unilateral settlement surface. Those are different claims.

## “Is trust bad?”

**Response.** No. Hidden trust is bad. Explicit trust can be named, bounded, priced, revoked, and audited. The site’s claim is that trust should be part of the design surface, not something buried under “layer” language.

## “Is credit the same as custody?”

**Response.** No. Credit, custody, operator coordination, liquidity dependence, and unilateral settlement are different trust surfaces. The useful question is which surface the protocol uses, who controls it, how long exposure lasts, and what the user can do alone.

## “Can cryptography remove the need for trust?”

**Response.** Cryptography can reduce trust and enforce fallback rights. It cannot create blockspace. If many users need L1 enforcement inside the same W′, the block-weight accounting constraint still applies.

## “ρ will improve after package relay / cluster mempool.”

**Response.** Better relay improves **ρ** and reduces stranded enforcement weight; it does not remove **Σ Nᵢ eᵢ ≤ ρ C_max(W′)** for a simultaneous cohort with positive unilateral footprints. Bitcoin Core 31 removes the CPFP carveout and expands some one-parent-one-child relay behavior beyond TRUC; that tightens the policy surface, not the physical ceiling.

## “Disjointness lemma is wrong for my protocol.”

**Response.** The lemma is a positive-footprint test. If your construction claims zero marginal unilateral exit weight, specify the transaction, output, script path, proof, or operator-independent mechanism that lets each user secure an operator-independent L1 claim.

## “Users never all exit at once.”

**Response.** Engineering worst cases matter when incentives correlate—bank runs, operator failures, feerate spikes. The bound is a **simultaneous cohort** envelope, not a prediction of average traffic.

## “Users are not channels, and channels are not exits.”

**Response.** Correct. The model counts **exit units**: unilateral enforcement traces. Human users, wallets, channels, VTXOs, and accounts map onto those traces according to the protocol and wallet topology.

## “Why use one day if layers use 14–28 days?”

**Response.** One day is the **fast-exit stress case**, not the default for all layers. The paper uses **14 days** as the cross-layer benchmark and **28 days** as the slow-settlement runway. Longer windows raise capacity by delaying finality, not by creating blockspace.

## “Ark batches exits — your e is too high.”

**Response.** Trees amortize coordination overhead; unilateral timeout paths still terminate in user-specific claims with positive weight. Substitute your measured **e**—the inequality structure stays.

## “Operator-assisted systems scale payments differently.”

**Response.** Separate **cooperative throughput** from **unilateral L1 enforcement under fee stress**. If cooperative paths dominate, say so, and document operator trust explicitly. The toy’s operator-assisted weights are **template values** until replaced by evidenced transaction traces, witness budgets, and fallback windows.

## “What should builders do with this?”

**Response.** Measure **e**, choose **W′**, expose assumptions, make fallback paths explicit, and design trust as a first-class object. A useful layer can be honest about whether it scales settlement, coordination, credit, liquidity, or UX.

## “Your ρ example is not a measured dataset.”

**Response.** Correct. The ρ example is **illustrative methodology**, not the theorem. Treat measured ρ_obs as publication-grade only when the dataset, parser, checksums, and intermediate outputs are published.

## “Why does the toy still show a fast-exit envelope?”

**Response.** The fast-exit envelope is a stress test. The main cross-layer comparison is the 14-day benchmark table, with 28 days as the slow-settlement runway.
