import { Filme } from './../shared/models/filme';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

const url = 'http://localhost:3000/filmes/'
@Injectable({
  providedIn: 'root'
})
export class FilmesService {


  constructor(private http: HttpClient) { }

  salvar(filme: Filme): Observable<Filme>{
    return this.http.post<Filme>(url, filme)
  }

  
}
