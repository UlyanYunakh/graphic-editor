import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CanvasService } from '../services/canvas.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {

  constructor(private canvasService: CanvasService) { }

  ngAfterViewInit(): void {
    var canvas: HTMLCanvasElement | null = document.querySelector('.canvas');
    if (canvas) {
      this.canvasService.setCanvasContext(canvas);
    }
  }

}
