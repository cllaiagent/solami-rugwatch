import React from 'react';
import { AlertOctagon, Zap, ArrowRight } from 'lucide-react';
import { RugAlert } from '../types';

interface EmergencyBannerProps {
  latestAlert: RugAlert | null;
  onOpenExitModal: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ latestAlert, onOpenExitModal }) => {
  if (!latestAlert || latestAlert.severity !== 'CRITICAL') return null;

  return (
    <div className="relative overflow-hidden border-b border-red-500/50 bg-gradient-to-r from-red-950/90 via-red-900/80 to-red-950/90 px-4 py-2.5 text-white shadow-xl shadow-red-950/40 animate-danger-glow">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600/90 text-white animate-bounce">
            <AlertOctagon className="h-4 w-4" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-extrabold uppercase tracking-wide text-red-300">
              🚨 SUB-SECOND RUG DETECTED:
            </span>
            <span className="font-bold text-white">
              ${latestAlert.tokenSymbol} ({latestAlert.tokenName})
            </span>
            <span className="rounded bg-red-500/20 px-1.5 py-0.5 font-mono text-xs font-semibold text-red-200 border border-red-500/30">
              -{latestAlert.liquidityDrainPercent}% LP Drained
            </span>
            <span className="font-mono text-xs text-amber-300">
              ({latestAlert.solRemoved.toFixed(1)} SOL / ${latestAlert.usdValue.toLocaleString()})
            </span>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-mono text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Caught in {latestAlert.detectedLatencyMs}ms via Solami
            </span>
          </div>
        </div>

        <button
          onClick={onOpenExitModal}
          className="flex items-center gap-1 rounded-md bg-white px-3 py-1 font-mono text-xs font-bold text-red-900 transition-all hover:bg-slate-200 active:scale-95 shadow-sm"
        >
          <span>Beam Exit Position</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
