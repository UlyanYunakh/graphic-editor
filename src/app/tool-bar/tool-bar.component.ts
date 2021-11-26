import { Component } from '@angular/core';
import { BSpline } from '../models/b-spline-algorithm';
import { Bezie } from '../models/bezie-algorithm';
import { BresenhamAlgorithm } from '../models/bresenham-algorithm';
import { CDAAlgorithm } from '../models/cda-algorithm';
import { EllipseBresenhem } from '../models/el-algorithm';
import { CircleBresenhem } from '../models/ellipse-algorithm';
import { Ermith } from '../models/ermith-algorithm';
import { HyperbolaBresenhem } from '../models/hyperbola-algorithm';
import { ParabolaBresenhem } from '../models/parabola-algorithm';
import { SegmentTool } from '../models/segment-tool';
import { VuAlgorithm } from '../models/vu-algorithm';
import { CanvasService } from '../services/canvas.service';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent {

  constructor(
    private _toolService: ToolService,
    private _canvasService: CanvasService
  ) { }

  selectSegmentTool(name: string): void {
    let tool;
    switch (name) {
      case 'CDA':
        tool = new SegmentTool(new CDAAlgorithm(), this._canvasService);
        this._toolService.setTool = tool;
        break;
      case 'BRESENHAM':
        tool = new SegmentTool(new BresenhamAlgorithm(), this._canvasService);
        this._toolService.setTool = tool;
        break;
      case 'VU':
        tool = new SegmentTool(new VuAlgorithm(), this._canvasService);
        this._toolService.setTool = tool;
        break;
      case 'ELLIPSE':
        tool = new SegmentTool(new EllipseBresenhem(), this._canvasService);
        this._toolService.setTool = tool;
        break;
      case 'CIRCLE':
        tool = new SegmentTool(new CircleBresenhem(), this._canvasService);
        this._toolService.setTool = tool;
        break;
      case 'HYPERBOLA':
        tool = new SegmentTool(new HyperbolaBresenhem(), this._canvasService);
        this._toolService.setTool = tool;
        break;
      case 'PARABOLA':
        tool = new SegmentTool(new ParabolaBresenhem(), this._canvasService);
        this._toolService.setTool = tool;
        break;
      case 'ERMIT':
        tool = new SegmentTool(new BSpline(), this._canvasService);
        this._toolService.setTool = tool;
        break;
      default:
        tool = new SegmentTool(new CDAAlgorithm(), this._canvasService);
        this._toolService.setTool = tool;
    }
  }

  clearCanvas(): void {
    this._canvasService.clearCanvas();
  }

  selectPixelSize(size: string): void {
    switch (size) {
      case 'Smaller':
        this._canvasService.pixelSize = 6;
        break;
      case 'Small':
        this._canvasService.pixelSize = 8;
        break;
      default:
      case 'Medium':
        this._canvasService.pixelSize = 10;
        break;
      case 'Large':
        this._canvasService.pixelSize = 12;
        break;
      case 'Larger':
        this._canvasService.pixelSize = 15;
        break;
    }
  }
}
