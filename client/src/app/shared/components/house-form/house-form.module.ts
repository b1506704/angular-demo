import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectivesModule } from '../../directives/directive.module';
import { HouseFormComponent } from './house-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DirectivesModule,
  ],
  declarations: [HouseFormComponent],
  exports: [HouseFormComponent],
})
export class HouseFormModule {}
