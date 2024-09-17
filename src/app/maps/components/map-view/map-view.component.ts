import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';

import { PlacesService } from '../../services';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;
  private placesService = inject(PlacesService);

  map: Map | undefined;

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation) throw new Error('User location not available');

    this.map = new Map({
      container: this.mapDivElement.nativeElement,
      style: environment.mapbox.style,
      center: this.placesService.userLocation,
      zoom: 16,
    });

    const popup = new Popup()
      .setHTML(`
        <h6>Aquí estoy</h6>
        <span>Mi posición actual en el mundo</span>
      `);

    new Marker({ color: '#d00', })
      .setLngLat(this.placesService.userLocation)
      .setPopup(popup)
      .addTo(this.map);
  }
}
