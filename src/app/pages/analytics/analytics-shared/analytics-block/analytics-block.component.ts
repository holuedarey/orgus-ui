import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Params, Router } from '@angular/router';
import { NbDateService, NbDialogService, NbThemeService, NbColorHelper } from '@nebular/theme';
import { AnimationOptions } from 'ngx-lottie';
import { filter, takeWhile } from 'rxjs/operators';
import { GeneratingSetsService } from 'src/app/@core/data-services/generating-set.service';
import { LoadPointService } from 'src/app/@core/data-services/load-point.service';
import { PowerSourceService } from 'src/app/@core/data-services/power-source.service';
import { AssetTypeEnum } from 'src/app/@core/enums/asset-type.enum';
import { GlobalResources } from 'src/app/@core/maps/global-resources';
import { LoadPointResources } from 'src/app/pages/assets/load-points/load-point-resources';
import { PagesResources } from 'src/app/pages/pages-resources';
import { AnalyticsConfigFormComponent } from '../analytics-config-form/analytics-config-form.component';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-analytics-block',
  templateUrl: './analytics-block.component.html',
  styleUrls: ['./analytics-block.component.scss']
})
export class AnalyticsBlockComponent implements OnInit, OnDestroy {


  chartId = "pie"
  pieData = {
    labels: [ "Up Time", "Down Time", ],
    datasets: [
      {
        data: [60, 25], 
        backgroundColor: [
          'rgba(214, 228, 237, 1)',
          'rgba(200, 21, 21, 1)',
        ],
      }
    ]
  };


  chartConfig = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
      position:'right'
    },
  };


  chartId2 = "line";
  lineChartData2 = {
    labels: [ "Jan", "Feb","Mar", "Apr", "May", "Jun","Juy", "Aug", "Sept", "Oct", "Nov", "Dec" ],
    datasets: [
      {
        data: [60, 25, 20,100,110,23,54,12,101,100,70,23,32], 
        backgroundColor: [
          '#5048E5',
        ],
      }
    ]
  };
  lineConfig = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
      position:'bottom'
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          beginAtZero: false,
          callback: function(value:string) {
            if(parseInt(value) >= 10){
              return  (parseInt(value)/1000).toFixed(1) + 'K'+'Kw';
            } else {
              return 'Kw' + value;
            }
          }
        }

      }]
    }
  };

  chartId3 = "doughnut";
  doughnutData = {
    labels: ["Time", "Down", "Watt", "Energy"],
    datasets: [
      {
        data: [60, 25, 30, 13], 
        backgroundColor: ["#0D2535", "#5388D8", "#F4BE37", "#FF9F40"],
      }
    ]
  };
  doughnutConfig = {
    responsive: true,
    legend: {
      display: true,
      position:'bottom',
      // callback: function(value:string) {
      //   if(parseInt(value) >= 10){
      //     console.log("testing", value)
      //     return  (parseInt(value)/1000).toFixed(1) + 'K'+'Kw';
      //   } else {
      //     return 'Kw' + value;
      //   }
      // }
    },
  };


  themeVariables: any = null;

  lineChartOptions: any = null;
  pieChartOptions: any = null;

  lineChartData: any = null;
  pieChartData: any = null;

  // Outputs
  @Output()
  selection: EventEmitter<any> = new EventEmitter();


  assetMap: Map<AssetTypeEnum, any>;
  assetResources: any;

  locationName!: string;
  locationId!: string;
  startDate!: string;
  endDate!: string;

  canViewAnalytics = false;

  options: AnimationOptions = {
    path: '/assets/animations/36499-page-not-found.json',
  };
  isSummary!: boolean;
  isLive = true;

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }
  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

  constructor(
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private router: Router,
    private loadpointService: LoadPointService,
    private genSetService: GeneratingSetsService,
    private powerSourceService: PowerSourceService,
    protected dateService: NbDateService<Date>, 
    private theme: NbThemeService,

  ) {
    this.assetMap = new Map<AssetTypeEnum, any>([
      [
        AssetTypeEnum.LOADPOINT,
        {
          assetRoute: GlobalResources.get(PagesResources.LoadPointsView)?.route,
          service: this.loadpointService.getLoadPoints.bind(this),
          title: 'Load Point',
          subTitle: 'View insight into Load point asset performance though energy consumption and event metrics'
        }
      ],
      [
        AssetTypeEnum.GEN_SET,
        {
          assetRoute: GlobalResources.get(PagesResources.GeneratingSetView)?.route,
          service: this.genSetService.getGeneratingSets.bind(this),
          title: 'Generating Unit',
          subTitle: 'View insight into Gen-Set asset performance though power delivery and event metrics'
        }
      ],
      [
        AssetTypeEnum.POWER_SOURCE,
        {
          assetRoute: GlobalResources.get(PagesResources.PowerStationsView)?.route,
          service: this.powerSourceService.getPowerSource.bind(this),
          title: 'Power Station',
          subTitle: 'View insight into Power Station asset performance though power delivery and event metrics'
        }
      ],
    ]);

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeWhile(() => this.isLive)
    ).subscribe((e) => {
      this.isSummary = window.location.href.includes('summary');
      console.log(this.isSummary, (e as NavigationEnd).url.split('?')[0])
    });

    // this.getThemeData();
  }

  ngOnInit(): void {

    this.assetResources = this.assetMap.get(this.route.snapshot.data.assetType);

    this.startDate = this.route.snapshot.queryParams.startDate ?? this.monthStart;
    this.endDate = this.route.snapshot.queryParams.endDate ?? this.monthEnd;
    this.locationId = this.route.snapshot.queryParams.locationId;
    this.locationName = this.route.snapshot.queryParams.locationName;
    this.canViewAnalytics = (!!this.startDate && !!this.endDate && ((!!this.locationId && !!this.locationName) || this.isSummary));
  }

  ngOnDestroy() {
    this.isLive = false;
  }

  async configureForm() {
    const config = await this.dialogService.open(AnalyticsConfigFormComponent, {
      closeOnBackdropClick: false,
      context: { assetType: this.route.snapshot.data.assetType, isSummary: this.isSummary },
      hasScroll: true,
      closeOnEsc: false
    }).onClose.toPromise();
    if (config) {
      const { locationId, locationName, date } = config;
      this.locationName = locationName;
      this.locationId = locationId;
      this.startDate = (date.start as Date).toUTCString();
      this.endDate = (date.end as Date).toUTCString();

      this.canViewAnalytics = (!!this.startDate && !!this.endDate && ((!!this.locationId && !!this.locationName) || this.isSummary));

      const queryParams: Params = {
        locationName: this.locationName,
        locationId: this.locationId,
        startDate: this.startDate,
        endDate: this.endDate
      };

      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: queryParams,
          queryParamsHandling: 'merge',
        }
      );
      this.selection.next(queryParams);
    }
  }


  getThemeData(): void {
    this.theme.getJsTheme()
      .pipe(takeWhile(() => this.isLive))
      .subscribe({
        next: config => {
          this.themeVariables = config.variables;
          // console.log("themeVariables :: ", this.themeVariables)
          this.lineChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
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
                    display: false,
                    autoSkip: true,
                    maxTicksLimit: 10
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
            },
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
      labels: [],
      datasets: [{
        data: [],
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
        data: [0, 0],
        backgroundColor: [colors.successLight, colors.dangerLight],
        borderColor: colors.border,
      }],
    };
  }
}


