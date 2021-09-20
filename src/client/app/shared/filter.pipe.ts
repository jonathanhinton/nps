import { Pipe, PipeTransform } from '@angular/core';
import { Park } from './park.model';

@Pipe({
  name: 'parkFilter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Park[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.fullName.toLocaleLowerCase().includes(searchText);
    });
  }

}
