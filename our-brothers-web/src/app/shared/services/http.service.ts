import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';

import { User } from 'models';
import { AnalyticsService } from './analytics.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,
    private angularFireAuth: AngularFireAuth,
    private analyticsService: AnalyticsService
  ) {}

  public deleteUser(user: User) {
    const telemetry = { userId: user.id };

    this.analyticsService.logEvent('DeleteUser', telemetry);

    return this.angularFireAuth.idToken.pipe(
      switchMap((idToken: string) => {
        return this.httpClient
          .delete(`https://europe-west1-our-brothers.cloudfunctions.net/api/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          })
          .pipe(
            tap(() => this.analyticsService.logEvent('DeleteUserSuccess', telemetry)),
            catchError(error => {
              this.analyticsService.logEvent('DeleteUserFailed', {
                ...telemetry,
                error
              });
              console.error(error);
              return throwError(error);
            })
          );
      })
    );
  }
}
