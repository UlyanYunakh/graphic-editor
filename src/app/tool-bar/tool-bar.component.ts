import { Component, OnInit } from '@angular/core';
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
export class ToolBarComponent implements OnInit {
  selectedTool: ITool | undefined;

  constructor(
    private _toolService: ToolService,
    private _canvasService: CanvasService
  ) { }

  ngOnInit(): void {
  }

  compareWithCurrToolName(id: number): boolean {
    return this.selectedTool ? this.selectedTool.id == id : false;
  }

  selectSegmentTool(name: string): void {
    switch (name) {
      case 'CDA':
        this.selectedTool = new SegmentTool(new CDAAlgorithm(), this._canvasService);
        this.setTool(this.selectedTool);
        break;
      case 'BRESENHAM':
        this.selectedTool = new SegmentTool(new BresenhamAlgorithm(), this._canvasService);
        this.setTool(this.selectedTool);
        break;
      default:
        this.selectedTool = new SegmentTool(new CDAAlgorithm(), this._canvasService);
        this.setTool(this.selectedTool);
    }
  }

  private setTool(tool: ITool): void {
    this._toolService.setTool = tool;
  }

}
