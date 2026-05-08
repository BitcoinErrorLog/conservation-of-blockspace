const CONSENSUS_WEIGHT_LIMIT = 4_000_000

const clampRho = (rho: number) => Math.min(1, Math.max(0, rho))

export interface LossInputs {
  windowBlocks: number
  wCoinbase?: number
  replaced?: number
  orphan?: number
  dust?: number
  policy?: number
  other?: number
}

export interface WeightBucket {
  weight: number
  share: number
}

export const defaultCoinbaseWeight = 2_000

/** Lightning per-user enforcement weight (wu) — matches paper instantiations. */
export const LN_WEIGHT_WU = {
  idle: 2_360,
  active: 4_616,
} as const

export const ARK_WEIGHT_PER_USER_WU = 3_200

/**
 * Illustrative single-user enforcement weight (wu) for operator-assisted deferred-settlement stacks.
 * Not a protocol specification — substitute measured footprints when reviewing a concrete design.
 */
export const SPARK_ILLUSTRATIVE_WEIGHT_WU = 3_400

/** Window used for headline Security Slope zones in the paper (≈ one day). */
export const PAPER_HEADLINE_WINDOW_BLOCKS = 137

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

export function blendedWeight(buckets: WeightBucket[]): number {
  if (!buckets.length) return 0
  const numerator = buckets.reduce((sum, bucket) => sum + bucket.weight * bucket.share, 0)
  const denominator = buckets.reduce((sum, bucket) => sum + bucket.share, 0)
  if (denominator === 0) return 0
  return numerator / denominator
}

export function rhoFromLosses({
  windowBlocks,
  wCoinbase = defaultCoinbaseWeight,
  replaced = 0,
  orphan = 0,
  dust = 0,
  policy = 0,
  other = 0,
}: LossInputs): number {
  if (windowBlocks <= 0) return 0
  const maxCapacity = cMax(windowBlocks, wCoinbase)
  if (maxCapacity === 0) return 0
  const totalLoss = replaced + orphan + dust + policy + other
  return clampRho(1 - totalLoss / maxCapacity)
}

export function leadTimeBlocks(
  users: number,
  perUserWeight: number,
  rho: number,
  avgPerBlockCapacity: number,
): number {
  if (users <= 0 || perUserWeight <= 0 || avgPerBlockCapacity <= 0) return 0
  return (users * perUserWeight) / (clampRho(rho) * avgPerBlockCapacity)
}

export type SecurityZone = 'safe' | 'probabilistic' | 'insolvent'

/**
 * Paper headline zones at W'=137: lower bound uses active channels at ρ=0.7; upper bound uses idle at ρ=1.
 * This matches the abstract's ~83k–232k envelope (rounded).
 */
export function paperHeadlineZoneThresholds(wCoinbase: number = defaultCoinbaseWeight): {
  lowerSimultaneousExits: number
  upperSimultaneousExits: number
} {
  return {
    lowerSimultaneousExits: nMax(RHO_STRESS, PAPER_HEADLINE_WINDOW_BLOCKS, LN_WEIGHT_WU.active, wCoinbase),
    upperSimultaneousExits: nMax(RHO_BEST_CASE, PAPER_HEADLINE_WINDOW_BLOCKS, LN_WEIGHT_WU.idle, wCoinbase),
  }
}

/** ρ stress vs best-case at the same per-user weight and window — bands for the interactive toy. */
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

/** Classify simultaneous exit demand against the paper's headline 1-day Lightning cross-state thresholds. */
export function classifySecurityZoneHeadline(
  simultaneousExitDemand: number,
  wCoinbase: number = defaultCoinbaseWeight,
): SecurityZone {
  const { lowerSimultaneousExits, upperSimultaneousExits } = paperHeadlineZoneThresholds(wCoinbase)
  return classifySecurityZoneForDemand(
    simultaneousExitDemand,
    lowerSimultaneousExits,
    upperSimultaneousExits,
  )
}

export const TOY_VERSION = '1.8.0'
