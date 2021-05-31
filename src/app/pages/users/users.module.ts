import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NbButtonModule, NbDialogModule, NbInputModule, NbCardModule, NbFormFieldModule, NbSpinnerModule, NbIconModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { CreateUsersComponent } from './create-users/create-users.component';


@NgModule({
  declarations: [
    UsersComponent,
    CreateUsersComponent
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
  ],
})
export class UsersModule { }
