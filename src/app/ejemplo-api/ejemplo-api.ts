import { Component, OnInit, signal } from '@angular/core';
import { ServicioApi } from '../servicios/servicio-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ejemplo-api',
  imports: [CommonModule],
  templateUrl: './ejemplo-api.html',
  styleUrl: './ejemplo-api.css',
})
export class EjemploApi implements OnInit {
  datosApi = signal<any[]>([]);
  datosMostrados = signal<any[]>([]);

  constructor(private servicioApi: ServicioApi) { }

  ngOnInit(): void {
    this.servicioApi.recibirDatos().subscribe({
      next: dato => {
        this.datosApi.set(dato.results);
        this.datosMostrados.set(dato.results);
        console.log(this.datosApi());
        console.log(this.datosMostrados());

      },
      error: err => console.error('error API:', err)
    });
  }

  mostrar() {
    var cm: number = 0, cf: number = 0;

    for (var i of this.datosApi()) {
      if (i.gender == "Male") {
        cm++;
      } else {
        cf++;
      }
    }
    console.log("Cantidad de hombres:", cm);
    console.log("Cantidad de mujeres:", cf);
  }

  mostrarmujeres() {
    var mujeres: any[] = [];

    for (var i of this.datosApi()) {
      if (i.gender == "Female") {
        mujeres.push(i);
      }
    }
    this.datosMostrados.set(mujeres);
    console.log(this.datosMostrados());

  }
}