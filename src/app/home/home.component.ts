import {Component, inject, input, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RegisterComponent} from "../register/register.component";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RegisterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  registerBtn: boolean = true;
  accountService = inject(AccountService);


  constructor() {
  }

  onToggle() {
    this.registerBtn = !this.registerBtn;
  }

  onHandle(value: boolean) {
    this.registerBtn = value
  }
}
