import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { House } from 'src/app/models/house.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-house-carousel',
  templateUrl: './house-carousel.component.html',
  styleUrls: ['./house-carousel.component.css'],
})
export class HouseCarouselComponent implements OnInit {
  constructor(private store: StoreService) {}

  houseList$: Observable<Array<House>> = this.store.$houseList;

  ngOnInit(): void {}
}
