import { Routes } from '@angular/router';
import { Empleado } from './empleado/empleado';
import { Inicio } from './inicio/inicio';

export const routes: Routes = [
    { path: '', component: Inicio},
    {path: 'empleado', component: Empleado},
    {path: '**', redirectTo: ''}
];
