/**
 * Barrel export file for all modules
 * Provides a clean public API
 */

// Utilities
export { FileUtility } from './utils/FileUtility';

// Graph
export { WordGraph } from './graph/WordGraph';

// Strategies
export { ChainingStrategy } from './strategies/types';
export { circularChaining } from './strategies/circularChaining';
export { chainWords } from './strategies/chainWords';
export {
  registerStrategy,
  getStrategy,
  isValidStrategy,
  getAvailableStrategies
} from './strategies/registry';

// Core
export { buildWordChain } from './core/buildWordChain';

