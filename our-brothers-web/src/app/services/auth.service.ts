import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public angularFireAuth: AngularFireAuth) { }

  public getAuthState(): Observable<firebase.User> {
    return this.angularFireAuth.authState;
  }

  public googleLogin(): Promise<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  public facebookLogin(): Promise<auth.UserCredential> {
    const provider = new auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  public signOut() {
    return this.angularFireAuth.auth.signOut();
  }

  private async socialSignIn(provider): Promise<auth.UserCredential> {
    try {
      return this.angularFireAuth.auth.signInWithPopup(provider);
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }
}