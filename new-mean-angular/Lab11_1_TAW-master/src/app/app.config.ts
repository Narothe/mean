import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {authInterceptor} from "./services/auth/auth.interceptor";
import {importProvidersFrom} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(withFetch()),
    importProvidersFrom(BrowserAnimationsModule, ToastModule),
    MessageService
  ]
};
