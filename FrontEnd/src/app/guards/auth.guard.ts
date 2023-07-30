import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private auth: AuthService, private router: Router, private toast: NgToastService){}
  
  canActivate(){
    if(this.auth.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['login']);
      this.toast.warning({detail:"ALERTE",summary:'Login First!', duration:4000, position: 'topRight'});
      return false;
    }
  }
}
