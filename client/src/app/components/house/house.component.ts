import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { House } from 'src/app/models/house.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css'],
})
export class HouseComponent implements OnInit {
  date: Date = new Date();
  isFiltering: Boolean = false;
  isSearching: Boolean = false;

  constructor(private store: StoreService) {}

  houseList$: Observable<Array<House>> = this.store.$houseList;
  categoryList$: Observable<Array<Category>> = this.store.$categoryList;

  filterListener() {
    const filterObs$ = this.store.$isFiltering.subscribe((data: any) => {
      this.isFiltering = data;
      if (this.isFiltering === true) {
        this.houseList$ = this.store.$filteredHouseList;
      } else {
        this.houseList$ = this.store.$houseList;
      }
    });
    return filterObs$;
  }

  searchListener() {
    const searchObs$ = this.store.$isSearching.subscribe((data: any) => {
      this.isSearching = data;
      if (this.isSearching === true) {
        this.houseList$ = this.store.$searchedHouseList;
      } else {
        this.houseList$ = this.store.$houseList;
      }
    });
    return searchObs$;
  }

  ngOnInit(): void {
    this.searchListener();
    this.filterListener();
  }

  ngOnDestroy(): void {
    this.searchListener().unsubscribe();
    this.filterListener().unsubscribe();
    this.store.setLastVisit(this.date);
  }
}
