import { IAlgorithm } from "../interfaces/ialgorithm";
import { ITool } from "../interfaces/itool";
import { CanvasService } from "../services/canvas.service";

export class SegmentTool implements ITool {
  readonly id = 0;
  readonly name = 'Segment';
  readonly argsCount = 4;

  constructor(
    public algorithm: IAlgorithm,
    private canvasService: CanvasService
  ) {
    this.canvasService.clearCanvas();
  }

  draw(args: any[], pixelsNumber?: number): void {
    if (pixelsNumber) this.canvasService.clearCanvas();

    this.algorithm.compute(args, this.drawOnCanvas, pixelsNumber);
  }

  private drawOnCanvas = (args: any[]): void => {
    console.log(`x: ${Math.round(args[0])}, y; ${Math.round(args[1])}`);

    this.canvasService.fillPixel(
      Math.round(args[0]),
      Math.round(args[1])
    );
  }
}