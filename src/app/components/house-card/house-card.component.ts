import { Component, Input, OnInit } from '@angular/core';
import { House } from 'src/app/models/house.model';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.css']
})
export class HouseCardComponent implements OnInit {
  @Input() done: Boolean = false;
  @Input() house: Array<House> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
