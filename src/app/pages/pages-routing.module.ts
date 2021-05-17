import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasPermissionGuard } from '../@core/guards/has-permission.guard';
import { PagesPermissionID, PagesPermissions } from './pages-permissions';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    // canActivateChild: [HasPermissionGuard],
    children: [
      {
        path: '',
        redirectTo: PagesPermissions.get(PagesPermissionID.Dashboard)?.path
      },
      {
        path: PagesPermissions.get(PagesPermissionID.Dashboard)?.path,
        loadChildren: () => import('./dashboard/dashboard.module')
          .then(m => m.DashboardModule),
      },
      {
        path: PagesPermissions.get(PagesPermissionID.Other)?.path,
        loadChildren: () => import('./other/other.module')
          .then(m => m.OtherModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
