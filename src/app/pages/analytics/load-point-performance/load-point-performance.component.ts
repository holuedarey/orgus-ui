import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SeoService } from 'src/app/@core/utils';
import { isMobile } from 'mobile-device-detect';
import { LoadPointService } from 'src/app/@core/data-services/load-point.service';
import { LoadPointDto } from 'src/app/@core/dtos/load-point.dto';
import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';
import { LoadPointPerformanceDto } from 'src/app/@core/dtos/loadpoint-performance.dto';

@Component({
  selector: 'app-load-point-performance',
  templateUrl: './load-point-performance.component.html',
  styleUrls: ['./load-point-performance.component.scss']
})
export class LoadPointPerformanceComponent implements OnInit {
 
  startDate:any = new Date().toISOString().split('T')[0];;
  endDate:any = new Date().toISOString().split('T')[0];;
  title = "LOADPOINT MANAGEMENT";

  cardTitle:any = {
    titleOne: "ENERGY CONSUMPTION",
    titleTwo : "ENERGY COST"
  };

  isButton:boolean = true;

  energyUsed:String = "564,563 KWH";
  energyCost:String = "₦564,563";

  btnData = {
    title: "Manage Loadpoint",
    link: "manage-loadpoint"
  }
  loadpoints:any = [
    {
      value : "LOAD POINT"
    }
  ];

  loadPointLocations:any = [];

  chartTitleOne="ENERGY CONSUMPTION";
  chartTitleTwo = "ENERGY COST";

  //check if to display map instead of second chart
  isMap:any = false;

  // filter query Date
  queryDate = new Date().toDateString;
  chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: '#f90',
        fill:false
      }
    ]
  };
  
  chartConfig = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
          gridLines: {
              display:false
          }
      }],
      yAxes: [{
          gridLines: {
              display:false
          }   
      }]
  }
  };

  isLoadingData = true;
  loadPoints: LoadPointDto[] = [];
  loadPointPerformance: LoadPointPerformanceDto[] = [];
  constructor(
    private seo: SeoService,
    private loadPointService: LoadPointService,
    ) {   }


  getDate(ev:any){
    this.startDate = new Date(ev.start).toISOString().split('T')[0];
    this.endDate = new Date(ev.end || this.startDate).toISOString().split('T')[0]; 
  }

  ngOnInit(): void {
    this.LoadPoints()
    if(isMobile){
      // todo implementation
      
    }
    this.seo.setSeoData('Performance Management - [Load Point Performance]', 'Manage Performance pof Load Point');
  }

  
  LoadPoints(data?: any) {
    this.isLoadingData = true;
    this.loadPointService.getLoadPoints(data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response.status) {
            this.loadPointLocations = GetUniqueArray([...response.data?.itemList ?? []], [...this.loadPointLocations]);
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }

}
