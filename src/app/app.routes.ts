import { Routes } from '@angular/router';
import { Empleado } from './empleado/empleado';

export const routes: Routes = [
    {path: 'empleado', component: Empleado},
    {path: '**', redirectTo: ''}
];
