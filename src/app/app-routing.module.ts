import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
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
  },
  {
    path: AppPermissions.get(AppPermissionID.App)?.path,
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
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
