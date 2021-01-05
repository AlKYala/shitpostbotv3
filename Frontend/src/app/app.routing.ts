import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {ImageComponentComponent} from './image-component/image-component.component';
import {TemplateComponentComponent} from './template-component/template-component.component';
import {NgModule} from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {LoginMaskComponent} from './login-mask/login-mask.component';
import {ImageGalleryComponent} from './image-gallery/image-gallery.component';
import {ImageDetailsComponent} from './image-details/image-details.component';
import {TemplateGalleryComponent} from './template-gallery/template-gallery.component';
import {TemplateDetailComponent} from './template-detail/template-detail.component';
import {ProfileComponent} from './profile/profile.component';
const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'addImage',
    component: ImageComponentComponent
  },
  {
    path: 'addTemplate',
    component: TemplateComponentComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginMaskComponent
  },
  {
    path: 'images',
    component: ImageGalleryComponent
  },
  {
    path: 'images/:id',
    component: ImageDetailsComponent
  },
  {
    path: 'templates',
    component: TemplateGalleryComponent
  },
  {
    path: 'templates/:id',
    component: TemplateDetailComponent
  },
  {
    path: 'users/:id',
    component: ProfileComponent
  }];
export const appRoutingModule = RouterModule.forRoot(routes);
