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

  chartData:any = [];
  chartConfig:any = {};

  constructor() { }

  ngOnInit():void{
    this.chartData = this.data || [];
    this.chartConfig = this.config || {};

    // console.log("data incoming :: ", this.chartData);
    // console.log("config incoming :: ", this.chartConfig);
  }
}
