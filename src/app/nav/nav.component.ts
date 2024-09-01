import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Toast, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    FormsModule, BsDropdownModule, RouterLink, RouterLinkActive
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);
  model: any = {}
  router = inject(Router)
  toast = inject(ToastrService)
  onLogin() {
    this.accountService.login(this.model).subscribe(
      (res) => {
        this.router.navigateByUrl("/members");
      },
      (error) => {
        this.toast.error(error.message);
      }
    )
  }

  onLogout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}
