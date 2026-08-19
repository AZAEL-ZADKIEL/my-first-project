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

  salariosPorCargo: { [key: string]: number } = {
    ingeniero: 2500000,
    tecnico: 1800000,
    aux: 1200000,
  };

  bonificacion = 0;

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

  VerificarGenero() {
    if (!this.empleado.genero || !this.empleado.edad) {
      alert('Debes ingresar género y edad primero.');
      return;
    }

    if (this.empleado.edad < 18) {
      alert('No se puede calcular la bonificación: el empleado debe ser mayor o igual a 18 años.');
      return;
    }

    if (this.empleado.genero === 'femenino') {
      this.bonificacion = this.empleado.edad * 100000;
    } else if (this.empleado.genero === 'masculino') {
      this.bonificacion = this.empleado.edad * 120000;
    }

    alert('Bonificación calculada: $' + this.bonificacion.toLocaleString('es-CO'));
  }

  VerificarCargo() {
    if (!this.empleado.cargo) {
      alert('Debes ingresar el cargo primero.');
      return;
    }

    if (!this.empleado.edad || this.empleado.edad < 18) {
      alert('No se puede calcular el salario: el empleado debe ser mayor o igual a 18 años.');
      return;
    }

    const cargoKey = this.empleado.cargo.trim().toLowerCase();
    const salarioBase = this.salariosPorCargo[cargoKey];

    if (salarioBase === undefined) {
      alert('Cargo no reconocido. Usa: Ingeniero, Tecnico o Aux.');
      return;
    }

    if (!this.empleado.genero) {
      alert('Debes verificar el género primero para calcular la bonificación.');
      return;
    }

    const salarioTotal = salarioBase + this.bonificacion;

    alert(
      'Salario básico: $' + salarioBase.toLocaleString('es-CO') + '\n' +
      'Bonificación: $' + this.bonificacion.toLocaleString('es-CO') + '\n' +
      'Salario total: $' + salarioTotal.toLocaleString('es-CO')
    );
  }
}