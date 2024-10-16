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
export class RaffleService {
    private urlApi= environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    AddProduct(registerModel: requestProductModel): Observable<ServiceResponse> {
        return this.http.
        post<ServiceDataResponse<ServiceResponse>>(`${this.urlApi}Raffle/AddRaffle`, registerModel);
    }
    DeleteProduct(deleteModel: requestProductModel): Observable<ServiceResponse> {
         return this.http.put<ServiceDataResponse<ServiceResponse>>(`${this.urlApi}Product/DeleteProduct`, deleteModel);
    }
}
