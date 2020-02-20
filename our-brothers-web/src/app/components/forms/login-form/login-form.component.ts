import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() loading: boolean;

  @Output() haveNoUser = new EventEmitter<void>();
  @Output() forgotPassword = new EventEmitter<void>();
  @Output() signInWithEmailAndPassword = new EventEmitter<LoginForm>();
  @Output() signInWithGoogle = new EventEmitter<void>();
  @Output() signInWithFacebook = new EventEmitter<void>();

  public form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  public onSubmit() {
    if (this.form.valid) {
      const parsedForm: LoginForm = {
        email: this.email.value,
        password: this.password.value
      }

      this.signInWithEmailAndPassword.emit(parsedForm);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
