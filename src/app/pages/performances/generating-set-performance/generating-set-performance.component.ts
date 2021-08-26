import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';
import { isMobile } from 'mobile-device-detect';
import { GeneratingSetsService } from 'src/app/@core/data-services/generating-set.service';
import { GeneratingSetPerformanceDto } from 'src/app/@core/dtos/generating-set-performance.dto';
import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/@core/utils';

@Component({
  selector: 'app-generating-set-performance',
  templateUrl: './generating-set-performance.component.html',
  styleUrls: ['./generating-set-performance.component.scss']
})
export class GeneratingSetPerformanceComponent implements OnInit {

  title = "Generating Set Dashboard"
  btnData = {
    title: "Manage Generating Set",
    link: "./generating-set"
  }
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

  cardTitle:any = {
    titleOne: "ENERGY CONSUMPTION",
    titleTwo : "ENERGY COST"
  };

  energyUsed:String = "564,563 KWH";
  energyCost:String = "₦564,563";

  generatingSetTitle:any = [
    {
      value : "Generating Set"
    }
  ];

  generatingSetLocations:any = [];

  isLoadingData = true;
  generatingSet: GeneratingSetPerformanceDto[] = [];
  constructor(
    private seo: SeoService,
    private generatingSetService: GeneratingSetsService,
    ) {   }

  ngOnInit(): void {
    this.getAllGeneratingSets()
    if(isMobile){
      console.log("Mobile Detected !");
      
    }
    this.seo.setSeoData('Performance Management - [Load Point Performance]', 'Manage Performance pof Load Point');
  }

  
  getAllGeneratingSets(data?: any) {
    this.isLoadingData = true;
    this.generatingSetService.getGeneratingSets(data)
      .subscribe(
        (response) => {
          console.log(response)
          this.isLoadingData = false;
          if (response.status) {
            
            this.generatingSetLocations = GetUniqueArray([...response.data?.itemList ?? []], [...this.generatingSetLocations]);
            console.log("generatingSetLocations", this.generatingSetLocations);

            // for (let result of this.generatingSetLocations){
            //   console.log(result.name);
            //   this.generatingSetLocations = result.name
            // }

          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }

}
