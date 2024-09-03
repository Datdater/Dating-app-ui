import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";
import {jwtInterceptor} from "./interceptors/jwt.interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import {loadingInterceptor} from "./interceptors/loading.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([jwtInterceptor, loadingInterceptor])),
    provideAnimations(),
    provideToastr(
      { timeOut: 10000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,}
    ),
    importProvidersFrom(NgxSpinnerModule)
  ]
};
