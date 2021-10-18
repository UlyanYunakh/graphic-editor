import { Component, OnInit } from '@angular/core';
import { ITool } from '../interfaces/itool';
import { CurrentToolService } from '../services/current-tool.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  tool: ITool | undefined;

  constructor(
    private _currTool: CurrentToolService
  ) { }

  ngOnInit(): void {
    this._currTool.getCurrToolSubject.subscribe(
      newTool => {
        this.tool = newTool;
      }
    );
  }

}
