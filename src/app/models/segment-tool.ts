import { IAlgorithm } from "../interfaces/ialgorithm";
import { IPoint, IStep, ITool } from "../interfaces/itool";
import { CanvasService } from "../services/canvas.service";

export class SegmentTool implements ITool {
  readonly id = 0;
  readonly name = 'Отрезок';
  readonly argsCount = 2;
  readonly steps: IStep[] = [
    { info: 'Выберите начальную точку', type: 0 },
    { info: 'Выберите конечную точку', type: 0 }
  ];

  constructor(
    public algorithm: IAlgorithm,
    private canvasService: CanvasService
  ) {
    this.canvasService.clearCanvas();

    this.draw([{ x: 4, y: 1 }, { x: 4, y: 8 }]);
    this.draw([{ x: 10, y: 4 }, { x: 14, y: 1 }]);
    this.draw([{ x: 17, y: 1 }, { x: 28, y: 3 }]);

    this.draw([{ x: 8, y: 20 }, { x: 2, y: 20}]);
  }

  draw(args: any[], pixelsNumber?: number): void {
    if (pixelsNumber) this.canvasService.clearCanvas();

    this.algorithm.compute(args, this.drawOnCanvas, pixelsNumber);
  }

  private drawOnCanvas = (point: IPoint): void => {
    console.log(`x: ${Math.round(point.x)}, y; ${Math.round(point.y)}`);

    this.canvasService.fillPixel(
      Math.round(point.x),
      Math.round(point.y)
    );
  }
}