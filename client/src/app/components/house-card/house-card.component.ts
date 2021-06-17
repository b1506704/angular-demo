import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { House } from 'src/app/models/house.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.css']
})
export class HouseCardComponent implements OnInit {
  // data from parent component
  @Input() house: Array<House> = [];
  constructor(private store: StoreService) { }
  // set selectedHouse in store
  selectHouse (house: House) {
    this.store.selectHouse(house);
  }

  ngOnInit(): void {
  }

}
