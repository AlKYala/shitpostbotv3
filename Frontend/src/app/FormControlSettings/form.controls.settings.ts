import {FormControl, ValidatorFn, Validator, Validators, Form} from '@angular/forms';

export class FormControlsSettings {
  public static urlFormControl(): FormControl {
    const pattern = '(http(s)?:\\/\\/.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)';
    return new FormControl('', Validators.pattern(pattern));
  }

  public static nameFormControl(): FormControl {
    return new FormControl('', []);
  }

  public static userNameFormControl(): FormControl {
    const pattern = '.*"';
    return new FormControl('', [Validators.pattern(pattern), Validators.minLength(1)]);
  }

  public static passwordFormControl(): FormControl {
    const pattern = '.*"';
    return new FormControl('', [Validators.pattern(pattern), Validators.minLength(8), Validators.maxLength(40)]);
  }
}
