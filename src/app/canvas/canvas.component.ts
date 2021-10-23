import { AfterViewInit, Component } from '@angular/core';
import { CanvasService } from '../services/canvas.service';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {

  constructor(
    private _canvasService: CanvasService,
    private _toolService: ToolService
  ) { }

  ngAfterViewInit(): void {
    var canvas = document.querySelector('.canvas');
    var container = document.querySelector('.canvas-container');

    if (canvas && container) {
      this._canvasService.initCanvas(
        canvas as HTMLCanvasElement,
        container as HTMLDivElement
      );
    }
  }

  canvasClick(mouseEvent: MouseEvent): void {
    var point = this._canvasService.getCursorPositionOnCanvas(mouseEvent);
    this._toolService.addArg(point.x);
    this._toolService.addArg(point.y);
  }
}
