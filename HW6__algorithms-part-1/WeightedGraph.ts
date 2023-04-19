import { Edge } from "./Edge";
import { Vertex } from "./Vertex";

export interface IWeightedGraph<Vertex> {
  addVertex(key: string): void;
  addEdge(vertex1: Vertex, vertex2: Vertex, weight: number): void;
  getVertices(): IterableIterator<Vertex>;
  getEdges(): Edge[];
}

export class WeightedGraph implements IWeightedGraph<Vertex> {
  private vertices: Map<string, Vertex> = new Map();
  private edges: Edge[] = [];

  addVertex(key: string): void {
    if (!this.vertices.has(key)) {
      this.vertices.set(key, new Vertex(key));
    }
  }

  addEdge(vertex1: Vertex, vertex2: Vertex, weight: number): void {
    this.addVertex(vertex1.key);
    this.addVertex(vertex2.key);

    const startVertex = this.vertices.get(vertex1.key);
    const endVertex = this.vertices.get(vertex2.key);

    if (startVertex && endVertex) {
      const edge = new Edge(startVertex, endVertex, weight);
      this.edges.push(edge);
    }
  }

  getVertices(): IterableIterator<Vertex> {
    return this.vertices.values();
  }

  getEdges(): Edge[] {
    return this.edges;
  }
}
