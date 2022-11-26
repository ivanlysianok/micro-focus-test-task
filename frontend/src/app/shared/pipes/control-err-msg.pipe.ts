import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({ name: 'errorMsg', pure: false })
export class ControlErrorMessagePipe implements PipeTransform {
  /**
   * According to control error displays error message
   * @param value Control
   * @param controlName Control name
   * @param maxLength In case of maxlength error - displayed number of maximal length
   * @returns error message or empty string
   */
  transform(
    value: AbstractControl,
    controlName: string,
    maxLength: number
  ): string {
    let errorMessage = '';

    for (const err in value.errors) {
      if (err === 'required') {
        errorMessage = `The ${controlName} is required`;
      }
      if (err === 'maxlength') {
        errorMessage = `The ${controlName} cannot exeed more then ${maxLength.toString()} characters`;
      }
    }

    return errorMessage;
  }
}
