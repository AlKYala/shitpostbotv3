import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControlsSettings} from '../FormControlSettings/form.controls.settings';

@Component({
  selector: 'app-template-component',
  templateUrl: './template-component.component.html',
  styleUrls: ['./template-component.component.css']
})
export class TemplateComponentComponent implements OnInit {
  public templateForm: FormGroup;
  public FormControlSettings: any;
  constructor() { }

  ngOnInit(): void {
    this.initImageForm();
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

  // loads image into cropper
  public loadImage(): void {

  }

}
