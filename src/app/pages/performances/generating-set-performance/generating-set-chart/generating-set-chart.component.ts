import { catchError, takeWhile } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NbThemeService } from '@nebular/theme';
import { GeneratingSetsService } from 'src/app/@core/data-services/generating-set.service';
import { of, Subscription, timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { GeneratingSetPerformanceDto } from 'src/app/@core/dtos/generating-set-performance.dto';

@Component({
  selector: 'app-generating-set-chart',
  templateUrl: './generating-set-chart.component.html',
  styleUrls: ['./generating-set-chart.component.scss']
})
export class GeneratingSetChartComponent implements OnInit {
  isLive = true;
  isLoading = true;
  $dataInterval!: Subscription;
  startDate!: '2021-04-01';
  endDate!: '2021-04-30';

  gensetPerformanceDto!: GeneratingSetPerformanceDto;
  allGeneratingsets! : string[]
  totalEnergySupplied! : number[]

  lineChartOptions: any = null;
  lineChartData: any = null;
  linechartPercentage = 0;

  themeVariables: any = null;
  chartInitialized = false;

  responseTimeStamp!: Date;

  constructor(
    private generatingSetService: GeneratingSetsService,
    private theme: NbThemeService,
  ) {
    this.getThemeData();
  }

  ngOnInit(): void {
    this.getGenSetPerformanceData();
    this.initPieChart()
  }

  getGenSetPerformanceData() {
    this.isLoading = true;
    this.generatingSetService.getAllGeneratingSetPerformance()
      .subscribe(
        (response) => {
          console.log(response.data)
          this.isLoading = false;
          if (response.status) {
            for(let result of response.data!.itemList){
              this.allGeneratingsets.push(result.name)
              this.totalEnergySupplied.push(result.energySupplied)
              console.log(result.name);
           }
          }
        },
        (err) => {
          this.isLoading = false;
        }
      )
  }

  initPieChart(): void {
    const colors: any = this.themeVariables;
    this.lineChartData = {
      labels: [this.allGeneratingsets],
      datasets: [{
        data: [ this.totalEnergySupplied],
        backgroundColor: [colors.successLight, colors.dangerLight],
        borderColor: colors.border,
      }],
    };
  }

  // updatePieChart(): void {
  //   const newData = { ...this.lineChartData };
  //   newData.datasets[0].data[0] = closed;
  //   newData.datasets[0].data[1] = open;
  //   this.pieChartData = { ...newData };
  //   const ratio = this.pieChartData.datasets[0].data as number[];
  //   this.piechartPercentage = Math.floor(ratio[0] / (ratio[0] + ratio[1]) * 100);
  // }


  getThemeData(): void {
    this.theme.getJsTheme()
      .pipe(takeWhile(() => this.isLive))
      .subscribe({
        next: config => {
          this.themeVariables = config.variables;

          this.lineChartOptions = {
            aspectRatio: 2.05,
            responsive: true,
            cutoutPercentage: 80,
            scales: {
              xAxes: [
                {
                  display: true,
                },
              ],
              yAxes: [
                {
                  display: true,
                },
              ],
            },
            legend: {
              position: 'right',
              // labels: {
              //   fontColor: this.themeVariables.chartjs.textColor,
              // },
            },
          };

          if (!this.chartInitialized) {
            this.initPieChart();
            this.chartInitialized = true;
          } else {
            this.lineChartOptions = { ... this.lineChartOptions };
          }

        }
      });
  }

  // ngOnDestroy() {
  //   this.isLive = false;
  // }

}
