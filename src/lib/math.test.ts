import { describe, expect, it } from 'vitest'

import {
  classifySecurityZoneForDemand,
  classifyFastExitEnvelope,
  blendedWeight,
  cMax,
  effectiveCapacity,
  leadTimeBlocks,
  nMax,
  fastExitEnvelopeThresholds,
  rhoFromLosses,
  securitySlopeBandsSameE,
  windowCapacityRows,
} from './math'

describe('cMax and effective capacity', () => {
  it('returns the 137-block envelope from the paper', () => {
    expect(cMax(137)).toBe(547_726_000)
  })

  it('scales effective capacity by rho', () => {
    expect(effectiveCapacity(0.7, 137)).toBe(383_408_200)
  })
})

describe('nMax', () => {
  it('matches the 65,562 active HTLC-stress bound at rho=0.7', () => {
    expect(nMax(0.7, 137, 5_848)).toBe(65_562)
  })

  it('matches the 162,461 idle-user bound at rho=0.7', () => {
    expect(nMax(0.7, 137, 2_360)).toBe(162_461)
  })
})

describe('rhoFromLosses', () => {
  it('reproduces the illustrative loss decomposition', () => {
    const rho = rhoFromLosses({
      windowBlocks: 137,
      replaced: 118_400_000,
      orphan: 22_800_000,
      policy: 10_900_000,
    })
    expect(rho).toBeCloseTo(0.7223, 4)
  })

  it('computes the replacement term share from the illustrative example', () => {
    expect(118_400_000 / cMax(137)).toBeCloseTo(0.2162, 4)
  })
})

describe('blendedWeight', () => {
  it('averages weights by the provided share', () => {
    const result = blendedWeight([
      { weight: 5_848, share: 0.5 },
      { weight: 2_360, share: 0.5 },
    ])
    expect(result).toBe(4_104)
  })
})

describe('leadTimeBlocks', () => {
  it('approximates the lead time bound from the lemma', () => {
    const lead = leadTimeBlocks(50_000, 5_848, 0.7, 3_998_000)
    expect(lead).toBeCloseTo(104.5, 1)
  })
})

describe('Paper fast-exit envelope thresholds (1-day LN, cross-state)', () => {
  it('matches lower active @ rho=0.7 and upper idle @ rho=1', () => {
    const t = fastExitEnvelopeThresholds()
    expect(t.lowerSimultaneousExits).toBe(65_562)
    expect(t.upperSimultaneousExits).toBe(232_087)
  })

  it('classifies demand against fast-exit envelope', () => {
    expect(classifyFastExitEnvelope(50_000)).toBe('safe')
    expect(classifyFastExitEnvelope(100_000)).toBe('probabilistic')
    expect(classifyFastExitEnvelope(300_000)).toBe('insolvent')
  })
})

describe('Window capacity rows', () => {
  it('reproduces the primary 1-day / 14-day / 28-day table at rho=0.8', () => {
    expect(windowCapacityRows(0.8)).toEqual([
      {
        id: 'fast-exit',
        label: 'Fast exit stress case',
        windowBlocks: 137,
        lightningActive: 74_928,
        lightningIdle: 185_669,
        arkStyle: 136_931,
        operatorAssisted: 128_876,
      },
      {
        id: 'layer-benchmark',
        label: '14-day layer benchmark',
        windowBlocks: 2_016,
        lightningActive: 1_102_594,
        lightningIdle: 2_732_192,
        arkStyle: 2_014_992,
        operatorAssisted: 1_896_463,
      },
      {
        id: 'slow-settlement',
        label: '28-day slow settlement runway',
        windowBlocks: 4_032,
        lightningActive: 2_205_189,
        lightningIdle: 5_464_385,
        arkStyle: 4_029_984,
        operatorAssisted: 3_792_926,
      },
    ])
  })
})

describe('Security slope bands (same e)', () => {
  it('widens from rho stress to rho best at fixed weight', () => {
    const bands = securitySlopeBandsSameE(137, 5_848)
    expect(bands.lowerCapacity).toBe(65_562)
    expect(bands.upperCapacity).toBe(93_660)
  })
})

describe('classifySecurityZoneForDemand', () => {
  it('uses arbitrary lower/upper capacities', () => {
    expect(classifySecurityZoneForDemand(10, 100, 200)).toBe('safe')
    expect(classifySecurityZoneForDemand(150, 100, 200)).toBe('probabilistic')
    expect(classifySecurityZoneForDemand(250, 100, 200)).toBe('insolvent')
  })
})
