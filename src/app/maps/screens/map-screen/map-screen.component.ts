import { Component, inject } from '@angular/core';

import { AppLogoComponent, BtnMyLocationComponent, LoadingComponent, MapViewComponent, SearchBarComponent } from '../../components';
import { PlacesService } from '../../services';


@Component({
  selector: 'app-map-screen',
  standalone: true,
  imports: [
    LoadingComponent,
    MapViewComponent,
    AppLogoComponent,
    BtnMyLocationComponent,
    SearchBarComponent
  ],
  templateUrl: './map-screen.component.html',
  styles: ``
})
export class MapScreenComponent {

  private placesService = inject(PlacesService);

  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }
}
