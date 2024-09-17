import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];

  public get isUserLocationReady(): boolean {
    // doble negacion, la primera es si es undefined o null, la segunda es para que devuelva true cuando tiene valor
    return !!this.userLocation;
  }

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
}
