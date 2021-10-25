import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private _pixelSize = 10;

  private _context: CanvasRenderingContext2D | undefined;
  private _canvas: HTMLCanvasElement | undefined;
  private _container: HTMLDivElement | undefined;

  private _canvasStart = { x: 0, y: 0 };
  private _canvasEnd = { x: 0, y: 0 };

  set pixelSize(size: number) {
    this._pixelSize = size;
    this.clearCanvas();
    this.initCanvas(
      this._canvas!,
      this._container!
    );
  }

  initCanvas(
    canvas: HTMLCanvasElement,
    container: HTMLDivElement
  ): void {
    var containerWidth = container.offsetWidth;
    var containerHeight = container.offsetHeight;

    canvas.width = (containerWidth - 21) - (containerWidth - 21) % this._pixelSize; // 21 because some css width property with container 
    canvas.height = (containerHeight - 20) - (containerHeight - 20) % this._pixelSize;

    var context = canvas.getContext('2d');
    if (context) {
      this._context = context;
    }

    this._canvasStart = {
      x: canvas.getBoundingClientRect().left,
      y: canvas.getBoundingClientRect().top
    }

    this._canvasEnd = {
      x: canvas.getBoundingClientRect().right,
      y: canvas.getBoundingClientRect().bottom
    }

    this._canvas = canvas;
    this._container = container;

    this.markOutCanvas();
  }

  getCursorPositionOnCanvas(mouseEvent: MouseEvent): { x: number, y: number } {
    return {
      x: this.pixelise(mouseEvent.clientX - this._canvasStart.x),
      y: this.pixelise(mouseEvent.clientY - this._canvasStart.y)
    }
  }

  fillPixel(x: number, y: number): void {
    if (this._context) {
      this._context.fillRect(
        x * this._pixelSize,
        y * this._pixelSize,
        this._pixelSize,
        this._pixelSize
      );
    }
  }

  clearCanvas(): void {
    if (this._context && this._canvas) {
      this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

      this.markOutCanvas();
    }
  }

  // private setCanvasBounds(): void {
  //   if (this._canvas && this._container) {
  //     var containerWidth = this._container.offsetWidth;
  //     var containerHeight = this._container.offsetHeight;

  //     this._canvas.width = (containerWidth - 21) - (containerWidth - 21) % this._pixelSize; // 21 because some css width property with container 
  //     this._canvas.height = (containerHeight - 20) - (containerHeight - 20) % this._pixelSize;
  //   }
  // }

  private markOutCanvas(): void {
    if (this._context) {
      this._context.beginPath();

      Array.from({ length: this.pixelise(this._canvasEnd.x) }, (_, index) => index * this._pixelSize).forEach((item: number) => {
        this._context!.moveTo(item, 0);
        this._context!.lineTo(item, this._canvasEnd.y);
      });

      Array.from({ length: this.pixelise(this._canvasEnd.y) }, (_, index) => index * this._pixelSize).forEach((item: number) => {
        this._context!.moveTo(0, item);
        this._context!.lineTo(this._canvasEnd.x, item);
      });

      this._context.stroke();
    }
  }

  private pixelise = (number: number): number => Math.floor(number / this._pixelSize);
}
