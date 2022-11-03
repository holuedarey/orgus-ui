import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { HasPermissionGuard } from './@core/guards/has-permission.guard';
import { IsAuthenticatedGuard } from './@core/guards/is-authenticated.guard';
import { ShowLandingGuard } from './@core/guards/show-landing.guard';
import { AppResources, AppResourcesNavMap } from './app-resources';

const routes: Routes = [
  {
    path: AppResourcesNavMap.get(AppResources.LandingView)?.path,
    loadChildren: () => import('./pages/landing/landing.module')
      .then(m => m.LandingModule),
    canActivate: [ShowLandingGuard]
  },
  {
    path: AppResourcesNavMap.get(AppResources.AgentView)?.path,
    loadChildren: () => import('./pages/agent/agent.module')
      .then(m => m.AgentModule),
    canActivate: [ShowLandingGuard]
  },
  {
    path: AppResourcesNavMap.get(AppResources.AgentOtpView)?.path,
    loadChildren: () => import('./pages/agent-otp/agent-otp.module')
      .then(m => m.AgentOtpModule),
    canActivate: [ShowLandingGuard]
  },
  {
    path: AppResourcesNavMap.get(AppResources.AgentDetailsView)?.path,
    loadChildren: () => import('./pages/agent-details/agent-details.module')
      .then(m => m.AgentDetailsModule),
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: AppResourcesNavMap.get(AppResources.AgentDocumentsView)?.path,
    loadChildren: () => import('./pages/agent-documents/agent-documents.module')
      .then(m => m.AgentDocumentsModule),
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: AppResourcesNavMap.get(AppResources.AuthView)?.path,
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    canActivate: [HasPermissionGuard],
    canActivateChild: [HasPermissionGuard],
  },
  {
    path: AppResourcesNavMap.get(AppResources.AppView)?.path,
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
    canActivate: [
      // HasPermissionGuard,
      IsAuthenticatedGuard
    ],
    canActivateChild: [
      // HasPermissionGuard,
      IsAuthenticatedGuard
    ],
  },
  {
    path: AppResourcesNavMap.get(AppResources.ErrorView)?.path,
    loadChildren: () => import('./pages/exceptions/exceptions.module')
      .then(m => m.ExceptionsModule),
  },
  {
    path: '**',
    redirectTo: AppResourcesNavMap.get(AppResources.ErrorView)?.path,
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
