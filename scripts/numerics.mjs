#!/usr/bin/env node
/**
 * Reproduces numeric tables from blockspace-conservation-may-2026.tex.
 * Run: node scripts/numerics.mjs
 * No dependencies — verify against src/lib/math.ts (same formulas).
 */

const W_CB = 2000
const FAST_EXIT_WINDOW = 137
const LAYER_BENCHMARK_WINDOW = 2_016
const SLOW_SETTLEMENT_WINDOW = 4_032
const USABLE_PER_BLOCK = 4_000_000 - W_CB
const C_MAX_137 = USABLE_PER_BLOCK * FAST_EXIT_WINDOW

const E_ACTIVE = 5848
const E_IDLE = 2360
const E_ARK = 3200
const E_OPERATOR = 3400

function nMax(rho, windowBlocks, perUserWeight) {
  const cMax = USABLE_PER_BLOCK * windowBlocks
  return Math.floor((rho * cMax) / perUserWeight)
}

console.log('C_max(W\'=137) wu:', C_MAX_137)
console.log('ρ_obs illustrative admission/inclusion example:', (1 - 152_100_000 / C_MAX_137).toFixed(4))
console.log('replacement term share:', (118_400_000 / C_MAX_137).toFixed(4))

console.log('\n--- Primary table: exit capacity by enforcement window (rho=0.8) ---')
const rho = 0.8
for (const [label, windowBlocks] of [
  ['Fast exit stress (~1 day)', FAST_EXIT_WINDOW],
  ['Layer benchmark (14 days)', LAYER_BENCHMARK_WINDOW],
  ['Slow settlement (28 days)', SLOW_SETTLEMENT_WINDOW],
]) {
  console.log(
    label,
    'active',
    nMax(rho, windowBlocks, E_ACTIVE),
    'idle',
    nMax(rho, windowBlocks, E_IDLE),
    'ark',
    nMax(rho, windowBlocks, E_ARK),
    'operator',
    nMax(rho, windowBlocks, E_OPERATOR),
  )
}

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
    nMax(rho, FAST_EXIT_WINDOW, E_ACTIVE),
    'idle',
    nMax(rho, FAST_EXIT_WINDOW, E_IDLE),
  )
}

console.log('\n--- Fast-exit reference envelope (1-day LN, mixed assumptions) ---')
console.log(
  'Lower (rho=0.7, active):',
  nMax(0.7, FAST_EXIT_WINDOW, E_ACTIVE),
  '| Upper (rho=1.0, idle):',
  nMax(1.0, FAST_EXIT_WINDOW, E_IDLE),
)
