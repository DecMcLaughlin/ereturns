import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode, importProvidersFrom
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {TranslocoHttpLoader} from './transloco-loader';
import {provideTransloco} from '@jsverse/transloco';
import {AuthInterceptor} from 'src/app/interceptors/auth.interceptor';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/material';

import { DragDropModule } from 'primeng/dragdrop';

export const appConfig: ApplicationConfig = {
  providers: [

    importProvidersFrom(
      DragDropModule
    ),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
   provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    provideTransloco({
      config: {
        availableLangs: ['en', 'es'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    })
  ]
};
