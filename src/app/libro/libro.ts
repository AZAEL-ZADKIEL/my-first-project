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

  constructor(private libroService: LibrosService) { }

  buscar() {
    this.mensaje.set('');
    console.log('--- Iniciando búsqueda ---');
    console.log('Término ingresado por el usuario:', this.termino);

    if (!this.termino || this.termino.trim().length === 0) {
      console.warn('Búsqueda cancelada: el término está vacío.');
      this.mensaje.set('Ingresa el nombre de un libro para buscar.');
      return;
    }

    this.cargando.set(true);
    this.libros.set([]);

    const terminoFormateado = this.termino.trim().replace(/\s+/g, '+');
    console.log('Término formateado para la URL:', terminoFormateado);
    console.log('Consultando: https://openlibrary.org/search.json?q=' + terminoFormateado);

    this.libroService.buscar(this.termino).subscribe({
      next: res => {
        console.log('Respuesta cruda de la API OpenLibrary:', res);
        console.log('Cantidad de resultados (docs) recibidos:', res.docs.length);

        const resultado: Libros[] = [];

        if (res.docs.length > 0) {
          // Solo se toma el PRIMER libro del listado que devuelve la búsqueda
          const d = res.docs[0];
          console.log('Se descarta el resto del listado; solo se usa el primer resultado (docs[0]).');

          const libro = new Libros();
          libro.titulo = d.title ?? 'Sin título';
          libro.autor = d.author_name ? d.author_name[0] : 'Sin dato';
          libro.aniopublicacion = d.first_publish_year ?? 0;
          libro.idioma = d.language ? d.language[0] : 'Sin dato';
          libro.fotoUrl = d.author_key
            ? `https://covers.openlibrary.org/a/olid/${d.author_key[0]}-M.jpg`
            : '';

          console.log('Libro procesado (único resultado mostrado):', {
            titulo: libro.titulo,
            author_name_completo: d.author_name,
            autor_usado: libro.autor,
            aniopublicacion: libro.aniopublicacion,
            language_completo: d.language,
            idioma_usado: libro.idioma,
            author_key_completo: d.author_key,
            fotoUrl_generada: libro.fotoUrl
          });

          resultado.push(libro);
        }

        this.libros.set(resultado);
        this.cargando.set(false);
        console.log('--- Búsqueda finalizada. Total de libros mostrados:', resultado.length, '---');

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