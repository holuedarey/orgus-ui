import { TablesModule } from 'src/app/@tables/tables.module';
import { NbDialogModule, NbIconModule, NbSpinnerModule, NbCardModule, NbAlertModule, NbInputModule, NbButtonModule, NbSelectModule, NbFormFieldModule, NbThemeModule, NbAutocompleteModule, NbToggleModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerSourcesRoutingModule } from './power-sources-routing.module';
import { PowerSourceFormComponent } from './power-source-form/power-source-form.component';
import { PowerSourcesComponent } from './power-sources.component';
import { PowerSourceGisComponent } from './power-source-gis/power-source-gis.component';
import { PowerSourceStatusToggleComponent } from './power-source-status-toggle/power-source-status-toggle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PowerSourceFormComponent,
    PowerSourcesComponent,
    PowerSourceGisComponent,
    PowerSourceStatusToggleComponent
  ],
  imports: [
    CommonModule,
    PowerSourcesRoutingModule,
    NbIconModule,
    NbSpinnerModule,
    CommonModule,
    TablesModule,
    NbDialogModule,
    NbCardModule,
    NbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbFormFieldModule,
    NbThemeModule,
    NbAutocompleteModule,
    NbThemeModule,
    NbToggleModule,
  ]
})
export class PowerSourcesModule { }
