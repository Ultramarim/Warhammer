import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'setup',
    loadComponent: () => import('./features/game-setup/game-setup.component').then(m => m.GameSetupComponent)
  },
  {
    path: 'game/:id',
    loadComponent: () => import('./features/game-dashboard/game-dashboard.component').then(m => m.GameDashboardComponent)
  },
  {
    path: 'history',
    loadComponent: () => import('./features/game-history/game-history.component').then(m => m.GameHistoryComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];