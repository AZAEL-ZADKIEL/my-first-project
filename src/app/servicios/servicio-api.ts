import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioApi {
  private urlApi = "https://rickandmortyapi.com/api/character/?page=19";
  constructor(private servicioApi: HttpClient) {}

  recibirDatos(): Observable<any> {
    return this.servicioApi.get(this.urlApi);
  }
}