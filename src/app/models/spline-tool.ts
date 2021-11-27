import { IAlgorithm } from "../interfaces/ialgorithm";
import { IObject } from "../interfaces/iobject";
import { IPoint, IStep, ITool } from "../interfaces/itool";
import { CanvasService } from "../services/canvas.service";
import { ArgTypes } from "./arg-types";

export class SplineTool implements ITool {
  readonly name = 'Кривая';
  readonly argsCount = 4;
  readonly steps: IStep[] = [
    { info: 'Выберите точку 1', type: ArgTypes.point },
    { info: 'Выберите точку 2', type: ArgTypes.point },
    { info: 'Выберите точку 3', type: ArgTypes.point },
    { info: 'Выберите точку 4', type: ArgTypes.point }
  ];

  constructor(
    public algorithm: IAlgorithm,
    private canvasService: CanvasService
  ) { }

  draw(args: any[], pixelsNumber?: number): IObject {
    if (pixelsNumber != undefined) this.canvasService.clearCanvas();

    let argResult = this.algorithm.compute(args, this.drawOnCanvas, pixelsNumber);

    return {
      name: `${this.name}: ${this.algorithm.name}`,
      args: [
        {
          x: args[0].x,
          y: args[0].y,
          type: ArgTypes.point,
          name: 'Точка 1'
        },
        {
          x: args[1].x,
          y: args[1].y,
          type: ArgTypes.point,
          name: 'Точка 2'
        },
        {
          x: args[0].x,
          y: args[0].y,
          type: ArgTypes.point,
          name: 'Точка 3'
        },
        {
          x: args[1].x,
          y: args[1].y,
          type: ArgTypes.point,
          name: 'Точка 4'
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