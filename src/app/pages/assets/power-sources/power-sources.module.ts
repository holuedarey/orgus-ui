import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerSourcesRoutingModule } from './power-sources-routing.module';
import { PowerSourceFormComponent } from './power-source-form/power-source-form.component';
import { PowerSourcesComponent } from './power-sources.component';


@NgModule({
  declarations: [
    PowerSourceFormComponent,
    PowerSourcesComponent
  ],
  imports: [
    CommonModule,
    PowerSourcesRoutingModule
  ]
})
export class PowerSourcesModule { }
