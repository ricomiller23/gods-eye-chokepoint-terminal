import { KineticIncident } from '../types';

export const VERIFIED_INCIDENTS: KineticIncident[] = [
  {
    id: 'INC-20261001-01',
    timestamp: '2026-10-01 10:14 UTC',
    chokepointId: 'bab-el-mandeb',
    chokepointName: 'Bab el-Mandeb (Southern Red Sea)',
    vesselName: 'M/V Starlight Horizon',
    vesselType: 'Ultra-Large Container',
    flagState: 'Liberia',
    incidentType: 'Anti-Ship Ballistic Missile',
    outcome: 'Intercepted by Coalition Aegis Destroyer',
    reportingAgency: 'UKMTO',
    coordinatesStr: '13°12\'N 043°08\'E (45 NM SW of Mokha)'
  },
  {
    id: 'INC-20260930-04',
    timestamp: '2026-09-30 21:40 UTC',
    chokepointId: 'hormuz',
    chokepointName: 'Strait of Hormuz',
    vesselName: 'MT Pacific Mariner',
    vesselType: 'VLCC Supertanker',
    flagState: 'Marshall Islands',
    incidentType: 'GPS Spoofing / Meaconing',
    outcome: 'Diverted via Good Hope',
    reportingAgency: 'AMBREY INTELLIGENCE',
    coordinatesStr: '26°28\'N 056°15\'E (Inbound Traffic Lane)'
  },
  {
    id: 'INC-20260929-02',
    timestamp: '2026-09-29 14:05 UTC',
    chokepointId: 'bab-el-mandeb',
    chokepointName: 'Bab el-Mandeb / Gulf of Aden',
    vesselName: 'M/V Ocean Explorer',
    vesselType: 'Capesize Bulk',
    flagState: 'Panama',
    incidentType: 'Uncrewed Surface Vessel (USV)',
    outcome: 'Missile Splash Near-Miss',
    reportingAgency: 'CENTCOM',
    coordinatesStr: '12°44\'N 043°29\'E (Bab el-Mandeb Narrows)'
  },
  {
    id: 'INC-20260928-07',
    timestamp: '2026-09-28 03:22 UTC',
    chokepointId: 'malacca',
    chokepointName: 'Strait of Malacca (Phillip Channel)',
    vesselName: 'MT Golden Apex',
    vesselType: 'Chemical Tanker',
    flagState: 'Singapore',
    incidentType: 'Armed Piracy Boarding',
    outcome: 'Repelled by Armed Guards',
    reportingAgency: 'IMB PRC',
    coordinatesStr: '01°04\'N 103°42\'E (Eastbound Lane TSS)'
  },
  {
    id: 'INC-20260926-03',
    timestamp: '2026-09-26 18:50 UTC',
    chokepointId: 'bab-el-mandeb',
    chokepointName: 'Bab el-Mandeb',
    vesselName: 'M/V Al-Mirqab LNG',
    vesselType: 'Q-Max LNG Carrier',
    flagState: 'Qatar',
    incidentType: 'Attack Drone Swarm',
    outcome: 'Intercepted by Coalition Aegis Destroyer',
    reportingAgency: 'EUNAVFOR ASPIDES',
    coordinatesStr: '13°55\'N 042°50\'E (60 NM NW of Hodeidah)'
  },
  {
    id: 'INC-20260924-01',
    timestamp: '2026-09-24 08:15 UTC',
    chokepointId: 'bosporus',
    chokepointName: 'Turkish Straits (Black Sea Approach)',
    vesselName: 'M/V Danubia Trader',
    vesselType: 'Capesize Bulk',
    flagState: 'Malta',
    incidentType: 'GPS Spoofing / Meaconing',
    outcome: 'Diverted via Good Hope',
    reportingAgency: 'UKMTO',
    coordinatesStr: '41°18\'N 029°10\'E (Bosporus Anchorage)'
  }
];
