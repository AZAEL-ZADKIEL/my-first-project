import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navegacion.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navegacion.css',
})
export class Navegacion {}
