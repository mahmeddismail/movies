import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seeMore'
})
export class SeeMorePipe implements PipeTransform {

  transform(text: string, limit: number): unknown {
    return text.split(' ').splice(0,limit).join(' ');
  }

}
