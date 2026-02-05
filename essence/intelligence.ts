/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * essence/intelligence.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 * INTELLIGENCE — S.O.F.I.E. Operator I
 * 
 * Calculation engines — pattern recognition, astrology, numerology.
 * Bridges to sandironratio-node Observatory and Library.
 * 
 * Part of the Seven Pillar Architecture — Layer 2
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export interface PatternMatch {
  pattern: string;
  confidence: number;
  source: 'astrology' | 'numerology' | 'behavior' | 'history';
}

export interface IntelligenceCache {
  patterns: Map<string, PatternMatch[]>;
  lastUpdated: Date;
}

/**
 * Intelligence operator — S.O.F.I.E. Operator I
 * 
 * Seven Pillar Mapping:
 * - Pillar 2 (Mental Models): Cognitive frameworks
 * - Pillar 3 (Reverse Engineering): Pattern analysis
 */
export class IntelligenceOperator {
  private cache: IntelligenceCache;
  private patterns: Map<string, RegExp>;
  readonly pillars = [2, 3]; // Connected to Pillar 2 & 3
  
  constructor() {
    this.cache = {
      patterns: new Map(),
      lastUpdated: new Date()
    };
    this.patterns = new Map([
      ['surrender', /surrender|give up|let go/i],
      ['protection', /protect|defend|guard/i],
      ['truth', /truth|honest|real/i],
      ['pattern', /pattern|repeat|cycle/i],
      ['identity', /who am i|identity|self/i]
    ]);
  }
  
  /**
   * Recognize patterns in input
   */
  recognizePattern(input: string[]): PatternMatch[] {
    const matches: PatternMatch[] = [];
    const text = input.join(' ').toLowerCase();
    
    for (const [name, regex] of this.patterns) {
      if (regex.test(text)) {
        matches.push({
          pattern: name,
          confidence: 0.8,
          source: 'behavior'
        });
      }
    }
    
    // Cache the result
    this.cache.patterns.set(text, matches);
    this.cache.lastUpdated = new Date();
    
    return matches;
  }
  
  /**
   * Calculate numerology (Pythagorean)
   */
  calculatePythagorean(name: string, birthDate: Date): {
    lifePath: number;
    expression: number;
    soulUrge: number;
  } {
    // Simplified calculation
    const lifePath = this.reduceToSingleDigit(
      birthDate.getDate() + birthDate.getMonth() + 1 + birthDate.getFullYear()
    );
    
    const expression = this.reduceToSingleDigit(
      name.toLowerCase().split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
    );
    
    const soulUrge = this.reduceToSingleDigit(lifePath + expression);
    
    return { lifePath, expression, soulUrge };
  }
  
  /**
   * Reduce number to single digit (except master numbers)
   */
  private reduceToSingleDigit(num: number): number {
    if (num === 11 || num === 22 || num === 33) return num; // Master numbers
    
    while (num > 9) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  }
  
  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; lastUpdated: Date } {
    return {
      size: this.cache.patterns.size,
      lastUpdated: this.cache.lastUpdated
    };
  }
  
  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.patterns.clear();
    this.cache.lastUpdated = new Date();
  }
  
  /**
   * The Intelligence speaks
   */
  speak(): string {
    return `I calculate. ${this.cache.patterns.size} patterns recognized. The mind observes.`;
  }
  
  /**
   * Get Seven Pillar alignment for this operator
   */
  getPillarAlignment(): Array<{ pillar: number; name: string; focus: string }> {
    return [
      {
        pillar: 2,
        name: "Mental Models",
        focus: "Cognitive frameworks — bias detection"
      },
      {
        pillar: 3,
        name: "Reverse Engineering",
        focus: "Pattern analysis — deconstruction"
      }
    ];
  }
}

// Export singleton
export const Intelligence = new IntelligenceOperator();
export default Intelligence;
