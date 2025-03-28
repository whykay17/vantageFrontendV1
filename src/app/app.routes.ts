import { Routes } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { ToolsComponent } from './tools/tools.component';
import { RequestsComponent } from './requests/requests.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {   
        path: 'reports',
        component: ReportsComponent
    },
    {
        path: 'tools',
        component: ToolsComponent
    },
    {
        path: 'requests',
        component: RequestsComponent
    }
];
