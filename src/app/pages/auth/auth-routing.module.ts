import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { HasPasswordResetTokenGuard } from 'src/app/@core/guards/has-password-reset-token.guard';
import { AuthPermissions, AuthPermissionID } from './auth-permissions';

import { LoginComponent } from './login/login.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        redirectTo: AuthPermissions.get(AuthPermissionID.Login)?.path
      },
      {
        path: AuthPermissions.get(AuthPermissionID.Login)?.path,
        component: LoginComponent
      },
      {
        path: AuthPermissions.get(AuthPermissionID.RequestPassword)?.path,
        component: RequestPasswordComponent,
      },
      {
        path: AuthPermissions.get(AuthPermissionID.ResetPassword)?.path,
        component: ResetPasswordComponent,
        canActivate: [HasPasswordResetTokenGuard]
      },
      {
        path: AuthPermissions.get(AuthPermissionID.UpdatePassword)?.path,
        component: UpdatePasswordComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
