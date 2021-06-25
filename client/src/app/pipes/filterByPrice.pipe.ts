import { Pipe, PipeTransform } from '@angular/core';
import { House } from '../models/house.model';

@Pipe({
  name: 'filterByPrice',
})
export class FilterByPricePipe implements PipeTransform {
  transform(
    items: Array<House>,
    criteriaInput: Number,
    criteria: string
  ): Array<House> {
    if (!items) {
      return [];
    }

    if (!criteria || !criteriaInput) {
      return items;
    }

    return items.filter((h: House) => {
      switch (criteria) {
        case 'EQUAL':
          return h.price === criteriaInput;
        case 'LESS_THAN':
          return h.price <= criteriaInput;
        case 'GREATER_THAN':
          return h.price > criteriaInput;
        default:
          return h;
      }
    });
  }
}
