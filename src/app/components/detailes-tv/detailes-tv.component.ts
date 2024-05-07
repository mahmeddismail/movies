import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Cast } from 'src/app/interfaces/cast';
import { DetailedMovie } from 'src/app/interfaces/detailed-movie';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detailes-tv',
  templateUrl: './detailes-tv.component.html',
  styleUrls: ['./detailes-tv.component.css']
})
export class DetailesTvComponent {

  constructor(private _tvsService: MoviesService, private _ActivatedRoute: ActivatedRoute, private _AuthService: AuthService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.gettvId()
    this.getDetailedtv(this.tvId)
    this.getRatedtv()
    this.tvTrailer()
    this.cast()
    this.getWatchlist()
  }
  myYoutubeURL: any
  embdedURL: any
  mytv:any;
  tvId: any;
  mytvTrailer: any;
  starRating: number = 0;
  myGuestSession = localStorage.getItem('userSession')
  myRatedtvIds: any;
  userRating: any = 0;
  myRate: FormGroup = new FormGroup({
    value: new FormControl(this.userRating)
  });
  tvCast: Cast[] = [];
  tvDirector: any;
  tvWriters: Cast[] = [];
  count: number = 1;

  addWatchList: any = {
    media_type: "tv",
    media_id: 0,
    watchlist: true
  };
  deleteWatchList: any = {
    media_type: "tv",
    media_id: 0,
    watchlist: false
  };
  btnLoading: boolean = false;
  myWatchListtvIds: any;

  myMoiveBaseURLImages: string = "https://image.tmdb.org/t/p/original/"
  getDetailedtv(id: number) {
    this._tvsService.getDetailesTv(id).subscribe({
      next: (res) => {
        this.mytv = res
        console.log(res);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ratingtv(id: number, rating: FormGroup) {
    this.btnLoading = true;
    this._tvsService.rateMovie(id, rating.value).subscribe({
      next: (res) => {
        console.log('Rating updated successfully');
        this.starRating = rating.value;
        console.log(this.starRating);
        // console.log(res);
        setTimeout(() => {
          this.btnLoading = false;
          this.getRatedtv();
          console.log('getRatedtv called after rating update');
        }, 1500);
      },
      error: (err) => {
        console.log('Error updating rating:', err);
      }
    });
  }

  gettvId() {
    this._ActivatedRoute.paramMap.subscribe((p) => {
      this.tvId = p.get('id')
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

  getRatedtv() {
    this._tvsService.getRatedTv().subscribe({
      next: (res) => {
        this.myRatedtvIds = res.results.map((x: any) => x.id)
        this.userRating = res.results.map((x: any) => x.rating)
        // console.log(this.myRatedtvIds);
        // console.log(this.tvId);
        // console.log(this.userRating);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  deleteRatingtvs(id: number) {
    this._tvsService.deleteRatedTV(id).subscribe({
      next: (res) => {
        // console.log(res);
        setTimeout(() => {

          this.getRatedtv();
        }, 2000);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  tvTrailer() {
    this._tvsService.tvTrailer(this.tvId).subscribe({
      next: (res) => {
        const firstTrailerItem = res.results.find((item: any) => item.type === 'Trailer');
        if (firstTrailerItem) {
          this.mytvTrailer = firstTrailerItem.key;
          this.myYoutubeURL = `https://www.youtube.com/embed/${this.mytvTrailer}`
          this.embdedURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.myYoutubeURL);
          // console.log(this.embdedURL);
          // console.log(this.mytvTrailer);
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
    this._tvsService.castInDetailsTV(this.tvId).subscribe({
      next: (res) => {
        this.tvCast = res.cast
        this.tvDirector = res.crew.find((c: any) => c.known_for_department === 'Directing');
        this.tvWriters = res.crew.filter((c: any) => c.known_for_department === 'Writing')
        // console.log(this.tvWriters);
        // console.log(this.tvCast);
        // console.log(this.tvDirector);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  addToUserWatchList() {
    this.btnLoading = true;
    this._tvsService.watchlist(this.addWatchList).subscribe({
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
    this._tvsService.watchlist(this.deleteWatchList).subscribe({
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
    this._tvsService.getWatchlistTv('created_at.desc').subscribe({
      next: (res) => {
        this.myWatchListtvIds = res.results.map((x: any) => x.id)
        console.log(this.myWatchListtvIds);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}

