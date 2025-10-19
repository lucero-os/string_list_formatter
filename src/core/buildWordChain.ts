import { FileUtility } from '../utils/FileUtility';
import { isValidStrategy, getStrategy, getAvailableStrategies } from '../strategies/registry';

/**
 * Main function to execute word chain building
 * @param filePath - Path to the input file
 * @param strategyCode - Strategy code to use
 * @returns Object containing chained words
 */
export function buildWordChain(
  filePath: string,
  strategyCode: string
): {
  chain: string[];
} {
  // Validate strategy
  if (!isValidStrategy(strategyCode)) {
    const available = getAvailableStrategies().join(', ');
    throw new Error(
      `Invalid strategy code: ${strategyCode}\n` +
      `Available strategies: ${available}`
    );
  }

  // Read file content
  const content = FileUtility.readContent(filePath);

  // Convert to words (assumes lowercase, no empty strings)
  const words = content
    .split(/\s+/)
    .map(word => word.trim())
    .filter(word => word.length > 0);

  if (words.length === 0) {
    throw new Error('No words found in the file');
  }

  // Get and execute strategy
  const strategy = getStrategy(strategyCode)!;
  const chain = strategy.execute(words);

  return { chain };
}

