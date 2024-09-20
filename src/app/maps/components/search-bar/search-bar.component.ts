import { Component, ElementRef, inject, ViewChild } from '@angular/core';

import { MapService, PlacesService } from '../../services';
import { SearchResultsComponent } from '../search-results/search-results.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [SearchResultsComponent],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {

  private placesService = inject(PlacesService);
  private mapService = inject(MapService);

  private debounceTimer?: NodeJS.Timeout;

  @ViewChild('txtQuery') public txtQuery!: ElementRef;

  onQueryChanged(query: string = '') {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.mapService.removeMarkers();
      this.mapService.removeDirections();

      this.placesService.getPlacesNearby(
        query,
        () => {
          this.createMarkersFromPlaces();
        }
      );
    }, 500);
  }

  private createMarkersFromPlaces() {
    if (this.placesService.places.length > 0) {
      this.placesService.places.forEach((place) => {
        const [lng, lat] = place.geometry.coordinates;
        this.mapService.addMarker(
          [lng, lat],
          place.properties.name,
          place.properties.full_address,
          'gray'
        );
      });
    }
  }

  clearSearch() {
    this.txtQuery.nativeElement.value = '';
    this.onQueryChanged();
  }
}
