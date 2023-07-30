import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fonctionnaire } from '../models/Fonctionnaire';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private httpclient : HttpClient) { }

  private baseurl = "https://localhost:7211/api/Fonctionnaire";

  GetEmployee() : Observable<fonctionnaire[]> {
    return this.httpclient.get<fonctionnaire[]>(this.baseurl)
  }

  Employee(fonctionnaire_ID: string) : Observable<fonctionnaire> {
    return this.httpclient.get<fonctionnaire>(this.baseurl + '/' + fonctionnaire_ID)
  }

  CreateEmployee(addfonctionnaireRequest : fonctionnaire) : Observable<fonctionnaire>{
    addfonctionnaireRequest.fonctionnaire_ID = '00000';
    return this.httpclient.post<fonctionnaire>(this.baseurl, addfonctionnaireRequest);
  }
  
  updateEmployee(fonctionnaire_ID : string, updatefonctionnaireRequest: fonctionnaire) : Observable<fonctionnaire>{
    return this.httpclient.put<fonctionnaire>(this.baseurl+ '/' + fonctionnaire_ID, updatefonctionnaireRequest);
  }

  DeleteEmployee(fonctionnaire_ID: string) : Observable<fonctionnaire>{
    return this.httpclient.delete<fonctionnaire>(this.baseurl+ '/' +fonctionnaire_ID);
  }

  getFullnamebyrole(name:string): Observable<fonctionnaire[]>{
    return this.httpclient.get<fonctionnaire[]>(`${this.baseurl}/GetAllAdmin?name=${name}`)
  }

  getCountFonc() : Observable<fonctionnaire>{
    return this.httpclient.get<fonctionnaire>(this.baseurl+ '/GetcountFonctionnaire');
  }

} 
