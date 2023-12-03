import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private _HttpClient:HttpClient) { }
  baseURL: string = 'https://api.themoviedb.org/3'

  header: any = {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1N2UxMzA5YTE0YWUwYmJhMTYzOGFmOGQ0ZjQ5MSIsInN1YiI6IjY1MDBiNThjZTBjYTdmMDE0ZjcwODI5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gEX_7WaMbXX_jkc4c9lX33ObnG4sOs0XhfvZ3LvpcWk"
  }
  creditsTv(personId: number): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/person/${personId}/tv_credits`, { headers: this.header })
  }
}
