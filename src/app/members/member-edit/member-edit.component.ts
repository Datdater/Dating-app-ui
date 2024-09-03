import {Component, HostListener, inject, OnInit, ViewChild} from '@angular/core';
import {Member} from "../../model/Member";
import {AccountService} from "../../services/account.service";
import {MembersService} from "../../services/members.service";
import {TabsModule} from "ngx-bootstrap/tabs";
import {FormsModule, NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {UpdateMember} from "../../model/UpdateMember";

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [
    TabsModule,
    FormsModule
  ],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{
  @ViewChild("editForm") editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event:any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true
    }
  }
  member?: Member;
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toast = inject(ToastrService)
  ngOnInit(): void {
    this.loadMember()
    console.log(this.member)
  }

  loadMember() {
    const user = this.accountService.currentUser();
    if(!user) return
    this.memberService.getMember(user.username).subscribe({
      next: result => {this.member = result}
    })
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: () => {
        this.toast.success("Updated profile successfully!")
        this.editForm?.reset(this.member)
      },
      error: err => this.toast.error(err)
    })
  }
}
