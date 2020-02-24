import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';

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
import { AnalyticsService } from './analytics.service';
import { HostDetailsForm } from '../components/forms/host-form/host-form.component';

export const MEMORIAL_YEAR = 2020;

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
  constructor(private angularFireDatabase: AngularFireDatabase,
    private analyticsService: AnalyticsService) { }

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

          this.parseUserMeetings(user, 'bereavedParticipation');
          this.parseUserMeetings(user, 'participateParticipation');
          this.parseUserMeetings(user, 'hostParticipation');

          return user;
        }),
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  public createMeeting(user: User, meeting: HostDetailsForm, year = MEMORIAL_YEAR): Observable<boolean> {

    const parsedMeeting: Meeting = {
      ...meeting,
      hostId: null,
      id: null,
      count: null,
      contact: {
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        phoneNumber: user.profile.phoneNumber,
        email: user.profile.email
      }
    };

    const telemetry = { parsedMeeting };

    this.analyticsService.logEvent('CreateMeeting', 'start', telemetry);

    return from(this.angularFireDatabase
      .list<Meeting>(`events/${year}/${user.id}`)
      .push(parsedMeeting))
      .pipe(
        tap(() => {
          this.analyticsService.logEvent('CreateMeeting', 'end', telemetry);
        }),
        map(() => true),
        catchError(error => {
          this.analyticsService.logEvent('CreateMeeting', 'failed', { ...telemetry, error: error.toString() });
          console.error(error);
          return throwError(error);
        })
      );
  }

  public updateUserMapGuideLastVisit(userId: string) {

    const now = Date.now();

    const telemetry = { now };

    this.analyticsService.logEvent('UserMapGuideLastVisit', 'start', telemetry);
    return from(
      this.angularFireDatabase.object<number>(`users/${userId}/meetingMapGuideLastVisit`).set(now)
    ).pipe(
      tap(() => {
        this.analyticsService.logEvent('UserMapGuideLastVisit', 'end', telemetry);
      }),
      catchError(error => {
        this.analyticsService.logEvent('UserMapGuideLastVisit', 'failed', { ...telemetry, error: error.toString() });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public setUserRole(user: User, role: UserRole) {
    const telemetry = { role };

    this.analyticsService.logEvent('SetUserRole', 'start', telemetry);
    return from(
      this.angularFireDatabase
        .object<UserRole>(`users/${user.id}/role`)
        .set(role)
    ).pipe(
      tap(() => this.analyticsService.logEvent('SetUserRole', 'end', telemetry)),
      catchError(error => {
        this.analyticsService.logEvent('SetUserRole', 'failed', { ...telemetry, error: error.toString() });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public setUserProfile(user: User, profile: UserProfile) {
    const telemetry = { userId: user.id };

    this.analyticsService.logEvent('SetUserProfile', 'start', telemetry);
    return from(
      this.angularFireDatabase
        .object<UserProfile>(`users/${user.id}/profile`)
        .set(profile)
    ).pipe(
      tap(() => this.analyticsService.logEvent('SetUserProfile', 'end', telemetry)),
      catchError(error => {
        this.analyticsService.logEvent('SetUserProfile', 'failed', { ...telemetry, error: error.toString() });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public setUserVolunteer(user: User, isVolunteer: boolean) {
    const telemetry = { isVolunteer };

    this.analyticsService.logEvent('SetUserVolunteer', 'start', telemetry);
    return from(
      this.angularFireDatabase
        .object<boolean>(`users/${user.id}/isVolunteer`)
        .set(isVolunteer)
    ).pipe(
      tap(() => this.analyticsService.logEvent('SetUserVolunteer', 'end', telemetry)),
      catchError(error => {
        this.analyticsService.logEvent('SetUserVolunteer', 'failed', { ...telemetry, error: error.toString() });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public setBereavedStatus(
    bereaved: User,
    status: BereavedStatus,
    year = MEMORIAL_YEAR
  ) {
    const telemetry = { userId: bereaved.id, status, year };

    this.analyticsService.logEvent('SetBereavedStatus', 'start', telemetry);
    return from(
      this.angularFireDatabase
        .object<BereavedStatus>(
          `users/${bereaved.id}/bereavedParticipation/${year}/status`
        )
        .set(status)
    ).pipe(
      tap(() => this.analyticsService.logEvent('SetBereavedStatus', 'end', telemetry)),
      catchError(error => {
        this.analyticsService.logEvent('SetBereavedStatus', 'failed', { ...telemetry, error: error.toString() });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public setBereavedGuidanceGeneral(
    bereaved: User,
    guidanceGeneral: BereavedGuidanceGeneral,
    year = MEMORIAL_YEAR
  ) {
    const telemetry = { userId: bereaved.id, guidanceGeneral, year };

    this.analyticsService.logEvent('SetBereavedGuidanceGeneral', 'start', telemetry);
    return from(
      this.angularFireDatabase
        .object<BereavedGuidanceGeneral>(
          `users/${bereaved.id}/bereavedParticipation/${year}/guidance/general`
        )
        .set(guidanceGeneral)
    ).pipe(
      tap(() => this.analyticsService.logEvent('SetBereavedGuidanceGeneral', 'end', telemetry)),
      catchError(error => {
        this.analyticsService.logEvent('SetBereavedGuidanceGeneral', 'failed', { ...telemetry, error: error.toString() })
        console.error(error);
        return throwError(error);
      })
    );
  }

  public setBereavedProfile(bereaved: User, bereavedProfile: BereavedProfile) {
    this.analyticsService.logEvent('SetBereavedProfile', 'start', { userId: bereaved.id });
    return from(
      this.angularFireDatabase
        .object<BereavedProfile>(`users/${bereaved.id}/bereavedProfile`)
        .set(bereavedProfile)
    ).pipe(
      tap(() => this.analyticsService.logEvent('SetBereavedProfile', 'end', { userId: bereaved.id })),
      catchError(error => {
        this.analyticsService.logEvent('SetBereavedProfile', 'failed', { userId: bereaved.id });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public setBereavedGuidance(
    bereaved: User,
    guidance: BereavedGuidance,
    year = MEMORIAL_YEAR
  ) {

    const telemetry = { userId: bereaved.id, guidance, year };

    this.analyticsService.logEvent('SetBereavedGuidance', 'start', telemetry);
    return from(
      this.angularFireDatabase
        .object<BereavedGuidance>(
          `users/${bereaved.id}/bereavedParticipation/${year}/guidance`
        )
        .set(guidance)
    ).pipe(
      tap(() => this.analyticsService.logEvent('SetBereavedGuidance', 'start', telemetry)),
      catchError(error => {
        this.analyticsService.logEvent('SetBereavedGuidance', 'failed', { ...telemetry, error: error.toString() });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public getBereaveds(year = MEMORIAL_YEAR): Observable<User[]> {
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
              this.parseUserMeetings(user, 'bereavedParticipation', year);
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

    const telemetry = { userId: bereaved.id, hostId: meeting.hostId, id: meeting.id, year };

    this.analyticsService.logEvent('BereavedRegisterHost', 'start', telemetry);

    return from(
      this.angularFireDatabase
        .object(`events/${year}/${meeting.hostId}/${meeting.id}/bereaved`)
        .set(postObj)
    ).pipe(
      switchMap(() => this.angularFireDatabase
        .object(
          `users/${bereaved.id}/bereavedParticipation/${year}/meetings/${meeting.hostId}/${meeting.id}`
        )
        .set({
          title: meeting.title
        })),
      tap(() => this.analyticsService.logEvent('BereavedRegisterHost', 'end', telemetry)),
      map(() => true),
      catchError(error => {
        this.analyticsService.logEvent('BereavedRegisterHost', 'failed', { ...telemetry, error: error.toString() });
        console.error(error);
        return throwError(error);
      })
    )
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

    const telemetry = { userId: participate.id, hostId: meeting.hostId, id: meeting.id, year };

    this.analyticsService.logEvent('ParticipateRegisterHost', 'start', telemetry);

    return from(
      this.angularFireDatabase
        .object(`eventsParticipates/${year}/${meeting.hostId}/${meeting.id}/${participate.id}`)
        .set(postObj)
    ).pipe(
      switchMap(() => this.angularFireDatabase
        .object(
          `users/${participate.id}/participateParticipation/${year}/meetings/${meeting.hostId}/${meeting.id}`
        )
        .set({
          title: meeting.title
        })),
      tap(() => this.analyticsService.logEvent('ParticipateRegisterHost', 'end', telemetry)),
      map(() => true),
      catchError(error => {
        this.analyticsService.logEvent('ParticipateRegisterHost', 'failed', { ...telemetry, error: error.toString() });
        console.error(error);
        return throwError(error);
      })
    )
  }

  public bereavedLeaveHost(
    bereaved: User,
    meeting: Meeting,
    year = MEMORIAL_YEAR
  ): Observable<boolean> {
    const telemetry = { userId: bereaved.id, hostId: meeting.hostId, id: meeting.id, year };

    this.analyticsService.logEvent('BereavedLeaveHost', 'start', telemetry);

    return from(
      this.angularFireDatabase
        .object(`events/${year}/${meeting.hostId}/${meeting.id}/bereaved`)
        .remove()
    ).pipe(
      switchMap(() => this.angularFireDatabase
        .object(`users/${bereaved.id}/bereavedParticipation/${year}/meetings/${meeting.hostId}/${meeting.id}`)
        .remove()
      ),
      tap(() => this.analyticsService.logEvent('BereavedLeaveHost', 'end', telemetry)),
      map(() => true),
      catchError(error => {
        this.analyticsService.logEvent('BereavedLeaveHost', 'failed', { ...telemetry, error: error.toString() });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public postContact(contactForm: Contact, user?: User) {
    contactForm.date = (new Date()).getTime();

    const telemetry = { userId: user && user.id };

    this.analyticsService.logEvent('PostContact', 'start', telemetry);

    return this.angularFireDatabase
      .list<Contact>(`contacts/${user ? user.id : 'anonymous'}`).push(contactForm)
      .then((result) => {
        this.analyticsService.logEvent('PostContact', 'end', telemetry);
      }, (error) => {
        this.analyticsService.logEvent('PostContact', 'failed', { ...telemetry, error: error.toString() });
        console.error(error);
        throw error;
      });
  }

  private parseUserMeetings(user: User, field: string, year = MEMORIAL_YEAR) {
    const map = user[field] && user[field][year];

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

      user[field][year] = participations;
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
