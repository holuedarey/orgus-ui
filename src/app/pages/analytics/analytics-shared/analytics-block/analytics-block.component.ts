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
import { PagesResources } from 'src/app/pages/pages-resources';
import { AnalyticsConfigFormComponent } from '../analytics-config-form/analytics-config-form.component';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-analytics-block',
  templateUrl: './analytics-block.component.html',
  styleUrls: ['./analytics-block.component.scss']
})
export class AnalyticsBlockComponent implements OnInit, OnDestroy {
  
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
    
    ]);

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeWhile(() => this.isLive)
    ).subscribe((e) => {
      this.isSummary = window.location.href.split('?')[0].includes('summary');
    });
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
      closeOnBackdropClick: true,
      context: { assetType: this.route.snapshot.data.assetType, isSummary: this.isSummary },
      hasScroll: true,
      closeOnEsc: true
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
}


