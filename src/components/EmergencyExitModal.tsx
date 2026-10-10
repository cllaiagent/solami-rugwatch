import React, { useState } from 'react';
import { ShieldCheck, Zap, X, ArrowRight, CheckCircle, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';
import { sounds } from '../services/audio';

interface EmergencyExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetSymbol?: string;
  solamiLatencyMs: number;
}

export const EmergencyExitModal: React.FC<EmergencyExitModalProps> = ({
  isOpen,
  onClose,
  targetSymbol = 'PEPE2',
  solamiLatencyMs,
}) => {
  const [step, setStep] = useState<'IDLE' | 'EXECUTING' | 'SUCCESS'>('IDLE');
  const [exitStats, setExitStats] = useState<{
    landingSlot: number;
    savedSol: number;
    executionTimeMs: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleExecuteBeamExit = () => {
    setStep('EXECUTING');
    sounds.playBeamExitSound();

    setTimeout(() => {
      setExitStats({
        landingSlot: 455259012,
        savedSol: 18.4,
        executionTimeMs: Math.max(120, solamiLatencyMs + 85),
      });
      setStep('SUCCESS');
    }, 1100);
  };

  const handleReset = () => {
    setStep('IDLE');
    setExitStats(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-2xl border border-emerald-500/40 bg-[#0d131f] p-6 shadow-2xl shadow-emerald-950/50">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-lg shadow-emerald-500/20">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Solami Beam Emergency Exit
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                MEV-Protected
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Fast Transaction Landing Engine · Front-run the Dev Dump
            </p>
          </div>
        </div>

        {step === 'IDLE' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-100 font-semibold block mb-0.5">
                    Target Token: ${targetSymbol} Under Critical Threat
                  </strong>
                  Solami has detected incoming liquidity removal signatures. Standard public RPCs have a 15-second latency window, which guarantees 100% loss. Solami Beam broadcasts with priority direct-to-leader to exit your position in the very next slot!
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-black/40 p-4 font-mono text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Current Token Holding:</span>
                <span className="font-semibold text-white">450,000 ${targetSymbol}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Value Before Rug:</span>
                <span className="font-semibold text-emerald-400">19.2 SOL ($2,880)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Expected Value After Public DEX Lag:</span>
                <span className="font-semibold text-red-400">0.05 SOL ($7.50)</span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between text-slate-300">
                <span>Solami Beam Landing Engine:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> Direct Bare-Metal Route
                </span>
              </div>
            </div>

            <button
              onClick={handleExecuteBeamExit}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 py-3 font-mono text-sm font-bold text-white shadow-lg shadow-emerald-600/30 hover:brightness-110 active:scale-98 transition-all"
            >
              <span>Broadcast Immediate Beam Exit</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {step === 'EXECUTING' && (
          <div className="py-10 text-center space-y-4">
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
              <Loader2 className="h-14 w-14 animate-spin text-emerald-400" />
              <Zap className="absolute h-6 w-6 text-emerald-300" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-mono">
                Routing Via Solami Beam...
              </h4>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Broadcasting direct to Solana slot leader to front-run drainage
              </p>
            </div>
          </div>
        )}

        {step === 'SUCCESS' && exitStats && (
          <div className="space-y-4">
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center">
              <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-base font-bold text-white">
                Capital Successfully Saved!
              </h4>
              <p className="text-xs text-emerald-300/90 font-mono mt-1">
                Landed ahead of 94% of dumping transactions
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
              <div className="rounded-lg bg-black/40 p-2.5 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Saved SOL</span>
                <span className="text-base font-bold text-emerald-400">
                  +{exitStats.savedSol} SOL
                </span>
              </div>
              <div className="rounded-lg bg-black/40 p-2.5 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Execution Time</span>
                <span className="text-base font-bold text-amber-300">
                  {exitStats.executionTimeMs}ms
                </span>
              </div>
              <div className="rounded-lg bg-black/40 p-2.5 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Landed Slot</span>
                <span className="text-base font-bold text-white">
                  #{exitStats.landingSlot.toLocaleString().slice(-6)}
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-semibold py-2.5 transition-colors"
            >
              Done & Return to Radar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
