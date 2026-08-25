import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memo',
  imports: [],
  templateUrl: './memo.html',
  styleUrl: './memo.css',
})
export class Memo implements OnInit {

  imagenGanadora: string = '/Img/leon.png';
  imagenRelleno: string = '/Img/Cara.png';
  imagenTapada: string = '/Img/cuadro.png';

  totalCartas: number = 16;
  imagenes: string[] = [];
  descubierta: boolean[] = [];
  encontrada: boolean[] = [];

  primeraCarta: number = -1;
  bloqueado: boolean = false;
  intentos: number = 0;

  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego(): void {
    const mazo: string[] = [this.imagenGanadora, this.imagenGanadora];
    while (mazo.length < this.totalCartas) {
      mazo.push(this.imagenRelleno);
    }
    this.mezclar(mazo);

    this.imagenes = mazo;
    this.descubierta = [];
    this.encontrada = [];

    for (let i = 0; i < this.totalCartas; i++) {
      this.descubierta.push(false);
      this.encontrada.push(false);

      const elemento = document.getElementById("carta" + i) as HTMLImageElement;
      if (elemento) {
        elemento.src = this.imagenTapada;
      }
    }

    const mensaje = document.getElementById("mensajeGanaste");
    if (mensaje) {
      mensaje.style.display = "none";
    }

    this.primeraCarta = -1;
    this.bloqueado = false;
    this.intentos = 0;
  }

  private mezclar(arreglo: string[]): void {
    for (let i = arreglo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]];
    }
  }

  voltear(id: number): void {
    if (this.bloqueado || this.descubierta[id] || this.encontrada[id]) {
      return;
    }

    this.descubierta[id] = true;
    const elemento = document.getElementById("carta" + id) as HTMLImageElement;
    elemento.src = this.imagenes[id];

    if (this.primeraCarta === -1) {
      this.primeraCarta = id;
      return;
    }

    this.bloqueado = true;
    this.intentos++;

    const primeraId = this.primeraCarta;
    const segundaId = id;

    if (this.imagenes[primeraId] === this.imagenes[segundaId]) {
      this.encontrada[primeraId] = true;
      this.encontrada[segundaId] = true;
      this.primeraCarta = -1;
      this.bloqueado = false;

      if (this.imagenes[primeraId] === this.imagenGanadora) {
        const mensaje = document.getElementById("mensajeGanaste");
        if (mensaje) {
          mensaje.style.display = "block";
        }

        setTimeout(() => {
          this.iniciarJuego();
        }, 2000);
      }
    } else {
      setTimeout(() => {
        const elem1 = document.getElementById("carta" + primeraId) as HTMLImageElement;
        const elem2 = document.getElementById("carta" + segundaId) as HTMLImageElement;
        elem1.src = this.imagenTapada;
        elem2.src = this.imagenTapada;

        this.descubierta[primeraId] = false;
        this.descubierta[segundaId] = false;
        this.primeraCarta = -1;
        this.bloqueado = false;
      }, 900);
    }
  }
}