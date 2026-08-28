import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Libros } from '../entidades/libros';
import { LibroService } from '../servicios/libro-service';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './libro.html',
  styleUrls: ['./libro.css']
})
export class LibrosComponent {
  terminoBusqueda: string = '';
  libros: Libros[] = [];
  cargando: boolean = false;
  error: string = '';

  constructor(private libroService: LibroService) {}

  buscar(): void {
    if (!this.terminoBusqueda.trim()) {
      this.error = 'Ingresa el nombre de un libro para buscar';
      return;
    }
    this.error = '';
    this.cargando = true;

    this.libroService.buscarLibros(this.terminoBusqueda).subscribe({
      next: (resultados) => {
        this.libros = resultados;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Ocurrió un error al buscar los libros';
        this.cargando = false;
        console.error(err);
      }
    });
  }
}