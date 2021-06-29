import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HouseRoutingModule } from './house-routing.module';
import { HouseComponent } from './house.component';
import { HouseCardComponent } from './house-card/house-card.component';
import { HouseControlPanelComponent } from './house-control-panel/house-control-panel.component';
import { HouseFormComponent } from './house-form/house-form.component';
import { HouseCarouselComponent } from './house-carousel/house-carousel.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ModalUpdateComponent } from '../modal-update/modal-update.component';
import { FilterByPricePipe } from 'src/app/pipes/filterByPrice.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/shared/directives/directive.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    HouseRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgbModule
  ],
  declarations: [
    HouseComponent,
    HouseCardComponent,
    HouseControlPanelComponent,
    HouseFormComponent,
    ModalUpdateComponent,
    HouseCarouselComponent,
    CategoryFormComponent,
    FilterByPricePipe,
  ],
})
export class HouseModule {}
