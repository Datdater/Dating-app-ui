import {Component, inject, OnInit} from '@angular/core';
import {MembersService} from "../../services/members.service";
import {Member} from "../../model/Member";
import {MemberCardComponent} from "../member-card/member-card.component";

@Component({
  selector: 'app-memeber-list',
  standalone: true,
  imports: [
    MemberCardComponent
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{
  ngOnInit(): void {
    this.loadMembers()
  }
  private memberService = inject(MembersService);
  members: Member[] = [];

  loadMembers() {
    this.memberService.getMembers().subscribe({
      next: data => {this.members = data},
    })
  }
}
