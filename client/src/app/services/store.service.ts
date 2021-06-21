import { Injectable, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { House } from '../models/house.model';
import { StateService } from '../shared/state.service';
import { FetchHouseService } from './http-request.service';

interface HouseState {
  houseList: Array<House>;
  categoryList: Array<Category>;
  selectedHouse: Object;
  createdHouse: Object;
  deletedHouse: Object;
  updatedHouse: Object;
  filteredHouseList: Array<House>;
  isLoading: Boolean;
  lastVisitTime: Date;
  toggleUpdateForm?: TemplateRef<any>;
}
const initialState: HouseState = {
  houseList: [],
  categoryList: [],
  selectedHouse: {},
  createdHouse: {},
  deletedHouse: {},
  updatedHouse: {},
  filteredHouseList: [],
  isLoading: false,
  lastVisitTime: new Date(0, 0, 0, 0),
  toggleUpdateForm: undefined,
};
@Injectable({
  providedIn: 'root',
})
export class StoreService extends StateService<HouseState> {
  constructor(private apiService: FetchHouseService) {
    super(initialState);

    // api called synchronously
    // this.loadData();

    // api called asynchronously
    this.loadDataAsync();
  }
  // state Observable for subscribers and get state data
  $state: Observable<HouseState> = this.select((state) => state);

  $isLoading: Observable<Boolean> = this.select((state) => state.isLoading);

  $selectedHouse: Observable<Object> = this.select((state) => state.selectedHouse);

  $houseList: Observable<Array<House>> = this.select(
    (state) => state.houseList
  );

  $categoryList: Observable<Array<Category>> = this.select(
    (state) => state.categoryList
  );

  $modalRef: Observable<any> = this.select((state) => state.toggleUpdateForm);

  setIsLoading(_isLoading: Boolean) {
    this.setState({ isLoading: _isLoading });
  }

  checkIsLoading(): Boolean {
    let isLoading = false;
    this.$isLoading.subscribe((data: any) => (isLoading = data));
    return isLoading;
  }

  triggerModal(content: TemplateRef<any>) {
    this.setState({ toggleUpdateForm: content });
    console.log(content);
  }

  loadData() {
    // fetchHouse complete then fetchCategory then setIsLoading false
    this.setIsLoading(true);
    this.apiService.fetchHouse().subscribe((data: any) => {
      this.setState({ houseList: data });
      console.log(data);
      this.apiService.fetchCategory().subscribe((data: any) => {
        this.setState({ categoryList: data });
        this.setIsLoading(false);
        console.log(data);
      });
    });
  }

  loadDataAsync() {
    this.setIsLoading(true);
    const fetchCategory = this.apiService.fetchCategory().subscribe({
      next: (data: any) => {
        this.setState({ categoryList: data });
        console.log(data);
      },
      complete: () => {
        if (this.checkIsLoading() === true && fetchHouse.closed === true) {
          this.setIsLoading(false);
        }
      },
    });

    const fetchHouse = this.apiService.fetchHouse().subscribe({
      next: (data: any) => {
        this.setState({ houseList: data });
        console.log(data);
      },
      complete: () => {
        if (this.checkIsLoading() === true && fetchCategory.closed === true) {
          this.setIsLoading(false);
        }
      },
    });
  }

  uploadHouse(house: House) {
    this.setIsLoading(true);
    this.apiService.uploadHouse(house).subscribe({
      next: (data: any) => {
        this.setState({ createdHouse: data });
        console.log(data);
      },
      complete: () => {
        if (this.checkIsLoading() === true) {
          this.setIsLoading(false);
          this.loadDataAsync();
        }
      },
    });
  }

  updateHouse(house: House) {
    this.setIsLoading(true);
    this.apiService.updateHouse(house).subscribe({
      next: (data: any) => {
        this.setState({ updatedHouse: data });
        console.log(data);
      },
      complete: () => {
        if (this.checkIsLoading() === true) {
          this.setIsLoading(false);
          this.loadDataAsync();
        }
      },
    });
  }

  deleteHouse(house: House) {
    this.setIsLoading(true);
    this.apiService.deleteHouse(house).subscribe({
      next: (data: any) => {
        this.setState({ deletedHouse: data });
        console.log(data);
      },
      complete: () => {
        if (this.checkIsLoading() === true) {
          this.setIsLoading(false);
          this.loadDataAsync();
        }
      },
    });
  }

  selectHouse(_house: House) {
    this.setState({ selectedHouse: _house });
  }

  setLastVisit(_date: Date) {
    this.setState({ lastVisitTime: _date });
  }

  filterHouse(_houseList: Array<House>) {
    this.setState({ filteredHouseList: _houseList });
  }
}
