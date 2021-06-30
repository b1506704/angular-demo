import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUpdateComponent } from './modal-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectivesModule } from '../../directives/directive.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    DirectivesModule,
  ],
  declarations: [ModalUpdateComponent],
  exports: [ModalUpdateComponent],
})
export class ModalUpdateModule {}
