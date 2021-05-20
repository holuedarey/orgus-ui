import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { HasPermissionGuard } from './@core/guards/has-permission.guard';
import { ShowLandingGuard } from './@core/guards/show-landing.guard';
import { AppResources, AppResourcesNavMap } from './app-resources';

const routes: Routes = [
  {
    path: AppResourcesNavMap.get(AppResources.Landing)?.path,
    loadChildren: () => import('./pages/landing/landing.module')
      .then(m => m.LandingModule),
    canActivate: [ShowLandingGuard]
  },
  {
    path: AppResourcesNavMap.get(AppResources.Auth)?.path,
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    canActivate: [HasPermissionGuard],
    canActivateChild: [HasPermissionGuard],
  },
  {
    path: AppResourcesNavMap.get(AppResources.App)?.path,
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
    canActivate: [HasPermissionGuard],
    canActivateChild: [HasPermissionGuard],
  },
  {
    path: AppResourcesNavMap.get(AppResources.Error)?.path,
    loadChildren: () => import('./pages/exceptions/exceptions.module')
      .then(m => m.ExceptionsModule),
  },
  {
    path: '**',
    redirectTo: AppResourcesNavMap.get(AppResources.Error)?.path,
  },
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy })
  ],
  exports: [
    QuicklinkModule,
    RouterModule,
  ]
})
export class AppRoutingModule { }
