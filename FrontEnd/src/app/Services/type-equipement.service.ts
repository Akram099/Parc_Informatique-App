import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type_equipement } from '../models/Type_Equipement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeEquipementService {

  constructor(private httpclient : HttpClient) { }

  private baseurl = "https://localhost:7211/api/Type_Equipement";

  GetTypeEquipement() : Observable<type_equipement[]> {
    return this.httpclient.get<type_equipement[]>(this.baseurl)
  }
}
