import React, { useState } from 'react';
import { Chokepoint } from '../types';
import { CHOKEPOINTS } from '../data/chokepoints';
import { 
  ShieldAlert, AlertTriangle, Crosshair, Anchor, Flame, 
  Clock, DollarSign, Compass, ExternalLink, Activity
} from 'lucide-react';

interface StrategicMapProps {
  selectedChokepoint: Chokepoint;
  onSelectChokepoint: (cp: Chokepoint) => void;
}

export const StrategicMap: React.FC<StrategicMapProps> = ({
  selectedChokepoint,
  onSelectChokepoint
}) => {
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [showReroute, setShowReroute] = useState<boolean>(true);
  const [showWarZones, setShowWarZones] = useState<boolean>(true);

  const getThreatColor = (level: Chokepoint['threatLevel']) => {
    switch (level) {
      case 'CRITICAL': return '#ef4444'; // Red
      case 'HIGH': return '#f97316';     // Orange
      case 'ELEVATED': return '#eab308'; // Yellow
      default: return '#10b981';         // Emerald
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs font-mono">
        <div className="flex items-center space-x-2">
          <span className="text-red-400 font-bold flex items-center space-x-1.5">
            <Crosshair className="w-4 h-4 text-red-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>GEO-RADAR DISPLAY:</span>
          </span>
          <span className="text-slate-300">
            6 Primary Strategic Energy & Maritime Chokepoints
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowRoutes(!showRoutes)}
            className={`px-2.5 py-1 rounded border transition-colors ${
              showRoutes ? 'bg-sky-950/80 text-sky-400 border-sky-800' : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            Corridors
          </button>
          <button
            onClick={() => setShowReroute(!showReroute)}
            className={`px-2.5 py-1 rounded border transition-colors ${
              showReroute ? 'bg-amber-950/80 text-amber-400 border-amber-800' : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            Cape Detour (+14d)
          </button>
          <button
            onClick={() => setShowWarZones(!showWarZones)}
            className={`px-2.5 py-1 rounded border transition-colors ${
              showWarZones ? 'bg-red-950/80 text-red-400 border-red-800' : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            JWC War Risk Zones
          </button>
        </div>
      </div>

      {/* Vector Map Canvas */}
      <div className="relative w-full aspect-[2/1] min-h-[420px] bg-[#050B17] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <svg viewBox="0 0 1000 500" className="w-full h-full select-none">
          <defs>
            {/* War Risk Zone Radial Glow */}
            <radialGradient id="redZoneGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#ef4444" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="orangeZoneGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
              <stop offset="80%" stopColor="#f97316" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </radialGradient>

            {/* Linear Gradient for Cape Detour */}
            <linearGradient id="capeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Simplified Continental Landmass Outlines (Vector Polygons) */}
          <g fill="#0e1726" stroke="#1e293b" strokeWidth="1">
            {/* North America */}
            <path d="M 120,110 L 250,90 L 320,130 L 290,240 L 220,290 L 250,340 L 270,380 L 230,370 L 150,280 L 110,180 Z" />
            {/* South America */}
            <path d="M 270,380 L 330,400 L 360,450 L 330,520 L 280,500 L 250,420 Z" />
            {/* Europe */}
            <path d="M 460,110 L 580,100 L 610,170 L 530,220 L 460,200 L 440,150 Z" />
            {/* Africa */}
            <path d="M 450,240 L 570,240 L 600,320 L 580,410 L 530,470 L 480,460 L 440,350 L 430,280 Z" />
            {/* Asia & Middle East */}
            <path d="M 580,100 L 860,110 L 890,250 L 780,310 L 710,290 L 640,320 L 580,260 Z" />
            {/* Southeast Asia & Australia */}
            <path d="M 760,350 L 840,370 L 820,440 L 760,420 Z M 800,430 L 920,430 L 900,500 L 820,480 Z" />
          </g>

          {/* War Risk Danger Bubbles */}
          {showWarZones && (
            <g>
              {/* Red Sea / Bab el-Mandeb War Zone */}
              <circle cx="585" cy="395" r="55" fill="url(#redZoneGlow)" />
              {/* Persian Gulf / Hormuz War Zone */}
              <circle cx="625" cy="345" r="45" fill="url(#orangeZoneGlow)" />
            </g>
          )}

          {/* Primary Maritime Shipping Corridors (Cyan Dashed) */}
          {showRoutes && (
            <g stroke="#0284c7" strokeWidth="1.8" strokeDasharray="5,4" fill="none" opacity="0.65">
              {/* Asia to Europe via Malacca -> Bab el-Mandeb -> Suez -> Gibraltar */}
              <path d="M 880,270 Q 790,380 790,440 T 630,420 T 585,395 T 555,310 T 450,260 T 410,200" />
              {/* Persian Gulf to East Asia via Hormuz -> Malacca */}
              <path d="M 625,345 Q 710,400 790,440 T 880,270" />
              {/* Trans-Pacific to Panama */}
              <path d="M 890,250 Q 950,250 990,260 M 10,260 Q 150,300 280,395" />
            </g>
          )}

          {/* Cape of Good Hope Reroute Path (Orange/Red Pulsing Line) */}
          {showReroute && (
            <g>
              <path 
                d="M 790,440 Q 680,470 550,490 T 430,380 T 410,200" 
                stroke="url(#capeGradient)" 
                strokeWidth="2.5" 
                strokeDasharray="6,4" 
                fill="none" 
              />
              <text x="500" y="505" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">
                CAPE OF GOOD HOPE DETOUR (+4,300 NM / +14.2 DAYS)
              </text>
            </g>
          )}

          {/* Chokepoint Nodes with Radar Pings */}
          {CHOKEPOINTS.map((cp) => {
            const isSelected = selectedChokepoint.id === cp.id;
            const color = getThreatColor(cp.threatLevel);

            return (
              <g 
                key={cp.id} 
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => onSelectChokepoint(cp)}
              >
                {/* Ping Animation Ring */}
                <circle
                  cx={cp.coordinates.svgX}
                  cy={cp.coordinates.svgY}
                  r={isSelected ? 16 : 10}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  className="radar-ping"
                  opacity="0.8"
                />

                {/* Inner Glow Anchor */}
                <circle
                  cx={cp.coordinates.svgX}
                  cy={cp.coordinates.svgY}
                  r={isSelected ? 8 : 6}
                  fill={color}
                  stroke="#0f172a"
                  strokeWidth="2"
                />

                {/* Label Tag */}
                <rect
                  x={cp.coordinates.svgX + 10}
                  y={cp.coordinates.svgY - 14}
                  width="135"
                  height="22"
                  rx="4"
                  fill="#030712"
                  stroke={isSelected ? '#f8fafc' : color}
                  strokeWidth={isSelected ? 1.5 : 0.8}
                  opacity="0.92"
                />
                
                <text
                  x={cp.coordinates.svgX + 16}
                  y={cp.coordinates.svgY}
                  fill="#f8fafc"
                  fontSize="9.5"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {cp.shortCode}: {cp.dailyOilFlowMbd}M bpd
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Chokepoint Telemetry HUD Overlay */}
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-96 p-4 rounded-xl bg-slate-950/90 border border-slate-800 backdrop-blur-md text-xs shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: getThreatColor(selectedChokepoint.threatLevel) }}
              />
              <span className="font-mono font-bold text-white uppercase text-sm">
                {selectedChokepoint.name}
              </span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
              selectedChokepoint.threatLevel === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-800' :
              selectedChokepoint.threatLevel === 'HIGH' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
              'bg-emerald-950 text-emerald-400 border border-emerald-800'
            }`}>
              {selectedChokepoint.threatLevel}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3 font-mono">
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 uppercase">Daily Crude Flow</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">
                {selectedChokepoint.dailyOilFlowMbd}M bpd
              </div>
              <div className="text-[9px] text-slate-500">{selectedChokepoint.globalMaritimeSharePct}% of global seaborne</div>
            </div>

            <div className="p-2 rounded bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 uppercase">War Risk Hull Premium</div>
              <div className="text-sm font-bold text-red-400 mt-0.5">
                {selectedChokepoint.hullWarRiskPremiumPct}% Val
              </div>
              <div className="text-[9px] text-slate-500">JWC Listed: {selectedChokepoint.jwcWarRiskStatus ? 'YES' : 'NO'}</div>
            </div>
          </div>

          <p className="mt-2.5 text-[11px] text-slate-300 leading-relaxed font-sans line-clamp-2">
            {selectedChokepoint.statusSummary}
          </p>

          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Delay: +{selectedChokepoint.capeRerouteDelayDays} Days</span>
            <span className="text-amber-400 font-semibold">+${(selectedChokepoint.additionalFuelCostPerVoyage / 1000).toFixed(0)}k Fuel/Voyage</span>
          </div>
        </div>
      </div>
    </div>
  );
};
