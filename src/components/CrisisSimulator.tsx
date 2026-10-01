import React, { useState, useMemo } from 'react';
import { SimulationParams, SimulationOutput } from '../types';
import { 
  Zap, AlertTriangle, ShieldAlert, TrendingUp, DollarSign, 
  Activity, Gauge, Flame, RefreshCcw, ArrowRight, BarChart3
} from 'lucide-react';

export const CrisisSimulator: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>({
    hormuzClosurePct: 0,
    babElMandebAvoidancePct: 62, // Current baseline
    panamaDraftRestrictionPct: 0,
    brentBasePrice: 78.45
  });

  // Dynamic Macroeconomic Shock Calculations
  const output: SimulationOutput = useMemo(() => {
    // Hormuz flow is 20.5M bpd. Each 10% closure removes 2.05M bpd from global markets
    const hormuzSupplyLoss = (params.hormuzClosurePct / 100) * 20.5;
    // Bab el-Mandeb avoidance forces Cape of Good Hope, adding tanker transit time and tying up fleet capacity
    const redSeaTankerTieUp = (params.babElMandebAvoidancePct / 100) * 1.8; // effective deficit
    const totalDailyShortfall = Number((hormuzSupplyLoss + redSeaTankerTieUp * 0.4).toFixed(1));

    // Price elasticity: oil is notoriously inelastic. ~1% shortfall = 4-6% price increase
    const brentPriceSpike = params.brentBasePrice * (1 + (hormuzSupplyLoss * 0.042) + (params.babElMandebAvoidancePct * 0.0015));
    const projectedBrent = Number(brentPriceSpike.toFixed(2));
    const brentDeltaPct = Number((((projectedBrent - params.brentBasePrice) / params.brentBasePrice) * 100).toFixed(1));

    // Freight rate spike (SCFI baseline 2,185)
    const freightSpike = Number(((params.babElMandebAvoidancePct * 1.6) + (params.panamaDraftRestrictionPct * 1.8)).toFixed(0));

    // Additional fuel cost per voyage
    const voyageDelta = Math.round((params.babElMandebAvoidancePct / 100) * 1250000);

    // Global GDP Drag
    const gdpImpact = Number(((brentDeltaPct * 0.025)).toFixed(2));

    // SPR Draw Needed
    const sprDraw = Number((Math.min(totalDailyShortfall * 0.65, 4.5)).toFixed(1));

    let warningTag: SimulationOutput['strategicWarningTag'] = 'STABLE';
    if (projectedBrent > 120 || totalDailyShortfall > 8) {
      warningTag = 'GLOBAL ENERGY EMERGENCY';
    } else if (projectedBrent > 95 || totalDailyShortfall > 3) {
      warningTag = 'SEVERE CRISIS';
    } else if (projectedBrent > 82 || params.babElMandebAvoidancePct > 50) {
      warningTag = 'ELEVATED RISK';
    }

    return {
      projectedBrentCrude: projectedBrent,
      brentDeltaPct,
      dailySupplyShortfallMbd: totalDailyShortfall,
      containerFreightSpikePct: freightSpike,
      averageVoyageCostDeltaUsd: voyageDelta,
      globalGdpImpactPct: gdpImpact,
      strategicPetroleumReserveDrawMbd: sprDraw,
      strategicWarningTag: warningTag
    };
  }, [params]);

  const loadPreset = (preset: 'baseline' | 'redsea' | 'hormuz' | 'meltdown') => {
    switch (preset) {
      case 'baseline':
        setParams({ hormuzClosurePct: 0, babElMandebAvoidancePct: 62, panamaDraftRestrictionPct: 0, brentBasePrice: 78.45 });
        break;
      case 'redsea':
        setParams({ hormuzClosurePct: 0, babElMandebAvoidancePct: 100, panamaDraftRestrictionPct: 10, brentBasePrice: 78.45 });
        break;
      case 'hormuz':
        setParams({ hormuzClosurePct: 50, babElMandebAvoidancePct: 80, panamaDraftRestrictionPct: 15, brentBasePrice: 78.45 });
        break;
      case 'meltdown':
        setParams({ hormuzClosurePct: 100, babElMandebAvoidancePct: 100, panamaDraftRestrictionPct: 35, brentBasePrice: 78.45 });
        break;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
            STRATEGIC WAR-GAME CRISIS ENGINE
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1.5 font-mono">
            Chokepoint Disruption Shock Simulator
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Simulate partial or total blockades of the Strait of Hormuz and Bab el-Mandeb. Computes instant crude price shock, global supply deficit, freight inflation, and strategic petroleum reserve (SPR) emergency exhaustion rates.
          </p>
        </div>

        {/* Preset Scenario Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <button
            onClick={() => loadPreset('baseline')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            Current Baseline
          </button>
          <button
            onClick={() => loadPreset('redsea')}
            className="px-2.5 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900 text-amber-400 border border-amber-800 transition-colors"
          >
            100% Red Sea Cutoff
          </button>
          <button
            onClick={() => loadPreset('hormuz')}
            className="px-2.5 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-400 border border-red-800 transition-colors"
          >
            50% Hormuz Blockade
          </button>
          <button
            onClick={() => loadPreset('meltdown')}
            className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold transition-colors"
          >
            Full Meltdown
          </button>
        </div>
      </div>

      {/* Main Grid: Sliders on Left, Impact on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0B1220]/80 border border-slate-800 space-y-6">
          <div className="flex items-center space-x-2 text-white font-mono text-sm font-bold border-b border-slate-800 pb-3">
            <Gauge className="w-4 h-4 text-red-400" />
            <span>DISRUPTION INPUT PARAMETERS</span>
          </div>

          {/* Slider 1: Hormuz */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold">Strait of Hormuz Closure:</span>
              <span className="text-red-400 font-bold">{params.hormuzClosurePct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={params.hormuzClosurePct}
              onChange={(e) => setParams({ ...params, hormuzClosurePct: Number(e.target.value) })}
              className="w-full accent-red-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% (Open: 20.5M bpd)</span>
              <span>100% (Total Closure)</span>
            </div>
          </div>

          {/* Slider 2: Bab el-Mandeb */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold">Bab el-Mandeb / Red Sea Avoidance:</span>
              <span className="text-amber-400 font-bold">{params.babElMandebAvoidancePct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={params.babElMandebAvoidancePct}
              onChange={(e) => setParams({ ...params, babElMandebAvoidancePct: Number(e.target.value) })}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% (Full Suez Traffic)</span>
              <span>Current (62%)</span>
              <span>100% (Total Cape Detour)</span>
            </div>
          </div>

          {/* Slider 3: Panama Canal */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold">Panama Canal Draft / Transit Limit:</span>
              <span className="text-sky-400 font-bold">{params.panamaDraftRestrictionPct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={params.panamaDraftRestrictionPct}
              onChange={(e) => setParams({ ...params, panamaDraftRestrictionPct: Number(e.target.value) })}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% (Normal 34 Slots)</span>
              <span>50% (Drought Restriction)</span>
            </div>
          </div>

          {/* Base Benchmark Info */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Brent Base Baseline:</span>
              <span className="text-white font-bold">${params.brentBasePrice}/bbl</span>
            </div>
            <div className="flex justify-between">
              <span>Global Crude Baseline:</span>
              <span className="text-white font-bold">102.5M bpd</span>
            </div>
          </div>
        </div>

        {/* Shock Output Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4 font-mono">
          {/* Top Banner Alert Level */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            output.strategicWarningTag === 'GLOBAL ENERGY EMERGENCY' ? 'bg-red-950/80 border-red-600 text-red-200' :
            output.strategicWarningTag === 'SEVERE CRISIS' ? 'bg-amber-950/80 border-amber-600 text-amber-200' :
            output.strategicWarningTag === 'ELEVATED RISK' ? 'bg-yellow-950/80 border-yellow-600 text-yellow-200' :
            'bg-slate-900 border-slate-800 text-slate-200'
          }`}>
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-red-400" />
              <span className="font-bold text-sm tracking-wide">
                DEFENSE SIMULATION RATING: {output.strategicWarningTag}
              </span>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700">
              +{output.brentDeltaPct}% Price Shift
            </span>
          </div>

          {/* Primary Metric Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#0B1220]/90 border border-slate-800">
              <span className="text-xs text-slate-400 uppercase">Projected Brent Crude Price</span>
              <div className="text-3xl font-extrabold text-white mt-1">
                ${output.projectedBrentCrude} <span className="text-sm font-normal text-slate-400">/ bbl</span>
              </div>
              <div className="text-xs text-red-400 font-bold mt-1">
                +${(output.projectedBrentCrude - params.brentBasePrice).toFixed(2)} (+{output.brentDeltaPct}%) Shock
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B1220]/90 border border-slate-800">
              <span className="text-xs text-slate-400 uppercase">Global Daily Supply Deficit</span>
              <div className="text-3xl font-extrabold text-amber-400 mt-1">
                -{output.dailySupplyShortfallMbd}M <span className="text-sm font-normal text-slate-400">bpd</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Immediate Physical Shortfall
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B1220]/90 border border-slate-800">
              <span className="text-xs text-slate-400 uppercase">Container Freight Rate Spike</span>
              <div className="text-3xl font-extrabold text-sky-400 mt-1">
                +{output.containerFreightSpikePct}%
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Avg +${(output.averageVoyageCostDeltaUsd / 1000).toFixed(0)}k fuel per vessel
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B1220]/90 border border-slate-800">
              <span className="text-xs text-slate-400 uppercase">Emergency SPR Draw Required</span>
              <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                {output.strategicPetroleumReserveDrawMbd}M <span className="text-sm font-normal text-slate-400">bpd</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Global GDP Drag: -{output.globalGdpImpactPct}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
