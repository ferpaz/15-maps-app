import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  standalone: true,
  imports: [],
  template: `
    <button class="btn btn-primary shadow-lg shadow-slate-500"
      (click)="gotoMyLocation()">
      <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 16.5017C14.4853 16.5017 16.5 14.487 16.5 12.0017C16.5 9.5164 14.4853 7.50168 12 7.50168C9.51472 7.50168 7.5 9.5164 7.5 12.0017C7.5 14.487 9.51472 16.5017 12 16.5017ZM12 14.5034C10.6184 14.5034 9.49832 13.3833 9.49832 12.0017C9.49832 10.62 10.6184 9.5 12 9.5C13.3816 9.5 14.5017 10.62 14.5017 12.0017C14.5017 13.3833 13.3816 14.5034 12 14.5034Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 1C11 0.447715 11.4477 0 12 0C12.5523 0 13 0.447715 13 1V2.04938C17.7244 2.51844 21.4816 6.27558 21.9506 11H23C23.5523 11 24 11.4477 24 12C24 12.5523 23.5523 13 23 13H21.9506C21.4816 17.7244 17.7244 21.4816 13 21.9506V23C13 23.5523 12.5523 24 12 24C11.4477 24 11 23.5523 11 23V21.9506C6.27558 21.4816 2.51844 17.7244 2.04938 13H1C0.447715 13 0 12.5523 0 12C-1.19209e-07 11.4477 0.447715 11 1 11H2.04938C2.51844 6.27558 6.27558 2.51844 11 2.04938V1ZM12 20.0016C7.58083 20.0016 3.99839 16.4192 3.99839 12C3.99839 7.58083 7.58083 3.99839 12 3.99839C16.4192 3.99839 20.0016 7.58083 20.0016 12C20.0016 16.4192 16.4192 20.0016 12 20.0016Z" fill="white"/>
      </svg>
    </button>
  `,
  styles: `
    button {
      position: fixed;
      top: 20px;
      right: 20px;
    }
  `
})
export class BtnMyLocationComponent {

  private mapService = inject(MapService);
  private placesService = inject(PlacesService);

  gotoMyLocation() {
    if (!this.placesService.isUserLocationReady) throw new Error('User location not available');
    if (!this.mapService.isMapReady) throw new Error('Map not available');

    this.mapService.flyTo(this.placesService.userLocation!);
  }
}
