import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { CalcBazinComponent } from './componentes/calc-bazin/calc-bazin.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'app-home', component: HomeComponent },
    { path: 'app-calc-bazin', component: CalcBazinComponent },
];
