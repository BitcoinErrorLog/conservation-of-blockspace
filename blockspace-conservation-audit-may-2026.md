# Audit Report: Blockspace Conservation Paper

**Date:** 2026-05-09  
**Paper:** `blockspace-conservation-may-2026.tex`  
**Audit scope:** mathematical proof, numeric reproducibility, citation provenance, protocol assumptions, hostile-review readiness, and editorial recommendations.

## Executive Verdict

The core thesis is strong: a non-custodial layer cannot give every user unilateral enforcement without reserving some positive L1 enforcement footprint inside a finite window. The canonical form of the paper should be the scheduling bound:

```tex
\sum_i N_i e_i \le \rho C_{\max}(W')
```

The paper is not yet ready to be treated as the canonical reference. The central inequality survives review, but too many surrounding claims are vulnerable: several citations are dead or unverifiable, the `rho` worked example contains an internal percentage error, the Lightning weight derivation is not tied cleanly to BOLT 3 units, and the proof uses queueing/Little's Law where a direct counting argument would be cleaner.

The fastest path to a peer-impressive paper is not a major rewrite. It is a disciplined tightening pass: make the theorem smaller and harder, move weaker economics into remarks, turn empirical material into reproducible examples, and remove rhetorical hooks that let reviewers dodge the bound.

## Critical Findings

### C1. Empirical `rho` provenance is not publication-grade

**Location:** lines 92-127, 129-142, 368-372

The paper claims a specific `mempool.space` snapshot, block range, loss accounting, tool, commit, tag, and command. I could not verify the cited snapshot artifact or `mempool-observer` commit/tool path from public sources during this audit. Fetching the cited snapshot URL did not return a tarball; it returned the current mempool.space web page content. Search results did not confirm commit `8f6c3a9` or a `mempool-observer` tool at the cited path.

**Impact:** This is a blocker for canonical publication. The theorem does not depend on this dataset, but the paper currently presents the example as reproducible.

**Recommendation:** Reclassify the section as either a placeholder methodology with no concrete measured values, or replace it with a real archived artifact: immutable URL, checksum, exact script repository, exact commit, command output, and intermediate CSV/JSON.

### C2. The `rho` worked example has an internal arithmetic/labeling error

**Location:** line 102

The paper says `w_replaced = 118,400,000 wu (14% of capacity)`. With the paper's own denominator:

```text
Cmax(137) = (4,000,000 - 2,000) * 137 = 547,726,000 wu
118,400,000 / 547,726,000 = 21.62%
```

The total loss terms sum to `160,200,000 wu`, which gives:

```text
rho_obs = 1 - 160,200,000 / 547,726,000 = 0.7075179926
```

The final `rho_obs ~= 0.71` is arithmetically correct, but the `14%` parenthetical is not.

**Recommendation:** Correct or remove the `14%` claim. Also change "All entries in Tables 1 and 2 use this procedure" because the tables use scenario `rho` values, not the observed `0.7075` value.

### C3. Several cited URLs are dead, weak, or not the claimed artifact

**Location:** bibliography

Dead or high-risk references found:

- `https://lightning.network/channel-factories.pdf` returned 404.
- `https://acinq.co/blog/lightning-network-telemetry-q3-2025` returned 404.
- `https://github.com/bitcoin/bitcoin/blob/master/doc/policy.rst` returned 404.
- `https://data.mempool.space/snapshots/mainnet-2025-10-05T00:00Z.tar.gz` did not return the claimed snapshot archive.
- `mempool-observer` at commit `8f6c3a9` / tag `v2.4.1` was not verified.
- `Easley2019` is in the bibliography but is not cited.

Verified or usable with version pinning:

- BIP-431 exists, is Draft, and describes TRUC topology restrictions.
- BOLT 3 provides authoritative expected weights for commitment and HTLC transactions.
- Sguanci et al. mass-exit paper exists and supports the general mass-exit framing.
- Delving Bitcoin cluster mempool overview exists and supports the policy-evolution discussion.
- Ark protocol docs support VTXO trees, pseudo-covenants, forfeit clauses, and expiry.
- BitVM paper exists and supports the claim that on-chain execution is dispute-only in the cooperative case.

