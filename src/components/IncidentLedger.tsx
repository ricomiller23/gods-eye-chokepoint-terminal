import React, { useState } from 'react';
import { VERIFIED_INCIDENTS } from '../data/incidents';
import { KineticIncident } from '../types';
import { 
  Radio, ShieldAlert, AlertTriangle, Crosshair, Anchor, 
  Search, ShieldCheck, CheckCircle2, Clock, ExternalLink, Filter
} from 'lucide-react';

export const IncidentLedger: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredIncidents = VERIFIED_INCIDENTS.filter(inc => {
    const matchesSearch = inc.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inc.chokepointName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inc.reportingAgency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inc.incidentType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || inc.incidentType.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/60">
            KINETIC & ELECTRONIC INTERDICTION LOG
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1.5 font-mono">
            Verified Maritime Incident Telemetry
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Multi-source verified incident reports aggregated directly from UKMTO advisories, US CENTCOM operational releases, EUNAVFOR Aspides situation reports, and Ambrey maritime intelligence.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search vessel, agency, chokepoint..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 w-64"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 focus:outline-none focus:border-red-500"
          >
            <option value="ALL">All Threat Types</option>
            <option value="Missile">Anti-Ship Ballistic Missile</option>
            <option value="Drone">Attack Drone Swarm</option>
            <option value="USV">Uncrewed Surface Vessel</option>
            <option value="Piracy">Armed Piracy / Boarding</option>
            <option value="Spoofing">GPS Spoofing / Meaconing</option>
          </select>
        </div>
      </div>

      {/* Incident Cards / List */}
      <div className="space-y-3 font-mono">
        {filteredIncidents.map((incident) => {
          const isMissile = incident.incidentType.includes('Missile');
          const isDrone = incident.incidentType.includes('Drone') || incident.incidentType.includes('USV');

          return (
            <div
              key={incident.id}
              className="p-4 rounded-xl bg-[#0B1220]/80 border border-slate-800 hover:border-slate-700 transition-colors shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start space-x-3.5">
                <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                  isMissile ? 'bg-red-500/10 border border-red-500/30 text-red-400' :
                  isDrone ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' :
                  'bg-sky-500/10 border border-sky-500/30 text-sky-400'
                }`}>
                  <Crosshair className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-sm">{incident.vesselName}</span>
                    <span className="text-[11px] text-slate-400">({incident.vesselType} · {incident.flagState})</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                      {incident.reportingAgency}
                    </span>
                  </div>

                  <div className="text-xs text-red-400 font-semibold mt-1">
                    {incident.incidentType}
                  </div>

                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Location: <span className="text-slate-300">{incident.coordinatesStr}</span> · <span className="text-amber-400">{incident.chokepointName}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Timestamp & Outcome */}
              <div className="flex md:flex-col items-end justify-between w-full md:w-auto shrink-0 text-right">
                <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{incident.timestamp}</span>
                </span>
                
                <span className="mt-1 px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                  {incident.outcome}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
