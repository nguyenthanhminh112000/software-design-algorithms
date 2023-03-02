import { Item } from "./Item";

export abstract class Consumable extends Item {
  public isConsumed: boolean;
  private _isSpoiled: boolean;

  public isSpoiled() {
    return this._isSpoiled;
  }

  constructor(name: string, value: number, weight: number, isSpoiled: boolean) {
    super(name, value, weight);
    this.isConsumed = false;
    this._isSpoiled = isSpoiled;
  }
  public use(): string {
    if (this.isConsumed) {
      return `There's nothing left of the ${this.name} to consume.`;
    } else if (!this.isConsumed && this._isSpoiled) {
      return `You consumed the ${this.name}.\nYou feel sick.`;
    } else {
      return `You consumed the ${this.name}.`;
    }
  }
}
