import { Component, OnInit } from '@angular/core';
import { ITool } from '../interfaces/itool';
import { SegmentTool } from '../models/segment-tool';
import { CurrentToolService } from '../services/current-tool.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
  selectedTool: ITool | undefined;

  constructor(
    private _toolService: CurrentToolService
  ) { }

  ngOnInit(): void {
  }

  compareWithCurrToolName(id: number): boolean {
    return this.selectedTool ? this.selectedTool.id == id : false;
  }

  selectSegmentTool(): void {
    this.selectedTool = new SegmentTool();
    this.setTool(this.selectedTool);
  }

  private setTool(tool: ITool): void {
    this._toolService.setCurrTool = tool;
  }

}
