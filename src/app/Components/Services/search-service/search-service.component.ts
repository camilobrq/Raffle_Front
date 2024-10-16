import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { requestServiceModel } from 'src/app/Models/RequestServiceModel';
import { ResponseStatus } from 'src/app/Models/response-status';
import { AuthService } from 'src/app/Services/auth-service';
import { ProductService } from 'src/app/Services/product-service';
import { ServiceService } from 'src/app/Services/services-service';

@Component({
  selector: 'app-search-service',
  templateUrl: './search-service.component.html',
  styleUrls: ['./search-service.component.css']
})
export class SearchServiceComponent {
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) set setPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  services: any[] = [];
  query = '';
  selectedPriority: string = ''; 
  role: string = ''; 
  constructor(private serviceService: ServiceService, private user: AuthService) { }

  ngOnInit(): void {
    this.role = this.user?.user?.userInfo?.role ?? 'CLIENT';
    this.getDataTask();
  }
  getDataTask() {
    const userId = this.user?.user?.userInfo?.userId;
    var request= new requestServiceModel();
    request.idUser='B51D2FA3-D2B1-4AB7-B336-9499EE34DA81';
    request.state=true;
    this.serviceService.GetService(request).subscribe({
      next: ({ data, message }) => {
        if (message === ResponseStatus.Successful && data) {
          this.dataSource.data = data;
          this.services = data;
        }
      }
    })
  }

  search() {
    this.services = [];
    this.dataSource.data.forEach(element => {
      if (element.taskTitle.includes(this.query)) {
        this.services.push(element);
      }
    });
  }
  getColorClass(state: string): string {
    switch (state) {
      case 'Earring':
        return 'Earring-color';
      case 'Initiated':
        return 'Initiated-color';
      case 'In progress':
        return 'in-progress-color';
      case 'Finalized':
        return 'Finalized-color';
      // Agrega más casos según tus estados
      default:
        return ''; // Color predeterminado o ninguno
    }
  }
}
