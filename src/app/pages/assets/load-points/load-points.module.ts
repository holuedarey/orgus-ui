import { LoadPointsComponent } from './load-points.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadPointsRoutingModule } from './load-points-routing.module';
import { LoadPointFormComponent } from './load-point-form/load-point-form.component';


@NgModule({
  declarations: [
    LoadPointsComponent,
    LoadPointFormComponent,
  ],
  imports: [
    CommonModule,
    LoadPointsRoutingModule
  ]
})
export class LoadPointsModule { }
