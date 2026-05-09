import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../App.css'
import {
  TOY_VERSION,
  classifySecurityZoneForDemand,
  classifyFastExitEnvelope,
  cMax,
  defaultCoinbaseWeight,
  effectiveCapacity,
  FAST_EXIT_WINDOW_BLOCKS,
  LAYER_BENCHMARK_WINDOW_BLOCKS,
  leadTimeBlocks,
  nMax,
  fastExitEnvelopeThresholds,
  securitySlopeBandsSameE,
  SLOW_SETTLEMENT_WINDOW_BLOCKS,
  windowCapacityRows,
} from '../lib/math'
import {
  SCENARIOS,
  scenarioEffectiveWeight,
  scenarioFromQueryString,
  scenarioToQueryString,
} from '../lib/scenarios'
import type { Scenario } from '../lib/scenarios'

type ToyState = {
  rho: number
  windowBlocks: number
  perUserWeight: number
  wCoinbase: number
}

const defaultScenario = SCENARIOS[0]

function initialToyStateFromUrl(): ToyState {
  if (typeof window === 'undefined') return scenarioToState(defaultScenario)
  const parsed = scenarioFromQueryString(window.location.search)
  return parsed ? scenarioToState(parsed) : scenarioToState(defaultScenario)
}

function initialScenarioIdFromUrl(): string {
  if (typeof window === 'undefined') return defaultScenario.id
  const parsed = scenarioFromQueryString(window.location.search)
  return parsed?.id ?? defaultScenario.id
}

const scenarioToState = (scenario: Scenario): ToyState => ({
  rho: scenario.rho,
  windowBlocks: scenario.windowBlocks,
  perUserWeight: scenarioEffectiveWeight(scenario),
  wCoinbase: scenario.wCoinbase ?? defaultCoinbaseWeight,
})

const buildCustomScenario = (state: ToyState): Scenario => ({
  id: 'custom',
  name: 'Custom inputs',
  description: 'Your manually tuned parameters',
  rho: state.rho,
  windowBlocks: state.windowBlocks,
  wCoinbase: state.wCoinbase,
  cohorts: [
    {
      id: 'custom-cohort',
      label: 'Custom',
      perUserWeight: state.perUserWeight,
      share: 1,
    },
  ],
})

const horizonBlocks = [72, FAST_EXIT_WINDOW_BLOCKS, 432, 1_008, LAYER_BENCHMARK_WINDOW_BLOCKS, SLOW_SETTLEMENT_WINDOW_BLOCKS]

const numberFormatter = new Intl.NumberFormat('en-US')

const zoneCopy: Record<string, string> = {
  safe: 'Safe',
  probabilistic: 'Probabilistic',
  insolvent: 'Insolvent',
}

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
})

