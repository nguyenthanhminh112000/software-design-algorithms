import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
  public readonly numberOfSlices: number;
  private numberOfEatenSlices: number = 0;
  constructor(value: number, weight: number, numberOfSlice: number, isSpoiled: boolean) {
    super("pizza", value, weight, isSpoiled ? isSpoiled : false);
    this.numberOfSlices = numberOfSlice;
  }
  public use(): string {
    if (this.numberOfSlices !== this.numberOfEatenSlices) {
      this.numberOfEatenSlices += 1;
      return "You consumed a slice of the pizza.";
    } else {
      return "There's nothing left of the pizza to consume.";
    }
  }

  public getNumberOfEatenSlices() {
    return this.numberOfEatenSlices;
  }
}
