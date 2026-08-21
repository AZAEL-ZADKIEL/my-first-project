import { Component, OnInit } from '@angular/core';
import { EnviarDatos } from '../servicios/enviar-datos';
import { Nomina_Empleado } from '../entidades/nominas';
import { FormsModule } from '@angular/forms';
import { Empleados } from '../entidades/empleados';

@Component({
  selector: 'app-nomina',
  imports: [FormsModule],
  templateUrl: './nomina.html',
  styleUrl: './nomina.css',
})

export class Nomina implements OnInit {
  titulo = 'FORMULARIO NOMINA';
  datos: any;
  nombre: String = "";
  cargo: String = "";

  nomina: Nomina_Empleado = new Nomina_Empleado();
  nominaE: Empleados[];

  modalTitulo = '';
  modalMensaje = '';

  mostrarModal(titulo: string, mensaje: string) {
    this.modalTitulo = titulo;
    this.modalMensaje = mensaje;
  }

  constructor(private enviarDatos: EnviarDatos) { }

  /*ngOnInit(): void {
    this.enviarDatos.disparador.subscribe((dato: null) => {
      if (dato != null) {
        this.datos = dato
        this.nomina.empleado = this.datos;
        console.log(this.nomina.empleado.nombre)
      }
    })
  }*/

  ngOnInit(): void {
    this.enviarDatos.disparador.subscribe(dato => {
      if (dato != null) {
        this.nominaE = dato.empleados;
        console.log(this.nominaE)
        this.nomina.empleado = this.nominaE[0];
      }
    });
  }

  ver() {
    console.log(this.nominaE)
  }

  calcularDescuentos() {
    if (!this.nomina.salario) {
      this.mostrarModal('Faltan datos', 'Debes ingresar el salario primero.');
      return;
    }

    this.nomina.salud = this.nomina.salario * 0.04;
    this.nomina.pension = this.nomina.salario * 0.08;

    this.mostrarModal(
      'Descuentos calculados',
      'Salud: $' + this.nomina.salud.toLocaleString('es-CO') + '\n' +
      'Pensión: $' + this.nomina.pension.toLocaleString('es-CO')
    );
  }

  calcularBonificacion() {
    if (!this.nomina.salario) {
      this.mostrarModal('Faltan datos', 'Debes ingresar el salario primero.');
      return;
    }

    if (this.nomina.salud === undefined || this.nomina.pension === undefined) {
      this.mostrarModal('Faltan datos', 'Debes calcular primero los descuentos de salud y pensión.');
      return;
    }

    const salarioNeto = this.nomina.salario - this.nomina.salud - this.nomina.pension;

    if (this.nomina.empleado.cargo === 'Ingeniero') {
      this.nomina.bonificacion = salarioNeto * 0.10;
    } else if (this.nomina.empleado.cargo === 'Tecnico') {
      this.nomina.bonificacion = salarioNeto * 0.05;
    } else if (this.nomina.empleado.cargo === 'Aux') {
      this.nomina.bonificacion = salarioNeto * 0.02;
    } else {
      this.mostrarModal('Cargo no reconocido', 'Usa: Ingeniero, Tecnico o Aux.');
      return;
    }

    this.mostrarModal(
      'Bonificación calculada',
      'Salario neto (después de descuentos): $' + salarioNeto.toLocaleString('es-CO') + '\n' +
      'Bonificación: $' + this.nomina.bonificacion.toLocaleString('es-CO')
    );
  }

  mostrarNominaCompleta() {
    if (!this.nomina.salario) {
      this.mostrarModal('Faltan datos', 'Debes ingresar el salario primero.');
      return;
    }

    if (this.nomina.salud === undefined || this.nomina.pension === undefined) {
      this.mostrarModal('Faltan datos', 'Debes calcular primero los descuentos de salud y pensión.');
      return;
    }

    if (this.nomina.bonificacion === undefined) {
      this.mostrarModal('Faltan datos', 'Debes calcular primero la bonificación.');
      return;
    }

    const salarioFinal = this.nomina.salario - this.nomina.salud - this.nomina.pension + this.nomina.bonificacion;

    this.mostrarModal(
      'Nómina de ' + this.nomina.empleado.nombre,
      'Cargo: ' + this.nomina.empleado.cargo + '\n' +
      'Salario: $' + this.nomina.salario.toLocaleString('es-CO') + '\n' +
      'Salud: $' + this.nomina.salud.toLocaleString('es-CO') + '\n' +
      'Pensión: $' + this.nomina.pension.toLocaleString('es-CO') + '\n' +
      'Bonificación: $' + this.nomina.bonificacion.toLocaleString('es-CO') + '\n' +
      'Salario final: $' + salarioFinal.toLocaleString('es-CO')
    );
  }
}