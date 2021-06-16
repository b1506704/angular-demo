import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  msgFromChild = '';
  constructor(private route: ActivatedRoute, private router: Router) { }
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
  }

}
