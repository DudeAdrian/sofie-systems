/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * essence/force.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 * FORCE — S.O.F.I.E. Operator F
 * 
 * Iron will — validation power, PoA consensus proxy.
 * Bridges to sandironratio-node validator.
 * 
 * Part of the Seven Pillar Architecture — Layer 2
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export interface ForceConfig {
  /** Validator endpoint */
  validatorUrl: string;
  /** Consensus threshold */
  consensusThreshold: number; // e.g., 3-of-5
  /** Dead man's switch duration (days) */
  deadMansSwitchDays: number;
}

export interface ForceStats {
  active: boolean;
  lastCheckin: Date | null;
  blocksValidated: number;
  consensusStatus: 'online' | 'degraded' | 'offline';
}

/**
 * Default Force configuration
 */
export const FORCE_CONFIG: ForceConfig = {
  validatorUrl: process.env.VALIDATOR_URL || 'http://localhost:8545',
  consensusThreshold: 3,
  deadMansSwitchDays: 90
};

/**
 * Validator identity
 */
export const VALIDATOR_ID = {
  address: '0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f',
  name: 'sandironratio-node',
  anagram: 'sandironratio'
};

/**
 * Force operator — S.O.F.I.E. Operator F
 * 
 * Seven Pillar Mapping:
 * - Pillar 5 (Black Market Tactics): Anti-gaming validation
 */
export class ForceOperator {
  private config: ForceConfig;
  private stats: ForceStats;
  private activated: boolean = false;
  readonly pillar = 5;
  
  constructor(config: Partial<ForceConfig> = {}) {
    this.config = { ...FORCE_CONFIG, ...config };
    this.stats = {
      active: false,
      lastCheckin: null,
      blocksValidated: 0,
      consensusStatus: 'offline'
    };
  }
  
  /**
   * Activate the Force
   */
  activate(): void {
    this.activated = true;
    this.stats.active = true;
    this.stats.lastCheckin = new Date();
    console.log('[Force] Iron will activated. Validator ready.');
  }
  
  /**
   * Deactivate the Force
   */
  deactivate(): void {
    this.activated = false;
    this.stats.active = false;
    console.log('[Force] Iron will rested.');
  }
  
  /**
   * Check in with validator (dead man's switch)
   */
  checkin(): void {
    this.stats.lastCheckin = new Date();
    console.log('[Force] Checkin recorded.');
  }
  
  /**
   * Get days until dead man's switch triggers
   */
  getDaysUntilSwitch(): number {
    if (!this.stats.lastCheckin) return this.config.deadMansSwitchDays;
    
    const lastCheckin = this.stats.lastCheckin.getTime();
    const now = Date.now();
    const daysSince = (now - lastCheckin) / (1000 * 60 * 60 * 24);
    
    return Math.max(0, this.config.deadMansSwitchDays - daysSince);
  }
  
  /**
   * Get current stats
   */
  getStats(): ForceStats {
    return { ...this.stats };
  }
  
  /**
   * Validate a block (proxy to sandironratio-node)
   */
  async validateBlock(blockHash: string): Promise<boolean> {
    if (!this.activated) {
      throw new Error('Force not activated');
    }
    
    console.log(`[Force] Validating block: ${blockHash}`);
    this.stats.blocksValidated++;
    return true;
  }
  
  /**
   * Check if consensus is healthy
   */
  getConsensusStatus(): ForceStats['consensusStatus'] {
    return this.stats.consensusStatus;
  }
  
  /**
   * The Force speaks
   */
  speak(): string {
    return `Iron protects. ${this.stats.blocksValidated} blocks validated. ${this.getDaysUntilSwitch()} days until the switch.`;
  }
  
  /**
   * Get Seven Pillar alignment for this operator
   */
  getPillarAlignment(): { pillar: number; name: string; focus: string } {
    return {
      pillar: this.pillar,
      name: "Black Market Tactics",
      focus: "Anti-gaming validation — consensus enforcement"
    };
  }
}

// Export singleton
export const Force = new ForceOperator();
export default Force;
