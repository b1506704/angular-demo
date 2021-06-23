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

  constructor(private store: StoreService) {}
  
  houseList$: Observable<Array<House>> = this.store.$houseList;
  categoryList$: Observable<Array<Category>> = this.store.$categoryList;

  ngOnInit(): void {
    this.store.$isFiltering.subscribe((data: any) => {
      this.isFiltering = data;
      if (this.isFiltering === true) {
        this.houseList$ = this.store.$filteredHouseList;
      } else {
        this.houseList$ = this.store.$houseList;
      }
    });
  }

  ngOnDestroy(): void {
    this.store.setLastVisit(this.date);
  }
}
