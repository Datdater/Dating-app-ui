import {inject, Injectable, model, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../model/User.model";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient)
  constructor() { }
  baseUrl = environment.apiBaseUrl
  currentUser = signal<User | null>(null)
  login(model: any)  {
    return this.http.post<User>(this.baseUrl + 'Account/login', model).pipe(map(res =>
    {
      if(res != null) {
       this.setCurrentUser(res);
      }
      return res;
    }));

  }
  setCurrentUser(res: any) {
    localStorage.setItem("user", JSON.stringify(res));
    this.currentUser.set(res)
  }

  logout() {
    localStorage.removeItem("user");
    this.currentUser.set(null);
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + "Account/register", model).pipe(map(res =>
    {
      if(res != null) {
        this.setCurrentUser(res)
      }
      return res;
    }));
  }

}
