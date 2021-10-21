import { IAlgorithm } from "../interfaces/ialgorithm";
import { ITool } from "../interfaces/itool";
import { CanvasService } from "../services/canvas.service";

export class SegmentTool implements ITool {
  id = 0;
  name = 'Segment';

  constructor(
    public algorithm: IAlgorithm,
    private canvasService: CanvasService
  ) {
    // for example purpose only

    this.draw([4, 1, 1, 4]);
    // this.draw([1, 4, 4, 1]);
    // this.draw([7, 1, 18, 3]);

    // this.draw([10, 10, 20, 20]);
    // this.draw([10, 10, 40, 40], 5);
  }

  draw(args: any[], pixelsNumber?: number): void {
    if (pixelsNumber) this.canvasService.clearCanvas();

    this.algorithm.compute(args, this.drawOnCanvas, pixelsNumber);
  }

  private drawOnCanvas = (args: any[]): void => {
    // will be replace by some kind of debug service
    console.log(`x: ${Math.round(args[0])}, y; ${Math.round(args[1])}`);

    this.canvasService.fillPixel(
      Math.round(args[0]),
      Math.round(args[1])
    );
  }
}