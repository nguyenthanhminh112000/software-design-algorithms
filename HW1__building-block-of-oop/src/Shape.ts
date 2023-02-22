import { Point } from "./Point";

export abstract class Shape {
  protected color: string;
  protected filled: boolean;
  protected points: Point[];

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);
  constructor(points: Point[], color = "green", filled = true) {
    if (points.length < 3) {
      throw new Error("The Shape should not have less than three points");
    }

    this.points = points;
    this.color = color;
    this.filled = filled;
  }

  abstract getType(): string;

  public toString(): string {
    const filledText = this.filled ? "filled" : "not filled";
    const pointsText = this.points.map((point) => point.toString()).join(", ");

    return `A Shape with color of ${this.color} and ${filledText}. Points: ${pointsText}.`;
  }

  public getPerimeter(): number {
    return this.points.reduce((acc, currentPoint, index, points) => {
      return acc + currentPoint.distance(points[index + 1]);
    }, 0);
  }
}
