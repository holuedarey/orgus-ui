import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { ThemeModule } from 'src/app/shared/@theme/theme.module';
import { LottieModule } from 'ngx-lottie';


@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    ThemeModule,
    LottieModule
  ]
})
export class LandingModule { }
