import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseDetailRoutingModule } from './house-detail-routing.module';
import { HouseDetailComponent } from './house-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, HouseDetailRoutingModule, FontAwesomeModule],
  declarations: [HouseDetailComponent],
})
export class HouseDetailModule {}
