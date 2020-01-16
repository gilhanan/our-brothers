import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of, from, throwError } from 'rxjs';
import { switchMap, tap, map, catchError } from 'rxjs/operators';

import { User, Meeting } from '../model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  memorialYear = 2019;

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService
  ) { }

  public getCurrentUser(): Observable<User> {
    return this.authService.getAuthState()
      .pipe(
        switchMap((auth) =>
          !auth ? of(null) : of(auth)
            .pipe(
              switchMap((auth) =>
                this.getUser(auth.uid)
                  .pipe(
                    map((user) => {
                      return {
                        id: auth.uid,
                        profile: user.profile
                      }
                    })
                  )
              ))
        )
      );
  }

  public getUser(userId: string): Observable<User> {
    return this.angularFireDatabase
      .object<User>(`users/${userId}`)
      .valueChanges()
      .pipe(
        map((user) => ({
          id: userId,
          ...user
        })
        ),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  public getMeetings(year = this.memorialYear): Observable<Meeting[]> {
    return this.angularFireDatabase
      .list<Meeting>(`events/${year}`)
      .snapshotChanges()
      .pipe(
        map((events) => events.slice(-100).map((event) => ({ id: event.key, year, ...event.payload.val() }))), // TODO: Remove .slice(-100) (Used for faster development)
      );
  }
}
