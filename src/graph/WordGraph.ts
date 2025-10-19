/**
 * Builds a directed multigraph for word chaining
 * Nodes: first and last letters of words
 * Edges: words themselves
 */
export class WordGraph {
  private adjacencyList: Map<string, string[]> = new Map();
  private inDegree: Map<string, number> = new Map();
  private outDegree: Map<string, number> = new Map();

  /**
   * Adds a word as an edge in the graph
   * @param word - Word to add (edge from first letter to last letter)
   */
  addWord(word: string): void {
    if (word.length === 0) return;

    const firstLetter = word[0].toLowerCase();
    const lastLetter = word[word.length - 1].toLowerCase();

    // Add edge to adjacency list
    if (!this.adjacencyList.has(firstLetter)) {
      this.adjacencyList.set(firstLetter, []);
    }
    this.adjacencyList.get(firstLetter)!.push(word);

    // Update degrees
    this.outDegree.set(firstLetter, (this.outDegree.get(firstLetter) || 0) + 1);
    this.inDegree.set(lastLetter, (this.inDegree.get(lastLetter) || 0) + 1);

    // Ensure nodes exist in degree maps
    if (!this.inDegree.has(firstLetter)) {
      this.inDegree.set(firstLetter, 0);
    }
    if (!this.outDegree.has(lastLetter)) {
      this.outDegree.set(lastLetter, 0);
    }
  }

  /**
   * Gets all unique nodes (letters) in the graph
   */
  getNodes(): string[] {
    const nodes = new Set<string>();
    this.inDegree.forEach((_, node) => nodes.add(node));
    this.outDegree.forEach((_, node) => nodes.add(node));
    return Array.from(nodes);
  }

  /**
   * Checks if an Eulerian path or circuit exists
   * @returns [exists, startNode, isCircuit] - Whether path exists, optimal start node, and if it's a circuit
   */
  hasEulerianPath(): [boolean, string | null, boolean] {
    const nodes = this.getNodes();
    
    let startNodes: string[] = [];
    let endNodes: string[] = [];

    for (const node of nodes) {
      const inDeg = this.inDegree.get(node) || 0;
      const outDeg = this.outDegree.get(node) || 0;
      const diff = outDeg - inDeg;

      if (diff === 1) {
        startNodes.push(node);
      } else if (diff === -1) {
        endNodes.push(node);
      } else if (diff !== 0) {
        // Invalid configuration
        return [false, null, false];
      }
    }

    // Eulerian circuit: all nodes have equal in/out degree
    if (startNodes.length === 0 && endNodes.length === 0) {
      // Start from any node with edges
      const startNode = nodes.find(n => (this.outDegree.get(n) || 0) > 0);
      return [true, startNode || null, true];
    }

    // Eulerian path: exactly one start node (out > in) and one end node (in > out)
    if (startNodes.length === 1 && endNodes.length === 1) {
      return [true, startNodes[0], false];
    }

    return [false, null, false];
  }

  /**
   * Checks if an Eulerian circuit exists (proper circular chain)
   * @returns [exists, startNode] - Whether circuit exists and a start node
   */
  hasEulerianCircuit(): [boolean, string | null] {
    const [exists, startNode, isCircuit] = this.hasEulerianPath();
    if (exists && isCircuit) {
      return [true, startNode];
    }
    return [false, null];
  }

  /**
   * Finds an Eulerian path using Hierholzer's algorithm
   * @param startNode - Node to start the path from
   * @returns Ordered list of words forming the chain
   */
  findEulerianPath(startNode: string): string[] {
    // Create a working copy of the adjacency list
    const workingGraph = new Map<string, string[]>();
    this.adjacencyList.forEach((edges, node) => {
      workingGraph.set(node, [...edges]);
    });

    const stack: string[] = [startNode];
    const path: string[] = [];
    const edgePath: string[] = [];

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const edges = workingGraph.get(current);

      if (edges && edges.length > 0) {
        // Take an edge
        const word = edges.pop()!;
        const nextNode = word[word.length - 1].toLowerCase();
        
        edgePath.push(word);
        stack.push(nextNode);
      } else {
        // No more edges from current node, backtrack
        stack.pop();
        if (edgePath.length > 0) {
          path.push(edgePath.pop()!);
        }
      }
    }

    // Path is built in reverse order
    return path.reverse();
  }

  /**
   * Gets adjacency list for debugging
   */
  getAdjacencyList(): Map<string, string[]> {
    return this.adjacencyList;
  }
}

