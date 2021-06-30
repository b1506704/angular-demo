import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HouseRoutingModule } from './house-routing.module';
import { HouseComponent } from './house.component';
import { HouseCardComponent } from './house-card/house-card.component';
import { HouseControlPanelComponent } from './house-control-panel/house-control-panel.component';
import { HouseCarouselComponent } from './house-carousel/house-carousel.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { FilterByPricePipe } from 'src/app/pipes/filterByPrice.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/shared/directives/directive.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalUpdateModule } from 'src/app/shared/components/modal-update/modal-update.module';
import { HouseFormModule } from 'src/app/shared/components/house-form/house-form.module';

@NgModule({
  imports: [
    CommonModule,
    HouseRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgbModule,
    ModalUpdateModule,
    HouseFormModule
  ],
  declarations: [
    HouseComponent,
    HouseCardComponent,
    HouseControlPanelComponent,
    HouseCarouselComponent,
    CategoryFormComponent,
    FilterByPricePipe,
  ],
})
export class HouseModule {}
