import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute} from '@angular/router';
import { PersonInfo } from 'src/app/interfaces/person-info';
import { MoviesCredit } from 'src/app/interfaces/movies-credit';
import { TvService } from 'src/app/services/tv.service';
import { TvCredit } from 'src/app/interfaces/tv-credit';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {
  constructor(private _MoviesService: MoviesService,private _TvService:TvService, private _ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.personsID()
    this.creditsMovies()
    this.personsInformation()
    this.getRatedMovie()
    this.creditsTv()
  }

  personId: any;
  personCard: PersonInfo | undefined = undefined;
  personCreditsMovies: MoviesCredit[] = []
  personCreditsTv: TvCredit[] = []
  userRating: any = 0;
  myMovieIds: any;
  countForMovies: number = 1;
  countForTV: number = 1;

// counting(){
//   this.countForTV=this.countForTV+1
//   console.log(this.countForTV);
//   console.log(this.countForTV*6);
  
// }

  creditsMovies() {
    this._MoviesService.creditsMoviesPage(this.personId).subscribe({
      next: (res) => {
        this.personCreditsMovies = res.cast
        console.log(this.personCreditsMovies);
      },
      error: (er) => {
        console.log(er);
      }
    })
  }
  creditsTv() {
    this._TvService.creditsTv(this.personId).subscribe({
      next: (res) => {
        this.personCreditsTv = res.cast
        console.log(this.personCreditsTv);
      },
      error: (er) => {
        console.log(er);
      }
    })
  }
  personsInformation() {
    this._MoviesService.personInfo(this.personId).subscribe({
      next: (res) => {
        this.personCard = res
        // console.log(this.personCard);

      },
      error: (er) => {
        console.log(er);
      }
    })
  }

  getRatedMovie() {
    this._MoviesService.getRatedMovies().subscribe({
      next: (res) => {
        this.myMovieIds = res.results.map((x: any) => x.id)
        this.userRating = res.results.map((x: any) => x.rating)
        // console.log(this.myMovieIds);
        // console.log(this.userRating);
        // console.log(res);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }




  personsID() {
    this._ActivatedRoute.paramMap.subscribe((p) => {
      this.personId = p.get('id')
      // console.log(this.personId);
    })
  }


}
