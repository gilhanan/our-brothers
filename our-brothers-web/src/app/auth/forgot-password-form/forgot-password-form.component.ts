import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordForm } from './forgot-password-form.types';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss']
})
export class ForgotPasswordFormComponent {
  @Input() loading: boolean;

  @Output() submit = new EventEmitter<ForgotPasswordForm>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.form.get('email');
  }

  public onSubmit() {
    if (this.form.valid) {
      const parsedForm: ForgotPasswordForm = {
        email: this.email.value
      };

      this.submit.emit(parsedForm);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
