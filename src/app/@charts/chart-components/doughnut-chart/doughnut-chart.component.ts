import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutComponent {


  @Input() data: any;
  @Input() config: any;
  @Input() chartId = '';
  constructor() { }

  
}
