import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { requestProductModel } from 'src/app/Models/requestProductModel';
import { requestServiceModel } from 'src/app/Models/RequestServiceModel';
import { ResponseStatus } from 'src/app/Models/response-status';
import { AuthService } from 'src/app/Services/auth-service';
import { ProductService } from 'src/app/Services/product-service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent {
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) set setPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  poducts: any[] = [];
  query = '';
  selectedPriority: string = ''; 
  role: string = ''; 
  constructor(private productService: ProductService, private user: AuthService) { }

  ngOnInit(): void {
    this.role = this.user?.user?.userInfo?.role ?? 'CLIENT';
    this.getDataTask();
  }
  getDataTask() {
    const userId = this.user?.user?.userInfo?.userId;
    var request= new requestProductModel();
    request.idUser ='B51D2FA3-D2B1-4AB7-B336-9499EE34DA81';
    request.state=true;
    this.productService.GetProduct(request).subscribe({
      next: ({ data, message }) => {
        if (message === ResponseStatus.Successful && data) {
          this.dataSource.data = data;
          this.poducts = data;
        }
      }
    })
    
  }

  search() {
    this.poducts = [];
    this.dataSource.data.forEach(element => {
      if (element.taskTitle.includes(this.query)) {
        this.poducts.push(element);
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
