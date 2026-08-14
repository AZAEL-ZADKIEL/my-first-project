import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Empleados } from '../entidades/empleados';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule],
  templateUrl: './formulario.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './formulario.css',
})
export class Formulario {
  titulo = 'FORMULARIO INGRESO';

  empleado: Empleados = new Empleados;

  constructor() {}

  registrar() {}
}
