import { RugAlert, MonitoredPool, SolamiTelemetry } from '../types';

export const SOLAMI_RPC_URL =
  import.meta.env.VITE_SOLAMI_RPC_URL ||
  'https://rpc.solami.fast/sol?api_key=b01DZ4bSuLRHsX2c';

// Live Solami RPC caller
export async function fetchSolamiRpc<T = unknown>(method: string, params: unknown[] = []): Promise<{ result?: T; latencyMs: number; error?: string }> {
  const startTime = performance.now();
  try {
    const res = await fetch(SOLAMI_RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Date.now(),
        method,
        params,
      }),
    });
    const latencyMs = Math.round(performance.now() - startTime);
    if (!res.ok) {
      return { latencyMs, error: `HTTP ${res.status}` };
    }
    const data = await res.json();
    return { result: data.result as T, latencyMs };
  } catch (err: unknown) {
    const latencyMs = Math.round(performance.now() - startTime);
    return { latencyMs, error: err instanceof Error ? err.message : 'Network error' };
  }
}

// Initial realistic Solana token pools for the monitor
export const INITIAL_POOLS: MonitoredPool[] = [
  {
    id: 'pool-1',
    tokenName: 'Solana Doge',
    tokenSymbol: 'SDOGE',
    tokenMint: '7XwK1P...9uY2',
    poolAddress: 'Raydium_SDOGE_SOL_cpmm',
    dex: 'Raydium CPMM',
    initialLiquiditySol: 340.5,
    currentLiquiditySol: 320.1,
    marketCapUsd: 1420000,
    lpBurned: true,
    mintRevoked: true,
    freezeDisabled: true,
    riskScore: 12,
    riskLevel: 'SAFE',
    topHoldersConcentration: 14.2,
    status: 'ACTIVE',
  },
  {
    id: 'pool-2',
    tokenName: 'Quantum AI Agent',
    tokenSymbol: 'QAI',
    tokenMint: '9aKL3M...4fV1',
    poolAddress: 'Meteora_QAI_SOL_dlmm',
    dex: 'Meteora DLMM',
    initialLiquiditySol: 180.0,
    currentLiquiditySol: 165.2,
    marketCapUsd: 680000,
    lpBurned: false,
    mintRevoked: true,
    freezeDisabled: true,
    riskScore: 48,
    riskLevel: 'CAUTION',
    topHoldersConcentration: 38.5,
    status: 'ACTIVE',
  },
  {
    id: 'pool-3',
    tokenName: 'Pepe Moon 2.0',
    tokenSymbol: 'PEPE2',
    tokenMint: '4rTX89...3zQ7',
    poolAddress: 'Raydium_PEPE2_SOL_amm',
    dex: 'Raydium AMM',
    initialLiquiditySol: 220.0,
    currentLiquiditySol: 42.0,
    marketCapUsd: 185000,
    lpBurned: false,
    mintRevoked: false,
    freezeDisabled: false,
    riskScore: 94,
    riskLevel: 'RUG_IMMINENT',
    topHoldersConcentration: 67.8,
    status: 'FLAGGED',
  },
  {
    id: 'pool-4',
    tokenName: 'Cyber Cat',
    tokenSymbol: 'CYCAT',
    tokenMint: '2vBB90...8xL5',
    poolAddress: 'Pump_CYCAT_migration',
    dex: 'Pump.fun',
    initialLiquiditySol: 85.0,
    currentLiquiditySol: 85.0,
    marketCapUsd: 290000,
    lpBurned: true,
    mintRevoked: true,
    freezeDisabled: true,
    riskScore: 24,
    riskLevel: 'SAFE',
    topHoldersConcentration: 19.1,
    status: 'ACTIVE',
  },
  {
    id: 'pool-5',
    tokenName: 'Solana Trump Vance',
    tokenSymbol: 'TRUMPV',
    tokenMint: '8mNX61...1pP4',
    poolAddress: 'Raydium_TRUMP_SOL_v4',
    dex: 'Raydium AMM',
    initialLiquiditySol: 450.0,
    currentLiquiditySol: 12.4,
    marketCapUsd: 42000,
    lpBurned: false,
    mintRevoked: false,
    freezeDisabled: false,
    riskScore: 99,
    riskLevel: 'RUG_IMMINENT',
    topHoldersConcentration: 84.5,
    status: 'DRAINED',
  },
];

// Initial recent sub-second alerts
export const INITIAL_ALERTS: RugAlert[] = [
  {
    id: 'alert-1',
    tokenName: 'Solana Trump Vance',
    tokenSymbol: 'TRUMPV',
    tokenMint: '8mNX61...1pP4',
    dex: 'Raydium AMM',
    poolAddress: 'Raydium_TRUMP_SOL_v4',
    solRemoved: 437.6,
    usdValue: 65640,
    liquidityDrainPercent: 97.2,
    detectedLatencyMs: 342,
    timestamp: Date.now() - 1000 * 24,
    slot: 455258950,
    signature: '5KnpL...81Xz',
    severity: 'CRITICAL',
    deployerAddress: 'G6vT...39dK',
    actionType: 'REMOVE_LIQUIDITY',
  },
  {
    id: 'alert-2',
    tokenName: 'Moon Inu',
    tokenSymbol: 'MINU',
    tokenMint: '3tYZ55...9kL2',
    dex: 'Raydium CPMM',
    poolAddress: 'Raydium_MINU_SOL_cpmm',
    solRemoved: 145.2,
    usdValue: 21780,
    liquidityDrainPercent: 88.5,
    detectedLatencyMs: 410,
    timestamp: Date.now() - 1000 * 78,
    slot: 455258810,
    signature: '2AqW...99Px',
    severity: 'CRITICAL',
    deployerAddress: '8hKP...44wQ',
    actionType: 'DEV_SELL_ALL',
  },
  {
    id: 'alert-3',
    tokenName: 'Fast Turbo AI',
    tokenSymbol: 'FTAI',
    tokenMint: '5kMN12...7rV9',
    dex: 'Meteora DLMM',
    poolAddress: 'Meteora_FTAI_SOL_dlmm',
    solRemoved: 62.0,
    usdValue: 9300,
    liquidityDrainPercent: 54.0,
    detectedLatencyMs: 295,
    timestamp: Date.now() - 1000 * 180,
    slot: 455258600,
    signature: '4hLK...12aB',
    severity: 'HIGH',
    deployerAddress: '9rPL...81zX',
    actionType: 'REMOVE_LIQUIDITY',
  },
];
