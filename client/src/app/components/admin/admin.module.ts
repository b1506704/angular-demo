import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectivesModule } from 'src/app/shared/directives/directive.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalUpdateModule } from 'src/app/shared/components/modal-update/modal-update.module';
import { SortHeader } from './sort-header.directive';
import { HouseFormModule } from 'src/app/shared/components/house-form/house-form.module';
import { EditHouseComponent } from './edit-house/edit-house.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    DirectivesModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ModalUpdateModule,
    HouseFormModule
  ],
  declarations: [AdminComponent, SortHeader, EditHouseComponent],
})
export class AdminModule {}
