import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  private mapService = inject(MapService);
  private placesService = inject(PlacesService);

  @ViewChild('mapDiv', { static: true }) mapDivElement!: ElementRef;

  map: Map | undefined;

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation) throw new Error('User Location not available');
    if (!this.mapDivElement) throw new Error('Map Div Element not available');

    this.mapService.createMap(
      this.mapDivElement.nativeElement, this.placesService.userLocation
    );

    this.mapService.addMarker(
      this.placesService.userLocation,
      'Aquí estoy',
      'Mi posición actual en el mundo',
      '#d00'
    );
  }
}
