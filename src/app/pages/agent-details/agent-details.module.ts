import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LottieModule } from 'ngx-lottie';
import { NbAlertModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AgentDetailsComponent } from './agent-details.component';
import { AgentDetailsRoutingModule } from './agent-details-routing.module';


@NgModule({
  declarations: [AgentDetailsComponent],
  imports: [
    CommonModule,
    AgentDetailsRoutingModule,
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
    NbEvaIconsModule,
    NbDatepickerModule.forRoot(),
    
  ]
})
export class AgentDetailsModule { }
