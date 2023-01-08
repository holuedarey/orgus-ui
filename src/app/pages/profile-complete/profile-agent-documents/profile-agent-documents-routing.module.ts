import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentDocumentsComponent } from './profile-agent-documents.component';

const routes: Routes = [
  {
    path: '',
    component: AgentDocumentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentDocumentsRoutingModule { }
