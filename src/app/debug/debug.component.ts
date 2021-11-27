import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent {
  @Input() pixelNumber = -1;
  @Input() set isNew(value: boolean) {
    if (value) {
      this.currPixelNumber = -1;
    }
  };
  currPixelNumber = -1;

  constructor(
    private _tool: ToolService
  ) { }

  keyDownEvent(event: KeyboardEvent): void {
    if(event.key == "ArrowLeft"){
      this.back();
    }
    else if (event.key == "ArrowRight"){
      this.forward();
    }
  }

  forward(): void {
    this.currPixelNumber = this.currPixelNumber >= this.pixelNumber ? this.pixelNumber : this.currPixelNumber + 1;
    this.draw();
  }

  back(): void {
    this.currPixelNumber = this.currPixelNumber <= 0 ? 0 : this.currPixelNumber - 1;
    this.draw();
  }

  toEnd(): void {
    this.currPixelNumber = this.pixelNumber;
    this.draw();
  }

  isEnd(): boolean {
    if (this.pixelNumber == 0) return true;
    return this.currPixelNumber == this.pixelNumber;
  }

  isStart(): boolean {
    if (this.pixelNumber == 0) return true;
    return this.currPixelNumber <= 0;
  }

  private draw(): void {
    this._tool.drawPixels(this.currPixelNumber);
  }

}
