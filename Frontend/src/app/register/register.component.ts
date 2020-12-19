import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControlsSettings} from '../FormControlSettings/form.controls.settings';
import {Router, RouterModule} from '@angular/router';
import {User} from '../../shared/user/model/User';
import {UserService} from '../../shared/user/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private router: Router,
    //problem: die services lassen sich nicht injecten bzw seite laedt dann nicht
    private userService: UserService
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
    const user: User = new User();
    user.isAdmin = false;
    user.username = this.formControls.username.value;
    user.password = this.formControls.password.value;
    console.log(user);
    //vorerst noch create nutzen
    this.userService.register(user)
      .pipe()
      .subscribe(data => {
        this.handleSuccessRegistration();
        this.navigateToHomepage();
        console.log('erfolg');
      },
        error => {
        this.handleUnsuccessfulRegistration();
          console.log(error);
      });

  }

  public get formControls(): any {
    return this.registerForm.controls;
  }

  private navigateToHomepage(): void {
    this.router.navigate(['/']);
  }

  private handleSuccessRegistration(): void {

  }

  private handleUnsuccessfulRegistration(): void {

  }
}
