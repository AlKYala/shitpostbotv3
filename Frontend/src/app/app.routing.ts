import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  }
];

export const appRoutingModule = RouterModule.forRoot(routes);
