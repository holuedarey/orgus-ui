import { LoadPointManagementsComponent } from './load-point-managements.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {  path: '',
  component: LoadPointManagementsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadPointManagementsRoutingModule { }
