import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Ratings } from 'src/app/interfaces/ratings';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-rated',
  templateUrl: './user-rated.component.html',
  styleUrls: ['./user-rated.component.css']
})
export class UserRatedComponent implements OnInit {
  constructor(private _MoviesService: MoviesService) { }

  ngOnInit(): void {
    this.userRatings()
  }

  Ratings: Ratings[] = []
  userRating: number = 0;
  starRating: number = 0;
  movieId: number = 0;
  myRate: FormGroup = new FormGroup({
    value: new FormControl(this.userRating)
  });


  userRatings() {
    this._MoviesService.getRatedMovies().subscribe({
      next: (res) => {
        this.Ratings = res.results
        console.log(this.Ratings);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  ratingMovie(id: number, rating: FormGroup) {
    this._MoviesService.rateMovie(id, rating.value).subscribe({
      next: (res) => {
        this.starRating = rating.value;
        console.log(rating.value);
        console.log(res);
        console.log(id);
        setTimeout(() => {
          this.userRatings();
          console.log('getRatedMovie called after rating update');
        }, 1500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteRating(id: number) {
    this._MoviesService.deleteRatedMovies(id).subscribe({
      next: (res) => {
        console.log(res);
        setTimeout(() => {
          this.userRatings();
          console.log('getRatedMovie called after rating update');
        }, 1000);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }





}
