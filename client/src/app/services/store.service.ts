import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { House } from '../models/house.model';
import { StateService } from '../shared/state.service';
import { FetchHouseService } from './fetch-house.service';

interface HouseState {
  houseList: Array<House>;
  categoryList: Array<Category>;
  // nullable for type House ?
  // ==> selectedHouse: House;
  selectedHouse: String;
  createdHouse: Object;
  deletedHouse: Object;
  filteredHouseList: Array<House>;
  isLoading: Boolean;
  lastVisitTime: Date; 
}
const initialState: HouseState = {
  houseList: [],
  categoryList: [],
  selectedHouse: '',
  createdHouse: {},
  deletedHouse: {},
  filteredHouseList: [],
  isLoading: false,
  lastVisitTime: new Date(0,0,0,0)
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
    // fetchHouse complete then fetchCategory then setIsLoading false
    this.setIsLoading(true);
    this.apiService.fetchHouse().subscribe((data: any) => {
      this.setState({ houseList: data });
      this.apiService.fetchCategory().subscribe((data: any) => {
        this.setState({ categoryList: data });
      });
      this.setIsLoading(false);
    });
    
    // below functions run asynchronously
    // ==> fetch data asynchronously
    // ==> cant control when to setIsLoading false
    // ==> setIsLoading(false) is set before api calls complete 
    // how to wait for both api calls complete then setIsLoading(false) ?
    
    // this.setIsLoading(true);
    // this.apiService.fetchCategory().subscribe((data: any) => {
    //   this.setState({ categoryList: data });
    // });
    // this.apiService.fetchHouse().subscribe((data: any) => {
    //   this.setState({ houseList: data });
    // });
    // this.setIsLoading(false);
  }

  selectHouse(_house: House) {
    this.setState({ selectedHouse: _house.id });
  }

  setLastVisit(_date: Date) {
    this.setState({ lastVisitTime: _date });
  }

  filterHouse(_houseList: Array<House>) {
    this.setState({ filteredHouseList: _houseList });
  }
}
