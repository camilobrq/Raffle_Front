import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ServiceDataResponse } from "../Models/service-data-response";
import { ServiceResponse } from "../Models/service-response";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { requestServiceModel } from "../Models/RequestServiceModel";
import { ServiceModel } from "../Models/ServiceModel";
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
    private urlApi= environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    GetService(ServiceModel: requestServiceModel) {
        return this.http.post<ServiceDataResponse<ServiceModel[]>>(`${this.urlApi}Service/GetService`, ServiceModel);
    }
    AddService(registerModel: requestServiceModel): Observable<ServiceResponse> {
        return this.http.
        post<ServiceDataResponse<ServiceResponse>>(`${this.urlApi}Service/AddService`, registerModel);
    }
    UpdateService(updateModel: requestServiceModel): Observable<ServiceResponse> {
        return this.http.
        put<ServiceDataResponse<ServiceResponse>>(`${this.urlApi}Service/UpdateService`, updateModel);
        }
    DeleteService(deleteModel: requestServiceModel): Observable<ServiceResponse> {
        return this.http.put<ServiceDataResponse<ServiceResponse>>(`${this.urlApi}Service/DeleteService`, deleteModel);
    }
}
