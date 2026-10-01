import React, { useState } from 'react';
import { Chokepoint } from '../types';
import { CHOKEPOINTS } from '../data/chokepoints';
import { 
  ShieldAlert, AlertTriangle, Crosshair, Anchor, Flame, 
  Clock, DollarSign, Compass, Radio, ShieldCheck, CheckCircle2, ChevronRight
} from 'lucide-react';

interface ChokepointCardsProps {
  onSelectChokepoint: (cp: Chokepoint) => void;
}

export const ChokepointCards: React.FC<ChokepointCardsProps> = ({ onSelectChokepoint }) => {
  const [filterRegion, setFilterRegion] = useState<string>('ALL');

  const filteredChokepoints = CHOKEPOINTS.filter(cp => {
    if (filterRegion === 'ALL') return true;
    return cp.region.toLowerCase().includes(filterRegion.toLowerCase());
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header and Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/60">
            STRATEGIC PASSAGE VULNERABILITY MATRIX
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1.5 font-mono">
            The 6 Global Maritime Narrows
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Together controlling 54.6% of all global seaborne crude oil (56.0M bpd) and 42% of global liquefied natural gas (LNG). Lloyd's Joint War Committee breach boundaries actively monitored.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          {['ALL', 'Middle East', 'Africa', 'Asia', 'America'].map((region) => (
            <button
              key={region}
              onClick={() => setFilterRegion(region)}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                filterRegion === region
                  ? 'bg-red-600 text-white border-red-500 font-bold'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Chokepoints */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredChokepoints.map((cp) => {
          const isCritical = cp.threatLevel === 'CRITICAL';
          const isHigh = cp.threatLevel === 'HIGH';

          return (
            <div
              key={cp.id}
              onClick={() => onSelectChokepoint(cp)}
              className="group relative p-5 rounded-2xl bg-[#0B1220]/80 border border-slate-800 hover:border-red-500/50 transition-all duration-300 shadow-lg flex flex-col justify-between cursor-pointer overflow-hidden hover:bg-[#0E172A]"
            >
              {/* Top Accent Line */}
              <div 
                className={`absolute top-0 left-0 right-0 h-1 ${
                  isCritical ? 'bg-red-500' : isHigh ? 'bg-amber-500' : 'bg-emerald-500'
                }`} 
              />

              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-slate-400">{cp.shortCode}</span>
                      <span className="text-[10px] text-slate-500 font-mono">• {cp.primaryWaterway}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-red-400 transition-colors">
                      {cp.name}
                    </h3>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    isCritical ? 'bg-red-950 text-red-400 border border-red-800' :
                    isHigh ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}>
                    {cp.threatLevel}
                  </span>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 uppercase">Crude Flow</span>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">
                      {cp.dailyOilFlowMbd}M bpd
                    </div>
                    <span className="text-[9px] text-slate-500">
                      LNG: {cp.dailyLngFlowMmtpa} Mmtpa
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 uppercase">War Risk Rate</span>
                    <div className={`text-sm font-bold mt-0.5 ${cp.jwcWarRiskStatus ? 'text-red-400' : 'text-slate-300'}`}>
                      {cp.hullWarRiskPremiumPct}%
                    </div>
                    <span className="text-[9px] text-slate-500">
                      JWC: {cp.jwcWarRiskStatus ? 'LISTED' : 'STANDARD'}
                    </span>
                  </div>
                </div>

                {/* Status Narrative */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {cp.statusSummary}
                </p>

                {/* Threat Vectors & Task Forces */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Primary Security Forces:</div>
                  <div className="flex flex-wrap gap-1">
                    {cp.activeSecurityOps.slice(0, 2).map((op, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {op}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-amber-400 text-[11px]">
                  Reroute: +{cp.capeRerouteDelayDays} Days
                </span>
                <span className="flex items-center text-red-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Inspect</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
