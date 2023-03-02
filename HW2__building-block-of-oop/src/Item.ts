import { Comparable } from "./Comparable";

export abstract class Item implements Comparable<Item> {
  public static idCounter = 0;
  public readonly name: string;
  private readonly id: number;
  protected weight: number;
  protected value: number;

  public static resetIdCounter = () => {
    Item.idCounter = 0;
  };

  constructor(name: string, value: number, weight: number) {
    Item.idCounter = Item.idCounter + 1;
    this.id = Item.idCounter;
    this.weight = weight;
    this.value = value;
    this.name = name;
  }

  abstract use(): any;

  public compareTo(other: Item) {
    if (this.value > other.value) {
      return 1;
    } else if (this.value < other.value) {
      return -1;
    } else {
      return this.name.localeCompare(other.name);
    }
  }
  public toString() {
    return `${this.name} − Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}`;
  }
  public getId() {
    return this.id;
  }
  public getWeight() {
    return this.weight;
  }
  public getValue() {
    return this.value;
  }
}
