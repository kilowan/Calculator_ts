export interface IValues {
  binario: Array<number>;
  decimal: Array<number>;
  hexadecimal: Array<string>;
}
export class Values implements IValues {
  constructor() {
    this.binario = [0, 1];
    this.decimal = this.binario.concat([2, 3, 4, 5, 6, 7, 8, 9]);
    this.hexadecimal = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];
  }
  binario: Array<number>;
  decimal: Array<number>;
  hexadecimal: Array<string>;
}
export enum Numbertype {
  Binario = 1,
  Decimal = 2,
  Hexadecimal = 3,
}
