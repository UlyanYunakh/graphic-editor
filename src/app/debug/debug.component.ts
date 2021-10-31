import { Component } from '@angular/core';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent {
  currPixelNumber = 0;

  constructor(
    private _tool: ToolService
  ) { }

  forward(): void {
    this.currPixelNumber++;
    this.draw();
  }

  back(): void {
    this.currPixelNumber--;
    this.draw();
  }

  toEnd(): void {
    this.currPixelNumber = -1;
    this.draw();
  }

  private draw(): void {
    this._tool.drawPixels(this.currPixelNumber);
  }

}
