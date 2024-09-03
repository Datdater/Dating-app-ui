import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Member} from "../model/Member";
import {AccountService} from "./account.service";
import {UpdateMember} from "../model/UpdateMember";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService)
  baseUrl = environment.apiBaseUrl;
  members = signal<Member[]>([]);

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}` + 'user/').subscribe({
      next: res => {this.members.set(res)}
    });
  }

  getMember(username: string) {
    return this.http.get<Member>(`${this.baseUrl}` + 'user/' + username);
  }

  updateMember(member: UpdateMember) {
    return this.http.put(`${this.baseUrl}` + 'user', member);
  }

}
