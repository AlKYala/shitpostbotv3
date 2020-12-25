import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControlsSettings} from '../FormControlSettings/form.controls.settings';
import {ImageService} from '../../shared/image/service/image.service';
import {Image} from '../../shared/image/model/Image';
import {UserService} from '../../shared/user/service/user.service';
import {LocalStorageService} from '../../shared/services/localstorage.service';
import {User} from '../../shared/user/model/User';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-image-component',
  templateUrl: './image-component.component.html',
  styleUrls: ['./image-component.component.css']
})
export class ImageComponentComponent implements OnInit {
  public imageForm: FormGroup;
  public isLoaded: boolean;
  public currentUser: User;

  constructor(
    // private formBuilder: FormBuilder
    private readonly imageService: ImageService,
    private readonly userService: UserService,
    private readonly localStorageService: LocalStorageService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.initCurrentUser();
    console.log("loading");
    this.initImageForm();
    this.isLoaded = false;
  }

  public initImageForm(): void {
    this.imageForm = new FormGroup(
      {
        url: FormControlsSettings.urlFormControl(),
        name: FormControlsSettings.nameFormControl()
      }
    );
    // this.setPreview();
  }

  public get formControls(): any {
    return this.imageForm.controls;
  }

  public fetchPreview(): void {
    this.isLoaded = true;
  }

  /*
  Sonst laedt er nicht rechtzeitig und so muss die Abfrage nur 1x gestaltet werden
   */
  private initCurrentUser(): void {
    const posterUsername: string = this.localStorageService.getCurrentUsername();
    console.log(posterUsername);
    this.userService.findByUsername(posterUsername).subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  public uploadImage(): void {
    const image: Image = new Image();
    image.setPoster(this.currentUser);
    image.setUrl(this.formControls.url.value);
    image.id = 0;
    this.imageService.create(image).subscribe(data => {
      this.toastrService.success("Image uploaded");
      this.router.navigate(['/']);
    }/*, error => {
      console.log(error);
      this.toastrService.warning("Upload failed");
    }*/);
  }
}

/*
Ideen:
  -> Wenn keine URL eingefügt sollen auch keine Warnmeldungen kommen
  -> Sonst: Sowas wie "Bitte gib eine gueltige URL ein!
  -> Man kann dem hinzugefügtem Bild einen Titel geben (zur Suche spaeter!)
    -> sonst: Unnamed
 */
