import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { multiSearch } from 'src/app/interfaces/search';
import { MoviesService } from 'src/app/services/movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movieSearch',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class searchComponent implements OnInit {

  elementRef: any;
  id: any;
  routeSubscription: Subscription | undefined;
  constructor(private _MoviesService: MoviesService, private _ActivatedRoute: ActivatedRoute, private _Router: Router) {
    // this.searchingMulti();
    // console.log(this.isSearchBarOpen);

  }
  ngOnInit(): void {
    this.navigateToDetail();
  }

  navigateToDetail() {
    this._Router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }
  // @ViewChild('mySearchInput') mySearchBox: ElementRef | undefined;
  multiSearch: multiSearch[] = [];
  movieSearch: any;
  tvSearch: any;
  personSearch: any;
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
    this._MoviesService.search(this.searchingAbout, 'multi').subscribe({
      next: (res) => {
        this.multiSearch = res.results.filter((i: any) => i.profile_path != null || i.poster_path != null)
          .slice(0, 25);
        console.log(this.multiSearch)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  searchingMovie() {
    this._MoviesService.search(this.searchingAbout, 'movie').subscribe({
      next: (res) => {
        this.movieSearch = res.results.filter((i: any) => i.profile_path != null || i.poster_path != null)
          .slice(0, 25);
        console.log(this.movieSearch)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  searchingTv() {
    this._MoviesService.search(this.searchingAbout, 'tv').subscribe({
      next: (res) => {
        this.tvSearch = res.results.filter((i: any) => i.profile_path != null || i.poster_path != null)
          .slice(0, 25);
        console.log(this.tvSearch)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  searchingPerson() {
    this._MoviesService.search(this.searchingAbout, 'person').subscribe({
      next: (res) => {
        this.personSearch = res.results.filter((i: any) => i.profile_path != null || i.poster_path != null)
          .slice(0, 25);
        console.log(this.personSearch)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  // emptySearching(){ used it in anchor tag directly
  //   this.searchingAbout = ''
  // }

}
