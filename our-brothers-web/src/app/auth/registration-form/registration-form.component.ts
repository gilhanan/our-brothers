import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationForm } from './registration-form.types';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  @Input() loading: boolean;
  @Output() haveUser = new EventEmitter<void>();
  @Output() signUpWithEmailAndPassword = new EventEmitter<RegistrationForm>();
  @Output() signUpWithGoogle = new EventEmitter<void>();
  @Output() signUpWithFacebook = new EventEmitter<void>();

  form: FormGroup;
  formInvalid = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ['', Validators.required]
      },
      { validator: this.checkPasswords }
    );

    this.form.valueChanges.subscribe(() => {
      this.formInvalid = false;
    });
  }

  checkPasswords(group: FormGroup) {
    return group.get('password').value === group.get('passwordConfirm').value ? null : { notSame: true };
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  public onSubmit() {
    if (this.form.valid) {
      const parsedForm: RegistrationForm = {
        email: this.email.value,
        password: this.password.value
      };

      this.signUpWithEmailAndPassword.emit(parsedForm);
    } else {
      this.formInvalid = true;
      this.form.markAllAsTouched();
    }
  }
}
