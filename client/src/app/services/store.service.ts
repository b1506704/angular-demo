import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { House } from '../models/house.model';
import { StateService } from '../shared/state.service';
import { FetchHouseService } from './fetch-house.service';

interface HouseState {
  houseList: Array<House>;
  // nullable for type House ?
  // ==> selectedHouse: House;
  selectedHouse: String;
  createdHouse: Object;
  deletedHouse: Object;
  filteredHouseList: Array<House>;
  isLoading: Boolean;
}
const initialState: HouseState = {
  houseList: [],
  selectedHouse: '',
  createdHouse: {},
  deletedHouse: {},
  filteredHouseList: [],
  isLoading: false,
};
@Injectable({
  providedIn: 'root',
})
export class StoreService extends StateService<HouseState> {
  constructor(private apiService: FetchHouseService) {
    super(initialState);
    this.loadData();
  }
  // state Observable for subscribers and get state data
  $state: Observable<HouseState> = this.select((state) => state);

  setIsLoading(_isLoading: Boolean) {
    this.setState({ isLoading: _isLoading });
  }

  loadData() {
    this.setIsLoading(true);
    this.apiService.fetchHouse().subscribe((data: any) => {
      this.setState({ houseList: data });
      this.setIsLoading(false);
    });
  }

  selectHouse(house: House) {
    this.setState({ selectedHouse: house.id });
  }
}
