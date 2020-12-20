import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Router} from '@angular/router';
import {FormControlsSettings} from '../FormControlSettings/form.controls.settings';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login-mask',
  templateUrl: './login-mask.component.html',
  styleUrls: ['./login-mask.component.scss']
})
export class LoginMaskComponent implements OnInit {
  public loginForm: FormGroup;
  public passwordControl: FormControl;
  public usernameControl: FormControl;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly authenticationService: AuthenticationService,
              private readonly router: Router) {
  }

  public ngOnInit() {
    this.initForm();
  }

  public initForm(): void {
    this.usernameControl = FormControlsSettings.userNameFormControl();
    this.passwordControl = FormControlsSettings.passwordFormControl();
    this.loginForm = new FormGroup({
      name: this.usernameControl,
      password: this.passwordControl
    });
  }

  public goToRegister(): void {
    this.router.navigate(['/signup']);
  }

  public goToHomepage(): void {
    this.router.navigate(['/']);
  }

  public get formControls(): any {
    return this.loginForm.controls;
  }

  public onSubmit(): void {
    const uName: string = this.formControls.name.value;
    const pw: string = this.formControls.password.value;
    this.authenticationService.login(uName, pw).pipe(first())
      .subscribe((data: any) => {
        this.goToHomepage();
      },
        error => {
          console.log(error);
        });
  }
}
