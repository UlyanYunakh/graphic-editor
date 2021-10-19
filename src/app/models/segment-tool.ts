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
    var k = 10;
    // for example purpose only:
    Array.from(Array(40).keys()).forEach(x => {
      for(var i=0;i<k;i++){
        for(var j=0;j<k;j++){
          this.canvasService.fillPixel(args[0] + k*x + j, args[1] + k*x + i);
        }
      }
    });
  }
}
