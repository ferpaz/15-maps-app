import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';
import { LoadingComponent } from "../../components/loading/loading.component";
import { MapViewComponent } from "../../components/map-view/map-view.component";

@Component({
  selector: 'app-map-screen',
  standalone: true,
  imports: [LoadingComponent, MapViewComponent],
  templateUrl: './map-screen.component.html',
  styles: ``
})
export class MapScreenComponent {

  private placesService = inject(PlacesService);

  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }
}
