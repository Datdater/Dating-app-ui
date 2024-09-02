import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../services/account.service";
import {ToastrService} from "ngx-toastr";

export const guardGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService)

  return !!accountService.currentUser();
};
