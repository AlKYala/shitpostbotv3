import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControlsSettings} from '../FormControlSettings/form.controls.settings';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  private FormControlSettings: any;

  constructor() { }

  ngOnInit(): void {
  }

  public initRegisterForm(): void {
    this.registerForm = new FormGroup(
      {
        username: this.FormControlSettings.userNameFormControl(),
        password: this.FormControlSettings.passwordFormControl()
      }
    );
  }

  public get formControls(): any {
    return this.registerForm.controls;
  }

}
