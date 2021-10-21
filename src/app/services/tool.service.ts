import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ITool } from '../interfaces/itool';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private _tool: ITool | undefined;
  private _toolSubject = new Subject<ITool>();
  private _toolArgs: any[] = []

  constructor() { }

  get getToolSubject(): Subject<ITool> {
    return this._toolSubject;
  }

  set setTool(tool: ITool) {
    this._tool = tool;
    this._toolArgs = [];
    this._toolSubject.next(this._tool);
  };

  addArg(arg: any): void {
    if (this._tool) {
      this._toolArgs.push(arg);
      if(this._toolArgs.length == this._tool.argsCount)
      {
        this._tool.draw(this._toolArgs);
        this._toolArgs = [];
      }
    }
  }
}
