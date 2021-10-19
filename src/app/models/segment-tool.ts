//import { type } from "os";
import { IAlgorithm } from "../interfaces/ialgorithm";
import { ITool } from "../interfaces/itool";
import { CanvasService } from "../services/canvas.service";

type Point = {
  x: number;
  y: number;
};

export class SegmentTool implements ITool {
  id = 0;
  name = 'Segment';

  constructor(
    public algorithm: IAlgorithm,
    private canvasService: CanvasService
  ) {
    // for example purpose only
    
    this.draw([1, 4, 4, 1]);
    this.draw([7, 1, 18, 3]);
  }

  draw(args: any[]): void {
    //CDA algorithm
    
    let x1 = args[0];
    let x2 = args[2];
    let y1 = args[1];
    let y2 = args[3];

    let len = Math.max(Math.abs(x2-x1),Math.abs(y2-y1));
    let dx = (x2-x1)/len;
    let dy = (y2-y1)/len;
    
    x1+=0.5*Math.sign(dx);
    y1+=0.5*Math.sign(dy);
    drawOnCanvas([x1,y1],this.canvasService);

    while(x1<x2){
      x1=x1+dx;
      y1=y1+dy;
      drawOnCanvas([x1,y1],this.canvasService);
    }
    // for example purpose only:
    /*Array.from(Array(40).keys()).forEach(x => {
      drawOnCanvas([x,x],this.canvasService);
    });*/
  }
}
function drawOnCanvas(args: any[], canv: CanvasService) {
  const k = 10;
  for(var i=0;i<k;i++){
    for(var j=0;j<k;j++){
      canv.fillPixel(Math.round(args[0])*k + j, Math.round(args[1])*k + i);
    }
  }
}