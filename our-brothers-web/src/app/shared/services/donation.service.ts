import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClientDonation } from 'models';

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
}
