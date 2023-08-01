/// <reference types="node" />

export {};

declare global {
  interface Array<T> {
    toSpliced(start: number, deleteCount: number, ...items: Array<T>): Array<T>;
    with(index: number, value: T): Array<T>;
  }
}
