import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetTypeEnum } from '../@core/enums/asset-type.enum';
import { HasPermissionGuard } from '../@core/guards/has-permission.guard';
import { PagesResources, PagesResourcesNavMap } from './pages-resources';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    // canActivateChild: [HasPermissionGuard],
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
        path: PagesResourcesNavMap.get(PagesResources.AnalyticsModuleView)?.path,
        children: [
          {
            path: '',
            redirectTo: PagesResourcesNavMap.get(PagesResources.LoadPointAnalyticsView)?.path,
          },

          {
            path: PagesResourcesNavMap.get(PagesResources.LoadPointAnalyticsView)?.path,
            data: { assetType: AssetTypeEnum.LOADPOINT },
            loadChildren: () => import('./analytics/load-point-analytics/load-point-analytics.module')
              .then(m => m.LoadPointAnalyticsModule),
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