**Recommendation:** Make bibliography hygiene a release gate. Replace dead links with stable sources, archived copies, or remove the claims.

### C4. The proof is stronger without queueing theory and Little's Law

**Location:** lines 162-176, 182-184

The paper invokes a single-server queue and Little's Law, but the claim being proved is a finite-window capacity bound. Little's Law introduces unnecessary assumptions and gives hostile academic reviewers an easy target.

The core proof only needs:

1. Each credible exit requires a minimal package with positive weight `e_i`.
2. The packages cannot all share the same enforcement bytes without leaving the unilateral threat model.
3. The window can admit at most `rho Cmax(W')` enforcement weight.
4. If demand exceeds that amount, at least one package cannot confirm within `W'`.

**Recommendation:** Replace the queueing proof with a direct counting/scheduling proof. Keep the lead-time formula as an operational corollary, not as part of the theorem.

### C5. `rho` is doing too many jobs

**Location:** lines 65-99, 153-175, 251-298, 319-327

The paper uses `rho` as:

- a friction coefficient,
- a policy/relay admission coefficient,
- a deadweight-loss accounting ratio,
- a scenario knob,
- a congestion endogeneity proxy,
- and an empirical observation.

That is conceptually acceptable only if the paper explicitly separates model `rho` from observed `rho_obs`. Right now, `C_eff = rho sum c_b` and the later estimator `rho = 1 - losses / Cmax` are not identical unless `sum c_b = Cmax` and each loss term maps cleanly to unavailable enforcement capacity.

**Recommendation:** Define `rho` as a model parameter in the theorem. Define `rho_obs` separately as one possible estimator. State the estimator's assumptions and do not imply all tables are measured from it.

### C6. Lightning weight model needs a derivation appendix

**Location:** lines 222-232, 257-273

The paper's formula is:

```tex
e_{\mathrm{LN}}(h) \approx 590 + 141h \text{ vB}
```

BOLT 3 expected weights are in weight units, not vB:

- Commitment, no anchors: `724 + 172 * num-untrimmed-htlc-outputs wu`
- Commitment, anchors: `1124 + 172 * num-untrimmed-htlc-outputs wu`
- HTLC-timeout, anchors: `666 wu`
- HTLC-success, anchors: `706 wu`

The paper's active value, `1154 vB = 4616 wu`, is plausible if it includes an anchor commitment plus four second-stage HTLC claims, but the derivation is not shown and the coefficient `141 vB` does not map directly to the BOLT 3 `172 wu` commitment increment. The idle value, `590 vB = 2360 wu`, also needs decomposition.

**Recommendation:** Add a short Lightning weight appendix that explicitly distinguishes commitment transaction weight, anchor/CPFP child weight, HTLC output increments, HTLC second-stage transactions, and final spendability. If the numbers are conservative operational estimates, label them as such.

### C7. The V3/TRUC framing is too brittle

**Location:** lines 153-169, 190-198, 204-211

BIP-431 exists and supports 1-parent-1-child topology restrictions, including the 10,000 vB TRUC transaction limit and 1,000 vB child limit. It also states that anti-pinning benefits depend on node adoption and that TRUC is a policy, not consensus.

The paper sometimes makes the lower bound depend too heavily on V3/TRUC. That weakens the argument, because the real lower bound is more general: any unilateral exit requires some positive, user-specific L1 enforcement footprint. TRUC affects packing and fee-bumping, but it is not the reason bytes must exist.

**Recommendation:** Reframe disjointness as a general "positive unique enforcement footprint" assumption, then discuss V3/TRUC as one policy regime that makes the package topology easier to reason about.

### C8. The disjointness lemma overclaims "perfect batching implies custody"

**Location:** lines 190-201, 313-317

The underlying intuition is right: if no user has a unique unilateral enforcement path, the system has introduced a trust dependency. But the current wording risks an avoidable fight over definitions. "Perfect batching without custody is impossible" should become more mechanical:

> A construction that claims zero marginal unilateral exit weight must identify which transaction, output, script path, proof, or operator action lets each user obtain a spendable L1 claim without cooperation. If no such per-user path exists, the construction is outside the unilateral non-custodial model used here.

**Recommendation:** Avoid making legal custody the hinge. Use "outside the unilateral enforcement model" first; define custody/operator trust separately.

