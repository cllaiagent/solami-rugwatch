export interface RugAlert {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  tokenMint: string;
  dex: 'Raydium AMM' | 'Raydium CPMM' | 'Meteora DLMM' | 'Pump.fun' | 'Orca Whirlpool';
  poolAddress: string;
  solRemoved: number;
  usdValue: number;
  liquidityDrainPercent: number; // e.g. 92%
  detectedLatencyMs: number; // e.g. 380 ms
  timestamp: number;
  slot: number;
  signature: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  deployerAddress: string;
  actionType: 'REMOVE_LIQUIDITY' | 'MINT_AND_DUMP' | 'DEV_SELL_ALL' | 'AUTHORITY_TAMPER';
}

export interface MonitoredPool {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  tokenMint: string;
  poolAddress: string;
  dex: string;
  initialLiquiditySol: number;
  currentLiquiditySol: number;
  marketCapUsd: number;
  lpBurned: boolean;
  mintRevoked: boolean;
  freezeDisabled: boolean;
  riskScore: number; // 0 (safe) to 100 (extreme danger)
  riskLevel: 'SAFE' | 'CAUTION' | 'DANGER' | 'RUG_IMMINENT';
  topHoldersConcentration: number; // percentage
  status: 'ACTIVE' | 'DRAINED' | 'FLAGGED';
}

export interface SolamiTelemetry {
  currentSlot: number;
  latencyMs: number;
  tps: number;
  solamiEndpoint: string;
  connectionStatus: 'CONNECTED' | 'RECONNECTING' | 'DISCONNECTED';
  eventsProcessed: number;
  savedCapitalEstimateUsd: number;
  lastHeartbeat: number;
}
