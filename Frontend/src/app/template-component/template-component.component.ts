import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControlsSettings} from '../FormControlSettings/form.controls.settings';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-template-component',
  templateUrl: './template-component.component.html',
  styleUrls: ['./template-component.component.css']
})
export class TemplateComponentComponent implements OnInit {
  // html can still access private members but compiler gives error message?
  public templateForm: FormGroup;
  public FormControlSettings: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  public tempCoordinates: number[];
  public croppedAreas: number[][];
  public imageUrl: string;
  public isActive: boolean;

  constructor() { }

  ngOnInit(): void {
    this.initImageForm();
    this.croppedAreas = [];
    this.imageUrl = "";
    this.isActive = false;
    this.tempCoordinates = [0, 0, 0, 0];
  }

  public initImageForm(): void {
    this.templateForm = new FormGroup( {
      url: FormControlsSettings.urlFormControl(),
      name: FormControlsSettings.nameFormControl()
    });
  }

  public get formControls(): any {
    return this.templateForm.controls;
  }

  public fetchImage() {
    this.isActive = true;
    this.imageUrl = this.formControls.url.value;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  /*
  x1 = breite links
  y1 = hoehe links
  2-er: analog rechts
   */
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event.imagePosition.x1, event.imagePosition.x2);
    console.log(event.imagePosition.y1, event.imagePosition.y2);
    this.tempCoordinates = [event.imagePosition.x1, event.imagePosition.x2, event.imagePosition.y1, event.imagePosition.y2];
  }
  imageLoaded(image: HTMLImageElement) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  private cloneCoordinates(arr: number[]): number[] {
    const clone: number[] = [];
    for (let i = 0; i <  arr.length; i++) {
      clone[i] = arr[i];
    }
    return arr;
  }
  public saveCoordinates(): void {
    this.croppedAreas.push(this.cloneCoordinates(this.tempCoordinates));
  }

  coordinateTracker(index, coordinate) {
    console.log(coordinate);
    return coordinate ? coordinate.id : undefined;
  }
  deleteCoordinate(index: number): void {
    const cropped: number[][] = [];
    for(let i = 0; i < this.croppedAreas.length; i++) {
      if (i === index) {
        continue;
      }
      // copy by reference enough
      cropped[i] = this.croppedAreas[i];
    }
    this.croppedAreas = cropped;
  }
}
