import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControlsSettings} from '../FormControlSettings/form.controls.settings';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {User} from '../../shared/user/model/User';
import {UserService} from '../../shared/user/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private router: Router,
              private userService: UserService) {}

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

  public submitRegistration(): void {
    const user: User = new User();
    user.isAdmin = false;
    user.username = this.formControls.username;
    user.password = this.formControls.password;
    //vorerst noch create nutzen
    this.userService.create(user)
      .pipe()
      .subscribe(data => {
        this.handleSuccessRegistration();
      },
        error => {
        this.handleUnsuccessfulRegistration();
      });
  }

  public get formControls(): any {
    return this.registerForm.controls;
  }

  private navigateToHomepage(): void {
    this.router.navigate(['/']);
  }

  private handleSuccessRegistration(): void {}

  private handleUnsuccessfulRegistration(): void {}
}
