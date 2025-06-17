import { Routes } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { VideosModule } from './videos/videos.module';
import { RequestsComponent } from './requests/requests.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {   
        path: 'reports',
        component: ReportsComponent
    },
    {
        path: 'videos',
        loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule)
    },
    {
        path: 'requests',
        component: RequestsComponent
    }
];
