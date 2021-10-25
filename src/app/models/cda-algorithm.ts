import { IAlgorithm } from "../interfaces/ialgorithm";

export class CDAAlgorithm implements IAlgorithm {
  readonly name = 'ЦДА';

  compute(args: any[], drawFunc: Function, pixelsNumber?: number): any[] {
    let table: any[] = [];

    let x1 = args[0].x,
      y1 = args[0].y,
      x2 = args[1].x,
      y2 = args[1].y;

    let len = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    let dx = (x2 - x1) / len;
    let dy = (y2 - y1) / len;

    let iterNumber = len;
    if (pixelsNumber && pixelsNumber <= len && pixelsNumber >= 0) {
      iterNumber = pixelsNumber;
    }

    for (var i = 0; i <= iterNumber; i++) {
      drawFunc({ x: x1, y: y1 });
      table.push({  // after draw push into-object a table info
        X: Math.round(x1),
        Y: Math.round(y1),
        notRoundedX: x1,
        notRoundedY: y1
      });
      x1 = x1 + dx;
      y1 = y1 + dy;
    }

    return table;
  }

  getTableColumns(): string[] {
    return [  // fields of into-object that pushes in table (IMPORTANT: THESE FIELDS NAME MUST MATCH WITH NAMES THAT PUSHES INTO TABLE)
      'X',
      'Y',
      'notRoundedX',
      'notRoundedY'
    ];
  }
}