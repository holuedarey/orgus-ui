import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {

  @Input() data: any;
  @Input() config: any;
  @Input() chartId = '';
  type: String = 'line';

  constructor() { }

  ngOnInit():void{
    console.log("data incoming :: ", this.data);
    console.log("config incoming :: ", this.config);
  }
}
