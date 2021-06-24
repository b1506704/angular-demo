import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { StoreService } from 'src/app/services/store.service';

import { nonAccentVietnamese } from 'src/app/utils/convertToNonAccent';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-house-control-panel',
  templateUrl: './house-control-panel.component.html',
  styleUrls: ['./house-control-panel.component.css'],
})
export class HouseControlPanelComponent implements OnInit {
  faSearch = faSearch;
  @Input() category!: Array<Category>;

  isHouseFormShow: Boolean = false;
  isCategoryFormShow: Boolean = false;
  criteria: string = '';

  constructor(private store: StoreService, private fb: FormBuilder) {}

  filterForm = this.fb.group({
    category: [''],
    gtArea: [0],
    gtFront: [0],
  });

  searchForm = this.fb.group({
    searchMessage: [''],
  });

  showHouseForm() {
    this.isHouseFormShow = true;
    this.isCategoryFormShow = false;
  }

  showCategoryForm() {
    this.isCategoryFormShow = true;
    this.isHouseFormShow = false;
  }

  resetField() {
    this.filterForm.reset();
  }
  
  filterHouse() {
    this.store.$houseList
      .subscribe((data: any) => {
        this.store.filterHouse(
          data.filter((h: any) => {
            this.criteria = '';
            const criteria =
              h.category === this.filterForm.value.category &&
              h.area > Number(this.filterForm.value.gtArea) &&
              h.front > Number(this.filterForm.value.gtFront);
            this.criteria += `${this.filterForm.value.category} 
            | Area> ${this.filterForm.value.gtArea}  
            | Front> ${this.filterForm.value.gtFront}
            `;
            return criteria;
          }),
          this.criteria
        );
        this.store.setIsFiltering(true);
      })
      .unsubscribe();
  }

  searchHouse() {
    const searchObs$ = this.searchForm.valueChanges.subscribe((input: any) => {
      this.store.$houseList
        .subscribe((data: any) => {
          this.store.searchHouse(
            data.filter((h: any) => {
              const houseMessage = nonAccentVietnamese(h.message);
              const inputMessage = nonAccentVietnamese(input.searchMessage);
              return houseMessage.includes(inputMessage);
            }),
            input.searchMessage
          );
          this.store.setIsSearching(true);
        })
        .unsubscribe();
    });
    return searchObs$;
  }

  onSubmit() {
    this.filterHouse();
  }

  onReset() {
    this.store.setIsFiltering(false);
    this.store.setIsSearching(false);
    this.criteria = '';
  }

  ngOnInit(): void {
    this.searchHouse();
  }

  ngOnDestroy(): void {
    // cant subscribe again after 2nd visist
    // this.searchHouse().unsubscribe();
  }
}
