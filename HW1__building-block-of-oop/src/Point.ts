export class Point {
  private x: number;
  private y: number;

  private getDistance(x: number, y: number): number {
    return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
  }

  constructor();
  constructor(x: number, y: number);
  constructor(x?: number, y?: number) {
    this.x = x ?? 0;
    this.y = y ?? 0;
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  public distance(): number;
  public distance(point: Point): number;
  public distance(x: number, y: number): number;
  public distance(pointOrX?: Point | number, y?: number): number {
    if (pointOrX instanceof Point) {
      return this.getDistance(pointOrX.x, pointOrX.y);
    }

    if (!!pointOrX && !!y) {
      return this.getDistance(pointOrX, y);
    }

    return this.getDistance(0, 0);
  }
}
