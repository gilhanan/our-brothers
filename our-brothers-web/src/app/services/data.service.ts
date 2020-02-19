import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {
  User,
  Meeting,
  UserParticipationMeeting,
  BereavedStatus,
  BereavedGuidanceGeneral,
  BereavedGuidance,
  BereavedProfile,
  UserRole,
  UserProfile
} from '../model';
import { Contact } from 'models';

export const MEMORIAL_YEAR = 2019;

export interface UserMeeting {
  meeting: Meeting;
  user: User;
}

export interface VolunteeringUser {
  user: User;
  isVolunteer: boolean;
}

export interface UpdateBereavedStatus {
  bereaved: User;
  status: BereavedStatus;
}

export interface UpdateBereavedGuidance {
  bereaved: User;
  guidance: BereavedGuidanceGeneral;
}

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
        map(user => {
          if (
            user.bereavedParticipation &&
            user.bereavedParticipation[MEMORIAL_YEAR]
          ) {
            user.bereavedParticipation[
              MEMORIAL_YEAR
            ].meetings = this.parseUserMeetings(
              user.bereavedParticipation[MEMORIAL_YEAR].meetings
            );
          }

          if (
            user.participateParticipation &&
            user.participateParticipation[MEMORIAL_YEAR]
          ) {
            user.participateParticipation[
              MEMORIAL_YEAR
            ].meetings = this.parseUserMeetings(
              user.participateParticipation[MEMORIAL_YEAR].meetings
            );
          }

          return user;
        }),
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

  public setUserRole(user: User, role: UserRole) {
    return from(
      this.angularFireDatabase
        .object<UserRole>(`users/${user.id}/role`)
        .set(role)
    ).pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  public setUserProfile(user: User, profile: UserProfile) {
    return from(
      this.angularFireDatabase
        .object<UserProfile>(`users/${user.id}/profile`)
        .set(profile)
    ).pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  public setUserVolunteer(user: User, isVolunteer: boolean) {
    return from(
      this.angularFireDatabase
        .object<boolean>(`users/${user.id}/isVolunteer`)
        .set(isVolunteer)
    ).pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  public setBereavedStatus(
    bereaved: User,
    status: BereavedStatus,
    year = MEMORIAL_YEAR
  ) {
    return from(
      this.angularFireDatabase
        .object<BereavedStatus>(
          `users/${bereaved.id}/bereavedParticipation/${year}/status`
        )
        .set(status)
    ).pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  public setBereavedGuidance(
    bereaved: User,
    guidance: BereavedGuidanceGeneral,
    year = MEMORIAL_YEAR
  ) {
    return from(
      this.angularFireDatabase
        .object<BereavedGuidanceGeneral>(
          `users/${bereaved.id}/bereavedParticipation/${year}/guidance/general`
        )
        .set(guidance)
    ).pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  public setBereavedProfile(user: User, bereavedProfile: BereavedProfile) {
    return from(
      this.angularFireDatabase
        .object<BereavedProfile>(`users/${user.id}/bereavedProfile`)
        .set(bereavedProfile)
    ).pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  public setBereavedGuidanceAnswer(
    bereaved: User,
    guidance: BereavedGuidance,
    year = MEMORIAL_YEAR
  ) {
    return from(
      this.angularFireDatabase
        .object<BereavedGuidance>(
          `users/${bereaved.id}/bereavedParticipation/${year}/guidance`
        )
        .set(guidance)
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
            .map(usersSnapshot => ({
              id: usersSnapshot.key,
              ...usersSnapshot.payload.val()
            }))
            .filter(user => user.role === 'bereaved' && !!user.profile)
            // .slice(0, 20)
            .map(user => {
              if (
                user.bereavedParticipation &&
                user.bereavedParticipation[MEMORIAL_YEAR]
              ) {
                user.bereavedParticipation[
                  MEMORIAL_YEAR
                ].meetings = this.parseUserMeetings(
                  user.bereavedParticipation[MEMORIAL_YEAR].meetings
                );
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

            const hostMeetings = this.firebaseMapToArray<Meeting>(
              hostMeetingsSnapshot.payload.val()
            );

            for (const meeting of hostMeetings) {
              meeting.hostId = hostId;

              meetings.push(meeting);
            }
          }

          return meetings;
        })
      );
  }

  public getNoBerevedMeetings(year = MEMORIAL_YEAR): Observable<Meeting[]> {
    return this.getMeetings(year).pipe(
      map((meetings: Meeting[]) =>
        meetings.filter(meeting => !meeting.bereaved)
      )
    );
  }

  public bereavedRegisterHost(
    bereaved: User,
    meeting: Meeting,
    year = MEMORIAL_YEAR
  ): Observable<boolean> {
    const postObj = {
      id: bereaved.id,
      firstName: bereaved.profile.firstName,
      lastName: bereaved.profile.lastName,
      email: bereaved.profile.email,
      phoneNumber: bereaved.profile.phoneNumber,
      slain:
        (bereaved.bereavedProfile && bereaved.bereavedProfile.slains) || null
    };

    return from(
      this.angularFireDatabase
        .object(`events/${year}/${meeting.hostId}/${meeting.id}/bereaved`)
        .set(postObj)
        .then(() => {
          // TODO: Firebase Functions
          return this.angularFireDatabase
            .object(
              `users/${bereaved.id}/bereavedParticipation/${year}/meetings/${meeting.hostId}/${meeting.id}`
            )
            .set({
              title: meeting.title
            })
            .then(() => true);
        })
        .catch(error => {
          console.log(error);
          throw error;
        })
    );
  }

  public participateRegisterHost(
    participate: User,
    meeting: Meeting,
    year = MEMORIAL_YEAR
  ): Observable<boolean> {
    const postObj = {
      firstName: participate.profile.firstName,
      lastName: participate.profile.lastName,
      email: participate.profile.email,
      phoneNumber: participate.profile.phoneNumber
    };

    return from(
      this.angularFireDatabase
        .object(`eventsParticipates/${year}/${meeting.hostId}/${meeting.id}/${participate.id}`)
        .set(postObj)
        .then(() => {
          // TODO: Firebase Functions
          return this.angularFireDatabase
            .object(
              `users/${participate.id}/participateParticipation/${year}/meetings/${meeting.hostId}/${meeting.id}`
            )
            .set({
              title: meeting.title
            })
            .then(() => true);
        })
        .catch(error => {
          console.log(error);
          throw error;
        })
    );
  }

  public bereavedLeaveHost(
    bereaved: User,
    meeting: Meeting,
    year = MEMORIAL_YEAR
  ): Observable<boolean> {
    return from(
      this.angularFireDatabase
        .object(`events/${year}/${meeting.hostId}/${meeting.id}/bereaved`)
        .remove()
        .then(() => {
          // TODO: Firebase Functions
          return this.angularFireDatabase
            .object(
              `users/${bereaved.id}/bereavedParticipation/${year}/meetings/${meeting.hostId}/${meeting.id}`
            )
            .remove()
            .then(() => true);
        })
        .catch(error => {
          console.log(error);
          throw error;
        })
    );
  }

  public postContact(contactForm: Contact, user?: User) {
    contactForm.date = (new Date()).getTime();

    return this.angularFireDatabase
      .list<Contact>(`contacts/${user ? user.id : 'anonymous'}`).push(contactForm)
      .then((result) => {
        console.log(result);
        return result;
      }, (error) => {
        console.log(error);
        throw error;
      });
  }

  private parseUserMeetings(map: Object): UserParticipationMeeting[] {
    if (map) {
      const participations: UserParticipationMeeting[] = [];

      Array.from(Object.entries(map)).forEach(
        ([hostId, meetings]: [string, Object]) => {
          Array.from(Object.entries(meetings)).forEach(
            ([id, meeting]: [string, { title: string }]) => {
              participations.push({
                id,
                hostId,
                title: meeting.title
              });
            }
          );
        }
      );

      return participations;
    }
  }

  private firebaseMapToArray<T>(map: Object): T[] {
    if (map) {
      return Array.from(Object.entries(map)).map(
        ([id, object]: [string, T]) => ({
          ...object,
          id
        })
      );
    }
  }
}
