import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private store: StoreService) {}
  backgroundColor: string = '';
  isLoading$: Observable<Boolean> = this.store.$isLoading;
  ngOnInit(): void {
    // need rework
    this.store.$backgroundColor.subscribe((data: any) => {
      this.backgroundColor = data;
    })
  }
}
