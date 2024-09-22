import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'myDeals',
    pathMatch: 'full'
  },
  {
    path: 'myDeals',
    loadComponent: () => import('./components/list-deals/list-deals.component').then(m => m.ListDealsComponent)
  },
  {
    path: 'addDeal',
    loadComponent: () => import('./components/add-deal/add-deal.component').then(m => m.AddDealComponent),
  },
  {
    path: 'editDeal',
    loadComponent: () => import('./components/edit-deal/edit-deal.component').then(m => m.EditDealComponent),
  }
];
