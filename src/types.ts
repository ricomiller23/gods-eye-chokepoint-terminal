export type ThreatLevel = 'LOW' | 'ELEVATED' | 'HIGH' | 'CRITICAL';

export interface Chokepoint {
  id: string;
  name: string;
  shortCode: string;
  region: string;
  primaryWaterway: string;
  coordinates: {
    lat: number;
    lng: number;
    svgX: number;
    svgY: number;
  };
  dailyOilFlowMbd: number; // Million barrels/day
  dailyLngFlowMmtpa: number; // Million metric tonnes/yr
  dailyVesselsTransit: number;
  globalMaritimeSharePct: number;
  threatLevel: ThreatLevel;
  jwcWarRiskStatus: boolean; // Lloyd's Joint War Committee Listed
  hullWarRiskPremiumPct: number;
  capeRerouteDelayDays: number;
  additionalFuelCostPerVoyage: number; // USD
  primaryThreatActors: string[];
  activeSecurityOps: string[];
  recentIncidentsCount30d: number;
  statusSummary: string;
  navigationalNotice: string;
}

export interface MacroIndicator {
  name: string;
  ticker: string;
  value: number;
  unit: string;
  change24h: number;
  changePct: number;
  benchmark: string;
  category: 'ENERGY' | 'FREIGHT' | 'WAR_RISK' | 'PRECIOUS_METALS';
}

export interface KineticIncident {
  id: string;
  timestamp: string;
  chokepointId: string;
  chokepointName: string;
  vesselName: string;
  vesselType: 'VLCC Supertanker' | 'Ultra-Large Container' | 'Q-Max LNG Carrier' | 'Capesize Bulk' | 'Chemical Tanker';
  flagState: string;
  incidentType: 'Anti-Ship Ballistic Missile' | 'Attack Drone Swarm' | 'Uncrewed Surface Vessel (USV)' | 'Armed Piracy Boarding' | 'GPS Spoofing / Meaconing';
  outcome: 'Intercepted by Coalition Aegis Destroyer' | 'Hull Breach - Crew Safe' | 'Missile Splash Near-Miss' | 'Repelled by Armed Guards' | 'Diverted via Good Hope';
  reportingAgency: 'UKMTO' | 'CENTCOM' | 'EUNAVFOR ASPIDES' | 'AMBREY INTELLIGENCE' | 'IMB PRC';
  coordinatesStr: string;
}

export interface SimulationParams {
  hormuzClosurePct: number; // 0 - 100%
  babElMandebAvoidancePct: number; // 0 - 100%
  panamaDraftRestrictionPct: number; // 0 - 50%
  brentBasePrice: number;
}

export interface SimulationOutput {
  projectedBrentCrude: number;
  brentDeltaPct: number;
  dailySupplyShortfallMbd: number;
  containerFreightSpikePct: number;
  averageVoyageCostDeltaUsd: number;
  globalGdpImpactPct: number;
  strategicPetroleumReserveDrawMbd: number;
  strategicWarningTag: 'STABLE' | 'ELEVATED RISK' | 'SEVERE CRISIS' | 'GLOBAL ENERGY EMERGENCY';
}
