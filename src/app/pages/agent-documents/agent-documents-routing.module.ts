import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentDetailsComponent } from './agent-details.component';
import { AgentDocumentsComponent } from './agent-documents.component';

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
