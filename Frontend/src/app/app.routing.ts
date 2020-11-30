import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {ImageComponentComponent} from './image-component/image-component.component';
import {TemplateComponentComponent} from './template-component/template-component.component';
import {NgModule} from '@angular/core';
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
  }
];

export const appRoutingModule = RouterModule.forRoot(routes);
