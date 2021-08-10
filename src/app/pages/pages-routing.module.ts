import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasPermissionGuard } from '../@core/guards/has-permission.guard';
import { PagesResources, PagesResourcesNavMap } from './pages-resources';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivateChild: [HasPermissionGuard],
    children: [
      {
        path: '',
        redirectTo: PagesResourcesNavMap.get(PagesResources.DashboardView)?.path
      },
      {
        path: PagesResourcesNavMap.get(PagesResources.DashboardView)?.path,
        loadChildren: () => import('./dashboard/dashboard.module')
          .then(m => m.DashboardModule),
      },
      {
        path: PagesResourcesNavMap.get(PagesResources.UsersView)?.path,
        loadChildren: () => import('./users/users.module')
          .then(m => m.UsersModule),
      },
      {
        path: PagesResourcesNavMap.get(PagesResources.ClientsView)?.path,
        loadChildren: () => import('./clients/clients.module')
          .then(m => m.ClientsModule),
      },
      {
        path: PagesResourcesNavMap.get(PagesResources.AssetsView)?.path,
        children: [
          {
            path: '',
            redirectTo: PagesResourcesNavMap.get(PagesResources.MetersView)?.path,
          },
          {
            path: PagesResourcesNavMap.get(PagesResources.MetersView)?.path,
            loadChildren: () => import('./assets/meters/meters.module')
              .then(m => m.MetersModule),
          },
          {
            path: PagesResourcesNavMap.get(PagesResources.LoadPointsView)?.path,
            loadChildren: () => import('./assets/load-points/load-points.module')
              .then(m => m.LoadPointsModule),
          },
          {
            path: PagesResourcesNavMap.get(PagesResources.PowerSourcesView)?.path,
            loadChildren: () => import('./assets/power-sources/power-sources.module')
              .then(m => m.PowerSourcesModule),
          },
          {
            path: PagesResourcesNavMap.get(PagesResources.GeneratingSetView)?.path,
            loadChildren: () => import('./assets/generating-set/generating-set.module')
              .then(m => m.GeneratingSetModule),
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
