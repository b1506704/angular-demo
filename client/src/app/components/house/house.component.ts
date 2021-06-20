import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { House } from 'src/app/models/house.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseComponent implements OnInit {
  date: Date = new Date();
  constructor(private store: StoreService) {}
  houseList$: Observable<Array<House>> = this.store.$houseList;
  categoryList$: Observable<Array<Category>> = this.store.$categoryList;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.store.setLastVisit(this.date);
  }
}
