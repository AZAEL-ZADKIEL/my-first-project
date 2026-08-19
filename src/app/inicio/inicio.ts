import { Component } from '@angular/core';
import { Banner } from "../banner/banner";
import { Informacion } from "../informacion/informacion";

@Component({
  selector: 'app-inicio',
  imports: [Banner, Informacion],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {}
