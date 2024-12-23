import {Component, inject, OnInit} from '@angular/core';
import {MembersService} from "../../services/members.service";
import {Member} from "../../model/Member";
import {MemberCardComponent} from "../member-card/member-card.component";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {UserParams} from "../../model/userParams";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-memeber-list',
  standalone: true,
  imports: [
    MemberCardComponent,
    PaginationModule
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{
  memberService = inject(MembersService);
  private accountService = inject(AccountService);
  userParams = new UserParams(this.accountService.currentUser())
  ngOnInit(): void {
    if(!this.memberService.paginatedResult())
    this.loadMembers()
  }

  loadMembers() {
    this.memberService.getMembers(this.userParams);
  }

  protected readonly Number = Number;

  pageChanged(event: any) {
    if (this.userParams.pageNumber != event.page) {
      this.userParams.pageNumber = event.page
      this.loadMembers()
    }
  }
}
