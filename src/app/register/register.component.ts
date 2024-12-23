import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {AccountService} from "../services/account.service";
import {
  AbstractControl, FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {NgIf} from "@angular/common";
import {TextInputComponent} from "../_forms/text-input/text-input.component";
import {DatePickerComponent} from "../_forms/date-picker/date-picker.component";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, NgIf, TextInputComponent, DatePickerComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  accountService = inject(AccountService);
  private router = inject(Router);
  @Output() toggleBtn: EventEmitter<boolean> = new EventEmitter();
  @Input() registerBtn: boolean = true;
  registerForm: FormGroup = new FormGroup({});
  private fb: FormBuilder = inject(FormBuilder);
  private toastr = inject(ToastrService);
  validationErrors : string[] | undefined;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      username: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['',
        [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20), this.matchValue("password")]],
    });

    this.registerForm.controls["password"].valueChanges.subscribe({
      next: value => {
        this.registerForm.controls["confirmPassword"].updateValueAndValidity()
      }
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
    const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value)
    if (dob) {
      this.registerForm.patchValue({ dateOfBirth : dob });
    }
    this.accountService.register(this.registerForm.value).subscribe({
        next: _ => this.router.navigateByUrl('/members'),
        error: error => {this.validationErrors = error
          console.log(error);
          console.log(this.validationErrors);
        },
      }
      )
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    return new Date(dob).toISOString().slice(0, 10);
  }

}
