import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControlsSettings} from '../FormControlSettings/form.controls.settings';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {User} from '../../shared/user/model/User';
import {TemplateService} from '../../shared/template/service/template.service';
import {UserService} from '../../shared/user/service/user.service';
import {LocalStorageService} from '../../shared/services/localstorage.service';
import {Coordinate} from '../../shared/coordinate/model/Coordinate';
import {Template} from '../../shared/template/model/Template';
import {first} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {CoordinateService} from '../../shared/coordinate/service/coordinate.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {SubscriptionService} from '../../shared/services/subscription.service';

@Component({
  selector: 'app-template-component',
  templateUrl: './template-component.component.html',
  styleUrls: ['./template-component.component.scss']
})
export class TemplateComponentComponent implements OnInit, OnDestroy {
  // html can still access private members but compiler gives error message?
  public templateForm: FormGroup;
  public FormControlSettings: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  public tempCoordinates: number[];
  public base64Preview: string;
  public croppedAreas: number[][];
  public displayedPreviews: boolean[];
  // saves the cropped images as base64
  public croppedAreasPreview: string[];
  public imageUrl: string;
  public isActive: boolean;
  private currentUser: User;
  public subscriptions: Subscription[];

  constructor(private readonly templateService: TemplateService,
              private readonly userService: UserService,
              private readonly localStorageService: LocalStorageService,
              private readonly toastrService: ToastrService,
              private readonly coordinateService: CoordinateService,
              private readonly router: Router,
              private readonly subscriptionService: SubscriptionService) {
  }

  ngOnInit(): void {
    this.subscriptions = [];
    this.initImageForm();
    this.croppedAreas = [];
    this.croppedAreasPreview = [];
    this.displayedPreviews = [];
    this.imageUrl = '';
    this.isActive = false;
    this.tempCoordinates = [0, 0, 0, 0];
    this.initCurrentUser();
  }

  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeAll(this.subscriptions);
  }

  public initImageForm(): void {
    this.templateForm = new FormGroup({
      url: FormControlsSettings.urlFormControl(),
      name: FormControlsSettings.nameFormControl()
    });
  }

  public get formControls(): any {
    return this.templateForm.controls;
  }

  public fetchImage(): void {
    if (this.imageUrl !== this.formControls.url.value) {
      this.disableAll();
      this.isActive = true;
      this.imageUrl = this.formControls.url.value;
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  /*
  x1 = breite links
  y1 = hoehe links
  2-er: analog rechts
   */
  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
    this.base64Preview = event.base64;
    // console.log(event.imagePosition.x1, event.imagePosition.x2);
    // console.log(event.imagePosition.y1, event.imagePosition.y2);
    this.tempCoordinates = [event.imagePosition.x1, event.imagePosition.x2, event.imagePosition.y1, event.imagePosition.y2];
  }

  imageLoaded(image: HTMLImageElement): void {
    // show cropper
  }

  cropperReady(): void {
    // cropper ready
  }

  loadImageFailed(): void {
    // show message
  }

  private initCurrentUser(): void {
    const posterUsername: string = this.localStorageService.getCurrentUsername();
    // console.log(posterUsername);
    const subscription = this.userService.findByUsername(posterUsername).subscribe((user: User) => {
      this.currentUser = user;
    });
    this.subscriptions.push(subscription);
  }

  private cloneLocation(arr: number[]): number[] {
    const clone: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      clone.push(arr[i]);
    }
    return arr;
  }

  /**
   * Used in api-Calls to backend later
   * Only passes the undeleted (=remain true) previews
   */
  private clonePreviews(): string[] {
    const previewImages: string[] = [];
    for (let i = 0; i < this.croppedAreasPreview.length; i++) {
      if (this.displayedPreviews[i]) {
        previewImages.push(this.croppedAreasPreview[i]);
      }
    }
    return previewImages;
  }

  /**
   * Used in api-Calls to backend later
   * Only passes the undeleted (=remain true) coordinates
   */
  private cloneCoordinates(): number[][] {
    const coordinates: number[][] = [];
    for (let i = 0; i < this.croppedAreas.length; i++) {
      if (this.displayedPreviews[i]) {
        coordinates.push(this.croppedAreas[i]);
      }
    }
    return coordinates;
  }

  public saveCoordinates(): void {
    this.croppedAreas.push(this.cloneLocation(this.tempCoordinates));
    this.croppedAreasPreview.push(this.base64Preview.valueOf());
    this.displayedPreviews.push(true);
  }

  coordinateTracker(index, coordinate): any {
    // console.log(coordinate);
    return coordinate ? coordinate.id : undefined;
  }

  private disableAll(): void {
    for (let i = 0; i < this.displayedPreviews.length; i++) {
      this.deleteCoordinate(i);
    }
  }

  deleteCoordinate(index: number): void {
    /*
    old idea: Remove elements at index index and clone arrays without element at index then reassign
      problems:
        -> inefficient complexity wise
        -> cards remain
    new idea: keep a seperate array for booleans
      -> when element is added value TRUE is added to vector
      -> when it is to be deleted, set the index to delete in the boolean vector to false
      -> set the base64 value for images to "" to save space
    const cropped: number[][] = [];
    const cropPreview: string[] = [];
    for (let i = 0; i < this.croppedAreas.length; i++) {
      if (i === index) {
        continue;
      }
      // copy by reference enough
      cropped[i] = this.croppedAreas[i];
      cropPreview[i] = this.croppedAreasPreview[i];
    }
    this.croppedAreas = cropped;
    this.croppedAreasPreview = cropPreview;*/
    this.displayedPreviews[index] = false;
    this.croppedAreasPreview[index] = '';
  }

  private initCoordinateInstances(template: Template): Coordinate[] {
    const coordinates: Coordinate[] = [];
    for (const area of this.croppedAreas) {
      const coordinate: Coordinate = {id: template.id, x1: area[0], x2: area[1], y1: area[2], y2: area[3], reference: template};
      coordinates.push(coordinate);
    }
    return coordinates;
  }

  public submit(): void {
    const template: Template = {
      id: 0,
      baseUrl: this.formControls.url.value,
      poster: this.currentUser
    };
    const subscription = this.templateService.create(template).subscribe((data) => {
      console.log(data);
      const coordinates: Coordinate[] = this.initCoordinateInstances(template);
      template.id = data.id;
      for (const coordinate of coordinates) {
        const subscriptionC = this.coordinateService.create(coordinate).subscribe(() => {
        });
        this.subscriptions.push(subscriptionC);
      }
      this.toastrService.success('Template uploaded');
      this.router.navigate(['/']);
    });
    this.subscriptions.push(subscription);
  }
}
