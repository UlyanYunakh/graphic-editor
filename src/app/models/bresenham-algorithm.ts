import { IAlgorithm } from "../interfaces/ialgorithm";

export class BresenhamAlgorithm implements IAlgorithm {
  name = 'Bresenham algorithm';

  constructor() { }

  compute(args: any[], drawFunc: Function, pixelsNumber?: number): void {
    let x1 = args[0],
      y1 = args[1],
      x2 = args[2],
      y2 = args[3];

    let delx = x2 - x1;
    let dely = y2 - y1;
    let len, iterValue, depValue, one, step, iterSign, depSign;

    var reverse = Math.abs(delx)<Math.abs(dely);
    if(reverse){
      [delx,dely] = [dely, delx];
      iterValue = y1;
      depValue = x1;
    }else{
      iterValue = x1;
      depValue = y1;
    }
    len = Math.abs(delx);
    one = 2 * Math.abs(delx);
    step = 2 * Math.abs(dely);
    iterSign = Math.sign(delx);
    depSign = Math.sign(dely);
    let iterNumber = len;

    let e = 2 * depValue - iterValue;
    
    if (pixelsNumber && pixelsNumber <= len && pixelsNumber >= 0) {
      iterNumber = pixelsNumber;
    }

    for (var i = 0; i <= iterNumber; i++) {
      if (reverse) {
        drawFunc([depValue, iterValue]);
      } else {
        drawFunc([iterValue, depValue]);
      }
      if (e >= 0) {
        e -= one;
        depValue += 1*depSign;
      }
      iterValue += 1*iterSign;
      e += step;

    }
  }
}