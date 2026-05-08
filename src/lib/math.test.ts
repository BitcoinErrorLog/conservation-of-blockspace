import { describe, expect, it } from 'vitest'

import {
  classifySecurityZoneForDemand,
  classifySecurityZoneHeadline,
  blendedWeight,
  cMax,
  effectiveCapacity,
  leadTimeBlocks,
  nMax,
  paperHeadlineZoneThresholds,
  rhoFromLosses,
  securitySlopeBandsSameE,
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
  it('matches the 83,060 active-user bound at rho=0.7', () => {
    expect(nMax(0.7, 137, 4_616)).toBe(83_060)
  })

  it('matches the 162,461 idle-user bound at rho=0.7', () => {
    expect(nMax(0.7, 137, 2_360)).toBe(162_461)
  })
})

describe('rhoFromLosses', () => {
  it('reproduces the 5 Oct 2025 congestion sample', () => {
    const rho = rhoFromLosses({
      windowBlocks: 137,
      replaced: 118_400_000,
      orphan: 22_800_000,
      dust: 8_100_000,
      policy: 10_900_000,
    })
    expect(rho).toBeCloseTo(0.71, 2)
  })
})

describe('blendedWeight', () => {
  it('averages weights by the provided share', () => {
    const result = blendedWeight([
      { weight: 4_616, share: 0.5 },
      { weight: 2_360, share: 0.5 },
    ])
    expect(result).toBe(3_488)
  })
})

describe('leadTimeBlocks', () => {
  it('approximates the lead time bound from the lemma', () => {
    const lead = leadTimeBlocks(50_000, 4_616, 0.7, 3_998_000)
    expect(lead).toBeCloseTo(82.5, 1)
  })
})

describe('Paper headline zone thresholds (1-day LN, cross-state)', () => {
  it('matches lower active @ rho=0.7 and upper idle @ rho=1', () => {
    const t = paperHeadlineZoneThresholds()
    expect(t.lowerSimultaneousExits).toBe(83_060)
    expect(t.upperSimultaneousExits).toBe(232_087)
  })

  it('classifies demand against headline envelope', () => {
    expect(classifySecurityZoneHeadline(50_000)).toBe('safe')
    expect(classifySecurityZoneHeadline(100_000)).toBe('probabilistic')
    expect(classifySecurityZoneHeadline(300_000)).toBe('insolvent')
  })
})

describe('Security slope bands (same e)', () => {
  it('widens from rho stress to rho best at fixed weight', () => {
    const bands = securitySlopeBandsSameE(137, 4_616)
    expect(bands.lowerCapacity).toBe(83_060)
    expect(bands.upperCapacity).toBe(118_658)
  })
})

describe('classifySecurityZoneForDemand', () => {
  it('uses arbitrary lower/upper capacities', () => {
    expect(classifySecurityZoneForDemand(10, 100, 200)).toBe('safe')
    expect(classifySecurityZoneForDemand(150, 100, 200)).toBe('probabilistic')
    expect(classifySecurityZoneForDemand(250, 100, 200)).toBe('insolvent')
  })
})
