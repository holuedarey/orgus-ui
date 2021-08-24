import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadPointPerformanceRoutingModule } from './load-point-performance-routing.module';
import { NbAccordionModule, NbAlertModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule, NbThemeModule, NbToggleModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadPointPerformanceComponent } from './load-point-performance.component';
import { ChartsModule } from 'src/app/@charts/chart.module';
import { PerformanceHeaderCardModule } from '../performance-header-card/performance-header-card.module';

@NgModule({
  declarations: [LoadPointPerformanceComponent],
  imports: [
    CommonModule,
    LoadPointPerformanceRoutingModule,
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
    PerformanceHeaderCardModule

  ]
})
export class LoadPointPerformanceModule { }
