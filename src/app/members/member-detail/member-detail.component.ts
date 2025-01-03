import {Component, inject, OnInit} from '@angular/core';
import {MembersService} from "../../services/members.service";
import {ActivatedRoute} from "@angular/router";
import {Member} from "../../model/Member";
import { TabsModule } from 'ngx-bootstrap/tabs';
import {GalleryComponent, GalleryItem, ImageItem} from "ng-gallery";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule, GalleryComponent],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit{
  private memberService = inject(MembersService);
  accountService = inject(AccountService);
  private route = inject(ActivatedRoute);
  member?: Member;
  images: GalleryItem[] = []

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return
    this.memberService.getMember(username).subscribe(
      {
        next: member => {
          this.member = member
          member.photos.map(p => this.images.push(new ImageItem({src: p.url, thumb: p.url})))
        }
      }
    )
  }
}
