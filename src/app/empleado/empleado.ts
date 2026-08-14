import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Formulario } from '../formulario/formulario';

@Component({
  selector: 'app-empleado',
  imports: [Formulario],
  templateUrl: './empleado.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './empleado.css',
})
export class Empleado {}
