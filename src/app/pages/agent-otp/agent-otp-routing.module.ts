import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentOtpComponent } from './agent-otp.component';

const routes: Routes = [
  {
    path: '',
    component: AgentOtpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentOtpRoutingModule { }
