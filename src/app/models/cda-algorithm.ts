import { IAlgorithm } from "../interfaces/ialgorithm";

export class CDAAlgorithm implements IAlgorithm {
  name = 'CDA algorithm';

  constructor() { }

  compute(args: any[], drawFunc: Function, pixelsNumber?: number): void {
    let x1, y1, x2, y2, currPixelNumber = 1;

    if (args[0] < args[2]) {
      x1 = args[0];
      y1 = args[1];
      x2 = args[2];
      y2 = args[3];
    }
    else {
      x1 = args[2];
      y1 = args[3];
      x2 = args[0];
      y2 = args[1];
    }

    let len = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    let dx = (x2 - x1) / len;
    let dy = (y2 - y1) / len;

    x1 += 0.5 * Math.sign(dx);
    y1 += 0.5 * Math.sign(dy);
    drawFunc([x1, y1]);

    if (pixelsNumber && currPixelNumber == pixelsNumber) return;
    else currPixelNumber++;

    while (x1 < x2) {
      x1 = x1 + dx;
      y1 = y1 + dy;
      drawFunc([x1, y1]);

      if (pixelsNumber && currPixelNumber == pixelsNumber) return;
      else currPixelNumber++;
    }
  }
}

export class BresenhamAlgorithm implements IAlgorithm {
  name = 'Bresenham algorithm';

  constructor() { }

  compute(args: any[], drawFunc: Function, pixelsNumber?: number): void {
    let x1, y1, x2, y2, currPixelNumber = 1;

    if (args[0] < args[2]) {
      x1 = args[0];
      y1 = args[1];
      x2 = args[2];
      y2 = args[3];
    }
    else {
      x1 = args[2];
      y1 = args[3];
      x2 = args[0];
      y2 = args[1];
    }

    let delx = x2 - x1;
    let dely = y2 - y1;
    let e = 2 * dely - delx;

    drawFunc([x1, y1]);

    if (pixelsNumber && currPixelNumber == pixelsNumber) return;
    else currPixelNumber++;

    while (x1 < x2) {
      if (e >= 0) {
        e -= 2*delx;
        y1 += 1;
      }
      x1 += 1;
      e += 2 * dely;
      drawFunc([x1, y1]);
      if (pixelsNumber && currPixelNumber == pixelsNumber) return;
      else currPixelNumber++;
    }
  }
}