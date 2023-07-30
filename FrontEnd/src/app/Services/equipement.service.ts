import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { equipement } from '../models/Equipement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EquipementService {
 
  constructor(private httpclient : HttpClient) { }

  private baseurl = "https://localhost:7211/api/Equipement";

  GetEquipement() : Observable<equipement[]> {
    return this.httpclient.get<equipement[]>(this.baseurl)
  }

  Equipement(equipement_ID: string) : Observable<equipement> {
    return this.httpclient.get<equipement>(this.baseurl + '/' + equipement_ID)
  }

  CreateEquipement(addequipementRequest : equipement) : Observable<equipement>{
    addequipementRequest.equipement_ID = '00000';
    return this.httpclient.post<equipement>(this.baseurl, addequipementRequest);
  }
  
  updateEquipement(equipement_ID : string, updateequipementRequest: equipement) : Observable<equipement>{
    return this.httpclient.put<equipement>(this.baseurl+ '/' + equipement_ID, updateequipementRequest);
  }

  DeleteEquipement(equipement_ID: string) : Observable<equipement>{
    return this.httpclient.delete<equipement>(this.baseurl+ '/' +equipement_ID);
  }

  getCountEqui() : Observable<equipement>{
    return this.httpclient.get<equipement>(this.baseurl+ '/GetcountEquipement');
  }

} 
