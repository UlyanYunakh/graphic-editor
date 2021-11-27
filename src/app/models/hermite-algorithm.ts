import { IAlgorithm, IAlgResult } from "../interfaces/ialgorithm";

declare let math: any;

export class HermiteAlgorithm implements IAlgorithm {

    readonly name = 'Алгоритм Эрмита';

    compute(args: any[], drawFunc: Function, pixelsNumber?: number): IAlgResult {
        let table: any[] = [];
        let len = 0;

        let p1 = args[0],
            p4 = args[1],
            r1 = args[2],
            r4 = args[3];

		let i = 0;
		let t = 0.0;
		let step = 0.01;
		
		let a = math.matrix([[2, -2, 1, 1], [-3, 3, -2, -1], [0, 0, 1, 0], [1, 0, 0, 0]]);

		let b = math.matrix([[p1.x, p1.y], [p4.x, p4.y], [r1.x, r1.y], [r4.x, r4.y]]);
		
		let c = math.multiply(a, b);

		while (t <= 1) {
			let tMatrix = math.matrix([[t * t * t, t * t, t, 1]]);		
			let r = math.multiply(tMatrix, c);
			let x = math.subset(r, math.index(0, 0)); 
			let y = math.subset(r, math.index(0, 1));
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