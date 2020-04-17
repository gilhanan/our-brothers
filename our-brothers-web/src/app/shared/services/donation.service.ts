import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClientDonation } from 'models';
import { PaymentForm } from '../../donate/page/donate-page.component';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  constructor(private httpClient: HttpClient) {}

  public captureDonation(donation: ClientDonation): Observable<boolean> {
    return this.httpClient
      .post('https://europe-west1-our-brothers.cloudfunctions.net/api/donation', donation)
      .pipe(map(() => true));
  }
  public creditCardDonation(paymentForm: PaymentForm) {}
}
