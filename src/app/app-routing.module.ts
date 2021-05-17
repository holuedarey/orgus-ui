import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { HasPermissionGuard } from './@core/guards/has-permission.guard';
import { AppPermissionID, AppPermissions } from './app-permissions';

const routes: Routes = [
  {
    path: AppPermissions.get(AppPermissionID.Landing)?.path,
    loadChildren: () => import('./pages/landing/landing.module')
      .then(m => m.LandingModule),
  },
  {
    path: AppPermissions.get(AppPermissionID.Auth)?.path,
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    canActivate: [HasPermissionGuard],
    canActivateChild: [HasPermissionGuard],
  },
  {
    path: AppPermissions.get(AppPermissionID.App)?.path,
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
    canActivate: [HasPermissionGuard],
    canActivateChild: [HasPermissionGuard],
  },
  {
    path: AppPermissions.get(AppPermissionID.Error)?.path,
    loadChildren: () => import('./pages/exceptions/exceptions.module')
      .then(m => m.ExceptionsModule),
  },
  {
    path: '**',
    redirectTo: AppPermissions.get(AppPermissionID.Error)?.path,
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
