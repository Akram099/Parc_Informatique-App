import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requete } from '../models/Requete';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequeteService {

  private baseurl='https://localhost:7211/api/Requete';

  constructor(private httpclient:HttpClient,private Auth:AuthService) { }

  Requete(num_Identification: string) : Observable<Requete> {
    return this.httpclient.get<Requete>(this.baseurl + '/get/' + num_Identification)
  }

  GetAllRequete( role: string,id: number): Observable<Requete[]> {
    const url = `${this.baseurl}/${id}?role=${role}`;
    return this.httpclient.get<Requete[]>(url);
  }
  
  CreateRequete(addrequeteRequest : Requete) : Observable<Requete>{
    addrequeteRequest.num_Identification = '00000';
    return this.httpclient.post<Requete>(this.baseurl, addrequeteRequest);
  }
  
  updateRequete(num_Identification : string, updaterequeteRequest: Requete) : Observable<Requete>{
    if(updaterequeteRequest.etat_Requete != 'Clôturé'){
      updaterequeteRequest.date_cloture=null;
    }
    else if(updaterequeteRequest.etat_Requete == 'Clôturé'){
      updaterequeteRequest.date_cloture=new Date();
    }
    return this.httpclient.put<Requete>(this.baseurl+ '/updateRequete/' + num_Identification, updaterequeteRequest);
  }

  DeleteRequete(num_Identification: string) : Observable<Requete>{
    return this.httpclient.delete<Requete>(this.baseurl+ '/' +num_Identification);
  }

  UpdateEtat(id: number, etat_Requete: string) : Observable<Requete>{
    const url = `${this.baseurl}/${id}?etat=${etat_Requete}`;
    return this.httpclient.put<Requete>(url,null)
  }

  getCountReqCL() : Observable<Requete>{
    return this.httpclient.get<Requete>(this.baseurl+ '/GetcountReqClôturé');
  }

  getCountReqnotCL() : Observable<Requete>{
    return this.httpclient.get<Requete>(this.baseurl+ '/GetcountReqnotClôturé');
  }
}