import { Component, signal } from '@angular/core';
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
  libros = signal<Libros[]>([]);
  cargando = signal<boolean>(false);
  mensaje = signal<string>('');

  constructor(private libroService: LibrosService) {}

  buscar() {
    this.mensaje.set('');

    if (!this.termino || this.termino.trim().length === 0) {
      this.mensaje.set('Ingresa el nombre de un libro para buscar.');
      return;
    }

    this.cargando.set(true);
    this.libros.set([]);

    this.libroService.buscar(this.termino).subscribe({
      next: res => {
        const resultado = res.docs.map((d: any) => {
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

        this.libros.set(resultado);
        this.cargando.set(false);

        if (resultado.length === 0) {
          this.mensaje.set('No se encontraron libros con ese nombre.');
        }
      },
      error: err => {
        this.cargando.set(false);
        console.error('Error API OpenLibrary:', err);
        this.mensaje.set('Ocurrió un error al consultar la API.');
      }
    });
  }
}