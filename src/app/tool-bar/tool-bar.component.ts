import { Component } from '@angular/core';
import { ITool } from '../interfaces/itool';
import { BresenhamAlgorithm } from '../models/bresenham-algorithm';
import { CDAAlgorithm } from '../models/cda-algorithm';
import { SegmentTool } from '../models/segment-tool';
import { CanvasService } from '../services/canvas.service';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent {
  tool: ITool | undefined;

  constructor(
    private _toolService: ToolService,
    private _canvasService: CanvasService
  ) { }

  compareWithCurrToolId(id: number): boolean {
    return this.tool ? this.tool.id == id : false;
  }

  selectSegmentTool(name: string): void {
    switch (name) {
      case 'CDA':
        this.tool = new SegmentTool(new CDAAlgorithm(), this._canvasService);
        this.setTool(this.tool);
        break;
      case 'BRESENHAM':
        this.tool = new SegmentTool(new BresenhamAlgorithm(), this._canvasService);
        this.setTool(this.tool);
        break;
      default:
        this.tool = new SegmentTool(new CDAAlgorithm(), this._canvasService);
        this.setTool(this.tool);
    }
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

  private setTool(tool: ITool): void {
    this._toolService.setTool = tool;
  }
}
