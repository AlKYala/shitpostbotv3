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
  public templateForm: FormGroup;
  public FormControlSettings: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  private croppedAreas: number[][];
  private imageUrl: string;

  constructor() { }

  ngOnInit(): void {
    this.initImageForm();
    this.croppedAreas = [];
    this.imageUrl = "";
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
    this.imageUrl = this.formControls.url.value;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
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
}
