import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-performance-stat-filter-card',
  templateUrl: './performance-stat-filter-card.component.html',
  styleUrls: ['./performance-stat-filter-card.component.scss']
})
export class PerformanceStatFilterCardComponent implements OnInit {


  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  @Input() isLoading :any;
  @Input() cardTitle:any;
  @Input() energyUsed:any;
  @Input() energyCost:any;
  @Input() assetType:any;
  @Input() locations:any;
  @Input() queryDate:any;

  locationData = [];
  selectedItemLoadPoint:any = "";
  selectedItemLocation:any = "";

  constructor() { }

  ngOnInit(): void {
    
    // console.log("assetType", this.assetType[0].value);
    
  }

  ngOnChanges(changes: SimpleChanges) {
    // on loading you can access childdata
    if(!changes.isLoading.currentValue){
      this.locationData = changes.locations.currentValue;
    }

    this.selectedItemLoadPoint = this.assetType[0].value || ""

  }


}
