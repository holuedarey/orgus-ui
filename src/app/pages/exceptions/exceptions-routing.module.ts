import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExceptionViewResources, ExceptionResourcesNavMap } from './exceptions-resources';
import { ExceptionsComponent } from './exceptions.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnauthorisedComponent } from './unauthorised/unauthorised.component';
import { UserIdleComponent } from './user-idle/user-idle.component';

const routes: Routes = [
  {
    path: '',
    component: ExceptionsComponent,
    children: [
      {
        path: '',
        redirectTo: ExceptionResourcesNavMap.get(ExceptionViewResources.PageNotFound)?.path
      },
      {
        path: ExceptionResourcesNavMap.get(ExceptionViewResources.UserIdle)?.path,
        component: UserIdleComponent
      },
      {
        path: ExceptionResourcesNavMap.get(ExceptionViewResources.Unauthorised)?.path,
        component: UnauthorisedComponent
      },
      {
        path: ExceptionResourcesNavMap.get(ExceptionViewResources.PageNotFound)?.path,
        component: PageNotFoundComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: ExceptionResourcesNavMap.get(ExceptionViewResources.PageNotFound)?.path
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionsRoutingModule { }
