import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { HasPasswordResetTokenGuard } from 'src/app/@core/guards/has-password-reset-token.guard';
import { AuthResourcesNavMap, AuthResources } from './auth-resources';

import { LoginComponent } from './login/login.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdatePinComponent } from './update-pin/update-pin.component';

const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        redirectTo: AuthResourcesNavMap.get(AuthResources.LoginView)?.path
      },
      {
        path: AuthResourcesNavMap.get(AuthResources.LoginView)?.path,
        component: LoginComponent
      },
      {
        path: AuthResourcesNavMap.get(AuthResources.RequestPasswordView)?.path,
        component: RequestPasswordComponent,
      },
      {
        path: AuthResourcesNavMap.get(AuthResources.ResetPasswordView)?.path,
        component: ResetPasswordComponent,
        // canActivate: [HasPasswordResetTokenGuard]
      },
      {
        path: AuthResourcesNavMap.get(AuthResources.NewPasswordView)?.path,
        component: ResetPasswordComponent,
        // canActivate: [HasPasswordResetTokenGuard],
        data: { isNewPassword: true }
      },
      {
        path: AuthResourcesNavMap.get(AuthResources.UpdatePasswordView)?.path,
        component: UpdatePasswordComponent,
      },
      {
        path: AuthResourcesNavMap.get(AuthResources.UpdatePinView)?.path,
        component: UpdatePinComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
