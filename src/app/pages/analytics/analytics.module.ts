import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsBlockComponent } from './analytics-shared/analytics-block/analytics-block.component';
import { AnalyticsConfigFormComponent } from './analytics-shared/analytics-config-form/analytics-config-form.component';
import { ChartsModule } from 'src/app/@charts/chart.module';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { MapsModule } from 'src/app/@maps/maps.module';
import { TablesModule } from 'src/app/@tables/tables.module';
import { NbCalendarRangeModule, NbDatepickerModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';


@NgModule({
  declarations: [AnalyticsBlockComponent, AnalyticsConfigFormComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    ChartsModule,
    ThemeModule,
    MapsModule,
    TablesModule,
    NbSelectModule,
    NbDatepickerModule,
    NbSpinnerModule
  ],
  exports: [
    AnalyticsBlockComponent, AnalyticsConfigFormComponent
  ]
})
export class AnalyticsModule { }
