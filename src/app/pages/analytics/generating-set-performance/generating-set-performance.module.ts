import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratingSetPerformanceRoutingModule } from './generating-set-performance-routing.module';
import { GeneratingSetPerformanceComponent } from './generating-set-performance.component';
import { DashboardTemplateModule } from '../dashboard-template/dashboard-template.module';


@NgModule({
  declarations: [
    GeneratingSetPerformanceComponent,
  ],
  imports: [
    CommonModule,
    GeneratingSetPerformanceRoutingModule,
    DashboardTemplateModule
  ]
})
export class GeneratingSetPerformanceModule { }
