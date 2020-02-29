import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import {
  User,
  Meeting,
  UserParticipationMeeting,
  BereavedStatus,
  BereavedGuidanceGeneral,
  BereavedGuidance,
  BereavedProfile,
  UserRole,
  UserProfile,
  MeetingParticipate,
  Contact,
  HostParticipation,
  ParticipateParticipation,
  ParticipateParticipationMeeting,
  MeetingBereaved
} from 'models';
import { AnalyticsService } from './analytics.service';
import { MeetingForm } from '../components/forms/host-form/host-form.component';

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
  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private analyticsService: AnalyticsService
  ) {}

  public getUserById(userId: string): Observable<User> {
    return this.angularFireDatabase
      .object<User>(`users/${userId}`)
      .valueChanges()
      .pipe(
        tap(() => console.log('getUserById')),
        map(user => ({
          id: userId,
          ...user
        })),
        map(user => {
          this.parseBereavedParticipation(user);
          this.parseParticipateParticipation(user);
          this.parseHostParticipation(user);

          return user;
        }),
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  public createMeeting(
    user: User,
    meeting: MeetingForm,
    year = MEMORIAL_YEAR
  ): Observable<Meeting> {
    const parsedMeeting: Meeting = {
      ...meeting,
      hostId: null,
      id: null,
      count: 0,
      contact: {
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        phoneNumber: user.profile.phoneNumber,
        email: user.profile.email
      }
    };

    const telemetry = { parsedMeeting };

    this.analyticsService.logEvent('CreateMeeting', telemetry);

    return from(
      this.angularFireDatabase
        .list<Meeting>(`events/${year}/${user.id}`)
        .push(parsedMeeting)
    ).pipe(
      tap(() => {
        this.analyticsService.logEvent('CreateMeetingSuccess', telemetry);
      }),
      map(meetingSnapshot => ({
        ...parsedMeeting,
        hostId: user.id,
        id: meetingSnapshot.key
      })),
      catchError(error => {
        this.analyticsService.logEvent('CreateMeetingFailed', {
          ...telemetry,
          error
        });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public updateUserMapGuideLastVisit(userId: string) {
    const now = Date.now();

    const telemetry = { now };

    this.analyticsService.logEvent('UserMapGuideLastVisit', telemetry);
    return from(
      this.angularFireDatabase
        .object<number>(`users/${userId}/meetingMapGuideLastVisit`)
        .set(now)
    ).pipe(
      tap(() => {
        this.analyticsService.logEvent(
          'UserMapGuideLastVisitSuccess',
          telemetry
        );
      }),
      catchError(error => {
        this.analyticsService.logEvent('UserMapGuideLastVisitFailed', {
          ...telemetry,
          error
        });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public setUserRole(user: User, role: UserRole) {
    const telemetry = { role };

    this.analyticsService.logEvent('SetUserRole', telemetry);
    return from(
      this.angularFireDatabase
        .object<UserRole>(`users/${user.id}/role`)
        .set(role)
    ).pipe(
      tap(() =>
        this.analyticsService.logEvent('SetUserRoleSuccess', telemetry)
      ),
      catchError(error => {
        this.analyticsService.logEvent('SetUserRoleFailed', {
          ...telemetry,
          error
        });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public setUserProfile(user: User, profile: UserProfile) {
    const telemetry = { userId: user.id };

    this.analyticsService.logEvent('SetUserProfile', telemetry);
    return from(
      this.angularFireDatabase
        .object<UserProfile>(`users/${user.id}/profile`)
        .set(profile)
    ).pipe(
      tap(() =>
        this.analyticsService.logEvent('SetUserProfileSuccess', telemetry)
      ),
      catchError(error => {
        this.analyticsService.logEvent('SetUserProfileFailed', {
          ...telemetry,
          error
        });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public setUserVolunteer(user: User, isVolunteer: boolean) {
    const telemetry = { isVolunteer };

    this.analyticsService.logEvent('SetUserVolunteer', telemetry);
    return from(
      this.angularFireDatabase
        .object<boolean>(`users/${user.id}/isVolunteer`)
        .set(isVolunteer)
    ).pipe(
      tap(() =>
        this.analyticsService.logEvent('SetUserVolunteerSuccess', telemetry)
      ),
      catchError(error => {
        this.analyticsService.logEvent('SetUserVolunteerFailed', {
          ...telemetry,
          error
        });
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

    this.analyticsService.logEvent('SetBereavedStatus', telemetry);
    return from(
      this.angularFireDatabase
        .object<BereavedStatus>(
          `users/${bereaved.id}/bereavedParticipation/${year}/status`
        )
        .set(status)
    ).pipe(
      tap(() =>
        this.analyticsService.logEvent('SetBereavedStatusSuccess', telemetry)
      ),
      catchError(error => {
        this.analyticsService.logEvent('SetBereavedStatusFailed', {
          ...telemetry,
          error
        });
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

    this.analyticsService.logEvent('SetBereavedGuidanceGeneral', telemetry);
    return from(
      this.angularFireDatabase
        .object<BereavedGuidanceGeneral>(
          `users/${bereaved.id}/bereavedParticipation/${year}/guidance/general`
        )
        .set(guidanceGeneral)
    ).pipe(
      tap(() =>
        this.analyticsService.logEvent(
          'SetBereavedGuidanceGeneralSuccess',
          telemetry
        )
      ),
      catchError(error => {
        this.analyticsService.logEvent('SetBereavedGuidanceGeneralFailed', {
          ...telemetry,
          error
        });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public setBereavedProfile(bereaved: User, bereavedProfile: BereavedProfile) {
    this.analyticsService.logEvent('SetBereavedProfile', {
      userId: bereaved.id
    });
    return from(
      this.angularFireDatabase
        .object<BereavedProfile>(`users/${bereaved.id}/bereavedProfile`)
        .set(bereavedProfile)
    ).pipe(
      tap(() =>
        this.analyticsService.logEvent('SetBereavedProfileSuccess', {
          userId: bereaved.id
        })
      ),
      catchError(error => {
        this.analyticsService.logEvent('SetBereavedProfileFailed', {
          userId: bereaved.id
        });
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

    this.analyticsService.logEvent('SetBereavedGuidance', telemetry);
    return from(
      this.angularFireDatabase
        .object<BereavedGuidance>(
          `users/${bereaved.id}/bereavedParticipation/${year}/guidance`
        )
        .set(guidance)
    ).pipe(
      tap(() =>
        this.analyticsService.logEvent('SetBereavedGuidanceSuccess', telemetry)
      ),
      catchError(error => {
        this.analyticsService.logEvent('SetBereavedGuidanceFailed', {
          ...telemetry,
          error
        });
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
        tap(() => console.log('getBereaveds')),
        map(usersSnapshot =>
          usersSnapshot
            .map(usersSnapshot => ({
              id: usersSnapshot.key,
              ...usersSnapshot.payload.val()
            }))
            .filter(user => user.role === 'bereaved' && !!user.profile)
            .slice(0, 20)
            .map(user => {
              this.parseBereavedParticipation(user, year);
              return user;
            })
        )
      );
  }

  public getMeeting(
    hostId: string,
    meetingId: string,
    year = MEMORIAL_YEAR
  ): Observable<Meeting> {
    return this.angularFireDatabase
      .object<Meeting>(`events/${year}/${hostId}/${meetingId}`)
      .snapshotChanges()
      .pipe(
        map(meetingSnapshot => ({
          ...meetingSnapshot.payload.val(),
          hostId,
          id: meetingSnapshot.key
        }))
      );
  }

  public getMeetingParticipates(
    hostId: string,
    meetingId: string,
    year = MEMORIAL_YEAR
  ): Observable<MeetingParticipate[]> {
    return this.angularFireDatabase
      .list<MeetingParticipate>(
        `eventsParticipates/${year}/${hostId}/${meetingId}`
      )
      .snapshotChanges()
      .pipe(
        map(participates =>
          participates.map(participate => ({
            id: participate.key,
            ...participate.payload.val()
          }))
        ),
        catchError(error => {
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
        tap(() => console.log('getMeetings')),
        map(meetingsSnapshot => {
          const meetings: Meeting[] = [];

          for (const hostMeetingsSnapshot of meetingsSnapshot) {
            const hostId = hostMeetingsSnapshot.key;

            const hostMeetings = this.firebaseMapToArray<Meeting>(
              hostMeetingsSnapshot.payload.val()
            );

            for (const meeting of hostMeetings) {
              meeting.hostId = hostId;
              meeting.count = meeting.count || 0;

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
    const postObj: MeetingBereaved = {
      id: bereaved.id,
      firstName: bereaved.profile.firstName,
      lastName: bereaved.profile.lastName,
      email: bereaved.profile.email,
      phoneNumber: bereaved.profile.phoneNumber,
      slains:
        (bereaved.bereavedProfile && bereaved.bereavedProfile.slains) || null
    };

    const telemetry = {
      userId: bereaved.id,
      hostId: meeting.hostId,
      id: meeting.id,
      year
    };

    this.analyticsService.logEvent('BereavedRegisterHost', telemetry);

    return from(
      this.angularFireDatabase
        .object(`events/${year}/${meeting.hostId}/${meeting.id}/bereaved`)
        .set(postObj)
    ).pipe(
      tap(() =>
        this.analyticsService.logEvent('BereavedRegisterHostSuccess', telemetry)
      ),
      map(() => true),
      catchError(error => {
        this.analyticsService.logEvent('BereavedRegisterHostFailed', {
          ...telemetry,
          error
        });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public participateRegisterHost(
    participate: User,
    meeting: Meeting,
    accompanies: number,
    year = MEMORIAL_YEAR
  ): Observable<boolean> {
    const postObj: MeetingParticipate = {
      firstName: participate.profile.firstName,
      lastName: participate.profile.lastName,
      email: participate.profile.email,
      phoneNumber: participate.profile.phoneNumber,
      accompanies
    };

    const telemetry = {
      userId: participate.id,
      hostId: meeting.hostId,
      id: meeting.id,
      year
    };

    this.analyticsService.logEvent('ParticipateRegisterHost', telemetry);

    return from(
      this.angularFireDatabase
        .object(
          `eventsParticipates/${year}/${meeting.hostId}/${meeting.id}/${participate.id}`
        )
        .set(postObj)
    ).pipe(
      tap(() =>
        this.analyticsService.logEvent(
          'ParticipateRegisterHostSuccess',
          telemetry
        )
      ),
      map(() => true),
      catchError(error => {
        this.analyticsService.logEvent('ParticipateRegisterHostFailed', {
          ...telemetry,
          error
        });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public bereavedLeaveHost(
    bereaved: User,
    meeting: Meeting,
    year = MEMORIAL_YEAR
  ): Observable<boolean> {
    const telemetry = {
      userId: bereaved.id,
      hostId: meeting.hostId,
      id: meeting.id,
      year
    };

    this.analyticsService.logEvent('BereavedLeaveHost', telemetry);

    return from(
      this.angularFireDatabase
        .object(`events/${year}/${meeting.hostId}/${meeting.id}/bereaved`)
        .remove()
    ).pipe(
      tap(() =>
        this.analyticsService.logEvent('BereavedLeaveHostSuccess', telemetry)
      ),
      map(() => true),
      catchError(error => {
        this.analyticsService.logEvent('BereavedLeaveHostFailed', {
          ...telemetry,
          error
        });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public postContact(contactForm: Contact, user?: User) {
    contactForm.date = new Date().getTime();

    const telemetry = { userId: user && user.id };

    this.analyticsService.logEvent('PostContact', telemetry);

    return this.angularFireDatabase
      .list<Contact>(`contacts/${user ? user.id : 'anonymous'}`)
      .push(contactForm)
      .then(
        result => {
          this.analyticsService.logEvent('PostContactSuccess', telemetry);
        },
        error => {
          this.analyticsService.logEvent('PostContactFailed', {
            ...telemetry,
            error
          });
          console.error(error);
          throw error;
        }
      );
  }

  private parseHostParticipation(user: User, year = MEMORIAL_YEAR) {
    if (
      user.hostParticipation &&
      user.hostParticipation[year] &&
      user.hostParticipation[year]
    ) {
      const meetings: UserParticipationMeeting[] = this.firebaseMapToArray<
        UserParticipationMeeting
      >(user.hostParticipation[year].meetings, { hostId: user.id });

      const hostParticipation: HostParticipation = {
        meetings
      };

      user.hostParticipation[year] = hostParticipation;
    }
  }

  private parseParticipateParticipation(user: User, year = MEMORIAL_YEAR) {
    if (
      user.participateParticipation &&
      user.participateParticipation[year] &&
      user.participateParticipation[year]
    ) {
      const participateMeetings: ParticipateParticipationMeeting[] = [];

      if (user.participateParticipation[year].meetings) {
        Array.from(
          Object.entries(user.participateParticipation[year].meetings)
        ).forEach(([hostId, meetings]: [string, Object]) => {
          Array.from(Object.entries(meetings)).forEach(
            ([id, meeting]: [string, ParticipateParticipationMeeting]) => {
              participateMeetings.push({
                id,
                hostId,
                title: meeting.title,
                accompanies: meeting.accompanies
              });
            }
          );
        });
      }

      const participateParticipation: ParticipateParticipation = {
        meetings: participateMeetings
      };

      user.participateParticipation[year] = participateParticipation;
    }
  }

  private parseBereavedParticipation(user: User, year = MEMORIAL_YEAR) {
    if (
      user.bereavedParticipation &&
      user.bereavedParticipation[year] &&
      user.bereavedParticipation[year]
    ) {
      const bereavedMeetings: UserParticipationMeeting[] = [];

      if (user.bereavedParticipation[year].meetings) {
        Array.from(
          Object.entries(user.bereavedParticipation[year].meetings)
        ).forEach(([hostId, meetings]: [string, Object]) => {
          Array.from(Object.entries(meetings)).forEach(
            ([id, meeting]: [string, UserParticipationMeeting]) => {
              bereavedMeetings.push({
                id,
                hostId,
                title: meeting.title
              });
            }
          );
        });

        user.bereavedParticipation[year].meetings = bereavedMeetings;
      }
    }
  }

  private firebaseMapToArray<T>(map: Object, additionalData = {}): T[] {
    if (map) {
      return Array.from(Object.entries(map)).map(
        ([id, object]: [string, T]) => ({
          ...object,
          id,
          ...additionalData
        })
      );
    }
  }
}
