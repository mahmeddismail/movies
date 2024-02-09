import { Component, OnInit } from '@angular/core';
import { DetailedMovie } from 'src/app/interfaces/detailed-movie';
import { Movies } from 'src/app/interfaces/movies';
import { MoviesService } from 'src/app/services/movies.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _MoviesService: MoviesService, private _AuthService: AuthService) { }

  ngOnInit(): void {
    this.trendyMovies()
    this.actionGenre()
    this.crimeGenre()
    this.comedyGenre()
    this.documentaryGenre()
    this.dramaGenre()
    this.familyGenre()
    this.horrorGenre()
    this.romanceGenre()
    this.sciFiGenre()
    this.animation()
    this.music()
    this.getUserRate()
    // Redirect the user to the authentication URL
    // window.location.href = authUrl;
    // console.log(authUrl);
  }

 
  myMovies: Movies[] = []
  actionM: Movies[] = []
  crimeM: Movies[] = []
  comedyM: Movies[] = []
  docM: Movies[] = []
  dramaM: Movies[] = []
  familyM: Movies[] = []
  horrorM: Movies[] = []
  romanceM: Movies[] = []
  sciFiM: Movies[] = []
  animationM: Movies[] = []
  musicM: Movies[] = []
  requestedToken: string = ''



  myRawBody = new FormGroup({
    redirect_to: new FormControl("http://www.localhost:4200"
    ),
  });

  userRate: [] = []
  myMovieIds: any;
  BaseURLImagesW500: string = "https://image.tmdb.org/t/p/w500/"
  BaseURLImagesOriginal: string = "https://image.tmdb.org/t/p/original/"
  trendyMovies() {
    this._MoviesService.trendingMovies().subscribe({
      next: (res) => {
        this.myMovies = res.results

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  actionGenre() {
    this._MoviesService.moviesGenre(28).subscribe({
    next: (res) => {
        this.actionM = res.results


      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  comedyGenre() {
    this._MoviesService.moviesGenre(35).subscribe({
      next: (res) => {
        this.comedyM = res.results


      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  crimeGenre() {
    this._MoviesService.moviesGenre(80).subscribe({
      next: (res) => {
        this.crimeM = res.results


      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  documentaryGenre() {
    this._MoviesService.moviesGenre(99).subscribe({
      next: (res) => {
        this.docM = res.results


      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  dramaGenre() {
    this._MoviesService.moviesGenre(18).subscribe({
      next: (res) => {
        this.dramaM = res.results


      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  familyGenre() {
    this._MoviesService.moviesGenre(10751).subscribe({
      next: (res) => {
        this.familyM = res.results


      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  horrorGenre() {
    this._MoviesService.moviesGenre(27).subscribe({
      next: (res) => {
        this.horrorM = res.results


      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  romanceGenre() {
    this._MoviesService.moviesGenre(10749).subscribe({
      next: (res) => {
        this.romanceM = res.results


      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  sciFiGenre() {
    this._MoviesService.moviesGenre(878).subscribe({
      next: (res) => {
        this.sciFiM = res.results


      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  animation() {
    this._MoviesService.moviesGenre(16).subscribe({
      next: (res) => {
        this.animationM = res.results


      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  music() {
    this._MoviesService.moviesGenre(10402).subscribe({
      next: (res) => {
        this.musicM = res.results


      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  getUserRate() {
    this._MoviesService.getRatedMovies().subscribe({
      next: (res) => {
        this.myMovieIds = res.results.map((x: any) => x.id)

        this.userRate = res.results.map((x: any) => x.rating)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  getRequestedToken() {
    this._AuthService.getRequestToken().subscribe({
      next: (res) => {
        this.requestedToken = res.request_token
        console.log(res);
        if (!localStorage.getItem('requestedToken')) {
          localStorage.setItem('requestedToken', res.request_token)
          const redirectTo = 'http://www.localhost:4200';
          const authUrl = `https://www.themoviedb.org/authenticate/${this.requestedToken}?redirect_to=${redirectTo}`;
          console.log(authUrl);
          window.location.href = authUrl;
        }

        else {
          this.createNewSession()
        }

      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  data = {
    request_token: localStorage.getItem('requestedToken')
  };

  createNewSession() {
    this._AuthService.createSessionId(this.data).subscribe({
      next: (res) => { console.log(res) },
      error: (err) => {
        console.log(err);
      }
    }
    )
  }


  MainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false,
    autoplay: true,
    autoplayTimeout: 4500,
    autoplaySpeed: 4000,
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left bg-transparent text-white display-3 "></i>', '<i class="fa-solid fa-chevron-right bg-transparent text-white display-3"></i>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 4
      },
      740: {
        items: 6
      },
      940: {
        items: 8
      }
    },
    nav: true
  }

}
