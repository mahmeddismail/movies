import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _HttpClient: HttpClient) { }
  baseURL: string = 'https://api.themoviedb.org/3'

  header: any = {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1N2UxMzA5YTE0YWUwYmJhMTYzOGFmOGQ0ZjQ5MSIsInN1YiI6IjY1MDBiNThjZTBjYTdmMDE0ZjcwODI5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gEX_7WaMbXX_jkc4c9lX33ObnG4sOs0XhfvZ3LvpcWk"
  }

  trendingMovies(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/trending/all/week`, { headers: this.header })
  }

  deleteRatedMovies(movieId: number): Observable<any> {
    return this._HttpClient.delete(`${this.baseURL}/movie/${movieId}/rating`, { headers: this.header })
  }

  moviesGenre(genre: number): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/discover/movie?&with_genres=${genre}`, { headers: this.header })
  }


  rateMovie(movieId: number, rate: object): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/movie/${movieId}/rating`, rate, { headers: this.header })
  }

  getRatedMovies(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/account/20429809/rated/movies`, { headers: this.header })
  }


  upComingMovies(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}//movie/upcoming`, { headers: this.header })
  }

  getDetailesMovie(movieId: number): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/movie/${movieId}`, { headers: this.header })
  }
  getDetailesTv(tvId: number): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/tv/${tvId}`, { headers: this.header })
  }


  //************************************************/ 
  topRated(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/movie/top_rated`, { headers: this.header })
  }
  trailer(id: number): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/movie/${id}/videos`, { headers: this.header })
  }
  /*********************************************************************************************//////////////// 

  castInDeatilesMovies(movieId: number): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/movie/${movieId}/credits`, { headers: this.header })
  }


  creditsMoviesPage(personId: number): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/person/${personId}/movie_credits`, { headers: this.header })
  }

  personInfo(personId: number): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/person/${personId}`, { headers: this.header })
  }

  /***********************************************************/

  watchlist(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/account/20429809/watchlist`, data, { headers: this.header })
  }

  getWatchlistMovies(sorting:string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/account/20429809/watchlist/movies?sort_by=${sorting}`, { headers: this.header })
  }

  /**********************/
  moviesGenres(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/genre/movie/list`, { headers: this.header })
  }


  /****************************************************************************/

 search(querySearch:string,type:string):Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/search/${type}?query=${querySearch}`,{ headers: this.header })
  }
}