import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User, Meeting } from '../model';

export const MEMORIAL_YEAR = 2019;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private angularFireDatabase: AngularFireDatabase) { }

  public getUserById(userId: string): Observable<User> {
    return this.angularFireDatabase
      .object<User>(`users/${userId}`)
      .valueChanges()
      .pipe(
        map(user => ({
          id: userId,
          ...user
        })),
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  public updateUserData(userId: string, data: any) {
    return from(
      this.angularFireDatabase.object<User>(`users/${userId}`).update(data)
    ).pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  public getBereaveds(): Observable<User[]> {
    return this.angularFireDatabase
      .list<User>(`users`)
      .snapshotChanges()
      .pipe(
        map(usersSnapshot =>
          usersSnapshot
            .map(usersSnapshot => ({ id: usersSnapshot.key, ...usersSnapshot.payload.val() }))
            .filter(user => user.role === 'bereaved')
            .map(user => {

              if (user.bereavedParticipation && user.bereavedParticipation[MEMORIAL_YEAR]) {
                user.bereavedParticipation[MEMORIAL_YEAR].meetings = this.firebaseMapToArray<Meeting>(user.bereavedParticipation[MEMORIAL_YEAR].meetings);
              }

              return user;
            })
        )
      );
  }

  public getMeetings(year = MEMORIAL_YEAR): Observable<Meeting[]> {
    return this.angularFireDatabase
      .list<Meeting>(`events/${year}`)
      .snapshotChanges()
      .pipe(
        map(meetingsSnapshot => {
          const meetings: Meeting[] = [];

          for (const hostMeetingsSnapshot of meetingsSnapshot) {
            const hostId = hostMeetingsSnapshot.key;

            const hostMeetings = this.firebaseMapToArray<Meeting>(hostMeetingsSnapshot.payload.val());

            for (const meeting of hostMeetings) {
              meeting.hostId = hostId;

              meetings.push(meeting);
            }
          }

          return meetings;
        })
      );
  }

  private firebaseMapToArray<T>(map: Object): T[] {
    if (map) {
      return Array.from(Object.entries(map)).map(([id, object]: [string, T]) => ({
        ...object,
        id
      }));
    }
  }
}
