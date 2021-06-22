import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HouseComponent } from './components/house/house.component';
import { PostsComponent } from './components/posts/posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { HttpClientModule } from '@angular/common/http';
import { HouseCardComponent } from './components/house-card/house-card.component';
import { HouseCarouselComponent } from './components/house-carousel/house-carousel.component';
import { RouteAComponent } from './components/route-a/route-a.component';
import { RouteBComponent } from './components/route-b/route-b.component';
import { HouseControlPanelComponent } from './components/house-control-panel/house-control-panel.component';
import { HouseFormComponent } from './components/house-form/house-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalUpdateComponent } from './components/modal-update/modal-update.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModifyDirective } from './directives/theme-modify.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    HouseComponent,
    PostsComponent,
    CreatePostComponent,
    HouseCardComponent,
    HouseCarouselComponent,
    RouteAComponent,
    RouteBComponent,
    HouseControlPanelComponent,
    HouseFormComponent,
    CategoryFormComponent,
    ModalUpdateComponent,
    NotificationComponent,
    ThemeModifyDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
