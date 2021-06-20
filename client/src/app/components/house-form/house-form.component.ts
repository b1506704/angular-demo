import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-house-form',
  templateUrl: './house-form.component.html',
  styleUrls: ['./house-form.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseFormComponent implements OnInit {
  @Input() category : Array<Category> = [];
  constructor(private store: StoreService) { }

  ngOnInit(): void {
    
  }

}
