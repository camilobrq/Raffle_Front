import { AbstractControl } from "@angular/forms";

export class messageAlert{
    public static get(control: AbstractControl, data?: any): string | null
  {
    // console.log(control.errors);

    if (control.hasError('matDatepickerParse')) {
      return `La fecha ingresada es incorrecta`;
    }
    if (control.hasError('required')) {
      return 'El campo es requerido';
    }
    if (control.hasError('email')) {
      return 'No es una cuenta de correo válida';
    }

    if (control.hasError('passwordsNotMatch')) {
      return 'Las contraseñas no coinciden';
    }

    if (control.hasError('atLeastOneLowercaseLetter')) {
      return 'Debe al menos contener una letra minúscula';
    }
    if (control.hasError('atLeastOneUppercaseLetter')) {
      return 'Debe al menos contener una letra mayúscula';
    }
    if (control.hasError('atLeastOneNumber')) {
      return 'Debe al menos contener un número';
    }
    if (control.hasError('atLeastOneSpecialCharacter')) {
      return 'Debe al menos contener un carácter especial';
    }

    if (control.hasError('min')) {
      return `El valor mínimo debe ser ${control.errors?.["min"].min}`;
    }
    if (control.hasError('max')) {
      return `El valor máximo debe ser ${control.errors?.["max"].max}`;
    }

    if (control.hasError('minlength')) {
      return `La longitud mínima debe ser ${control.errors?.["minlength"].requiredLength}`;
    }
    if (control.hasError('maxlength')) {
      return `La longitud máxima debe ser ${control.errors?.["maxlength"].requiredLength}`;
    }
    if (control.hasError('maxLengthElements')) {
      return `Se deben seleccionar maximo ${control.errors?.["maxLengthElements"].maxLength}`;
    }

    if (control.hasError('matDatepickerMin')) {
      return `La fecha minima debe ser ${control.errors?.["matDatepickerMin"].min.format(data.format)}`;
    }
    if (control.hasError('invalidSelectOption')) {
      return `No ha selecionado una opción valida`;
    }


    // console.log(control?.errors);
    return null;
  }
}