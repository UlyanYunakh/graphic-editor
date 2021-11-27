import { IAlgorithm, IAlgResult } from "../interfaces/ialgorithm";


declare var math: any;

export class BSpline implements IAlgorithm {

    readonly name = 'Б-сплайн';

    compute(args: any[], drawFunc: Function, pixelsNumber?: number): IAlgResult {
        let table: any[] = [];
        let len = 0;

        let points: any[] = [];
        points.push(args[0]);
        points.push({x: 15, y: 47});
        points.push({x: 34, y: 56});
        points.push(args[1]);

        var n = points.length;

		var k = 0;
		var step = 0.01;

		var a = math.matrix([[-1, 3, -3, 1], [3, -6, 3, 0], [-3, 0, 3, 0], [1, 4, 1, 0]]);

		var i = 1;
		while (i <= n-3) {
			var b = math.matrix([[points[i-1].x, points[i-1].y], [points[i].x, points[i].y], 
								 [points[i+1].x, points[i+1].y], [points[i+2].x, points[i+2].y]]);
			var c = math.multiply(a, b);
			var t = 0.0;
			while (t <= 1) {
				var tMatrix = math.matrix([[t * t * t, t * t, t, 1]]);
				var r = math.multiply(tMatrix, c);
				var x = math.subset(r, math.index(0, 0)) / 6; 
				var y = math.subset(r, math.index(0, 1)) / 6;
				drawFunc({ x: Math.round(x), y: Math.round(y) });
				t += step;
				k++;
			}
			i++;
		}
        return {
            table: table,
            pixelNumber: len
        };
    }
    getTableColumns(): string[] {
        return [
            'X',
            'Y'
        ];
    }
}