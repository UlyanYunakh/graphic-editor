import { IAlgorithm, IAlgResult } from "../interfaces/ialgorithm";

export class HyperbolaBresenhem implements IAlgorithm {

    readonly name = 'Алгоритм Брезенхема для гиперболы';

    compute(args: any[], drawFunc: Function, pixelsNumber?: number): IAlgResult {
        let table: any[] = [];
        let len = 0;

        let x1 = args[0].x,
            y1 = args[0].y,
            x2 = args[1].x,
            y2 = args[1].y;


        let a = 1;
        let b = 2;

		let x = 0;
		let y = b;
	
		let aPow2 = a*a;
		let bPow2 = b*b;
		
		drawFunc({ x: x, y: y });
		
		let delta = aPow2 * (2 * b + 1) - bPow2;
		
		while (y < 50 && x < 50) {
			let sigma = 2 * delta - aPow2 * (2 * y + 1);
			if (delta > 0 && sigma > 0) {				
				x += 1;
				delta -= bPow2 * (2 * x + 1);
				drawFunc({ x: x, y: y });
                table.push({
                    X: x,
                    Y: y,
                    Delta: delta,
                    Sigma: sigma,
                });
				continue;
			}
			let sigma_ = 2 * delta + bPow2 * (2 * x + 1);
			if (delta < 0 && sigma_ <= 0) {			
				y += 1;
				delta += aPow2 * (2 * y + 1);
				drawFunc({ x: x, y: y });
                table.push({
                    X: x,
                    Y: y,
                    Delta: delta,
                    Sigma: sigma_,
                });
				continue;
			}
			x += 1;
			y += 1;	
			delta += aPow2 * (2 * y + 1) - bPow2 * (2 * x + 1);			
			drawFunc({ x: x, y: y });
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