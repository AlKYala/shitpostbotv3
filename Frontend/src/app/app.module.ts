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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginMaskComponent} from './login-mask/login-mask.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import {JwtInterceptor} from '../shared/security/jwt.interceptor';
import {ErrorInterceptor} from '../shared/security/error.interceptor';
import { ImageGalleryItemComponent } from './image-gallery-item/image-gallery-item.component';
import { ImageDetailsComponent } from './image-details/image-details.component';

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
    LoginMaskComponent,
    ImageGalleryComponent,
    ImageGalleryItemComponent,
    ImageDetailsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    appRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
