import { Injectable, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { House } from '../models/house.model';
import { StateService } from '../shared/services/state.service';
import { FetchHouseService } from './http-request.service';
import { NotificationService } from './notification.service';

interface HouseState {
  houseList: Array<House>;
  categoryList: Array<Category>;
  selectedHouse: Object;
  createdHouse: Object;
  createdCategory: Object;
  deletedHouse: Object;
  updatedHouse: Object;
  filteredHouseList: Array<House>;
  searchedHouseList: Array<House>;
  isLoading: Boolean;
  isFiltering: Boolean;
  isSearching: Boolean;
  lastVisitTime: Date;
  toggleUpdateForm?: TemplateRef<any>;
  backgroundColor: any;
  textColor: any;
  cardBackgroundColor: any;
  cardTextColor: any;
  typoFontSize: any;
  typoLetterSpacing: any;
  typoFontFamily: any;
  hoverTextColor: any;
  hoverBackgroundColor: any;
}
const initialState: HouseState = {
  houseList: [],
  categoryList: [],
  selectedHouse: {},
  createdHouse: {},
  createdCategory: {},
  deletedHouse: {},
  updatedHouse: {},
  filteredHouseList: [],
  searchedHouseList: [],
  isLoading: false,
  isFiltering: false,
  isSearching: false,
  lastVisitTime: new Date(0, 0, 0, 0),
  toggleUpdateForm: undefined,
  backgroundColor: undefined,
  textColor: undefined,
  cardBackgroundColor: undefined,
  cardTextColor: undefined,
  typoFontSize: 15,
  typoLetterSpacing: 0,
  typoFontFamily: 'monospace',
  hoverTextColor: undefined,
  hoverBackgroundColor: undefined,
};
@Injectable({
  providedIn: 'root',
})
export class StoreService extends StateService<HouseState> {
  constructor(
    private apiService: FetchHouseService,
    private notifService: NotificationService
  ) {
    super(initialState);

    // api called synchronously
    // this.loadData();

    // api called asynchronously
    this.loadDataAsync();
  }
  // state Observable for subscribers and get state data
  $state: Observable<HouseState> = this.select((state) => state);

  $isLoading: Observable<Boolean> = this.select((state) => state.isLoading);

  $isFiltering: Observable<Boolean> = this.select((state) => state.isFiltering);

  $isSearching: Observable<Boolean> = this.select((state) => state.isSearching);

  $selectedHouse: Observable<Object> = this.select(
    (state) => state.selectedHouse
  );

  $houseList: Observable<Array<House>> = this.select(
    (state) => state.houseList
  );

  $filteredHouseList: Observable<Array<House>> = this.select(
    (state) => state.filteredHouseList
  );

  $searchedHouseList: Observable<Array<House>> = this.select(
    (state) => state.searchedHouseList
  );

  $backgroundColor: Observable<any> = this.select(
    (state) => state.backgroundColor
  );

  $textColor: Observable<any> = this.select((state) => state.textColor);

  $cardBackgroundColor: Observable<any> = this.select(
    (state) => state.cardBackgroundColor
  );

  $cardTextColor: Observable<any> = this.select((state) => state.cardTextColor);

  $typoFontSize: Observable<any> = this.select((state) => state.typoFontSize);

  $typoLetterSpacing: Observable<any> = this.select(
    (state) => state.typoLetterSpacing
  );

  $typoFontFamily: Observable<any> = this.select(
    (state) => state.typoFontFamily
  );

  $hoverBackgroundColor: Observable<any> = this.select(
    (state) => state.hoverBackgroundColor
  );

  $hoverTextColor: Observable<any> = this.select(
    (state) => state.hoverTextColor
  );

  $categoryList: Observable<Array<Category>> = this.select(
    (state) => state.categoryList
  );

  $modalRef: Observable<any> = this.select((state) => state.toggleUpdateForm);

  setIsLoading(_isLoading: Boolean) {
    this.setState({ isLoading: _isLoading });
  }

  setIsFiltering(_isFiltering: Boolean) {
    this.setState({ isFiltering: _isFiltering });
    this.showNotifSuccess(_isFiltering === true ? 'FILTER: ON' : 'FILTER: OFF');
  }

  setIsSearching(_isSearching: Boolean) {
    this.setState({ ...this.state, isSearching: _isSearching });
  }

  checkIsLoading(): Boolean {
    let isLoading = false;
    this.$isLoading.subscribe((data: any) => (isLoading = data));
    return isLoading;
  }

  triggerModal(content: TemplateRef<any>) {
    this.setState({ toggleUpdateForm: content });
    // console.log(content);
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
          this.showNotifSuccess('Load data successfully!');
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
          this.showNotifSuccess('Load data successfully!');
        }
      },
    });
  }

  uploadCategory(category: Category) {
    this.setIsLoading(true);
    this.apiService.uploadCategory(category).subscribe({
      next: (data: any) => {
        this.setState({ createdCategory: data });
        console.log(data);
      },
      complete: () => {
        if (this.checkIsLoading() === true) {
          this.setIsLoading(false);
          this.loadDataAsync();
          this.showNotifSuccess(`Category: ${category.name} uploaded!`);
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
          this.setIsFiltering(false);
          this.setIsSearching(false);
          this.showNotifSuccess(`House ${house.id} uploaded!`);
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
          this.setIsFiltering(false);
          this.setIsSearching(false);
          this.showNotifSuccess(`House ${house.id} updated!`);
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
          this.setIsFiltering(false);
          this.setIsSearching(false);
          this.showNotifSuccess(`House ${house.id} deleted!`);
        }
      },
    });
  }

  selectHouse(_house: House) {
    this.setState({ selectedHouse: _house });
  }

  getHouse(id: string | number) {
    return this.$houseList.pipe(
      map((houses: Array<House>) => houses.find((house) => house.id === id)!)
    );
  }

  setLastVisit(_date: Date) {
    this.setState({ lastVisitTime: _date });
  }

  filterHouse(_houseList: Array<House>, _criteria: string) {
    this.setState({ filteredHouseList: _houseList });
    this.showNotifSuccess(`Filter with ${_criteria}`);
  }

  searchHouse(_houseList: Array<House>, _criteria: string) {
    this.setState({ searchedHouseList: _houseList });
    // this.showNotifSuccess(`Search with message: '${_criteria}'`);
  }

  showNotifSuccess(msg: any) {
    this.notifService.showNotif(msg, {
      delay: 3500,
    });
  }

  showNotifError(msg: any) {
    this.notifService.showNotif(msg, {
      classname: 'bg-danger text-light shadow-lg',
      delay: 3500,
    });
  }

  showNotifWithTemplate(templateRef: any) {
    this.notifService.showNotif(templateRef, {
      classname: 'bg-danger text-light shadow-lg',
      delay: 3500,
    });
  }

  setBackgroundColor(color: any) {
    this.setState({ backgroundColor: color });
    this.showNotifSuccess(`Set background color to ${color}`);
  }

  setTextColor(color: any) {
    this.setState({ textColor: color });
    this.showNotifSuccess(`Set text color to ${color}`);
  }

  setCardBackgroundColor(color: any) {
    this.setState({ cardBackgroundColor: color });
    this.showNotifSuccess(`Set card background color to ${color}`);
  }

  setCardTextColor(color: any) {
    this.setState({ cardTextColor: color });
    this.showNotifSuccess(`Set card text color to ${color}`);
  }

  setTypoFontSize(fontSize: any) {
    this.setState({ typoFontSize: fontSize });
    this.showNotifSuccess(`Set font size to ${fontSize}`);
  }

  setTypoLetterSpacing(px: any) {
    this.setState({ typoLetterSpacing: px });
    this.showNotifSuccess(`Set letter spacing to ${px}`);
  }

  setTypoFontFamily(fontFamily: any) {
    this.setState({ typoFontFamily: fontFamily });
    this.showNotifSuccess(`Set font family to ${fontFamily}`);
  }

  setHoverTextColor(color: any) {
    this.setState({ hoverTextColor: color });
    this.showNotifSuccess(`Set hover text color to ${color}`);
  }

  setHoverBackgroundColor(color: any) {
    this.setState({ hoverBackgroundColor: color });
    this.showNotifSuccess(`Set hover background color to ${color}`);
  }
}
