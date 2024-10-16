import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBar } from 'src/app/Helper/Snaback';
import { AuthService } from 'src/app/Services/auth-service';
import { atLeastOneLowercaseLetter, atLeastOneNumber, atLeastOneSpecialCharacter, atLeastOneUppercaseLetter } from './validators/password-validator';
import { messageAlert } from 'src/app/Helper/messageAlert';
import { ResponseStatus } from 'src/app/Models/response-status';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loginForm: FormGroup;
  // roles: RolesDescriptions[] = [];
  processing: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private snaback: SnackBar, private route: Router) {

    const passwordValidators = [
      Validators.required,
      Validators.minLength(6),
      atLeastOneNumber,
      atLeastOneLowercaseLetter,
      atLeastOneUppercaseLetter,
      atLeastOneSpecialCharacter,
    ];

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', passwordValidators],
      confirmPassword: [''],
      role: [null, [Validators.required]],
      identification: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    }, { updateOn: 'change' });
  }

  ngOnInit(): void {

    if(this.authService.isAuthenticated()) {
      this.route.navigateByUrl("/ManagementService");
      return;
    }

    
  }


  onSubmit() {
    this.loginForm.markAllAsTouched();
    this.loginForm.markAsDirty();
    if (this.loginForm.valid) {
      this.processing = true;
      this.authService.register(this.loginForm.value).subscribe({
          next: (res) => {
            if(res.message === ResponseStatus.RegisterSuccess) {
              this.snaback.showSuccess(res.message!);
              this.route.navigateByUrl("/SignIn");
            } else {
              this.snaback.showError(res.message);
            }
            this.processing = false;
          },
          error: (e: any) => {
            this.snaback.showError(e?.error?.message ?? 'Ha ocurrido un error');
            this.processing = false;
          }
        }
      );
    }
  }

  get controls() {
    return this.loginForm.controls;
  }

  hasError(control: AbstractControl) {
    return (control && control.invalid && (control.dirty || (control.touched && this.loginForm.dirty)));
  }

   getError(control: AbstractControl) {
     return messageAlert.get(control);
   }

  

  passwordChange(_: any): void {
    if (this.controls['password']?.value !== this.controls['confirmPassword']?.value) {
      this.controls['confirmPassword'].setErrors({
        ...this.controls['password'].errors,
        passwordsNotMatch: true
      });
    } else {
      this.controls['confirmPassword'].setErrors({
        ...this.controls['password'].errors,
        passwordsNotMatch: null
      });
      this.controls['confirmPassword'].updateValueAndValidity();
    }
  }
}
