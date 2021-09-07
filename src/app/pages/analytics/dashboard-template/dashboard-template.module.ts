import { TablesModule } from './../../../@tables/tables.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardTemplateComponent } from './dashboard-template.component';
import { NbAccordionModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbThemeModule, NbToggleModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'src/app/@charts/chart.module';
import { MapsModule } from 'src/app/@maps/maps.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [DashboardTemplateComponent],
  imports: [
    CommonModule,
    NbAutocompleteModule,
    NbButtonModule,
    NbCardModule,
    NbDialogModule,
    NbFormFieldModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    NbThemeModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NbAccordionModule,
    NbToggleModule,
    MapsModule,
    TablesModule,
    RouterModule
  ],
  exports:[DashboardTemplateComponent]
})
export class DashboardTemplateModule { }
