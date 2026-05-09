import {
  ARK_WEIGHT_PER_USER_WU,
  blendedWeight,
  FAST_EXIT_WINDOW_BLOCKS,
  LAYER_BENCHMARK_WINDOW_BLOCKS,
  LN_WEIGHT_WU,
  nMax,
  OPERATOR_ASSISTED_ILLUSTRATIVE_WEIGHT_WU,
  SLOW_SETTLEMENT_WINDOW_BLOCKS,
} from './math'

export interface Cohort {
  id: string
  label: string
  perUserWeight: number
  share: number
}

export interface Scenario {
  id: string
  name: string
  description: string
  rho: number
  windowBlocks: number
  wCoinbase?: number
  cohorts: Cohort[]
}

export interface ScenarioMetrics {
  effectiveWeight: number
  maxUsers: number
}

/** @deprecated Use LN_WEIGHT_WU from ./math — kept for preset readability */
export const LN_WEIGHTS = LN_WEIGHT_WU

export const ARK_WEIGHT = ARK_WEIGHT_PER_USER_WU

export const OPERATOR_ASSISTED_ILLUSTRATIVE_WEIGHT = OPERATOR_ASSISTED_ILLUSTRATIVE_WEIGHT_WU

export const SCENARIOS: Scenario[] = [
  {
    id: 'layer-benchmark',
    name: '14-Day Layer Benchmark',
    description: 'Main cross-layer benchmark: 2016-block window, Lightning HTLC-stress profile',
    rho: 0.8,
    windowBlocks: LAYER_BENCHMARK_WINDOW_BLOCKS,
    cohorts: [
      {
        id: 'active',
        label: 'HTLC-stress active channels',
        perUserWeight: LN_WEIGHT_WU.active,
        share: 1,
      },
    ],
  },
  {
    id: 'fast-exit',
    name: 'Fast Exit Stress',
    description: '137-block one-day stress case, Lightning HTLC-stress profile',
    rho: 0.8,
    windowBlocks: FAST_EXIT_WINDOW_BLOCKS,
    cohorts: [
      {
        id: 'active',
        label: 'HTLC-stress active channels',
        perUserWeight: LN_WEIGHT_WU.active,
        share: 1,
      },
    ],
  },
  {
    id: 'slow-settlement',
    name: '28-Day Slow Settlement',
    description: 'Slow-settlement runway: 4032-block window, Lightning HTLC-stress profile',
    rho: 0.8,
    windowBlocks: SLOW_SETTLEMENT_WINDOW_BLOCKS,
    cohorts: [
      { id: 'active', label: 'HTLC-stress active channels', perUserWeight: LN_WEIGHT_WU.active, share: 1 },
    ],
  },
  {
    id: 'layer-benchmark-idle',
    name: '14-Day Idle Lightning',
    description: '2016-block window, idle Lightning profile',
    rho: 0.8,
    windowBlocks: LAYER_BENCHMARK_WINDOW_BLOCKS,
    cohorts: [
      {
        id: 'idle',
        label: 'Idle channels',
        perUserWeight: LN_WEIGHT_WU.idle,
        share: 1,
      },
    ],
  },
  {
    id: 'ark-layer-benchmark',
    name: 'Ark-style (14 Days)',
    description: 'Illustrative Ark-style timeout tree with 14-day window',
    rho: 0.8,
    windowBlocks: LAYER_BENCHMARK_WINDOW_BLOCKS,
    cohorts: [
      {
        id: 'ark-leaf',
        label: 'Per-user exit path',
        perUserWeight: ARK_WEIGHT_PER_USER_WU,
        share: 1,
      },
    ],
  },
  {
    id: 'ark-slow-settlement',
    name: 'Ark-style (28 Days)',
    description: 'Illustrative Ark-style timeout tree with 28-day window',
    rho: 0.8,
    windowBlocks: SLOW_SETTLEMENT_WINDOW_BLOCKS,
    cohorts: [
      {
        id: 'ark-leaf',
        label: 'Per-user exit path',
        perUserWeight: ARK_WEIGHT_PER_USER_WU,
        share: 1,
      },
    ],
  },
  {
    id: 'operator-layer-benchmark',
    name: 'Operator-assisted (14 Days)',
    description:
      'Illustrative operator-assisted stack: substitute measured per-user enforcement weight for your design',
    rho: 0.8,
    windowBlocks: LAYER_BENCHMARK_WINDOW_BLOCKS,
    cohorts: [
      {
        id: 'operator-exit',
        label: 'Illustrative per-user L1 footprint',
        perUserWeight: OPERATOR_ASSISTED_ILLUSTRATIVE_WEIGHT_WU,
        share: 1,
      },
    ],
  },
  {
    id: 'operator-slow-settlement',
    name: 'Operator-assisted (28 Days)',
    description: 'Same illustrative weight with a slow-settlement window',
    rho: 0.8,
    windowBlocks: SLOW_SETTLEMENT_WINDOW_BLOCKS,
    cohorts: [
      {
        id: 'operator-exit',
        label: 'Illustrative per-user L1 footprint',
        perUserWeight: OPERATOR_ASSISTED_ILLUSTRATIVE_WEIGHT_WU,
        share: 1,
      },
    ],
  },
]

export function scenarioEffectiveWeight(scenario: Scenario): number {
  if (scenario.cohorts.length === 1) {
    return scenario.cohorts[0].perUserWeight
  }
  return blendedWeight(
    scenario.cohorts.map((cohort) => ({
      weight: cohort.perUserWeight,
      share: cohort.share,
    })),
  )
}

export function scenarioMetrics(scenario: Scenario): ScenarioMetrics {
  const effectiveWeight = scenarioEffectiveWeight(scenario)
  const maxUsers = nMax(scenario.rho, scenario.windowBlocks, effectiveWeight, scenario.wCoinbase)
  return { effectiveWeight, maxUsers }
}

export const SCENARIO_QUERY_KEY = 'scenario'

export function encodeScenarioPayload(scenario: Scenario): string {
  return encodeURIComponent(JSON.stringify(scenario))
}

export function decodeScenarioPayload(payload: string): Scenario | null {
  try {
    return JSON.parse(decodeURIComponent(payload))
  } catch {
    return null
  }
}

export function scenarioToQueryString(scenario: Scenario): string {
  const params = new URLSearchParams()
  params.set(SCENARIO_QUERY_KEY, encodeScenarioPayload(scenario))
  return params.toString()
}

export function scenarioFromQueryString(search: string): Scenario | null {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  const payload = params.get(SCENARIO_QUERY_KEY)
  if (!payload) return null
  return decodeScenarioPayload(payload)
}
