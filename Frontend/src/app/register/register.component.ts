import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControlsSettings} from '../FormControlSettings/form.controls.settings';
import {Router} from '@angular/router';
import {User} from '../../shared/user/model/User';
import {UserService} from '../../shared/user/service/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private readonly router: Router,
    //problem: die services lassen sich nicht injecten bzw seite laedt dann nicht
    private readonly userService: UserService,
    private readonly toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initRegisterForm();
  }

  public initRegisterForm(): void {
    this.registerForm = new FormGroup(
      {
        username: FormControlsSettings.userNameFormControl(),
        password: FormControlsSettings.passwordFormControl()
      }
    );
  }

  public onSubmit(): void {
    const $username = this.formControls.username.value;
    const $password = this.formControls.password.value;
    const user: User = {id : 0, username: $username, password: $password, isAdmin: false};
    console.log(user);
    //vorerst noch create nutzen
    this.userService.register(user)
      .pipe()
      .subscribe(() => {
        this.handleSuccessRegistration();
        this.navigateToHomepage();
      },
        error => {
        this.handleUnsuccessfulRegistration(String(error));
      });
  }

  public get formControls(): any {
    return this.registerForm.controls;
  }

  private navigateToHomepage(): void {
    this.router.navigate(['/']);
  }

  public goToLoginMask(): void {
    this.router.navigate(['/login']);
  }

  private handleSuccessRegistration(): void {
    this.toastrService.success('Registration successful - You can login now.');
  }
  private handleUnsuccessfulRegistration(error: string): void {
    this.toastrService.warning(error);
  }
}
