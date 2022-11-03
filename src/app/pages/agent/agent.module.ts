import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LottieModule } from 'ngx-lottie';
import { NbAlertModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbSpinnerModule } from '@nebular/theme';
import { AgentRoutingModule } from './agent-routing.module';
import { AgentComponent } from './agent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [AgentComponent],
  imports: [
    CommonModule,
    AgentRoutingModule,
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
export class AgentModule { }
