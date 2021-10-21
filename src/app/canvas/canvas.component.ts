import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ITool } from '../interfaces/itool';
import { CanvasService } from '../services/canvas.service';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  private canvasLeft = 0;
  private canvasTop = 0;

  constructor(
    private _canvasService: CanvasService,
    private _toolService: ToolService
  ) { }

  ngAfterViewInit(): void {
    var canvas = document.querySelector('.canvas');
    if (canvas) {
      this._canvasService.setCanvasContext(canvas as HTMLCanvasElement);
      this.canvasLeft = canvas.getBoundingClientRect().left;
      this.canvasTop = canvas.getBoundingClientRect().top;
    }
  }

  canvasClick(mouseEvent: MouseEvent): void {
    var point = this.getCanvasPoint(mouseEvent);
    this._toolService.addArg(point.x);
    this._toolService.addArg(point.y);
  }

  private getCanvasPoint(mouseEvent: MouseEvent): { x: number, y: number } {
    var k = 5;
    return {
      x: Math.floor((mouseEvent.clientX - this.canvasLeft) / k),
      y: Math.floor((mouseEvent.clientY - this.canvasTop) / k)
    }
  }
}
