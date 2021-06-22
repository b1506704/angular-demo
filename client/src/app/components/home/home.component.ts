import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { House } from 'src/app/models/house.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  msgFromChild = '';
  selectedHouse!: House;
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

  setWhiteBg() {
    this.store.setBackgroundColor('white');
  }

  setDarkBg() {
    this.store.setBackgroundColor('black');
  }

  setCustomBg(color: any) {
    this.store.setBackgroundColor(color);
  }

  ngOnInit(): void {
    // example of ActivatedRoute Observable
    this.route.url.subscribe((url) => console.log('Current route: ' + url));
    this.store.$state.subscribe((state: any) => {
      this.selectedHouse = state.selectedHouse;
      this.houseVisitTime = state.lastVisitTime;
    });
  }
  // unsubscribe observable
}
