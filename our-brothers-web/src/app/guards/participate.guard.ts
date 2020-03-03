import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AuthService } from '../shared/services/auth.service';
import { ParticipationsService } from '../shared/services/participations.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipateGuard implements CanActivate {
  constructor(private router: Router,
    private authService: AuthService,
    private participationsService: ParticipationsService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user
      .pipe(
        take(1),
        map((user) => {
          if (this.participationsService.isUserCanParticipate(user)) {
            return true;
          } else {
            return this.router.parseUrl('home');
          }
        })
      );
  }

}
