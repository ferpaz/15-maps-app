import { Component, inject } from '@angular/core';

import { AppLogoComponent, BtnMyLocationComponent, LoadingComponent, MapViewComponent } from '../../components';
import { PlacesService } from '../../services';


@Component({
  selector: 'app-map-screen',
  standalone: true,
  imports: [LoadingComponent, MapViewComponent, AppLogoComponent, BtnMyLocationComponent],
  templateUrl: './map-screen.component.html',
  styles: ``
})
export class MapScreenComponent {

  private placesService = inject(PlacesService);

  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }
}
