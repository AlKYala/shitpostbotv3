import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {ImageComponentComponent} from './image-component/image-component.component';
import {TemplateComponentComponent} from './template-component/template-component.component';
import {NgModule} from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {LoginMaskComponent} from './login-mask/login-mask.component';
import {ImageGalleryComponent} from './image-gallery/image-gallery.component';
import {ImageDetailsComponent} from './image-details/image-details.component';
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
    path: 'image/:id',
    component: ImageDetailsComponent
  }
];

export const appRoutingModule = RouterModule.forRoot(routes);
