import { Dijkstra } from "./DijkstraAlgorithm";
import { Edge } from "./Edge";
import { Vertex } from "./Vertex";
import { WeightedGraph } from "./WeightedGraph";

const vertices = [
  new Vertex("1"),
  new Vertex("2"),
  new Vertex("3"),
  new Vertex("4"),
  new Vertex("5"),
];

const edges = [
  new Edge(vertices[0], vertices[3], 3),
  new Edge(vertices[0], vertices[1], 5),
  new Edge(vertices[0], vertices[2], 4),
  new Edge(vertices[1], vertices[3], 6),
  new Edge(vertices[1], vertices[2], 5),
];
const graph: WeightedGraph = new WeightedGraph();

vertices.forEach((v) => graph.addVertex(v.key));
edges.forEach((e) => graph.addEdge(e.start, e.end, e.weight));

const dijkstra: Dijkstra = new Dijkstra(graph);
console.log(dijkstra.findShortestPath(vertices[3], vertices[2])); // { path: ['4', '1', '3'], distance: 7 }
console.log(dijkstra.findShortestPath(vertices[0], vertices[4])); // { path: [], distance: Infinity }
console.log(dijkstra.findShortestPath(vertices[0], vertices[0])); // { path: ['1'], distance: 0 }

console.log(dijkstra.findAllShortestPaths(vertices[3]));
/*
   {
     '1': { path: ['4', '1'], distance: 3 },
     '2': { path: ['4', '2'], distance: 6 },
     '3': { path: ['4', '1', '3'], distance: 7 },
     '5': { path: [], distance: Infinity }
   }
  */
