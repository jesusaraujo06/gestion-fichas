import { Routes } from '@angular/router';

export const CITA_DIA_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./cita-dia.component')
    .then(component => component.CitaDiaComponent)
  },
];
