import React from 'react';
import { ShieldAlert, Activity, Volume2, VolumeX, Zap, Radio, BellRing, Sparkles } from 'lucide-react';
import { SolamiTelemetry } from '../types';

interface HeaderProps {
  telemetry: SolamiTelemetry;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onSimulateRug: () => void;
  onOpenExitModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  telemetry,
  soundEnabled,
  onToggleSound,
  onSimulateRug,
  onOpenExitModal,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#080b11]/90 backdrop-blur-md px-4 lg:px-8 py-3">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-amber-600 shadow-lg shadow-red-500/20">
            <ShieldAlert className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Solami <span className="bg-gradient-to-r from-red-400 via-amber-400 to-red-500 bg-clip-text text-transparent">RugWatch</span>
              </h1>
              <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-400 uppercase tracking-wider">
                Sub-Second Sentinel
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
              <Radio className="h-3 w-3 text-emerald-400 animate-pulse" />
              Live Mainnet Firehose · Raydium / Meteora / Pump.fun
            </p>
          </div>
        </div>

        {/* Telemetry badges & Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Solami Bare-Metal RPC Status */}
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[#0d131f] px-3 py-1.5 font-mono text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-400">Solami RPC:</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              {telemetry.latencyMs > 0 ? `${telemetry.latencyMs}ms` : 'Connecting...'}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Slot:</span>
            <span className="font-semibold text-white">
              {telemetry.currentSlot > 0 ? telemetry.currentSlot.toLocaleString() : '---'}
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Siren Alarm' : 'Enable Siren Alarm'}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              soundEnabled
                ? 'border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
                : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:text-white'
            }`}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                <span className="hidden sm:inline">Alarm: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Alarm: OFF</span>
              </>
            )}
          </button>

          {/* Emergency Beam Exit Demo Trigger */}
          <button
            onClick={onOpenExitModal}
            className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition-all hover:bg-emerald-500/20 hover:border-emerald-400 active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Beam Fast Exit</span>
          </button>

          {/* Simulate Live Rugpull Trigger (for Demo Video) */}
          <button
            onClick={onSimulateRug}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-red-600/30 transition-all hover:brightness-110 active:scale-95 animate-pulse"
          >
            <BellRing className="h-3.5 w-3.5" />
            <span>Test Rug Alert</span>
          </button>
        </div>
      </div>
    </header>
  );
};
