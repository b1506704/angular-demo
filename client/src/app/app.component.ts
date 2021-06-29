import { Component, OnInit } from '@angular/core';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { slideInAnimation } from './animations/transition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  title = 'angular-demo';
  lazyLoading!: Boolean;
  getAnimationData(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
  constructor(private router: Router) {}

  ngOnInit() {
    this.lazyLoading = false;

    this.router.events.subscribe((event: any): void => {
      if (event instanceof RouteConfigLoadStart) {
        this.lazyLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.lazyLoading = false;
      }
    });
  }
}
