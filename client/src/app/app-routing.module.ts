import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HouseComponent } from './components/house/house.component';
import { RouteAComponent } from './components/route-a/route-a.component';
import { RouteBComponent } from './components/route-b/route-b.component';
import { ThemeComponent } from './components/theme/theme.component';

const routes: Routes = [
  {
    path: 'houses',
    component: HouseComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'route_a', component: RouteAComponent },
      { path: 'route_b', component: RouteBComponent },
    ],
  },
  {
    path: 'theme',
    component: ThemeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
