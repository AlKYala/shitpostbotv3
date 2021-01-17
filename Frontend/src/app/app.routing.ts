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
import {ShitpostPageComponent} from './shitpost-page/shitpost-page.component';
import {ProfileListComponent} from './profile-list/profile-list.component';
const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'images/add',
    component: ImageComponentComponent
  },
  {
    path: 'templates/add',
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
  },
  {
    path: 'generateShitpost',
    component: ShitpostPageComponent
  },
  {
    path: 'profiles/edit',
    component: ProfileListComponent
  }
];
export const appRoutingModule = RouterModule.forRoot(routes);
