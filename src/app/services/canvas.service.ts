import { ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private context: CanvasRenderingContext2D | undefined;

  setCanvasContext(canvas: HTMLCanvasElement): void {
    var context = canvas.getContext('2d');
    if (context) {
      this.context = context;
    }
  }

  fillPixel(x: number, y: number): void {
    if (this.context) {
      this.context.fillRect(x * 10, y * 10, 10, 10);
    }
  }
}
