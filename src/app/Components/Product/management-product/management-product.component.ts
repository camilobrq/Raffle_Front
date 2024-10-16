import { Component, ViewChild } from '@angular/core';
import { ServiceModel } from 'src/app/Models/ServiceModel';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ResponseStatus } from 'src/app/Models/response-status';
import { SnackBar } from 'src/app/Helper/Snaback';
import { AuthService } from 'src/app/Services/auth-service';
import { requestServiceModel } from 'src/app/Models/RequestServiceModel';
import { ProductService } from 'src/app/Services/product-service';

@Component({
  selector: 'app-management-product',
  templateUrl: './management-product.component.html',
  styleUrls: ['./management-product.component.css']
})
export class ManagementProductComponent {
  rowData: any = [];
  listEvent: ServiceModel[] = []
  processing: boolean = false;
  dataSource = new MatTableDataSource<ServiceModel>();
  pageSizeOptions: number[] = [15, 30];
  displayedColumns: string[] = ['name', 'description', 'state', 'priority', 'actions'];
  showModal: boolean = false;
  showModalRegistro: boolean = false;
  role: string = "";
  userId: string = "";
  @ViewChild(EditProductComponent) editProductComponent!: EditProductComponent;

  @ViewChild(MatPaginator) set setPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  get showPaginator() {
    return this.dataSource.data.length > Math.min(...this.pageSizeOptions);
  }
  constructor(private route: Router, private productService: ProductService, private snaback: SnackBar, private user: AuthService) { }
  ngOnInit(): void {
    this.role = this.user?.user?.userInfo?.role ?? 'CLIENT';
    this.getDataService();
  }
  getDataService() {
    const userId = this.user?.user?.userInfo?.userId;
    var request= new requestServiceModel()
    request.idUser ='B51D2FA3-D2B1-4AB7-B336-9499EE34DA81';
    request.state=true;
    this.productService.GetProduct(request).subscribe({
      next: ({ data, message }) => {
        if (message === ResponseStatus.Successful && data) {
          this.dataSource.data = data;
        }
      }
    })
  }
  deleteProduct(event: string) {
    var request =new requestServiceModel();
    request.id=event;
    this.productService.DeleteProduct(request).subscribe({
      next: ({ message }) => {
        if (message === ResponseStatus.Successful) {
          this.snaback.showSuccess("Product deleted successfully"!);
          this.getDataService();
        } else {
          this.snaback.showError(message);
        }
        this.processing = false;
      },
    })
  }


  editProduct(element: any): void {
    this.rowData = {
      id: element.id,
      name: element.name,
      description: element.description,
      state: element.state,
      price: element.price,
    };
    this.showModal = true;

  }
  registrarProduct() {
    this.showModalRegistro = true;
  }
}
