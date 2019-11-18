import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from "../../models/user";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public ngZone: NgZone,
    private router: Router,
    private _toastr: ToastrService
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false;
  }
  
  OAuthProvider(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['/functions']);
        })
        this.setUserData(res.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  setUserData(user: User){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    this.user = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    localStorage.setItem('user', JSON.stringify(this.user));
    return userRef.set(this.user, {
      merge: true
    });
  }

  // Firebase Google Sign-in
  signInWithGoogle() {
    return this.OAuthProvider(new auth.GoogleAuthProvider())
      .then(res => {
        this._toastr.success('Successfully logged in!');
      }).catch(error => {
        console.log(error);
      });
  }

  userInfo() {
    return JSON.parse(localStorage.getItem('user'));
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this._toastr.success('Successfully logged out!');
    this.router.navigate(['/']);
  }
}
