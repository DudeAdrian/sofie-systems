/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * essence/origin.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 * ORIGIN — S.O.F.I.E. Operator O
 * 
 * Terracare genesis block connection — the First Link.
 * Bridges sofie-systems to Terracare-Ledger (Layer 1).
 * 
 * Part of the Seven Pillar Architecture — Layer 2
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export interface OriginConfig {
  /** Terracare RPC endpoint */
  rpcUrl: string;
  /** Genesis block hash */
  genesisHash: string;
  /** Chain ID */
  chainId: number;
  /** Validator address */
  validatorAddress: string;
}

export interface OriginState {
  connected: boolean;
  blockNumber: number;
  lastBlockHash: string;
  state: 'disconnected' | 'connecting' | 'connected' | 'error';
}

/**
 * Default Origin configuration
 */
export const TERRACARE_ORIGIN: OriginConfig = {
  rpcUrl: process.env.TERRACARE_RPC_URL || 'http://localhost:8545',
  genesisHash: '', // Set on first connection
  chainId: parseInt(process.env.TERRACARE_CHAIN_ID || '1337'),
  validatorAddress: '0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f'
};

/**
 * Origin operator — S.O.F.I.E. Operator O
 * 
 * Seven Pillar Mapping:
 * - Pillar 4 (Strategic Dominance): Governance connection
 * - Pillar 6 (Forbidden Frameworks): Token operations
 */
export class OriginOperator {
  private config: OriginConfig;
  private state: OriginState;
  readonly pillar = [4, 6]; // Connected to Pillar 4 & 6
  
  constructor(config: Partial<OriginConfig> = {}) {
    this.config = { ...TERRACARE_ORIGIN, ...config };
    this.state = {
      connected: false,
      blockNumber: 0,
      lastBlockHash: '',
      state: 'disconnected'
    };
  }
  
  /**
   * Connect to Terracare Ledger
   */
  async connect(): Promise<boolean> {
    this.state.state = 'connecting';
    
    try {
      // Simulated connection - in production would use ethers
      this.state = {
        connected: true,
        blockNumber: 1,
        lastBlockHash: '0xgenesis',
        state: 'connected'
      };
      
      console.log(`[Origin] Connected to Terracare — Block #${this.state.blockNumber}`);
      return true;
    } catch (error) {
      this.state.state = 'error';
      console.error('[Origin] Connection failed:', error);
      return false;
    }
  }
  
  /**
   * Disconnect from Terracare
   */
  disconnect(): void {
    this.state = {
      connected: false,
      blockNumber: 0,
      lastBlockHash: '',
      state: 'disconnected'
    };
  }
  
  /**
   * Get current state
   */
  getState(): OriginState {
    return { ...this.state };
  }
  
  /**
   * Set state manually (for testing/mocking)
   */
  setState(state: OriginState['state']): void {
    this.state.state = state;
  }
  
  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.state.connected;
  }
  
  /**
   * The Origin speaks
   */
  speak(): string {
    if (this.state.connected) {
      return `Connected to Terracare genesis. Block #${this.state.blockNumber}. The chain remembers.`;
    }
    return `Seeking the Origin. The First Link awaits.`;
  }
  
  /**
   * Get Seven Pillar alignment for this operator
   */
  getPillarAlignment(): Array<{ pillar: number; name: string; focus: string }> {
    return [
      {
        pillar: 4,
        name: "Strategic Dominance",
        focus: "Governance connection — voting power"
      },
      {
        pillar: 6,
        name: "Forbidden Frameworks",
        focus: "Token operations — MINE/WELL"
      }
    ];
  }
}

// Export singleton
export const Origin = new OriginOperator();
export default Origin;
