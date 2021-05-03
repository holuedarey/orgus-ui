import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvalidDeviceComponent } from './invalid-device/invalid-device.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnauthorisedComponent } from './unauthorised/unauthorised.component';
import { UserIdleComponent } from './user-idle/user-idle.component';

const routes: Routes = [
  {
    path: 'user-idle',
    component: UserIdleComponent
  },
  {
    path: 'unauthorised',
    component: UnauthorisedComponent
  },
  {
    path: 'invalid-device',
    component: InvalidDeviceComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionsRoutingModule { }
