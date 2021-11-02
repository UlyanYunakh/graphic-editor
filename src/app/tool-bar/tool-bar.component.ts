import { Component } from '@angular/core';
import { BresenhamAlgorithm } from '../models/bresenham-algorithm';
import { CDAAlgorithm } from '../models/cda-algorithm';
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
        this.tool = new SegmentTool(new VuAlgorithm(), this._canvasService);
        this.setTool(this.tool);
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
