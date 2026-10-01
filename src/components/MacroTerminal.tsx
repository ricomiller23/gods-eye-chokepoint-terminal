import React from 'react';
import { MACRO_INDICATORS, TOTAL_GLOBAL_CHOKEPOINT_FLOW_MBD, TOTAL_GLOBAL_CRUDE_PRODUCTION_MBD } from '../data/macro';
import { CHOKEPOINTS } from '../data/chokepoints';
import { 
  TrendingUp, TrendingDown, DollarSign, Activity, Flame, 
  ShieldAlert, Anchor, Compass, BarChart2, Layers
} from 'lucide-react';

export const MacroTerminal: React.FC = () => {
  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
            ENERGY & WAR-RISK MACROECONOMIC PARITY
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1.5 font-mono">
            Global Benchmark Indicators
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Standardized commodity indices, container freight benchmarks, and Lloyd’s Joint War Committee breach premium valuations anchored to October 1, 2026 live telemetry.
          </p>
        </div>

        <div className="text-right font-mono">
          <div className="text-xs text-slate-400">Total Seaborne Vulnerability</div>
          <div className="text-lg font-bold text-amber-400">
            54.6% of Global Supply
          </div>
          <div className="text-[10px] text-slate-500">56.0M of 102.5M bpd</div>
        </div>
      </div>

      {/* 8-Panel Institutional Ticker Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MACRO_INDICATORS.map((item, idx) => {
          const isPositive = item.change24h > 0;

          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#0B1220]/80 border border-slate-800 hover:border-slate-700 transition-colors shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">{item.ticker}</span>
                  <span className={`flex items-center text-[11px] font-mono font-bold ${
                    isPositive ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {isPositive ? <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> : <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
                    {isPositive ? `+${item.changePct}%` : `${item.changePct}%`}
                  </span>
                </div>
                
                <h3 className="text-sm font-semibold text-white mt-1">{item.name}</h3>
                
                <div className="mt-3 flex items-baseline space-x-2">
                  <span className="text-2xl font-bold font-mono text-white tracking-tight">
                    {item.category === 'WAR_RISK' ? `${item.value.toFixed(2)}%` : 
                     item.category === 'PRECIOUS_METALS' ? `$${item.value.toLocaleString()}` :
                     item.value > 100 ? item.value.toLocaleString() : `$${item.value.toFixed(2)}`}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{item.unit}</span>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>{item.benchmark}</span>
                <span className={isPositive ? 'text-red-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                  {isPositive ? `+${item.change24h}` : `${item.change24h}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Maritime Chokepoint Crude Dependency Breakdown */}
      <div className="p-6 rounded-2xl bg-[#0B1220]/90 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Layers className="w-5 h-5 text-red-400" />
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wide">
              Global Daily Crude Transit Flow by Chokepoint (Total: 56.0M bpd)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Baseline: 102.5M bpd Total Global Production
          </span>
        </div>

        {/* Stacked Flow Visualizer */}
        <div className="space-y-3">
          {CHOKEPOINTS.map((cp) => {
            const pctOfTotalFlow = Math.round((cp.dailyOilFlowMbd / TOTAL_GLOBAL_CHOKEPOINT_FLOW_MBD) * 100);

            return (
              <div key={cp.id} className="space-y-1 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">{cp.name}</span>
                    <span className="text-slate-500 text-[11px]">({cp.region})</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-emerald-400 font-bold">{cp.dailyOilFlowMbd}M bpd</span>
                    <span className="text-slate-500 text-[11px] w-12 text-right">{pctOfTotalFlow}% flow</span>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${
                      cp.threatLevel === 'CRITICAL' ? 'bg-red-500' :
                      cp.threatLevel === 'HIGH' ? 'bg-amber-500' :
                      cp.threatLevel === 'ELEVATED' ? 'bg-yellow-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${(cp.dailyOilFlowMbd / 22) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
