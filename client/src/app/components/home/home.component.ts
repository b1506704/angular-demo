import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  msgFromChild = '';
  selectedHouse: Object = {};
  houseVisitTime: Date = new Date();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: StoreService
  ) {}
  subRouteA() {
    this.router.navigate(['route_a'], { relativeTo: this.route });
  }
  subRouteB() {
    this.router.navigate(['route_b'], { relativeTo: this.route });
  }
  setMsgFromChild(msg: string) {
    this.msgFromChild = msg;
  }
  ngOnInit(): void {
    // example of ActivatedRoute Observable
    this.route.url.subscribe((url) => console.log('Current route: ' + url));
    this.store.$state.subscribe((state) => {
      this.selectedHouse = state.selectedHouse;
      this.houseVisitTime = state.lastVisitTime;
    });
  }
}
