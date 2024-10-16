import { Component, ViewChild } from '@angular/core';
import { ServiceModel } from 'src/app/Models/ServiceModel';
import { EditServiceComponent } from '../edit-service/edit-service.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Services/services-service';
import { ResponseStatus } from 'src/app/Models/response-status';
import { SnackBar } from 'src/app/Helper/Snaback';
import { AuthService } from 'src/app/Services/auth-service';
import { requestServiceModel } from 'src/app/Models/RequestServiceModel';

@Component({
  selector: 'app-management-service',
  templateUrl: './management-service.component.html',
  styleUrls: ['./management-service.component.css']
})
export class ManagementServiceComponent {
  rowData: any = [];
  listEvent: ServiceModel[] = []
  processing: boolean = false;
  dataSource = new MatTableDataSource<ServiceModel>();
  pageSizeOptions: number[] = [15, 30];
  displayedColumns: string[] = ['taskTitle', 'description', 'state', 'priority', 'actions'];
  showModal: boolean = false;
  showModalRegistro: boolean = false;
  role: string = "";
  userId: string = "";
  @ViewChild(EditServiceComponent) editTaskComponent!: EditServiceComponent;

  @ViewChild(MatPaginator) set setPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  get showPaginator() {
    return this.dataSource.data.length > Math.min(...this.pageSizeOptions);
  }
  constructor(private route: Router, private serviceService: ServiceService, private snaback: SnackBar, private user: AuthService) { }
  ngOnInit(): void {
    this.role = this.user?.user?.userInfo?.role ?? 'CLIENT';
    this.getDataService();
  }
  getDataService() {
    const userId = this.user?.user?.userInfo?.userId;
    var request= new requestServiceModel()
    request.idUser ='B51D2FA3-D2B1-4AB7-B336-9499EE34DA81';
    request.state=true;
    this.serviceService.GetService(request).subscribe({
      next: ({ data, message }) => {
        if (message === ResponseStatus.Successful && data) {
          this.dataSource.data = data;
        }
      }
    })
  }
  deleteTask(event: string) {
    var request =new requestServiceModel();
    request.id=event;
    this.serviceService.DeleteService(request).subscribe({
      next: ({ message }) => {
        if (message === ResponseStatus.Successful) {
          this.snaback.showSuccess("Task deleted successfully"!);
          this.getDataService();
        } else {
          this.snaback.showError(message);
        }
        this.processing = false;
      },
    })
  }


  editTask(element: any): void {
    this.rowData = {
      id: element.id,
      name: element.name,
      description: element.description,
      state: element.state,
      price: element.price,
    };
    this.showModal = true;

  }
  registrarTask() {
    this.showModalRegistro = true;
  }
}
