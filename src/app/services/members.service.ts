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
      next: res => {
        const memberList = res.filter(value => value.userName !== this.accountService.currentUser()?.username);
        this.members.set(memberList);
      }
    });
  }

  getMember(username: string) {
    return this.http.get<Member>(`${this.baseUrl}` + 'user/' + username);
  }

  updateMember(member: UpdateMember) {
    return this.http.put(`${this.baseUrl}` + 'user', member);
  }
  setMainPhoto(photoId: number) {
    return this.http.put(`${this.baseUrl}` + 'user/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(`${this.baseUrl}` + 'user/delete-photo/' + photoId);
  }

}
