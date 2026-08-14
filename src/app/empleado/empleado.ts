import { Component } from '@angular/core';
import { Formulario } from "../formulario/formulario";

@Component({
  selector: 'app-empleado',
  imports: [Formulario],
  templateUrl: './empleado.html',
  styleUrl: './empleado.css',
})
export class Empleado {}
