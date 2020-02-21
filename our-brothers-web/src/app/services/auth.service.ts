import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of, from, Subject } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { auth } from 'firebase/app';

import { User } from '../model';
import { DataService } from './data.service';

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
    private dataService: DataService
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

  private async socialSignIn(provider): Promise<auth.UserCredential> {
    try {
      return this.angularFireAuth.auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public signInWithGoogle(): Promise<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return this.socialSignIn(provider).catch((error) => {
      console.error(error);
      throw error;
    });
  }

  public signInWithFacebook(): Promise<auth.UserCredential> {
    const provider = new auth.FacebookAuthProvider();
    return this.socialSignIn(provider).catch((error) => {
      console.error(error);
      throw error;
    });
  }

  public signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<auth.UserCredential> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(
      email,
      password
    ).catch((error) => {
      console.error(error);
      throw error;
    });
  }

  public createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<auth.UserCredential> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    ).catch((error) => {
      console.error(error);
      throw error;
    });
  }

  public resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  public signOut() {
    return this.angularFireAuth.auth.signOut();
  }

  public requestToLogin() {
    this.needLogin$.next(true);
  }

  public closeLogin() {
    this.needLogin$.next(false);
  }
}
