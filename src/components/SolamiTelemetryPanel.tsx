import React from 'react';
import { Cpu, Server, Zap, ShieldCheck, Gauge, Check, ArrowRight } from 'lucide-react';
import { SolamiTelemetry } from '../types';

interface SolamiTelemetryPanelProps {
  telemetry: SolamiTelemetry;
}

export const SolamiTelemetryPanel: React.FC<SolamiTelemetryPanelProps> = ({ telemetry }) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0d121d] p-4 lg:p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Solami Bare-Metal Architecture
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                ACTIVE
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Why Solami is the only infrastructure capable of sub-second rugpull detection
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <Server className="h-3.5 w-3.5 text-emerald-400" />
          <span>Endpoint: <strong className="text-slate-200">rpc.solami.fast</strong></span>
        </div>
      </div>

      {/* Latency comparison bar: Solami vs Public RPC */}
      <div className="mb-6 rounded-xl border border-slate-800/80 bg-black/40 p-4 font-mono text-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-300 font-semibold flex items-center gap-1.5">
            <Gauge className="h-4 w-4 text-emerald-400" />
            Detection Latency Benchmark: Solami vs Public RPC
          </span>
          <span className="text-emerald-400 font-bold">~40x Faster Reaction</span>
        </div>

        {/* Comparison bars */}
        <div className="space-y-3 pt-2">
          {/* Solami */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Check className="h-3 w-3" /> Solami Bare-Metal Stream + Blur:
              </span>
              <span className="text-emerald-300 font-bold">{telemetry.latencyMs || 15}ms - 350ms (Immediate Exit)</span>
            </div>
            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '4%' }} />
            </div>
          </div>

          {/* Standard Public RPC */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-red-400">Standard Public / Cached RPC:</span>
              <span className="text-red-400">12,000ms - 25,000ms (100% Capital Lost)</span>
            </div>
            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-600 to-rose-700 rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars of Solami used in this product */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
        <div className="rounded-xl border border-slate-800/80 bg-[#111724] p-3.5 space-y-1.5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Zap className="h-4 w-4" />
            <span>1. Blur Market Data</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Decoded DEX trades and liquidity removals streamed across Raydium and Meteora with zero client-side instruction parsing lag.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-[#111724] p-3.5 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Server className="h-4 w-4" />
            <span>2. Yellowstone gRPC</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Direct bare-metal pipe capturing account updates and slot progressions the millisecond they land, featuring gapless slot replay.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-[#111724] p-3.5 space-y-1.5">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
            <ShieldCheck className="h-4 w-4" />
            <span>3. Beam Transaction Landing</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            High-priority direct-to-leader exit routes that allow traders to front-run the subsequent pool drainage before other buyers get trapped.
          </p>
        </div>
      </div>
    </div>
  );
};
