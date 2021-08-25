import { PerformanceStatFilterCardModule } from './../performance-stat-filter-card/performance-stat-filter-card.module';
import { NbCardModule, NbButtonModule, NbIconModule, NbFormFieldModule, NbInputModule, NbSelectModule, NbSpinnerModule, NbThemeModule, NbToggleModule, NbAutocompleteModule, NbAlertModule, NbAccordionModule, NbDatepickerModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratingSetPerformanceRoutingModule } from './generating-set-performance-routing.module';
import { GeneratingSetPerformanceComponent } from './generating-set-performance.component';
import { GeneratingSetCardComponent } from './generating-set-card/generating-set-card.component';
import { GeneratingSetChartComponent } from './generating-set-chart/generating-set-chart.component';
import { PerformanceHeaderCardModule } from '../performance-header-card/performance-header-card.module';
import { ChartsModule } from 'src/app/@charts/chart.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GeneratingSetPerformanceComponent,
  ],
  imports: [
    CommonModule,
    GeneratingSetPerformanceRoutingModule,
    NbCardModule,
    ChartsModule,
    PerformanceHeaderCardModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbIconModule,
    NbFormFieldModule,
    NbInputModule, 
    NbSelectModule, 
    NbSpinnerModule, 
    NbThemeModule, 
    NbToggleModule,
    NbAutocompleteModule,
    NbAlertModule,
    NbAccordionModule,
    NbDatepickerModule.forRoot(),
    ChartsModule,
    PerformanceHeaderCardModule,
    PerformanceStatFilterCardModule
  ]
})
export class GeneratingSetPerformanceModule { }
