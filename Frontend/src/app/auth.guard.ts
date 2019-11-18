import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/shared/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const login = next.data.login || false;
    if (login) {
      return !this.auth.isLoggedIn;
    } else {
      return this.auth.user$.pipe(
        take(1),
        map(user => !!user), // <-- map to boolean
        tap(loggedIn => {
          if (!this.auth.isLoggedIn) {
            console.error('access denied')
            this.router.navigate(['/home']);
          }
        })
      )
    }
  }
}
