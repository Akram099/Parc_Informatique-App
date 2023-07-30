import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate,CanActivateFn, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class hasroleGuard implements CanActivate{

  constructor(private auth: AuthService, private router: Router, private toast: NgToastService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):| Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
    const allowedRoles: string[] = route.data['role'];
    const userRoles: string[] = this.auth.getRoleFromToken();

    const isAuthorized = allowedRoles.some(role=>userRoles.includes(role));

    if (!isAuthorized) {
      // redirect 
      // display a message
      this.router.navigate(['accueil']);
      this.toast.warning({detail:"ACCESS",summary:'Vous étes pas Autorisé à cette Page!', duration:4000, position: 'topRight'});
    }

    return isAuthorized || false;
  }};