## High-Priority Findings

### H1. The abstract overstates the proof

**Location:** lines 33-39

"Formal proof," "any non-custodial layer," "no system can achieve perfect batching without introducing custody," and "strictly limited" are defensible only if all assumptions and definitions are tightened. The limitations section is more careful than the abstract.

**Recommendation:** Rewrite the abstract to say the paper gives a necessary lower bound for unilateral enforcement under explicit window, policy, and footprint assumptions.

### H2. `SLO` and probability `p` are introduced and then unused

**Location:** lines 65-66, 162-169

The paper introduces a target probability `p`, but the bound and tables are deterministic. That creates a dangling probabilistic model.

**Recommendation:** Either remove `p` and "SLO" entirely, or add a probabilistic section that defines confirmation probability, feerate distribution, and admission probability. For this paper, removal is cleaner.

### H3. `Proposition 1` is not proved

**Location:** lines 214-216

The proposition claims monotonic market-clearing feerate behavior and asymptotic rise as demand approaches capacity. This is plausible, but it requires a fee-market model the paper explicitly says it does not provide.

**Recommendation:** Demote to a remark or remove. If retained, cite fee-market literature and state it as intuition, not as a proposition.

### H4. Security zones mix parameter sets

**Location:** lines 300-307

Zone 1 uses active exits at `rho=0.7`; the upper end of Zone 2 uses idle exits at `rho=1.0`. That is useful as a headline envelope, but it is not one fixed scenario.

**Recommendation:** Add one sentence: "These zones are an envelope over state and efficiency assumptions, not a single homogeneous cohort guarantee."

### H5. `W' = 137` versus `144` blocks must be resolved

**Location:** lines 237-238, 273, 297-298

The paper computes with `137` blocks but cites a claimed telemetry median of `144`. The cited ACINQ page was not found.

**Recommendation:** Use one number consistently or explain the conversion. If "one day" is the intended basis, use `144` blocks. If `137` comes from a specific observed median or safety haircut, cite it.

### H6. The Ark section is too thin relative to Lightning

**Location:** lines 247-249

Ark docs support VTXO trees, pseudo-covenants, user leaf outputs, forfeit clauses, and expiry. They do not verify the paper's specific `660 vB` / `3200 wu` estimate.

**Recommendation:** Either add a derivation or label the Ark row as illustrative. The safest canonical framing is: "Ark-like protocols must supply `e` for their concrete timeout path; this paper shows how to plug that `e` into the bound."

### H7. "Information-theoretic" is imprecise

**Location:** line 48

The bound is a resource/scheduling/counting lower bound, not information-theoretic in the Shannon sense.

**Recommendation:** Replace with "static byte-accounting lower bound" or "finite-window scheduling lower bound."

### H8. "Trusted credit" and "no native bitcoin" will distract some reviewers

**Location:** lines 43-45, 50-51, 313-317

The paper can still use this frame, but it should not lead the formal argument. Lightning reviewers may reject "credit" or "custody" language and miss the bound.

**Recommendation:** Define the mechanism first: off-chain claims remain valid only while unilateral enforcement remains available. Move "trusted credit" to implications or a carefully scoped remark.

## Numerical Reproduction

All table entries depending only on stated formulas reproduce exactly.

### Recomputed capacities

- `Cmax(137) = 547,726,000 wu`
- `Cmax(144) = 575,712,000 wu`
- `Cmax(432) = 1,727,136,000 wu`
- `Cmax(2000) = 7,996,000,000 wu`
- `Cmax(2016) = 8,059,968,000 wu`

### Table 1

Using `W'=137`, `e_active=4616 wu`, `e_idle=2360 wu`:

- `rho=1.0`: active `118,658`, idle `232,087`
- `rho=0.9`: active `106,792`, idle `208,878`
- `rho=0.7`: active `83,060`, idle `162,461`
- `rho=0.5`: active `59,329`, idle `116,043`

These match the paper.

### Table 2

Using `rho=0.8`:

- Retail panic, `137`, active: `94,926`
- Quiet exit, `137`, idle: `185,669`
- Mixed economy, `432`, `e_mix=3488 wu`: `396,132`
- Institutional, `2016`, active: `1,396,874`

