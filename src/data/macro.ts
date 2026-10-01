import { MacroIndicator } from '../types';

export const MACRO_INDICATORS: MacroIndicator[] = [
  {
    name: 'Brent Crude Oil',
    ticker: 'BRENT',
    value: 78.45,
    unit: 'USD / bbl',
    change24h: 1.40,
    changePct: 1.82,
    benchmark: 'ICE Europe Front-Month',
    category: 'ENERGY'
  },
  {
    name: 'WTI Light Sweet Crude',
    ticker: 'WTI',
    value: 74.20,
    unit: 'USD / bbl',
    change24h: 1.20,
    changePct: 1.65,
    benchmark: 'NYMEX Cushing Delivery',
    category: 'ENERGY'
  },
  {
    name: 'Henry Hub Natural Gas',
    ticker: 'NG-HH',
    value: 2.85,
    unit: 'USD / MMBtu',
    change24h: 0.03,
    changePct: 0.95,
    benchmark: 'CME Louisiana Physical',
    category: 'ENERGY'
  },
  {
    name: 'Dutch TTF Natural Gas',
    ticker: 'TTF',
    value: 38.20,
    unit: 'EUR / MWh',
    change24h: 0.90,
    changePct: 2.40,
    benchmark: 'ICE Endex European Hub',
    category: 'ENERGY'
  },
  {
    name: 'Gold Spot Bullion',
    ticker: 'XAU/USD',
    value: 2658.40,
    unit: 'USD / oz',
    change24h: 11.80,
    changePct: 0.45,
    benchmark: 'LBMA PM Fix Hedge',
    category: 'PRECIOUS_METALS'
  },
  {
    name: 'Shanghai Container Freight',
    ticker: 'SCFI',
    value: 2185.00,
    unit: 'Index Pts',
    change24h: 68.00,
    changePct: 3.20,
    benchmark: 'SSE Spot Outbound Shanghai',
    category: 'FREIGHT'
  },
  {
    name: 'Lloyds JWC War Risk Premium',
    ticker: 'WAR-HULL',
    value: 0.75,
    unit: '% Hull Val',
    change24h: 0.15,
    changePct: 25.00,
    benchmark: 'Red Sea / Gulf of Aden Breach',
    category: 'WAR_RISK'
  },
  {
    name: 'Cape of Good Hope Diversion',
    ticker: 'CAPE-DELAY',
    value: 14.2,
    unit: 'Days Added',
    change24h: 0.0,
    changePct: 0.0,
    benchmark: 'Asia-to-Rotterdam Average',
    category: 'FREIGHT'
  }
];

export const TOTAL_GLOBAL_CHOKEPOINT_FLOW_MBD = 56.0; // 56 million barrels/day across all 6 chokepoints
export const TOTAL_GLOBAL_CRUDE_PRODUCTION_MBD = 102.5; // ~54.6% of all global crude transits these 6 narrows
