import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Skull, Flame, Droplets, CheckCircle2, XCircle } from 'lucide-react';
import { MonitoredPool } from '../types';

interface PoolWatchlistProps {
  pools: MonitoredPool[];
  onTriggerPoolRug: (pool: MonitoredPool) => void;
}

export const PoolWatchlist: React.FC<PoolWatchlistProps> = ({ pools, onTriggerPoolRug }) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0d121d] p-4 lg:p-5 shadow-lg">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <Droplets className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              Live Liquidity & Vulnerability Radar
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Real-time monitoring of Raydium / Meteora pools for contract risk & drain exposure
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-slate-400">
          Tracking <strong className="text-emerald-400 font-bold">{pools.length}</strong> Pools
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {pools.map((pool) => {
          const isDrained = pool.status === 'DRAINED';
          const isImminent = pool.riskLevel === 'RUG_IMMINENT';

          return (
            <div
              key={pool.id}
              className={`rounded-xl border p-4 transition-all ${
                isDrained
                  ? 'border-red-900/60 bg-red-950/20 opacity-75'
                  : isImminent
                  ? 'border-red-500/50 bg-[#16121a] hover:border-red-500'
                  : pool.riskLevel === 'CAUTION'
                  ? 'border-amber-500/30 bg-[#131622] hover:border-amber-500/50'
                  : 'border-slate-800/80 bg-[#111622] hover:border-slate-700'
              }`}
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">
                      ${pool.tokenSymbol}
                    </span>
                    <span className="text-xs text-slate-400">
                      {pool.tokenName}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {pool.dex} · {pool.tokenMint}
                  </span>
                </div>

                {/* Risk badge */}
                <div className="text-right">
                  {pool.riskLevel === 'SAFE' && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-mono font-semibold text-emerald-400">
                      <ShieldCheck className="h-3 w-3" />
                      SAFE ({pool.riskScore})
                    </span>
                  )}
                  {pool.riskLevel === 'CAUTION' && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-mono font-semibold text-amber-400">
                      <AlertTriangle className="h-3 w-3" />
                      CAUTION ({pool.riskScore})
                    </span>
                  )}
                  {pool.riskLevel === 'RUG_IMMINENT' && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-red-500/50 bg-red-500/20 px-2 py-0.5 text-[11px] font-mono font-bold text-red-300 animate-pulse">
                      <Skull className="h-3 w-3" />
                      RUG IMMINENT ({pool.riskScore})
                    </span>
                  )}
                  {isDrained && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-[11px] font-mono text-slate-400">
                      DRAINED
                    </span>
                  )}
                </div>
              </div>

              {/* Pool balance & drain bar */}
              <div className="mb-3 font-mono text-xs">
                <div className="flex justify-between items-center text-slate-400 mb-1 text-[11px]">
                  <span>Pool Liquidity:</span>
                  <span className="font-semibold text-white">
                    {pool.currentLiquiditySol.toFixed(1)} SOL
                    <span className="text-slate-400 font-normal"> / {pool.initialLiquiditySol.toFixed(1)} SOL init</span>
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full transition-all duration-500 ${
                      pool.currentLiquiditySol < pool.initialLiquiditySol * 0.3
                        ? 'bg-red-500'
                        : pool.currentLiquiditySol < pool.initialLiquiditySol * 0.7
                        ? 'bg-amber-400'
                        : 'bg-emerald-400'
                    }`}
                    style={{
                      width: `${Math.min(100, Math.max(5, (pool.currentLiquiditySol / pool.initialLiquiditySol) * 100))}%`,
                    }}
                  />
                </div>
              </div>

              {/* Contract Security Matrix */}
              <div className="grid grid-cols-2 gap-2 rounded-lg bg-black/30 p-2 font-mono text-[11px] mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">LP Burned:</span>
                  {pool.lpBurned ? (
                    <span className="text-emerald-400 flex items-center gap-0.5 font-semibold">
                      <CheckCircle2 className="h-3 w-3" /> YES
                    </span>
                  ) : (
                    <span className="text-red-400 flex items-center gap-0.5 font-semibold">
                      <XCircle className="h-3 w-3" /> NO (Unlocked)
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Mint Revoked:</span>
                  {pool.mintRevoked ? (
                    <span className="text-emerald-400 flex items-center gap-0.5 font-semibold">
                      <CheckCircle2 className="h-3 w-3" /> YES
                    </span>
                  ) : (
                    <span className="text-red-400 flex items-center gap-0.5 font-semibold">
                      <XCircle className="h-3 w-3" /> NO (Mintable)
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Freeze Disabled:</span>
                  {pool.freezeDisabled ? (
                    <span className="text-emerald-400 flex items-center gap-0.5 font-semibold">
                      <CheckCircle2 className="h-3 w-3" /> YES
                    </span>
                  ) : (
                    <span className="text-red-400 flex items-center gap-0.5 font-semibold">
                      <XCircle className="h-3 w-3" /> NO (Freezable)
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Top 10 Supply:</span>
                  <span className={`font-semibold ${pool.topHoldersConcentration > 50 ? 'text-red-400' : 'text-slate-300'}`}>
                    {pool.topHoldersConcentration}%
                  </span>
                </div>
              </div>

              {/* Trigger simulation action */}
              <button
                disabled={isDrained}
                onClick={() => onTriggerPoolRug(pool)}
                className={`w-full flex items-center justify-center gap-1.5 rounded-lg py-1.5 font-mono text-xs font-semibold transition-all ${
                  isDrained
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 active:scale-98'
                }`}
              >
                <Flame className="h-3.5 w-3.5" />
                <span>{isDrained ? 'Pool Already Drained' : 'Simulate Liquidity Pull On This Pool'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
