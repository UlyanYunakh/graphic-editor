import { IAlgorithm, IAlgResult } from "../interfaces/ialgorithm";

export class EllipseBresenhem implements IAlgorithm {

    readonly name = 'Алгоритм Брезенхема для эллипса';

    compute(args: any[], drawFunc: Function, pixelsNumber?: number): IAlgResult {
        let table: any[] = [];
        let len = 0;

        let x1 = args[0].x,
            y1 = args[0].y,
            x2 = args[1].x,
            y2 = args[1].y;

            let a = Math.abs(x1 - x2);
            let b = Math.abs(y1 - y2);
            
            let aPow2 = Math.pow(a, 2.0);
            let bPow2 = Math.pow(b, 2.0);
            let x = 0;
            let y = b;
    
            let delta = aPow2 + bPow2 - 2 * aPow2 * b;

            while (y > 0) {
                let sigma = 2 * delta - 2 * x * bPow2 - 1;
                if (delta > 0 && sigma > 0) {
                    y -= 1;
                    delta += aPow2 - 2 * y * aPow2;
                    drawFunc({ x: x, y: y});
                    continue;
                }
                let sigma_ = 2 * delta + 2 * y * aPow2 - 1
                if (delta < 0 && sigma_ <= 0) {
                    x += 1;
                    delta += bPow2 + 2 * x * bPow2;
                    drawFunc({ x: x, y: y});
                    continue;
                }
                x += 1;
                y -= 1;
                delta += bPow2 * (2 * x + 1) + aPow2 * (1 - 2 * y);
                drawFunc({ x: x, y: y});
            table.push({
                X: x,
                Y: y,
                Delta: delta,
                Sigma: sigma,
            });
		    } 
        return {
            table: table,
            pixelNumber: len
        };
    }
    getTableColumns(): string[] {
        return [
            'X',
            'Y',
            'Delta',
            'Sigma'
        ];
    }
}