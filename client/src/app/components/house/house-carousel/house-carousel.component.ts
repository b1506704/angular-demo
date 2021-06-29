import { Component, Input, OnInit } from '@angular/core';
import { House } from 'src/app/models/house.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-house-carousel',
  templateUrl: './house-carousel.component.html',
  styleUrls: ['./house-carousel.component.css'],
})
export class HouseCarouselComponent implements OnInit {
  @Input() house: Array<House> = [];
  //test value for pipe
  filterValue: Number = 5;
  criteria: string = 'GREATER_THAN';
  
  constructor(private store: StoreService) {}
  ngOnInit(): void {}
}
