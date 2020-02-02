import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { auth } from 'firebase/app';
import { User } from '../model';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map, catchError, tap, first } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataService } from './data.service';

export enum LoginMethod {
  EMAIL_PASS,
  FACEBOOK,
  GOOGLE
}

export interface LoginOptions {
  credentials: {
    email: string;
    pass: string;
  };
  remember: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<User>;
  public userId: string;
  public currentFirebaseUser: firebase.User;

  constructor(
    public angularFireAuth: AngularFireAuth,
    private dataService: DataService
  ) {
    this.user = this.angularFireAuth.authState
      .pipe(
        switchMap(authRes => {
          if (authRes) {
            this.userId = authRes.uid;
            this.currentFirebaseUser = authRes;
            return this.dataService.getUserById(authRes.uid);
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
      console.log(error);
      throw error;
    }
  }

  public googleLogin(): Promise<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  public facebookLogin(): Promise<auth.UserCredential> {
    const provider = new auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  public emailPassLogin(
    email: string,
    password: string
  ): Promise<auth.UserCredential> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );
  }

  public emailPassRegistration(
    email: string,
    password: string
  ): Promise<auth.UserCredential> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );
  }

  public signOut() {
    return this.angularFireAuth.auth.signOut();
  }

  // public login(
  //   loginMethod: LoginMethod,
  //   loginOptions: LoginOptions
  // ): Observable<User> {
  //   return new Observable(subscriber => {
  //     let userPromise: Promise<auth.UserCredential>;

  //     switch (loginMethod) {
  //       case LoginMethod.FACEBOOK:
  //         userPromise = this.facebookLogin();
  //         break;
  //       case LoginMethod.GOOGLE:
  //         userPromise = this.googleLogin();
  //         break;
  //       case LoginMethod.EMAIL_PASS:
  //         userPromise = this.emailPassLogin(
  //           loginOptions.credentials.email,
  //           loginOptions.credentials.pass
  //         );
  //         break;
  //     }

  //     userPromise.then((userCredential: auth.UserCredential) => {
  //       this.getUserWithUserCreds(userCredential.user).subscribe(user => {
  //         subscriber.next(user);
  //         subscriber.complete();
  //       });
  //     });
  //   });
  // }

  // getUserWithUserCreds(firebaseUser: firebase.User): Observable<User> {
  //   return this.getUser(firebaseUser.uid).pipe(
  //     map((user: User) => {
  //       return {
  //         id: firebaseUser.uid,
  //         profile: user.profile
  //       };
  //     })
  //   );
  // }
}
