import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DetailedMovie } from 'src/app/interfaces/detailed-movie';
import { Cast } from 'src/app/interfaces/cast';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.component.html',
  styleUrls: ['./details-movie.component.css']
})
export class DetailsMovieComponent implements OnInit {
  constructor(private _MoviesService: MoviesService, private _ActivatedRoute: ActivatedRoute, private _AuthService: AuthService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getMovieId()
    this.getDetailedMovie(this.movieId)
    this.getRatedMovie()
    this.movieTrailer()
    this.cast()
    this.getWatchlist()
  }
  myYoutubeURL: any
  embdedURL: any
  myMovie: DetailedMovie | null = null
  movieId: any;
  myMovieTrailer: any;
  starRating: number = 0;
  myGuestSession = localStorage.getItem('userSession')
  myRatedMovieIds: any;
  userRating: any = 0;
  myRate: FormGroup = new FormGroup({
    value: new FormControl(this.userRating)
  });
  movieCast: Cast[] = [];
  movieDirector: any;
  movieWriters: Cast[] = [];
  count: number = 1;

  addWatchList: any = {
    media_type: "movie",
    media_id: 0,
    watchlist: true
  };
  deleteWatchList: any = {
    media_type: "movie",
    media_id: 0,
    watchlist: false
  };
  btnLoading: boolean = false;
  myWatchListMovieIds: any;

  myMoiveBaseURLImages: string = "https://image.tmdb.org/t/p/original/"
  getDetailedMovie(id: number) {
    this._MoviesService.getDetailesMovie(id).subscribe({
      next: (res) => {
        this.myMovie = res
        console.log(res);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ratingMovie(id: number, rating: FormGroup) {
    this.btnLoading = true;
    this._MoviesService.rateMovie(id, rating.value).subscribe({
      next: (res) => {
        console.log('Rating updated successfully');
        console.log(rating.value);
        this.starRating = rating.value;
        // console.log(res);
        setTimeout(() => {
          this.btnLoading = false;
          this.getRatedMovie();
          console.log('getRatedMovie called after rating update');
        }, 1500);
      },
      error: (err) => {
        console.log('Error updating rating:', err);
      }
    });
  }

  getMovieId() {
    this._ActivatedRoute.paramMap.subscribe((p) => {
      this.movieId = p.get('id')
      this.addWatchList.media_id = p.get('id')
      this.deleteWatchList.media_id = p.get('id')
      // console.log(this.watchList.media_id);
    })
  }


  // getGuestSession() {
  //   this._AuthService.createGuestSession().subscribe({
  //     next: (res) => {
  //       if (localStorage.getItem('userSession') == null) {
  //         localStorage.setItem('userSession', res.guest_session_id)
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }

  getRatedMovie() {
    this._MoviesService.getRatedMovies().subscribe({
      next: (res) => {
        this.myRatedMovieIds = res.results.map((x: any) => x.id)
        this.userRating = res.results.map((x: any) => x.rating)
        // console.log(this.myRatedMovieIds);
        // console.log(this.movieId);
        // console.log(this.userRating);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  deleteRatingMovies(id: number) {
    this._MoviesService.deleteRatedMovies(id).subscribe({
      next: (res) => {
        // console.log(res);
        setTimeout(() => {

          this.getRatedMovie();
        }, 2000);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  movieTrailer() {
    this._MoviesService.trailer(this.movieId).subscribe({
      next: (res) => {
        const firstTrailerItem = res.results.find((item: any) => item.type === 'Trailer');
        if (firstTrailerItem) {
          this.myMovieTrailer = firstTrailerItem.key;
          this.myYoutubeURL = `https://www.youtube.com/embed/${this.myMovieTrailer}`
          this.embdedURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.myYoutubeURL);
          // console.log(this.embdedURL);
          // console.log(this.myMovieTrailer);
        }
        else {
          console.error('No trailer found');
        }

        // }

      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  cast() {
    this._MoviesService.castInDeatilesMovies(this.movieId).subscribe({
      next: (res) => {
        this.movieCast = res.cast
        this.movieDirector = res.crew.find((c: any) => c.known_for_department === 'Directing');
        this.movieWriters = res.crew.filter((c: any) => c.known_for_department === 'Writing')
        // console.log(this.movieWriters);
        // console.log(this.movieCast);
        // console.log(this.movieDirector);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  addToUserWatchList() {
    this.btnLoading = true;
    this._MoviesService.watchlist(this.addWatchList).subscribe({
      next: (res) => {
        console.log(res);
        // setTimeout(() => {
        this.getWatchlist();
        this.btnLoading = false;

        // console.log('getWatchList called after rating update');
        // }, 1500);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  deleteUserWatchList() {
    this.btnLoading = true;
    this._MoviesService.watchlist(this.deleteWatchList).subscribe({
      next: (res) => {
        console.log(res);
        // setTimeout(() => {

        this.getWatchlist();
        this.btnLoading = false;

        // console.log('deleteWatchList called after rating update');
        // }, 1500);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  getWatchlist() {
    this._MoviesService.getWatchlistMovies().subscribe({
      next: (res) => {
        this.myWatchListMovieIds = res.results.map((x: any) => x.id)
        console.log(this.myWatchListMovieIds);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}

