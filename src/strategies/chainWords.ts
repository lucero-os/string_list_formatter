import { WordGraph } from '../graph/WordGraph';

/**
 * Chain word strategy using Hierholzer's algorithm (non-circular)
 * Builds a chain where each word starts with the last letter of the previous word
 * Does NOT require the last word to connect back to the first (allows Eulerian path)
 * @param words - List of words to chain
 * @returns Ordered chain of words
 */
export function chainWords(words: string[]): string[] {
  if (words.length === 0) {
    return [];
  }

  if (words.length === 1) {
    return words;
  }

  // Build the graph
  const graph = new WordGraph();
  for (const word of words) {
    if (word.length > 0) {
      graph.addWord(word);
    }
  }

  // Check if Eulerian path exists (can be path or circuit)
  const [hasPath, startNode, isCircuit] = graph.hasEulerianPath();

  if (!hasPath || !startNode) {
    throw new Error(
      'Cannot create a word chain: No Eulerian path exists. ' +
      'Words cannot be arranged so each word starts with the last letter of the previous one.'
    );
  }

  // Find the Eulerian path
  const chain = graph.findEulerianPath(startNode);

  return chain;
}

