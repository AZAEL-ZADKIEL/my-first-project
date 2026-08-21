import { Routes } from '@angular/router';
import { Empleado } from './empleado/empleado';
import { Inicio } from './inicio/inicio';
import { Nomina } from './nomina/nomina';
import { EjemploApi } from './ejemplo-api/ejemplo-api';

export const routes: Routes = [
    {path: '', component: Inicio},
    {path: 'empleado', component: Empleado},
    {path: 'nomina', component: Nomina},
    {path: 'ejemplo-api', component: EjemploApi},
    {path: '**', redirectTo: ''}
];
