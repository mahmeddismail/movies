import { Component } from '@angular/core';
import { error } from 'jquery';
import { Search } from 'src/app/interfaces/search';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movieSearch',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class searchComponent {
  constructor(private _MoviesService: MoviesService) {
    // this.searching()
  }
  searchArray: Search[]=[];
  searchingAbout: string = ''
  searching() {
    this._MoviesService.search(this.searchingAbout,'multi').subscribe({
      next: (res) => {
        this.searchArray = res.results.filter((i:any )=> i.profile_path!=null || i.poster_path!=null)
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
