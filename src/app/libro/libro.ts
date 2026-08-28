import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LibrosService } from '../servicios/libro-service';
import { Libros } from '../entidades/libros';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './libro.html',
  styleUrl: './libro.css',
})
export class Libro {
  termino: string = '';
  libros: Libros[] = [];
  cargando: boolean = false;
  mensaje: string = '';

  constructor(private libroService: LibrosService) {}

  buscar() {
    this.mensaje = '';

    if (!this.termino || this.termino.trim().length === 0) {
      this.mensaje = 'Ingresa el nombre de un libro para buscar.';
      return;
    }

    this.cargando = true;
    this.libros = [];

    this.libroService.buscar(this.termino).subscribe({
      next: res => {
        this.libros = res.docs.map((d: any) => {
          const libro = new Libros();
          libro.titulo = d.title ?? 'Sin título';
          libro.autor = d.author_name ? d.author_name[0] : 'Sin dato';
          libro.aniopublicacion = d.first_publish_year ?? 0;
          libro.idioma = d.language ? d.language[0] : 'Sin dato';
          libro.fotoUrl = d.author_key
            ? `https://covers.openlibrary.org/a/olid/${d.author_key[0]}-M.jpg`
            : '';
          return libro;
        });

        this.cargando = false;
        if (this.libros.length === 0) {
          this.mensaje = 'No se encontraron libros con ese nombre.';
        }
      },
      error: err => {
        this.cargando = false;
        console.error('Error API OpenLibrary:', err);
        this.mensaje = 'Ocurrió un error al consultar la API.';
      }
    });
  }
}