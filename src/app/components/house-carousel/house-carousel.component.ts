import { Component, Input, OnInit } from '@angular/core';
import { House } from 'src/app/models/house.model';

@Component({
  selector: 'app-house-carousel',
  templateUrl: './house-carousel.component.html',
  styleUrls: ['./house-carousel.component.css']
})
export class HouseCarouselComponent implements OnInit {
  @Input() done: Boolean = false;
  @Input() house: Array<House> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
