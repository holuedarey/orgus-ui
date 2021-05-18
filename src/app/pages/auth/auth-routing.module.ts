import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { HasPasswordResetTokenGuard } from 'src/app/@core/guards/has-password-reset-token.guard';
import { AuthResourcesNavMap, AuthViewResources } from './auth-resources';

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
        redirectTo: AuthResourcesNavMap.get(AuthViewResources.Login)?.path
      },
      {
        path: AuthResourcesNavMap.get(AuthViewResources.Login)?.path,
        component: LoginComponent
      },
      {
        path: AuthResourcesNavMap.get(AuthViewResources.RequestPassword)?.path,
        component: RequestPasswordComponent,
      },
      {
        path: AuthResourcesNavMap.get(AuthViewResources.ResetPassword)?.path,
        component: ResetPasswordComponent,
        canActivate: [HasPasswordResetTokenGuard]
      },
      {
        path: AuthResourcesNavMap.get(AuthViewResources.UpdatePassword)?.path,
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
