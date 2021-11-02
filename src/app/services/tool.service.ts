import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  private _currArgsOnCanvas: any[] = [];

  private _tool!: ITool;
  private _toolSbj = new Subject<ITool>();
  private _argSbj: Subject<any> = new Subject();

  private _snackBar: MatSnackBar | undefined;

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

  set snackBar(snackBar: MatSnackBar) {
    this._snackBar = snackBar;
  }

  drawPixels(pixelsNumber: number): void {
    var result = this._tool.draw(this._currArgsOnCanvas, pixelsNumber);
    this.newObjectSbj.next(result);
  }

  private startShowingSteps(): void {
    this._argSbj.subscribe(arg => {
      // add arg if type is okey
      if (arg.type == this._currArgType) {
        this._currArgs.push(arg.value);
        this._currStep++;
      }

      // draw if all args
      if (this._currArgs.length == this._tool.argsCount) {
        var result = this._tool.draw(this._currArgs);
        this.newObjectSbj.next(result);

        this._currArgsOnCanvas = this._currArgs;
        this._currArgs = [];
        this._currStep = 0;
        this._currArgType = -1;
      }

      // if curr arg type not point then init some kind of dialog with input (lab 2 and so on)

      // show tip if point
      if (arg.type == 0 && this._snackBar) {
        this._snackBar.open(this._tool.steps[this._currStep].info, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1500,
        });
      }

      this._currArgType = this._tool.steps[this._currStep].type;
    });

    this._argSbj.next({ type: undefined });
  }
}
