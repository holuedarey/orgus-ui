import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  NbDialogModule,
  NbLayoutDirection,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
  NbWindowModule
} from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { DEFAULT_THEME } from './@theme/styles/theme.default';
import { DARK_THEME } from './@theme/styles/theme.dark';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    // Nebular Modules
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbSidebarModule.forRoot(),
    // Theming
    NbThemeModule.forRoot(
      { name: 'default' },
      [DEFAULT_THEME, DARK_THEME],
      undefined,
      NbLayoutDirection.LTR),
      ThemeModule,
    // Global Imports
    CoreModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
