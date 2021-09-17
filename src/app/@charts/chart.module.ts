import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { ThemeModule } from '../@theme/theme.module';
import { ChartModule } from 'angular2-chartjs';
import { DoughnutComponent } from './chart-components/doughnut-chart/doughnut-chart.component';
import { LinechartComponent } from './chart-components/line-chart/line-chart.component';
import { PiechartComponent } from './chart-components/pie-chart/pie-chart.component';


@NgModule({
  declarations: [ChartComponent, DoughnutComponent, LinechartComponent, PiechartComponent],
  imports: [
    CommonModule,
    ThemeModule,
    ChartModule
  ],
  exports: [ChartComponent]
})
export class ChartsModule { }
