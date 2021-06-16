import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { HomeComponent } from './components/home/home.component';
import { HouseComponent } from './components/house/house.component';
import { PostsComponent } from './components/posts/posts.component';
import { RouteAComponent } from './components/route-a/route-a.component';
import { RouteBComponent } from './components/route-b/route-b.component';

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
    path: 'posts',
    component: PostsComponent,
    children: [
      { path: '', component: PostsComponent },
      { path: 'create_post', component: CreatePostComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
// export const ArrayOfComponents = [
//   HomeComponent,
//   HouseComponent,
//   PostsComponent,
//   RouteAComponent,
//   RouteBComponent,
// ];
