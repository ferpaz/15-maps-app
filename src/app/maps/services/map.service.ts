import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map | undefined;

  private markers: Marker[] = [];

  private directions: number[][] = [];

  get isMapReady() {
    return !!this.map;
  }

  createMap(element: HTMLElement, coords: LngLatLike, zoom: number = 16) {
    this.map = new Map({
      container: element,
      style: environment.mapbox.style,
      center: coords,
      zoom: zoom,
    });
  }

  flyTo(coords: LngLatLike, zoom: number = 16) {
    if (!this.isMapReady) throw new Error('Map not ready');

    this.map?.flyTo({ center: coords, zoom });
  }

  addMarker(coords: LngLatLike, title:string, description:string, color: string) {
    if (!this.isMapReady) throw new Error('Map not ready');

    const popup = new Popup()
    .setHTML(`
      <h6>${title}</h6>
      <span>${description}</span>
    `);

    const marker = new Marker({ color: color, })
      .setLngLat(coords)
      .setPopup(popup)
      .addTo(this.map!);

    this.markers.push(marker);

    if (this.markers.length == 1) {
      this.map!.flyTo({ center: this.markers[0].getLngLat() });
  } else {
      this.map!.fitBounds(this.getBounds(this.markers), { padding: 100 });
    }
  }

  removeMarkers() {
    if (!this.isMapReady) throw new Error('Map not ready');

    let index = 0;
    this.markers.forEach(marker => {
      if (index++ != 0) marker.remove();
    });

    this.markers = [this.markers[0]];
    this.map!.flyTo({ center: this.markers[0].getLngLat() });
  }

  addDirections(coordinates: number[][]) {
    if (!this.isMapReady) throw new Error('Map not ready');

    if (this.map!.getLayer('route')) {
      this.map!.removeLayer('route');
      this.map!.removeSource('route');
    }

    this.directions = coordinates;

    this.map!.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: this.directions
          }
        }
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 8
      }
    });

    const directionMarkers: Marker[] = [];
    this.directions.forEach((coords, index) => {
      const newCoord: [number, number] = [coords[0], coords[1]];
      directionMarkers.push(new Marker().setLngLat(newCoord));
    });

    this.map!.fitBounds(this.getBounds(directionMarkers), { padding: 100 });
  }

  removeDirections() {
    if (!this.isMapReady) throw new Error('Map not ready');

    if (this.map!.getLayer('route')) {
      this.map!.removeLayer('route');
      this.map!.removeSource('route');
    }
  }

  private getBounds(markers: Marker[]): LngLatBounds {
    const bounds = new LngLatBounds();

    markers.forEach(marker => {
      bounds.extend(marker.getLngLat());
    });

    return bounds;
  }
}
