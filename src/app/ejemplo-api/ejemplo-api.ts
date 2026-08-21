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

  constructor(private servicioApi: ServicioApi) { }

  ngOnInit(): void {
    this.servicioApi.recibirDatos().subscribe({
      next: dato => this.datosApi.set(dato.results),
      error: err => console.error('error API:', err)
    });
  }
}