These match the paper. If the text uses `W' ~= 2000` instead of `2016`, the active institutional value is `1,385,788`, not `1,396,874`.

### Numeric edits required

- Fix `118,400,000 wu (14% of capacity)` to `21.6%` or remove the percentage.
- Do not say all table rows use the observed `rho` procedure. They use scenario coefficients.
- Resolve `137`, `144`, `2000`, and `2016` as separate concepts: exact computation, one-day approximation, cited median, and two-week approximation.

## Claim-Evidence Matrix

### Strong as written or nearly strong

- The central inequality is valid as a necessary finite-window capacity condition if every user has positive unilateral enforcement weight and if the effective window capacity is bounded by `rho Cmax(W')`.
- Cooperation can reduce actual contention, but it does not prove unilateral exit capacity for an adversarial or non-cooperative cohort.
- Cluster mempool/package relay/TRUC can improve relay reliability and observed efficiency, but cannot create more L1 weight.
- Longer windows increase the number of exits that can clear, but the tradeoff is time, not blockspace creation.

### Needs narrower wording

- "Any non-custodial layer" should become "any layer whose users retain unilateral L1 enforcement paths under the stated model."
- "Strictly equivalent to Layer 1 capacity" should become "bounded above by enforcement-eligible L1 capacity over the window."
- "Perfect batching without custody is impossible" should become "zero marginal unilateral enforcement weight is outside the model unless the protocol specifies a user-specific enforcement path."
- "Information-theoretic" should become "byte-accounting" or "scheduling."
- "Security Cliff" and "Death Spiral" should be used sparingly; "Security Slope" is the more precise concept.

### Needs evidence before publication

- The `rho_obs` dataset and all four loss terms.
- ACINQ telemetry and the `144` block claim.
- Mining pool template audit `>99%` claim.
- LSP two-week recommendation.
- Ark `660 vB` / `3200 wu` estimate.
- `mempool-observer` command and commit.

### Should be removed unless supported

- `Easley2019` bibliography entry if fee-market modeling stays out of scope.
- Little's Law citation if the proof becomes a counting argument.
- The formal `Proposition 1` unless the paper adds a fee-market model.

## Protocol Review

### Lightning

The Lightning section is directionally correct: force-close capacity depends on channel state, HTLC count, anchor/fee-bump mechanics, and the applicable delay. The weak point is not the concept; it is the derivation.

Recommended additions:

- Add a compact derivation of `e_idle` and `e_active` from BOLT 3 expected weights.
- State whether the model includes commitment transaction only, CPFP anchor child, HTLC second-stage transactions, final delayed spend, or all of them.
- Separate "channel" from "user." In mass exits, the binding unit may be channels/edges rather than unique human users unless the paper defines user aggregation.
- Add a note that watchtowers and LSPs improve monitoring/cooperation but do not remove the need for an L1 enforcement transaction when unilateral settlement is required.

### Ark-like systems

Ark docs support the qualitative claim that users hold VTXO leaves and that timeout paths eventually create on-chain claims. They also show that covenant-less Ark introduces coordination and liveness assumptions through pre-signed trees and key deletion.

Recommended additions:

- Treat the Ark numbers as illustrative until derived.
- Distinguish covenant Ark, covenant-less Ark, and Bark/implementation-specific exits.
- Replace universal phrasing with a substitution rule: each Ark-like design must supply `e_timeout`, `W'`, and operator/cooperation assumptions.

### V3/TRUC, Package Relay, Cluster Mempool

BIP-431 is Draft and describes an opt-in policy whose anti-pinning benefits depend on adoption. It supports the 1P1C claim and the child-size limit. Cluster mempool supports the paper's point that policy can improve incentive compatibility and packing, but it does not create consensus block weight.

Recommended edits:

- Do not say current mainnet behavior is only "experimental" without checking current Bitcoin Core releases. Say BIP-431 is Draft and adoption/policy support must be measured.
- Use TRUC as a policy example, not the foundation of the conservation law.
- Replace the dead `policy.rst` citation with current Bitcoin Core policy docs or BIP-431 plus relevant Bitcoin Core PRs.

### Factories, BitVM, Spark-like systems

