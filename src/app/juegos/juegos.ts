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

  descubrir(p: number){
    if (this.position == p){
      const ball = document
    }
  }
}
