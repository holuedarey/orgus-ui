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
      {
        path: PagesResourcesNavMap.get(PagesResources.TariffModuleView)?.path,
        children: [
          {
            path: '',
            redirectTo: PagesResourcesNavMap.get(PagesResources.TariffView)?.path,
          },
          {
            path: PagesResourcesNavMap.get(PagesResources.TariffView)?.path,
            loadChildren: () => import('./tariff-management/tariff/tariff.module')
              .then(m => m.TariffModule),
          },
          {
            path: PagesResourcesNavMap.get(PagesResources.ServiceBandView)?.path,
            loadChildren: () => import('./tariff-management/service-band/service-band.module')
              .then(m => m.ServiceBandModule),
          },
        ]
      },
      {
        path: PagesResourcesNavMap.get(PagesResources.PerformanceModuleView)?.path,
        children: [
          {
            path: '',
            redirectTo: PagesResourcesNavMap.get(PagesResources.PowerSourcePerformanceView)?.path,
          },
          {
            path: PagesResourcesNavMap.get(PagesResources.PowerSourcePerformanceView)?.path,
            loadChildren: () => import('./performances/power-source-performance/power-source-performance.module')
              .then(m => m.PowerSourcePerformanceModule),
          },
          {
            path: PagesResourcesNavMap.get(PagesResources.GeneratingSetPerformanceView)?.path,
            loadChildren: () => import('./performances/generating-set-performance/generating-set-performance.module')
              .then(m => m.GeneratingSetPerformanceModule),
          },
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
