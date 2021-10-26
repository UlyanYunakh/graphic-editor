import { IAlgorithm } from "../interfaces/ialgorithm";
import { BresenhamAlgorithm } from "./bresenham-algorithm";
import { CDAAlgorithm } from "./cda-algorithm";

export class VuAlgorithm implements IAlgorithm {

    readonly name = 'Vu algorithm';

    compute(args: any[], drawFunc: Function, pixelsNumber?: number): any[] {
        let table: any[] = [];

        let x1 = args[0].x,
            y1 = args[0].y,
            x2 = args[1].x,
            y2 = args[1].y;

        let delx = x2 - x1;
        let dely = y2 - y1;

        if (Math.abs(delx) == Math.abs(dely) || (delx == 0 || dely == 0)) {
            let cda = new CDAAlgorithm();
            table = cda.compute(args, drawFunc, pixelsNumber);
        } else {
            let len, iterValue, depValue, step, iterSign, depSign;

            var reverse = Math.abs(delx) < Math.abs(dely);
            if (reverse) {
                [delx, dely] = [dely, delx];
                iterValue = y1;
                depValue = x1;
            } else {
                iterValue = x1;
                depValue = y1;
            }
            len = Math.abs(delx);
            step = dely / Math.abs(delx);
            iterSign = Math.sign(delx);
            depSign = Math.sign(dely);
            let iterNumber = len;

            let e = depValue + step;
            
            if (pixelsNumber && pixelsNumber <= len && pixelsNumber >= 0) {
                iterNumber = pixelsNumber;
            }
            for (var i = 0; i <= iterNumber; i++) {
                drawFunc({ x: depValue, y: iterValue });

                // if (reverse) {
                //     drawFunc({ x: depValue, y: iterValue });
                // } else {
                //     drawFunc({ x: iterValue, y: depValue });
                // }
                // if (e >= 0) {
                //     e -= one;
                //     depValue += 1 * depSign;
                // }
                // iterValue += 1 * iterSign;
                // e += step;
            }

        }
        return table;
    }
    getTableColumns(): string[] {
        return [
            'X',
            'Y',
            'depValue',
            'iterValue',
            'error'
        ];
    }
}