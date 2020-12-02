import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControlsSettings} from '../FormControlSettings/form.controls.settings';

@Component({
  selector: 'app-image-component',
  templateUrl: './image-component.component.html',
  styleUrls: ['./image-component.component.css']
})
export class ImageComponentComponent implements OnInit {
  public imageForm: FormGroup;
  public isLoaded: boolean;
  private FormControlSettings: any;

  constructor(
    // private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
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

}

/*
Ideen:
  -> Wenn keine URL eingefügt sollen auch keine Warnmeldungen kommen
  -> Sonst: Sowas wie "Bitte gib eine gueltige URL ein!
  -> Man kann dem hinzugefügtem Bild einen Titel geben (zur Suche spaeter!)
    -> sonst: Unnamed
 */
