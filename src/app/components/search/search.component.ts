import { Component, HostListener } from '@angular/core';
import { error } from 'jquery';
import {  multiSearch } from 'src/app/interfaces/search';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movieSearch',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class searchComponent {

  elementRef: any;

  constructor(private _MoviesService: MoviesService) {
    this.searchingMulti();
    console.log(this.isSearchBarOpen);


  }

  // @ViewChild('mySearchInput') mySearchBox: ElementRef | undefined;
  multiSearch: multiSearch[]=[];
  movieSearch:any;
  tvSearch:any;
  personSearch:any;
  searchingAbout: string = ''
  selectedOption: string = 'multi'
  isSearchBarOpen: boolean = false;


  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if ((event.target as Element).closest('.searchInput')) {
      console.log(this.isSearchBarOpen);
      this.isSearchBarOpen = true;
    }
    else {

      console.log(this.isSearchBarOpen);
      this.isSearchBarOpen = false;
    }
  }

  searchingMulti() {
    this._MoviesService.search(this.searchingAbout,'multi').subscribe({
      next: (res) => {
        this.multiSearch = res.results.filter((i:any )=> i.profile_path!=null || i.poster_path!=null)
        .slice(0,25);
        console.log(this.multiSearch)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  searchingMovie() {
    this._MoviesService.search(this.searchingAbout,'movie').subscribe({
      next: (res) => {
        this.movieSearch = res.results.filter((i:any )=> i.profile_path!=null || i.poster_path!=null)
        .slice(0,25);
        console.log(this.movieSearch)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  searchingTv() {
    this._MoviesService.search(this.searchingAbout,'tv').subscribe({
      next: (res) => {
        this.tvSearch = res.results.filter((i:any )=> i.profile_path!=null || i.poster_path!=null)
        .slice(0,25);
        console.log(this.tvSearch)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  searchingPerson() {
    this._MoviesService.search(this.searchingAbout,'person').subscribe({
      next: (res) => {
        this.personSearch = res.results.filter((i:any )=> i.profile_path!=null || i.poster_path!=null)
        .slice(0,25);
        console.log(this.personSearch)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
