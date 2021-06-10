import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NbCardModule, NbSpinnerModule } from '@nebular/theme';
import { SortablejsModule } from 'ngx-sortablejs';
import { ChartModule } from 'src/app/@charts/chart.module';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { TablesModule } from 'src/app/@tables/tables.module';
import { MapsModule } from 'src/app/@maps/maps.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NbCardModule,
    SortablejsModule,
    ThemeModule,
    ChartModule,
    TablesModule,
    NbSpinnerModule,
    MapsModule
  ]
})
export class DashboardModule { }
