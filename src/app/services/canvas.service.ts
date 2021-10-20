import { ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private context: CanvasRenderingContext2D | undefined;
  private canvas: HTMLCanvasElement | undefined;

  setCanvasContext(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    var context = this.canvas.getContext('2d');
    if (context) {
      this.context = context;
    }
  }

  fillPixel(x: number, y: number): void {
    if (this.context) {
      this.context.fillRect(x * 10, y * 10, 10, 10);
    }
  }

  clearCanvas(): void {
    if (this.context && this.canvas) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}
