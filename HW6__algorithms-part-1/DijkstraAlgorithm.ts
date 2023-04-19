import { Vertex } from "./Vertex";
import { IWeightedGraph } from "./WeightedGraph";
import { IPath, IDijkstra } from "./types";

export class Dijkstra implements IDijkstra<Vertex> {
  private graph: IWeightedGraph<Vertex>;

  constructor(graph: IWeightedGraph<Vertex>) {
    this.graph = graph;
  }

  findShortestPath(vertex1: Vertex, vertex2: Vertex): IPath {
    const distances = new Map<Vertex, number>();
    const previousVertices = new Map<string, Vertex>();
    const visitedVertices = new Set<Vertex>();

    distances.set(vertex1, 0);

    while (true) {
      const currentVertex = this.getVertexWithShortestDistance(
        distances,
        visitedVertices
      );

      if (!currentVertex) {
        break;
      }

      visitedVertices.add(currentVertex);

      const allNeighbors = this.getNeighbors(currentVertex);
      const unvisitedNeighbors = allNeighbors.filter((neighbor) => {
        return ![...visitedVertices].some(
          (visitedVertex) => visitedVertex.key === neighbor.key
        );
      });

      for (const neighbor of unvisitedNeighbors) {
        const tentativeDistance =
          distances.get(currentVertex)! +
          this.getEdgeWeight(currentVertex, neighbor);

        if (
          !distances.has(neighbor) ||
          tentativeDistance < distances.get(neighbor)!
        ) {
          distances.set(neighbor, tentativeDistance);
          previousVertices.set(neighbor.key, currentVertex);
        }
      }

      if (currentVertex.key === vertex2.key) {
        break;
      }
    }

    const shortestPath: Vertex[] = [];
    const distanceKey = [...distances.keys()].find(
      (d) => d.key === vertex2.key
    )!;
    let distance = distances.get(distanceKey);

    if (distance !== undefined) {
      let currentVertex: Vertex | undefined = vertex2;

      while (currentVertex !== undefined) {
        shortestPath.unshift(currentVertex);
        currentVertex = previousVertices.get(currentVertex.key);
      }
    } else {
      distance = Infinity;
    }

    return {
      path: shortestPath.map((vertex) => vertex.toString()),
      distance: distance,
    };
  }

  findAllShortestPaths(vertex: Vertex): Record<string, IPath> {
    const result: Record<string, IPath> = {};

    for (const currentVertex of this.graph.getVertices()) {
      if (currentVertex !== vertex) {
        const shortestPath = this.findShortestPath(vertex, currentVertex);
        result[currentVertex.key] = shortestPath;
      }
    }

    return result;
  }

  getVertexWithShortestDistance(
    distances: Map<Vertex, number>,
    visitedVertices: Set<Vertex>
  ): Vertex | undefined {
    let shortestDistance = Infinity;
    let vertexWithShortestDistance: Vertex | undefined;

    for (const [vertex, distance] of distances) {
      if (distance < shortestDistance && !visitedVertices.has(vertex)) {
        shortestDistance = distance;
        vertexWithShortestDistance = vertex;
      }
    }

    return vertexWithShortestDistance;
  }

  getNeighbors(vertex: Vertex): Vertex[] {
    const neighbors: Vertex[] = [];
    for (const edge of this.graph.getEdges()) {
      if (edge.start.key === vertex.key) {
        neighbors.push(edge.end);
      }
      if (edge.end.key === vertex.key) {
        neighbors.push(edge.start);
      }
    }

    return neighbors;
  }

  getEdgeWeight(vertex1: Vertex, vertex2: Vertex): number {
    for (const edge of this.graph.getEdges()) {
      if (
        (edge.start.key === vertex1.key && edge.end.key === vertex2.key) ||
        (edge.start.key === vertex2.key && edge.end.key === vertex1.key)
      ) {
        return edge.weight;
      }
    }

    return Infinity;
  }
}
