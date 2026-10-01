import React, { useState, useEffect } from 'react';
import { 
  Globe2, ShieldAlert, Radio, Activity, Terminal, 
  Layers, AlertTriangle, Crosshair, BarChart3, FileText, Zap
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'map' | 'chokepoints' | 'macro' | 'incidents' | 'simulator';
  setActiveTab: (tab: 'map' | 'chokepoints' | 'macro' | 'incidents' | 'simulator') => void;
  onOpenBriefing: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenBriefing }) => {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#030712]/95 border-b border-slate-800/80 backdrop-blur-md text-slate-100">
      {/* Top Threat Alert Bar */}
      <div className="bg-red-950/40 border-b border-red-900/40 px-4 py-1.5 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-red-400 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>MARITIME DEFCON 2:</span>
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Active Kinetic Interdiction in Southern Red Sea · Bab el-Mandeb War Risk Hull Surcharge Peak
          </span>
        </div>
        <div className="flex items-center space-x-4 text-slate-400">
          <span className="hidden md:inline">Z.ai GLM-5.3 + Claude 3.7 Defense Synthesis</span>
          <span className="text-emerald-400 font-semibold">{utcTime || '2026-10-01 19:45:00 UTC'}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-red-600/15 border border-red-500/40 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <Crosshair className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-wider text-white font-mono">
                GOD'S EYE // CHOKEPOINT COMMAND
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                v3.2 DEFENSE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight">
              Global Maritime Chokepoints, Energy Flows & Strategic War-Risk Telemetry
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-mono font-semibold">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'map' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Tactical Map</span>
          </button>
          
          <button
            onClick={() => setActiveTab('chokepoints')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'chokepoints' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>6 Chokepoints</span>
          </button>

          <button
            onClick={() => setActiveTab('macro')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'macro' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Energy Parity</span>
          </button>

          <button
            onClick={() => setActiveTab('incidents')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'incidents' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Incident Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'simulator' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>War-Game Sim</span>
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenBriefing}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold border border-slate-700 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-red-400" />
            <span>Executive Briefing</span>
          </button>
        </div>
      </div>
    </header>
  );
};
