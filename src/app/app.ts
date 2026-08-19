import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { Footer } from './footer/footer';
import { Navegacion } from './navegacion/navegacion';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navegacion, Footer],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css',
})
export class App {
  /*private router = inject(Router);
  esRutaInicio = true;

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.esRutaInicio = event.urlAfterRedirects === '/';
      });
  }*/
}
