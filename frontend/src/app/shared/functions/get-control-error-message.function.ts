import { AbstractControl } from '@angular/forms';

/**
 * Get form control error and display error message
 * according to it
 * @param control form control
 * @param name name of form control
 * @param maxLength Maximal length of form control
 * @returns Error message or empty string
 */
export function getControlErrorMessage(
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
