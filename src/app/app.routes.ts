import { Routes } from '@angular/router';
import { MapScreenComponent } from './maps/screens/map-screen/map-screen.component';

export const routes: Routes = [
  {
    path: 'map',
    component: MapScreenComponent,
    title: 'Map',
  },
  {
    path: '**',
    redirectTo: 'map'
  }
];
