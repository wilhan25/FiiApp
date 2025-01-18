import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'app-home', component: HomeComponent },
];
