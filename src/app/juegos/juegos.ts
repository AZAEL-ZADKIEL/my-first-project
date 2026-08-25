import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juegos',
  imports: [],
  templateUrl: './juegos.html',
  styleUrl: './juegos.css',
})
export class Juegos implements OnInit{

  position : number = 0;


  ngOnInit(): void {
      this.position=Math.floor(Math.random() * 3) + 1;
  }

  async descubrir(p: number){
    if (this.position == p){
      const ball = document.getElementById("img"+p) as HTMLImageElement;
      ball.src="../../Img/Cara.png";
      ball.style.width = "150px"
      
    } else {
      const ball = document.getElementById("img"+p) as HTMLImageElement;
      ball.src="../../Img/cuadro.png";

      await new Promise(resolve => setTimeout(resolve,2000));

      const vaso = document.getElementById("img"+p) as HTMLImageElement;
      vaso.src="../../Img/Vaso.png";
    }
  }
}
