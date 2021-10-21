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

    this.draw([4, 1, 4, 8]);
    this.draw([10, 4, 14, 1]);
    this.draw([17, 1, 28, 3]);
    
    this.draw([8,20,2,20]);

    // this.draw([10, 10, 20, 20]);
    // this.draw([10, 10, 40, 40], 5);

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