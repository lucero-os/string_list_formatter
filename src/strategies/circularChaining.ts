import { WordGraph } from '../graph/WordGraph';

/**
 * Circular word chaining strategy using Hierholzer's algorithm
 * Builds a chain where each word starts with the last letter of the previous word
 * AND the last word's last letter connects back to the first word's first letter (circuit)
 * @param words - List of words to chain
 * @returns Ordered chain of words forming a complete circle
 */
export function circularChaining(words: string[]): string[] {
  if (words.length === 0) {
    return [];
  }

  if (words.length === 1) {
    const word = words[0];
    // For a single word to be circular, first and last letters must match
    if (word[0].toLowerCase() === word[word.length - 1].toLowerCase()) {
      return words;
    }
    throw new Error(
      `Cannot create a circular chain with single word "${word}": ` +
      `First letter '${word[0]}' must equal last letter '${word[word.length - 1]}'.`
    );
  }

  // Build the graph
  const graph = new WordGraph();
  for (const word of words) {
    if (word.length > 0) {
      graph.addWord(word);
    }
  }

  // Check if Eulerian circuit exists (not just path)
  const [hasCircuit, startNode] = graph.hasEulerianCircuit();

  if (!hasCircuit || !startNode) {
    throw new Error(
      'Cannot create a circular chain: No Eulerian circuit exists. ' +
      'Words cannot be arranged in a circle where each word starts with the last letter ' +
      'of the previous one AND the last word connects back to the first word.'
    );
  }

  // Find the Eulerian circuit
  const chain = graph.findEulerianPath(startNode);

  // Verify the result forms a proper circle
  if (chain.length > 0) {
    const firstLetter = chain[0][0].toLowerCase();
    const lastLetter = chain[chain.length - 1][chain[chain.length - 1].length - 1].toLowerCase();
    
    if (firstLetter !== lastLetter) {
      throw new Error(
        'Internal error: Found path is not circular. ' +
        `First word "${chain[0]}" starts with '${firstLetter}' ` +
        `but last word "${chain[chain.length - 1]}" ends with '${lastLetter}'.`
      );
    }
  }

  return chain;
}

