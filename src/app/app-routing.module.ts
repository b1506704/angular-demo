import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { HomeComponent } from './components/home/home.component';
import { HouseComponent } from './components/house/house.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  { path: 'houses', component: HouseComponent },
  { path: 'home', component: HomeComponent },
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
export const ArrayOfComponents = [HomeComponent, HouseComponent, PostsComponent];
