import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Empleados } from '../entidades/empleados';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule],
  templateUrl: './formulario.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './formulario.css',
})
export class Formulario implements OnInit {
  titulo = 'FORMULARIO INGRESO';
  empleado: Empleados = new Empleados();
  errores: string[] = [];

  ngOnInit(): void {
    this.empleado = new Empleados();
  }

  registrar() {
    this.errores = [];

    if (!this.empleado.cedula || this.empleado.cedula.trim().length === 0) {
      this.errores.push('La cédula es obligatoria.');
    }

    if (!this.empleado.nombre || this.empleado.nombre.trim().length < 3) {
      this.errores.push('El nombre debe tener al menos 3 caracteres.');
    }

    if (!this.empleado.email || !this.empleado.email.includes('@')) {
      this.errores.push('Ingresa un email válido.');
    }

    if (!this.empleado.cargo || this.empleado.cargo.trim().length === 0) {
      this.errores.push('El cargo es obligatorio.');
    }

    if (!this.empleado.edad || this.empleado.edad < 18) {
      this.errores.push('La edad debe ser mayor o igual a 18.');
    }

    if (!this.empleado.genero) {
      this.errores.push('Selecciona un género.');
    }

    if (this.errores.length > 0) {
      alert('Corrige los siguientes errores:\n' + this.errores.join('\n'));
      return;
    }

    alert(this.empleado.nombre + ' fue registrado correctamente');
    this.empleado = new Empleados();
  }

 
  VerificarCargo(){

  }
  VerificarGenero(){

  }
}