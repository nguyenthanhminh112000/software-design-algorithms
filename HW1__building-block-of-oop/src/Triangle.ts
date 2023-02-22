import { Shape } from "./Shape";
import { Point } from "./Point";

enum TriangleType {
  EQUILATERAL = "equilateral triangle",
  ISOSCELES = "isosceles triangle",
  SCALENE = "scalene triangle",
}

export class Triangle extends Shape {
  constructor(point1: Point, point2: Point, point3: Point);
  constructor(point1: Point, point2: Point, point3: Point, color: string = "green", filled: boolean = true) {
    super([point1, point2, point3], color, filled);
  }

  public getType(): string {
    const distances = this.points.map((point, index) => {
      return point.distance(this.points[index + 1]).toFixed(1);
    });

    const uniqueDistances = new Set(distances);

    switch (uniqueDistances.size) {
      case 1:
        return TriangleType.EQUILATERAL;
      case 2:
        return TriangleType.ISOSCELES;
      default:
        return TriangleType.SCALENE;
    }
  }

  public toString(): string {
    const pointsText = this.points.map((point, index) => `v${index + 1}=${point.toString()}`).join(",");

    return `Triangle[${pointsText}]`;
  }
}
