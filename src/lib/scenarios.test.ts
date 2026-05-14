import { describe, expect, it } from 'vitest'

import {
  SCENARIOS,
  decodeScenarioPayload,
  encodeScenarioPayload,
  scenarioFromQueryString,
  scenarioMetrics,
  scenarioToQueryString,
} from './scenarios'

const findScenario = (id: string) => SCENARIOS.find((s) => s.id === id)!

describe('scenario metrics', () => {
  it('recovers the 14-day layer benchmark capacity', () => {
    const metrics = scenarioMetrics(findScenario('layer-benchmark'))
    expect(metrics.effectiveWeight).toBe(5_848)
    expect(metrics.maxExitUnits).toBe(1_102_594)
  })

  it('recovers the fast-exit stress capacity', () => {
    const metrics = scenarioMetrics(findScenario('fast-exit'))
    expect(metrics.effectiveWeight).toBe(5_848)
    expect(metrics.maxExitUnits).toBe(74_928)
  })

  it('estimates Ark capacities for 14-day windows', () => {
    const metrics = scenarioMetrics(findScenario('ark-layer-benchmark'))
    expect(metrics.effectiveWeight).toBe(3_200)
    expect(metrics.maxExitUnits).toBe(2_014_992)
  })

  it('estimates illustrative operator-assisted capacities', () => {
    const metrics = scenarioMetrics(findScenario('operator-layer-benchmark'))
    expect(metrics.effectiveWeight).toBe(3_400)
    expect(metrics.maxExitUnits).toBe(1_896_463)
  })
})

describe('scenario sharing helpers', () => {
  it('roundtrips the encoded payload', () => {
    const scenario = findScenario('fast-exit')
    const encoded = encodeScenarioPayload(scenario)
    const decoded = decodeScenarioPayload(encoded)
    expect(decoded).toEqual(scenario)
  })

  it('embeds the payload in a query string that can be read back', () => {
    const scenario = findScenario('layer-benchmark')
    const query = scenarioToQueryString(scenario)
    const restored = scenarioFromQueryString(query)
    expect(restored).toEqual(scenario)
  })
})
