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
  user$: Observable<User>;
  loggedIn: boolean = false;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public ngZone: NgZone,
    private router: Router,
    private _toastr: ToastrService
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          this.loggedIn = true;
          localStorage.setItem('user', JSON.stringify(user));
          JSON.parse(localStorage.getItem('user'));
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          this.loggedIn = false;
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
          return of(null);
        }
      })
    )
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
  OAuthProvider(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['functions']);
        })
      }).catch((error) => {
        window.alert(error)
      })
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

  async signOut() {
    await this.afAuth.auth.signOut();
    this.loggedIn = false;
    localStorage.removeItem('user');
    this._toastr.success('Successfully logged out!');
    this.router.navigate(['/']);
  }
}
