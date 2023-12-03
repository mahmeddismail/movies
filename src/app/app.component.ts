import { Component, HostListener, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  constructor(private el: ElementRef, private renderer: Renderer2) { }


  @HostListener('window:scroll', ['$event'])
  ngOnInit(): void {
    this.navTransparent()
    this.positionedIconOpacity()
    this.myNav = this.el.nativeElement.querySelector('nav');
    // this.trendingPosition = $('.trending').offset()?.top
    //  console.log(this.trendingPosition);
    // console.log(this.myNav);
    setTimeout(() => {
      // this.trendingPosition = this.el.nativeElement.querySelector('.trending').getBoundingClientRect().top
      this.positionedIcon = this.el.nativeElement.querySelector('.positionedIcon')
      // console.log(this.positionedIcon);
    });
  }


  trendingPosition: any;
  positionedIcon: any
  myScrollTop: number = 0;
  myNav: HTMLElement | undefined
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navTransparent() {
    this.myScrollTop = window.scrollY
    // console.log("scroll   " + this.myScrollTop);
    // if (this.trendingPosition < 0) {
    if (this.myScrollTop > 1) {
      this.myNav?.classList.add('myScrollNav');
      this.myNav?.classList.remove('myNav');

    } else {
      this.myNav?.classList.remove('myScrollNav');
      this.myNav?.classList.add('myNav');
    }

  }

  positionedIconOpacity() {
    if (this.myScrollTop > 140) {
      this.positionedIcon?.classList.add('opacity-100');
      this.positionedIcon?.classList.remove('opacity-0');
    }
    else {
      this.positionedIcon?.classList.add('opacity-0');
      this.positionedIcon?.classList.remove('opacity-100');
    }
  }




}
//   constructor(private el: ElementRef) {}

//  ngOnInit(): void {
//   setTimeout(() => {
//     this.trendingElement = this.el.nativeElement.querySelector('.trending');
//     console.log(this.trendingElement);
//     this.navTransparent();
//   });
//  }
// scrollTop:any
// trendingElement = this.el.nativeElement 

//  navTransparent(){
//  $(window).scroll(() => {

//   this.scrollTop=$(window).scrollTop()

//   console.log(this.scrollTop);
//  })  
//  }