import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import Mapboxgl from 'mapbox-gl';

import { environment } from '../environments/environment';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

Mapboxgl.accessToken = environment.mapbox.accessToken;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
