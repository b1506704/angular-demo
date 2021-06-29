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

  subscribeFromStore() {
    const stateObs$ = this.store.$state.subscribe((state: any) => {
      this.houseVisitTime = state.lastVisitTime;
    });
    return stateObs$;
  }

  ngOnInit(): void {
    this.subscribeFromStore();
  }

  ngOnDestroy(): void {
    // this.subscribeFromStore().unsubscribe();
  }
}
