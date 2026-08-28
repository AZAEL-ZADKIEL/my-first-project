import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LibrosService } from '../servicios/libro-service';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './libro.html'
})
export class Libro {
  termino = '';
  libros: any[] = [];

  constructor(private libroService: LibrosService) {}

  buscar() {
    this.libroService.buscar(this.termino).subscribe(res => {
      this.libros = res.docs.map((d: any) => ({
        titulo: d.title,
        autor: d.author_name ? d.author_name[0] : 'Sin dato',
        anio: d.first_publish_year || 'Sin dato',
        idioma: d.language ? d.language[0] : 'Sin dato',
        foto: d.author_key
          ? `https://covers.openlibrary.org/a/olid/${d.author_key[0]}-M.jpg`
          : ''
      }));
    });
  }
}