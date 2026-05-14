const CONSENSUS_WEIGHT_LIMIT = 4_000_000

const clampRho = (rho: number) => Math.min(1, Math.max(0, rho))

export interface LossInputs {
  windowBlocks: number
  wCoinbase?: number
  replaced?: number
  orphan?: number
  policy?: number
  other?: number
}

export interface WeightBucket {
  weight: number
  share: number
}

export const defaultCoinbaseWeight = 2_000

/** Lightning per-exit-unit enforcement weight (wu) — declared paper reference profile. */
export const LN_WEIGHT_WU = {
  idle: 2_360,
  active: 5_848,
} as const

export const ARK_WEIGHT_PER_USER_WU = 3_200

/**
 * Template single-exit-unit enforcement weight (wu) for operator-assisted deferred-settlement stacks.
 * Not a protocol specification — substitute measured transaction traces when reviewing a concrete design.
 */
export const OPERATOR_ASSISTED_ILLUSTRATIVE_WEIGHT_WU = 3_400

export const FAST_EXIT_WINDOW_BLOCKS = 137
export const LAYER_BENCHMARK_WINDOW_BLOCKS = 2_016
export const SLOW_SETTLEMENT_WINDOW_BLOCKS = 4_032

/** Window used for the fast-exit stress envelope in the paper (≈ one day). */
export const PAPER_HEADLINE_WINDOW_BLOCKS = FAST_EXIT_WINDOW_BLOCKS

export const RHO_STRESS = 0.7
export const RHO_BEST_CASE = 1.0

export function cMax(windowBlocks: number, wCoinbase: number = defaultCoinbaseWeight): number {
  if (windowBlocks <= 0) return 0
  const usablePerBlock = Math.max(0, CONSENSUS_WEIGHT_LIMIT - wCoinbase)
  return usablePerBlock * windowBlocks
}

export function effectiveCapacity(
  rho: number,
  windowBlocks: number,
  wCoinbase: number = defaultCoinbaseWeight,
): number {
  if (windowBlocks <= 0) return 0
  return clampRho(rho) * cMax(windowBlocks, wCoinbase)
}

export function nMax(
  rho: number,
  windowBlocks: number,
  perUserWeight: number,
  wCoinbase: number = defaultCoinbaseWeight,
): number {
  if (perUserWeight <= 0) return 0
  const capacity = effectiveCapacity(rho, windowBlocks, wCoinbase)
  if (capacity <= 0) return 0
  return Math.floor(capacity / perUserWeight)
}

export interface WindowCapacityRow {
  id: string
  label: string
  windowBlocks: number
  lightningActive: number
  lightningIdle: number
  arkStyle: number
  operatorAssisted: number
}

export function windowCapacityRows(
  rho: number = 0.8,
  wCoinbase: number = defaultCoinbaseWeight,
): WindowCapacityRow[] {
  const windows = [
    { id: 'fast-exit', label: 'Fast exit stress case', windowBlocks: FAST_EXIT_WINDOW_BLOCKS },
    { id: 'layer-benchmark', label: '14-day layer benchmark', windowBlocks: LAYER_BENCHMARK_WINDOW_BLOCKS },
    { id: 'slow-settlement', label: '28-day slow settlement runway', windowBlocks: SLOW_SETTLEMENT_WINDOW_BLOCKS },
  ]
  return windows.map((window) => ({
    ...window,
    lightningActive: nMax(rho, window.windowBlocks, LN_WEIGHT_WU.active, wCoinbase),
    lightningIdle: nMax(rho, window.windowBlocks, LN_WEIGHT_WU.idle, wCoinbase),
    arkStyle: nMax(rho, window.windowBlocks, ARK_WEIGHT_PER_USER_WU, wCoinbase),
    operatorAssisted: nMax(rho, window.windowBlocks, OPERATOR_ASSISTED_ILLUSTRATIVE_WEIGHT_WU, wCoinbase),
  }))
}

