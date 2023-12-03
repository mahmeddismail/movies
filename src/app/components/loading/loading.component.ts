import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  constructor(private _LoadingService: LoadingService) { }

  myLoading: boolean = false;
  
  ngOnInit(): void {
    this._LoadingService.isLoading.subscribe({
      next:(res)=>{
        if(res===true){
          this.myLoading=true
        }
        else{
          this.myLoading=false
        }
      }
    })
  }
}
