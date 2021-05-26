import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbDialogModule, NbInputModule, NbCardModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { config } from 'rxjs';


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
    FormControl,
  ]
})
export class UsersModule { }
