import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false)


  show() {
    this.isLoading.next(true)
  }
  hide() {
    this.isLoading.next(false)
  }
}
