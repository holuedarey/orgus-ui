import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadPointPerformanceRoutingModule } from './load-point-performance-routing.module';
import { LoadPointPerformanceComponent } from './load-point-performance.component';
import { AnalyticsSharedModule } from '../analytics-shared/analytics-shared.module';

@NgModule({
  declarations: [LoadPointPerformanceComponent],
  imports: [
    CommonModule,
    LoadPointPerformanceRoutingModule,
    AnalyticsSharedModule
  ]
})
export class LoadPointPerformanceModule { }
