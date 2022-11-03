import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LottieModule } from 'ngx-lottie';
import { NbAlertModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AgentOtpRoutingModule } from './agent-otp-routing.module';
import { AgentOtpComponent } from './agent-otp.component';


@NgModule({
  declarations: [AgentOtpComponent],
  imports: [
    CommonModule,
    AgentOtpRoutingModule,
    LottieModule,
    NbLayoutModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbSpinnerModule,
    NbCardModule,
    NbIconModule,
    NbAlertModule,
    NbEvaIconsModule
  ]
})
export class AgentOtpModule { }
