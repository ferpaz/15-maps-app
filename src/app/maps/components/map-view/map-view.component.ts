import { Component, inject, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styles: ``
})
export class MapViewComponent implements OnInit {
  ngOnInit(): void {
    this.placesService.getUserLocation();
  }

  private placesService = inject(PlacesService);

}
