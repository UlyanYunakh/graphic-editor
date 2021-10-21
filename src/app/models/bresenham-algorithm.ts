import { IAlgorithm } from "../interfaces/ialgorithm";

export class BresenhamAlgorithm implements IAlgorithm {
  name = 'Bresenham algorithm';

  constructor() { }

  compute(args: any[], drawFunc: Function, pixelsNumber?: number): void {
    let x1 = args[0],
      y1 = args[1],
      x2 = args[2],
      y2 = args[3];

    let len = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    let delx = x2 - x1;
    let dely = y2 - y1;
    let e = 2 * dely - delx;

    let iterNumber = len;
    if (pixelsNumber && pixelsNumber <= len && pixelsNumber >= 0) {
      iterNumber = pixelsNumber;
    }

    for (var i = 0; i < iterNumber; i++) {
      drawFunc([x1, y1]);
      if (e >= 0) {
        e -= 2 * delx;
        y1 += 1;
      }
      x1 += 1;
      e += 2 * dely;
    }
  }
}