import { Vertex } from "./Vertex";

export class Edge {
  start: Vertex;
  end: Vertex;
  weight: number;

  constructor(start: Vertex, end: Vertex, weight: number) {
    this.start = start;
    this.end = end;
    this.weight = weight;
  }
}
