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

  public _selectedId: string = '';


  get isLoadingPlaces() {
    return this.placesService.isLoadingPlaces;
  }

  get places() {
    return this.placesService.places;
  }

  get selectedId() {
    return this.placesService.selectedPlaceId;
  }

  flyTo(place: Feature) {
    this.placesService.selectedPlaceId = place.id;
    const [lng, lat] = place.geometry.coordinates;

    this.mapService.flyTo([lng, lat]);
    this.mapService.removeDirections();
  }

  getDirections(place: Feature) {
    this.placesService.selectedPlaceId = place.id;
    const [lng, lat] = place.geometry.coordinates;

    this.mapService.removeDirections();

    this.placesService.getDirections(
      [lng, lat],
      (coordinates: number[][]) => {
        if (coordinates.length > 0) {
          this.mapService.addDirections(coordinates);
        }
      }
    );
  }
}
