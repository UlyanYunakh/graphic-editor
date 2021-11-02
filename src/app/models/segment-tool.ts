import { IAlgorithm } from "../interfaces/ialgorithm";
import { IObject } from "../interfaces/iobject";
import { IPoint, IStep, ITool } from "../interfaces/itool";
import { CanvasService } from "../services/canvas.service";
import { ArgTypes } from "./arg-types";

export class SegmentTool implements ITool {
  readonly id = 0;
  readonly name = 'Отрезок';
  readonly argsCount = 2;
  readonly steps: IStep[] = [
    { info: 'Выберите начальную точку', type: ArgTypes.point },
    { info: 'Выберите конечную точку', type: ArgTypes.point }
  ];

  constructor(
    public algorithm: IAlgorithm,
    private canvasService: CanvasService
  ) { }

  draw(args: any[], pixelsNumber?: number): IObject {
    if (pixelsNumber != undefined) this.canvasService.clearCanvas();

    let argResult = this.algorithm.compute(args, this.drawOnCanvas, pixelsNumber);

    return {
      name: `${this.name} ${this.algorithm.name}`,
      args: [
        {
          x: args[0].x,
          y: args[0].y,
          type: ArgTypes.point,
          name: 'Начальная точка'
        },
        {
          x: args[1].x,
          y: args[1].y,
          type: ArgTypes.point,
          name: 'Конечная точка'
        },
      ],
      tableColumns: this.algorithm.getTableColumns(),
      table: argResult.table,
      pixelNumber: argResult.pixelNumber,
      isNew: pixelsNumber == undefined
    }
  }

  private drawOnCanvas = (point: IPoint, alpha?: number): void => {
    this.canvasService.fillPixel(
      Math.round(point.x),
      Math.round(point.y),
      alpha
    );
  }
}