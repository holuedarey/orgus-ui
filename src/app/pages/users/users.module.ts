import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NbButtonModule, NbDialogModule, NbInputModule, NbCardModule, NbFormFieldModule, NbSpinnerModule, NbIconModule, NbAlertModule, NbOptionModule, NbSelectModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserFormComponent } from './user-form/user-form.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NbButtonModule,
    NbDialogModule,
    NbInputModule,
    NbCardModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    NbSpinnerModule,
    NbIconModule,
    NbAlertModule,
    //NbOptionModule,
    NbSelectModule
  ],
})
export class UsersModule { }
