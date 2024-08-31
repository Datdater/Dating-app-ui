import {Component, input, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RegisterComponent} from "../register/register.component";

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

  constructor() {
  }

  onToggle() {
    this.registerBtn = !this.registerBtn;
  }

  onHandle(value: boolean) {
    this.registerBtn = value
  }
}
