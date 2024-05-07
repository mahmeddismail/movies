import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SeriesComponent } from './components/series/series.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UpcomingMoviesComponent } from './components/upcoming-movies/upcoming-movies.component';
import { DetailsMovieComponent } from './components/details-movie/details-movie.component';
import { DetailesTvComponent } from './components/detailes-tv/detailes-tv.component';
import { TopRatedComponent } from './components/top-rated/top-rated.component';
import { CastComponent } from './components/cast/cast.component';
import { UserRatedComponent } from './components/user-rated/user-rated.component';
import { searchComponent } from './components/search/search.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'Upcoming', component: UpcomingMoviesComponent },
  { path: 'topRated', component: TopRatedComponent },
  { path: 'detailedMovie/:id', component: DetailsMovieComponent },
  { path: 'detailedtv/:id', component: DetailesTvComponent },
  { path: 'series', component: SeriesComponent },
  { path: 'credits/:id', component: CastComponent },
  { path: 'userRating', component: UserRatedComponent},
  { path: 'mySearching', component: searchComponent},
  { path: 'watchlist', component: WatchlistComponent },
  // {path: 'watchlist', loadComponent: () => import('./components/watchlist/watchlist.component').then(mod => mod.WatchlistComponent)},
  // {path: 'userRating', loadComponent: () => import('./components/user-rated/user-rated.component').then(mod => mod.UserRatedComponent)},
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
