import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // does not rerender template with this
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'angular-demo';
  // universal loading value
  // does not change when changeDetection onPush ?
  isLoading: Boolean = false;

  constructor(private store: StoreService) {}
  
  ngOnInit() {
    // call store loadData function
    // this.store.loadData();
    // subscribe to state Observable then set isLoading value
    this.store.$state.subscribe((state: any) => {
      this.isLoading = state.isLoading;
      console.log(state);
    });
  }
}
