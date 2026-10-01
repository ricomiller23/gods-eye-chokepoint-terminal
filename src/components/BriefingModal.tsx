import React, { useState } from 'react';
import { CHOKEPOINTS } from '../data/chokepoints';
import { MACRO_INDICATORS } from '../data/macro';
import { VERIFIED_INCIDENTS } from '../data/incidents';
import { 
  X, Printer, Copy, Check, ShieldAlert, Crosshair, 
  FileText, Globe2, AlertTriangle, Scale, Activity
} from 'lucide-react';

interface BriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BriefingModal: React.FC<BriefingModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const text = `GOD'S EYE // EXECUTIVE MARITIME INTELLIGENCE BRIEFING (OCTOBER 1, 2026)
STRATEGIC CHOKEPOINT TELEMETRY & GLOBAL ENERGY CRISIS AUDIT

1. MACRO COMMODITY PARITY BENCHMARKS:
- Brent Crude: $78.45/bbl (+1.82%)
- WTI Crude: $74.20/bbl (+1.65%)
- Henry Hub Gas: $2.85/MMBtu
- European TTF Gas: €38.20/MWh
- Lloyd's JWC War Risk Hull Rate: 0.75% of Insured Value
- Cape of Good Hope Diversion: +14.2 Days (+4,300 NM)

2. CRITICAL CHOKEPOINT POSTURE:
- Strait of Hormuz: 20.5M bpd (Threat: HIGH). Heightened IRGC fast boat activity in inbound TSS.
- Bab el-Mandeb: 8.8M bpd (Threat: CRITICAL). >62% container fleet diverted. 14 kinetic events in 30d.
- Strait of Malacca: 16.2M bpd (Threat: ELEVATED). Congestion & nocturnal boarding risk in Phillip Channel.
- Suez Canal: 5.5M bpd (Threat: HIGH). Downstream transit depression (-61% container tonnage YoY).
- Turkish Straits: 3.2M bpd (Threat: ELEVATED). Black Sea drifting mine threat & dark fleet squeeze.
- Panama Canal: 1.8M bpd (Threat: LOW). Transits normalized to 34 daily slots.

3. DEFENSE OPERATIONS ACTIVE:
- CTF 153 (Operation Prosperity Guardian)
- EUNAVFOR Operation ASPIDES
- US 5th Fleet TF 152 (Persian Gulf)
- Malacca Straits Patrol (MSP)

Synthesis by Z.ai GLM-5.3 & Claude 3.7 Sonnet Defense Core.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-4xl my-8 bg-[#070D18] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#0B1220]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-red-600/15 border border-red-500/40 text-red-400">
              <Crosshair className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/60">
                  TOP SECRET // DEFENSE & ENERGY INTELLIGENCE
                </span>
                <span className="text-xs text-slate-400 font-mono">OCTOBER 1, 2026</span>
              </div>
              <h2 className="text-lg font-bold tracking-tight text-white mt-0.5 font-mono">
                Executive Maritime Chokepoint & Crisis Briefing
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm font-sans">
          {/* Executive Summary */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-xs font-mono uppercase text-red-400 font-bold">1. Strategic Overview</div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              Global energy security remains acutely vulnerable to concentrated geographic choke vectors. 54.6% of all seaborne crude oil (56.0M bpd) transits through just six narrow corridors. With the Bab el-Mandeb currently operating under active anti-ship ballistic missile and explosive USV interdiction, commercial shipping is bearing a permanent +14.2 day Cape of Good Hope transit penalty and +$1.25M in additional bunker fuel per voyage.
            </p>
          </div>

          {/* Macro Summary Table */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase text-slate-400 font-bold">2. Macro Benchmark Parity (Zero-Discrepancy)</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px]">BRENT CRUDE</span>
                <div className="text-base font-bold text-white mt-0.5">$78.45 / bbl</div>
                <span className="text-red-400 text-[10px]">+1.82% (24h)</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px]">WTI CRUDE</span>
                <div className="text-base font-bold text-white mt-0.5">$74.20 / bbl</div>
                <span className="text-red-400 text-[10px]">+1.65% (24h)</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px]">JWC WAR RISK HULL</span>
                <div className="text-base font-bold text-red-400 mt-0.5">0.75% Val</div>
                <span className="text-slate-500 text-[10px]">Red Sea / Aden</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px]">CAPE DIVERSION</span>
                <div className="text-base font-bold text-amber-400 mt-0.5">+14.2 Days</div>
                <span className="text-slate-500 text-[10px]">+4,300 NM</span>
              </div>
            </div>
          </div>

          {/* Chokepoint Table */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase text-slate-400 font-bold">3. Chokepoint Threat Assessment</div>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Chokepoint</th>
                    <th className="p-2.5">Threat Level</th>
                    <th className="p-2.5">Oil Flow (Mbd)</th>
                    <th className="p-2.5">LNG Flow</th>
                    <th className="p-2.5">JWC Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
                  {CHOKEPOINTS.map(cp => (
                    <tr key={cp.id}>
                      <td className="p-2.5 font-bold text-white">{cp.name}</td>
                      <td className="p-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          cp.threatLevel === 'CRITICAL' ? 'bg-red-950 text-red-400' :
                          cp.threatLevel === 'HIGH' ? 'bg-amber-950 text-amber-400' : 'bg-emerald-950 text-emerald-400'
                        }`}>
                          {cp.threatLevel}
                        </span>
                      </td>
                      <td className="p-2.5 text-emerald-400 font-bold">{cp.dailyOilFlowMbd}M</td>
                      <td className="p-2.5 text-slate-300">{cp.dailyLngFlowMmtpa} Mmtpa</td>
                      <td className="p-2.5 text-slate-400">{cp.jwcWarRiskStatus ? 'LISTED' : 'STANDARD'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-[#0B1220] flex items-center justify-between text-xs font-mono">
          <div className="text-slate-500">
            Compliant with Lloyd's JWC & US CENTCOM Intelligence Directives
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Brief' : 'Copy Brief'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print PDF</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
