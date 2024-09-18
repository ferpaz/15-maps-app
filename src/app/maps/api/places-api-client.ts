import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesApiClient extends HttpClient {

  private baseUrl: string = 'https://api.mapbox.com/search/geocode/v6';

  constructor( handler: HttpHandler ) {
    super(handler);
  }

  public override get<T>(url: string = '', options: {
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
  }): Observable<T> {
    url = this.baseUrl + url;

    return super.get<T>(url, {
      params: {
        limit: 5,
        language: 'es',
        access_token: environment.mapbox.accessToken,
        ...options.params
      }
    });
  }
}