These should remain scoped as examples unless the paper supplies concrete `e` values. BitVM's own paper emphasizes cooperative off-chain execution with on-chain dispute paths; that supports the paper's general model. It does not by itself prove a per-user exit cost for rollup-style deployments.

Recommended edit:

- Add a generic "Protocol substitution rule": to rebut the bound, a protocol must provide a concrete unilateral enforcement path and show the per-user marginal L1 weight, admissible window, and trust assumptions.

## Hostile Review Objections

### "Lightning is not custodial."

Correct response: The paper should not need this claim. It should say Lightning remains non-custodial while the unilateral enforcement path is credible. Above the capacity envelope, users rely on cooperation, operators, or delayed resolution.

Edit: Replace legal-custody language with "outside the unilateral enforcement guarantee" unless explicitly discussing custodians.

### "`rho` will improve with package relay or cluster mempool."

Correct response: Better relay can increase observed `rho`; it cannot remove the byte bound. The paper already says this, but should separate policy improvements from capacity creation.

Edit: Add one sentence after the `rho` definition: "Protocol and policy improvements change `rho` and `e`; they do not change the fact that `rho Cmax(W')` is finite."

### "Users never all exit at once."

Correct response: The model is a simultaneous-cohort envelope, not an average throughput prediction. Correlated exits are exactly what matter for non-custodial safety: operator failure, revoked states, bridge failure, large LSP outage, fee shocks, or censorship.

Edit: Add "simultaneous cohort" in the abstract and limitations.

### "Your Lightning weights are wrong."

Correct response: This is the easiest objection to avoid. Show the derivation and invite substitution.

Edit: Add a derivation appendix and a sentence: "Readers who prefer a different channel template can substitute its measured `e` in Equation 1."

### "Ark batches exits."

Correct response: Ark batches coordination and optimizes normal operation; unilateral timeout paths still create on-chain claims. The per-user cost may be lower than the paper's estimate, but it remains positive unless the protocol changes the trust model.

Edit: Change the Ark section from a confident numeric statement to a parameterized example.

### "Little's Law is misused."

Correct response: Remove it. The theorem does not need it.

Edit: Replace lines 172-176 with the counting proof suggested below.

### "This is a Paykit/Atomicity pitch."

Correct response: Keep Paykit and Atomicity out of the paper. A separate companion note can say why explicit trust/payment coordination matters, but the paper should stand independently.

Edit: No references to Paykit or Atomicity in the paper body.

## Editorial Revision Queue

### Critical edits

1. Replace the `rho` empirical worked example with verified reproducible data or demote it to methodology.
2. Correct the `14%` arithmetic error.
3. Replace dead URLs and remove unverified citations.
4. Rewrite the proof as direct finite-window counting.
5. Add Lightning weight derivation or mark current values as illustrative.
6. Resolve `137` versus `144` and `2000` versus `2016`.

### High-priority edits

1. Rewrite the abstract to match the theorem's actual scope.
2. Split `rho` into model `rho` and observed `rho_obs`.
3. Reframe disjointness around positive unique enforcement footprint, not V3 alone.
4. Demote or remove `Proposition 1`.
5. Clarify Security Slope zones as an envelope over assumptions.
6. Replace "information-theoretic" with "byte-accounting" or "scheduling."

### Medium-priority edits

1. Move "trusted credit" rhetoric out of the formal setup.
2. Add a short "How to falsify or parameterize this paper" paragraph.
3. Add a reproducibility appendix for every table.
4. Add version pinning for BIP-431, BOLT 3, Bitcoin Core policy docs, and Ark docs.
5. Add a glossary entry for "cooperative," "operator-assisted," "custodial," and "unilateral."

### Low-priority edits

1. Rename "Panic Identity" to "maximum physical capacity" or similar.
2. Use one notation style for `Cmax`, `C_eff`, `Nmax`, and `W'`.
3. Consider moving implementation details into an appendix.
4. Remove unused theorem environment `constraint` if it stays unused.

## Suggested Replacement Wording

### Abstract replacement

