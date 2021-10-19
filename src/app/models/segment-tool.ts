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
    this.draw([10, 20]);
  }

  draw(args: any[]): void {
    // this.algorithm.compute(args);

    // for example purpose only:
    Array.from(Array(400).keys()).forEach(x => {
      this.canvasService.fillPixel(args[0] + x, args[1] + x);
    });
  }
}
