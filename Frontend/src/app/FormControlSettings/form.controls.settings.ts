import {FormControl, ValidatorFn, Validator, Validators} from '@angular/forms';

export class FormControlsSettings {
  public static urlFormControl(): FormControl {
    const pattern = '/((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[\\-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9\\.\\-]+|(?:www\\.|[\\-;:&=\\+\\$,\\w]+@)[A-Za-z0-9\\.\\-]+)((?:\\/[\\+~%\\/\\.\\w\\-_]*)?\\??(?:[\\-\\+=&;%@\\.\\w_]*)#?(?:[\\.\\!\\/\\\\\\w]*))?)/\n';
    return new FormControl('', [Validators.required, Validators.pattern(pattern)]);
  }

  public static nameFormControl(): FormControl {
    return new FormControl('', []);
  }
}
