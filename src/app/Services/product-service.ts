import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ServiceDataResponse } from "../Models/service-data-response";
import { ServiceResponse } from "../Models/service-response";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { ProductModel } from "../Models/productModel";
import { requestProductModel } from "../Models/requestProductModel";
@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private urlApi= environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    GetProduct(productModel: requestProductModel) {
        return this.http.post<ServiceDataResponse<ProductModel[]>>(`${this.urlApi}Product/GetProduct`, productModel);
    }
    AddProduct(registerModel: requestProductModel): Observable<ServiceResponse> {
        return this.http.
        post<ServiceDataResponse<ServiceResponse>>(`${this.urlApi}Product/AddProduct`, registerModel);
    }
    UpdateProduct(updateModel: requestProductModel): Observable<ServiceResponse> {
        return this.http.
        put<ServiceDataResponse<ServiceResponse>>(`${this.urlApi}Product/UpdateProduct`, updateModel);
        }
    DeleteProduct(deleteModel: requestProductModel): Observable<ServiceResponse> {
        return this.http.put<ServiceDataResponse<ServiceResponse>>(`${this.urlApi}Product/DeleteProduct`, deleteModel);
    }
}
