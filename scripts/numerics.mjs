#!/usr/bin/env node
/**
 * Reproduces numeric tables from cred10.tex (Law of Conservation of Blockspace).
 * Run: node scripts/numerics.mjs
 * No dependencies — verify against src/lib/math.ts (same formulas).
 */

const W_CB = 2000
const W_LINE = 137
const USABLE_PER_BLOCK = 4_000_000 - W_CB
const C_MAX_137 = USABLE_PER_BLOCK * W_LINE

const E_ACTIVE = 4616
const E_IDLE = 2360
const E_MIX = 0.5 * E_ACTIVE + 0.5 * E_IDLE

function nMax(rho, windowBlocks, perUserWeight) {
  const cMax = USABLE_PER_BLOCK * windowBlocks
  return Math.floor((rho * cMax) / perUserWeight)
}

console.log('C_max(W\'=137) wu:', C_MAX_137)
console.log('ρ_obs example:', (1 - 160_200_000 / C_MAX_137).toFixed(4))

console.log('\n--- Table: rho sensitivity (W\'=137) ---')
for (const [label, rho] of [
  ['Theoretical Max', 1.0],
  ['High Efficiency', 0.9],
  ['Typical Congestion', 0.7],
  ['Hostile / Attack', 0.5],
]) {
  console.log(
    label,
    'rho=',
    rho,
    'active',
    nMax(rho, W_LINE, E_ACTIVE),
    'idle',
    nMax(rho, W_LINE, E_IDLE),
  )
}

console.log('\n--- Table: policy scenarios (rho=0.8) ---')
const rho = 0.8
console.log('Retail Panic', nMax(rho, 137, E_ACTIVE))
console.log('Quiet Exit', nMax(rho, 137, E_IDLE))
console.log('Mixed Economy', nMax(rho, 432, E_MIX))
console.log('Institutional', nMax(rho, 2016, E_ACTIVE))

console.log('\n--- Ark-style (e=3200 wu, rho=0.8) ---')
const E_ARK = 3200
console.log('1 week (1008 blk)', nMax(rho, 1008, E_ARK))
console.log('2 week (2016 blk)', nMax(rho, 2016, E_ARK))

console.log('\n--- Reference zones (1-day LN, mixed bounds from paper) ---')
console.log(
  'Lower (rho=0.7, active):',
  nMax(0.7, W_LINE, E_ACTIVE),
  '| Upper (rho=1.0, idle):',
  nMax(1.0, W_LINE, E_IDLE),
)
