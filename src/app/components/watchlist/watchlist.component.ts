// import { SeeMorePipe } from 'src/app/see-more.pipe';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies.service';
import { Watchlist } from 'src/app/interfaces/watchlist';
import { RouterModule } from '@angular/router';
import { event } from 'jquery';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})

export class WatchlistComponent implements OnInit {

  constructor(private _MoviesService: MoviesService) { }

  ngOnInit(): void {
    this.getWatchlist()
    // setTimeout(() => {

    //   this.genres()
    // }, 1500);
    this.getRatedMovie()
  }
  genresIds: any;
  genresName: any;
  movieGenre: any;
  myWatchList: Watchlist[] = []
  numberInWatchList:number=0;
  myRatedMoviesIds: any;
  userRating: any;
  deleteWatchList: any = {
    media_type: "movie",
    media_id: 0,
    watchlist: false
  };
  btnLoading: boolean = false;
  myWatchListMovieIds: any;

  removeWatchList: boolean = false;

  sort:string='created_at.asc'

  getWatchlist() {
    this._MoviesService.getWatchlistMovies(this.sort).subscribe({
      next: (res) => {
        this.myWatchList = res.results
        this.numberInWatchList=res.total_results
        this.movieGenre = res.results.map((i: any) => i.genre_ids)
        this.myWatchListMovieIds = res.results.map((x: any) => x.id)
        // console.log(this.myWatchListMovieIds);
        // console.log(this.myWatchList);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  genres() {
    this._MoviesService.moviesGenres().subscribe({
      next: (res) => {
        this.genresIds = res.genres.map((i: any) => i.id)
        // this.genresName = this.movieGenre?.map((id: any) => res.genres?.find((el: any) => el.id == id).name);
        //  res.genres.map((i: any) => i.name)
        // this.genresName = this.movieGenre.map((genreIds: number[]) => {
        //   return genreIds.map((id: number) => {
        //     const genre = res.genres.find((g:any) => g.id === id);
        //     return genre ? genre.name : 'Unknown Genre';
        //   });
        // });
        this.genresName = res.genres.filter((i: any) => i.id == 28)
        // console.log(this.genresName);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  getRatedMovie() {
    this._MoviesService.getRatedMovies().subscribe({
      next: (res) => {
        this.myRatedMoviesIds = res.results.map((x: any) => x.id)
        this.userRating = res.results.map((x: any) => x.rating)
        // console.log(this.myRatedMoviesIds);
        // console.log(this.userRating);
        // console.log(res);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  deleteUserWatchList(movieId: number) {
    this.removeWatchList = true;
    this.deleteWatchList.media_id = movieId
    this._MoviesService.watchlist(this.deleteWatchList).subscribe({
      next: (res) => {
        console.log(res);
        this.getWatchlist();
      },
      error: (err) => {
        console.log(err);

      }
    })
  }



}