```tex
Bitcoin layers are often described as throughput multipliers, but their non-custodial safety still depends on the base layer when users must enforce without cooperation. We define credible exit as a user's ability to confirm the transaction set needed to obtain a spendable L1 claim under their keys within a usable safety window $W'$ and with non-dust value remaining. We then state a finite-window byte-accounting bound: for any simultaneous exit cohort with per-user enforcement weights $e_i$, credible unilateral enforcement requires $\sum_i N_i e_i \le \rho C_{\max}(W')$, where $\rho$ captures relay, policy, and fee-bumping efficiency. This bound does not predict average payment throughput; it gives a necessary condition for worst-case non-cooperative exit. We instantiate the model for Lightning-style and Ark-style constructions and show how longer windows increase clearance capacity only by trading settlement speed for enforcement time.
```

### Counting proof replacement

```tex
Let $\Pi_u$ be the minimal transaction package that gives user $u$ a spendable L1 claim without cooperation, and let $e_u = w(\Pi_u)$ be its weight. By the unilateral-footprint assumption, the packages for distinct users require disjoint marginal enforcement weight: no single zero-marginal package can independently satisfy two users' claims unless the construction introduces a cooperative or operator-mediated dependency outside this model. Therefore a cohort with $N_i$ users of type $i$ requires at least $A=\sum_i N_i e_i$ admitted enforcement weight.

During the usable window $W'$, consensus limits each block to at most $4{,}000{,}000-w_{cb}$ weight units, and relay/mining/policy friction reduces the enforcement-eligible envelope to at most $\rho C_{\max}(W')$. If $A > \rho C_{\max}(W')$, then the cohort requires more admitted weight than the window can contain. At least one user's package cannot confirm within $W'$, contradicting credible exit. Hence $\sum_i N_i e_i \le \rho C_{\max}(W')$ is necessary.
```

### `rho` replacement

```tex
We use $\rho \in (0,1]$ as a model parameter for the fraction of physical block capacity that is actually usable by the exit cohort under prevailing relay, package, fee-bumping, and miner-selection conditions. Separately, an observed coefficient $\rho_{\mathrm{obs}}$ may be estimated from historical data by accounting for replacement overhead, pinning failures, stranded dust, non-admitted packages, and other loss terms. The theorem requires only a chosen $\rho$; empirical sections must state how $\rho_{\mathrm{obs}}$ was measured and which assumptions map those observations to enforcement-eligible capacity.
```

### Disjointness replacement

```tex
The lower bound does not require every protocol to expose the same transaction topology. It requires a weaker condition: each user who claims unilateral exit must possess a non-cooperative path to a spendable L1 claim, and that path must have positive marginal weight. Shared roots, trees, factories, and fraud-proof systems can amortize setup and cooperative operation, but the unilateral path must eventually identify which bytes enforce which user's claim. A construction that claims zero marginal enforcement weight must specify the mechanism by which each user exits without cooperation; otherwise it is outside the unilateral non-custodial model analyzed here.
```

### Limitations strengthening

```tex
This paper proves a necessary capacity condition, not a payment-throughput forecast. Cooperative closes, operator-assisted refreshes, liquidity swaps, watchtowers, and custodial exits may reduce observed contention. They do not prove that every user retains unilateral enforcement inside $W'$ unless their fallback transaction packages fit inside the finite L1 window. The model is therefore most relevant under correlated failure, adversarial congestion, operator outage, fee stress, or any event where cooperation cannot be assumed.
```

## Reproducibility Checklist

Before publication, the paper should include or link:

- Exact TeX version and Git commit for the paper.
- A tiny script that recomputes every table from `W'`, `rho`, `w_cb`, and `e`.
- A Lightning weight appendix tied to a pinned BOLT 3 revision.
- A source artifact for any claimed Lightning `to_self_delay` distribution.
- An archived `rho_obs` dataset with checksums.
- Exact command output for `rho_obs`, not only a command example.
- Current Bitcoin Core policy references for TRUC/package relay/cluster mempool.
- A note that all protocol examples can be challenged by substituting better `e`, `W'`, and `rho` values.

## Publication Readiness

The paper can become the canonical document if the next revision makes the core claim narrower and harder:

1. Lead with credible unilateral enforcement, not "layers are credit."
2. Prove the finite-window byte bound with a counting argument.
3. Treat all protocol sections as parameter substitutions.
4. Make empirical claims reproducible or remove them.
5. Let the strongest sentence be mechanical: if all users must be able to exit alone, their enforcement bytes must fit inside the window.

