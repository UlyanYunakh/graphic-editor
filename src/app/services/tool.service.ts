import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ITool } from '../interfaces/itool';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private _currArgs: any[] = [];
  private _currStep: number = 0;
  private _currArgType: number = -1;
  
  private _tool: ITool | undefined;
  private _toolSubject = new Subject<ITool>();
  private _argSubject: Subject<any> = new Subject();

  constructor() { }

  get toolSubject(): Subject<ITool> {
    return this._toolSubject;
  }

  get argSubject(): Subject<any> {
    return this._argSubject;
  }

  set setTool(tool: ITool) {
    this._argSubject = new Subject();

    this._tool = tool;
    this._toolSubject.next(this._tool);

    this._currArgs = [];
    this._currStep = 0;
    this._currArgType = -1

    this.startShowingSteps();
  };

  set arg(newPoint: { value: { x: number, y: number }, type: number }) {
    this.argSubject.next(newPoint);
  }

  private startShowingSteps(): void {
    this._argSubject.subscribe(arg => {
      if (this._tool) {
        if (arg.type == this._currArgType) {
          this._currArgs.push(arg.value);
          this._currStep++;
        }

        // if curr arg type not point then init some kind of dialog with input (lab 2 and so on)

        if (this._currArgs.length == this._tool.argsCount) {
          this._tool.draw(this._currArgs);

          this._currArgs = [];
          this._currStep = 0;
          this._currArgType = -1
        }

        console.log(this._tool.steps[this._currStep].info);

        this._currArgType = this._tool.steps[this._currStep].type;
      }
    });

    this._argSubject.next({ type: undefined });
  }
}
