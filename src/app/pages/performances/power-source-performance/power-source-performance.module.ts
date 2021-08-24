import { NbThemeModule, NbCardModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerSourcePerformanceRoutingModule } from './power-source-performance-routing.module';
import { PowerSourcePerformanceComponent } from './power-source-performance.component';
import { PowerSourcePerformanceCardComponent } from './power-source-performance-card/power-source-performance-card.component';
import { ChartModule } from 'angular2-chartjs';
import { PowerSourcePerformanceChartComponent } from './power-source-performance-chart/power-source-performance-chart.component';
import { PerformanceHeaderCardComponent } from '../performance-header-card/performance-header-card.component';


@NgModule({
  declarations: [
    PowerSourcePerformanceComponent,
    PowerSourcePerformanceCardComponent,
    PowerSourcePerformanceChartComponent,
    PerformanceHeaderCardComponent
  ],
  imports: [
    CommonModule,
    PowerSourcePerformanceRoutingModule,
    NbThemeModule,
    NbCardModule,
    ChartModule
  ]
})
export class PowerSourcePerformanceModule { }
