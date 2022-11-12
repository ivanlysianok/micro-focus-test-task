import { AbstractControl } from '@angular/forms';

export function getControlError(
  control: AbstractControl,
  name: string,
  maxLength: number
): string {
  if (control.hasError('required')) {
    return `The ${name} is required`;
  }
  if (control.hasError('maxlength')) {
    return `The ${name} cannot exeed more then ${maxLength.toString()} characters`;
  }
  return '';
}
