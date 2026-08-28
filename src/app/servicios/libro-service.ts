import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LibroService {
    private Apiurl = 'https://openlibrary.org';
    constructor(private http: HttpClient){} 

    buscarLibros(nombre: string): Observable<any> {
    return this.http.get(`${this.Apiurl}/search.json?q=${nombre}`);
  }
}
