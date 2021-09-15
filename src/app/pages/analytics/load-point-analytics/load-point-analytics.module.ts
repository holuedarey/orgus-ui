import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadPointAnalyticsRoutingModule } from './load-point-analytics-routing.module';
import { LoadPointAnalyticsComponent } from './load-point-analytics.component';
import { AnalyticsSharedModule } from '../analytics-shared/analytics-shared.module';
import { LoadPointAnalyticsSummaryComponent } from './load-point-analytics-summary/load-point-analytics-summary.component';
import { LoadPointAnalyticsExpandedComponent } from './load-point-analytics-expanded/load-point-analytics-expanded.component';


@NgModule({
  declarations: [
    LoadPointAnalyticsComponent,
    LoadPointAnalyticsSummaryComponent,
    LoadPointAnalyticsExpandedComponent
  ],
  imports: [
    CommonModule,
    LoadPointAnalyticsRoutingModule,
    AnalyticsSharedModule
  ]
})
export class LoadPointAnalyticsModule { }
