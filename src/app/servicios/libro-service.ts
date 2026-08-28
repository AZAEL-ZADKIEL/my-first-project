import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LibrosService {
  constructor(private http: HttpClient) {}

  buscar(termino: string) {
    const q = termino.trim().replace(/\s+/g, '+');
    return this.http.get<any>(`https://openlibrary.org/search.json?q=${q}`);
  }
}