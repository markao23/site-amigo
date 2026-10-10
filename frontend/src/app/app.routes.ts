import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page';

export const routes: Routes = [
    {
        path: '',
        component: LoginPageComponent,
        title: 'Login'
    },
    {
        path: '**',
        redirectTo: ''
    }
];
