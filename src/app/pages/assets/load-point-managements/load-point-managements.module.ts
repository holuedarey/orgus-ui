import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadPointManagementsRoutingModule } from '../load-point-managements/load-points-management-routing.module';
import { LoadPointManagementsComponent } from './load-point-managements.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAccordionModule, NbAlertModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule, NbThemeModule, NbToggleModule } from '@nebular/theme';
// import { DashboardHeaderCardComponent } from './assets/dashboard-header-card/dashboard-header-card.component';



@NgModule({
  declarations: [LoadPointManagementsComponent],
  imports: [
    CommonModule,
    LoadPointManagementsRoutingModule,
    NbDialogModule,
    NbAccordionModule,
    NbCardModule,
    NbIconModule,
    NbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbSpinnerModule,
    NbButtonModule,
    NbSelectModule,
    NbFormFieldModule,
    NbThemeModule,
    NbAutocompleteModule,
    NbThemeModule,
    NbToggleModule,
  ]
})
export class LoadPointManagementsModule { }
