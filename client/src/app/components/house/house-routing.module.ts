import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HouseComponent } from './house.component';

const routes: Routes = [
  {
    path: '',
    component: HouseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HouseRoutingModule {}
