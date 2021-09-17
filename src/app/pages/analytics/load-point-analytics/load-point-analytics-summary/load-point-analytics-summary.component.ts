import { Component, OnInit } from '@angular/core';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-load-point-analytics-summary',
  templateUrl: './load-point-analytics-summary.component.html',
  styleUrls: ['./load-point-analytics-summary.component.scss']
})
export class LoadPointAnalyticsSummaryComponent implements OnInit {


  themeVariables: any = null;

  lineChartOptions: any = null;
  pieChartOptions: any = null;

  lineChartData: any = null;
  pieChartData: any = null;
  DoughnutChart:any = null;

  chartId1 = "pie";
  chartId2 = "line";
  chartId3 = "doughnut";


  isLive = true;

  constructor(private theme: NbThemeService) {
    this.getThemeData()

    this.initLineChart();
    this.initPieChart();
    this.initDoughnutChart()
    this.isLive = false;
  }

  ngOnInit(): void {
    
  }


  getThemeData(): void {
    this.theme.getJsTheme()
      .pipe(takeWhile(() => this.isLive))
      .subscribe({
        next: config => {
          this.themeVariables = config.variables;
          console.log("themeVariables :: ", this.themeVariables.chartjs)
          this.lineChartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            elements: {
              point: {
                radius: 0,
                hitRadius: 10
              }
            },
            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Ping Attempts (N)',
                    fontColor: this.themeVariables.chartjs.textColor,
                  },
                  gridLines: {
                    display: false,
                    color: this.themeVariables.chartjs.axisLineColor,
                  },
                  ticks: {
                    fontColor: this.themeVariables.chartjs.textColor,
                    display: true,
                    autoSkip: true,
                    maxTicksLimit: 10
                  },
                },
              ],
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: 'ms'
                  },
                  gridLines: {
                    display: false,
                    color: this.themeVariables.chartjs.axisLineColor,
                  },
                  ticks: {
                    fontColor: this.themeVariables.chartjs.textColor,
                    source: 'labels',
                    display: true,
                    autoSkip: true,
                    maxTicksLimit: 10,
                    callback: function (value: string) {
                      if (parseInt(value) >= 100) {
                        return (parseInt(value) / 1000).toFixed(1) + 'K' + 'Kw';
                      } else {
                        return 'Kw' + value;
                      }
                    }
                  },
                },
              ],
            },
            legend: {
              display: false,
              labels: {
                fontColor: this.themeVariables.chartjs.textColor,
              },
            },
          };

          this.pieChartOptions = {
            aspectRatio: 1.9,
            responsive: true,
            cutoutPercentage: 70,
            scales: {
              xAxes: [
                {
                  display: false,
                },
              ],
              yAxes: [
                {
                  display: false,
                },
              ],
            },
            legend: {
              position: 'right',
              labels: {
                fontColor: this.themeVariables.chartjs.textColor,
              },
            }
          };

          this.initLineChart();
          this.initPieChart();
          this.isLive = false;
        }
      });
  }

  initLineChart(): void {
    const colors: any = this.themeVariables;

    this.lineChartData = {
      labels: [ "Jan", "Feb","Mar", "Apr", "May", "Jun","Juy", "Aug", "Sept", "Oct", "Nov", "Dec" ],
      datasets: [{
        data: [60, 25, 20, 100, 110, 23, 54, 12, 101, 100, 70, 23, 32],
        label: 'ms',
        backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.2),
        borderColor: colors.primary,
      }],
      
    };
  }

  initPieChart(): void {
    const colors: any = this.themeVariables;
    this.pieChartData = {
      labels: ['Success', 'Failure'],
      datasets: [{
        data: [60, 25],
        backgroundColor: [colors.successLight, colors.dangerLight],
        borderColor: colors.border,
      }],
    };
  }

  initDoughnutChart(): void {
    const colors: any = this.themeVariables;
    this.DoughnutChart = {
      labels: ["Time", "Down", "Watt", "Energy"],
      datasets: [{
        data: [60, 25],
        backgroundColor: [colors.successLight, colors.dangerLight],
        borderColor: colors.border,
      }],
    };
  }
}
