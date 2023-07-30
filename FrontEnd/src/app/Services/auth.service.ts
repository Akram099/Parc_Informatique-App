import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({ 
  providedIn: 'root'
})
export class AuthService {

  private baseurl:string ="https://localhost:7211/api/Fonctionnaire/";

  private userPayload: any;

  constructor(private http : HttpClient, private router: Router) { 
    this.userPayload = this.decodeToken();
  }

  signup(userObj:any){
    return this.http.post<any>(`${this.baseurl}register`,userObj);
  }
  
  login(loginObj:any){
    return this.http.post<any>(`${this.baseurl}authenticate`,loginObj);
  }
  
  signout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
  
  storeToken(tokenValue: string){
    localStorage.setItem('token' ,tokenValue)
  }
  
  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(){
    return !!localStorage.getItem('token')
  }
 
  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  getIdFromToken(){
    if(this.userPayload)
    return this.userPayload.nameid;
  }

}
