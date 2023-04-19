export interface IPath {
  path: string[];
  distance: number;
}

export interface IDijkstra<T> {
  findShortestPath(vertex1: T, vertex2: T): IPath;
  findAllShortestPaths(vertex: T): Record<string, IPath>;
}
