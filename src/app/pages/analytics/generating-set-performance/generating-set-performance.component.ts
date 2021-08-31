import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';
import { GeneratingSetsService } from 'src/app/@core/data-services/generating-set.service';
import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/@core/utils';
import { GeneratingSetAnalyticsChartDto } from 'src/app/@core/dtos/generating-sets-analytics-chart.dto';

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
  tableTitle = "LOCATION DETAILS"

  chartTitleOne="ENERGY CONSUMPTION";
  chartTitleTwo = "ENERGY COST";

  tabelColumns = {
    location: {
      title: 'Location',
    },
    from:{
      title: 'From',
    },
    to: {
      title: 'To',
    },
    energySupplied: {
      title: 'Energy Supplied',
    },
    energyValue: {
      title: 'Energy Value',
    },
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

  queryDate = new Date().toDateString;

  isButton:boolean = true;

  isMap:any = false;

  isLoadingData = true;
  generatingSet: GeneratingSetAnalyticsChartDto[] = [];
  constructor(
    private seo: SeoService,
    private generatingSetService: GeneratingSetsService,
    ) {   }

  ngOnInit(): void {
    this.getAllGeneratingSets()
  
    this.seo.setSeoData('Performance Management - [Load Point Performance]', 'Manage Performance pof Load Point');
  }

  
  getAllGeneratingSets(data?: any) {
    this.isLoadingData = true;
    this.generatingSetService.getGeneratingSets(data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response.status) {
            
            this.generatingSetLocations = GetUniqueArray([...response.data?.itemList ?? []], [...this.generatingSetLocations]);

          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }

}
