import { AfterViewInit, Component } from '@angular/core';
import { CanvasService } from '../services/canvas.service';
import { ToolService } from '../services/tool.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {

  constructor(
    private _canvasService: CanvasService,
    private _toolService: ToolService,
    private _snackBar: MatSnackBar
  ) { }

  ngAfterViewInit(): void {
    var canvas = document.querySelector('.canvas');
    var container = document.querySelector('.canvas-container');

    if (canvas && container) {
      this._canvasService.initCanvas(
        canvas as HTMLCanvasElement,
        container as HTMLDivElement
      );
      this._toolService.snackBar = this._snackBar;
    }
  }

  canvasClick(mouseEvent: MouseEvent): void {
    var point = this._canvasService.getCursorPositionOnCanvas(mouseEvent);
    this._toolService.arg = { value: point, type: 0 };
  }
}
