import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadPointPerformanceRoutingModule } from './load-point-performance-routing.module';
import { NbAccordionModule, NbAlertModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule, NbThemeModule, NbToggleModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadPointPerformanceComponent } from './load-point-performance.component';
import { DashboardTemplateModule } from '../dashboard-template/dashboard-template.module';
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
