/**
 * Interface for chaining strategies
 */
export interface ChainingStrategy {
  name: string;
  code: string;
  execute: (words: string[]) => string[];
}

