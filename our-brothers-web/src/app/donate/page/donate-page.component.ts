import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { User, PayPalDonation, ClientDonation } from 'models';
import { AuthService } from '../../shared/services/auth.service';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { DonationService } from '../../shared/services/donation.service';
import { CreateDonation } from '../paypal-button/paypal-button.component';
import { Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils.service';

export interface PaymentForm {
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  street: string;
  amount: number;
}

@Component({
  selector: 'app-donate-page',
  templateUrl: './donate-page.component.html',
  styleUrls: ['./donate-page.component.scss']
})
export class DonatePageComponent implements OnInit {
  public loading = true;
  public user: User;

  @Output()
  public submit = new EventEmitter<PaymentForm>();

  public form: FormGroup;
  public formInvalid = false;

  constructor(
    private authService: AuthService,
    private analyticsService: AnalyticsService,
    private toastr: ToastrService,
    private donationService: DonationService,
    private fb: FormBuilder,
    public utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.loading = false;
      this.user = user;
    });

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(this.utilsService.namePattern)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(this.utilsService.phonePattern)]],
      email: ['', [Validators.required, Validators.email]],
      amount: [0, [Validators.required, Validators.min(1)]],
      country: [],
      city: [],
      street: []
    });

    this.form.valueChanges.subscribe(() => {
      this.formInvalid = false;
    });
  }

  get name() {
    return this.form.get('name');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get email() {
    return this.form.get('email');
  }

  get country() {
    return this.form.get('country');
  }

  get city() {
    return this.form.get('city');
  }

  get street() {
    return this.form.get('street');
  }

  get amount() {
    return this.form.get('amount');
  }

  public onSubmit() {
    if (this.form.valid) {
      const parsedForm: PaymentForm = {
        name: this.name.value,
        email: this.email.value,
        phoneNumber: this.utilsService.toInternationalPhoneNumber(this.phoneNumber.value.replace(/-/g, '')),
        country: this.country.value,
        city: this.city.value,
        street: this.street.value,
        amount: +this.amount.value
      };

      this.submit.emit(parsedForm);
      this.donationService.creditCardDonation(parsedForm);
      this.form.reset();
    } else {
      this.formInvalid = true;
      this.form.markAllAsTouched();
    }
  }

  onCreateDonation(donation: CreateDonation) {
    this.analyticsService.logEvent('PayPalCreatingDonation', {
      ammout: donation.amount
    });
  }

  onApprove(donation: PayPalDonation) {
    const userDonation: ClientDonation = {
      ...donation,
      userId: this.user?.id
    };

    this.donationService.captureDonation(userDonation).subscribe(
      () => {
        this.analyticsService.logEvent('PayPalCaptureDonationSuccess', {
          donation: userDonation
        });

        this.toastr.success('תודה רבה, קיבלנו את תרומתך בהצלחה');
      },
      error => {
        this.analyticsService.logEvent('PayPalCaptureDonationFailed', {
          donation: userDonation,
          error
        });

        console.error(error);

        this.toastr.error('אירעה שגיאה');
      }
    );
  }

  onCancel(data: any) {
    this.analyticsService.logEvent('PayPalDonationCanceled', data);
    console.warn(data);
  }

  onError(error: any) {
    this.analyticsService.logEvent('PayPalDonationFailed', {
      error: error.toString()
    });
    console.error(error);
    this.toastr.error('אירעה שגיאה');
  }
}
