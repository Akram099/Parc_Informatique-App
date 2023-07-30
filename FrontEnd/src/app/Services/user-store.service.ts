import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private fullname$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private id$=new  BehaviorSubject<string>("");

  constructor() { }

    public getRoleFromStore(){
      return this.role$.asObservable();
    }

    public setRoleForStore(role:string){
      this.role$.next(role);
    }

    public getFullNameFromStore(){
      return this.fullname$.asObservable();
    }

    public setFullNameForStore(fullname:string){
      this.fullname$.next(fullname);
    }

    public getIdFromStore(){
      return this.id$.asObservable();
    }

    public setIdStore(id:string){
      this.id$.next(id)
    }

}
