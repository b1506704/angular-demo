import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'houses',
    data: { animation: 'Houses' },
    loadChildren: () => import('./components/house/house.module').then(m => m.HouseModule)
  },
  {
    path: 'house/:id',
    data: { animation: 'House' },
    loadChildren: () => import('./components/house-detail/house-detail.module').then(m => m.HouseDetailModule)
  },
  {
    path: 'home', 
    data: { animation: 'Home' },
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'theme',
    data: { animation: 'Theme' },
    loadChildren: () => import('./components/theme/theme.module').then(m => m.ThemeModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () => import('./components/not-found/not-found.module').then(m => m.NotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
