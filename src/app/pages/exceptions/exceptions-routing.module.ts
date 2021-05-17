import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExceptionPermissionID, ExceptionPermissions } from './exceptions-permissions';
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
        redirectTo: ExceptionPermissions.get(ExceptionPermissionID.PageNotFound)?.path
      },
      {
        path: ExceptionPermissions.get(ExceptionPermissionID.UserIdle)?.path,
        component: UserIdleComponent
      },
      {
        path: ExceptionPermissions.get(ExceptionPermissionID.Unauthorised)?.path,
        component: UnauthorisedComponent
      },
      {
        path: ExceptionPermissions.get(ExceptionPermissionID.PageNotFound)?.path,
        component: PageNotFoundComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: ExceptionPermissions.get(ExceptionPermissionID.PageNotFound)?.path
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionsRoutingModule { }
