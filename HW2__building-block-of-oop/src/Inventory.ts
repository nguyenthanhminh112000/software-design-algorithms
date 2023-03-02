import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class Inventory {
  public items: Item[] = [];
  constructor() {}
  public addItem(item: Item) {
    this.items.push(item);
  }
  public sort(): void;
  public sort(comparator: ItemComparator): void;
  public sort(comparator?: ItemComparator) {
    if (comparator) {
      this.items.sort(comparator.compare);
    } else {
      this.items.sort((a, b) => a.getValue() - b.getValue());
    }
  }
  public toString() {
    return this.items.join(", ");
  }
}
