import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { throwIfAlreadyLoaded } from './module-import-guard';

import { MockDataModule } from './data-services/mock-data.module';
import { LocalStorageKey } from './enums/local-storage-key.enum';

import * as SecureLS from 'secure-ls';
import { LottieModule } from 'ngx-lottie';
import player, { LottiePlayer } from 'lottie-web';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SortablejsModule } from 'ngx-sortablejs';

const ls = new SecureLS({ encodingType: 'aes' });

function playerFactory(): LottiePlayer {
  return player;
}

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole(): Observable<string> {
    // here you could provide any role based on any auth flow
    return of('guest');
  }
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  // Auth Module Providers
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: environment.apiUrl,
        token: {
          class: NbAuthJWTToken,
          key: 'jwt',
          getter: (requestType: string, response: HttpResponse<any>) => {
            ls.set(LocalStorageKey.REFRESH_TOKEN.toString(), response.body.data.refreshToken);
            return response.body.data.jwt;
          }
        },
        login: {
          endpoint: '/Auth/login',
          method: 'post',
          redirect: {
            success: 'argus',
            failure: null,
          },
        },
        refreshToken: {
          endpoint: '/Auth/refreshToken',
          method: 'post',
          redirect: {
            success: 'argus',
            failure: '/',
          },
        },
        requestPass: {
          endpoint: '/Auth/resetPasswordEmail',
          method: 'post',
          redirect: {
            success: null,
            failure: null,
          },
        },
        resetPass: {
          endpoint: '/Auth/resetNewPassword',
          method: 'post',
          redirect: {
            success: '/auth/login',
            failure: null,
          },
        },
      }),
    ],
    forms: {
      login: {
      },
      register: {
      },
    },
  }).providers,
  // Security Module Providers
  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,
  // Animation Module Providers
  LottieModule.forRoot({ player: playerFactory }).providers,
  // Translation Module Providers
  TranslateModule.forRoot({
    defaultLanguage: 'en',
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }).providers,
  // Role Auth Module Providers
  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
];

@NgModule({
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        allowedDomains: [
          environment.apiDomain,
        ],
        tokenGetter: () => {
          return ls.get(LocalStorageKey.JWT.toString()).token as string;
        }
      }
    }),
    SortablejsModule.forRoot({ animation: 150 }),
  ],
  exports: [
    NbAuthModule,
    LottieModule,
    TranslateModule
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
