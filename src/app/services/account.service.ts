import {inject, Injectable, model, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../model/User.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient)
  constructor() { }
  baseUrl = 'https://localhost:7025/api/';
  currentUser = signal<User | null>(null)
  login(model: any)  {
    return this.http.post<User>(this.baseUrl + "Account/login", model).pipe(map(res =>
    {
      if(res != null) {
        localStorage.setItem("user", JSON.stringify(res));
        this.currentUser.set(res)
      }
      return res;
    }));

  }

  logout() {
    localStorage.removeItem("user");
    this.currentUser.set(null);
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + "Account/register", model).pipe(map(res =>
    {
      if(res != null) {
        localStorage.setItem("user", JSON.stringify(res));
        this.currentUser.set(res)
      }
      return res;
    }));
  }

}
