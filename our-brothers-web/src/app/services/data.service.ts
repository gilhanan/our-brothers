import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of, from, throwError } from 'rxjs';
import { switchMap, tap, map, catchError } from 'rxjs/operators';

import { User, Meeting } from '../model';
import { AuthService } from './auth.service';

export const MEMORIAL_YEAR = 2019;

@Injectable({
  providedIn: 'root'
})
export class DataService {

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

  public getMeetings(year = MEMORIAL_YEAR): Observable<Meeting[]> {
    return this.angularFireDatabase
      .list<Meeting>(`events/${year}`)
      .snapshotChanges()
      .pipe(
        map((events) => events
          // .slice(0, 50)
          .map((event) => ({ id: event.key, year, ...event.payload.val() }))
          .map((event) => {
            if (event.bereaveds) {
              event.bereaveds = Array.from(Object.entries(event.bereaveds))
                .map((bereaved) => {
                  if (bereaved[1].slain) {
                    bereaved[1].slain = Array
                      .from(Object.entries(bereaved[1].slain))
                      .map((slain) => Object.assign(slain[1], { id: slain[0] }));
                  }
                  return Object.assign(bereaved[1], { id: bereaved[0] });
                });
            }
            return event;
          }))
      );
  }
}
