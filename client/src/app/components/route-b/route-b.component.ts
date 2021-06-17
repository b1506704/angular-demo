import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-route-b',
  templateUrl: './route-b.component.html',
  styleUrls: ['./route-b.component.css']
})
export class RouteBComponent implements OnInit {

  constructor(private store: StoreService) { }

  fetchFromStore() {
    this.store.loadData();
  }

  ngOnInit(): void {
  }

}
