import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map | undefined;

  get isMapReady() {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike, zoom: number = 16) {
    if (!this.isMapReady) throw new Error('Map not ready');

    this.map?.flyTo({ center: coords, zoom });
  }

  constructor() { }
}
