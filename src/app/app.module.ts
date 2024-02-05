import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { MoviesComponent } from './components/movies/movies.component';
import { SeriesComponent } from './components/series/series.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SeeMorePipe } from './see-more.pipe';
import { UpcomingMoviesComponent } from './components/upcoming-movies/upcoming-movies.component';
import { DetailsMovieComponent } from './components/details-movie/details-movie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailesTvComponent } from './components/detailes-tv/detailes-tv.component';
import { ROUTES, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TopRatedComponent } from './components/top-rated/top-rated.component';
import { CastComponent } from './components/cast/cast.component';
import { LoadingInterceptor } from './loading.interceptor';
import { LoadingComponent } from './components/loading/loading.component';
import { UserRatedComponent } from './components/user-rated/user-rated.component';
import { searchComponent } from './components/search/search.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    MoviesComponent,
    SeriesComponent,
    NotfoundComponent,
    SeeMorePipe,
    UpcomingMoviesComponent,
    DetailsMovieComponent,
    DetailesTvComponent,
    TopRatedComponent,
    CastComponent,
    LoadingComponent,
    UserRatedComponent,
    searchComponent,
    WatchlistComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, FormsModule
    , ReactiveFormsModule, NgbModule
    , BrowserAnimationsModule
    , RouterModule, CarouselModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
