import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/taxpayer-management/taxpayer-management.module')
      .then(m => m.TaxpayerManagementModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];