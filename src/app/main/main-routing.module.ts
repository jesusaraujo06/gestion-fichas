import { Routes } from '@angular/router';

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./main.component')
    .then(component => component.MainComponent)
  },
];
