import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navegacion.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navegacion.css',
})
export class Navegacion {}
