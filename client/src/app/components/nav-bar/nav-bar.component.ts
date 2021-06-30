import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { faHome, faWarehouse, faShapes, faTools } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  faHome = faHome;
  faHouse = faWarehouse;
  faShapes = faShapes;
  faTools = faTools;

  constructor(private store: StoreService) {}
  isLoading$: Observable<Boolean> = this.store.$isLoading;
  ngOnInit(): void {}
}
