export function References() {
  return (
    <article className="page page-stack">
      <section className="heading-group">
        <h1>References &amp; further reading</h1>
        <p className="lead">
          Primary sources for the paper, grouped by what they support.
        </p>
      </section>

      <section className="heading-group">
        <h2>Conceptual frame</h2>
        <p>
          These references support the narrow technical claim: off-chain systems can improve the cooperative
          path, but unilateral settlement still consumes finite Bitcoin blockspace. Read protocol throughput
          claims separately from fallback enforcement claims.
        </p>
      </section>

      <section className="section-stack">
      <h2>Layer and protocol sources</h2>
      <ul>
        <li>
          Poon and Dryja, <a href="https://lightning.network/lightning-network-paper.pdf">The Bitcoin Lightning Network</a>.
        </li>
        <li>
          Burchert, Decker, and Wattenhofer,{' '}
          <a href="https://doi.org/10.1098/rsos.180089">
            Scalable Funding of Bitcoin Micropayment Channel Networks
          </a>.
        </li>
        <li>
          Burak,{' '}
          <a href="https://mailing-list.bitcoindevs.xyz/bitcoindev/345972294.3114897.1686144607871@eu1.myprofessionalmail.com/T/">
            Ark: A Layer 2 Protocol for Bitcoin
          </a>.
        </li>
        <li>
          Ark Protocol docs:{' '}
          <a href="https://ark-protocol.org/intro/vtxos/index.html">VTXOs</a> and{' '}
          <a href="https://ark-protocol.org/intro/clark/index.html">Covenant-less Ark</a>.
        </li>
        <li>
          Robin Linus, <a href="https://bitvm.org/bitvm.pdf">BitVM: Compute Anything on Bitcoin</a>.
        </li>
      </ul>
      </section>

      <section className="section-stack">
      <h2>Lightning security and mass-exit work</h2>
      <ul>
        <li>
          Harris and Zohar,{' '}
          <a href="https://arxiv.org/abs/2006.08513">Flood &amp; Loot: A Systemic Attack on the Lightning Network</a>.
        </li>
        <li>
          Riard and Naumenko,{' '}
          <a href="https://arxiv.org/abs/2006.01418">Time-Dilation Attacks on the Lightning Network</a>.
        </li>
        <li>
          Sguanci and Sidiropoulos,{' '}
          <a href="https://arxiv.org/abs/2208.01908">Mass Exit Attacks on the Lightning Network</a>.
        </li>
        <li>
          Lightning Network Specifications,{' '}
          <a href="https://github.com/lightning/bolts/blob/master/03-transactions.md">
            BOLT 3: Bitcoin Transaction and Script Formats
          </a>.
        </li>
      </ul>
      </section>

      <section className="section-stack">
      <h2>Mempool, relay, and policy references</h2>
      <ul>
        <li>
          Gloria Zhao, <a href="https://bips.dev/431">BIP 431: Topology Restrictions for Pinning</a>.
        </li>
        <li>
          Bitcoin Core Developers, <a href="https://bitcoincore.org/en/releases/28.0/">Bitcoin Core 28.0 Release Notes</a>.
        </li>
        <li>
          Bitcoin Core Developers, <a href="https://bitcoincore.org/en/releases/31.0/">Bitcoin Core 31.0 Release Notes</a>.
        </li>
        <li>
          Bitcoin Core Developers,{' '}
          <a href="https://github.com/bitcoin/bitcoin/blob/master/doc/policy/packages.md">
            Package Mempool Accept Policy
          </a>.
        </li>
        <li>
          Suhas Daftuar,{' '}
          <a href="https://delvingbitcoin.org/t/an-overview-of-the-cluster-mempool-proposal/393">
            An overview of the cluster mempool proposal
          </a>.
        </li>
      </ul>
      </section>

      <section className="section-stack">
      <h2>Reproducibility</h2>
      <ul>
        <li>
          <a href={`${import.meta.env.BASE_URL}blockspace-conservation-may-2026.pdf?v=1.10.3`}>
            Download the compiled paper PDF
          </a>.
        </li>
        <li>
          <a href={`${import.meta.env.BASE_URL}blockspace-conservation-may-2026.tex`}>
            Download the LaTeX source
          </a>.
        </li>
        <li>
          The interactive toy reproduces the 1-day, 14-day, and 28-day table figures and lets readers change
          the assumptions directly.
        </li>
        <li>
          <a href={`${import.meta.env.BASE_URL}hostile-review.md`}>Download the hostile-review memo</a>.
        </li>
        <li>
          Empirical <code>ρ_obs</code> values must be backed by an archived dataset, parser, checksums, and
          intermediate results before being treated as measured claims.
        </li>
      </ul>
      </section>
    </article>
  )
}
