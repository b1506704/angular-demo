import { Component, OnInit } from '@angular/core';
import { House } from 'src/app/models/house.model';
import { FetchHouseService } from 'src/app/services/fetch-house.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {
  house: Array<House> = [];
  done: Boolean = false;
  constructor(private fetchHouse: FetchHouseService) { }

  ngOnInit(): void {
    this.fetchHouse.fetchHouse().subscribe((data: any) => {
      this.house = data;
      this.done = true;
    })
  }

}
