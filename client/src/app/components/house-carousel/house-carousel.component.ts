import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { House } from 'src/app/models/house.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-house-carousel',
  templateUrl: './house-carousel.component.html',
  styleUrls: ['./house-carousel.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseCarouselComponent implements OnInit {
  house: Array<House> = [];
  constructor(private store: StoreService) { }

  ngOnInit(): void {
    // get data from store, instead of parent component
    this.store.$state.subscribe((state) => {
      this.house = state.houseList;
    })
  }

}
