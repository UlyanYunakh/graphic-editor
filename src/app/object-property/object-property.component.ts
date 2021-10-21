import { Component, OnInit } from '@angular/core';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-object-property',
  templateUrl: './object-property.component.html',
  styleUrls: ['./object-property.component.css']
})
export class ObjectPropertyComponent implements OnInit {
  number = 0;
  constructor(
    private _currToolService: ToolService
  ) { }

  ngOnInit(): void {
    this._currToolService.getToolSubject.subscribe(
      () => {
        console.log(`new value ${this.number++}`);
      }
    );
  }

}
