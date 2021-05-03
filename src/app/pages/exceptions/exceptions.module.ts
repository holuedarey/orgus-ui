import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExceptionsRoutingModule } from './exceptions-routing.module';
import { UnauthorisedComponent } from './unauthorised/unauthorised.component';
import { UserIdleComponent } from './user-idle/user-idle.component';
import { InvalidDeviceComponent } from './invalid-device/invalid-device.component';
import { NbLayoutModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { LottieModule } from 'ngx-lottie';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [UnauthorisedComponent, UserIdleComponent, InvalidDeviceComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    ExceptionsRoutingModule,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    LottieModule
  ]
})
export class ExceptionsModule { }
