import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LinechartComponent {


  @Input() data: any;
  @Input() config: any;
  @Input() chartId = '';
  constructor() { }

  ngOnInit():void{
  }
}
