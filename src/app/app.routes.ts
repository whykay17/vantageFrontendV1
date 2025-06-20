import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { ReportsComponent } from './reports/reports.component';
import { RequestsComponent } from './requests/requests.component';

export const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./landing-page/landing-page.component').then(m => m.LandingPageComponent) }
    ]
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
      { path: 'reports', component: ReportsComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'videos', loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule) }
    ]
  },
  { path: '**', redirectTo: '' }
];
