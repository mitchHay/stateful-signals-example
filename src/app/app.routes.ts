import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent),
  },
  {
    path: 'stateful-signal-example',
    loadComponent: () => import('./pages/stateful-signal-example-page/stateful-signal-example-page.component').then(m => m.StatefulSignalExampleComponent),
  },
  {
    path: 'resource-example',
    loadComponent: () => import('./pages/resource-example-page/resource-example-page.component').then(m => m.ResourceExamplePageComponent),
  },
];
