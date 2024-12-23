import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Member} from "../model/Member";
import {AccountService} from "./account.service";
import {UpdateMember} from "../model/UpdateMember";
import {map, Observable} from "rxjs";
import {PaginationResult} from "../model/pagination";
import {response} from "express";
import {UserParams} from "../model/userParams";

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService)
  baseUrl = environment.apiBaseUrl;
  // members = signal<Member[]>([]);
  paginatedResult = signal<PaginationResult<Member[]> | null>(null);

  getMembers(userParams: UserParams) {
    let params = this.setPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append("minAge", userParams.minAge);
    params = params.append("maxAge", userParams.maxAge);
    params = params.append("gender", userParams.gender);

    return this.http.get<Member[]>(`${this.baseUrl}` + 'user', {observe: 'response', params} ).subscribe({
      next: res => {
        this.paginatedResult.set({
          items: res.body as Member[],
          pagination: JSON.parse(res.headers.get('Pagination')!)
        })
      }
    });
  }
  private setPaginationHeaders(pageNumber?: number, pageSize?: number) {
    let params = new HttpParams();
    if (pageNumber && pageSize) {
      params = params.append('pageNumber', pageNumber)
      params = params.append('pageSize', pageSize)
    }
    return params;
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
