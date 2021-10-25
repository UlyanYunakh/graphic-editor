import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IObject } from '../interfaces/iobject';
import { ITool } from '../interfaces/itool';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  newObjectSbj: Subject<IObject> = new Subject();

  private _currArgs: any[] = [];
  private _currStep: number = 0;
  private _currArgType: number = -1;
  
  private _tool: ITool | undefined;
  private _toolSbj = new Subject<ITool>();
  private _argSbj: Subject<any> = new Subject();

  constructor() { }

  get toolSubject(): Subject<ITool> {
    return this._toolSbj;
  }

  get argSubject(): Subject<any> {
    return this._argSbj;
  }

  set setTool(tool: ITool) {
    this._argSbj = new Subject();

    this._tool = tool;
    this._toolSbj.next(this._tool);

    this._currArgs = [];
    this._currStep = 0;
    this._currArgType = -1

    this.startShowingSteps();
  };

  set arg(newPoint: { value: { x: number, y: number }, type: number }) {
    this.argSubject.next(newPoint);
  }

  private startShowingSteps(): void {
    this._argSbj.subscribe(arg => {
      if (this._tool) {
        if (arg.type == this._currArgType) {
          this._currArgs.push(arg.value);
          this._currStep++;
        }

        // if curr arg type not point then init some kind of dialog with input (lab 2 and so on)

        if (this._currArgs.length == this._tool.argsCount) {
          var table = this._tool.draw(this._currArgs);

          this.newObjectSbj.next({
            name: `${this._tool.name} ${this._tool.algorithm.name}`,
            args: [
              {
                x: this._currArgs[0].x,
                y: this._currArgs[0].y,
                type: 0,
                name: 'Начальная точка'
              },
              {
                x: this._currArgs[1].x,
                y: this._currArgs[1].y,
                type: 0,
                name: 'Конечная точка'
              },
            ],
            tableColumns: this._tool.algorithm.getTableColumns(),
            table: table
          }
        );

          this._currArgs = [];
          this._currStep = 0;
          this._currArgType = -1
        }

        console.log(this._tool.steps[this._currStep].info);

        this._currArgType = this._tool.steps[this._currStep].type;
      }
    });

    this._argSbj.next({ type: undefined });
  }
}
