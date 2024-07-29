import { Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';

export const routes: Routes = [

  {
    path: '',
    canActivate: [LoginGuard],
    loadComponent: () => import('./layouts/main/main.component')
    .then(component => component.MainComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./main/main-routing.module')
        .then(r => r.MAIN_ROUTES)
      },
      {
        path: 'cita-dia',
        loadChildren: () => import('./cita-dia/cita-dia-routing.module')
        .then(r => r.CITA_DIA_ROUTES)
      }
    ]
  }
]

