import { IAlgorithm, IAlgResult } from "../interfaces/ialgorithm";

export class CircleBresenhem implements IAlgorithm {

    readonly name = 'Алгоритм Брезенхема для окружности';

    compute(args: any[], drawFunc: Function, pixelsNumber?: number): IAlgResult {
        let table: any[] = [];

        let xO = args[0].x,
            yO = args[0].y,
            x1 = args[1].x,
            y1 = args[1].y;

        let max = Math.max(Math.abs(x1 - xO), Math.abs(y1 - yO));
        let min = Math.min(Math.abs(x1 - xO), Math.abs(y1 - yO));
        let radius = Math.sqrt(Math.pow(max,2.0) + Math.pow(min,2.0));
        
        let limit = y1 - radius;
		let delta = 2 - 2 * radius;

        let x = 0;
        let y = y1;
        let len = 0;
        let sigma;

        while (y > limit) {
			sigma = 2 * delta - 2 * x - 1;
			if (delta > 0 && sigma > 0) {
				y -= 1;
				delta += 1 - 2 * y;
                drawFunc({ x: x, y: y });
                len += 1;
                table.push({
                    X: x,
                    Y: y,
                    Delta: delta,
                    Sigma: sigma,
                });
				continue;
			}
			sigma = 2 * delta + 2 * y - 1
			if (delta < 0 && sigma <= 0) {
				x += 1;
				delta += 1 + 2 * x;
				drawFunc({ x: x, y: y });
                len += 1;
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
			delta += 2 * x - 2 * y + 2;
			drawFunc({ x: x, y: y });
            len += 1;
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