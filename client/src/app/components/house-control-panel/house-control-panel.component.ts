import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-house-control-panel',
  templateUrl: './house-control-panel.component.html',
  styleUrls: ['./house-control-panel.component.css'],
})
export class HouseControlPanelComponent implements OnInit {
  @Input() category: Array<Category> = [];

  isHouseFormShow: Boolean = false;
  isCategoryFormShow: Boolean = false;

  constructor() {}

  showHouseForm() {
    this.isHouseFormShow = true;
    this.isCategoryFormShow = false;
  }

  showCategoryForm() {
    this.isCategoryFormShow = true;
    this.isHouseFormShow = false;
  }

  ngOnInit(): void {}
}
