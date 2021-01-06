import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControlsSettings} from '../FormControlSettings/form.controls.settings';
import {ImageService} from '../../shared/image/service/image.service';
import {Image} from '../../shared/image/model/Image';
import {UserService} from '../../shared/user/service/user.service';
import {LocalStorageService} from '../../shared/services/localstorage.service';
import {User} from '../../shared/user/model/User';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {SubscriptionService} from '../../shared/services/subscription.service';

@Component({
  selector: 'app-image-component',
  templateUrl: './image-component.component.html',
  styleUrls: ['./image-component.component.css']
})
export class ImageComponentComponent implements OnInit, OnDestroy {
  public imageForm: FormGroup;
  public isLoaded: boolean;
  public currentUser: User;
  private subscriptions: Subscription[];

  constructor(
    // private formBuilder: FormBuilder
    private readonly imageService: ImageService,
    private readonly userService: UserService,
    private readonly localStorageService: LocalStorageService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
    private readonly subscriptionService: SubscriptionService
  ) { }

  public ngOnInit(): void {
    this.subscriptions = [];
    this.initCurrentUser();
    this.initImageForm();
    this.isLoaded = false;
  }

  public ngOnDestroy(): void {
    this.subscriptionService.unsubscribeAll(this.subscriptions);
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
    const subscription = this.userService.findByUsername(posterUsername).subscribe((user: User) => {
      this.currentUser = user;
    });
    this.subscriptions.push(subscription);
  }

  public uploadImage(): void {
    const $poster = this.currentUser;
    const $url = this.formControls.url.value;
    const image: Image = {id: 0, poster: $poster, url: $url};
    const subscription = this.imageService.create(image).subscribe(() => {
      this.toastrService.success("Image uploaded");
      this.router.navigate(['/']);
    }, (error) => {
      console.log(error);
      this.toastrService.warning("Upload failed");
    });
    this.subscriptions.push(subscription);
  }
}

/*
Ideen:
  -> Wenn keine URL eingefügt sollen auch keine Warnmeldungen kommen
  -> Sonst: Sowas wie "Bitte gib eine gueltige URL ein!
  -> Man kann dem hinzugefügtem Bild einen Titel geben (zur Suche spaeter!)
    -> sonst: Unnamed
 */
