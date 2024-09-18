import { Component, inject } from '@angular/core';

import { PlacesService } from '../../services';
import { SearchResultsComponent } from '../search-results/search-results.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [SearchResultsComponent],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {

  private placesService = inject(PlacesService);

  private debounceTimer?: NodeJS.Timeout;

  onQueryChanged(query: string = '') {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.placesService.getPlacesNearby(query);
    }, 500);

  }
}
