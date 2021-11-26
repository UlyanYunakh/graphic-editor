import { IAlgorithm, IAlgResult } from "../interfaces/ialgorithm";

export class ParabolaBresenhem implements IAlgorithm {

    readonly name = 'Алгоритм Брезенхема для параболы';

    compute(args: any[], drawFunc: Function, pixelsNumber?: number): IAlgResult {
        let table: any[] = [];
        let len = 0;

        let x1 = args[0].x,
            y1 = args[0].y,
            x2 = args[1].x,
            y2 = args[1].y;


        let x = 0;
		let y = 20;
        let a = 1;

		let delta = 1 - 2 * a;
		
		while (y > 0) {
			let sigma = 2 * delta - 2 * x - 1;
			if (delta > 0 && sigma > 0) {
				y -= 1;
				delta -= 2 * a;
				drawFunc({ x: x, y: y});
                table.push({
                    X: x,
                    Y: y,
                    Delta: delta,
                    Sigma: sigma,
                });
				continue;
			}
			let sigma_ = 2 * delta + 2 * a
			if (delta < 0 && sigma_ <= 0) {
				x += 1;
				delta += 2 * x + 1;
				drawFunc({ x: x, y: y});
                table.push({
                    X: x,
                    Y: y,
                    Delta: delta,
                    Sigma: sigma,
                });
				continue;
			}
			x += 1;
			y -= 1;
			delta += 2 * x + 1 - 2 * a;
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