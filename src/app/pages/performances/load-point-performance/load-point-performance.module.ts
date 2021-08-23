import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadPointPerformanceRoutingModule } from './load-point-performance-routing.module';
import { NbAccordionModule, NbAlertModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule, NbThemeModule, NbToggleModule } from '@nebular/theme';
import { ChartModule } from 'src/app/@charts/chart.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadPointPerformanceComponent } from './load-point-performance.component';
import { PerformanceHeaderCardComponent } from '../performance-header-card/performance-header-card.component';


@NgModule({
  declarations: [LoadPointPerformanceComponent, PerformanceHeaderCardComponent],
  imports: [
    CommonModule,
    LoadPointPerformanceRoutingModule,
    NbCardModule,
    ChartModule,
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

  ]
})
export class LoadPointPerformanceModule { }
