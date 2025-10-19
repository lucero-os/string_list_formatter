import { ChainingStrategy } from './types';
import { circularChaining } from './circularChaining';
import { chainWords } from './chainWords';

const strategies: Map<string, ChainingStrategy> = new Map();

/**
 * Registers a chaining strategy
 * @param strategy - Strategy to register
 */
export function registerStrategy(strategy: ChainingStrategy): void {
  strategies.set(strategy.code, strategy);
}

/**
 * Gets a strategy by its code
 * @param code - Strategy code
 * @returns The strategy or undefined if not found
 */
export function getStrategy(code: string): ChainingStrategy | undefined {
  return strategies.get(code);
}

/**
 * Validates if a strategy code is supported
 * @param code - Strategy code to validate
 * @returns true if valid, false otherwise
 */
export function isValidStrategy(code: string): boolean {
  return strategies.has(code);
}

/**
 * Gets all available strategy codes
 * @returns Array of strategy codes
 */
export function getAvailableStrategies(): string[] {
  return Array.from(strategies.keys());
}

// Register built-in strategies
registerStrategy({
  name: 'Circular Chaining (Circuit)',
  code: '--circular',
  execute: circularChaining
});

registerStrategy({
  name: 'Word Chain (Path)',
  code: '--chain',
  execute: chainWords
});

