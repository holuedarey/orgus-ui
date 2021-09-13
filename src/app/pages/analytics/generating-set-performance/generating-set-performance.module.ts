import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratingSetPerformanceRoutingModule } from './generating-set-performance-routing.module';
import { GeneratingSetPerformanceComponent } from './generating-set-performance.component';


@NgModule({
  declarations: [
    GeneratingSetPerformanceComponent,
  ],
  imports: [
    CommonModule,
    GeneratingSetPerformanceRoutingModule,
  ]
})
export class GeneratingSetPerformanceModule { }
