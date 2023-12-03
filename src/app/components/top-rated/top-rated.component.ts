import { Component ,OnInit} from '@angular/core';
import { Movies } from 'src/app/interfaces/movies';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit{
constructor(private _MoviesService:MoviesService){}
ngOnInit(): void {
this.topRatedMovies()
this.getUserRate()
  
}

topRatedM:Movies[]=[]
userRate:[]=[]
myMovieIds: any;
topRatedMovies(){
  this._MoviesService.topRated().subscribe({
    next: (res) => {
      this.topRatedM = res.results

    },
    error: (err) => {
      console.log(err);

    }
  })
}

getUserRate(){
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
}

