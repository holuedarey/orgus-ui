import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SeoService } from 'src/app/@core/utils';
import { isMobile } from 'mobile-device-detect';
import { LoadPointService } from 'src/app/@core/data-services/load-point.service';
import { LoadPointDto } from 'src/app/@core/dtos/load-point.dto';
import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';

@Component({
  selector: 'app-load-point-performance',
  templateUrl: './load-point-performance.component.html',
  styleUrls: ['./load-point-performance.component.scss']
})
export class LoadPointPerformanceComponent implements OnInit {
  title = "LOADPOINT MANAGEMENT";

  cardTitle:any = {
    titleOne: "ENERGY CONSUMPTION",
    titleTwo : "ENERGY COST"
  };

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
  };

  isLoadingData = true;
  loadPoints: LoadPointDto[] = [];
  constructor(
    private seo: SeoService,
    private loadPointService: LoadPointService,
    ) {   }

  ngOnInit(): void {
    this.LoadPoints()
    if(isMobile){
      console.log("Mobile Detected !");
      
    }
    this.seo.setSeoData('Performance Management - [Load Point Performance]', 'Manage Performance pof Load Point');
  }

  
  LoadPoints(data?: any) {
    this.isLoadingData = true;
    this.loadPointService.getLoadPoints(data)
      .subscribe(
        (response) => {
          console.log(response)
          this.isLoadingData = false;
          if (response.status) {
            
            this.loadPointLocations = GetUniqueArray([...response.data?.itemList ?? []], [...this.loadPointLocations]);
            console.log("loadPointLocations", this.loadPointLocations);

          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }

}
