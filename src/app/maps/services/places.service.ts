import { Injectable, inject } from '@angular/core';

import { DirectionsApiClient, PlacesApiClient } from '../api';
import { Feature, SearchResponse } from '../interfaces/search-response.interface';
import { DirectionsResponse } from '../interfaces/directions-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private placesApi = inject(PlacesApiClient);
  private directionsApi = inject(DirectionsApiClient);

  public userLocation?: [number, number];

  public get isUserLocationReady(): boolean {
    // doble negacion, la primera es si es undefined o null, la segunda es para que devuelva true cuando tiene valor
    return !!this.userLocation;
  }

  public places: Feature[] = [];

  public isLoadingPlaces: boolean = false;

  public selectedPlaceId: string = '';


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

  public getPlacesNearby(query: string, onSuscribe: Function, limit: number = 5, language: string ='es'): void {
    if (!query || query === '') {
      this.places = [];
      this.isLoadingPlaces = false;
      this.selectedPlaceId = '';
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
        onSuscribe();
      });
  }

  public getDirections(destination: [number, number], onSuscribe: Function) {
    if (!this.isUserLocationReady) throw new Error('User location not available');

    const [lng, lat] = this.userLocation!;
    const url = `/${lng},${lat};${destination[0]},${destination[1]}`;

    return this.directionsApi.get<DirectionsResponse>(encodeURI(url))
      .subscribe((response) => {
        if (response.routes.length === 0) {
          onSuscribe([]);
        } else {
          console.log(response.routes);

          const shortestRouteIndex = response.routes.reduce((minIndex, route, index, routes) => {
            return route.duration > routes[minIndex].duration ? index : minIndex;
          }, 0);

          console.log(shortestRouteIndex);

          onSuscribe(response.routes[shortestRouteIndex].geometry.coordinates);
        }
      });
  }

  public removePlaces(coords: [number, number]) {
    if (!this.isUserLocationReady) throw new Error('User location not available');

    this.places = [];
    // this.places = this.places.filter((place) => {
    //   return (place.geometry.coordinates[0] !== coords[0] && place.geometry.coordinates[1] !== coords[1])
    //          && (place.geometry.coordinates[0] !== this.userLocation![0] && place.geometry.coordinates[1] !== this.userLocation![1]);
    // });
  }
}
