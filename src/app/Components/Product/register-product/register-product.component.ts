import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBar } from 'src/app/Helper/Snaback';
import { ResponseStatus } from 'src/app/Models/response-status';
import { AuthService } from 'src/app/Services/auth-service';
import { userService } from 'src/app/Services/user-service';
import { ServiceService } from 'src/app/Services/services-service';
import { ProductService } from 'src/app/Services/product-service';
@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  eventForm: FormGroup
  processing: boolean = false;
  isFileSelected: boolean = false;
  selectedPriority: string = "";
  role: string = "";
  userList: any[] = [];
  selectedUserId:string="";
  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService, private snaback: SnackBar, private userAuth: AuthService, private user:userService ) {
    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      state: [],
      price: [],
      idUser: []
    })
  }

  ngOnInit(): void {
    this.role = this.userAuth?.user?.userInfo?.role ?? 'CLIENT';
    this.getUserList();
  }
  getUserList() {
    
    this.user.getUserList().subscribe({
      next: ({ data, message }) => {
        if (message === ResponseStatus.Successful && data) {
          this.userList = data;
        }
      }
    })
  
  }
  get controls() {
    return this.eventForm.controls;
  }
  hasError(control: AbstractControl) {
    return (control && control.invalid && (control.dirty || (control.touched && this.eventForm.dirty)));
  }

  onSubmit() {
    this.eventForm.markAllAsTouched();
    this.eventForm.markAsDirty();
    if(this.role=="CLIENT"){
      this.eventForm.value.idUser = this.userAuth.user?.userInfo?.userId;
    }else{
      this.eventForm.value.idUser = this.selectedUserId;
    }
    if (this.eventForm.valid) {
      this.processing = true;
      this.productService.AddProduct(this.eventForm.value).subscribe({
        next: (res) => {
          if (res.message === ResponseStatus.Successful) {
            this.snaback.showSuccess("Product registered successfully.");
            this.router.navigate(['ManagementProduct'])
            this.onClose.emit();
            location.reload();
          } else {
            this.snaback.showError(res.message);
          }
          this.processing = false;
        },
        error: (e: any) => {
          this.snaback.showError(e?.error?.message ?? 'An error has occurred');
          this.processing = false;
        }
      }
      );
    }
  }

  onUserSelectionChange(event: any) {
    this.selectedUserId = event.target.value;
  }
}
