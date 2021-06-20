import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'angular-demo';
  
  constructor(private store: StoreService, private cdf: ChangeDetectorRef) {}

  isLoading$: Observable<Boolean> = this.store.$isLoading;
  
  ngOnInit() {
      // this.cdf.markForCheck();
    // subscribe to state Observable then set isLoading value
    // this.store.$state.subscribe((state: any) => {
    //   this.isLoading = state.isLoading;
    //   console.log(state);
    // });
  }
}
