import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() data: any;
  @Input() config: any;
  @Input() chartId = '';

  constructor() { }

  ngOnInit(): void {
    console.log(this.chartId);
  }

}