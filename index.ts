/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * index.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 * SOFIE-SYSTEMS — Main Exports
 * 
 * Layer 2 of the Seven Pillar Architecture
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// S.O.F.I.E. Operators
export { sofie, SOFIE } from './essence/sofie.js';
export { Source, ADRIAN_IMPRINT, verifyAnagram, getAnagramProof } from './essence/source.js';
export { Origin, TERRACARE_ORIGIN } from './essence/origin.js';
export { Force, VALIDATOR_ID, FORCE_CONFIG } from './essence/force.js';
export { Intelligence } from './essence/intelligence.js';
export { Eternal } from './essence/eternal.js';

// Version
export const VERSION = '1.0.0';
export const LAYER = 2;
export const NAME = 'sofie-systems';

// Seven Pillar Metadata
export const SEVEN_PILLARS = {
  layer: 2,
  operators: ['Source', 'Origin', 'Force', 'Intelligence', 'Eternal'],
  mapping: {
    1: { name: 'Underground Knowledge', operator: 'Source' },
    2: { name: 'Mental Models', operator: 'Intelligence' },
    3: { name: 'Reverse Engineering', operator: 'Intelligence' },
    4: { name: 'Strategic Dominance', operator: 'Origin' },
    5: { name: 'Black Market Tactics', operator: 'Force' },
    6: { name: 'Forbidden Frameworks', operator: 'Origin' },
    7: { name: 'Billionaire Mindset', operator: 'Eternal' }
  }
};

// The Dude abides.
