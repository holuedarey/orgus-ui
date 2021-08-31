import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadPointPerformanceComponent } from './load-point-performance.component';

const routes: Routes = [
  {
    path: '',
    component: LoadPointPerformanceComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadPointPerformanceRoutingModule { }
