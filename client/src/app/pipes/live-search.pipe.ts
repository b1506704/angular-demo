import { Pipe, PipeTransform } from '@angular/core';
import { House } from '../models/house.model';

@Pipe({
  name: 'liveSearch',
})
export class LiveSearchPipe implements PipeTransform {
  // todo: implement search criteria
  transform(items: Array<House>, searchValue: string): Array<any> {
    if (!items) {
      return [];
    }
    if (!searchValue) {
      return items;
    }

    searchValue = searchValue.toLocaleLowerCase();

    return items.filter((e: House) => {
      return e.message.toLocaleLowerCase().includes(searchValue);
    });
  }
}
