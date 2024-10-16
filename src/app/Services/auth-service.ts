import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ServiceDataResponse } from "../Models/service-data-response";
import { ServiceResponse } from "../Models/service-response";
import { BehaviorSubject, Observable, Subscription, delay, interval, of, switchMap, tap } from "rxjs";
import { SessionData } from "../Models/session-data";
import {JwtHelperService} from "@auth0/angular-jwt";
import { SignInModel } from "../Models/sing-in-model";
import { ResponseStatus } from "../Models/response-status";
import { UserRegister } from "../Models/user-register";
import { environment } from "src/environments/environment.development";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<SessionData | undefined>;
    private currentUserObservable: Observable<SessionData  | undefined>;
    private verifyStatus: Subscription;
    private jwtHelper: JwtHelperService = new JwtHelperService();
    private static readonly keyCurrentUser = 'currentUser';
    private urlApi= environment.apiUrl;
    constructor(
      private http: HttpClient,
    ) {
      this.currentUserSubject = new BehaviorSubject<SessionData | undefined>(AuthService.cacheUser);
      this.currentUserObservable = this.currentUserSubject.asObservable();
  
      this.verifyStatus = interval(3 * 60 * 1000)
        .subscribe(_ => {
          let state = AuthService.cacheUser;
          if(state == null && this.user) {
            this.currentUserSubject.next(undefined);
          }
        });
    }
  
    register(registerModel: UserRegister): Observable<ServiceResponse> {
      return this.http.
      post<ServiceDataResponse<ServiceResponse>>(`${this.urlApi}SingIn/RegisterUser`, registerModel);
    }
  
    signIn(signInModel: SignInModel) {
  
      return of(null).pipe(delay(300), switchMap(_ =>
        this.http.post<ServiceDataResponse<SessionData>>(`${this.urlApi}SingIn/SingIn`, signInModel))
      ).pipe(tap(result => {
          if(result.message === ResponseStatus.UserSuccess && result.data) {
            this.setSession(result.data);
          }
        }));
    }
  
    get user(): SessionData | undefined {
      return this.currentUserSubject.value;
    }
  
    isAuthenticated(): boolean {
      if (this.user && this.user.token) {
        const expired = this.jwtHelper.isTokenExpired(this.user.token);
        if (expired) {
          this.logout();
        }
        else {
          return true;
        }
      }
      return false;
    }
  
    setSession(user: SessionData): void {
      localStorage.setItem(AuthService.keyCurrentUser, JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
  
    private static get cacheUser() : SessionData | undefined {
      try{
        const currentUser = localStorage.getItem(AuthService.keyCurrentUser);
        return currentUser ? JSON.parse(currentUser) : undefined;
      }
      catch {
        AuthService.removeDataFromLocalStorage();
        return undefined;
      }
    }
  
    logout(): void {
      AuthService.removeDataFromLocalStorage();
      this.currentUserSubject.next(undefined);
    }
  
    private static removeDataFromLocalStorage() {
      localStorage.removeItem(AuthService.keyCurrentUser);
    }
    
  
}
