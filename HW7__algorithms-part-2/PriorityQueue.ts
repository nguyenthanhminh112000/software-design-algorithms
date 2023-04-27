import { IJob } from "./types";

export class PriorityQueue {
  private items: IJob[];
  private heapSize: number;

  constructor() {
    this.items = [];
    this.heapSize = 0;
  }

  public push(item: IJob): void {
    this.items[this.heapSize] = item;
    this.heapSize++;
    this.heapifyUp(this.heapSize - 1);
  }

  public pop(): IJob | undefined {
    if (this.heapSize === 0) {
      return undefined;
    }

    const item = this.items[0];
    this.heapSize--;
    this.items[0] = this.items[this.heapSize];
    this.items[this.heapSize] = undefined!;
    this.heapifyDown(0);
    return item;
  }

  public isEmpty(): boolean {
    return this.heapSize === 0;
  }

  private heapifyUp(index: number): void {
    if (index === 0) {
      return;
    }

    const parentIndex = Math.floor((index - 1) / 2);

    if (this.items[parentIndex].priority < this.items[index].priority) {
      [this.items[parentIndex], this.items[index]] = [
        this.items[index],
        this.items[parentIndex],
      ];
      this.heapifyUp(parentIndex);
    }
  }

  private heapifyDown(index: number): void {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let largestChildIndex = index;

    if (
      leftChildIndex < this.heapSize &&
      this.items[leftChildIndex].priority >
        this.items[largestChildIndex].priority
    ) {
      largestChildIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heapSize &&
      this.items[rightChildIndex].priority >
        this.items[largestChildIndex].priority
    ) {
      largestChildIndex = rightChildIndex;
    }

    if (largestChildIndex !== index) {
      [this.items[index], this.items[largestChildIndex]] = [
        this.items[largestChildIndex],
        this.items[index],
      ];
      this.heapifyDown(largestChildIndex);
    }
  }
}
