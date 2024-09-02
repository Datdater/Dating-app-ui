import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Member} from "../model/Member";
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService)
  baseUrl = environment.apiBaseUrl;

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}` + 'user/');
  }

  getMember(username: string) {
    return this.http.get<Member>(`${this.baseUrl}` + 'user/' + username);
  }

}
