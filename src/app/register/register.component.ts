import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {AccountService} from "../services/account.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{
  accountService = inject(AccountService);
  @Output() toggleBtn: EventEmitter<boolean> = new EventEmitter();
  @Input() registerBtn: boolean = true;
  model: any = {}

  onCancel() {
    this.toggleBtn.emit(!this.registerBtn);
  }

  onRegister() {
    this.accountService.register(this.model).subscribe((res: any) => {
      this.onCancel();
    })
  }
}
