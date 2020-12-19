import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import {appRoutingModule} from './app.routing';
import { UnterbarComponent } from './unterbar/unterbar.component';
import { LandingComponent } from './landing/landing.component';
import { ImageComponentComponent } from './image-component/image-component.component';
import { TemplateComponentComponent } from './template-component/template-component.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    UnterbarComponent,
    LandingComponent,
    ImageComponentComponent,
    TemplateComponentComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    appRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule,
    HttpClientModule
    //fuer routing
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
