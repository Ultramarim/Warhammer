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
    path: 'missions',
    loadComponent: () => import('./features/missions/create-misions.component').then(m => m.MissionComponent)
  },
  {
    path: 'edit-missions',
    loadComponent: () => import('./features/missions/edit-missions.component').then(m => m.EditmissionComponent)
  },
  {
   path: 'delete-missions',
    loadComponent: () => import('./features/missions/delete-missions.component').then(m => m.DeletemissionComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];