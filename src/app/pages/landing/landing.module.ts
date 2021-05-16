import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { LottieModule } from 'ngx-lottie';
import { ThemeModule } from 'src/app/@theme/theme.module';


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