export function blendedWeight(buckets: WeightBucket[]): number {
  if (!buckets.length) return 0
  const numerator = buckets.reduce((sum, bucket) => sum + bucket.weight * bucket.share, 0)
  const denominator = buckets.reduce((sum, bucket) => sum + bucket.share, 0)
  if (denominator === 0) return 0
  return numerator / denominator
}

/** Estimate observed rho from admission/inclusion losses. Economic dust belongs in the viability test. */
export function rhoFromLosses({
  windowBlocks,
  wCoinbase = defaultCoinbaseWeight,
  replaced = 0,
  orphan = 0,
  policy = 0,
  other = 0,
}: LossInputs): number {
  if (windowBlocks <= 0) return 0
  const maxCapacity = cMax(windowBlocks, wCoinbase)
  if (maxCapacity === 0) return 0
  const totalLoss = replaced + orphan + policy + other
  return clampRho(1 - totalLoss / maxCapacity)
}

export function leadTimeBlocks(
  exitUnits: number,
  perExitUnitWeight: number,
  rho: number,
  avgPerBlockCapacity: number,
): number {
  if (exitUnits <= 0 || perExitUnitWeight <= 0 || avgPerBlockCapacity <= 0) return 0
  return (exitUnits * perExitUnitWeight) / (clampRho(rho) * avgPerBlockCapacity)
}

export type SecurityZone = 'safe' | 'probabilistic' | 'insolvent'

/**
 * Fast-exit envelope at W'=137: lower bound uses active HTLC-stress exits at ρ=0.7;
 * upper bound uses idle exits at ρ=1. These are different assumptions, not one scenario.
 */
export function fastExitEnvelopeThresholds(wCoinbase: number = defaultCoinbaseWeight): {
  lowerSimultaneousExits: number
  upperSimultaneousExits: number
} {
  return {
    lowerSimultaneousExits: nMax(RHO_STRESS, PAPER_HEADLINE_WINDOW_BLOCKS, LN_WEIGHT_WU.active, wCoinbase),
    upperSimultaneousExits: nMax(RHO_BEST_CASE, PAPER_HEADLINE_WINDOW_BLOCKS, LN_WEIGHT_WU.idle, wCoinbase),
  }
}

/** ρ stress vs best-case at the same per-exit-unit weight and window — bands for the interactive toy. */
export function securitySlopeBandsSameE(
  windowBlocks: number,
  perUserWeight: number,
  wCoinbase: number = defaultCoinbaseWeight,
  rhoStress: number = RHO_STRESS,
  rhoBest: number = RHO_BEST_CASE,
): {
  lowerCapacity: number
  upperCapacity: number
  rhoStress: number
  rhoBest: number
} {
  return {
    lowerCapacity: nMax(rhoStress, windowBlocks, perUserWeight, wCoinbase),
    upperCapacity: nMax(rhoBest, windowBlocks, perUserWeight, wCoinbase),
    rhoStress,
    rhoBest,
  }
}

export function classifySecurityZoneForDemand(
  simultaneousExitDemand: number,
  lowerCapacity: number,
  upperCapacity: number,
): SecurityZone {
  if (simultaneousExitDemand <= lowerCapacity) return 'safe'
  if (simultaneousExitDemand <= upperCapacity) return 'probabilistic'
  return 'insolvent'
}

/** Classify simultaneous exit demand against the fast-exit 1-day Lightning cross-state envelope. */
export function classifyFastExitEnvelope(
  simultaneousExitDemand: number,
  wCoinbase: number = defaultCoinbaseWeight,
): SecurityZone {
  const { lowerSimultaneousExits, upperSimultaneousExits } = fastExitEnvelopeThresholds(wCoinbase)
  return classifySecurityZoneForDemand(
    simultaneousExitDemand,
    lowerSimultaneousExits,
    upperSimultaneousExits,
  )
}

export const TOY_VERSION = '1.10.3'
