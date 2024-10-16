import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ServiceDataResponse } from "../Models/service-data-response";
import { environment } from 'src/environments/environment.development';
import { UserModel } from "../Models/userModel";
@Injectable({
  providedIn: 'root'
})
export class userService {
    private urlApi= environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getUserList() {
        return this.http.get<ServiceDataResponse<UserModel[]>>(`${this.urlApi}User/GetUsers`);
    }
    
}