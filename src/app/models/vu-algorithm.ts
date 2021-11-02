import { IAlgorithm, IAlgResult } from "../interfaces/ialgorithm";
import { BresenhamAlgorithm } from "./bresenham-algorithm";
import { CDAAlgorithm } from "./cda-algorithm";

export class VuAlgorithm implements IAlgorithm {

    readonly name = 'Алгоритм Ву';

    compute(args: any[], drawFunc: Function, pixelsNumber?: number): IAlgResult {
        let table: any[] = [];

        let x1 = args[0].x,
            y1 = args[0].y,
            x2 = args[1].x,
            y2 = args[1].y;

        let delx = x2 - x1;
        let dely = y2 - y1;
        let len = 0;

        if (Math.abs(delx) == Math.abs(dely) || (delx == 0 || dely == 0)) {
            let cda = new CDAAlgorithm();
            table = cda.compute(args, drawFunc, pixelsNumber).table;
        } else {
            let iterValue, depValue, step, iterSign, depSign;

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

            let e = depValue + Math.abs(step);
            let alpha;
            let a1, a2;

            if (pixelsNumber != undefined && pixelsNumber <= len && pixelsNumber >= 0) {
                iterNumber = pixelsNumber;
            }
            for (var i = 0; i <= iterNumber; i++) {
                alpha = e - Math.floor(e);
                if(depSign<0){
                    depValue = Math.floor(e);
                }else{
                    depValue = Math.ceil(e);
                }
                a1 = 1-alpha;
                a2 = alpha;
                if(depSign<0){
                 [a1,a2]=[a2,a1];   
                }
                if (reverse) {
                    drawFunc({ x: depValue, y: iterValue }, a1);
                    drawFunc({ x: depValue + 1 * depSign , y: iterValue}, a2);
                    table.push({
                        X1: depValue,
                        Y1: iterValue,
                        A1: a1,
                        X2: depValue,
                        Y2: iterValue + 1 * depSign,
                        A2: a2
                    });
                } else {
                    
                    drawFunc({ x: iterValue, y: depValue }, a1);
                    drawFunc({ x: iterValue , y: depValue + 1 * depSign}, a2);
                    table.push({
                        X1: iterValue,
                        Y1: depValue,
                        A1: a1,
                        X2: iterValue + 1 * depSign,
                        Y2: depValue,
                        A2: a2
                    });
                }
                e += step;
                iterValue += 1 * iterSign;
            }

        }
        return {
            table: table,
            pixelNumber: len
        };
    }
    getTableColumns(): string[] {
        return [
            'X1',
            'Y1',
            'A1',
            'X2',
            'Y2',
            'A2'
        ];
    }
}