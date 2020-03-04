import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { ParticipationsService } from '../shared/services/participations.service';

@Injectable({
  providedIn: 'root'
})
export class RoleBasedGuard implements CanActivate {
  roleToMethod = {
    host: this.participationsService.isUserCanHost,
    tell: this.participationsService.isUserCanTell,
    participate: this.participationsService.isUserCanParticipate
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private participationsService: ParticipationsService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const validate = this.roleToMethod[next.data.role];
    return this.authService.user.pipe(
      take(1),
      map(user => {
        return validate(user) ? true : this.router.parseUrl('home');
      })
    );
  }
}
