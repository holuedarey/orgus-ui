import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceHeaderCardComponent } from './performance-header-card.component';
import { ThemeModule } from 'src/app/@theme/theme.module';

@NgModule({
  declarations: [PerformanceHeaderCardComponent],
  imports: [
    CommonModule,
    ThemeModule,
  ]
})
export class PerformanceHeaderCardModule { }
