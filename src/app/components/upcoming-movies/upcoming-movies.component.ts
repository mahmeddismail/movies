import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movies } from 'src/app/interfaces/movies';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.css']
})
export class UpcomingMoviesComponent {
  constructor(private _MoviesService: MoviesService) { }

  ngOnInit(): void {
    this.upComingMovies()

  }
  public today=new Date()

  myUpComingMovies: Movies[] = []
  myMoiveBaseURLImages: string = "https://image.tmdb.org/t/p/w500/"
  upComingMovies() {
    this._MoviesService.upComingMovies().subscribe({
      next: (res) => {
        this.myUpComingMovies = res.results
        console.log(this.myUpComingMovies);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
