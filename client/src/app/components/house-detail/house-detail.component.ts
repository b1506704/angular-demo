import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { House } from 'src/app/models/house.model';
import { StoreService } from 'src/app/services/store.service';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css'],
})
export class HouseDetailComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  houseDetail$!: Observable<House>;
  constructor(private route: ActivatedRoute, private router: Router, private store: StoreService) {}

  getHouse() {
    this.houseDetail$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.store.getHouse(params.get('id')!))
    );
  }

  backToHouses() {
    this.router.navigate(['houses']);
  }

  ngOnInit(): void {
    this.getHouse();
  }
}
