import { Component, OnInit } from '@angular/core';
import { ITool } from '../interfaces/itool';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  tool: ITool | undefined;

  constructor(
    private _currTool: ToolService
  ) { }

  ngOnInit(): void {
    this._currTool.toolSubject.subscribe(
      newTool => {
        this.tool = newTool;
      }
    );
  }

}
