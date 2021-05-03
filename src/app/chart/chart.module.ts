import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { ThemeModule } from '../shared/@theme/theme.module';
import { ChartiComponent } from './chart-components/charti/charti.component';
import { ChartiiComponent } from './chart-components/chartii/chartii.component';



@NgModule({
  declarations: [ChartComponent, ChartiComponent, ChartiiComponent],
  imports: [
    CommonModule,
    ThemeModule
  ],
  exports: [ChartComponent]
})
export class ChartModule { }
