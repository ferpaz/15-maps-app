import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/search-response.interface';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [],
  templateUrl: './search-results.component.html',
  styles: ``
})
export class SearchResultsComponent {

  private placesService = inject(PlacesService);
  private mapService = inject(MapService);

  get isLoadingPlaces() {
    return this.placesService.isLoadingPlaces;
  }

  get places() {
    return this.placesService.places;
  }

  flyTo(place: Feature) {
    const [lng, lat] = place.geometry.coordinates;
    this.mapService.flyTo([lng, lat]);
  }

}
