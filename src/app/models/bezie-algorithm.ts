import { IAlgorithm, IAlgResult } from "../interfaces/ialgorithm";


declare var math: any;

export class Bezie implements IAlgorithm {

    readonly name = 'Алгоритм Безье для кривой';

    compute(args: any[], drawFunc: Function, pixelsNumber?: number): IAlgResult {
        let table: any[] = [];
        let len = 0;

        let p1 = args[0],
            p2 = args[1],
            p3 = {x: 15, y: 47},
            p4 = {x: 10, y: 20};

		var i = 0;
		var t = 0.0;
		var step = 0.01;
		
		var a = math.matrix([[-1, 3, -3, 1], [3, -6, 3, 0], [-3, 3, 0, 0], [1, 0, 0, 0]]);

		var b = math.matrix([[p1.x, p1.y], [p2.x, p2.y], [p3.x, p3.y], [p4.x, p4.y]]);

		var c = math.multiply(a, b);

		while (t <= 1) {
			var tMatrix = math.matrix([[t * t * t, t * t, t, 1]]);
			var r = math.multiply(tMatrix, c);
			var x = math.subset(r, math.index(0, 0)); 
			var y = math.subset(r, math.index(0, 1));
			drawFunc({ x: Math.round(x), y: Math.round(y) });
            table.push({
                X: x,
                Y: y
            });
			t += step;
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