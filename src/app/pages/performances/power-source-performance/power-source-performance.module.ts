import { NbThemeModule, NbCardModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerSourcePerformanceRoutingModule } from './power-source-performance-routing.module';
import { PowerSourcePerformanceComponent } from './power-source-performance.component';
import { PowerSourcePerformanceCardComponent } from './power-source-performance-card/power-source-performance-card.component';
import { ChartModule } from 'angular2-chartjs';


@NgModule({
  declarations: [
    PowerSourcePerformanceComponent,
    PowerSourcePerformanceCardComponent
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
