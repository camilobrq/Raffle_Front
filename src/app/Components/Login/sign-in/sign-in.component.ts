import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBar } from 'src/app/Helper/Snaback';
import { messageAlert } from 'src/app/Helper/messageAlert';
import { ResponseStatus } from 'src/app/Models/response-status';
import { AuthService } from 'src/app/Services/auth-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginForm: FormGroup;
  processing: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private snaback: SnackBar, private route: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    }, {
      updateOn: 'change'
    });
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      this.route.navigate(['/Dashboard/Home']);
      return;
    }
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    this.loginForm.markAsDirty();

    if (this.loginForm.valid) {
      this.processing = true;
      this.authService.signIn(this.loginForm.getRawValue()).subscribe({
          next: (res) => {
            if(res.message === ResponseStatus.UserSuccess) {
              this.route.navigate(['/Dashboard/Home']);
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

  redirect() {
    // this.route.navigate([Routes.auth.register]);
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
  navigate() {
    this.route.navigate(['/Register']);
  }
}
