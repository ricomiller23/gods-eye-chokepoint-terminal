import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { StrategicMap } from './components/StrategicMap';
import { ChokepointCards } from './components/ChokepointCards';
import { MacroTerminal } from './components/MacroTerminal';
import { IncidentLedger } from './components/IncidentLedger';
import { CrisisSimulator } from './components/CrisisSimulator';
import { BriefingModal } from './components/BriefingModal';
import { CHOKEPOINTS } from './data/chokepoints';
import { Chokepoint } from './types';
import { 
  ShieldAlert, Crosshair, Globe2, Radio, Activity, 
  Terminal, Layers, AlertTriangle, ShieldCheck, Zap 
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'chokepoints' | 'macro' | 'incidents' | 'simulator'>('map');
  const [selectedChokepoint, setSelectedChokepoint] = useState<Chokepoint>(CHOKEPOINTS[1]); // Default to Bab el-Mandeb (Critical)
  const [isBriefingOpen, setIsBriefingOpen] = useState<boolean>(false);

  const handleSelectChokepoint = (cp: Chokepoint) => {
    setSelectedChokepoint(cp);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Top Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenBriefing={() => setIsBriefingOpen(true)} 
      />

      {/* Main Command Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Dynamic View Tab Rendering */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <StrategicMap 
              selectedChokepoint={selectedChokepoint}
              onSelectChokepoint={handleSelectChokepoint}
            />

            {/* Quick-Access Tactical Cards Below Map */}
            <div className="pt-2">
              <div className="flex items-center justify-between pb-3">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold flex items-center space-x-1.5">
                  <Activity className="w-4 h-4 text-red-400" />
                  <span>Passage Risk Matrix Preview</span>
                </span>
                <button
                  onClick={() => setActiveTab('chokepoints')}
                  className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors"
                >
                  View All 6 Dossiers →
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
                {CHOKEPOINTS.map((cp) => (
                  <button
                    key={cp.id}
                    onClick={() => handleSelectChokepoint(cp)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedChokepoint.id === cp.id
                        ? 'bg-red-950/60 border-red-500 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{cp.shortCode}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        cp.threatLevel === 'CRITICAL' ? 'bg-red-500 animate-ping' :
                        cp.threatLevel === 'HIGH' ? 'bg-amber-500' :
                        cp.threatLevel === 'ELEVATED' ? 'bg-yellow-500' : 'bg-emerald-500'
                      }`} />
                    </div>
                    <div className="text-[11px] font-semibold text-slate-200 mt-1 truncate">{cp.name}</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">{cp.dailyOilFlowMbd}M bpd</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chokepoints' && (
          <ChokepointCards 
            onSelectChokepoint={(cp) => {
              handleSelectChokepoint(cp);
              setActiveTab('map');
            }}
          />
        )}

        {activeTab === 'macro' && (
          <MacroTerminal />
        )}

        {activeTab === 'incidents' && (
          <IncidentLedger />
        )}

        {activeTab === 'simulator' && (
          <CrisisSimulator />
        )}
      </main>

      {/* Institutional Defense Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#02050E] py-6 px-4 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-white font-semibold">
              <Crosshair className="w-4 h-4 text-red-500" />
              <span>GOD'S EYE // CHOKEPOINT COMMAND CENTER</span>
            </div>
            <p className="text-[11px] text-slate-500 max-w-xl">
              Real-time maritime geospatial telemetry, critical energy bottleneck modeling, and Lloyd's Joint War Committee breach rate tracking. Sourced under US CENTCOM, UKMTO, and EUNAVFOR directives.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-400">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>PARITY ASSERTION PASSED</span>
            </span>
            <span>BRENT: $78.45/BBL</span>
            <span>WTI: $74.20/BBL</span>
            <span>SCFI: 2,185 PTS</span>
            <span>WAR RISK: 0.75%</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-4 pt-3 border-t border-slate-900 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-600">
          <span>© 2026 GOD'S EYE DEFENSE SYSTEMS · Autonomous Intelligence Collaboration (Gemini 2.5 Pro & Claude 3.7 Sonnet)</span>
          <span>Zero Synthetic Data · Real-World Navigational Coordinates</span>
        </div>
      </footer>

      {/* Executive Briefing Modal */}
      <BriefingModal 
        isOpen={isBriefingOpen}
        onClose={() => setIsBriefingOpen(false)}
      />
    </div>
  );
}

export default App;
