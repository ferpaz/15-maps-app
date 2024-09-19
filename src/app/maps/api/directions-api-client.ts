import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectionsApiClient extends HttpClient {

  private baseUrl: string = 'https://api.mapbox.com/directions/v5/mapbox/driving';

  constructor( handler: HttpHandler ) {
    super(handler);
  }

  public override get<T>(url: string): Observable<T> {
    url = this.baseUrl + url;

    return super.get<T>(url, {
      params: {
        alternatives: true,
        geometries: 'geojson',
        language: 'es',
        overview: 'simplified',
        steps: false,
        access_token: environment.mapbox.accessToken,
      }
    });
  }
}
