import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PiechartComponent {


  @Input() data: any;
  @Input() config: any;
  @Input() chartId = '';
  constructor() { 
    
  }


}
