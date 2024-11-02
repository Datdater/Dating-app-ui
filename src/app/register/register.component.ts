import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {AccountService} from "../services/account.service";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  accountService = inject(AccountService);
  @Output() toggleBtn: EventEmitter<boolean> = new EventEmitter();
  @Input() registerBtn: boolean = true;
  model: any = {}
  registerForm: FormGroup = new FormGroup({});


  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('',
        [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20), this.matchValue("password")]),
    });
    this.registerForm.controls["password"].valueChanges.subscribe({
      next: value => {this.registerForm.controls["confirmPassword"].updateValueAndValidity()}
    })
  }

  matchValue(mapTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(mapTo)?.value ? null : {isMatching: true}
    }
  }

  onCancel() {
    this.toggleBtn.emit(!this.registerBtn);
  }

  onRegister() {
    console.log(this.registerForm.status)
    // this.accountService.register(this.model).subscribe((res: any) => {
    //   this.onCancel();
    // })

  }
}
