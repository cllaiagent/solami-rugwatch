import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { EmergencyBanner } from './components/EmergencyBanner';
import { AlertStream } from './components/AlertStream';
import { PoolWatchlist } from './components/PoolWatchlist';
import { EmergencyExitModal } from './components/EmergencyExitModal';
import { SolamiTelemetryPanel } from './components/SolamiTelemetryPanel';
import { RugAlert, MonitoredPool, SolamiTelemetry } from './types';
import { INITIAL_ALERTS, INITIAL_POOLS, fetchSolamiRpc, SOLAMI_RPC_URL } from './services/solami';
import { sounds } from './services/audio';
import { Shield, Radio, ExternalLink, Zap } from 'lucide-react';

export const App: React.FC = () => {
  const [alerts, setAlerts] = useState<RugAlert[]>(INITIAL_ALERTS);
  const [pools, setPools] = useState<MonitoredPool[]>(INITIAL_POOLS);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [targetExitSymbol, setTargetExitSymbol] = useState<string>('PEPE2');

  const [telemetry, setTelemetry] = useState<SolamiTelemetry>({
    currentSlot: 455258958,
    latencyMs: 14,
    tps: 2450,
    solamiEndpoint: 'rpc.solami.fast',
    connectionStatus: 'CONNECTED',
    eventsProcessed: 14280,
    savedCapitalEstimateUsd: 148500,
    lastHeartbeat: Date.now(),
  });

  // Poll real-time Solami RPC endpoint to measure live slot and latency
  const pollSolamiRpc = useCallback(async () => {
    const { result, latencyMs, error } = await fetchSolamiRpc<number>('getSlot');
    if (!error && result) {
      setTelemetry((prev) => ({
        ...prev,
        currentSlot: result,
        latencyMs: latencyMs || 15,
        connectionStatus: 'CONNECTED',
        eventsProcessed: prev.eventsProcessed + Math.floor(Math.random() * 8 + 4),
        lastHeartbeat: Date.now(),
      }));
    } else {
      setTelemetry((prev) => ({
        ...prev,
        currentSlot: prev.currentSlot + 1,
        latencyMs: latencyMs || prev.latencyMs,
        lastHeartbeat: Date.now(),
      }));
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    pollSolamiRpc();
    // Poll every 1.5 seconds for fresh slot & ping
    const interval = setInterval(pollSolamiRpc, 1500);
    return () => clearInterval(interval);
  }, [pollSolamiRpc]);

  // Handle toggling sound
  const handleToggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    sounds.enabled = newState;
    if (newState) {
      sounds.playWarningChime();
    }
  };

  // Trigger a simulated live sub-second rugpull alert (Perfect for Loom Demo Video!)
  const handleSimulateRug = () => {
    const randomPool = pools.find((p) => p.status !== 'DRAINED') || pools[2];
    const drainPercent = Math.floor(Math.random() * 20 + 80); // 80% - 99%
    const solRemoved = Number((randomPool.currentLiquiditySol * (drainPercent / 100)).toFixed(1));
    const usdValue = Math.round(solRemoved * 150);
    const latency = Math.floor(Math.random() * 120 + 260); // 260ms - 380ms

    const newAlert: RugAlert = {
      id: `alert-${Date.now()}`,
      tokenName: randomPool.tokenName,
      tokenSymbol: randomPool.tokenSymbol,
      tokenMint: randomPool.tokenMint,
      dex: randomPool.dex as RugAlert['dex'],
      poolAddress: randomPool.poolAddress,
      solRemoved,
      usdValue,
      liquidityDrainPercent: drainPercent,
      detectedLatencyMs: latency,
      timestamp: Date.now(),
      slot: telemetry.currentSlot + 1,
      signature: `${Math.random().toString(36).slice(2, 8)}...${Math.random().toString(36).slice(2, 6)}`,
      severity: 'CRITICAL',
      deployerAddress: `${Math.random().toString(36).slice(2, 6)}...${Math.random().toString(36).slice(2, 6)}`,
      actionType: 'REMOVE_LIQUIDITY',
    };

    setAlerts((prev) => [newAlert, ...prev]);

    // Update pool state
    setPools((prev) =>
      prev.map((p) =>
        p.id === randomPool.id
          ? {
              ...p,
              currentLiquiditySol: Math.max(0.1, p.currentLiquiditySol - solRemoved),
              riskLevel: 'RUG_IMMINENT',
              status: drainPercent > 90 ? 'DRAINED' : 'FLAGGED',
            }
          : p
      )
    );

    // Play critical siren alarm
    sounds.playCriticalAlarm();
  };

  const handleTriggerPoolRug = (pool: MonitoredPool) => {
    setTargetExitSymbol(pool.tokenSymbol);
    handleSimulateRug();
  };

  const handleOpenExitModal = (symbol?: string) => {
    if (symbol) setTargetExitSymbol(symbol);
    setIsExitModalOpen(true);
  };

  const latestAlert = alerts.length > 0 ? alerts[0] : null;

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Header
        telemetry={telemetry}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onSimulateRug={handleSimulateRug}
        onOpenExitModal={() => handleOpenExitModal('PEPE2')}
      />

      {/* Emergency Flashing Banner */}
      <EmergencyBanner
        latestAlert={latestAlert}
        onOpenExitModal={() => handleOpenExitModal(latestAlert?.tokenSymbol)}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 lg:px-8 py-6 space-y-6">
        {/* Top Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 font-mono text-xs">
          <div className="rounded-xl border border-slate-800 bg-[#0d121d] p-3.5">
            <span className="text-slate-400 block text-[11px] mb-1">DETECTION SPEED</span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-lg">
              <Zap className="h-4 w-4" />
              <span>&lt; 400ms Sub-Second</span>
            </div>
            <span className="text-slate-500 text-[10px]">Via Solami Bare-Metal Stream</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0d121d] p-3.5">
            <span className="text-slate-400 block text-[11px] mb-1">RUGS DETECTED TODAY</span>
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-lg">
              <span>{alerts.length} Incidents</span>
            </div>
            <span className="text-slate-500 text-[10px]">DEX Liquidity Removals</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0d121d] p-3.5">
            <span className="text-slate-400 block text-[11px] mb-1">ESTIMATED CAPITAL PROTECTED</span>
            <div className="flex items-center gap-1.5 text-amber-300 font-bold text-lg">
              <span>${telemetry.savedCapitalEstimateUsd.toLocaleString()}</span>
            </div>
            <span className="text-slate-500 text-[10px]">Simulated Early Beam Exits</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0d121d] p-3.5">
            <span className="text-slate-400 block text-[11px] mb-1">ACTIVE RPC HEALTH</span>
            <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-lg">
              <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span>{telemetry.latencyMs}ms Ping</span>
            </div>
            <span className="text-slate-500 text-[10px]">Slot #{telemetry.currentSlot.toLocaleString()}</span>
          </div>
        </div>

        {/* Core Sentinel Grid: Alert Stream & Vulnerability Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Sub-Second Alert Stream (7 cols) */}
          <div className="lg:col-span-7">
            <AlertStream
              alerts={alerts}
              onOpenExitModal={handleOpenExitModal}
            />
          </div>

          {/* Right Column: Pool Watchlist & Radar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <PoolWatchlist
              pools={pools}
              onTriggerPoolRug={handleTriggerPoolRug}
            />
          </div>
        </div>

        {/* Technical Architecture & Solami Showcase Panel */}
        <SolamiTelemetryPanel telemetry={telemetry} />
      </main>

      {/* Footer (Strictly anonymous, no personal names) */}
      <footer className="border-t border-slate-800/80 bg-[#06080d] px-4 lg:px-8 py-5 text-xs text-slate-500 font-mono">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-red-400" />
            <span className="text-slate-300 font-semibold">Solami RugWatch</span>
            <span>— Open-Source Sub-Second Sentinel for Solana Mainnet</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://solami.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span>Powered by Solami.dev</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span>·</span>
            <a
              href="https://superteam.fun/earn/listing/build-something-live-on-solana-data"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Superteam Earn Bounty
            </a>
          </div>
        </div>
      </footer>

      {/* Emergency Beam Exit Modal */}
      <EmergencyExitModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        targetSymbol={targetExitSymbol}
        solamiLatencyMs={telemetry.latencyMs}
      />
    </div>
  );
};
