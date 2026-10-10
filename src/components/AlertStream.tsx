import React from 'react';
import { Flame, ExternalLink, Zap, Clock, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { RugAlert } from '../types';

interface AlertStreamProps {
  alerts: RugAlert[];
  onOpenExitModal: (tokenSymbol?: string) => void;
}

export const AlertStream: React.FC<AlertStreamProps> = ({ alerts, onOpenExitModal }) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0d121d] p-4 lg:p-5 shadow-lg">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
            <Flame className="h-4 w-4 animate-bounce" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Sub-Second Rugpull Ticker
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Decoded DEX Liquidity Removals & Dev Dumps · Latency &lt; 500ms
            </p>
          </div>
        </div>

        <div className="text-right font-mono text-xs text-slate-400">
          <span className="text-red-400 font-bold">{alerts.length}</span> Drains Caught Today
        </div>
      </div>

      <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
        {alerts.length === 0 ? (
          <div className="py-12 text-center text-slate-500 font-mono text-sm">
            Listening for Solana mainnet liquidity events via Solami stream...
          </div>
        ) : (
          alerts.map((alert) => {
            const timeAgoSec = Math.max(1, Math.round((Date.now() - alert.timestamp) / 1000));
            const isCritical = alert.severity === 'CRITICAL';

            return (
              <div
                key={alert.id}
                className={`relative overflow-hidden rounded-xl border p-3.5 transition-all ${
                  isCritical
                    ? 'border-red-500/40 bg-gradient-to-r from-red-950/30 via-[#131722] to-[#131722] hover:border-red-500/60'
                    : 'border-amber-500/30 bg-[#131722] hover:border-amber-500/50'
                }`}
              >
                {/* Top row */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">
                      ${alert.tokenSymbol}
                    </span>
                    <span className="text-xs text-slate-400">
                      {alert.tokenName}
                    </span>
                    <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-300">
                      {alert.dex}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Latency badge */}
                    <div className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-300">
                      <Zap className="h-3 w-3" />
                      <span>{alert.detectedLatencyMs}ms detection</span>
                    </div>

                    {/* Time ago */}
                    <span className="flex items-center gap-1 font-mono text-xs text-slate-400">
                      <Clock className="h-3 w-3" />
                      {timeAgoSec < 60 ? `${timeAgoSec}s ago` : `${Math.floor(timeAgoSec / 60)}m ago`}
                    </span>
                  </div>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2 border-y border-slate-800/60 font-mono text-xs my-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">LP Drain</span>
                    <span className="font-bold text-red-400 text-sm">
                      -{alert.liquidityDrainPercent}%
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">SOL Drained</span>
                    <span className="font-semibold text-white">
                      {alert.solRemoved.toFixed(1)} SOL
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">USD Value</span>
                    <span className="font-semibold text-amber-300">
                      ${alert.usdValue.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Action</span>
                    <span className="font-semibold text-rose-400">
                      {alert.actionType.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                {/* Footer & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-xs">
                  <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                    <span>Slot: <strong className="text-slate-300">#{alert.slot}</strong></span>
                    <span>Deployer: <strong className="text-slate-300">{alert.deployerAddress}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://solscan.io/tx/${alert.signature}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                    >
                      <span>Solscan</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>

                    <button
                      onClick={() => onOpenExitModal(alert.tokenSymbol)}
                      className="flex items-center gap-1 rounded bg-red-500/20 px-2 py-1 text-[11px] font-semibold text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-all"
                    >
                      <ShieldAlert className="h-3 w-3" />
                      <span>Simulate Beam Exit</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
