import { Component, OnInit } from '@angular/core';
import { IObject } from '../interfaces/iobject';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-object-property',
  templateUrl: './object-property.component.html',
  styleUrls: ['./object-property.component.css']
})
export class ObjectPropertyComponent implements OnInit {
  currObject: IObject | undefined;

  constructor(
    private _toolService: ToolService
  ) { }

  ngOnInit(): void {
    this._toolService.newObjectSbj.subscribe(newObject => {
      this.currObject = newObject;
    });
  }
}