const Chart = ({ points }: { points: { windowBlocks: number; maxUsers: number }[] }) => {
  const width = 640
  const height = 260
  const padding = 32
  const maxX = Math.max(...points.map((p) => p.windowBlocks), 1)
  const maxY = Math.max(...points.map((p) => p.maxUsers), 1)
  const pathD = points
    .map((point, index) => {
      const x = padding + (point.windowBlocks / maxX) * (width - 2 * padding)
      const y = height - padding - (point.maxUsers / maxY) * (height - 2 * padding)
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  return (
    <svg className="sparkline" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="N_max across windows">
      <path d={pathD} fill="none" stroke="#2563eb" strokeWidth={3} strokeLinecap="round" />
      {points.map((point) => {
        const x = padding + (point.windowBlocks / maxX) * (width - 2 * padding)
        const y = height - padding - (point.maxUsers / maxY) * (height - 2 * padding)
        return <circle key={point.windowBlocks} cx={x} cy={y} r={5} fill="#2563eb" />
      })}
      <text x={padding} y={20} className="sparkline-label">
        N_max vs. window W&apos;
      </text>
    </svg>
  )
}

export function BlockspaceToy() {
  const location = useLocation()
  const [state, setState] = useState<ToyState>(initialToyStateFromUrl)
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(initialScenarioIdFromUrl)
  const [shareStatus, setShareStatus] = useState<string>('')
  const [exitDemand, setExitDemand] = useState(50_000)

  // Sync from shareable URL (back/forward, pasted permalinks).
  useEffect(() => {
    const parsed = scenarioFromQueryString(location.search)
    if (parsed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- `location.search` is external input for shared presets
      setState(scenarioToState(parsed))
      setSelectedScenarioId(parsed.id ?? 'custom')
    }
  }, [location.search])

  const selectedScenario = SCENARIOS.find((scenario) => scenario.id === selectedScenarioId)

  const { rho, windowBlocks, perUserWeight, wCoinbase } = state

  const fastExitEnvelope = useMemo(() => fastExitEnvelopeThresholds(wCoinbase), [wCoinbase])
  const sameEBands = useMemo(
    () => securitySlopeBandsSameE(windowBlocks, perUserWeight, wCoinbase),
    [windowBlocks, perUserWeight, wCoinbase],
  )
  const benchmarkRows = useMemo(() => windowCapacityRows(0.8, wCoinbase), [wCoinbase])

  const stats = useMemo(() => {
    const totalCapacity = cMax(windowBlocks, wCoinbase)
    const usableCapacity = effectiveCapacity(rho, windowBlocks, wCoinbase)
    const maxUsers = nMax(rho, windowBlocks, perUserWeight, wCoinbase)
    const avgPerBlockCapacity = Math.max(0, (totalCapacity / Math.max(windowBlocks, 1)) || 0)
    const sampleDemand = 50_000
    const minLeadTime = leadTimeBlocks(sampleDemand, perUserWeight, rho, avgPerBlockCapacity)
    const zoneFastExit = classifyFastExitEnvelope(exitDemand, wCoinbase)
    const zoneSameE = classifySecurityZoneForDemand(
      exitDemand,
      sameEBands.lowerCapacity,
      sameEBands.upperCapacity,
    )
    return {
      totalCapacity,
      usableCapacity,
      maxUsers,
      zoneFastExit,
      zoneSameE,
      avgPerBlockCapacity,
      sampleDemand,
      minLeadTime,
    }
  }, [rho, windowBlocks, perUserWeight, wCoinbase, exitDemand, sameEBands])

  const chartPoints = useMemo(
    () =>
      horizonBlocks.map((blocks) => ({
        windowBlocks: blocks,
        maxUsers: nMax(rho, blocks, perUserWeight, wCoinbase),
      })),
    [rho, perUserWeight, wCoinbase],
  )

  const scenarioForPersistence =
    selectedScenarioId === 'custom'
      ? buildCustomScenario(state)
      : selectedScenario ?? buildCustomScenario(state)

  const applyScenario = (scenario: Scenario) => {
    setState(scenarioToState(scenario))
    setSelectedScenarioId(scenario.id)
    setShareStatus('')
    const query = scenarioToQueryString(scenario)
    window.history.replaceState(null, '', `${location.pathname}?${query}`)
  }

  const updateCustomState = (patch: Partial<ToyState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch }
      const customScenario = buildCustomScenario(next)
      const query = scenarioToQueryString(customScenario)
      window.history.replaceState(null, '', `${location.pathname}?${query}`)
      return next
    })
    setSelectedScenarioId('custom')
    setShareStatus('')
  }

  const shareScenario = async () => {
    const query = scenarioToQueryString(scenarioForPersistence)
    const url = `${window.location.origin}${window.location.pathname}?${query}`
    await navigator.clipboard.writeText(url)
    setShareStatus('Link copied!')
    setTimeout(() => setShareStatus(''), 2_000)
  }

  const exportScenario = () => {
    const payload = {
      toyVersion: TOY_VERSION,
      exportedAt: new Date().toISOString(),
      formulas: {
        cMax: '(4000000 - w_cb) * Wprime',
        nMax: 'floor(rho * cMax(Wprime) / e)',
        fastExitEnvelope:
          'lower = floor(0.7 * cMax(137) / e_active), upper = floor(1.0 * cMax(137) / e_idle)',
        sameEZones: 'lower = floor(0.7 * cMax(Wprime) / e), upper = floor(1.0 * cMax(Wprime) / e)',
      },
      scenario: scenarioForPersistence,
      metrics: {
        nMax: stats.maxUsers,
        rho,
        windowBlocks,
        perUserWeight,
        exitDemand,
        zoneFastExit: stats.zoneFastExit,
        zoneSameE: stats.zoneSameE,
        fastExitThresholds: fastExitEnvelope,
        sameEBands,
      },
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `blockspace-toy-${scenarioForPersistence.id}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app toy-embed">
      <header>
        <p className="eyebrow">Credible Exit Playground</p>
        <h1>Law of Conservation of Blockspace</h1>
        <p className="lede">
          Adjust the efficiency coefficient ρ, usable window W&apos;, and per-user enforcement weight
          e to see the lower bound on simultaneous exits implied by byte accounting. Compare a hypothetical
          simultaneous exit count to the fast-exit envelope and same-weight slope bands.
        </p>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Presets &amp; Inputs</h2>
            <p>Select a window benchmark or tweak the sliders.</p>
          </div>
          <div className="panel-actions">
            <button type="button" className="ghost" onClick={shareScenario}>
              Share current setup
            </button>
            <button type="button" className="ghost" onClick={exportScenario}>
              Download JSON
            </button>
          </div>
        </div>
        {shareStatus && <p className="share-status">{shareStatus}</p>}
        <div className="presets">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              className={selectedScenarioId === scenario.id ? 'preset active' : 'preset'}
              onClick={() => applyScenario(scenario)}
            >
              {scenario.name}
            </button>
          ))}
          <span className={selectedScenarioId === 'custom' ? 'preset active' : 'preset disabled'}>
            Custom
          </span>
        </div>

        <div className="controls-grid">
          <label className="control">
            <span>Simultaneous exits (demand N)</span>
            <input
              type="number"
              min={0}
              step={1000}
              value={exitDemand}
              onChange={(event) => setExitDemand(Math.max(0, Number(event.target.value)))}
            />
            <small>Compared to slope bands below — not to N_max capacity alone</small>
          </label>

          <label className="control">
            <span>Efficiency coefficient ρ</span>
            <div className="control-row">
              <input
                type="range"
                min={0.3}
                max={1}
                step={0.01}
                value={rho}
                onChange={(event) => updateCustomState({ rho: Number(event.target.value) })}
              />
              <input
                type="number"
                step={0.01}
                min={0}
                max={1}
                value={rho}
                onChange={(event) => updateCustomState({ rho: Number(event.target.value) })}
              />
            </div>
          </label>

          <label className="control">
            <span>Usable window W′ (blocks)</span>
            <input
              type="number"
              min={1}
              value={windowBlocks}
              onChange={(event) =>
                updateCustomState({ windowBlocks: Math.max(1, Number(event.target.value)) })
              }
            />
            <small>≈ {(windowBlocks / 144).toFixed(1)} days</small>
          </label>

          <label className="control">
            <span>Per-user weight e (wu)</span>
            <input
              type="number"
              min={1}
              value={perUserWeight}
              onChange={(event) =>
                updateCustomState({ perUserWeight: Math.max(1, Number(event.target.value)) })
              }
            />
            <small>
              LN idle ≈ 2,360 · HTLC-stress ≈ 5,848 · Ark-style illustrative ≈ 3,200 ·
              operator-assisted illustrative ≈ 3,400
            </small>
          </label>

          <label className="control">
            <span>Coinbase overhead w_cb (wu)</span>
            <input
              type="number"
              min={0}
              value={wCoinbase}
              onChange={(event) =>
                updateCustomState({ wCoinbase: Math.max(0, Number(event.target.value)) })
              }
            />
          </label>
        </div>
      </section>

      <section className="panel">
        <h2>Results</h2>
        <div className="metrics-grid">
          <article className="metric-card">
            <h3>N_max</h3>
            <p className="metric-value">{numberFormatter.format(stats.maxUsers)}</p>
            <p className="metric-hint">Upper bound on simultaneous exits at your ρ, W′, e</p>
          </article>
          <article className="metric-card">
            <h3>ρ·C_max (wu)</h3>
            <p className="metric-value">{numberFormatter.format(Math.round(stats.usableCapacity))}</p>
            <p className="metric-hint">
              of {numberFormatter.format(Math.round(stats.totalCapacity))} raw window capacity
            </p>
          </article>
          <article className="metric-card">
            <h3>Zone (fast-exit envelope)</h3>
            <p className="metric-value">{zoneCopy[stats.zoneFastExit]}</p>
            <p className="metric-hint">
              Demand vs ≤{numberFormatter.format(fastExitEnvelope.lowerSimultaneousExits)} / ≤
              {numberFormatter.format(fastExitEnvelope.upperSimultaneousExits)} (1-day mixed assumptions)
            </p>
          </article>
          <article className="metric-card">
            <h3>Zone (your e, ρ bands)</h3>
            <p className="metric-value">{zoneCopy[stats.zoneSameE]}</p>
            <p className="metric-hint">
              Demand vs ≤{numberFormatter.format(sameEBands.lowerCapacity)} @ ρ=
              {sameEBands.rhoStress} / ≤{numberFormatter.format(sameEBands.upperCapacity)} @ ρ=
              {sameEBands.rhoBest}
            </p>
          </article>
          <article className="metric-card">
            <h3>Lead time for 50k exits</h3>
            <p className="metric-value">
              {stats.minLeadTime > 0 ? `${stats.minLeadTime.toFixed(1)} blocks` : '—'}
            </p>
            <p className="metric-hint">
              Using avg per-block capacity ≈ {numberFormatter.format(Math.round(stats.avgPerBlockCapacity))}{' '}
              wu (illustrative)
            </p>
          </article>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Window W&apos; (blocks)</th>
                <th>Days</th>
                <th>N_max</th>
              </tr>
            </thead>
            <tbody>
              {chartPoints.map((point) => (
                <tr key={point.windowBlocks}>
                  <td>{numberFormatter.format(point.windowBlocks)}</td>
                  <td>{(point.windowBlocks / 144).toFixed(1)}</td>
                  <td>{numberFormatter.format(point.maxUsers)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <h2>Window benchmarks</h2>
        <p className="chart-caption">
          At ρ=0.8, longer windows move credible exit capacity into the low millions by delaying settlement.
        </p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Window</th>
                <th>Blocks</th>
                <th>LN stress</th>
                <th>LN idle</th>
                <th>Ark-style</th>
                <th>Operator-assisted</th>
              </tr>
            </thead>
            <tbody>
              {benchmarkRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.label}</td>
                  <td>{numberFormatter.format(row.windowBlocks)}</td>
                  <td>{numberFormatter.format(row.lightningActive)}</td>
                  <td>{numberFormatter.format(row.lightningIdle)}</td>
                  <td>{numberFormatter.format(row.arkStyle)}</td>
                  <td>{numberFormatter.format(row.operatorAssisted)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <h2>Security slope visualized</h2>
        <Chart points={chartPoints} />
        <p className="chart-caption">
          Near {percentFormatter.format(rho)} efficiency for your chosen e, lengthening W&apos;
          scales N_max roughly linearly. The cost is delayed settlement, not new blockspace.
        </p>
        {selectedScenario && (
          <p className="scenario-note">
            <strong>{selectedScenario.name}:</strong> {selectedScenario.description}
          </p>
        )}
      </section>

      <section className="panel docs-panel">
        <h2>Operational notes</h2>
        <div className="docs-grid">
          <article>
            <h3>Estimating ρ</h3>
            <ul>
              <li>
                Compute C_max = (4,000,000 − w_cb) · W&apos;; w_cb defaults to 2,000 wu.
              </li>
              <li>
                Sum serialized weight lost to replacements, stale blocks, dust, and policy filters over the
                window.
              </li>
              <li>ρ_obs = 1 − (losses / C_max). The paper's 160.2M wu example is illustrative.</li>
            </ul>
          </article>
          <article>
            <h3>Lightning caveats</h3>
            <ul>
              <li>HTLC jamming raises e and shrinks N_max even when ρ and W&apos; look stable.</li>
              <li>
                Watchtowers and monitors must publish in time; the toy assumes relay admits valid
                packages.
              </li>
            </ul>
          </article>
          <article>
            <h3>Model scope</h3>
            <ul>
              <li>Static capacity bound — not a queue simulation.</li>
              <li>
                Operator-assisted presets use an illustrative weight — replace with measured footprints for a
                specific construction.
              </li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  )
}
