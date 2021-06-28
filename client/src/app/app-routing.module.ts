import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HouseDetailComponent } from './components/house-detail/house-detail.component';
import { HouseComponent } from './components/house/house.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouteAComponent } from './components/route-a/route-a.component';
import { RouteBComponent } from './components/route-b/route-b.component';
import { ThemeComponent } from './components/theme/theme.component';

const routes: Routes = [
  {
    path: 'houses',
    component: HouseComponent,
    data: { animation: 'Houses' },
  },
  {
    path: 'house/:id',
    component: HouseDetailComponent,
    data: { animation: 'House' },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'Home' },
    children: [
      { path: 'route_a', component: RouteAComponent },
      { path: 'route_b', component: RouteBComponent },
    ],
  },
  {
    path: 'theme',
    component: ThemeComponent,
    data: { animation: 'Theme' },
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
