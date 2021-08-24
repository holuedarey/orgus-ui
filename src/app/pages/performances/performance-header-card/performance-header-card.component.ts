import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-performance-header-card',
  templateUrl: './performance-header-card.component.html',
  styleUrls: ['./performance-header-card.component.scss']
})
export class PerformanceHeaderCardComponent implements OnInit {
  @Input() title: string = "";
  @Input() btnData: any = {};

  constructor() {

  }

  ngOnInit(): void {
    // console.log("title from Parent :: ", this.title);

  }
  



}
