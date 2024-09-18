import { Injectable, inject } from '@angular/core';

import { PlacesApiClient } from '../api/places-api-client';
import { Feature, SearchResponse } from '../interfaces/search-response.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private placesApi = inject(PlacesApiClient);

  public userLocation?: [number, number];

  public get isUserLocationReady(): boolean {
    // doble negacion, la primera es si es undefined o null, la segunda es para que devuelva true cuando tiene valor
    return !!this.userLocation;
  }

  public places: Feature[] = [];

  public isLoadingPlaces: boolean = false;


  constructor() {
    this.getUserLocation();
  }

  public getUserLocation(): Promise<[number, number]> {

    return new Promise((resolve, reject) => {
      // if (this.userLocation) {
      //   resolve(this.userLocation);
      // } else {
        navigator.geolocation.getCurrentPosition(
          ( { coords } ) => {
            this.userLocation = [coords.longitude, coords.latitude];
            resolve(this.userLocation);
          },
          (error) => {
            alert('No se pudo obtener la ubicación');
            console.log('Error getting location', error);
            reject(error);
          }
        );
      // }
    });

  }

  public getPlacesNearby(query: string = '', limit: number = 5, language: string ='es'): void {
    if (!query || query === '') {
      this.places = [];
    }

    if (!this.isUserLocationReady) throw new Error('User location not available');

    this.isLoadingPlaces = true;

    this.placesApi.get<SearchResponse>('/forward', {
      params: {
        q: query,
        limit,
        language,
        proximity: this.userLocation!.join(','),
      }
    })
      .subscribe((response) => {
        this.places = response.features;
        this.isLoadingPlaces = false;
      });
  }
}
