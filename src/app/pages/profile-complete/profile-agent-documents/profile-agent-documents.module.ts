import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LottieModule } from 'ngx-lottie';
import { NbAlertModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AgentDocumentsRoutingModule } from './profile-agent-documents-routing.module';
import { AgentDocumentsComponent } from './profile-agent-documents.component';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [AgentDocumentsComponent],
  imports: [
    CommonModule,
    AgentDocumentsRoutingModule,
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
    NgxDropzoneModule
  ]
})
export class AgentDocumentsModule { }
