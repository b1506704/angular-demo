import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { House } from 'src/app/models/house.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseComponent implements OnInit {
  house: Array<House> = [];
  constructor(private store: StoreService) { }

  ngOnInit(): void {
    // this.store.loadData();
    this.store.$state.subscribe((state: any) => {
      this.house = state.houseList;
    })
  }

}
