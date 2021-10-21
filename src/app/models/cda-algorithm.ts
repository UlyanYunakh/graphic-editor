import { IAlgorithm } from "../interfaces/ialgorithm";

export class CDAAlgorithm implements IAlgorithm {
  name = 'CDA algorithm';

  constructor() { }

  compute(args: any[], drawFunc: Function, pixelsNumber?: number): void {
    let x1 = args[0],
      y1 = args[1],
      x2 = args[2],
      y2 = args[3];

    let len = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    let dx = (x2 - x1) / len;
    let dy = (y2 - y1) / len;

    let iterNumber = len;
    if (pixelsNumber && pixelsNumber <= len && pixelsNumber >= 0) {
      iterNumber = pixelsNumber;
    }

    for (var i = 0; i <= iterNumber; i++) {
      drawFunc([x1, y1]);
      x1 = x1 + dx;
      y1 = y1 + dy;
    }
  }
}