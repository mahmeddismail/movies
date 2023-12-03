import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }

  baseURL: string = 'https://api.themoviedb.org/3'
  header: any = {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1N2UxMzA5YTE0YWUwYmJhMTYzOGFmOGQ0ZjQ5MSIsInN1YiI6IjY1MDBiNThjZTBjYTdmMDE0ZjcwODI5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gEX_7WaMbXX_jkc4c9lX33ObnG4sOs0XhfvZ3LvpcWk"
  }
  apiKey: string = "37157e1309a14ae0bba1638af8d4f491"
  // https://api.themoviedb.org/3/authentication/guest_session/new

  // createGuestSession(): Observable<any> {
  //   return this._HttpClient.get(`${this.baseURL}/authentication/guest_session/new`, { headers: this.header })
  // }

  // createSession(requestToken: string): Observable<any> {
  //   const sessionUrl = `${this.baseURL}/authentication/session/new`;

  //   const requestBody = {
  //     request_token: requestToken,
  //   };

  //   const options = {
  //     params: {
  //       api_key: this.apiKey,
  //     },
  //   };

  //   return this._HttpClient.post<any>(sessionUrl, requestBody, options);
  // }




  getRequestToken(): Observable<any> {
    const params = { api_key: this.apiKey };
    return this._HttpClient.get(`https://api.themoviedb.org/3/authentication/token/new`, { headers: this.header, params });
  }


  createSessionId(data:any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/authentication/session/new`, data, { headers: this.header })
  }
}

