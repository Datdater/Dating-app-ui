import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {NavComponent} from "./nav/nav.component";
import {AccountService} from "./services/account.service";
import {HomeComponent} from "./home/home.component";
import {NgxSpinnerComponent} from "ngx-spinner";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, NavComponent, HomeComponent, NgxSpinnerComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'human-shop';
  private accountService = inject(AccountService);
  constructor() {

  }
  ngOnInit(): void {
    this.setCurrentUser()
  }

  setCurrentUser() {
    const userString = localStorage?.getItem("user");
    if(!userString) return
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }




}
