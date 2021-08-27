import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard-template',
  templateUrl: './dashboard-template.component.html',
  styleUrls: ['./dashboard-template.component.scss']
})
export class DashboardTemplateComponent implements OnInit, OnChanges  {

  // For header Section

  @Input() title: string = "";
  @Input() btnData: any = {};

  //for STAT Session
  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  @Input() isLoading :any;
  @Input() cardTitle:any;
  @Input() energyUsed:any;
  @Input() energyCost:any;
  @Input() assetType:any;
  @Input() locations:any;
  @Input() queryDate:any;

  // title for the chart Data
  @Input() chartData:any;
  @Input() chartConfig:any;

  //chart Title Data
  @Input() ChartTitleOne:any
  @Input() ChartTitleTwo: any


  //check for button or Toggle
  @Input() isButton:any;
  @Input() isToggle:any;

  locationData = <any>[];
  selectedItemLoadPoint:any = "";
  selectedItemLocation:any = "";


  constructor() { }

  ngOnInit(): void {
    console.log('')
  }



  ngOnChanges(changes: SimpleChanges) {
    if(!changes.isLoading.currentValue){
      this.locationData = changes.locations.currentValue;
    }
    this.selectedItemLoadPoint = this.assetType[0].value || ""
  }

}
