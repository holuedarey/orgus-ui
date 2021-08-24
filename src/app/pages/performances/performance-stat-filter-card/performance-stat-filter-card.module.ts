import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceStatFilterCardComponent } from './performance-stat-filter-card.component';
import {  NbAutocompleteModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule, NbThemeModule, NbToggleModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PerformanceStatFilterCardComponent],
  imports: [
    CommonModule,
    NbAutocompleteModule, 
    NbButtonModule, 
    NbCardModule, 
    NbDatepickerModule, 
    NbDialogModule, 
    NbFormFieldModule,
     NbIconModule, 
     NbInputModule, 
     NbSelectModule, 
     NbThemeModule,
     FormsModule,
     ReactiveFormsModule

  ],
  exports:[PerformanceStatFilterCardComponent]
})
export class PerformanceStatFilterCardModule { }
