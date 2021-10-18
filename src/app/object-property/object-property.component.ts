import { Component, OnInit } from '@angular/core';
import { CurrentToolService } from '../services/current-tool.service';

@Component({
  selector: 'app-object-property',
  templateUrl: './object-property.component.html',
  styleUrls: ['./object-property.component.css']
})
export class ObjectPropertyComponent implements OnInit {
  number = 0;
  constructor(
    private _currToolService: CurrentToolService
  ) { }

  ngOnInit(): void {
    this._currToolService.getCurrToolSubject.subscribe(
      () => {
        console.log(`new value ${this.number++}`);
      }
    );
  }

}
