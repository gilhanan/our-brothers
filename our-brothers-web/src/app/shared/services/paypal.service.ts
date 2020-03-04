import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PayPalOrder } from 'models';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  constructor(private httpClient: HttpClient) {}

  public captureOrder(payPalOrder: PayPalOrder): Observable<boolean> {
    return this.httpClient
      .post('https://europe-west1-our-brothers.cloudfunctions.net/api/order/capture', payPalOrder)
      .pipe(map(() => true));
  }
}
