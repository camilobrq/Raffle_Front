import {AbstractControl} from "@angular/forms";

export const atLeastOneNumber = (control: AbstractControl) =>
  /[0-9]/.test(control.value) ? null : { "atLeastOneNumber" : true };

export const atLeastOneLowercaseLetter = (control: AbstractControl) =>
  /[a-z]/.test(control.value) ? null : { "atLeastOneLowercaseLetter" : true };

export const atLeastOneUppercaseLetter = (control: AbstractControl) =>
  /[A-Z]/.test(control.value) ? null : { "atLeastOneUppercaseLetter" : true };

export const atLeastOneSpecialCharacter = (control: AbstractControl) =>
  /[!@#$%^&*(),.?":{}|<>]/.test(control.value) ? null : { "atLeastOneSpecialCharacter" : true };
