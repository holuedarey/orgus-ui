import { NbCardModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratingSetPerformanceRoutingModule } from './generating-set-performance-routing.module';
import { GeneratingSetPerformanceComponent } from './generating-set-performance.component';
import { GeneratingSetCardComponent } from './generating-set-card/generating-set-card.component';
import { GeneratingSetChartComponent } from './generating-set-chart/generating-set-chart.component';
import { ChartModule } from 'angular2-chartjs';


@NgModule({
  declarations: [
    GeneratingSetPerformanceComponent,
    GeneratingSetCardComponent,
    GeneratingSetChartComponent
  ],
  imports: [
    CommonModule,
    GeneratingSetPerformanceRoutingModule,
    NbCardModule,
    ChartModule
  ]
})
export class GeneratingSetPerformanceModule { }
