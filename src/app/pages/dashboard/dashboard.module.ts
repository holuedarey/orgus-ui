import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NbCardModule } from '@nebular/theme';
import { SortablejsModule } from 'ngx-sortablejs';
import { ChartModule } from 'src/app/@charts/chart.module';
import { ThemeModule } from 'src/app/@theme/theme.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NbCardModule,
    SortablejsModule,
    ThemeModule,
    ChartModule
  ]
})
export class DashboardModule { }
