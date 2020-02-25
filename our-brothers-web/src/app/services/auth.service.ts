import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of, from, Subject, throwError } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { auth } from 'firebase/app';

import { User } from 'models';
import { DataService } from './data.service';
import { AnalyticsService } from './analytics.service';

export enum LoginMethod {
  EMAIL_PASS,
  FACEBOOK,
  GOOGLE
}

export enum AuthErrors {
  UserNotFound = "auth/user-not-found",
  WrongPassword = "auth/wrong-password",
  CancelledPopupRequest = "auth/cancelled-popup-request",
  EmailAlreadyInUse = "auth/email-already-in-use"
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<User>;
  public firebaseUser: Observable<firebase.User> = this.angularFireAuth.authState;
  public needLogin$: Subject<boolean> = new Subject();

  private firstTimeGetUser = true;

  constructor(
    public angularFireAuth: AngularFireAuth,
    private dataService: DataService,
    private analyticsService: AnalyticsService
  ) {
    this.user = this.angularFireAuth.authState
      .pipe(
        switchMap(authRes => {
          if (authRes) {
            return this.dataService.getUserById(authRes.uid).pipe(
              switchMap(user => {
                return from(
                  authRes.getIdTokenResult(this.firstTimeGetUser)
                ).pipe(
                  tap(() => (this.firstTimeGetUser = false)),
                  map(idTokenResult => ({
                    ...user,
                    isAdmin: !!idTokenResult.claims.admin,
                    isVolunteer: !!idTokenResult.claims.volunteer
                  }))
                );
              })
            );
          } else {
            return of(null);
          }
        })
      )
      .pipe(
        tap((user: User) => {
          if (user) {
            console.log('Logged on user: ', user);
          } else {
            console.log('No user logged on');
          }
        })
      );
  }

  public signInWithGoogle(): Observable<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  public signInWithFacebook(): Observable<auth.UserCredential> {
    const provider = new auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  public signInWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<auth.UserCredential> {

    this.analyticsService.logEvent('SignInWithEmailAndPassword', 'start');

    return from(this.angularFireAuth.auth.signInWithEmailAndPassword(
      email,
      password
    )).pipe(
      tap(() => this.analyticsService.logEvent('SignInWithEmailAndPassword', 'end')),
      catchError(error => {
        this.analyticsService.logEvent('SignInWithEmailAndPassword', 'failed', { error: error.toString() });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<auth.UserCredential> {
    this.analyticsService.logEvent('CreateUserWithEmailAndPassword', 'start');

    return from(this.angularFireAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    )).pipe(
      tap(() => this.analyticsService.logEvent('CreateUserWithEmailAndPassword', 'end')),
      catchError(error => {
        this.analyticsService.logEvent('CreateUserWithEmailAndPassword', 'failed', { error: error.toString() });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public sendPasswordResetEmail(email: string): Observable<void> {
    this.analyticsService.logEvent('SendPasswordResetEmail', 'start');

    return from(this.angularFireAuth.auth.sendPasswordResetEmail(email)).pipe(
      tap(() => this.analyticsService.logEvent('SendPasswordResetEmail', 'end')),
      catchError(error => {
        this.analyticsService.logEvent('SendPasswordResetEmail', 'failed', { error: error.toString() });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public signOut(): Observable<void> {
    this.analyticsService.logEvent('SignOut', 'start');

    return from(this.angularFireAuth.auth.signOut()).pipe(
      tap(() => this.analyticsService.logEvent('SignOut', 'end')),
      catchError(error => {
        this.analyticsService.logEvent('SignOut', 'failed', { error: error.toString() });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public requestToLogin() {
    this.needLogin$.next(true);
  }

  public closeLogin() {
    this.needLogin$.next(false);
  }

  private socialSignIn(provider: firebase.auth.AuthProvider): Observable<auth.UserCredential> {
    const telemetry = { provider: provider.providerId };

    this.analyticsService.logEvent('SocialSignIn', 'start', telemetry);

    return from(this.angularFireAuth.auth.signInWithPopup(provider))
      .pipe(
        tap(() => this.analyticsService.logEvent('SocialSignIn', 'end', telemetry)),
        catchError(error => {
          this.analyticsService.logEvent('SocialSignIn', 'failed', telemetry);
          console.error(error);
          return throwError(error);
        })
      );
  }
}
