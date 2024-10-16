import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBar } from 'src/app/Helper/Snaback';
import { ResponseStatus } from 'src/app/Models/response-status';
import { AuthService } from 'src/app/Services/auth-service';
import { ServiceService } from 'src/app/Services/services-service';
import { userService } from 'src/app/Services/user-service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent {
  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Input() data: any;
  @ViewChild('fileInput') fileInput!: ElementRef;
  eventForm!: FormGroup
  processing: boolean = false;
  isFileSelected: boolean = false;
  role: string = "";
  userList: any[] = [];
  selectedUserId:string="";
  constructor(private formBuilder: FormBuilder, private router: Router, private serviceService: ServiceService, private snaback: SnackBar, private userAuth:AuthService, private user: userService) {


  }
  ngOnInit(): void {
    this.role = this.userAuth?.user?.userInfo?.role ?? 'CLIENT';
    this.eventForm = this.formBuilder.group({
      name: [this.data?.name, Validators.required],
      description: [this.data?.description, Validators.required],
      price: [this.data?.price, Validators.required],
      state: [this.data?.state, Validators.required],
    });
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
    
    this.eventForm.value.id = this.data?.id;
    if (this.eventForm.valid) {
      this.processing = true;
      this.serviceService.UpdateService(this.eventForm.value).subscribe({
        next: (res) => {
          if (res.message === ResponseStatus.Successful) {
            this.snaback.showSuccess("Successfully modified Service.");
            this.router.navigate(['ManagementService'])
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
