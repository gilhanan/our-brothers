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

    this.analyticsService.logEvent('SignInWithEmailAndPassword');

    return from(this.angularFireAuth.auth.signInWithEmailAndPassword(
      email,
      password
    )).pipe(
      tap(() => this.analyticsService.logEvent('SignInWithEmailAndPasswordSuccess')),
      catchError(error => {
        this.analyticsService.logEvent('SignInWithEmailAndPasswordFailed', { error: error.toString() });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<auth.UserCredential> {
    this.analyticsService.logEvent('CreateUserWithEmailAndPassword');

    return from(this.angularFireAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    )).pipe(
      tap(() => this.analyticsService.logEvent('CreateUserWithEmailAndPasswordSuccess')),
      catchError(error => {
        this.analyticsService.logEvent('CreateUserWithEmailAndPasswordFailed', { error: error.toString() });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public sendPasswordResetEmail(email: string): Observable<void> {
    this.analyticsService.logEvent('SendPasswordResetEmail');

    return from(this.angularFireAuth.auth.sendPasswordResetEmail(email)).pipe(
      tap(() => this.analyticsService.logEvent('SendPasswordResetEmailSuccess')),
      catchError(error => {
        this.analyticsService.logEvent('SendPasswordResetEmailFailed', { error: error.toString() });
        console.error(error);
        return throwError(error);
      })
    );
  }

  public signOut(): Observable<void> {
    this.analyticsService.logEvent('SignOut');

    return from(this.angularFireAuth.auth.signOut()).pipe(
      tap(() => this.analyticsService.logEvent('SignOutSuccess')),
      catchError(error => {
        this.analyticsService.logEvent('SignOutFailed', { error: error.toString() });
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

    this.analyticsService.logEvent('SocialSignIn', telemetry);

    return from(this.angularFireAuth.auth.signInWithPopup(provider))
      .pipe(
        tap(() => this.analyticsService.logEvent('SocialSignInSuccess', telemetry)),
        catchError(error => {
          this.analyticsService.logEvent('SocialSignInFailed', telemetry);
          console.error(error);
          return throwError(error);
        })
      );
  }
}
