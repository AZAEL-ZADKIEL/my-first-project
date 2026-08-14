import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Banner } from './banner/banner';
import { Empleado } from './empleado/empleado';
import { Footer } from './footer/footer';
import { Informacion } from './informacion/informacion';
import { Navegacion } from './navegacion/navegacion';
import { Formulario } from './formulario/formulario';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Empleado, Navegacion, Banner, Informacion, Formulario, Footer],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);
  esRutaInicio = true;

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.esRutaInicio = event.urlAfterRedirects === '/';
      });
  }
}
