import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadPointPerformanceRoutingModule } from './load-point-performance-routing.module';
import { LoadPointPerformanceComponent } from './load-point-performance.component';
import { AnalyticsModule } from '../analytics.module';

@NgModule({
  declarations: [LoadPointPerformanceComponent],
  imports: [
    CommonModule,
    LoadPointPerformanceRoutingModule,
    AnalyticsModule
  ]
})
export class LoadPointPerformanceModule { }
