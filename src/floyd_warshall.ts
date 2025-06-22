import paper from "paper";

/**
 * Implements the Floyd-Warshall algorithm to find the all-pairs shortest paths
 * in a graph defined by paper.js nodes and edges.
 *
 * @param roads An array of paper.Path objects representing the roads of the graph.
 * @returns A 2D array where each inner array contains the sequence of paper.Point
 * objects forming the shortest path between two nodes.
 */
export function floydWarshall(
  nodes: paper.Point[],
  edges: Map<string, paper.Point[]>,
): paper.Point[][] {
  const nodeMap = new Map<string, number>();
  let i = 0;
  nodes.forEach((node) => {
    nodeMap.set(node.toString(), i++);
  });
  const numNodes = nodes.length;

  // Initialize distance and next matrices
  const dist: number[][] = Array(numNodes)
    .fill(Infinity)
    .map(() => Array(numNodes).fill(Infinity));
  const next: (number | null)[][] = Array(numNodes)
    .fill(null)
    .map(() => Array(numNodes).fill(null));

  for (let i = 0; i < numNodes; i++) {
    dist[i][i] = 0;
    next[i][i] = i;
  }

  for (const pointStr of edges.keys()) {
    const neighbors = edges.get(pointStr);
    const startNode = nodes[nodeMap.get(pointStr)];
    neighbors.forEach((neighbor: paper.Point) => {
      const startIndex = nodeMap.get(pointStr);
      const endIndex = nodeMap.get(neighbor.toString());
      const weight = startNode.getDistance(neighbor);
      if (dist[startIndex][endIndex] > weight) {
        dist[startIndex][endIndex] = weight;
        next[startIndex][endIndex] = endIndex;
      }
    });
  }

  // Floyd-Warshall algorithm
  for (let k = 0; k < numNodes; k++) {
    for (let i = 0; i < numNodes; i++) {
      for (let j = 0; j < numNodes; j++) {
        if (
          dist[i][k] !== Infinity &&
          dist[k][j] !== Infinity &&
          dist[i][j] > dist[i][k] + dist[k][j]
        ) {
          dist[i][j] = dist[i][k] + dist[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }

  // Path reconstruction
  const allPaths: paper.Point[][] = [];
  for (let i = 0; i < numNodes; i++) {
    for (let j = 0; j < numNodes; j++) {
      if (next[i][j] === null) {
        console.error("Unable to find path.");
        allPaths.push([]); // No path
        continue;
      }
      const path: paper.Point[] = [nodes[i]];
      let current = i;
      while (current !== j) {
        const nextNodeIndex = next[current][j];
        if (nextNodeIndex === null) {
          // Path does not exist
          path.length = 0; // Clear the partially constructed path
          break;
        }
        current = nextNodeIndex;
        path.push(nodes[current]);
      }
      allPaths.push(path);
    }
  }

  return allPaths;
}
