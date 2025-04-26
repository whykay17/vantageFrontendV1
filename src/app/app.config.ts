import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AuthInterceptor } from './auth.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    importProvidersFrom(
      NgxSpinnerModule,
      BrowserAnimationsModule
    ),
    provideAnimations(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                  darkModeSelector: '.my-app-dark'
              }
            }
        })
  ]
};
