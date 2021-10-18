import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ITool } from '../interfaces/itool';

@Injectable({
  providedIn: 'root'
})
export class CurrentToolService {
  CurrentTool: ITool | undefined;

  private _toolSubject = new Subject<ITool>();

  constructor() { }

  get getCurrToolSubject(): Subject<ITool> {
    return this._toolSubject;
  }

  get getCurrTool(): ITool | undefined {
    return this.CurrentTool;
  }

  set setCurrTool(tool: ITool) {
    this.CurrentTool = tool;
    this._toolSubject.next(this.CurrentTool);
  };
}
