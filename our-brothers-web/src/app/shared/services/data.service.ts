import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, throwError, from, combineLatest, interval } from 'rxjs';
import { map, catchError, tap, switchMap, debounce } from 'rxjs/operators';

import { MEMORIAL_YEAR } from '../constants';
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
import { MeetingForm } from '../../host/host-form/host-form.component';
import { ParticipationsService } from './participations.service';

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
    private analyticsService: AnalyticsService,
    private participationsService: ParticipationsService
  ) {}

  public getUserById(userId: string): Observable<User> {
    this.analyticsService.logEvent('GetUserById');
    return this.angularFireDatabase
      .object<User>(`users/${userId}`)
      .valueChanges()
      .pipe(
        tap(() => this.analyticsService.logEvent('GetUserByIdSuccess')),
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
          this.analyticsService.logEvent('GetUserByIdFailed');
          console.error(error);
          return throwError(error);
        })
      );
  }

  public updateUserLastSignIn(user: User) {
    const telemetry = { userId: user.id };

    this.analyticsService.logEvent('UpdateUserLastSignIn', telemetry);

    return from(this.angularFireDatabase.object(`users/${user.id}/lastSignInDate`).set(Date.now())).pipe(
      tap(() => {
        this.analyticsService.logEvent('UpdateUserLastSignInSuccess', telemetry);
      }),
      map(() => true),
      catchError(error => {
        this.analyticsService.logEvent('UpdateUserLastSignInFailed', {
          ...telemetry,
          error
        });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public createMeeting(user: User, meetingForm: MeetingForm, year = MEMORIAL_YEAR): Observable<Meeting> {
    const parsedMeeting: Partial<Meeting> = {
      ...meetingForm,
      date: Date.parse(`${meetingForm.date}T${meetingForm.hour}Z`),
      count: 0,
      contact: {
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        phoneNumber: user.profile.phoneNumber,
        email: user.profile.email
      }
    };

    const telemetry = { meeting: parsedMeeting, hostId: user.id, year };

    this.analyticsService.logEvent('CreateMeeting', telemetry);

    return from(this.angularFireDatabase.list<Partial<Meeting>>(`events/${year}/${user.id}`).push(parsedMeeting)).pipe(
      tap(() => {
        this.analyticsService.logEvent('CreateMeetingSuccess', telemetry);
      }),
      map(
        meetingSnapshot =>
          ({
            ...parsedMeeting,
            hostId: user.id,
            id: meetingSnapshot.key
          } as Meeting)
      ),
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

  public updateMeeting(
    hostId: string,
    meetingId: string,
    meetingForm: MeetingForm,
    year = MEMORIAL_YEAR
  ): Observable<boolean> {
    const parsedMeeting: Partial<Meeting> = {
      ...meetingForm,
      date: Date.parse(`${meetingForm.date}T${meetingForm.hour}Z`)
    };

    const telemetry = { meeting: parsedMeeting, hostId, meetingId, year };

    this.analyticsService.logEvent('UpdateMeeting', telemetry);

    return from(
      this.angularFireDatabase.object<Meeting>(`events/${year}/${hostId}/${meetingId}`).update(parsedMeeting)
    ).pipe(
      tap(() => {
        this.analyticsService.logEvent('UpdateMeetingSuccess', telemetry);
      }),
      map(() => true),
      catchError(error => {
        this.analyticsService.logEvent('UpdateMeetingFailed', {
          ...telemetry,
          error
        });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public deleteMeeting(hostId: string, meetingId: string, year = MEMORIAL_YEAR): Observable<boolean> {
    const telemetry = { hostId, meetingId, year };

    this.analyticsService.logEvent('DeleteMeeting', telemetry);

    return from(this.angularFireDatabase.object(`events/${year}/${hostId}/${meetingId}`).remove()).pipe(
      tap(() => {
        this.analyticsService.logEvent('DeleteMeetingSuccess', telemetry);
      }),
      map(() => true),
      catchError(error => {
        this.analyticsService.logEvent('DeleteMeetingFailed', {
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
    return from(this.angularFireDatabase.object<number>(`users/${userId}/meetingMapGuideLastVisit`).set(now)).pipe(
      tap(() => {
        this.analyticsService.logEvent('UserMapGuideLastVisitSuccess', telemetry);
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

    this.analyticsService.logEvent('SetUserType', telemetry);
    return from(this.angularFireDatabase.object<UserRole>(`users/${user.id}/role`).set(role)).pipe(
      tap(() => this.analyticsService.logEvent('SetUserTypeSuccess', telemetry)),
      catchError(error => {
        this.analyticsService.logEvent('SetUserTypeFailed', {
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
    return from(this.angularFireDatabase.object<UserProfile>(`users/${user.id}/profile`).set(profile)).pipe(
      tap(() => this.analyticsService.logEvent('SetUserProfileSuccess', telemetry)),
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
    return from(this.angularFireDatabase.object<boolean>(`users/${user.id}/isVolunteer`).set(isVolunteer)).pipe(
      tap(() => this.analyticsService.logEvent('SetUserVolunteerSuccess', telemetry)),
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

  public setBereavedStatus(bereaved: User, status: BereavedStatus, year = MEMORIAL_YEAR) {
    const telemetry = { userId: bereaved.id, status, year };

    this.analyticsService.logEvent('SetBereavedStatus', telemetry);
    return from(
      this.angularFireDatabase
        .object<BereavedStatus>(`users/${bereaved.id}/bereavedParticipation/${year}/status`)
        .set(status)
    ).pipe(
      tap(() => this.analyticsService.logEvent('SetBereavedStatusSuccess', telemetry)),
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

  public setBereavedGuidanceGeneral(bereaved: User, guidanceGeneral: BereavedGuidanceGeneral, year = MEMORIAL_YEAR) {
    const telemetry = { userId: bereaved.id, guidanceGeneral, year };

    this.analyticsService.logEvent('SetBereavedGuidanceGeneral', telemetry);
    return from(
      this.angularFireDatabase
        .object<BereavedGuidanceGeneral>(`users/${bereaved.id}/bereavedParticipation/${year}/guidance/general`)
        .set(guidanceGeneral)
    ).pipe(
      tap(() => this.analyticsService.logEvent('SetBereavedGuidanceGeneralSuccess', telemetry)),
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
      this.angularFireDatabase.object<BereavedProfile>(`users/${bereaved.id}/bereavedProfile`).set(bereavedProfile)
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

  public setBereavedGuidance(bereaved: User, guidance: BereavedGuidance, year = MEMORIAL_YEAR) {
    const telemetry = { userId: bereaved.id, guidance, year };

    this.analyticsService.logEvent('SetBereavedGuidance', telemetry);
    return from(
      this.angularFireDatabase
        .object<BereavedGuidance>(`users/${bereaved.id}/bereavedParticipation/${year}/guidance`)
        .set(guidance)
    ).pipe(
      tap(() => this.analyticsService.logEvent('SetBereavedGuidanceSuccess', telemetry)),
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
    this.analyticsService.logEvent('GetBereaveds');
    return this.angularFireDatabase
      .list<User>(`users`, ref => ref.orderByChild('role').equalTo(UserRole.bereaved))
      .snapshotChanges()
      .pipe(
        tap(() => this.analyticsService.logEvent('GetBereavedsSuccess')),
        map(usersSnapshot =>
          usersSnapshot
            .map(usersSnapshot => ({
              id: usersSnapshot.key,
              ...usersSnapshot.payload.val()
            }))
            .filter(user => !!user.profile)
            // .slice(0, 20)
            .map(user => {
              this.parseBereavedParticipation(user, year);
              return user;
            })
        ),
        catchError(error => {
          this.analyticsService.logEvent('GetBereavedsFailed');
          console.error(error);
          return throwError(error);
        })
      );
  }

  public getUsers(): Observable<User[]> {
    this.analyticsService.logEvent('GetUsers');
    return this.angularFireDatabase
      .list<User>(`users`, ref =>
        ref
          .orderByChild('profile')
          .startAt('!')
          .endAt('~')
      )
      .snapshotChanges()
      .pipe(
        debounce(() => interval(1000)),
        tap(() => this.analyticsService.logEvent('GetUsersSuccess')),
        map(
          usersSnapshot =>
            usersSnapshot.map(usersSnapshot => ({
              id: usersSnapshot.key,
              ...usersSnapshot.payload.val()
            }))
          // .slice(0, 20)
        ),
        catchError(error => {
          this.analyticsService.logEvent('GetUsersFailed');
          console.error(error);
          return throwError(error);
        })
      );
  }

  public getMeeting(hostId: string, meetingId: string, year = MEMORIAL_YEAR): Observable<Meeting> {
    const telemetry = { hostId, meetingId, year };

    this.analyticsService.logEvent('GetMeeting', telemetry);
    return this.angularFireDatabase
      .object<Meeting>(`events/${year}/${hostId}/${meetingId}`)
      .snapshotChanges()
      .pipe(
        tap(() => this.analyticsService.logEvent('GetMeetingSuccess', telemetry)),
        map(meetingSnapshot => ({
          ...meetingSnapshot.payload.val(),
          hostId,
          id: meetingSnapshot.key
        })),
        catchError(error => {
          this.analyticsService.logEvent('GetMeetingFailed', telemetry);
          console.error(error);
          return throwError(error);
        })
      );
  }

  public getMeetingParticipates(
    hostId: string,
    meetingId: string,
    year = MEMORIAL_YEAR
  ): Observable<MeetingParticipate[]> {
    const telemetry = { hostId, meetingId, year };

    this.analyticsService.logEvent('GetMeetingParticipates', telemetry);
    return this.angularFireDatabase
      .list<MeetingParticipate>(`eventsParticipates/${year}/${hostId}/${meetingId}`)
      .snapshotChanges()
      .pipe(
        tap(() => this.analyticsService.logEvent('getMeetingParticipatesSuccess', telemetry)),
        map(participates =>
          participates.map(participate => ({
            id: participate.key,
            ...participate.payload.val()
          }))
        ),
        catchError(error => {
          this.analyticsService.logEvent('getMeetingParticipatesFailed', telemetry);
          console.log(error);
          return throwError(error);
        })
      );
  }

  public getMeetings(year = MEMORIAL_YEAR): Observable<Meeting[]> {
    const telemetry = { year };

    this.analyticsService.logEvent('GetMeetings', telemetry);
    return this.angularFireDatabase
      .list<Meeting>(`events/${year}`)
      .snapshotChanges()
      .pipe(
        tap(() => this.analyticsService.logEvent('GetMeetingsSuccess', telemetry)),
        map(meetingsSnapshot => {
          const meetings: Meeting[] = [];

          for (const hostMeetingsSnapshot of meetingsSnapshot) {
            const hostId = hostMeetingsSnapshot.key;

            const hostMeetings = this.firebaseMapToArray<Meeting>(hostMeetingsSnapshot.payload.val());

            for (const meeting of hostMeetings) {
              meeting.hostId = hostId;
              meeting.count = meeting.count || 0;

              meetings.push(meeting);
            }
          }

          return meetings;
        }),
        catchError(error => {
          this.analyticsService.logEvent('GetMeetingsFailed', telemetry);
          console.log(error);
          return throwError(error);
        })
      );
  }

  public getNoBerevedMeetings(year = MEMORIAL_YEAR): Observable<Meeting[]> {
    return this.getMeetings(year).pipe(map((meetings: Meeting[]) => meetings.filter(meeting => !meeting.bereaved)));
  }

  public bereavedRegisterHost(bereaved: User, meeting: Meeting, year = MEMORIAL_YEAR): Observable<boolean> {
    const telemetry = {
      userId: bereaved.id,
      hostId: meeting.hostId,
      id: meeting.id,
      year
    };

    this.analyticsService.logEvent('BereavedRegisterHost', telemetry);

    return combineLatest([this.getUserById(bereaved.id), this.getMeeting(meeting.hostId, meeting.id, year)]).pipe(
      tap(([b, m]) => {
        if (!this.participationsService.isBereavedCanParticipatingMeeting(b, m)) {
          throw new Error("Bereaved can't participate meeting.");
        }
      }),
      switchMap(([b, m]) => {
        const meetingBereaved: MeetingBereaved = {
          id: b.id,
          firstName: b.profile.firstName,
          lastName: b.profile.lastName,
          email: b.profile.email,
          phoneNumber: b.profile.phoneNumber,
          slains: b.bereavedProfile.slains
        };

        return from(
          this.angularFireDatabase.object(`events/${year}/${m.hostId}/${m.id}/bereaved`).set(meetingBereaved)
        );
      }),
      tap(() => this.analyticsService.logEvent('BereavedRegisterHostSuccess', telemetry)),
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
    const telemetry = {
      userId: participate.id,
      hostId: meeting.hostId,
      id: meeting.id,
      year
    };

    this.analyticsService.logEvent('ParticipateRegisterHost', telemetry);

    return combineLatest([this.getUserById(participate.id), this.getMeeting(meeting.hostId, meeting.id, year)]).pipe(
      tap(([p, m]) => {
        if (!this.participationsService.isParticipateCanParticipatingMeeting(p, m)) {
          throw new Error("Participate can't participate meeting.");
        }
      }),
      switchMap(([p, m]) => {
        const meetingParticipate: MeetingParticipate = {
          firstName: p.profile.firstName,
          lastName: p.profile.lastName,
          email: p.profile.email,
          phoneNumber: p.profile.phoneNumber,
          accompanies
        };
        return from(
          this.angularFireDatabase
            .object(`eventsParticipates/${year}/${m.hostId}/${m.id}/${p.id}`)
            .set(meetingParticipate)
        );
      }),
      tap(() => this.analyticsService.logEvent('ParticipateRegisterHostSuccess', telemetry)),
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

  public bereavedLeaveHost(bereaved: User, meeting: Meeting, year = MEMORIAL_YEAR): Observable<boolean> {
    const telemetry = {
      userId: bereaved.id,
      hostId: meeting.hostId,
      id: meeting.id,
      year
    };

    this.analyticsService.logEvent('BereavedLeaveHost', telemetry);

    return from(
      this.angularFireDatabase.object(`events/${year}/${meeting.hostId}/${meeting.id}/bereaved`).remove()
    ).pipe(
      tap(() => this.analyticsService.logEvent('BereavedLeaveHostSuccess', telemetry)),
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
    if (user.hostParticipation && user.hostParticipation[year] && user.hostParticipation[year]) {
      const meetings: UserParticipationMeeting[] = this.firebaseMapToArray<UserParticipationMeeting>(
        user.hostParticipation[year].meetings,
        { hostId: user.id }
      );

      const hostParticipation: HostParticipation = {
        meetings
      };

      user.hostParticipation[year] = hostParticipation;
    }
  }

  private parseParticipateParticipation(user: User, year = MEMORIAL_YEAR) {
    if (user.participateParticipation && user.participateParticipation[year] && user.participateParticipation[year]) {
      const participateMeetings: ParticipateParticipationMeeting[] = [];

      if (user.participateParticipation[year].meetings) {
        Array.from(Object.entries(user.participateParticipation[year].meetings)).forEach(
          ([hostId, meetings]: [string, Object]) => {
            Array.from(Object.entries(meetings)).forEach(([id, meeting]: [string, ParticipateParticipationMeeting]) => {
              participateMeetings.push({
                id,
                hostId,
                title: meeting.title,
                accompanies: meeting.accompanies
              });
            });
          }
        );
      }

      const participateParticipation: ParticipateParticipation = {
        meetings: participateMeetings
      };

      user.participateParticipation[year] = participateParticipation;
    }
  }

  private parseBereavedParticipation(user: User, year = MEMORIAL_YEAR) {
    if (user.bereavedParticipation && user.bereavedParticipation[year] && user.bereavedParticipation[year]) {
      const bereavedMeetings: UserParticipationMeeting[] = [];

      if (user.bereavedParticipation[year].meetings) {
        Array.from(Object.entries(user.bereavedParticipation[year].meetings)).forEach(
          ([hostId, meetings]: [string, Object]) => {
            Array.from(Object.entries(meetings)).forEach(([id, meeting]: [string, UserParticipationMeeting]) => {
              bereavedMeetings.push({
                id,
                hostId,
                title: meeting.title
              });
            });
          }
        );

        user.bereavedParticipation[year].meetings = bereavedMeetings;
      }
    }
  }

  private firebaseMapToArray<T>(map: Object, additionalData = {}): T[] {
    if (map) {
      return Array.from(Object.entries(map)).map(([id, object]: [string, T]) => ({
        ...object,
        id,
        ...additionalData
      }));
    }
  }
}
