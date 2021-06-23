import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-house-control-panel',
  templateUrl: './house-control-panel.component.html',
  styleUrls: ['./house-control-panel.component.css'],
})
export class HouseControlPanelComponent implements OnInit {
  @Input() category!: Array<Category>;

  isHouseFormShow: Boolean = false;
  isCategoryFormShow: Boolean = false;

  constructor(private store: StoreService, private fb: FormBuilder) {}

  filterForm = this.fb.group({
    category: [''],
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
  // todo: more criteria
  filterHouse() {
    this.store.$houseList
      .subscribe((data: any) => {
        this.store.filterHouse(
          data.filter(
            (h: any) => h.category === this.filterForm.value.category
          ),
          this.filterForm.value.category
        );
        this.store.setIsFiltering(true);
      })
      .unsubscribe();
  }

  onSubmit() {
    this.filterHouse();
  }

  onReset() {
    this.store.setIsFiltering(false);
  }

  ngOnInit(): void {}
}
