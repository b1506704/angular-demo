import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeRoutingModule } from './theme-routing.module';
import { ThemeComponent } from './theme.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollSpyDirective } from 'src/app/directives/scroll-spy.directive';
import { DirectivesModule } from 'src/app/shared/directives/directive.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  declarations: [ThemeComponent, ScrollSpyDirective],
})
export class ThemeModule {}
